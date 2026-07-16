# Primitive Inventory: Design System M-002

## Status
* **Status**: PENDING ARCHITECT APPROVAL
* **Gate**: Requires Architect Approval
* **Roadmap Governance**: `S-0014`, `T-0027`, `T-0028`, `ST-0014`

---

## Contratto Componenti Base UI / Sonner

Ogni primitiva sotto indicata deve rispettare integralmente il seguente contratto implementativo e di test. Nessun componente può omettere una di queste definizioni nella sua realizzazione.

---

### 1. Button
- **Scopo**: Interazione primaria o secondaria per form o trigger di azioni. Un collegamento ipertestuale deve mantenere la semantica nativa `<a>`, pertanto non viene inclusa alcuna variante "link" nel bottone.
- **Anatomia**: Base UI `<Button>` (compila in `<button>` o tag polimorfico). Contiene label ed elementi icona opzionali.
- **API e Proprietà**: `variant` ('primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'), `size` ('sm' | 'md' | 'lg'), `isLoading` (boolean), `icon` (ReactNode), standard React HTML button props.
- **Varianti**: Primary, Secondary, Destructive, Outline, Ghost.
- **Stati**: Default, hover (`data-hover`), active (`data-active`), focus-visible (`data-focus-visible`), disabled.
- **Stato Asincrono**: Se `isLoading` è `true`, disabilita l'interazione e mostra uno spinner visivo integrato preservando la larghezza del bottone.
- **Rete Assente**: Disabilitazione automatica se l'azione richiede connettività.
- **Retry**: Trattato come stato o azione separata, non come variante visuale del Button.
- **Responsive Behavior**: Touch-target minimo di `44x44px` su mobile; stack verticale per pulsanti raggruppati su schermi piccoli.
- **Accessibilità (A11y)**: Focus outline visivo distinto. Tasti Invio e Spazio supportati nativamente da Base UI. Contrasto ratio `>= 4.5:1` su tutti gli stati.
- **Reduced Motion**: Disattivazione rotazione dello spinner e transizioni hover se `prefers-reduced-motion: reduce`.
- **Comportamento Senza Hover**: Stato attivo chiaramente espresso via outline/border per dispositivi touch privi di puntatore hover.
- **Analytics Contract**: Attributo `data-track-id` e tracciamento click tramite callback `onClick`.
- **Errori**: N/A.
- **Esempi (Playground)**: `packages/ui/src/components/button.tsx` (esportato come default/named in `@atlas/ui`), visualizzabile su Vite Playground (`apps/ui-playground/`).
- **Test**: `packages/ui/tests/button.test.tsx` (verifica click, stato isLoading, disabled, e test accessibilità tramite axe).

### 2. Badge
- **Scopo**: Rappresentazione visiva di tag, categorie o contatori di stato non interattivi.
- **Anatomia**: `<div>` o `<span>` semantico con stili di utility Tailwind v4.
- **API e Proprietà**: `variant` ('default' | 'secondary' | 'destructive' | 'outline'), standard HTML span props.
- **Varianti**: Default, Secondary, Destructive, Outline.
- **Stati**: Statico (non interattivo).
- **Stato Asincrono**: N/A.
- **Rete Assente**: N/A.
- **Retry**: N/A.
- **Responsive Behavior**: Ridimensionamento o troncamento sicuro del testo su piccoli schermi.
- **Accessibilità (A11y)**: Contrasto del testo e del background conforme a WCAG AA `>= 4.5:1`.
- **Reduced Motion**: N/A.
- **Comportamento Senza Hover**: N/A.
- **Analytics Contract**: N/A.
- **Errori**: N/A.
- **Esempi (Playground)**: `packages/ui/src/components/badge.tsx` (esportato in `@atlas/ui`), visualizzabile su Vite Playground.
- **Test**: `packages/ui/tests/badge.test.tsx` (verifica rendering di tutte le varianti cromatiche ed assenza di ruoli interattivi).

