import mongoose from 'mongoose';
import Content from '../db/models/Content.js';
import { config } from '../config/env.js';

// Подключение к базе данных
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Подключение к MongoDB установлено');
  } catch (error) {
    console.error('❌ Ошибка подключения к MongoDB:', error);
    process.exit(1);
  }
};

// Проверка данных казахского языка
const checkKazakhData = async () => {
  try {
    console.log('🔍 Проверяем данные казахского языка...');
    
    // Находим несколько документов для проверки
    const contents = await Content.find({}).limit(5);
    
    console.log(`📊 Проверяем ${contents.length} документов:`);
    
    contents.forEach((content, index) => {
      console.log(`\n${index + 1}. Ключ: ${content.key}`);
      console.log(`   - Русский: ${content.translations.ru ? '✅' : '❌'}`);
      console.log(`   - Английский: ${content.translations.en ? '✅' : '❌'}`);
      console.log(`   - Казахский: ${content.translations.kk ? '✅' : '❌'}`);
      
      if (content.translations.kk) {
        console.log(`   - Поля казахского:`, Object.keys(content.translations.kk));
        console.log(`   - Пример значения: ${content.translations.kk.title || 'пусто'}`);
      }
    });
    
    // Проверяем общую статистику
    const totalContents = await Content.countDocuments({});
    const withKazakh = await Content.countDocuments({ 'translations.kk': { $exists: true } });
    
    console.log(`\n📈 Статистика:`);
    console.log(`   - Всего документов: ${totalContents}`);
    console.log(`   - С казахским языком: ${withKazakh}`);
    console.log(`   - Процент: ${((withKazakh / totalContents) * 100).toFixed(1)}%`);
    
  } catch (error) {
    console.error('❌ Ошибка при проверке данных:', error);
  }
};

// Основная функция
const main = async () => {
  await connectDB();
  await checkKazakhData();
  
  console.log('\n🏁 Проверка завершена');
  process.exit(0);
};

// Запуск проверки
main().catch(error => {
  console.error('❌ Критическая ошибка:', error);
  process.exit(1);
});
