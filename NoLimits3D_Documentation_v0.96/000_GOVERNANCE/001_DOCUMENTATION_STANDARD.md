# 001 — Documentation Standard

> **Document ID:** DOC-GOV-001  
> **Versione:** 0.96  
> **Stato:** Release Candidate  
> **Owner:** Documentation Architecture  
> **Ambito autorevole:** formato, struttura interna e livello qualitativo dei documenti.

## 1. Obiettivo

Definire uno standard uniforme che renda ogni documento leggibile, verificabile, collegabile e manutenibile. Questo standard applica il Charter senza ripeterne le regole fondative.

## 2. Struttura minima di un documento normativo

Un documento di specifica deve contenere, quando applicabile:

1. metadati;
2. scopo e non-scope;
3. attori o stakeholder;
4. definizioni locali, solo se non presenti nel glossario;
5. requisiti con ID;
6. regole o invarianti;
7. flussi principali e di errore;
8. dati e contratti coinvolti;
9. sicurezza, privacy e autorizzazioni;
10. UX, accessibilità e contenuti;
11. performance e osservabilità;
12. criteri di accettazione;
13. dipendenze e riferimenti;
14. decisioni aperte.

Le sezioni non applicabili devono essere omesse oppure marcate `N/A` con motivazione; non devono essere riempite con testo generico.

## 3. Linguaggio normativo

- `deve` / `non deve`: requisito obbligatorio;
- `dovrebbe`: raccomandazione con eccezioni motivate;
- `può`: opzione consentita;
- `da approvare`: decisione non ancora definitiva;
- `assunzione`: ipotesi usata per avanzare la progettazione;
- `fuori scope`: comportamento deliberatamente non previsto.

Parole come “semplice”, “veloce”, “intuitivo”, “sicuro” o “scalabile” non sono accettabili senza una metrica o un comportamento osservabile.

## 4. Livello di dettaglio

Il documento è sufficientemente dettagliato quando un team competente può:

- stimare il lavoro;
- individuare dipendenze;
- produrre test;
- implementare senza inventare regole di business;
- riconoscere le decisioni ancora aperte.

Non è richiesto anticipare dettagli locali facilmente reversibili, salvo che influenzino interoperabilità, sicurezza, performance o consistenza.

## 5. Diagrammi

Usare Mermaid per:

- flowchart;
- sequence diagram;
- state machine;
- entity relationship;
- dependency graph.

Ogni diagramma deve avere una descrizione testuale minima per restare comprensibile in ambienti che non renderizzano Mermaid.

## 6. Tabelle

Le tabelle normative devono avere chiavi stabili e colonne con significato non ambiguo. Tabelle duplicate sono vietate: una tabella autorevole viene collegata dagli altri documenti.

## 7. Cross-reference

I riferimenti devono indicare preferibilmente:

- path relativo;
- Document ID;
- requisito o sezione specifica;
- motivo del collegamento.

Non usare “vedi sopra” o “come detto altrove” senza riferimento risolvibile.

## 8. Criteri di accettazione

Ogni criterio deve essere testabile. Formato raccomandato:

```text
Given [precondizione]
When [azione]
Then [esito osservabile]
And [vincolo aggiuntivo]
```

Sono ammessi checklist o tabelle quando più leggibili.

## 9. Assunzioni e open decision

Le assunzioni devono essere etichettate e collegate a `13_Appendices/02_Open_Questions.md` quando richiedono una decisione. Non possono essere nascoste nel testo come fatti confermati.

## 10. Definition of Done documentale

Un documento è completo quando:

- tutte le sezioni necessarie sono sostanziali;
- non presenta placeholder non registrati come debt;
- i requisiti hanno ID e criteri;
- le dipendenze sono risolvibili;
- l'Owner Document è chiaro;
- l'audit non rileva errori bloccanti.

<!-- V0954-INVARIANTS-STANDARD:START -->
## 8. Invariants e Negative Requirements

Ogni specifica deve distinguere:

- comportamento richiesto;
- comportamento proibito;
- invarianti globali applicabili;
- autorità necessaria per modificarli.

I Negative Requirements sono registrati e testati come requisiti normali. Non possono essere lasciati come sole note narrative.
<!-- V0954-INVARIANTS-STANDARD:END -->
