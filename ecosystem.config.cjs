/**
 * PM2 Ecosystem Configuration
 * Smart Assistant - Production Deployment
 */

module.exports = {
  apps: [
    {
      name: 'smart-assistant',
      script: './server/index.js',
      cwd: '/var/www/smart-assistant',
      
      // Режим работы
      instances: 'max', // Использовать все ядра CPU
      exec_mode: 'cluster', // Кластерный режим для балансировки нагрузки
      
      // Автоперезапуск
      autorestart: true,
      watch: false, // Отключено в production
      max_memory_restart: '1G',
      
      // Переменные окружения
      // dotenv.config() в коде автоматически загрузит переменные из ./server/.env
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      
      // Логирование
      log_file: '/var/log/pm2/smart-assistant.log',
      out_file: '/var/log/pm2/smart-assistant-out.log',
      error_file: '/var/log/pm2/smart-assistant-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
      
      // Перезапуск при сбоях
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000,
      
      // Мониторинг
      exp_backoff_restart_delay: 100,
      
      // Node.js опции
      node_args: [
        '--max-old-space-size=1024',
      ],
    },
  ],
  
  // Деплой конфигурация (опционально)
  deploy: {
    production: {
      user: 'root',
      host: ['YOUR_SERVER_IP'],
      ref: 'origin/main',
      repo: 'git@github.com:sultangali/smart-assistant.git',
      path: '/var/www/smart-assistant',
      'pre-deploy-local': '',
      'post-deploy': 'cd server && npm install && cd ../client && npm install && npm run build && pm2 reload ecosystem.config.cjs --env production',
      'pre-setup': '',
      ssh_options: 'StrictHostKeyChecking=no',
    },
  },
};

