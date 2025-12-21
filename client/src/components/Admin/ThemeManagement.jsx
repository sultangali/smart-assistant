import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeManagement = () => {
  const { currentTheme, themes, changeTheme } = useTheme();
  const navigate = useNavigate();

  const getThemePreview = (themeName, theme) => {
    const isActive = currentTheme === themeName;
    
    return (
      <Card 
        className={`theme-card h-100 ${isActive ? 'active' : ''}`}
        onClick={() => changeTheme(themeName)}
        style={{
          background: theme.cardGradient,
          borderRadius: theme.borderRadius,
          boxShadow: theme.shadowStyle,
          transform: isActive ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Card.Header 
          className="text-center border-0"
          style={{
            background: theme.gradient,
            color: 'white',
            borderRadius: `${theme.borderRadius} ${theme.borderRadius} 0 0`,
            padding: '1rem',
          }}
        >
          <h5 className="mb-0 fw-bold">{theme.name}</h5>
        </Card.Header>
        
        <Card.Body className="text-center p-4">
          <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
            {theme.description}
          </p>
          
          {/* Превью цветов темы */}
          <div className="d-flex justify-content-center gap-2 mb-3">
            <div 
              className="rounded-circle"
              style={{
                width: '20px',
                height: '20px',
                background: theme.primary,
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
              title="Primary"
            ></div>
            <div 
              className="rounded-circle"
              style={{
                width: '20px',
                height: '20px',
                background: theme.secondary,
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
              title="Secondary"
            ></div>
            <div 
              className="rounded-circle"
              style={{
                width: '20px',
                height: '20px',
                background: theme.accent,
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
              title="Accent"
            ></div>
            <div 
              className="rounded-circle"
              style={{
                width: '20px',
                height: '20px',
                background: theme.accentSecondary,
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
              title="Accent Secondary"
            ></div>
          </div>
          
          {/* Превью элементов */}
          <div className="mb-3">
            <div 
              className="mb-2"
              style={{
                height: '8px',
                background: theme.buttonGradient,
                borderRadius: theme.borderRadius,
                opacity: 0.8,
              }}
            ></div>
            <div 
              className="mb-2"
              style={{
                height: '6px',
                background: theme.gradient,
                borderRadius: theme.borderRadius,
                opacity: 0.6,
              }}
            ></div>
            <div 
              style={{
                height: '4px',
                background: theme.medium,
                borderRadius: theme.borderRadius,
                opacity: 0.4,
              }}
            ></div>
          </div>
          
          <Button
            size="sm"
            className={isActive ? 'btn-secondary-custom' : 'btn-primary-custom'}
            style={{
              borderRadius: theme.borderRadius,
              fontSize: '0.8rem',
              padding: '0.5rem 1rem',
            }}
            disabled={isActive}
          >
            {isActive ? 'Активна' : 'Выбрать'}
          </Button>
          
          {isActive && (
            <div className="mt-2">
              <small className="text-success">
                ✓ Текущая тема
              </small>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container className="py-5 mt-5">
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center justify-content-center mb-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className={`back-button back-button-${currentTheme} position-absolute start-0`}
            >
              <svg 
                className="back-button-icon" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              Назад
            </button>
            <div className="text-center">
              <h1 className="h2 mb-3">Управление темами</h1>
              <p className="text-muted">
                Выберите стиль оформления сайта для создания уникального визуального опыта
              </p>
            </div>
          </div>
        </Col>
      </Row>
      
      <Row className="g-4">
        {Object.entries(themes).map(([themeName, theme]) => (
          <Col key={themeName} lg={4} md={6}>
            <div className="fade-in">
              {getThemePreview(themeName, theme)}
            </div>
          </Col>
        ))}
      </Row>
      
      <Row className="mt-5">
        <Col>
          <Card className="bg-light border-0">
            <Card.Body className="text-center p-4">
              <h6 className="fw-bold mb-3">Информация о темах</h6>
              <Row>
                <Col md={4} className="mb-3">
                  <div className="h5 fw-bold" style={{ color: 'var(--accent-bright)' }}>
                    🎨
                  </div>
                  <h6>Модерн</h6>
                  <small className="text-muted">
                    Современные градиенты, плавные анимации, динамичные переходы
                  </small>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="h5 fw-bold" style={{ color: 'var(--primary-dark)' }}>
                    📐
                  </div>
                  <h6>Строгий</h6>
                  <small className="text-muted">
                    Четкие линии, классические формы, деловой стиль
                  </small>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="h5 fw-bold" style={{ color: 'var(--accent-orange)' }}>
                    🤝
                  </div>
                  <h6>Эргономичный</h6>
                  <small className="text-muted">
                    Комфортное восприятие, мягкие переходы, удобство использования
                  </small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col className="text-center">
          <small className="text-muted">
            Изменения темы применяются мгновенно и сохраняются в браузере
          </small>
        </Col>
      </Row>
    </Container>
  );
};

export default ThemeManagement;
