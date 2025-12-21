import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Создание экземпляра axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для добавления токена
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ответов
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
};

// Tools API
export const toolsAPI = {
  getAll: (params) => api.get('/tools', { params }),
  getOne: (id) => api.get(`/tools/${id}`),
  getCategories: () => api.get('/tools/categories'),
  create: (data) => api.post('/tools', data),
  update: (id, data) => api.put(`/tools/${id}`, data),
  delete: (id) => api.delete(`/tools/${id}`),
};

// Feedback API
export const feedbackAPI = {
  create: (data) => api.post('/feedback', data),
  getAll: (params) => api.get('/feedback', { params }),
  updateStatus: (id, data) => api.put(`/feedback/${id}`, data),
  delete: (id) => api.delete(`/feedback/${id}`),
};

// Statistics API
export const statsAPI = {
  getStatistics: () => api.get('/stats'),
};

// Content API
export const contentAPI = {
  getAll: () => api.get('/content'),
  getBySection: (section, lang = 'ru') => api.get(`/content/section/${section}?lang=${lang}`),
  getSections: () => api.get('/content/sections'),
  create: (data) => api.post('/content', data),
  update: (id, data) => api.put(`/content/${id}`, data),
  updateTranslation: (id, lang, data) => api.put(`/content/${id}/translation/${lang}`, data),
  delete: (id) => api.delete(`/content/${id}`),
};

export default api;
