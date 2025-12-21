import mongoose from 'mongoose';
import { config } from '../../config/env.js';
import Content from '../models/Content.js';

// Данные контента для всех секций с переводами на 3 языка
const contentData = [
  // ==================== NAV SECTION ====================
  {
    key: 'nav.home',
    section: 'nav',
    type: 'label',
    order: 1,
    translations: {
      ru: { label: 'Главная' },
      en: { label: 'Home' },
      kk: { label: 'Басты бет' }
    }
  },
  {
    key: 'nav.tools',
    section: 'nav',
    type: 'label',
    order: 2,
    translations: {
      ru: { label: 'Инструменты' },
      en: { label: 'Tools' },
      kk: { label: 'Құралдар' }
    }
  },
  {
    key: 'nav.about',
    section: 'nav',
    type: 'label',
    order: 3,
    translations: {
      ru: { label: 'О нас' },
      en: { label: 'About' },
      kk: { label: 'Біз туралы' }
    }
  },
  {
    key: 'nav.contact',
    section: 'nav',
    type: 'label',
    order: 4,
    translations: {
      ru: { label: 'Контакты' },
      en: { label: 'Contact' },
      kk: { label: 'Байланыс' }
    }
  },
  {
    key: 'nav.admin',
    section: 'nav',
    type: 'label',
    order: 5,
    translations: {
      ru: { label: 'Админ-панель' },
      en: { label: 'Admin Panel' },
      kk: { label: 'Админ панелі' }
    }
  },

  // ==================== HERO SECTION ====================
  {
    key: 'landing.hero.title',
    section: 'hero',
    type: 'title',
    order: 1,
    translations: {
      ru: { title: 'Откройте для себя мир ИИ-инструментов для планирования, проведения и оценки уроков' },
      en: { title: 'Discover the world of AI tools for lesson planning, delivery and assessment' },
      kk: { title: 'Сабақ жоспарлау, өткізу және бағалау үшін ЖИ-құралдарының әлемін ашыңыз' }
    }
  },
  {
    key: 'landing.hero.subtitle',
    section: 'hero',
    type: 'subtitle',
    order: 2,
    translations: {
      ru: { subtitle: 'Онлайн-путеводитель ИИ-инструментов' },
      en: { subtitle: 'Online guide to AI tools' },
      kk: { subtitle: 'Жасанды интеллект құралдарының онлайн-нұсқаулығы' }
    }
  },

  // ==================== ABOUT SECTION ====================
  {
    key: 'landing.about.title',
    section: 'about',
    type: 'title',
    order: 1,
    translations: {
      ru: { title: 'О платформе' },
      en: { title: 'About the platform' },
      kk: { title: 'Платформа туралы' }
    }
  },
  {
    key: 'landing.about.description.primary',
    section: 'about',
    type: 'description',
    order: 2,
    translations: {
      ru: { description: 'Наш проект — это комплексная платформа для педагогов, объединяющая лучшие инструменты искусственного интеллекта для образовательного процесса.' },
      en: { description: 'Our project is a comprehensive platform for educators, bringing together the best artificial intelligence tools for the educational process.' },
      kk: { description: 'Біздің жоба - білім беру процесі үшін ең жақсы жасанды интеллект құралдарын біріктіретін педагогтарға арналған кешенді платформа.' }
    }
  },
  {
    key: 'landing.about.description.secondary',
    section: 'about',
    type: 'description',
    order: 3,
    translations: {
      ru: { description: 'Мы тщательно отобрали и структурировали более 100 инновационных решений, которые помогут вам планировать уроки, проводить занятия и оценивать результаты обучения.' },
      en: { description: 'We have carefully selected and structured over 100 innovative solutions that will help you plan lessons, conduct classes and evaluate learning outcomes.' },
      kk: { description: 'Біз сабақ жоспарлауға, сабақ өткізуге және оқу нәтижелерін бағалауға көмектесетін 100-ден астам инновациялық шешімді мұқият таңдап, жүйеге келтірдік.' }
    }
  },
  {
    key: 'landing.about.stats.tools.number',
    section: 'about',
    type: 'value',
    order: 4,
    translations: {
      ru: { value: '100+' },
      en: { value: '100+' },
      kk: { value: '100+' }
    }
  },
  {
    key: 'landing.about.stats.tools.label',
    section: 'about',
    type: 'label',
    order: 5,
    translations: {
      ru: { label: 'ИИ-инструментов' },
      en: { label: 'AI tools' },
      kk: { label: 'ЖИ-құралдары' }
    }
  },
  {
    key: 'landing.about.stats.categories.number',
    section: 'about',
    type: 'value',
    order: 6,
    translations: {
      ru: { value: '10+' },
      en: { value: '10+' },
      kk: { value: '10+' }
    }
  },
  {
    key: 'landing.about.stats.categories.label',
    section: 'about',
    type: 'label',
    order: 7,
    translations: {
      ru: { label: 'Категорий' },
      en: { label: 'Categories' },
      kk: { label: 'Санаттар' }
    }
  },
  {
    key: 'landing.about.stats.availability.number',
    section: 'about',
    type: 'value',
    order: 8,
    translations: {
      ru: { value: '24/7' },
      en: { value: '24/7' },
      kk: { value: '24/7' }
    }
  },
  {
    key: 'landing.about.stats.availability.label',
    section: 'about',
    type: 'label',
    order: 9,
    translations: {
      ru: { label: 'Доступность' },
      en: { label: 'Availability' },
      kk: { label: 'Қолжетімділік' }
    }
  },
  {
    key: 'landing.about.info.title',
    section: 'about',
    type: 'title',
    order: 10,
    translations: {
      ru: { title: 'Почему выбирают нашу платформу?' },
      en: { title: 'Why choose our platform?' },
      kk: { title: 'Неге біздің платформаны таңдау керек?' }
    }
  },
  {
    key: 'landing.about.info.description',
    section: 'about',
    type: 'description',
    order: 11,
    translations: {
      ru: { description: 'Каждый инструмент сопровождается подробным описанием, категоризацией и практическими рекомендациями по использованию. Мы постоянно обновляем базу данных и добавляем новые решения.' },
      en: { description: 'Each tool comes with a detailed description, categorization and practical recommendations for use. We constantly update our database and add new solutions.' },
      kk: { description: 'Әр құрал толық сипаттамамен, категориялаумен және пайдалану бойынша практикалық ұсыныстармен қамтамасыз етіледі. Біз деректер базасын үнемі жаңартып, жаңа шешімдерді қосамыз.' }
    }
  },

  // ==================== FILTER SECTION ====================
  {
    key: 'landing.filter.title',
    section: 'filter',
    type: 'title',
    order: 1,
    translations: {
      ru: { title: 'Подбор инструментов' },
      en: { title: 'Tool selection' },
      kk: { title: 'Құралдарды таңдау' }
    }
  },
  {
    key: 'landing.filter.category',
    section: 'filter',
    type: 'label',
    order: 2,
    translations: {
      ru: { label: 'Категория' },
      en: { label: 'Category' },
      kk: { label: 'Санат' }
    }
  },
  {
    key: 'landing.filter.subcategory',
    section: 'filter',
    type: 'label',
    order: 3,
    translations: {
      ru: { label: 'Подкатегория' },
      en: { label: 'Subcategory' },
      kk: { label: 'Ішкі санат' }
    }
  },
  {
    key: 'landing.filter.purpose',
    section: 'filter',
    type: 'label',
    order: 4,
    translations: {
      ru: { label: 'Назначение' },
      en: { label: 'Purpose' },
      kk: { label: 'Мақсаты' }
    }
  },
  {
    key: 'landing.filter.search_button',
    section: 'filter',
    type: 'button',
    order: 5,
    translations: {
      ru: { button: 'Найти' },
      en: { button: 'Search' },
      kk: { button: 'Табу' }
    }
  },
  {
    key: 'landing.filter.reset',
    section: 'filter',
    type: 'button',
    order: 6,
    translations: {
      ru: { button: 'Сбросить' },
      en: { button: 'Reset' },
      kk: { button: 'Тазалау' }
    }
  },

  // ==================== FEEDBACK SECTION ====================
  {
    key: 'landing.feedback.title',
    section: 'feedback',
    type: 'title',
    order: 1,
    translations: {
      ru: { title: 'Обратная связь' },
      en: { title: 'Feedback' },
      kk: { title: 'Кері байланыс' }
    }
  },
  {
    key: 'landing.feedback.subtitle',
    section: 'feedback',
    type: 'subtitle',
    order: 2,
    translations: {
      ru: { subtitle: 'Поделитесь своими мыслями и помогите нам стать лучше' },
      en: { subtitle: 'Share your thoughts and help us improve' },
      kk: { subtitle: 'Өз ойларыңызбен бөлісіп, бізге жақсарауға көмектесіңіз' }
    }
  },
  {
    key: 'landing.feedback.name',
    section: 'feedback',
    type: 'placeholder',
    order: 3,
    translations: {
      ru: { placeholder: 'Ваше имя' },
      en: { placeholder: 'Your name' },
      kk: { placeholder: 'Сіздің атыңыз' }
    }
  },
  {
    key: 'landing.feedback.email',
    section: 'feedback',
    type: 'placeholder',
    order: 4,
    translations: {
      ru: { placeholder: 'Ваш e-mail' },
      en: { placeholder: 'Your e-mail' },
      kk: { placeholder: 'Сіздің e-mail' }
    }
  },
  {
    key: 'landing.feedback.type',
    section: 'feedback',
    type: 'label',
    order: 5,
    translations: {
      ru: { label: 'Тип сообщения' },
      en: { label: 'Message type' },
      kk: { label: 'Хабарлама түрі' }
    }
  },
  {
    key: 'landing.feedback.message',
    section: 'feedback',
    type: 'placeholder',
    order: 6,
    translations: {
      ru: { placeholder: 'Ваше сообщение' },
      en: { placeholder: 'Your message' },
      kk: { placeholder: 'Сіздің хабарламаңыз' }
    }
  },
  {
    key: 'landing.feedback.submit',
    section: 'feedback',
    type: 'button',
    order: 7,
    translations: {
      ru: { button: 'Отправить' },
      en: { button: 'Submit' },
      kk: { button: 'Жіберу' }
    }
  },

  // ==================== CONTACT SECTION ====================
  {
    key: 'landing.contact.title',
    section: 'contact',
    type: 'title',
    order: 1,
    translations: {
      ru: { title: 'Связаться с нами' },
      en: { title: 'Contact us' },
      kk: { title: 'Бізбен байланысыңыз' }
    }
  },
  {
    key: 'landing.contact.subtitle',
    section: 'contact',
    type: 'subtitle',
    order: 2,
    translations: {
      ru: { subtitle: 'Свяжитесь с нами для получения дополнительной информации или поддержки по использованию платформы' },
      en: { subtitle: 'Contact us for more information or support on using the platform' },
      kk: { subtitle: 'Платформаны пайдалану бойынша қосымша ақпарат алу немесе қолдау алу үшін бізбен байланысыңыз' }
    }
  },
  {
    key: 'landing.contact.email.title',
    section: 'contact',
    type: 'label',
    order: 3,
    translations: {
      ru: { label: 'Электронная почта' },
      en: { label: 'Email' },
      kk: { label: 'Электрондық пошта' }
    }
  },
  {
    key: 'landing.contact.email.value',
    section: 'contact',
    type: 'value',
    order: 4,
    translations: {
      ru: { value: 'info@smartassistant.edu' },
      en: { value: 'info@smartassistant.edu' },
      kk: { value: 'info@smartassistant.edu' }
    }
  },
  {
    key: 'landing.contact.phone.title',
    section: 'contact',
    type: 'label',
    order: 5,
    translations: {
      ru: { label: 'Телефон' },
      en: { label: 'Phone' },
      kk: { label: 'Телефон' }
    }
  },
  {
    key: 'landing.contact.phone.value',
    section: 'contact',
    type: 'value',
    order: 6,
    translations: {
      ru: { value: '+7 (XXX) XXX-XX-XX' },
      en: { value: '+7 (XXX) XXX-XX-XX' },
      kk: { value: '+7 (XXX) XXX-XX-XX' }
    }
  },
  {
    key: 'landing.contact.time.title',
    section: 'contact',
    type: 'label',
    order: 7,
    translations: {
      ru: { label: 'Время работы' },
      en: { label: 'Working hours' },
      kk: { label: 'Жұмыс уақыты' }
    }
  },
  {
    key: 'landing.contact.time.value',
    section: 'contact',
    type: 'value',
    order: 8,
    translations: {
      ru: { value: 'Пн-Пт: 9:00-18:00' },
      en: { value: 'Mon-Fri: 9:00-18:00' },
      kk: { value: 'Дс-Жм: 9:00-18:00' }
    }
  },

  // ==================== COMMON SECTION ====================
  {
    key: 'common.loading',
    section: 'common',
    type: 'text',
    order: 1,
    translations: {
      ru: { content: 'Загрузка...' },
      en: { content: 'Loading...' },
      kk: { content: 'Жүктелуде...' }
    }
  },
  {
    key: 'common.error',
    section: 'common',
    type: 'text',
    order: 2,
    translations: {
      ru: { content: 'Ошибка' },
      en: { content: 'Error' },
      kk: { content: 'Қате' }
    }
  },
  {
    key: 'common.success',
    section: 'common',
    type: 'text',
    order: 3,
    translations: {
      ru: { content: 'Успешно' },
      en: { content: 'Success' },
      kk: { content: 'Сәтті' }
    }
  },
  {
    key: 'common.cancel',
    section: 'common',
    type: 'button',
    order: 4,
    translations: {
      ru: { button: 'Отмена' },
      en: { button: 'Cancel' },
      kk: { button: 'Болдырмау' }
    }
  },
  {
    key: 'common.save',
    section: 'common',
    type: 'button',
    order: 5,
    translations: {
      ru: { button: 'Сохранить' },
      en: { button: 'Save' },
      kk: { button: 'Сақтау' }
    }
  },
  {
    key: 'common.delete',
    section: 'common',
    type: 'button',
    order: 6,
    translations: {
      ru: { button: 'Удалить' },
      en: { button: 'Delete' },
      kk: { button: 'Жою' }
    }
  },
  {
    key: 'common.edit',
    section: 'common',
    type: 'button',
    order: 7,
    translations: {
      ru: { button: 'Редактировать' },
      en: { button: 'Edit' },
      kk: { button: 'Өңдеу' }
    }
  },
  {
    key: 'common.search',
    section: 'common',
    type: 'placeholder',
    order: 8,
    translations: {
      ru: { placeholder: 'Поиск' },
      en: { placeholder: 'Search' },
      kk: { placeholder: 'Іздеу' }
    }
  },
  {
    key: 'common.all',
    section: 'common',
    type: 'label',
    order: 9,
    translations: {
      ru: { label: 'Все' },
      en: { label: 'All' },
      kk: { label: 'Барлығы' }
    }
  },

  // ==================== ADMIN SECTION ====================
  {
    key: 'admin.login.title',
    section: 'admin',
    type: 'title',
    order: 1,
    translations: {
      ru: { title: 'Вход в админ-панель' },
      en: { title: 'Admin Panel Login' },
      kk: { title: 'Админ панеліне кіру' }
    }
  },
  {
    key: 'admin.dashboard.title',
    section: 'admin',
    type: 'title',
    order: 2,
    translations: {
      ru: { title: 'Панель управления' },
      en: { title: 'Dashboard' },
      kk: { title: 'Басқару панелі' }
    }
  },
  {
    key: 'admin.tools.title',
    section: 'admin',
    type: 'title',
    order: 3,
    translations: {
      ru: { title: 'Управление инструментами' },
      en: { title: 'Tools Management' },
      kk: { title: 'Құралдарды басқару' }
    }
  },
  {
    key: 'admin.feedback.title',
    section: 'admin',
    type: 'title',
    order: 4,
    translations: {
      ru: { title: 'Управление обратной связью' },
      en: { title: 'Feedback Management' },
      kk: { title: 'Кері байланысты басқару' }
    }
  },
  {
    key: 'admin.content.title',
    section: 'admin',
    type: 'title',
    order: 5,
    translations: {
      ru: { title: 'Управление контентом' },
      en: { title: 'Content Management' },
      kk: { title: 'Мазмұнды басқару' }
    }
  }
];

