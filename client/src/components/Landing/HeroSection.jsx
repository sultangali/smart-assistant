import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslations } from '../../hooks/useTranslations';
import { useTheme } from '../../contexts/ThemeContext';
import brainImage from '../../images/1.png';
// Иллюстрация искусственного интеллекта (AI Brain Illustration)
const AIBrainIllustration = () => (
  <svg 
    viewBox="0 0 500 400" 
    className="ai-brain-svg"
    xmlns="http://www.w3.org/2000/svg"
    style={{ background: 'transparent' }}
  >
    <defs>
      {/* Продвинутые градиенты */}
      <radialGradient id="brainMainGradient" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#4FC3F7" />
        <stop offset="30%" stopColor="#29B6F6" />
        <stop offset="60%" stopColor="#0288D1" />
        <stop offset="100%" stopColor="#01579B" />
      </radialGradient>
      
      <radialGradient id="brainSecondaryGradient" cx="60%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#FFB74D" />
        <stop offset="50%" stopColor="#FF9800" />
        <stop offset="100%" stopColor="#E65100" />
      </radialGradient>
      
      <linearGradient id="neuronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFC107" />
        <stop offset="100%" stopColor="#FF6F00" />
      </linearGradient>
      
      <radialGradient id="circuitGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#64FFDA" />
        <stop offset="100%" stopColor="#00BCD4" />
      </radialGradient>
      
      {/* Эффекты */}
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <filter id="shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.2)"/>
      </filter>
    </defs>
    
    {/* Основная структура мозга */}
    <g className="brain-main" filter="url(#shadow)">
      {/* Левая полушарие */}
      <path
        d="M80 200 Q60 150 80 120 Q100 90 140 80 Q180 75 220 85 Q240 90 250 110 Q250 130 240 150 Q230 180 220 200 Q200 220 180 230 Q140 240 100 230 Q80 220 80 200 Z"
        fill="url(#brainMainGradient)"
        className="brain-left"
        opacity="0.9"
      />
      
      {/* Правая полушарие */}
      <path
        d="M250 110 Q270 90 300 80 Q340 75 380 85 Q420 90 440 120 Q450 150 440 180 Q430 200 420 220 Q400 240 360 230 Q320 240 280 230 Q260 220 250 200 Q240 180 250 150 Q250 130 250 110 Z"
        fill="url(#brainSecondaryGradient)"
        className="brain-right"
        opacity="0.9"
      />
      
      {/* Ствол мозга */}
      <ellipse cx="250" cy="280" rx="15" ry="40" fill="#37474F" className="brain-stem" />
    </g>
    
    {/* Схема цепи */}
    <g className="circuit-pattern" opacity="0.6">
      <path d="M120 140 L180 140 L180 160 L220 160" stroke="url(#circuitGradient)" strokeWidth="3" fill="none" className="circuit-line" />
      <path d="M280 160 L320 160 L320 140 L380 140" stroke="url(#circuitGradient)" strokeWidth="3" fill="none" className="circuit-line" />
      <path d="M150 180 L150 200 L200 200 L200 220" stroke="url(#circuitGradient)" strokeWidth="3" fill="none" className="circuit-line" />
      <path d="M300 200 L300 220 L350 220 L350 180" stroke="url(#circuitGradient)" strokeWidth="3" fill="none" className="circuit-line" />
      
      {/* Узлы цепи */}
      <circle cx="180" cy="140" r="4" fill="url(#circuitGradient)" className="circuit-node" />
      <circle cx="220" cy="160" r="4" fill="url(#circuitGradient)" className="circuit-node" />
      <circle cx="280" cy="160" r="4" fill="url(#circuitGradient)" className="circuit-node" />
      <circle cx="320" cy="140" r="4" fill="url(#circuitGradient)" className="circuit-node" />
    </g>
    
    {/* Нейронная сеть */}
    <g className="neural-network">
      <circle cx="160" cy="130" r="8" fill="url(#neuronGradient)" className="neuron main-neuron" filter="url(#glow)" />
      <circle cx="200" cy="110" r="10" fill="url(#neuronGradient)" className="neuron main-neuron" filter="url(#glow)" />
      <circle cx="250" cy="120" r="9" fill="url(#neuronGradient)" className="neuron main-neuron" filter="url(#glow)" />
      <circle cx="300" cy="110" r="10" fill="url(#neuronGradient)" className="neuron main-neuron" filter="url(#glow)" />
      <circle cx="340" cy="130" r="8" fill="url(#neuronGradient)" className="neuron main-neuron" filter="url(#glow)" />
      
      {/* Нейронные соединения */}
      <line x1="160" y1="130" x2="200" y2="110" stroke="#FFE082" strokeWidth="2" opacity="0.7" className="neural-connection" />
      <line x1="200" y1="110" x2="250" y2="120" stroke="#FFE082" strokeWidth="2" opacity="0.7" className="neural-connection" />
      <line x1="250" y1="120" x2="300" y2="110" stroke="#FFE082" strokeWidth="2" opacity="0.7" className="neural-connection" />
      <line x1="300" y1="110" x2="340" y2="130" stroke="#FFE082" strokeWidth="2" opacity="0.7" className="neural-connection" />
    </g>
    
    {/* Технологические элементы */}
    <g className="tech-elements" opacity="0.8">
      <text x="120" y="100" fill="#64FFDA" fontSize="12" className="binary-text">01101</text>
      <text x="350" y="105" fill="#64FFDA" fontSize="12" className="binary-text">11010</text>
      <text x="100" y="160" fill="#FF9800" fontSize="18" className="tech-symbol">⚡</text>
      <text x="380" y="165" fill="#FF9800" fontSize="18" className="tech-symbol">🔬</text>
    </g>
  </svg>
);

