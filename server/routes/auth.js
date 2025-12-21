import express from 'express';
import { 
  login, 
  logout, 
  getProfile,
  changePassword,
  updateNotificationSettings,
  forcePasswordRotation
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateLogin } from '../middleware/validation.js';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Авторизация админа
// @access  Public
router.post('/login', validateLogin, login);

// @route   POST /api/auth/logout
// @desc    Выход из системы
// @access  Private
router.post('/logout', authenticateToken, logout);

// @route   GET /api/auth/profile
// @desc    Получить профиль админа
// @access  Private
router.get('/profile', authenticateToken, getProfile);

// @route   POST /api/auth/change-password
// @desc    Изменить пароль
// @access  Private
router.post('/change-password', authenticateToken, changePassword);

// @route   PUT /api/auth/notification-settings
// @desc    Обновить настройки уведомлений
// @access  Private
router.put('/notification-settings', authenticateToken, updateNotificationSettings);

// @route   POST /api/auth/force-rotate-password
// @desc    Принудительная ротация пароля
// @access  Private
router.post('/force-rotate-password', authenticateToken, forcePasswordRotation);

export default router;
