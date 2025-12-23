import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

async function updateAdminEmail() {
  try {
    console.log('══════════════════════════════════════════════════');
    console.log('📧 Обновление email администратора');
    console.log('══════════════════════════════════════════════════');
    
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-assistant';
    console.log('📡 Подключение к MongoDB...');
    
    await mongoose.connect(mongoUri);
    console.log('✅ Подключение успешно!');
    
    // Получаем админа
    const admin = await Admin.findOne({ email: 'admin' });
    
    if (!admin) {
      console.error('❌ Администратор не найден');
      process.exit(1);
    }
    
    console.log('👤 Администратор найден:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Notification Email: ${admin.notificationEmail || '(не установлен)'}`);
    
    // Проверяем SMTP_USER из .env
    const smtpUser = process.env.SMTP_USER;
    
    if (smtpUser && isValidEmail(smtpUser)) {
      console.log(`\n📧 Обновление notificationEmail на ${smtpUser}...`);
      admin.notificationEmail = smtpUser;
      await admin.save();
      console.log('✅ NotificationEmail обновлен!');
    } else {
      console.log('\n⚠️ SMTP_USER не установлен или невалиден в .env файле');
      console.log('   Установите SMTP_USER в .env файле для автоматического обновления');
      
      // Предлагаем ввести email вручную
      const readline = await import('readline');
      const rl = readline.default.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const email = await new Promise((resolve) => {
        rl.question('Введите email для уведомлений (или нажмите Enter чтобы пропустить): ', (answer) => {
          rl.close();
          resolve(answer.trim());
        });
      });
      
      if (email && isValidEmail(email)) {
        admin.notificationEmail = email;
        await admin.save();
        console.log('✅ NotificationEmail обновлен!');
      } else if (email) {
        console.log('❌ Введен невалидный email');
      } else {
        console.log('⏭️  Обновление пропущено');
      }
    }
    
    console.log('\n📋 Текущие настройки:');
    const updatedAdmin = await Admin.findOne({ email: 'admin' });
    console.log(`   Email: ${updatedAdmin.email}`);
    console.log(`   Notification Email: ${updatedAdmin.notificationEmail || '(не установлен)'}`);
    
    console.log('\n══════════════════════════════════════════════════');
    console.log('✅ Обновление завершено');
    console.log('══════════════════════════════════════════════════');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка:', error);
    process.exit(1);
  }
}

updateAdminEmail();

