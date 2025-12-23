#!/bin/bash

# ============================================================
# Smart Assistant - Настройка SSL
# ============================================================
# Этот скрипт настраивает SSL сертификаты:
# - Самоподписанный сертификат (для IP)
# - Let's Encrypt (для домена)
# ============================================================

set -e

# Цвета
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Конфигурация
APP_NAME="smart-assistant"
APP_DIR="/var/www/smart-assistant"
NGINX_AVAILABLE="/etc/nginx/sites-available"
NGINX_ENABLED="/etc/nginx/sites-enabled"
SSL_DIR="/etc/ssl"

# Функции логирования
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Проверка root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "Этот скрипт должен быть запущен с правами root (sudo)"
        exit 1
    fi
}

# Получение IP адреса
get_server_ip() {
    DEFAULT_SERVER_IP="34.88.173.3"
    SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "$DEFAULT_SERVER_IP")
    
    # Если автоматическое определение не удалось, используем дефолтный IP
    if [ -z "$SERVER_IP" ] || [ "$SERVER_IP" = "" ]; then
        SERVER_IP="$DEFAULT_SERVER_IP"
    fi
    
    log_info "IP адрес сервера: $SERVER_IP"
}

# Выбор типа SSL
select_ssl_type() {
    echo ""
    echo "Выберите тип SSL сертификата:"
    echo "1) Самоподписанный (для IP адреса)"
    echo "2) Let's Encrypt (для домена)"
    echo ""
    read -p "Ваш выбор (1 или 2): " SSL_CHOICE
}

# Создание самоподписанного сертификата
create_self_signed_cert() {
    log_info "Создание самоподписанного SSL сертификата..."
    
    # Создаём директории
    mkdir -p $SSL_DIR/certs
    mkdir -p $SSL_DIR/private
    
    # Генерируем приватный ключ и сертификат
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout $SSL_DIR/private/${APP_NAME}.key \
        -out $SSL_DIR/certs/${APP_NAME}.crt \
        -subj "/C=KZ/ST=Almaty/L=Almaty/O=Smart Assistant/OU=IT/CN=$SERVER_IP"
    
    # Устанавливаем права
    chmod 600 $SSL_DIR/private/${APP_NAME}.key
    chmod 644 $SSL_DIR/certs/${APP_NAME}.crt
    
    log_success "Самоподписанный сертификат создан"
    
    # Активируем SSL конфигурацию
    activate_ssl_config
}

# Получение Let's Encrypt сертификата
get_letsencrypt_cert() {
    read -p "Введите доменное имя: " DOMAIN_NAME
    read -p "Введите email для уведомлений: " CERT_EMAIL
    
    if [ -z "$DOMAIN_NAME" ] || [ -z "$CERT_EMAIL" ]; then
        log_error "Домен и email обязательны"
        exit 1
    fi
    
    log_info "Получение сертификата Let's Encrypt для $DOMAIN_NAME..."
    
    # Проверяем что домен указывает на этот сервер (если dig доступен)
    if command -v dig &> /dev/null; then
        DOMAIN_IP=$(dig +short $DOMAIN_NAME | tail -n1)
        
        if [ "$DOMAIN_IP" != "$SERVER_IP" ]; then
            log_warning "DNS записи могут быть не настроены!"
            log_warning "Домен $DOMAIN_NAME -> $DOMAIN_IP"
            log_warning "Сервер IP: $SERVER_IP"
            read -p "Продолжить? (y/n): " CONTINUE
            if [ "$CONTINUE" != "y" ]; then
                exit 1
            fi
        fi
    else
        log_warning "dig не установлен, пропускаем проверку DNS"
        log_warning "Убедитесь что A-запись домена $DOMAIN_NAME указывает на $SERVER_IP"
        read -p "Продолжить? (y/n): " CONTINUE
        if [ "$CONTINUE" != "y" ]; then
            exit 1
        fi
    fi
    
    # Проверяем/создаем директорию для acme-challenge
    mkdir -p /var/www/certbot
    chmod 755 /var/www/certbot
    
    # Проверяем файрвол
    log_info "Проверка файрвола..."
    if command -v ufw &> /dev/null; then
        if ufw status | grep -q "Status: active"; then
            log_info "Файрвол активен, проверяем порты 80 и 443..."
            ufw allow 80/tcp 2>/dev/null || true
            ufw allow 443/tcp 2>/dev/null || true
            log_success "Порты 80 и 443 открыты в файрволе"
        fi
    fi
    
    # Убеждаемся что Nginx настроен для acme-challenge
    ensure_acme_challenge_config $DOMAIN_NAME
    
    # Проверяем что Nginx работает и слушает порт 80
    if ! systemctl is-active --quiet nginx; then
        log_error "Nginx не запущен. Запускаем..."
        systemctl start nginx
    fi
    
    log_info "Проверяем что порт 80 доступен извне..."
    if ! curl -s -m 5 http://$DOMAIN_NAME > /dev/null 2>&1; then
        log_warning "Домен $DOMAIN_NAME недоступен по HTTP"
        log_warning "Убедитесь что:"
        log_warning "  1. DNS A-запись домена указывает на $SERVER_IP"
        log_warning "  2. Порт 80 открыт в файрволе и у провайдера"
        log_warning "  3. Nginx слушает на порту 80"
        read -p "Продолжить несмотря на предупреждение? (y/n): " CONTINUE
        if [ "$CONTINUE" != "y" ]; then
            exit 1
        fi
    fi
    
    # Получаем сертификат
    certbot --nginx -d $DOMAIN_NAME --email $CERT_EMAIL --agree-tos --non-interactive --redirect
    
    # Обновляем конфигурацию сервера
    update_server_config $DOMAIN_NAME
    
    log_success "Let's Encrypt сертификат получен"
    
    # Настраиваем автообновление
    setup_cert_renewal
}

