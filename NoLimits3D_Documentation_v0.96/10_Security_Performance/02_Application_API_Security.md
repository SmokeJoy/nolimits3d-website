# Application e API Security

> **Document ID:** DOC-SEC-002  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Security / Performance  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


MFA obbligatoria per privilegi elevati; sessioni sicure; password hashing robusto; RBAC/capability server-side; rate limit; CSRF; CSP; output encoding; secret manager; dependency scanning; webhook signature; audit immutabile; vulnerability disclosure process.

<!-- V0952-API-SEC:START -->
## Supabase/RLS/Jarvis controls

RLS deny-by-default, Edge Function auth/capability, service-role solo server-side, signed URL brevi, webhook signature, idempotency e rate limit. Jarvis richiede identity Andrea e `jarvis.use` in ogni livello; una route nascosta non è un controllo. Test negativi verificano accesso pubblico/cliente negato.
<!-- V0952-API-SEC:END -->
