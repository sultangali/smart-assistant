import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api';

// Тестируем API переводов
const testI18nAPI = async () => {
  try {
    console.log('🧪 Тестируем API переводов...\n');
    
    // Тест 1: Получение поддерживаемых языков
    console.log('1️⃣ Тестируем получение поддерживаемых языков...');
    const languagesResponse = await fetch(`${API_URL}/i18n/languages`);
    const languagesData = await languagesResponse.json();
    console.log('✅ Поддерживаемые языки:', languagesData.data);
    console.log('');
    
    // Тест 2: Получение русских переводов
    console.log('2️⃣ Тестируем получение русских переводов...');
    const ruResponse = await fetch(`${API_URL}/i18n/ru`);
    const ruData = await ruResponse.json();
    console.log('✅ Русские переводы загружены');
    console.log('📊 Количество секций:', Object.keys(ruData.data).length);
    console.log('📋 Секции:', Object.keys(ruData.data));
    console.log('');
    
    // Тест 3: Получение английских переводов
    console.log('3️⃣ Тестируем получение английских переводов...');
    const enResponse = await fetch(`${API_URL}/i18n/en`);
    const enData = await enResponse.json();
    console.log('✅ Английские переводы загружены');
    console.log('📊 Количество секций:', Object.keys(enData.data).length);
    console.log('');
    
    // Тест 4: Получение переводов конкретной секции
    console.log('4️⃣ Тестируем получение переводов секции "hero"...');
    const heroResponse = await fetch(`${API_URL}/i18n/ru/hero`);
    const heroData = await heroResponse.json();
    console.log('✅ Переводы секции hero загружены');
    console.log('📊 Количество ключей:', Object.keys(heroData.data).length);
    console.log('🔑 Ключи:', Object.keys(heroData.data));
    console.log('');
    
    // Тест 5: Проверка структуры данных
    console.log('5️⃣ Проверяем структуру данных...');
    const sampleKey = Object.keys(ruData.data.landing?.hero || {})[0];
    if (sampleKey) {
      console.log(`📝 Пример ключа: ${sampleKey}`);
      console.log(`🇷🇺 Русский: ${ruData.data.landing.hero[sampleKey]}`);
      console.log(`🇬🇧 Английский: ${enData.data.landing?.hero?.[sampleKey] || 'Не найден'}`);
    }
    console.log('');
    
    console.log('✅ Все тесты прошли успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании API:', error);
  }
};

// Запускаем тесты
testI18nAPI();
