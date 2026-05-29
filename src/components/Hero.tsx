import React from 'react';
import { LineIcon, FacebookIcon, ChevronRightIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('products');
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
    <section className="hero-section">
      {/* Background Image Container */}
      <div className="hero-bg-container">
        <img 
          src="/picture/banner.png" 
          alt="Premium Meat and Salmon Display Banner" 
          className="hero-bg-image"
          loading="eager"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Content Area */}
      <div className="hero-content">
        {/* Elegant Capsules/Badges */}
        <div className="hero-badges-container">
          <span className="badge badge-gold">{t('hero.badge_wagyu')}</span>
          <span className="badge badge-gold">{t('hero.badge_salmon')}</span>
          <span className="badge badge-white">{t('hero.badge_delivery')}</span>
          <span className="badge opacity-glow">{t('hero.badge_bangkok')}</span>
        </div>

        {/* Headline */}
        <h1 className="hero-title animate-fade-in">
          {t('hero.title_1')} <br />
          <span className="text-accent">{t('hero.title_2')}</span>
        </h1>

        {/* Subheadline */}
        <p className="hero-subtitle animate-fade-in-delayed">
          {t('hero.subtitle')}
        </p>

        {/* Call to Actions */}
        <div className="hero-actions animate-fade-in-delayed">
          <a 
            href="https://line.me/R/ti/p/%40001fnqvs" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary btn-lg btn-line btn-pulse"
          >
            <LineIcon size={22} />
            <span>{t('hero.btn_order')}</span>
          </a>
          <a 
            href="#products" 
            onClick={handleScrollToProducts} 
            className="btn btn-secondary btn-lg"
          >
            <span>{t('hero.btn_view_products')}</span>
            <ChevronRightIcon size={18} />
          </a>
          <a 
            href="https://www.facebook.com/profile.php?id=61590052253481" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline btn-lg btn-fb"
          >
            <FacebookIcon size={18} />
            <span>{t('hero.btn_fb')}</span>
          </a>
        </div>
      </div>

      {/* Elegant Bottom Border Accent */}
      <div className="hero-bottom-accent"></div>
    </section>
  );
};
export default Hero;
