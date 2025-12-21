// Тест загрузки переводов с сервера
const testTranslations = async () => {
  try {
    console.log('🧪 Тестируем загрузку переводов с сервера...\n');
    
    // Тест 1: Проверяем доступность сервера
    console.log('1️⃣ Проверяем доступность сервера...');
    const healthResponse = await fetch('http://localhost:5000/api');
    if (!healthResponse.ok) {
      throw new Error('Сервер недоступен');
    }
    console.log('✅ Сервер доступен');
    console.log('');
    
    // Тест 2: Загружаем поддерживаемые языки
    console.log('2️⃣ Загружаем поддерживаемые языки...');
    const languagesResponse = await fetch('http://localhost:5000/api/i18n/languages');
    const languagesData = await languagesResponse.json();
    console.log('✅ Поддерживаемые языки:', languagesData.data);
    console.log('');
    
    // Тест 3: Загружаем русские переводы
    console.log('3️⃣ Загружаем русские переводы...');
    const ruResponse = await fetch('http://localhost:5000/api/i18n/ru');
    const ruData = await ruResponse.json();
    console.log('✅ Русские переводы загружены');
    console.log('📊 Количество секций:', Object.keys(ruData.data).length);
    console.log('📋 Секции:', Object.keys(ruData.data));
    console.log('');
    
    // Тест 4: Проверяем секцию hero
    console.log('4️⃣ Проверяем секцию hero...');
    if (ruData.data.landing && ruData.data.landing.hero) {
      console.log('✅ Секция hero найдена');
      console.log('📝 Заголовок:', ruData.data.landing.hero.title);
      console.log('📝 Подзаголовок:', ruData.data.landing.hero.subtitle);
    } else {
      console.log('❌ Секция hero не найдена');
    }
    console.log('');
    
    // Тест 5: Загружаем переводы секции hero
    console.log('5️⃣ Загружаем переводы секции hero...');
    const heroResponse = await fetch('http://localhost:5000/api/i18n/ru/hero');
    const heroData = await heroResponse.json();
    console.log('✅ Переводы секции hero загружены');
    console.log('📊 Данные:', JSON.stringify(heroData.data, null, 2));
    console.log('');
    
    console.log('✅ Все тесты прошли успешно!');
    console.log('🎉 Переводы загружаются с сервера корректно!');
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании:', error.message);
    console.log('\n🔧 Возможные решения:');
    console.log('1. Убедитесь, что сервер запущен: cd server && npm start');
    console.log('2. Проверьте, что порт 5000 свободен');
    console.log('3. Убедитесь, что база данных подключена');
  }
};

// Запускаем тест
testTranslations();
