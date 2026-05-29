import React from 'react';
import { LineIcon, FacebookIcon, MailIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';

export const FinalCTA: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="final-cta-section">
      <div className="final-cta-backdrop">
        <div className="cta-glow-dot"></div>
      </div>
      <div className="section-container final-cta-container">
        
        {/* Headline */}
        <h2 className="cta-headline">{t('cta.headline')}</h2>
        
        {/* Supportive Text */}
        <p className="cta-text">
          {t('cta.text')}
        </p>

        {/* Buttons Group */}
        <div className="cta-actions">
          <a 
            href="https://line.me/R/ti/p/%40001fnqvs" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary btn-lg btn-line btn-pulse"
          >
            <LineIcon size={20} />
            <span>{t('cta.btn_line')}</span>
          </a>
          
          <a 
            href="https://www.facebook.com/profile.php?id=61590052253481" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary btn-lg btn-fb"
          >
            <FacebookIcon size={20} />
            <span>{t('cta.btn_fb')}</span>
          </a>
          
          <a 
            href="mailto:admin@houseofmeats.shop" 
            className="btn btn-outline btn-lg"
          >
            <MailIcon size={20} />
            <span>{t('cta.btn_email')}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
export default FinalCTA;
