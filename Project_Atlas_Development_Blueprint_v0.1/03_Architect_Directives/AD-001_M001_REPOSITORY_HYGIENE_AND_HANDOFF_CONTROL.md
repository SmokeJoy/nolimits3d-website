# Architect Directive AD-001 — M-001 Repository Hygiene and Handoff Control

> **Directive ID:** AD-001  
> **Milestone:** M-001 — Repository Foundation  
> **Owner:** ChatGPT, Chief Architect & CTO  
> **Business approval:** Andrea  
> **Data:** 2026-07-15  
> **Stato:** BINDING / IMMEDIATE  
> **Supersedes:** qualsiasi istruzione operativa che consenta artefatti sciolti, ZIP multipli, copie parallele o cancellazioni incerte.

## Architect Verdict sul Patched Sprint Plan

**Esito: CHANGES REQUIRED — NO PROCEED.**

Il piano ricevuto non autorizza la generazione del codice. Il blocker CODEOWNERS resta aperto e il piano non incorpora ancora i controlli necessari per mantenere la codebase pulita e il flusso di handoff verificabile.

## Motivi bloccanti

1. manca una Root Allowlist vincolante;
2. manca il principio Single Active Handoff ZIP;
3. manca il Delete Quarantine con preservazione dei percorsi e manifest;
4. manca un formato ZIP verificabile con manifest, checksum e deletion plan;
5. manca il divieto di report, prompt e script temporanei sciolti nella root;
6. manca il work package `M001-F Integration Evidence` previsto dal Blueprint;
7. la CI proposta riduce i check del Blueprint e deve includere anche route/guard scan, migration dry-run quando applicabile e documentation source-binding check;
8. la formulazione Vercel deve restare subordinata a verifica di integrazione e capacità effettiva, senza promessa non verificata;
9. la patch esatta di Node deve essere verificata come disponibile e riproducibile prima del pin definitivo;
10. il GitHub handle reale di Andrea resta necessario per CODEOWNERS.

## Ordine operativo a Gemini

Gemini deve, nell'ordine:

1. interrompere qualsiasi implementazione di codice;
2. applicare la Repository Hygiene and Handoff Packaging Policy;
3. eseguire un root audit;
4. spostare in `99_DELETE_QUARANTINE` tutti gli elementi non ammessi ma non certamente eliminabili;
5. non cancellare fonti autorevoli;
6. migrare il piano operativo dal file sciolto `implementation_plan.md` al percorso canonico del Team Workspace;
7. produrre un nuovo Sprint Plan M-001 completo, con `M001-A` fino a `M001-F`;
8. includere tutti i check del Blueprint;
9. produrre Root Cleanliness Evidence e Handoff Manifest;
10. eliminare il precedente ZIP attivo prima di crearne uno nuovo;
11. consegnare ad Andrea un solo messaggio e un solo `PROJECT_ATLAS_CURRENT_HANDOFF.zip`;
12. attendere il nuovo Architect Review.

## Azioni autorizzate adesso

- aggiornamenti di governance e pianificazione contenuti nel pacchetto AD-001;
- audit della root;
- ricollocazione e quarantena di artefatti;
- generazione del nuovo Sprint Plan e relativo ZIP.

## Azioni non autorizzate

- creazione di `apps/web`, `packages/*`, `supabase/*` o workflow CI;
- installazione dipendenze;
- modifica o merge del codice applicativo;
- deploy Vercel/Supabase;
- cancellazione definitiva di file dubbi;
- qualsiasi `Proceed` auto-dichiarato.

## Condizione per il prossimo gate

Il prossimo Architect Review richiede:

- root audit before/after;
- elenco preciso degli elementi mantenuti, ricollocati e messi in quarantena;
- nuovo Sprint Plan;
- ZIP conforme alla policy;
- GitHub handle reale oppure blocker formalmente mantenuto;
- nessun codice applicativo generato.
