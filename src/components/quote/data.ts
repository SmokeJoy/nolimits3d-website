
import type { MaterialCost } from './types';

export const materials: MaterialCost[] = [
  { 
    name: 'PLA', 
    costPerGram: 0.015,
    density: 1.24,
    description: 'Economico e facile da stampare',
    useCase: 'Perfetto per prototipi visivi e oggetti decorativi',
    icon: '🟢',
    markupFactor: 4.0,
    minimumPrice: 2.50
  },
  { 
    name: 'ABS', 
    costPerGram: 0.017,
    density: 1.05,
    description: 'Resistente al calore e agli urti',
    useCase: 'Ideale per parti funzionali e contenitori',
    icon: '🔴',
    markupFactor: 3.8,
    minimumPrice: 3.00
  },
  { 
    name: 'PETG', 
    costPerGram: 0.028,
    density: 1.27,
    description: 'Bilanciato tra resistenza e facilità',
    useCase: 'Ottimo per parti tecniche e alimentari',
    icon: '🔵',
    markupFactor: 3.5,
    minimumPrice: 3.50
  },
  { 
    name: 'TPU', 
    costPerGram: 0.025,
    density: 1.20,
    description: 'Flessibile come gomma',
    useCase: 'Per guarnizioni, cover e oggetti elastici',
    icon: '🟡',
    markupFactor: 4.2,
    minimumPrice: 4.00
  },
  { 
    name: 'Nylon', 
    costPerGram: 0.042,
    density: 1.14,
    description: 'Massima resistenza meccanica',
    useCase: 'Componenti industriali e ingranaggi',
    icon: '⚪',
    markupFactor: 3.2,
    minimumPrice: 6.00
  },
  { 
    name: 'Carbon Fiber', 
    costPerGram: 0.070,
    density: 1.30,
    description: 'Ultra-leggero e resistente',
    useCase: 'Aerospace, automotive, droni',
    icon: '⚫',
    markupFactor: 2.8,
    minimumPrice: 8.00
  }
];

export const SIZE_PRESETS = {
  XS: { maxEdge: 5, avgVolume: 5, icon: '🪙', example: 'Moneta, anello', maxLengthLimit: 5 },
  S: { maxEdge: 10, avgVolume: 50, icon: '🖱️', example: 'Mouse, portachiavi', maxLengthLimit: 10 },
  M: { maxEdge: 15, avgVolume: 150, icon: '☕', example: 'Tazza, action figure', maxLengthLimit: 15 },
  L: { maxEdge: 20, avgVolume: 350, icon: '🍶', example: 'Bottiglia, vaso', maxLengthLimit: 20 },
  XL: { maxEdge: 30, avgVolume: 900, icon: '⛑️', example: 'Casco, contenitore', maxLengthLimit: 30 }
};

export const COMPLEXITY_LEVELS = {
  1: { name: 'Semplice', multiplier: 1.0, description: 'Forme base, poche superfici', tooltip: 'Oggetti con geometrie semplici, senza supporti o parti sospese. Stampa veloce (<2h).' },
  2: { name: 'Media', multiplier: 1.3, description: 'Fori, spessori variabili', tooltip: 'Pezzi con dettagli interni, fori o sporgenze. Supporti minimi (2-4h).' },
  3: { name: 'Avanzata', multiplier: 1.6, description: 'Geometrie organiche, supporti', tooltip: 'Forme complesse, cavità interne, molti supporti. Richiede pulizia post-stampa (4-8h).' }
};

export const qualitySettings = {
  'draft': { name: 'Bozza (0.3mm)', timeMultiplier: 0.7, qualityMultiplier: 0.9, layerHeight: 0.3 },
  'standard': { name: 'Standard (0.2mm)', timeMultiplier: 1.0, qualityMultiplier: 1.0, layerHeight: 0.2 },
  'fine': { name: 'Fine (0.15mm)', timeMultiplier: 1.6, qualityMultiplier: 1.2, layerHeight: 0.15 },
  'ultra': { name: 'Ultra (0.1mm)', timeMultiplier: 2.2, qualityMultiplier: 1.5, layerHeight: 0.1 }
};

export const postProcessingCosts = {
  'supports': { name: 'Rimozione supporti', cost: 4 },
  'sanding': { name: 'Levigatura', cost: 7.5 },
  'painting': { name: 'Verniciatura', cost: 12.5 },
  'assembly': { name: 'Assemblaggio', cost: 6 },
  'inserts': { name: 'Inserti filettati', cost: 3 }
};