// Функция для нормализации данных контента
const normalizeContentData = (data) => {
  return data.map(item => {
    const normalized = {
      key: item.key,
      section: item.section,
      type: item.type,
      order: item.order || 0,
      isVisible: item.isVisible !== false,
      metadata: item.metadata || { component: '', field: '', category: '' },
      translations: {
        ru: {
          title: item.translations.ru?.title || '',
          subtitle: item.translations.ru?.subtitle || '',
          content: item.translations.ru?.content || '',
          description: item.translations.ru?.description || '',
          placeholder: item.translations.ru?.placeholder || '',
          button: item.translations.ru?.button || '',
          label: item.translations.ru?.label || '',
          value: item.translations.ru?.value || ''
        },
        en: {
          title: item.translations.en?.title || '',
          subtitle: item.translations.en?.subtitle || '',
          content: item.translations.en?.content || '',
          description: item.translations.en?.description || '',
          placeholder: item.translations.en?.placeholder || '',
          button: item.translations.en?.button || '',
          label: item.translations.en?.label || '',
          value: item.translations.en?.value || ''
        },
        kk: {
          title: item.translations.kk?.title || '',
          subtitle: item.translations.kk?.subtitle || '',
          content: item.translations.kk?.content || '',
          description: item.translations.kk?.description || '',
          placeholder: item.translations.kk?.placeholder || '',
          button: item.translations.kk?.button || '',
          label: item.translations.kk?.label || '',
          value: item.translations.kk?.value || ''
        }
      }
    };
    return normalized;
  });
};

const seedContent = async () => {
  try {
    console.log('🔄 Подключение к MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Подключен к MongoDB для заполнения контентом');
    
    // Очистка существующего контента
    const deleteResult = await Content.deleteMany({});
    console.log(`🗑️ Удалено ${deleteResult.deletedCount} существующих записей контента`);
    
    // Нормализация и добавление контента
    const normalizedData = normalizeContentData(contentData);
    const insertResult = await Content.insertMany(normalizedData);
    console.log(`✅ Добавлено ${insertResult.length} записей контента`);
    
    // Проверка
    const count = await Content.countDocuments();
    console.log(`📊 Общее количество контента в базе: ${count}`);
    
    // Выводим несколько примеров
    const samples = await Content.find().limit(3).lean();
    console.log('\n📝 Примеры добавленного контента:');
    samples.forEach(sample => {
      console.log(`  - ${sample.key}: ${sample.section} (${sample.type})`);
    });
    
    console.log('\n✅ Контент успешно добавлен в базу данных!');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка при заполнении контентом:', error);
    process.exit(1);
  }
};

// Запуск только если файл выполняется напрямую
if (import.meta.url === `file://${process.argv[1]}`) {
  seedContent();
}

export { contentData, seedContent };



