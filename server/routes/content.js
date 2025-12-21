import express from 'express';
import {
  getAllContent,
  getContentBySection,
  getContentByKey,
  createContent,
  updateContent,
  updateTranslation,
  deleteContent,
  getSections
} from '../controllers/contentController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateContent } from '../middleware/validation.js';

const router = express.Router();

// @route   GET /api/content/sections
// @desc    Получить список секций
// @access  Public
router.get('/sections', getSections);

// @route   GET /api/content/section/:section
// @desc    Получить контент по секции
// @access  Public
router.get('/section/:section', getContentBySection);

// @route   GET /api/content/key/:key
// @desc    Получить контент по ключу
// @access  Public
router.get('/key/:key', getContentByKey);

// @route   GET /api/content
// @desc    Получить весь контент
// @access  Private (Admin only)
router.get('/', authenticateToken, getAllContent);

// @route   POST /api/content
// @desc    Создать новый контент
// @access  Private (Admin only)
router.post('/', authenticateToken, validateContent, createContent);

// @route   PUT /api/content/:id
// @desc    Обновить контент
// @access  Private (Admin only)
router.put('/:id', authenticateToken, validateContent, updateContent);

// @route   PUT /api/content/:id/translation/:lang
// @desc    Обновить перевод контента
// @access  Private (Admin only)
router.put('/:id/translation/:lang', authenticateToken, updateTranslation);

// @route   DELETE /api/content/:id
// @desc    Удалить контент
// @access  Private (Admin only)
router.delete('/:id', authenticateToken, deleteContent);

export default router;
