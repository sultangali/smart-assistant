import mongoose from 'mongoose';
import { config } from '../../config/env.js';
import Tool from '../../models/Tool.js';
import Content from '../models/Content.js';
import Admin from '../../db/models/Admin.js';

// Данные инструментов
const toolsData = [
  {
    title: 'ChatGPT',
    description: 'Мощный ИИ-ассистент для создания планов уроков, объяснения сложных тем и разработки заданий для учащихся.',
    descriptions: {
      ru: 'Мощный ИИ-ассистент для создания планов уроков, объяснения сложных тем и разработки заданий для учащихся.',
      en: 'Powerful AI assistant for creating lesson plans, explaining complex topics and developing assignments for students.',
      kk: 'Сабақ жоспарларын құруға, күрделі тақырыптарды түсіндіруге және оқушыларға тапсырмалар әзірлеуге арналған қуатты ЖИ-көмекші.'
    },
    functions: ['Генерация планов уроков', 'Создание заданий', 'Объяснение материала', 'Проверка грамматики'],
    functionsMultilang: {
      ru: ['Генерация планов уроков', 'Создание заданий', 'Объяснение материала', 'Проверка грамматики'],
      en: ['Lesson plan generation', 'Assignment creation', 'Material explanation', 'Grammar checking'],
      kk: ['Сабақ жоспарларын генерациялау', 'Тапсырмалар құру', 'Материалды түсіндіру', 'Грамматиканы тексеру']
    },
    purpose: 'Помощь учителям в подготовке учебных материалов и планировании уроков',
    purposes: {
      ru: 'Помощь учителям в подготовке учебных материалов и планировании уроков',
      en: 'Help teachers prepare educational materials and plan lessons',
      kk: 'Мұғалімдерге оқу материалдарын дайындауға және сабақ жоспарлауға көмектесу'
    },
    category: 'Поддержка обучения (виртуальные ассистенты и платформы)',
    subcategory: 'Виртуальные ассистенты',
    link: 'https://chat.openai.com',
    color: '#E8F5E8',
  },
  {
    title: 'Claude',
    description: 'Продвинутый ИИ-ассистент от Anthropic для глубокого анализа текстов, программирования и творческих задач.',
    descriptions: {
      ru: 'Продвинутый ИИ-ассистент от Anthropic для глубокого анализа текстов, программирования и творческих задач.',
      en: 'Advanced AI assistant from Anthropic for deep text analysis, programming and creative tasks.',
      kk: 'Anthropic компаниясынан мәтіндерді терең талдауға, бағдарламалауға және шығармашылық тапсырмаларға арналған озық ЖИ-көмекші.'
    },
    functions: ['Анализ документов', 'Написание кода', 'Творческое письмо', 'Исследования'],
    functionsMultilang: {
      ru: ['Анализ документов', 'Написание кода', 'Творческое письмо', 'Исследования'],
      en: ['Document analysis', 'Code writing', 'Creative writing', 'Research'],
      kk: ['Құжаттарды талдау', 'Код жазу', 'Шығармашылық жазу', 'Зерттеу']
    },
    purpose: 'Комплексная поддержка в исследовательской и творческой деятельности',
    purposes: {
      ru: 'Комплексная поддержка в исследовательской и творческой деятельности',
      en: 'Comprehensive support in research and creative activities',
      kk: 'Зерттеу және шығармашылық қызметте кешенді қолдау'
    },
    category: 'Поддержка обучения (виртуальные ассистенты и платформы)',
    subcategory: 'Виртуальные ассистенты',
    link: 'https://claude.ai',
    color: '#F5E6D3',
  },
  {
    title: 'Quillbot',
    description: 'Инструмент для перефразирования и улучшения текстов, полезен для создания разнообразных учебных материалов.',
    descriptions: {
      ru: 'Инструмент для перефразирования и улучшения текстов, полезен для создания разнообразных учебных материалов.',
      en: 'Tool for paraphrasing and improving texts, useful for creating diverse educational materials.',
      kk: 'Мәтіндерді қайта құрастыруға және жетілдіруге арналған құрал, әртүрлі оқу материалдарын жасауға пайдалы.'
    },
    functions: ['Перефразирование', 'Проверка грамматики', 'Подведение итогов', 'Создание цитат'],
    functionsMultilang: {
      ru: ['Перефразирование', 'Проверка грамматики', 'Подведение итогов', 'Создание цитат'],
      en: ['Paraphrasing', 'Grammar checking', 'Summarizing', 'Citation creation'],
      kk: ['Қайта құрастыру', 'Грамматиканы тексеру', 'Қорытындылау', 'Дәйексөздер құру']
    },
    purpose: 'Улучшение качества письменных материалов и создание вариативных текстов',
    purposes: {
      ru: 'Улучшение качества письменных материалов и создание вариативных текстов',
      en: 'Improving the quality of written materials and creating varied texts',
      kk: 'Жазбаша материалдардың сапасын жақсарту және әртүрлі мәтіндер құру'
    },
    category: 'Создание образовательного контента',
    subcategory: 'Генерация текстовой информации',
    link: 'https://quillbot.com',
    color: '#F0F8FF',
  },
  {
    title: 'Gradescope',
    description: 'Платформа для автоматизированной проверки и оценивания студенческих работ с использованием ИИ.',
    descriptions: {
      ru: 'Платформа для автоматизированной проверки и оценивания студенческих работ с использованием ИИ.',
      en: 'Platform for automated checking and grading of student work using AI.',
      kk: 'ЖИ көмегімен студенттердің жұмыстарын автоматты тексеруге және бағалауға арналған платформа.'
    },
    functions: ['Автоматическая проверка', 'Оценивание', 'Обратная связь', 'Аналитика'],
    functionsMultilang: {
      ru: ['Автоматическая проверка', 'Оценивание', 'Обратная связь', 'Аналитика'],
      en: ['Automated checking', 'Grading', 'Feedback', 'Analytics'],
      kk: ['Автоматты тексеру', 'Бағалау', 'Кері байланыс', 'Аналитика']
    },
    purpose: 'Быстрое и объективное оценивание студенческих работ',
    purposes: {
      ru: 'Быстрое и объективное оценивание студенческих работ',
      en: 'Fast and objective assessment of student work',
      kk: 'Студенттердің жұмыстарын жылдам және объективті бағалау'
    },
    category: 'Оценка и обратная связь',
    subcategory: 'Автоматизированное оценивание',
    link: 'https://www.gradescope.com',
    color: '#FFF8DC',
  },
  {
    title: 'Kahoot!',
    description: 'Интерактивная платформа для создания викторин и опросов, делающая обучение увлекательным.',
    descriptions: {
      ru: 'Интерактивная платформа для создания викторин и опросов, делающая обучение увлекательным.',
      en: 'Interactive platform for creating quizzes and polls, making learning fun.',
      kk: 'Викториналар мен сауалнамалар құруға арналған интерактивті платформа, оқытуды қызықты етеді.'
    },
    functions: ['Создание викторин', 'Интерактивные опросы', 'Геймификация', 'Аналитика результатов'],
    functionsMultilang: {
      ru: ['Создание викторин', 'Интерактивные опросы', 'Геймификация', 'Аналитика результатов'],
      en: ['Quiz creation', 'Interactive polls', 'Gamification', 'Results analytics'],
      kk: ['Викториналар құру', 'Интерактивті сауалнамалар', 'Геймификация', 'Нәтижелер аналитикасы']
    },
    purpose: 'Повышение вовлеченности учащихся через игровые элементы',
    purposes: {
      ru: 'Повышение вовлеченности учащихся через игровые элементы',
      en: 'Increasing student engagement through game elements',
      kk: 'Ойын элементтері арқылы оқушылардың қатысуын арттыру'
    },
    category: 'Интерактивные и опытно-ориентированные технологии',
    subcategory: 'Игровые и иммерсивные технологии',
    link: 'https://kahoot.com',
    color: '#F5F0FF',
  },
  {
    title: 'Socrative',
    description: 'Система для создания быстрых опросов и тестов в режиме реального времени.',
    descriptions: {
      ru: 'Система для создания быстрых опросов и тестов в режиме реального времени.',
      en: 'System for creating quick polls and tests in real time.',
      kk: 'Нақты уақыт режимінде жылдам сауалнамалар мен тестілер құруға арналған жүйе.'
    },
    functions: ['Быстрые опросы', 'Тесты в реальном времени', 'Отчеты', 'Мониторинг понимания'],
    functionsMultilang: {
      ru: ['Быстрые опросы', 'Тесты в реальном времени', 'Отчеты', 'Мониторинг понимания'],
      en: ['Quick polls', 'Real-time tests', 'Reports', 'Understanding monitoring'],
      kk: ['Жылдам сауалнамалар', 'Нақты уақыттағы тесттер', 'Есептер', 'Түсінуді мониторингтеу']
    },
    purpose: 'Мгновенная оценка понимания материала учащимися',
    purposes: {
      ru: 'Мгновенная оценка понимания материала учащимися',
      en: 'Instant assessment of student understanding',
      kk: 'Оқушылардың материалды түсінуін лезде бағалау'
    },
    category: 'Оценка и обратная связь',
    subcategory: 'Автоматизированное оценивание',
    link: 'https://socrative.com',
    color: '#E6F3FF',
  },
  {
    title: 'Canva for Education',
    description: 'Инструмент для создания визуальных материалов: презентаций, инфографики, постеров.',
    descriptions: {
      ru: 'Инструмент для создания визуальных материалов: презентаций, инфографики, постеров.',
      en: 'Tool for creating visual materials: presentations, infographics, posters.',
      kk: 'Көрнекі материалдар жасауға арналған құрал: презентациялар, инфографика, постерлер.'
    },
    functions: ['Создание презентаций', 'Дизайн постеров', 'Инфографика', 'Шаблоны для образования'],
    functionsMultilang: {
      ru: ['Создание презентаций', 'Дизайн постеров', 'Инфографика', 'Шаблоны для образования'],
      en: ['Presentation creation', 'Poster design', 'Infographics', 'Education templates'],
      kk: ['Презентациялар құру', 'Постерлер дизайны', 'Инфографика', 'Білім беру үлгілері']
    },
    purpose: 'Создание привлекательных визуальных учебных материалов',
    purposes: {
      ru: 'Создание привлекательных визуальных учебных материалов',
      en: 'Creating attractive visual educational materials',
      kk: 'Таңғажайып көрнекі оқу материалдарын құру'
    },
    category: 'Создание образовательного контента',
    subcategory: 'Создание аудио и видео контента',
    link: 'https://www.canva.com/education/',
    color: '#FFE6F3',
  },
  {
    title: 'Notion AI',
    description: 'Умное рабочее пространство с ИИ для организации заметок, планирования и совместной работы.',
    descriptions: {
      ru: 'Умное рабочее пространство с ИИ для организации заметок, планирования и совместной работы.',
      en: 'Smart workspace with AI for organizing notes, planning and collaboration.',
      kk: 'Жазбаларды ұйымдастыруға, жоспарлауға және бірлесіп жұмыс істеуге арналған ЖИ бар ақылды жұмыс кеңістігі.'
    },
    functions: ['Организация заметок', 'Планирование', 'Генерация контента', 'Совместная работа'],
    functionsMultilang: {
      ru: ['Организация заметок', 'Планирование', 'Генерация контента', 'Совместная работа'],
      en: ['Note organization', 'Planning', 'Content generation', 'Collaboration'],
      kk: ['Жазбаларды ұйымдастыру', 'Жоспарлау', 'Мазмұн генерациялау', 'Бірлесіп жұмыс']
    },
    purpose: 'Эффективная организация учебного процесса и материалов',
    purposes: {
      ru: 'Эффективная организация учебного процесса и материалов',
      en: 'Effective organization of the educational process and materials',
      kk: 'Оқу процесі мен материалдарды тиімді ұйымдастыру'
    },
    category: 'Технологические платформы и инструменты для разработки образовательных решений',
    subcategory: 'Платформы для создания контента',
    link: 'https://notion.so',
    color: '#F0F0F0',
  },
  {
    title: 'Grammarly',
    description: 'ИИ-помощник для проверки и улучшения письменных текстов на английском языке.',
    descriptions: {
      ru: 'ИИ-помощник для проверки и улучшения письменных текстов на английском языке.',
      en: 'AI assistant for checking and improving written texts in English.',
      kk: 'Ағылшын тіліндегі жазбаша мәтіндерді тексеруге және жетілдіруге арналған ЖИ-көмекші.'
    },
    functions: ['Проверка грамматики', 'Стилистика', 'Плагиат', 'Тон текста'],
    functionsMultilang: {
      ru: ['Проверка грамматики', 'Стилистика', 'Плагиат', 'Тон текста'],
      en: ['Grammar checking', 'Stylistics', 'Plagiarism', 'Text tone'],
      kk: ['Грамматиканы тексеру', 'Стилистика', 'Плагиат', 'Мәтін тоны']
    },
    purpose: 'Улучшение качества письменных работ на английском языке',
    purposes: {
      ru: 'Улучшение качества письменных работ на английском языке',
      en: 'Improving the quality of written work in English',
      kk: 'Ағылшын тіліндегі жазбаша жұмыстардың сапасын жақсарту'
    },
    category: 'Создание образовательного контента',
    subcategory: 'Генерация текстовой информации',
    link: 'https://grammarly.com',
    color: '#E8FFE8',
  },
  {
    title: 'Duolingo',
    description: 'Геймифицированная платформа для изучения иностранных языков с адаптивным обучением.',
    descriptions: {
      ru: 'Геймифицированная платформа для изучения иностранных языков с адаптивным обучением.',
      en: 'Gamified platform for learning foreign languages with adaptive learning.',
      kk: 'Бейімдеу оқытумен шет тілдерін үйренуге арналған геймификацияланған платформа.'
    },
    functions: ['Изучение языков', 'Геймификация', 'Адаптивное обучение', 'Отслеживание прогресса'],
    functionsMultilang: {
      ru: ['Изучение языков', 'Геймификация', 'Адаптивное обучение', 'Отслеживание прогресса'],
      en: ['Language learning', 'Gamification', 'Adaptive learning', 'Progress tracking'],
      kk: ['Тілдерді үйрену', 'Геймификация', 'Бейімдеу оқыту', 'Прогресті бақылау']
    },
    purpose: 'Эффективное изучение иностранных языков',
    purposes: {
      ru: 'Эффективное изучение иностранных языков',
      en: 'Effective learning of foreign languages',
      kk: 'Шет тілдерін тиімді үйрену'
    },
    category: 'Персонализированное обучение',
    subcategory: 'Адаптивное обучение',
    link: 'https://duolingo.com',
    color: '#E0FFE0',
  }
];

