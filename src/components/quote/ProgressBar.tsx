import React from 'react';

interface ProgressBarProps {
  steps: { number: number; title: string; icon: string; completed: boolean }[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep, setCurrentStep }) => {
  return (
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
  );
};

export default ProgressBar;
