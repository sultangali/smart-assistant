import mongoose from 'mongoose';
import { config } from '../../config/env.js';
import Tool from '../../models/Tool.js';
import { convertToTools, getToolsStatistics } from './toolsData.js';

/**
 * Основная функция заполнения базы данных
 */
const seedDatabase = async () => {
  try {
    // Подключение к MongoDB
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Подключен к MongoDB для заполнения данными');
    
    // Получение статистики
    const stats = getToolsStatistics();
    console.log('\n📊 Статистика данных:');
    console.log(`   - Категорий: ${stats.categoriesCount}`);
    console.log(`   - Подкатегорий: ${stats.subcategoriesCount}`);
    console.log(`   - Инструментов: ${stats.totalTools}`);
    console.log(`   - Среднее инструментов на подкатегорию: ${stats.avgToolsPerSubcategory}\n`);
    
    // Очистка существующих инструментов
    const deletedCount = await Tool.deleteMany({});
    console.log(`🗑️  Удалено существующих инструментов: ${deletedCount.deletedCount}`);
    
    // Конвертация и добавление инструментов для всех языков
    const languages = ['ru', 'kk', 'en'];
    
    for (const lang of languages) {
      console.log(`\n🌍 Обработка языка: ${lang.toUpperCase()}`);
      const tools = convertToTools(lang);
      
      // Добавляем язык к каждому инструменту
      const toolsWithLanguage = tools.map(tool => ({
        ...tool,
        language: lang
      }));
      
      // Вставка инструментов
      const inserted = await Tool.insertMany(toolsWithLanguage);
      console.log(`   ✅ Добавлено инструментов: ${inserted.length}`);
    }
    
    // Проверка результата
    const totalInDb = await Tool.countDocuments();
    console.log(`\n✨ Всего инструментов в базе: ${totalInDb}`);
    console.log('🎉 База данных успешно заполнена!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error);
    process.exit(1);
  }
};

// Запуск только если файл выполняется напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export { seedDatabase };
