import React from 'react';
import { CheckCircle, Zap, Palette, HeadsetIcon, Shield, Award } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Services: React.FC = () => {
  const features = [
    {
      title: "Qualsiasi Idea Diventa Reale",
      description: "Hai un'idea, un disegno, una foto? Trasformiamo qualsiasi concetto in un oggetto 3D tangibile e personalizzato.",
      icon: <CheckCircle className="w-10 h-10 text-gray-900" />
    },
    {
      title: "Preventivo in 2 Ore",
      description: "Inviaci la tua idea e ricevi un preventivo dettagliato in sole 2 ore. Nessun costo nascosto, solo trasparenza totale.",
      icon: <Zap className="w-10 h-10 text-gray-900" />
    },
    {
      title: "Regali che Stupiscono",
      description: "Crea il regalo perfetto e unico! Oggetti personalizzati che lasceranno tutti a bocca aperta per originalità.",
      icon: <Palette className="w-10 h-10 text-gray-900" />
    },
    {
      title: "Ti Aiutiamo a Progettare",
      description: "Non sai come realizzare la tua idea? I nostri esperti ti guidano passo passo dalla concept alla realizzazione finale.",
      icon: <HeadsetIcon className="w-10 h-10 text-gray-900" />
    },
    {
      title: "Materiali di Qualità",
      description: "Solo materiali premium PLA, ABS, PETG, TPU per oggetti resistenti e duraturi nel tempo. Colori vivaci disponibili.",
      icon: <Shield className="w-10 h-10 text-gray-900" />
    },
    {
      title: "Consegna Gratuita in Ciociaria",
      description: "Per ordini superiori a 20€, consegniamo GRATIS a mano in tutta la Ciociaria. Risparmia sui costi di spedizione!",
      icon: <Award className="w-10 h-10 text-gray-900" />
    }
  ];

  return (
    <section id="servizi" className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trasformiamo le Tue Idee in Realtà
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hai un'idea per un oggetto unico? Un regalo speciale? Un gadget personalizzato? 
            <span className="text-green-600 dark:text-green-400 font-bold"> Noi lo realizziamo per te!</span>
          </p>
          
          {/* SLOGAN MAGNETICI */}
          <div className="mt-8 space-y-3">
            <p className="text-xl font-bold text-pink-600 dark:text-pink-400 animate-pulse">
              💝 "Il regalo che nessuno si aspetta? È quello che creiamo insieme!" 💝
            </p>
            <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
              🌟 "La tua immaginazione è l'unico limite!" 🌟
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