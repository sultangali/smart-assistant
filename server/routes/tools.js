import express from 'express';
import {
  getTools,
  getTool,
  createTool,
  updateTool,
  deleteTool,
  getCategories,
} from '../controllers/toolController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateTool } from '../middleware/validation.js';

const router = express.Router();

// @route   GET /api/tools
// @desc    Получить все инструменты с фильтрацией
// @access  Public
router.get('/', getTools);

// @route   GET /api/tools/categories
// @desc    Получить категории
// @access  Public
router.get('/categories', getCategories);

// @route   GET /api/tools/:id
// @desc    Получить один инструмент
// @access  Public
router.get('/:id', getTool);

// @route   POST /api/tools
// @desc    Создать инструмент
// @access  Private (Admin only)
router.post('/', authenticateToken, validateTool, createTool);

// @route   PUT /api/tools/:id
// @desc    Обновить инструмент
// @access  Private (Admin only)
router.put('/:id', authenticateToken, validateTool, updateTool);

// @route   DELETE /api/tools/:id
// @desc    Удалить инструмент
// @access  Private (Admin only)
router.delete('/:id', authenticateToken, deleteTool);

export default router;