### 3. Skeleton
- **Scopo**: Placeholder visivo per il caricamento progressivo dei contenuti.
- **Anatomia**: `<div>` con classe Tailwind di pulsazione.
- **API e Proprietà**: `className` (per sovrascrittura dimensioni), standard HTML div props.
- **Varianti**: Circular, Rectangular, Text.
- **Stati**: Pulsante (loading).
- **Stato Asincrono**: Rappresenta visivamente lo stato asincrono dell'applicazione.
- **Rete Assente**: Sostituito da un indicatore di errore se il fetch dati fallisce definitivamente.
- **Retry**: N/A.
- **Responsive Behavior**: Segue in modo fluido la griglia o le dimensioni del componente genitore.
- **Accessibilità (A11y)**: Marcato con `aria-hidden="true"` e `role="presentation"` per non essere letto dagli screen reader.
- **Reduced Motion**: L'animazione di pulsazione viene disattivata (sostituita con opacità statica) se `prefers-reduced-motion: reduce`.
- **Comportamento Senza Hover**: N/A.
- **Analytics Contract**: N/A.
- **Errori**: N/A.
- **Esempi (Playground)**: `packages/ui/src/components/skeleton.tsx` (esportato in `@atlas/ui`), visualizzabile su Vite Playground.
- **Test**: `packages/ui/tests/skeleton.test.tsx` (verifica la disattivazione dell'animazione con reduced motion mockato).

### 4. StatusIndicator
- **Scopo**: Indicazione visiva e testuale dello stato corrente di un servizio o risorsa.
- **Anatomia**: Contenitore che avvolge un indicatore cromatico (dot) e una label testuale descrittiva.
- **API e Proprietà**: `status` ('success' | 'warning' | 'error' | 'info'), `label` (string), standard HTML div props.
- **Varianti**: Success, Warning, Error, Info.
- **Stati**: Statico.
- **Stato Asincrono**: N/A.
- **Rete Assente**: Cambia stato automaticamente in `error` con etichetta "Senza rete" o "Disconnesso".
- **Retry**: N/A.
- **Responsive Behavior**: Contrazione a sola icona/dot con tooltip o text-overflow su piccoli schermi.
- **Accessibilità (A11y)**: L'indicazione non deve basarsi esclusivamente sul colore del dot; la label testuale deve essere leggibile dallo screen reader (`aria-live="polite"` o label esplicita).
- **Reduced Motion**: Disattivazione dell'effetto ping/pulse sul dot.
- **Comportamento Senza Hover**: N/A.
- **Analytics Contract**: N/A.
- **Errori**: Rappresenta visivamente lo stato di errore.
- **Esempi (Playground)**: `packages/ui/src/components/status-indicator.tsx` (esportato in `@atlas/ui`), visualizzabile su Vite Playground.
- **Test**: `packages/ui/tests/status-indicator.test.tsx` (verifica che l'indicatore mostri il testo alternativo corretto ed utilizzi classi conformi).

### 5. Input
- **Scopo**: Campo di inserimento testo standard.
- **Anatomia**: `<input>` nativo con classi Tailwind v4 per la gestione del focus outline.
- **API e Proprietà**: `type` (text, password, email, number), `error` (boolean), standard HTML input props.
- **Varianti**: Default, con icona (left/right).
- **Stati**: Default, hover, active, focus-visible, disabled, error.
- **Stato Asincrono**: N/A.
- **Rete Assente**: Disabilitato se l'input richiede interrogazione di rete immediata.
- **Retry**: N/A.
- **Responsive Behavior**: Touch target height minimo `44px` su mobile, font-size >= 16px per prevenire zoom forzato su iOS.
- **Accessibilità (A11y)**: Supporto nativo `aria-invalid` se `error` è true, focus ring ad alto contrasto.
- **Reduced Motion**: N/A.
- **Comportamento Senza Hover**: Focus ring evidente al tocco/focus.
- **Analytics Contract**: N/A (tracciato sul form).
- **Errori**: Bordo rosso semantico ed evidenziazione focus di errore.
- **Esempi (Playground)**: `packages/ui/src/components/input.tsx` (esportato in `@atlas/ui`), visualizzabile su Vite Playground.
- **Test**: `packages/ui/tests/input.test.tsx` (verifica inserimento testo, stato disabled e stato error).

### 6. FormField
- **Scopo**: Wrapper accessibile e framework-neutral per allineare Label, Input, descrizioni ed errori.
- **Anatomia**: Contenitore `<div>` che raggruppa componenti figli (Label, Input, Description, ErrorMessage). Non legato a specifiche librerie di form (framework-neutral).
- **API e Proprietà**: `id` (string), `error` (string), `label` (string), `description` (string), standard HTML div props.
- **Varianti**: Default.
- **Stati**: Normal, Error (se la stringa `error` è valorizzata).
- **Stato Asincrono**: N/A.
- **Rete Assente**: N/A.
- **Retry**: N/A.
- **Responsive Behavior**: Stack verticale del contenuto su mobile, allineamento griglia su desktop.
- **Accessibilità (A11y)**: Associazione automatica di `htmlFor` sulla label all'id dell'input. Associazione di `aria-describedby` dell'input a descrizione e messaggio d'errore.
- **Reduced Motion**: N/A.
- **Comportamento Senza Hover**: N/A.
- **Analytics Contract**: Tracciamento dell'errore di validazione (se inviato).
- **Errori**: Mostra visivamente il messaggio di errore sotto l'input.
- **Esempi (Playground)**: `packages/ui/src/components/form-field.tsx` (esportato in `@atlas/ui`), visualizzabile su Vite Playground.
- **Test**: `packages/ui/tests/form-field.test.tsx` (verifica associazione ARIA ID tra label, input e messaggi di errore).

### 7. Select
- **Scopo**: Selezione di un singolo valore all'interno di una lista chiusa.
- **Anatomia**: Componenti Base UI Select: `<Select.Root>`, `<Select.Trigger>`, `<Select.Value>`, `<Select.Portal>`, `<Select.Positioner>`, `<Select.Popup>`, `<Select.List>`, `<Select.Item>`, `<Select.ItemText>`, `<Select.ItemIndicator>`. Non deve essere imposto alcun focus trap da dialog per questo componente.
- **API e Proprietà**: `value` (string), `onValueChange` (function), `options` (Array of items), `placeholder` (string), `disabled` (boolean).
- **Varianti**: Default.
- **Stati**: Default, open, closed, item-hover (`data-highlighted`), selected (`data-selected`), disabled.
- **Stato Asincrono**: Spinner all'interno del trigger se le opzioni sono in caricamento.
- **Rete Assente**: Disabilitazione della tendina se il caricamento dati remoto fallisce.
- **Retry**: N/A.
- **Responsive Behavior**: Apertura popup allineata al trigger; su schermi molto piccoli si posiziona come bottom sheet o sfrutta popover nativo.
- **Accessibilità (A11y)**: Gestione completa della tastiera tramite Base UI (frecce, Enter, Esc, home/end, typeahead).
- **Reduced Motion**: Nessuna transizione di scala o slide durante l'apertura/chiusura del menu popup.
- **Comportamento Senza Hover**: Selezione item visibile tramite focus e touch-highlight.
- **Analytics Contract**: Tracciamento dell'evento `onChange` con il valore selezionato.
- **Errori**: Bordo di errore sul trigger.
- **Esempi (Playground)**: `packages/ui/src/components/select.tsx` (esportato in `@atlas/ui`), visualizzabile su Vite Playground.
- **Test**: `packages/ui/tests/select.test.tsx` (verifica apertura popup, navigazione a tastiera freccia giù, selezione elemento).

### 8. Card
- **Scopo**: Contenitore isolato per raggruppare informazioni correlate.
- **Anatomia**: `<div>` con stili di bordo, sfondo (`bg.surface`) e arrotondamento. Include Header, Title, Description, Content, e Footer.
- **API e Proprietà**: standard HTML div props.
- **Varianti**: Standard, Outline, Elevated.
- **Stati**: Default, opzionalmente interattivo.
- **Stato Asincrono**: N/A (sostituito da Skeleton per i contenuti interni).
- **Rete Assente**: N/A.
- **Retry**: N/A.
- **Responsive Behavior**: Adatta la larghezza al layout responsivo; reflow interno dei figli.
- **Accessibilità (A11y)**: Tag semantici (es. `section`, `article` o `div`). Contrasto bordo/sfondo conforme.
- **Reduced Motion**: N/A.
- **Comportamento Senza Hover**: N/A.
- **Analytics Contract**: N/A.
- **Errori**: N/A.
- **Esempi (Playground)**: `packages/ui/src/components/card.tsx` (esportato in `@atlas/ui`), visualizzabile su Vite Playground.
- **Test**: `packages/ui/tests/card.test.tsx` (verifica corretto rendering, passaggio classi di stile personalizzate, e struttura semantica DOM).

### 9. Dialog / Modal
- **Scopo**: Finestra di overlay bloccante per operazioni o informazioni critiche.
- **Anatomia**: Base UI Dialog: `<Dialog.Root>`, `<Dialog.Portal>`, `<Dialog.Backdrop>`, `<Dialog.Popup>`, `<Dialog.Title>`, `<Dialog.Description>`, `<Dialog.Close>`.
- **API e Proprietà**: `open` (boolean), `onOpenChange` (function), `title` (string), `description` (string).
- **Varianti**: Standard.
- **Stati**: Open, Closed.
- **Stato Asincrono**: Contenuto interno asincrono gestito tramite Skeleton.
- **Rete Assente**: N/A.
- **Retry**: N/A.
- **Responsive Behavior**: Centrato su desktop, full-screen o bottom-sheet su mobile.
- **Accessibilità (A11y)**: Focus trapping obbligatorio fornito da Base UI. Chiusura sempre garantita tramite tasto `Escape`, click all'esterno (Backdrop) e pulsante di chiusura esplicito. Focus return al trigger che ha aperto il dialog dopo la chiusura.
- **Reduced Motion**: Transizioni di comparsa (fade-in backdrop, scale-in popup) forzate a istantanee (`0ms`).
- **Comportamento Senza Hover**: Bottone di chiusura (X) visibile in modo permanente e touch-target 44x44px.
- **Analytics Contract**: Tracciamento eventi open/close.
- **Errori**: N/A.
- **Esempi (Playground)**: `packages/ui/src/components/dialog.tsx` (esportato in `@atlas/ui`), visualizzabile su Vite Playground.
- **Test**: `packages/ui/tests/dialog.test.tsx` (verifica focus trapping, chiusura con Backdrop click, chiusura con Escape, e ritorno del focus al trigger).

### 10. Tabs
- **Scopo**: Suddivisione di contenuti in viste distinte all'interno della stessa pagina.
- **Anatomia**: Base UI Tabs: `<Tabs.Root>`, `<Tabs.List>`, `<Tabs.Trigger>`, `<Tabs.Panel>`.
- **API e Proprietà**: `defaultValue` (string), `value` (string), `onValueChange` (function).
- **Varianti**: Default.
- **Stati**: Active (`data-selected`), inactive, hover, active, focus-visible.
- **Stato Asincrono**: N/A (i pannelli caricano i dati asincroni se attivati).
- **Rete Assente**: N/A.
- **Retry**: N/A.
- **Responsive Behavior**: Scorrimento orizzontale della lista dei trigger su schermi stretti, con touch target 44px.
- **Accessibilità (A11y)**: Navigazione a tastiera automatica/manuale tramite tasti freccia destra/sinistra fornita da Base UI. Attributi `role="tab"`, `aria-selected` corretti.
- **Reduced Motion**: Disattivazione di eventuali transizioni orizzontali di scorrimento tra i pannelli.
- **Comportamento Senza Hover**: Stato attivo evidenziato visivamente da border-bottom o background solido.
- **Analytics Contract**: Tracciamento selezione del Tab.
- **Errori**: N/A.
- **Esempi (Playground)**: `packages/ui/src/components/tabs.tsx` (esportato in `@atlas/ui`), visualizzabile su Vite Playground.
- **Test**: `packages/ui/tests/tabs.test.tsx` (verifica navigazione tastiera e visualizzazione del pannello corrispondente al trigger attivo).

### 11. Toast
- **Scopo**: Notifiche asincrone e non bloccanti.
- **Anatomia**: Integrazione con `sonner` (`Toaster` component ed `toast()` API).
- **API e Proprietà**: Metodi `toast.success()`, `toast.error()`, `toast.warning()`, `toast.info()`.
- **Varianti**: Success, Error, Warning, Info.
- **Stati**: Entrata, visualizzazione, hovering (pausa del timer), uscita.
- **Stato Asincrono**: Supporto integrato a toast con promise (loading -> success/error).
- **Rete Assente**: Notifica immediata di disconnessione o mancato invio dati.
- **Retry**: Possibilità di includere pulsanti d'azione (es. "Riprova") dentro il corpo del toast.
- **Responsive Behavior**: Pila di notifiche in basso al centro su mobile, nell'angolo in basso/alto a destra su desktop.
- **Accessibilità (A11y)**: Uso di `aria-live="polite"` o `assertive` tramite Sonner. Supporto alla chiusura tramite swipe o tasto X. Non ruba il focus all'utente.
- **Reduced Motion**: Animazioni di entrata/uscita eliminate o istantanee.
- **Comportamento Senza Hover**: Pulsante X di chiusura visibile stabilmente per touch.
- **Analytics Contract**: Tracciamento comparsa notifica ed eventuali click sulle azioni.
- **Errori**: Variante d'errore cromaticamente distinta (rosso semantico).
- **Esempi (Playground)**: `packages/ui/src/components/toast.tsx` (esportato in `@atlas/ui`), visualizzabile su Vite Playground.
- **Test**: `packages/ui/tests/toast.test.tsx` (verifica comparsa, persistenza su hover, e auto-dismiss).
