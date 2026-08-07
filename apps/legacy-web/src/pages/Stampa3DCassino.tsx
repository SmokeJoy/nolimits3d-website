import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import QuickQuoteForm from '../components/QuickQuoteForm';
import WhatsAppButton from '../components/WhatsAppButton';
import Breadcrumbs from '../components/Breadcrumbs';
import FeatureCard from '../components/FeatureCard';
import { 
  MapPinIcon, 
  TruckIcon, 
  ClockIcon, 
  UserGroupIcon,
  CheckCircleIcon,
  PhoneIcon,
  CogIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const Stampa3DCassino: React.FC = () => {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Servizi', href: '/servizi' },
    { label: 'Stampa 3D Cassino', href: '/stampa-3d-cassino' },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'NoLimits3D - Stampa 3D Cassino',
    description: 'Servizio di stampa 3D professionale per Cassino e provincia. Prototipi rapidi, componenti tecnici e consulenza specializzata. Consegna gratuita in 24h.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cassino',
      addressRegion: 'Lazio',
      postalCode: '03043',
      addressCountry: 'IT'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.4939,
      longitude: 13.8323
    },
    telephone: '+39 0775 123456',
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '€€',
    servesCuisine: 'Stampa 3D, Prototipazione, Componenti Tecnici',
    areaServed: ['Cassino', 'Frosinone', 'Lazio'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servizi Stampa 3D Cassino',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Stampa 3D FDM Professionale',
            description: 'Servizio di stampa 3D FDM per prototipi e componenti tecnici'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Prototipazione Rapida',
            description: 'Realizzazione prototipi funzionali in tempi ridotti'
          }
        }
      ]
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Stampa 3D Cassino - Servizio Professionale | NoLimits3D"
        description="Servizio di stampa 3D professionale a Cassino. Prototipi rapidi, componenti tecnici FDM. Consegna gratuita in 24h. Preventivi in 2 ore. Qualità garantita."
        canonicalUrl="https://nolimits3d.store/stampa-3d-cassino"
        structuredData={structuredData}
      />
      
      <WhatsAppButton />
      
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <MapPinIcon className="h-8 w-8 text-blue-300 mr-3" />
                  <span className="text-blue-300 font-semibold">Cassino & Provincia</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Stampa 3D a Cassino
                  <span className="block text-blue-300">Professionale e Veloce</span>
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Servizio di stampa 3D FDM professionale per Cassino e provincia. 
                  Prototipi rapidi, componenti tecnici e consulenza specializzata. 
                  <strong className="text-white">Consegna gratuita in 24h</strong> dal nostro laboratorio di Frosinone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#preventivo" 
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                  >
                    Preventivo Gratuito
                  </a>
                  <a 
                    href="tel:+390775123456" 
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center flex items-center justify-center"
                  >
                    <PhoneIcon className="h-5 w-5 mr-2" />
                    Chiama Ora
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="/images/logo.jpg" 
                  alt="Stampa 3D Cassino - NoLimits3D" 
                  className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vantaggi Servizio Locale */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Perché Scegliere NoLimits3D per Cassino
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Il vantaggio di un servizio locale professionale: qualità industriale, 
                tempi rapidi e assistenza diretta a soli 30 minuti da Cassino.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<TruckIcon className="h-8 w-8" />}
                title="Consegna Rapida"
                description="Consegna gratuita in 24h a Cassino e comuni limitrofi. Ritiro possibile presso il nostro laboratorio."
              />
              <FeatureCard
                icon={<ClockIcon className="h-8 w-8" />}
                title="Tempi Garantiti"
                description="Preventivi in 2 ore lavorative. Tempi di produzione rispettati al 100%. Servizio express disponibile."
              />
              <FeatureCard
                icon={<UserGroupIcon className="h-8 w-8" />}
                title="Assistenza Locale"
                description="Supporto tecnico diretto, sopralluoghi su richiesta. Consulenza DfAM inclusa nel servizio."
              />
              <FeatureCard
                icon={<CheckCircleIcon className="h-8 w-8" />}
                title="Qualità Certificata"
                description="Materiali originali, macchine calibrate, controllo qualità. Garanzia di conformità sui prototipi."
              />
            </div>
          </div>
        </div>

        {/* Servizi per Cassino */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Servizi di Stampa 3D per Cassino
              </h2>
              <p className="text-xl text-gray-600">
                Soluzioni complete per privati, aziende e professionisti della provincia di Cassino.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <CogIcon className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Servizi B2B</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Prototipazione industriale</strong> - Prototipi funzionali per test e validazione</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Componenti automotive</strong> - Supporti, maschere, parti di ricambio</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Attrezzature industriali</strong> - Dime, staffe, componenti custom</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Serie limitate</strong> - Produzione di piccole quantità</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>NDA disponibile:</strong> Riservatezza garantita per progetti industriali
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <StarIcon className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Servizi B2C</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Prototipi personali</strong> - Dalle tue idee alla realtà</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Riparazioni e ricambi</strong> - Parti di ricambio non più disponibili</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Oggetti personalizzati</strong> - Gadget, regali, accessori unici</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Modelli e miniature</strong> - Architettonici, artistici, collezionabili</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Consulenza gratuita:</strong> Ti aiutiamo a scegliere materiali e finiture
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Materiali e Specifiche */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Materiali Disponibili per Cassino
              </h2>
              <p className="text-xl text-gray-600">
                Ampia gamma di materiali tecnici per ogni esigenza progettuale.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Materiali Standard</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• PLA - Prototipi e modelli</li>
                  <li>• ABS - Parti funzionali</li>
                  <li>• PETG - Trasparente e resistente</li>
                  <li>• TPU - Flessibile e ammortizzante</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Materiali Tecnici</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Nylon - Massima resistenza</li>
                  <li>• Carbon Fiber - Leggerezza e rigidità</li>
                  <li>• ASA - Resistenza UV</li>
                  <li>• PC - Trasparenza e calore</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Finiture</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Levigatura professionale</li>
                  <li>• Verniciatura custom</li>
                  <li>• Inserti filettati</li>
                  <li>• Assemblaggio componenti</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copertura Territoriale */}
        <div className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Copertura Territoriale da Cassino
              </h2>
              <p className="text-xl text-gray-600">
                Serviamo con consegna gratuita in 24h tutti i comuni della provincia di Frosinone.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
              {[
                'Cassino', 'Sora', 'Pontecorvo', 'Aquino', 'Piedimonte San Germano',
                'Sant\'Apollinare', 'Esperia', 'Coreno Ausonio', 'Castelnuovo Parano',
                'Pico', 'Campodimele', 'Lenola', 'Pastena', 'Falvaterra'
              ].map((city) => (
                <div key={city} className="bg-white rounded-lg p-4 shadow-md">
                  <span className="text-gray-700 font-medium">{city}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                <strong>Consegna Express:</strong> Disponibile anche per Roma Sud, Latina e provincia (24-48h)
              </p>
            </div>
          </div>
        </div>

        {/* Testimonial Locale */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Clienti Soddisfatti a Cassino
              </h2>
              <p className="text-xl text-gray-600">
                Oltre 50 progetti realizzati per aziende e privati della provincia di Cassino.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Servizio impeccabile per i nostri prototipi automotive. Consegna puntuale e qualità professionale. Consigliatissimo!"
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Marco T.</strong> - Azienda Meccanica, Cassino
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Hanno realizzato i ricambi per la mia stampante che non trovavo più. Precisione millimetrica e prezzo onesto."
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Giuseppe R.</strong> - Privato, Pontecorvo
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Competenza tecnica eccellente. Ci hanno aiutato a ottimizzare il design risparmiando tempo e denaro."
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Ing. Laura M.</strong> - Studio Tecnico, Sora
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Preventivo */}
        <div id="preventivo" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Richiedi Preventivo per Cassino
              </h2>
              <p className="text-xl text-gray-600">
                Preventivo gratuito e dettagliato in 2 ore lavorative. Nessun impegno.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <QuickQuoteForm 
                defaultMessage="Ciao! Vorrei un preventivo per stampa 3D con consegna a Cassino."
                source="Stampa 3D Cassino"
              />
            </div>
          </div>
        </div>

        {/* CTA Finale */}
        <div className="bg-blue-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Pronto per Iniziare il Tuo Progetto?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Contattaci oggi stesso per trasformare le tue idee in realtà con la stampa 3D professionale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+390775123456" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Chiama: 0775 123456
              </a>
              <a 
                href="mailto:nolimits.3d.print@gmail.com"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Scrivi Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stampa3DCassino; 