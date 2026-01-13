# Исправление запуска PM2

## Проблема
Сервер запущен через `pm2 start index.js` вместо правильной команды через `ecosystem.config.cjs`, что приводит к:
- Режиму development вместо production
- Неправильному CORS (localhost вместо домена)
- Неправильной загрузке переменных окружения

## Решение

### 1. Остановите текущий процесс
```bash
pm2 stop all
pm2 delete all
```

### 2. Запустите через ecosystem.config.cjs
```bash
cd /var/www/smart-assistant
pm2 start ecosystem.config.cjs --env production
pm2 save
```

### 3. Проверьте статус
```bash
pm2 status
pm2 logs smart-assistant
```

### 4. Убедитесь что в логах:
- `🌍 Режим: production` (не development)
- `📱 CORS: https://ai-guide-buketov.online` (не localhost)

## Настройка SMTP в .env

Убедитесь что в `/var/www/smart-assistant/server/.env` установлены:
```env
NODE_ENV=production
CORS_ORIGIN=https://ai-guide-buketov.online
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ваш-email@gmail.com
SMTP_PASS=ваш-пароль-приложения
```

## Обновление email админа в БД

После настройки SMTP:
```bash
cd /var/www/smart-assistant/server
npm run update-admin-email
```

Это обновит `notificationEmail` админа на значение из `SMTP_USER`.


