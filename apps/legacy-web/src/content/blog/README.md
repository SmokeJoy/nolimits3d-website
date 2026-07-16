# Blog Articles Structure

Questa cartella contiene tutti gli articoli del blog organizzati in modo modulare per facilitare la manutenzione del codice.

## Struttura

```
src/content/blog/
├── types.ts                    # Interfaccia TypeScript per BlogPost
├── materiali-stampa-3d.ts     # Articolo sui materiali
├── problemi-stampa-3d.ts      # Articolo sui problemi/troubleshooting
├── index.ts                   # File che esporta tutti gli articoli
└── README.md                  # Questa documentazione
```

## Come Aggiungere un Nuovo Articolo

### 1. Creare il file dell'articolo

Crea un nuovo file `.ts` nella cartella `src/content/blog/` con il nome dell'articolo (usa kebab-case):

```typescript
// src/content/blog/nuovo-articolo.ts
import { BlogPost } from './types';

export const nuovoArticolo: BlogPost = {
  id: 3, // Incrementa l'ID rispetto all'ultimo articolo
  title: "Titolo del Nuovo Articolo",
  excerpt: "Breve descrizione che appare nelle anteprime...",
  content: `
# Titolo del Nuovo Articolo

Contenuto dell'articolo in formato Markdown...

## Sezione 1

Testo del primo paragrafo...

![Immagine](/images/blog/nome-immagine.jpg)

## Sezione 2

Altro contenuto...
  `,
  category: "categoria", // es: "materiali", "troubleshooting", "design"
  tags: ["tag1", "tag2", "tag3"],
  readTime: "8 min",
  date: "2025-01-16", // Formato YYYY-MM-DD
  author: "Nome Autore",
  image: "/images/blog/immagine-copertina.jpg",
  seoTitle: "Titolo SEO ottimizzato (max 60 caratteri)",
  seoDescription: "Descrizione SEO ottimizzata (max 160 caratteri)"
};
```

### 2. Aggiungere l'articolo all'index

Modifica il file `src/content/blog/index.ts` per includere il nuovo articolo:

```typescript
// Aggiungi l'import
import { nuovoArticolo } from './nuovo-articolo';

// Aggiungi all'array blogPosts
export const blogPosts: BlogPost[] = [
  materialiStampa3D,
  problemiStampa3D,
  nuovoArticolo // <-- Aggiungi qui
];

// Aggiungi all'export
export { materialiStampa3D, problemiStampa3D, nuovoArticolo };
```

### 3. Preparare le immagini

- Aggiungi le immagini nella cartella `public/images/blog/`
- Usa formati ottimizzati (WebP o JPG)
- Dimensioni consigliate: 1200x600px per le copertine
- Nomi file descrittivi senza spazi (usa trattini)

## Convenzioni

### Nomi File
- Usa kebab-case: `materiali-stampa-3d.ts`
- Nomi descrittivi e specifici

### Categorie Standard
- `"materiali"` - Guide sui filamenti e materiali
- `"troubleshooting"` - Risoluzione problemi
- `"design"` - Progettazione e modeling
- `"post-processing"` - Post-lavorazione
- `"manutenzione"` - Manutenzione stampanti

### Tag
- Usa tag specifici e ricercabili
- Massimo 5-6 tag per articolo
- Esempi: `["PLA", "warping", "calibrazione", "guida"]`

### Contenuto Markdown
- Usa intestazioni gerarchiche (# ## ###)
- Includi immagini per spezzare il testo
- Usa liste puntate per le guide step-by-step
- Aggiungi link interni quando possibile

### SEO
- `seoTitle`: max 60 caratteri, include keyword principali
- `seoDescription`: max 160 caratteri, descrittiva e accattivante
- `readTime`: stima realistica del tempo di lettura

## Vantaggi della Struttura Modulare

✅ **Manutenibilità**: Ogni articolo in un file separato
✅ **Leggibilità**: Codice più pulito e organizzato  
✅ **Scalabilità**: Facile aggiungere nuovi articoli
✅ **Collaborazione**: Più sviluppatori possono lavorare sui contenuti
✅ **TypeScript**: Type safety per tutti gli articoli
✅ **Riusabilità**: Funzioni utility per filtrare e cercare

## Funzioni Utility Disponibili

```typescript
import { getBlogPostById, getBlogPostsByCategory, getBlogPostsByTag } from '../content/blog';

// Ottieni articolo per ID
const articolo = getBlogPostById(1);

// Filtra per categoria
const articoliMateriali = getBlogPostsByCategory("materiali");

// Filtra per tag
const articoliPLA = getBlogPostsByTag("PLA");
```

## Debugging

Se hai problemi con un nuovo articolo:

1. Verifica che l'ID sia unico
2. Controlla che tutte le proprietà richieste siano presenti
3. Assicurati che l'immagine esista nella cartella `public/images/blog/`
4. Verifica la sintassi TypeScript con `npm run build`
5. Controlla la console del browser per errori React

## Esempio Completo

Vedi `src/content/blog/materiali-stampa-3d.ts` per un esempio completo di articolo con:
- Contenuto esteso
- Immagini multiple
- Tabelle
- Link interni/esterni
- SEO ottimizzato
- Struttura gerarchica 