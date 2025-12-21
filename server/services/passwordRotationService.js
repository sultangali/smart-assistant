import Admin from '../models/Admin.js';
import { sendNewPasswordEmail, sendPasswordExpirationWarning } from './emailService.js';
import { config } from '../config/env.js';

// Проверка и ротация паролей
export const checkAndRotatePasswords = async () => {
  console.log('🔄 Проверка необходимости ротации паролей...');
  
  try {
    const admins = await Admin.find();
    
    for (const admin of admins) {
      const daysSinceChange = Math.floor(
        (Date.now() - (admin.passwordLastChanged?.getTime() || 0)) / (1000 * 60 * 60 * 24)
      );
      
      const rotationDays = admin.passwordRotationDays || 7;
      const daysLeft = rotationDays - daysSinceChange;
      
      console.log(`👤 Админ ${admin.email}:`);
      console.log(`   - Дней с последней смены: ${daysSinceChange}`);
      console.log(`   - Период ротации: ${rotationDays} дней`);
      console.log(`   - Осталось дней: ${daysLeft}`);
      
      // Если пароль истек - ротация
      if (daysLeft <= 0) {
        console.log(`🔑 Ротация пароля для ${admin.email}...`);
        await rotateAdminPassword(admin);
      }
      // Если осталось 1-2 дня - предупреждение
      else if (daysLeft <= 2) {
        console.log(`⚠️ Отправка предупреждения для ${admin.email}...`);
        const notificationEmail = admin.notificationEmail || admin.email;
        await sendPasswordExpirationWarning(notificationEmail, daysLeft);
      }
    }
    
    console.log('✅ Проверка ротации паролей завершена');
  } catch (error) {
    console.error('❌ Ошибка при проверке ротации паролей:', error);
  }
};

// Ротация пароля для конкретного админа
export const rotateAdminPassword = async (admin) => {
  try {
    // Генерируем новый пароль
    const newPassword = Admin.generateSecurePassword(16);
    
    // Сохраняем новый пароль
    admin.password = newPassword;
    await admin.save();
    
    // Определяем email для уведомления
    const notificationEmail = admin.notificationEmail || admin.email;
    
    // Отправляем email с новым паролем
    console.log(`📧 Отправка нового пароля на ${notificationEmail}...`);
    const emailResult = await sendNewPasswordEmail(
      notificationEmail,
      newPassword,
      admin.passwordRotationDays || 7
    );
    
    if (emailResult.success) {
      console.log(`✅ Пароль для ${admin.email} успешно обновлен и отправлен на ${notificationEmail}`);
      console.log(`   Message ID: ${emailResult.messageId}`);
    } else {
      console.warn(`⚠️ Пароль обновлен, но email не отправлен!`);
      console.warn(`   Причина: ${emailResult.message || emailResult.error}`);
      console.warn(`   Код ошибки: ${emailResult.code || 'N/A'}`);
      console.warn(`   Получатель: ${notificationEmail}`);
      
      // Логируем пароль в консоль если email не настроен (только для разработки!)
      if (config.NODE_ENV === 'development') {
        console.log(`🔐 [DEV] Новый пароль для ${admin.email}: ${newPassword}`);
        console.log(`   ⚠️ ВНИМАНИЕ: В production пароль не будет показан в логах!`);
      }
    }
    
    return { success: true, newPassword };
  } catch (error) {
    console.error(`❌ Ошибка ротации пароля для ${admin.email}:`, error);
    return { success: false, error: error.message };
  }
};

// Принудительная ротация пароля (можно вызвать из API)
export const forceRotatePassword = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return { success: false, message: 'Администратор не найден' };
    }
    
    return await rotateAdminPassword(admin);
  } catch (error) {
    console.error('❌ Ошибка принудительной ротации:', error);
    return { success: false, error: error.message };
  }
};

// Установка интервала проверки (каждые 6 часов)
let rotationInterval = null;

export const startPasswordRotationScheduler = () => {
  // Запускаем проверку при старте
  checkAndRotatePasswords();
  
  // Запускаем проверку каждые 6 часов
  const sixHours = 6 * 60 * 60 * 1000;
  rotationInterval = setInterval(checkAndRotatePasswords, sixHours);
  
  console.log('📅 Планировщик ротации паролей запущен (каждые 6 часов)');
};

export const stopPasswordRotationScheduler = () => {
  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;
    console.log('🛑 Планировщик ротации паролей остановлен');
  }
};

// Ручной запуск ротации (для тестирования или принудительного запуска)
export const runManualRotationCheck = async () => {
  console.log('🔧 Ручной запуск проверки ротации паролей...');
  await checkAndRotatePasswords();
};

export default {
  checkAndRotatePasswords,
  rotateAdminPassword,
  forceRotatePassword,
  startPasswordRotationScheduler,
  stopPasswordRotationScheduler,
  runManualRotationCheck,
};

