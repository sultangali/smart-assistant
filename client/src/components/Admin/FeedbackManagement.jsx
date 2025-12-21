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
import { feedbackAPI } from '../../utils/api';

const FeedbackManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    status: '',
    adminNotes: '',
  });

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await feedbackAPI.getAll();
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      console.error('Error loading feedbacks:', error);
      setError('Ошибка загрузки обратной связи');
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (feedback) => {
    setSelectedFeedback(feedback);
    setFormData({
      status: feedback.status,
      adminNotes: feedback.adminNotes || '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFeedback(null);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setModalLoading(true);
      setError('');
      
      await feedbackAPI.updateStatus(selectedFeedback._id, formData);
      setSuccess('Статус обратной связи успешно обновлен');
      
      await loadFeedbacks();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating feedback:', error);
      setError(error.response?.data?.message || 'Ошибка обновления статуса');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (feedbackId) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту обратную связь?')) {
      return;
    }
    
    try {
      await feedbackAPI.delete(feedbackId);
      setSuccess('Обратная связь успешно удалена');
      await loadFeedbacks();
    } catch (error) {
      console.error('Error deleting feedback:', error);
      setError('Ошибка удаления обратной связи');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { variant: 'primary', text: 'Новое' },
      in_progress: { variant: 'warning', text: 'В обработке' },
      resolved: { variant: 'success', text: 'Решено' },
      closed: { variant: 'secondary', text: 'Закрыто' },
    };
    
    const config = statusConfig[status] || { variant: 'light', text: status };
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      complaint: { variant: 'danger', text: 'Жалоба' },
      suggestion: { variant: 'info', text: 'Предложение' },
      question: { variant: 'warning', text: 'Вопрос' },
      other: { variant: 'secondary', text: 'Другое' },
    };
    
    const config = typeConfig[type] || { variant: 'light', text: type };
    return <Badge bg={config.variant}>{config.text}</Badge>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  if (loading) {
    return (
      <Container className="py-5 mt-5">
        <Row className="justify-content-center">
          <Col xs="auto">
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Загрузка обратной связи...</p>
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
          <div className="d-flex align-items-center mb-3">
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
            <div>
              <h1 className="h2 mb-0">{t('admin.feedback.title')}</h1>
              <p className="text-muted mb-0">Управление обратной связью от пользователей</p>
            </div>
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
          {feedbacks.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-3" style={{ fontSize: '3rem' }}>💬</div>
              <h5>Обратная связь не найдена</h5>
              <p className="text-muted">Пока нет сообщений от пользователей</p>
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Имя</th>
                  <th>Email</th>
                  <th>Тип</th>
                  <th>Статус</th>
                  <th>Сообщение</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback._id}>
                    <td>
                      <small>{formatDate(feedback.createdAt)}</small>
                    </td>
                    <td>{feedback.name}</td>
                    <td>
                      <small>{feedback.email}</small>
                    </td>
                    <td>{getTypeBadge(feedback.type)}</td>
                    <td>{getStatusBadge(feedback.status)}</td>
                    <td>
                      <div style={{ maxWidth: '200px' }}>
                        {feedback.message.substring(0, 100)}
                        {feedback.message.length > 100 && '...'}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => handleShowModal(feedback)}
                        >
                          Просмотр
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDelete(feedback._id)}
                        >
                          Удалить
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
      
      {/* Modal для просмотра и редактирования */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Обратная связь от {selectedFeedback?.name}</Modal.Title>
        </Modal.Header>
        
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {selectedFeedback && (
              <>
                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Дата:</strong> {formatDate(selectedFeedback.createdAt)}
                  </Col>
                  <Col md={6}>
                    <strong>Email:</strong> {selectedFeedback.email}
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Тип:</strong> {getTypeBadge(selectedFeedback.type)}
                  </Col>
                  <Col md={6}>
                    <strong>Текущий статус:</strong> {getStatusBadge(selectedFeedback.status)}
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label><strong>Сообщение:</strong></Form.Label>
                  <div 
                    className="p-3 bg-light rounded"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {selectedFeedback.message}
                  </div>
                </Form.Group>
                
                <hr />
                
                <Form.Group className="mb-3">
                  <Form.Label>{t('admin.feedback.status')}</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="new">Новое</option>
                    <option value="in_progress">В обработке</option>
                    <option value="resolved">Решено</option>
                    <option value="closed">Закрыто</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>{t('admin.feedback.notes')}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="adminNotes"
                    value={formData.adminNotes}
                    onChange={handleChange}
                    placeholder="Заметки администратора..."
                  />
                </Form.Group>
              </>
            )}
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
              {modalLoading ? 'Сохранение...' : 'Обновить статус'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default FeedbackManagement;
