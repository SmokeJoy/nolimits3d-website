import { describe, expect, it } from 'vitest';

/*
 * Il tsconfig del package limita i types ambient a `vite/client` (niente
 * @types/node) e i file di configurazione sono fuori dal perimetro Wave B.
 * `node:fs` è disponibile a runtime in vitest: lo importiamo con uno
 * specifier dinamico (non risolto da TS) e lo tipizziamo esplicitamente.
 * Nota: l'import `?raw` non è utilizzabile perché il plugin Tailwind
 * intercetta i .css e restituisce una stringa vuota.
 */
interface FsModule {
  readFileSync: (path: string, encoding: 'utf-8') => string;
}
const fsSpecifier = 'node:fs';
const { readFileSync } = (await import(/* @vite-ignore */ fsSpecifier)) as unknown as FsModule;

function readTokenSource(): string {
  /* cwd = packages/ui con `pnpm --filter @atlas/ui test`; fallback per run dalla root */
  for (const candidate of ['styles/global.css', 'packages/ui/styles/global.css']) {
    try {
      return readFileSync(candidate, 'utf-8');
    } catch {
      /* prova il prossimo percorso */
    }
  }
  throw new Error('packages/ui/styles/global.css non trovato');
}

/**
 * Wave B token validation (TSK-M002-CLAUDE-B / PA-AR-M002-013).
 *
 * Deterministic source-of-truth audit of `packages/ui/styles/global.css`:
 * theme switching, reduced-motion hard-stop and WCAG 2.2 AA contrast are
 * verified against the parsed token definitions, independently from jsdom's
 * partial CSS support.
 */
const css: string = readTokenSource();

/** Extracts the `{ … }` body that follows the first occurrence of `selector`. */
function extractBlock(source: string, selector: string): string {
  const start = source.indexOf(selector);
  expect(start, `selector not found: ${selector}`).toBeGreaterThanOrEqual(0);
  const open = source.indexOf('{', start);
  let depth = 0;
  for (let i = open; i < source.length; i += 1) {
    if (source[i] === '{') depth += 1;
    if (source[i] === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(open + 1, i);
    }
  }
  throw new Error(`unbalanced block for ${selector}`);
}

function parseVars(block: string): Map<string, string> {
  const vars = new Map<string, string>();
  for (const match of block.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    const name = match[1];
    const value = match[2];
    if (name !== undefined && value !== undefined) {
      vars.set(`--${name}`, value.trim());
    }
  }
  return vars;
}

const rootVars = parseVars(extractBlock(css, ':root'));
const lightVars = parseVars(extractBlock(css, "[data-theme='light']"));

/** Resolves a token through its var() chain, with optional theme overrides. */
function resolve(name: string, overrides?: Map<string, string>): string {
  let value = overrides?.get(name) ?? rootVars.get(name);
  expect(value, `token not defined: ${name}`).toBeDefined();
  let guard = 0;
  while (value !== undefined && value.startsWith('var(')) {
    const inner = /var\((--[\w-]+)\)/.exec(value)?.[1];
    expect(inner, `unresolvable var chain at ${name}: ${value}`).toBeDefined();
    value = overrides?.get(inner as string) ?? rootVars.get(inner as string);
    expect(value, `token not defined in chain: ${String(inner)}`).toBeDefined();
    guard += 1;
    expect(guard, `var() chain too deep for ${name}`).toBeLessThan(10);
  }
  return (value as string).toLowerCase();
}

const dark = (name: string) => resolve(name);
const light = (name: string) => resolve(name, lightVars);

/* ------------------------- WCAG 2.2 contrast math ------------------------ */

function channelToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const match = /^#([0-9a-f]{6})$/.exec(hex);
  expect(match, `not a 6-digit hex color: ${hex}`).not.toBeNull();
  const value = (match as RegExpExecArray)[1] as string;
  const r = channelToLinear(parseInt(value.slice(0, 2), 16));
  const g = channelToLinear(parseInt(value.slice(2, 4), 16));
  const b = channelToLinear(parseInt(value.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground: string, background: string): number {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

/* -------------------------------- Themes --------------------------------- */

describe('Theme switching (dark default vs light override)', () => {
  it('switches the governed semantic tokens between themes', () => {
    expect(dark('--bg-canvas')).toBe('#101820');
    expect(light('--bg-canvas')).toBe('#ffffff');

    expect(dark('--text-primary')).toBe('#ffffff');
    expect(light('--text-primary')).toBe('#101820');

    expect(dark('--bg-surface')).toBe('#111827');
    expect(light('--bg-surface')).toBe('#f9fafb');
  });

  it('keeps accent.primary.foreground on palette.dark in BOTH themes (AA on green)', () => {
    expect(dark('--accent-primary-foreground')).toBe('#101820');
    expect(light('--accent-primary-foreground')).toBe('#101820');
  });

  it('maps accent hover to the governed per-theme reference tokens', () => {
    expect(dark('--accent-primary-hover')).toBe('#1ebd59');
    expect(light('--accent-primary-hover')).toBe('#1ba851');
  });

  it('exposes the light override under both .light and [data-theme=light]', () => {
    expect(css).toMatch(/\.light,\s*\n?\s*\[data-theme='light'\]/);
  });
});

/* ------------------------- Reference governance --------------------------- */

describe('Reference-token governance (no raw hex in the semantic layer)', () => {
  it.each([
    ['--accent-primary-hover'],
    ['--status-success'],
    ['--status-warning'],
    ['--status-error'],
    ['--status-info'],
  ])('%s is mapped through var(), not hardcoded', (token) => {
    expect(rootVars.get(token)).toMatch(/^var\(--palette-/);
  });

  it('light-mode accent hover is also reference-mapped', () => {
    expect(lightVars.get('--accent-primary-hover')).toBe('var(--palette-green-hover-light)');
  });

  it('defines the governed status/hover reference palette', () => {
    expect(rootVars.get('--palette-red-600')).toBe('#dc2626');
    expect(rootVars.get('--palette-yellow-500')).toBe('#eab308');
    expect(rootVars.get('--palette-blue-600')).toBe('#2563eb');
    expect(rootVars.get('--palette-green-hover-dark')).toBe('#1ebd59');
    expect(rootVars.get('--palette-green-hover-light')).toBe('#1ba851');
  });
});

/* ----------------------------- Reduced motion ----------------------------- */

describe('Reduced motion: real 0s hard-stop', () => {
  const mediaBlock = extractBlock(css, '@media (prefers-reduced-motion: reduce)');
  const dataBlock = extractBlock(css, "[data-motion='reduced']");

  it.each([
    ['media query', mediaBlock],
    ['[data-motion=reduced] simulator', dataBlock],
  ])('the %s block stops animations and transitions completely', (_label, block) => {
    expect(block).toContain('animation-duration: 0s !important');
    expect(block).toContain('animation-delay: 0s !important');
    expect(block).toContain('animation-name: none !important');
    expect(block).toContain('transition-duration: 0s !important');
    expect(block).toContain('transition-delay: 0s !important');
  });
});

/* ------------------------------- Contrast --------------------------------- */

describe('WCAG 2.2 AA contrast audit (>= 4.5:1) on governed pairs', () => {
  const AA = 4.5;

  it.each([
    ['text.primary / bg.canvas', '--text-primary', '--bg-canvas'],
    ['text.secondary / bg.canvas', '--text-secondary', '--bg-canvas'],
    ['text.primary / bg.surface', '--text-primary', '--bg-surface'],
    [
      'accent.primary.foreground / accent.primary',
      '--accent-primary-foreground',
      '--accent-primary',
    ],
    [
      'accent.primary.foreground / accent.primary.hover',
      '--accent-primary-foreground',
      '--accent-primary-hover',
    ],
  ])('DARK %s', (_label, fg, bg) => {
    const ratio = contrastRatio(dark(fg), dark(bg));
    expect(ratio).toBeGreaterThanOrEqual(AA);
  });

  it.each([
    ['text.primary / bg.canvas', '--text-primary', '--bg-canvas'],
    ['text.secondary / bg.canvas', '--text-secondary', '--bg-canvas'],
    ['text.primary / bg.surface', '--text-primary', '--bg-surface'],
    [
      'accent.primary.foreground / accent.primary',
      '--accent-primary-foreground',
      '--accent-primary',
    ],
    [
      'accent.primary.foreground / accent.primary.hover',
      '--accent-primary-foreground',
      '--accent-primary-hover',
    ],
  ])('LIGHT %s', (_label, fg, bg) => {
    const ratio = contrastRatio(light(fg), light(bg));
    expect(ratio).toBeGreaterThanOrEqual(AA);
  });

  it.each([
    ['white on status.error', '--palette-white', '--status-error'],
    ['dark on status.warning', '--palette-dark', '--status-warning'],
    ['white on status.info', '--palette-white', '--status-info'],
    ['dark on status.success', '--palette-dark', '--status-success'],
  ])('STATUS %s', (_label, fg, bg) => {
    const ratio = contrastRatio(dark(fg), dark(bg));
    expect(ratio).toBeGreaterThanOrEqual(AA);
  });
});
