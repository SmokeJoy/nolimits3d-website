# ADR-0018 — React/TypeScript/Vite application stack with Next.js review gate

> **Document ID:** DOC-ADR-018  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Software Architecture  
> **Decision status:** Accepted  
> **Data:** 2026-07-15  
> **CR:** CR-0003

## Context

La piattaforma richiede UI applicativa, configuratore 3D e Command Center; SEO/rendering pubblico devono essere provati prima del freeze.

## Decision

Adottare come scelta corrente React, TypeScript, Vite, React Router, TanStack Query, React Hook Form, Zod, Tailwind CSS, shadcn/ui, React Three Fiber e Drei. Prima della Frozen Baseline v1.0 eseguire un confronto formale con Next.js su SEO, rendering, routing, performance, costi, complessità, Vercel, Supabase, 3D, Command Center, manutenzione e migrazione. La decisione finale accetta o supersede questo ADR.

## Consequences

Velocità e controllo SPA; stack coerente con 3D e admin. La baseline non può essere congelata finché il gate non è concluso.

## Risks and mitigations

Rischio SEO/rendering o migrazione tardiva: prototipo comparabile, misure e decisione prima del codice irreversibile.

## Revisit conditions

Esito del review gate o cambiamenti sostanziali di requisiti hosting/rendering.

## Links

- `12_Planning/Change_Requests/CR-0003_Application_Architecture_Operating_Model.md`;
- `12_Planning/01_ADR_Register.md`.
