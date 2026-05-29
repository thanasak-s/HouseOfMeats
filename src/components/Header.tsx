import React, { useState, useEffect } from 'react';
import { LineIcon, FacebookIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  // Handle scroll trigger to refine glassmorphism borders
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Logo & Name */}
        <a href="#" className="brand-logo-container" onClick={(e) => handleNavClick(e, 'root')}>
          <img 
            src="/picture/logo.png" 
            alt="House of Meats Logo" 
            className="header-logo"
            loading="eager"
          />
          <span className="brand-name">House of Meats</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="nav-link">{t('nav.products')}</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="nav-link">{t('nav.about')}</a>
          <a href="#location" onClick={(e) => handleNavClick(e, 'location')} className="nav-link">{t('nav.location')}</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="nav-link">{t('nav.contact')}</a>
        </nav>

        {/* Action CTAs & Language Switcher */}
        <div className="header-ctas">
          {/* Symmetrical Premium Language Toggle Button */}
          <button 
            onClick={toggleLanguage} 
            className="lang-toggle-btn"
            aria-label="Switch Language"
          >
            <span className={`lang-span ${language === 'th' ? 'active' : ''}`}>TH</span>
            <span className="lang-divider">|</span>
            <span className={`lang-span ${language === 'en' ? 'active' : ''}`}>EN</span>
          </button>

          <a 
            href="https://line.me/R/ti/p/%40001fnqvs" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary btn-sm btn-line"
            aria-label="Order via LINE"
          >
            <LineIcon size={18} />
            <span>{t('nav.order_line')}</span>
          </a>
          <a 
            href="https://www.facebook.com/profile.php?id=61590052253481" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline btn-sm btn-fb"
            aria-label="Visit Facebook"
          >
            <FacebookIcon size={16} />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${isMenuOpen ? 'active' : ''}`}>
        <div className="drawer-backdrop" onClick={toggleMenu}></div>
        <div className="drawer-content">
          <div className="drawer-header">
            <img src="/picture/logo.png" alt="House of Meats" className="drawer-logo" />
            <span className="drawer-title">{t('nav.drawer_title')}</span>
            
            {/* Mobile Language Toggle */}
            <button 
              onClick={toggleLanguage} 
              className="lang-toggle-btn mobile"
              aria-label="Switch Language"
            >
              <span className={`lang-span ${language === 'th' ? 'active' : ''}`}>TH</span>
              <span className="lang-divider">|</span>
              <span className={`lang-span ${language === 'en' ? 'active' : ''}`}>EN</span>
            </button>
          </div>
          <nav className="mobile-nav">
            <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="mobile-nav-link">{t('nav.products')}</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="mobile-nav-link">{t('nav.about')}</a>
            <a href="#location" onClick={(e) => handleNavClick(e, 'location')} className="mobile-nav-link">{t('nav.location')}</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="mobile-nav-link">{t('nav.contact')}</a>
          </nav>
          <div className="drawer-footer">
            <a 
              href="https://line.me/R/ti/p/%40001fnqvs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-block btn-line"
            >
              <LineIcon size={20} />
              <span>{t('nav.order_line')}</span>
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61590052253481" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline btn-block btn-fb"
            >
              <FacebookIcon size={18} />
              <span>{t('nav.visit_fb')}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
