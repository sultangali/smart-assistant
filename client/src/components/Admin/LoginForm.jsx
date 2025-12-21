import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const result = await login(formData);
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Произошла ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 mt-5">
      {/* Кнопка "Назад" вне карточки */}
      <Row className="mb-3">
        <Col>
          <button
            onClick={() => navigate('/')}
            className={`back-button back-button-${currentTheme}`}
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
            На главную
          </button>
        </Col>
      </Row>
      
      <Row className="justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <Col lg={5} md={7}>
          <Card className={`login-card login-card-${currentTheme} shadow border-0`}>
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2" style={{ color: 'var(--primary-dark)' }}>
                  {t('admin.login.title')}
                </h2>
                <p className="text-muted">
                  Введите ваши учетные данные для доступа к панели управления
                </p>
              </div>
              
              {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('admin.login.email')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control-custom"
                    placeholder="admin"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>{t('admin.login.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control-custom"
                    placeholder="••••••••"
                    required
                  />
                </Form.Group>
                
                <Button
                  type="submit"
                  className="btn-primary-custom w-100"
                  disabled={loading}
                >
                  {loading ? 'Вход...' : t('admin.login.submit')}
                </Button>
              </Form>
              
            
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
