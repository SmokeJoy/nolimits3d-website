# Observability

> **Document ID:** DOC-OPS-004  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Engineering Operations  
> **Ambito autorevole:** logging, metriche, tracing, health e alert per cloud e Compute Worker.

Structured logs con correlation ID; metriche RED/USE; tracing per request e job; health/readiness; dashboard business/tecnica; alert actionable con runbook. Mai loggare file, prompt completi o PII non necessaria.

## Topology metrics

- Vercel: deploy health, route error, CWV/RUM, bandwidth/build trends;
- Supabase: database/storage growth, auth/error rate, function latency, connection pressure;
- PC Worker: heartbeat age, version, capabilities, queue age, active job, CPU/RAM/disk, tool failures;
- cross-system: correlation ID, job lease/retry, artifact checksum, end-to-end latency.

## Worker health states

`healthy`, `degraded`, `offline`, `draining`, `incompatible`, `maintenance`. Lo stato è visibile all’admin e non viene rappresentato al cliente come errore tecnico non spiegato.

<!-- V0952-OBS:START -->
## Metriche v0.95.2

Command Center: queue age, pending confirmations, quote SLA, stock/content alerts. Jarvis: mode, tool success, approval rate, false-success, cost/latency e blocked action; niente prompt/PII completi. Supabase: RLS denials, function latency, quota. Worker: heartbeat/lease/retry solo Fase 2.
<!-- V0952-OBS:END -->
