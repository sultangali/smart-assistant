import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner, Form } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { toolsAPI } from '../utils/api';
import ToolCard from '../components/Tools/ToolCard';
import { CATEGORIES_HIERARCHY, getSubcategoriesByCategory } from '../constants/categories';

const ToolsResults = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Состояние фильтров
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    purpose: '',
  });
  
  // Данные для фильтров
  const [categories, setCategories] = useState(Object.keys(CATEGORIES_HIERARCHY));
  const [subcategories, setSubcategories] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [allTools, setAllTools] = useState([]); // Все инструменты для извлечения purposes
  const [filterLoading, setFilterLoading] = useState(false);

  // Загружаем все инструменты для извлечения purposes
  useEffect(() => {
    const loadAllTools = async () => {
      try {
        const response = await toolsAPI.getAll();
        setAllTools(response.data.tools);
      } catch (error) {
        console.error('Ошибка загрузки инструментов для purposes:', error);
      }
    };
    
    loadAllTools();
  }, []);

  // Обновляем purposes при изменении языка, категории или подкатегории
  useEffect(() => {
    const updatePurposes = () => {
      // Если категория не выбрана, очищаем purposes
      if (!filters.category) {
        setPurposes([]);
        return;
      }

      const currentLang = i18n.language || 'ru';
      const uniquePurposes = new Set();
      
      // Фильтруем инструменты по выбранной категории (обязательно)
      let filteredTools = allTools.filter(tool => tool.category === filters.category);
      
      // Если выбрана подкатегория, дополнительно фильтруем по ней
      if (filters.subcategory) {
        filteredTools = filteredTools.filter(tool => tool.subcategory === filters.subcategory);
      }
      
      // Извлекаем уникальные purposes с учетом текущего языка
      filteredTools.forEach(tool => {
        // Приоритет: purposes[currentLang] -> purposes.ru -> purpose (старое поле)
        let purpose = '';
        if (tool.purposes?.[currentLang] && tool.purposes[currentLang].trim() !== '') {
          purpose = tool.purposes[currentLang];
        } else if (tool.purposes?.ru && tool.purposes.ru.trim() !== '') {
          purpose = tool.purposes.ru;
        } else if (tool.purpose && tool.purpose.trim() !== '') {
          purpose = tool.purpose;
        }
        
        if (purpose && purpose.trim() !== '') {
          uniquePurposes.add(purpose);
        }
      });
      
      const sortedPurposes = Array.from(uniquePurposes).sort();
      setPurposes(sortedPurposes);
      
      // Отладочная информация
      console.log('🔍 Purposes обновлены:', {
        language: currentLang,
        category: filters.category,
        subcategory: filters.subcategory,
        filteredToolsCount: filteredTools.length,
        purposesCount: sortedPurposes.length,
        purposes: sortedPurposes
      });
    };
    
    if (allTools.length > 0) {
      updatePurposes();
    }
  }, [i18n.language, filters.category, filters.subcategory, allTools]);

  useEffect(() => {
    loadTools();
    loadFilterData();
    // Инициализируем фильтры из URL параметров
    const category = searchParams.get('category') || '';
    const subcategory = searchParams.get('subcategory') || '';
    const purpose = searchParams.get('purpose') || '';
    setFilters({ category, subcategory, purpose });
    
    // Инициализируем подкатегории для выбранной категории
    if (category) {
      setSubcategories(getSubcategoriesByCategory(category));
    }
  }, [searchParams]);

  const loadTools = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      
      const response = await toolsAPI.getAll(params);
      setTools(response.data.tools);
    } catch (error) {
      console.error('Error loading tools:', error);
      setError('Ошибка загрузки инструментов');
    } finally {
      setLoading(false);
    }
  };

  const loadFilterData = async () => {
    try {
      setFilterLoading(true);
      // Категории уже загружены из констант
      // purposes теперь обновляются через useEffect на основе allTools
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
    } finally {
      setFilterLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [name]: value,
      };
      
      // Сбросить подкатегорию и purpose при изменении категории
      if (name === 'category') {
        newFilters.subcategory = '';
        newFilters.purpose = '';
        // Обновить доступные подкатегории
        setSubcategories(getSubcategoriesByCategory(value));
      }
      
      // Сбросить purpose при изменении подкатегории
      if (name === 'subcategory') {
        newFilters.purpose = '';
      }
      
      return newFilters;
    });
  };

  const handleSearch = () => {
    if (!filters.category) {
      setError(t('landing.filter.category') + ' ' + t('common.error'));
      return;
    }
    
    // Формирование параметров поиска
    const newSearchParams = new URLSearchParams();
    
    if (filters.category) newSearchParams.set('category', filters.category);
    if (filters.subcategory) newSearchParams.set('subcategory', filters.subcategory);
    if (filters.purpose) newSearchParams.set('purpose', filters.purpose);
    
    setSearchParams(newSearchParams);
    setError('');
  };

  const handleReset = () => {
    setFilters({
      category: '',
      subcategory: '',
      purpose: '',
    });
    setError('');
    setSearchParams(new URLSearchParams());
  };

  const getFilterInfo = () => {
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const purposeParam = searchParams.get('purpose');
    
    const filterList = [];
    if (category) filterList.push(`${t('landing.filter.category')}: ${t(`categories.${category}`)}`);
    if (subcategory) filterList.push(`${t('landing.filter.subcategory')}: ${t(`subcategories.${subcategory}`)}`);
    if (purposeParam) {
      // Находим переведенный purpose из инструментов
      const currentLang = i18n.language || 'ru';
      const tool = allTools.find(t => {
        const toolPurpose = t.purposes?.[currentLang] || t.purpose || '';
        return toolPurpose === purposeParam;
      });
      const displayPurpose = tool ? (tool.purposes?.[currentLang] || tool.purpose || purposeParam) : purposeParam;
      filterList.push(`${t('landing.filter.purpose')}: ${displayPurpose}`);
    }
    
    return filterList.join(' • ');
  };

  // Фильтрация подкатегорий по выбранной категории
  const getFilteredSubcategories = () => {
    if (!filters.category) return [];
    return getSubcategoriesByCategory(filters.category);
  };

  if (loading) {
    return (
      <Container className="py-5 mt-5">
        <Row className="justify-content-center">
          <Col xs="auto">
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">{t('common.loading')}</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div>
      {/* Секция фильтра - во всю ширину */}
      <div className={`section filter-section filter-section-${currentTheme}`}>
        {/* Декоративные элементы */}
        <div className={`filter-decoration filter-decoration-${currentTheme}`}>
          <div className="filter-shape filter-shape-1"></div>
          <div className="filter-shape filter-shape-2"></div>
          <div className="filter-floating-icon filter-floating-icon-1">🔍</div>
          <div className="filter-floating-icon filter-floating-icon-2">🛠️</div>
          <div className="filter-floating-icon filter-floating-icon-3">⚡</div>
        </div>

        <Container className="">
          <Row className="min-vh-100 justify-content-center">
            <Col lg={12} xl={12} md={12} sm={12}>
              <div className="filter-wrapper text-center">
                {/* Заголовок */}
                <div className="filter-header slide-in-down">
                  <h3 className={`filter-title filter-title-${currentTheme}`}>
                    {t('landing.filter.title')}
                  </h3>
                 
                </div>

                {/* Фильтр */}
                <div className="filter-content">
                  {error && (
                    <Alert variant="danger" className="mb-4 slide-in-up">
                      {error}
                    </Alert>
                  )}
                  
                  <Form className={`filter-form filter-form-${currentTheme} slide-in-up`}>
                    {/* Горизонтальная линия инпутов */}
                    <Row className="g-3 mb-3 align-items-end">
                      <Col lg={4} md={4} sm={12}>
                        <Form.Select
                          className={`filter-select filter-select-${currentTheme}`}
                          value={filters.category}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          disabled={filterLoading}
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
                          disabled={filterLoading || !filters.category}
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
                          disabled={filterLoading || !filters.category || purposes.length === 0}
                        >
                          <option value="">{t('landing.filter.purpose')}</option>
                          {purposes.map((purpose, index) => (
                            <option key={`${purpose}-${index}`} value={purpose}>
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
                        disabled={filterLoading}
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
                          {filterLoading ? t('common.loading') : t('landing.filter.search_button')}
                        </span>
                      </button>
                      
                      <button
                        type="button"
                        className={`filter-btn filter-btn-secondary filter-btn-${currentTheme}`}
                        onClick={handleReset}
                        disabled={filterLoading}
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
            <Col lg={12} xs={12} >
            {tools.length === 0 && !loading && !error && (
        <div className="py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
          <Container>
            <Row className="justify-content-center">
              <Col lg={12} xs={12} className="text-center">
                <div className="py-5">
                  <div className="mb-3" style={{ fontSize: '4rem' }}>
                    🔍
                  </div>
                  <h3 className="mb-3">{t('tools.not_found')}</h3>
                  <p className="text-muted mb-4">
                    {t('tools.try_again')}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
      
      {tools.length > 0 && (
        <div className="py-4" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', margin: '0' }}>
          <Container style={{padding: '0px 0px'}}>
            <Row className="g-4">
              <Col lg={12} xs={12}>
                <div className="">
                 
                   {getFilterInfo() && (
                     <p className={`filter-subtitle filter-subtitle-${currentTheme} mb-1 `}>
                       {t('tools.filters_label')}: <strong>{getFilterInfo()}</strong> &nbsp; &nbsp; {t('tools.found_tools')}: <strong>{tools.length}</strong>
                     </p>
                   )}
                 
                </div>
              </Col>
              {tools.map((tool) => (
                <Col key={tool._id} lg={12} md={12} className="fade-in" >
                  <ToolCard tool={tool} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* Секция результатов - отдельно */}
   
    </div>
  );
};

export default ToolsResults;
