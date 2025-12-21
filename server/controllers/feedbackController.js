import Feedback from '../models/Feedback.js';

// Создать обратную связь
export const createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Ваше сообщение успешно отправлено',
      feedback,
    });
  } catch (error) {
    console.error('Ошибка создания обратной связи:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};

// Получить все обратные связи (только для админа)
export const getFeedbacks = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (type && type !== 'all') {
      filter.type = type;
    }

    const skip = (page - 1) * limit;
    
    const feedbacks = await Feedback.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Feedback.countDocuments(filter);

    res.json({
      success: true,
      feedbacks,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error('Ошибка получения обратной связи:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};

// Обновить статус обратной связи (только для админа)
export const updateFeedbackStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true, runValidators: true }
    );

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Обратная связь не найдена',
      });
    }

    res.json({
      success: true,
      message: 'Статус успешно обновлен',
      feedback,
    });
  } catch (error) {
    console.error('Ошибка обновления статуса:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};

// Удалить обратную связь (только для админа)
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Обратная связь не найдена',
      });
    }

    res.json({
      success: true,
      message: 'Обратная связь успешно удалена',
    });
  } catch (error) {
    console.error('Ошибка удаления обратной связи:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};
