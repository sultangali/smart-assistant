import Tool from '../models/Tool.js';
import { getCategoriesForAPI, isValidCategory, isValidSubcategory, getSubcategoriesByCategory } from '../constants/categories.js';

// Получить все инструменты с фильтрацией
export const getTools = async (req, res) => {
  try {
    const { category, subcategory, purpose, search } = req.query;
    const filter = {};

    if (category && category !== 'all') {
      filter.category = { $regex: category, $options: 'i' };
    }

    if (subcategory && subcategory !== 'all' && subcategory !== 'Все подкатегории') {
      filter.subcategory = { $regex: subcategory, $options: 'i' };
    }

    if (purpose && purpose !== 'all') {
      // Фильтрация по purpose: проверяем и старое поле, и многоязычные поля
      const purposeFilter = {
        $or: [
          { purpose: { $regex: purpose, $options: 'i' } },
          { 'purposes.ru': { $regex: purpose, $options: 'i' } },
          { 'purposes.en': { $regex: purpose, $options: 'i' } },
          { 'purposes.kk': { $regex: purpose, $options: 'i' } }
        ]
      };
      
      // Если уже есть $or для search, объединяем через $and
      if (filter.$or) {
        filter.$and = filter.$and || [];
        filter.$and.push({ $or: filter.$or });
        filter.$and.push(purposeFilter);
        delete filter.$or;
      } else {
        Object.assign(filter, purposeFilter);
      }
    }

    if (search) {
      const searchFilter = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { functions: { $in: [new RegExp(search, 'i')] } },
        ]
      };
      
      // Если уже есть $or для purpose, объединяем через $and
      if (filter.$or) {
        filter.$and = filter.$and || [];
        filter.$and.push({ $or: filter.$or });
        filter.$and.push(searchFilter);
        delete filter.$or;
      } else {
        Object.assign(filter, searchFilter);
      }
    }

    const tools = await Tool.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: tools.length,
      tools,
    });
  } catch (error) {
    console.error('Ошибка получения инструментов:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};

// Получить уникальные категории
export const getCategories = async (req, res) => {
  try {
    const { category } = req.query;
    
    // Получаем статические категории из констант
    const categoriesData = getCategoriesForAPI();
    
    // Если запрашивается конкретная категория, возвращаем только её подкатегории
    if (category && isValidCategory(category)) {
      const subcategories = getSubcategoriesByCategory(category);
      return res.json({
        success: true,
        categories: [category],
        subcategories: subcategories,
        hierarchy: { [category]: subcategories }
      });
    }
    
    // Получаем динамические данные из базы
    const purposes = await Tool.distinct('purpose');

    res.json({
      success: true,
      categories: categoriesData.categories,
      subcategories: categoriesData.subcategories,
      purposes: ['all', ...purposes],
      hierarchy: categoriesData.hierarchy
    });
  } catch (error) {
    console.error('Ошибка получения категорий:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};

// Получить один инструмент
export const getTool = async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id);

    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Инструмент не найден',
      });
    }

    res.json({
      success: true,
      tool,
    });
  } catch (error) {
    console.error('Ошибка получения инструмента:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};

// Создать инструмент (только для админа)
export const createTool = async (req, res) => {
  try {
    const { category, subcategory } = req.body;
    
    // Валидация категории и подкатегории
    if (!isValidCategory(category)) {
      return res.status(400).json({
        success: false,
        message: 'Неверная категория',
      });
    }
    
    if (subcategory && !isValidSubcategory(category, subcategory)) {
      return res.status(400).json({
        success: false,
        message: 'Неверная подкатегория для выбранной категории',
      });
    }

    const tool = await Tool.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Инструмент успешно создан',
      tool,
    });
  } catch (error) {
    console.error('Ошибка создания инструмента:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};

// Обновить инструмент (только для админа)
export const updateTool = async (req, res) => {
  try {
    const { category, subcategory } = req.body;
    
    // Валидация категории и подкатегории
    if (category && !isValidCategory(category)) {
      return res.status(400).json({
        success: false,
        message: 'Неверная категория',
      });
    }
    
    if (subcategory && category && !isValidSubcategory(category, subcategory)) {
      return res.status(400).json({
        success: false,
        message: 'Неверная подкатегория для выбранной категории',
      });
    }

    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Инструмент не найден',
      });
    }

    res.json({
      success: true,
      message: 'Инструмент успешно обновлен',
      tool,
    });
  } catch (error) {
    console.error('Ошибка обновления инструмента:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};

// Удалить инструмент (только для админа)
export const deleteTool = async (req, res) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);

    if (!tool) {
      return res.status(404).json({
        success: false,
        message: 'Инструмент не найден',
      });
    }

    res.json({
      success: true,
      message: 'Инструмент успешно удален',
    });
  } catch (error) {
    console.error('Ошибка удаления инструмента:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};
