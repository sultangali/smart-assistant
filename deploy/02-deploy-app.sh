#!/bin/bash

# ============================================================
# Smart Assistant - Скрипт деплоя приложения
# ============================================================
# Этот скрипт:
# - Клонирует/обновляет репозиторий
# - Устанавливает зависимости
# - Собирает фронтенд
# - Настраивает переменные окружения
# - Запускает приложение через PM2
# ============================================================

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Конфигурация
APP_NAME="smart-assistant"
APP_DIR="/var/www/smart-assistant"
GIT_REPO="git@github.com:sultangali/smart-assistant.git"
GIT_BRANCH="main"
NODE_ENV="production"

# Функции логирования
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Проверка доступа к GitHub репозиторию
check_github_access() {
    log_info "Проверка доступа к GitHub репозиторию..."
    
    # Создаем директорию .ssh если её нет
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh
    
    # Добавляем GitHub в known_hosts
    if [ ! -f ~/.ssh/known_hosts ] || ! grep -q "github.com" ~/.ssh/known_hosts 2>/dev/null; then
        ssh-keyscan -t rsa,ed25519 github.com >> ~/.ssh/known_hosts 2>/dev/null
        chmod 600 ~/.ssh/known_hosts
    fi
    
    # Проверяем доступ к репозиторию через SSH
    log_info "Проверка SSH доступа к GitHub..."
    SSH_TEST=$(ssh -T git@github.com 2>&1)
    if echo "$SSH_TEST" | grep -q "successfully authenticated" || ! echo "$SSH_TEST" | grep -q "Permission denied"; then
        log_success "SSH доступ к GitHub настроен"
        GIT_REPO="git@github.com:sultangali/smart-assistant.git"
        return 0
    fi
    
    # Если SSH не работает, предлагаем HTTPS
    log_warning "SSH доступ к GitHub не настроен"
    echo ""
    echo "Выберите способ доступа к репозиторию:"
    echo "1. Настроить SSH (рекомендуется для постоянного использования)"
    echo "2. Использовать HTTPS (проще, но может потребовать токен)"
    read -p "Выберите вариант (1/2): " ACCESS_METHOD
    
    if [ "$ACCESS_METHOD" = "1" ]; then
        setup_ssh_key
        # Проверяем снова
        SSH_TEST=$(ssh -T git@github.com 2>&1)
        if echo "$SSH_TEST" | grep -q "successfully authenticated" || ! echo "$SSH_TEST" | grep -q "Permission denied"; then
            log_success "SSH доступ настроен"
            GIT_REPO="git@github.com:sultangali/smart-assistant.git"
            return 0
        else
            log_error "SSH ключ не добавлен в GitHub. Используем HTTPS..."
            GIT_REPO="https://github.com/sultangali/smart-assistant.git"
            return 0
        fi
    else
        GIT_REPO="https://github.com/sultangali/smart-assistant.git"
        log_info "Используется HTTPS для клонирования репозитория"
        log_warning "Если репозиторий приватный, может потребоваться Personal Access Token"
        return 0
    fi
}

# Настройка SSH ключа
setup_ssh_key() {
    if [ ! -f ~/.ssh/id_rsa ] && [ ! -f ~/.ssh/id_ed25519 ]; then
        log_info "Создание SSH ключа..."
        
        read -p "Введите ваш email для SSH ключа: " SSH_EMAIL
        if [ -z "$SSH_EMAIL" ]; then
            SSH_EMAIL="admin@smart-assistant"
        fi
        
        ssh-keygen -t ed25519 -C "$SSH_EMAIL" -f ~/.ssh/id_ed25519 -N "" -q
        
        chmod 600 ~/.ssh/id_ed25519
        chmod 644 ~/.ssh/id_ed25519.pub
        
        echo ""
        echo "============================================================"
        echo -e "${YELLOW}ВАЖНО: Добавьте этот SSH ключ в GitHub!${NC}"
        echo "============================================================"
        echo ""
        cat ~/.ssh/id_ed25519.pub
        echo ""
        echo "1. Скопируйте ключ выше"
        echo "2. Перейдите на https://github.com/settings/keys"
        echo "3. Нажмите 'New SSH key' и вставьте ключ"
        echo ""
        read -p "Нажмите Enter после добавления ключа в GitHub..."
    else
        log_info "SSH ключ уже существует. Отображаем публичный ключ:"
        echo ""
        if [ -f ~/.ssh/id_ed25519.pub ]; then
            cat ~/.ssh/id_ed25519.pub
        elif [ -f ~/.ssh/id_rsa.pub ]; then
            cat ~/.ssh/id_rsa.pub
        fi
        echo ""
        echo "Убедитесь, что этот ключ добавлен в GitHub:"
        echo "https://github.com/settings/keys"
        echo ""
        read -p "Нажмите Enter для продолжения..."
    fi
}

