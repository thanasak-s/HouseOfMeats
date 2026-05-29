import React from 'react';
import { LineIcon, FacebookIcon, MailIcon, MapIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="location" className="contact-section">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-accent-line"></div>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="contact-grid">
          
          {/* Details & Action Channels Column */}
          <div className="contact-info-panel">
            <h3 className="panel-title">{t('contact.panel_title')}</h3>
            
            <div className="contact-details-list">
              {/* Address card */}
              <div className="detail-item">
                <div className="detail-icon">
                  <MapIcon size={20} />
                </div>
                <div className="detail-text">
                  <h4>{t('contact.label_address')}</h4>
                  <p>{t('contact.desc_address')}</p>
                </div>
              </div>

              {/* LINE card */}
              <div className="detail-item">
                <div className="detail-icon line-color">
                  <LineIcon size={20} />
                </div>
                <div className="detail-text">
                  <h4>{t('contact.label_line')}</h4>
                  <p>{t('contact.desc_line')}</p>
                </div>
              </div>

              {/* FB card */}
              <div className="detail-item">
                <div className="detail-icon fb-color">
                  <FacebookIcon size={20} />
                </div>
                <div className="detail-text">
                  <h4>{t('contact.label_fb')}</h4>
                  <p>{t('contact.desc_fb')}</p>
                </div>
              </div>

              {/* Email card */}
              <div className="detail-item">
                <div className="detail-icon mail-color">
                  <MailIcon size={20} />
                </div>
                <div className="detail-text">
                  <h4>{t('contact.label_email')}</h4>
                  <p>{t('contact.desc_email')}</p>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons Group */}
            <div className="contact-button-group">
              <a 
                href="https://line.me/R/ti/p/%40001fnqvs" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary btn-block btn-line"
              >
                <LineIcon size={18} />
                <span>{t('contact.btn_line')}</span>
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61590052253481" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline btn-block btn-fb"
              >
                <FacebookIcon size={18} />
                <span>{t('contact.btn_fb')}</span>
              </a>
              <a 
                href="https://www.google.com/maps?q=13.693832927949042,100.67649862749424" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary btn-block"
              >
                <MapIcon size={18} />
                <span>{t('contact.btn_maps')}</span>
              </a>
              <a 
                href="mailto:admin@houseofmeats.shop" 
                className="btn btn-outline btn-block"
              >
                <MailIcon size={18} />
                <span>{t('contact.btn_email')}</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Panel */}
          <div id="contact" className="contact-map-panel">
            <div className="map-frame-wrapper">
              <iframe
                title="House of Meats AQ ARBOR Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.368735235338!2d100.67392367584572!3d13.693832927949042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6006cc7d7607%3A0xe104764b8bb26f63!2sAQ%20Arbor%20Chalermprakiat%20Rama%209%20Soi%2048!5e0!3m2!1sen!2sth!4v1715848529329!5m2!1sen!2sth"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="google-map-iframe"
              ></iframe>
            </div>
            <div className="map-caption">
              <span>{t('contact.coordinates')}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
export default Contact;
