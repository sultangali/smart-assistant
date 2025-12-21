import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Tab, Tabs } from 'react-bootstrap';
import { useTranslations } from '../../hooks/useTranslations';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import StatisticsDashboard from './StatisticsDashboard';
import { statsAPI } from '../../utils/api';

const Dashboard = () => {
  const { t } = useTranslations();
  const { admin, logout } = useAuth();
  const { currentTheme } = useTheme();
  const navigate = useNavigate();
  
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await statsAPI.getStatistics();
      setStatistics(response.data.data);
    } catch (error) {
      console.error('Ошибка при загрузке статистики:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <Container className="py-5 mt-5">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <button
                onClick={() => navigate('/')}
                className={`back-button back-button-${currentTheme} me-3`}>
                <svg 
                  className="back-button-icon" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                На главную
              </button>
              <div>
                <h1 className="h2 mb-2">{t('admin.dashboard.title')}</h1>
                <p className="text-muted mb-0">
                  Добро пожаловать, {admin?.email}
                </p>
              </div>
            </div>
            
            <Button
              variant="outline-danger"
              onClick={handleLogout}
              className="btn-secondary-custom">
              {t('admin.dashboard.logout')}
            </Button>
          </div>
        </Col>
      </Row>
      
      {/* Табы для переключения между обзором и статистикой */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className={`dashboard-tabs dashboard-tabs-${currentTheme}`}
      >
        <Tab eventKey="overview" title="📋 Обзор">
          <Row className="g-4 mt-3">
            <Col lg={4} md={4}>
              <Card className={`h-100 tool-card tool-card-${currentTheme}`}>
                <Card.Body className="text-center p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>
                    🛠️
                  </div>
                  <h5 className="fw-bold mb-3">{t('admin.dashboard.tools')}</h5>
                  <p className="text-muted mb-4">
                    Управление ИИ-инструментами: добавление, редактирование, удаление
                  </p>
                  <Button
                    as={Link}
                    to="/admin/tools"
                    className="btn-primary-custom"
                  >
                    Управлять инструментами
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={4}>
              <Card className={`h-100 tool-card tool-card-${currentTheme}`}>
                <Card.Body className="text-center p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>
                    💬
                  </div>
                  <h5 className="fw-bold mb-3">{t('admin.dashboard.feedback')}</h5>
                  <p className="text-muted mb-4">
                    Просмотр и обработка обратной связи от пользователей
                  </p>
                  <Button
                    as={Link}
                    to="/admin/feedback"
                    className="btn-primary-custom"
                  >
                    Просмотреть обратную связь
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={4}>
              <Card className={`h-100 tool-card tool-card-${currentTheme}`}>
                <Card.Body className="text-center p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>
                    🎨
                  </div>
                  <h5 className="fw-bold mb-3">Темы</h5>
                  <p className="text-muted mb-4">
                    Управление стилями оформления: модерн, строгий, эргономичный
                  </p>
                  <Button
                    as={Link}
                    to="/admin/themes"
                    className="btn-primary-custom"
                  >
                    Управлять темами
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={4}>
              <Card className={`h-100 tool-card tool-card-${currentTheme}`}>
                <Card.Body className="text-center p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>
                    📂
                  </div>
                  <h5 className="fw-bold mb-3">Категории</h5>
                  <p className="text-muted mb-4">
                    Просмотр иерархии категорий и подкатегорий инструментов
                  </p>
                  <Button
                    as={Link}
                    to="/admin/categories"
                    className="btn-primary-custom"
                  >
                    Управлять категориями
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={4} md={4}>
              <Card className={`h-100 tool-card tool-card-${currentTheme}`}>
                <Card.Body className="text-center p-4">
                  <div className="mb-3" style={{ fontSize: '3rem' }}>
                    📝
                  </div>
                  <h5 className="fw-bold mb-3">Контент</h5>
                  <p className="text-muted mb-4">
                    Управление многоязычным контентом сайта
                  </p>
                  <Button
                    as={Link}
                    to="/admin/content"
                    className="btn-primary-custom"
                  >
                    Управлять контентом
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Быстрая статистика в обзоре */}
          <Row className="mt-5">
            <Col>
              <Card className={`stats-card stats-card-${currentTheme}`}>
                <Card.Body>
                  <h6 className="fw-bold mb-3">📊 Быстрая статистика</h6>
                  <Row>
                    <Col md={3} className="text-center">
                      <div className={`h4 fw-bold stat-number-primary-${currentTheme}`}>
                        {statistics?.overview?.totalTools || 0}
                      </div>
                      <small className="text-muted">Всего инструментов</small>
                    </Col>
                    <Col md={3} className="text-center">
                      <div className={`h4 fw-bold stat-number-success-${currentTheme}`}>
                        {statistics?.overview?.newFeedbacks || 0}
                      </div>
                      <small className="text-muted">Новых сообщений</small>
                    </Col>
                    <Col md={3} className="text-center">
                      <div className={`h4 fw-bold stat-number-info-${currentTheme}`}>
                        {statistics?.overview?.totalCategories || 0}
                      </div>
                      <small className="text-muted">Категорий</small>
                    </Col>
                    <Col md={3} className="text-center">
                      <div className={`h4 fw-bold stat-number-warning-${currentTheme}`}>
                        {statistics?.overview?.totalFeedbacks || 0}
                      </div>
                      <small className="text-muted">Всего сообщений</small>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
        
        <Tab eventKey="statistics" title="📈 Подробная статистика">
          <StatisticsDashboard />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Dashboard;
