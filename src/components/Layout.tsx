import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';
import ChatWidget from './ChatWidget';
import WhatsAppButton from './WhatsAppButton';
import { Moon, Sun, SkipForward, ArrowUp, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? false : true;
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'theme_toggle', {
        event_category: 'ui_interaction',
        event_label: darkMode ? 'light' : 'dark'
      });
    }
  };

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

  const navLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/galleria', label: 'Galleria', icon: '🎨' },
    { to: '/chi-siamo', label: 'Chi Siamo', icon: '👥' },
    { to: '/blog', label: 'Blog & Guide', icon: '📚' },
    { to: '/contatti', label: 'Contatti', icon: '📞' }
  ];

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

      {/* Skip Links */}
      <a 
        href="#main-content"
        onClick={skipToMain}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 btn-magnetic text-white px-6 py-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/50"
      >
        <SkipForward className="w-4 h-4 inline mr-2" />
        Salta al contenuto principale
      </a>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b border-green-500/20">
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/images/logo.jpg" 
                alt="NoLimits3D" 
                className="w-10 h-10 rounded-full object-contain group-hover:scale-110 transition-transform"
              />
              <span className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                NoLimits3D
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 border-2 font-bold text-sm ${
                    location.pathname === link.to
                      ? 'text-white bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/30'
                      : 'text-white bg-gray-700 border-gray-600 hover:bg-blue-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 hover:transform'
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-green-400 hover:bg-green-500/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-green-500/20">
              <div className="flex flex-col space-y-2">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center space-x-3 px-6 py-4 rounded-lg transition-all duration-300 border-2 font-bold ${
                      location.pathname === link.to
                        ? 'text-white bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/30'
                        : 'text-white bg-gray-700 border-gray-600 hover:bg-blue-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 hover:transform'
                    }`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Dark Mode Toggle */}
      <div className="fixed top-20 right-6 z-50">
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

      {/* Main Content */}
      {children}

      {/* Footer */}
      <Footer />

      {/* Chat Widget */}
      <ChatWidget />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 glass-card p-4 rounded-2xl border-2 border-green-500/30 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-500/50 group"
          aria-label="Torna all'inizio"
        >
          <ArrowUp className="w-6 h-6 text-green-400 neon-glow group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
};

export default Layout; 