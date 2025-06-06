import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Zap, Star, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToQuoteForm = () => {
    const quoteSection = document.querySelector('#preventivo-rapido');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Genera particelle fluttuanti
  const particles = Array.from({ length: 30 }, (_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${15 + Math.random() * 10}s`
      }}
    />
  ));

  return (
    <header className="relative min-h-screen flex items-center overflow-hidden">
      {/* Particles Background */}
      <div className="particles-bg">
        {particles}
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 hero-bg">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90"
          style={{
            backgroundImage: 'url(/images/copertina.jpg)',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Overlay dinamico che segue il mouse */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)`,
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        />
      </div>

      {/* Content IPNOTIZZANTE */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center text-white">
        <div className="max-w-5xl mx-auto">
          
          {/* Logo SPETTACOLARE con effetti */}
          <div className={`mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="relative inline-flex items-center justify-center mb-8">
              {/* Anelli di luce rotanti attorno al logo */}
              <div className="absolute inset-0 w-48 h-48 border-2 border-green-500/30 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
              <div className="absolute inset-2 w-44 h-44 border border-green-400/20 rounded-full animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}></div>
              
              <div className="relative group">
                <img 
                  src="/images/logo.jpg" 
                  alt="NoLimits3D - Il Futuro della Stampa 3D" 
                  className="w-40 h-40 md:w-48 md:h-48 object-contain rounded-full shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 neon-glow"
                  loading="eager"
                  width="192"
                  height="192"
                />
                
                {/* Effetto bagliore pulsante */}
                <div className="absolute inset-0 w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-500/20 blur-xl"></div>
              </div>
            </div>
          </div>

          {/* Titolo MAGNETICO */}
          <div className={`mb-6 sm:mb-8 transform transition-all duration-1200 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-3 sm:mb-4 leading-tight">
              <span className="inline-block hover:scale-110 transition-transform duration-300 cursor-default">
                <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                  NoLimits
                </span>
                <span className="bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 bg-clip-text text-transparent">
                  3D
                </span>
              </span>
            </h1>
            
            {/* Sottotitolo con effetto typewriter */}
            <div className="relative">
              {/* Mobile: testo più corto e compatto */}
              <p className="text-base sm:text-xl md:text-3xl lg:text-4xl font-light text-gray-200 mb-3 sm:mb-4">
                <span className="block sm:inline">🚀 <span className="font-semibold text-green-400">Trasforma le IDEE</span></span>
                <span className="block sm:inline"> in oggetti <span className="font-semibold text-emerald-400">REALI</span> 🚀</span>
              </p>
              <p className="text-sm sm:text-lg md:text-xl text-gray-300 font-medium mb-4 sm:mb-6">
                <span className="block sm:inline">Il tuo oggetto personalizzato stampato in 3D</span>
                <span className="block sm:inline"> con precisione millimetrica</span>
              </p>
              
              {/* SLOGAN ACCATTIVANTI - Mobile compatto */}
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-base md:text-lg">
                <p className="text-yellow-400 font-bold">
                  <span className="block sm:inline">✨ "Hai un'IDEA?</span>
                  <span className="block sm:inline"> Noi la rendiamo REALTÀ!" ✨</span>
                </p>
                <p className="text-pink-400 font-bold">
                  <span className="block sm:inline">💝 "Il REGALO perfetto?</span>
                  <span className="block sm:inline"> Lo creiamo INSIEME!" 💝</span>
                </p>
                <p className="text-cyan-400 font-bold">
                  🎨 "Oggetti UNICI come TE!" 🎨
                </p>
              </div>
            </div>
          </div>

          {/* Badge MAGNETICI - Mobile ottimizzato */}
          <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-6 mb-8 sm:mb-12 transform transition-all duration-1400 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="glass-card px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full floating border border-green-500/30">
              <div className="flex items-center">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 text-yellow-400" />
                <span className="text-xs sm:text-sm md:text-base font-semibold">⚡ Preventivo in 2 ore</span>
              </div>
            </div>
            
            <div className="glass-card px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full floating border border-emerald-500/30">
              <div className="flex items-center">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 text-green-400" />
                <span className="text-xs sm:text-sm md:text-base font-semibold">🎁 Oggetti UNICI personalizzati</span>
              </div>
            </div>
            
            <div className="glass-card px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full floating border border-green-400/30">
              <div className="flex items-center">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 text-emerald-400" />
                <span className="text-xs sm:text-sm md:text-base font-semibold">💝 Regali che STUPISCONO</span>
              </div>
            </div>
            
            <div className="glass-card px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full floating border border-blue-500/30">
              <div className="flex items-center">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 text-blue-400" />
                <span className="text-xs sm:text-sm md:text-base font-semibold">🚗 Consegna GRATIS in Ciociaria (&gt;20€)</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons - Mobile ottimizzato */}
          <div className={`flex flex-col gap-3 sm:gap-4 md:gap-6 justify-center items-center mb-8 sm:mb-12 transform transition-all duration-1600 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <button 
              onClick={scrollToQuoteForm}
              className="btn-magnetic text-white font-bold px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg lg:text-xl flex items-center justify-center group shadow-2xl hover:shadow-green-500/50 transition-all duration-300 w-full max-w-xs sm:max-w-sm md:w-auto"
              aria-label="Richiedi un preventivo gratuito ora"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 group-hover:rotate-12 transition-transform neon-glow" />
              <span className="truncate">🎯 REALIZZA LA TUA IDEA</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform flex-shrink-0" />
            </button>
            
            <a 
              href="#gallery" 
              className="glass-card border-2 border-white/30 text-white hover:bg-white hover:text-black font-bold px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full max-w-xs sm:max-w-sm md:w-auto text-center"
              aria-label="Scopri gli oggetti personalizzati che creiamo"
            >
              🎨 Oggetti Personalizzati
            </a>
          </div>

          {/* Trust Indicators IPNOTIZZANTI */}
          <div className={`text-center transform transition-all duration-1800 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="glass-card inline-block px-4 py-3 sm:px-8 sm:py-6 rounded-xl sm:rounded-2xl border border-green-500/20 mx-4">
              <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-2 sm:mb-4 font-medium">
                🏆 <span className="text-green-400 font-bold">CREIAMO OGGETTI UNICI</span> su Misura per Te 🏆
              </p>
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs md:text-sm text-gray-400">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-1 sm:mr-2"></div>
                  <span>🎁 Regali Personalizzati</span>
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-400 rounded-full mr-1 sm:mr-2"></div>
                  <span>✨ Idee Realizzate</span>
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1 sm:mr-2"></div>
                  <span>💝 Oggetti UNICI</span>
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mr-1 sm:mr-2"></div>
                  <span>🚗 Consegna Gratis Ciociaria (&gt;20€)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator MAGNETICO */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <div className="glass-card w-8 h-14 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-2 h-6 bg-gradient-to-b from-green-400 to-emerald-500 rounded-full"></div>
        </div>
        <p className="text-white text-xs mt-2 font-medium">Scorri per scoprire</p>
      </div>
    </header>
  );
};

export default Header;