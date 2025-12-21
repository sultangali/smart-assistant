import Feedback from '../models/Feedback.js';
import Admin from '../models/Admin.js';
import { sendNewFeedbackNotification, sendAdminReplyToUser } from '../services/emailService.js';
import { config } from '../config/env.js';

// Создать обратную связь
export const createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);

    // Отправляем уведомление админу о новой обратной связи
    try {
      // Получаем email админа для уведомлений
      const admin = await Admin.findOne();
      if (admin) {
        // Определяем email для уведомления
        const isValidEmail = (email) => {
          if (!email || typeof email !== 'string') return false;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email.trim());
        };
        
        let adminEmail = admin.notificationEmail || admin.email;
        
        // Если email не валидный, используем SMTP_USER или ADMIN_NOTIFICATION_EMAIL
        if (!isValidEmail(adminEmail)) {
          if (config.ADMIN_NOTIFICATION_EMAIL && isValidEmail(config.ADMIN_NOTIFICATION_EMAIL)) {
            adminEmail = config.ADMIN_NOTIFICATION_EMAIL;
          } else if (config.SMTP_USER && isValidEmail(config.SMTP_USER)) {
            adminEmail = config.SMTP_USER;
          }
        }
        
        // Отправляем email только если email валидный
        if (isValidEmail(adminEmail)) {
          await sendNewFeedbackNotification(adminEmail, feedback);
          console.log(`✅ Уведомление о новой обратной связи отправлено на ${adminEmail}`);
        } else {
          console.warn(`⚠️ Не удалось отправить уведомление админу: невалидный email адрес`);
        }
      }
    } catch (emailError) {
      // Логируем ошибку, но не прерываем процесс создания обратной связи
      console.error('❌ Ошибка отправки email уведомления админу:', emailError);
    }

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
    
    // Получаем старый feedback чтобы проверить, был ли ответ админа
    const oldFeedback = await Feedback.findById(req.params.id);
    
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

    // Отправляем ответ админа пользователю, если есть adminNotes (ответ)
    if (adminNotes && adminNotes.trim() && oldFeedback && oldFeedback.adminNotes !== adminNotes) {
      try {
        const isValidEmail = (email) => {
          if (!email || typeof email !== 'string') return false;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email.trim());
        };
        
        // Проверяем валидность email пользователя
        if (isValidEmail(feedback.email)) {
          await sendAdminReplyToUser(feedback.email, feedback, adminNotes);
          console.log(`✅ Ответ админа отправлен пользователю ${feedback.email}`);
        } else {
          console.warn(`⚠️ Не удалось отправить ответ пользователю: невалидный email адрес ${feedback.email}`);
        }
      } catch (emailError) {
        // Логируем ошибку, но не прерываем процесс обновления
        console.error('❌ Ошибка отправки ответа пользователю:', emailError);
      }
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
