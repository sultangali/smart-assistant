import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useTranslations } from '../../hooks/useTranslations'; // Не нужен, если весь контент на русском
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { toolsAPI } from '../../utils/api';
import { CATEGORIES_HIERARCHY, getSubcategoriesByCategory } from '../../constants/categories';

const FilterSection = () => {
  const { t } = useTranslations();
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    purpose: '',
  });
  
  const [categories, setCategories] = useState(Object.keys(CATEGORIES_HIERARCHY));
  const [subcategories, setSubcategories] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await toolsAPI.getCategories();
      const { purposes } = response.data;
      
      // Категории уже загружены из констант
      setPurposes(purposes.filter(purpose => purpose !== 'all'));
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
      setError('Ошибка загрузки категорий');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [name]: value,
      };
      
      // Сбросить подкатегорию при изменении категории
      if (name === 'category') {
        newFilters.subcategory = '';
        // Обновить доступные подкатегории
        setSubcategories(getSubcategoriesByCategory(value));
      }
      
      return newFilters;
    });
  };

  const handleSearch = () => {
    if (!filters.category) {
      setError('Пожалуйста, выберите категорию');
      return;
    }
    
    // Формирование параметров поиска
    const searchParams = new URLSearchParams();
    
    if (filters.category) searchParams.set('category', filters.category);
    if (filters.subcategory) searchParams.set('subcategory', filters.subcategory);
    if (filters.purpose) searchParams.set('purpose', filters.purpose);
    
    navigate(`/tools?${searchParams.toString()}`);
  };

  const handleReset = () => {
    setFilters({
      category: '',
      subcategory: '',
      purpose: '',
    });
    setError('');
  };

  // Фильтрация подкатегорий по выбранной категории
  const getFilteredSubcategories = () => {
    if (!filters.category) return [];
    return getSubcategoriesByCategory(filters.category);
  };

  return (
    <section id="filter" className={`section filter-section filter-section-${currentTheme}`}>
      {/* Декоративные элементы */}
      <div className={`filter-decoration filter-decoration-${currentTheme}`}>
        <div className="filter-shape filter-shape-1"></div>
        <div className="filter-shape filter-shape-2"></div>
        <div className="filter-floating-icon filter-floating-icon-1">🔍</div>
        <div className="filter-floating-icon filter-floating-icon-2">🛠️</div>
        <div className="filter-floating-icon filter-floating-icon-3">⚡</div>
      </div>

      <Container className="section-content">
        <Row className="min-vh-100 justify-content-center">
          <Col lg={12} xl={12}>
            <div className="filter-wrapper text-center">
              {/* Заголовок */}
              <div className="filter-header slide-in-down">
                <h2 className={`filter-title filter-title-${currentTheme}`}>
                  {t('landing.filter.title')}
                </h2>
              </div>

              {/* Контент */}
              <div className="filter-content">
                {error && (
                  <Alert variant="danger" className="mb-4 slide-in-up">
                    {error}
                  </Alert>
                )}
                
                <Form className={`filter-form filter-form-${currentTheme} slide-in-up`}>
                {/* Горизонтальная линия инпутов */}
                <Row className="g-3 mb-4 align-items-end">
                  <Col lg={4} md={4} sm={12}>
                    <Form.Select
                      className={`filter-select filter-select-${currentTheme}`}
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      disabled={loading}
                    >
                      <option value="">{t('landing.filter.category')}</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {t(`categories.${category}`)}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  
                  <Col lg={4} md={4} sm={12}>
                    <Form.Select
                      className={`filter-select filter-select-${currentTheme}`}
                      value={filters.subcategory}
                      onChange={(e) => handleFilterChange('subcategory', e.target.value)}
                      disabled={loading || !filters.category}
                    >
                      <option value="">{t('landing.filter.subcategory')}</option>
                      {getFilteredSubcategories().map((subcategory) => (
                        <option key={subcategory} value={subcategory}>
                          {t(`subcategories.${subcategory}`)}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  
                  <Col lg={4} md={4} sm={12}>
                    <Form.Select
                      className={`filter-select filter-select-${currentTheme}`}
                      value={filters.purpose}
                      onChange={(e) => handleFilterChange('purpose', e.target.value)}
                      disabled={loading}
                    >
                      <option value="">{t('landing.filter.purpose')}</option>
                      {purposes.map((purpose) => (
                        <option key={purpose} value={purpose}>
                          {purpose}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
                
                {/* Кнопки с иконками */}
                <div className="filter-buttons d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <button
                    type="button"
                    className={`filter-btn filter-btn-primary filter-btn-${currentTheme}`}
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    <svg 
                      className="filter-btn-icon" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                    <span className="filter-btn-text">
                      {loading ? t('common.loading') : t('landing.filter.search_button')}
                    </span>
                  </button>
                  
                  <button
                    type="button"
                    className={`filter-btn filter-btn-secondary filter-btn-${currentTheme}`}
                    onClick={handleReset}
                    disabled={loading}
                  >
                    <svg 
                      className="filter-btn-icon" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                    </svg>
                    <span className="filter-btn-text">
                      {t('landing.filter.reset')}
                    </span>
                  </button>
                </div>
              </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FilterSection;
