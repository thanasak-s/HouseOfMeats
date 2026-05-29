import React from 'react';
import { Product } from '../data/products';
import { LineIcon, StarIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';
import { getProductLineMessageUrl } from '../lib/directus';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { language, t } = useLanguage();

  const name = language === 'th' ? product.nameTh : product.nameEn;
  const description = language === 'th' ? product.descriptionTh : product.descriptionEn;
  const price = language === 'th' ? product.priceTh : product.priceEn;
  const lineMessageUrl = getProductLineMessageUrl(product, language);

  return (
    <article id={product.id} className={`product-card ${product.isFeatured ? 'featured' : ''}`}>
      {/* Featured Ribbon / Badge */}
      {product.isFeatured && (
        <div className="product-featured-badge" onClick={() => onOpenDetails(product)} style={{ cursor: 'pointer' }}>
          <StarIcon size={14} />
          <span>{language === 'th' ? 'บูติกคัดพิเศษ' : 'Boutique Choice'}</span>
        </div>
      )}

      {/* Product Image Wrapper */}
      <div className="product-image-wrapper" onClick={() => onOpenDetails(product)} style={{ cursor: 'pointer' }}>
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
        
        <h3 className="product-name" onClick={() => onOpenDetails(product)} style={{ cursor: 'pointer' }}>
          {name}
        </h3>
        
        <p className="product-description">{description}</p>
        
        <div className="product-footer">
          <div className="product-price-container">
            <span className="product-price-label">{t('products.label_price')}</span>
            <span className="product-price">{price}</span>
          </div>
          
          <div className="product-card-actions">
            {lineMessageUrl ? (
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
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-md btn-line product-order-btn"
                aria-label={`LINE ordering unavailable for ${name}`}
                disabled
              >
                <LineIcon size={14} />
                <span>{t('products.btn_order')}</span>
              </button>
            )}
            
            <button 
              onClick={() => onOpenDetails(product)} 
              className="btn btn-outline btn-md btn-fb-product"
              aria-label={`View details of ${name}`}
            >
              <span>{t('products.btn_details')}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
export default ProductCard;
