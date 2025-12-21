// Тест исправления переводов
console.log('🧪 Тестируем исправление переводов...');

// Тест 1: Проверяем API
fetch('http://localhost:5000/api/i18n/ru')
  .then(response => response.json())
  .then(data => {
    console.log('✅ API ответ:', data);
    
    if (data.success && data.data.landing?.hero?.title) {
      console.log('✅ Заголовок с сервера:', data.data.landing.hero.title);
      
      // Тест 2: Проверяем, что заголовок содержит "123"
      if (data.data.landing.hero.title.includes('123')) {
        console.log('✅ Изменение из админ панели найдено в API!');
      } else {
        console.log('❌ Изменение из админ панели НЕ найдено в API');
      }
    } else {
      console.log('❌ Данные не найдены в API');
    }
  })
  .catch(error => {
    console.error('❌ Ошибка API:', error);
  });

// Тест 3: Проверяем i18n после загрузки
setTimeout(() => {
  if (window.i18n) {
    const translation = window.i18n.t('landing.hero.title');
    console.log('✅ i18n перевод:', translation);
    
    if (translation && translation.includes('123')) {
      console.log('✅ Изменение из админ панели найдено в i18n!');
    } else {
      console.log('❌ Изменение из админ панели НЕ найдено в i18n');
    }
  } else {
    console.log('❌ i18n не доступен');
  }
}, 2000);