// Данные контента
const contentData = [
  // NAV SECTION
  { key: 'nav.home', section: 'nav', type: 'label', order: 1, translations: { ru: { label: 'Главная' }, en: { label: 'Home' }, kk: { label: 'Басты бет' } } },
  { key: 'nav.tools', section: 'nav', type: 'label', order: 2, translations: { ru: { label: 'Инструменты' }, en: { label: 'Tools' }, kk: { label: 'Құралдар' } } },
  { key: 'nav.about', section: 'nav', type: 'label', order: 3, translations: { ru: { label: 'О нас' }, en: { label: 'About' }, kk: { label: 'Біз туралы' } } },
  { key: 'nav.contact', section: 'nav', type: 'label', order: 4, translations: { ru: { label: 'Контакты' }, en: { label: 'Contact' }, kk: { label: 'Байланыс' } } },
  { key: 'nav.admin', section: 'nav', type: 'label', order: 5, translations: { ru: { label: 'Админ-панель' }, en: { label: 'Admin Panel' }, kk: { label: 'Админ панелі' } } },

  // HERO SECTION
  { key: 'landing.hero.title', section: 'hero', type: 'title', order: 1, translations: { ru: { title: 'Откройте для себя мир ИИ-инструментов для планирования, проведения и оценки уроков' }, en: { title: 'Discover the world of AI tools for lesson planning, delivery and assessment' }, kk: { title: 'Сабақ жоспарлау, өткізу және бағалау үшін ЖИ-құралдарының әлемін ашыңыз' } } },
  { key: 'landing.hero.subtitle', section: 'hero', type: 'subtitle', order: 2, translations: { ru: { subtitle: 'Онлайн-путеводитель ИИ-инструментов' }, en: { subtitle: 'Online guide to AI tools' }, kk: { subtitle: 'Жасанды интеллект құралдарының онлайн-нұсқаулығы' } } },

  // ABOUT SECTION
  { key: 'landing.about.title', section: 'about', type: 'title', order: 1, translations: { ru: { title: 'О платформе' }, en: { title: 'About the platform' }, kk: { title: 'Платформа туралы' } } },
  { key: 'landing.about.description.primary', section: 'about', type: 'description', order: 2, translations: { ru: { description: 'Наш проект — это комплексная платформа для педагогов, объединяющая лучшие инструменты искусственного интеллекта для образовательного процесса.' }, en: { description: 'Our project is a comprehensive platform for educators, bringing together the best artificial intelligence tools for the educational process.' }, kk: { description: 'Біздің жоба - білім беру процесі үшін ең жақсы жасанды интеллект құралдарын біріктіретін педагогтарға арналған кешенді платформа.' } } },
  { key: 'landing.about.description.secondary', section: 'about', type: 'description', order: 3, translations: { ru: { description: 'Мы тщательно отобрали и структурировали более 100 инновационных решений, которые помогут вам планировать уроки, проводить занятия и оценивать результаты обучения.' }, en: { description: 'We have carefully selected and structured over 100 innovative solutions that will help you plan lessons, conduct classes and evaluate learning outcomes.' }, kk: { description: 'Біз сабақ жоспарлауға, сабақ өткізуге және оқу нәтижелерін бағалауға көмектесетін 100-ден астам инновациялық шешімді мұқият таңдап, жүйеге келтірдік.' } } },
  { key: 'landing.about.stats.tools.number', section: 'about', type: 'value', order: 4, translations: { ru: { value: '100+' }, en: { value: '100+' }, kk: { value: '100+' } } },
  { key: 'landing.about.stats.tools.label', section: 'about', type: 'label', order: 5, translations: { ru: { label: 'ИИ-инструментов' }, en: { label: 'AI tools' }, kk: { label: 'ЖИ-құралдары' } } },
  { key: 'landing.about.stats.categories.number', section: 'about', type: 'value', order: 6, translations: { ru: { value: '10+' }, en: { value: '10+' }, kk: { value: '10+' } } },
  { key: 'landing.about.stats.categories.label', section: 'about', type: 'label', order: 7, translations: { ru: { label: 'Категорий' }, en: { label: 'Categories' }, kk: { label: 'Санаттар' } } },
  { key: 'landing.about.stats.availability.number', section: 'about', type: 'value', order: 8, translations: { ru: { value: '24/7' }, en: { value: '24/7' }, kk: { value: '24/7' } } },
  { key: 'landing.about.stats.availability.label', section: 'about', type: 'label', order: 9, translations: { ru: { label: 'Доступность' }, en: { label: 'Availability' }, kk: { label: 'Қолжетімділік' } } },
  { key: 'landing.about.info.title', section: 'about', type: 'title', order: 10, translations: { ru: { title: 'Почему выбирают нашу платформу?' }, en: { title: 'Why choose our platform?' }, kk: { title: 'Неге біздің платформаны таңдау керек?' } } },
  { key: 'landing.about.info.description', section: 'about', type: 'description', order: 11, translations: { ru: { description: 'Каждый инструмент сопровождается подробным описанием, категоризацией и практическими рекомендациями по использованию.' }, en: { description: 'Each tool comes with a detailed description, categorization and practical recommendations for use.' }, kk: { description: 'Әр құрал толық сипаттамамен, категориялаумен және пайдалану бойынша практикалық ұсыныстармен қамтамасыз етіледі.' } } },

  // FILTER SECTION
  { key: 'landing.filter.title', section: 'filter', type: 'title', order: 1, translations: { ru: { title: 'Подбор инструментов' }, en: { title: 'Tool selection' }, kk: { title: 'Құралдарды таңдау' } } },
  { key: 'landing.filter.category', section: 'filter', type: 'label', order: 2, translations: { ru: { label: 'Категория' }, en: { label: 'Category' }, kk: { label: 'Санат' } } },
  { key: 'landing.filter.subcategory', section: 'filter', type: 'label', order: 3, translations: { ru: { label: 'Подкатегория' }, en: { label: 'Subcategory' }, kk: { label: 'Ішкі санат' } } },
  { key: 'landing.filter.purpose', section: 'filter', type: 'label', order: 4, translations: { ru: { label: 'Назначение' }, en: { label: 'Purpose' }, kk: { label: 'Мақсаты' } } },
  { key: 'landing.filter.search_button', section: 'filter', type: 'button', order: 5, translations: { ru: { button: 'Найти' }, en: { button: 'Search' }, kk: { button: 'Табу' } } },
  { key: 'landing.filter.reset', section: 'filter', type: 'button', order: 6, translations: { ru: { button: 'Сбросить' }, en: { button: 'Reset' }, kk: { button: 'Тазалау' } } },

  // FEEDBACK SECTION
  { key: 'landing.feedback.title', section: 'feedback', type: 'title', order: 1, translations: { ru: { title: 'Обратная связь' }, en: { title: 'Feedback' }, kk: { title: 'Кері байланыс' } } },
  { key: 'landing.feedback.subtitle', section: 'feedback', type: 'subtitle', order: 2, translations: { ru: { subtitle: 'Поделитесь своими мыслями и помогите нам стать лучше' }, en: { subtitle: 'Share your thoughts and help us improve' }, kk: { subtitle: 'Өз ойларыңызбен бөлісіп, бізге жақсарауға көмектесіңіз' } } },
  { key: 'landing.feedback.name', section: 'feedback', type: 'placeholder', order: 3, translations: { ru: { placeholder: 'Ваше имя' }, en: { placeholder: 'Your name' }, kk: { placeholder: 'Сіздің атыңыз' } } },
  { key: 'landing.feedback.email', section: 'feedback', type: 'placeholder', order: 4, translations: { ru: { placeholder: 'Ваш e-mail' }, en: { placeholder: 'Your e-mail' }, kk: { placeholder: 'Сіздің e-mail' } } },
  { key: 'landing.feedback.type', section: 'feedback', type: 'label', order: 5, translations: { ru: { label: 'Тип сообщения' }, en: { label: 'Message type' }, kk: { label: 'Хабарлама түрі' } } },
  { key: 'landing.feedback.message', section: 'feedback', type: 'placeholder', order: 6, translations: { ru: { placeholder: 'Ваше сообщение' }, en: { placeholder: 'Your message' }, kk: { placeholder: 'Сіздің хабарламаңыз' } } },
  { key: 'landing.feedback.submit', section: 'feedback', type: 'button', order: 7, translations: { ru: { button: 'Отправить' }, en: { button: 'Submit' }, kk: { button: 'Жіберу' } } },

  // CONTACT SECTION
  { key: 'landing.contact.title', section: 'contact', type: 'title', order: 1, translations: { ru: { title: 'Связаться с нами' }, en: { title: 'Contact us' }, kk: { title: 'Бізбен байланысыңыз' } } },
  { key: 'landing.contact.subtitle', section: 'contact', type: 'subtitle', order: 2, translations: { ru: { subtitle: 'Свяжитесь с нами для получения дополнительной информации' }, en: { subtitle: 'Contact us for more information' }, kk: { subtitle: 'Қосымша ақпарат алу үшін бізбен байланысыңыз' } } },
  { key: 'landing.contact.email.title', section: 'contact', type: 'label', order: 3, translations: { ru: { label: 'Электронная почта' }, en: { label: 'Email' }, kk: { label: 'Электрондық пошта' } } },
  { key: 'landing.contact.email.value', section: 'contact', type: 'value', order: 4, translations: { ru: { value: 'info@smartassistant.edu' }, en: { value: 'info@smartassistant.edu' }, kk: { value: 'info@smartassistant.edu' } } },
  { key: 'landing.contact.phone.title', section: 'contact', type: 'label', order: 5, translations: { ru: { label: 'Телефон' }, en: { label: 'Phone' }, kk: { label: 'Телефон' } } },
  { key: 'landing.contact.phone.value', section: 'contact', type: 'value', order: 6, translations: { ru: { value: '+7 (XXX) XXX-XX-XX' }, en: { value: '+7 (XXX) XXX-XX-XX' }, kk: { value: '+7 (XXX) XXX-XX-XX' } } },

  // COMMON SECTION
  { key: 'common.loading', section: 'common', type: 'text', order: 1, translations: { ru: { content: 'Загрузка...' }, en: { content: 'Loading...' }, kk: { content: 'Жүктелуде...' } } },
  { key: 'common.error', section: 'common', type: 'text', order: 2, translations: { ru: { content: 'Ошибка' }, en: { content: 'Error' }, kk: { content: 'Қате' } } },
  { key: 'common.success', section: 'common', type: 'text', order: 3, translations: { ru: { content: 'Успешно' }, en: { content: 'Success' }, kk: { content: 'Сәтті' } } },
  { key: 'common.cancel', section: 'common', type: 'button', order: 4, translations: { ru: { button: 'Отмена' }, en: { button: 'Cancel' }, kk: { button: 'Болдырмау' } } },
  { key: 'common.save', section: 'common', type: 'button', order: 5, translations: { ru: { button: 'Сохранить' }, en: { button: 'Save' }, kk: { button: 'Сақтау' } } },
  { key: 'common.delete', section: 'common', type: 'button', order: 6, translations: { ru: { button: 'Удалить' }, en: { button: 'Delete' }, kk: { button: 'Жою' } } },
  { key: 'common.edit', section: 'common', type: 'button', order: 7, translations: { ru: { button: 'Редактировать' }, en: { button: 'Edit' }, kk: { button: 'Өңдеу' } } },
];

