# M002 Preview Tooling Evaluation

## Evaluated Options
- **Vite Playground**: BASELINE APPROVED FOR PLANNING
- **Ladle**: EVALUATION (Installation NOT AUTHORIZED)
- **Playwright** (for Ladle): Installation NOT AUTHORIZED

## Matrix di Valutazione: @ladle/react

| Criterio | Valore Rilevato |
|---|---|
| Versione Esatta | `5.1.1` |
| Licenza | `MIT` |
| Motori (Node) | `>=20.0.0` |
| Peer Dependencies | `react >=18.0.0`, `react-dom >=18.0.0` |
| Dipendenze Dirette | 32 (incluse `koa`, `msw`, `vite`, `@babel/core`, `@mdx-js/react`, `axe-core`) |
| Unpacked Size | `1.28 MB` |
| Build Tool | `vite ^6.0.5` |
| Manutenzione/Stato | Attivo, integrato con Vite 6 |
| Alternative senza deps | Vite Playground (Custom routing, nessun pacchetto aggiuntivo) |
| Rollback | `pnpm remove @ladle/react`, rimozione folder `.ladle`, rimozione script `ladle` |
| Impatto Lockfile | Aggiunta di ~32 dipendenze dirette e il loro sottoalbero. |
| Costo CI | Da stimare, ma richiede un server Ladle attivo per i test Playwright o snapshot statici. |

## Matrix di Valutazione: @playwright/test (Requisito per Visual Snapshots)

| Criterio | Valore Rilevato |
|---|---|
| Versione Esatta | `1.61.1` |
| Licenza | `Apache-2.0` |
| Motori (Node) | `>=18` |
| Dipendenze Dirette | 1 (`playwright`) |

## Conclusione & Decisione
Attualmente, la configurazione **Vite Playground** è l'unica base autorizzata per il planning. L'adozione di Ladle e Playwright rimane in fase di valutazione. Non essendo autorizzata alcuna installazione, il setup non impatterà il lockfile fino all'approvazione finale del Chief Architect.
