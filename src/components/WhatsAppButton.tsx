import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';

interface WhatsAppButtonProps {
  text: string;
  message?: string;
  phoneNumber?: string;
  className?: string;
  showIcon?: boolean;
  variant?: 'floating' | 'inline' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  text = "💬 Contattaci",
  message = "Ciao! Vorrei informazioni sui vostri servizi di stampa 3D",
  phoneNumber = "+393770918590", // Numero reale
  className = "",
  showIcon = true,
  variant = 'inline',
  size = 'md'
}) => {
  const encodedMessage = encodeURIComponent(message);
  const cleanPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhoneNumber}&text=${encodedMessage}`;
  
  const handleClick = () => {
    // Analytics tracking
    if (typeof gtag === 'function') {
      gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'whatsapp_contact',
        value: 1
      });
    }
    
    // Facebook Pixel tracking (se disponibile)
    if (typeof fbq === 'function') {
      fbq('track', 'Contact');
    }
  };

  // Varianti di stile
  const getVariantClasses = () => {
    switch (variant) {
      case 'floating':
        return `
          fixed bottom-6 right-6 z-50 
          bg-green-500 hover:bg-green-600 
          text-white font-semibold 
          rounded-full shadow-2xl 
          transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl
          animate-pulse hover:animate-none
        `;
      case 'minimal':
        return `
          inline-flex items-center gap-2 
          text-green-600 hover:text-green-700 
          font-medium 
          transition-colors duration-200
          border-b border-transparent hover:border-green-600
        `;
      default: // inline
        return `
          inline-flex items-center gap-2 
          bg-gradient-to-r from-green-500 to-green-600 
          hover:from-green-600 hover:to-green-700 
          text-white font-semibold 
          rounded-lg shadow-lg 
          transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl
          focus:outline-none focus:ring-4 focus:ring-green-500/50
        `;
    }
  };

  // Dimensioni
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return variant === 'floating' ? 'p-3' : 'py-2 px-4 text-sm';
      case 'lg':
        return variant === 'floating' ? 'p-5' : 'py-4 px-8 text-lg';
      default: // md
        return variant === 'floating' ? 'p-4' : 'py-3 px-6';
    }
  };

  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  
  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${className}
      `}
      aria-label={`Contattaci su WhatsApp: ${text}`}
      title={`Contattaci su WhatsApp: ${phoneNumber}`}
    >
      {showIcon && (
        variant === 'floating' ? (
          <MessageCircle className={iconSize} />
        ) : (
          <Phone className={iconSize} />
        )
      )}
      {variant !== 'floating' && text}
      
      {/* Testo accessibile per screen reader */}
      <span className="sr-only">
        Apre WhatsApp per contattare NoLimits3D
      </span>
    </a>
  );
};

// Componente floating specifico per facilità d'uso
export const FloatingWhatsApp: React.FC<{ phoneNumber?: string }> = ({
  phoneNumber = "+393770918590"
}) => (
  <WhatsAppButton
    text=""
    variant="floating"
    size="lg"
    phoneNumber={phoneNumber}
    message="Ciao! Vorrei un preventivo per un progetto di stampa 3D."
    aria-label="Contatto rapido WhatsApp"
  />
);

export default WhatsAppButton;