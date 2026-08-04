# Project Atlas — Istruzioni operative per Claude Code

Questo file è la mappa di governance, **non** la documentazione. La conoscenza autorevole
vive nei documenti versionati elencati sotto. In caso di conflitto, vince il documento,
mai questo file e mai una chat.

## 1. Gerarchia delle fonti autoritative

1. `NoLimits3D_Documentation_v0.96/` — Documentation Bible (in attesa di Frozen Baseline binding)
2. `Project_Atlas_Development_Framework_v1.0/` — Playbook, template, checklist, registri
3. `Project_Atlas_Development_Blueprint_v0.1/` — Blueprint, Milestone Charter, Architect Review, ADR
4. Implementazione approvata nel codice sorgente

Documenti operativi non autoritativi (indice di continuità): `000_PROJECT_STATE.md`,
`001_SESSION_HANDOFF.md`, `Project_Atlas_Team_Workspace/01_Shared_Memory/`.

**Una conversazione non è mai una fonte.** Se una richiesta cita una decisione presa "in
chat", si chiede l'artefatto versionato corrispondente prima di agire.

## 2. Confini di prodotto non negoziabili

- **Jarvis** è privato ad Andrea, dentro il Command Center, protetto da controlli di identità
  e capability **server-side**. Una route nascosta non è autorizzazione.
- **PrintFlow** resta `Coming Soon`. Nessun worker, download, client locale o percorso
  operativo PrintFlow viene abilitato in questa fase.
- Il **PC worker** è pull-only. Nessuna porta di controllo inbound pubblica.
- `apps/legacy-web` resta il fallback pubblico fino a un cutover misurato e approvato.
  Non viene riscritto né rimosso.
- **La produzione è vietata**: `BLK-BASE-001` è aperto.

## 3. Team ed autorità

| Ruolo | Titolare | Autorità | Limite invalicabile |
|---|---|---|---|
| Product Owner | Andrea (umano) | Priorità, valore, approvazione finale | Non sostituisce i gate tecnici |
| Chief Architect & CTO | ChatGPT (esterno) | Architettura, Blueprint, Architect Review | Non implementa codice di produzione |
| TPM | `atlas-tpm` | Pianificazione, orchestrazione, Technical Review | Non cambia requisiti né architettura |
| Frontend Engineer | `atlas-frontend` | UI, React/TS, Three.js, test frontend | Implementa; non decide |
| Backend & Infra Engineer | `atlas-backend` | Supabase, dati, API, CI/CD, infra | Implementa; non decide |
| QA & Security Reviewer | `atlas-qa-security` | Review read-only, verifica evidenze | Non modifica codice |
| Release Integrator | `atlas-release-integrator` | Integrazione, Milestone Review Pack | Non auto-approva |

Riferimento normativo: `Project_Atlas_Development_Framework_v1.0/03_Registries/ROLE_AUTHORITY_MATRIX.csv`
e Playbook §01.

**L'Architect Review non è delegabile a nessun agente.** L'autorità architetturale resta
esterna a Claude Code. Nessun agente dichiara approvata una milestone.

## 4. Regole invarianti per ogni agente

1. **Nessun auto-merge su `main`.** Si prepara la PR; il merge segue la policy e l'approvazione.
2. **Task Packet vincolante.** `Allowed Files` e `Forbidden Files` del Task Packet in
   `Project_Atlas_Team_Workspace/04_Planning/` sono limiti rigidi. Toccare un file vietato
   è uno stop, non un giudizio.
3. **Nessuno approva il proprio lavoro.** Chi implementa non esegue la review che lo chiude.
4. **Nessuna evidenza, nessun completamento.** Un task è completo solo con comandi eseguiti
   e output archiviato in `Project_Atlas_Team_Workspace/05_Evidence/`.
5. **Ambiguità = stop ed escalation**, non interpretazione creativa.
6. **Nessun workaround occultato.** Il debito tecnico si dichiara.

## 5. Comandi canonici

Package manager: `pnpm@9.15.0` (workspace). Sempre dalla root.

```bash
pnpm lint && pnpm typecheck && pnpm build && pnpm test
```

Guard di governance (fail-closed):

```bash
pnpm secret:scan && pnpm guard:scope && pnpm guard:source-bindings && pnpm guard:migrations && pnpm dependency:audit && pnpm format:check
```

Layout: `apps/{web,legacy-web,ui-playground}`, `packages/{ui,domain,api-contracts,config}`,
`supabase/`, `scripts/guards/`.

## 6. Quality gate

`Project_Atlas_Development_Framework_v1.0/03_Registries/QUALITY_GATE_REGISTRY.csv` definisce
DP-G00…DP-G13 con autorità di firma. Gate architetturali (DP-G02, DP-G04, DP-G12, DP-G13)
appartengono al Chief Architect e ad Andrea, mai agli agenti.