// Функция нормализации инструментов (добавляет многоязычные поля если их нет)
const normalizeTools = (data) => {
  return data.map(tool => ({
    ...tool,
    // Добавляем многоязычные purposes (используем существующие или создаем из purpose)
    purposes: tool.purposes || {
      ru: tool.purpose || '',
      en: tool.purpose || '',
      kk: tool.purpose || ''
    },
    // Добавляем многоязычные functions (используем существующие или создаем из functions)
    functionsMultilang: tool.functionsMultilang || {
      ru: tool.functions || [],
      en: tool.functions || [],
      kk: tool.functions || []
    }
  }));
};

// Функция нормализации контента
const normalizeContent = (data) => {
  return data.map(item => ({
    key: item.key,
    section: item.section,
    type: item.type,
    order: item.order || 0,
    isVisible: true,
    metadata: { component: '', field: '', category: '' },
    translations: {
      ru: {
        title: item.translations.ru?.title || '',
        subtitle: item.translations.ru?.subtitle || '',
        content: item.translations.ru?.content || '',
        description: item.translations.ru?.description || '',
        placeholder: item.translations.ru?.placeholder || '',
        button: item.translations.ru?.button || '',
        label: item.translations.ru?.label || '',
        value: item.translations.ru?.value || ''
      },
      en: {
        title: item.translations.en?.title || '',
        subtitle: item.translations.en?.subtitle || '',
        content: item.translations.en?.content || '',
        description: item.translations.en?.description || '',
        placeholder: item.translations.en?.placeholder || '',
        button: item.translations.en?.button || '',
        label: item.translations.en?.label || '',
        value: item.translations.en?.value || ''
      },
      kk: {
        title: item.translations.kk?.title || '',
        subtitle: item.translations.kk?.subtitle || '',
        content: item.translations.kk?.content || '',
        description: item.translations.kk?.description || '',
        placeholder: item.translations.kk?.placeholder || '',
        button: item.translations.kk?.button || '',
        label: item.translations.kk?.label || '',
        value: item.translations.kk?.value || ''
      }
    }
  }));
};

