import mongoose from 'mongoose';

const ToolSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    functions: {
      type: [String], // список функций
      default: [],
    },
    purpose: {
      type: String, // "Для чего"
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: ['Персонализированное обучение', 'Интерактивные технологии', 'Платформы и инструменты разработки', 'Образовательные платформы']
    },
    subcategory: {
      type: String,
      trim: true,
      validate: {
        validator: function(subcategory) {
          if (!subcategory) return true; // подкатегория не обязательна
          const validSubcategories = {
            'Персонализированное обучение': ['Адаптивное обучение', 'Образовательная аналитика'],
            'Интерактивные технологии': ['Игровые и иммерсивные технологии', 'Виртуальные лаборатории и симуляции'],
            'Платформы и инструменты разработки': ['Создание контента'],
            'Образовательные платформы': ['LMS‑интеграции']
          };
          return validSubcategories[this.category]?.includes(subcategory) || false;
        },
        message: 'Подкатегория не соответствует выбранной категории'
      }
    },
    link: {
      type: String, // ссылка на официальный сайт
      required: true,
    },
    color: {
      type: String, // кастомный цвет карточки (например, HEX)
      default: '#FFFFFF',
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.models.Tool || mongoose.model('Tool', ToolSchema);
