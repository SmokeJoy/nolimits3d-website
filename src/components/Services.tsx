import React from 'react';
import { CheckCircle, Zap, Palette, HeadsetIcon, Shield, Award } from '../icons';
import FeatureCard from './FeatureCard';

const Services: React.FC = () => {
  const features = [
    {
      title: "Prototipazione Professionale Frosinone",
      description: "Trasformiamo le tue idee in prototipi funzionali ad alta precisione. Ideale per test di prodotto, validazione di design e presentazioni aziendali. Il nostro servizio di stampa 3D a Frosinone garantisce risultati impeccabili per industria, startup e privati.",
      icon: <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
    },
    {
      title: "Componenti Tecnici e Ricambi su Misura",
      description: "Produciamo componenti tecnici e parti di ricambio per qualsiasi settore industriale. Dalle meccaniche di precisione agli housing per elettronica, utilizziamo materiali performanti per garantire durata e affidabilità. La soluzione perfetta per le tue esigenze ingegneristiche.",
      icon: <Zap className="w-10 h-10 text-blue-600 dark:text-blue-400" />
    },
    {
      title: "Oggetti di Design e Regali Personalizzati",
      description: "Dai vita a creazioni uniche e regali memorabili. Realizziamo oggetti di design, gadget personalizzati e idee regalo originali che stupiranno per la loro qualità e creatività. La stampa 3D a Frosinone per rendere speciale ogni occasione.",
      icon: <Palette className="w-10 h-10 text-purple-600 dark:text-purple-400" />
    },
    {
      title: "Consulenza DfAM (Design for Additive Manufacturing)",
      description: "Ottimizza i tuoi progetti per la stampa 3D con la nostra consulenza specializzata. Ti aiutiamo a ridurre costi, migliorare le performance dei componenti e sfruttare appieno i vantaggi della produzione additiva. Il partner ideale per l'innovazione.",
      icon: <HeadsetIcon className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
    },
    {
      title: "Materiali Tecnici e Certificati",
      description: "Disponiamo di un'ampia gamma di materiali tecnici: PLA, ABS, PETG, TPU, e compositi caricati con carbonio. Offriamo soluzioni con certificazioni specifiche per il settore alimentare, medicale o industriale, garantendo sempre la massima qualità.",
      icon: <Shield className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
    },
    {
      title: "Servizio Locale per la Ciociaria",
      description: "Il tuo servizio di stampa 3D di fiducia a Frosinone, con consegna gratuita in tutta la Ciociaria per ordini superiori a 20€. Garantiamo un supporto diretto, rapido e locale, con la qualità di un servizio internazionale.",
      icon: <Award className="w-10 h-10 text-amber-600 dark:text-amber-400" />
    }
  ];

  return (
    <section id="servizi" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            I Nostri Servizi di Stampa 3D a Frosinone
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Offriamo soluzioni complete di <strong className="text-green-600 dark:text-green-400">prototipazione rapida</strong> e produzione di <strong className="text-emerald-600 dark:text-emerald-400">componenti tecnici</strong> per soddisfare ogni esigenza, dal professionista all'azienda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>

        <div className="mt-20 text-center">
            <a href="/preventivatore" className="inline-block bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-green-700 transition-transform transform hover:scale-105">
              Richiedi un Preventivo Gratuito
            </a>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Risposta rapida in meno di 2 ore!</p>
        </div>
      </div>
    </section>
  );
};

export default Services;