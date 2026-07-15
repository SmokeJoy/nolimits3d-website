# Future Jarvis Tools

> **Document ID:** DOC-AI-008  
> **Versione:** 0.95.3  
> **Stato:** Future / In Review  
> **Owner:** AI Strategy  
> **Ambito autorevole:** criteri di valutazione, non backlog approvato.

## Candidate capabilities

- visual quality inspection assistita;
- anomaly detection su tempi/failure;
- support knowledge retrieval;
- material/profile recommendation calibrata;
- content localization;
- demand forecasting;
- proactive operations brief;
- workflow builder.

## Admission gate

Una capability entra nel roadmap solo con:

1. problema e baseline manuale misurati;
2. utenti/owner;
3. dati e diritti disponibili;
4. failure cost;
5. eval dataset;
6. human review/rollback;
7. costo e latenza target;
8. threat/privacy review;
9. ADR se cambia architettura.

## Requisiti strategici

| ID | Requisito | Pri |
|---|---|---|
| FUTAI-F-001 | Nessuna capability viene adottata per sola disponibilità tecnologica. | Must |
| FUTAI-F-002 | Il valore viene confrontato con processo non-AI. | Must |
| FUTAI-F-003 | Dati sintetici o deboli sono etichettati e non usati per claim. | Must |
| FUTAI-F-004 | Ogni pilot ha kill switch, owner e criteri di successo/abbandono. | Must |

<!-- V0952-INTERNAL-TOOL:START -->
## Boundary v0.95.2

Questo documento specifica una capability interna del solo Jarvis nel NoLimits Command Center. Non definisce un assistente pubblico, non crea una seconda identità AI e non autorizza accesso cliente. Il tool `Future` eredita identity, approval, audit e forbidden-actions da `07_AI/02_Jarvis_Admin.md`.
<!-- V0952-INTERNAL-TOOL:END -->
