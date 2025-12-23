import mongoose from 'mongoose';
import { config } from './config/env.js';
import Admin from './models/Admin.js';

// Обновление email администратора
const updateAdminEmail = async () => {
  try {
    console.log('═'.repeat(50));
    console.log('📧 Обновление email администратора');
    console.log('═'.repeat(50));
    
    // Подключение к базе данных
    console.log('\n📡 Подключение к MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Подключение успешно!');
    
    // Получаем админа
    const admin = await Admin.findOne();
    if (!admin) {
      console.log('❌ Администратор не найден в базе данных');
      await mongoose.disconnect();
      return;
    }
    
    console.log('\n👤 Текущие данные администратора:');
    console.log('   Email (login):', admin.email);
    console.log('   Notification Email:', admin.notificationEmail || '(не установлен)');
    
    // Валидация email
    const isValidEmail = (email) => {
      if (!email || typeof email !== 'string') return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email.trim());
    };
    
    // Если есть SMTP_USER и он валиден, предлагаем использовать его
    if (config.SMTP_USER && isValidEmail(config.SMTP_USER)) {
      console.log('\n💡 Рекомендация: Использовать SMTP_USER как notificationEmail');
      console.log('   SMTP_USER:', config.SMTP_USER);
      
      if (!admin.notificationEmail || !isValidEmail(admin.notificationEmail)) {
        admin.notificationEmail = config.SMTP_USER;
        await admin.save();
        console.log('\n✅ NotificationEmail обновлён на:', config.SMTP_USER);
      } else {
        console.log('\n✅ NotificationEmail уже установлен корректно');
      }
    } else {
      console.log('\n⚠️  SMTP_USER не установлен или невалиден');
      console.log('   Установите ADMIN_NOTIFICATION_EMAIL в .env или обновите через API');
    }
    
    // Показываем финальные данные
    await admin.refresh();
    console.log('\n📋 Итоговые данные:');
    console.log('   Email (login):', admin.email);
    console.log('   Notification Email:', admin.notificationEmail || '(не установлен)');
    
    await mongoose.disconnect();
    console.log('\n✅ Обновление завершено');
    console.log('═'.repeat(50));
    
  } catch (error) {
    console.error('❌ Ошибка при обновлении:', error);
    process.exit(1);
  }
};

// Запуск
updateAdminEmail();



