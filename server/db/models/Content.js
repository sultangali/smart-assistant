import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    section: {
      type: String,
      required: true,
      enum: ['hero', 'about', 'filter', 'feedback', 'contact', 'nav', 'common', 'admin'],
    },
    translations: {
      ru: {
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        content: { type: String, default: '' },
        description: { type: String, default: '' },
        placeholder: { type: String, default: '' },
        button: { type: String, default: '' },
        label: { type: String, default: '' },
        value: { type: String, default: '' },
      },
      en: {
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        content: { type: String, default: '' },
        description: { type: String, default: '' },
        placeholder: { type: String, default: '' },
        button: { type: String, default: '' },
        label: { type: String, default: '' },
        value: { type: String, default: '' },
      },
      kk: {
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        content: { type: String, default: '' },
        description: { type: String, default: '' },
        placeholder: { type: String, default: '' },
        button: { type: String, default: '' },
        label: { type: String, default: '' },
        value: { type: String, default: '' },
      },
    },
    type: {
      type: String,
      required: true,
      enum: ['text', 'title', 'subtitle', 'description', 'placeholder', 'button', 'label', 'value'],
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    metadata: {
      component: { type: String, default: '' },
      field: { type: String, default: '' },
      category: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

// Индексы для оптимизации запросов
ContentSchema.index({ key: 1 });
ContentSchema.index({ section: 1 });
ContentSchema.index({ type: 1 });
ContentSchema.index({ 'metadata.component': 1 });

// Виртуальное поле для получения перевода по языку
ContentSchema.virtual('getTranslation').get(function() {
  return function(lang = 'ru') {
    return this.translations[lang] || this.translations.ru;
  };
});

// Метод для обновления перевода
ContentSchema.methods.updateTranslation = function(lang, data) {
  if (this.translations[lang]) {
    Object.assign(this.translations[lang], data);
  } else {
    this.translations[lang] = data;
  }
  return this.save();
};

// Статический метод для получения контента по секции
ContentSchema.statics.getBySection = function(section, lang = 'ru') {
  return this.find({ section, isVisible: true })
    .sort({ order: 1, createdAt: 1 })
    .lean()
    .then(contents => {
      const result = {};
      contents.forEach(content => {
        const translation = content.translations[lang] || content.translations.ru;
        result[content.key] = {
          ...translation,
          _id: content._id,
          type: content.type,
          metadata: content.metadata,
        };
      });
      return result;
    });
};

// Статический метод для получения всех переводов
ContentSchema.statics.getAllTranslations = function() {
  return this.find({ isVisible: true })
    .sort({ section: 1, order: 1, createdAt: 1 })
    .lean();
};

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);