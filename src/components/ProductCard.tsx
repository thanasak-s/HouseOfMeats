import React from 'react';
import { Product } from '../data/products';
import { LineIcon, StarIcon, FacebookIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t } = useLanguage();

  const name = language === 'th' ? product.nameTh : product.nameEn;
  const description = language === 'th' ? product.descriptionTh : product.descriptionEn;
  const price = language === 'th' ? product.priceTh : product.priceEn;
  const lineMessageUrl = language === 'th' ? product.lineMessageUrlTh : product.lineMessageUrlEn;

  return (
    <article id={product.id} className={`product-card ${product.isFeatured ? 'featured' : ''}`}>
      {/* Featured Ribbon / Badge */}
      {product.isFeatured && (
        <div className="product-featured-badge">
          <StarIcon size={14} />
          <span>{language === 'th' ? 'บูติกคัดพิเศษ' : 'Boutique Choice'}</span>
        </div>
      )}

      {/* Product Image Wrapper */}
      <div className="product-image-wrapper">
        <img 
          src={product.image} 
          alt={`Raw fresh ${name}`} 
          className="product-image"
          loading="lazy" 
        />
        <div className="product-image-overlay"></div>
      </div>

      {/* Product Information */}
      <div className="product-info">
        <div className="product-meta">
          <span className="product-weight">{t('products.label_portion')}: {product.weight}</span>
        </div>
        
        <h3 className="product-name">{name}</h3>
        
        <p className="product-description">{description}</p>
        
        <div className="product-footer">
          <div className="product-price-container">
            <span className="product-price-label">{t('products.label_price')}</span>
            <span className="product-price">{price}</span>
          </div>
          
          <div className="product-card-actions">
            <a 
              href={lineMessageUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-md btn-line product-order-btn"
              aria-label={`Order ${name} via LINE`}
            >
              <LineIcon size={14} />
              <span>{t('products.btn_order')}</span>
            </a>
            {product.facebookUrl && (
              <a 
                href={product.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline btn-md btn-fb-product"
                aria-label={`View ${name} on Facebook`}
              >
                <FacebookIcon size={14} />
                <span>{t('products.btn_facebook')}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
export default ProductCard;
