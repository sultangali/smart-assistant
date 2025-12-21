import mongoose from 'mongoose';
import { config } from './config/env.js';
import { sendNewPasswordEmail } from './services/emailService.js';
import Admin from './models/Admin.js';

// Тестирование отправки email
const testEmailSending = async () => {
  try {
    console.log('═'.repeat(50));
    console.log('📧 Тестирование отправки email');
    console.log('═'.repeat(50));
    
    // Проверка конфигурации
    console.log('\n📋 Проверка конфигурации SMTP:');
    console.log('   SMTP_HOST:', config.SMTP_HOST || '❌ НЕ НАСТРОЕН');
    console.log('   SMTP_PORT:', config.SMTP_PORT);
    console.log('   SMTP_SECURE:', config.SMTP_SECURE);
    console.log('   SMTP_USER:', config.SMTP_USER || '❌ НЕ НАСТРОЕН');
    console.log('   SMTP_PASS:', config.SMTP_PASS ? '***' : '❌ НЕ НАСТРОЕН');
    console.log('   SMTP_FROM:', config.SMTP_FROM || config.SMTP_USER || '❌ НЕ НАСТРОЕН');
    
    if (!config.SMTP_HOST || !config.SMTP_USER || !config.SMTP_PASS) {
      console.log('\n⚠️  ВНИМАНИЕ: SMTP не настроен полностью!');
      console.log('   Установите следующие переменные в .env:');
      console.log('   - SMTP_HOST');
      console.log('   - SMTP_USER');
      console.log('   - SMTP_PASS');
      console.log('   - SMTP_FROM (опционально)');
      return;
    }
    
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
    
    const testEmail = admin.notificationEmail || admin.email;
    console.log('\n👤 Администратор найден:');
    console.log('   Email:', admin.email);
    console.log('   Notification Email:', testEmail);
    
    // Генерируем тестовый пароль
    const testPassword = Admin.generateSecurePassword(16);
    console.log('\n🔐 Тестовый пароль:', testPassword);
    
    // Отправляем тестовый email
    console.log('\n📧 Отправка тестового email...');
    const result = await sendNewPasswordEmail(testEmail, testPassword, 7);
    
    if (result.success) {
      console.log('✅ Email успешно отправлен!');
      console.log('   Message ID:', result.messageId);
      console.log('   Получатель:', testEmail);
    } else {
      console.log('❌ Ошибка отправки email:');
      console.log('   Причина:', result.message || result.error);
    }
    
    await mongoose.disconnect();
    console.log('\n✅ Тестирование завершено');
    console.log('═'.repeat(50));
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error);
    process.exit(1);
  }
};

// Запуск теста
testEmailSending();



