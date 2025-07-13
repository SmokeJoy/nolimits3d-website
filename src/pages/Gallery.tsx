import React from 'react';
import Gallery from '../components/Gallery';
import TimelapseSection from '../components/TimelapseSection';
import SEOHead from '../components/SEOHead';

const GalleryPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Galleria Progetti | NoLimits3D - Stampe 3D e Time-lapse"
        description="Scopri i nostri progetti di stampa 3D: prototipi, oggetti personalizzati e time-lapse. Galleria completa dei lavori realizzati da NoLimits3D a Frosinone."
        keywords="galleria, progetti stampa 3d, prototipi, oggetti personalizzati, time-lapse, portfolio, esempi stampa 3d"
        canonicalUrl="https://nolimits3d.store/galleria"
        type="website"
      />
      
      <main className="pt-20">
      {/* Hero Section per Gallery */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-emerald-500/5 animate-pulse"></div>
        </div>
        
        <div className="section-container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              Galleria
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 bg-clip-text text-transparent">
              Progetti
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium">
            🎨 Scopri le nostre <span className="text-green-400 font-bold">creazioni uniche</span> e i <span className="text-emerald-400 font-bold">time-lapse</span> dei progetti 🎨
          </p>
        </div>
      </section>

      {/* Gallery Component */}
      <Gallery />
      
      {/* Timelapse Section */}
      <TimelapseSection />
    </main>
    </>
  );
};

export default GalleryPage; 