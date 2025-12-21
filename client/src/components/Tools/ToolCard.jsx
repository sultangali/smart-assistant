import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ToolCard = ({ tool }) => {
  const { t, i18n } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  // Получить описание на текущем языке
  const getLocalizedDescription = () => {
    const currentLang = i18n.language;
    if (tool.descriptions && tool.descriptions[currentLang]) {
      return tool.descriptions[currentLang];
    }
    // Возвращаем общее описание, если нет перевода
    return tool.description;
  };

  // Получить назначение на текущем языке
  const getLocalizedPurpose = () => {
    const currentLang = i18n.language;
    if (tool.purposes && tool.purposes[currentLang]) {
      return tool.purposes[currentLang];
    }
    // Fallback на старое поле purpose
    return tool.purpose || '';
  };

  // Получить функции на текущем языке
  const getLocalizedFunctions = () => {
    const currentLang = i18n.language;
    if (tool.functionsMultilang && tool.functionsMultilang[currentLang] && tool.functionsMultilang[currentLang].length > 0) {
      return tool.functionsMultilang[currentLang];
    }
    // Fallback на старое поле functions
    return tool.functions || [];
  };

  const handleVisitSite = () => {
    window.open(tool.link, '_blank', 'noopener,noreferrer');
  };

  // Современная палитра цветов для функций
  const getFunctionColors = () => {
    return [
      '#E63946', // насыщеннее и темнее красный
      '#26A69A', // насыщеннее и темнее бирюзовый
      '#2980B9', // насыщеннее и темнее голубой
      '#43A047', // насыщеннее и темнее зеленый
      '#FFD600', // насыщеннее и темнее желтый
      '#9B59B6', // насыщеннее и темнее фиолетовый
      '#009688', // насыщеннее и темнее мятный
      '#F9A602', // насыщеннее и темнее золотой
      '#7D3C98', // насыщеннее и темнее сиреневый
      '#2471A3', // насыщеннее и темнее синий
      '#F39C12', // насыщеннее и темнее оранжевый
      '#229954', // насыщеннее и темнее травяной
      '#FF7300', // насыщеннее и темнее апельсиновый
      '#512DA8', // насыщеннее и темнее индиго
      '#5F27CD'  // насыщеннее и темнее фиолетово-синий
    ];
  };

  const getFunctionColor = (index) => {
    const colors = getFunctionColors();
    const hash = (tool.title + index).split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  // Функция для затемнения цвета
  const darkenColor = (color, amount) => {
    if (!color) return '#000000';
    const hex = color.replace('#', '');
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);

    // Усиливаем затемнение: amount > 0.04 (4%) будет заметно сильнее
    // Вместо вычитания от 255, затемняем пропорционально amount
    r = Math.round(r * (1 - amount));
    g = Math.round(g * (1 - amount));
    b = Math.round(b * (1 - amount));

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Определяем контрастный цвет текста
  const getTextColor = (backgroundColor) => {
    if (!backgroundColor) return '#1F2937';
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#1F2937' : '#FFFFFF';
  };

  const textColor = getTextColor(tool.color);
  const isLightBackground = textColor === '#1F2937';
  const localizedPurpose = getLocalizedPurpose();
  const localizedFunctions = getLocalizedFunctions();

  return (
    <Card 
      className="tool-card h-100"
      style={{ 
        
        border: 'none',
        borderRadius: '16px',
        boxShadow: isHovered 
          ? '0 12px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)' 
          : '0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        height: '100%',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Градиентный фон */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: tool.color 
            ? `linear-gradient(135deg, ${tool.color} 0%, ${tool.color}CC 100%)`
            : 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
          zIndex: 0
        }}
      />

      {/* Логотип на фоне */}
      {tool.logo && (
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            right: '0%',
            transform: 'translateY(-60%)',
            transform: 'translateY(-60%) rotate(10deg)',
            minWidth: '970px',
            minHeight: '970px',
            // width: '400px',
            // height: '400px',
            backgroundImage: `url(${tool.logo})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: 0.11,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      )}

      <Card.Body 
        className="p-4 d-flex flex-column h-100"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Заголовок */}
        <h3 
          className="mb-3 fw-bold"
          style={{ 
            color: textColor,
            fontSize: '1.4rem',
            lineHeight: '1.3',
            textShadow: isLightBackground ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}
        >
          {tool.title}
        </h3>
        
        {/* Категории */}
        <div className="mb-3">
          <div className="d-flex flex-wrap gap-2">
            <Badge 
              className="px-3 py-2"
              bg="1"
              style={{ 
                backgroundColor:  '#F59E0B' , //: 'rgba(255, 255, 255, 0.2)' ,
                color: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: '600',
                borderRadius: '12px',
                border: isLightBackground ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: isLightBackground ? 'none' : 'blur(10px)',
                boxShadow: isLightBackground 
                  ? '0 2px 4px rgba(59, 130, 246, 0.3)' 
                  : '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {t(`categories.${tool.category}`)}
            </Badge>
            
            {tool.subcategory && tool.subcategory !== 'Все подкатегории' && (
              <Badge 
                className="px-3 py-2"
                bg="2"
                style={{ 
                  backgroundColor:  `rgba(40, 42, 133, 0.76)` ,
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  borderRadius: '12px',
                  border: isLightBackground ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: isLightBackground ? 'none' : 'blur(10px)',
                  boxShadow: isLightBackground 
                    ? '0 2px 4px rgba(245, 158, 11, 0.3)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                {t(`subcategories.${tool.subcategory}`)}
              </Badge>
            )}
          </div>
        </div>
        
        {/* Описание */}
        <p 
          className="mb-3"
          style={{ 
            color: isLightBackground ? `rgb(105, 105, 105)` : 'rgba(255, 255, 255, 0.9)',
            fontSize: '1rem',
            fontWeight: '600',
            marginRight: '20px',
            lineHeight: '1.6',
            textShadow: isLightBackground ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.2)'
          }}
        >
          {getLocalizedDescription()}
        </p>
          <hr className="my-2" style={{ width: '70%', borderColor: isLightBackground ? '#374151' : 'rgba(255, 255, 255, 0.8)' }} />
        {/* Назначение */}
        {localizedPurpose && (
          <div className="mb-3">
            <h6 
              className="fw-bold mb-2"
              style={{ 
                color: isLightBackground ? '#374151' : 'rgba(255, 255, 255, 0.8)', 
                fontSize: '1.1rem',
                fontWeight: '900',
                textShadow: isLightBackground ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.1)'
              }}
            >
              {t('tools.purpose')}:
            </h6>
            <p 
              className="mb-0"
              style={{ 
                color: isLightBackground ? `rgb(105, 105, 105)` : 'rgba(255, 255, 255, 0.8)',
                fontSize: '1rem',
                fontWeight: '500',
                lineHeight: '1.5',
                textShadow: isLightBackground ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.2)'
              }}
            >
              {localizedPurpose}
            </p>
          </div>
        )}
        
        {/* Функции */}
        {localizedFunctions && localizedFunctions.length > 0 && (
          <div className="mb-3">
            <h6 
              className="fw-bold mb-2"
              style={{ 
                color: isLightBackground ? '#374151' : 'rgba(255, 255, 255, 0.8)', 
                fontSize: '1.1rem',
                fontWeight: '900',
                textShadow: isLightBackground ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.2)'
              }}
            >
              {t('tools.functions')}:
            </h6>
            <div className="d-flex flex-wrap gap-2">
              {localizedFunctions.map((func, index) => {
                const functionColor = getFunctionColor(index);
                return (
                  <Badge 
                  bg="none"
                    key={index}
                    className="px-3 py-2"
                    style={{ 
                      backgroundColor: functionColor,
                      color: '#FFFFFF',
                      textShadow:  '0 1px 2px rgba(0, 0, 0, 0.3)',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      borderRadius: '16px',
                      border: 'none',
                      boxShadow: `0 2px 4px ${functionColor}40`,
                      transition: 'all 0.5s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = `0 4px 8px ${functionColor}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = `0 2px 4px ${functionColor}40`;
                    }}
                  >
                    {func}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Кнопка перехода */}
        <div className="mt-auto d-flex justify-content-end">
          <Button
            className="px-4 py-2"
            onClick={handleVisitSite}
            variant="outline"
            style={{
              background: tool.color,
              border: isLightBackground 
                ? '2px solid #1F2937' 
                : '2px solid rgba(255, 255, 255, 0.98)',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: isLightBackground 
                ? '#1F2937' 
                : 'rgba(255, 255, 255, 0.98)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              minWidth: '120px',
              boxShadow: `0 2px 4px ${tool.color || '#3B82F6'}20`
            }}
            onMouseEnter={(e) => {
              if (isLightBackground) {
                e.target.style.background = '#1F2937'; // тёмный фон при светлом фоне карточки
                e.target.style.color = '#FFFFFF';
                e.target.style.border = '2px solid #1F2937';
                e.target.style.boxShadow = `0 4px 8px #1F293740`;
              } else {
                e.target.style.background = tool.color || '#3B82F6';
                e.target.style.color = '#FFFFFF';
                e.target.style.border = '2px solid rgba(255, 255, 255, 0.98)';
                e.target.style.boxShadow = `0 4px 8px ${tool.color || '#3B82F6'}40`;
              }
              // Убираем прозрачность у текста при наведении
              const span = e.target.querySelector('span');
              if (span) {
                span.style.background = 'transparent';
                span.style.color = 'inherit';
              }
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isLightBackground ? tool.color : 'transparent';
              e.target.style.color = isLightBackground 
                ? '#1F2937' 
                : 'rgba(255, 255, 255, 0.98)';
              e.target.style.transform = 'translateY(0)';
             
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>
              {t('tools.visit_site')}
            </span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ToolCard;
