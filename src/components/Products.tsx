import React from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';

export const Products: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="products" className="products-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-accent-line"></div>
          <h2 className="section-title">{t('products.title')}</h2>
          <p className="section-subtitle">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div id="products-grid" className="products-grid">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Sub-text for Premium Experience */}
        <div className="products-notice">
          <p>
            {t('products.notice')}
          </p>
        </div>
      </div>
    </section>
  );
};
export default Products;
