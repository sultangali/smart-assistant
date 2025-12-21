// Иерархия категорий и подкатегорий для ИИ инструментов
export const CATEGORIES_HIERARCHY = {
  'Персонализированное обучение': [
    'Адаптивное обучение',
    'Образовательная аналитика'
  ],
  'Интерактивные и опытно-ориентированные технологии': [
    'Игровые и иммерсивные технологии',
    'Виртуальные лаборатории и симуляции'
  ],
  'Технологические платформы и инструменты для разработки образовательных решений': [
    'Платформы для создания контента',
    'Образовательные среды и LMS интеграции'
  ],
  'Оценка и обратная связь': [
    'Автоматизированное оценивание',
    'Таблицы и аналитика успеваемости'
  ],
  'Инклюзия и доступность': [
    'Поддержка доступного обучения',
    'Инклюзивные технологии'
  ],
  'Создание образовательного контента': [
    'Генерация текстовой информации',
    'Создание аудио и видео контента'
  ],
  'Поддержка обучения (виртуальные ассистенты и платформы)': [
    'Виртуальные ассистенты',
    'Платформы управления образовательной средой'
  ]
};

// Получить все категории
export const getAllCategories = () => {
  return Object.keys(CATEGORIES_HIERARCHY);
};

// Получить подкатегории для конкретной категории
export const getSubcategoriesByCategory = (category) => {
  return CATEGORIES_HIERARCHY[category] || [];
};

// Получить все подкатегории
export const getAllSubcategories = () => {
  return Object.values(CATEGORIES_HIERARCHY).flat();
};

// Проверить, существует ли категория
export const isValidCategory = (category) => {
  return Object.keys(CATEGORIES_HIERARCHY).includes(category);
};

// Проверить, существует ли подкатегория в категории
export const isValidSubcategory = (category, subcategory) => {
  return CATEGORIES_HIERARCHY[category]?.includes(subcategory) || false;
};

// Получить полную иерархию для API
export const getCategoriesForAPI = () => {
  return {
    categories: getAllCategories(),
    subcategories: getAllSubcategories(),
    hierarchy: CATEGORIES_HIERARCHY
  };
};
