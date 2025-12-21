import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { CATEGORIES_HIERARCHY } from '../../constants/categories';

const CategoryManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentTheme } = useTheme();

  return (
    <Container className="py-5 mt-5">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Button
                onClick={() => navigate('/admin/dashboard')}
                className={`back-button back-button-${currentTheme} me-3`}
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
              </Button>
              <h1 className="h2 mb-0">Управление категориями</h1>
            </div>
          </div>
        </Col>
      </Row>
      
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Иерархия категорий и подкатегорий</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <p className="text-muted">
                  Здесь отображается текущая иерархия категорий и подкатегорий для ИИ инструментов.
                  Категории и подкатегории определены в константах и не могут быть изменены через интерфейс.
                </p>
              </div>
              
              {Object.entries(CATEGORIES_HIERARCHY).map(([category, subcategories], index) => (
                <div key={category} className="mb-4">
                  <div className="d-flex align-items-center mb-2">
                    <Badge bg="primary" className="me-2" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                      {index + 1}. {category}
                    </Badge>
                  </div>
                  
                  <div className="ms-4">
                    <h6 className="text-muted mb-2">Подкатегории:</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {subcategories.map((subcategory, subIndex) => (
                        <Badge 
                          key={subcategory} 
                          bg="secondary" 
                          className="me-2 mb-2"
                          style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}
                        >
                          {subIndex + 1}. {subcategory}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 p-3 bg-light rounded">
                <h6 className="text-info mb-2">ℹ️ Информация</h6>
                <p className="mb-0 small">
                  При добавлении нового инструмента в админ панели, категория и подкатегория должны соответствовать этой иерархии.
                  Подкатегории автоматически фильтруются в зависимости от выбранной категории.
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryManagement;
