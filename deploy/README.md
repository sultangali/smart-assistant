# 🚀 Smart Assistant - Руководство по деплою

## Быстрый старт (рекомендуется)

Используйте полный скрипт деплоя для автоматической установки всех компонентов:

```bash
# На VPS сервере
wget https://raw.githubusercontent.com/sultangali/smart-assistant/main/deploy/05-full-deploy.sh
chmod +x 05-full-deploy.sh
sudo ./05-full-deploy.sh
```

## Пошаговый деплой

Если хотите контролировать каждый шаг:

### 1. Установка зависимостей

```bash
sudo ./01-install-dependencies.sh
```

Устанавливает:
- MongoDB 7.0
- Node.js 20 LTS
- Nginx
- PM2
- Certbot
- Git, nano и другие утилиты

### 2. Деплой приложения

```bash
./02-deploy-app.sh
```

Выполняет:
- Клонирование репозитория
- Установку npm зависимостей
- Сборку фронтенда
- Настройку переменных окружения
- Запуск через PM2

### 3. Настройка Nginx

```bash
sudo ./03-setup-nginx.sh
```

Настраивает:
- Reverse proxy для API
- Статические файлы
- Gzip сжатие
- Безопасные заголовки

### 4. Настройка SSL

```bash
sudo ./04-setup-ssl.sh
```

Варианты:
- **Самоподписанный** - для IP адреса
- **Let's Encrypt** - для домена

### 5. Обновление домена (позже)

Когда получите доменное имя:

```bash
sudo ./06-update-domain.sh
```

## Структура файлов

```
deploy/
├── 01-install-dependencies.sh  # Установка зависимостей
├── 02-deploy-app.sh           # Деплой приложения
├── 03-setup-nginx.sh          # Настройка Nginx
├── 04-setup-ssl.sh            # Настройка SSL
├── 05-full-deploy.sh          # Полный автоматический деплой
├── 06-update-domain.sh        # Обновление домена
└── README.md                  # Это руководство
```

## Требования к серверу

- **ОС**: Ubuntu 20.04/22.04 или Debian 11/12
- **RAM**: минимум 1 GB (рекомендуется 2 GB)
- **CPU**: 1 vCPU (рекомендуется 2)
- **Диск**: 20 GB SSD
- **Сеть**: открытые порты 22, 80, 443

## Настройка Google Cloud Console

1. Создайте VM Instance:
   - Machine type: e2-micro (бесплатный) или e2-small
   - Boot disk: Ubuntu 22.04 LTS
   - Firewall: Allow HTTP, Allow HTTPS

2. Подключитесь по SSH:
   ```bash
   gcloud compute ssh YOUR_INSTANCE_NAME
   ```

3. Запустите деплой:
   ```bash
   sudo apt update && sudo apt install -y git
   git clone git@github.com:sultangali/smart-assistant.git
   cd smart-assistant/deploy
   chmod +x *.sh
   sudo ./05-full-deploy.sh
   ```

## Полезные команды

### PM2

```bash
pm2 status              # Статус приложения
pm2 logs smart-assistant # Просмотр логов
pm2 restart smart-assistant # Перезапуск
pm2 stop smart-assistant # Остановка
pm2 monit               # Мониторинг в реальном времени
```

### Nginx

```bash
sudo nginx -t           # Проверка конфигурации
sudo systemctl reload nginx # Перезагрузка
sudo tail -f /var/log/nginx/smart-assistant_access.log # Логи
```

### MongoDB

```bash
mongosh                 # Подключение к MongoDB
sudo systemctl status mongod # Статус
```

### SSL

```bash
sudo certbot certificates # Список сертификатов
sudo certbot renew --dry-run # Тест обновления
```

## Обновление приложения

```bash
cd /var/www/smart-assistant
git pull origin main
cd client && npm ci && npm run build
cd ../server && npm ci
pm2 restart smart-assistant
```

## Резервное копирование

### База данных

```bash
mongodump --db smart-assistant --out /backup/$(date +%Y%m%d)
```

### Восстановление

```bash
mongorestore --db smart-assistant /backup/20240101/smart-assistant
```

## Переменные окружения

Файл `/var/www/smart-assistant/server/.env`:

| Переменная | Описание |
|------------|----------|
| `NODE_ENV` | production |
| `PORT` | 5000 |
| `MONGODB_URI` | Строка подключения MongoDB |
| `JWT_SECRET` | Секретный ключ JWT |
| `ADMIN_EMAIL` | Логин админа |
| `ADMIN_PASSWORD` | Пароль админа |
| `CORS_ORIGIN` | URL фронтенда |
| `SMTP_*` | Настройки почты |

## Безопасность

- ✅ Файрвол UFW настроен
- ✅ SSL/TLS шифрование
- ✅ Безопасные HTTP заголовки
- ✅ Rate limiting (опционально)
- ✅ Автоматическая ротация паролей

## Поддержка

При возникновении проблем:

1. Проверьте логи: `pm2 logs smart-assistant`
2. Проверьте Nginx: `sudo tail -f /var/log/nginx/error.log`
3. Проверьте MongoDB: `sudo systemctl status mongod`

## Лицензия

MIT License

