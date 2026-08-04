import { useState, useEffect } from 'react';

import { PrimitivesShowcase } from './PrimitivesShowcase';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [qualityTier, setQualityTier] = useState<'low' | 'balanced' | 'high'>('high');
  const [simulateReducedMotion, setSimulateReducedMotion] = useState(false);

  // Sync theme to root html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // Also toggle class just in case
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  // Sync quality tier to root html element
  useEffect(() => {
    document.documentElement.setAttribute('data-quality-tier', qualityTier);
  }, [qualityTier]);

  // Sync simulated reduced motion to root html element ([data-motion="reduced"]
  // mirrors the prefers-reduced-motion media block in the token layer)
  useEffect(() => {
    if (simulateReducedMotion) {
      document.documentElement.setAttribute('data-motion', 'reduced');
    } else {
      document.documentElement.removeAttribute('data-motion');
    }
  }, [simulateReducedMotion]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const grays = [
    { name: 'gray-50', hex: '#f9fafb', varName: '--palette-gray-50' },
    { name: 'gray-100', hex: '#f3f4f6', varName: '--palette-gray-100' },
    { name: 'gray-150', hex: '#ebf0f5', varName: '--palette-gray-150' },
    { name: 'gray-200', hex: '#e5e7eb', varName: '--palette-gray-200' },
    { name: 'gray-300', hex: '#d1d5db', varName: '--palette-gray-300' },
    { name: 'gray-400', hex: '#9ca3af', varName: '--palette-gray-400' },
    { name: 'gray-500', hex: '#6b7280', varName: '--palette-gray-500' },
    { name: 'gray-600', hex: '#4b5563', varName: '--palette-gray-600' },
    { name: 'gray-700', hex: '#374151', varName: '--palette-gray-700' },
    { name: 'gray-800', hex: '#1f2937', varName: '--palette-gray-800' },
    { name: 'gray-850', hex: '#18202c', varName: '--palette-gray-850' },
    { name: 'gray-900', hex: '#111827', varName: '--palette-gray-900' },
    { name: 'gray-950', hex: '#030712', varName: '--palette-gray-950' },
  ];

  const semantics = [
    {
      token: 'bg-canvas',
      desc: "Sfondo principale dell'applicazione",
      styleClass: 'bg-bg-canvas border border-border-default',
    },
    {
      token: 'bg-surface',
      desc: 'Sfondo per elementi isolati (card, dialog)',
      styleClass: 'bg-bg-surface border border-border-default',
    },
    {
      token: 'bg-surface-hover',
      desc: 'Sfondo di superficie nello stato hover',
      styleClass: 'bg-bg-surface-hover border border-border-default',
    },
    {
      token: 'bg-surface-active',
      desc: 'Sfondo di superficie nello stato di pressione',
      styleClass: 'bg-bg-surface-active border border-border-default',
    },
    {
      token: 'accent-primary',
      desc: 'Colore di accento brand / primario',
      styleClass:
        'bg-accent-primary text-accent-primary-foreground font-bold flex items-center justify-center',
    },
    {
      token: 'accent-primary-hover',
      desc: 'Colore di accento nello stato hover',
      styleClass:
        'bg-accent-primary-hover text-accent-primary-foreground font-bold flex items-center justify-center',
    },
  ];

  return (
    <div className="min-h-screen bg-bg-canvas text-text-primary p-8 transition-colors duration-(--duration-base) ease-standard">
      <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-center md:justify-between border-b border-border-default pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-4 w-4 rounded-full bg-accent-primary animate-pulse" />
            <h1 className="text-h1 font-bold tracking-tight">Atlas Design System</h1>
          </div>
          <p className="text-text-secondary text-body mt-2">
            Playground Privato & Valutazione Interattiva dei Token (Wave B)
          </p>
        </div>

        {/* Global Controls Panel */}
        <div className="mt-6 md:mt-0 flex flex-wrap gap-4 items-center bg-bg-surface p-4 rounded-md border border-border-default shadow-md">
          <div className="flex flex-col gap-1">
            <span className="text-small text-text-secondary font-semibold">Tema</span>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-md bg-accent-primary text-accent-primary-foreground font-bold hover:bg-accent-primary-hover transition-colors duration-(--duration-fast) cursor-pointer"
            >
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-small text-text-secondary font-semibold">Quality Tier</span>
            <select
              value={qualityTier}
              onChange={(e) => setQualityTier(e.target.value as 'low' | 'balanced' | 'high')}
              className="bg-bg-canvas border border-border-default text-text-primary px-3 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-focus-ring"
            >
              <option value="high">High Tier (Glow & Anim)</option>
              <option value="balanced">Balanced Tier (No Glow)</option>
              <option value="low">Low Tier (Disabilita tutto)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-small text-text-secondary font-semibold">Reduced Motion</span>
            <button
              onClick={() => setSimulateReducedMotion((p) => !p)}
              className={`px-4 py-2 rounded-md font-bold transition-all duration-(--duration-fast) border ${
                simulateReducedMotion
                  ? 'bg-status-error text-palette-white border-status-error'
                  : 'bg-bg-canvas text-text-primary border-border-default hover:border-border-hover'
              }`}
            >
              {simulateReducedMotion ? 'Reduced ON' : 'Reduced OFF'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SECTION 1: Reference Tokens (Palette & Typography) */}
        <div className="flex flex-col gap-6 bg-bg-surface p-6 rounded-lg border border-border-default shadow-md">
          <h2 className="text-h2 font-semibold border-b border-border-default pb-3">
            Reference Tokens
          </h2>

          {/* Core Colors */}
          <div>
            <h3 className="text-h4 font-medium mb-3">Palette Assoluta</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <div className="h-16 rounded-md bg-palette-dark border border-border-default" />
                <span className="text-small font-semibold">palette.dark</span>
                <span className="text-small text-text-secondary">#101820</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-16 rounded-md bg-palette-green" />
                <span className="text-small font-semibold">palette.green</span>
                <span className="text-small text-text-secondary">#25D366</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-16 rounded-md bg-palette-white border border-border-default" />
                <span className="text-small font-semibold">palette.white</span>
                <span className="text-small text-text-secondary">#FFFFFF</span>
              </div>
            </div>
          </div>

          {/* Grays */}
          <div>
            <h3 className="text-h4 font-medium mb-3">Scala dei Grigi (Slate candidate)</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {grays.map((g) => (
                <div key={g.name} className="flex flex-col items-center text-center">
                  <div
                    className="h-10 w-full rounded"
                    style={{ backgroundColor: `var(${g.varName})` }}
                    title={g.hex}
                  />
                  <span className="text-small font-semibold mt-1">{g.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Scale */}
          <div>
            <h3 className="text-h4 font-medium mb-3">Scala Tipografica</h3>
            <div className="flex flex-col gap-2 bg-bg-canvas p-4 rounded-md border border-border-default">
              <p className="text-h1 font-bold">h1 (2.25rem)</p>
              <p className="text-h2 font-semibold">h2 (1.875rem)</p>
              <p className="text-h3 font-semibold">h3 (1.5rem)</p>
              <p className="text-h4 font-medium">h4 (1.25rem)</p>
              <p className="text-h5 font-medium">h5 (1.125rem)</p>
              <p className="text-h6 font-semibold">h6 (1rem)</p>
              <p className="text-body">body (1rem)</p>
              <p className="text-small text-text-secondary">small / muted (0.875rem)</p>
            </div>
          </div>
        </div>

        {/* SECTION 2: Semantic Tokens & Theme Mapping */}
        <div className="flex flex-col gap-6 bg-bg-surface p-6 rounded-lg border border-border-default shadow-md">
          <h2 className="text-h2 font-semibold border-b border-border-default pb-3">
            Semantic Theme Tokens
          </h2>

          <div className="flex flex-col gap-4">
            {semantics.map((s) => (
              <div
                key={s.token}
                className="flex items-center gap-4 bg-bg-canvas p-4 rounded-md border border-border-default"
              >
                <div className={`h-12 w-24 rounded-md shrink-0 ${s.styleClass}`}>
                  {s.token.includes('accent') && 'Text'}
                </div>
                <div>
                  <span className="text-h5 font-bold">{s.token}</span>
                  <p className="text-small text-text-secondary mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Status Indicators */}
          <div>
            <h3 className="text-h4 font-medium mb-3">Colori di Stato</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-bg-canvas border border-border-default rounded-md flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-status-success" />
                <span className="text-small font-semibold">Success (Green)</span>
              </div>
              <div className="p-3 bg-bg-canvas border border-border-default rounded-md flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-status-warning" />
                <span className="text-small font-semibold">Warning (Yellow)</span>
              </div>
              <div className="p-3 bg-bg-canvas border border-border-default rounded-md flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-status-error" />
                <span className="text-small font-semibold">Error (Red)</span>
              </div>
              <div className="p-3 bg-bg-canvas border border-border-default rounded-md flex items-center gap-2">
                <span className="h-3.5 w-3.5 rounded-full bg-status-info" />
                <span className="text-small font-semibold">Info (Blue)</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Visual & Accessibility Verification */}
        <div className="md:col-span-2 flex flex-col gap-6 bg-bg-surface p-6 rounded-lg border border-border-default shadow-md">
          <h2 className="text-h2 font-semibold border-b border-border-default pb-3">
            Verifiche Comportamento Grafico
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Radius demo */}
            <div className="flex flex-col gap-3">
              <h3 className="text-h4 font-medium">Bordi Arrotondati</h3>
              <div className="flex flex-wrap gap-2">
                <div className="h-16 w-16 bg-accent-primary rounded-sm flex items-center justify-center text-accent-primary-foreground font-bold">
                  sm
                </div>
                <div className="h-16 w-16 bg-accent-primary rounded-md flex items-center justify-center text-accent-primary-foreground font-bold">
                  md
                </div>
                <div className="h-16 w-16 bg-accent-primary rounded-lg flex items-center justify-center text-accent-primary-foreground font-bold">
                  lg
                </div>
                <div className="h-16 w-16 bg-accent-primary rounded-full flex items-center justify-center text-accent-primary-foreground font-bold">
                  full
                </div>
              </div>
            </div>

            {/* Elevation shadow demo */}
            <div className="flex flex-col gap-3">
              <h3 className="text-h4 font-medium">Ombre ed Elevazione</h3>
              <div className="flex flex-wrap gap-4">
                <div className="p-4 bg-bg-canvas rounded-md shadow-sm border border-border-default text-small">
                  shadow.sm
                </div>
                <div className="p-4 bg-bg-canvas rounded-md shadow-md border border-border-default text-small">
                  shadow.md
                </div>
                <div className="p-4 bg-bg-canvas rounded-md shadow-lg border border-border-default text-small">
                  shadow.lg
                </div>
              </div>
            </div>

            {/* Glow / Transition demo */}
            <div className="flex flex-col gap-3">
              <h3 className="text-h4 font-medium">Effetti & Transizioni</h3>
              <div className="flex flex-col gap-3">
                {/* Glow test */}
                <div className="p-4 rounded-md bg-bg-canvas border border-border-default shadow-effect-glow-primary text-center font-bold text-accent-primary">
                  Glow Primario Attivo
                </div>
                {/* Micro animation test */}
                <button className="w-full py-3 bg-accent-primary text-accent-primary-foreground font-bold rounded-md cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-(--duration-base) ease-standard">
                  Hover / Active Transition
                </button>
              </div>
            </div>
          </div>
        </div>
        <PrimitivesShowcase />
      </main>
    </div>
  );
}

export default App;
