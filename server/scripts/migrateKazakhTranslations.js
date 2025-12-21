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

// Миграция переводов для добавления казахского языка
const migrateKazakhTranslations = async () => {
  try {
    console.log('🔄 Начинаем миграцию переводов для казахского языка...');
    
    // Находим все документы контента
    const contents = await Content.find({});
    console.log(`📊 Найдено ${contents.length} документов контента`);
    
    let updatedCount = 0;
    
    for (const content of contents) {
      let needsUpdate = false;
      
      // Проверяем, есть ли казахский язык
      if (!content.translations.kk) {
        console.log(`🔄 Обновляем контент: ${content.key}`);
        
        // Добавляем казахский язык с пустыми значениями
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
        
        needsUpdate = true;
      } else {
        // Убеждаемся, что все поля казахского языка присутствуют
        const kazakhFields = ['title', 'subtitle', 'content', 'description', 'placeholder', 'button', 'label', 'value'];
        for (const field of kazakhFields) {
          if (content.translations.kk[field] === undefined) {
            content.translations.kk[field] = '';
            needsUpdate = true;
          }
        }
      }
      
      if (needsUpdate) {
        await content.save();
        updatedCount++;
        console.log(`✅ Обновлен контент: ${content.key}`);
      }
    }
    
    console.log(`🎉 Миграция завершена! Обновлено ${updatedCount} документов`);
    
  } catch (error) {
    console.error('❌ Ошибка при миграции:', error);
  }
};

// Основная функция
const main = async () => {
  await connectDB();
  await migrateKazakhTranslations();
  
  console.log('🏁 Миграция завершена');
  process.exit(0);
};

// Запуск миграции
main().catch(error => {
  console.error('❌ Критическая ошибка:', error);
  process.exit(1);
});
