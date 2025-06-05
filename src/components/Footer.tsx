import React, { useEffect, useState } from 'react';
import { Instagram, Facebook, Mail, MapPin, Phone, Cuboid as Cube3d } from 'lucide-react';

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand e Descrizione */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Cube3d size={28} className="text-green-400 mr-2" />
              <h3 className="text-xl font-bold">NoLimits3D</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Servizio di stampa 3D FDM professionale. Prototipazione industriale, componenti tecnici 
              e produzione su misura con materiali certificati e processi di qualità controllata.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61570487165349" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="Facebook NoLimits3D"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/nolimits_3d_print" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors"
                aria-label="Instagram NoLimits3D"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Contatti */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contatti</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-300">
                <Mail size={16} className="mr-2 text-green-400" />
                <a href="mailto:nolimits.3d.print@gmail.com" className="hover:text-green-400 transition-colors">
                  nolimits.3d.print@gmail.com
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone size={16} className="mr-2 text-green-400" />
                <a href="tel:+393770918590" className="hover:text-green-400 transition-colors">
                  +39 377 091 8590
                </a>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin size={16} className="mr-2 text-green-400 mt-1" />
                <span>Via Dante Alighieri<br />03100 Frosinone, FR</span>
              </div>
            </div>
          </div>

          {/* Servizi */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">I nostri servizi</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Stampa 3D FDM professionale</li>
              <li>• Prototipazione rapida</li>
              <li>• Componenti tecnici su misura</li>
              <li>• Gadget personalizzati</li>
              <li>• Reverse engineering</li>
              <li>• Consulenza tecnica specializzata</li>
              <li className="text-blue-300 font-semibold">🚗 Consegna GRATIS in Ciociaria (&gt;20€)</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} NoLimits3D – Tutti i diritti riservati.</p>
            <p className="text-xs mt-1">Ultimo aggiornamento: Giugno 2025</p>
          </div>
          <div className="flex space-x-6">
            <a href="#legal" onClick={() => {
              document.getElementById('legal')?.scrollIntoView({ behavior: 'smooth' });
              // Set privacy section active - would need state management in real implementation
            }} className="hover:text-green-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#legal" onClick={() => {
              document.getElementById('legal')?.scrollIntoView({ behavior: 'smooth' });
            }} className="hover:text-green-400 transition-colors">
              Termini di Servizio
            </a>
            <a href="#legal" onClick={() => {
              document.getElementById('legal')?.scrollIntoView({ behavior: 'smooth' });
            }} className="hover:text-green-400 transition-colors">
              Cookie Policy
            </a>
            <a href="#tarteaucitron" onClick={(e) => {
              e.preventDefault();
              if (typeof window !== 'undefined' && (window as any).tarteaucitron) {
                (window as any).tarteaucitron.userInterface.openPanel();
              }
            }} className="hover:text-green-400 transition-colors">
              🍪 Preferenze Cookie
            </a>
          </div>
        </div>
      </div>

      {/* Structured Data per SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "NoLimits3D",
          "image": "https://nolimits3d.store/images/logo.jpg",
          "description": "Servizio di stampa 3D FDM professionale con materiali tecnici certificati. Prototipazione industriale e produzione componenti con preventivi gratuiti in 2 ore lavorative.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Via Dante Alighieri",
            "addressLocality": "Frosinone",
            "postalCode": "03100",
            "addressRegion": "FR",
            "addressCountry": "IT"
          },
          "telephone": "+393770918590",
          "email": "nolimits.3d.print@gmail.com",
          "url": "https://nolimits3d.store",
          "openingHours": "Mo-Fr 09:00-18:00",
          "sameAs": [
            "https://www.facebook.com/profile.php?id=61570487165349",
            "https://www.instagram.com/nolimits_3d_print"
          ]
        })}
      </script>
    </footer>
  );
};

export default Footer;