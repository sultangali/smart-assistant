import express from 'express';
import { getStatistics } from '../controllers/statsController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/stats
// @desc    Получить простую статистику для админ панели
// @access  Private (Admin only)
router.get('/', authenticateToken, getStatistics);

export default router;
