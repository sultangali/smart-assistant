import express from 'express';
import {
  getTranslations,
  getTranslationsBySection,
  getSupportedLanguages
} from '../controllers/i18nController.js';

const router = express.Router();

// @route   GET /api/i18n/languages
// @desc    Получить список поддерживаемых языков
// @access  Public
router.get('/languages', getSupportedLanguages);

// @route   GET /api/i18n/:lang
// @desc    Получить все переводы для языка
// @access  Public
router.get('/:lang', getTranslations);

// @route   GET /api/i18n/:lang/:section
// @desc    Получить переводы для конкретной секции
// @access  Public
router.get('/:lang/:section', getTranslationsBySection);

export default router;
