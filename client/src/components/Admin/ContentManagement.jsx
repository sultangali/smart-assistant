import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner, Tab, Tabs, Table, Badge, Modal } from 'react-bootstrap';
import { useTranslations } from '../../hooks/useTranslations';
import { useTheme } from '../../contexts/ThemeContext';
import { contentAPI } from '../../utils/api';
import { reloadTranslations } from '../../i18n/config';
import i18n from '../../i18n/config';

const ContentManagement = () => {
  const { t } = useTranslations();
  const { currentTheme } = useTheme();
  
  const [content, setContent] = useState([]);
  // Все доступные секции (статический список)
  const allSections = ['hero', 'about', 'filter', 'feedback', 'contact', 'nav', 'common', 'admin'];
  const [sections, setSections] = useState(allSections);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('list');
  const [selectedContent, setSelectedContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingLang, setEditingLang] = useState('ru');
  const [filterSection, setFilterSection] = useState('all');

  // Форма для создания/редактирования
  const [formData, setFormData] = useState({
    key: '',
    section: 'hero',
    type: 'text',
    isVisible: true,
    order: 0,
    metadata: {
      component: '',
      field: '',
      category: ''
    },
    translations: {
      ru: { title: '', subtitle: '', content: '', description: '', placeholder: '', button: '', label: '', value: '' },
      en: { title: '', subtitle: '', content: '', description: '', placeholder: '', button: '', label: '', value: '' },
      kk: { title: '', subtitle: '', content: '', description: '', placeholder: '', button: '', label: '', value: '' }
    }
  });

  useEffect(() => {
    fetchContent();
    fetchSections();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await contentAPI.getAll();
      setContent(response.data.data);
    } catch (err) {
      console.error('Ошибка при загрузке контента:', err);
      setError(t('admin.content.error_loading'));
    } finally {
      setLoading(false);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await contentAPI.getSections();
      // Объединяем секции из БД с полным списком секций
      const dbSections = response.data.data || [];
      const mergedSections = [...new Set([...allSections, ...dbSections])];
      setSections(mergedSections);
    } catch (err) {
      console.error('Ошибка при загрузке секций:', err);
      // В случае ошибки используем статический список
      setSections(allSections);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('translations.')) {
      const [lang, field] = name.split('.').slice(1);
      setFormData(prev => ({
        ...prev,
        translations: {
          ...prev.translations,
          [lang]: {
            ...(prev.translations[lang] || { title: '', subtitle: '', content: '', description: '', placeholder: '', button: '', label: '', value: '' }),
            [field]: value
          }
        }
      }));
    } else if (name.startsWith('metadata.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');

      if (selectedContent) {
        await contentAPI.update(selectedContent._id, formData);
        setSuccess(t('admin.content.success_updated'));
      } else {
        await contentAPI.create(formData);
        setSuccess(t('admin.content.success_created'));
      }

      // Перезагружаем контент
      await fetchContent();
      
      // Перезагружаем переводы только для текущего языка
      const currentLang = i18n.language || 'ru';
      console.log(`🔄 Перезагружаем переводы для языка ${currentLang} после обновления контента...`);
      try {
        await reloadTranslations(currentLang);
        console.log(`✅ Переводы для языка ${currentLang} перезагружены после обновления контента`);
      } catch (translationError) {
        console.warn('⚠️ Ошибка при перезагрузке переводов:', translationError);
      }
      
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error('Ошибка при сохранении контента:', err);
      setError(err.response?.data?.message || t('admin.content.error_saving'));
    }
  };

  const handleEdit = (contentItem) => {
    setSelectedContent(contentItem);
    
    // Инициализируем переводы с проверкой на существование казахского языка
    const translations = {
      ru: contentItem.translations?.ru || { title: '', subtitle: '', content: '', description: '', placeholder: '', button: '', label: '', value: '' },
      en: contentItem.translations?.en || { title: '', subtitle: '', content: '', description: '', placeholder: '', button: '', label: '', value: '' },
      kk: contentItem.translations?.kk || { title: '', subtitle: '', content: '', description: '', placeholder: '', button: '', label: '', value: '' }
    };
    
    setFormData({
      key: contentItem.key,
      section: contentItem.section,
      type: contentItem.type,
      isVisible: contentItem.isVisible,
      order: contentItem.order,
      metadata: contentItem.metadata || { component: '', field: '', category: '' },
      translations: translations
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('admin.content.confirm_delete'))) {
      try {
        await contentAPI.delete(id);
        setSuccess(t('admin.content.success_deleted'));
        
        // Перезагружаем контент
        await fetchContent();
        
        // Перезагружаем переводы только для текущего языка
        const currentLang = i18n.language || 'ru';
        console.log(`🔄 Перезагружаем переводы для языка ${currentLang} после удаления контента...`);
        try {
          await reloadTranslations(currentLang);
          console.log(`✅ Переводы для языка ${currentLang} перезагружены после удаления контента`);
        } catch (translationError) {
          console.warn('⚠️ Ошибка при перезагрузке переводов:', translationError);
        }
      } catch (err) {
        console.error('Ошибка при удалении контента:', err);
        setError(t('admin.content.error_deleting'));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      key: '',
      section: 'hero',
      type: 'text',
      isVisible: true,
      order: 0,
      metadata: { component: '', field: '', category: '' },
      translations: {
        ru: { title: '', subtitle: '', content: '', description: '', placeholder: '', button: '', label: '', value: '' },
        en: { title: '', subtitle: '', content: '', description: '', placeholder: '', button: '', label: '', value: '' },
        kk: { title: '', subtitle: '', content: '', description: '', placeholder: '', button: '', label: '', value: '' }
      }
    });
    setSelectedContent(null);
  };

  const getTypeLabel = (type) => {
    const translation = t(`admin.content.types.${type}`, { defaultValue: type });
    return translation !== `admin.content.types.${type}` ? translation : type;
  };

  const getSectionLabel = (section) => {
    const translation = t(`admin.content.sections.${section}`, { defaultValue: section });
    return translation !== `admin.content.sections.${section}` ? translation : section;
  };

  const filteredContent = filterSection === 'all' 
    ? content 
    : content.filter(item => item.section === filterSection);

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Загрузка контента...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h2>{t('admin.content.title', { defaultValue: 'Управление контентом' })}</h2>
            <Button
              variant="primary"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
            >
              {t('admin.content.add_content')}
            </Button>
          </div>
        </Col>
      </Row>

      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      {success && <Alert variant="success" className="mb-3">{success}</Alert>}

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>{t('admin.content.filter_section')}</Form.Label>
            <Form.Select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
            >
              <option value="all">{t('admin.content.all_sections')}</option>
              {sections.map(section => (
                <option key={section} value={section}>
                  {getSectionLabel(section)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Card className={`chart-card chart-card-${currentTheme}`}>
        <Card.Body>
          <Table responsive className={`table-${currentTheme}`}>
            <thead>
              <tr>
                <th>{t('admin.content.key')}</th>
                <th>{t('admin.content.section')}</th>
                <th>{t('admin.content.type')}</th>
                <th>{t('admin.content.visibility')}</th>
                <th>{t('admin.content.order')}</th>
                <th>{t('admin.content.translations')}</th>
                <th>{t('admin.content.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredContent.map((item) => (
                <tr key={item._id}>
                  <td>
                    <code>{item.key}</code>
                  </td>
                  <td>
                    <Badge variant="info">{getSectionLabel(item.section)}</Badge>
                  </td>
                  <td>
                    <Badge variant="secondary">{getTypeLabel(item.type)}</Badge>
                  </td>
                  <td>
                    <Badge variant={item.isVisible ? 'success' : 'danger'}>
                      {item.isVisible ? t('admin.content.visible') : t('admin.content.hidden')}
                    </Badge>
                  </td>
                  <td>{item.order}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <Badge variant="primary" className="small">RU</Badge>
                      <Badge variant="warning" className="small">EN</Badge>
                      <Badge variant="success" className="small">KK</Badge>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => handleEdit(item)}
                      >
                        {t('admin.content.edit')}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        {t('admin.content.delete')}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Модальное окно для создания/редактирования */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedContent ? t('admin.content.edit_content') : t('admin.content.create_content')}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t('admin.content.key')} *</Form.Label>
                  <Form.Control
                    type="text"
                    name="key"
                    value={formData.key}
                    onChange={handleInputChange}
                    required
                    disabled={!!selectedContent}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t('admin.content.section')} *</Form.Label>
                  <Form.Select
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    required
                  >
                    {sections.map(section => (
                      <option key={section} value={section}>
                        {getSectionLabel(section)}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t('admin.content.type')} *</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="text">{t('admin.content.types.text')}</option>
                    <option value="title">{t('admin.content.types.title')}</option>
                    <option value="subtitle">{t('admin.content.types.subtitle')}</option>
                    <option value="description">{t('admin.content.types.description')}</option>
                    <option value="placeholder">{t('admin.content.types.placeholder')}</option>
                    <option value="button">{t('admin.content.types.button')}</option>
                    <option value="label">{t('admin.content.types.label')}</option>
                    <option value="value">{t('admin.content.types.value')}</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t('admin.content.order')}</Form.Label>
                  <Form.Control
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>{t('admin.content.component')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="metadata.component"
                    value={formData.metadata.component}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>{t('admin.content.field')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="metadata.field"
                    value={formData.metadata.field}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>{t('admin.content.category')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="metadata.category"
                    value={formData.metadata.category}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isVisible"
                label={t('admin.content.visible')}
                checked={formData.isVisible}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Переводы */}
            <Tabs
              activeKey={editingLang}
              onSelect={(k) => setEditingLang(k)}
              className="mb-3"
            >
              <Tab eventKey="ru" title="Русский">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Заголовок</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.ru.title"
                        value={formData.translations.ru.title}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Подзаголовок</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.ru.subtitle"
                        value={formData.translations.ru.subtitle}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Содержание</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="translations.ru.content"
                    value={formData.translations.ru.content}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Описание</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="translations.ru.description"
                        value={formData.translations.ru.description}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Плейсхолдер</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.ru.placeholder"
                        value={formData.translations.ru.placeholder}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Кнопка</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.ru.button"
                        value={formData.translations.ru.button}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Метка</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.ru.label"
                        value={formData.translations.ru.label}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Tab>

              <Tab eventKey="en" title="English">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.en.title"
                        value={formData.translations.en.title}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Subtitle</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.en.subtitle"
                        value={formData.translations.en.subtitle}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="translations.en.content"
                    value={formData.translations.en.content}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="translations.en.description"
                        value={formData.translations.en.description}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Placeholder</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.en.placeholder"
                        value={formData.translations.en.placeholder}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Button</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.en.button"
                        value={formData.translations.en.button}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Label</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.en.label"
                        value={formData.translations.en.label}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Tab>

              <Tab eventKey="kk" title="Қазақша">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Тақырып</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.kk.title"
                        value={formData.translations.kk?.title || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Ішкі тақырып</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.kk.subtitle"
                        value={formData.translations.kk?.subtitle || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Мазмұн</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="translations.kk.content"
                    value={formData.translations.kk?.content || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Сипаттама</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="translations.kk.description"
                        value={formData.translations.kk?.description || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Орынбасар</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.kk.placeholder"
                        value={formData.translations.kk?.placeholder || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Түйме</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.kk.button"
                        value={formData.translations.kk?.button || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Белгі</Form.Label>
                      <Form.Control
                        type="text"
                        name="translations.kk.label"
                        value={formData.translations.kk?.label || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              {t('admin.content.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {selectedContent ? t('admin.content.update') : t('admin.content.create')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ContentManagement;
