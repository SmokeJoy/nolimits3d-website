import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
  StatusIndicator,
} from '@atlas/ui';
import { useState } from 'react';

/* Icona dimostrativa inline: lucide-react non è una dipendenza del playground. */
function DemoIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M5 8l2 2 4-4" />
    </svg>
  );
}

/**
 * Wave C1 — vetrina interattiva delle 5 primitive core.
 * Solo contenuti dimostrativi neutri: nessuna funzionalità business.
 */
export function PrimitivesShowcase() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const simulateSubmit = () => {
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section className="md:col-span-2 flex flex-col gap-6 bg-bg-surface p-6 rounded-lg border border-border-default shadow-md">
      <h2 className="text-h2 font-semibold border-b border-border-default pb-3">
        Core Primitives (Wave C1)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Button */}
        <div className="flex flex-col gap-4">
          <h3 className="text-h4 font-medium">Button — varianti</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button trackId="demo-primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <h3 className="text-h4 font-medium">Button — taglie, icona e stato asincrono</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button icon={<DemoIcon />}>Con icona</Button>
            {/* label costante: dimostra la preservazione della larghezza in loading */}
            <Button isLoading={isSubmitting} onClick={simulateSubmit}>
              Simula submit (2s)
            </Button>
          </div>
        </div>

        {/* Badge + StatusIndicator */}
        <div className="flex flex-col gap-4">
          <h3 className="text-h4 font-medium">Badge</h3>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <h3 className="text-h4 font-medium">StatusIndicator</h3>
          <div className="flex flex-col gap-2">
            <StatusIndicator status="success" label="Sistema operativo" />
            <StatusIndicator status="warning" label="Coda in rallentamento" />
            <StatusIndicator status="error" label="Connessione assente" />
            <StatusIndicator status="info" label="Aggiornamento disponibile" />
          </div>
        </div>

        {/* Skeleton */}
        <div className="flex flex-col gap-4">
          <h3 className="text-h4 font-medium">Skeleton</h3>
          <div className="flex items-center gap-4">
            <Skeleton variant="circular" className="size-12" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton variant="text" className="w-3/4" />
              <Skeleton variant="text" className="w-1/2" />
            </div>
          </div>
          <Skeleton variant="rectangular" className="h-24 w-full" />
        </div>

        {/* Card */}
        <div className="flex flex-col gap-4">
          <h3 className="text-h4 font-medium">Card — varianti</h3>
          <div className="flex flex-col gap-3">
            {(['standard', 'outline', 'elevated'] as const).map((variant) => (
              <Card key={variant} variant={variant}>
                <CardHeader>
                  <CardTitle>Card {variant}</CardTitle>
                  <CardDescription>Contenitore di superficie componibile.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body">Contenuto dimostrativo neutro.</p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm" variant="secondary">
                    Azione
                  </Button>
                  <Badge variant="outline">v0</Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
