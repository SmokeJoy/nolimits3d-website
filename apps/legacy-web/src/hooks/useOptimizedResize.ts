// useOptimizedResize.ts - Hook per gestione ottimizzata del resize
import { useEffect, useCallback, useRef } from 'react';
import { debounce, batchDOMOperations } from '../utils/debounce';

interface ResizeHandler {
  (dimensions: { width: number; height: number }): void;
}

interface UseOptimizedResizeOptions {
  debounceMs?: number;
  immediate?: boolean;
  enabled?: boolean;
}

export const useOptimizedResize = (
  elementRef: React.RefObject<HTMLElement>,
  onResize: ResizeHandler,
  options: UseOptimizedResizeOptions = {}
) => {
  const { 
    debounceMs = 100, 
    immediate = false, 
    enabled = true 
  } = options;
  
  const lastDimensionsRef = useRef<{ width: number; height: number } | null>(null);
  
  // Ottimized resize handler che evita forced reflow
  const handleResize = useCallback(() => {
    if (!elementRef.current || !enabled) return;

    // Batch DOM operations per evitare forced reflow
    batchDOMOperations(
      // Phase 1: Read operations (all DOM reads together)
      () => {
        const element = elementRef.current;
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height
        };
      },
      // Phase 2: Write operations (in next frame)
      (dimensions) => {
        if (!dimensions) return;
        
        // Solo trigger callback se dimensioni sono cambiate
        const { width, height } = dimensions;
        const lastDimensions = lastDimensionsRef.current;
        
        if (!lastDimensions || 
            lastDimensions.width !== width || 
            lastDimensions.height !== height) {
          
          lastDimensionsRef.current = { width, height };
          onResize({ width, height });
        }
      }
    );
  }, [elementRef, onResize, enabled]);

  // Debounced version del handler
  const debouncedHandleResize = useCallback(
    debounce(handleResize, debounceMs, immediate),
    [handleResize, debounceMs, immediate]
  );

  useEffect(() => {
    if (!enabled) return;

    // Trigger initial resize
    handleResize();

    // ResizeObserver per performance migliori su elementi specifici
    let resizeObserver: ResizeObserver | null = null;
    
    if (elementRef.current && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver((entries) => {
        // Evita multiple chiamate per lo stesso elemento
        if (entries.length > 0) {
          debouncedHandleResize();
        }
      });
      
      resizeObserver.observe(elementRef.current);
    } else {
      // Fallback per window resize
      window.addEventListener('resize', debouncedHandleResize, { 
        passive: true // Passive listener per performance
      });
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', debouncedHandleResize);
      }
    };
  }, [elementRef, debouncedHandleResize, enabled]);

  return {
    triggerResize: handleResize,
    lastDimensions: lastDimensionsRef.current
  };
}; 