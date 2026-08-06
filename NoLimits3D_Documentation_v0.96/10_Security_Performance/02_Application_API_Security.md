# Application e API Security

> **Document ID:** DOC-SEC-002  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Security / Performance  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


MFA obbligatoria per privilegi elevati; sessioni sicure; password hashing robusto; RBAC/capability server-side; rate limit; CSRF; CSP; output encoding; secret manager; dependency scanning; webhook signature; audit immutabile; vulnerability disclosure process.

<!-- V0952-API-SEC:START -->
## Supabase/RLS/Jarvis controls

RLS deny-by-default, Edge Function auth/capability, service-role solo server-side, signed URL brevi, webhook signature, idempotency e rate limit. Jarvis richiederà identità Andrea verificata, `jarvis.use` e autorizzazione server-side per ogni tool/resource scope; una route nascosta non è un controllo. Test negativi devono verificare accesso pubblico, cliente e utente autenticato ordinario negato anche conoscendo route, endpoint e payload. Questi controlli sono un gate futuro: nessuna API Jarvis è autorizzata prima del Blueprint dedicato.
<!-- V0952-API-SEC:END -->
