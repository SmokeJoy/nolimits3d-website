import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // For LCP optimization
  role?: string; // For accessibility
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 800,
  height = 450,
  className = '',
  priority = false,
  role
}) => {
  // Generate WebP version path
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  return (
    <picture className={className}>
      {/* WebP version for modern browsers */}
      <source srcSet={webpSrc} type="image/webp" />
      
      {/* Fallback for older browsers */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        decoding="async"
        loading={priority ? undefined : "lazy"}
        fetchpriority={priority ? "high" : undefined}
        role={role}
        className="w-full h-auto"
        style={{
          // Prevent layout shift
          aspectRatio: `${width} / ${height}`
        }}
      />
    </picture>
  );
};

export default OptimizedImage; 