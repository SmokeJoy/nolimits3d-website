import os
import re

old_file = "000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v1.0.md"
new_file = "000_PROJECT_ATLAS_DEVELOPMENT_PLAYBOOK_v1.0.1.md"

with open(old_file, "r", encoding="utf-8") as f:
    content = f.read()

# Update version
content = content.replace("Project Atlas — Development Playbook v1.0", "Project Atlas — Development Playbook v1.0.1")
content = content.replace("> **Versione:** 1.0", "> **Versione:** 1.0.1")
content = content.replace("Development Playbook v1.0\n        ↓ definisce COME LAVORA IL TEAM", "Development Playbook v1.0.1\n        ↓ definisce COME LAVORA IL TEAM")

new_chapters = """---

# 17 — Development Philosophy

## 17.1 Principi fondanti

La filosofia di sviluppo di Project Atlas è la bussola decisionale per ogni implementazione:

- **Il codice è una conseguenza dell'architettura:** non si scrivono righe di codice per scoprire l'architettura. Si definisce l'architettura nel Blueprint e il codice ne diviene la traduzione letterale.
- **Ogni scelta deve poter essere compresa anche dopo anni:** il codice, i log, i commit e la documentazione devono raccontare chiaramente il "perché" dietro ogni decisione tecnica, non solo il "cosa".
- **Il software deve essere progettato per evolvere:** l'architettura non è statica. Le fondamenta devono essere solide ma modulari, per consentire l'evoluzione del prodotto senza doverlo riscrivere.
- **Evitare soluzioni temporanee permanenti:** i workaround sono debito. Se strettamente necessari per uno sblocco, devono essere isolati, tracciati come debito tecnico e rimossi nel ciclo successivo.
- **Preferire semplicità a complessità:** l'astrazione inutile è dannosa. Se una funzione semplice risolve il problema senza duplicazione, non introdurre pattern complessi.
- **Privilegiare qualità rispetto alla velocità:** la velocità senza qualità genera debito paralizzante. Meglio consegnare una funzionalità ineccepibile che tre funzionalità instabili.

---

# 18 — Engineering Principles

## 18.1 Principi applicativi

I seguenti principi guidano l'operato tecnico quotidiano e costituiscono criteri validi di review:

- **Simplicity over Cleverness:** il codice deve essere leggibile e ovvio. Le scorciatoie sintattiche "intelligenti" ma oscure sono vietate.
- **Explicit over Implicit:** ogni comportamento, variabile, dipendenza e fallback deve essere dichiarato. Evitare magia del framework, configurazioni non tracciate o convenzioni implicite.
- **Composition over Duplication:** individuare pattern comuni ed estrarli in moduli riutilizzabili e indipendenti. La duplicazione del codice è ammessa solo quando un'astrazione precoce genererebbe accoppiamento errato.
- **Testability by Design:** una funzionalità non testabile automaticamente è una funzionalità difettosa. L'architettura deve prevedere mocking, dependency injection e confini isolabili.
- **Security by Default:** nessun dato esposto senza controllo accessi (RLS), nessuna validazione solo frontend, nessuna trust implicita. Ogni input è potenzialmente ostile.
- **Performance by Design:** latenza, payload e complessità computazionale devono rientrare nei budget prestabiliti sin dalla prima bozza del Blueprint, non ottimizzati a posteriori.
- **Accessibility by Default:** accessibilità (WCAG) non è una feature. Deve essere garantita nei markup, nei contrasti e nei flussi di navigazione in modo nativo.
- **AI-Assisted, Human Approved:** gli agenti AI producono, analizzano e validano, ma ogni step cruciale di valore business o architetturale radicale richiede approvazione o supervisione umana (Andrea).
- **Long-Term Maintainability:** scrivere codice pensando a chi dovrà modificarlo. Regole ferree di naming, linting e struttura delle directory.
- **Documentation Before Implementation:** la documentazione (Blueprint, contratti API, ADR) precede sempre il codice. Non si codifica sperando di documentare poi.

"""

content = content.replace("---\n\n# 17 — Continuous Improvement", new_chapters + "---\n\n# 19 — Continuous Improvement")

content = content.replace("# 17 — Continuous Improvement", "# 19 — Continuous Improvement")
content = content.replace("## 17.1", "## 19.1")
content = content.replace("## 17.2", "## 19.2")
content = content.replace("## 17.3", "## 19.3")
content = content.replace("## 17.4", "## 19.4")