const HeroSection = () => {
  const { t } = useTranslations();
  const { currentTheme } = useTheme();

  return (
    <section id="hero" className={`hero-section hero-${currentTheme}`}>
      {/* Декоративные элементы */}
      <div className={`hero-decoration hero-decoration-${currentTheme}`}>
        <div className="decoration-shape decoration-shape-1"></div>
        <div className="decoration-shape decoration-shape-2"></div>
        <div className="decoration-shape decoration-shape-3"></div>
      </div>
      
      <Container className="hero-content">
        <Row className="align-items-center min-vh-100">
          <Col lg={6} xs={12} className="hero-text-section">
            <div className="slide-in-left">
              <h4 className={`hero-title hero-title-${currentTheme}`}>
                {t('landing.hero.title')}
              </h4>
              
              <p className={`hero-subtitle hero-subtitle-${currentTheme}`}>
                {t('landing.hero.subtitle')}
              </p>
              
              <div className="hero-buttons">
                <button 
                  className={`btn btn-primary-${currentTheme} hero-btn-animated`}
                  onClick={() => {
                    document.getElementById('filter')?.scrollIntoView({ 
                      
                    });
                  }}
                >
                  <span className="btn-text">{t('landing.hero.find_tools_button')}</span>
                  <span className="btn-icon">🚀</span>
                </button>
                
                <button 
                  className={`btn btn-secondary-${currentTheme} hero-btn-animated`}
                  onClick={() => {
                    document.getElementById('about')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  <span className="btn-text">{t('landing.hero.learn_more_button')}</span>
                  <span className="btn-icon">📖</span>
                </button>
              </div>
            </div>
          </Col>
          
          <Col lg={6} className="hero-visual-section d-none d-lg-block">
            <div className="slide-in-right">
              <div className={`hero-visual-container hero-visual-${currentTheme}`}>
                <img src={brainImage} alt="" style={{width: '100%', height: '100%'}} />
                <div className={`visual-overlay visual-overlay-${currentTheme}`}></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
