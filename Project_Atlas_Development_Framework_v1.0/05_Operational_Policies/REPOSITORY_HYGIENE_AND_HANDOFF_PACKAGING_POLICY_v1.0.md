# Repository Hygiene and Handoff Packaging Policy v1.0

> **Policy ID:** PA-DF-POL-001  
> **Stato:** APPROVED — vincolante  
> **Approvazione congiunta:** Andrea, Product Owner + ChatGPT, Chief Architect & CTO  
> **Data di efficacia:** 2026-07-15  
> **Ambito:** tutti i repository, workspace, report, pacchetti di handoff e agenti di Project Atlas  
> **Gerarchia:** policy operativa subordinata al Development Playbook; in caso di conflitto prevale il Playbook.

## 1. Decisione normativa

Project Atlas adotta una regola permanente di **Clean Codebase e Single Active Handoff**.

La root del progetto DEVE contenere esclusivamente directory e file ammessi dalla Root Allowlist. Report, prompt, ZIP, script di patch, copie versionate, cartelle temporanee e file generati NON DEVONO accumularsi nella root.

Ogni report operativo di Gemini DEVE essere accompagnato da un unico pacchetto ZIP autosufficiente con tutti e soli i file nuovi o modificati necessari per applicare l'handoff. Il messaggio senza ZIP non costituisce consegna verificabile.

## 2. Principi obbligatori

1. **Canonical path only:** ogni informazione deve avere un solo percorso canonico.
2. **No duplicate versions:** una nuova versione sostituisce la precedente nel percorso governato oppure viene archiviata secondo policy; non restano copie parallele nella root.
3. **No loose artifacts:** nessun report, prompt, script usa-e-getta, ZIP o file di patch resta sciolto nella root dopo l'applicazione.
4. **Single active handoff:** può esistere un solo `PROJECT_ATLAS_CURRENT_HANDOFF.zip` alla volta.
5. **Delete before create:** Gemini DEVE eliminare il precedente pacchetto `CURRENT` prima di crearne uno nuovo.
6. **Uncertainty means quarantine:** se esiste qualsiasi dubbio sulla cancellazione, il file o la cartella NON DEVE essere eliminato; deve essere spostato nella Delete Quarantine.
7. **Preserve provenance:** ogni spostamento, sostituzione o cancellazione deve essere registrato con percorso originale, motivo, checksum e Handoff ID.
8. **No silent cleanup:** nessuna cancellazione o spostamento può essere omesso dal report.
9. **Payload completeness:** tutti i file dichiarati come creati o modificati devono essere inclusi nel ZIP.
10. **Message + ZIP:** Andrea trasferisce a ChatGPT il messaggio di Gemini e lo ZIP. ChatGPT non approva sulla sola descrizione testuale.

## 3. Root Allowlist

La root è governata tramite allowlist, non tramite blacklist. Sono ammessi:

### 3.1 Fonti e workspace governati

- `NoLimits3D_Documentation_v0.96/` fino alla migrazione controllata alla Frozen Baseline;
- `Project_Atlas_Development_Framework_v1.0/`;
- `Project_Atlas_Development_Blueprint_v0.1/`;
- `Project_Atlas_Team_Workspace/`;
- `000_PROJECT_STATE.md`;
- `001_SESSION_HANDOFF.md`;
- `002_PROJECT_DNA.md`.

### 3.2 Struttura tecnica M-001

- `.github/`;
- `apps/`;
- `packages/`;
- `supabase/`;
- `docs/`;
- `scripts/`;
- file di configurazione repository approvati: `.gitignore`, `.gitattributes`, `.editorconfig`, `.nvmrc`, `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `tsconfig.json`, `eslint.config.*`, `.prettierrc*`, `README.md`, `LICENSE*` e altri file espressamente previsti da Task Packet approvato.

### 3.3 Eccezione temporanea di trasferimento

- `PROJECT_ATLAS_CURRENT_HANDOFF.zip` può essere presente nella root solo durante validazione e applicazione.
- Al termine dell'applicazione deve essere eliminato.
- Nessun altro ZIP di report/handoff è ammesso nella root.

Qualunque elemento non incluso nell'allowlist richiede una decisione: mantenere, ricollocare, archiviare, mettere in quarantena o eliminare.

## 4. Delete Quarantine

Percorso canonico:

`Project_Atlas_Team_Workspace/99_DELETE_QUARANTINE/<HANDOFF_ID>/<original-relative-path>`

Regole:

- preservare il percorso relativo originale;
- non importare, eseguire, compilare o distribuire contenuti dalla quarantena;
- generare `QUARANTINE_MANIFEST.json` con checksum, motivo, origine, data, agente e decisione richiesta;
- nessuna cancellazione automatica;
- la rimozione definitiva richiede decisione esplicita registrata da Gemini e approvazione conforme all'autorità del file;
- le fonti autorevoli non possono essere messe in quarantena senza Architect Decision.

## 5. Contratto del pacchetto ZIP

Nome obbligatorio per il pacchetto attivo:

`PROJECT_ATLAS_CURRENT_HANDOFF.zip`

Struttura obbligatoria:

```text
__ATLAS_HANDOFF__/
  HANDOFF_MANIFEST.json
  REPORT.md
  DELETION_PLAN.json
