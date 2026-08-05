import {
  Dialog,
  DialogContent,
  DialogTrigger,
  FormField,
  Input,
  Select,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Toaster,
  toast,
  type SelectOption,
} from '@atlas/ui';
import { useState } from 'react';

const printTechnologies: SelectOption[] = [
  { value: 'fdm', label: 'FDM — Fused Deposition Modeling' },
  { value: 'sla', label: 'SLA — Stereolithography' },
  { value: 'sls', label: 'SLS — Selective Laser Sintering', disabled: true },
];

/**
 * Wave C2 — vetrina interattiva delle 6 primitive form/complex.
 * Solo contenuti dimostrativi neutri: nessuna funzionalità business.
 */
export function FormsShowcase() {
  const [email, setEmail] = useState('');
  const [tech, setTech] = useState<string | null>(null);

  const emailError =
    email.length > 0 && !email.includes('@') ? 'Inserisci un indirizzo email valido.' : '';

  return (
    <section className="md:col-span-2 flex flex-col gap-6 bg-bg-surface p-6 rounded-lg border border-border-default shadow-md">
      <h2 className="text-h2 font-semibold border-b border-border-default pb-3">
        Forms & Complex Components (Wave C2)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input */}
        <div className="flex flex-col gap-4">
          <h3 className="text-h4 font-medium">Input — stati</h3>
          <div className="flex flex-col gap-3">
            <Input aria-label="Default" placeholder="Testo semplice" />
            <Input aria-label="Errore" placeholder="Errore" error />
            <Input aria-label="Disabilitato" placeholder="Disabilitato" disabled />
          </div>
        </div>

        {/* FormField + Input */}
        <div className="flex flex-col gap-4">
          <h3 className="text-h4 font-medium">FormField — Input associato</h3>
          <FormField
            id="playground-email"
            label="Email"
            description="Usata solo per questa demo, nessun invio reale."
            error={emailError}
          >
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nome@esempio.it"
            />
          </FormField>
        </div>

        {/* Select */}
        <div className="flex flex-col gap-4">
          <h3 className="text-h4 font-medium">Select</h3>
          <Select
            aria-label="Tecnologia di stampa"
            options={printTechnologies}
            value={tech}
            onValueChange={setTech}
            placeholder="Scegli una tecnologia..."
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-col gap-4">
          <h3 className="text-h4 font-medium">Tabs</h3>
          <Tabs defaultValue="specifiche">
            <TabsList>
              <TabsTab value="specifiche">Specifiche</TabsTab>
              <TabsTab value="materiali">Materiali</TabsTab>
              <TabsTab value="note" disabled>
                Note (disabilitato)
              </TabsTab>
            </TabsList>
            <TabsPanel value="specifiche" className="pt-3">
              Contenuto dimostrativo: specifiche tecniche neutre.
            </TabsPanel>
            <TabsPanel value="materiali" className="pt-3">
              Contenuto dimostrativo: elenco materiali neutro.
            </TabsPanel>
            <TabsPanel value="note" className="pt-3">
              Non raggiungibile: tab disabilitato.
            </TabsPanel>
          </Tabs>
        </div>

        {/* Dialog */}
        <div className="flex flex-col gap-4">
          <h3 className="text-h4 font-medium">Dialog</h3>
          <Dialog>
            <DialogTrigger className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent-primary px-4 text-body font-semibold text-accent-primary-foreground cursor-pointer hover:bg-accent-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring">
              Apri dialog demo
            </DialogTrigger>
            <DialogContent
              title="Conferma azione demo"
              description="Contenuto dimostrativo neutro: Escape, click sul backdrop e il pulsante X chiudono tutti il dialog."
              closeLabel="Chiudi dialog"
            >
              <p className="text-body text-text-secondary">
                Il focus resta intrappolato qui dentro finché il dialog è aperto, e torna al
                pulsante che lo ha aperto alla chiusura.
              </p>
            </DialogContent>
          </Dialog>
        </div>

        {/* Toast */}
        <div className="flex flex-col gap-4">
          <h3 className="text-h4 font-medium">Toast</h3>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => toast.success('Operazione completata con successo.')}
              className="px-3 py-2 rounded-md bg-status-success text-palette-dark font-semibold cursor-pointer"
            >
              Success
            </button>
            <button
              type="button"
              onClick={() => toast.error('Si è verificato un errore imprevisto.')}
              className="px-3 py-2 rounded-md bg-status-error text-palette-white font-semibold cursor-pointer"
            >
              Error
            </button>
            <button
              type="button"
              onClick={() => toast.warning('Attenzione: verifica i dati inseriti.')}
              className="px-3 py-2 rounded-md bg-status-warning text-palette-dark font-semibold cursor-pointer"
            >
              Warning
            </button>
            <button
              type="button"
              onClick={() => toast.info('Aggiornamento disponibile.')}
              className="px-3 py-2 rounded-md bg-status-info text-palette-white font-semibold cursor-pointer"
            >
              Info
            </button>
            <button
              type="button"
              onClick={() =>
                toast.error('Invio fallito.', {
                  action: { label: 'Riprova', onClick: () => toast.success('Riprovato.') },
                })
              }
              className="px-3 py-2 rounded-md border border-border-default text-text-primary font-semibold cursor-pointer"
            >
              Con azione "Riprova"
            </button>
          </div>
          <Toaster closeButtonAriaLabel="Chiudi notifica" position="bottom-right" />
        </div>
      </div>
    </section>
  );
}
