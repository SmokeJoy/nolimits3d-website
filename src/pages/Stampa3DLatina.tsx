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
  BuildingOfficeIcon,
  CheckCircleIcon,
  PhoneIcon,
  CogIcon,
  StarIcon,
  BeakerIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const Stampa3DLatina: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Servizi', href: '/servizi' },
    { name: 'Stampa 3D Latina', href: '/stampa-3d-latina' },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'NoLimits3D - Stampa 3D Latina',
    description: 'Servizio di stampa 3D professionale per Latina e Agro Pontino. Specializzati in settori logistica, agroalimentare e chimico-farmaceutico. Consegna rapida.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Latina',
      addressRegion: 'Lazio',
      postalCode: '04100',
      addressCountry: 'IT'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.4677,
      longitude: 12.9037
    },
    telephone: '+39 0775 123456',
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '€€',
    servesCuisine: 'Stampa 3D, Prototipazione, Componenti Industriali',
    areaServed: ['Latina', 'Agro Pontino', 'Terracina', 'Formia', 'Gaeta', 'Aprilia'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servizi Stampa 3D Latina',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Stampa 3D per Settore Logistico',
            description: 'Componenti e attrezzature per magazzini e centri distribuzione'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Prototipi per Agroalimentare',
            description: 'Componenti food-grade per industria alimentare'
          }
        }
      ]
    }
  };

  return (
    <Layout>
      <SEOHead
        title="Stampa 3D Latina - Servizio Professionale Agro Pontino | NoLimits3D"
        description="Stampa 3D professionale per Latina e Agro Pontino. Specializzati in logistica, agroalimentare e chimico-farmaceutico. Consegna rapida in 24-48h."
        canonicalUrl="https://nolimits3d.com/stampa-3d-latina"
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
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <MapPinIcon className="h-8 w-8 text-green-300 mr-3" />
                  <span className="text-green-300 font-semibold">Latina & Agro Pontino</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Stampa 3D a Latina
                  <span className="block text-green-300">Partner per l'Industria</span>
                </h1>
                <p className="text-xl mb-8 text-green-100">
                  Servizio di stampa 3D specializzato per i settori chiave di Latina: 
                  <strong className="text-white">logistica, agroalimentare, chimico-farmaceutico</strong>. 
                  Prototipi industriali e componenti tecnici con consegna rapida in tutto l'Agro Pontino.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#preventivo" 
                    className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                  >
                    Preventivo Industriale
                  </a>
                  <a 
                    href="tel:+390775123456" 
                    className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors text-center flex items-center justify-center"
                  >
                    <PhoneIcon className="h-5 w-5 mr-2" />
                    Consulenza Tecnica
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <img 
                  src="/images/logo.jpg" 
                  alt="Stampa 3D Latina - NoLimits3D" 
                  className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Settori Specializzati */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Settori Specializzati per Latina
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Esperienza specifica nei settori industriali chiave dell'Agro Pontino. 
                Soluzioni personalizzate per le esigenze del territorio.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<TruckIcon className="h-8 w-8" />}
                title="Logistica & Distribuzione"
                description="Componenti per magazzini automatizzati, supporti per scaffalature, accessori per movimentazione merci."
              />
              <FeatureCard
                icon={<BeakerIcon className="h-8 w-8" />}
                title="Agroalimentare"
                description="Prototipi food-grade, componenti per macchinari alimentari, packaging personalizzato e stampi."
              />
              <FeatureCard
                icon={<CogIcon className="h-8 w-8" />}
                title="Chimico-Farmaceutico"
                description="Componenti resistenti agli agenti chimici, prototipi per laboratori, attrezzature specializzate."
              />
            </div>
          </div>
        </div>

        {/* Vantaggi Territorio */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Perché NoLimits3D per l'Agro Pontino
              </h2>
              <p className="text-xl text-gray-600">
                Competenza tecnica e logistica ottimizzata per servire efficacemente tutto il territorio pontino.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<GlobeAltIcon className="h-8 w-8" />}
                title="Copertura Territoriale"
                description="Serviamo Latina centro, costa pontina e sud provincia. Logistica ottimizzata per l'Agro Pontino."
              />
              <FeatureCard
                icon={<ClockIcon className="h-8 w-8" />}
                title="Consegna Rapida"
                description="24-48h per Latina e provincia. Servizio express per urgenze industriali."
              />
              <FeatureCard
                icon={<BuildingOfficeIcon className="h-8 w-8" />}
                title="Esperienza B2B"
                description="Partnership con aziende pontine. Contratti quadro e consulenza continuativa."
              />
              <FeatureCard
                icon={<CheckCircleIcon className="h-8 w-8" />}
                title="Certificazioni"
                description="Materiali certificati per uso industriale. Tracciabilità completa dei processi."
              />
            </div>
          </div>
        </div>

        {/* Servizi per Settore */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Servizi per Settore a Latina
              </h2>
              <p className="text-xl text-gray-600">
                Soluzioni specifiche per i settori industriali dell'Agro Pontino.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Logistica */}
              <div className="bg-blue-50 rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <TruckIcon className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Logistica</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Accessori magazzino</strong> - Guide, supporti, divisori personalizzati</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Componenti automatizzazione</strong> - Parti per sistemi di movimentazione</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Prototipi packaging</strong> - Contenitori e imballaggi su misura</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Maschere e dime</strong> - Attrezzature per controllo qualità</span>
                  </li>
                </ul>
              </div>
              
              {/* Agroalimentare */}
              <div className="bg-green-50 rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <BeakerIcon className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Agroalimentare</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Prototipi food-grade</strong> - Materiali certificati FDA</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Componenti macchinari</strong> - Parti per linee di produzione</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Stampi personalizzati</strong> - Per formatura e packaging</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Accessori laboratorio</strong> - Contenitori e strumenti analisi</span>
                  </li>
                </ul>
              </div>
              
              {/* Chimico-Farmaceutico */}
              <div className="bg-purple-50 rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <CogIcon className="h-8 w-8 text-purple-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Chimico-Farmaceutico</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Componenti resistenti</strong> - Materiali chimicamente inerti</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Prototipi laboratorio</strong> - Strumentazione e accessori</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Contenitori speciali</strong> - Recipienti per sostanze particolari</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Sigillature custom</strong> - Guarnizioni e componenti di tenuta</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copertura Territoriale Dettagliata */}
        <div className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Copertura Agro Pontino
              </h2>
              <p className="text-xl text-gray-600">
                Serviamo tutto l'Agro Pontino con logistica ottimizzata per le tre zone principali.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Zona Centro */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  🏢 Zona Centro
                </h3>
                <div className="space-y-2 text-center">
                  {['Latina', 'Aprilia', 'Cisterna di Latina', 'Cori', 'Norma', 'Roccamassima'].map((city) => (
                    <div key={city} className="bg-gray-50 rounded p-2">
                      <span className="text-gray-700 font-medium">{city}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
                  <p className="text-sm text-blue-800">
                    <strong>Consegna:</strong> 24h lavorative
                  </p>
                </div>
              </div>
              
              {/* Zona Costa */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  🏖️ Zona Costa
                </h3>
                <div className="space-y-2 text-center">
                  {['Terracina', 'Fondi', 'Formia', 'Gaeta', 'Minturno', 'Scauri'].map((city) => (
                    <div key={city} className="bg-gray-50 rounded p-2">
                      <span className="text-gray-700 font-medium">{city}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
                  <p className="text-sm text-green-800">
                    <strong>Consegna:</strong> 24-48h
                  </p>
                </div>
              </div>
              
              {/* Zona Sud */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  🏔️ Zona Sud
                </h3>
                <div className="space-y-2 text-center">
                  {['Sezze', 'Priverno', 'Maenza', 'Roccagorga', 'Prossedi', 'Bassiano'].map((city) => (
                    <div key={city} className="bg-gray-50 rounded p-2">
                      <span className="text-gray-700 font-medium">{city}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-center">
                  <p className="text-sm text-yellow-800">
                    <strong>Consegna:</strong> 48h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clienti e Case Studies */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Clienti nell'Agro Pontino
              </h2>
              <p className="text-xl text-gray-600">
                Partnership consolidate con aziende leader dei settori chiave di Latina.
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
                  "Componenti per i nostri magazzini automatizzati. Precisione e tempi di consegna perfetti per le nostre esigenze industriali."
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Ing. Roberto M.</strong> - Azienda Logistica, Aprilia
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
                  "Prototipi food-grade per le nostre linee di produzione. Materiali certificati e competenza tecnica eccellente."
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Dott.ssa Anna L.</strong> - Industria Alimentare, Latina
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
                  "Componenti resistenti per il nostro laboratorio. Consulenza professionale e soluzioni innovative."
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Dr. Francesco P.</strong> - Laboratorio Chimico, Terracina
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Materiali Specializzati */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Materiali per Applicazioni Industriali
              </h2>
              <p className="text-xl text-gray-600">
                Materiali specializzati per le esigenze specifiche dell'industria pontina.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Materiali Food-Grade</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• <strong>PETG Food-Safe</strong> - Certificato FDA per contatto alimentare</li>
                  <li>• <strong>PP (Polipropilene)</strong> - Resistente ad acidi e basi</li>
                  <li>• <strong>PLA Puro</strong> - Biodegradabile e compostabile</li>
                  <li>• <strong>Nylon PA12</strong> - Resistenza chimica superiore</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Materiali Industriali</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• <strong>ABS Ignifugo</strong> - Per applicazioni con requisiti di sicurezza</li>
                  <li>• <strong>PEEK</strong> - Resistenza chimica e termica estrema</li>
                  <li>• <strong>Carbon Fiber</strong> - Leggerezza e resistenza meccanica</li>
                  <li>• <strong>TPU Industriale</strong> - Guarnizioni e componenti flessibili</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Form Preventivo */}
        <div id="preventivo" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Preventivo Industriale per Latina
              </h2>
              <p className="text-xl text-gray-600">
                Preventivo dettagliato per progetti industriali. Consulenza tecnica inclusa.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <QuickQuoteForm 
                defaultMessage="Ciao! Sono interessato a un preventivo per stampa 3D industriale nell'Agro Pontino. Settore: [inserire settore]"
                source="Stampa 3D Latina"
              />
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                <strong>Servizi inclusi:</strong> Consulenza DfAM, Analisi di fattibilità, Selezione materiali, Controllo qualità
              </p>
            </div>
          </div>
        </div>

        {/* CTA Finale */}
        <div className="bg-green-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Partner Tecnologico per l'Agro Pontino
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Competenza industriale, logistica ottimizzata e materiali specializzati per i settori chiave di Latina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+390775123456" 
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Consulenza Tecnica: 0775 123456
              </a>
              <a 
                href="mailto:info@nolimits3d.com" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Richiedi Partnership
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stampa3DLatina; 