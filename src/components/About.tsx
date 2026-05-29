import React from 'react';
import { ShieldCheckIcon, StarIcon, ClockIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="about-section">
      <div className="section-container">
        
        {/* Editorial Layout Wrapper */}
        <div className="about-editorial-grid">
          
          {/* Brand Presentation Side */}
          <div className="about-brand-card">
            <span className="brand-tagline">{t('about.since')}</span>
            <h2 className="about-heading">
              {t('about.heading_1')} <span className="text-accent">{t('about.heading_2')}</span>
            </h2>
            <p className="about-intro-text">
              {t('about.intro')}
            </p>
            
            <div className="about-logo-stamp">
              <img src="/picture/logo.png" alt="House of Meats Seal" className="stamp-img" />
              <div>
                <h4 className="stamp-title">{t('about.stamp_title')}</h4>
                <p className="stamp-sub">{t('about.stamp_sub')}</p>
              </div>
            </div>
          </div>

          {/* Pillars List Side */}
          <div className="about-pillars-container">
            
            {/* Pillar 1 */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <StarIcon size={24} />
              </div>
              <div className="pillar-details">
                <h3 className="pillar-title">{t('about.pillar1_title')}</h3>
                <p className="pillar-desc">
                  {t('about.pillar1_desc')}
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <ShieldCheckIcon size={24} />
              </div>
              <div className="pillar-details">
                <h3 className="pillar-title">{t('about.pillar2_title')}</h3>
                <p className="pillar-desc">
                  {t('about.pillar2_desc')}
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <ClockIcon size={24} />
              </div>
              <div className="pillar-details">
                <h3 className="pillar-title">{t('about.pillar3_title')}</h3>
                <p className="pillar-desc">
                  {t('about.pillar3_desc')}
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="pillar-card">
              <div className="pillar-icon-box">
                <span className="bullet-char">AQ</span>
              </div>
              <div className="pillar-details">
                <h3 className="pillar-title">{t('about.pillar4_title')}</h3>
                <p className="pillar-desc">
                  {t('about.pillar4_desc')}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
export default About;
