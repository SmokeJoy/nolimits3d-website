import React from 'react';

// 1. Tabella Calibrazioni Klipper - Comandi, frequenza e parametri per ogni calibrazione
export const KlipperCalibrationsTable: React.FC = () => {
  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-blue-400">
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-blue-300">Calibrazione</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-blue-300">Comando Klipper</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-blue-300">Frequenza</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-blue-300">Durata</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-blue-300">Requisiti</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-blue-300">Parametri Target</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-blue-300">Criticità</th>
          </tr>
        </thead>
        <tbody className="text-gray-100">
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-blue-300">Z-Offset</td>
            <td className="px-4 py-3 font-mono text-green-400">PROBE_CALIBRATE</td>
            <td className="px-4 py-3">Ogni sostituzione ugello</td>
            <td className="px-4 py-3 font-mono">5-10min</td>
            <td className="px-4 py-3">Bed/Hotend caldi</td>
            <td className="px-4 py-3 font-mono">-0.1 a -0.4mm</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-red-600 text-white rounded text-xs">Critica</span></td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-blue-300">PID Hotend</td>
            <td className="px-4 py-3 font-mono text-green-400">PID_CALIBRATE HEATER=extruder TARGET=210</td>
            <td className="px-4 py-3">3-6 mesi</td>
            <td className="px-4 py-3 font-mono">15-20min</td>
            <td className="px-4 py-3">Raffreddamento OFF</td>
            <td className="px-4 py-3 font-mono">±1-2°C stabilità</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-orange-600 text-white rounded text-xs">Alta</span></td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-blue-300">PID Heated Bed</td>
            <td className="px-4 py-3 font-mono text-green-400">PID_CALIBRATE HEATER=heater_bed TARGET=60</td>
            <td className="px-4 py-3">6-12 mesi</td>
            <td className="px-4 py-3 font-mono">20-30min</td>
            <td className="px-4 py-3">Camera chiusa</td>
            <td className="px-4 py-3 font-mono">±0.5-1°C stabilità</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-orange-600 text-white rounded text-xs">Alta</span></td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-blue-300">Input Shaping</td>
            <td className="px-4 py-3 font-mono text-green-400">SHAPER_CALIBRATE</td>
            <td className="px-4 py-3">Dopo spostamenti</td>
            <td className="px-4 py-3 font-mono">5-8min</td>
            <td className="px-4 py-3">Accelerometro ADXL345</td>
            <td className="px-4 py-3 font-mono">20-60Hz shaper_freq</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-600 text-white rounded text-xs">Media</span></td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-blue-300">Pressure Advance</td>
            <td className="px-4 py-3 font-mono text-green-400">TUNING_TOWER COMMAND=SET_PRESSURE_ADVANCE</td>
            <td className="px-4 py-3">Per materiale</td>
            <td className="px-4 py-3 font-mono">30-45min</td>
            <td className="px-4 py-3">Test pattern Klipper</td>
            <td className="px-4 py-3 font-mono">0.02-0.1 PA value</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-600 text-white rounded text-xs">Media</span></td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-blue-300">Bed Mesh</td>
            <td className="px-4 py-3 font-mono text-green-400">BED_MESH_CALIBRATE</td>
            <td className="px-4 py-3">Mensile</td>
            <td className="px-4 py-3 font-mono">10-15min</td>
            <td className="px-4 py-3">Probe funzionante</td>
            <td className="px-4 py-3 font-mono">±0.05mm deviazione</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-orange-600 text-white rounded text-xs">Alta</span></td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-blue-300">Belt Tension</td>
            <td className="px-4 py-3 font-mono text-green-400">BELT_TENSION_CALIBRATE (plugin)</td>
            <td className="px-4 py-3">Settimanale</td>
            <td className="px-4 py-3 font-mono">3-5min</td>
            <td className="px-4 py-3">Accelerometro</td>
            <td className="px-4 py-3 font-mono">110-130Hz GT2</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-yellow-600 text-white rounded text-xs">Media</span></td>
          </tr>
          <tr className="hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-blue-300">Stepper Buzz</td>
            <td className="px-4 py-3 font-mono text-green-400">STEPPER_BUZZ STEPPER=stepper_x</td>
            <td className="px-4 py-3">On-demand</td>
            <td className="px-4 py-3 font-mono">30sec</td>
            <td className="px-4 py-3">Motori abilitati</td>
            <td className="px-4 py-3 font-mono">Movimento 1mm preciso</td>
            <td className="px-4 py-3"><span className="px-2 py-1 bg-green-600 text-white rounded text-xs">Bassa</span></td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 text-xs text-gray-400">
        <p><strong>Fonti:</strong> Klipper Documentation GitHub 2024, Voron Design Manual, Ellis3DP Testing Procedures</p>
        <p><strong>Note:</strong> Frequenze indicative per uso hobbistico. Ambienti produttivi richiedono intervalli più stretti. TARGET temperature dipendono dal materiale utilizzato.</p>
      </div>
    </div>
  );
};

