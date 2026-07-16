# Eventi e fiere

> **Document ID:** DOC-FEAT-010  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Local Marketing  
> **Ambito autorevole:** pubblicazione eventi, calendario, interesse/registrazione, aggiornamenti e attribuzione lead.

## Requisiti stabili

| ID | Requisito | Pri |
|---|---|---|
| EVT-F-001 | Pubblicare calendario ed evento con stato e localizzazione. | Must |
| EVT-F-002 | Gestire registrazione/interesse con consenso. | Must |
| EVT-F-003 | Collegare lead e conversioni all'evento. | Must |
| EVT-F-004 | Gestire contenuti, media e aggiornamenti da admin. | Must |
| EVT-F-005 | Generare SEO locale e structured data coerenti. | Must |
| EVT-F-006 | Gestire annullamento, variazioni e notifiche. | Must |

## Contenuto evento

Titolo, descrizione, date/timezone, luogo, organizer, stato, accessibilità/logistica, CTA, prodotti/servizi attesi, media e aggiornamento. Eventi passati restano come archivio/case study quando utili.

## Stato e variazioni

Postponed e Cancelled non eliminano automaticamente la pagina. Una variazione significativa produce update visibile, invalidazione cache, structured data aggiornato e notifica agli iscritti autorizzati.

## Lead attribution

QR/landing possono usare campaign/event ID firmato. L'attribuzione non sostituisce il consenso. Lead offline possono essere inseriti solo con fonte e base appropriata.

## SEO

Event schema solo per eventi reali; date ISO/timezone, venue e status coerenti. Pagine calendario filtrate evitano duplicazioni e thin content.

## Acceptance

Evento futuro/passato/cancellato visualizzato correttamente, calendar accessibility, registrazione idempotente, notification test, schema validation e analytics consent-aware.

<!-- V0952-EVENTS:START -->
## Commerce e Media

Gli eventi possono collegare catalog item con stato `Disponibile in fiera`, quantità/ritiro e metodi contanti/POS. Foto, locandine e mappe provengono dalla Media Library. Jarvis può preparare descrizioni e checklist solo nel Command Center.
<!-- V0952-EVENTS:END -->

<!-- V0953-EVENTS:START -->
## Presenza reale e laboratorio privato

Le schede evento mostrano data, luogo, orari, disponibilità e modalità di incontro verificate. Il sito non suggerisce che il laboratorio sia aperto al pubblico. Foto post-evento devono essere autentiche e autorizzate.

| ID | Requisito |
|---|---|
| EVT-F-007 | Comunicare eventi e modalità di incontro senza presentare il laboratorio privato come punto vendita aperto. |
<!-- V0953-EVENTS:END -->
