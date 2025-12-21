import mongoose from 'mongoose';
import Tool from '../models/Tool.js';
import { config } from '../config/env.js';

/**
 * Скрипт миграции для добавления многоязычных описаний к существующим инструментам
 * Запуск: node server/scripts/migrateToolDescriptions.js
 */

const migrateDescriptions = async () => {
  try {
    console.log('Подключение к базе данных...');
    await mongoose.connect(config.mongoUri);
    console.log('✓ Подключено к базе данных');

    // Получаем все инструменты
    const tools = await Tool.find({});
    console.log(`\nНайдено инструментов: ${tools.length}`);

    let updatedCount = 0;

    for (const tool of tools) {
      // Проверяем, нужно ли обновлять инструмент
      if (!tool.descriptions || !tool.descriptions.ru) {
        // Инициализируем descriptions, если его нет
        if (!tool.descriptions) {
          tool.descriptions = {};
        }

        // Копируем существующее описание во все языковые версии
        tool.descriptions.ru = tool.description || '';
        tool.descriptions.en = tool.description || '';
        tool.descriptions.kk = tool.description || '';

        await tool.save();
        updatedCount++;
        console.log(`✓ Обновлен: ${tool.title}`);
      } else {
        console.log(`- Пропущен (уже имеет многоязычные описания): ${tool.title}`);
      }
    }

    console.log(`\n✓ Миграция завершена!`);
    console.log(`  Обновлено инструментов: ${updatedCount}`);
    console.log(`  Пропущено: ${tools.length - updatedCount}`);

  } catch (error) {
    console.error('✗ Ошибка миграции:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n✓ Соединение с базой данных закрыто');
    process.exit(0);
  }
};

// Запуск миграции
migrateDescriptions();

