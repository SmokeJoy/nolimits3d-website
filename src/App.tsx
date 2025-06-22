import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GalleryPage from './pages/Gallery';
import About from './pages/About';
import ContactPage from './pages/Contact';
import Blog from './pages/Blog';

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
        <Route path="/contatti" element={<ContactPage />} />
        {/* Redirect old routes for compatibility */}
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Layout>
  );
}

export default App;