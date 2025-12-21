#!/bin/bash

# ============================================================
# Smart Assistant - Полный скрипт деплоя
# ============================================================
# Этот скрипт выполняет полную установку и деплой:
# 1. Установка зависимостей
# 2. Клонирование и сборка приложения
# 3. Настройка Nginx
# 4. Настройка SSL
# ============================================================

set -e

# Цвета
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Конфигурация
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_NAME="smart-assistant"
APP_DIR="/var/www/smart-assistant"
GIT_REPO="git@github.com:sultangali/smart-assistant.git"

# Функции логирования
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_step() { echo -e "\n${CYAN}========== $1 ==========${NC}\n"; }

# Проверка root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "Этот скрипт должен быть запущен с правами root (sudo)"
        exit 1
    fi
}

# Приветствие
show_welcome() {
    clear
    echo -e "${CYAN}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                                                              ║"
    echo "║              🚀 SMART ASSISTANT DEPLOYMENT 🚀                ║"
    echo "║                                                              ║"
    echo "║          Автоматический деплой на VPS сервер                 ║"
    echo "║                                                              ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    echo "Этот скрипт выполнит:"
    echo "  ✓ Установку MongoDB, Node.js, Nginx, PM2, Certbot"
    echo "  ✓ Клонирование репозитория из GitHub"
    echo "  ✓ Сборку фронтенда и настройку бэкенда"
    echo "  ✓ Настройку Nginx как reverse proxy"
    echo "  ✓ Настройку SSL сертификата"
    echo ""
    read -p "Продолжить? (y/n): " CONTINUE
    if [ "$CONTINUE" != "y" ]; then
        log_info "Отменено пользователем"
        exit 0
    fi
}

# Сбор информации
collect_info() {
    echo ""
    log_step "СБОР ИНФОРМАЦИИ"
    
    # Получаем IP
    SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')
    log_info "IP адрес сервера: $SERVER_IP"
    
    # Домен
    echo ""
    echo "Выберите режим работы:"
    echo "1) Только по IP (без домена) - самоподписанный SSL"
    echo "2) С доменом - Let's Encrypt SSL"
    echo ""
    read -p "Ваш выбор (1 или 2): " DOMAIN_CHOICE
    
    if [ "$DOMAIN_CHOICE" = "2" ]; then
        read -p "Введите доменное имя: " DOMAIN_NAME
        read -p "Введите email для SSL сертификата: " CERT_EMAIL
        USE_DOMAIN=true
        SERVER_NAME=$DOMAIN_NAME
    else
        USE_DOMAIN=false
        SERVER_NAME=$SERVER_IP
    fi
    
    # Email для уведомлений
    echo ""
    read -p "Введите email администратора (для уведомлений о смене пароля): " ADMIN_EMAIL
    
    # SMTP настройки (опционально)
    echo ""
    echo "Настроить SMTP для отправки email? (для уведомлений о смене пароля)"
    read -p "(y/n): " SETUP_SMTP
    
    if [ "$SETUP_SMTP" = "y" ]; then
        echo ""
        echo "Выберите SMTP провайдера:"
        echo "1) Gmail"
        echo "2) Yandex"
        echo "3) Mail.ru"
        echo "4) Другой"
        read -p "Выбор: " SMTP_PROVIDER
        
        case $SMTP_PROVIDER in
            1)
                SMTP_HOST="smtp.gmail.com"
                SMTP_PORT="587"
                SMTP_SECURE="false"
                ;;
            2)
                SMTP_HOST="smtp.yandex.ru"
                SMTP_PORT="465"
                SMTP_SECURE="true"
                ;;
            3)
                SMTP_HOST="smtp.mail.ru"
                SMTP_PORT="465"
                SMTP_SECURE="true"
                ;;
            4)
                read -p "SMTP Host: " SMTP_HOST
                read -p "SMTP Port: " SMTP_PORT
                read -p "SMTP Secure (true/false): " SMTP_SECURE
                ;;
        esac
        
        read -p "SMTP User (email): " SMTP_USER
        read -s -p "SMTP Password: " SMTP_PASS
        echo ""
    fi
    
    echo ""
    log_success "Информация собрана"
}

