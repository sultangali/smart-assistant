import mongoose from 'mongoose';
import { config } from '../../config/env.js';
import Tool from '../../models/Tool.js';
import { convertToTools, getToolsStatistics, toolsDatabase } from './toolsData.js';

/**
 * Заполнение базы данных инструментами
 */
const seedTools = async () => {
  try {
    console.log('🚀 Начало заполнения базы данных инструментами...\n');
    
    // Подключение к MongoDB
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Подключен к MongoDB\n');
    
    // Получение статистики
    const stats = getToolsStatistics();
    console.log('📊 Статистика данных:');
    console.log(`   📁 Категорий: ${stats.categoriesCount}`);
    console.log(`   📂 Подкатегорий: ${stats.subcategoriesCount}`);
    console.log(`   🛠️  Инструментов: ${stats.totalTools}`);
    console.log(`   📈 Среднее на подкатегорию: ${stats.avgToolsPerSubcategory}\n`);
    
    // Очистка существующих инструментов
    console.log('🗑️  Очистка существующих инструментов...');
    const deletedCount = await Tool.deleteMany({});
    console.log(`   ✅ Удалено: ${deletedCount.deletedCount} инструментов\n`);
    
    // Конвертация и добавление инструментов на русском языке
    console.log('🌍 Добавление инструментов (RU)...');
    const toolsRu = convertToTools('ru');
    
    const inserted = await Tool.insertMany(toolsRu);
    console.log(`   ✅ Добавлено: ${inserted.length} инструментов\n`);
    
    // Проверка результата
    const totalInDb = await Tool.countDocuments();
    console.log('✨ Результат:');
    console.log(`   📊 Всего инструментов в базе: ${totalInDb}`);
    
    // Проверка по категориям
    console.log('\n📋 Распределение по категориям:');
    for (const [categoryKey, categoryData] of Object.entries(toolsDatabase)) {
      const count = await Tool.countDocuments({ category: categoryKey });
      console.log(`   - ${categoryData.category.ru} (${categoryKey}): ${count} инструментов`);
    }
    
    console.log('\n🎉 База данных успешно заполнена!\n');
    
    await mongoose.disconnect();
    console.log('👋 Отключено от MongoDB');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Ошибка при заполнении базы данных:', error);
    console.error(error.stack);
    process.exit(1);
  }
};

// Запуск
seedTools();
