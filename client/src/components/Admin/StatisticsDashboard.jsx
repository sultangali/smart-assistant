import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Badge, Table } from 'react-bootstrap';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslations } from '../../hooks/useTranslations';
import { statsAPI } from '../../utils/api';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const StatisticsDashboard = () => {
  const { currentTheme } = useTheme();
  const { t } = useTranslations();
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await statsAPI.getStatistics();
      setStatistics(response.data.data);
    } catch (err) {
      console.error('Ошибка при загрузке статистики:', err);
      setError('Не удалось загрузить статистику');
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (type) => {
    return t(`admin.dashboard.feedback_stats.types_labels.${type}`, type);
  };

  const getStatusLabel = (status) => {
    return t(`admin.dashboard.feedback_stats.statuses_labels.${status}`, status);
  };

  const getStatusVariant = (status) => {
    const variants = {
      new: 'primary',
      in_progress: 'warning',
      resolved: 'success',
      closed: 'secondary'
    };
    return variants[status] || 'secondary';
  };

  // Цвета для графиков в зависимости от темы
  const getChartColors = () => {
    const colorSchemes = {
      modern: {
        primary: '#667eea',
        secondary: '#764ba2',
        success: '#28a745',
        warning: '#ffc107',
        danger: '#dc3545',
        info: '#17a2b8',
        light: '#f8f9fa',
        dark: '#343a40'
      },
      strict: {
        primary: '#2c3e50',
        secondary: '#34495e',
        success: '#27ae60',
        warning: '#f39c12',
        danger: '#e74c3c',
        info: '#3498db',
        light: '#ecf0f1',
        dark: '#2c3e50'
      },
      ergonomic: {
        primary: '#74b9ff',
        secondary: '#0984e3',
        success: '#00b894',
        warning: '#fdcb6e',
        danger: '#e17055',
        info: '#81ecec',
        light: '#ddd6fe',
        dark: '#2d3436'
      }
    };
    return colorSchemes[currentTheme] || colorSchemes.modern;
  };

  const colors = getChartColors();

  // Подготовка данных для круговой диаграммы типов обратной связи
  const preparePieData = (data, labelKey) => {
    return data.map((item, index) => ({
      name: labelKey === 'type' ? getTypeLabel(item.type || item._id) : getStatusLabel(item.status || item._id),
      value: item.count,
      color: labelKey === 'type' 
        ? [colors.danger, colors.success, colors.info, colors.warning][index % 4]
        : [colors.primary, colors.warning, colors.success, colors.secondary][index % 4]
    }));
  };

  // Подготовка данных для линейного графика активности по дням
  const prepareLineData = (data) => {
    const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    return data.map((item, index) => ({
      day: dayNames[index] || `День ${index + 1}`,
      count: item.count,
      fullDay: item.day
    }));
  };

  // Подготовка данных для столбчатой диаграммы по часам
  const prepareBarData = (data) => {
    return data.map(item => ({
      hour: `${item.hour}:00`,
      count: item.count
    }));
  };

  // Подготовка данных для области инструментов по категориям
  const prepareAreaData = (data) => {
    return data.map(item => ({
      category: item.category,
      count: item.count
    }));
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Загрузка статистики...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!statistics) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Данные статистики недоступны</Alert>
      </Container>
    );
  }

  const pieData = preparePieData(statistics.charts.feedbacksByType, 'type');
  const statusPieData = preparePieData(statistics.charts.feedbacksByStatus, 'status');
  const lineData = prepareLineData(statistics.charts.feedbacksByDay);
  const barData = prepareBarData(statistics.charts.feedbacksByHour);
  const areaData = prepareAreaData(statistics.charts.toolsByCategory);

  return (
    <Container className="py-4">
      {/* Общая статистика */}
      <Row className="mb-4">
        <Col>
          <Card className={`stats-overview-card stats-overview-card-${currentTheme}`}>
            <Card.Body>
              <h5 className="mb-4">📊 {t('admin.dashboard.quick_stats')}</h5>
              <Row>
                <Col md={2} className="text-center">
                  <div className={`stat-number stat-number-primary-${currentTheme}`}>
                    {statistics.overview.totalTools}
                  </div>
                  <small className="text-muted">{t('admin.dashboard.total_tools')}</small>
                </Col>
                <Col md={2} className="text-center">
                  <div className={`stat-number stat-number-success-${currentTheme}`}>
                    {statistics.overview.newFeedbacks}
                  </div>
                  <small className="text-muted">{t('admin.dashboard.new_messages')}</small>
                </Col>
                <Col md={2} className="text-center">
                  <div className={`stat-number stat-number-info-${currentTheme}`}>
                    {statistics.overview.totalCategories}
                  </div>
                  <small className="text-muted">{t('admin.dashboard.categories')}</small>
                </Col>
                <Col md={2} className="text-center">
                  <div className={`stat-number stat-number-warning-${currentTheme}`}>
                    {statistics.overview.totalFeedbacks}
                  </div>
                  <small className="text-muted">{t('admin.dashboard.total_messages')}</small>
                </Col>
                <Col md={2} className="text-center">
                  <div className={`stat-number stat-number-info-${currentTheme}`}>
                    {statistics.overview.avgFeedbacksPerDay}
                  </div>
                  <small className="text-muted">{t('admin.dashboard.feedback_stats.avg_per_day')}</small>
                </Col>
                <Col md={2} className="text-center">
                  <div className={`stat-number stat-number-primary-${currentTheme}`}>
                    {statistics.overview.avgResponseTime}ч
                  </div>
                  <small className="text-muted">{t('admin.dashboard.feedback_stats.response_time')}</small>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Графики обратной связи */}
      <Row className="g-4 mb-4">
        {/* Круговая диаграмма типов обратной связи */}
        <Col lg={6}>
          <Card className={`chart-card chart-card-${currentTheme}`}>
            <Card.Header>
              <h6 className="mb-0">📝 {t('admin.dashboard.feedback_stats.types')}</h6>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Круговая диаграмма статусов обратной связи */}
        <Col lg={6}>
          <Card className={`chart-card chart-card-${currentTheme}`}>
            <Card.Header>
              <h6 className="mb-0">📋 {t('admin.dashboard.feedback_stats.statuses')}</h6>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Временная аналитика */}
      <Row className="g-4 mb-4">
        {/* Линейный график активности по дням недели */}
        <Col lg={6}>
          <Card className={`chart-card chart-card-${currentTheme}`}>
            <Card.Header>
              <h6 className="mb-0">📅 {t('admin.dashboard.feedback_stats.by_day')}</h6>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ced4da" strokeWidth={1.5} />
                  <XAxis dataKey="day" stroke="#333" />
                  <YAxis stroke="#333" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      color: '#333'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke={colors.primary} 
                    strokeWidth={3}
                    dot={{ fill: colors.primary, strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: colors.primary, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Столбчатая диаграмма активности по часам */}
        <Col lg={6}>
          <Card className={`chart-card chart-card-${currentTheme}`}>
            <Card.Header>
              <h6 className="mb-0">🕐 {t('admin.dashboard.feedback_stats.by_hour')}</h6>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ced4da" strokeWidth={1.5} />
                  <XAxis dataKey="hour" stroke="#333" />
                  <YAxis stroke="#333" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      color: '#333'
                    }}
                  />
                  <Bar dataKey="count" fill={colors.secondary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Инструменты по категориям - область */}
      <Row className="g-4 mb-4">
        <Col lg={12}>
          <Card className={`chart-card chart-card-${currentTheme}`}>
            <Card.Header>
              <h6 className="mb-0">📈 {t('admin.dashboard.tools_by_category')}</h6>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={areaData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ced4da" strokeWidth={1.5} />
                  <XAxis dataKey="category" stroke="#333" />
                  <YAxis stroke="#333" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      color: '#333'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke={colors.success} 
                    fill={colors.success}
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Последние обращения */}
      <Row className="g-4">
        <Col lg={12}>
          <Card className={`chart-card chart-card-${currentTheme}`}>
            <Card.Header>
              <h6 className="mb-0">📬 {t('admin.dashboard.feedback_stats.recent')}</h6>
            </Card.Header>
            <Card.Body>
              {statistics.recent && statistics.recent.length > 0 ? (
                <Table responsive className={`table-${currentTheme}`}>
                  <thead>
                    <tr>
                      <th>{t('common.name')}</th>
                      <th>Email</th>
                      <th>{t('admin.dashboard.feedback_stats.types')}</th>
                      <th>{t('admin.dashboard.feedback_stats.statuses')}</th>
                      <th>{t('common.date')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statistics.recent.map((feedback, index) => (
                      <tr key={index}>
                        <td>{feedback.name}</td>
                        <td>{feedback.email}</td>
                        <td>
                          <Badge 
                            bg="secondary" 
                            style={{ 
                              backgroundColor: pieData.find(p => p.name === getTypeLabel(feedback.type))?.color || colors.secondary
                            }}
                          >
                            {getTypeLabel(feedback.type)}
                          </Badge>
                        </td>
                        <td>
                          <Badge variant={getStatusVariant(feedback.status)}>
                            {getStatusLabel(feedback.status)}
                          </Badge>
                        </td>
                        <td>
                          {new Date(feedback.createdAt).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center text-muted py-4">
                  <p>Нет последних обращений</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StatisticsDashboard;