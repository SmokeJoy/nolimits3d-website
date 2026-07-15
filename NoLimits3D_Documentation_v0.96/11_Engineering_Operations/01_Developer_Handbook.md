# Developer Handbook

> **Document ID:** DOC-OPS-001  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Engineering Operations  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


## Repository
GitHub è il repository autorevole approvato. La struttura corrente è un monorepo modulare:

```text
apps/web/                 # sito pubblico, account cliente e Command Center protetto
apps/worker/              # Compute Worker, introdotto solo quando il gate Fase 2 è superato
packages/ui/              # componenti e design primitives condivise
packages/domain/          # tipi e regole di dominio pure
packages/api-contracts/   # schemi e contratti versionati
packages/config/          # configurazione condivisa non sensibile
supabase/functions/       # Edge Functions
supabase/migrations/      # schema e migrazioni PostgreSQL
supabase/seed/            # dati seed non produttivi
docs/                     # copia o mount della Documentation Bible governata
```

Il Command Center non è un’applicazione `apps/admin` separata: è una surface protetta della Website Platform. In Fase 1 non esiste `apps/api`; la logica server è implementata tramite Supabase, RLS ed Edge Functions. Una separazione successiva richiede ADR.

## Git
Trunk-based con branch brevi `feat/`, `fix/`, `chore/`; main protetta; PR obbligatorie; niente force push su branch protetti.

## Commit
Conventional Commits: `feat(catalog): add product filtering`.

## Pull Request
Descrizione problema/soluzione, screenshot, test, migration, sicurezza, accessibilità, performance, rollback e link task/ADR.

## Code style
Type checking strict, lint/format automatici, funzioni piccole, errori tipizzati, boundary validation, no secret/config hardcoded, dependency direction enforced.

## Definition of Done
Codice, test, docs, telemetry, migrations, security/accessibility checks, review e deploy preview completati.

## Project identity

- repository e board possono usare il codename `Project Atlas`;
- package, endpoint e superfici cliente usano naming di dominio, non il codename;
- il codename non entra in SEO o contenuti pubblici.

## Deployment ownership

Pull request → GitHub checks → Vercel preview. Migrazioni/funzioni Supabase seguono pipeline governata. Il Compute Worker ha release artifact/versione propria e non viene aggiornato automaticamente senza health check e rollback.

## Review gate dello stack

React + TypeScript + Vite è la scelta corrente. Prima della Frozen Baseline v1.0 il confronto formale con Next.js può modificare esclusivamente le parti giustificate dall’ADR risultante; nessuna migrazione viene eseguita informalmente.

<!-- V0954-DEVELOPMENT-CONSTITUTION:START -->
## 14. Development Constitution

### 14.1 Contratto di implementazione

Il codice è conforme solo quando implementa la specifica approvata e produce evidenza verificabile. “Funziona” non è sufficiente se il comportamento non è tracciato, sicuro, accessibile, osservabile e coerente con gli invarianti.

Ogni unità di lavoro deve iniziare da un item `Ready` e contenere:

- requisito e Owner Document;
- task roadmap;
- ADR applicabili;
- acceptance criteria;
- Negative Requirements pertinenti;
- piano di test e rollback proporzionato.

### 14.2 Regole costituzionali dello sviluppo

1. nessun codice speculativo per feature future;
2. nessun comportamento pubblico non documentato;
3. nessun refactor architetturale nascosto in una feature PR;
4. nessun bypass di policy “temporaneo” senza expiry e CR;
5. nessun merge con gate bloccante fallito;
6. ogni default deve essere sicuro e dichiarato;
7. ogni integrazione esterna deve avere timeout, error handling e fallback;
8. ogni migrazione deve essere forward/rollback aware;
9. ogni UI deve rendere visibili stato, errore e recovery;
10. ogni azione AI rilevante deve essere auditabile e revocabile.

### 14.3 Pull Request contract

La PR deve includere almeno:

```text
Requirement: <ID>
Roadmap: <ID>
Owner Document: <path>
ADR: <ID | N/A motivato>
Invariants checked: <IDs>
Negative Requirements checked: <IDs>
Tests: <evidenze>
Security/Privacy impact: <esito>
Migration/Rollback: <esito>
```

### 14.4 Requisiti di sviluppo

| ID | Requisito | Priorità |
|---|---|---|
| DEV-NF-001 | Lo sviluppo deve iniziare solo da requisiti e task nello stato autorizzato. | Must |
| DEV-NF-002 | Ogni pull request deve riferire requisito, roadmap, Owner Document e ADR applicabili. | Must |
| DEV-NF-003 | Il codice non deve introdurre comportamenti, default o feature non documentati. | Must |
| DEV-NF-004 | I test devono coprire acceptance criteria, Negative Requirements, sicurezza e regressione pertinenti. | Must |
| DEV-NF-005 | Ambiguità e conflitti devono bloccare il lavoro ed essere escalati all'autorità corretta. | Must |
| DEV-NF-006 | Merge e release devono essere impediti quando un Architecture Compliance Gate fallisce. | Must |
<!-- V0954-DEVELOPMENT-CONSTITUTION:END -->

<!-- V096-DEFINITION-OF-DONE:START -->
## 15. Definition of Done costituzionale

La Definition of Done sintetica precedente è valida solo insieme ai gate seguenti. Un item è `Done` quando:

- acceptance criteria e Negative Requirements pertinenti sono verificati;
- requirement, roadmap item, Owner Document e ADR sono collegati;
- test positivi, negativi, sicurezza, accessibilità e regressione sono disponibili in misura proporzionata;
- stato, errore, recovery e fallback sono osservabili;
- migrazione e rollback sono valutati;
- nessun Project Invariant è violato;
- nessuna capability Jarvis diventa pubblica;
- PrintFlow non supera il confine di fase;
- il preventivo STL finale conserva la revisione umana;
- documentazione e RTM sono aggiornate nello stesso change.

Un'eccezione non trasforma l'item in `Done`: produce debt o waiver con owner, scadenza e autorità.
<!-- V096-DEFINITION-OF-DONE:END -->
