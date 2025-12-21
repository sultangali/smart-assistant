// Тест загрузки переводов в браузере
console.log('🧪 Тестируем загрузку переводов...');

// Тест 1: Проверяем доступность API
fetch('http://localhost:5000/api/i18n/languages')
  .then(response => response.json())
  .then(data => {
    console.log('✅ API доступен:', data);
    
    // Тест 2: Загружаем русские переводы
    return fetch('http://localhost:5000/api/i18n/ru');
  })
  .then(response => response.json())
  .then(data => {
    console.log('✅ Русские переводы загружены:', data);
    
    // Тест 3: Проверяем секцию hero
    if (data.data && data.data.landing && data.data.landing.hero) {
      console.log('✅ Секция hero найдена:', data.data.landing.hero);
      console.log('📝 Заголовок:', data.data.landing.hero.title);
    } else {
      console.log('❌ Секция hero не найдена');
    }
  })
  .catch(error => {
    console.error('❌ Ошибка:', error);
  });
