import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  category: 'prototipi' | 'personaggi' | 'gadget' | 'decorazioni' | 'giocattoli' | 'componenti' | 'tutti';
  imageUrl: string;
  tags: string[];
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'tutti' | 'prototipi' | 'personaggi' | 'gadget' | 'decorazioni' | 'giocattoli' | 'componenti'>('tutti');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const galleryItems: GalleryItem[] = [
    // PROTOTIPI - Progetti tecnici e architettonici
    {
      id: 1,
      title: "Torre Eiffel",
      description: "Replica dettagliata della Torre Eiffel con struttura reticolare precisa",
      category: 'prototipi',
      imageUrl: '/images/torre eiffel.jpg',
      tags: ['Architettura', 'Monumenti', 'Dettagliato']
    },
    {
      id: 2,
      title: "Busto Spider-Man",
      description: "Busto dettagliato di Spider-Man con texture realistica",
      category: 'prototipi',
      imageUrl: '/images/Collage busto Spiderman.jpg',
      tags: ['Busti', 'Supereroi', 'Alta definizione']
    },
    {
      id: 3,
      title: "3D Benchy",
      description: "Il famoso test di stampa 3D Benchy per calibrazione",
      category: 'prototipi',
      imageUrl: '/images/3D Benchy.jpg',
      tags: ['Test', 'Calibrazione', 'Qualità']
    },
    {
      id: 4,
      title: "Torre per Dadi",
      description: "Torre funzionale per il lancio dei dadi da gioco",
      category: 'prototipi',
      imageUrl: '/images/Torre dadi.jpg',
      tags: ['Funzionale', 'Gaming', 'Meccanico']
    },

    // PERSONAGGI - Action figures e statuette
    {
      id: 5,
      title: "Son Goku - Tributo a Toriyama",
      description: "Tributo speciale a Akira Toriyama con Son Goku iconico",
      category: 'personaggi',
      imageUrl: '/images/Son goku dedica a Toriyama San.jpg',
      tags: ['Dragon Ball', 'Commemorativo', 'Action Figure']
    },
    {
      id: 6,
      title: "Venom",
      description: "Action figure dettagliata del simbionte Venom",
      category: 'personaggi',
      imageUrl: '/images/Venom.jpg',
      tags: ['Marvel', 'Simbionte', 'Collezione']
    },
    {
      id: 7,
      title: "Broly vs Goku",
      description: "Diorama epico dello scontro tra Broly e Goku",
      category: 'personaggi',
      imageUrl: '/images/Broly Vs goku.jpg',
      tags: ['Dragon Ball', 'Diorama', 'Epico']
    },
    {
      id: 8,
      title: "Majin Bu",
      description: "Il potente Majin Bu di Dragon Ball Z",
      category: 'personaggi',
      imageUrl: '/images/Maginbu.jpg',
      tags: ['Dragon Ball', 'Majin', 'Potente']
    },
    {
      id: 9,
      title: "Kali Dragon",
      description: "Drago mistico Kali con dettagli orientali",
      category: 'personaggi',
      imageUrl: '/images/kali Dragon.jpg',
      tags: ['Dragon Ball', 'Drago', 'Mistico']
    },
    {
      id: 10,
      title: "Il Piccolo Principe",
      description: "Il celebre personaggio de Il Piccolo Principe",
      category: 'personaggi',
      imageUrl: '/images/Il piccolo principe.jpg',
      tags: ['Letteratura', 'Classico', 'Artistico']
    },
    {
      id: 11,
      title: "Homer Simpson Buddha",
      description: "Fusione creativa tra Homer Simpson e Buddha",
      category: 'personaggi',
      imageUrl: '/images/Homer Simpson Budda.jpg',
      tags: ['Simpson', 'Umoristico', 'Buddha']
    },
    {
      id: 12,
      title: "Operatore Microfonista",
      description: "Figura professionale di operatore con microfono",
      category: 'personaggi',
      imageUrl: '/images/Operatore microfonista.jpg',
      tags: ['Professionale', 'Operatore', 'Microfono']
    },
    {
      id: 13,
      title: "Statuetta Fortnite",
      description: "Personaggio iconico dal videogioco Fortnite",
      category: 'personaggi',
      imageUrl: '/images/Statutta Fortenite.jpg',
      tags: ['Gaming', 'Fortnite', 'Action Figure']
    },
    {
      id: 14,
      title: "Mandy",
      description: "Personaggio Mandy con stile unico",
      category: 'personaggi',
      imageUrl: '/images/Mandy.jpg',
      tags: ['Cartoon', 'Action Figure', 'Dettagliato']
    },
    {
      id: 15,
      title: "Gufetti",
      description: "Coppia di gufetti decorativi adorabili",
      category: 'personaggi',
      imageUrl: '/images/Gufetti.jpg',
      tags: ['Decorativi', 'Animali', 'Carini']
    },

    // POKEMON - Creature leggendarie
    {
      id: 16,
      title: "Pikachu",
      description: "L'iconico Pokémon elettrico Pikachu",
      category: 'personaggi',
      imageUrl: '/images/Picaciu.jpg',
      tags: ['Pokemon', 'Elettrico', 'Iconico']
    },
    {
      id: 17,
      title: "Pikachu Deadpool",
      description: "Fusione unica tra Pikachu e Deadpool",
      category: 'personaggi',
      imageUrl: '/images/Pikaciu Deadpool.jpg',
      tags: ['Pokemon', 'Marvel', 'Crossover']
    },
    {
      id: 18,
      title: "Mew",
      description: "Il leggendario Pokémon psichico Mew",
      category: 'personaggi',
      imageUrl: '/images/Mew.jpg',
      tags: ['Pokemon', 'Leggendario', 'Psichico']
    },
    {
      id: 19,
      title: "Mew Love",
      description: "Versione romantica di Mew con cuore",
      category: 'personaggi',
      imageUrl: '/images/Mew LOVE.jpg',
      tags: ['Pokemon', 'Amore', 'Romantico']
    },
    {
      id: 20,
      title: "Cloyster",
      description: "Pokémon acquatico Cloyster con conchiglia",
      category: 'personaggi',
      imageUrl: '/images/Cloyster.jpg',
      tags: ['Pokemon', 'Acquatico', 'Conchiglia']
    },
    {
      id: 21,
      title: "Gengar",
      description: "Il Pokémon fantasma Gengar dall'aspetto inquietante",
      category: 'personaggi',
      imageUrl: '/images/Gengar.jpg',
      tags: ['Pokemon', 'Fantasma', 'Spettrale']
    },
    {
      id: 22,
      title: "Nidoran",
      description: "Pokémon velenoso Nidoran con aculei",
      category: 'personaggi',
      imageUrl: '/images/Nidoran.jpg',
      tags: ['Pokemon', 'Veleno', 'Aculei']
    },
    {
      id: 23,
      title: "Onix",
      description: "Il gigantesco Pokémon roccia Onix",
      category: 'personaggi',
      imageUrl: '/images/Onix.jpg',
      tags: ['Pokemon', 'Roccia', 'Gigante']
    },

    // GADGET - Oggetti funzionali e decorativi
    {
      id: 24,
      title: "Portachiavi Personalizzati",
      description: "Portachiavi unici personalizzati con il tuo design",
      category: 'gadget',
      imageUrl: '/images/Portachiavi.jpg',
      tags: ['Personalizzato', 'Accessori', 'Regalo']
    },
    {
      id: 25,
      title: "Barattolo Fungo Super Mario",
      description: "Contenitore a forma di fungo dal mondo di Super Mario",
      category: 'gadget',
      imageUrl: '/images/Barattolo Fungo Super Mario.jpg',
      tags: ['Nintendo', 'Contenitore', 'Gaming']
    },
    {
      id: 26,
      title: "Casa SpongeBob per Pesci",
      description: "Acquario decorativo a forma della casa di SpongeBob",
      category: 'gadget',
      imageUrl: '/images/Casa Spongebob per pesci.jpg',
      tags: ['Acquario', 'SpongeBob', 'Decorativo']
    },
    {
      id: 27,
      title: "SpongeBob",
      description: "La spugna gialla più famosa del mondo",
      category: 'personaggi',
      imageUrl: '/images/Spongebob.jpg',
      tags: ['Cartoon', 'Nickelodeon', 'Spugna']
    },
    {
      id: 28,
      title: "Portavaso Grout",
      description: "Elegante portavaso con design geometrico Grout",
      category: 'decorazioni',
      imageUrl: '/images/Portavaso Grout.JPG',
      tags: ['Vaso', 'Geometrico', 'Elegante']
    },

    // DECORAZIONI NATALIZIE
    {
      id: 29,
      title: "Decorazione Natalizia",
      description: "Ornamento natalizio con design festivo",
      category: 'decorazioni',
      imageUrl: '/images/Natalizio.jpg',
      tags: ['Natale', 'Festivo', 'Ornamento']
    },
    {
      id: 30,
      title: "Patrick Stella Natalizio",
      description: "Patrick Stella in versione natalizia",
      category: 'decorazioni',
      imageUrl: '/images/Patric stella Natalizio.JPG',
      tags: ['SpongeBob', 'Natale', 'Stellamarina']
    },
    {
      id: 31,
      title: "Puntale Natalizio Mew",
      description: "Puntale per albero di Natale con Mew",
      category: 'decorazioni',
      imageUrl: '/images/Puntale Natalizio Mew.JPG',
      tags: ['Natale', 'Pokemon', 'Albero']
    },
    {
      id: 32,
      title: "Telespallabob Fioriera",
      description: "Simpatico contenitore per piante a forma di Teletubby",
      category: 'decorazioni',
      imageUrl: '/images/Telespallabob Fioriera.jpg',
      tags: ['Teletubby', 'Piante', 'Colorato']
    },

    // SPECIALI
    {
      id: 33,
      title: "Elefante dell'Amore",
      description: "Simbolo d'amore con elefante portafortuna",
      category: 'decorazioni',
      imageUrl: '/images/Elefhant love.jpg',
      tags: ['Amore', 'Portafortuna', 'Simbolico']
    },
    {
      id: 34,
      title: "Son Goku Nuvola Speedy",
      description: "Goku sulla sua nuvola volante Speedy",
      category: 'personaggi',
      imageUrl: '/images/Son Goku nuvola sipdi.JPG',
      tags: ['Dragon Ball', 'Nuvola', 'Volo']
    }
  ];

  const categories = [
    { id: 'tutti' as const, label: 'Tutti i Progetti', count: galleryItems.length },
    { id: 'prototipi' as const, label: 'Prototipi Tecnici', count: galleryItems.filter(item => item.category === 'prototipi').length },
    { id: 'personaggi' as const, label: 'Personaggi & Figure', count: galleryItems.filter(item => item.category === 'personaggi').length },
    { id: 'gadget' as const, label: 'Gadget & Accessori', count: galleryItems.filter(item => item.category === 'gadget').length },
    { id: 'decorazioni' as const, label: 'Decorazioni Natalizie', count: galleryItems.filter(item => item.category === 'decorazioni').length },
    { id: 'giocattoli' as const, label: 'Giocattoli & Gaming', count: galleryItems.filter(item => item.category === 'giocattoli').length },
    { id: 'componenti' as const, label: 'Personalizzazioni', count: galleryItems.filter(item => item.category === 'componenti').length }
  ];

  const filteredItems = selectedCategory === 'tutti' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    setCurrentImageIndex(filteredItems.findIndex(i => i.id === item.id));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = currentImageIndex < filteredItems.length - 1 ? currentImageIndex + 1 : 0;
    } else {
      newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredItems.length - 1;
    }
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <section id="gallery" className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            La Nostra Gallery
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Esplora i nostri progetti realizzati: dai prototipi funzionali ai gadget personalizzati, 
            fino ai ricambi di precisione. Ogni stampa racconta una storia di innovazione.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {category.label}
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => openLightbox(item)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X className="w-8 h-8" />
              </button>
              
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain"
              />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedImage.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;