import React from 'react';
import Header from '../components/Header';
import Services from '../components/Services';
import QuickQuoteForm from '../components/QuickQuoteForm';
import SEOHead from '../components/SEOHead';
import { Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Stampa 3D Frosinone | Prototipazione e Componenti Tecnici | NoLimits3D"
        description="Stampa 3D professionale a Frosinone. Prototipazione rapida, componenti tecnici specializzati e oggetti personalizzati. Preventivo gratuito in 2 ore, consegna gratis in Ciociaria."
        keywords="stampa 3d frosinone, prototipazione, componenti tecnici, stampa 3d ciociaria, prototipi, parti meccaniche, prototipazione rapida, componenti personalizzati"
        url="https://nolimits3d.store"
        type="local_business"
        localSEO={{
          businessName: "NoLimits3D",
          address: "Via Dante Alighieri",
          city: "Frosinone", 
          region: "Lazio",
          postalCode: "03100",
          phone: "+393770918590",
          email: "nolimits.3d.print@gmail.com",
          priceRange: "€€",
          services: [
            "Stampa 3D FDM Professionale",
            "Prototipazione Rapida",
            "Componenti Tecnici Specializzati", 
            "Post-Processing Avanzato",
            "Consulenza DfAM",
            "Manutenzione Stampanti 3D Klipper"
          ],
          openingHours: [
            "Mo-Fr 09:00-18:00",
            "Sa 09:00-13:00"
          ],
          coordinates: {
            latitude: 41.6330,
            longitude: 13.3424
          }
        }}
      />
      
      <Header />
      
      {/* Contenuto principale */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none relative">
        {/* Hero Section con H1 principale */}
        <section className="py-12 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
          <div className="section-container relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Stampa 3D Frosinone
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 bg-clip-text text-transparent">
                  Professionale
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium mb-8">
                🏭 <span className="text-green-400 font-bold">Prototipazione rapida</span> e <span className="text-emerald-400 font-bold">componenti tecnici specializzati</span> per PMI, startup e professionisti in Ciociaria 🏭
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="glass-card px-6 py-3 rounded-full border border-green-500/30">
                  <span className="text-green-400 font-bold">✅ Preventivo Gratuito in 2 ore</span>
                </div>
                <div className="glass-card px-6 py-3 rounded-full border border-emerald-500/30">
                  <span className="text-emerald-400 font-bold">🚗 Consegna Gratis in Ciociaria</span>
                </div>
                <div className="glass-card px-6 py-3 rounded-full border border-blue-500/30">
                  <span className="text-blue-400 font-bold">⚡ Produzione 24-48h</span>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-4">
                  <span className="text-green-400 font-semibold">NoLimits3D</span> • Via Dante Alighieri, Frosinone • 
                  <span className="text-emerald-400 font-semibold"> Tel: +39 377 091 8590</span>
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sezione Servizi */}
        <Services />
        
        {/* Sezione Prototipazione e Componenti Tecnici */}
        <section className="py-20 relative overflow-hidden bg-gray-50 dark:bg-gray-800">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Prototipazione
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 bg-clip-text text-transparent">
                  Frosinone
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto font-medium">
                🏭 <span className="text-green-600 dark:text-green-400 font-bold">Prototipazione professionale</span> e <span className="text-emerald-600 dark:text-emerald-400 font-bold">componenti tecnici</span> per industria e startup 🏭
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Prototipazione Industriale */}
              <div className="glass-card p-8 rounded-2xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
                <div className="text-4xl mb-4">🏭</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Prototipazione Industriale
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Prototipi funzionali per validazione concept, test di mercato e presentazioni professionali. 
                  Dalla progettazione CAD alla stampa finale.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Prototipi meccanici funzionali</li>
                  <li>• Housing per elettronica</li>
                  <li>• Modelli per test ergonomici</li>
                  <li>• Validazione design pre-produzione</li>
                </ul>
              </div>

              {/* Componenti Tecnici */}
              <div className="glass-card p-8 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Componenti Tecnici
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Componenti specializzati su misura per ogni settore industriale. 
                  Precisione millimetrica e materiali certificati.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Ricambi meccanici personalizzati</li>
                  <li>• Parti di precisione industriali</li>
                  <li>• Componenti automotive</li>
                  <li>• Soluzioni ingegneristiche custom</li>
                </ul>
              </div>

              {/* Prototipazione Rapida */}
              <div className="glass-card p-8 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Prototipazione Rapida
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Tempi di consegna accelerati per progetti urgenti. 
                  Dal file 3D al prototipo fisico in 24-48 ore.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Consegna in 24-48 ore</li>
                  <li>• Servizio Express disponibile</li>
                  <li>• Materiali sempre disponibili</li>
                  <li>• Supporto tecnico H24</li>
                </ul>
              </div>
            </div>

            {/* Settori di Applicazione */}
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Settori di Applicazione
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['Automotive', 'Elettronica', 'Medicale', 'Aerospace', 'Robotica', 'Design', 'Startup', 'Ricerca'].map((settore) => (
                  <div key={settore} className="glass-card px-6 py-3 rounded-full border border-green-500/30">
                    <span className="text-green-600 dark:text-green-400 font-semibold">{settore}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Sezione Preventivo Rapido */}
        <section 
          id="preventivo-rapido" 
          className="py-20 relative overflow-hidden"
          aria-labelledby="preventivo-heading"
        >
          {/* Background Gradient Animato */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-emerald-500/5 animate-pulse-slow"></div>
          </div>

          <div className="section-container relative z-10">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <Sparkles className="w-12 h-12 text-green-400 neon-glow" />
                  <div className="absolute inset-0 w-12 h-12 bg-green-400/30 rounded-full animate-ping-slow"></div>
                </div>
              </div>
              
              <h2 id="preventivo-heading" className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  REALIZZA
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 bg-clip-text text-transparent">
                  LA TUA IDEA
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium">
                🎨 <span className="text-green-400 font-bold">Trasforma qualsiasi idea</span> in un <span className="text-emerald-400 font-bold">oggetto UNICO</span> 🎨
              </p>
              
              {/* Badge MAGNETICI */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 mt-8 px-4">
                <div className="glass-card px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 rounded-full border border-green-500/30 floating">
                  <span className="text-green-400 font-bold text-xs sm:text-sm md:text-base">✅ Preventivo GRATUITO</span>
                </div>
                
                <div className="glass-card px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 rounded-full border border-emerald-500/30 floating">
                  <span className="text-emerald-400 font-bold text-xs sm:text-sm md:text-base">🎁 Oggetti PERSONALIZZATI</span>
                </div>
                
                <div className="glass-card px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 rounded-full border border-green-400/30 floating">
                  <span className="text-green-500 font-bold text-xs sm:text-sm md:text-base">💝 Regali che STUPISCONO</span>
                </div>
                
                <div className="glass-card px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-3 rounded-full border border-blue-500/30 floating w-full sm:w-auto max-w-xs sm:max-w-none">
                  <span className="text-blue-400 font-bold text-xs sm:text-sm md:text-base">🚗 Consegna GRATIS Ciociaria</span>
                </div>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <QuickQuoteForm />
            </div>
            
            {/* Sezione Chatbot Info */}
            <div className="mt-16 text-center">
              <div className="glass-card inline-block px-6 py-4 rounded-2xl border border-green-500/20 mx-4">
                <p className="text-gray-300 text-sm md:text-base mb-2">
                  💬 <span className="text-green-400 font-bold">Hai domande veloci?</span> Prova il nostro <span className="text-emerald-400 font-bold">Chatbot AI</span> 💬
                </p>
                <p className="text-gray-400 text-xs md:text-sm">
                  🤖 Disponibile 24/7 per informazioni su materiali, consigli tecnici e curiosità sulla stampa 3D
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home; 