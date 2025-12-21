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
    SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')
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
    
    # Проверяем что домен указывает на этот сервер
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

