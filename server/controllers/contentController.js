import Content from '../db/models/Content.js';

// @desc    Получить весь контент
// @route   GET /api/content
// @access  Private (Admin only)
export const getAllContent = async (req, res) => {
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
    console.error('Ошибка при получении контента:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении контента'
    });
  }
};

// @desc    Получить контент по секции
// @route   GET /api/content/section/:section
// @access  Public
export const getContentBySection = async (req, res) => {
  try {
    const { section } = req.params;
    const { lang = 'ru' } = req.query;
    
    const content = await Content.find({ section, isVisible: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    
    // Преобразуем в удобный формат
    const result = {};
    content.forEach(item => {
      const translation = item.translations?.[lang] || item.translations?.ru || {};
      result[item.key] = {
        ...translation,
        _id: item._id,
        type: item.type,
        metadata: item.metadata,
      };
    });
    
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Ошибка при получении контента секции:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении контента секции'
    });
  }
};

// @desc    Создать новый контент
// @route   POST /api/content
// @access  Private (Admin only)
export const createContent = async (req, res) => {
  try {
    const {
      key,
      section,
      type,
      translations,
      isVisible = true,
      order = 0,
      metadata = {}
    } = req.body;

    // Проверяем обязательные поля
    if (!key || !section || !type) {
      return res.status(400).json({
        success: false,
        message: 'Поля key, section и type обязательны'
      });
    }

    // Проверяем, существует ли уже контент с таким ключом
    const existingContent = await Content.findOne({ key });
    if (existingContent) {
      return res.status(400).json({
        success: false,
        message: 'Контент с таким ключом уже существует'
      });
    }

    // Нормализуем переводы
    const normalizedTranslations = {
      ru: {
        title: translations?.ru?.title || '',
        subtitle: translations?.ru?.subtitle || '',
        content: translations?.ru?.content || '',
        description: translations?.ru?.description || '',
        placeholder: translations?.ru?.placeholder || '',
        button: translations?.ru?.button || '',
        label: translations?.ru?.label || '',
        value: translations?.ru?.value || ''
      },
      en: {
        title: translations?.en?.title || '',
        subtitle: translations?.en?.subtitle || '',
        content: translations?.en?.content || '',
        description: translations?.en?.description || '',
        placeholder: translations?.en?.placeholder || '',
        button: translations?.en?.button || '',
        label: translations?.en?.label || '',
        value: translations?.en?.value || ''
      },
      kk: {
        title: translations?.kk?.title || '',
        subtitle: translations?.kk?.subtitle || '',
        content: translations?.kk?.content || '',
        description: translations?.kk?.description || '',
        placeholder: translations?.kk?.placeholder || '',
        button: translations?.kk?.button || '',
        label: translations?.kk?.label || '',
        value: translations?.kk?.value || ''
      }
    };

    const content = new Content({
      key,
      section,
      type,
      translations: normalizedTranslations,
      isVisible,
      order: parseInt(order, 10) || 0,
      metadata: {
        component: metadata?.component || '',
        field: metadata?.field || '',
        category: metadata?.category || ''
      }
    });

    await content.save();

    res.status(201).json({
      success: true,
      data: content,
      message: 'Контент успешно создан'
    });
  } catch (error) {
    console.error('Ошибка при создании контента:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Ошибка сервера при создании контента'
    });
  }
};

