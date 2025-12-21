import mongoose from 'mongoose';

const connectDB = async (config) => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

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
      });
      console.log('Дефолтный админ создан');
    }
  } catch (error) {
    console.error('Ошибка создания дефолтного админа:', error.message);
  }
};

export default connectDB;
