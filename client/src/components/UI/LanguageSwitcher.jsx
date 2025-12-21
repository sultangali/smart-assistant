import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { changeLanguageWithLoading } from '../../i18n/config';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const { currentTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'kk', name: 'Қазақша', flag: '🇰🇿' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Закрытие выпадающего меню при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = async (languageCode) => {
    if (languageCode === i18n.language || isLoading) return;
    
    setIsLoading(true);
    setIsOpen(false);
    
    try {
      // Всегда загружаем переводы с сервера при смене языка
      await changeLanguageWithLoading(languageCode);
      console.log(`✅ Язык изменен на: ${languageCode}`);
    } catch (error) {
      console.error('❌ Ошибка при смене языка:', error);
      // Даже при ошибке пробуем сменить язык
      await i18n.changeLanguage(languageCode);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="language-switcher-container" ref={containerRef}>
      <button
        className={`nav-link-enhanced nav-link-${currentTheme} `}
        onClick={() => !isLoading && setIsOpen(!isOpen)}
        aria-label="Переключить язык"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="nav-icon language-loading">⏳</span>
        ) : (
          <span className="nav-icon language-flag">{currentLanguage.flag}</span>
        )}
        <span className="nav-text language-name">{currentLanguage.name}</span>
        <span className={`nav-icon language-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && !isLoading && (
        <div className={`language-dropdown language-dropdown-${currentTheme}`}>
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-option ${
                language.code === i18n.language ? 'active' : ''
              }`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <span className="language-flag">{language.flag}</span>
              <span className="language-name">{language.name}</span>
              {language.code === i18n.language && (
                <span className="language-check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        .language-switcher-container {
          position: relative;
          display: inline-block;
        }

        .language-switcher-nav-btn {
          display: flex !important;
          align-items: center;
          gap: 0.5rem;
          border: none !important;
          background: transparent !important;
          padding: 0.75rem 1.5rem !important;
          border-radius: 15px !important;
          font-weight: 600 !important;
          font-size: 1rem !important;
          text-decoration: none !important;
          color: inherit !important;
          width: auto !important;
          height: auto !important;
        }
        
        .language-switcher-nav-btn:focus {
          outline: none;
          box-shadow: none;
        }

        .language-switcher-nav-btn:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        .language-loading {
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .language-arrow {
          transition: transform 0.3s ease;
          font-size: 0.7rem;
          margin-left: 0.25rem;
        }

        .language-arrow.open {
          transform: rotate(180deg);
        }

        .language-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          min-width: 150px;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .language-dropdown-modern {
          background: white;
          border: 1px solid #e1e8ed;
        }

        .language-dropdown-strict {
          background: #2c3e50;
          border: 1px solid #34495e;
        }

        .language-dropdown-ergonomic {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
        }

        .language-option {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 12px;
          border: none;
          background: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 14px;
          text-align: left;
        }

        .language-option:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .language-dropdown-modern .language-option:hover {
          background: #f8f9fa;
        }

        .language-dropdown-strict .language-option {
          color: #ecf0f1;
        }

        .language-dropdown-strict .language-option:hover {
          background: #34495e;
        }

        .language-dropdown-ergonomic .language-option:hover {
          background: #e9ecef;
        }

        .language-option.active {
          background: rgba(52, 152, 219, 0.1);
          font-weight: 600;
        }

        .language-dropdown-modern .language-option.active {
          background: #e3f2fd;
          color: #1976d2;
        }

        .language-dropdown-strict .language-option.active {
          background: #3498db;
          color: white;
        }

        .language-dropdown-ergonomic .language-option.active {
          background: #d4edda;
          color: #155724;
        }

        .language-check {
          color: #27ae60;
          font-weight: bold;
          margin-left: auto;
        }

        .language-dropdown-strict .language-check {
          color: #2ecc71;
        }

        .language-dropdown-ergonomic .language-check {
          color: #28a745;
        }
      `}</style>
    </div>
  );
};
