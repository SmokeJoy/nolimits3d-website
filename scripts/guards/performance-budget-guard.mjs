import { gzipSync } from 'node:zlib';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/*
 * Enforces the initial-payload budgets already approved in
 * `NoLimits3D_Documentation_v0.96/10_Security_Performance/05_Performance_Plan.md`
 * §4 ("Performance budget iniziale", public-page row): JS iniziale <= 180 KB
 * gzip, CSS <= 60 KB gzip. Those numbers are not invented here -- this guard
 * only automates a check against a figure the Documentation Bible already
 * fixed (roadmap survey 2026-08-06, E-0013/F-0009 gap).
 *
 * "Initial" means what `apps/web/dist/index.html` itself references directly
 * (the `<script type="module">` entry and its `<link rel="stylesheet">`),
 * not the lazily `import()`-ed route chunks -- those are excluded from the
 * initial payload by design (see `apps/web/src/app/routes.tsx`'s own
 * `lazy()` rationale), matching the Plan's own "JS iniziale" wording.
 */
export const JS_BUDGET_BYTES = 180 * 1024;
export const CSS_BUDGET_BYTES = 60 * 1024;

/** Extracts the entry-module script(s) and stylesheet(s) index.html loads directly. */
export function parseInitialAssets(html) {
  const scripts = [
    ...html.matchAll(/<script[^>]*type=["']module["'][^>]*src=["']([^"']+)["'][^>]*>/g),
  ].map((match) => match[1]);
  const styles = [
    ...html.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["'][^>]*>/g),
  ].map((match) => match[1]);
  return { scripts, styles };
}

function gzipSize(buffer) {
  return gzipSync(buffer).byteLength;
}

/** Pure budget comparison -- given already-measured gzip byte totals. */
export function checkBudget({ jsBytes, cssBytes }) {
  const violations = [];
  if (jsBytes > JS_BUDGET_BYTES) {
    violations.push(
      `Initial JS is ${(jsBytes / 1024).toFixed(1)} KB gzip, over the ${JS_BUDGET_BYTES / 1024} KB budget (DOC-SEC-005 §4)`,
    );
  }
  if (cssBytes > CSS_BUDGET_BYTES) {
    violations.push(
      `Initial CSS is ${(cssBytes / 1024).toFixed(1)} KB gzip, over the ${CSS_BUDGET_BYTES / 1024} KB budget (DOC-SEC-005 §4)`,
    );
  }
  return { passed: violations.length === 0, violations };
}

/** Reads a built `dist/` (or any dir with the same layout) and checks it against budget. */
export function measureInitialPayload(distDir) {
  const indexPath = resolve(distDir, 'index.html');
  if (!existsSync(indexPath)) {
    throw new Error(`No built index.html at ${indexPath} -- run the build first`);
  }
  const html = readFileSync(indexPath, 'utf8');
  const { scripts, styles } = parseInitialAssets(html);

  const sizeOf = (relativeHref) => {
    const assetPath = resolve(distDir, relativeHref.replace(/^\//, ''));
    return gzipSize(readFileSync(assetPath));
  };

  const jsBytes = scripts.reduce((total, href) => total + sizeOf(href), 0);
  const cssBytes = styles.reduce((total, href) => total + sizeOf(href), 0);

  return { jsBytes, cssBytes, scripts, styles };
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const distDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../apps/web/dist');
  const { jsBytes, cssBytes } = measureInitialPayload(distDir);
  const { passed, violations } = checkBudget({ jsBytes, cssBytes });

  console.log(
    `Initial payload: JS ${(jsBytes / 1024).toFixed(1)} KB gzip (budget ${JS_BUDGET_BYTES / 1024} KB), ` +
      `CSS ${(cssBytes / 1024).toFixed(1)} KB gzip (budget ${CSS_BUDGET_BYTES / 1024} KB)`,
  );

  if (!passed) {
    for (const violation of violations) {
      console.error(violation);
    }
    console.error('Performance budget guard: FAIL');
    process.exit(1);
  }
  console.log('Performance budget guard: PASS');
}
