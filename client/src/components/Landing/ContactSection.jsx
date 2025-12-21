import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslations } from '../../hooks/useTranslations';
import { useTheme } from '../../contexts/ThemeContext';

const ContactSection = () => {
  const { t } = useTranslations();
  const { currentTheme } = useTheme();

  return (
    <section id="contact" className={`section contact-section contact-section-${currentTheme}`}>
      {/* Декоративные элементы */}
      <div className={`contact-decoration contact-decoration-${currentTheme}`}>
        <div className="contact-shape contact-shape-1"></div>
        <div className="contact-shape contact-shape-2"></div>
        <div className="contact-shape contact-shape-3"></div>
        <div className="contact-floating-icon contact-floating-icon-1">📱</div>
        <div className="contact-floating-icon contact-floating-icon-2">📧</div>
        <div className="contact-floating-icon contact-floating-icon-3">🌐</div>
        <div className="contact-floating-icon contact-floating-icon-4">💬</div>
      </div>
      <Container className="section-content">
        <Row className="min-vh-100 justify-content-center" style={{ alignItems: 'flex-start', paddingTop: '12vh' }}>
          <Col lg={11} xl={10}>
            <div className="contact-wrapper">
              {/* Заголовок */}
              <div className="contact-header text-center slide-in-down">
                <h2 className={`contact-title contact-title-${currentTheme}`}>
                  {t('landing.contact.title')}
                </h2>
                <p className={`contact-subtitle contact-subtitle-${currentTheme}`}>
                  {t('landing.contact.subtitle')}
                </p>
              </div>
              {/* Контактная информация */}
              <div className="contact-content">
                {/* Основной контент в две колонки */}
                <Row className="g-5 justify-content-center">
                  {/* Левая колонка - Контактная информация */}
                  <Col lg={6}>
                    <div className={`contact-info-panel contact-info-panel-${currentTheme} slide-in-left`}>
                      <div className="contact-info-header">
                        <div className={`contact-info-icon contact-info-icon-${currentTheme}`}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 2.5l-3 3-3-3V6l3 3 3-3v.5zM4 18V8l8 5 8-5v10H4z"/>
                          </svg>
                        </div>
                        <h3 className={`contact-info-title contact-info-title-${currentTheme}`}>
                          {t('landing.contact.info.title')}
                        </h3>
                        <p className={`contact-info-subtitle contact-info-subtitle-${currentTheme}`}>
                          {t('landing.contact.info.subtitle')}
                        </p>
                      </div>

                      <div className="contact-info-list">
                        {/* Электронная почта */}
                        <div className={`contact-info-item contact-info-item-${currentTheme}`}>
                          <div className={`contact-info-item-icon contact-info-item-icon-${currentTheme}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                          </div>
                          <div className="contact-info-item-content">
                            <h5 className={`contact-info-item-title contact-info-item-title-${currentTheme}`}>
                              {t('landing.contact.email.title')}
                            </h5>
                            <p className={`contact-info-item-text contact-info-item-text-${currentTheme}`}>
                              {t('landing.contact.email.value')}
                            </p>
                            <small className={`contact-info-item-note contact-info-item-note-${currentTheme}`}>
                              {t('landing.contact.email.note')}
                            </small>
                          </div>
                        </div>

                        {/* Телефон */}
                        <div className={`contact-info-item contact-info-item-${currentTheme}`}>
                          <div className={`contact-info-item-icon contact-info-item-icon-${currentTheme}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                            </svg>
                          </div>
                          <div className="contact-info-item-content">
                            <h5 className={`contact-info-item-title contact-info-item-title-${currentTheme}`}>
                              Телефон
                            </h5>
                            <p className={`contact-info-item-text contact-info-item-text-${currentTheme}`}>
                              +7 (XXX) XXX-XX-XX
                            </p>
                            <small className={`contact-info-item-note contact-info-item-note-${currentTheme}`}>
                              Данные будут предоставлены позже
                            </small>
                          </div>
                        </div>

                        {/* Рабочие часы */}
                        <div className={`contact-info-item contact-info-item-${currentTheme}`}>
                          <div className={`contact-info-item-icon contact-info-item-icon-${currentTheme}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                              <path d="m12.5 7-1 0 0 6 4.75 2.85.75-1.23-4-2.37z"/>
                            </svg>
                          </div>
                          <div className="contact-info-item-content">
                            <h5 className={`contact-info-item-title contact-info-item-title-${currentTheme}`}>
                              Рабочие часы
                            </h5>
                            <p className={`contact-info-item-text contact-info-item-text-${currentTheme}`}>
                              Пн-Пт: 9:00-18:00
                            </p>
                            <small className={`contact-info-item-note contact-info-item-note-${currentTheme}`}>
                              GMT+6 (Астана)
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>

                  {/* Правая колонка - Дополнительная информация */}
                  <Col lg={6}>
                    <div className={`contact-features-panel contact-features-panel-${currentTheme} slide-in-right`}>
                      <div className="contact-features-header">
                        <div className={`contact-features-icon contact-features-icon-${currentTheme}`}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9l-5.55 5.15L18 22l-6-3.27L6 22l1.55-7.85L2 9l6.91-0.74L12 2z"/>
                          </svg>
                        </div>
                        <h3 className={`contact-features-title contact-features-title-${currentTheme}`}>
                          Почему выбирают нас?
                        </h3>
                        <p className={`contact-features-subtitle contact-features-subtitle-${currentTheme}`}>
                          Преимущества работы с нами
                        </p>
                      </div>

                      <div className="contact-features-list">
                        {/* Быстрый ответ */}
                        <div className={`contact-feature-item contact-feature-item-${currentTheme}`}>
                          <div className={`contact-feature-icon contact-feature-icon-${currentTheme}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          </div>
                          <div className="contact-feature-content">
                            <h6 className={`contact-feature-title contact-feature-title-${currentTheme}`}>
                              Быстрый ответ
                            </h6>
                            <p className={`contact-feature-text contact-feature-text-${currentTheme}`}>
                              Мы отвечаем на все обращения в течение 24 часов
                            </p>
                          </div>
                        </div>

                        {/* Экспертная помощь */}
                        <div className={`contact-feature-item contact-feature-item-${currentTheme}`}>
                          <div className={`contact-feature-icon contact-feature-icon-${currentTheme}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                            </svg>
                          </div>
                          <div className="contact-feature-content">
                            <h6 className={`contact-feature-title contact-feature-title-${currentTheme}`}>
                              Экспертная помощь
                            </h6>
                            <p className={`contact-feature-text contact-feature-text-${currentTheme}`}>
                              Профессиональная консультация по всем вопросам
                            </p>
                          </div>
                        </div>

                        {/* Персональный подход */}
                        <div className={`contact-feature-item contact-feature-item-${currentTheme}`}>
                          <div className={`contact-feature-icon contact-feature-icon-${currentTheme}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          </div>
                          <div className="contact-feature-content">
                            <h6 className={`contact-feature-title contact-feature-title-${currentTheme}`}>
                              Персональный подход
                            </h6>
                            <p className={`contact-feature-text contact-feature-text-${currentTheme}`}>
                              Индивидуальные решения для каждого клиента
                            </p>
                          </div>
                        </div>

                        {/* Круглосуточная доступность */}
                        <div className={`contact-feature-item contact-feature-item-${currentTheme}`}>
                          <div className={`contact-feature-icon contact-feature-icon-${currentTheme}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.42V7z"/>
                            </svg>
                          </div>
                          <div className="contact-feature-content">
                            <h6 className={`contact-feature-title contact-feature-title-${currentTheme}`}>
                              Круглосуточная доступность
                            </h6>
                            <p className={`contact-feature-text contact-feature-text-${currentTheme}`}>
                              Платформа доступна 24/7 для максимального удобства
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* CTA кнопка */}
                      <div className="contact-cta">
                        <button className={`contact-cta-btn contact-cta-btn-${currentTheme}`}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="me-2">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                          </svg>
                          Написать сообщение
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;
