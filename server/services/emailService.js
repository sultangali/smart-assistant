import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

// Создание транспортера для отправки email
const createTransporter = () => {
  // Проверяем наличие конфигурации email
  if (!config.SMTP_HOST || !config.SMTP_USER || !config.SMTP_PASS) {
    console.warn('⚠️ Email конфигурация не настроена. Установите SMTP переменные в .env');
    console.warn('   Требуемые переменные: SMTP_HOST, SMTP_USER, SMTP_PASS');
    return null;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT || 587,
      secure: config.SMTP_SECURE === 'true', // true для 465, false для других
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
      },
      // Дополнительные опции для надежности
      tls: {
        rejectUnauthorized: false, // Для самоподписанных сертификатов
      },
    });

    // Проверяем соединение
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Ошибка проверки SMTP соединения:', error.message);
      } else {
        console.log('✅ SMTP соединение успешно проверено');
      }
    });

    return transporter;
  } catch (error) {
    console.error('❌ Ошибка создания SMTP транспортера:', error.message);
    return null;
  }
};

// Шаблон письма для нового пароля
const newPasswordTemplate = (email, newPassword, expiresIn) => ({
  subject: '🔐 Smart Assistant - Новый пароль администратора',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Новый пароль администратора</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
        .content { padding: 30px; }
        .password-box { background-color: #f8f9fa; border: 2px dashed #667eea; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; }
        .password { font-family: monospace; font-size: 24px; color: #333; letter-spacing: 2px; word-break: break-all; }
        .warning { background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 5px; padding: 15px; margin: 20px 0; }
        .warning-icon { font-size: 20px; margin-right: 10px; }
        .info { color: #666; font-size: 14px; line-height: 1.6; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🤖 Smart Assistant</h1>
        </div>
        <div class="content">
          <h2>Здравствуйте!</h2>
          <p>Для обеспечения безопасности вашей учетной записи был автоматически сгенерирован новый пароль администратора.</p>
          
          <div class="password-box">
            <p style="margin: 0 0 10px 0; color: #666;">Ваш новый пароль:</p>
            <div class="password">${newPassword}</div>
          </div>
          
          <div class="warning">
            <span class="warning-icon">⚠️</span>
            <strong>Важная информация:</strong>
            <ul style="margin: 10px 0 0 0; padding-left: 20px;">
              <li>Этот пароль действителен в течение <strong>${expiresIn} дней</strong></li>
              <li>Пожалуйста, запомните или сохраните этот пароль в безопасном месте</li>
              <li>Не передавайте этот пароль третьим лицам</li>
              <li>После входа рекомендуется изменить пароль</li>
            </ul>
          </div>
          
          <div class="info">
            <p><strong>Учетная запись:</strong> ${email}</p>
            <p><strong>Дата генерации:</strong> ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}</p>
          </div>
          
          <p style="text-align: center;">
            <a href="${config.CORS_ORIGIN}/admin/login" class="button">Войти в панель управления</a>
          </p>
        </div>
        <div class="footer">
          <p>Это автоматическое сообщение от системы Smart Assistant.</p>
          <p>Если вы не запрашивали смену пароля, свяжитесь с технической поддержкой.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
    Smart Assistant - Новый пароль администратора
    
    Здравствуйте!
    
    Для обеспечения безопасности вашей учетной записи был автоматически сгенерирован новый пароль.
    
    Ваш новый пароль: ${newPassword}
    
    Учетная запись: ${email}
    Пароль действителен: ${expiresIn} дней
    
    ВАЖНО:
    - Пожалуйста, запомните или сохраните этот пароль в безопасном месте
    - Не передавайте этот пароль третьим лицам
    - После входа рекомендуется изменить пароль
    
    Ссылка для входа: ${config.CORS_ORIGIN}/admin/login
    
    ---
    Это автоматическое сообщение от системы Smart Assistant.
  `,
});

// Шаблон письма-напоминания об истечении пароля
const passwordExpirationWarningTemplate = (email, daysLeft) => ({
  subject: '⏰ Smart Assistant - Срок действия пароля истекает',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
        .content { padding: 30px; }
        .alert-box { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 20px 0; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⏰ Напоминание о пароле</h1>
        </div>
        <div class="content">
          <h2>Здравствуйте!</h2>
          
          <div class="alert-box">
            <strong>Внимание!</strong> Срок действия вашего пароля истекает через <strong>${daysLeft} дн.</strong>
          </div>
          
          <p>Система автоматически сгенерирует новый пароль и отправит его на этот email после истечения срока действия текущего пароля.</p>
          
          <p><strong>Учетная запись:</strong> ${email}</p>
        </div>
        <div class="footer">
          <p>Это автоматическое сообщение от системы Smart Assistant.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
    Smart Assistant - Напоминание о пароле
    
    Внимание! Срок действия вашего пароля истекает через ${daysLeft} дн.
    
    Учетная запись: ${email}
    
    Система автоматически сгенерирует новый пароль и отправит его на этот email после истечения срока действия текущего пароля.
  `,
});

// Отправка email
export const sendEmail = async (to, template) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('📧 Email не отправлен (транспортер не настроен)');
    console.log('📧 Получатель:', to);
    console.log('📧 Тема:', template.subject);
    return { success: false, message: 'Email транспортер не настроен' };
  }
  
  try {
    const mailOptions = {
      from: `"Smart Assistant" <${config.SMTP_FROM || config.SMTP_USER}>`,
      to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    };
    
    console.log('📧 Попытка отправки email:');
    console.log('   От:', mailOptions.from);
    console.log('   Кому:', to);
    console.log('   Тема:', template.subject);
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email успешно отправлен!');
    console.log('   Message ID:', info.messageId);
    console.log('   Ответ сервера:', info.response);
    
    return { success: true, messageId: info.messageId, response: info.response };
  } catch (error) {
    console.error('❌ Ошибка отправки email:');
    console.error('   Код ошибки:', error.code);
    console.error('   Сообщение:', error.message);
    if (error.response) {
      console.error('   Ответ SMTP сервера:', error.response);
    }
    return { success: false, error: error.message, code: error.code };
  }
};

// Отправка нового пароля
export const sendNewPasswordEmail = async (email, newPassword, expiresIn = 7) => {
  const notificationEmail = email; // Можно переопределить на другой email
  const template = newPasswordTemplate(email, newPassword, expiresIn);
  return sendEmail(notificationEmail, template);
};

// Отправка предупреждения об истечении пароля
export const sendPasswordExpirationWarning = async (email, daysLeft) => {
  const template = passwordExpirationWarningTemplate(email, daysLeft);
  return sendEmail(email, template);
};

export default {
  sendEmail,
  sendNewPasswordEmail,
  sendPasswordExpirationWarning,
};

