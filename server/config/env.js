import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем директорию текущего файла (для ES модулей)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загружаем .env файл из директории server (родительская директория config)
const envPath = path.resolve(__dirname, '..', '.env');
const result = dotenv.config({ path: envPath });

// Предупреждение если .env файл не найден (но не критично - можно использовать переменные окружения системы)
if (result.error && result.error.code !== 'ENOENT') {
  console.warn(`⚠️ Предупреждение при загрузке .env: ${result.error.message}`);
}

export const config = {
  // Основные настройки
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  
  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-assistant',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  
  // Администратор
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'gab1m1ll3r@gmail.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123!',
  ADMIN_NOTIFICATION_EMAIL: process.env.ADMIN_NOTIFICATION_EMAIL || '',
  
  // Ротация паролей
  PASSWORD_ROTATION_DAYS: parseInt(process.env.PASSWORD_ROTATION_DAYS, 10) || 7,
  
  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  
  // SMTP настройки для отправки email
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: parseInt(process.env.SMTP_PORT, 10) || 587,
  SMTP_SECURE: process.env.SMTP_SECURE || 'false',
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  SMTP_FROM: process.env.SMTP_FROM || '',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 минут
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  
  // Безопасность
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12,
  MAX_LOGIN_ATTEMPTS: parseInt(process.env.MAX_LOGIN_ATTEMPTS, 10) || 5,
  LOCK_TIME_MINUTES: parseInt(process.env.LOCK_TIME_MINUTES, 10) || 30,
};

// Валидация обязательных переменных в production
if (config.NODE_ENV === 'production') {
  const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Отсутствуют обязательные переменные окружения:', missingVars.join(', '));
    process.exit(1);
  }
  
  // Предупреждение о небезопасных настройках
  if (config.JWT_SECRET.includes('change-this')) {
    console.warn('⚠️ ВНИМАНИЕ: Используется небезопасный JWT_SECRET!');
  }
  
  if (!config.SMTP_HOST) {
    console.warn('⚠️ ВНИМАНИЕ: SMTP не настроен. Email уведомления не будут отправляться.');
  }
}
