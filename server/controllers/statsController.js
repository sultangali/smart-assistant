import Tool from '../db/models/Tool.js';
import Feedback from '../db/models/Feedback.js';
import { CATEGORIES_HIERARCHY } from '../constants/categories.js';

// @desc    Получить детальную статистику для админ панели
// @route   GET /api/stats
// @access  Private (Admin only)
export const getStatistics = async (req, res) => {
  try {
    // Получаем базовую статистику
    const [
      totalTools,
      totalFeedbacks,
      newFeedbacks,
      toolsByCategory,
      feedbacksByType,
      feedbacksByStatus,
      feedbacksByHour,
      feedbacksByDay,
      feedbacksByWeek,
      recentFeedbacks
    ] = await Promise.all([
      // Общее количество инструментов
      Tool.countDocuments(),
      
      // Общее количество обратной связи
      Feedback.countDocuments(),
      
      // Новые сообщения (за последние 7 дней)
      Feedback.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }),
      
      // Инструменты по категориям
      Tool.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ]),

      // Обратная связь по типам
      Feedback.aggregate([
        {
          $group: {
            _id: '$type',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ]),

      // Обратная связь по статусам
      Feedback.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ]),

      // Обратная связь по часам дня
      Feedback.aggregate([
        {
          $group: {
            _id: { $hour: '$createdAt' },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]),

      // Обратная связь по дням недели
      Feedback.aggregate([
        {
          $group: {
            _id: { $dayOfWeek: '$createdAt' },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]),

      // Обратная связь по неделям (последние 12 недель)
      Feedback.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(Date.now() - 12 * 7 * 24 * 60 * 60 * 1000) }
          }
        },
        {
          $group: {
            _id: { $week: '$createdAt' },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]),

      // Последние 10 обращений
      Feedback.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .select('name email type status message createdAt')
    ]);

    // Подготавливаем данные для чартов
    const categoryData = toolsByCategory.map(item => ({
      category: item._id,
      count: item.count
    }));

    const typeData = feedbacksByType.map(item => ({
      type: item._id,
      count: item.count
    }));

    const statusData = feedbacksByStatus.map(item => ({
      status: item._id,
      count: item.count
    }));

    // Обрабатываем данные по часам
    const hourData = Array.from({ length: 24 }, (_, i) => {
      const hourData = feedbacksByHour.find(h => h._id === i);
      return {
        hour: i,
        count: hourData ? hourData.count : 0
      };
    });

    // Обрабатываем данные по дням недели
    const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const dayData = Array.from({ length: 7 }, (_, i) => {
      const dayData = feedbacksByDay.find(d => d._id === i + 1);
      return {
        day: dayNames[i],
        count: dayData ? dayData.count : 0
      };
    });

    // Обрабатываем данные по неделям
    const weekData = feedbacksByWeek.map(item => ({
      week: `Неделя ${item._id}`,
      count: item.count
    }));

    // Вычисляем средние значения
    const avgFeedbacksPerDay = totalFeedbacks > 0 ? (totalFeedbacks / 30).toFixed(1) : 0;
    const avgResponseTime = 0; // Можно добавить логику для расчета времени ответа

    // Статистика по приоритету (на основе типа)
    const priorityStats = {
      high: typeData.find(t => t.type === 'complaint')?.count || 0,
      medium: typeData.find(t => t.type === 'suggestion')?.count || 0,
      low: typeData.find(t => t.type === 'question')?.count || 0,
      other: typeData.find(t => t.type === 'other')?.count || 0
    };

    res.json({
      success: true,
      data: {
        overview: {
          totalTools,
          totalFeedbacks,
          newFeedbacks,
          totalCategories: toolsByCategory.length,
          avgFeedbacksPerDay,
          avgResponseTime
        },
        charts: {
          toolsByCategory: categoryData,
          feedbacksByType: typeData,
          feedbacksByStatus: statusData,
          feedbacksByHour: hourData,
          feedbacksByDay: dayData,
          feedbacksByWeek: weekData
        },
        priority: priorityStats,
        recent: recentFeedbacks
      }
    });

  } catch (error) {
    console.error('Ошибка при получении статистики:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при получении статистики'
    });
  }
};