# Активация SSL конфигурации для самоподписанного сертификата
activate_ssl_config() {
    log_info "Активация SSL конфигурации..."
    
    # Обновляем SSL конфигурацию с правильными путями
    sed -i "s|ssl_certificate /etc/ssl/certs/${APP_NAME}.crt;|ssl_certificate $SSL_DIR/certs/${APP_NAME}.crt;|g" $NGINX_AVAILABLE/${APP_NAME}-ssl
    sed -i "s|ssl_certificate_key /etc/ssl/private/${APP_NAME}.key;|ssl_certificate_key $SSL_DIR/private/${APP_NAME}.key;|g" $NGINX_AVAILABLE/${APP_NAME}-ssl
    
    # Заменяем server_name на IP
    sed -i "s|server_name .*;|server_name $SERVER_IP;|g" $NGINX_AVAILABLE/${APP_NAME}-ssl
    
    # Деактивируем HTTP конфигурацию
    rm -f $NGINX_ENABLED/$APP_NAME
    
    # Активируем SSL конфигурацию
    ln -sf $NGINX_AVAILABLE/${APP_NAME}-ssl $NGINX_ENABLED/${APP_NAME}-ssl
    
    # Проверяем и перезапускаем
    nginx -t && systemctl reload nginx
    
    log_success "SSL конфигурация активирована"
}

