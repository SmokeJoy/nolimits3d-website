
import React from 'react';
import { materials } from './data';
import type { MaterialCost, QuoteData } from './types';

interface StepMaterialProps {
  quoteData: QuoteData;
  handleMaterialChange: (material: string) => void;
}

const StepMaterial: React.FC<StepMaterialProps> = ({ quoteData, handleMaterialChange }) => {
  return (
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
        {materials.map((material: MaterialCost) => (
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
                    €{(material.costPerGram * material.markupFactor).toFixed(3)}/g
                  </span>
                </div>
                <div className="text-sm opacity-90 mb-1">{material.description}</div>
                <div className="text-xs opacity-75">{material.useCase}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {quoteData.material && (
        <div className="mt-3 p-3 bg-slate-700 rounded-lg">
          <div className="text-sm text-gray-300">
            ✅ <strong>{quoteData.material}</strong> selezionato: {materials.find(m => m.name === quoteData.material)?.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default StepMaterial;
