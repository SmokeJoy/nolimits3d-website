import React from 'react';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface LoadingFallbackProps {
  type?: 'loading' | 'error';
  message?: string;
  onRetry?: () => void;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  type = 'loading', 
  message,
  onRetry 
}) => {
  if (type === 'error') {
    return (
      <div className="p-6 bg-red-900/20 border border-red-600 rounded-lg">
        <div className="flex items-center justify-center mb-4">
          <ExclamationTriangleIcon className="h-8 w-8 text-red-400" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-red-300 mb-2">
            Errore di Caricamento
          </h3>
          <p className="text-sm text-red-200 mb-4">
            {message || 'Non è stato possibile caricare il componente. Verifica la connessione e riprova.'}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Riprova
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-700/50 border border-slate-600 rounded-lg">
      <div className="flex items-center justify-center mb-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-medium text-white mb-2">
          Caricamento in corso...
        </h3>
        <p className="text-sm text-gray-300">
          {message || 'Stiamo caricando il componente per te. Un momento...'}
        </p>
        <div className="mt-4 flex justify-center">
          <div className="w-32 bg-slate-600 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingFallback; 