// Главная функция
const seedAll = async () => {
  try {
    console.log('═'.repeat(50));
    console.log('🚀 Запуск инициализации базы данных Smart Assistant');
    console.log('═'.repeat(50));
    
    // Подключение к MongoDB
    console.log('\n📡 Подключение к MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Подключение успешно!\n');

    // Очистка коллекций
    console.log('🗑️ Очистка существующих данных...');
    await Tool.deleteMany({});
    await Content.deleteMany({});
    console.log('✅ Данные очищены\n');

    // Добавление инструментов
    console.log('🔧 Добавление инструментов...');
    const normalizedTools = normalizeTools(toolsData);
    const toolsResult = await Tool.insertMany(normalizedTools);
    console.log(`✅ Добавлено ${toolsResult.length} инструментов\n`);

    // Добавление контента
    console.log('📝 Добавление контента...');
    const normalizedContent = normalizeContent(contentData);
    const contentResult = await Content.insertMany(normalizedContent);
    console.log(`✅ Добавлено ${contentResult.length} записей контента\n`);

    // Проверка/создание админа
    console.log('👤 Проверка администратора...');
    const existingAdmin = await Admin.findOne({ email: config.ADMIN_EMAIL });
    if (!existingAdmin) {
      const admin = new Admin({
        email: config.ADMIN_EMAIL,
        password: config.ADMIN_PASSWORD,
        passwordRotationDays: config.PASSWORD_ROTATION_DAYS || 7,
        notificationEmail: config.ADMIN_NOTIFICATION_EMAIL || config.ADMIN_EMAIL,
      });
      await admin.save();
      console.log('✅ Администратор создан');
    } else {
      console.log('ℹ️ Администратор уже существует');
    }

    // Итоговая статистика
    console.log('\n' + '═'.repeat(50));
    console.log('📊 ИТОГОВАЯ СТАТИСТИКА:');
    console.log('═'.repeat(50));
    console.log(`   Инструменты: ${await Tool.countDocuments()}`);
    console.log(`   Контент: ${await Content.countDocuments()}`);
    console.log(`   Администраторы: ${await Admin.countDocuments()}`);
    console.log('═'.repeat(50));
    console.log('\n✅ Инициализация базы данных завершена успешно!\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Ошибка при инициализации:', error);
    process.exit(1);
  }
};

// Запуск
seedAll();

export { seedAll, toolsData, contentData };

