import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useTranslations } from '../../hooks/useTranslations';
import { useTheme } from '../../contexts/ThemeContext';
import { LanguageSwitcher } from '../UI/LanguageSwitcher';

export const AppNavbar = () => {
  // ВСЕ ХУКИ ДОЛЖНЫ БЫТЬ В НАЧАЛЕ КОМПОНЕНТА!
  const { t } = useTranslations();
  const location = useLocation();
  const { currentTheme } = useTheme();
  const [hasBackground, setHasBackground] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Управляем фоном navbar - появляется при скролле
      if (currentScrollY > 50) {
        setHasBackground(true);
      } else {
        setHasBackground(false);
      }

      // Определяем активную секцию
      const sections = ['hero', 'about', 'filter', 'feedback', 'contact'];
      const navbarHeight = 80;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= navbarHeight + 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Обработка якорных ссылок при загрузке страницы
    const handleHashScroll = () => {
      const hash = window.location.hash.substring(1);
      if (hash && location.pathname === '/') {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 500); // Увеличиваем задержку для загрузки контента
      }
    };

    // Выполняем прокрутку при загрузке
    handleHashScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const scrollToSection = (sectionId) => {
    console.log('scrollToSection вызвана с sectionId:', sectionId);
    console.log('Текущий путь:', location.pathname);
    
    // Если мы не на главной странице, переходим на главную с якорем
    if (location.pathname !== '/') {
      console.log('Не на главной странице, переходим на главную с якорем');
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    console.log('На главной странице, ищем элемент с ID:', sectionId);
    
    // Пробуем найти элемент сразу
    const element = document.getElementById(sectionId);
    console.log('Найденный элемент:', element);
    
    if (element) {
      console.log('Элемент найден, прокручиваем к нему');
      // Для hero секции прокручиваем к самому верху
      if (sectionId === 'hero') {
        console.log('Прокручиваем к hero секции');
        console.log('Текущая позиция до прокрутки:', window.scrollY);
        
        // Принудительная прокрутка к самому верху
        console.log('Пробуем window.scrollTo(0, 0)');
        window.scrollTo(0, 0);
        
        // Дополнительные методы прокрутки
        console.log('Пробуем document.documentElement.scrollTop = 0');
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Еще один метод через requestAnimationFrame
        requestAnimationFrame(() => {
          console.log('Пробуем через requestAnimationFrame');
          window.scrollTo(0, 0);
        });
        
        // Проверяем результат сразу
        setTimeout(() => {
          console.log('Позиция после прокрутки:', window.scrollY);
          if (window.scrollY > 0) {
            console.log('Прокрутка не сработала, пробуем еще раз');
            window.scrollTo(0, 0);
            
            // Еще одна попытка через небольшую задержку
            setTimeout(() => {
              console.log('Финальная позиция:', window.scrollY);
              if (window.scrollY > 0) {
                console.log('Принудительная прокрутка не работает, пробуем другие методы');
                
                // Пробуем через jQuery если доступен
                if (typeof $ !== 'undefined') {
                  console.log('Пробуем через jQuery');
                  $('html, body').animate({ scrollTop: 0 }, 300);
                }
                
                // Пробуем через scrollIntoView
                console.log('Пробуем scrollIntoView');
                element.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start',
                  inline: 'nearest'
                });
                
                // Последняя попытка - принудительная прокрутка
                setTimeout(() => {
                  console.log('Последняя попытка - принудительная прокрутка');
                  window.scrollTo(0, 0);
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
                }, 200);
              }
            }, 100);
          } else {
            console.log('Успешно прокрутили к верху!');
          }
        }, 50);
      } else {
        // Для других секций используем scrollIntoView
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
        
        // Дополнительная корректировка с учетом navbar
        setTimeout(() => {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          console.log('Позиция элемента:', elementPosition);
          console.log('Позиция с учетом navbar:', offsetPosition);
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    } else {
      console.warn(`Секция с ID "${sectionId}" не найдена`);
      // Выводим все доступные ID на странице для отладки
      const allElements = document.querySelectorAll('[id]');
      console.log('Доступные ID на странице:', Array.from(allElements).map(el => el.id));
      
      // Пробуем еще раз через небольшую задержку
      setTimeout(() => {
        const retryElement = document.getElementById(sectionId);
        if (retryElement) {
          console.log('Элемент найден при повторной попытке');
          retryElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }, 500);
    }
  };

  // Проверяем, находимся ли мы на админ странице
  // Эта проверка должна быть ПОСЛЕ всех хуков!
  const isAdminPage = location.pathname.startsWith('/admin');
  
  // Если это админ страница, не рендерим navbar
  if (isAdminPage) {
    return null;
  }

  return (
    <Navbar 
      expand="lg" 
      className={`navbar-enhanced navbar-${currentTheme} navbar-with-background`} 
      fixed="top"
      style={{ 
        padding: '0.5rem 0',
        // background: hasBackground 
        //   ? 'rgba(3, 4, 94, 0.95)' 
        //   : 'transparent'
        //   ,
        // backdropFilter: hasBackground ? 'blur(15px)' : 'none',
        // boxShadow: hasBackground 
        //   ? '0 4px 20px rgba(3, 4, 94, 0.1)' 
        //   : 'none',
        transition: 'all 0.3s ease-in-out',
        zIndex: 1050
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-enhanced">
          <div className="brand-container">
            <div className="brand-text">
              <div className="brand-main-line">
                <span className="brand-main">AI</span>
                <span className="brand-accent">guide</span>
              </div>
              <div className="brand-tagline">tools hub</div>
            </div>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          className="navbar-toggle-enhanced"
        />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center nav-links-container">
            <Nav.Link 
              onClick={(e) => {
                e.preventDefault();
                console.log('Клик по контактам');
                scrollToSection('contact');
              }}
              style={{ cursor: 'pointer' }}
              className={`nav-link-enhanced nav-link-${currentTheme} ${activeSection === 'contact' ? 'active' : ''}`}
            >
              <span className="nav-icon">📞</span>
              <span className="nav-text">{t('nav.contact')}</span>
            </Nav.Link>
            
            <Nav.Link 
              onClick={(e) => {
                e.preventDefault();
                console.log('Клик по инструментам');
                scrollToSection('filter');
              }}
              style={{ cursor: 'pointer' }}
              className={`nav-link-enhanced nav-link-${currentTheme} ${activeSection === 'filter' ? 'active' : ''}`}
            >
              <span className="nav-icon">🛠️</span>
              <span className="nav-text">{t('nav.tools')}</span>
            </Nav.Link>

            <Nav.Link 
              onClick={(e) => {
                e.preventDefault();
                console.log('Клик по о нас');
                scrollToSection('about');
              }}
              style={{ cursor: 'pointer' }}
              className={`nav-link-enhanced nav-link-${currentTheme} ${activeSection === 'about' ? 'active' : ''}`}
            >
              <span className="nav-icon">📖</span>
              <span className="nav-text">{t('nav.about')}</span>
            </Nav.Link>
            
            <LanguageSwitcher />

            <Nav.Link 
              onClick={(e) => {
                e.preventDefault();
                console.log('Клик по главной');
                console.log('=== НАЧАЛО ОТЛАДКИ ПРОКРУТКИ ===');
                console.log('Текущая позиция до клика:', window.scrollY);
                console.log('Высота документа:', document.documentElement.scrollHeight);
                console.log('Высота окна:', window.innerHeight);
                scrollToSection('hero');
              }}
              style={{ cursor: 'pointer' }}
              className={`nav-link-enhanced nav-link-${currentTheme} ${activeSection === 'hero' ? 'active' : ''}`}
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-text">{t('nav.home')}</span>
            </Nav.Link>
            


            
           
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
