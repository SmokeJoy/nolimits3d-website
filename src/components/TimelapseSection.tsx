import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronLeft, ChevronRight, Eye, Clock, Sparkles } from 'lucide-react';

interface TimelapseVideo {
  id: string;
  title: string;
  description: string;
  category: 'personaggi' | 'gadget' | 'tecnici' | 'decorazioni' | 'special';
  duration: string;
  complexity: 'Semplice' | 'Medio' | 'Complesso';
  material: string;
  filename: string;
  thumbnail?: string;
}

const TimelapseSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<TimelapseVideo | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'personaggi' | 'gadget' | 'tecnici' | 'decorazioni' | 'special'>('all');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // SICUREZZA MASSIMA: Sanitizzazione e validazione migliorata
  const sanitizeFilename = useCallback((filename: string): string => {
    // Rimuove caratteri pericolosi e mantiene solo caratteri alfanumerici, punti, trattini e underscore
    return filename.replace(/[^a-zA-Z0-9.\-_\s]/g, '').trim();
  }, []);

  const validateVideoFormat = useCallback((filename: string): boolean => {
    const allowedExtensions = ['.mp4', '.webm', '.mov'];
    // Normalizza il filename rimuovendo estensioni doppie o malformate
    const normalizedFilename = filename.toLowerCase().replace(/\.mp4\.mp4$/, '.mp4').replace(/\.mp42\.mp4$/, '.mp4');
    return allowedExtensions.some(ext => normalizedFilename.endsWith(ext));
  }, []);

  // Funzione per normalizzare i nomi dei file
  const normalizeFilename = useCallback((filename: string): string => {
    return filename
      .replace(/\.mp42\.mp4$/, '.mp4') // Corregge estensioni doppie malformate
      .replace(/\.mp4\.mp4$/, '.mp4') // Corregge estensioni doppie
      .trim();
  }, []);

  // DATABASE SICURO dei time-lapse
  const timelapseVideos: TimelapseVideo[] = [
    // PERSONAGGI & CHARACTER
    {
      id: 'venom-base',
      title: 'Base Venom',
      description: 'Time-lapse della stampa della base del simbionte Venom con dettagli incredibili',
      category: 'personaggi',
      duration: '6h 30m',
      complexity: 'Complesso',
      material: 'PLA Black',
      filename: 'Base Venom.mp4'
    },
    {
      id: 'mandy-character',
      title: 'Personaggio Mandy',
      description: 'Stampa completa del personaggio Mandy con texture dettagliate',
      category: 'personaggi',
      duration: '12h 15m',
      complexity: 'Complesso',
      material: 'PLA Multi-color',
      filename: 'Mandy.mp4'
    },
    {
      id: 'kali-dragon',
      title: 'Drago Kali',
      description: 'Maestoso drago orientale con scale texturizzate',
      category: 'personaggi',
      duration: '4h 20m',
      complexity: 'Complesso',
      material: 'PLA Gold',
      filename: 'Kali dragon.mp4'
    },
    {
      id: 'sdentato',
      title: 'Sdentato (How to Train Your Dragon)',
      description: 'Il simpatico drago nero Sdentato in versione 3D',
      category: 'personaggi',
      duration: '3h 45m',
      complexity: 'Medio',
      material: 'PLA Black',
      filename: 'Sdentato.mp4'
    },
    {
      id: 'gufetti',
      title: 'Gufetti Adorabili',
      description: 'Coppia di gufetti decorativi con espressioni tenere',
      category: 'personaggi',
      duration: '2h 15m',
      complexity: 'Semplice',
      material: 'PLA Multi-color',
      filename: 'Gufetti.mp4'
    },
    {
      id: 'spider-base',
      title: 'Base Spider-Man',
      description: 'Base per statuetta di Spider-Man con ragnatela',
      category: 'personaggi',
      duration: '3h 20m',
      complexity: 'Medio',
      material: 'PLA Red/Blue',
      filename: 'Base Soiderman.mp4'
    },
    {
      id: 'fortnite-legs',
      title: 'Gambe Statuetta Fortnite',
      description: 'Gambe articolate per personaggio Fortnite',
      category: 'personaggi',
      duration: '8h 45m',
      complexity: 'Complesso',
      material: 'PLA Multi-color',
      filename: 'Gambe statuetta fortnite.mp4'
    },
    {
      id: 'alien-mask',
      title: 'Maschera Alien',
      description: 'Maschera aliena con texture avanzate e dettagli realistici',
      category: 'personaggi',
      duration: '15h 20m',
      complexity: 'Complesso',
      material: 'PLA Metallic Gray',
      filename: 'Maschera Alien-2.mp4'
    },

    // SPONGEBOB COLLECTION
    {
      id: 'casa-spongebob',
      title: 'Casa SpongeBob',
      description: 'La famosa casa ananas di SpongeBob con tutti i dettagli',
      category: 'personaggi',
      duration: '18h 30m',
      complexity: 'Complesso',
      material: 'PLA Orange/Green',
      filename: 'Casa Spongebob.mp4'
    },
    {
      id: 'casa-squiddi',
      title: 'Casa Squiddi Tentacolo',
      description: 'Casa di Squiddi Tentacolo in stile moai dell\'Isola di Pasqua',
      category: 'personaggi',
      duration: '16h 45m',
      complexity: 'Complesso',
      material: 'PLA Blue/Gray',
      filename: 'Casa Squiddi Tentacolo.mp4'
    },

    // GADGET & ACCESSORI
    {
      id: 'lucina-personalizzata',
      title: 'Lucina 3D Personalizzata',
      description: 'Lucina LED con il tuo nome personalizzato inciso',
      category: 'gadget',
      duration: '8h 45m',
      complexity: 'Complesso',
      material: 'PLA Traslucido',
      filename: 'lucina-3D-con-il-tuo-nome-personalizzato.mp4'
    },
    {
      id: 'analogici-dualsense',
      title: 'Analogici DualSense PS5',
      description: 'Sostituzione analogici per controller PlayStation 5',
      category: 'tecnici',
      duration: '3h 15m',
      complexity: 'Medio',
      material: 'TPU Black',
      filename: 'Analogici dualsense PS5.mp4'
    },
    {
      id: 'grout-portavaso',
      title: 'Portavaso Grout',
      description: 'Elegante portavaso con pattern geometrico Grout',
      category: 'decorazioni',
      duration: '14h 30m',
      complexity: 'Complesso',
      material: 'PLA White',
      filename: 'Grout portavaso.mp4'
    },
    {
      id: 'pocket-melody',
      title: 'Pocket Melody',
      description: 'Dispositivo musicale tascabile con melodie personalizzate',
      category: 'gadget',
      duration: '6h 20m',
      complexity: 'Complesso',
      material: 'PLA Multi-color',
      filename: 'Pocket Melody.mp4'
    },
    {
      id: 'microfoni',
      title: 'Microfoni Professionali',
      description: 'Repliche di microfoni per studio di registrazione',
      category: 'gadget',
      duration: '4h 10m',
      complexity: 'Medio',
      material: 'PLA Silver',
      filename: 'Microfoni.mp4'
    },
    {
      id: 'mouse-gaming',
      title: 'Mouse Gaming',
      description: 'Scocca per mouse gaming personalizzato',
      category: 'tecnici',
      duration: '7h 25m',
      complexity: 'Complesso',
      material: 'PLA Black',
      filename: 'Mause.mp4'
    },
    {
      id: 'torre-dadi',
      title: 'Torre per Dadi',
      description: 'Torre funzionale per il lancio dei dadi da gioco',
      category: 'gadget',
      duration: '12h 40m',
      complexity: 'Complesso',
      material: 'PLA Wood',
      filename: 'Torre Dadi.mp4'
    },
    {
      id: 'bicchieri-simpatici',
      title: 'Bicchieri Simpatici',
      description: 'Set di bicchieri decorativi con facce sorridenti',
      category: 'gadget',
      duration: '8h 15m',
      complexity: 'Medio',
      material: 'PLA Food-Safe',
      filename: 'Bicchieri simpatici .mp4'
    },
    {
      id: 'barattolo-fungo-mario',
      title: 'Barattolo Fungo Super Mario',
      description: 'Contenitore a forma di fungo del mondo di Super Mario',
      category: 'gadget',
      duration: '9h 30m',
      complexity: 'Medio',
      material: 'PLA Red/White',
      filename: 'Barattolo Fungo Super Mario.mp4'
    },
    {
      id: 'cuore-decorativo',
      title: 'Cuore Decorativo',
      description: 'Cuore romantico per San Valentino o decorazioni',
      category: 'decorazioni',
      duration: '3h 45m',
      complexity: 'Semplice',
      material: 'PLA Red',
      filename: 'Cuore.mp4'
    },
    {
      id: 'elefante-love',
      title: 'Elefante Love',
      description: 'Elefante portafortuna con simboli d\'amore',
      category: 'decorazioni',
      duration: '5h 20m',
      complexity: 'Medio',
      material: 'PLA Pink',
      filename: 'Elefant Love.mp4'
    },
    {
      id: 'piedi-tpu-colorati',
      title: 'Piedi TPU Colorati',
      description: 'Piedi ergonomici flessibili in TPU multicolore',
      category: 'gadget',
      duration: '2h 30m',
      complexity: 'Semplice',
      material: 'TPU Multi-color',
      filename: 'piedi in tpu colorato.mp4'
    },
    {
      id: 'frisbee-tpu',
      title: 'Frisbee Grande TPU',
      description: 'Frisbee flessibile in TPU per gioco all\'aperto',
      category: 'gadget',
      duration: '4h 15m',
      complexity: 'Medio',
      material: 'TPU Colorato',
      filename: 'Frisbee Grande tpu.mp4'
    },

    // TECNICI & PROTOTIPI
    {
      id: 'ingranaggi',
      title: 'Ingranaggi Meccanici',
      description: 'Set di ingranaggi funzionali per progetti meccanici',
      category: 'tecnici',
      duration: '6h 50m',
      complexity: 'Complesso',
      material: 'PLA Engineering',
      filename: 'Ingranaggi.mp4'
    },
    {
      id: 'torre-eiffel',
      title: 'Torre Eiffel',
      description: 'Replica dettagliata della Torre Eiffel parigina',
      category: 'tecnici',
      duration: '11h 20m',
      complexity: 'Complesso',
      material: 'PLA Gray',
      filename: 'Torre Effeil.mp4'
    },
    {
      id: 'torre-generica',
      title: 'Torre Architettonica',
      description: 'Torre architettonica con design moderno',
      category: 'tecnici',
      duration: '8h 30m',
      complexity: 'Medio',
      material: 'PLA White',
      filename: 'Torre.mp4'
    },
    {
      id: 'adattatore-folletto',
      title: 'Adattatore Folletto',
      description: 'Adattatore personalizzato per aspirapolvere Folletto',
      category: 'tecnici',
      duration: '15h 45m',
      complexity: 'Complesso',
      material: 'ABS Black',
      filename: 'Adattatore folletto.mp4'
    },
    {
      id: 'snodo-piscina',
      title: 'Snodo per Piscina',
      description: 'Componente di ricambio per sistema di pulizia piscina',
      category: 'tecnici',
      duration: '4h 25m',
      complexity: 'Medio',
      material: 'PETG Resistente',
      filename: 'Snodo piscina.mp4'
    },

    // RUOTA PANORAMICA PROJECT
    {
      id: 'base-ruota-panoramica',
      title: 'Base Ruota Panoramica',
      description: 'Base strutturale per il progetto ruota panoramica',
      category: 'special',
      duration: '10h 15m',
      complexity: 'Complesso',
      material: 'PLA Reinforced',
      filename: 'Base ruota panoramica.mp4'
    },
    {
      id: 'ruota-panoramica',
      title: 'Ruota Panoramica',
      description: 'Struttura principale della ruota panoramica funzionante',
      category: 'special',
      duration: '7h 30m',
      complexity: 'Complesso',
      material: 'PLA Multi-color',
      filename: 'Ruota panoramica.mp4'
    },
    {
      id: 'carrozze-ruota-panoramica',
      title: 'Carrozze Ruota Panoramica',
      description: 'Set di carrozze oscillanti per la ruota panoramica',
      category: 'special',
      duration: '12h 20m',
      complexity: 'Complesso',
      material: 'PLA Multi-color',
      filename: 'Carrozze ruota panoramica.mp4'
    }
  ];

  // Filtro sicuro dei video
  const filteredVideos = timelapseVideos.filter(video => {
    const isValidFilename = validateVideoFormat(video.filename);
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return isValidFilename && matchesCategory;
  });

  const categories = [
    { id: 'all' as const, label: 'Tutti i Time-lapse', icon: '🎬' },
    { id: 'personaggi' as const, label: 'Personaggi', icon: '🦸' },
    { id: 'gadget' as const, label: 'Gadget', icon: '🎮' },
    { id: 'tecnici' as const, label: 'Tecnici', icon: '⚙️' },
    { id: 'decorazioni' as const, label: 'Decorazioni', icon: '🎨' },
    { id: 'special' as const, label: 'Progetti Speciali', icon: '⭐' }
  ];

  // Gestione sicura del video con normalizzazione
  const handleVideoLoad = useCallback(() => {
    setError(null);
    setIsPlaying(false);
  }, []);

  const handleVideoError = useCallback((e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Errore caricamento video:', e);
    const target = e.target as HTMLVideoElement;
    const videoSrc = target?.src || 'sconosciuto';
    console.error('URL video che ha causato errore:', videoSrc);
    setError('Video non disponibile o formato non supportato. Controlla il formato del file.');
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    
    try {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error('Errore riproduzione:', err);
            setError('Impossibile riprodurre il video');
          });
        }
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error('Errore controllo video:', err);
      setError('Errore nei controlli video');
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    
    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    } catch (err) {
      console.error('Errore fullscreen:', err);
    }
  }, [isFullscreen]);

  const navigateVideo = useCallback((direction: 'prev' | 'next') => {
    const currentIndex = filteredVideos.findIndex(v => v.id === selectedVideo?.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = currentIndex < filteredVideos.length - 1 ? currentIndex + 1 : 0;
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredVideos.length - 1;
    }
    
    setSelectedVideo(filteredVideos[newIndex]);
    setCurrentVideoIndex(newIndex);
    setIsPlaying(false);
  }, [filteredVideos, selectedVideo]);

  const openVideo = useCallback((video: TimelapseVideo) => {
    setSelectedVideo(video);
    setCurrentVideoIndex(filteredVideos.findIndex(v => v.id === video.id));
    setIsPlaying(false);
    setError(null);
    
    // Avvia automaticamente il video dopo un breve delay
    setTimeout(() => {
      if (videoRef.current) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch(err => {
            console.error('Errore autoplay:', err);
            setError('Impossibile avviare automaticamente il video');
          });
        }
      }
    }, 500);
  }, [filteredVideos]);

  const closeVideo = useCallback(() => {
    setSelectedVideo(null);
    setIsPlaying(false);
    setError(null);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedVideo) return;
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'Escape':
          closeVideo();
          break;
        case 'ArrowLeft':
          navigateVideo('prev');
          break;
        case 'ArrowRight':
          navigateVideo('next');
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'm':
          toggleMute();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedVideo, togglePlay, closeVideo, navigateVideo, toggleFullscreen, toggleMute]);

  return (
    <section id="timelapse" className="py-20 px-4 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent)] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header IPNOTIZZANTE */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Clock className="w-12 h-12 text-green-400 neon-glow animate-spin" style={{ animationDuration: '10s' }} />
              <div className="absolute inset-0 w-12 h-12 bg-green-400/30 rounded-full animate-ping"></div>
            </div>
            <Sparkles className="w-8 h-8 text-yellow-400 mx-4 animate-pulse" />
            <div className="relative">
              <Eye className="w-12 h-12 text-emerald-400 neon-glow" />
              <div className="absolute inset-0 w-12 h-12 bg-emerald-400/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              TIME-LAPSE
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium mb-8">
            🎬 <span className="text-green-400 font-bold">Guarda nascere</span> i tuoi oggetti <span className="text-emerald-400 font-bold">MAGICAMENTE</span> 🎬
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="glass-card px-6 py-3 rounded-full border border-green-500/30 floating">
              <span className="text-green-400 font-bold">🎥 {filteredVideos.length} Video Disponibili</span>
            </div>
            <div className="glass-card px-6 py-3 rounded-full border border-emerald-500/30 floating">
              <span className="text-emerald-400 font-bold">⏱️ Ore di Lavorazione Documentate</span>
            </div>
            <div className="glass-card px-6 py-3 rounded-full border border-green-400/30 floating">
              <span className="text-green-500 font-bold">🔥 Qualità ULTRA HD</span>
            </div>
          </div>
        </div>

        {/* Category Filter MAGNETICO */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg scale-105 neon-glow'
                  : 'glass-card text-gray-300 hover:text-green-400 border border-green-500/30 hover:border-green-500/60'
              }`}
            >
              <span className="text-xl mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Video Grid SPETTACOLARE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredVideos.map((video, index) => (
            <div
              key={video.id}
              className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => openVideo(video)}
              onMouseEnter={(e) => {
                const videoElement = e.currentTarget.querySelector('video') as HTMLVideoElement;
                if (videoElement) {
                  videoElement.currentTime = 0; // Riavvia dall'inizio
                  videoElement.play().catch(() => {}); // Ignora errori
                }
              }}
              onMouseLeave={(e) => {
                const videoElement = e.currentTarget.querySelector('video') as HTMLVideoElement;
                if (videoElement) {
                  videoElement.pause();
                  videoElement.currentTime = 0; // Reset al frame iniziale
                }
              }}
            >
              <div className="glass-card rounded-2xl overflow-hidden border border-green-500/20 hover:border-green-500/60 shadow-2xl hover:shadow-green-500/25">
                {/* Video Thumbnail con auto-play su hover */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                <video
                  preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={() => console.warn(`Thumbnail non disponibile per ${video.filename}`)}
                    muted
                    loop
                    playsInline
                >
                    <source src={`/videos/Time-laps/${sanitizeFilename(normalizeFilename(video.filename))}#t=10`} type="video/mp4" />
                </video>
                
                {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 neon-glow">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 glass-card px-3 py-1 rounded-full border border-green-500/30">
                    <span className="text-green-400 font-bold text-sm">⏱️ {video.duration}</span>
                  </div>
                  
                  {/* Complexity Badge */}
                  <div className="absolute top-3 left-3 glass-card px-3 py-1 rounded-full border border-emerald-500/30">
                    <span className={`font-bold text-sm ${
                      video.complexity === 'Semplice' ? 'text-green-400' :
                      video.complexity === 'Medio' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {video.complexity === 'Semplice' ? '🟢' : 
                       video.complexity === 'Medio' ? '🟡' : '🔴'} {video.complexity}
                    </span>
                  </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="glass-card px-3 py-1 rounded-full border border-blue-500/30 text-blue-400 font-semibold">
                      🧬 {video.material}
                    </span>
                    <span className="text-gray-500">
                      {video.category === 'personaggi' ? '🦸' :
                       video.category === 'gadget' ? '🎮' :
                       video.category === 'tecnici' ? '⚙️' :
                       video.category === 'decorazioni' ? '🎨' : '⭐'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal SPETTACOLARE con effetti hover */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-fade-in">
            <div ref={containerRef} className="relative w-full max-w-6xl group">
              {/* Video Container con effetti hover magnetici */}
              <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-green-500/30 transition-all duration-500 group-hover:border-green-500/60 group-hover:shadow-green-500/25 group-hover:scale-[1.02] transform">
                {error ? (
                  <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-red-900/50 to-red-800/50">
                    <div className="text-center">
                      <div className="text-6xl mb-4">⚠️</div>
                      <p className="text-red-400 font-bold text-xl mb-2">Errore Video</p>
                      <p className="text-red-300">{error}</p>
                    </div>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    className="w-full aspect-video transition-all duration-300 group-hover:brightness-110"
                    onLoadStart={handleVideoLoad}
                    onError={handleVideoError}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    controls={false}
                    muted={isMuted}
                    playsInline
                  >
                    <source src={`/videos/Time-laps/${sanitizeFilename(normalizeFilename(selectedVideo.filename))}`} type="video/mp4" />
                    Il tuo browser non supporta i video HTML5.
                  </video>
                )}
                
                {/* Custom Controls con effetti hover magnetici */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 transition-all duration-300 group-hover:from-black/90">
                  <div className="flex items-center justify-between mb-4 transform transition-all duration-300 group-hover:translate-y-0 translate-y-2">
                    <div className="transition-all duration-300 group-hover:scale-105">
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors duration-300">{selectedVideo.title}</h3>
                      <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{selectedVideo.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="glass-card px-4 py-2 rounded-full border border-green-500/30 group-hover:border-green-500/60 group-hover:bg-green-500/10 transition-all duration-300">
                        <span className="text-green-400 font-bold">⏱️ {selectedVideo.duration}</span>
                      </div>
                      <div className="glass-card px-4 py-2 rounded-full border border-blue-500/30 group-hover:border-blue-500/60 group-hover:bg-blue-500/10 transition-all duration-300">
                        <span className="text-blue-400 font-bold">🧬 {selectedVideo.material}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-6 transform transition-all duration-300 group-hover:scale-105">
                    <button
                      onClick={() => navigateVideo('prev')}
                      className="glass-card p-3 rounded-full border border-white/30 hover:border-green-500 hover:bg-green-500/20 transition-all duration-300 hover:scale-110 hover:rotate-6 neon-glow-hover"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    
                    <button
                      onClick={togglePlay}
                      disabled={!!error}
                      className="btn-magnetic p-4 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 hover:shadow-green-500/50 transition-all duration-300"
                    >
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </button>
                    
                    <button
                      onClick={() => navigateVideo('next')}
                      className="glass-card p-3 rounded-full border border-white/30 hover:border-green-500 hover:bg-green-500/20 transition-all duration-300 hover:scale-110 hover:-rotate-6 neon-glow-hover"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                    
                    <button
                      onClick={toggleMute}
                      className="glass-card p-3 rounded-full border border-white/30 hover:border-green-500 hover:bg-green-500/20 transition-all duration-300 hover:scale-110 hover:rotate-12 neon-glow-hover"
                    >
                      {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
                    </button>
                    
            <button 
                      onClick={toggleFullscreen}
                      className="glass-card p-3 rounded-full border border-white/30 hover:border-green-500 hover:bg-green-500/20 transition-all duration-300 hover:scale-110 hover:rotate-45 neon-glow-hover"
            >
                      <Maximize className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
                
                {/* Close Button con effetto hover magnetico */}
                <button
                  onClick={closeVideo}
                  className="absolute top-4 right-4 glass-card p-2 rounded-full border border-white/30 hover:border-red-500 hover:bg-red-500/20 transition-all duration-300 hover:scale-110 hover:rotate-90 neon-glow-hover"
                >
                  <span className="text-white text-xl">✕</span>
                </button>
                
                {/* Navigation Info con effetto hover */}
                <div className="absolute top-4 left-4 glass-card px-4 py-2 rounded-full border border-green-500/30 group-hover:border-green-500/60 group-hover:bg-green-500/10 transition-all duration-300 hover:scale-105">
                  <span className="text-green-400 font-bold">
                    {currentVideoIndex + 1} / {filteredVideos.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TimelapseSection; 