import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import FinalCTA from './components/FinalCTA';
import FloatingButtons from './components/FloatingButtons';
import Footer from './components/Footer';
import './App.css';

function App() {
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

  return (
    <div className="app-wrapper">
      {/* Sticky Premium Header */}
      <Header />

      {/* Page Content Sections */}
      <main className="main-content">
        {/* Hero Section */}
        <Hero />
        
        {/* Products Section */}
        <Products />
        
        {/* About / Why Choose Us Section */}
        <About />
        
        {/* Contact and Google Maps Section */}
        <Contact />
        
        {/* Final Direct Order CTA Block */}
        <FinalCTA />
      </main>

      {/* Custom Floating Actions Panel (LINE, FB, Maps) */}
      <FloatingButtons />

      {/* Structured Boutique Footer */}
      <Footer />
    </div>
  );
}

export default App;
