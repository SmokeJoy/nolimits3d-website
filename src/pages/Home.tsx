import React from 'react';
import Header from '../components/Header';
import Services from '../components/Services';
import QuickQuoteForm from '../components/QuickQuoteForm';
import { Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      
      {/* Contenuto principale */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none relative">
        {/* Sezione Servizi */}
        <Services />
        
        {/* Sezione Preventivo Rapido */}
        <section 
          id="preventivo-rapido" 
          className="py-20 relative overflow-hidden"
          aria-labelledby="preventivo-heading"
        >
          {/* Background Gradient Animato */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-emerald-500/5 animate-pulse"></div>
          </div>

          <div className="section-container relative z-10">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <Sparkles className="w-12 h-12 text-green-400 neon-glow" />
                  <div className="absolute inset-0 w-12 h-12 bg-green-400/30 rounded-full animate-ping"></div>
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