# Шаг 1: Установка зависимостей
step_install_deps() {
    log_step "ШАГ 1: УСТАНОВКА ЗАВИСИМОСТЕЙ"
    
    # Определяем ОС
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        OS=$ID
    fi
    
    log_info "Обновление системы..."
    apt-get update -y && apt-get upgrade -y
    
    log_info "Установка базовых утилит..."
    apt-get install -y curl wget nano vim git htop ufw gnupg lsb-release ca-certificates apt-transport-https software-properties-common build-essential
    
    # MongoDB
    if ! command -v mongod &> /dev/null; then
        log_info "Установка MongoDB..."
        curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
        echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
        apt-get update && apt-get install -y mongodb-org
        systemctl start mongod && systemctl enable mongod
    else
        log_info "MongoDB уже установлен"
    fi
    
    # Node.js
    if ! command -v node &> /dev/null; then
        log_info "Установка Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
        apt-get install -y nodejs
    else
        log_info "Node.js уже установлен: $(node --version)"
    fi
    
    # PM2
    if ! command -v pm2 &> /dev/null; then
        log_info "Установка PM2..."
        npm install -g pm2
    else
        log_info "PM2 уже установлен"
    fi
    
    # Nginx
    if ! command -v nginx &> /dev/null; then
        log_info "Установка Nginx..."
        apt-get install -y nginx
        systemctl start nginx && systemctl enable nginx
    else
        log_info "Nginx уже установлен"
    fi
    
    # Certbot
    if ! command -v certbot &> /dev/null; then
        log_info "Установка Certbot..."
        apt-get install -y certbot python3-certbot-nginx
    else
        log_info "Certbot уже установлен"
    fi
    
    # Firewall
    log_info "Настройка файрвола..."
    ufw allow ssh
    ufw allow 'Nginx Full'
    ufw --force enable
    
    # Создание директорий
    mkdir -p $APP_DIR
    mkdir -p /var/log/pm2
    mkdir -p /var/www/certbot
    
    log_success "Зависимости установлены"
}

