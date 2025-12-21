import Joi from 'joi';

export const validateTool = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().min(10).max(1000).required(),
    descriptions: Joi.object({
      ru: Joi.string().allow(''),
      en: Joi.string().allow(''),
      kk: Joi.string().allow(''),
    }).optional(),
    functions: Joi.array().items(Joi.string().max(100)).optional(),
    functionsMultilang: Joi.object({
      ru: Joi.array().items(Joi.string().max(100)).optional(),
      en: Joi.array().items(Joi.string().max(100)).optional(),
      kk: Joi.array().items(Joi.string().max(100)).optional(),
    }).optional(),
    // purpose теперь опционально, если есть purposes
    purpose: Joi.string().min(5).max(500).allow('').optional(),
    purposes: Joi.object({
      ru: Joi.string().min(5).max(500).allow(''),
      en: Joi.string().min(5).max(500).allow(''),
      kk: Joi.string().min(5).max(500).allow(''),
    }).optional(),
    category: Joi.string().min(2).max(100).required(),
    subcategory: Joi.string().max(100),
    link: Joi.string().uri().required(),
    color: Joi.string().pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
    logo: Joi.string().uri().allow(''),
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Ошибка валидации',
      details: error.details[0].message,
    });
  }

  // Проверяем, что есть хотя бы одно поле purpose или purposes с непустым значением
  const hasPurpose = req.body.purpose && req.body.purpose.trim().length >= 5;
  const hasPurposes = req.body.purposes && (
    (req.body.purposes.ru && req.body.purposes.ru.trim().length >= 5) ||
    (req.body.purposes.en && req.body.purposes.en.trim().length >= 5) ||
    (req.body.purposes.kk && req.body.purposes.kk.trim().length >= 5)
  );

  if (!hasPurpose && !hasPurposes) {
    return res.status(400).json({
      success: false,
      message: 'Ошибка валидации',
      details: '"purpose" или хотя бы одно поле в "purposes" должно быть заполнено (минимум 5 символов)',
    });
  }

  // Если есть purposes, но нет purpose, заполняем purpose из purposes.ru для обратной совместимости
  if (req.body.purposes && !req.body.purpose) {
    req.body.purpose = req.body.purposes.ru || req.body.purposes.en || req.body.purposes.kk || '';
  }
  
  // Если есть functionsMultilang, но нет functions, заполняем functions из functionsMultilang.ru
  if (req.body.functionsMultilang && (!req.body.functions || req.body.functions.length === 0)) {
    req.body.functions = req.body.functionsMultilang.ru || req.body.functionsMultilang.en || req.body.functionsMultilang.kk || [];
  }

  next();
};

export const validateFeedback = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    type: Joi.string().valid('complaint', 'suggestion', 'question', 'other').required(),
    message: Joi.string().min(10).max(2000).required(),
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Ошибка валидации',
      details: error.details[0].message,
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Ошибка валидации',
      details: error.details[0].message,
    });
  }

  next();
};

export const validateContent = (req, res, next) => {
  const schema = Joi.object({
    key: Joi.string().pattern(/^[a-zA-Z0-9._-]+$/).required().messages({
      'string.pattern.base': 'Ключ может содержать только буквы, цифры, точки, дефисы и подчеркивания'
    }),
    section: Joi.string().valid('hero', 'about', 'filter', 'feedback', 'contact', 'nav', 'common', 'admin').required(),
    type: Joi.string().valid('text', 'title', 'subtitle', 'description', 'placeholder', 'button', 'label', 'value').required(),
    translations: Joi.object({
      ru: Joi.object({
        title: Joi.string().allow(''),
        subtitle: Joi.string().allow(''),
        content: Joi.string().allow(''),
        description: Joi.string().allow(''),
        placeholder: Joi.string().allow(''),
        button: Joi.string().allow(''),
        label: Joi.string().allow(''),
        value: Joi.string().allow(''),
      }).optional(),
      en: Joi.object({
        title: Joi.string().allow(''),
        subtitle: Joi.string().allow(''),
        content: Joi.string().allow(''),
        description: Joi.string().allow(''),
        placeholder: Joi.string().allow(''),
        button: Joi.string().allow(''),
        label: Joi.string().allow(''),
        value: Joi.string().allow(''),
      }).optional(),
      kk: Joi.object({
        title: Joi.string().allow(''),
        subtitle: Joi.string().allow(''),
        content: Joi.string().allow(''),
        description: Joi.string().allow(''),
        placeholder: Joi.string().allow(''),
        button: Joi.string().allow(''),
        label: Joi.string().allow(''),
        value: Joi.string().allow(''),
      }).optional(),
    }).optional(),
    isVisible: Joi.boolean().optional(),
    order: Joi.number().integer().min(0).optional(),
    metadata: Joi.object({
      component: Joi.string().allow(''),
      field: Joi.string().allow(''),
      category: Joi.string().allow(''),
    }).optional(),
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Ошибка валидации контента',
      details: error.details[0].message,
    });
  }

  next();
};
