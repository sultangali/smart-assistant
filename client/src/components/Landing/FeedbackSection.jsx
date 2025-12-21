import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { useTranslations } from '../../hooks/useTranslations';
import { useTheme } from '../../contexts/ThemeContext';
import { feedbackAPI } from '../../utils/api';

const FeedbackSection = () => {
  const { t } = useTranslations();
  const { currentTheme } = useTheme();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.type || !formData.message) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      await feedbackAPI.create(formData);
      
      setSuccess('Ваше сообщение успешно отправлено!');
      setFormData({
        name: '',
        email: '',
        type: '',
        message: '',
      });
    } catch (error) {
      console.error('Ошибка при отправке обратной связи:', error);
      setError(error.response?.data?.message || 'Ошибка отправки сообщения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="feedback" className={`section feedback-section feedback-section-${currentTheme}`}>
      {/* Декоративные элементы */}
      <div className={`feedback-decoration feedback-decoration-${currentTheme}`}>
        <div className="feedback-shape feedback-shape-1"></div>
        <div className="feedback-shape feedback-shape-2"></div>
        <div className="feedback-shape feedback-shape-3"></div>
        <div className="feedback-floating-icon feedback-floating-icon-1">💬</div>
        <div className="feedback-floating-icon feedback-floating-icon-2">📝</div>
        <div className="feedback-floating-icon feedback-floating-icon-3">✉️</div>
      </div>

      <Container className="section-content">
        <Row className="min-vh-100 justify-content-center" style={{ alignItems: 'flex-start', paddingTop: '12vh' }}>
          <Col lg={11} xl={10}>
            <div className="feedback-wrapper">
              {/* Заголовок */}
              <div className="feedback-header text-center slide-in-down">
                <h2 className={`feedback-title feedback-title-${currentTheme}`}>
                  {t('landing.feedback.title')}
                </h2>
                <p className={`feedback-subtitle feedback-subtitle-${currentTheme}`}>
                  {t('landing.feedback.subtitle')}
                </p>
              </div>

              {/* Контент */}
              <div className="feedback-content">
                {success && (
                  <Alert variant="success" className={`feedback-alert feedback-alert-success-${currentTheme} mb-4 slide-in-up`}>
                    <div className="d-flex align-items-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="me-2">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      {success}
                    </div>
                  </Alert>
                )}
                
                {error && (
                  <Alert variant="danger" className={`feedback-alert feedback-alert-error-${currentTheme} mb-4 slide-in-up`}>
                    <div className="d-flex align-items-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="me-2">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      {error}
                    </div>
                  </Alert>
                )}
                
                <Card className={`feedback-form-card feedback-form-card-${currentTheme} slide-in-up`}>
                  <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                      {/* Первая строка: Имя и Email */}
                      <Row className="g-3 mb-4">
                        <Col md={6}>
                          <div className="feedback-field">
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder={t('landing.feedback.name')}
                              value={formData.name}
                              onChange={handleChange}
                              className={`feedback-input feedback-input-${currentTheme}`}
                              required
                            />
                            <div className="feedback-field-icon">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6L13.5 7.5C13.1 7.9 12.6 8 12 8S10.9 7.9 10.5 7.5L9 6L3 7V9L9 10L10.5 8.5C10.9 8.1 11.4 8 12 8S13.1 8.1 13.5 8.5L15 10L21 9ZM12 13.5C11.2 13.5 10.5 13.1 10.1 12.5L9 14V22H15V14L13.9 12.5C13.5 13.1 12.8 13.5 12 13.5Z"/>
                              </svg>
                            </div>
                          </div>
                        </Col>
                        
                        <Col md={6}>
                          <div className="feedback-field">
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder={t('landing.feedback.email')}
                              value={formData.email}
                              onChange={handleChange}
                              className={`feedback-input feedback-input-${currentTheme}`}
                              required
                            />
                            <div className="feedback-field-icon">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                              </svg>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      
                      {/* Тип сообщения */}
                      <Row className="mb-4">
                        <Col>
                          <div className="feedback-field">
                            <Form.Select
                              name="type"
                              value={formData.type}
                              onChange={handleChange}
                              className={`feedback-select feedback-select-${currentTheme}`}
                              required
                            >
                              <option value="">{t('landing.feedback.type')}</option>
                              <option value="complaint">{t('landing.feedback.types.complaint')}</option>
                              <option value="suggestion">{t('landing.feedback.types.suggestion')}</option>
                              <option value="question">{t('landing.feedback.types.question')}</option>
                              <option value="other">{t('landing.feedback.types.other')}</option>
                            </Form.Select>
                            <div className="feedback-field-icon">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9l-5.55 5.15L18 22l-6-3.27L6 22l1.55-7.85L2 9l6.91-0.74L12 2z"/>
                              </svg>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      
                      {/* Сообщение */}
                      <Row className="mb-4">
                        <Col>
                          <div className="feedback-field">
                            <Form.Control
                              as="textarea"
                              rows={5}
                              name="message"
                              placeholder={t('landing.feedback.message')}
                              value={formData.message}
                              onChange={handleChange}
                              className={`feedback-textarea feedback-textarea-${currentTheme}`}
                              required
                            />
                            <div className="feedback-field-icon feedback-field-icon-textarea">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14,17H7V15H14M17,13H7V11H17M17,9H7V7H17M19,3H5C3.89,3 3,3.89 3,5V18L6,15H19A2,2 0 0,0 21,13V5C21,3.89 20.1,3 19,3Z"/>
                              </svg>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      
                      {/* Кнопка отправки */}
                      <div className="text-center">
                        <button
                          type="submit"
                          className={`feedback-btn feedback-btn-${currentTheme}`}
                          disabled={loading}
                        >
                          <svg 
                            className="feedback-btn-icon" 
                            width="20" 
                            height="20" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                          >
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                          </svg>
                          <span className="feedback-btn-text">
                            {loading ? t('common.loading') : t('landing.feedback.submit')}
                          </span>
                        </button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeedbackSection;
