import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import WhatsAppButton from '../components/WhatsAppButton';
import Breadcrumbs from '../components/Breadcrumbs';
import MaterialSelector from '../components/MaterialSelector';

const Materiali: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Materiali', href: '/materiali' },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Materiali Stampa 3D - Selector Interattivo | NoLimits3D',
    description: 'Scopri tutti i materiali per stampa 3D FDM: PLA, ABS, PETG, TPU, Nylon, Carbon Fiber. Confronta proprietà, prezzi e applicazioni.',
    url: 'https://nolimits3d.com/materiali',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Materiali Stampa 3D',
      numberOfItems: 6,
      itemListElement: [
        {
          '@type': 'Product',
          name: 'PLA Filament',
          description: 'Materiale biodegradabile per prototipi e modelli',
          category: 'Materiali Stampa 3D'
        },
        {
          '@type': 'Product', 
          name: 'ABS Filament',
          description: 'Materiale resistente per parti funzionali',
          category: 'Materiali Stampa 3D'
        }
      ]
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Materiali Stampa 3D - Selector Interattivo | NoLimits3D Frosinone"
        description="Scopri tutti i materiali per stampa 3D FDM: PLA, ABS, PETG, TPU, Nylon, Carbon Fiber. Confronta proprietà, prezzi e applicazioni. Selector interattivo."
        canonicalUrl="https://nolimits3d.com/materiali"
        structuredData={structuredData}
      />
      
      <WhatsAppButton />
      
      {/* Breadcrumbs */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      {/* Material Selector Component */}
      <MaterialSelector />
      
      {/* Additional Info Section */}
      <div className="bg-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Hai Bisogno di Aiuto nella Scelta?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              I nostri esperti sono pronti a consigliarti il materiale perfetto per il tuo progetto.
              Consulenza gratuita e preventivi personalizzati.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-700 rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-400 text-xl">📞</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Consulenza Telefonica</h3>
              <p className="text-gray-300 mb-4">Parla direttamente con i nostri tecnici</p>
              <a 
                href="tel:+390775123456" 
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                0775 123456
              </a>
            </div>
            
            <div className="bg-slate-700 rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-400 text-xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Chat WhatsApp</h3>
              <p className="text-gray-300 mb-4">Supporto rapido e documentazione</p>
              <a 
                href="https://wa.me/393770918590" 
                className="text-green-400 font-medium hover:text-green-300"
              >
                Chatta Ora
              </a>
            </div>
            
            <div className="bg-slate-700 rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-400 text-xl">📧</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email Tecnica</h3>
              <p className="text-gray-300 mb-4">Invia file e specifiche dettagliate</p>
              <a 
                href="mailto:info@nolimits3d.com" 
                className="text-purple-400 font-medium hover:text-purple-300"
              >
                info@nolimits3d.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Materiali; 