#!/bin/bash

# ============================================================
# Smart Assistant - Обновление домена
# ============================================================
# Используйте этот скрипт когда получите доменное имя
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

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "Этот скрипт должен быть запущен с правами root (sudo)"
        exit 1
    fi
}

main() {
    check_root
    
    echo "============================================================"
    echo "Smart Assistant - Обновление домена"
    echo "============================================================"
    echo ""
    
    # Получаем IP (используем предустановленный IP по умолчанию)
    DEFAULT_SERVER_IP="34.88.173.3"
    SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "$DEFAULT_SERVER_IP")
    
    # Если автоматическое определение не удалось, используем дефолтный IP
    if [ -z "$SERVER_IP" ] || [ "$SERVER_IP" = "" ]; then
        SERVER_IP="$DEFAULT_SERVER_IP"
    fi
    
    log_info "IP адрес сервера: $SERVER_IP"
    
    # Запрашиваем домен
    read -p "Введите доменное имя: " DOMAIN_NAME
    read -p "Введите email для SSL сертификата: " CERT_EMAIL
    
    if [ -z "$DOMAIN_NAME" ] || [ -z "$CERT_EMAIL" ]; then
        log_error "Домен и email обязательны"
        exit 1
    fi
    
    # Проверяем DNS
    log_info "Проверка DNS..."
    DOMAIN_IP=$(dig +short $DOMAIN_NAME | tail -n1)
    
    if [ "$DOMAIN_IP" != "$SERVER_IP" ]; then
        log_warning "DNS записи могут быть не настроены!"
        log_warning "Домен $DOMAIN_NAME -> $DOMAIN_IP"
        log_warning "Сервер IP: $SERVER_IP"
        echo ""
        echo "Убедитесь что A-запись домена указывает на $SERVER_IP"
        read -p "Продолжить? (y/n): " CONTINUE
        if [ "$CONTINUE" != "y" ]; then
            exit 1
        fi
    fi
    
    # Обновляем Nginx
    log_info "Обновление Nginx..."
    
    cat > /etc/nginx/sites-available/$APP_NAME << EOF
upstream smart_assistant_backend {
    server 127.0.0.1:5000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN_NAME www.$DOMAIN_NAME;

    root $APP_DIR/client/dist;
    index index.html;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location /api {
        proxy_pass http://smart_assistant_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files \$uri =404;
    }

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

    nginx -t && systemctl reload nginx
    
    # Получаем SSL
    log_info "Получение Let's Encrypt сертификата..."
    certbot --nginx -d $DOMAIN_NAME -d www.$DOMAIN_NAME --email $CERT_EMAIL --agree-tos --non-interactive --redirect
    
    # Обновляем .env
    log_info "Обновление конфигурации приложения..."
    sed -i "s|CORS_ORIGIN=.*|CORS_ORIGIN=https://$DOMAIN_NAME|g" $APP_DIR/server/.env
    
    # Перезапускаем приложение
    pm2 restart $APP_NAME
    
    # Настраиваем автообновление сертификата
    if ! crontab -l 2>/dev/null | grep -q "certbot renew"; then
        (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet && systemctl reload nginx") | crontab -
    fi
    
    echo ""
    echo "============================================================"
    echo -e "${GREEN}Домен настроен успешно!${NC}"
    echo "============================================================"
    echo ""
    echo "🌐 Сайт: https://$DOMAIN_NAME"
    echo "🔐 Админ: https://$DOMAIN_NAME/admin"
    echo ""
    echo "SSL сертификат будет автоматически обновляться."
    echo "============================================================"
}

main "$@"

