// Тест исправления проблемы с кэшем i18n
const fs = require('fs');
const path = require('path');

console.log('🧪 Тестирование исправления проблемы с кэшем i18n...\n');

// Проверяем обновления в config.js
const configPath = path.join(__dirname, 'client/src/i18n/config.js');
try {
  const content = fs.readFileSync(configPath, 'utf8');
  
  console.log('✅ i18n/config.js исправления:');
  
  // Проверяем загрузку всех языков при инициализации
  const hasAllLanguagesInit = content.includes('loadTranslationsFromServer(\'ru\')') &&
                              content.includes('loadTranslationsFromServer(\'en\')') &&
                              content.includes('loadTranslationsFromServer(\'kk\')');
  console.log(`   - Загрузка всех языков при инициализации: ${hasAllLanguagesInit ? '✅' : '❌'}`);
  
  // Проверяем очистку кэша
  const hasCacheClear = content.includes('i18n.removeResourceBundle(language, \'translation\')');
  console.log(`   - Очистка кэша перед загрузкой: ${hasCacheClear ? '✅' : '❌'}`);
  
  // Проверяем тестовый перевод
  const hasTestTranslation = content.includes('i18n.t(\'landing.hero.title\', { lng: language })');
  console.log(`   - Тестовый перевод с языком: ${hasTestTranslation ? '✅' : '❌'}`);
  
  console.log('');
} catch (error) {
  console.log(`❌ Ошибка чтения config.js: ${error.message}`);
}

// Проверяем обновления в LanguageSwitcher.jsx
const switcherPath = path.join(__dirname, 'client/src/components/UI/LanguageSwitcher.jsx');
try {
  const content = fs.readFileSync(switcherPath, 'utf8');
  
  console.log('✅ LanguageSwitcher.jsx исправления:');
  
  // Проверяем импорт reloadTranslations
  const hasReloadImport = content.includes('import { reloadTranslations }');
  console.log(`   - Импорт reloadTranslations: ${hasReloadImport ? '✅' : '❌'}`);
  
  // Проверяем вызов reloadTranslations в handleLanguageChange
  const hasReloadCall = content.includes('await reloadTranslations(languageCode)');
  console.log(`   - Вызов reloadTranslations при смене языка: ${hasReloadCall ? '✅' : '❌'}`);
  
  console.log('');
} catch (error) {
  console.log(`❌ Ошибка чтения LanguageSwitcher.jsx: ${error.message}`);
}

// Проверяем обновления в TranslationReloader.jsx
const reloaderPath = path.join(__dirname, 'client/src/components/TranslationReloader.jsx');
try {
  const content = fs.readFileSync(reloaderPath, 'utf8');
  
  console.log('✅ TranslationReloader.jsx исправления:');
  
  // Проверяем импорт reloadTranslations
  const hasReloadImport = content.includes('import { reloadTranslations }');
  console.log(`   - Импорт reloadTranslations: ${hasReloadImport ? '✅' : '❌'}`);
  
  // Проверяем перезагрузку всех языков
  const hasAllLanguagesReload = content.includes('reloadTranslations(\'ru\')') &&
                                content.includes('reloadTranslations(\'en\')') &&
                                content.includes('reloadTranslations(\'kk\')');
  console.log(`   - Перезагрузка всех языков: ${hasAllLanguagesReload ? '✅' : '❌'}`);
  
  // Проверяем Promise.all
  const hasPromiseAll = content.includes('Promise.all([');
  console.log(`   - Использование Promise.all: ${hasPromiseAll ? '✅' : '❌'}`);
  
  console.log('');
} catch (error) {
  console.log(`❌ Ошибка чтения TranslationReloader.jsx: ${error.message}`);
}

console.log('🎉 Тестирование исправления кэша завершено!');
console.log('\n💡 Рекомендации:');
console.log('1. Перезапустите сервер для применения изменений');
console.log('2. Очистите кэш браузера (Ctrl+Shift+R)');
console.log('3. Используйте кнопку "Перезагрузить переводы" в админ-панели');
console.log('4. Проверьте консоль браузера на наличие сообщений о загрузке переводов');
