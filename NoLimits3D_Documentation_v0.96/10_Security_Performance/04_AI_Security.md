# AI Security e Prompt Injection Prevention

> **Document ID:** DOC-SEC-004  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Security / Performance  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


Separare istruzioni e dati; considerare documenti/tool output non attendibili; allowlist tool; schema validation; capability token a breve durata; redazione segreti; retrieval con ACL; canary tests; blocco URL/azioni arbitrarie; approvazione umana per side effect critici.

<!-- V0952-AI-SEC:START -->
## Jarvis private threat boundary

> **Jarvis è l'assistente AI strettamente privato di Andrea, integrato esclusivamente nel Command Center amministrativo di NoLimits3D. Assiste Andrea nella gestione e nell'evoluzione del sito tramite strumenti autorizzati, con identità e permessi verificati server-side e controllo umano sulle azioni consequenziali. Non è un servizio pubblico, non è un chatbot clienti e non fa parte del team di sviluppo.**

Minacce: privilege escalation, prompt injection da contenuti/media, confused deputy, approval replay, data exfiltration, scope self-modification e false success. Controlli futuri: Andrea-only auth, `jarvis.use`, autorizzazione server-side per tool e resource scope, tool schema, risk tiers, source trust labels, scoped approval token, output validation, audit, rate limit, revoca e kill switch. Nessun customer-facing Jarvis.

Nessun controllo è dichiarato implementato dalla sola documentazione. Provider, prompt runtime, memoria e tool restano vietati finché il Blueprint dedicato non chiude identity/capability model, threat model, privacy review e negative test.
<!-- V0952-AI-SEC:END -->
