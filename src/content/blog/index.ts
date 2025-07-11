import { materialiStampa3D } from './materiali-stampa-3d';
import { problemiStampa3D } from './problemi-stampa-3d';
import { dfamDesignStampa3d } from './dfam-design-stampa-3d';
import { postProcessingStampa3D } from './post-processing-stampa-3d';
import { manutenzioneklipperStampante3D } from './manutenzione-klipper-stampante-3d';
import { frosindonePrototypingGuide } from './prototipazione-stampa-3d-frosinone';

// Array di tutti gli articoli del blog
export const blogPosts = [
  materialiStampa3D,
  problemiStampa3D,
  dfamDesignStampa3d,
  postProcessingStampa3D,
  manutenzioneklipperStampante3D,
  frosindonePrototypingGuide
];

// Funzioni di utility per gestire gli articoli
export const getBlogPostById = (id: number): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getBlogPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tag));
};

// Esporta anche i singoli articoli per uso diretto
export { materialiStampa3D, problemiStampa3D, dfamDesignStampa3d, postProcessingStampa3D, manutenzioneklipperStampante3D, frosindonePrototypingGuide };

// Esporta il tipo
export type { BlogPost } from './types'; 