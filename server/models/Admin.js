import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'admin',
    },
    // Поля для ротации пароля
    passwordLastChanged: {
      type: Date,
      default: Date.now,
    },
    passwordRotationDays: {
      type: Number,
      default: 7, // По умолчанию 7 дней
    },
    notificationEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    // Поля для безопасности
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    passwordHistory: [{
      password: String,
      changedAt: Date,
    }],
  },
  {
    timestamps: true,
  }
);

// Виртуальное поле для проверки блокировки
AdminSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Виртуальное поле для проверки необходимости смены пароля
AdminSchema.virtual('passwordExpired').get(function () {
  if (!this.passwordLastChanged) return true;
  
  const daysSinceChange = Math.floor(
    (Date.now() - this.passwordLastChanged.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  return daysSinceChange >= this.passwordRotationDays;
});

// Хеширование пароля перед сохранением
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    // Сохраняем старый пароль в историю (если есть)
    if (this.password && !this.isNew) {
      this.passwordHistory = this.passwordHistory || [];
      this.passwordHistory.push({
        password: this.password,
        changedAt: new Date(),
      });
      
      // Храним только последние 5 паролей
      if (this.passwordHistory.length > 5) {
        this.passwordHistory = this.passwordHistory.slice(-5);
      }
    }
    
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordLastChanged = new Date();
    
    next();
  } catch (error) {
    next(error);
  }
});

// Метод для проверки пароля
AdminSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Метод для проверки, использовался ли пароль ранее
AdminSchema.methods.isPasswordInHistory = async function (newPassword) {
  if (!this.passwordHistory || this.passwordHistory.length === 0) {
    return false;
  }
  
  for (const entry of this.passwordHistory) {
    const isMatch = await bcrypt.compare(newPassword, entry.password);
    if (isMatch) return true;
  }
  
  return false;
};

// Метод для обработки неудачного входа
AdminSchema.methods.handleFailedLogin = async function () {
  const updates = {
    failedLoginAttempts: this.failedLoginAttempts + 1,
  };
  
  // Блокируем на 30 минут после 5 неудачных попыток
  if (updates.failedLoginAttempts >= 5) {
    updates.lockUntil = new Date(Date.now() + 30 * 60 * 1000);
  }
  
  await this.updateOne(updates);
};

// Метод для успешного входа
AdminSchema.methods.handleSuccessfulLogin = async function () {
  await this.updateOne({
    failedLoginAttempts: 0,
    lockUntil: null,
    lastLogin: new Date(),
  });
};

// Статический метод для генерации безопасного пароля
AdminSchema.statics.generateSecurePassword = function (length = 16) {
  const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lowercase = 'abcdefghjkmnpqrstuvwxyz';
  const numbers = '23456789';
  const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const allChars = uppercase + lowercase + numbers + special;
  
  // Гарантируем наличие всех типов символов
  let password = '';
  password += uppercase[crypto.randomInt(uppercase.length)];
  password += lowercase[crypto.randomInt(lowercase.length)];
  password += numbers[crypto.randomInt(numbers.length)];
  password += special[crypto.randomInt(special.length)];
  
  // Заполняем остальные символы
  for (let i = password.length; i < length; i++) {
    password += allChars[crypto.randomInt(allChars.length)];
  }
  
  // Перемешиваем пароль
  return password.split('').sort(() => crypto.randomInt(3) - 1).join('');
};

// Индексы
AdminSchema.index({ email: 1 });
AdminSchema.index({ passwordLastChanged: 1 });

export default mongoose.model('Admin', AdminSchema);
