import React from 'react';

// 1. Tabella Tecniche di Finitura - Panoramica completa delle tecniche di post-processing
export const FinishingTechniquesTable: React.FC = () => {
  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
        <thead>
          <tr className="bg-gradient-to-r from-cyan-600 to-cyan-400">
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-cyan-300">Tecnica</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-cyan-300">Materiali</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-cyan-300">Tempo</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-cyan-300">Costo €</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-cyan-300">Finitura Ra (μm)</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-cyan-300">Difficoltà</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-cyan-300">Risultato Visivo</th>
          </tr>
        </thead>
        <tbody className="text-gray-100">
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-cyan-300">Levigatura Manuale</td>
            <td className="px-4 py-3">Tutti</td>
            <td className="px-4 py-3 font-mono">2-4h</td>
            <td className="px-4 py-3 font-mono text-green-400">5-15</td>
            <td className="px-4 py-3 font-mono">6.0 → 1.1</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-600 text-white rounded text-xs">Media</span></td>
            <td className="px-4 py-3">Superficie satinata uniforme</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-cyan-300">Acetone Smoothing</td>
            <td className="px-4 py-3">ABS, ASA</td>
            <td className="px-4 py-3 font-mono">15-20min</td>
            <td className="px-4 py-3 font-mono text-green-400">3-8</td>
            <td className="px-4 py-3 font-mono">10.0 → 0.4</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-red-600 text-white rounded text-xs">Alta</span></td>
            <td className="px-4 py-3">Finitura lucida specchiata</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-cyan-300">XTC-3D Epossidico</td>
            <td className="px-4 py-3">Tutti</td>
            <td className="px-4 py-3 font-mono">4-6h</td>
            <td className="px-4 py-3 font-mono text-orange-400">25-40</td>
            <td className="px-4 py-3 font-mono">6.0 → 0.2</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-600 text-white rounded text-xs">Media</span></td>
            <td className="px-4 py-3">Superficie perfettamente liscia</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-cyan-300">Primer + Verniciatura</td>
            <td className="px-4 py-3">Tutti</td>
            <td className="px-4 py-3 font-mono">1 giorno</td>
            <td className="px-4 py-3 font-mono text-green-400">10-20</td>
            <td className="px-4 py-3 font-mono">2.0 → 0.8</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-green-600 text-white rounded text-xs">Bassa</span></td>
            <td className="px-4 py-3">Colori uniformi professionale</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-cyan-300">Vibrofinitura</td>
            <td className="px-4 py-3">Tutti (piccoli)</td>
            <td className="px-4 py-3 font-mono">4h auto</td>
            <td className="px-4 py-3 font-mono text-red-400">150-300</td>
            <td className="px-4 py-3 font-mono">6.0 → 1.5</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-green-600 text-white rounded text-xs">Bassa</span></td>
            <td className="px-4 py-3">Finitura satinata batch</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-cyan-300">Annealing Termico</td>
            <td className="px-4 py-3">PLA, PLA+</td>
            <td className="px-4 py-3 font-mono">30-60min</td>
            <td className="px-4 py-3 font-mono text-green-400">2-5</td>
            <td className="px-4 py-3 font-mono">N/A</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-600 text-white rounded text-xs">Media</span></td>
            <td className="px-4 py-3">Resistenza +32%, HDT +60°C</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-cyan-300">Inserti Filettati</td>
            <td className="px-4 py-3">Tutti termoplastici</td>
            <td className="px-4 py-3 font-mono">2-5min/pz</td>
            <td className="px-4 py-3 font-mono text-green-400">0.50-2</td>
            <td className="px-4 py-3 font-mono">N/A</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-green-600 text-white rounded text-xs">Bassa</span></td>
            <td className="px-4 py-3">Connessioni metal +28% resist</td>
          </tr>
          <tr className="hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-cyan-300">Saldatura Chimica</td>
            <td className="px-4 py-3">ABS, PETG</td>
            <td className="px-4 py-3 font-mono">5-10min</td>
            <td className="px-4 py-3 font-mono text-green-400">3-8</td>
            <td className="px-4 py-3 font-mono">N/A</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-red-600 text-white rounded text-xs">Alta</span></td>
            <td className="px-4 py-3">Giunzioni permanenti +45%</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 text-xs text-gray-400">
        <p><strong>Fonti:</strong> BYU Surface Studies 2024, Smooth-On Technical Data, CNC Kitchen Testing 2024-2025</p>
        <p><strong>Note:</strong> Ra = Rugosità superficiale media. Costi per pezzo medio (100cm²). Tempi includono preparazione.</p>
      </div>
    </div>
  );
};

