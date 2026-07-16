import React from 'react';

// Diagnostic Table Component
export const DiagnosticTable: React.FC = () => {
  const diagnosticData = [
    {
      problem: "Stringing/Oozing",
      causes: ["Temperatura nozzle troppo alta", "Retrazione insufficiente", "Velocità stampa eccessiva"],
      solutions: ["Ridurre temp. 5-10°C", "Aumentare retrazione 0.5-2mm", "Ridurre velocità 10-15mm/s"]
    },
    {
      problem: "Warping",
      causes: ["Gradiente termico elevato", "Adesione piatto insufficiente", "Raffreddamento rapido"],
      solutions: ["Aumentare temp. piatto", "Usare brim/raft", "Chiudere camera stampa"]
    },
    {
      problem: "Layer Delamination",
      causes: ["Temp. nozzle insufficiente", "Velocità ventola eccessiva", "Altezza layer troppo alta"],
      solutions: ["Aumentare temp. 10-20°C", "Ridurre ventola 0-30%", "Ridurre layer height"]
    },
    {
      problem: "Under-extrusion",
      causes: ["Ostruzione nozzle", "Tensione filamento", "Temp. insufficiente"],
      solutions: ["Pulizia nozzle", "Regolare estrusore", "Aumentare temperatura"]
    },
    {
      problem: "Over-extrusion",
      causes: ["Flow rate troppo alto", "Temp. eccessiva", "Velocità troppo bassa"],
      solutions: ["Ridurre flow 5-10%", "Ridurre temperatura", "Aumentare velocità"]
    },
    {
      problem: "Ghosting/Ringing",
      causes: ["Velocità eccessiva", "Accelerazione alta", "Vibrazioni meccaniche"],
      solutions: ["Ridurre velocità", "Limitare accelerazione", "Stabilizzare stampante"]
    }
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full border-collapse border border-gray-600 bg-gray-900 text-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-red-900 to-red-800">
            <th className="border border-gray-600 px-4 py-3 text-left font-bold text-white">
              Problema
            </th>
            <th className="border border-gray-600 px-4 py-3 text-left font-bold text-white">
              Cause Principali
            </th>
            <th className="border border-gray-600 px-4 py-3 text-left font-bold text-white">
              Soluzioni Raccomandate
            </th>
          </tr>
        </thead>
        <tbody>
          {diagnosticData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"}>
              <td className="border border-gray-600 px-4 py-3 font-semibold text-red-400">
                {row.problem}
              </td>
              <td className="border border-gray-600 px-4 py-3">
                <ul className="list-disc list-inside space-y-1">
                  {row.causes.map((cause, i) => (
                    <li key={i} className="text-gray-300 text-sm">{cause}</li>
                  ))}
                </ul>
              </td>
              <td className="border border-gray-600 px-4 py-3">
                <ul className="list-disc list-inside space-y-1">
                  {row.solutions.map((solution, i) => (
                    <li key={i} className="text-green-400 text-sm">{solution}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-600">
        <p className="text-sm text-gray-400">
          <strong className="text-green-400">Note:</strong> Valori basati su ricerche 2024-2025 da FormFutura, Creality e studi MDPI. 
          Testare sempre con campioni prima di produzione finale.
        </p>
      </div>
    </div>
  );
};

// Parameter Optimization Table Component
export const ParameterTable: React.FC = () => {
  const parameterData = [
    {
      material: "PLA",
      nozzleTemp: "190-220°C",
      bedTemp: "50-60°C",
      retraction: "0.5-1.0mm",
      speed: "50-80mm/s",
      fanSpeed: "100%",
      notes: "Materiale entry-level, facile da stampare"
    },
    {
      material: "PETG",
      nozzleTemp: "220-250°C",
      bedTemp: "70-90°C",
      retraction: "1.0-2.0mm",
      speed: "40-70mm/s",
      fanSpeed: "0-30%",
      notes: "Buon compromesso resistenza/facilità"
    },
    {
      material: "ABS",
      nozzleTemp: "220-270°C",
      bedTemp: "80-110°C",
      retraction: "0.5-1.5mm",
      speed: "40-80mm/s",
      fanSpeed: "0-25%",
      notes: "Richiede camera chiusa per ABS"
    },
    {
      material: "ASA",
      nozzleTemp: "230-270°C",
      bedTemp: "80-110°C",
      retraction: "0.8-2.0mm",
      speed: "40-70mm/s",
      fanSpeed: "0-30%",
      notes: "UV-resistente, migliore stabilità di ABS"
    },
    {
      material: "PEEK",
      nozzleTemp: "400-420°C",
      bedTemp: "130-150°C",
      retraction: "1.0-3.0mm",
      speed: "15-40mm/s",
      fanSpeed: "0-20%",
      notes: "High-end, richiede stampante specializzata"
    },
    {
      material: "Nylon (PA)",
      nozzleTemp: "250-290°C",
      bedTemp: "80-120°C",
      retraction: "1.5-4.0mm",
      speed: "30-60mm/s",
      fanSpeed: "0-40%",
      notes: "Igroscopico, essiccare prima dell'uso"
    },
    {
      material: "TPU",
      nozzleTemp: "210-250°C",
      bedTemp: "40-60°C",
      retraction: "0.2-0.8mm",
      speed: "15-30mm/s",
      fanSpeed: "20-50%",
      notes: "Flessibile, stampare lentamente"
    },
    {
      material: "PC",
      nozzleTemp: "270-310°C",
      bedTemp: "90-130°C",
      retraction: "1.0-2.5mm",
      speed: "25-50mm/s",
      fanSpeed: "0-30%",
      notes: "Alta resistenza termica e meccanica"
    }
  ];

  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full border-collapse border border-gray-600 bg-gray-900 text-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-blue-900 to-blue-800">
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              Materiale
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[90px]">
              Temp. Nozzle
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              Temp. Piatto
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              Retrazione
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[70px]">
              Velocità
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[70px]">
              Ventola
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[200px]">
              Note Specifiche
            </th>
          </tr>
        </thead>
        <tbody>
          {parameterData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"}>
              <td className="border border-gray-600 px-3 py-3 font-bold text-blue-400">
                {row.material}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-yellow-400 font-mono text-sm">
                {row.nozzleTemp}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-orange-400 font-mono text-sm">
                {row.bedTemp}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-green-400 font-mono text-sm">
                {row.retraction}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-purple-400 font-mono text-sm">
                {row.speed}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-cyan-400 font-mono text-sm">
                {row.fanSpeed}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-gray-300 text-sm">
                {row.notes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-600">
        <p className="text-sm text-gray-400">
          <strong className="text-blue-400">Fonti:</strong> Dati verificati da Creality Research 2024, FormFutura Technical Specs, 
          Wevolver Materials Database 2025, e studi MDPI su polimeri ad alte prestazioni.
        </p>
      </div>
    </div>
  );
};

// Diagnostic Checklist Table Component  
export const ChecklistTable: React.FC = () => {
  const checklistData = [
    {
      step: "1",
      category: "Pre-Stampa",
      action: "Controllo Filamento",
      details: "Verificare diametro (±0.02mm), umidità (<5%), conservazione",
      timeEstimate: "2-3 min",
      criticality: "Alta"
    },
    {
      step: "2", 
      category: "Pre-Stampa",
      action: "Calibrazione Piatto",
      details: "Livellamento automatico/manuale, distanza nozzle 0.1-0.2mm",
      timeEstimate: "5-10 min",
      criticality: "Critica"
    },
    {
      step: "3",
      category: "Pre-Stampa", 
      action: "Pulizia Nozzle",
      details: "Estrusione test, pulizia residui, verifica ostruzioni",
      timeEstimate: "3-5 min",
      criticality: "Media"
    },
    {
      step: "4",
      category: "Stampa",
      action: "Primo Layer Check",
      details: "Adesione corretta, spessore uniforme, assenza warping",
      timeEstimate: "5 min",
      criticality: "Critica"
    },
    {
      step: "5",
      category: "Stampa",
      action: "Monitoraggio Layers",
      details: "Controllo ogni 10-15 layers per delamination/difetti",
      timeEstimate: "30 sec/check",
      criticality: "Alta"
    },
    {
      step: "6",
      category: "Stampa",
      action: "Controllo Temperatura",
      details: "Stabilità ±2°C nozzle, ±5°C piatto, camera se richiesta",
      timeEstimate: "Continuo",
      criticality: "Alta"
    },
    {
      step: "7",
      category: "Post-Stampa",
      action: "Rimozione Graduale",
      details: "Raffreddamento completo, rimozione delicata, supporti",
      timeEstimate: "5-15 min",
      criticality: "Media"
    },
    {
      step: "8",
      category: "Post-Stampa",
      action: "Ispezione Qualità",
      details: "Dimensioni, superficie, resistenza, conformità specifiche",
      timeEstimate: "10-20 min",
      criticality: "Alta"
    },
    {
      step: "9",
      category: "Manutenzione",
      action: "Pulizia Sistema",
      details: "Nozzle, piatto, estrusore, calibrazione periodica",
      timeEstimate: "15-30 min",
      criticality: "Media"
    },
    {
      step: "10",
      category: "Documentazione",
      action: "Log Parametri",
      details: "Registrare settings funzionanti, problemi risolti",
      timeEstimate: "2-5 min",
      criticality: "Bassa"
    }
  ];

  const getCriticalityColor = (level: string) => {
    switch(level) {
      case 'Critica': return 'text-red-400 bg-red-900/20';
      case 'Alta': return 'text-orange-400 bg-orange-900/20';
      case 'Media': return 'text-yellow-400 bg-yellow-900/20';
      case 'Bassa': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Pre-Stampa': return 'text-blue-400';
      case 'Stampa': return 'text-green-400';
      case 'Post-Stampa': return 'text-purple-400';
      case 'Manutenzione': return 'text-orange-400';
      case 'Documentazione': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full border-collapse border border-gray-600 bg-gray-900 text-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-green-900 to-green-800">
            <th className="border border-gray-600 px-3 py-3 text-center font-bold text-white w-12">
              Step
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[100px]">
              Categoria
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[120px]">
              Azione
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[250px]">
              Dettagli Operativi
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              Tempo
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              Criticità
            </th>
          </tr>
        </thead>
        <tbody>
          {checklistData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"}>
              <td className="border border-gray-600 px-3 py-3 text-center font-bold text-green-400 text-lg">
                {row.step}
              </td>
              <td className={`border border-gray-600 px-3 py-3 font-semibold ${getCategoryColor(row.category)}`}>
                {row.category}
              </td>
              <td className="border border-gray-600 px-3 py-3 font-semibold text-white">
                {row.action}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-gray-300 text-sm">
                {row.details}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-cyan-400 font-mono text-sm">
                {row.timeEstimate}
              </td>
              <td className="border border-gray-600 px-3 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getCriticalityColor(row.criticality)}`}>
                  {row.criticality}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4 space-y-2">
        <div className="p-3 bg-gray-800 rounded border border-gray-600">
          <p className="text-sm text-gray-400">
            <strong className="text-green-400">Metodologia:</strong> Checklist basata su standard industriali ISO 17296, 
            ASTM F2792 e best practices da produttori leading (Ultimaker, Prusa, Creality).
          </p>
        </div>
        <div className="p-3 bg-gray-800 rounded border border-gray-600">
          <p className="text-sm text-gray-400">
            <strong className="text-yellow-400">Livelli Criticità:</strong> 
            <span className="text-red-400 ml-2">Critica</span> = Fallimento garantito | 
            <span className="text-orange-400 ml-2">Alta</span> = Rischio significativo | 
            <span className="text-yellow-400 ml-2">Media</span> = Impatto qualità | 
            <span className="text-green-400 ml-2">Bassa</span> = Miglioramento processo
          </p>
        </div>
      </div>
    </div>
  );
};

// Main component that exports all tables
export const TroubleshootingTables = {
  DiagnosticTable,
  ParameterTable, 
  ChecklistTable
}; 