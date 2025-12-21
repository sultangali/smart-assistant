import express from 'express';
import {
  createFeedback,
  getFeedbacks,
  updateFeedbackStatus,
  deleteFeedback,
} from '../controllers/feedbackController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateFeedback } from '../middleware/validation.js';

const router = express.Router();

// @route   POST /api/feedback
// @desc    Создать обратную связь
// @access  Public
router.post('/', validateFeedback, createFeedback);

// @route   GET /api/feedback
// @desc    Получить все обратные связи
// @access  Private (Admin only)
router.get('/', authenticateToken, getFeedbacks);

// @route   PUT /api/feedback/:id
// @desc    Обновить статус обратной связи
// @access  Private (Admin only)
router.put('/:id', authenticateToken, updateFeedbackStatus);

// @route   DELETE /api/feedback/:id
// @desc    Удалить обратную связь
// @access  Private (Admin only)
router.delete('/:id', authenticateToken, deleteFeedback);

export default router;