// 2. Tabella Diagnostica Hardware - Componenti, segnali di usura e metriche di monitoraggio
export const HardwareDiagnosticsTable: React.FC = () => {
  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
        <thead>
          <tr className="bg-gradient-to-r from-green-600 to-green-400">
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-green-300">Componente</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-green-300">Metrica di Controllo</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-green-300">Comando Klipper</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-green-300">Valori Normali</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-green-300">Segnali di Usura</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-green-300">Vita Utile</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-green-300">Azione</th>
          </tr>
        </thead>
        <tbody className="text-gray-100">
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-green-300">Ugello Ottone</td>
            <td className="px-4 py-3">Diametro estrusione</td>
            <td className="px-4 py-3 font-mono text-cyan-400">QUERY_FILAMENT_WIDTH (se disponibile)</td>
            <td className="px-4 py-3 font-mono">0.4mm ±0.02</td>
            <td className="px-4 py-3">Sotto-estrusione, linee irregolari</td>
            <td className="px-4 py-3 font-mono text-orange-400">200-500g PLA</td>
            <td className="px-4 py-3">Sostituire ugello</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-green-300">Ventola Hotend</td>
            <td className="px-4 py-3">RPM / Rumore</td>
            <td className="px-4 py-3 font-mono text-cyan-400">M106 / GET_TEMP_SENSORS</td>
            <td className="px-4 py-3 font-mono">6000-8000 RPM</td>
            <td className="px-4 py-3">Rumore, vibrazione, surriscaldamento</td>
            <td className="px-4 py-3 font-mono text-yellow-400">8000-12000h</td>
            <td className="px-4 py-3">Sostituire ventola</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-green-300">Cinghie GT2</td>
            <td className="px-4 py-3">Tensione (Hz)</td>
            <td className="px-4 py-3 font-mono text-cyan-400">BELT_TENSION_CALIBRATE</td>
            <td className="px-4 py-3 font-mono">110-130Hz</td>
            <td className="px-4 py-3">Layer shift, banding, rumore</td>
            <td className="px-4 py-3 font-mono text-yellow-400">2000-5000h</td>
            <td className="px-4 py-3">Ritensionare/sostituire</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-green-300">Cuscinetti Lineari</td>
            <td className="px-4 py-3">Resistenza movimento</td>
            <td className="px-4 py-3 font-mono text-cyan-400">STEPPER_BUZZ / Manuale</td>
            <td className="px-4 py-3 font-mono">Movimento fluido</td>
            <td className="px-4 py-3">Grippaggio, rumore metallico</td>
            <td className="px-4 py-3 font-mono text-green-400">10000-15000h</td>
            <td className="px-4 py-3">Lubrificare/sostituire</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-green-300">Probe BLTouch</td>
            <td className="px-4 py-3">Ripetibilità Z</td>
            <td className="px-4 py-3 font-mono text-cyan-400">PROBE_ACCURACY</td>
            <td className="px-4 py-3 font-mono">±0.005mm</td>
            <td className="px-4 py-3">Dispersione &gt;0.02mm, errori</td>
            <td className="px-4 py-3 font-mono text-yellow-400">5000-8000h</td>
            <td className="px-4 py-3">Pulire/calibrare/sostituire</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-green-300">Termistori</td>
            <td className="px-4 py-3">Resistenza (Ω)</td>
            <td className="px-4 py-3 font-mono text-cyan-400">GET_TEMP_SENSORS</td>
            <td className="px-4 py-3 font-mono">100kΩ @25°C</td>
            <td className="px-4 py-3">Temperature errate, oscillazioni</td>
            <td className="px-4 py-3 font-mono text-green-400">15000+h</td>
            <td className="px-4 py-3">Verificare connessioni</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-green-300">Stepper Motors</td>
            <td className="px-4 py-3">Temperatura / Corrente</td>
            <td className="px-4 py-3 font-mono text-cyan-400">QUERY_ADC / GET_TEMP_SENSORS</td>
            <td className="px-4 py-3 font-mono">≤60°C housing</td>
            <td className="px-4 py-3">Surriscaldamento, perdita passi</td>
            <td className="px-4 py-3 font-mono text-green-400">20000+h</td>
            <td className="px-4 py-3">Ridurre corrente/raffreddare</td>
          </tr>
          <tr className="hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-green-300">PSU / MCU</td>
            <td className="px-4 py-3">Temperatura / Voltaggio</td>
            <td className="px-4 py-3 font-mono text-cyan-400">QUERY_ADC</td>
            <td className="px-4 py-3 font-mono">24V ±5%, ≤70°C</td>
            <td className="px-4 py-3">Instabilità, thermal shutdown</td>
            <td className="px-4 py-3 font-mono text-green-400">50000+h</td>
            <td className="px-4 py-3">Verificare alimentazione</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 text-xs text-gray-400">
        <p><strong>Fonti:</strong> Klipper Configuration Reference, Voron Maintenance Guide, RepRap Community Wiki, TMC Datasheet</p>
        <p><strong>Note:</strong> Vita utile stimata per uso hobbistico standard. Uso intensivo riduce significativamente i tempi. Temperature ambiente &gt;35°C accelerano l'usura.</p>
      </div>
    </div>
  );
};

