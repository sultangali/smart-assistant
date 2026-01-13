import mongoose from 'mongoose';
import { config } from '../../config/env.js';
import Tool from '../../models/Tool.js';

/**
 * Скрипт для исправления категорий и подкатегорий в БД
 * Заменяет полные русские названия на английские ключи
 */

const categoryMapping = {
  'Персонализированное обучение': 'personalized_learning',
  'Интерактивные и опытно-ориентированные технологии': 'interactive_technologies',
  'Технологические платформы и инструменты для разработки образовательных решений': 'tech_platforms',
  'Оценка и обратная связь': 'assessment_feedback',
  'Инклюзия и доступность': 'inclusion_accessibility',
  'Создание образовательного контента': 'content_creation_category',
  'Поддержка обучения (виртуальные ассистенты и платформы)': 'learning_support'
};

const subcategoryMapping = {
  'Адаптивное обучение': 'adaptive_learning',
  'Образовательная аналитика': 'educational_analytics',
  'Игровые и иммерсивные технологии': 'gaming_immersive',
  'Виртуальные лаборатории и симуляции': 'virtual_labs',
  'Платформы для создания контента': 'content_creation',
  'Образовательные среды и LMS интеграции': 'lms_integration',
  'Автоматизированное оценивание': 'automated_grading',
  'Таблицы и аналитика успеваемости': 'performance_analytics',
  'Поддержка доступного обучения': 'accessible_learning',
  'Инклюзивные технологии': 'inclusive_tech',
  'Генерация текстовой информации': 'text_generation',
  'Создание аудио и видео контента': 'audio_video_creation',
  'Виртуальные ассистенты': 'virtual_assistants',
  'Платформы управления образовательной средой': 'educational_management'
};

const fixTools = async () => {
  try {
    console.log('🔧 Исправление категорий и подкатегорий...\n');
    
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Подключен к MongoDB\n');
    
    const tools = await Tool.find({});
    console.log(`📊 Найдено инструментов: ${tools.length}\n`);
    
    let updated = 0;
    let errors = 0;
    
    for (const tool of tools) {
      try {
        const oldCategory = tool.category;
        const oldSubcategory = tool.subcategory;
        
        // Если категория уже в формате ключа - пропускаем
        if (categoryMapping[oldCategory]) {
          const newCategory = categoryMapping[oldCategory];
          const newSubcategory = subcategoryMapping[oldSubcategory] || oldSubcategory;
          
          tool.categoryName = oldCategory;
          tool.subcategoryName = oldSubcategory;
          tool.category = newCategory;
          tool.subcategory = newSubcategory;
          
          await tool.save();
          updated++;
          
          if (updated % 10 === 0) {
            console.log(`   ✅ Обновлено: ${updated} инструментов`);
          }
        }
      } catch (err) {
        errors++;
        console.error(`   ❌ Ошибка для "${tool.title}":`, err.message);
      }
    }
    
    console.log(`\n✨ Результат:`);
    console.log(`   ✅ Обновлено: ${updated} инструментов`);
    console.log(`   ❌ Ошибок: ${errors}`);
    console.log(`   ⏭️  Пропущено: ${tools.length - updated - errors}`);
    
    // Проверка распределения
    console.log('\n📋 Распределение после исправления:');
    const categories = Object.values(categoryMapping);
    for (const categoryKey of categories) {
      const count = await Tool.countDocuments({ category: categoryKey });
      console.log(`   - ${categoryKey}: ${count} инструментов`);
    }
    
    console.log('\n🎉 Исправление завершено!\n');
    
    await mongoose.disconnect();
    console.log('👋 Отключено от MongoDB');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Ошибка:', error);
    console.error(error.stack);
    process.exit(1);
  }
};

fixTools();
