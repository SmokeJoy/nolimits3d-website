import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GalleryPage from './pages/Gallery';
import About from './pages/About';
import ContactPage from './pages/Contact';
import Blog from './pages/Blog';
import Legal from './pages/Legal';
import Stampa3DCassino from './pages/Stampa3DCassino';
import Stampa3DLatina from './pages/Stampa3DLatina';
import Materiali from './pages/Materiali';
import Preventivatore from './pages/Preventivatore';
import NotFound from './pages/NotFound';

// Componente per singolo articolo del blog
const BlogArticle: React.FC = () => {
  return <Blog />;
};

// Dichiarazione per gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters: Record<string, string>) => void;
  }
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galleria" element={<GalleryPage />} />
        <Route path="/chi-siamo" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        {/* Route specifiche per articoli del blog */}
        <Route path="/blog/materiali-stampa-3d" element={<BlogArticle />} />
        <Route path="/blog/problemi-stampa-3d" element={<BlogArticle />} />
        <Route path="/blog/dfam-design-stampa-3d" element={<BlogArticle />} />
        <Route path="/blog/post-processing-stampa-3d" element={<BlogArticle />} />
        <Route path="/blog/manutenzione-klipper-stampante-3d" element={<BlogArticle />} />
        <Route path="/blog/quanto-costa-stampare-3d" element={<BlogArticle />} />
        <Route path="/blog/prototipazione-stampa-3d-frosinone" element={<BlogArticle />} />
        <Route path="/contatti" element={<ContactPage />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/stampa-3d-cassino" element={<Stampa3DCassino />} />
        <Route path="/stampa-3d-latina" element={<Stampa3DLatina />} />
        <Route path="/materiali" element={<Materiali />} />
        <Route path="/preventivatore" element={<Preventivatore />} />
        {/* Redirect old routes for compatibility */}
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* 404 Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;