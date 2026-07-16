
export interface QuoteData {
  material: string;
  size: string;
  maxLength: number;
  complexity: number;
  quality: string;
  quantity: number;
  postProcessing: string[];
  urgent: boolean;
  advancedMode: boolean;
  stlMode: boolean;
  volume: number;
  volumeFromSTL: boolean;
  supportArea?: number;
}

export interface MaterialCost {
  name: string;
  costPerGram: number;
  density: number;
  description: string;
  useCase: string;
  icon: string;
  markupFactor: number;
  minimumPrice: number;
}

export interface Results {
  materialCost: number;
  printTime: number;
  machineCost: number;
  postProcessingCost: number;
  totalCost: number;
  pricePerPiece: number;
  estimatedDays: number;
}
