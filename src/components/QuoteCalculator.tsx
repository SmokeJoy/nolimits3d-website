import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { 
  CalculatorIcon, 
  CubeIcon, 
  ClockIcon, 
  CurrencyEuroIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ArrowDownIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
// Dynamic imports for heavy components
const STLUpload = lazy(() => import('./STLUpload'));
const PDFGenerator = lazy(() => import('./PDFGenerator'));
import LoadingFallback from './LoadingFallback';
import LazyErrorBoundary from './LazyErrorBoundary';
import {
  trackQuoteCalculated,
  trackStepCompleted,
  trackHighPriceAlert,
  trackOrderStarted,
  trackPDFGenerated,
  trackMaterialSelected,
  trackComplexityChanged,
  trackModeToggled
} from '../utils/analytics';

interface QuoteData {
  material: string;
  size: string;
  maxLength: number;
  complexity: number;
  quality: string;
  quantity: number;
  postProcessing: string[];
  urgent: boolean;
  advancedMode: boolean;
  stlMode: boolean; // modalità upload STL
  volume: number; // calcolato automaticamente
}

interface MaterialCost {
  name: string;
  costPerGram: number;
  density: number; // g/cm³
  description: string;
  useCase: string;
  icon: string;
}

const materials: MaterialCost[] = [
  { 
    name: 'PLA', 
    costPerGram: 0.015, 
    density: 1.24,
    description: 'Economico e facile da stampare',
    useCase: 'Perfetto per prototipi visivi e oggetti decorativi',
    icon: '🟢'
  },
  { 
    name: 'ABS', 
    costPerGram: 0.020, 
    density: 1.05,
    description: 'Resistente al calore e agli urti',
    useCase: 'Ideale per parti funzionali e contenitori',
    icon: '🔴'
  },
  { 
    name: 'PETG', 
    costPerGram: 0.023, 
    density: 1.27,
    description: 'Bilanciato tra resistenza e facilità',
    useCase: 'Ottimo per parti tecniche e alimentari',
    icon: '🔵'
  },
  { 
    name: 'TPU', 
    costPerGram: 0.032, 
    density: 1.20,
    description: 'Flessibile come gomma',
    useCase: 'Per guarnizioni, cover e oggetti elastici',
    icon: '🟡'
  },
  { 
    name: 'Nylon', 
    costPerGram: 0.045, 
    density: 1.14,
    description: 'Massima resistenza meccanica',
    useCase: 'Componenti industriali e ingranaggi',
    icon: '⚪'
  },
  { 
    name: 'Carbon Fiber', 
    costPerGram: 0.075, 
    density: 1.30,
    description: 'Ultra-leggero e resistente',
    useCase: 'Aerospace, automotive, droni',
    icon: '⚫'
  }
];

const SIZE_PRESETS = {
  XS: { maxEdge: 5, avgVolume: 5, icon: '🪙', example: 'Moneta, anello', maxLengthLimit: 5 },
  S: { maxEdge: 10, avgVolume: 50, icon: '🖱️', example: 'Mouse, portachiavi', maxLengthLimit: 10 },
  M: { maxEdge: 15, avgVolume: 150, icon: '☕', example: 'Tazza, action figure', maxLengthLimit: 15 },
  L: { maxEdge: 20, avgVolume: 350, icon: '🍶', example: 'Bottiglia, vaso', maxLengthLimit: 20 },
  XL: { maxEdge: 30, avgVolume: 900, icon: '⛑️', example: 'Casco, contenitore', maxLengthLimit: 30 }
};

const COMPLEXITY_LEVELS = {
  1: { name: 'Semplice', multiplier: 1.0, description: 'Forme base, poche superfici', tooltip: 'Oggetti con geometrie semplici, senza supporti o parti sospese. Stampa veloce (<2h).' },
  2: { name: 'Media', multiplier: 1.3, description: 'Fori, spessori variabili', tooltip: 'Pezzi con dettagli interni, fori o sporgenze. Supporti minimi (2-4h).' },
  3: { name: 'Avanzata', multiplier: 1.6, description: 'Geometrie organiche, supporti', tooltip: 'Forme complesse, cavità interne, molti supporti. Richiede pulizia post-stampa (4-8h).' }
};

const qualitySettings = {
  'draft': { name: 'Bozza (0.3mm)', timeMultiplier: 0.7, qualityMultiplier: 0.9, layerHeight: 0.3 },
  'standard': { name: 'Standard (0.2mm)', timeMultiplier: 1.0, qualityMultiplier: 1.0, layerHeight: 0.2 },
  'fine': { name: 'Fine (0.15mm)', timeMultiplier: 1.6, qualityMultiplier: 1.2, layerHeight: 0.15 },
  'ultra': { name: 'Ultra (0.1mm)', timeMultiplier: 2.2, qualityMultiplier: 1.5, layerHeight: 0.1 }
};

const postProcessingCosts = {
  'supports': { name: 'Rimozione supporti', cost: 4 },
  'sanding': { name: 'Levigatura', cost: 7.5 },
  'painting': { name: 'Verniciatura', cost: 12.5 },
  'assembly': { name: 'Assemblaggio', cost: 6 },
  'inserts': { name: 'Inserti filettati', cost: 3 }
};

const QuoteCalculator: React.FC = () => {
  // Load initial data from localStorage or defaults
  const loadInitialData = (): QuoteData => {
    try {
      const savedData = localStorage.getItem('nolimits3d_quote_draft');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Validate saved data has required fields
        if (parsed.material && parsed.size) {
          return { ...parsed, volume: parsed.volume || 150 };
        }
      }
    } catch (error) {
      console.warn('Error loading draft from localStorage:', error);
    }
    
    // Return defaults if no valid saved data
    return {
      material: 'PLA',
      size: 'M',
      maxLength: 0,
      complexity: 2,
      quality: 'standard',
      quantity: 1,
      postProcessing: [],
      urgent: false,
      advancedMode: false,
      stlMode: true,
      volume: 150
    };
  };

  const [quoteData, setQuoteData] = useState<QuoteData>(loadInitialData());

  const [results, setResults] = useState({
    materialCost: 0,
    printTime: 0,
    machineCost: 0,
    postProcessingCost: 0,
    totalCost: 0,
    pricePerPiece: 0,
    estimatedDays: 0
  });

  const [showBreakdown, setShowBreakdown] = useState(false);
  const [anomalyAlert, setAnomalyAlert] = useState<string | null>(null);
  
  // Helper function for mobile vibration on high-cost alerts
  const triggerMobileVibration = () => {
    if (navigator.vibrate && /Mobi|Android/i.test(navigator.userAgent)) {
      navigator.vibrate([100, 50, 100]); // Short vibration pattern
    }
  };
  const [currentStep, setCurrentStep] = useState(1);
  const [hasDraftLoaded, setHasDraftLoaded] = useState(false);

  // Progress tracking
  const steps = [
    { number: 1, title: 'Materiale', icon: '🧪', completed: !!quoteData.material },
    { number: 2, title: 'Dimensioni', icon: '📏', completed: quoteData.size !== 'M' || quoteData.volume > 0 },
    { number: 3, title: 'Opzioni', icon: '⚙️', completed: true },
    { number: 4, title: 'Preventivo', icon: '💰', completed: results.totalCost > 0 }
  ];

  // Calcola automaticamente il volume in base alla taglia e lunghezza
  const calculateVolume = (size: string, maxLength: number, complexity: number) => {
    const sizePreset = SIZE_PRESETS[size as keyof typeof SIZE_PRESETS];
    
    if (maxLength > 0) {
      // Validazione: controlla che la lunghezza sia coerente con la taglia
      if (maxLength > sizePreset.maxLengthLimit) {
        console.warn(`Lunghezza ${maxLength}cm troppo grande per taglia ${size} (max ${sizePreset.maxLengthLimit}cm)`);
        // Usa il limite massimo della taglia
        maxLength = sizePreset.maxLengthLimit;
      }
      
      // Formula corretta: per oggetti 3D il volume cresce cubicamente ma con correzioni
      const volumeCoeff = 0.15; // Ridotto da 0.25 - oggetti reali sono meno densi
      const complexityMultiplier = COMPLEXITY_LEVELS[complexity as keyof typeof COMPLEXITY_LEVELS].multiplier;
      
      // Calcolo volume con formula più conservativa
      const calculatedVolume = Math.round(Math.pow(maxLength, 2.5) * volumeCoeff * complexityMultiplier);
      
      // Sanity check: volume minimo 1 cm³, massimo basato sulla taglia
      const maxVolumeForSize = sizePreset.avgVolume * 5; // 5x il volume medio della taglia
      return Math.max(1, Math.min(calculatedVolume, maxVolumeForSize));
    } else {
      // Usa il volume medio della taglia
      return Math.round(sizePreset.avgVolume * COMPLEXITY_LEVELS[complexity as keyof typeof COMPLEXITY_LEVELS].multiplier);
    }
  };

  useEffect(() => {
    // Aggiorna automaticamente il volume SOLO se NON siamo in modalità STL
    if (quoteData.stlMode) return; // STOP al ciclo infinito!
    
    const newVolume = calculateVolume(quoteData.size, quoteData.maxLength, quoteData.complexity);
    setQuoteData(prev => ({ ...prev, volume: newVolume }));
  }, [quoteData.size, quoteData.maxLength, quoteData.complexity, quoteData.stlMode]);

  // Reset maxLength quando cambia taglia se supera il limite
  useEffect(() => {
    const sizeLimit = SIZE_PRESETS[quoteData.size as keyof typeof SIZE_PRESETS].maxLengthLimit;
    if (quoteData.maxLength > sizeLimit) {
      setQuoteData(prev => ({ ...prev, maxLength: 0 })); // Reset ad "Auto"
    }
  }, [quoteData.size]);

  // Auto-save draft to localStorage with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('nolimits3d_quote_draft', JSON.stringify(quoteData));
      } catch (error) {
        console.warn('Error saving draft to localStorage:', error);
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timer);
  }, [quoteData]);

  // Check if draft was loaded and show notification
  useEffect(() => {
    const savedData = localStorage.getItem('nolimits3d_quote_draft');
    if (savedData && !hasDraftLoaded) {
      setHasDraftLoaded(true);
      // Optional: show a toast notification that draft was recovered
    }
  }, []);

  // Calcolo preventivo protetto con useMemo
  const calculatedResults = useMemo(() => {
    const selectedMaterial = materials.find(m => m.name === quoteData.material)!;
    const qualitySetting = qualitySettings[quoteData.quality as keyof typeof qualitySettings];
    
    // Calcolo peso
    const weight = quoteData.volume * selectedMaterial.density; // grammi
    
    // Calcolo costi materiale
    const materialCost = weight * selectedMaterial.costPerGram * quoteData.quantity;
    
    // Calcolo tempo di stampa (setup + stampa reale)
    const setupTime = 0.25; // Setup fisso: pre-heat, calibrazione, purge
    const printCoeff = 0.025; // Coefficiente stampa ottimizzato
    const baseTime = setupTime + (quoteData.volume * printCoeff * qualitySetting.timeMultiplier); // ore per pezzo
    const totalPrintTime = baseTime * quoteData.quantity;
    
    // Costo macchina (€6/ora - competitivo con mercato)
    const machineCostPerHour = 6;
    const machineCost = totalPrintTime * machineCostPerHour;
    
    // Post-processing
    const postProcessingCost = quoteData.postProcessing.reduce((total, process) => {
      return total + (postProcessingCosts[process as keyof typeof postProcessingCosts]?.cost || 0) * quoteData.quantity;
    }, 0);
    
    // Calcolo giorni stimati
    let estimatedDays = Math.ceil(totalPrintTime / 16); // 16 ore lavorative al giorno
    if (quoteData.urgent) {
      estimatedDays = Math.max(1, Math.ceil(estimatedDays * 0.6)); // Priorità
    }
    
    // Totale base
    let totalCost = materialCost + machineCost + postProcessingCost;
    
    // Maggiorazione urgenza (ridotta dal 25% al 15%)
    if (quoteData.urgent) {
      totalCost *= 1.15;
    }
    
    // Sconto quantità
    if (quoteData.quantity >= 10) {
      totalCost *= 0.85; // 15% sconto
    } else if (quoteData.quantity >= 5) {
      totalCost *= 0.9; // 10% sconto
    }
    
    // Minimo d'ordine per sostenibilità
    const minimumOrder = 15;
    if (totalCost < minimumOrder) {
      totalCost = minimumOrder;
    }
    
    const pricePerPiece = totalCost / quoteData.quantity;
    
    // Controlli anomalia - Alert per valori sospetti con vibrazione mobile
    let alertMessage = null;
    const originalCost = materialCost + machineCost + postProcessingCost + (quoteData.urgent ? (materialCost + machineCost + postProcessingCost) * 0.15 : 0);
    const minimumApplied = totalCost > originalCost;
    
    if (minimumApplied) {
      alertMessage = `ℹ️ Applicato minimo d'ordine €${minimumOrder} per coprire i costi fissi di setup e gestione.`;
    } else if (totalCost > 1000) {
      alertMessage = `⚠️ Prezzo molto alto (€${totalCost.toFixed(0)}). Verifica le dimensioni del pezzo.`;
      triggerMobileVibration(); // Vibrazione per costi elevati
    } else if (estimatedDays > 30) {
      alertMessage = `⚠️ Tempi di consegna lunghi (${estimatedDays} giorni). Controlla volume e complessità.`;
    } else if (weight > 1000) { // > 1kg
      alertMessage = `⚠️ Peso elevato (${(weight/1000).toFixed(1)}kg). Conferma le dimensioni inserite.`;
      triggerMobileVibration(); // Vibrazione per peso elevato
    }
    setAnomalyAlert(alertMessage);
    
    const newResults = {
      materialCost,
      printTime: totalPrintTime,
      machineCost,
      postProcessingCost,
      totalCost,
      pricePerPiece,
      estimatedDays
    };

    return { results: newResults, alertMessage };
  }, [quoteData]); // useMemo dipende solo da quoteData
  
  // Effect separato per aggiornare state e tracking
  useEffect(() => {
    setResults(calculatedResults.results);
    setAnomalyAlert(calculatedResults.alertMessage);

    // Track quote calculation with GA4
    trackQuoteCalculated(quoteData, calculatedResults.results);
    
    // Track high price alerts
    if (calculatedResults.alertMessage) {
      if (calculatedResults.results.totalCost > 1000) {
        trackHighPriceAlert(calculatedResults.results.totalCost, 'cost');
      }
    }
  }, [calculatedResults, quoteData]);

  const handleMaterialChange = (material: string) => {
    const previousMaterial = quoteData.material;
    setQuoteData(prev => ({ ...prev, material }));
    setCurrentStep(2); // Auto-advance to step 2
    
    // Track material selection
    trackMaterialSelected(material, previousMaterial);
    trackStepCompleted(1, 'Material Selection');
  };

  const handlePostProcessingChange = (process: string, checked: boolean) => {
    setQuoteData(prev => ({
      ...prev,
      postProcessing: checked 
        ? [...prev.postProcessing, process]
        : prev.postProcessing.filter(p => p !== process)
    }));
  };

  const handleVolumeCalculated = (volume: number, weight: number) => {
    // Assicura che siamo in STL mode e scrivi volume UNA SOLA VOLTA
    setQuoteData(prev => ({ 
      ...prev, 
      stlMode: true, // Conferma modalità STL
      volume: Math.round(volume * 100) / 100 
    }));
  };

  const handleComplexityChange = (complexity: number) => {
    setQuoteData(prev => ({ ...prev, complexity }));
    
    // Track complexity change
    const complexityName = complexity === 1 ? 'Semplice' : complexity === 2 ? 'Media' : 'Avanzata';
    trackComplexityChanged(complexity, complexityName);
  };

  const handleModeToggle = (mode: 'advanced' | 'stl', newValue: boolean) => {
    if (mode === 'stl') {
      setQuoteData(prev => ({ 
        ...prev, 
        stlMode: newValue,
        advancedMode: false 
      }));
    } else {
      setQuoteData(prev => ({ ...prev, advancedMode: newValue }));
    }
    
    // Track mode toggle
    trackModeToggled(mode, newValue);
  };

  const clearDraft = () => {
    try {
      localStorage.removeItem('nolimits3d_quote_draft');
      // Reset to defaults
      setQuoteData({
        material: 'PLA',
        size: 'M',
        maxLength: 0,
        complexity: 2,
        quality: 'standard',
        quantity: 1,
        postProcessing: [],
        urgent: false,
        advancedMode: false,
        stlMode: true,
        volume: 150
      });
      setCurrentStep(1);
    } catch (error) {
      console.warn('Error clearing draft:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* SEO-Optimized Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Preventivatore Stampa 3D FDM Online | NoLimits3D
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          <strong>Preventivo immediato senza registrazione</strong> per la tua stampa 3D. 
          Prezzi trasparenti, calcolo istantaneo e <strong>consegna rapida in tutta Italia</strong>.
        </p>
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-400">
          <span className="flex items-center">⚡ Calcolo in 30 secondi</span>
          <span className="flex items-center">🇮🇹 Produzione italiana</span>
          <span className="flex items-center">📞 Supporto tecnico incluso</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <CalculatorIcon className="h-6 w-6 text-blue-400 mr-2" />
              <h2 className="text-xl font-bold text-white">Configura il tuo Progetto</h2>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-xs text-gray-400">
                Preventivo in 4 semplici step
              </div>
              {hasDraftLoaded && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-green-400">📁 Bozza recuperata</span>
                  <button
                    onClick={clearDraft}
                    className="text-xs text-gray-400 hover:text-red-400 underline"
                  >
                    Inizia da capo
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Progress Steps with Accessibility */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(step.number)}
                    aria-current={currentStep === step.number ? 'step' : undefined}
                    aria-label={`Step ${step.number}: ${step.title}${step.completed ? ' (completed)' : ''}`}
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      step.completed 
                        ? 'bg-green-600 text-white' 
                        : currentStep === step.number
                        ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                        : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
                    }`}
                  >
                    {step.completed ? '✓' : step.number}
                  </button>
                  <div className="ml-2 hidden sm:block">
                    <div className={`text-xs font-medium ${
                      step.completed || currentStep === step.number ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.icon} {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                      step.completed ? 'bg-green-500' : 'bg-slate-600'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Mobile-friendly progress bar */}
            <div className="sm:hidden flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>Step {currentStep}/4</span>
              <span>{steps[currentStep - 1]?.title}</span>
            </div>
            <div className="sm:hidden w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300" 
                style={{width: `${(currentStep / steps.length) * 100}%`}}
              ></div>
            </div>
          </div>

          <form className="space-y-8">
            {/* Step 1: Material Selection */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  1
                </div>
                <h3 className="text-lg font-medium text-white">Seleziona il Materiale</h3>
              </div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-200">
                  Scegli il Materiale
                </label>
                <div className="text-xs text-blue-400">
                  💡 Quale scegliere?
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {materials.map((material) => (
                  <button
                    key={material.name}
                    type="button"
                    onClick={() => handleMaterialChange(material.name)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      quoteData.material === material.name
                        ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30'
                        : 'bg-slate-700 text-gray-200 border-slate-600 hover:bg-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{material.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-base">{material.name}</span>
                          <span className="text-xs opacity-75">
                            €{material.costPerGram.toFixed(3)}/g
                          </span>
                        </div>
                        <div className="text-sm opacity-90 mb-1">{material.description}</div>
                        <div className="text-xs opacity-75">{material.useCase}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Material Info per selection */}
              {quoteData.material && (
                <div className="mt-3 p-3 bg-slate-700 rounded-lg">
                  <div className="text-sm text-gray-300">
                    ✅ <strong>{quoteData.material}</strong> selezionato: {materials.find(m => m.name === quoteData.material)?.description}
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Size Selection */}
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  2
                </div>
                <h3 className="text-lg font-medium text-white">Imposta le Dimensioni</h3>
              </div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-200">
                  Scegli la Taglia del Pezzo
                </label>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleModeToggle('stl', !quoteData.stlMode)}
                    className={`text-xs px-3 py-2 rounded border transition-all font-medium ${
                      quoteData.stlMode 
                        ? 'bg-blue-600 text-white border-blue-500' 
                        : 'bg-blue-700 text-white border-blue-600 hover:bg-blue-600'
                    }`}
                  >
                    <CloudArrowUpIcon className="h-4 w-4 inline mr-1" />
                    {quoteData.stlMode ? '📁 Upload STL' : '⚙️ Modalità Professionale'}
                  </button>
                  {!quoteData.stlMode && (
                    <button
                      type="button"
                      onClick={() => handleModeToggle('advanced', !quoteData.advancedMode)}
                      className="text-xs text-blue-400 hover:text-blue-300 underline"
                    >
                      {quoteData.advancedMode ? 'Modalità Semplice' : 'Modalità Tecnica'}
                    </button>
                  )}
                </div>
              </div>

              {quoteData.stlMode ? (
                /* STL Upload Mode */
                <LazyErrorBoundary componentName="STL Upload">
                  <Suspense 
                    fallback={
                      <LoadingFallback 
                        type="loading" 
                        message="Caricamento componente 3D per upload STL..." 
                      />
                    }
                  >
                    <STLUpload 
                      onVolumeCalculated={handleVolumeCalculated}
                      selectedMaterial={{
                        name: quoteData.material,
                        density: materials.find(m => m.name === quoteData.material)!.density
                      }}
                    />
                  </Suspense>
                </LazyErrorBoundary>
              ) : !quoteData.advancedMode ? (
                <>
                  {/* Size Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
                    {Object.entries(SIZE_PRESETS).map(([key, preset]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setQuoteData(prev => ({ ...prev, size: key }))}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          quoteData.size === key
                            ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/30'
                            : 'bg-slate-700 text-gray-200 border-slate-600 hover:bg-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <div className="text-2xl mb-1">{preset.icon}</div>
                        <div className="text-xs font-bold">{key}</div>
                        <div className="text-xs opacity-75">≤ {preset.maxEdge}cm</div>
                      </button>
                    ))}
                  </div>

                  {/* Example for selected size */}
                  <div className="mb-4 p-2 bg-slate-700 rounded text-xs text-gray-300">
                    💡 Taglia {quoteData.size}: {SIZE_PRESETS[quoteData.size as keyof typeof SIZE_PRESETS].example}
                  </div>

                  {/* Optional Length Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Lunghezza Massima (opzionale): {quoteData.maxLength > 0 ? `${quoteData.maxLength} cm` : 'Non specificata'}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max={SIZE_PRESETS[quoteData.size as keyof typeof SIZE_PRESETS].maxLengthLimit}
                      value={Math.min(quoteData.maxLength, SIZE_PRESETS[quoteData.size as keyof typeof SIZE_PRESETS].maxLengthLimit)}
                      onChange={(e) => setQuoteData(prev => ({ ...prev, maxLength: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Auto</span>
                      <span>{SIZE_PRESETS[quoteData.size as keyof typeof SIZE_PRESETS].maxLengthLimit} cm (max per {quoteData.size})</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      Lascia su "Auto" per una stima automatica, o imposta la misura del lato più lungo
                    </div>
                    
                    {/* Enhanced size validation with better feedback */}
                    {quoteData.maxLength > 0 && (
                      <div className="mt-2">
                        {quoteData.maxLength <= SIZE_PRESETS[quoteData.size as keyof typeof SIZE_PRESETS].maxLengthLimit ? (
                          <div className="flex items-center text-xs text-green-400 animate-pulse">
                            ✅ Perfetto! {Math.round(quoteData.maxLength * 10) / 10}cm rientra nella taglia {quoteData.size}
                          </div>
                        ) : (
                          <div className="flex items-center text-xs text-orange-400">
                            ⚠️ {Math.round(quoteData.maxLength * 10) / 10}cm supera il limite per {quoteData.size}. Considera una taglia maggiore.
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Preview in tempo reale */}
                    {quoteData.maxLength > 0 && (
                      <div className="mt-2 p-2 bg-slate-700 rounded text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-300">📦 Volume stimato:</span>
                          <span className="text-blue-300 font-medium">{quoteData.volume} cm³</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">⚖️ Peso circa:</span>
                          <span className="text-blue-300 font-medium">
                            {(quoteData.volume * materials.find(m => m.name === quoteData.material)!.density).toFixed(0)}g
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Complexity Slider with Tooltip */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-200">
                        Complessità: {COMPLEXITY_LEVELS[quoteData.complexity as keyof typeof COMPLEXITY_LEVELS].name}
                      </label>
                      <div className="group relative">
                        <button 
                          type="button"
                          className="text-blue-400 hover:text-blue-300 text-xs cursor-help"
                          onTouchStart={() => {}} // Enables touch events for mobile
                        >
                          ❓ Che significa?
                        </button>
                        <div className="invisible group-hover:visible group-focus:visible absolute z-20 max-w-xs sm:w-64 p-3 bg-slate-900 border border-slate-600 rounded-lg shadow-xl -right-2 top-6 text-sm">
                          <div className="text-white">
                            <strong>{COMPLEXITY_LEVELS[quoteData.complexity as keyof typeof COMPLEXITY_LEVELS].name}:</strong><br/>
                            {COMPLEXITY_LEVELS[quoteData.complexity as keyof typeof COMPLEXITY_LEVELS].tooltip}
                          </div>
                          <div className="absolute -top-1 right-2 w-2 h-2 bg-slate-900 border-l border-t border-slate-600 rotate-45"></div>
                        </div>
                      </div>
                    </div>
                    
                    <input
                      type="range"
                      min="1"
                      max="3"
                      value={quoteData.complexity}
                      onChange={(e) => handleComplexityChange(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                    
                    {/* Interactive complexity indicators */}
                    <div className="flex justify-between items-center mt-2">
                      {[1, 2, 3].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => handleComplexityChange(level)}
                          className={`flex-1 mx-1 p-2 rounded text-center text-xs transition-all ${
                            quoteData.complexity === level
                              ? 'bg-blue-600 text-white border border-blue-500'
                              : 'bg-slate-700 text-gray-300 border border-slate-600 hover:bg-slate-600'
                          }`}
                        >
                          <div className="mb-1">
                            {level === 1 ? '🔲' : level === 2 ? '🔳' : '⏹️'}
                          </div>
                          <div className="font-medium">
                            {COMPLEXITY_LEVELS[level as keyof typeof COMPLEXITY_LEVELS].name}
                          </div>
                          <div className="opacity-75 text-xs">
                            x{COMPLEXITY_LEVELS[level as keyof typeof COMPLEXITY_LEVELS].multiplier}
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-300 bg-slate-700 p-2 rounded">
                      💡 {COMPLEXITY_LEVELS[quoteData.complexity as keyof typeof COMPLEXITY_LEVELS].tooltip}
                    </div>
                  </div>

                  {/* Volume Display */}
                  <div className="p-3 bg-slate-700 rounded-lg border border-slate-600">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Volume Stimato:</span>
                      <span className="font-bold text-white">{quoteData.volume} cm³</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-300">Peso Stimato:</span>
                      <span className="font-bold text-white">
                        {Math.round(quoteData.volume * materials.find(m => m.name === quoteData.material)!.density)} g
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                /* Advanced Mode - Original Volume Input */
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Volume Preciso: {quoteData.volume} cm³
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="500"
                    value={quoteData.volume}
                    onChange={(e) => setQuoteData(prev => ({ ...prev, volume: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1 cm³</span>
                    <span>500 cm³</span>
                  </div>
                  <div className="mt-2 p-2 bg-slate-700 rounded text-xs text-gray-300">
                    💡 Modalità tecnica: inserisci il volume preciso o carica il file STL
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Configuration */}
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  3
                </div>
                <h3 className="text-lg font-medium text-white">Configura le Opzioni</h3>
              </div>
              
              <div className="space-y-4">
                {/* Quality */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Qualità di Stampa
                  </label>
                  <select
                    value={quoteData.quality}
                    onChange={(e) => setQuoteData(prev => ({ ...prev, quality: e.target.value }))}
                    className="w-full border border-slate-600 rounded-md px-3 py-2 bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(qualitySettings).map(([key, setting]) => (
                      <option key={key} value={key} className="bg-slate-700 text-white">
                        {setting.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Quantità: {quoteData.quantity} {quoteData.quantity === 1 ? 'pezzo' : 'pezzi'}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={quoteData.quantity}
                    onChange={(e) => setQuoteData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1 pezzo</span>
                    <span>50 pezzi</span>
                  </div>
                  {quoteData.quantity >= 5 && (
                    <div className="mt-2 p-2 bg-green-900/30 rounded text-xs text-green-400">
                      🎉 Sconto quantità applicato: {quoteData.quantity >= 10 ? '15%' : '10%'}
                    </div>
                  )}
                </div>

                {/* Post-Processing */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Servizi Aggiuntivi
                  </label>
                  <div className="space-y-2">
                    {Object.entries(postProcessingCosts).map(([key, service]) => (
                      <label key={key} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={quoteData.postProcessing.includes(key)}
                          onChange={(e) => handlePostProcessingChange(key, e.target.checked)}
                          className="mr-2 w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-200">
                          {service.name} (+€{service.cost}/pezzo)
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Enhanced Express Switch */}
                <div className="p-4 bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg border border-orange-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">⚡</div>
                      <div>
                        <div className="font-medium text-white flex items-center">
                          Stampa Express
                          <span className="ml-2 text-xs bg-orange-600 text-white px-2 py-1 rounded-full">
                            +15%
                          </span>
                        </div>
                        <div className="text-xs text-orange-300">
                          Consegna prioritaria: {Math.max(1, Math.ceil(results.estimatedDays * 0.6))} giorni invece di {results.estimatedDays}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setQuoteData(prev => ({ ...prev, urgent: !prev.urgent }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                        quoteData.urgent ? 'bg-orange-600' : 'bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          quoteData.urgent ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  {quoteData.urgent && (
                    <div className="mt-3 p-2 bg-orange-800/30 rounded text-xs text-orange-200">
                      🎯 <strong>Express attivato:</strong> La tua stampa sarà processata con priorità massima. 
                      Costo aggiuntivo: €{((results.materialCost + results.machineCost + results.postProcessingCost) * 0.15).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Step 4: Results */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <div className="border-l-4 border-green-500 pl-4 mb-6">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                4
              </div>
              <div className="flex items-center">
                <CurrencyEuroIcon className="h-6 w-6 text-green-400 mr-2" />
                <h2 className="text-xl font-bold text-white">Il Tuo Preventivo</h2>
              </div>
            </div>
          </div>

          {/* Main Results */}
          <div className="space-y-4 mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  €{results.totalCost.toFixed(2)}
                </div>
                <div className="text-green-100">
                  Totale progetto
                </div>
              </div>
            </div>

            {/* Contextual Anomaly Alert - Better Position */}
            {anomalyAlert && (
              <div className="p-3 bg-red-900/30 border border-red-600 rounded-lg">
                <div className="flex items-start">
                  <div className="text-red-400 mr-2 mt-0.5">⚠️</div>
                  <div className="text-sm text-red-200">
                    <strong>Attenzione:</strong> {anomalyAlert}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-900/30 p-4 rounded-lg text-center border border-blue-800">
                <div className="text-lg font-bold text-blue-300">
                  €{results.pricePerPiece.toFixed(2)}
                </div>
                <div className="text-blue-400 text-sm">
                  Per pezzo
                </div>
              </div>
              
              <div className="bg-purple-900/30 p-4 rounded-lg text-center border border-purple-800">
                <div className="text-lg font-bold text-purple-300">
                  {results.estimatedDays} {results.estimatedDays === 1 ? 'giorno' : 'giorni'}
                </div>
                <div className="text-purple-400 text-sm">
                  Consegna stimata
                </div>
              </div>
            </div>
          </div>

          {/* Readable Summary */}
          <div className="mb-6 p-4 bg-slate-700 rounded-lg border border-slate-600">
            <h3 className="font-medium text-white mb-3 flex items-center">
              <InformationCircleIcon className="h-4 w-4 mr-2" />
              Riepilogo del Progetto
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Taglia:</span>
                <span className="text-white font-medium">
                  {!quoteData.advancedMode ? (
                    `${quoteData.size} (≤ ${SIZE_PRESETS[quoteData.size as keyof typeof SIZE_PRESETS].maxEdge} cm)`
                  ) : (
                    `Volume: ${quoteData.volume} cm³`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Peso stimato:</span>
                <span className="text-white font-medium">
                  {Math.round(quoteData.volume * materials.find(m => m.name === quoteData.material)!.density)} g
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Materiale:</span>
                <span className="text-white font-medium">{quoteData.material}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Quantità:</span>
                <span className="text-white font-medium">
                  {quoteData.quantity} {quoteData.quantity === 1 ? 'pezzo' : 'pezzi'}
                </span>
              </div>
              {!quoteData.advancedMode && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Complessità:</span>
                    <span className="text-white font-medium">
                      {COMPLEXITY_LEVELS[quoteData.complexity as keyof typeof COMPLEXITY_LEVELS].name}
                    </span>
                  </div>
                  {quoteData.maxLength > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Lunghezza max:</span>
                      <span className="text-white font-medium">{quoteData.maxLength} cm</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Breakdown Toggle */}
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full flex items-center justify-center py-2 px-4 border border-slate-600 rounded-md text-sm font-medium text-gray-200 hover:bg-slate-700"
          >
            <InformationCircleIcon className="h-4 w-4 mr-2" />
            {showBreakdown ? 'Nascondi' : 'Mostra'} dettagli
            <ArrowDownIcon className={`h-4 w-4 ml-2 transform transition-transform ${showBreakdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Detailed Breakdown */}
          {showBreakdown && (
            <div className="mt-4 space-y-4 border-t border-slate-600 pt-4">
              <h4 className="font-medium text-white flex items-center">
                💰 Dettaglio Costi (Trasparenza Totale)
              </h4>
              
              {/* Come Calcoliamo i Prezzi */}
              <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                <h5 className="text-sm font-medium text-blue-400 mb-2">🔍 Come Calcoliamo i Prezzi</h5>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>• <strong>Materiale:</strong> Peso reale × costo/grammo (aggiornato mensilmente)</div>
                  <div>• <strong>Tempo stampa:</strong> Setup fisso (0.25h) + volume × coefficiente qualità</div>
                  <div>• <strong>Macchina:</strong> €6/ora (include ammortamento, energia, manutenzione)</div>
                  <div>• <strong>Minimo ordine:</strong> €15 per coprire costi fissi di gestione</div>
                  <div>• <strong>Layer height:</strong> 0.1mm = +120% tempo, 0.3mm = -30% tempo</div>
                </div>
              </div>
              
              {/* Costi Base */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300 flex items-center">
                    🧪 Materiale ({Math.round(quoteData.volume * materials.find(m => m.name === quoteData.material)!.density)}g):
                  </span>
                  <span className="font-medium text-white">€{results.materialCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300 flex items-center">
                    ⚙️ Stampa 3D ({results.printTime.toFixed(1)}h × €6/h):
                  </span>
                  <span className="font-medium text-white">€{results.machineCost.toFixed(2)}</span>
                </div>
                
                {/* Post-processing se presente */}
                {results.postProcessingCost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300 flex items-center">
                      🔧 Lavorazioni ({quoteData.postProcessing.length} servizi):
                    </span>
                    <span className="font-medium text-white">€{results.postProcessingCost.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              {/* Subtotale Base */}
              <div className="border-t border-slate-600 pt-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300 font-medium">Subtotale base:</span>
                  <span className="font-medium text-white">
                    €{(results.materialCost + results.machineCost + results.postProcessingCost).toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Modificatori */}
              <div className="space-y-2">
                {quoteData.urgent && (
                  <div className="flex justify-between text-sm text-orange-400">
                    <span className="flex items-center">
                      ⚡ Express (+15%):
                    </span>
                                          <span className="font-medium">+€{(results.materialCost + results.machineCost + results.postProcessingCost * 0.15).toFixed(2)}</span>
                  </div>
                )}
                {quoteData.quantity >= 5 && (
                  <div className="flex justify-between text-sm text-green-400">
                    <span className="flex items-center">
                      🎉 Sconto quantità (-{quoteData.quantity >= 10 ? '15%' : '10%'}):
                    </span>
                    <span className="font-medium">
                      -€{((results.materialCost + results.machineCost + results.postProcessingCost) * (quoteData.quantity >= 10 ? 0.15 : 0.10)).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Totale Finale */}
              <div className="border-t border-slate-600 pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-white">💰 TOTALE:</span>
                  <span className="text-green-400">€{results.totalCost.toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-400 text-right mt-1">
                  Per {quoteData.quantity} {quoteData.quantity === 1 ? 'pezzo' : 'pezzi'} • IVA esclusa
                </div>
              </div>
            </div>
          )}

          {/* Trust Signals */}
          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-green-900/30 p-2 rounded border border-green-800">
                <div className="text-xs text-green-400 font-medium">✓ Prezzo Fisso</div>
                <div className="text-xs text-green-300">Nessun costo nascosto</div>
              </div>
              <div className="bg-blue-900/30 p-2 rounded border border-blue-800">
                <div className="text-xs text-blue-400 font-medium">🔒 File Protetti</div>
                <div className="text-xs text-blue-300">Riservatezza garantita</div>
              </div>
              <div className="bg-purple-900/30 p-2 rounded border border-purple-800">
                <div className="text-xs text-purple-400 font-medium">🇮🇹 Made in Italy</div>
                <div className="text-xs text-purple-300">Produzione locale</div>
              </div>
            </div>
          </div>

          {/* PDF Generator and Action Buttons */}
          <div className="mt-6 space-y-6">
            {/* PDF Generator Component */}
            <LazyErrorBoundary componentName="PDF Generator">
              <Suspense 
                fallback={
                  <LoadingFallback 
                    type="loading" 
                    message="Caricamento generatore PDF..." 
                  />
                }
              >
                <PDFGenerator 
                  quoteData={quoteData}
                  results={results}
                  onPDFGenerated={(link) => {
                    // Track PDF generation with GA4
                    trackPDFGenerated(quoteData, results, link);
                    console.log('PDF generated with link:', link);
                  }}
                />
              </Suspense>
            </LazyErrorBoundary>
            
            {/* Primary Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => trackStepCompleted(4, 'Quote Request')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center"
              >
                📋 Richiedi Preventivo Dettagliato <span className="ml-2 text-xs bg-blue-500 px-2 py-1 rounded">GRATIS</span>
              </button>
              <button 
                onClick={() => trackOrderStarted(quoteData, results)}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  🛒 Ordina Ora - Consegna in {results.estimatedDays} giorni
                  {quoteData.urgent && results.estimatedDays <= 2 && (
                    <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      ⚡ 48H
                    </span>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 hover:opacity-100 transition-opacity"></div>
              </button>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="text-center text-gray-400">
                  💡 Dubbi sui materiali? <br/>
                  <span className="text-blue-400 cursor-pointer hover:underline">Consulenza gratuita</span>
                </div>
                <div className="text-center text-gray-400">
                  📞 Supporto tecnico? <br/>
                  <span className="text-green-400 cursor-pointer hover:underline">Chat diretta</span>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Disclaimer */}
          <div className="mt-4 space-y-3">
            <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-800">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-200">
                  <strong>Garanzia NoLimits3D:</strong> Il prezzo mostrato è definitivo per i parametri selezionati. 
                  Nessuna maggiorazione nascosta. <strong>Preventivo valido 7 giorni</strong>.
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-slate-700 rounded-lg border border-slate-600">
              <div className="flex items-start">
                <InformationCircleIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-gray-300">
                  <strong>Precisione professionale:</strong> Per preventivi su file STL specifici, 
                  carica il modello in modalità tecnica. Include <strong>analisi DfAM gratuita</strong> 
                  e ottimizzazione per stampa 3D.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Advantages */}
      <div className="mt-12 bg-slate-800 rounded-lg p-8 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-2 text-center">
          🏆 Il Preventivatore FDM Più Competitivo d'Italia
        </h3>
        <p className="text-gray-300 text-center mb-6">
          Specialisti della stampa 3D FDM con oltre 5 anni di esperienza
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <ClockIcon className="h-6 w-6 text-blue-400" />
            </div>
            <h4 className="font-medium text-white mb-2">⚡ Preventivo in 30 secondi</h4>
            <p className="text-sm text-gray-300">
              Il più veloce in Italia. Algoritmi basati su 1000+ progetti B2B realizzati.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircleIcon className="h-6 w-6 text-green-400" />
            </div>
            <h4 className="font-medium text-white mb-2">💰 Fino al 20% più conveniente</h4>
            <p className="text-sm text-gray-300">
              Prezzi competitivi senza compromessi sulla qualità. Trasparenza totale sui costi.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CubeIcon className="h-6 w-6 text-purple-400" />
            </div>
            <h4 className="font-medium text-white mb-2">🎯 Specializzazione FDM</h4>
            <p className="text-sm text-gray-300">
              Solo FDM, ma al massimo livello. Materiali avanzati e supporto tecnico dedicato.
            </p>
          </div>
        </div>
        
        {/* USP Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-700 p-3 rounded">
            <div className="text-blue-400 font-medium text-sm">🚀 Consegna</div>
            <div className="text-xs text-gray-300">24-48h disponibile</div>
          </div>
          <div className="bg-slate-700 p-3 rounded">
            <div className="text-green-400 font-medium text-sm">🔒 Sicurezza</div>
            <div className="text-xs text-gray-300">NDA disponibile</div>
          </div>
          <div className="bg-slate-700 p-3 rounded">
            <div className="text-purple-400 font-medium text-sm">🇮🇹 Locale</div>
            <div className="text-xs text-gray-300">Frosinone, Italia</div>
          </div>
          <div className="bg-slate-700 p-3 rounded">
            <div className="text-orange-400 font-medium text-sm">📞 Support</div>
            <div className="text-xs text-gray-300">Chat dedicata</div>
          </div>
        </div>
      </div>
      
      {/* SEO H2 Section */}
      <div className="mt-12 bg-slate-900/50 rounded-lg p-6 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Come Funziona il Calcolo dei Costi FDM: Trasparenza Totale
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-300">
          <div>
            <h3 className="font-medium text-white mb-2">🧮 Algoritmo di Precisione</h3>
            <p>
              Il nostro preventivatore utilizza formule avanzate basate su <strong>oltre 1000 progetti B2B</strong> 
              per calcolare volume, peso e tempi di stampa con precisione industriale.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">💰 Costi Reali del Mercato</h3>
            <p>
              Prezzi materiali aggiornati mensilmente, <strong>costo macchina di €6/h</strong> 
              (più basso della concorrenza), post-processing a costi fissi trasparenti.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">🎯 Specializzazione FDM</h3>
            <p>
              Focus esclusivo su tecnologia FDM ci permette di offrire <strong>prezzi fino al 20% più competitivi</strong> 
              rispetto ai service multi-tecnologia.
            </p>
          </div>
        </div>
        
        {/* Test di Realtà - Debug per Admin */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 bg-yellow-900/30 rounded-lg p-4 border border-yellow-800">
            <h4 className="font-medium text-yellow-400 mb-2">🔬 Test di Realtà (Dev Mode)</h4>
            <div className="text-xs text-yellow-200 space-y-1">
              <div>• <strong>100g PLA (0.2mm):</strong> ~2h stampa → ~€13 totale (con setup)</div>
              <div>• <strong>300g PETG (0.2mm):</strong> ~8h stampa → ~€55 totale</div>
              <div>• <strong>50g TPU (0.2mm):</strong> ~3h stampa → ~€18 totale</div>
              <div>• <strong>Setup time:</strong> 0.25h fisso per pre-heat, calibrazione, purge</div>
              <div>• <strong>Minimo €15:</strong> Copre gestione ordine + imballo + overhead</div>
              <div>• <strong>Layer quality:</strong> Ultra (0.1mm) = +120% tempo, Draft (0.3mm) = -30%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteCalculator; 