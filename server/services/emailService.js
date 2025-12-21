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

// Валидация email адреса
const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Отправка email
export const sendEmail = async (to, template) => {
  // Валидация получателя
  if (!to || !isValidEmail(to)) {
    const errorMsg = `Некорректный email адрес получателя: ${to}`;
    console.error('❌ Ошибка:', errorMsg);
    return { success: false, message: errorMsg };
  }
  
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('📧 Email не отправлен (транспортер не настроен)');
    console.log('📧 Получатель:', to);
    console.log('📧 Тема:', template.subject);
    return { success: false, message: 'Email транспортер не настроен' };
  }
  
  try {
    // Формируем адрес отправителя
    const fromEmail = config.SMTP_FROM && isValidEmail(config.SMTP_FROM) 
      ? config.SMTP_FROM 
      : config.SMTP_USER;
    
    if (!fromEmail || !isValidEmail(fromEmail)) {
      const errorMsg = 'Некорректный email адрес отправителя. Проверьте SMTP_FROM или SMTP_USER';
      console.error('❌ Ошибка:', errorMsg);
      return { success: false, message: errorMsg };
    }
    
    const mailOptions = {
      from: `"Smart Assistant" <${fromEmail}>`,
      to: to.trim(),
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

// Шаблон письма о новой обратной связи для админа
const newFeedbackTemplate = (feedback) => {
  const typeLabels = {
    complaint: 'Жалоба',
    suggestion: 'Предложение',
    question: 'Вопрос',
    other: 'Другое',
  };
  
  return {
    subject: `📝 Новая обратная связь: ${typeLabels[feedback.type] || feedback.type}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Новая обратная связь</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .info-box { background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin: 15px 0; }
          .info-row { margin: 10px 0; }
          .info-label { font-weight: bold; color: #333; }
          .message-box { background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 5px; padding: 15px; margin: 20px 0; white-space: pre-wrap; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📝 Новая обратная связь</h1>
          </div>
          <div class="content">
            <h2>Здравствуйте!</h2>
            <p>Вы получили новое сообщение обратной связи на сайте Smart Assistant.</p>
            
            <div class="info-box">
              <div class="info-row">
                <span class="info-label">От кого:</span> ${feedback.name}
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span> ${feedback.email}
              </div>
              <div class="info-row">
                <span class="info-label">Тип:</span> ${typeLabels[feedback.type] || feedback.type}
              </div>
              <div class="info-row">
                <span class="info-label">Дата:</span> ${new Date(feedback.createdAt).toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}
              </div>
            </div>
            
            <h3>Сообщение:</h3>
            <div class="message-box">
${feedback.message}
            </div>
            
            <p style="text-align: center;">
              <a href="${config.CORS_ORIGIN}/admin/feedback" class="button">Перейти в админ панель</a>
            </p>
          </div>
          <div class="footer">
            <p>Это автоматическое сообщение от системы Smart Assistant.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Новая обратная связь: ${typeLabels[feedback.type] || feedback.type}
      
      От: ${feedback.name} (${feedback.email})
      Дата: ${new Date(feedback.createdAt).toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}
      
      Сообщение:
      ${feedback.message}
      
      Перейти в админ панель: ${config.CORS_ORIGIN}/admin/feedback
    `,
  };
};

// Шаблон ответа админа пользователю
const adminReplyTemplate = (feedback, adminNotes) => {
  const statusLabels = {
    new: 'Новое',
    in_progress: 'В работе',
    resolved: 'Решено',
    closed: 'Закрыто',
  };
  
  return {
    subject: `💬 Ответ на ваше обращение в Smart Assistant`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ответ на обращение</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .reply-box { background-color: #e7f3ff; border-left: 4px solid #2196F3; padding: 20px; margin: 20px 0; white-space: pre-wrap; }
          .original-message { background-color: #f8f9fa; border-left: 4px solid #ccc; padding: 15px; margin: 20px 0; }
          .status-badge { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 14px; font-weight: bold; margin: 10px 0; }
          .status-resolved { background-color: #4caf50; color: white; }
          .status-in_progress { background-color: #ff9800; color: white; }
          .status-closed { background-color: #9e9e9e; color: white; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💬 Ответ на ваше обращение</h1>
          </div>
          <div class="content">
            <h2>Здравствуйте, ${feedback.name}!</h2>
            <p>Спасибо за ваше обращение. Администратор ответил на ваше сообщение:</p>
            
            <div class="reply-box">
${adminNotes}
            </div>
            
            <div style="margin: 20px 0;">
              <strong>Статус обращения:</strong>
              <span class="status-badge status-${feedback.status}">${statusLabels[feedback.status] || feedback.status}</span>
            </div>
            
            <div class="original-message">
              <strong>Ваше сообщение:</strong><br>
              ${feedback.message}
            </div>
            
            <p>Если у вас остались вопросы, пожалуйста, свяжитесь с нами.</p>
          </div>
          <div class="footer">
            <p>С уважением, команда Smart Assistant</p>
            <p>Это автоматическое сообщение, пожалуйста, не отвечайте на него.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Ответ на ваше обращение в Smart Assistant
      
      Здравствуйте, ${feedback.name}!
      
      Спасибо за ваше обращение. Администратор ответил на ваше сообщение:
      
      ${adminNotes}
      
      Статус обращения: ${statusLabels[feedback.status] || feedback.status}
      
      Ваше сообщение:
      ${feedback.message}
      
      С уважением, команда Smart Assistant
    `,
  };
};

// Отправка уведомления о новой обратной связи админу
export const sendNewFeedbackNotification = async (adminEmail, feedback) => {
  const template = newFeedbackTemplate(feedback);
  return sendEmail(adminEmail, template);
};

// Отправка ответа админа пользователю
export const sendAdminReplyToUser = async (userEmail, feedback, adminNotes) => {
  const template = adminReplyTemplate(feedback, adminNotes);
  return sendEmail(userEmail, template);
};

export default {
  sendEmail,
  sendNewPasswordEmail,
  sendPasswordExpirationWarning,
  sendNewFeedbackNotification,
  sendAdminReplyToUser,
};