# Обеспечиваем наличие конфигурации для acme-challenge
ensure_acme_challenge_config() {
    local DOMAIN=$1
    local CONFIG_FILE="$NGINX_ENABLED/$APP_NAME"
    
    log_info "Проверка конфигурации Nginx для acme-challenge..."
    
    # Если конфигурация существует, проверяем наличие location для acme-challenge
    if [ -f "$CONFIG_FILE" ]; then
        if ! grep -q "/.well-known/acme-challenge/" "$CONFIG_FILE"; then
            log_info "Добавление location для acme-challenge в конфигурацию Nginx..."
            
            # Простое добавление location перед первым location блоком
            sed -i '/^[[:space:]]*location[[:space:]]/{i\
    location /.well-known/acme-challenge/ {\
        root /var/www/certbot;\
    }\
' -e ':a;n;ba}' "$CONFIG_FILE" 2>/dev/null || {
                # Если sed не сработал, используем другой метод
                # Добавляем перед server_name или после него
                sed -i '/server_name/a\
\
    location /.well-known/acme-challenge/ {\
        root /var/www/certbot;\
    }' "$CONFIG_FILE"
            }
        fi
    else
        # Создаем базовую конфигурацию для HTTP с acme-challenge
        log_info "Создание базовой HTTP конфигурации для acme-challenge..."
        mkdir -p "$NGINX_AVAILABLE"
        cat > "$NGINX_AVAILABLE/$APP_NAME" << 'EOFCONFIG'
upstream smart_assistant_backend {
    server 127.0.0.1:5000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name DOMAIN_PLACEHOLDER;

    root APP_DIR_PLACEHOLDER/client/dist;
    index index.html;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location /api {
        proxy_pass http://smart_assistant_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOFCONFIG
        # Заменяем плейсхолдеры
        sed -i "s|DOMAIN_PLACEHOLDER|$DOMAIN|g" "$NGINX_AVAILABLE/$APP_NAME"
        sed -i "s|APP_DIR_PLACEHOLDER|$APP_DIR|g" "$NGINX_AVAILABLE/$APP_NAME"
        
        mkdir -p "$NGINX_ENABLED"
        ln -sf "$NGINX_AVAILABLE/$APP_NAME" "$NGINX_ENABLED/$APP_NAME"
    fi
    
    # Проверяем конфигурацию и перезагружаем Nginx
    if nginx -t; then
        systemctl reload nginx
        log_success "Конфигурация Nginx обновлена для acme-challenge"
    else
        log_error "Ошибка в конфигурации Nginx"
        exit 1
    fi
}

# Обновление конфигурации сервера
update_server_config() {
    local DOMAIN=$1
    
    log_info "Обновление конфигурации приложения..."
    
    # Обновляем CORS_ORIGIN в .env
    ENV_FILE="$APP_DIR/server/.env"
    if [ -f "$ENV_FILE" ]; then
        sed -i "s|CORS_ORIGIN=.*|CORS_ORIGIN=https://$DOMAIN|g" $ENV_FILE
    fi
    
    # Перезапускаем приложение
    pm2 restart $APP_NAME 2>/dev/null || true
    
    log_success "Конфигурация обновлена"
}

# Настройка автообновления сертификата
setup_cert_renewal() {
    log_info "Настройка автообновления сертификата..."
    
    # Проверяем что cron задача существует
    if ! crontab -l 2>/dev/null | grep -q "certbot renew"; then
        # Добавляем cron задачу
        (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet && systemctl reload nginx") | crontab -
        log_success "Автообновление настроено (каждый день в 12:00)"
    else
        log_info "Автообновление уже настроено"
    fi
}

# Проверка SSL
test_ssl() {
    log_info "Проверка SSL..."
    
    if [ "$SSL_CHOICE" = "1" ]; then
        # Самоподписанный
        if curl -k -s https://$SERVER_IP > /dev/null; then
            log_success "SSL работает (самоподписанный)"
        else
            log_warning "Не удалось подключиться по HTTPS"
        fi
    else
        # Let's Encrypt
        if curl -s https://$DOMAIN_NAME > /dev/null; then
            log_success "SSL работает (Let's Encrypt)"
        else
            log_warning "Не удалось подключиться по HTTPS"
        fi
    fi
}

# Вывод информации
print_info() {
    echo ""
    echo "============================================================"
    echo -e "${GREEN}SSL настроен успешно!${NC}"
    echo "============================================================"
    echo ""
    
    if [ "$SSL_CHOICE" = "1" ]; then
        echo "Тип: Самоподписанный сертификат"
        echo "Адрес: https://$SERVER_IP"
        echo ""
        echo -e "${YELLOW}ВНИМАНИЕ: Браузер покажет предупреждение о небезопасном сертификате.${NC}"
        echo "Это нормально для самоподписанных сертификатов."
        echo ""
        echo "Файлы сертификата:"
        echo "  Сертификат: $SSL_DIR/certs/${APP_NAME}.crt"
        echo "  Ключ:       $SSL_DIR/private/${APP_NAME}.key"
    else
        echo "Тип: Let's Encrypt"
        echo "Домен: $DOMAIN_NAME"
        echo "Адрес: https://$DOMAIN_NAME"
        echo ""
        echo "Сертификат будет автоматически обновляться."
        echo ""
        echo "Для ручного обновления:"
        echo "  sudo certbot renew"
    fi
    echo ""
    echo "============================================================"
}

# Главная функция
main() {
    echo "============================================================"
    echo "Smart Assistant - Настройка SSL"
    echo "============================================================"
    echo ""
    
    check_root
    get_server_ip
    select_ssl_type
    
    case $SSL_CHOICE in
        1)
            create_self_signed_cert
            ;;
        2)
            get_letsencrypt_cert
            ;;
        *)
            log_error "Неверный выбор"
            exit 1
            ;;
    esac
    
    test_ssl
    print_info
}

# Запуск
main "$@"

