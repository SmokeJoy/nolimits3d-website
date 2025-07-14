// AccessibleProgressBar.tsx - Componente accessibile per stato operazioni STL
import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface AccessibleProgressBarProps {
  isVisible: boolean;
  progress: number; // 0-100
  operation: 'parsing' | 'volume' | 'orientation' | 'complete';
  className?: string;
}

const operationMessages = {
  parsing: 'Analisi file STL in corso',
  volume: 'Calcolo volume geometria',
  orientation: 'Ottimizzazione orientamento stampa',
  complete: 'Operazione completata'
};

const AccessibleProgressBar: React.FC<AccessibleProgressBarProps> = ({
  isVisible,
  progress,
  operation,
  className = ''
}) => {
  if (!isVisible) return null;

  const message = operationMessages[operation];
  const progressText = operation === 'complete' 
    ? 'Completato' 
    : `${Math.round(progress)}%`;

  return (
    <div 
      className={`flex items-center space-x-3 p-3 bg-blue-900/20 border border-blue-600 rounded-lg ${className}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Icon animata */}
      <div className="flex-shrink-0">
        {operation === 'complete' ? (
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        ) : (
          <ArrowPathIcon className="w-5 h-5 text-blue-400 animate-spin" />
        )}
      </div>

      {/* Progress bar visuale */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-blue-300">
            {message}
          </span>
          <span className="text-sm text-blue-400">
            {progressText}
          </span>
        </div>
        
        {operation !== 'complete' && (
          <div className="w-full bg-blue-900/30 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.max(2, progress)}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${message}: ${progressText}`}
            />
          </div>
        )}
      </div>

      {/* Screen reader text */}
      <span className="sr-only">
        {operation === 'complete' 
          ? `${message} completata con successo`
          : `${message} in corso, progresso ${Math.round(progress)} percento`
        }
      </span>
    </div>
  );
};

export default AccessibleProgressBar; 