payload/
  <percorsi relativi alla root del progetto>
```

### 5.1 HANDOFF_MANIFEST.json

Deve contenere almeno:

- Handoff ID univoco;
- milestone, sprint e task;
- mittente e destinatario;
- timestamp;
- baseline e Blueprint references;
- elenco di ogni file payload con operazione, dimensione e SHA-256;
- test ed evidenze;
- blocker, assunzioni e deviazioni;
- dichiarazione di root cleanliness;
- nome/checksum del pacchetto quando calcolabile fuori dal pacchetto.

### 5.2 REPORT.md

Deve dichiarare:

- cosa è stato fatto;
- cosa non è stato fatto;
- file creati, modificati, sostituiti, messi in quarantena o eliminati;
- test eseguiti e risultati;
- rischi, debt, waiver e blocker;
- decisioni richieste;
- stato finale reale.

### 5.3 DELETION_PLAN.json

Deve separare:

- `delete`: elementi la cui cancellazione è certa e autorizzata;
- `quarantine`: elementi dubbi o in attesa di decisione;
- `retain`: elementi verificati che devono restare.

Un elemento non può comparire in più categorie.

### 5.4 Payload

- include tutti e soli i file nuovi o modificati;
- usa percorsi relativi alla root;
- non contiene intere copie del repository;
- non contiene segreti;
- non contiene cache, build output, dipendenze installate o file temporanei;
- non contiene versioni duplicate dello stesso documento.

## 6. Ciclo obbligatorio di handoff Gemini

1. Validare root e stato Git.
2. Eliminare il precedente `PROJECT_ATLAS_CURRENT_HANDOFF.zip` e la staging `CURRENT` precedente.
3. Preparare report, manifest e deletion plan.
4. Raccogliere tutti e soli i file modificati/nuovi.
5. Calcolare SHA-256.
6. Creare un unico ZIP.
7. Validare lo ZIP con `scripts/governance/atlas_handoff.py validate`.
8. Verificare che non esistano ZIP/report/script temporanei estranei nella root.
9. Consegnare ad Andrea un messaggio conciso più il singolo ZIP.
10. Attendere Architect Review; non dichiarare `Proceed` autonomamente.

## 7. Applicazione del pacchetto

- validazione obbligatoria prima dell'applicazione;
- estrazione solo dei file in `payload/`;
- qualsiasi file esistente sostituito deve essere preservato nella quarantena del relativo Handoff ID, salvo identità di checksum;
- le voci `quarantine` vengono spostate, non eliminate;
- le voci `delete` richiedono conferma esplicita;
- dopo successo, i soli metadati dell'handoff vengono archiviati in `Project_Atlas_Team_Workspace/06_Handoffs/Archive/<HANDOFF_ID>/`;
- il ZIP attivo viene eliminato;
- deve essere eseguito un root audit finale.

## 8. File e cartelle vietati nella root

Salvo autorizzazione temporanea esplicita:

- `*.zip`, `*.rar`, `*.7z`;
- `implementation_plan.md` o report equivalenti sciolti;
- `COPY_TO_*.md`, prompt operativi e note agente sciolte;
- script `generate_*`, `update_*`, `patch_*`, `temp_*` non collocati sotto `scripts/` e non governati;
- cartelle duplicate con suffissi `(1)`, `_copy`, `_backup`, `_old`, versioni parallele o annidamenti duplicati;
- build output, cache, `node_modules`, coverage, log locali e dump.

## 9. Gate di conformità

Un handoff è `FAIL` se:

- manca lo ZIP;
- lo ZIP non contiene tutti i file dichiarati;
- esiste più di un pacchetto attivo;
- restano artefatti temporanei nella root;
- un file dubbio è stato eliminato invece di essere messo in quarantena;
- mancano checksum o deletion plan;
- il pacchetto contiene segreti, cache o output generati;
- il report dichiara completamento senza evidenze.

Il fallimento blocca implementazione, merge e Architect Review.

## 10. Applicazione immediata a M-001

Prima di qualsiasi generazione di codice M-001, Gemini deve:

- applicare questa policy;
- eseguire l'audit della root;
- spostare in quarantena gli artefatti non ammessi o dubbi;
- produrre la Root Cleanliness Evidence;
- revisionare lo Sprint Plan includendo il contratto di handoff e il gate di root cleanliness;
- restituire un unico ZIP conforme.

La pulizia governata e la produzione del nuovo Sprint Plan sono autorizzate. La generazione di codice applicativo resta NON AUTORIZZATA fino al successivo Architect Verdict.
