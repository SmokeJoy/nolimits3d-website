import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Pagina non trovata - 404 | NoLimits3D"
        description="La pagina che stai cercando non esiste. Torna alla homepage di NoLimits3D per scoprire i nostri servizi di stampa 3D professionale a Frosinone."
        url="https://nolimits3d.store/404"
        type="website"
      />
      
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="section-container text-center">
          <div className="max-w-2xl mx-auto">
            {/* 404 Visual */}
            <div className="mb-8">
              <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text">
                404
              </h1>
            </div>
            
            {/* Error Message */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Oops! Pagina non trovata
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                La pagina che stai cercando potrebbe essere stata spostata, rinominata o non esiste più.
              </p>
            </div>
            
            {/* Navigation Options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                to="/"
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/50"
              >
                <Home className="w-5 h-5" />
                <span>Torna alla Homepage</span>
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Torna Indietro</span>
              </button>
            </div>
            
            {/* Quick Links */}
            <div className="border-t border-gray-700 pt-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Pagine popolari:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  to="/galleria"
                  className="text-green-400 hover:text-green-300 transition-colors duration-200 hover:underline"
                >
                  🎨 Galleria
                </Link>
                <Link
                  to="/preventivatore"
                  className="text-green-400 hover:text-green-300 transition-colors duration-200 hover:underline"
                >
                  💰 Preventivatore
                </Link>
                <Link
                  to="/blog"
                  className="text-green-400 hover:text-green-300 transition-colors duration-200 hover:underline"
                >
                  📚 Blog & Guide
                </Link>
                <Link
                  to="/contatti"
                  className="text-green-400 hover:text-green-300 transition-colors duration-200 hover:underline"
                >
                  📞 Contatti
                </Link>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-gray-300 mb-2">
                Se pensi che questa sia una pagina che dovrebbe esistere, contattaci:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="tel:+393770918590"
                  className="text-green-400 hover:text-green-300 transition-colors duration-200"
                >
                  📞 +39 377 091 8590
                </a>
                <a
                  href="mailto:nolimits.3d.print@gmail.com"
                  className="text-green-400 hover:text-green-300 transition-colors duration-200"
                >
                  ✉️ nolimits.3d.print@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound; 