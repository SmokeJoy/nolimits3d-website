import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import WhatsAppButton from '../components/WhatsAppButton';
import Breadcrumbs from '../components/Breadcrumbs';
import QuoteCalculator from '../components/QuoteCalculator';

const Preventivatore: React.FC = () => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Preventivatore', href: '/preventivatore' },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Preventivatore Stampa 3D Online | NoLimits3D',
    description: 'Calcola istantaneamente il costo del tuo progetto di stampa 3D. Preventivi online immediati e trasparenti. Tutti i materiali FDM disponibili.',
    url: 'https://nolimits3d.store/preventivatore',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      description: 'Preventivatore gratuito per stampa 3D',
      price: '0',
      priceCurrency: 'EUR'
    },
    featureList: [
      'Calcolo costi istantaneo',
      'Tutti i materiali FDM',
      'Sconti quantità automatici',
      'Tempi di consegna stimati',
      'Post-processing incluso'
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Preventivatore Stampa 3D Online - Calcolo Costi Istantaneo | NoLimits3D"
        description="Preventivatore stampa 3D online gratuito. Calcola subito il costo del tuo progetto: materiali, tempi, post-processing. Prezzi trasparenti come Weerg ma servizio locale."
        canonicalUrl="https://nolimits3d.store/preventivatore"
        structuredData={structuredData}
      />
      
      <WhatsAppButton />
      
      {/* Breadcrumbs */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* Quote Calculator Component */}
      <QuoteCalculator />
      
      {/* SEO Content Section */}
      <div className="bg-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="prose prose-lg max-w-4xl mx-auto prose-dark text-white">
            <h2 className="text-2xl font-bold text-white mb-6">
              Preventivatore Stampa 3D: Come Funziona
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Calcolo Automatico dei Costi
                </h3>
                <p className="text-gray-300 mb-4">
                  Il nostro preventivatore utilizza algoritmi avanzati per calcolare con precisione:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• <strong>Costi materiali</strong> basati su peso e densità reali</li>
                  <li>• <strong>Tempo macchina</strong> con tariffe competitive (€6/ora)</li>
                  <li>• <strong>Post-processing</strong> con prezzi fissi per servizio</li>
                  <li>• <strong>Sconti quantità</strong> automatici (5+ pezzi: -10%, 10+ pezzi: -15%)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Vantaggi vs Competitor
                </h3>
                <p className="text-gray-300 mb-4">
                  A differenza dei service nazionali, offriamo:
                </p>
                <ul className="text-gray-300 space-y-2">
                  <li>• <strong>Trasparenza totale</strong> sui costi di ogni voce</li>
                  <li>• <strong>Consulenza DfAM gratuita</strong> inclusa nel preventivo</li>
                  <li>• <strong>Servizio locale</strong> con assistenza diretta</li>
                  <li>• <strong>Prezzi competitivi</strong> senza costi di rete commerciale</li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4">
              Materiali Disponibili nel Preventivatore
            </h3>
            <p className="text-gray-300 mb-6">
              Tutti i materiali nel preventivatore sono disponibili nel nostro laboratorio di Frosinone, 
              con specifiche tecniche certificate e prezzi aggiornati settimanalmente al mercato.
            </p>
            
            <div className="bg-slate-700 rounded-lg p-6 mb-8 border border-slate-600">
              <h4 className="font-semibold text-green-400 mb-3">💡 Consigli per un Preventivo Accurato</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <strong className="text-green-400">Volume:</strong> Usa software CAD per calcolo preciso del volume. 
                  In alternativa: lunghezza × larghezza × altezza del parallelepipedo che contiene l'oggetto.
                </div>
                <div>
                  <strong className="text-green-400">Materiale:</strong> PLA per prototipi estetici, ABS per parti funzionali, 
                  PETG per trasparenza, TPU per flessibilità.
                </div>
                <div>
                  <strong className="text-green-400">Qualità:</strong> Standard (0.2mm) è ideale per il 90% dei progetti. 
                  Fine solo per dettagli molto piccoli.
                </div>
                <div>
                  <strong className="text-green-400">Post-processing:</strong> Valuta se necessario. Levigatura per superfici lisce, 
                  verniciatura per estetica finale.
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4">
              Perché Scegliere NoLimits3D vs. Service Online Nazionali
            </h3>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border border-slate-600 bg-slate-800">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="border border-slate-600 px-4 py-2 text-left text-white">Caratteristica</th>
                    <th className="border border-slate-600 px-4 py-2 text-center text-white">NoLimits3D</th>
                    <th className="border border-slate-600 px-4 py-2 text-center text-white">Service Nazionali</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-600 px-4 py-2 text-gray-300">Preventivatore online</td>
                    <td className="border border-slate-600 px-4 py-2 text-center text-green-400">✅ Istantaneo</td>
                    <td className="border border-slate-600 px-4 py-2 text-center text-green-400">✅ Disponibile</td>
                  </tr>
                  <tr className="bg-slate-700">
                    <td className="border border-slate-600 px-4 py-2 text-gray-300">Trasparenza prezzi</td>
                    <td className="border border-slate-600 px-4 py-2 text-center text-green-400">✅ Dettaglio completo</td>
                    <td className="border border-slate-600 px-4 py-2 text-center text-orange-400">⚠️ Spesso nascosti</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-600 px-4 py-2 text-gray-300">Consulenza DfAM</td>
                    <td className="border border-slate-600 px-4 py-2 text-center text-green-400">✅ Gratuita</td>
                    <td className="border border-slate-600 px-4 py-2 text-center text-orange-400">💰 A pagamento</td>
                  </tr>
                  <tr className="bg-slate-700">
                    <td className="border border-slate-600 px-4 py-2 text-gray-300">Assistenza</td>
                    <td className="border border-slate-600 px-4 py-2 text-center text-green-400">📞 Diretta e locale</td>
                    <td className="border border-slate-600 px-4 py-2 text-center text-red-400">🤖 Call center</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-600 px-4 py-2 text-gray-300">Ritiro possibile</td>
                    <td className="border border-slate-600 px-4 py-2 text-center text-green-400">✅ In sede Frosinone</td>
                    <td className="border border-slate-600 px-4 py-2 text-center text-red-400">❌ Solo spedizione</td>
                  </tr>
                  <tr className="bg-slate-700">
                    <td className="border border-slate-600 px-4 py-2 text-gray-300">Consegna locale</td>
                    <td className="border border-slate-600 px-4 py-2 text-center text-green-400">🚛 Gratuita Lazio</td>
                    <td className="border border-slate-600 px-4 py-2 text-center text-red-400">📦 Sempre a pagamento</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-blue-900/30 rounded-lg p-6 border border-blue-700">
              <h4 className="font-semibold text-blue-400 mb-2">🎯 Precisione del Preventivatore</h4>
              <p className="text-blue-200 text-sm">
                Il nostro algoritmo ha un'accuratezza del 95% sui costi finali, basato su oltre 1000 progetti realizzati. 
                Le uniche variazioni possono derivare da ottimizzazioni DfAM che riducono i costi o da file 
                particolarmente complessi che richiedono supporti extra.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Preventivatore; 