# Admin Workflows

> **Document ID:** DOC-ADM-006  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Admin Operations  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


## Workflow editoriale
Draft → validazione → review → schedule/publish → monitoraggio → revisione/archiviazione.

## Workflow operativo
Nuovo lead → classificazione → assegnazione → attività → comunicazione → esito → follow-up.

## Guardrail
Azioni distruttive con conferma e undo quando possibile; impersonation vietata salvo ADR; export dati personali limitato e auditato; AI non pubblica automaticamente contenuti ad alto impatto senza policy esplicita.

<!-- V0952-ADMIN-WORKFLOWS:START -->
## Jarvis-assisted workflow

1. Andrea seleziona modalità Assistente, Operativa o Architetto.
2. Jarvis legge solo dati/tool autorizzati.
3. Per side effect prepara preview, diff, impatto, dipendenze e rischio.
4. Il Command Center richiede conferma quando la policy lo impone.
5. L’azione viene eseguita server-side e registrata con correlation ID.
6. Successo/fallimento e recovery sono mostrati senza falsi positivi.
<!-- V0952-ADMIN-WORKFLOWS:END -->
