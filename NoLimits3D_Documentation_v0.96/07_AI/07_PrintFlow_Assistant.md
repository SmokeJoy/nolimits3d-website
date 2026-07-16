# PrintFlow Manager — Jarvis internal tool, Phase 2

> **Document ID:** DOC-AI-007  
> **Versione:** 0.95.3  
> **Stato:** Future / In Review  
> **Owner:** PrintFlow / AI  
> **Ambito autorevole:** vincoli preliminari per un futuro assistente; nessuna capability è attiva in Fase 1.

> **PrintFlow è attualmente in sviluppo.** Questo assistente non deve essere esposto né simulato nella Fase 1.

## Requisiti futuri

| ID | Requisito | Pri |
|---|---|---|
| PFAI-F-001 | Attivarsi solo dopo API/auth contract reale e ADR. | Must future |
| PFAI-F-002 | Rispettare permessi PrintFlow e NoLimits3D separatamente. | Must future |
| PFAI-F-003 | Non eseguire comandi macchina non confermati e non sicuri. | Must future |
| PFAI-F-004 | Citare stato reale di job/device e timestamp. | Must future |
| PFAI-F-005 | Gestire disconnessione e dati stale senza falso successo. | Must future |
| PFAI-F-006 | Conservare audit e human review secondo rischio. | Must future |

## Discovery

Quando PrintFlow sarà disponibile: threat model, capability matrix, command safety, device identity, offline semantics, telemetry, rollback e support model.

<!-- V0952-INTERNAL-TOOL:START -->
## Boundary v0.95.2

Questo documento specifica una capability interna del solo Jarvis nel NoLimits Command Center. Non definisce un assistente pubblico, non crea una seconda identità AI e non autorizza accesso cliente. Il tool `PrintFlow` eredita identity, approval, audit e forbidden-actions da `07_AI/02_Jarvis_Admin.md`.
<!-- V0952-INTERNAL-TOOL:END -->