// 2. Tabella Parametri di Processo - Valori tecnici precisi per ogni tecnica e materiale
export const ProcessParametersTable: React.FC = () => {
  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
        <thead>
          <tr className="bg-gradient-to-r from-purple-600 to-purple-400">
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-purple-300">Materiale</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-purple-300">Levigatura Grit</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-purple-300">Annealing T°C</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-purple-300">Acetone Expo</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-purple-300">Primer Type</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-purple-300">Insert T°C</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-purple-300">Shrinkage %</th>
          </tr>
        </thead>
        <tbody className="text-gray-100">
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">PLA Standard</td>
            <td className="px-4 py-3 font-mono">220→400→800→1200</td>
            <td className="px-4 py-3 font-mono text-green-400">90-110°C</td>
            <td className="px-4 py-3 text-red-400 font-mono">Non compatible</td>
            <td className="px-4 py-3">Acrylico Auto</td>
            <td className="px-4 py-3 font-mono text-green-400">280-320°C</td>
            <td className="px-4 py-3 font-mono text-orange-400">-1.8% XY</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">PLA+ / Pro</td>
            <td className="px-4 py-3 font-mono">320→600→1000→1500</td>
            <td className="px-4 py-3 font-mono text-green-400">95-115°C</td>
            <td className="px-4 py-3 text-red-400 font-mono">Non compatible</td>
            <td className="px-4 py-3">Acrylico Auto</td>
            <td className="px-4 py-3 font-mono text-green-400">300-340°C</td>
            <td className="px-4 py-3 font-mono text-orange-400">-1.5% XY</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">ABS</td>
            <td className="px-4 py-3 font-mono">320→600→1000→2000</td>
            <td className="px-4 py-3 font-mono text-orange-400">80-100°C</td>
            <td className="px-4 py-3 font-mono text-green-400">15-20min</td>
            <td className="px-4 py-3">Epossidico Fill</td>
            <td className="px-4 py-3 font-mono text-green-400">320-360°C</td>
            <td className="px-4 py-3 font-mono text-yellow-400">-0.8% XY</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">ASA</td>
            <td className="px-4 py-3 font-mono">320→600→1000→2000</td>
            <td className="px-4 py-3 font-mono text-orange-400">85-105°C</td>
            <td className="px-4 py-3 font-mono text-green-400">12-18min</td>
            <td className="px-4 py-3">UV-Resistant Ep</td>
            <td className="px-4 py-3 font-mono text-green-400">330-370°C</td>
            <td className="px-4 py-3 font-mono text-yellow-400">-0.7% XY</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">PETG</td>
            <td className="px-4 py-3 font-mono">400→800→1200→1500</td>
            <td className="px-4 py-3 font-mono text-red-400">Non recommend</td>
            <td className="px-4 py-3 text-yellow-400 font-mono">Partial (MEK)</td>
            <td className="px-4 py-3">Adhesion Prom</td>
            <td className="px-4 py-3 font-mono text-orange-400">250-290°C</td>
            <td className="px-4 py-3 font-mono text-green-400">-0.3% XY</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">TPU</td>
            <td className="px-4 py-3 font-mono">600→1000→1500→2000</td>
            <td className="px-4 py-3 font-mono text-red-400">Non applicable</td>
            <td className="px-4 py-3 text-red-400 font-mono">Non compatible</td>
            <td className="px-4 py-3">Flex Adhesive</td>
            <td className="px-4 py-3 font-mono text-red-400">Non applicable</td>
            <td className="px-4 py-3 font-mono text-green-400">-0.1% XY</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">PC (Policarbonato)</td>
            <td className="px-4 py-3 font-mono">400→800→1200→2000</td>
            <td className="px-4 py-3 font-mono text-orange-400">120-140°C</td>
            <td className="px-4 py-3 text-red-400 font-mono">Non compatible</td>
            <td className="px-4 py-3">High-Temp Ep</td>
            <td className="px-4 py-3 font-mono text-orange-400">380-420°C</td>
            <td className="px-4 py-3 font-mono text-orange-400">-1.2% XY</td>
          </tr>
          <tr className="hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">Nylon PA12</td>
            <td className="px-4 py-3 font-mono">600→1000→1500→2000</td>
            <td className="px-4 py-3 font-mono text-orange-400">160-180°C</td>
            <td className="px-4 py-3 text-red-400 font-mono">Non compatible</td>
            <td className="px-4 py-3">Metal Prep</td>
            <td className="px-4 py-3 font-mono text-red-400">400-450°C</td>
            <td className="px-4 py-3 font-mono text-red-400">-2.1% XY</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 text-xs text-gray-400">
        <p><strong>Fonti:</strong> ASTM D638/D790, Creality Research 2024, Stratasys Design Guidelines, FormFutura Technical Specs</p>
        <p><strong>Note:</strong> Levigatura sequenza progressiva. Annealing sotto sabbia. Insert = inserti filettati. Shrinkage = ritiro dimensionale post-trattamento.</p>
      </div>
    </div>
  );
};

