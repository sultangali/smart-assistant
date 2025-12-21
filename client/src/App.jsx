import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppNavbar } from './components/Navigation/Navbar';
import ProtectedRoute from './components/Admin/ProtectedRoute';

// Pages
import Home from './pages/Home';
import ToolsResults from './pages/ToolsResults';

// Admin Components
import LoginForm from './components/Admin/LoginForm';
import Dashboard from './components/Admin/Dashboard';
import ToolsManagement from './components/Admin/ToolsManagement';
import FeedbackManagement from './components/Admin/FeedbackManagement';
import ThemeManagement from './components/Admin/ThemeManagement';
import CategoryManagement from './components/Admin/CategoryManagement';
import ContentManagement from './components/Admin/ContentManagement';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css';

// Компонент для управления классами body
const BodyClassManager = () => {
  const location = useLocation();

  useEffect(() => {
    const isAdminPage = location.pathname.startsWith('/admin');
    
    if (isAdminPage) {
      document.body.classList.add('admin-page');
    } else {
      document.body.classList.remove('admin-page');
    }

    // Cleanup при размонтировании
    return () => {
      document.body.classList.remove('admin-page');
    };
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
          <Router>
            <div className="App">
              <BodyClassManager />
              <AppNavbar />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<ToolsResults />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginForm />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/tools" element={
              <ProtectedRoute>
                <ToolsManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/feedback" element={
              <ProtectedRoute>
                <FeedbackManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/themes" element={
              <ProtectedRoute>
                <ThemeManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/categories" element={
              <ProtectedRoute>
                <CategoryManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/content" element={
              <ProtectedRoute>
                <ContentManagement />
              </ProtectedRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={
              <div className="container text-center py-5 mt-5">
                <div style={{ fontSize: '5rem' }}>🔍</div>
                <h2 className="mt-3">Страница не найдена</h2>
                <p className="text-muted">Возможно, вы ошиблись в адресе или страница была перемещена.</p>
                <a href="/" className="btn btn-primary-custom mt-3">
                  Вернуться на главную
                </a>
              </div>
            } />
          </Routes>
            </div>
          </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
