import Admin from '../models/Admin.js';
import { generateToken } from '../middleware/auth.js';
import { config } from '../config/env.js';
import { forceRotatePassword } from '../services/passwordRotationService.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Найти админа по email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Неверные учетные данные',
      });
    }

    // Проверить блокировку
    if (admin.isLocked) {
      const lockTimeRemaining = Math.ceil((admin.lockUntil - Date.now()) / 60000);
      return res.status(423).json({
        success: false,
        message: `Аккаунт заблокирован. Попробуйте через ${lockTimeRemaining} мин.`,
        lockedUntil: admin.lockUntil,
      });
    }

    // Проверить пароль
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      await admin.handleFailedLogin();
      
      const attemptsLeft = config.MAX_LOGIN_ATTEMPTS - (admin.failedLoginAttempts + 1);
      return res.status(401).json({
        success: false,
        message: attemptsLeft > 0 
          ? `Неверные учетные данные. Осталось попыток: ${attemptsLeft}`
          : 'Неверные учетные данные',
      });
    }

    // Успешный вход
    await admin.handleSuccessfulLogin();

    // Проверить истечение пароля
    const daysSinceChange = Math.floor(
      (Date.now() - (admin.passwordLastChanged?.getTime() || 0)) / (1000 * 60 * 60 * 24)
    );
    const passwordExpired = daysSinceChange >= (admin.passwordRotationDays || 7);

    // Генерировать токен
    const token = generateToken(admin._id);

    res.json({
      success: true,
      message: 'Успешная авторизация',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        passwordExpired,
        daysUntilExpiration: Math.max(0, (admin.passwordRotationDays || 7) - daysSinceChange),
      },
      ...(passwordExpired && {
        warning: 'Срок действия пароля истек. Рекомендуется сменить пароль.',
      }),
    });
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password -passwordHistory');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Администратор не найден',
      });
    }

    const daysSinceChange = Math.floor(
      (Date.now() - (admin.passwordLastChanged?.getTime() || 0)) / (1000 * 60 * 60 * 24)
    );

    res.json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        notificationEmail: admin.notificationEmail,
        passwordLastChanged: admin.passwordLastChanged,
        passwordRotationDays: admin.passwordRotationDays || 7,
        daysUntilExpiration: Math.max(0, (admin.passwordRotationDays || 7) - daysSinceChange),
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    console.error('Ошибка получения профиля:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};

export const logout = (req, res) => {
  res.json({
    success: true,
    message: 'Успешный выход из системы',
  });
};

// Изменение пароля
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Валидация нового пароля
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Новый пароль должен содержать минимум 8 символов',
      });
    }

    // Проверка сложности пароля
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumbers = /\d/.test(newPassword);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecial) {
      return res.status(400).json({
        success: false,
        message: 'Пароль должен содержать заглавные и строчные буквы, цифры и специальные символы',
      });
    }

    const admin = await Admin.findById(req.admin._id);
    
    // Проверка текущего пароля
    const isCurrentPasswordValid = await admin.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Неверный текущий пароль',
      });
    }

    // Проверка, не использовался ли пароль ранее
    const isInHistory = await admin.isPasswordInHistory(newPassword);
    if (isInHistory) {
      return res.status(400).json({
        success: false,
        message: 'Этот пароль уже использовался ранее. Выберите другой пароль.',
      });
    }

    // Изменение пароля
    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Пароль успешно изменен',
    });
  } catch (error) {
    console.error('Ошибка изменения пароля:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};

// Обновление настроек уведомлений
export const updateNotificationSettings = async (req, res) => {
  try {
    const { notificationEmail, passwordRotationDays } = req.body;

    const admin = await Admin.findById(req.admin._id);
    
    if (notificationEmail !== undefined) {
      admin.notificationEmail = notificationEmail;
    }
    
    if (passwordRotationDays !== undefined) {
      if (passwordRotationDays < 1 || passwordRotationDays > 90) {
        return res.status(400).json({
          success: false,
          message: 'Период ротации должен быть от 1 до 90 дней',
        });
      }
      admin.passwordRotationDays = passwordRotationDays;
    }

    await admin.save();

    res.json({
      success: true,
      message: 'Настройки успешно обновлены',
      data: {
        notificationEmail: admin.notificationEmail,
        passwordRotationDays: admin.passwordRotationDays,
      },
    });
  } catch (error) {
    console.error('Ошибка обновления настроек:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};

// Принудительная ротация пароля
export const forcePasswordRotation = async (req, res) => {
  try {
    const result = await forceRotatePassword(req.admin._id);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Новый пароль сгенерирован и отправлен на email',
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.message || 'Ошибка при ротации пароля',
      });
    }
  } catch (error) {
    console.error('Ошибка принудительной ротации:', error);
    res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера',
    });
  }
};
