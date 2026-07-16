/// <reference types="vite/client" />

// Type declarations for libraries without built-in types
declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: { scale: number; useCORS?: boolean; allowTaint?: boolean };
    jsPDF?: { unit: string; format: string; orientation: string };
  }

  interface Html2Pdf {
    set(options: Html2PdfOptions): Html2Pdf;
    from(element: HTMLElement): Html2Pdf;
    save(filename?: string): Promise<void>;
  }

  function html2pdf(): Html2Pdf;
  export = html2pdf;
}

declare module 'uuid' {
  export function v4(): string;
}

// Extend THREE module for missing types
declare module 'three' {
  export interface BufferGeometry {
    center(): BufferGeometry;
  }
}

// Global types for analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export {};
