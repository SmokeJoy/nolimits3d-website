# Permissions Matrix

> **Document ID:** DOC-ADM-007  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Admin Operations  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


## Ruoli base
`Owner`, `Admin`, `Operator`, `Editor`, `SEO Manager`, `Support`, `Analyst`, `Customer`.

| Capability | Owner | Admin | Operator | Editor | SEO | Support | Analyst | Customer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| settings.manage | ✓ | limitato |  |  |  |  |  |  |
| users.roles.manage | ✓ | ✓* |  |  |  |  |  |  |
| catalog.publish | ✓ | ✓ | ✓ |  |  |  |  |  |
| content.edit | ✓ | ✓ |  | ✓ | ✓ |  |  |  |
| content.publish | ✓ | ✓ |  | ✓* | ✓* |  |  |  |
| quote.manage | ✓ | ✓ | ✓ |  |  |  |  | propri: view |
| order.manage | ✓ | ✓ | ✓ |  |  |  | view | propri: view |
| support.manage | ✓ | ✓ | ✓ |  |  | ✓ |  | propri |
| analytics.view | ✓ | ✓ | limitato | limitato | ✓ | limitato | ✓ |  |
| ai.prompt.manage | ✓ | ✓ |  |  |  |  |  |  |

`*` soggetto a policy e separazione dei compiti. I permessi reali sono capability granulari, non controlli UI.

<!-- V0952-PERMISSIONS:START -->
## Capability critiche v0.95.2

| Capability | Andrea Admin | Staff futuro | Cliente | Pubblico |
|---|---:|---:|---:|---:|
| `command_center.access` | ✅ | per ruolo futuro | ❌ | ❌ |
| `jarvis.use` | ✅ esclusivo | ❌ salvo ADR futuro | ❌ | ❌ |
| `jarvis.execute_consequential` | ✅ con conferma | ❌ | ❌ | ❌ |
| `media.delete_referenced` | ✅ con sostituzione/override audit | ❌ | ❌ | ❌ |
| `catalog.bulk_price` | ✅ con approval gate | ❌ | ❌ | ❌ |
| `worker.admin` | ✅ dopo hardening | ❌ | ❌ | ❌ |

RLS e Edge Functions applicano la matrice; nascondere UI non è autorizzazione.
<!-- V0952-PERMISSIONS:END -->
