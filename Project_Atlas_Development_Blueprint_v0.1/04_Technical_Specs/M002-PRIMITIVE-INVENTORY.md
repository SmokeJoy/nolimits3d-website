# Primitive Inventory: Design System M-002

## Status
* **Status**: PROPOSED
* **Gate**: Requires Architect Approval
* **Roadmap Governance**: `S-0014`, `T-0027`, `T-0028`, `ST-0014` (L'intero pacchetto fa riferimento a questi ID. Gli altri ID sono per la token foundation e non vanno mappati singolarmente).

## Contratto Componenti
Ogni primitiva deve rigorosamente rispettare il seguente schema formale. Nessuna primitiva può essere implementata ignorando una di queste voci.

### 1. Button
- **Scopo**: Azione principale o secondaria (form submit, navigazione, operazione).
- **Anatomia**: `<button>` o `<a>` semantico (se Link), contenuto testuale, icone opzionali (left/right).
- **API e Proprietà**: `variant`, `size`, `asChild` (Radix Slot), `isLoading`, standard React Node props.
- **Varianti**: Primary, Secondary, Destructive, Outline, Ghost, Link.
- **Stati**: Immediato (default), focus-visible, hover, active, disabled.
- **Stato Asincrono**: `isLoading` (spinner o transizione opacità, disabilitazione click).
- **Rete Assente**: Disabilitato visualmente se il componente lo richiede, o fallback alert su azione.
- **Retry**: Modalità visiva di retry post-errore.
- **Responsive Behavior**: Stack verticale su schermi stretti (se raggruppati), touch-target minimo 44x44px su mobile.
- **Accessibilità (A11y)**: WCAG 2.2 AA per il contrasto. Gestione corretta dell'`aria-disabled`. Tasto Invio/Spazio funzionante.
- **Reduced Motion**: Disattivazione dell'animazione hover/active e dello spinner rotante se `prefers-reduced-motion: reduce`.
- **Comportamento Senza Hover**: Stati attivi visibili anche senza `:hover` su schermi touch.
- **Analytics Contract**: Evento on-click tracciato (se richiesto dal contesto), esportazione `data-track-id`.
- **Errori**: Visualizzazione stato d'errore (se form-bound).
- **Esempi**: Component catalog entry isolata.
- **Test**: Unit test per click e disabilitazione, A11y test (axe).

### 2. Badge
- **Scopo**: Indicatore visivo di stato, metadato o tag non interattivo.
- **Anatomia**: `<div>` o `<span>`. Nessun focus.
- **API e Proprietà**: `variant`.
- **Varianti**: Default, Secondary, Destructive, Outline.
- **Stati**: Nessuno (read-only).
- **Stato Asincrono**: N/A.
- **Rete Assente**: N/A.
- **Retry**: N/A.
- **Responsive Behavior**: Wrap del testo in overflow.
- **Accessibilità (A11y)**: Testo leggibile WCAG AA.
- **Reduced Motion**: N/A (nessuna animazione).
- **Comportamento Senza Hover**: N/A (non interattivo).
- **Analytics Contract**: N/A.
- **Errori**: N/A.
- **Esempi**: Presentazione varianti cromatiche nel catalog.
- **Test**: Rendering snapshot.

### 3. Skeleton
- **Scopo**: Placeholder visuale durante il caricamento asincrono dei dati.
- **Anatomia**: `<div>` decorativo (`aria-hidden="true"`).
- **API e Proprietà**: className (per w/h/border-radius).
- **Varianti**: N/A (pilotato da className).
- **Stati**: Immediato.
- **Stato Asincrono**: Rappresenta esso stesso lo stato asincrono.
- **Rete Assente**: Se la rete cade definitivamente, deve essere sostituito da uno stato di errore (StatusIndicator/Toast).
- **Retry**: N/A.
- **Responsive Behavior**: Segue le dimensioni del container.
- **Accessibilità (A11y)**: `aria-hidden="true"`, non annunciato dagli screen reader se non associato a `aria-busy`.
- **Reduced Motion**: L'animazione a "pulsazione" (`animate-pulse`) deve essere disabilitata (opacità statica) se `prefers-reduced-motion: reduce`.
- **Comportamento Senza Hover**: N/A.
- **Analytics Contract**: N/A.
- **Errori**: N/A.
- **Esempi**: Component catalog entry.
- **Test**: Rendering base.

### 4. StatusIndicator
- **Scopo**: Feedback di sistema in tempo reale (online, offline, error).
- **Anatomia**: Dot circolare + Testo descrittivo.
- **API e Proprietà**: `status` ('success', 'error', 'warning', 'info').
- **Varianti**: Colori semantici.
- **Stati**: Immediato.
- **Stato Asincrono**: N/A.
- **Rete Assente**: Transizione a 'offline'/'error'.
- **Retry**: N/A.
- **Responsive Behavior**: N/A (Inline).
- **Accessibilità (A11y)**: Contrasto AA, non può basarsi unicamente sul colore.
- **Reduced Motion**: Nessun effetto ping o pulse.
- **Comportamento Senza Hover**: N/A.
- **Analytics Contract**: N/A.
- **Errori**: Visualizza lo stato di errore.
- **Esempi**: Tutte e 4 le combinazioni di stato.
- **Test**: Contrasto colori.

### 5. Input
- **Scopo**: Acquisizione input testuale singolo.
- **Anatomia**: `<input>` nativo html.
- **API e Proprietà**: `type`, standard input props.
- **Varianti**: Default, File.
- **Stati**: Immediato, focus-visible, disabled, readonly.
- **Stato Asincrono**: Sospeso (readonly/disabled) durante invio.
- **Rete Assente**: Possibile blocco o alert.
- **Retry**: N/A.
- **Responsive Behavior**: Touch target height minimo 44px su mobile, full-width.
- **Accessibilità (A11y)**: Gestione `aria-invalid`, focus ring persistente, supporto label.
- **Reduced Motion**: N/A.
- **Comportamento Senza Hover**: Evidenziazione focus persistente.
- **Analytics Contract**: N/A (gestito a livello Form).
- **Errori**: Bordo semantico rosso, testo descrittivo.
- **Esempi**: Con e senza errori, disabled.
- **Test**: Gestione input test.

### 6. FormField (Composto)
- **Scopo**: Wrapper accessibile per i campi form.
- **Anatomia**: `Item` > `Label` + `Control` + `Description` + `Message`.
- **API e Proprietà**: Integrazione con librerie form (es. React Hook Form).
- **Varianti**: N/A.
- **Stati**: Validation states (valid, invalid).
- **Stato Asincrono**: Validazione asincrona in corso.
- **Rete Assente**: Impossibilità di validazione remota.
- **Retry**: N/A.
- **Responsive Behavior**: Reflow se affiancato ad altri campi.
- **Accessibilità (A11y)**: `aria-describedby` legato all'id del messaggio d'errore.
- **Reduced Motion**: N/A.
- **Comportamento Senza Hover**: N/A.
- **Analytics Contract**: Tracking validazione fallita.
- **Errori**: Propagazione dell'errore visivo ai children.
- **Esempi**: Esempio form completo isolato.
- **Test**: Propagazione corretta degli ARIA ids.

### 7. Select
- **Scopo**: Selezione singola tra un set limitato di opzioni.
- **Anatomia**: Trigger, Content (Portal), Item, Value.
- **API e Proprietà**: Radix Select API (`onValueChange`, ecc).
- **Varianti**: Default.
- **Stati**: Aperto, Chiuso, Hover su opzione, Disabled.
- **Stato Asincrono**: Caricamento delle opzioni (loading indicator interno).
- **Rete Assente**: Lista opzioni disabilitata se data-fetching assente.
- **Retry**: Bottone ricarica (opzionale) nel caso le opzioni falliscano.
- **Responsive Behavior**: Popover nativo o custom ben dimensionato su mobile, z-index protetto.
- **Accessibilità (A11y)**: Navigazione tastiera (frecce, Enter, Esc, Typeahead), Screen reader announcer.
- **Reduced Motion**: Nessuna animazione di comparsa del menu, opacità istantanea.
- **Comportamento Senza Hover**: Item attivi selezionabili via touch/focus.
- **Analytics Contract**: Change event tracking.
- **Errori**: Menu rosso se validazione fallisce.
- **Esempi**: Lista lunga, lista corta, disabled.
- **Test**: Tastiera su down/up arrow.

### 8. Card
- **Scopo**: Contenitore layout generico.
- **Anatomia**: Header, Title, Description, Content, Footer.
- **API e Proprietà**: N/A.
- **Varianti**: Standard, Outline, Elevated.
- **Stati**: N/A.
- **Stato Asincrono**: Skeleton card placeholder.
- **Rete Assente**: N/A.
- **Retry**: N/A.
- **Responsive Behavior**: Reflow o stack a cascata.
- **Accessibilità (A11y)**: Ruoli semantici corretti (es. `section` o `article` a seconda dell'uso).
- **Reduced Motion**: N/A.
- **Comportamento Senza Hover**: N/A.
- **Analytics Contract**: N/A.
- **Errori**: N/A.
- **Esempi**: Esempi di aggregazione.
- **Test**: N/A.

### 9. Dialog/Modal
- **Scopo**: Interruzione bloccante dell'utente.
- **Anatomia**: Overlay, Content, Header, Title, Description, Footer, CloseButton.
- **API e Proprietà**: `open`, `onOpenChange` (Radix Dialog API).
- **Varianti**: Modale default.
- **Stati**: Open, Closed.
- **Stato Asincrono**: Dati caricati in modo asincrono dentro il Content.
- **Rete Assente**: Chiusura disabilitata o alert se azione bloccante obbligatoria.
- **Retry**: N/A.
- **Responsive Behavior**: Full-screen o bottom-sheet su mobile.
- **Accessibilità (A11y)**: Focus trapping, chiusura con Esc, focus return al trigger dopo chiusura.
- **Reduced Motion**: Animazione scale/fade ridotta a istantanea.
- **Comportamento Senza Hover**: Tasto X visibile fisicamente.
- **Analytics Contract**: Apertura/chiusura evento.
- **Errori**: N/A.
- **Esempi**: Demo modale scrollabile vs non scrollabile.
- **Test**: Focus trapping.

### 10. Tabs
- **Scopo**: Separazione del contesto senza cambiare pagina.
- **Anatomia**: Root, List, Trigger, Content.
- **API e Proprietà**: Radix Tabs API.
- **Varianti**: Default.
- **Stati**: Selected, Unselected, Disabled.
- **Stato Asincrono**: Dati caricati all'attivazione del tab.
- **Rete Assente**: N/A.
- **Retry**: N/A.
- **Responsive Behavior**: Scorrimento orizzontale se i tab eccedono lo schermo. Touch target largo 44px.
- **Accessibilità (A11y)**: Tasti freccia per selezionare (manual o auto-activation). `role="tablist"`, `aria-selected`.
- **Reduced Motion**: Nessuno slide animato tra i tab.
- **Comportamento Senza Hover**: Selected visibile in modo esplicito (underline o background).
- **Analytics Contract**: Tab click event.
- **Errori**: Tab con indicatore di errore se un child ha problemi.
- **Esempi**: 3 Tab con dati simulati.
- **Test**: Tasti freccia Dx/Sx.

### 11. Toast
- **Scopo**: Feedback non bloccante in overlay.
- **Anatomia**: Provider, Viewport, Toast (Title, Description, Action, Close).
- **API e Proprietà**: Radix Toast API (hook `useToast`).
- **Varianti**: Default, Destructive, Success.
- **Stati**: Entrata, Uscita, Hover persist, Chiuso.
- **Stato Asincrono**: Toast che indica un caricamento (promise resolution).
- **Rete Assente**: Messaggio offline.
- **Retry**: Bottone `Action` "Riprova" configurabile.
- **Responsive Behavior**: Bottom/Top center stacking su mobile, in angolo su desktop.
- **Accessibilità (A11y)**: `aria-live="polite"` o `assertive`. Focus non rubato.
- **Reduced Motion**: Nessuna transizione slide-in/out elastica.
- **Comportamento Senza Hover**: Swipe to dismiss o close button visibile sempre (niente opacity-0 on blur).
- **Analytics Contract**: TBD.
- **Errori**: Toast rosso di errore.
- **Esempi**: Esempio interattivo di comparsa.
- **Test**: Auto-dismiss timing.