// 3. Tabella Configurazioni Firmware - Impostazioni critiche, valori raccomandati e troubleshooting
export const FirmwareConfigTable: React.FC = () => {
  return (
    <div className="overflow-x-auto my-8">
      <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
        <thead>
          <tr className="bg-gradient-to-r from-purple-600 to-purple-400">
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-purple-300">Sezione Config</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-purple-300">Parametro Critico</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-purple-300">Valore Raccomandato</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-purple-300">Impatto Performance</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-purple-300">Problema Comune</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-purple-300">Sintomo Errore</th>
            <th className="px-4 py-3 text-left text-white font-semibold border-b border-purple-300">Fix</th>
          </tr>
        </thead>
        <tbody className="text-gray-100">
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">[printer]</td>
            <td className="px-4 py-3 font-mono">max_velocity</td>
            <td className="px-4 py-3 font-mono text-green-400">300-500 mm/s</td>
            <td className="px-4 py-3">Velocità massima travel</td>
            <td className="px-4 py-3">Troppo alta causa skip</td>
            <td className="px-4 py-3">Layer shift, rumore</td>
            <td className="px-4 py-3">Ridurre gradualmente</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">[extruder]</td>
            <td className="px-4 py-3 font-mono">pressure_advance</td>
            <td className="px-4 py-3 font-mono text-green-400">0.02-0.08</td>
            <td className="px-4 py-3">Qualità angoli/superfici</td>
            <td className="px-4 py-3">Valore non calibrato</td>
            <td className="px-4 py-3">Blob, under-extrusion</td>
            <td className="px-4 py-3">TUNING_TOWER test</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">[tmc2209]</td>
            <td className="px-4 py-3 font-mono">run_current</td>
            <td className="px-4 py-3 font-mono text-green-400">0.6-1.0A</td>
            <td className="px-4 py-3">Coppia vs surriscaldamento</td>
            <td className="px-4 py-3">Corrente eccessiva</td>
            <td className="px-4 py-3">Stepper surriscaldati</td>
            <td className="px-4 py-3">Ridurre run_current</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">[input_shaper]</td>
            <td className="px-4 py-3 font-mono">shaper_freq_x/y</td>
            <td className="px-4 py-3 font-mono text-green-400">20-60Hz</td>
            <td className="px-4 py-3">Eliminazione ringing</td>
            <td className="px-4 py-3">Frequenza errata</td>
            <td className="px-4 py-3">Ghosting, linee ondulate</td>
            <td className="px-4 py-3">SHAPER_CALIBRATE</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">[heater_bed]</td>
            <td className="px-4 py-3 font-mono">max_power</td>
            <td className="px-4 py-3 font-mono text-green-400">0.8-1.0</td>
            <td className="px-4 py-3">Velocità riscaldamento</td>
            <td className="px-4 py-3">Overshoot temperatura</td>
            <td className="px-4 py-3">PID instabile, warping</td>
            <td className="px-4 py-3">PID_CALIBRATE + max_power</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">[probe]</td>
            <td className="px-4 py-3 font-mono">z_offset</td>
            <td className="px-4 py-3 font-mono text-green-400">-0.1 a -0.4mm</td>
            <td className="px-4 py-3">Adesione primo layer</td>
            <td className="px-4 py-3">Offset non calibrato</td>
            <td className="px-4 py-3">Primo layer fallito</td>
            <td className="px-4 py-3">PROBE_CALIBRATE</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">[bed_mesh]</td>
            <td className="px-4 py-3 font-mono">mesh_min/max</td>
            <td className="px-4 py-3 font-mono text-green-400">Area stampabile</td>
            <td className="px-4 py-3">Copertura compensazione</td>
            <td className="px-4 py-3">Area troppo ampia</td>
            <td className="px-4 py-3">Errore probe fuori limite</td>
            <td className="px-4 py-3">Ridurre area mesh</td>
          </tr>
          <tr className="hover:bg-gray-800 transition-colors">
            <td className="px-4 py-3 font-medium text-purple-300">[gcode_macro]</td>
            <td className="px-4 py-3 font-mono">PRINT_START</td>
            <td className="px-4 py-3 font-mono text-green-400">Sequenza standardizzata</td>
            <td className="px-4 py-3">Affidabilità stampe</td>
            <td className="px-4 py-3">Macro incomplete</td>
            <td className="px-4 py-3">Stampe fallite, inconsistenti</td>
            <td className="px-4 py-3">Implementare macro complete</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 text-xs text-gray-400">
        <p><strong>Fonti:</strong> Klipper Configuration Reference 2024, Voron Community Best Practices, Ellis3DP Print Tuning Guide</p>
        <p><strong>Note:</strong> Valori indicativi per stampanti CoreXY. Cartesiane e Delta richiedono adattamenti. Sempre fare backup prima di modificare printer.cfg.</p>
      </div>
    </div>
  );
};

export default { KlipperCalibrationsTable, HardwareDiagnosticsTable, FirmwareConfigTable }; 