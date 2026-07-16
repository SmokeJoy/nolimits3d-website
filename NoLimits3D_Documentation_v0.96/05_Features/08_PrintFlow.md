# PrintFlow — Pagina Fase 1 e integrazione futura

> **Document ID:** DOC-FEAT-008  
> **Versione:** 0.95.4  
> **Stato:** In Review  
> **Owner:** Product  
> **Ambito autorevole:** rappresentazione di PrintFlow nella piattaforma NoLimits3D.

> ## Stato obbligatorio
> **PrintFlow è attualmente in sviluppo.** Nella Fase 1 la pagina è esclusivamente una pagina `Coming Soon`. Non esistono funzioni operative, account, dashboard, sincronizzazione, automazioni, upload o workflow PrintFlow attivi sul sito.

## 1. Obiettivo Fase 1

Presentare il progetto in modo credibile senza simulare disponibilità. La pagina deve:

- descrivere il problema che PrintFlow intende affrontare;
- mostrare screenshot o concept chiaramente etichettati;
- pubblicare una roadmap ad alto livello;
- raccogliere iscrizioni separate alla newsletter/waitlist;
- mostrare un download solo quando esiste una release realmente disponibile;
- comunicare stato e limiti.

## 2. Requisiti

| ID | Requisito | Pri |
|---|---|---|
| PF-F-001 | Mostrare la frase “PrintFlow è attualmente in sviluppo.” in posizione evidente. | Must |
| PF-F-002 | Etichettare screenshot come concept, prototype o release reale. | Must |
| PF-F-003 | Raccogliere waitlist con double opt-in e consenso separato. | Must |
| PF-F-004 | Non esporre CTA “Accedi”, “Avvia” o funzioni non disponibili. | Must |
| PF-F-005 | Mostrare roadmap non vincolante e data aggiornamento. | Should |
| PF-F-006 | Abilitare download solo tramite release record approvato. | Must |
| PF-F-007 | Isolare futura integrazione tramite adapter e feature flag. | Must architetturale |

## 3. Information architecture

```text
Hero: In sviluppo
→ Problema/vision
→ Come dovrebbe funzionare
→ Screenshot/concept con label
→ Roadmap
→ Waitlist
→ FAQ su disponibilità e dati
→ Release/download, nascosto finché assente
```

## 4. Forbidden behavior

- demo finta presentata come live;
- form che sembra creare account applicativo;
- upload o gestione stampanti;
- pricing/subscription attivi;
- integrazione obbligatoria con preventivatore o admin;
- promesse di data non approvate;
- download placeholder.

## 5. Data model Fase 1

- `printflow_page_content` nel CMS;
- `printflow_roadmap_items` editoriali;
- `printflow_waitlist_subscription` collegata al sistema consensi;
- `printflow_release` futuro, default assente/inattivo;
- media screenshot gestiti dalla Media Library.

Non sono richieste tabelle operative PrintFlow.

## 6. Download gate

Il componente download appare solo se:

- release status `published`;
- file firmato e scan completato;
- checksum e piattaforma disponibili;
- release notes pubblicate;
- approvazione admin;
- eventuali termini/licenze disponibili.

## 7. Integrazione futura

Qualsiasi integrazione richiederà:

1. API/contract reale;
2. ADR;
3. threat model;
4. data classification;
5. consent/auth model;
6. sandbox;
7. rollout tramite feature flag;
8. fallback che preservi Fase 1.

## 8. SEO

La pagina può indicizzarsi per brand/progetto, ma non deve creare pagine programmatiche o claim su funzioni inesistenti. Structured data di software è ammesso solo quando rappresenta correttamente lo stato/pre-release.

## 9. Analytics

- printflow_page_view;
- roadmap_interaction;
- waitlist_started;
- waitlist_confirmed;
- screenshot_viewed;
- release_download, solo futuro.

## 10. Acceptance criteria

- la dicitura obbligatoria è visibile senza interazione;
- nessuna funzionalità attiva è suggerita;
- waitlist usa double opt-in;
- screenshot hanno label;
- download è assente senza release approvata;
- disabilitare PrintFlow non rompe alcun flusso Fase 1.

<!-- V0952-PRINTFLOW:START -->
## Guard Fase 1

**PrintFlow è attualmente in sviluppo.** La pagina pubblica è esclusivamente “In arrivo” e può mostrare descrizione, screenshot reali approvati, roadmap, waitlist/newsletter e download solo quando una release esiste. Non espone dashboard, login, API, worker o funzioni operative. Il sito e il checkout non dipendono da PrintFlow.
<!-- V0952-PRINTFLOW:END -->

<!-- V0954-PRINTFLOW-HARD-STOP:START -->
## 13. Phase-1 hard stop

`INV-003` è un gate di release: in Fase 1 PrintFlow può mostrare esclusivamente descrizione, screenshot approvati, roadmap, iscrizione e futura disponibilità. Qualsiasi endpoint produttivo, upload operativo, analisi, slicing, G-code, account o CTA di utilizzo è una violazione costituzionale e richiede una futura CR/ADR di phase transition.
<!-- V0954-PRINTFLOW-HARD-STOP:END -->
