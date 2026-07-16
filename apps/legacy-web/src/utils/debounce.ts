// debounce.ts - Utility per debouncing functions e ottimizzazione performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

// Batch DOM reads and writes to avoid forced reflow
export function batchDOMOperations(
  readOperations: () => any,
  writeOperations: (readResults: any) => void
): void {
  // Phase 1: Read DOM properties (all at once)
  const readResults = readOperations();
  
  // Phase 2: Write DOM properties (in next frame)
  requestAnimationFrame(() => {
    writeOperations(readResults);
  });
}

// Throttle function for high-frequency events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function throttledFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
} 