content = content.replace("# 18 — Project Metrics", "# 20 — Project Metrics")
content = content.replace("## 18.1", "## 20.1")
content = content.replace("## 18.2", "## 20.2")
content = content.replace("## 18.3", "## 20.3")
content = content.replace("## 18.4", "## 20.4")

content = content.replace("# 19 — Operational Checklists", "# 21 — Operational Checklists")
content = content.replace("## 19.1", "## 21.1")
content = content.replace("## 19.2", "## 21.2")
content = content.replace("## 19.3", "## 21.3")
content = content.replace("## 19.4", "## 21.4")
content = content.replace("## 19.5", "## 21.5")
content = content.replace("## 19.6", "## 21.6")

content = content.replace("# 20 — Appendices", "# 22 — Appendices")
content = content.replace("## 20.1", "## 22.1")
content = content.replace("## 20.2", "## 22.2")
content = content.replace("## 20.3", "## 22.3")
content = content.replace("## 20.4", "## 22.4")
content = content.replace("## 20.5", "## 22.5")

architect_veto = """
## 08.6 Architect's Veto

Il Chief Architect (ChatGPT) detiene il potere di **Architect's Veto**.

Il Chief Architect può rifiutare una milestone anche quando:
- il codice compila perfettamente;
- la copertura dei test è al 100% e tutti i test passano;
- la review tecnica di Gemini è positiva.

Motivazioni possibili per esercitare il veto:
- violazione della Documentation Bible;
- violazione del Development Blueprint;
- violazione della Project Constitution;
- incremento ingiustificato del debito tecnico o presenza di workaround inaccettabili;
- riduzione della manutenibilità a lungo termine;
- architettura incoerente con il resto del sistema;
- compromissione dell'esperienza utente;
- perdita di estendibilità futura (hardcoding eccessivo, mancanza di modularità).
"""
content = content.replace("Solo `Approved` e `Approved with Tracked Conditions` consentono il passaggio successivo. Le condizioni non possono riguardare gate non derogabili.", "Solo `Approved` e `Approved with Tracked Conditions` consentono il passaggio successivo. Le condizioni non possono riguardare gate non derogabili.\n" + architect_veto)

tech_debt = """---

# 12 — Technical Debt Policy

## 12.1 Definizione

Il debito tecnico in Project Atlas rappresenta qualsiasi compromesso architetturale, bypass dei test, mancanza di refactoring, o workaround temporaneo implementato per rispettare un vincolo operativo stringente, consapevole che genererà un costo di manutenzione futuro.

## 12.2 Quando è accettabile

Il debito tecnico NON è mai accettabile per "pigrizia" o per mancanza di tempo nella stesura dei test base. È accettabile soltanto quando:
- esiste un blocco di ecosistema temporaneo (bug di terze parti) che richiede un workaround;
- il costo di implementare la soluzione definitiva blocca una milestone critica approvata da Andrea;
- è strettamente delimitato, isolato in un modulo specifico e non intacca la sicurezza o l'integrità dei dati.

## 12.3 Registrazione

Ogni istanza di debito tecnico deve essere obbligatoriamente registrata. Un workaround inserito senza tracciatura è considerato un difetto grave.
Il registro (Debt Backlog) deve includere:
- descrizione del debito e contesto;
- motivo per cui è stato introdotto;
- owner e impatto sul sistema;
- istruzioni per l'eliminazione futura.

## 12.4 Prioritizzazione ed eliminazione

Il debito tecnico ha priorità. Gemini DEVE includere ticket di Technical Debt remediation in ogni milestone, allocando costantemente una percentuale del capacity di sprint alla risoluzione del debito. Non si accumula debito oltre la chiusura di due milestone senza piano di rientro.

## 12.5 Rifiuto per Debito Eccessivo

Una milestone DEVE essere rifiutata durante la Architect Review se:
- contiene debito tecnico non dichiarato;
- l'accumulo totale del debito nel progetto supera la soglia di tolleranza architetturale;
- il debito minaccia la stabilità, scalabilità o sicurezza del sistema (Architect's Veto).
"""

content = content.replace("---\n\n# 12 — RFC Process", tech_debt + "\n---\n\n# 13 — RFC Process")

content = content.replace("# 13 — ADR Process", "# 14 — ADR Process")
content = content.replace("## 13.1", "## 14.1")
content = content.replace("## 13.2", "## 14.2")
content = content.replace("## 13.3", "## 14.3")
content = content.replace("## 13.4", "## 14.4")

content = content.replace("# 14 — Documentation Update Process", "# 15 — Documentation Update Process")
content = content.replace("## 14.1", "## 15.1")
content = content.replace("## 14.2", "## 15.2")
content = content.replace("## 14.3", "## 15.3")
content = content.replace("## 14.4", "## 15.4")
content = content.replace("## 14.5", "## 15.5")
content = content.replace("## 14.6", "## 15.6")

