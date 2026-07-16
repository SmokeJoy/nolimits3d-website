# API Catalog

> **Document ID:** DOC-DATA-005  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Data Architecture  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


## Endpoint groups
- `/auth`, `/me`, `/customers`
- `/products`, `/categories`, `/services`
- `/quotes`, `/orders`
- `/stl-projects`, `/files`, `/analyses`
- `/lantern-configurations`
- `/assistance-tickets`
- `/events`
- `/content`, `/media`
- `/newsletter/subscriptions`, `/campaigns`
- `/admin/*`
- `/ai/executions`
- `/webhooks/*`

Ogni gruppo deve avere OpenAPI, esempi, scope/capability, rate limit, PII classification, idempotenza e test di contratto.

<!-- V0952-API-CATALOG:START -->
## Endpoint groups v0.95.2

- `/catalog/*`, `/cart/*`, `/orders/*`, `/quotes/*`;
- `/media/*` admin e signed access;
- `/command/*` admin-only;
- `/jarvis/*` Andrea-only, non public/customer;
- `/worker/jobs/*` machine identity, Fase 2;
- `/printflow/*` assente in Fase 1 salvo content/waitlist route del sito.

Edge Functions verificano JWT/capability e idempotency; i nomi sono logici e saranno mappati alle function reali durante implementazione.
<!-- V0952-API-CATALOG:END -->
