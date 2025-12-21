import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeSelector = () => {
  const { currentTheme, themes, changeTheme } = useTheme();
  const [show, setShow] = useState(false);

  const toggleDropdown = () => setShow(!show);
  const handleSelect = (themeName) => {
    changeTheme(themeName);
    setShow(false);
  };

  const currentThemeData = themes[currentTheme];

  return (
    <div className="position-fixed" style={{ bottom: '20px', right: '20px', zIndex: 1000 }}>
      <Dropdown show={show} onToggle={toggleDropdown}>
        <Dropdown.Toggle
          as={Button}
          className="btn-primary-custom d-flex align-items-center gap-2"
          style={{
            borderRadius: '50px',
            padding: '0.75rem 1.5rem',
            border: 'none',
            background: currentThemeData.buttonGradient,
            boxShadow: currentThemeData.shadowStyle,
          }}
          onClick={toggleDropdown}
        >
          <span>🎨</span>
          <span>{currentThemeData.name}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="border-0"
          style={{
            background: currentThemeData.cardGradient,
            borderRadius: currentThemeData.borderRadius,
            boxShadow: currentThemeData.shadowStyle,
            backdropFilter: 'blur(10px)',
            minWidth: '250px',
          }}
        >
          <div className="p-3">
            <h6 className="dropdown-header text-center fw-bold mb-3">
              Выберите тему
            </h6>
            
            {Object.entries(themes).map(([themeName, theme]) => {
              const isActive = currentTheme === themeName;
              
              return (
                <Dropdown.Item
                  key={themeName}
                  onClick={() => handleSelect(themeName)}
                  className={`d-flex align-items-center gap-3 p-3 mb-2 border-0 ${isActive ? 'active' : ''}`}
                  style={{
                    borderRadius: theme.borderRadius,
                    background: isActive 
                      ? `linear-gradient(45deg, ${theme.accent}22, ${theme.accentSecondary}22)`
                      : 'transparent',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  <div className="d-flex flex-column">
                    <div className="d-flex gap-1 mb-1">
                      <div 
                        className="rounded-circle"
                        style={{
                          width: '12px',
                          height: '12px',
                          background: theme.primary,
                        }}
                      ></div>
                      <div 
                        className="rounded-circle"
                        style={{
                          width: '12px',
                          height: '12px',
                          background: theme.accent,
                        }}
                      ></div>
                      <div 
                        className="rounded-circle"
                        style={{
                          width: '12px',
                          height: '12px',
                          background: theme.accentSecondary,
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2">
                      <strong>{theme.name}</strong>
                      {isActive && (
                        <span style={{ color: theme.accent }}>✓</span>
                      )}
                    </div>
                    <small className="text-muted d-block">
                      {theme.description}
                    </small>
                  </div>
                </Dropdown.Item>
              );
            })}
            
            <hr className="my-3" />
            
            <div className="text-center">
              <small className="text-muted">
                Тема сохраняется автоматически
              </small>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default ThemeSelector;
