import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Статические переводы (используются только как fallback при недоступности сервера)
import ruTranslations from './locales/ru.json';
import enTranslations from './locales/en.json';
import kkTranslations from './locales/kk.json';

const staticTranslations = {
  ru: ruTranslations,
  en: enTranslations,
  kk: kkTranslations,
};

// API URL - используем относительный путь для работы с vite proxy (dev) и nginx (prod)
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Кэш загруженных переводов с сервера
const serverTranslationsCache = new Map();

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ruTranslations },
      en: { translation: enTranslations },
      kk: { translation: kkTranslations },
    },
    
    fallbackLng: 'ru',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    react: {
      useSuspense: false,
    },
  });

// Глубокое слияние объектов (serverData имеет приоритет)
const deepMerge = (staticData, serverData) => {
  if (!serverData) return staticData;
  if (!staticData) return serverData;
  
  const result = { ...staticData };
  
  for (const key in serverData) {
    if (serverData[key] !== null && serverData[key] !== undefined && serverData[key] !== '') {
      if (typeof serverData[key] === 'object' && !Array.isArray(serverData[key])) {
        result[key] = deepMerge(staticData[key] || {}, serverData[key]);
      } else {
        result[key] = serverData[key];
      }
    }
  }
  
  return result;
};

// Загрузка переводов с сервера
export const loadTranslationsFromServer = async (language = 'ru') => {
  try {
    console.log(`🔄 Загружаем переводы для ${language} с сервера...`);
    
    const response = await fetch(`${API_URL}/i18n/${language}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(10000)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.data) {
      console.log(`✅ Получены переводы с сервера для ${language}`);
      
      // Получаем статические переводы
      const staticData = staticTranslations[language] || {};
      
      // Сливаем: статические + серверные (серверные имеют приоритет)
      const mergedTranslations = deepMerge(staticData, data.data);
      
      // Сохраняем в кэш
      serverTranslationsCache.set(language, mergedTranslations);
      
      // Полностью заменяем ресурсы для языка
      i18n.addResourceBundle(language, 'translation', mergedTranslations, true, true);
      
      console.log(`✅ Переводы для ${language} применены`);
      
      return mergedTranslations;
    } else {
      throw new Error('Некорректный ответ от сервера');
    }
  } catch (error) {
    console.error(`❌ Ошибка загрузки переводов для ${language}:`, error);
    
    // Используем статические переводы как fallback
    const staticData = staticTranslations[language] || staticTranslations.ru;
    i18n.addResourceBundle(language, 'translation', staticData, true, true);
    
    return staticData;
  }
};

// Принудительная перезагрузка переводов (всегда загружает с сервера)
export const reloadTranslations = async (language = i18n.language) => {
  console.log(`🔄 Перезагружаем переводы для ${language}...`);
  
  // Очищаем кэш для этого языка
  serverTranslationsCache.delete(language);
  
  // Загружаем с сервера
  const translations = await loadTranslationsFromServer(language);
  
  // Принудительно обновляем React компоненты
  i18n.emit('languageChanged', language);
  
  return translations;
};

// Смена языка с загрузкой переводов
export const changeLanguageWithLoading = async (language) => {
  console.log(`🌐 Меняем язык на ${language}...`);
  
  // Сначала загружаем переводы с сервера
  await loadTranslationsFromServer(language);
  
  // Затем меняем язык
  await i18n.changeLanguage(language);
  
  console.log(`✅ Язык изменен на ${language}`);
};

// Загрузка переводов при инициализации
const initializeTranslations = async () => {
  const currentLang = i18n.language || 'ru';
  console.log(`🚀 Инициализация переводов для ${currentLang}...`);
  
  await loadTranslationsFromServer(currentLang);
};

// Запускаем инициализацию после небольшой задержки
setTimeout(initializeTranslations, 100);

export default i18n;
