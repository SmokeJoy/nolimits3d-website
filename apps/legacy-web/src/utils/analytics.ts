// Google Analytics 4 tracking utilities for quote calculator

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface QuoteData {
  material: string;
  size: string;
  volume: number;
  complexity: number;
  quality: string;
  quantity: number;
  postProcessing: string[];
  urgent: boolean;
  stlMode: boolean;
}

interface Results {
  materialCost: number;
  printTime: number;
  machineCost: number;
  postProcessingCost: number;
  totalCost: number;
  pricePerPiece: number;
  estimatedDays: number;
}

// Check if gtag is available
const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && 
         typeof window.gtag === 'function' &&
         window.gtag !== undefined;
};

// Track quote calculation event
export const trackQuoteCalculated = (quoteData: QuoteData, results: Results): void => {
  if (!isGtagAvailable()) return;

  try {
    window.gtag('event', 'calculate_quote', {
      event_category: 'Quote Calculator',
      event_label: `${quoteData.material}_${quoteData.size}`,
      value: Math.round(results.totalCost),
      currency: 'EUR',
      custom_parameters: {
        material: quoteData.material,
        volume: quoteData.volume,
        complexity: quoteData.complexity,
        quality: quoteData.quality,
        quantity: quoteData.quantity,
        urgent: quoteData.urgent,
        stl_mode: quoteData.stlMode,
        print_time: results.printTime,
        estimated_days: results.estimatedDays
      }
    });
  } catch (error) {
    console.warn('GA4 tracking error:', error);
  }
};

// Track step completion in the wizard
export const trackStepCompleted = (stepNumber: number, stepName: string): void => {
  if (!isGtagAvailable()) return;

  try {
    window.gtag('event', 'step_completed', {
      event_category: 'Quote Calculator',
      event_label: stepName,
      custom_parameters: {
        step_number: stepNumber,
        step_name: stepName
      }
    });
  } catch (error) {
    console.warn('GA4 tracking error:', error);
  }
};

// Track high price alert shown
export const trackHighPriceAlert = (totalCost: number, alertType: 'cost' | 'weight'): void => {
  if (!isGtagAvailable()) return;

  try {
    window.gtag('event', 'alert_high_price_shown', {
      event_category: 'Quote Calculator',
      event_label: alertType,
      value: Math.round(totalCost),
      currency: 'EUR',
      custom_parameters: {
        alert_type: alertType,
        total_cost: totalCost
      }
    });
  } catch (error) {
    console.warn('GA4 tracking error:', error);
  }
};

// Track when user starts the ordering process
export const trackOrderStarted = (quoteData: QuoteData, results: Results): void => {
  if (!isGtagAvailable()) return;

  try {
    window.gtag('event', 'order_started', {
      event_category: 'Quote Calculator',
      event_label: 'Order Button Clicked',
      value: Math.round(results.totalCost),
      currency: 'EUR',
      custom_parameters: {
        material: quoteData.material,
        volume: quoteData.volume,
        quantity: quoteData.quantity,
        total_cost: results.totalCost,
        estimated_days: results.estimatedDays
      }
    });
  } catch (error) {
    console.warn('GA4 tracking error:', error);
  }
};

// Track PDF generation
export const trackPDFGenerated = (quoteData: QuoteData, results: Results, shareableLink: string): void => {
  if (!isGtagAvailable()) return;

  try {
    window.gtag('event', 'pdf_generated', {
      event_category: 'Quote Calculator',
      event_label: 'PDF Downloaded',
      value: Math.round(results.totalCost),
      currency: 'EUR',
      custom_parameters: {
        material: quoteData.material,
        volume: quoteData.volume,
        quantity: quoteData.quantity,
        total_cost: results.totalCost,
        has_shareable_link: !!shareableLink
      }
    });
  } catch (error) {
    console.warn('GA4 tracking error:', error);
  }
};

// Track material selection
export const trackMaterialSelected = (material: string, previousMaterial?: string): void => {
  if (!isGtagAvailable()) return;

  try {
    window.gtag('event', 'material_selected', {
      event_category: 'Quote Calculator',
      event_label: material,
      custom_parameters: {
        material: material,
        previous_material: previousMaterial
      }
    });
  } catch (error) {
    console.warn('GA4 tracking error:', error);
  }
};

// Track STL upload
export const trackSTLUploaded = (fileSize: number, fileName: string, volume: number): void => {
  if (!isGtagAvailable()) return;

  try {
    window.gtag('event', 'stl_uploaded', {
      event_category: 'Quote Calculator',
      event_label: 'STL File Uploaded',
      custom_parameters: {
        file_size: fileSize,
        file_name: fileName,
        calculated_volume: volume
      }
    });
  } catch (error) {
    console.warn('GA4 tracking error:', error);
  }
};

// Track complexity change
export const trackComplexityChanged = (complexity: number, complexityName: string): void => {
  if (!isGtagAvailable()) return;

  try {
    window.gtag('event', 'complexity_changed', {
      event_category: 'Quote Calculator',
      event_label: complexityName,
      custom_parameters: {
        complexity_level: complexity,
        complexity_name: complexityName
      }
    });
  } catch (error) {
    console.warn('GA4 tracking error:', error);
  }
};

// Track when user toggles advanced modes
export const trackModeToggled = (mode: 'advanced' | 'stl' | 'simple', isEnabled: boolean): void => {
  if (!isGtagAvailable()) return;

  try {
    window.gtag('event', 'mode_toggled', {
      event_category: 'Quote Calculator',
      event_label: `${mode}_mode_${isEnabled ? 'enabled' : 'disabled'}`,
      custom_parameters: {
        mode: mode,
        enabled: isEnabled
      }
    });
  } catch (error) {
    console.warn('GA4 tracking error:', error);
  }
}; 