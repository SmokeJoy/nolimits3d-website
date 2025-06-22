import React from 'react';

// Design Guidelines Table Component
export const DesignGuidelinesTable: React.FC = () => {
  const guidelinesData = [
    {
      parameter: "Spessore Pareti",
      minimum: "0.8mm",
      recommended: "1.2-1.6mm", 
      maximum: "Illimitato",
      considerations: "Multipli di diametro ugello (0.4mm), min 2 perimetri",
      impact: "Resistenza strutturale"
    },
    {
      parameter: "Angoli Sbalzi", 
      minimum: "0°",
      recommended: "45-60°",
      maximum: "90°",
      considerations: "Oltre 45° servono supporti, materiale e raffreddamento influenzano",
      impact: "Qualità superficiale"
    },
    {
      parameter: "Ponti (Bridges)",
      minimum: "1mm",
      recommended: "5-10mm",
      maximum: "20mm",
      considerations: "Dipende da materiale, velocità e raffreddamento", 
      impact: "Stampabilità"
    },
    {
      parameter: "Fori Verticali Ø",
      minimum: "0.5mm",
      recommended: "1.0-30mm",
      maximum: "Illimitato",
      considerations: "Fori <2mm tendono a chiudersi, alesatura post-stampa",
      impact: "Precisione dimensionale"
    },
    {
      parameter: "Fori Orizzontali Ø", 
      minimum: "1.0mm",
      recommended: "2.0-30mm",
      maximum: "Illimitato",
      considerations: "Forma teardrop per Ø>5mm, elimina supporti interni",
      impact: "Qualità e supporti"
    },
    {
      parameter: "Tolleranze Pressione",
      minimum: "0.05mm",
      recommended: "0.1-0.15mm",
      maximum: "0.3mm", 
      considerations: "Dipende da precisione stampante e post-processing",
      impact: "Accoppiamenti"
    },
    {
      parameter: "Tolleranze Scorrimento",
      minimum: "0.15mm",
      recommended: "0.2-0.3mm", 
      maximum: "0.5mm",
      considerations: "Compensare contrazione termica e rugosità superficie",
      impact: "Funzionalità meccanica"
    },
    {
      parameter: "Raccordi (Fillets)",
      minimum: "0.2mm",
      recommended: "0.5-2.0mm",
      maximum: "Illimitato",
      considerations: "Riduce concentrazione stress del 60-80%",
      impact: "Resistenza a fatica"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch(impact) {
      case 'Resistenza strutturale': return 'text-red-400';
      case 'Qualità superficiale': return 'text-blue-400';
      case 'Stampabilità': return 'text-green-400';
      case 'Precisione dimensionale': return 'text-yellow-400';
      case 'Qualità e supporti': return 'text-purple-400';
      case 'Accoppiamenti': return 'text-cyan-400';
      case 'Funzionalità meccanica': return 'text-orange-400';
      case 'Resistenza a fatica': return 'text-pink-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full border-collapse border border-gray-600 bg-gray-900 text-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-purple-900 to-purple-800">
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[120px]">
              Parametro Design
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              Minimo
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[90px]">
              Raccomandato
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              Massimo
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[250px]">
              Considerazioni Tecniche
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[120px]">
              Impatto Principale
            </th>
          </tr>
        </thead>
        <tbody>
          {guidelinesData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"}>
              <td className="border border-gray-600 px-3 py-3 font-bold text-purple-400">
                {row.parameter}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-red-400 font-mono text-sm">
                {row.minimum}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-green-400 font-mono text-sm font-bold">
                {row.recommended}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-blue-400 font-mono text-sm">
                {row.maximum}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-gray-300 text-sm">
                {row.considerations}
              </td>
              <td className={`border border-gray-600 px-3 py-3 text-sm font-semibold ${getImpactColor(row.impact)}`}>
                {row.impact}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-600">
        <p className="text-sm text-gray-400">
          <strong className="text-purple-400">Fonti:</strong> Dati verificati da Stratasys Design Guidelines 2024, All3DP Technical Research, 
          studi Grgić et al. (2023) su Processes, e Salem et al. (2019) su Materials Science and Engineering A.
        </p>
      </div>
    </div>
  );
};

// Material Anisotropy Table Component  
export const MaterialAnisotropyTable: React.FC = () => {
  const anisotropyData = [
    {
      material: "PLA",
      tensileXY: "50-60 MPa",
      tensileZ: "25-35 MPa",
      reductionZ: "30-40%",
      flexuralXY: "80-100 MPa", 
      flexuralZ: "40-60 MPa",
      thermalDef: "55-60°C",
      applications: "Prototipi, modelli estetici, parti non strutturali"
    },
    {
      material: "PETG",
      tensileXY: "45-55 MPa",
      tensileZ: "30-40 MPa", 
      reductionZ: "25-35%",
      flexuralXY: "70-85 MPa",
      flexuralZ: "45-60 MPa",
      thermalDef: "70-75°C",
      applications: "Contenitori, parti meccaniche, applicazioni alimentari"
    },
    {
      material: "ABS",
      tensileXY: "35-45 MPa",
      tensileZ: "20-30 MPa",
      reductionZ: "35-45%", 
      flexuralXY: "60-80 MPa",
      flexuralZ: "35-50 MPa",
      thermalDef: "95-105°C",
      applications: "Automotive, elettronica, parti resistenti agli urti"
    },
    {
      material: "ASA",
      tensileXY: "40-50 MPa",
      tensileZ: "25-35 MPa",
      reductionZ: "30-40%",
      flexuralXY: "65-85 MPa", 
      flexuralZ: "40-55 MPa",
      thermalDef: "95-100°C",
      applications: "Outdoor, automotive, parti UV-resistenti"
    },
    {
      material: "Nylon PA6",
      tensileXY: "60-80 MPa",
      tensileZ: "35-50 MPa",
      reductionZ: "35-45%",
      flexuralXY: "90-120 MPa",
      flexuralZ: "50-75 MPa", 
      thermalDef: "180-200°C",
      applications: "Ingranaggi, cuscinetti, parti meccaniche caricate"
    },
    {
      material: "PC (Policarbonato)",
      tensileXY: "55-70 MPa", 
      tensileZ: "30-45 MPa",
      reductionZ: "40-50%",
      flexuralXY: "85-110 MPa",
      flexuralZ: "45-65 MPa",
      thermalDef: "135-145°C",
      applications: "Elettronica, automotive, parti ad alta temperatura"
    },
    {
      material: "PLA-CF",
      tensileXY: "90-120 MPa",
      tensileZ: "40-60 MPa",
      reductionZ: "45-55%",
      flexuralXY: "130-180 MPa",
      flexuralZ: "60-90 MPa",
      thermalDef: "60-65°C", 
      applications: "Droni, parti strutturali, alta rigidezza"
    },
    {
      material: "PEEK",
      tensileXY: "90-110 MPa",
      tensileZ: "50-70 MPa",
      reductionZ: "35-45%",
      flexuralXY: "150-180 MPa",
      flexuralZ: "80-110 MPa",
      thermalDef: "340-360°C",
      applications: "Aerospaziale, biomedicale, alta performance"
    }
  ];

  const getReductionColor = (reduction: string) => {
    const value = parseInt(reduction.split('-')[0]);
    if (value >= 40) return 'text-red-400 bg-red-900/20';
    if (value >= 30) return 'text-orange-400 bg-orange-900/20';
    return 'text-green-400 bg-green-900/20';
  };

  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full border-collapse border border-gray-600 bg-gray-900 text-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-orange-900 to-orange-800">
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              Materiale
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              Tensile XY
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              Tensile Z
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[90px]">
              Riduzione Z
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              Flexural XY
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              Flexural Z
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              HDT (°C)
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[200px]">
              Applicazioni Tipiche
            </th>
          </tr>
        </thead>
        <tbody>
          {anisotropyData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"}>
              <td className="border border-gray-600 px-3 py-3 font-bold text-orange-400">
                {row.material}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-green-400 font-mono text-sm">
                {row.tensileXY}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-red-400 font-mono text-sm">
                {row.tensileZ}
              </td>
              <td className="border border-gray-600 px-3 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getReductionColor(row.reductionZ)}`}>
                  {row.reductionZ}
                </span>
              </td>
              <td className="border border-gray-600 px-3 py-3 text-blue-400 font-mono text-sm">
                {row.flexuralXY}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-purple-400 font-mono text-sm">
                {row.flexuralZ}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-yellow-400 font-mono text-sm">
                {row.thermalDef}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-gray-300 text-sm">
                {row.applications}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4 space-y-2">
        <div className="p-3 bg-gray-800 rounded border border-gray-600">
          <p className="text-sm text-gray-400">
            <strong className="text-orange-400">Metodologia:</strong> Test conformi ASTM D638 (tensile) e ASTM D790 (flexural) 
            condotti da Ultimaker, Stratasys Research e studi PMC NCBI 2024-2025.
          </p>
        </div>
        <div className="p-3 bg-gray-800 rounded border border-gray-600">
          <p className="text-sm text-gray-400">
            <strong className="text-yellow-400">Anisotropia:</strong> 
            <span className="text-green-400 ml-2">Bassa</span> = &lt;30% | 
            <span className="text-orange-400 ml-2">Media</span> = 30-40% | 
            <span className="text-red-400 ml-2">Alta</span> = &gt;40% di riduzione resistenza asse Z
          </p>
        </div>
      </div>
    </div>
  );
};

// Optimization Strategies Table Component
export const OptimizationStrategiesTable: React.FC = () => {
  const strategiesData = [
    {
      strategy: "Orientamento Ottimale",
      difficulty: "Base",
      timeInvestment: "5-15 min",
      strengthGain: "200-400%",
      materialSavings: "10-30%",
      toolsRequired: "Slicer preview",
      description: "Allineare carichi principali lungo piano XY, minimizzare supporti"
    },
    {
      strategy: "Aumento Perimetri",
      difficulty: "Base", 
      timeInvestment: "1 min setup",
      strengthGain: "50-150%",
      materialSavings: "0-10%",
      toolsRequired: "Slicer settings",
      description: "3-5 walls invece di 2, migliore di infill denso"
    },
    {
      strategy: "Raccordi Strutturali",
      difficulty: "Intermedio",
      timeInvestment: "10-30 min",
      strengthGain: "100-300%", 
      materialSavings: "5-15%",
      toolsRequired: "Software CAD",
      description: "R=0.5-2mm in angoli critici, riduce stress concentration"
    },
    {
      strategy: "Infill Strategico",
      difficulty: "Intermedio",
      timeInvestment: "15-45 min",
      strengthGain: "30-80%",
      materialSavings: "20-40%",
      toolsRequired: "Slicer avanzato",
      description: "Modifier mesh per infill variabile, Gyroid in zone critiche"
    },
    {
      strategy: "Inserti Metallici",
      difficulty: "Intermedio",
      timeInvestment: "30-60 min",
      strengthGain: "500-1000%",
      materialSavings: "0%",
      toolsRequired: "Saldatore, inserti",
      description: "Heat-set inserts per connessioni filettate robuste"
    },
    {
      strategy: "Giunti Snap-Fit",
      difficulty: "Avanzato",
      timeInvestment: "1-4 ore",
      strengthGain: "Variable",
      materialSavings: "15-35%",
      toolsRequired: "CAD expertise",
      description: "Eliminare viti, clearance 0.2-0.3mm, orientamento critico"
    },
    {
      strategy: "Ottimizzazione Topologica", 
      difficulty: "Avanzato",
      timeInvestment: "2-8 ore",
      strengthGain: "100-200%",
      materialSavings: "40-70%",
      toolsRequired: "Software FEA",
      description: "Fusione 902, Autodesk Dreamcatcher, algoritmi generativi"
    },
    {
      strategy: "Strutture Lattice",
      difficulty: "Esperto",
      timeInvestment: "4-12 ore", 
      strengthGain: "Variable",
      materialSavings: "50-80%",
      toolsRequired: "Software specializzato",
      description: "TPMS, BCC structures, rigidezza mantenuta con peso ridotto"
    }
  ];

  const getDifficultyColor = (level: string) => {
    switch(level) {
      case 'Base': return 'text-green-400 bg-green-900/20';
      case 'Intermedio': return 'text-yellow-400 bg-yellow-900/20';
      case 'Avanzato': return 'text-orange-400 bg-orange-900/20';
      case 'Esperto': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getGainColor = (gain: string) => {
    const maxValue = parseInt(gain.split('-')[1]?.replace('%', '') || gain.replace('%', ''));
    if (maxValue >= 300) return 'text-emerald-400 font-bold';
    if (maxValue >= 100) return 'text-green-400';
    return 'text-blue-400';
  };

  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full border-collapse border border-gray-600 bg-gray-900 text-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-emerald-900 to-emerald-800">
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[120px]">
              Strategia DfAM
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              Difficoltà
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[90px]">
              Tempo Setup
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[90px]">
              Gain Resistenza
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[80px]">
              Risparmio Mat.
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[100px]">
              Tools Richiesti
            </th>
            <th className="border border-gray-600 px-3 py-3 text-left font-bold text-white min-w-[250px]">
              Descrizione Implementazione
            </th>
          </tr>
        </thead>
        <tbody>
          {strategiesData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"}>
              <td className="border border-gray-600 px-3 py-3 font-bold text-emerald-400">
                {row.strategy}
              </td>
              <td className="border border-gray-600 px-3 py-3">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getDifficultyColor(row.difficulty)}`}>
                  {row.difficulty}
                </span>
              </td>
              <td className="border border-gray-600 px-3 py-3 text-cyan-400 font-mono text-sm">
                {row.timeInvestment}
              </td>
              <td className={`border border-gray-600 px-3 py-3 font-mono text-sm ${getGainColor(row.strengthGain)}`}>
                {row.strengthGain}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-blue-400 font-mono text-sm">
                {row.materialSavings}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-purple-400 text-sm">
                {row.toolsRequired}
              </td>
              <td className="border border-gray-600 px-3 py-3 text-gray-300 text-sm">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-4 space-y-2">
        <div className="p-3 bg-gray-800 rounded border border-gray-600">
          <p className="text-sm text-gray-400">
            <strong className="text-emerald-400">Metodologia:</strong> Dati da case study Ultimaker, Stratasys Applications, 
            ricerche Yang et al. (2024) su strutture lattice e GE LEAP project documentation.
          </p>
        </div>
        <div className="p-3 bg-gray-800 rounded border border-gray-600">
          <p className="text-sm text-gray-400">
            <strong className="text-yellow-400">ROI Strategies:</strong> Prioritizzare 
            <span className="text-green-400 ml-1">Base</span> e 
            <span className="text-yellow-400 ml-1">Intermedio</span> per quick wins, 
            <span className="text-orange-400 ml-1">Avanzato</span>/<span className="text-red-400">Esperto</span> per progetti high-end
          </p>
        </div>
      </div>
    </div>
  );
};

// Main component that exports all tables
export const DfAMTables = {
  DesignGuidelinesTable,
  MaterialAnisotropyTable,
  OptimizationStrategiesTable
}; 