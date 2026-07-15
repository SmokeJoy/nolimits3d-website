# Area cliente

> **Document ID:** DOC-FEAT-014  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Customer Experience  
> **Ambito autorevole:** accesso cliente a richieste, preventivi, configurazioni e ordini. Scope F1 finale è open decision.

## Requisiti

| ID | Requisito | Pri |
|---|---|---|
| CUST-F-001 | Consentire accesso sicuro via account o link/token approvato. | Should |
| CUST-F-002 | Mostrare solo risorse del cliente/organizzazione autorizzata. | Must |
| CUST-F-003 | Visualizzare stato e timeline in linguaggio comprensibile. | Should |
| CUST-F-004 | Consentire risposta a richieste informazioni e accettazione quote. | Should |
| CUST-F-005 | Consentire download controllato di documenti propri. | Could |
| CUST-F-006 | Registrare accessi e azioni commerciali significative. | Must |

## Scope options

A) nessun account F1, link firmati per quote/configurazioni; B) account leggero; C) area completa. La decisione influenza auth, privacy e roadmap e deve essere approvata prima dello sviluppo.

## UX

Dashboard ridotta: “serve una tua azione”, richieste, quote, configurazioni, ordini e assistenza. Non esporre stati interni incomprensibili.

## Security

Object-level authorization, token monouso/scadenza, revoca, step-up per dati sensibili, nessun ID sequenziale prevedibile, audit.

## Acceptance

Cross-account isolation, session/token tests, quote version corretta, state labels e fallback contatto.

<!-- V0952-ACCOUNT:START -->
## Scope Fase 1 e boundary

Account cliente: profilo minimo, preferenze, prodotti salvati, configurazioni, richieste e ordini autorizzati. La scelta passwordless/link vs login tradizionale resta aperta. Jarvis, documentazione, roadmap, system health, admin analytics e worker state sono esclusi in modo esplicito.
<!-- V0952-ACCOUNT:END -->
