import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Content from '../db/models/Content.js';
import { config } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Подключение к базе данных
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Подключено к MongoDB');
  } catch (error) {
    console.error('❌ Ошибка подключения к MongoDB:', error);
    process.exit(1);
  }
};

// Функция для рекурсивного обхода объекта переводов
const extractTranslations = (obj, prefix = '', section = 'common', lang = 'ru') => {
  const contentItems = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Если это объект, рекурсивно обходим его
      const nestedItems = extractTranslations(value, fullKey, section, lang);
      contentItems.push(...nestedItems);
    } else if (typeof value === 'string' && value.trim() !== '') {
      // Если это строка, создаем элемент контента
      const contentItem = {
        key: fullKey,
        section: section,
        type: determineType(key, value),
        isVisible: true,
        order: 0,
        metadata: {
          component: determineComponent(fullKey),
          field: key,
          category: determineCategory(fullKey)
        },
        translations: {
          ru: { [determineField(key)]: '' },
          en: { [determineField(key)]: '' }
        }
      };
      
      // Устанавливаем значение для текущего языка
      contentItem.translations[lang][determineField(key)] = value;
      contentItems.push(contentItem);
    }
  }
  
  return contentItems;
};

// Определение типа контента по ключу
const determineType = (key, value) => {
  const keyLower = key.toLowerCase();
  
  if (keyLower.includes('title') || keyLower.includes('заголовок')) return 'title';
  if (keyLower.includes('subtitle') || keyLower.includes('подзаголовок')) return 'subtitle';
  if (keyLower.includes('description') || keyLower.includes('описание')) return 'description';
  if (keyLower.includes('placeholder') || keyLower.includes('плейсхолдер')) return 'placeholder';
  if (keyLower.includes('button') || keyLower.includes('кнопка')) return 'button';
  if (keyLower.includes('label') || keyLower.includes('метка')) return 'label';
  if (keyLower.includes('value') || keyLower.includes('значение')) return 'value';
  
  return 'text';
};

// Определение поля для перевода
const determineField = (key) => {
  const keyLower = key.toLowerCase();
  
  if (keyLower.includes('title') || keyLower.includes('заголовок')) return 'title';
  if (keyLower.includes('subtitle') || keyLower.includes('подзаголовок')) return 'subtitle';
  if (keyLower.includes('description') || keyLower.includes('описание')) return 'description';
  if (keyLower.includes('placeholder') || keyLower.includes('плейсхолдер')) return 'placeholder';
  if (keyLower.includes('button') || keyLower.includes('кнопка')) return 'button';
  if (keyLower.includes('label') || keyLower.includes('метка')) return 'label';
  if (keyLower.includes('value') || keyLower.includes('значение')) return 'value';
  
  return 'content';
};

// Определение компонента по ключу
const determineComponent = (key) => {
  if (key.startsWith('landing.hero')) return 'HeroSection';
  if (key.startsWith('landing.about')) return 'AboutSection';
  if (key.startsWith('landing.filter')) return 'FilterSection';
  if (key.startsWith('landing.feedback')) return 'FeedbackSection';
  if (key.startsWith('landing.contact')) return 'ContactSection';
  if (key.startsWith('nav.')) return 'Navbar';
  if (key.startsWith('admin.')) return 'AdminPanel';
  if (key.startsWith('common.')) return 'Common';
  
  return 'Unknown';
};

// Определение категории по ключу
const determineCategory = (key) => {
  if (key.startsWith('landing.')) return 'landing';
  if (key.startsWith('nav.')) return 'navigation';
  if (key.startsWith('admin.')) return 'admin';
  if (key.startsWith('common.')) return 'common';
  
  return 'general';
};

// Функция для получения вложенного значения по пути
const getNestedValue = (obj, path) => {
  return path.reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
};

