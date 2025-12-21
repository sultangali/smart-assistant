import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { reloadTranslations, changeLanguageWithLoading } from '../i18n/config';

export const useTranslations = () => {
  const { t, i18n } = useTranslation();

  // Функция для перезагрузки переводов с сервера
  const reloadFromServer = useCallback(async (language = i18n.language) => {
    try {
      await reloadTranslations(language);
      console.log(`✅ Переводы для языка ${language} перезагружены`);
    } catch (err) {
      console.error('❌ Ошибка при перезагрузке переводов:', err);
    }
  }, [i18n.language]);

  // Функция для смены языка с перезагрузкой переводов
  const changeLanguage = useCallback(async (language) => {
    try {
      await changeLanguageWithLoading(language);
    } catch (err) {
      console.error('❌ Ошибка при смене языка:', err);
      // Fallback - просто меняем язык без загрузки с сервера
      await i18n.changeLanguage(language);
    }
  }, [i18n]);

  return {
    t,
    i18n,
    reloadFromServer,
    changeLanguage,
    currentLanguage: i18n.language
  };
};

export default useTranslations;
