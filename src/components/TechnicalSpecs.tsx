import React from 'react';
import { Settings, Layers, Ruler, Thermometer, Clock, Palette } from 'lucide-react';

const TechnicalSpecs: React.FC = () => {
  const specifications = [
    {
      category: "Tecnologia di Stampa",
      icon: <Settings className="w-6 h-6 text-blue-500" />,
      specs: [
        { label: "Tecnologia", value: "FDM (Fused Deposition Modeling)" },
        { label: "Layer Height", value: "0.1mm - 0.3mm" },
        { label: "Precisione Dimensionale", value: "±0.1mm" },
        { label: "Velocità Massima", value: "Fino a 600 mm/s (Creality K1)" }
      ]
    },
    {
      category: "Parco Macchine",
      icon: <Settings className="w-6 h-6 text-purple-500" />,
      specs: [
        { label: "Anycubic Kobra 3 Combo", value: "25×25×30 cm, fino a 8 materiali" },
        { label: "Creality K1", value: "22×22×22 cm, alta velocità 600mm/s" },
        { label: "ACE Pro Multicolore", value: "25×25×30 cm, sistema HueForge" },
        { label: "Creality Ender 3 V3", value: "22×22×25 cm, direct drive" }
      ]
    },
    {
      category: "Materiali Supportati",
      icon: <Palette className="w-6 h-6 text-green-500" />,
      specs: [
        { label: "PLA Professionale", value: "Biodegradabile, alta precisione" },
        { label: "PETG Food-Safe", value: "Certificato contatto alimentare" },
        { label: "ASA Resistente UV", value: "Per esterni, alta resistenza" },
        { label: "TPU Flessibile", value: "Shore A 95, elastomero tecnico" }
      ]
    },
    {
      category: "Caratteristiche Avanzate",
      icon: <Ruler className="w-6 h-6 text-orange-500" />,
      specs: [
        { label: "Stampa Multicolore", value: "Fino a 8 colori/materiali (ACE Pro)" },
        { label: "Auto-livellamento", value: "Tutte le macchine con sensori precisi" },
        { label: "Monitoraggio Remoto", value: "Telecamere per controllo real-time" },
        { label: "Recupero Stampa", value: "Continuazione dopo interruzioni" }
      ]
    },
    {
      category: "Parametri Termici",
      icon: <Thermometer className="w-6 h-6 text-red-500" />,
      specs: [
        { label: "PLA", value: "190-220°C, piatto 60°C" },
        { label: "PETG", value: "220-240°C, piatto 80°C" },
        { label: "ASA", value: "240-260°C, piatto 100°C" },
        { label: "TPU", value: "210-230°C, piatto 60°C" }
      ]
    },
    {
      category: "Tempi e Consegne",
      icon: <Clock className="w-6 h-6 text-indigo-500" />,
      specs: [
        { label: "Prototipi Semplici", value: "24-48 ore" },
        { label: "Progetti Multicolore", value: "48-72 ore" },
        { label: "Progetti Complessi", value: "3-5 giorni lavorativi" },
        { label: "Consegna Ciociaria", value: "GRATUITA sopra 20€" }
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

  return (
    <section id="specifiche" className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Specifiche Tecniche
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

        {/* Material Properties Table */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Proprietà Comparative dei Materiali
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Materiale</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Resistenza</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Flessibilità</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Temp. Max</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">Applicazioni</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 font-medium text-green-600">PLA</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Media</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Rigido</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">60°C</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Prototipi, modelli decorativi</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 font-medium text-purple-600">PETG</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Alta</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Medio</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">80°C</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Food-safe, trasparenti</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 font-medium text-blue-600">ASA</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Molto Alta</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Medio</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">100°C</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Esterni, resistenza UV</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-orange-600">TPU</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Media</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Flessibile</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">80°C</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Guarnizioni, custodie</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Hai un progetto specifico in mente?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Discutiamo insieme le specifiche tecniche e troviamo la soluzione ottimale
          </p>
          <a
            href="#preventivo"
            className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            🚀 Richiedi Preventivo Tecnico
          </a>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecs; 