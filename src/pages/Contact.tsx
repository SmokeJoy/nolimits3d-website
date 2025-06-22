import React from 'react';
import Contact from '../components/Contact';

const ContactPage: React.FC = () => {
  return (
    <main className="pt-20">
      {/* Hero Section per Contact */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-emerald-500/5 animate-pulse"></div>
        </div>
        
        <div className="section-container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              Contattaci
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium mb-8">
            💬 Trasforma le tue <span className="text-green-400 font-bold">idee in realtà</span> - siamo qui per aiutarti! 💬
          </p>
          
          {/* Sezione Chatbot Info */}
          <div className="glass-card inline-block px-6 py-4 rounded-2xl border border-green-500/20">
            <p className="text-gray-300 text-sm md:text-base mb-2">
              💬 <span className="text-green-400 font-bold">Domande immediate?</span> Il nostro <span className="text-emerald-400 font-bold">Chatbot AI</span> è sempre disponibile! 💬
            </p>
            <p className="text-gray-400 text-xs md:text-sm">
              🤖 Risposte istantanee su materiali, consigli tecnici e informazioni generali sulla stampa 3D
            </p>
          </div>
        </div>
      </section>

      {/* Contact Component */}
      <Contact />
    </main>
  );
};

export default ContactPage; 