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
    // Многоязычные описания
    descriptions: {
      ru: {
        type: String,
        trim: true,
        default: '',
      },
      en: {
        type: String,
        trim: true,
        default: '',
      },
      kk: {
        type: String,
        trim: true,
        default: '',
      },
    },
    functions: {
      type: [String], // список функций (старый формат для обратной совместимости)
      default: [],
    },
    // Многоязычные функции
    functionsMultilang: {
      ru: {
        type: [String],
        default: [],
      },
      en: {
        type: [String],
        default: [],
      },
      kk: {
        type: [String],
        default: [],
      },
    },
    purpose: {
      type: String, // "Для чего" (старый формат для обратной совместимости)
      required: true,
      trim: true,
    },
    // Многоязычное назначение
    purposes: {
      ru: {
        type: String,
        trim: true,
        default: '',
      },
      en: {
        type: String,
        trim: true,
        default: '',
      },
      kk: {
        type: String,
        trim: true,
        default: '',
      },
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true, // Индекс для быстрого поиска по ключу категории
    },
    subcategory: {
      type: String,
      default: 'Все подкатегории',
      trim: true,
      index: true, // Индекс для быстрого поиска по ключу подкатегории
    },
    // Переведенные названия для отображения
    categoryName: {
      type: String,
      trim: true,
      default: '',
    },
    subcategoryName: {
      type: String,
      trim: true,
      default: '',
    },
    link: {
      type: String, // ссылка на официальный сайт
      required: true,
    },
    color: {
      type: String, // кастомный цвет карточки (например, HEX)
      default: '#FFFFFF',
    },
    logo: {
      type: String, // ссылка на логотип инструмента
      default: '',
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.model('Tool', ToolSchema);