// 3. Tabella Sicurezza & Strumenti - Equipment necessario, DPI, precauzioni per ogni tecnica
export const SafetyToolsTable: React.FC = () => {
  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
        <thead>
          <tr className="bg-gradient-to-r from-amber-600 to-amber-400">
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-amber-300">Tecnica</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-amber-300">DPI Richiesti</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-amber-300">Strumenti Base</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-amber-300">Ventilazione</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-amber-300">Rischi Principali</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-amber-300">Smaltimento</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-amber-300">Costo Setup €</th>
          </tr>
        </thead>
        <tbody className="text-gray-100">
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-amber-300">Levigatura Manuale</td>
            <td className="px-4 py-3">Occhiali, P2 Mask</td>
            <td className="px-4 py-3">Carte grana, vaschetta H2O</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-green-600 text-white rounded text-xs">Naturale OK</span></td>
            <td className="px-4 py-3">Microplastiche, abrasioni</td>
            <td className="px-4 py-3">Filtra H2O (5μm)</td>
            <td className="px-4 py-3 font-mono text-green-400">25-40</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-amber-300">Acetone Smoothing</td>
            <td className="px-4 py-3">A2 Mask, Guanti Nitrile</td>
            <td className="px-4 py-3">Container glass, hot plate</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-red-600 text-white rounded text-xs">Cappa + Esterno</span></td>
            <td className="px-4 py-3">Infiammabile LEL 2.5%</td>
            <td className="px-4 py-3">Centro solventi</td>
            <td className="px-4 py-3 font-mono text-orange-400">120-180</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-amber-300">XTC-3D Epossidico</td>
            <td className="px-4 py-3">Guanti Nitrile, P3 Mask</td>
            <td className="px-4 py-3">Bilancia, misurini, brush</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-600 text-white rounded text-xs">Ventilata</span></td>
            <td className="px-4 py-3">Sensibilizzante cutaneo</td>
            <td className="px-4 py-3">Rifiuti speciali</td>
            <td className="px-4 py-3 font-mono text-green-400">45-65</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-amber-300">Primer Verniciatura</td>
            <td className="px-4 py-3">P2 Mask, Guanti</td>
            <td className="px-4 py-3">Spray booth, compressore</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-600 text-white rounded text-xs">Ventilata</span></td>
            <td className="px-4 py-3">VOC, overspray</td>
            <td className="px-4 py-3">Raccolta vernici</td>
            <td className="px-4 py-3 font-mono text-orange-400">150-250</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-amber-300">Vibrofinitura</td>
            <td className="px-4 py-3">Cuffie 25dB, Occhiali</td>
            <td className="px-4 py-3">Tumbler, media ceramico</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-green-600 text-white rounded text-xs">Naturale OK</span></td>
            <td className="px-4 py-3">Rumore 75-85dB</td>
            <td className="px-4 py-3">Media riutilizzabile</td>
            <td className="px-4 py-3 font-mono text-red-400">180-350</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-amber-300">Annealing Termico</td>
            <td className="px-4 py-3">Guanti termici</td>
            <td className="px-4 py-3">Forno, sabbia, termometro</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-green-600 text-white rounded text-xs">Naturale OK</span></td>
            <td className="px-4 py-3">Ustioni, deformazioni</td>
            <td className="px-4 py-3">N/A</td>
            <td className="px-4 py-3 font-mono text-green-400">80-120</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-amber-300">Inserti Filettati</td>
            <td className="px-4 py-3">Occhiali protezione</td>
            <td className="px-4 py-3">Saldatore, inserti, pinze</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-green-600 text-white rounded text-xs">Naturale OK</span></td>
            <td className="px-4 py-3">Ustioni, fumi plastici</td>
            <td className="px-4 py-3">N/A</td>
            <td className="px-4 py-3 font-mono text-green-400">35-55</td>
          </tr>
          <tr className="hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-amber-300">Saldatura Chimica</td>
            <td className="px-4 py-3">A2 Mask, Guanti Nitrile</td>
            <td className="px-4 py-3">MEK/DCM, applicatori</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-red-600 text-white rounded text-xs">Cappa + Esterno</span></td>
            <td className="px-4 py-3">Neurotossico, cancerogeno</td>
            <td className="px-4 py-3">Centro solventi</td>
            <td className="px-4 py-3 font-mono text-red-400">200-300</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 text-xs text-gray-400">
        <p><strong>Fonti:</strong> OSHA Safety Guidelines, ECHA Chemical Database, UNI EN 149 DPI Standards, 3M Technical Documentation</p>
        <p><strong>Note:</strong> LEL = Lower Explosive Limit. Setup include DPI + strumenti base. Ventilazione: Naturale 0.5 ACH, Ventilata 6+ ACH, Cappa 100+ FPM.</p>
      </div>
    </div>
  );
};

export default { FinishingTechniquesTable, ProcessParametersTable, SafetyToolsTable }; 