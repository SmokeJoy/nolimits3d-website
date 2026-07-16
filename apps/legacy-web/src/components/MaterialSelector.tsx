import React, { useState, useMemo } from 'react';
import { 
  FunnelIcon, 
  BeakerIcon, 
  FireIcon, 
  ShieldCheckIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface Material {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: 'standard' | 'technical' | 'flexible' | 'composite';
  properties: {
    heatResistance: number; // °C
    flexibility: number; // 1-10 scale
    strength: number; // 1-10 scale
    printability: number; // 1-10 scale
    chemicalResistance: number; // 1-10 scale
    foodSafe: boolean;
    biodegradable: boolean;
  };
  applications: string[];
  colors: string[];
  pricePerKg: { min: number; max: number };
  printSettings: {
    nozzleTemp: string;
    bedTemp: string;
    speed: string;
  };
  pros: string[];
  cons: string[];
}

const materials: Material[] = [
  {
    id: 'pla',
    name: 'PLA (Acido Polilattico)',
    shortName: 'PLA',
    description: 'Materiale biodegradabile ideale per prototipi, modelli e oggetti decorativi. Facile da stampare.',
    category: 'standard',
    properties: {
      heatResistance: 60,
      flexibility: 2,
      strength: 6,
      printability: 9,
      chemicalResistance: 4,
      foodSafe: true,
      biodegradable: true
    },
    applications: ['Prototipi estetici', 'Modelli architettonici', 'Gadget', 'Oggetti decorativi', 'Miniature'],
    colors: ['Bianco', 'Nero', 'Rosso', 'Blu', 'Verde', 'Giallo', 'Arancione', 'Trasparente'],
    pricePerKg: { min: 18, max: 25 },
    printSettings: {
      nozzleTemp: '190-220°C',
      bedTemp: '50-60°C',
      speed: '50-80 mm/s'
    },
    pros: ['Facile da stampare', 'Biodegradabile', 'Ampia gamma colori', 'Inodore', 'Food-safe'],
    cons: ['Bassa resistenza termica', 'Rigido', 'Sensibile UV']
  },
  {
    id: 'abs',
    name: 'ABS (Acrilonitrile Butadiene Stirene)',
    shortName: 'ABS',
    description: 'Materiale resistente e durevole, ideale per parti funzionali e componenti meccanici.',
    category: 'standard',
    properties: {
      heatResistance: 100,
      flexibility: 4,
      strength: 8,
      printability: 6,
      chemicalResistance: 7,
      foodSafe: false,
      biodegradable: false
    },
    applications: ['Componenti automotive', 'Parti meccaniche', 'Custodie elettroniche', 'Attrezzi', 'Prototipi funzionali'],
    colors: ['Nero', 'Bianco', 'Rosso', 'Blu', 'Grigio'],
    pricePerKg: { min: 20, max: 30 },
    printSettings: {
      nozzleTemp: '230-260°C',
      bedTemp: '80-100°C',
      speed: '40-60 mm/s'
    },
    pros: ['Resistente agli urti', 'Buona resistenza termica', 'Lavorabile post-stampa', 'Durevole'],
    cons: ['Odore durante stampa', 'Warping', 'Servono supporti']
  },
  {
    id: 'petg',
    name: 'PETG (Polietilene Tereftalato Glicolato)',
    shortName: 'PETG',
    description: 'Combinazione perfetta di facilità di stampa PLA e resistenza ABS. Trasparente e chimicamente resistente.',
    category: 'standard',
    properties: {
      heatResistance: 80,
      flexibility: 5,
      strength: 7,
      printability: 8,
      chemicalResistance: 8,
      foodSafe: true,
      biodegradable: false
    },
    applications: ['Contenitori', 'Parti trasparenti', 'Prototipi funzionali', 'Componenti chimici', 'Imballaggi'],
    colors: ['Trasparente', 'Nero', 'Bianco', 'Blu', 'Verde'],
    pricePerKg: { min: 25, max: 35 },
    printSettings: {
      nozzleTemp: '220-250°C',
      bedTemp: '70-80°C',
      speed: '40-60 mm/s'
    },
    pros: ['Trasparente', 'Chemical resistant', 'Food-safe', 'Facile da stampare', 'Forte'],
    cons: ['Può stringing', 'Sensibile velocità', 'Più costoso del PLA']
  },
  {
    id: 'tpu',
    name: 'TPU (Poliuretano Termoplastico)',
    shortName: 'TPU',
    description: 'Materiale flessibile e gommoso, ideale per guarnizioni, supporti ammortizzanti e oggetti flessibili.',
    category: 'flexible',
    properties: {
      heatResistance: 70,
      flexibility: 9,
      strength: 6,
      printability: 4,
      chemicalResistance: 6,
      foodSafe: false,
      biodegradable: false
    },
    applications: ['Guarnizioni', 'Coperture protettive', 'Suole scarpe', 'Supporti ammortizzanti', 'Braccialetti'],
    colors: ['Nero', 'Bianco', 'Rosso', 'Blu', 'Trasparente'],
    pricePerKg: { min: 35, max: 50 },
    printSettings: {
      nozzleTemp: '210-230°C',
      bedTemp: '50-60°C',
      speed: '20-40 mm/s'
    },
    pros: ['Molto flessibile', 'Resistente abrasione', 'Ammortizzante', 'Durevole'],
    cons: ['Difficile da stampare', 'Lento', 'Supporti difficili', 'Costoso']
  },
  {
    id: 'nylon',
    name: 'Nylon PA12',
    shortName: 'Nylon',
    description: 'Materiale tecnico ad alta resistenza meccanica e chimica. Ideale per ingranaggi e componenti industriali.',
    category: 'technical',
    properties: {
      heatResistance: 180,
      flexibility: 6,
      strength: 9,
      printability: 3,
      chemicalResistance: 9,
      foodSafe: false,
      biodegradable: false
    },
    applications: ['Ingranaggi', 'Cuscinetti', 'Componenti automotive', 'Parti industriali', 'Attrezzi'],
    colors: ['Naturale', 'Nero', 'Bianco'],
    pricePerKg: { min: 40, max: 60 },
    printSettings: {
      nozzleTemp: '250-270°C',
      bedTemp: '80-100°C',
      speed: '30-50 mm/s'
    },
    pros: ['Resistentissimo', 'Flessibile', 'Chemical resistant', 'Autolubrificante'],
    cons: ['Difficile da stampare', 'Assorbe umidità', 'Costoso', 'Warping']
  },
  {
    id: 'carbon-fiber',
    name: 'Carbon Fiber PETG',
    shortName: 'Carbon Fiber',
    description: 'Materiale composito con fibre di carbonio. Leggerezza e rigidità per applicazioni aerospace e automotive.',
    category: 'composite',
    properties: {
      heatResistance: 85,
      flexibility: 3,
      strength: 9,
      printability: 5,
      chemicalResistance: 7,
      foodSafe: false,
      biodegradable: false
    },
    applications: ['Droni', 'Componenti automotive', 'Parti aerospace', 'Strutture leggere', 'Strumenti'],
    colors: ['Nero Carbon', 'Grigio Carbon'],
    pricePerKg: { min: 60, max: 120 },
    printSettings: {
      nozzleTemp: '240-260°C',
      bedTemp: '70-80°C',
      speed: '30-50 mm/s'
    },
    pros: ['Leggerissimo', 'Rigidissimo', 'Aspetto premium', 'Conduttivo'],
    cons: ['Molto costoso', 'Abrasivo per nozzle', 'Difficile post-process', 'Supporti complessi']
  }
];

const MaterialSelector: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filters, setFilters] = useState({
    minHeatResistance: 0,
    minStrength: 0,
    foodSafe: false,
    biodegradable: false,
    maxPrice: 200
  });
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const filteredMaterials = useMemo(() => {
    return materials.filter(material => {
      const categoryMatch = selectedCategory === 'all' || material.category === selectedCategory;
      const heatMatch = material.properties.heatResistance >= filters.minHeatResistance;
      const strengthMatch = material.properties.strength >= filters.minStrength;
      const foodSafeMatch = !filters.foodSafe || material.properties.foodSafe;
      const biodegradableMatch = !filters.biodegradable || material.properties.biodegradable;
      const priceMatch = material.pricePerKg.min <= filters.maxPrice;

      return categoryMatch && heatMatch && strengthMatch && foodSafeMatch && biodegradableMatch && priceMatch;
    });
  }, [selectedCategory, filters]);

  const toggleCompare = (materialId: string) => {
    setCompareList(prev => {
      if (prev.includes(materialId)) {
        return prev.filter(id => id !== materialId);
      } else if (prev.length < 3) {
        return [...prev, materialId];
      }
      return prev;
    });
  };

  const getPropertyColor = (value: number, max: number = 10) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const PropertyBar: React.FC<{ label: string; value: number; max?: number; unit?: string }> = ({ 
    label, value, max = 10, unit = '' 
  }) => (
    <div className="mb-2">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{label}</span>
        <span className="font-medium text-white">{value}{unit}</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${getPropertyColor(value, max)}`}
          style={{ width: `${(value / max) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Material Selector Interattivo
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Trova il materiale perfetto per il tuo progetto. Filtra per proprietà, confronta materiali e ottieni tutti i dettagli tecnici.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-lg shadow-lg p-6 mb-8 border border-slate-700">
        <div className="flex items-center mb-4">
          <FunnelIcon className="h-6 w-6 text-blue-400 mr-2" />
          <h2 className="text-xl font-bold text-white">Filtri</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Categoria</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-slate-600 rounded-md px-3 py-2 bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tutti</option>
              <option value="standard">Standard</option>
              <option value="technical">Tecnici</option>
              <option value="flexible">Flessibili</option>
              <option value="composite">Compositi</option>
            </select>
          </div>

          {/* Heat Resistance */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Resistenza Termica (min {filters.minHeatResistance}°C)
            </label>
            <input
              type="range"
              min="0"
              max="200"
              step="10"
              value={filters.minHeatResistance}
              onChange={(e) => setFilters(prev => ({...prev, minHeatResistance: parseInt(e.target.value)}))}
              className="w-full"
            />
          </div>

          {/* Strength */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Resistenza Meccanica (min {filters.minStrength}/10)
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={filters.minStrength}
              onChange={(e) => setFilters(prev => ({...prev, minStrength: parseInt(e.target.value)}))}
              className="w-full"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Prezzo Max (€{filters.maxPrice}/kg)
            </label>
            <input
              type="range"
              min="20"
              max="200"
              step="10"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({...prev, maxPrice: parseInt(e.target.value)}))}
              className="w-full"
            />
          </div>
        </div>

        {/* Boolean Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.foodSafe}
              onChange={(e) => setFilters(prev => ({...prev, foodSafe: e.target.checked}))}
              className="mr-2"
            />
            <span className="text-sm text-gray-200">Solo Food-Safe</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.biodegradable}
              onChange={(e) => setFilters(prev => ({...prev, biodegradable: e.target.checked}))}
              className="mr-2"
            />
            <span className="text-sm text-gray-200">Solo Biodegradabili</span>
          </label>
        </div>
      </div>

      {/* Compare Bar */}
      {compareList.length > 0 && (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ArrowsRightLeftIcon className="h-5 w-5 text-blue-400 mr-2" />
              <span className="font-medium text-white">
                Confronto ({compareList.length}/3): {compareList.map(id => materials.find(m => m.id === id)?.shortName).join(', ')}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowComparison(true)}
                disabled={compareList.length < 2}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Confronta
              </button>
              <button
                onClick={() => setCompareList([])}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredMaterials.map((material) => (
          <div key={material.id} className="bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{material.shortName}</h3>
                  <p className="text-blue-100 text-sm">{material.name}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold">€{material.pricePerKg.min}-{material.pricePerKg.max}</span>
                  <p className="text-blue-100 text-sm">/kg</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-gray-300 text-sm mb-4">{material.description}</p>

              {/* Properties */}
              <div className="mb-4">
                <PropertyBar label="Resist. Termica" value={material.properties.heatResistance} max={200} unit="°C" />
                <PropertyBar label="Flessibilità" value={material.properties.flexibility} />
                <PropertyBar label="Resistenza" value={material.properties.strength} />
                <PropertyBar label="Stampabilità" value={material.properties.printability} />
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {material.properties.foodSafe && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Food-Safe</span>
                )}
                {material.properties.biodegradable && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Biodegradabile</span>
                )}
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  {material.colors.length} colori
                </span>
              </div>

              {/* Applications */}
              <div className="mb-4">
                <h4 className="font-medium text-white mb-2">Applicazioni:</h4>
                <div className="flex flex-wrap gap-1">
                  {material.applications.slice(0, 3).map((app, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {app}
                    </span>
                  ))}
                  {material.applications.length > 3 && (
                    <span className="text-blue-600 text-xs">+{material.applications.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleCompare(material.id)}
                  className={`flex-1 px-3 py-2 rounded-md text-sm font-medium ${
                    compareList.includes(material.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-gray-200 hover:bg-slate-600'
                  }`}
                  disabled={!compareList.includes(material.id) && compareList.length >= 3}
                >
                  {compareList.includes(material.id) ? 'Rimuovi' : 'Confronta'}
                </button>
                <button className="px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                  Richiedi Preventivo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Modal */}
      {showComparison && compareList.length >= 2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg max-w-6xl w-full max-h-screen overflow-y-auto border border-slate-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Confronto Materiali</h2>
                <button
                  onClick={() => setShowComparison(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {compareList.map(materialId => {
                  const material = materials.find(m => m.id === materialId)!;
                  return (
                    <div key={materialId} className="border border-slate-600 rounded-lg p-4 bg-slate-700">
                      <h3 className="text-lg font-bold text-white mb-2">{material.shortName}</h3>
                      <p className="text-sm text-gray-300 mb-4">{material.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <PropertyBar label="Resist. Termica" value={material.properties.heatResistance} max={200} unit="°C" />
                        <PropertyBar label="Flessibilità" value={material.properties.flexibility} />
                        <PropertyBar label="Resistenza" value={material.properties.strength} />
                        <PropertyBar label="Stampabilità" value={material.properties.printability} />
                        <PropertyBar label="Resist. Chimica" value={material.properties.chemicalResistance} />
                      </div>

                      <div className="text-sm space-y-1 text-gray-300">
                        <div className="flex justify-between">
                          <span>Prezzo:</span>
                          <span className="font-medium text-white">€{material.pricePerKg.min}-{material.pricePerKg.max}/kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Food-Safe:</span>
                          <span>{material.properties.foodSafe ? '✅' : '❌'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Biodegradabile:</span>
                          <span>{material.properties.biodegradable ? '✅' : '❌'}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium text-sm mb-2">Vantaggi:</h4>
                        <ul className="text-xs text-green-700 space-y-1">
                          {material.pros.slice(0, 3).map((pro, index) => (
                            <li key={index}>• {pro}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium text-sm mb-2">Svantaggi:</h4>
                        <ul className="text-xs text-red-700 space-y-1">
                          {material.cons.slice(0, 3).map((con, index) => (
                            <li key={index}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <BeakerIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun materiale trovato</h3>
          <p className="text-gray-600">Prova a modificare i filtri per vedere più opzioni.</p>
        </div>
      )}
    </div>
  );
};

export default MaterialSelector; 