// Функция для загрузки и парсинга JSON файлов
const loadTranslations = () => {
  const translationsPath = path.join(__dirname, '../../client/src/i18n/locales');
  const allContentItems = new Map(); // Используем Map для избежания дублирования
  
  // Загружаем русский файл
  const ruFile = path.join(translationsPath, 'ru.json');
  const enFile = path.join(translationsPath, 'en.json');
  
  if (!fs.existsSync(ruFile)) {
    console.error('❌ Файл ru.json не найден');
    return [];
  }
  
  const ruTranslations = JSON.parse(fs.readFileSync(ruFile, 'utf8'));
  const enTranslations = fs.existsSync(enFile) ? JSON.parse(fs.readFileSync(enFile, 'utf8')) : {};
  
  // Извлекаем контент по секциям из русского файла
  const sections = {
    'hero': ruTranslations.landing?.hero || {},
    'about': ruTranslations.landing?.about || {},
    'filter': ruTranslations.landing?.filter || {},
    'feedback': ruTranslations.landing?.feedback || {},
    'contact': ruTranslations.landing?.contact || {},
    'nav': ruTranslations.nav || {},
    'admin': ruTranslations.admin || {},
    'common': ruTranslations.common || {}
  };
  
  // Обрабатываем каждую секцию
  for (const [sectionName, sectionData] of Object.entries(sections)) {
    if (Object.keys(sectionData).length > 0) {
      console.log(`📂 Обрабатываем секцию: ${sectionName}`);
      const sectionItems = extractTranslations(sectionData, `landing.${sectionName}`, sectionName, 'ru');
      
      // Добавляем в общую карту
      sectionItems.forEach(item => {
        allContentItems.set(item.key, item);
      });
    }
  }
  
  // Добавляем английские переводы
  const enSections = {
    'hero': enTranslations.landing?.hero || {},
    'about': enTranslations.landing?.about || {},
    'filter': enTranslations.landing?.filter || {},
    'feedback': enTranslations.landing?.feedback || {},
    'contact': enTranslations.landing?.contact || {},
    'nav': enTranslations.nav || {},
    'admin': enTranslations.admin || {},
    'common': enTranslations.common || {}
  };
  
  for (const [sectionName, sectionData] of Object.entries(enSections)) {
    if (Object.keys(sectionData).length > 0) {
      console.log(`📂 Добавляем английские переводы для секции: ${sectionName}`);
      const sectionItems = extractTranslations(sectionData, `landing.${sectionName}`, sectionName, 'en');
      
      // Обновляем существующие элементы английскими переводами
      sectionItems.forEach(item => {
        if (allContentItems.has(item.key)) {
          const existingItem = allContentItems.get(item.key);
          const field = determineField(item.key.split('.').pop());
          existingItem.translations.en[field] = item.translations.en[field];
        }
      });
    }
  }
  
  return Array.from(allContentItems.values());
};

// Функция для сохранения контента в базу данных
const saveContentToDB = async (contentItems) => {
  try {
    // Очищаем существующий контент
    await Content.deleteMany({});
    console.log('🗑️ Существующий контент удален');
    
    // Создаем новый контент
    const createdItems = [];
    for (const item of contentItems) {
      try {
        const content = new Content(item);
        await content.save();
        createdItems.push(content);
      } catch (error) {
        console.error(`❌ Ошибка при создании контента ${item.key}:`, error.message);
      }
    }
    
    console.log(`✅ Создано ${createdItems.length} элементов контента`);
    return createdItems;
  } catch (error) {
    console.error('❌ Ошибка при сохранении контента:', error);
    throw error;
  }
};

// Основная функция
const main = async () => {
  try {
    console.log('🚀 Начинаем извлечение контента из i18next файлов...');
    
    // Подключаемся к базе данных
    await connectDB();
    
    // Загружаем переводы
    console.log('📖 Загружаем файлы переводов...');
    const contentItems = loadTranslations();
    
    if (contentItems.length === 0) {
      console.log('⚠️ Не найдено контента для извлечения');
      return;
    }
    
    console.log(`📊 Найдено ${contentItems.length} элементов контента`);
    
    // Сохраняем в базу данных
    console.log('💾 Сохраняем контент в базу данных...');
    await saveContentToDB(contentItems);
    
    console.log('✅ Извлечение контента завершено успешно!');
    
    // Показываем статистику
    const stats = await Content.aggregate([
      {
        $group: {
          _id: '$section',
          count: { $sum: 1 }
        }
      }
    ]);
    
    console.log('\n📈 Статистика по секциям:');
    stats.forEach(stat => {
      console.log(`  ${stat._id}: ${stat.count} элементов`);
    });
    
  } catch (error) {
    console.error('❌ Ошибка при извлечении контента:', error);
  } finally {
    // Закрываем соединение с базой данных
    await mongoose.connection.close();
    console.log('🔌 Соединение с базой данных закрыто');
    process.exit(0);
  }
};

// Запускаем скрипт
main();