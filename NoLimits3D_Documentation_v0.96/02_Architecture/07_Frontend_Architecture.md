# Frontend Architecture

> **Document ID:** DOC-ARCH-007  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Frontend Architecture  
> **Ambito autorevole:** stack, struttura, routing, stato, rendering, 3D e convenzioni frontend.

## 1. Stack corrente

- React + TypeScript;
- Vite;
- React Router;
- TanStack Query;
- React Hook Form + Zod;
- Tailwind CSS + shadcn/ui;
- React Three Fiber + Drei.

ADR-0018 rende questo stack la scelta corrente, soggetta al review gate con Next.js prima della Baseline 1.0.

## 2. Application surfaces

```text
apps/web/
  src/app/                 # bootstrap, providers, router
  src/routes/public/       # SEO/public routes
  src/routes/account/      # customer protected routes
  src/routes/command/      # admin-only Command Center
  src/modules/             # domain-aligned features
  src/shared/              # UI, validation, telemetry, utilities
  src/three/               # renderer adapter, scenes, fallback
```

Il Command Center può condividere build e design system, ma ha route, navigation tree e authorization boundary separati. Jarvis è caricato solo nelle route Command Center dopo verifica server-side della capability `jarvis.use` e dell’identità amministrativa Andrea.

## 3. Routing

Route pubbliche dichiarative, lazy per dominio, error boundary per segmento e metadata/canonical verificabili. Route cliente richiedono sessione. Route Command Center richiedono ruolo e capability. Qualsiasi route Jarvis è assente dal sitemap, dalla navigazione pubblica e dai bundle pubblici iniziali quando tecnicamente possibile.

## 4. State model

- **server state:** TanStack Query;
- **form state:** React Hook Form + Zod;
- **URL state:** filtri, paginazione e shareable configuration dove appropriato;
- **local UI state:** hook/component state;
- **cross-route ephemeral state:** store minimo solo se necessario;
- **authoritative state:** backend, mai cache client.

## 5. Data access

I moduli usano typed query/mutation adapters. Operazioni privilegiate, pagamento, pubblicazione, Jarvis e side effect passano da Edge Functions. Nessun componente contiene policy di pagamento o autorizzazione come unica difesa.

## 6. Rendering e SEO

La candidate usa SPA/Vite con strategie di prerendering o rendering compatibili da validare. Il review gate confronta Next.js su SEO, rendering, caching, performance, Vercel, Supabase, 3D, Command Center e costo di migrazione. Finché il gate non è chiuso, nessun documento definisce Vite come irreversibile.

## 7. Code splitting e budgets

- chunk per route e dominio;
- 3D/video/Jarvis caricati on demand;
- vendor chunk monitorati, senza manual split fragile non misurato;
- prefetch solo su intento e rete adeguata;
- fallbacks skeleton/stale data senza blocco artificiale;
- budget definiti in Performance Plan.

## 8. Forms

Schema Zod condiviso dove utile, error mapping accessibile, draft per flussi lunghi, idempotency key per submit critici e server validation autorevole.

## 9. Three.js

React Three Fiber/Drei implementano un adapter di rendering. Le scene ricevono un render model indipendente dal catalog/domain model. Static preview o 2D fallback consentono configurazione e submit senza WebGL.

## 10. Naming e component boundaries

Componenti in PascalCase; hook `useX`; schema `xSchema`; query key factory per modulo; route loader/action naming coerente. Un componente non accede a tabelle Supabase direttamente se la query appartiene a un altro modulo.

## 11. Requisiti

| ID | Requisito |
|---|---|
| FE-NF-001 | Lo stack frontend corrente deve usare React, TypeScript e Vite con le librerie approvate. |
| FE-NF-002 | Prima della Frozen Baseline deve essere completato e approvato il review gate React/Vite–Next.js. |
| FE-NF-003 | Route pubbliche, account e Command Center devono avere boundary di routing e autorizzazione distinti. |
| FE-NF-004 | Jarvis deve essere escluso da sitemap, navigazione pubblica, area cliente e accesso non amministrativo. |
| FE-NF-005 | 3D, video e motion devono essere lazy, adattivi e dotati di fallback. |
