# Tooling Evaluation: Component Preview & Visual Testing

## Metadata
* **Phase**: M-002 Design System
* **Evaluated Tools**: Vite Playground (Baseline), Ladle (Candidate), Playwright (Candidate)
* **Status**: Vite Playground (BASELINE), Ladle (EVALUATION - NOT AUTHORIZED), Playwright (EVALUATION - NOT AUTHORIZED)

## Vite Playground (Baseline)
Vite Playground è la soluzione a dipendenza zero autorizzata per M-002.
- **Vantaggi**: Nessuna libreria aggiuntiva. Piena compatibilità con Vite `8.1.4` e React `19.2.7`.
- **Svantaggi**: Non offre snapshot test automatici o isolamento catalogato out-of-the-box.
- **Decisione M-002**: **APPROVED**. Sarà usato per la Wave C implementativa di `@atlas/ui`.

## Ladle (Candidate)
Ladle richiede React e ReactDOM, e file `.ladle` con configurazione dedicata. È stato identificato come potenziale libreria per la preview, ma:
- Il repository attualmente usa React `19.2.7` e Vite `8.1.4`. La compatibilità effettiva con questo specifico stack deve essere dimostrata, non bastano le peer dependencies generiche.
- **Decisione M-002**: **EVALUATION — NOT AUTHORIZED**.

## Playwright (Candidate)
Playwright è candidato per il visual regression testing (Snapshot).
- La visual regression con Ladle richiede separatamente: Playwright, file di test, server Ladle attivo, gestione baseline, snapshot committati, e font stabiliti.
- **Decisione M-002**: **EVALUATION — NOT AUTHORIZED**.
