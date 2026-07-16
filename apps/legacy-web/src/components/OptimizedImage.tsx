import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // For LCP optimization
  role?: string; // For accessibility
  quality?: number; // WebP quality 1-100
  sizes?: string; // Responsive sizes
  placeholder?: boolean; // Show blur placeholder
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 800,
  height = 450,
  className = '',
  priority = false,
  role,
  quality = 80,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  placeholder = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px' // Load 50px before entering viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Generate optimized sources using vite-imagetools
  const generateSrcSet = (baseSrc: string, format: 'webp' | 'original') => {
    const extension = format === 'webp' ? 'webp' : '';
    const formatParam = format === 'webp' ? `format=webp&` : '';
    
    // Generate multiple sizes for responsive images
    const sizes = [320, 640, 960, 1280, 1920];
    
    return sizes
      .filter(size => size <= width * 2) // Don't upscale beyond 2x
      .map(size => {
        const optimizedSrc = `${baseSrc}?${formatParam}w=${size}&quality=${quality}${extension ? `&format=${extension}` : ''}`;
        return `${optimizedSrc} ${size}w`;
      })
      .join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: `${width} / ${height}`,
        backgroundColor: placeholder ? '#f3f4f6' : 'transparent'
      }}
    >
      {/* Blur placeholder */}
      {placeholder && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        />
      )}

      {/* Main image - only load when in view or priority */}
      {(isInView || priority) && (
        <picture>
          {/* WebP version for modern browsers */}
          <source 
            srcSet={generateSrcSet(src, 'webp')}
            sizes={sizes}
            type="image/webp" 
          />
          
          {/* Fallback for older browsers */}
          <source 
            srcSet={generateSrcSet(src, 'original')}
            sizes={sizes}
          />
          
          <img
            src={`${src}?w=${width}&quality=${quality}`}
            alt={alt}
            width={width}
            height={height}
            decoding="async"
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "low"}
            role={role}
            onLoad={handleLoad}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              aspectRatio: `${width} / ${height}`
            }}
          />
        </picture>
      )}

      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage; 