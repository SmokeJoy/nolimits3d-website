import React from 'react';
import { CheckCircle, Zap, Palette, HeadsetIcon, Shield, Award } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Services: React.FC = () => {
  const features = [
    {
      title: "Prototipazione Professionale Frosinone",
      description: "Trasforma i tuoi concept in prototipi funzionali con la massima precisione. Dalla modellazione 3D alla stampa finale, realizziamo prototipi per industria, startup e privati.",
      icon: <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
    },
    {
      title: "Componenti Tecnici su Misura",
      description: "Realizziamo componenti tecnici specializzati per ogni settore: ricambi meccanici, parti di precisione, housing elettronici e soluzioni ingegneristiche personalizzate.",
      icon: <Zap className="w-10 h-10 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Regali Personalizzati Unici",
      description: "Crea il regalo perfetto e unico! Oggetti personalizzati che lasceranno tutti a bocca aperta per originalità. La stampa 3D Frosinone che sorprende.",
      icon: <Palette className="w-10 h-10 text-purple-600 dark:text-purple-400" />
    },
    {
      title: "Consulenza Tecnica Specializzata",
      description: "Non sai come realizzare la tua idea? I nostri esperti in stampa 3D ti guidano dalla progettazione alla realizzazione finale, ottimizzando ogni parametro.",
      icon: <HeadsetIcon className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: "Materiali Certificati Premium",
      description: "Solo materiali premium PLA, ABS, PETG, TPU per componenti resistenti e duraturi. Certificazioni per uso alimentare, medicale e industriale disponibili.",
      icon: <Shield className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
    },
    {
      title: "Servizio Locale Ciociaria",
      description: "Stampa 3D Frosinone con consegna GRATUITA in tutta la Ciociaria per ordini sopra 20€. Supporto locale, qualità internazionale.",
      icon: <Award className="w-10 h-10 text-amber-600 dark:text-amber-400" />
    }
  ];

  return (
    <section id="servizi" className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Stampa 3D Frosinone - Prototipazione e Componenti Tecnici
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hai bisogno di <span className="text-green-600 dark:text-green-400 font-bold">prototipazione professionale</span> o <span className="text-emerald-600 dark:text-emerald-400 font-bold">componenti tecnici specializzati</span>? 
            <span className="text-green-600 dark:text-green-400 font-bold"> La stampa 3D Frosinone che realizza ogni progetto!</span>
          </p>
          
          {/* SLOGAN MAGNETICI */}
          <div className="mt-8 space-y-3">
            <p className="text-xl font-bold text-pink-600 dark:text-pink-400 animate-pulse">
              💝 "Prototipazione Frosinone - Dal concept al prodotto finito!" 💝
            </p>
            <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
              🌟 "Componenti tecnici su misura - La precisione che serve!" 🌟
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>

        {/* Sezione materiali supportati */}
        <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Materiali Certificati Disponibili
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">PLA</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">PLA Professionale</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Biodegradabile, alta precisione dimensionale, ideale per prototipi funzionali e modelli di presentazione
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">ABS</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ABS Industriale</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Resistenza meccanica superiore, stabilità termica fino a 100°C, per componenti tecnici e funzionali
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">PETG</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">PETG Food-Safe</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Trasparenza ottica, resistenza chimica certificata, approvato per contatto alimentare
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">TPU</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">TPU Flessibile</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Elastomero termoplastico ultra-flessibile, resistenza agli impatti, ideale per componenti funzionali e gadget
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;