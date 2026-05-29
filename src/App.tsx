import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import FinalCTA from './components/FinalCTA';
import FloatingButtons from './components/FloatingButtons';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import { Product, PRODUCTS } from './data/products';
import { loadCatalog } from './lib/catalog';
import './App.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    let isCancelled = false;

    void loadCatalog({
      directusUrl: import.meta.env.VITE_DIRECTUS_URL,
      fallbackProducts: PRODUCTS,
    }).then(({ products: loadedProducts }) => {
      if (!isCancelled) {
        setProducts(loadedProducts);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // Dynamic Scroll to Hash effect with smart fallbacks and real-time hashchange support
  useEffect(() => {
    const scrollToHash = () => {
      if (!window.location.hash) return;
      
      let id = window.location.hash.substring(1); // Remove the '#'
      let element = document.getElementById(id);
      
      // Smart fallback: if singular 'product' is requested, automatically map to 'products'
      if (!element && id === 'product') {
        id = 'products';
        element = document.getElementById(id);
      }
      
      if (element) {
        if (element.classList.contains('product-card')) {
          // Centering product cards vertically in the viewport so that the price is fully visible
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        } else {
          // Standard section top-alignment with offset for the sticky header
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    };

    // Execute scroll on mount with a small delay for React rendering completion
    const timer = setTimeout(scrollToHash, 300);

    // Listen for dynamic hashchange events
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  // Lock body scrolling only while the detail modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  return (
    <div className="app-wrapper">
      {/* Sticky Premium Header */}
      <Header />

      {/* Page Content Sections */}
      <main className="main-content">
        {/* Hero Section */}
        <Hero />
        
        {/* Products Section */}
        <Products products={products} onOpenDetails={setSelectedProduct} />
        
        {/* About / Why Choose Us Section */}
        <About />
        
        {/* Contact and Google Maps Section */}
        <Contact />
        
        {/* Final Direct Order CTA Block */}
        <FinalCTA />
      </main>

      {/* Custom Floating Actions Panel (LINE, FB, Maps) */}
      <FloatingButtons />

      {/* Premium Product Detail Modal */}
      <ProductDetailModal 
        key={selectedProduct?.id || 'none'}
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      {/* Structured Boutique Footer */}
      <Footer />
    </div>
  );
}

export default App;
