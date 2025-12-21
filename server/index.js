import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { config } from './config/env.js';
import connectDB from './config/database.js';
import { startPasswordRotationScheduler } from './services/passwordRotationService.js';

// Импорт роутов
import authRoutes from './routes/auth.js';
import toolRoutes from './routes/tools.js';
import feedbackRoutes from './routes/feedback.js';
import statsRoutes from './routes/stats.js';
import contentRoutes from './routes/content.js';
import i18nRoutes from './routes/i18n.js';

const app = express();

// Подключение к базе данных
connectDB(config).then(() => {
  // Запускаем планировщик ротации паролей после подключения к БД
  if (config.NODE_ENV !== 'test') {
    startPasswordRotationScheduler();
  }
});

// ==================== БЕЗОПАСНОСТЬ ====================

// Helmet для защиты HTTP заголовков
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      // Разрешаем подключения к тому же источнику и CORS_ORIGIN
      // В development также разрешаем localhost:5000 для прямых запросов
      connectSrc: config.NODE_ENV === 'development' 
        ? ["'self'", config.CORS_ORIGIN, "http://localhost:5000", "ws://localhost:5000"]
        : ["'self'", config.CORS_ORIGIN],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// Защита от XSS через заголовки
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// CORS настройки
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = config.CORS_ORIGIN.split(',').map(o => o.trim());
    // Разрешаем запросы без origin (например, от мобильных приложений или Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS не разрешен для этого источника'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400, // 24 часа
};

app.use(cors(corsOptions));

// Rate limiting - общий
                                                                                                                                                                                                                                                                                        const generalLimiter = rateLimit({
                                                                                                                                                                                                                                                                                          windowMs: config.RATE_LIMIT_WINDOW_MS,
                                                                                                                                                                                                                                                                                          max: config.RATE_LIMIT_MAX_REQUESTS,
                                                                                                                                                                                                                                                                                          message: {
                                                                                                                                                                                                                                                                                            success: false,
                                                                                                                                                                                                                                                                                            message: 'Слишком много запросов. Попробуйте позже.',
                                                                                                                                                                                                                                                                                          },
                                                                                                                                                                                                                                                                                          standardHeaders: true,
                                                                                                                                                                                                                                                                                          legacyHeaders: false,
                                                                                                                                                                                                                                                                                          // Пропускаем rate limit для доверенных IP (можно настроить)
                                                                                                                                                                                                                                                                                          skip: (req) => {
                                                                                                                                                                                                                                                                                            const trustedIPs = ['127.0.0.1', '::1'];
                                                                                                                                                                                                                                                                                            return config.NODE_ENV === 'development' && trustedIPs.includes(req.ip);
                                                                                                                                                                                                                                                                                          },
                                                                                                                                                                                                                                                                                        });

// Строгий rate limit для авторизации
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 10, // Максимум 10 попыток
  message: {
    success: false,
    message: 'Слишком много попыток входа. Попробуйте через 15 минут.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limit для API
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 минута
  max: 60, // 60 запросов в минуту
  message: {
    success: false,
    message: 'Превышен лимит запросов к API.',
  },
});

// Применяем rate limiting
// Закомментировано для отключения лимитов запросов
// Раскомментируйте при необходимости для production
// app.use('/api/', generalLimiter);
// app.use('/api/auth/login', authLimiter);
// app.use('/api/i18n', apiLimiter);

// Парсинг JSON с ограничением размера
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ==================== MIDDLEWARE ДЛЯ САНИТИЗАЦИИ ====================

// Защита от NoSQL injection атак
app.use(mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    console.warn(`⚠️ Обнаружена попытка NoSQL injection: ${key}`);
  }
}));

// Санитизация входных данных
const sanitizeInput = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  const sanitized = Array.isArray(obj) ? [] : {};
  
  for (const key in obj) {
    let value = obj[key];
    
    // Удаляем опасные ключи
    if (key.startsWith('$') || key.includes('.')) continue;
    
    if (typeof value === 'string') {
      // Базовая санитизация строк
      value = value
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '');
    } else if (typeof value === 'object') {
      value = sanitizeInput(value);
    }
    
    sanitized[key] = value;
  }
  
  return sanitized;
};

app.use((req, res, next) => {
  if (req.body) {
    req.body = sanitizeInput(req.body);
  }
  if (req.query) {
    req.query = sanitizeInput(req.query);
  }
  next();
});

// ==================== РОУТЫ ====================

app.use('/api/auth', authRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/i18n', i18nRoutes);

// Базовый роут
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Smart Assistant API работает',
    version: '2.0.0',
    environment: config.NODE_ENV,
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// Обработка 404
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API эндпойнт не найден',
  });
});

// ==================== ОБРАБОТКА ОШИБОК ====================

// Обработка ошибок CORS
app.use((err, req, res, next) => {
  if (err.message === 'CORS не разрешен для этого источника') {
    return res.status(403).json({
      success: false,
      message: 'Доступ запрещен (CORS)',
    });
  }
  next(err);
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
  console.error('❌ Ошибка сервера:', err.stack);
  
  // Не раскрываем детали ошибок в production
  const message = config.NODE_ENV === 'production' 
    ? 'Внутренняя ошибка сервера' 
    : err.message;
  
  res.status(err.status || 500).json({
    success: false,
    message,
    ...(config.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// ==================== ЗАПУСК СЕРВЕРА ====================

const PORT = config.PORT;

const server = app.listen(PORT, () => {
  console.log('═'.repeat(50));
  console.log(`🚀 Smart Assistant Server v2.0.0`);
  console.log('═'.repeat(50));
  console.log(`📡 Порт: ${PORT}`);
  console.log(`🌍 Режим: ${config.NODE_ENV}`);
  console.log(`📱 CORS: ${config.CORS_ORIGIN}`);
  console.log(`🔒 Rate Limiting: ${config.RATE_LIMIT_MAX_REQUESTS} req / ${config.RATE_LIMIT_WINDOW_MS / 60000} min`);
  console.log(`🔑 Ротация паролей: каждые ${config.PASSWORD_ROTATION_DAYS} дней`);
  console.log('═'.repeat(50));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Получен сигнал SIGTERM. Завершение работы...');
  server.close(() => {
    console.log('✅ Сервер остановлен');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Получен сигнал SIGINT. Завершение работы...');
  server.close(() => {
    console.log('✅ Сервер остановлен');
    process.exit(0);
  });
});

export default app;
