import { Product } from '../data/products';
import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';

interface ProductsProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
}

export const Products: React.FC<ProductsProps> = ({ products, onOpenDetails }) => {
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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onOpenDetails={onOpenDetails} />
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
