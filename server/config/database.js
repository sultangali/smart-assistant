import mongoose from 'mongoose';

const connectDB = async (config) => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI);

    console.log(`MongoDB подключен: ${conn.connection.host}`);
    
    // Создание дефолтного админа при первом запуске
    await createDefaultAdmin(config);
    
    return conn;
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error.message);
    process.exit(1);
  }
};

const createDefaultAdmin = async (config) => {
  try {
    const { default: Admin } = await import('../models/Admin.js');
    
    const existingAdmin = await Admin.findOne({ email: config.ADMIN_EMAIL });
    
    if (!existingAdmin) {
      await Admin.create({
        email: config.ADMIN_EMAIL,
        password: config.ADMIN_PASSWORD,
        passwordRotationDays: config.PASSWORD_ROTATION_DAYS || 7,
        notificationEmail: config.ADMIN_NOTIFICATION_EMAIL || config.ADMIN_EMAIL,
      });
      console.log('✅ Дефолтный админ создан');
    } else {
      // Обновляем настройки ротации паролей, если они изменились
      if (existingAdmin.passwordRotationDays !== (config.PASSWORD_ROTATION_DAYS || 7)) {
        existingAdmin.passwordRotationDays = config.PASSWORD_ROTATION_DAYS || 7;
        await existingAdmin.save();
      }
      if (!existingAdmin.notificationEmail && config.ADMIN_NOTIFICATION_EMAIL) {
        existingAdmin.notificationEmail = config.ADMIN_NOTIFICATION_EMAIL;
        await existingAdmin.save();
      }
    }
  } catch (error) {
    console.error('❌ Ошибка создания дефолтного админа:', error.message);
  }
};

export default connectDB;
