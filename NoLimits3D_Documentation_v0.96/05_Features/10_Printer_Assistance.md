# Assistenza stampanti

> **Document ID:** DOC-FEAT-011  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Technical Support  
> **Ambito autorevole:** intake, triage, supporto remoto, intervento e chiusura dei ticket.

## Requisiti stabili

| ID | Requisito | Pri |
|---|---|---|
| AST-F-001 | Acquisire richiesta, macchina, sintomi e allegati. | Must |
| AST-F-002 | Eseguire triage e assegnare priorità senza diagnosi automatica certa. | Must |
| AST-F-003 | Supportare sessione remota e consenso. | Must |
| AST-F-004 | Gestire preventivo/intervento e stato. | Must |
| AST-F-005 | Conservare cronologia, parti e azioni. | Must |
| AST-F-006 | Fornire comunicazioni e chiusura con feedback. | Must |

## Intake

Marca/modello, firmware, modifiche, sintomo, quando si verifica, errori, tentativi, impatto, disponibilità e foto/log. Informazioni elettriche o meccaniche rischiose attivano warning e human review.

## Triage

Priorità considera sicurezza, macchina inutilizzabile, rischio danni e urgenza commerciale. AI può suggerire domande o categorie, non dichiarare diagnosi.

## Remote support

Finestra temporale, consenso, strumento, dati visibili e revoca. Nessuna credenziale permanente viene richiesta o memorizzata. Le azioni rilevanti sono annotate.

## Workshop

Check-in macchina/accessori, condizione, preventivo, parti, interventi, test e consegna. Foto e seriali seguono privacy/retention.

## Acceptance

Ticket completo, state machine valida, consenso remote provabile, preventivo versionato, inventory parti non obbligatoria in F1 ma azioni tracciate, chiusura con outcome.
