# Information Architecture

> **Document ID:** DOC-UX-001  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** UX / Information Architecture  
> **Ambito autorevole:** sitemap, navigazione, tassonomia pubblica e distinzione tra Catalogo, Realizzazioni e Ispirati.

## Principio

La piattaforma è il portale del laboratorio digitale NoLimits3D. La navigazione combina intenti comprensibili e destinazioni convenzionali, senza etichette criptiche.

## Navigazione primaria candidata

- **Realizza**: nuovo progetto, stampa STL, personalizzazione, lanterna personale, progettazione/assistenza.
- **Esplora**: Catalogo, Ispirati, Arte in stampa 3D, collezioni e novità.
- **Servizi**: stampa, modellazione, prototipazione, piccole serie, ricambi, assistenza.
- **Realizzazioni**: casi, progetti tecnici, HueForge, prodotti reali e prima/dopo.
- **Eventi**: calendario, fiere e modalità di incontro.
- **NoLimits3D**: Andrea, laboratorio, metodo, qualità, FAQ e contatti.

Sempre accessibili: Catalogo, configuratore lanterne, richiesta/preventivo, account, carrello, ricerca e contatti.

## Distinzioni tassonomiche

- **Catalogo:** offerte acquistabili o configurabili.
- **Realizzazioni:** evidenza autentica delle capacità e dei risultati.
- **Ispirati:** discovery trasversale di offerte, casi, arte e contenuti.
- **Arte in stampa 3D:** landing editoriale HueForge.

Una stessa entità può essere referenziata da più percorsi, ma non duplicata come contenuto divergente.

## Sitemap pubblica

```text
/
/realizza
  /richiedi-progetto
  /preventivo-stampa-3d
  /configuratore-lanterne
  /assistenza-stampanti-3d
/esplora
  /catalogo
  /ispirati
  /arte-in-stampa-3d
  /hueforge
/servizi
  /stampa-3d
  /progettazione-3d
  /prototipazione
  /ricambi-personalizzati
  /piccole-serie
/realizzazioni
/eventi
/nolimits3d
  /chi-siamo
  /metodo
  /qualita
  /contatti
/blog
/account
/carrello
/printflow  # Coming Soon
```

## Domanda per pagina

| Pagina | Domanda |
|---|---|
| Home | Cosa può fare NoLimits3D per me? |
| Servizi | Possono realizzare quello che mi serve? |
| Realizzazioni | Lo hanno già fatto o sanno affrontarlo? |
| Configuratore | Come potrebbe apparire la mia lanterna? |
| Preventivo | Quanto potrebbe costare e cosa succede dopo? |
| Chi siamo | Posso fidarmi? |
| Eventi | Posso incontrare NoLimits3D dal vivo? |
| Blog/Guide | Hanno davvero competenza? |
| Contatti | Come posso parlare direttamente con Andrea? |
| Area cliente | A che punto è la mia richiesta o il mio ordine? |
| Catalogo | C’è già qualcosa adatto a me? |
| HueForge | Che cos’è questa forma d’arte e come posso averla? |

## Regole

Link HTML reali, breadcrumb, search, mobile navigation chiara e mega-menu solo se testato. L’intent selector Home non sostituisce sitemap, heading, testo o link crawlable. La struttura candidata richiede usability test prima dell’UI freeze.
