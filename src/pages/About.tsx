import React from 'react';
import Testimonials from '../components/Testimonials';
import TechnicalSpecs from '../components/TechnicalSpecs';
import FAQ from '../components/FAQ';
import SEOHead from '../components/SEOHead';
import { Users, Award, Zap } from '../icons';

const About: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Chi Siamo | NoLimits3D - Esperti in Stampa 3D FDM Professionale"
        description="Scopri NoLimits3D, il team di esperti in stampa 3D FDM a Frosinone. Passione per l'innovazione, tecnologie avanzate e servizio clienti eccellente per le tue idee."
        keywords="chi siamo, nolimits3d, stampa 3d frosinone, team esperti, innovazione, tecnologia fdm, servizio clienti"
        canonicalUrl="https://nolimits3d.store/chi-siamo"
        type="website"
      />
      
      <main className="pt-20">
      {/* Hero Section per About */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-emerald-500/5 animate-pulse"></div>
        </div>
        
        <div className="section-container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              Chi Siamo
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium mb-12">
            🚀 La <span className="text-green-400 font-bold">passione per l'innovazione</span> incontra la <span className="text-emerald-400 font-bold">precisione tecnologica</span> 🚀
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-2xl border border-green-500/30">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4 neon-glow" />
              <h3 className="text-2xl font-bold text-white mb-2">500+</h3>
              <p className="text-gray-300">Clienti Soddisfatti</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl border border-emerald-500/30">
              <Award className="w-12 h-12 text-emerald-400 mx-auto mb-4 neon-glow" />
              <h3 className="text-2xl font-bold text-white mb-2">1000+</h3>
              <p className="text-gray-300">Progetti Realizzati</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl border border-green-400/30">
              <Zap className="w-12 h-12 text-green-500 mx-auto mb-4 neon-glow" />
              <h3 className="text-2xl font-bold text-white mb-2">2 Ore</h3>
              <p className="text-gray-300">Tempo Preventivo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chi Siamo - Descrizione */}
      <section className="py-20 relative">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-3xl border border-green-500/20">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                La Nostra <span className="text-green-400">Missione</span>
              </h2>
              
              <div className="prose prose-lg text-gray-300 max-w-none">
                <p className="text-xl leading-relaxed mb-6">
                  <span className="text-green-400 font-bold">NoLimits3D</span> nasce dalla passione per l'innovazione e dalla volontà di rendere accessibile a tutti la magia della stampa 3D. 
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Crediamo che ogni <span className="text-emerald-400 font-bold">idea meritevole</span> di diventare realtà, trasformando i sogni in oggetti tangibili con la precisione millimetrica delle nostre stampanti 3D professionali.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Il nostro team combina <span className="text-green-400 font-bold">competenza tecnica</span> e <span className="text-emerald-400 font-bold">creatività</span> per offrire soluzioni su misura, dalla prototipazione rapida ai regali personalizzati più unici.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <TechnicalSpecs />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* FAQ */}
      <FAQ />
    </main>
    </>
  );
};

export default About; 