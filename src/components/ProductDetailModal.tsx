import React, { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { LineIcon, FacebookIcon, StarIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { getProductLineMessageUrl } from '../lib/directus';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { language, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  // Escape key event listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const name = language === 'th' ? product.nameTh : product.nameEn;
  const description = language === 'th' ? product.descriptionTh : product.descriptionEn;
  const price = language === 'th' ? product.priceTh : product.priceEn;
  const lineMessageUrl = getProductLineMessageUrl(product, language);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  // Check if image is a real packaging photo to add a helpful visual tag
  const isPackPhoto = (url: string) => url.includes('_pack');

  return (
    <div className="modal-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Symmetrical Close Button */}
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          aria-label={t('products.modal_close')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-content-grid">
          {/* Left Column: Premium Gallery Display */}
          <div className="modal-gallery-side">
            <div className="modal-main-image-wrapper">
              {/* Product Badges on Image Overlay */}
              {isPackPhoto(product.images[activeIndex]) && (
                <div className="modal-image-badge pack-badge">
                  <span>{t('products.label_packaging')}</span>
                </div>
              )}
              {!isPackPhoto(product.images[activeIndex]) && activeIndex > 0 && (
                <div className="modal-image-badge fresh-badge">
                  <span>{t('products.label_fresh')}</span>
                </div>
              )}

              <img 
                src={product.images[activeIndex]} 
                alt={`${name} gallery view ${activeIndex + 1}`} 
                className="modal-main-image"
              />

              {/* Slider Controls */}
              {product.images.length > 1 && (
                <>
                  <button 
                    className="gallery-nav-btn prev" 
                    onClick={handlePrev}
                    aria-label="Previous image"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button 
                    className="gallery-nav-btn next" 
                    onClick={handleNext}
                    aria-label="Next image"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </>
              )}

              {/* Main Image Overlay Shader */}
              <div className="modal-image-overlay"></div>
            </div>

            {/* Thumbnail Navigation Indicators */}
            {product.images.length > 1 && (
              <div className="modal-thumbnails-strip">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    className={`modal-thumbnail-btn ${idx === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img src={imgUrl} alt="thumbnail" className="modal-thumbnail-img" />
                    {isPackPhoto(imgUrl) && (
                      <span className="pack-dot-indicator" title="Real packaging photo"></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Premium Text & CTA Details */}
          <div className="modal-details-side">
            <div className="modal-header-info">
              {product.isFeatured && (
                <div className="modal-badge-featured">
                  <StarIcon size={12} />
                  <span>{language === 'th' ? 'บูติกคัดพิเศษ' : 'Boutique Choice'}</span>
                </div>
              )}
              <h2 className="modal-title">{name}</h2>
            </div>

            {/* Metadata Specs Box */}
            <div className="modal-specs-table">
              <div className="spec-row">
                <span className="spec-label">{t('products.label_portion')}</span>
                <span className="spec-value">{product.weight}</span>
              </div>
              <div className="spec-row price">
                <span className="spec-label">{t('products.label_price')}</span>
                <span className="spec-value text-accent">{price}</span>
              </div>
            </div>

            {/* Deep Description */}
            <div className="modal-description-box">
              <p className="modal-description">{description}</p>
            </div>

            {/* Trust and Hygiene Details */}
            <div className="modal-trust-card">
              <div className="trust-icon">✓</div>
              <p className="trust-text">
                {language === 'th' 
                  ? 'สินค้าทุกชิ้นบรรจุในถุงสูญญากาศและแช่แข็งทันทีเพื่อคงความสดใหม่สูงสุดจนถึงมือคุณ'
                  : 'Every portion is vacuum-sealed and flash-frozen immediately to seal in maximum freshness.'}
              </p>
            </div>

            {/* Action CTA Buttons */}
            <div className="modal-actions-box">
              {lineMessageUrl ? (
                <a 
                  href={lineMessageUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary btn-block btn-line btn-pulse"
                >
                  <LineIcon size={18} />
                  <span>{t('products.btn_order')}</span>
                </a>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary btn-block btn-line btn-pulse"
                  disabled
                >
                  <LineIcon size={18} />
                  <span>{t('products.btn_order')}</span>
                </button>
              )}

              {product.facebookUrl && (
                <a 
                  href={product.facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline btn-block btn-fb"
                >
                  <FacebookIcon size={18} />
                  <span>{t('products.btn_facebook')}</span>
                </a>
              )}

              <button 
                onClick={onClose} 
                className="btn btn-secondary btn-block"
              >
                <span>{t('products.modal_close')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