// @desc    Обновить контент
// @route   PUT /api/content/:id
// @access  Private (Admin only)
export const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      key,
      section,
      type,
      translations,
      isVisible,
      order,
      metadata
    } = req.body;

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Контент не найден'
      });
    }

    // Обновляем поля
    if (key) content.key = key;
    if (section) content.section = section;
    if (type) content.type = type;
    if (translations) {
      content.translations = {
        ru: {
          title: translations.ru?.title ?? content.translations.ru?.title ?? '',
          subtitle: translations.ru?.subtitle ?? content.translations.ru?.subtitle ?? '',
          content: translations.ru?.content ?? content.translations.ru?.content ?? '',
          description: translations.ru?.description ?? content.translations.ru?.description ?? '',
          placeholder: translations.ru?.placeholder ?? content.translations.ru?.placeholder ?? '',
          button: translations.ru?.button ?? content.translations.ru?.button ?? '',
          label: translations.ru?.label ?? content.translations.ru?.label ?? '',
          value: translations.ru?.value ?? content.translations.ru?.value ?? ''
        },
        en: {
          title: translations.en?.title ?? content.translations.en?.title ?? '',
          subtitle: translations.en?.subtitle ?? content.translations.en?.subtitle ?? '',
          content: translations.en?.content ?? content.translations.en?.content ?? '',
          description: translations.en?.description ?? content.translations.en?.description ?? '',
          placeholder: translations.en?.placeholder ?? content.translations.en?.placeholder ?? '',
          button: translations.en?.button ?? content.translations.en?.button ?? '',
          label: translations.en?.label ?? content.translations.en?.label ?? '',
          value: translations.en?.value ?? content.translations.en?.value ?? ''
        },
        kk: {
          title: translations.kk?.title ?? content.translations.kk?.title ?? '',
          subtitle: translations.kk?.subtitle ?? content.translations.kk?.subtitle ?? '',
          content: translations.kk?.content ?? content.translations.kk?.content ?? '',
          description: translations.kk?.description ?? content.translations.kk?.description ?? '',
          placeholder: translations.kk?.placeholder ?? content.translations.kk?.placeholder ?? '',
          button: translations.kk?.button ?? content.translations.kk?.button ?? '',
          label: translations.kk?.label ?? content.translations.kk?.label ?? '',
          value: translations.kk?.value ?? content.translations.kk?.value ?? ''
        }
      };
    }
    if (typeof isVisible === 'boolean') content.isVisible = isVisible;
    if (order !== undefined) content.order = parseInt(order, 10) || 0;
    if (metadata) {
      content.metadata = {
        component: metadata.component ?? content.metadata?.component ?? '',
        field: metadata.field ?? content.metadata?.field ?? '',
        category: metadata.category ?? content.metadata?.category ?? ''
      };
    }

    await content.save();

    res.status(200).json({
      success: true,
      data: content,
      message: 'Контент успешно обновлен'
    });
  } catch (error) {
    console.error('Ошибка при обновлении контента:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при обновлении контента'
    });
  }
};

// @desc    Обновить перевод контента
// @route   PUT /api/content/:id/translation/:lang
// @access  Private (Admin only)
export const updateTranslation = async (req, res) => {
  try {
    const { id, lang } = req.params;
    const translationData = req.body;

    if (!['ru', 'en', 'kk'].includes(lang)) {
      return res.status(400).json({
        success: false,
        message: 'Неподдерживаемый язык'
      });
    }

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Контент не найден'
      });
    }

    // Обновляем конкретный перевод
    content.translations[lang] = {
      title: translationData.title ?? content.translations[lang]?.title ?? '',
      subtitle: translationData.subtitle ?? content.translations[lang]?.subtitle ?? '',
      content: translationData.content ?? content.translations[lang]?.content ?? '',
      description: translationData.description ?? content.translations[lang]?.description ?? '',
      placeholder: translationData.placeholder ?? content.translations[lang]?.placeholder ?? '',
      button: translationData.button ?? content.translations[lang]?.button ?? '',
      label: translationData.label ?? content.translations[lang]?.label ?? '',
      value: translationData.value ?? content.translations[lang]?.value ?? ''
    };

    await content.save();

    res.status(200).json({
      success: true,
      data: content,
      message: `Перевод на ${lang} успешно обновлен`
    });
  } catch (error) {
    console.error('Ошибка при обновлении перевода:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при обновлении перевода'
    });
  }
};

// @desc    Удалить контент
// @route   DELETE /api/content/:id
// @access  Private (Admin only)
export const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Контент не найден'
      });
    }

    await Content.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Контент успешно удален'
    });
  } catch (error) {
    console.error('Ошибка при удалении контента:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при удалении контента'
    });
  }
};

// @desc    Получить секции контента
// @route   GET /api/content/sections
// @access  Public
export const getSections = async (req, res) => {
  try {
    // Возвращаем все доступные секции (статический список + существующие в БД)
    const dbSections = await Content.distinct('section');
    const allSections = ['hero', 'about', 'filter', 'feedback', 'contact', 'nav', 'common', 'admin'];
    const mergedSections = [...new Set([...allSections, ...dbSections])];
    
    res.status(200).json({
      success: true,
      data: mergedSections
    });
  } catch (error) {
    console.error('Ошибка при получении секций:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении секций'
    });
  }
};

// @desc    Получить контент по ключу
// @route   GET /api/content/key/:key
// @access  Public
export const getContentByKey = async (req, res) => {
  try {
    const { key } = req.params;
    const { lang = 'ru' } = req.query;
    
    const content = await Content.findOne({ key, isVisible: true }).lean();
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Контент не найден'
      });
    }
    
    const translation = content.translations?.[lang] || content.translations?.ru || {};
    
    res.status(200).json({
      success: true,
      data: {
        ...translation,
        _id: content._id,
        key: content.key,
        type: content.type,
        section: content.section
      }
    });
  } catch (error) {
    console.error('Ошибка при получении контента по ключу:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении контента'
    });
  }
};
