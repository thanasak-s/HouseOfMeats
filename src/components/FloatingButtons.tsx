import React from 'react';
import { LineIcon, FacebookIcon, MapIcon } from './Icons';

export const FloatingButtons: React.FC = () => {
  return (
    <div className="floating-actions-container" aria-label="Quick Contact Panel">
      
      {/* Google Maps Button */}
      <a 
        href="https://www.google.com/maps?q=13.693832927949042,100.67649862749424" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-action-btn maps-float"
        title="Open Google Maps Location"
        aria-label="Find us on Google Maps"
      >
        <MapIcon size={20} />
        <span className="tooltip-text">Find Us</span>
      </a>

      {/* Facebook Messenger Button */}
      <a 
        href="https://www.facebook.com/profile.php?id=61590052253481" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-action-btn fb-float"
        title="Chat on Facebook"
        aria-label="Message on Facebook"
      >
        <FacebookIcon size={20} />
        <span className="tooltip-text">Facebook</span>
      </a>

      {/* LINE Messenger Button */}
      <a 
        href="https://line.me/R/ti/p/%40001fnqvs" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-action-btn line-float"
        title="Order via LINE"
        aria-label="Order via LINE"
      >
        <LineIcon size={22} />
        <span className="tooltip-text">Order LINE</span>
        <span className="btn-ping-indicator"></span>
      </a>

    </div>
  );
};
export default FloatingButtons;
