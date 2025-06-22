import React from 'react';

interface MaterialData {
  name: string;
  color: string;
  bgColor: string;
  tensileStrength: string;
  maxTemp: string;
  impact: string;
  impactColor: string;
  printEase: string;
  cost: string;
  applications: string;
}

const materialsData: MaterialData[] = [
  {
    name: 'PLA',
    color: '#4ade80',
    bgColor: '#1f2937',
    tensileStrength: '37-70',
    maxTemp: '55-60',
    impact: '🔴 Bassa',
    impactColor: '#ef4444',
    printEase: '⭐⭐⭐⭐⭐',
    cost: '20-35',
    applications: 'Prototipi, miniature, decorazioni'
  },
  {
    name: 'PETG',
    color: '#60a5fa',
    bgColor: '#1e293b',
    tensileStrength: '45-55',
    maxTemp: '75-85',
    impact: '🟡 Alta',
    impactColor: '#f59e0b',
    printEase: '⭐⭐⭐⭐☆',
    cost: '25-45',
    applications: 'Contenitori, parti meccaniche, trasparenti'
  },
  {
    name: 'ABS',
    color: '#fb923c',
    bgColor: '#292524',
    tensileStrength: '40-50',
    maxTemp: '95-105',
    impact: '🟢 Eccellente',
    impactColor: '#22c55e',
    printEase: '⭐⭐☆☆☆',
    cost: '30-50',
    applications: 'Alloggiamenti elettronici, automotive'
  },
  {
    name: 'ASA',
    color: '#c084fc',
    bgColor: '#1e1b4b',
    tensileStrength: '42-48',
    maxTemp: '90-100',
    impact: '🟢 Eccellente',
    impactColor: '#22c55e',
    printEase: '⭐⭐☆☆☆',
    cost: '35-55',
    applications: 'Uso esterno, resistenza UV'
  },
  {
    name: 'Nylon (PA)',
    color: '#f87171',
    bgColor: '#18181b',
    tensileStrength: '60-85',
    maxTemp: '120-150',
    impact: '🟢 Eccellente',
    impactColor: '#22c55e',
    printEase: '⭐☆☆☆☆',
    cost: '60-120',
    applications: 'Ingranaggi, cuscinetti, parti di usura'
  },
  {
    name: 'PC',
    color: '#9ca3af',
    bgColor: '#111827',
    tensileStrength: '55-75',
    maxTemp: '130-145',
    impact: '🟢 Eccellente',
    impactColor: '#22c55e',
    printEase: '⭐☆☆☆☆',
    cost: '80-150',
    applications: 'Parti strutturali, schermi protettivi'
  },
  {
    name: 'PLA-CF',
    color: '#6b7280',
    bgColor: '#0f172a',
    tensileStrength: '65-95',
    maxTemp: '60-70',
    impact: '🟡 Media',
    impactColor: '#f59e0b',
    printEase: '⭐⭐⭐☆☆',
    cost: '55-90',
    applications: 'Telai, supporti, maschere di montaggio'
  },
  {
    name: 'TPU',
    color: '#818cf8',
    bgColor: '#1c1917',
    tensileStrength: '20-35',
    maxTemp: '70-90',
    impact: '🟢 Eccellente',
    impactColor: '#22c55e',
    printEase: '⭐⭐☆☆☆',
    cost: '45-80',
    applications: 'Guarnizioni, cover flessibili, pneumatici'
  }
];

export const MaterialsComparisonTable: React.FC = () => {
  return (
    <div className="my-8 overflow-x-auto">
      <div className="min-w-full">
        <table className="w-full border-collapse bg-gray-900 shadow-2xl rounded-lg overflow-hidden border border-gray-700">
          <thead>
            <tr className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <th className="border-2 border-gray-600 px-3 py-3 text-center font-bold text-sm">
                📦 Materiale
              </th>
              <th className="border-2 border-gray-600 px-3 py-3 text-center font-bold text-sm">
                💪 Resistenza<br/>Trazione (MPa)
              </th>
              <th className="border-2 border-gray-600 px-3 py-3 text-center font-bold text-sm">
                🌡️ Temp. Max<br/>Utilizzo (°C)
              </th>
              <th className="border-2 border-gray-600 px-3 py-3 text-center font-bold text-sm">
                🔨 Resistenza<br/>Impatto
              </th>
              <th className="border-2 border-gray-600 px-3 py-3 text-center font-bold text-sm">
                ⚡ Facilità<br/>Stampa
              </th>
              <th className="border-2 border-gray-600 px-3 py-3 text-center font-bold text-sm">
                💰 Costo<br/>(€/kg)
              </th>
              <th className="border-2 border-gray-600 px-3 py-3 text-center font-bold text-sm">
                🎯 Ideale per...
              </th>
            </tr>
          </thead>
          <tbody>
            {materialsData.map((material, index) => (
              <tr 
                key={material.name}
                style={{ backgroundColor: material.bgColor }}
                className="border-b border-gray-600 hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
              >
                <td 
                  className="border border-gray-600 px-3 py-3 text-center font-bold"
                  style={{ color: material.color }}
                >
                  {material.name}
                </td>
                <td className="border border-gray-600 px-3 py-3 text-center font-semibold text-gray-100">
                  {material.tensileStrength}
                </td>
                <td className="border border-gray-600 px-3 py-3 text-center font-semibold text-gray-100">
                  {material.maxTemp}
                </td>
                <td className="border border-gray-600 px-3 py-3 text-center text-gray-100">
                  {material.impact}
                </td>
                <td className="border border-gray-600 px-3 py-3 text-center text-lg">
                  {material.printEase}
                </td>
                <td className="border border-gray-600 px-3 py-3 text-center font-semibold text-gray-100">
                  {material.cost}
                </td>
                <td className="border border-gray-600 px-3 py-3 text-left text-gray-200">
                  {material.applications}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-300 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
        <h4 className="font-semibold mb-2 text-green-400">📋 Note metodologiche sui dati:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li><strong className="text-gray-200">Resistenza a trazione:</strong> Valori da test ASTM D638 su campioni standard</li>
          <li><strong className="text-gray-200">Temperature:</strong> Basate su HDT (Heat Deflection Temperature) a 0.45 MPa</li>
          <li><strong className="text-gray-200">Costi:</strong> Range prezzi Europa 2024-2025 per bobine da 1kg qualità media</li>
          <li><strong className="text-gray-200">Facilità stampa:</strong> ⭐⭐⭐⭐⭐ = Plug&Play, ⭐☆☆☆☆ = Richiede esperienza</li>
        </ul>
      </div>
    </div>
  );
}; 