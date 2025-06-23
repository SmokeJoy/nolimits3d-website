import React from 'react';
import LegalPages from '../components/LegalPages';
import SEOHead from '../components/SEOHead';

const Legal: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Informazioni Legali - Privacy Policy, Termini di Servizio | NoLimits3D"
        description="Privacy Policy, Termini di Servizio e Cookie Policy di NoLimits3D. Trasparenza totale nel trattamento dei dati e condizioni di utilizzo dei nostri servizi di stampa 3D."
        keywords="privacy policy, termini servizio, cookie policy, gdpr, protezione dati, NoLimits3D"
        canonicalUrl="https://nolimits3d.store/legal"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Informazioni Legali
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Trasparenza e chiarezza sono i nostri principi. Qui trovi tutte le informazioni 
              su privacy, termini di servizio e utilizzo dei cookie.
            </p>
          </div>

          {/* Legal Pages Component */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <LegalPages />
          </div>
          
          {/* Contact Info per questioni legali */}
          <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Hai domande sui tuoi diritti?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Per qualsiasi chiarimento su privacy, termini di servizio o esercizio dei tuoi diritti, 
              contattaci direttamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:nolimits.3d.print@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
              >
                📧 Email: nolimits.3d.print@gmail.com
              </a>
              <a 
                href="tel:+393770918590"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold"
              >
                📞 Telefono: +39 377 091 8590
              </a>
            </div>
          </div>

          {/* Cookie Preferences */}
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              🍪 Gestione Cookie
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Puoi gestire le tue preferenze sui cookie in qualsiasi momento.
            </p>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).tarteaucitron) {
                  (window as any).tarteaucitron.userInterface.openPanel();
                } else {
                  alert('Sistema di gestione cookie non disponibile al momento.');
                }
              }}
              className="inline-flex items-center justify-center px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-300 font-semibold"
            >
              🍪 Gestisci Preferenze Cookie
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Legal; 