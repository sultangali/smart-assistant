import mongoose from 'mongoose';
import { config } from './config/env.js';
import Tool from './models/Tool.js';

const sampleTools = [
  {
    title: 'ChatGPT',
    description: 'Мощный ИИ-ассистент для создания планов уроков, объяснения сложных тем и разработки заданий для учащихся.',
    functions: ['Генерация планов уроков', 'Создание заданий', 'Объяснение материала', 'Проверка грамматики'],
    purpose: 'Помощь учителям в подготовке учебных материалов и планировании уроков',
    category: 'Планирование уроков',
    subcategory: 'ИИ-ассистенты',
    link: 'https://chat.openai.com',
    color: '#E8F5E8',
  },
  {
    title: 'Quillbot',
    description: 'Инструмент для перефразирования и улучшения текстов, полезен для создания разнообразных учебных материалов.',
    functions: ['Перефразирование', 'Проверка грамматики', 'Подведение итогов', 'Создание цитат'],
    purpose: 'Улучшение качества письменных материалов и создание вариативных текстов',
    category: 'Создание контента',
    subcategory: 'Работа с текстом',
    link: 'https://quillbot.com',
    color: '#F0F8FF',
  },
  {
    title: 'Gradescope',
    description: 'Платформа для автоматизированной проверки и оценивания студенческих работ с использованием ИИ.',
    functions: ['Автоматическая проверка', 'Оценивание', 'Обратная связь', 'Аналитика'],
    purpose: 'Быстрое и объективное оценивание студенческих работ',
    category: 'Оценивание',
    subcategory: 'Автоматическая проверка',
    link: 'https://www.gradescope.com',
    color: '#FFF8DC',
  },
  {
    title: 'Kahoot!',
    description: 'Интерактивная платформа для создания викторин и опросов, делающая обучение увлекательным.',
    functions: ['Создание викторин', 'Интерактивные опросы', 'Геймификация', 'Аналитика результатов'],
    purpose: 'Повышение вовлеченности учащихся через игровые элементы',
    category: 'Проведение уроков',
    subcategory: 'Интерактивные инструменты',
    link: 'https://kahoot.com',
    color: '#F5F0FF',
  },
  {
    title: 'Socrative',
    description: 'Система для создания быстрых опросов и тестов в режиме реального времени.',
    functions: ['Быстрые опросы', 'Тесты в реальном времени', 'Отчеты', 'Мониторинг понимания'],
    purpose: 'Мгновенная оценка понимания материала учащимися',
    category: 'Оценивание',
    subcategory: 'Опросы и тесты',
    link: 'https://socrative.com',
    color: '#E6F3FF',
  },
  {
    title: 'Canva for Education',
    description: 'Инструмент для создания визуальных материалов: презентаций, инфографики, постеров.',
    functions: ['Создание презентаций', 'Дизайн постеров', 'Инфографика', 'Шаблоны для образования'],
    purpose: 'Создание привлекательных визуальных учебных материалов',
    category: 'Создание контента',
    subcategory: 'Визуальный дизайн',
    link: 'https://www.canva.com/education/',
    color: '#FFE6F3',
  }
];

const seedDatabase = async () => {
  try {
    console.log('Попытка подключения к MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('Подключен к MongoDB для заполнения данными');
    
    // Очистка существующих инструментов
    const deleteResult = await Tool.deleteMany({});
    console.log(`Удалено ${deleteResult.deletedCount} существующих инструментов`);
    
    // Добавление примеров инструментов
    const insertResult = await Tool.insertMany(sampleTools);
    console.log(`Добавлено ${insertResult.length} примеров инструментов`);
    
    console.log('База данных успешно заполнена тестовыми данными!');
    
    // Проверим что данные действительно добавились
    const count = await Tool.countDocuments();
    console.log(`Общее количество инструментов в базе: ${count}`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при заполнении базы данных:', error);
    process.exit(1);
  }
};

// Запуск
seedDatabase();

export { sampleTools, seedDatabase };