content = content.replace("# 15 — AI Behaviour Rules", "# 16 — AI Behaviour Rules")
content = content.replace("## 15.1", "## 16.1")
content = content.replace("## 15.2", "## 16.2")
content = content.replace("## 15.3", "## 16.3")
content = content.replace("## 15.4", "## 16.4")

content = content.replace("# 16 — Coding Governance", "# 19 — Coding Governance")
content = content.replace("## 16.1", "## 19.1")
content = content.replace("## 16.2", "## 19.2")
content = content.replace("## 16.3", "## 19.3")
content = content.replace("## 16.4", "## 19.4")
content = content.replace("## 16.5", "## 19.5")
content = content.replace("## 16.6", "## 19.6")

content = content.replace("# 19 — Continuous Improvement", "# 20 — Continuous Improvement")
content = content.replace("## 19.1", "## 20.1")
content = content.replace("## 19.2", "## 20.2")
content = content.replace("## 19.3", "## 20.3")
content = content.replace("## 19.4", "## 20.4")

content = content.replace("# 20 — Project Metrics", "# 21 — Project Metrics")
content = content.replace("## 20.1", "## 21.1")
content = content.replace("## 20.2", "## 21.2")
content = content.replace("## 20.3", "## 21.3")
content = content.replace("## 20.4", "## 21.4")

content = content.replace("# 21 — Operational Checklists", "# 22 — Operational Checklists")
content = content.replace("## 21.1", "## 22.1")
content = content.replace("## 21.2", "## 22.2")
content = content.replace("## 21.3", "## 22.3")
content = content.replace("## 21.4", "## 22.4")
content = content.replace("## 21.5", "## 22.5")
content = content.replace("## 21.6", "## 22.6")

content = content.replace("# 22 — Appendices", "# 23 — Appendices")
content = content.replace("## 22.1", "## 23.1")
content = content.replace("## 22.2", "## 23.2")
content = content.replace("## 22.3", "## 23.3")
content = content.replace("## 22.4", "## 23.4")
content = content.replace("## 22.5", "## 23.5")

def_excellence = """
## 06.6 Definition of Excellence

Una funzionalità può essere marcata come "Done" soddisfacendo i requisiti di base, ma non per questo è "Excellent".
Project Atlas richiede di tendere all'eccellenza. La Definition of Excellence si spinge oltre i requirement minimi e richiede:
- **Codice leggibile:** pulizia, naming cristallino, struttura che parla da sé.
- **Modularità:** il codice deve essere disaccoppiato in moduli logici coesi.
- **Documentazione aggiornata:** nessun drift documentale, commenti preziosi su 'perché' non 'cosa'.
- **Performance:** oltrepassare i benchmark minimi ottimizzando realmente il critical path.
- **Accessibilità:** totale supporto a screen reader, focus trap, navigazione tastiera, oltre la sufficienza WCAG.
- **Sicurezza:** non solo priva di falle note, ma strutturata secondo principi di Zero Trust.
- **Test significativi:** copertura non per percentuale, ma mirata ai casi limite e fail paths reali.
- **Assenza di duplicazioni:** codice DRY intelligente.
- **Coerenza con il Design System:** pixel-perfect adherence senza over-rides locali dei componenti.
- **Coerenza con il Blueprint:** nessun hack e allineamento formale alle strutture architetturali.
- **Semplicità architetturale:** la soluzione finale deve apparire semplice ed elegante, non cervellotica.
"""
content = content.replace("## 06.5 Non conformità", def_excellence + "\n## 06.7 Non conformità")

content = content.replace("eseguire Technical Review e QA di primo livello;", "eseguire la Technical Review e garantire i Quality Assurance (QA) test end-to-end (non delegati a ruoli esterni);")
content = content.replace("Gemini coordina:\n\n- compatibilità dei contratti;", "Gemini coordina (Merge Policy & QA Integration):\n\n- compatibilità dei contratti;")

content = content.replace("Nessun agente accumula contemporaneamente autorità di prodotto, architettura, coordinamento e implementazione.", "Nessun ruolo deve mai sovrapporsi. Nessun agente accumula contemporaneamente autorità di prodotto, architettura, coordinamento e implementazione.")

# Fix numbering logic flaw where continuous improvement etc might have been replaced wrongly
# Actually the simplest way is just to write out the content to the new file, then we can check.
with open(new_file, "w", encoding="utf-8") as f:
    f.write(content)
