import React, { useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import {
  DocumentArrowDownIcon,
  LinkIcon,
  ShareIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';

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
  volumeFromSTL: boolean;
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

interface PDFGeneratorProps {
  quoteData: QuoteData;
  results: Results;
  onPDFGenerated?: (shareableLink: string) => void;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ quoteData, results, onPDFGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareableLink, setShareableLink] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);

  const generateShareableLink = (): string => {
    const quoteId = uuid();
    const quoteSnapshot = {
      id: quoteId,
      timestamp: new Date().toISOString(),
      quoteData,
      results,
      createdAt: Date.now()
    };

    // Save to localStorage (in production, use Firestore)
    localStorage.setItem(`quote_${quoteId}`, JSON.stringify(quoteSnapshot));
    
    // Create shareable link
    const baseUrl = window.location.origin;
    return `${baseUrl}/quote/${quoteId}`;
  };

  const generatePDF = async () => {
    if (!printableRef.current) return;

    setIsGenerating(true);
    
    try {
      // Importa html2pdf dinamicamente
      const { default: html2pdf } = await import('html2pdf.js');

      // Generate shareable link first
      const link = generateShareableLink();
      setShareableLink(link);

      // PDF options
      const options = {
        margin: [10, 10, 10, 10],
        filename: `Preventivo_NoLimits3D_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        }
      };

      // Generate and download PDF
      await html2pdf().set(options).from(printableRef.current).save();
      
      // Call callback with shareable link
      onPDFGenerated?.(link);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareableLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareViaWhatsApp = () => {
    const message = `Preventivo NoLimits3D - ${quoteData.material} ${quoteData.size} - €${results.totalCost.toFixed(2)}\n\nDettagli completi: ${shareableLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const materialName = quoteData.material;
  const complexityName = quoteData.complexity === 1 ? 'Semplice' : quoteData.complexity === 2 ? 'Media' : 'Avanzata';
  const qualityName = quoteData.quality === 'draft' ? 'Bozza' : quoteData.quality === 'standard' ? 'Standard' : quoteData.quality === 'fine' ? 'Fine' : 'Ultra';

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Generazione PDF...
            </>
          ) : (
            <>
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
              Scarica PDF + Link
            </>
          )}
        </button>

        {shareableLink && (
          <button
            onClick={copyToClipboard}
            className={`flex items-center justify-center px-4 py-3 rounded-lg transition-all ${
              copied 
                ? 'bg-green-600 text-white' 
                : 'bg-slate-700 text-gray-200 hover:bg-slate-600'
            }`}
          >
            {copied ? (
              <>
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                Copiato!
              </>
            ) : (
              <>
                <ClipboardDocumentIcon className="h-5 w-5 mr-2" />
                Copia Link
              </>
            )}
          </button>
        )}

        {shareableLink && /Mobi|Android/i.test(navigator.userAgent) && (
          <button
            onClick={shareViaWhatsApp}
            className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
          >
            <ShareIcon className="h-5 w-5 mr-2" />
            WhatsApp
          </button>
        )}
      </div>

      {/* Shareable Link Display */}
      {shareableLink && (
        <div className="p-4 bg-slate-700 rounded-lg border border-slate-600">
          <div className="flex items-center mb-2">
            <LinkIcon className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-sm font-medium text-white">Link Condivisibile</span>
          </div>
          <div className="text-xs text-gray-300 break-all bg-slate-800 p-2 rounded">
            {shareableLink}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            💡 Questo link rimane valido per 30 giorni e contiene tutti i dettagli del preventivo
          </div>
        </div>
      )}

      {/* Hidden Printable Content */}
      <div ref={printableRef} className="hidden print:block">
        <div className="max-w-2xl mx-auto p-8 bg-white text-gray-900">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">NoLimits3D</h1>
            <h2 className="text-xl font-semibold text-gray-800">Preventivo Stampa 3D FDM</h2>
            <div className="text-sm text-gray-600 mt-2">
              Generato il {new Date().toLocaleDateString('it-IT')} alle {new Date().toLocaleTimeString('it-IT')}
            </div>
          </div>

          {/* Customer Info Placeholder */}
          <div className="border border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Dettagli Cliente</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Nome:</strong> _____________________
              </div>
              <div>
                <strong>Azienda:</strong> _____________________
              </div>
              <div>
                <strong>Email:</strong> _____________________
              </div>
              <div>
                <strong>Telefono:</strong> _____________________
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="border border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Specifiche Progetto</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><strong>Materiale:</strong> {materialName}</div>
              <div><strong>Volume:</strong> {quoteData.volume} cm³</div>
              <div><strong>Taglia:</strong> {quoteData.size}</div>
              <div><strong>Complessità:</strong> {complexityName}</div>
              <div><strong>Qualità:</strong> {qualityName}</div>
              <div><strong>Quantità:</strong> {quoteData.quantity} {quoteData.quantity === 1 ? 'pezzo' : 'pezzi'}</div>
              {quoteData.stlMode && <div><strong>File STL:</strong> Caricato ✓</div>}
              {quoteData.urgent && <div><strong>Express:</strong> Consegna rapida (+15%)</div>}
            </div>
            
            {quoteData.postProcessing.length > 0 && (
              <div className="mt-3">
                <strong>Servizi Aggiuntivi:</strong>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                  {quoteData.postProcessing.map((service, index) => (
                    <li key={index}>
                      {service === 'supports' ? 'Rimozione supporti' :
                       service === 'sanding' ? 'Levigatura' :
                       service === 'painting' ? 'Verniciatura' :
                       service === 'assembly' ? 'Assemblaggio' :
                       service === 'inserts' ? 'Inserti filettati' : service}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Cost Breakdown */}
          <div className="border border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Dettaglio Costi</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Costo Materiale ({quoteData.volume} cm³)</span>
                <span>€{results.materialCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Costo Stampa ({results.printTime}h)</span>
                <span>€{results.machineCost.toFixed(2)}</span>
              </div>
              {results.postProcessingCost > 0 && (
                <div className="flex justify-between">
                  <span>Post-Processing</span>
                  <span>€{results.postProcessingCost.toFixed(2)}</span>
                </div>
              )}
              {quoteData.urgent && (
                <div className="flex justify-between text-orange-600">
                  <span>Express (+15%)</span>
                                      <span>€{(results.totalCost * 0.15).toFixed(2)}</span>
                </div>
              )}
              <hr className="border-gray-300" />
              <div className="flex justify-between text-lg font-bold">
                <span>TOTALE</span>
                <span>€{results.totalCost.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-600">
                Prezzo per pezzo: €{results.pricePerPiece.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="border border-gray-300 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Tempi e Condizioni</h3>
            <div className="text-sm space-y-1">
              <div><strong>Tempo di consegna stimato:</strong> {results.estimatedDays} giorni lavorativi</div>
              <div><strong>Validità preventivo:</strong> 30 giorni</div>
              <div><strong>Pagamento:</strong> 50% anticipo, saldo alla consegna</div>
              <div><strong>Spedizione:</strong> Gratuita per ordini superiori a €100</div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center border-t border-gray-300 pt-4">
            <div className="text-sm text-gray-600">
              <strong>NoLimits3D</strong> - Stampa 3D FDM Professionale<br />
              📧 info@nolimits3d.it | 📞 +39 123 456 7890<br />
              🌐 www.nolimits3d.it | 📍 Frosinone, Italia
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFGenerator; 