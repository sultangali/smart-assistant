// Иерархия категорий и подкатегорий для ИИ инструментов
// Используются английские ключи для совместимости с базой данных

export const CATEGORIES_HIERARCHY = {
  'personalized_learning': [
    'adaptive_learning',
    'educational_analytics'
  ],
  'interactive_technologies': [
    'gaming_immersive',
    'virtual_labs'
  ],
  'tech_platforms': [
    'content_creation',
    'lms_integration'
  ],
  'assessment_feedback': [
    'automated_grading',
    'performance_analytics'
  ],
  'inclusion_accessibility': [
    'accessible_learning',
    'inclusive_tech'
  ],
  'content_creation_category': [
    'text_generation',
    'audio_video_creation'
  ],
  'learning_support': [
    'virtual_assistants',
    'educational_management'
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
