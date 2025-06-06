import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import TimelapseSection from './components/TimelapseSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import QuickQuoteForm from './components/QuickQuoteForm';
import ChatWidget from './components/ChatWidget';
import { Moon, Sun, SkipForward, Sparkles, ArrowUp } from 'lucide-react';
import FAQ from './components/FAQ';
import TechnicalSpecs from './components/TechnicalSpecs';
import LegalPages from './components/LegalPages';
import WhatsAppButton from './components/WhatsAppButton';

// Dichiarazione per gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters: Record<string, string>) => void;
  }
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Controlla preferenza utente salvata, altrimenti default DARK mode
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    // DEFAULT: Dark mode sempre attiva, a meno che l'utente non preferisca esplicitamente light
    return window.matchMedia('(prefers-color-scheme: light)').matches ? false : true;
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Effetto per applicare dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark');
    } else {
      root.removeAttribute('data-theme');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'theme_toggle', {
        event_category: 'ui_interaction',
        event_label: darkMode ? 'light' : 'dark'
      });
    }
  };

  // Skip link per accessibilità
  const skipToMain = () => {
    const main = document.querySelector('main');
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Particles Background */}
      <div className="particles-bg">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      {/* Skip Links per accessibilità */}
      <a 
        href="#main-content"
        onClick={skipToMain}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 btn-magnetic text-white px-6 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/50"
      >
        <SkipForward className="w-4 h-4 inline mr-2" />
        Salta al contenuto principale
      </a>

      {/* Dark Mode Toggle SPETTACOLARE */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleDarkMode}
          className="glass-card p-4 rounded-2xl border-2 border-green-500/30 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-500/50 group"
          aria-label={darkMode ? 'Attiva modalità chiara' : 'Attiva modalità scura'}
          title={darkMode ? 'Modalità chiara' : 'Modalità scura'}
        >
          <div className="relative">
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-400 neon-glow group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <Moon className="w-6 h-6 text-gray-200 group-hover:rotate-12 transition-transform duration-300" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </button>
      </div>

      <Header />
      
      <main id="main-content" tabIndex={-1} className="focus:outline-none relative">
      <Services />
      
        {/* Sezione Preventivo Rapido SPETTACOLARE */}
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
            {/* Sezione Titolo IPNOTIZZANTE con effetti */}
            <div className="text-center mb-16">
              {/* Icona centrale con animazioni */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <Sparkles className="w-12 h-12 text-green-400 neon-glow" />
                  <div className="absolute inset-0 w-12 h-12 bg-green-400/30 rounded-full animate-ping"></div>
                </div>
              </div>
              
              {/* Titolo principale MAGNETICO */}
              <h2 id="preventivo-heading" className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  REALIZZA
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 bg-clip-text text-transparent">
                  LA TUA IDEA
                </span>
              </h2>
              
              {/* Sottotitolo ACCATTIVANTE */}
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium">
                🎨 <span className="text-green-400 font-bold">Trasforma qualsiasi idea</span> in un <span className="text-emerald-400 font-bold">oggetto UNICO</span> 🎨
              </p>
              
              {/* Badge MAGNETICI per preventivo - Ottimizzati per MOBILE */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 mt-8 px-4">
                {/* Badge Preventivo Gratuito */}
                <div className="glass-card px-3 py-2 sm:px-6 sm:py-3 rounded-full border border-green-500/30 floating">
                  <span className="text-green-400 font-bold text-xs sm:text-sm md:text-base">✅ Preventivo GRATUITO</span>
                </div>
                
                {/* Badge Oggetti Personalizzati */}
                <div className="glass-card px-3 py-2 sm:px-6 sm:py-3 rounded-full border border-emerald-500/30 floating">
                  <span className="text-emerald-400 font-bold text-xs sm:text-sm md:text-base">🎁 Oggetti PERSONALIZZATI</span>
                </div>
                
                {/* Badge Regali che Stupiscono */}
                <div className="glass-card px-3 py-2 sm:px-6 sm:py-3 rounded-full border border-green-400/30 floating">
                  <span className="text-green-500 font-bold text-xs sm:text-sm md:text-base">💝 Regali che STUPISCONO</span>
                </div>
                
                {/* Badge Consegna Gratis - Su nuova riga mobile se necessario */}
                <div className="glass-card px-3 py-2 sm:px-6 sm:py-3 rounded-full border border-blue-500/30 floating w-full sm:w-auto max-w-xs sm:max-w-none mx-auto sm:mx-0">
                  <span className="text-blue-400 font-bold text-xs sm:text-sm md:text-base">🚗 Consegna GRATIS Ciociaria</span>
                </div>
              </div>
            </div>
            
            {/* Form di Preventivo MAGNETICO - Componente principale */}
            <div className="max-w-4xl mx-auto">
            <QuickQuoteForm />
          </div>
        </div>
      </section>
      
      <Gallery />
      <TimelapseSection />
      <TechnicalSpecs />
      <FAQ />
      <Testimonials />
      <Contact />
      <LegalPages />
      </main>
      
      <Footer />
      
      {/* AI Chat Widget */}
      <ChatWidget />
      
      {/* Scroll to Top Button SPETTACOLARE */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 bg-green-600 hover:bg-green-500 p-4 rounded-2xl border-2 border-green-400 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-green-500/50 group"
          aria-label="Torna all'inizio della pagina"
          title="Torna su"
        >
          <div className="relative">
            <ArrowUp className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-green-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </button>
      )}

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
          style={{
            width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
          }}
        />
      </div>

      <WhatsAppButton text="Hai bisogno di aiuto? Scrivici su WhatsApp!" />
    </div>
  );
}

export default App;