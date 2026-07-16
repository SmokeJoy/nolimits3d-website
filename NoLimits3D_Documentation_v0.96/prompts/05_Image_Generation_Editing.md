# PRM-IMG-001 — Image Generation and Conservative Editing

> **Document ID:** DOC-PRM-005  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** AI Product  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


> **Versione prompt:** 0.95.0  
> **Stato:** Draft/Eval required  
> **Owner:** Brand / AI Product

## Modalità A — Generazione

```text
Genera un asset per {purpose} conforme al Brand Book e alle Image Guidelines.
Soggetto: {subject}.
Composizione/aspect ratio: {composition}.
Palette e lighting: {style_tokens}.
Elementi obbligatori: {must_include}.
Elementi vietati: {must_not_include}.
Il risultato non deve simulare una fotografia di prodotto reale se è un concept.
Non inserire loghi o testi non forniti e approvati.
Mantieni spazio sicuro per eventuale copy separato.
```

## Modalità B — Editing conservativo

```text
Usa esclusivamente l'immagine fornita come riferimento.
Non creare una nuova scena e non reinterpretare soggetti, volti, pose, anatomia, logo, oggetti o composizione.
Esegui solo: {approved_changes}.
Mantieni identici: {locked_elements}.
Non aggiungere testo, watermark o elementi.
Preserva proporzioni e aspect ratio richiesto.
Per HueForge riduci artefatti e microvariazioni da compressione senza appiattire i livelli cromatici importanti.
```

## Metadata output

Prompt ID/versione, reference IDs, model/provider, purpose, disclosure class, reviewer e rights note.
