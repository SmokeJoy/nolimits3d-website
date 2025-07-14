
import React, { useState, lazy, Suspense } from 'react';
import { 
  CurrencyEuroIcon,
  InformationCircleIcon,
  ArrowDownIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import type { QuoteData, Results } from './types';
import { materials, SIZE_PRESETS, COMPLEXITY_LEVELS } from './data';
import { formatWeight } from './utils';
import LoadingFallback from '../LoadingFallback';
import LazyErrorBoundary from '../LazyErrorBoundary';

const PDFGenerator = lazy(() => import('../PDFGenerator'));

interface ResultSummaryProps {
  quoteData: QuoteData;
  results: Results;
  anomalyAlert: string | null;
  trackStepCompleted: (step: number, name: string) => void;
  trackOrderStarted: (quoteData: QuoteData, results: Results) => void;
  trackPDFGenerated: (quoteData: QuoteData, results: Results, link: string) => void;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({ 
  quoteData, 
  results, 
  anomalyAlert, 
  trackStepCompleted,
  trackOrderStarted,
  trackPDFGenerated
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const selectedMaterial = materials.find(m => m.name === quoteData.material)!;

  return (
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
              {formatWeight(quoteData.volume, materials.find(m => m.name === quoteData.material)!.density)}
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

      <button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="w-full flex items-center justify-center py-2 px-4 border border-slate-600 rounded-md text-sm font-medium text-gray-200 hover:bg-slate-700"
      >
        <InformationCircleIcon className="h-4 w-4 mr-2" />
        {showBreakdown ? 'Nascondi' : 'Mostra'} dettagli
        <ArrowDownIcon className={`h-4 w-4 ml-2 transform transition-transform ${showBreakdown ? 'rotate-180' : ''}`} />
      </button>

      {showBreakdown && (
        <div className="mt-4 space-y-4 border-t border-slate-600 pt-4">
          <h4 className="font-medium text-white flex items-center">
            💰 Dettaglio Costi (Trasparenza Totale)
          </h4>
          
          <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
            <h5 className="text-sm font-medium text-blue-400 mb-2">🔍 Come Calcoliamo i Prezzi</h5>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• <strong>Materiale:</strong> (Peso × costo/grammo) × markup factor ({selectedMaterial.markupFactor}x per {selectedMaterial.name})</div>
              <div>• <strong>Minimo materiale:</strong> €{selectedMaterial.minimumPrice} per {selectedMaterial.name} (copre setup e handling)</div>
              {quoteData.supportArea && quoteData.supportArea > 0 && (
                <div>• <strong>Supporti:</strong> {quoteData.supportArea.toFixed(1)} cm² × 0.5g/cm² + {(quoteData.supportArea / 100 * 100).toFixed(0)}% tempo extra</div>
              )}
              <div>• <strong>Tempo stampa:</strong> Setup fisso (0.25h) + volume × coefficiente qualità{quoteData.supportArea ? ' + supporti' : ''}</div>
              <div>• <strong>Macchina:</strong> €6/ora (include ammortamento, energia, manutenzione)</div>
              <div>• <strong>Minimo ordine:</strong> €8 per coprire costi fissi di gestione</div>
              <div>• <strong>Layer height:</strong> 0.1mm = +120% tempo, 0.3mm = -30% tempo</div>
              {quoteData.supportArea && quoteData.supportArea > 0 && (
                <div>• <strong>🎯 Auto-orientamento:</strong> Orientamento ottimizzato per ridurre supporti e tempo</div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300 flex items-center">
                🧪 Materiale ({formatWeight(quoteData.volume, materials.find(m => m.name === quoteData.material)!.density).replace(' g', 'g')}):
              </span>
              <span className="font-medium text-white">€{results.materialCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300 flex items-center">
                ⚙️ Stampa 3D ({results.printTime.toFixed(1)}h × €6/h):
              </span>
              <span className="font-medium text-white">€{results.machineCost.toFixed(2)}</span>
            </div>
            
            {results.postProcessingCost > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-300 flex items-center">
                  🔧 Lavorazioni ({quoteData.postProcessing.length} servizi):
                </span>
                <span className="font-medium text-white">€{results.postProcessingCost.toFixed(2)}</span>
              </div>
            )}
          </div>
          
          <div className="border-t border-slate-600 pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300 font-medium">Subtotale base:</span>
              <span className="font-medium text-white">
                €{(results.materialCost + results.machineCost + results.postProcessingCost).toFixed(2)}
              </span>
            </div>
          </div>
          
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

      <div className="mt-6 space-y-6">
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
                trackPDFGenerated(quoteData, results, link);
                console.log('PDF generated with link:', link);
              }}
            />
          </Suspense>
        </LazyErrorBoundary>
        
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

      <div className="mt-4 space-y-3">
        <div className="p-3 bg-orange-900/30 rounded-lg border border-orange-800">
          <div className="flex items-start">
            <InformationCircleIcon className="h-5 w-5 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-orange-200">
              <strong>Preventivo Indicativo:</strong> Il prezzo mostrato è una <strong>stima orientativa</strong> basata sui parametri selezionati. 
              Per ordini reali con specifiche tecniche precise e tempi di stampa effettivi, 
              <strong>contattaci per un preventivo personalizzato</strong>. Stima valida 7 giorni.
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-slate-700 rounded-lg border border-slate-600">
          <div className="flex items-start">
            <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-gray-300">
              <strong>Preventivo Professionale:</strong> Per quote definitive con file STL specifici, 
              <strong>contattaci direttamente</strong>. Includiamo analisi DfAM gratuita, 
              ottimizzazione orientamento e calcolo preciso di tempi e materiali necessari.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;
