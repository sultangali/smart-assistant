import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTranslations } from '../../hooks/useTranslations';
import { useTheme } from '../../contexts/ThemeContext';

const AboutSection = () => {
  const { t } = useTranslations();
  const { currentTheme } = useTheme();

  return (
    <section id="about" className={`section about-section about-section-${currentTheme}`}>
      {/* Декоративные элементы */}
      <div className={`about-decoration about-decoration-${currentTheme}`}>
        <div className="about-shape about-shape-1"></div>
        <div className="about-shape about-shape-2"></div>
        <div className="about-shape about-shape-3"></div>
        <div className="about-floating-icon about-floating-icon-1">🤖</div>
        <div className="about-floating-icon about-floating-icon-2">📚</div>
        <div className="about-floating-icon about-floating-icon-3">⚡</div>
      </div>

      <Container className="section-content">
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col lg={12} xl={10}>
            <div className="about-content">
              {/* Заголовок */}
              <div className="text-center mb-5 slide-in-down">
                <h2 className={`about-title about-title-${currentTheme}`}>
                  {t('landing.about.title')}
                </h2>
                
                <div className={`about-description about-description-${currentTheme}`}>
                  <p className="about-text about-text-primary">
                    {t('landing.about.description.primary')}
                  </p>
                  
                  <p className="about-text about-text-secondary">
                    {t('landing.about.description.secondary')}
                  </p>
                </div>
              </div>

              {/* Статистические карточки */}
              <Row className="mb-5 g-4">
                <Col lg={4} md={6}>
                  <Card className={`about-stat-card about-stat-card-${currentTheme} slide-in-left`}>
                    <Card.Body className="text-center p-4">
                      <div className="about-stat-icon about-stat-icon-1">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6L13.5 7.5C13.1 7.9 12.6 8 12 8S10.9 7.9 10.5 7.5L9 6L3 7V9L9 10L10.5 8.5C10.9 8.1 11.4 8 12 8S13.1 8.1 13.5 8.5L15 10L21 9ZM12 13.5C11.2 13.5 10.5 13.1 10.1 12.5L9 14V22H15V14L13.9 12.5C13.5 13.1 12.8 13.5 12 13.5Z"/>
                        </svg>
                      </div>
                      <div className="about-stat-number">{t('landing.about.stats.tools.number')}</div>
                      <div className="about-stat-label">{t('landing.about.stats.tools.label')}</div>
                      <div className="about-stat-description">
                        {t('landing.about.stats.tools.description')}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col lg={4} md={6}>
                  <Card className={`about-stat-card about-stat-card-${currentTheme} slide-in-up`}>
                    <Card.Body className="text-center p-4">
                      <div className="about-stat-icon about-stat-icon-2">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM12 5.5V13.5L18 9.5L12 5.5Z"/>
                        </svg>
                      </div>
                      <div className="about-stat-number">{t('landing.about.stats.categories.number')}</div>
                      <div className="about-stat-label">{t('landing.about.stats.categories.label')}</div>
                      <div className="about-stat-description">
                        {t('landing.about.stats.categories.description')}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col lg={4} md={6}>
                  <Card className={`about-stat-card about-stat-card-${currentTheme} slide-in-right`}>
                    <Card.Body className="text-center p-4">
                      <div className="about-stat-icon about-stat-icon-3">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2ZM12 21C10.9 21 10 20.1 10 19S10.9 17 12 17 14 17.9 14 19 13.1 21 12 21Z"/>
                        </svg>
                      </div>
                      <div className="about-stat-number">{t('landing.about.stats.availability.number')}</div>
                      <div className="about-stat-label">{t('landing.about.stats.availability.label')}</div>
                      <div className="about-stat-description">
                        {t('landing.about.stats.availability.description')}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Дополнительная информация */}
              <Row className="mt-5">
                <Col lg={8} className="mx-auto">
                  <Card className={`about-info-card about-info-card-${currentTheme} slide-in-up`}>
                    <Card.Body className="p-5">
                      <div className="text-center">
                        <h4 className="about-info-title">{t('landing.about.info.title')}</h4>
                        <p className="about-info-text">
                          {t('landing.about.info.description')}
                        </p>
                        <div className={`about-info-badge about-info-badge-${currentTheme}`}>
                          {t('landing.about.info.badge')}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