# Шаг 2: Деплой приложения
step_deploy_app() {
    log_step "ШАГ 2: ДЕПЛОЙ ПРИЛОЖЕНИЯ"
    
    # SSH ключ
    if [ ! -f ~/.ssh/id_rsa ] && [ ! -f ~/.ssh/id_ed25519 ]; then
        log_info "Создание SSH ключа..."
        ssh-keygen -t ed25519 -C "$ADMIN_EMAIL" -f ~/.ssh/id_ed25519 -N ""
        
        echo ""
        echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
        echo -e "${YELLOW}ВАЖНО: Добавьте этот SSH ключ в GitHub!${NC}"
        echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
        echo ""
        cat ~/.ssh/id_ed25519.pub
        echo ""
        echo "1. Скопируйте ключ выше"
        echo "2. Перейдите на https://github.com/settings/keys"
        echo "3. Нажмите 'New SSH key' и вставьте ключ"
        echo ""
        read -p "Нажмите Enter после добавления ключа в GitHub..."
    fi
    
    ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts 2>/dev/null
    
    # Клонирование
    if [ -d "$APP_DIR/.git" ]; then
        log_info "Обновление репозитория..."
        cd $APP_DIR
        git fetch origin && git reset --hard origin/main && git pull origin main
    else
        log_info "Клонирование репозитория..."
        rm -rf $APP_DIR/*
        git clone -b main $GIT_REPO $APP_DIR
    fi
    
    # Сервер
    log_info "Установка зависимостей сервера..."
    cd $APP_DIR/server
    npm ci --production=false
    
    # Клиент
    log_info "Сборка клиента..."
    cd $APP_DIR/client
    npm ci
    npm run build
    
    # Переменные окружения
    log_info "Настройка переменных окружения..."
    JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')
    ADMIN_PASSWORD=$(openssl rand -base64 16 | tr -d '\n')
    
    if [ "$USE_DOMAIN" = true ]; then
        CORS_ORIGIN="https://$DOMAIN_NAME"
    else
        CORS_ORIGIN="https://$SERVER_IP"
    fi
    
    cat > $APP_DIR/server/.env << EOF
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-assistant
JWT_SECRET=$JWT_SECRET
JWT_EXPIRE=7d
ADMIN_EMAIL=admin
ADMIN_PASSWORD=$ADMIN_PASSWORD
ADMIN_NOTIFICATION_EMAIL=$ADMIN_EMAIL
PASSWORD_ROTATION_DAYS=7
CORS_ORIGIN=$CORS_ORIGIN
SMTP_HOST=${SMTP_HOST:-}
SMTP_PORT=${SMTP_PORT:-587}
SMTP_SECURE=${SMTP_SECURE:-false}
SMTP_USER=${SMTP_USER:-}
SMTP_PASS=${SMTP_PASS:-}
SMTP_FROM=${SMTP_USER:-}
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
BCRYPT_SALT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCK_TIME_MINUTES=30
EOF
    
    chmod 600 $APP_DIR/server/.env
    
    # Seed базы данных
    log_info "Инициализация базы данных..."
    cd $APP_DIR/server
    npm run seed
    
    # PM2
    log_info "Запуск через PM2..."
    cd $APP_DIR
    pm2 delete $APP_NAME 2>/dev/null || true
    pm2 start ecosystem.config.cjs --env production
    pm2 save
    pm2 startup systemd -u root --hp /root
    
    # Сохраняем данные админа
    echo ""
    echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}СОХРАНИТЕ ЭТИ ДАННЫЕ ДЛЯ ВХОДА В АДМИН ПАНЕЛЬ!${NC}"
    echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
    echo "Admin Login: admin"
    echo "Admin Password: $ADMIN_PASSWORD"
    echo -e "${YELLOW}═══════════════════════════════════════════════════════════════${NC}"
    echo ""
    
    # Сохраняем в файл
    echo "Admin Login: admin" > /root/smart-assistant-credentials.txt
    echo "Admin Password: $ADMIN_PASSWORD" >> /root/smart-assistant-credentials.txt
    chmod 600 /root/smart-assistant-credentials.txt
    
    log_success "Приложение развёрнуто"
}

# Шаг 3: Настройка Nginx
step_setup_nginx() {
    log_step "ШАГ 3: НАСТРОЙКА NGINX"
    
    # Создаём конфигурацию
    cat > /etc/nginx/sites-available/$APP_NAME << EOF
upstream smart_assistant_backend {
    server 127.0.0.1:5000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name $SERVER_NAME;

    root $APP_DIR/client/dist;
    index index.html;

    access_log /var/log/nginx/${APP_NAME}_access.log;
    error_log /var/log/nginx/${APP_NAME}_error.log;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml;
    gzip_comp_level 6;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location /api {
        proxy_pass http://smart_assistant_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~ /\. {
        deny all;
    }
}
EOF

    rm -f /etc/nginx/sites-enabled/default
    ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/$APP_NAME
    
    nginx -t && systemctl reload nginx
    
    log_success "Nginx настроен"
}

# Шаг 4: Настройка SSL
step_setup_ssl() {
    log_step "ШАГ 4: НАСТРОЙКА SSL"
    
    if [ "$USE_DOMAIN" = true ]; then
        log_info "Получение Let's Encrypt сертификата..."
        certbot --nginx -d $DOMAIN_NAME --email $CERT_EMAIL --agree-tos --non-interactive --redirect
        
        # Автообновление
        (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet && systemctl reload nginx") | crontab -
        
        log_success "Let's Encrypt SSL настроен"
    else
        log_info "Создание самоподписанного сертификата..."
        
        mkdir -p /etc/ssl/certs /etc/ssl/private
        
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout /etc/ssl/private/${APP_NAME}.key \
            -out /etc/ssl/certs/${APP_NAME}.crt \
            -subj "/C=KZ/ST=Almaty/L=Almaty/O=Smart Assistant/CN=$SERVER_IP"
        
        # Обновляем Nginx для SSL
        cat > /etc/nginx/sites-available/$APP_NAME << EOF
upstream smart_assistant_backend {
    server 127.0.0.1:5000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name $SERVER_IP;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $SERVER_IP;

    ssl_certificate /etc/ssl/certs/${APP_NAME}.crt;
    ssl_certificate_key /etc/ssl/private/${APP_NAME}.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    root $APP_DIR/client/dist;
    index index.html;

    access_log /var/log/nginx/${APP_NAME}_access.log;
    error_log /var/log/nginx/${APP_NAME}_error.log;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=63072000" always;

    location /api {
        proxy_pass http://smart_assistant_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~ /\. {
        deny all;
    }
}
EOF

        nginx -t && systemctl reload nginx
        
        log_success "Самоподписанный SSL настроен"
    fi
}

# Финальный отчёт
show_final_report() {
    echo ""
    echo -e "${GREEN}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                                                              ║"
    echo "║           ✅ ДЕПЛОЙ ЗАВЕРШЁН УСПЕШНО! ✅                     ║"
    echo "║                                                              ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    
    if [ "$USE_DOMAIN" = true ]; then
        echo "🌐 Сайт доступен: https://$DOMAIN_NAME"
        echo "🔐 Админ панель: https://$DOMAIN_NAME/admin"
    else
        echo "🌐 Сайт доступен: https://$SERVER_IP"
        echo "🔐 Админ панель: https://$SERVER_IP/admin"
        echo ""
        echo -e "${YELLOW}⚠️  Браузер покажет предупреждение о сертификате - это нормально${NC}"
    fi
    
    echo ""
    echo "📋 Данные для входа:"
    echo "   Login: admin"
    echo "   Password: (сохранён в /root/smart-assistant-credentials.txt)"
    echo ""
    echo "📊 Полезные команды:"
    echo "   pm2 status              - статус приложения"
    echo "   pm2 logs smart-assistant - логи"
    echo "   pm2 restart smart-assistant - перезапуск"
    echo "   pm2 monit               - мониторинг"
    echo ""
    echo "📁 Файлы:"
    echo "   Приложение: $APP_DIR"
    echo "   Логи PM2: /var/log/pm2/"
    echo "   Логи Nginx: /var/log/nginx/"
    echo "   Credentials: /root/smart-assistant-credentials.txt"
    echo ""
    
    if [ "$USE_DOMAIN" = false ]; then
        echo "🔄 Для настройки домена позже:"
        echo "   1. Направьте DNS A-запись домена на $SERVER_IP"
        echo "   2. Запустите: sudo certbot --nginx -d your-domain.com"
        echo ""
    fi
    
    echo "============================================================"
}

# Главная функция
main() {
    check_root
    show_welcome
    collect_info
    step_install_deps
    step_deploy_app
    step_setup_nginx
    step_setup_ssl
    show_final_report
}

# Запуск
main "$@"