# Клонирование или обновление репозитория
clone_or_update_repo() {
    log_info "Работа с репозиторием ($GIT_REPO)..."
    
    if [ -d "$APP_DIR/.git" ]; then
        log_info "Репозиторий существует, обновляем..."
        cd $APP_DIR
        
        # Проверяем текущий remote URL
        CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
        
        # Если remote изменился, обновляем его
        if [ "$CURRENT_REMOTE" != "$GIT_REPO" ]; then
            log_info "Обновление remote URL..."
            git remote set-url origin $GIT_REPO
        fi
        
        git fetch origin
        git reset --hard origin/$GIT_BRANCH
        git pull origin $GIT_BRANCH
    else
        log_info "Клонирование репозитория..."
        
        # Создаем директорию если её нет
        mkdir -p $APP_DIR
        cd $APP_DIR
        
        # Если директория не пустая (но не git репозиторий), очищаем
        if [ "$(ls -A $APP_DIR 2>/dev/null)" ]; then
            log_warning "Директория не пуста, очищаем..."
            rm -rf $APP_DIR/*
            rm -rf $APP_DIR/.[!.]* 2>/dev/null || true
        fi
        
        git clone -b $GIT_BRANCH $GIT_REPO $APP_DIR
    fi
    
    cd $APP_DIR
    log_success "Репозиторий обновлён"
}

# Установка зависимостей сервера
install_server_deps() {
    log_info "Установка зависимостей сервера..."
    
    cd $APP_DIR/server
    npm ci --production=false
    
    log_success "Зависимости сервера установлены"
}

# Установка зависимостей клиента и сборка
build_client() {
    log_info "Установка зависимостей клиента..."
    
    cd $APP_DIR/client
    npm ci
    
    log_info "Сборка клиента для production..."
    npm run build
    
    log_success "Клиент собран"
}

# Настройка переменных окружения
setup_env() {
    log_info "Настройка переменных окружения..."
    
    ENV_FILE="$APP_DIR/server/.env"
    
    if [ -f "$ENV_FILE" ]; then
        log_info "Файл .env уже существует"
        read -p "Перезаписать? (y/n): " OVERWRITE
        if [ "$OVERWRITE" != "y" ]; then
            return
        fi
    fi
    
    # Получаем IP адрес сервера (используем предустановленный IP по умолчанию)
    DEFAULT_SERVER_IP="34.88.173.3"
    SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "$DEFAULT_SERVER_IP")
    
    # Если автоматическое определение не удалось, используем дефолтный IP
    if [ -z "$SERVER_IP" ] || [ "$SERVER_IP" = "" ]; then
        SERVER_IP="$DEFAULT_SERVER_IP"
    fi
    
    # Генерируем безопасный JWT секрет
    JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')
    
    # Генерируем безопасный пароль админа
    ADMIN_PASSWORD=$(openssl rand -base64 16 | tr -d '\n')
    
    cat > $ENV_FILE << EOF
# ==================== ОСНОВНЫЕ НАСТРОЙКИ ====================
NODE_ENV=production
PORT=5000

# ==================== БАЗА ДАННЫХ ====================
MONGODB_URI=mongodb://localhost:27017/smart-assistant

# ==================== JWT ====================
JWT_SECRET=$JWT_SECRET
JWT_EXPIRE=7d

# ==================== АДМИНИСТРАТОР ====================
ADMIN_EMAIL=admin
ADMIN_PASSWORD=$ADMIN_PASSWORD
ADMIN_NOTIFICATION_EMAIL=

# ==================== РОТАЦИЯ ПАРОЛЕЙ ====================
PASSWORD_ROTATION_DAYS=7

# ==================== CORS ====================
# Замените на ваш домен после настройки SSL
CORS_ORIGIN=https://$SERVER_IP

# ==================== EMAIL (SMTP) ====================
# Настройте для получения уведомлений о смене пароля
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM=

# ==================== RATE LIMITING ====================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ==================== БЕЗОПАСНОСТЬ ====================
BCRYPT_SALT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCK_TIME_MINUTES=30
EOF

    chmod 600 $ENV_FILE
    
    echo ""
    echo "============================================================"
    echo -e "${YELLOW}СОХРАНИТЕ ЭТИ ДАННЫЕ!${NC}"
    echo "============================================================"
    echo "Admin Email: admin"
    echo "Admin Password: $ADMIN_PASSWORD"
    echo "JWT Secret: сгенерирован автоматически"
    echo "Server IP: $SERVER_IP"
    echo "============================================================"
    echo ""
    
    log_success "Переменные окружения настроены"
}

# Инициализация базы данных
seed_database() {
    log_info "Инициализация базы данных..."
    
    cd $APP_DIR/server
    npm run seed
    
    log_success "База данных инициализирована"
}

# Настройка PM2
setup_pm2() {
    log_info "Настройка PM2..."
    
    cd $APP_DIR
    
    # Останавливаем существующий процесс если есть
    pm2 delete $APP_NAME 2>/dev/null || true
    
    # Запускаем через PM2 с ecosystem файлом
    pm2 start ecosystem.config.cjs --env production
    
    # Сохраняем конфигурацию PM2
    pm2 save
    
    log_success "PM2 настроен и приложение запущено"
}

# Вывод статуса
print_status() {
    echo ""
    echo "============================================================"
    echo -e "${GREEN}Деплой завершён успешно!${NC}"
    echo "============================================================"
    echo ""
    echo "Статус приложения:"
    pm2 status
    echo ""
    echo "Следующие шаги:"
    echo "1. Запустите 03-setup-nginx.sh для настройки Nginx"
    echo "2. Запустите 04-setup-ssl.sh для настройки SSL"
    echo ""
    echo "Полезные команды:"
    echo "  pm2 logs $APP_NAME     - просмотр логов"
    echo "  pm2 restart $APP_NAME  - перезапуск"
    echo "  pm2 stop $APP_NAME     - остановка"
    echo "  pm2 monit              - мониторинг"
    echo "============================================================"
}

# Главная функция
main() {
    echo "============================================================"
    echo "Smart Assistant - Деплой приложения"
    echo "============================================================"
    echo ""
    
    check_github_access
    clone_or_update_repo
    install_server_deps
    build_client
    setup_env
    seed_database
    setup_pm2
    
    print_status
}

# Запуск
main "$@"

