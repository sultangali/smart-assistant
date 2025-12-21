// Утилита для загрузки переводов с сервера
const API_URL = import.meta.env.VITE_API_URL || '/api';

export const loadTranslationsFromServer = async (lang = 'ru') => {
  try {
    const response = await fetch(`${API_URL}/i18n/${lang}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.success ? data.data : {};
  } catch (error) {
    console.error('Ошибка при загрузке переводов с сервера:', error);
    return {};
  }
};

export const loadTranslationsBySection = async (lang = 'ru', section) => {
  try {
    const response = await fetch(`${API_URL}/i18n/${lang}/${section}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.success ? data.data : {};
  } catch (error) {
    console.error(`Ошибка при загрузке переводов секции ${section}:`, error);
    return {};
  }
};

export const getSupportedLanguages = async () => {
  try {
    const response = await fetch(`${API_URL}/i18n/languages`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.success ? data.data : ['ru', 'en'];
  } catch (error) {
    console.error('Ошибка при загрузке поддерживаемых языков:', error);
    return ['ru', 'en'];
  }
};
