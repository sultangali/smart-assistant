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

// Детальная проверка данных
const debugKazakhData = async () => {
  try {
    console.log('🔍 Детальная проверка данных казахского языка...');
    
    // Находим один документ для детального анализа
    const content = await Content.findOne({});
    
    if (!content) {
      console.log('❌ Документы не найдены');
      return;
    }
    
    console.log(`📊 Анализируем документ: ${content.key}`);
    console.log('Структура translations:', JSON.stringify(content.translations, null, 2));
    
    // Проверяем наличие казахского языка
    console.log('\n🔍 Проверка казахского языка:');
    console.log(`- content.translations.kk: ${content.translations.kk}`);
    console.log(`- typeof content.translations.kk: ${typeof content.translations.kk}`);
    console.log(`- content.translations.kk === undefined: ${content.translations.kk === undefined}`);
    console.log(`- content.translations.kk === null: ${content.translations.kk === null}`);
    console.log(`- !content.translations.kk: ${!content.translations.kk}`);
    
    // Проверяем все языки
    console.log('\n🌍 Все языки:');
    Object.keys(content.translations).forEach(lang => {
      console.log(`- ${lang}: ${typeof content.translations[lang]}`);
    });
    
    // Принудительно обновляем один документ
    console.log('\n🔄 Принудительно обновляем документ...');
    content.translations.kk = {
      title: '',
      subtitle: '',
      content: '',
      description: '',
      placeholder: '',
      button: '',
      label: '',
      value: ''
    };
    
    await content.save();
    console.log('✅ Документ обновлен');
    
    // Проверяем результат
    const updatedContent = await Content.findById(content._id);
    console.log('\n📊 После обновления:');
    console.log(`- Казахский язык: ${updatedContent.translations.kk ? '✅' : '❌'}`);
    console.log(`- Поля: ${Object.keys(updatedContent.translations.kk || {})}`);
    
  } catch (error) {
    console.error('❌ Ошибка при проверке данных:', error);
  }
};

// Основная функция
const main = async () => {
  await connectDB();
  await debugKazakhData();
  
  console.log('\n🏁 Проверка завершена');
  process.exit(0);
};

// Запуск проверки
main().catch(error => {
  console.error('❌ Критическая ошибка:', error);
  process.exit(1);
});
