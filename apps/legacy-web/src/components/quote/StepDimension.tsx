
import React, { Suspense, lazy } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { SIZE_PRESETS, COMPLEXITY_LEVELS, materials } from './data';
import type { QuoteData } from './types';
import LoadingFallback from '../LoadingFallback';
import LazyErrorBoundary from '../LazyErrorBoundary';

const STLUpload = lazy(() => import('../STLUpload'));

interface StepDimensionProps {
  quoteData: QuoteData;
  setQuoteData: React.Dispatch<React.SetStateAction<QuoteData>>;
  handleModeToggle: (mode: 'stl' | 'advanced', value: boolean) => void;
  handleVolumeCalculated: (volume: number, weight: number, supportArea?: number) => void;
  handleComplexityChange: (complexity: number) => void;
}

const StepDimension: React.FC<StepDimensionProps> = ({ 
  quoteData, 
  setQuoteData, 
  handleModeToggle, 
  handleVolumeCalculated,
  handleComplexityChange
}) => {
  return (
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

          <div className="mb-4 p-2 bg-slate-700 rounded text-xs text-gray-300">
            💡 Taglia {quoteData.size}: {SIZE_PRESETS[quoteData.size as keyof typeof SIZE_PRESETS].example}
          </div>

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

          <div className="p-3 bg-slate-700 rounded-lg border border-slate-600">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Volume Stimato:</span>
              <span className="font-bold text-white">{quoteData.volume} cm³</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-300">Peso Stimato:</span>
              <span className="font-bold text-white">
                {/* formatWeight(quoteData.volume, materials.find(m => m.name === quoteData.material)!.density) */}
              </span>
            </div>
          </div>
        </>
      ) : (
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
  );
};

export default StepDimension;
