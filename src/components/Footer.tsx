import React from 'react';
import { LineIcon, FacebookIcon, MailIcon, MapIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
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
    <footer className="footer-section">
      <div className="section-container footer-container">
        
        {/* Brand Information Column */}
        <div className="footer-brand-column">
          <div className="footer-logo-row">
            <img src="/picture/logo.png" alt="House of Meats Logo" className="footer-logo" />
            <div>
              <h3 className="footer-brand-title">House of Meats</h3>
              <p className="footer-brand-subtitle">Premium Meat</p>
            </div>
          </div>
          <p className="footer-brand-desc">
            {t('footer.brand_desc')}
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="footer-links-column">
          <h4 className="footer-column-title">{t('footer.label_quicklinks')}</h4>
          <ul className="footer-links-list">
            <li>
              <a href="#products" onClick={(e) => handleNavClick(e, 'products')}>{t('nav.products')}</a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>{t('nav.about')}</a>
            </li>
            <li>
              <a href="#location" onClick={(e) => handleNavClick(e, 'location')}>{t('nav.location')}</a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>{t('nav.contact')}</a>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="footer-contact-column">
          <h4 className="footer-column-title">{t('footer.label_contact')}</h4>
          <ul className="footer-contact-list">
            <li>
              <MapIcon size={16} />
              <span>{t('contact.desc_address')}</span>
            </li>
            <li>
              <MailIcon size={16} />
              <a href="mailto:admin@houseofmeats.shop">{t('contact.desc_email')}</a>
            </li>
          </ul>
          
          {/* Social Vector Links */}
          <div className="footer-social-row">
            <a 
              href="https://line.me/R/ti/p/%40001fnqvs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn line-btn"
              title="Add us on LINE"
              aria-label="LINE Link"
            >
              <LineIcon size={18} />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61590052253481" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn fb-btn"
              title="Visit our Facebook"
              aria-label="Facebook Link"
            >
              <FacebookIcon size={18} />
            </a>
            <a 
              href="mailto:admin@houseofmeats.shop" 
              className="social-btn mail-btn"
              title="Send us an Email"
              aria-label="Email Link"
            >
              <MailIcon size={18} />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom">
        <div className="section-container footer-bottom-container">
          <p className="copyright-text">
            &copy; {currentYear} House of Meats. {t('footer.copyright')}
          </p>
          <p className="footer-design-tag">{t('footer.label_design')}</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
