
import React from 'react';
import { qualitySettings, postProcessingCosts } from './data';
import type { QuoteData, Results } from './types';

interface StepOptionsProps {
  quoteData: QuoteData;
  setQuoteData: React.Dispatch<React.SetStateAction<QuoteData>>;
  results: Results;
  handlePostProcessingChange: (process: string, checked: boolean) => void;
}

const StepOptions: React.FC<StepOptionsProps> = ({ quoteData, setQuoteData, results, handlePostProcessingChange }) => {
  return (
    <div className="border-l-4 border-purple-500 pl-4">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
          3
        </div>
        <h3 className="text-lg font-medium text-white">Configura le Opzioni</h3>
      </div>
      
      <div className="space-y-4">
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
  );
};

export default StepOptions;
