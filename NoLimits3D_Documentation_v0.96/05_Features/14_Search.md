# Ricerca interna

> **Document ID:** DOC-FEAT-015  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Discovery  
> **Ambito autorevole:** ricerca pubblica di prodotti, servizi, portfolio, articoli ed eventi.

## Requisiti

| ID | Requisito | Pri |
|---|---|---|
| SEARCH-F-001 | Indicizzare solo contenuti pubblicati e autorizzati. | Must |
| SEARCH-F-002 | Restituire risultati tipizzati e raggruppabili. | Must |
| SEARCH-F-003 | Supportare typo/titoli/tag senza inventare risultati. | Should |
| SEARCH-F-004 | Offrire empty state con alternative reali. | Must |
| SEARCH-F-005 | Non esporre admin, draft, media privati o dati cliente. | Must |
| SEARCH-F-006 | Misurare query e zero-result con minimizzazione dati. | Should |

## Architecture

Baseline può usare PostgreSQL full-text/trigram con un SearchDocument proiettato. Servizio dedicato richiede evidenza di scala/relevance e ADR.

## Ranking

Match titolo > categoria/tag > body; boost moderato per contenuti aggiornati/popolari, senza nascondere pertinenza. Eventi conclusi sono deboostati ma ricercabili nell'archivio.

## UX

Autocomplete opzionale e rate-limited. Risultati mostrano tipo, snippet grounded e CTA. Query rimane nell'URL; pagine query non vengono indicizzate indiscriminatamente.

## Acceptance

Permission filter, test language/accents, zero-result analytics, latency budget e no leakage di draft.
