import Content from '../db/models/Content.js';

// Вспомогательная функция для получения значения перевода с fallback на русский
const getTranslationValue = (item, lang) => {
  const fields = ['title', 'subtitle', 'content', 'description', 'placeholder', 'button', 'label', 'value'];
  
  // Получаем переводы для запрошенного языка и русского (fallback)
  const langTranslation = item.translations?.[lang] || {};
  const ruTranslation = item.translations?.ru || {};
  
  // Ищем непустое значение сначала в запрошенном языке, потом в русском
  for (const field of fields) {
    // Сначала проверяем запрошенный язык
    if (langTranslation[field] && langTranslation[field].trim() !== '') {
      return langTranslation[field];
    }
  }
  
  // Если в запрошенном языке пусто - ищем в русском
  for (const field of fields) {
    if (ruTranslation[field] && ruTranslation[field].trim() !== '') {
      return ruTranslation[field];
    }
  }
  
  return '';
};

// Вспомогательная функция для создания вложенной структуры по ключу
const setNestedValue = (obj, keys, value) => {
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) {
      current[keys[i]] = {};
    }
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
};

// @desc    Получить переводы для i18next
// @route   GET /api/i18n/:lang
// @access  Public
export const getTranslations = async (req, res) => {
  try {
    const { lang } = req.params;
    const supportedLanguages = ['ru', 'en', 'kk'];
    
    if (!supportedLanguages.includes(lang)) {
      return res.status(400).json({
        success: false,
        message: 'Неподдерживаемый язык'
      });
    }

    // Получаем весь контент
    const content = await Content.find({ isVisible: true })
      .sort({ section: 1, order: 1, createdAt: 1 })
      .lean();

    // Преобразуем в формат i18next
    const translations = {};
    
    content.forEach(item => {
      const keys = item.key.split('.');
      const value = getTranslationValue(item, lang);
      
      if (value && value.trim() !== '') {
        setNestedValue(translations, keys, value);
      }
    });

    // Дополнительно: если есть landing.nav, копируем его в nav для совместимости
    if (translations.landing?.nav) {
      translations.nav = { ...(translations.nav || {}), ...translations.landing.nav };
    }

    res.status(200).json({
      success: true,
      data: translations,
      language: lang,
      count: content.length
    });
  } catch (error) {
    console.error('Ошибка при получении переводов:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении переводов'
    });
  }
};

// @desc    Получить переводы по секции
// @route   GET /api/i18n/:lang/:section
// @access  Public
export const getTranslationsBySection = async (req, res) => {
  try {
    const { lang, section } = req.params;
    const supportedLanguages = ['ru', 'en', 'kk'];
    
    if (!supportedLanguages.includes(lang)) {
      return res.status(400).json({
        success: false,
        message: 'Неподдерживаемый язык'
      });
    }

    // Получаем контент по секции
    const content = await Content.find({ 
      section, 
      isVisible: true 
    })
    .sort({ order: 1, createdAt: 1 })
    .lean();

    // Преобразуем в формат i18next
    const translations = {};
    
    content.forEach(item => {
      const keys = item.key.split('.');
      const value = getTranslationValue(item, lang);
      
      if (value && value.trim() !== '') {
        setNestedValue(translations, keys, value);
      }
    });

    res.status(200).json({
      success: true,
      data: translations,
      language: lang,
      section: section
    });
  } catch (error) {
    console.error('Ошибка при получении переводов секции:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении переводов секции'
    });
  }
};

// @desc    Получить список поддерживаемых языков
// @route   GET /api/i18n/languages
// @access  Public
export const getSupportedLanguages = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: [
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'kk', name: 'Қазақша', flag: '🇰🇿' }
      ]
    });
  } catch (error) {
    console.error('Ошибка при получении языков:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении языков'
    });
  }
};

// @desc    Получить все переводы для админ панели
// @route   GET /api/i18n/all
// @access  Private (Admin only)
export const getAllTranslationsAdmin = async (req, res) => {
  try {
    const content = await Content.find()
      .sort({ section: 1, order: 1, createdAt: 1 })
      .lean();

    res.status(200).json({
      success: true,
      data: content,
      count: content.length
    });
  } catch (error) {
    console.error('Ошибка при получении всех переводов:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении всех переводов'
    });
  }
};
