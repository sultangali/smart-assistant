import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Определение тем
export const themes = {
  modern: {
    name: 'Модерн',
    description: 'Современный high-tech стиль с элегантными градиентами',
    // Современная профессиональная палитра на основе данных цветов
    primary: '#03045E',       // Глубокий индиго - основной
    secondary: '#312A57',     // Темно-фиолетовый - дополнительный  
    accent: '#FB8500',        // Яркий оранжевый - акцент
    accentSoft: '#FDC280',    // Мягкий персиковый - вторичный акцент
    neutral: '#8182AF',       // Сиреневый - нейтральный
    light: '#E0E0EB',         // Светло-сиреневый - фон
    
    // Профессиональные градиенты с правильной цветовой гармонией
    gradient: 'linear-gradient(135deg, #03045E 0%, #312A57 35%, #8182AF 100%)',
    cardGradient: 'linear-gradient(145deg, rgba(224, 224, 235, 0.95) 0%, rgba(224, 224, 235, 0.8) 100%)',
    buttonGradient: 'linear-gradient(135deg, #FB8500 0%, #FDC280 100%)',
    accentGradient: 'linear-gradient(45deg, #FB8500 0%, #FDC280 50%, #FB8500 100%)',
    
    // Элегантные тени
    shadowPrimary: '0 10px 30px rgba(3, 4, 94, 0.15)',
    shadowAccent: '0 8px 25px rgba(251, 133, 0, 0.25)',
    shadowSoft: '0 4px 20px rgba(129, 130, 175, 0.1)',
    
    // Современная геометрия
    borderRadius: '16px',
    borderRadiusSoft: '24px',
    borderRadiusSharp: '8px',
    
    // Специальные эффекты
    glassEffect: 'backdrop-filter: blur(16px); background: rgba(224, 224, 235, 0.8)',
    hoverScale: 'transform: translateY(-4px) scale(1.02)',
    animation: 'modern',
  },
  strict: {
    name: 'Строгий',
    description: 'Минималистичный корпоративный стиль без лишних элементов',
    primary: 'var(--primary-dark)',
    secondary: 'var(--secondary-dark)',
    medium: 'var(--primary-medium)',
    light: 'var(--primary-light)',
    accent: 'var(--accent-bright)',
    accentSecondary: 'var(--accent-orange)',
    // Строгие однотонные фоны
    gradient: 'var(--primary-dark)',
    cardGradient: '#FFFFFF',
    buttonGradient: 'var(--primary-dark)',
    shadowStyle: '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    animation: 'strict',
    // Уникальные стили для строгой темы
    borderStyle: '1px solid var(--primary-medium)',
    corporateBorder: '3px solid var(--accent-bright)',
    gridPattern: 'repeating-linear-gradient(90deg, transparent, transparent 49px, var(--primary-light) 50px)',
  },
  ergonomic: {
    name: 'Эргономичный',
    description: 'Природный стиль с органичными формами и плавностью',
    primary: 'var(--primary-dark)',
    secondary: 'var(--secondary-dark)',
    medium: 'var(--primary-medium)',
    light: 'var(--primary-light)',
    accent: 'var(--accent-bright)',
    accentSecondary: 'var(--accent-orange)',
    // Органичные радиальные градиенты
    gradient: 'radial-gradient(ellipse 150% 100% at 50% 0%, var(--accent-orange) 0%, var(--primary-medium) 40%, var(--secondary-dark) 100%)',
    cardGradient: 'radial-gradient(circle at top left, rgba(253, 194, 128, 0.15) 0%, rgba(224, 224, 235, 0.9) 60%)',
    buttonGradient: 'radial-gradient(circle, var(--accent-orange) 0%, var(--accent-bright) 70%)',
    shadowStyle: '0 8px 32px rgba(253, 194, 128, 0.3), 0 4px 16px rgba(129, 130, 175, 0.2)',
    borderRadius: '35px',
    animation: 'ergonomic',
    // Уникальные стили для эргономичной темы
    organicShape: 'border-radius: 35% 65% 70% 30% / 40% 50% 60% 50%',
    waveBorder: '0 0 20px rgba(253, 194, 128, 0.4)',
    naturalCurve: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('selectedTheme') || 'modern';
  });

  useEffect(() => {
    localStorage.setItem('selectedTheme', currentTheme);
    
    // Применяем CSS-переменные для текущей темы
    const theme = themes[currentTheme];
    const root = document.documentElement;
    
    // Основные переменные
    root.style.setProperty('--theme-gradient', theme.gradient || theme.primary);
    root.style.setProperty('--theme-card-gradient', theme.cardGradient || theme.light);
    root.style.setProperty('--theme-button-gradient', theme.buttonGradient || theme.accent);
    root.style.setProperty('--theme-border-radius', theme.borderRadius || '8px');
    root.style.setProperty('--theme-animation', theme.animation || 'default');
    
    // Цветовые переменные для модерн темы
    if (currentTheme === 'modern') {
      root.style.setProperty('--theme-primary', theme.primary);
      root.style.setProperty('--theme-secondary', theme.secondary);
      root.style.setProperty('--theme-accent', theme.accent);
      root.style.setProperty('--theme-accent-soft', theme.accentSoft);
      root.style.setProperty('--theme-neutral', theme.neutral);
      root.style.setProperty('--theme-light', theme.light);
      root.style.setProperty('--theme-accent-gradient', theme.accentGradient);
      root.style.setProperty('--theme-shadow-primary', theme.shadowPrimary);
      root.style.setProperty('--theme-shadow-accent', theme.shadowAccent);
      root.style.setProperty('--theme-shadow-soft', theme.shadowSoft);
      root.style.setProperty('--theme-border-radius-soft', theme.borderRadiusSoft);
      root.style.setProperty('--theme-border-radius-sharp', theme.borderRadiusSharp);
      root.style.setProperty('--theme-glass-effect', theme.glassEffect);
      root.style.setProperty('--theme-hover-scale', theme.hoverScale);
    }
    
    // Дополнительные уникальные свойства для остальных тем
    if (theme.shadowStyle) root.style.setProperty('--theme-shadow', theme.shadowStyle);
    if (theme.glowEffect) root.style.setProperty('--theme-glow', theme.glowEffect);
    if (theme.neonBorder) root.style.setProperty('--theme-neon-border', theme.neonBorder);
    if (theme.textGlow) root.style.setProperty('--theme-text-glow', theme.textGlow);
    if (theme.borderStyle) root.style.setProperty('--theme-border-style', theme.borderStyle);
    if (theme.corporateBorder) root.style.setProperty('--theme-corporate-border', theme.corporateBorder);
    if (theme.gridPattern) root.style.setProperty('--theme-grid-pattern', theme.gridPattern);
    if (theme.organicShape) root.style.setProperty('--theme-organic-shape', theme.organicShape);
    if (theme.waveBorder) root.style.setProperty('--theme-wave-border', theme.waveBorder);
    if (theme.naturalCurve) root.style.setProperty('--theme-natural-curve', theme.naturalCurve);
    
    // Добавляем класс темы к body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    theme: themes[currentTheme],
    themes,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
