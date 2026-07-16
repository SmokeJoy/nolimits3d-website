# AI Security e Prompt Injection Prevention

> **Document ID:** DOC-SEC-004  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Security / Performance  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


Separare istruzioni e dati; considerare documenti/tool output non attendibili; allowlist tool; schema validation; capability token a breve durata; redazione segreti; retrieval con ACL; canary tests; blocco URL/azioni arbitrarie; approvazione umana per side effect critici.

<!-- V0952-AI-SEC:START -->
## Jarvis private threat boundary

Minacce: privilege escalation, prompt injection da contenuti/media, confused deputy, approval replay, data exfiltration e false success. Controlli: Andrea-only auth, tool schema, risk tiers, server authorization, source trust labels, scoped approval token, output validation, audit e kill switch. Nessun customer-facing Jarvis.
<!-- V0952-AI-SEC:END -->
