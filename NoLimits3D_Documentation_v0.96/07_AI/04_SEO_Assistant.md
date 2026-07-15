# SEO Manager — Jarvis internal tool

> **Document ID:** DOC-AI-004  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** SEO / AI  
> **Ambito autorevole:** audit e proposte SEO nel back office; la strategia appartiene a `09_SEO_Content/`.

## Requisiti

| ID | Requisito | Pri |
|---|---|---|
| SEOAI-F-001 | Analizzare contenuto, intento e dati reali senza inventare volumi/ranking. | Must |
| SEOAI-F-002 | Proporre metadata, struttura e link come draft. | Must |
| SEOAI-F-003 | Verificare che schema.org rifletta contenuto visibile. | Must |
| SEOAI-F-004 | Rilevare cannibalizzazione, thin/duplicate content e link rotti. | Should |
| SEOAI-F-005 | Citare pagine e metriche usate. | Must |
| SEOAI-F-006 | Non pubblicare o creare pagine massivamente senza review. | Must |

## Tools

Read content revisions, search internal link graph, read approved analytics/Search Console adapters, create SEO recommendation draft. Nessuna modifica diretta a canonical/redirect/pubblicazione.

## Output

Evidence, issue severity, recommended change, expected metric, affected pages, risks, content gaps e confidence.

## Eval

Valid URLs, source fidelity, schema correctness, no keyword stuffing, no unsupported numeric claims.

<!-- V0952-INTERNAL-TOOL:START -->
## Boundary v0.95.2

Questo documento specifica una capability interna del solo Jarvis nel NoLimits Command Center. Non definisce un assistente pubblico, non crea una seconda identità AI e non autorizza accesso cliente. Il tool `SEO` eredita identity, approval, audit e forbidden-actions da `07_AI/02_Jarvis_Admin.md`.
<!-- V0952-INTERNAL-TOOL:END -->
