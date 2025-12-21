import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Table, 
  Badge, 
  Alert,
  Modal,
  Form,
  Spinner
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { toolsAPI } from '../../utils/api';
import { CATEGORIES_HIERARCHY, getSubcategoriesByCategory } from '../../constants/categories';

const ToolsManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingTool, setEditingTool] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    descriptions: {
      ru: '',
      en: '',
      kk: ''
    },
    functions: [],
    functionsMultilang: {
      ru: [],
      en: [],
      kk: []
    },
    purpose: '',
    purposes: {
      ru: '',
      en: '',
      kk: ''
    },
    category: '',
    subcategory: '',
    link: '',
    color: '#FFFFFF',
    logo: '',
  });
  
  // Available subcategories for selected category
  const [availableSubcategories, setAvailableSubcategories] = useState([]);

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    try {
      setLoading(true);
      const response = await toolsAPI.getAll();
      setTools(response.data.tools);
    } catch (error) {
      console.error('Error loading tools:', error);
      setError('Ошибка загрузки инструментов');
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (tool = null) => {
    if (tool) {
      setEditingTool(tool);
      setFormData({
        title: tool.title,
        description: tool.description,
        descriptions: {
          ru: tool.descriptions?.ru || '',
          en: tool.descriptions?.en || '',
          kk: tool.descriptions?.kk || ''
        },
        functions: tool.functions || [],
        functionsMultilang: {
          ru: tool.functionsMultilang?.ru || tool.functions || [],
          en: tool.functionsMultilang?.en || [],
          kk: tool.functionsMultilang?.kk || []
        },
        purpose: tool.purpose || '',
        purposes: {
          ru: tool.purposes?.ru || tool.purpose || '',
          en: tool.purposes?.en || '',
          kk: tool.purposes?.kk || ''
        },
        category: tool.category,
        subcategory: tool.subcategory,
        link: tool.link,
        color: tool.color || '#FFFFFF',
        logo: tool.logo || '',
      });
      // Инициализируем подкатегории для существующего инструмента
      setAvailableSubcategories(getSubcategoriesByCategory(tool.category));
    } else {
      setEditingTool(null);
      setFormData({
        title: '',
        description: '',
        descriptions: {
          ru: '',
          en: '',
          kk: ''
        },
        functions: [],
        functionsMultilang: {
          ru: [],
          en: [],
          kk: []
        },
        purpose: '',
        purposes: {
          ru: '',
          en: '',
          kk: ''
        },
        category: '',
        subcategory: '',
        link: '',
        color: '#FFFFFF',
        logo: '',
      });
      setAvailableSubcategories([]);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTool(null);
    setError('');
    setSuccess('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'functions') {
      // Разделяем функции по запятым (старый формат для обратной совместимости)
      setFormData(prev => ({
        ...prev,
        [name]: value.split(',').map(func => func.trim()).filter(func => func)
      }));
    } else if (name.startsWith('functions_')) {
      // Обработка многоязычных функций
      const lang = name.split('_')[1];
      const functionsArray = value.split(',').map(func => func.trim()).filter(func => func);
      setFormData(prev => ({
        ...prev,
        functionsMultilang: {
          ...prev.functionsMultilang,
          [lang]: functionsArray
        }
      }));
    } else if (name.startsWith('purpose_')) {
      // Обработка многоязычных назначений
      const lang = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        purposes: {
          ...prev.purposes,
          [lang]: value
        }
      }));
    } else if (name === 'category') {
      // При изменении категории обновляем доступные подкатегории и сбрасываем подкатегорию
      setFormData(prev => ({
        ...prev,
        [name]: value,
        subcategory: ''
      }));
      setAvailableSubcategories(getSubcategoriesByCategory(value));
    } else if (name.startsWith('description_')) {
      // Обработка многоязычных описаний
      const lang = name.split('_')[1];
      setFormData(prev => ({
        ...prev,
        descriptions: {
          ...prev.descriptions,
          [lang]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setModalLoading(true);
      setError('');
      setSuccess('');
      
      // Подготавливаем данные для отправки
      const submitData = {
        ...formData,
        // Если есть purposes, но нет purpose, заполняем purpose из purposes.ru для обратной совместимости
        purpose: formData.purpose || formData.purposes?.ru || formData.purposes?.en || formData.purposes?.kk || '',
        // Если есть functionsMultilang, но нет functions, заполняем functions из functionsMultilang.ru
        functions: formData.functions && formData.functions.length > 0 
          ? formData.functions 
          : (formData.functionsMultilang?.ru || formData.functionsMultilang?.en || formData.functionsMultilang?.kk || [])
      };
      
      if (editingTool) {
        await toolsAPI.update(editingTool._id, submitData);
        setSuccess('Инструмент успешно обновлен');
      } else {
        await toolsAPI.create(submitData);
        setSuccess('Инструмент успешно создан');
      }
      
      await loadTools();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving tool:', error);
      setError(error.response?.data?.message || error.response?.data?.details || 'Ошибка сохранения инструмента');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (toolId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот инструмент?')) {
      return;
    }
    
    try {
      await toolsAPI.delete(toolId);
      setSuccess('Инструмент успешно удален');
      await loadTools();
    } catch (error) {
      console.error('Error deleting tool:', error);
      setError('Ошибка удаления инструмента');
    }
  };

  if (loading) {
    return (
      <Container className="py-5 mt-5">
        <Row className="justify-content-center">
          <Col xs="auto">
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Загрузка инструментов...</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5 mt-5">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <button
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
              </button>
              <h1 className="h2 mb-0">{t('admin.tools.title')}</h1>
            </div>
            <Button
              className="btn-primary-custom"
              onClick={() => handleShowModal()}
            >
              {t('admin.tools.add')}
            </Button>
          </div>
        </Col>
      </Row>
      
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}
      
      <Card>
        <Card.Body>
          {tools.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-3" style={{ fontSize: '3rem' }}>📝</div>
              <h5>Инструменты не найдены</h5>
              <p className="text-muted">Начните с добавления первого инструмента</p>
              <Button
                className="btn-primary-custom"
                onClick={() => handleShowModal()}
              >
                Добавить инструмент
              </Button>
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Категория</th>
                  <th>Подкатегория</th>
                  <th>Цвет</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool._id}>
                    <td>
                      <div>
                        <strong>{tool.title}</strong>
                        <br />
                        <small className="text-muted">
                          {tool.description.substring(0, 50)}...
                        </small>
                      </div>
                    </td>
                    <td>
                      <Badge bg="primary">{t(`categories.${tool.category}`)}</Badge>
                    </td>
                    <td>
                      <Badge bg="secondary">{t(`subcategories.${tool.subcategory}`)}</Badge>
                    </td>
                    <td>
                      <div 
                        style={{
                          width: '30px',
                          height: '30px',
                          backgroundColor: tool.color,
                          border: '1px solid #ddd',
                          borderRadius: '4px'
                        }}
                      ></div>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => handleShowModal(tool)}
                        >
                          {t('admin.tools.edit')}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDelete(tool._id)}
                        >
                          {t('admin.tools.delete')}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      
      {/* Modal для создания/редактирования */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingTool ? 'Редактировать инструмент' : 'Добавить инструмент'}
          </Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('admin.tools.fields.title')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('admin.tools.fields.category')}</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Выберите категорию</option>
                    {Object.keys(CATEGORIES_HIERARCHY).map(category => (
                      <option key={category} value={category}>
                        {t(`categories.${category}`)}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('admin.tools.fields.subcategory')}</Form.Label>
                  <Form.Select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    disabled={!formData.category}
                  >
                    <option value="">Выберите подкатегорию</option>
                    {availableSubcategories.map(subcategory => (
                      <option key={subcategory} value={subcategory}>
                        {t(`subcategories.${subcategory}`)}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('admin.tools.fields.color')}</Form.Label>
                  <Form.Control
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>{t('admin.tools.fields.description')}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">
                Общее описание (используется как запасной вариант)
              </Form.Text>
            </Form.Group>
            
            {/* Многоязычные описания */}
            <div className="mb-3">
              <h6 className="mb-3">{t('admin.tools.multilang_section')}</h6>
              
              <Form.Group className="mb-3">
                <Form.Label>{t('admin.tools.fields.description_ru')}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description_ru"
                  value={formData.descriptions.ru}
                  onChange={handleChange}
                  placeholder="Описание на русском языке"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>{t('admin.tools.fields.description_en')}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description_en"
                  value={formData.descriptions.en}
                  onChange={handleChange}
                  placeholder="Description in English"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>{t('admin.tools.fields.description_kk')}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description_kk"
                  value={formData.descriptions.kk}
                  onChange={handleChange}
                  placeholder="Қазақша сипаттама"
                />
              </Form.Group>
            </div>
            
            {/* Многоязычные функции */}
            <div className="mb-3">
              <h6 className="mb-3">{t('admin.tools.fields.functions')} ({t('admin.tools.multilang_section')})</h6>
              
              <Form.Group className="mb-3">
                <Form.Label>{t('admin.tools.fields.functions')} (Русский)</Form.Label>
                <Form.Control
                  type="text"
                  name="functions_ru"
                  value={formData.functionsMultilang.ru.join(', ')}
                  onChange={handleChange}
                  placeholder="Функция1, Функция2, Функция3"
                />
                <Form.Text className="text-muted">
                  Разделите функции запятыми
                </Form.Text>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>{t('admin.tools.fields.functions')} (English)</Form.Label>
                <Form.Control
                  type="text"
                  name="functions_en"
                  value={formData.functionsMultilang.en.join(', ')}
                  onChange={handleChange}
                  placeholder="Function1, Function2, Function3"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>{t('admin.tools.fields.functions')} (Қазақша)</Form.Label>
                <Form.Control
                  type="text"
                  name="functions_kk"
                  value={formData.functionsMultilang.kk.join(', ')}
                  onChange={handleChange}
                  placeholder="Функция1, Функция2, Функция3"
                />
              </Form.Group>
            </div>
            
            {/* Многоязычные назначения */}
            <div className="mb-3">
              <h6 className="mb-3">{t('admin.tools.fields.purpose')} ({t('admin.tools.multilang_section')})</h6>
              
              <Form.Group className="mb-3">
                <Form.Label>{t('admin.tools.fields.purpose')} (Русский)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="purpose_ru"
                  value={formData.purposes.ru}
                  onChange={handleChange}
                  placeholder="Назначение на русском языке"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>{t('admin.tools.fields.purpose')} (English)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="purpose_en"
                  value={formData.purposes.en}
                  onChange={handleChange}
                  placeholder="Purpose in English"
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>{t('admin.tools.fields.purpose')} (Қазақша)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="purpose_kk"
                  value={formData.purposes.kk}
                  onChange={handleChange}
                  placeholder="Мақсаты қазақша"
                />
              </Form.Group>
            </div>
            
            <Form.Group className="mb-3">
              <Form.Label>{t('admin.tools.fields.link')}</Form.Label>
              <Form.Control
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Логотип инструмента</Form.Label>
              <Form.Control
                type="url"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
              />
              <Form.Text className="text-muted">
                Ссылка на логотип с прозрачным фоном (PNG)
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              className="btn-primary-custom"
              disabled={modalLoading}
            >
              {modalLoading ? 'Сохранение...' : t('common.save')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ToolsManagement;
