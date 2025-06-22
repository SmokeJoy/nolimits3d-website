import React from 'react';
import { Settings, Printer, FlaskRound, Stars, Thermometer, Truck } from 'lucide-react';

const TechnicalSpecs: React.FC = () => {
  const specifications = [
    {
      category: "Tecnologia di Stampa",
      icon: <Settings className="w-6 h-6 text-blue-500" />,
      specs: [
        { label: "Tecnologia", value: "FDM (Fused Deposition Modeling)" },
        { label: "Layer Height", value: "0.05 mm – 0.30 mm" },
        { label: "Precisione Dimensionale", value: "±0.10 mm" },
        { label: "Velocità Massima", value: "fino a 600 mm/s (Creality K1)" }
      ]
    },
    {
      category: "Parco Macchine",
      icon: <Printer className="w-6 h-6 text-purple-500" />,
      specs: [
        { label: "Creality K1", value: "22 × 22 × 25 cm, 600 mm/s, Core XY" },
        { label: "Anycubic Kobra 3 Combo", value: "25 × 25 × 30 cm, multicolore fino a 8 materiali, 600 mm/s" },
        { label: "+ 2× ACE Pro", value: "Sistema multicolore avanzato" }
      ]
    },
    {
      category: "Materiali Supportati",
      icon: <FlaskRound className="w-6 h-6 text-green-500" />,
      specs: [
        { label: "PLA Pro", value: "biodegradabile, alta precisione" },
        { label: "PETG Trasparente", value: "elevata resistenza chimica" },
        { label: "ASA UV-Resistant", value: "per esterni, alta resistenza" },
        { label: "TPU 95A", value: "elastomero tecnico" }
      ]
    },
    {
      category: "Caratteristiche Avanzate",
      icon: <Stars className="w-6 h-6 text-orange-500" />,
      specs: [
        { label: "Multicolore", value: "fino a 8 colori/materiali (ACE Pro)" },
        { label: "Auto-livellamento", value: "sensori di precisione su entrambe le macchine" },
        { label: "Monitoraggio remoto", value: "webcam + controllo real-time (Mainsail/Fluidd)" },
        { label: "Recupero stampa", value: "continua dopo interruzioni di corrente" }
      ]
    },
    {
      category: "Parametri Termici",
      icon: <Thermometer className="w-6 h-6 text-red-500" />,
      specs: [
        { label: "PLA", value: "190 – 220 °C, piatto 60 °C" },
        { label: "PETG", value: "220 – 250 °C, piatto 80 °C" },
        { label: "ASA", value: "240 – 260 °C, piatto 100 °C" },
        { label: "TPU", value: "210 – 230 °C, piatto 60 °C" }
      ]
    },
    {
      category: "Tempi e Consegne",
      icon: <Truck className="w-6 h-6 text-indigo-500" />,
      specs: [
        { label: "Prototipi semplici", value: "24 – 48 h" },
        { label: "Progetti multicolore", value: "48 – 72 h" },
        { label: "Progetti complessi", value: "3 – 5 gg lavorativi" },
        { label: "Consegna in Ciociaria", value: "GRATUITA > 20 €" }
      ]
    }
  ];

  const qualityFeatures = [
    {
      title: "Controllo Qualità",
      description: "Ogni stampa viene ispezionata per verificare precisione dimensionale e qualità superficiale",
      icon: "🔍"
    },
    {
      title: "Materiali Certificati",
      description: "Utilizziamo solo filamenti di prima qualità con certificazioni per applicazioni specifiche",
      icon: "✅"
    },
    {
      title: "Calibrazione Precisa",
      description: "Stampanti calibrate professionalmente per garantire ripetibilità e precisione",
      icon: "⚙️"
    },
    {
      title: "Test di Stampa",
      description: "Ogni nuovo progetto viene testato per ottimizzare parametri e qualità finale",
      icon: "🧪"
    }
  ];

  const softwareTools = [
    {
      name: "AutoCAD",
      purpose: "Progettazione Parametrica / CAD",
      description: "File STEP / STL di precisione"
    },
    {
      name: "HueForge",
      purpose: "Arte Multicolore & Lithophane", 
      description: "Palette e sfumature FDM"
    },
    {
      name: "Blender",
      purpose: "Modellazione Organica",
      description: "Servizio esterno specializzato"
    },
    {
      name: "ZBrush",
      purpose: "Scultura Digitale",
      description: "Partnership con modellatori professionali"
    }
  ];

  return (
    <section id="specifiche" className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ⚙️ Specifiche Tecniche (2025)
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dettagli tecnici completi sui nostri processi di stampa 3D FDM professionale.
            <span className="text-green-600 dark:text-green-400 font-bold"> Precisione e qualità garantite.</span>
          </p>
        </div>

        {/* Technical Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {specifications.map((category, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {category.icon}
                <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {category.category}
                </h3>
              </div>
              <div className="space-y-3">
                {category.specs.map((spec, specIndex) => (
                  <div key={specIndex} className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex-1">
                      {spec.label}:
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white font-semibold flex-1 text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Software & Modellazione */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            🛠️ Software & Modellazione
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {softwareTools.map((tool, index) => (
              <div key={index} className="text-center">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {tool.name}
                </h4>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-1">
                  {tool.purpose}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Backup Importante:</strong> Ricorda di fare backup di printer.cfg dopo ogni calibrazione (PID, Input Shaper) — è la "carta d'identità" della macchina.
            </p>
          </div>
        </div>

        {/* Quality Features */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Standard di Qualità Professionale
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default TechnicalSpecs; 