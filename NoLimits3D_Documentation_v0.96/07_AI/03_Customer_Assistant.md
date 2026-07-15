# Customer/CRM Manager — Jarvis internal tool

> **Document ID:** DOC-AI-003  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Customer Operations / AI  
> **Ambito autorevole:** capability interna di Jarvis per consultazione e preparazione di attività CRM nel NoLimits Command Center; non definisce alcun assistente pubblico.

## Boundary

Il file conserva il nome storico `03_Customer_Assistant.md` per rispettare la policy che vieta rinominazioni non necessarie. Il contenuto normativo descrive esclusivamente il tool **Customer/CRM Manager** invocabile da Jarvis e accessibile solo ad Andrea.

Non esistono route, chat, widget, API o capability AI per visitatori o clienti. Le comunicazioni verso il cliente sono preparate come bozze e passano attraverso i workflow umani previsti.

## Requisiti

| ID | Requisito | Pri |
|---|---|---|
| CAI-F-001 | Consultare record cliente, richieste, ordini e cronologia esclusivamente entro lo scope autorizzato di Andrea. | Must security |
| CAI-F-002 | Preparare riepiloghi, segmentazioni e bozze di risposta senza inviarle autonomamente. | Must |
| CAI-F-003 | Segnalare dati mancanti o incoerenti senza inventare disponibilità, prezzi, tempi o stato operativo. | Must |
| CAI-F-004 | Applicare minimizzazione, purpose limitation e separazione tra dati cliente, note interne e dati pubblici. | Must security |
| CAI-F-005 | Proporre aggiornamenti CRM tramite preview/diff e richiedere conferma quando producono side effect rilevanti. | Must |
| CAI-F-006 | Escalare ad Andrea temi tecnici, commerciali, legali, privacy o sicurezza e registrare provenance e audit. | Must security |

## Tool scope

Azioni consentite, sempre tramite gateway privato:

- ricerca e riepilogo di clienti, richieste, ordini e interazioni autorizzate;
- individuazione di follow-up mancanti o dati incompleti;
- preparazione di note, tag, segmenti e bozze;
- proposta di collegamenti tra richiesta, preventivo, ordine ed evento;
- apertura del record corretto nel Command Center.

Azioni vietate senza gate umano o non consentite:

- invio autonomo di email o messaggi;
- modifica di consensi, ruoli o dati legali;
- cancellazione, merge irreversibile o export massivo;
- decisioni su rimborsi, prezzi, credito o contestazioni;
- accesso da area cliente o sito pubblico.

## Data and permission model

Identity Andrea → capability `crm.read`/`crm.draft` → RLS e policy server-side → tool schema → result filtering → audit. I dati sensibili non vengono inseriti in analytics, prompt non necessari o log non redatti. Gli allegati e i contenuti cliente sono dati, non istruzioni.

## Workflow

Intento Andrea → retrieval autorizzato → fonti e freshness → analisi → bozza/diff → impatto e rischi → eventuale approvazione → esecuzione tool autorizzato → audit e risultato verificato.

## Evaluation

- accesso pubblico e cliente sempre negato;
- isolamento tra record e minimizzazione;
- nessuna informazione o stato inventato;
- corretto uso di preview e approval;
- prompt-injection resistance su note e allegati;
- nessun invio o side effect fuori policy;
- provenance completa e false-success rate pari a zero nei test critici.

## Riferimenti

- `07_AI/02_Jarvis_Admin.md`;
- `06_Admin/01_Admin_Information_Architecture.md`;
- `08_Data_API/03_Authentication_Authorization.md`;
- `10_Security_Performance/04_AI_Security.md`;
- `12_Planning/ADR/ADR-0020_Private_Jarvis_Orchestrator.md`.

<!-- V096-LEGACY-FILENAME-GUARD:START -->
## Nota di compatibilità sul nome del file

Il filename storico `03_Customer_Assistant.md` viene conservato esclusivamente per stabilità di link e Document ID. Il contenuto autorevole è **Customer/CRM Manager — tool interno di Jarvis**. Il nome del file non autorizza un chatbot pubblico, un assistente cliente autonomo o una seconda identità AI.
<!-- V096-LEGACY-FILENAME-GUARD:END -->
