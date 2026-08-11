import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  applyWaivers,
  buildListCommand,
  collectRegistryVersions,
  summarizeAdvisories,
  validateWaiver,
} from './dependency-audit.mjs';
import {
  checkBudget,
  CSS_BUDGET_BYTES,
  JS_BUDGET_BYTES,
  measureInitialPayload,
  parseInitialAssets,
} from './performance-budget-guard.mjs';
import { checkManifest, loadManifest, READY_STATUS } from './production-readiness-guard.mjs';
import { isTechnicalPath, scanText } from './secret-scan.mjs';
import { scanScope } from './scope-guard.mjs';
import { validateBindings } from './source-binding-guard.mjs';

function fixture() {
  return mkdtempSync(join(tmpdir(), 'atlas-guard-'));
}

function resolveRealManifestPath() {
  return resolve(
    dirname(fileURLToPath(import.meta.url)),
    '../../Project_Atlas_Team_Workspace/04_Planning/CLIENT_DATA_MANIFEST.json',
  );
}

test('scope guard accepts an empty web scaffold', () => {
  const root = fixture();
  try {
    mkdirSync(join(root, 'apps', 'web'), { recursive: true });
    assert.deepEqual(scanScope(root), []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('scope guard rejects public command exposure, Jarvis and operational PrintFlow', () => {
  const root = fixture();
  try {
    const publicRoute = join(root, 'apps', 'web', 'src', 'routes', 'public');
    mkdirSync(publicRoute, { recursive: true });
    writeFileSync(join(publicRoute, 'index.ts'), "export const links = ['/command'];\n");
    writeFileSync(join(publicRoute, 'jarvis.ts'), 'export const jarvis = true;\n');
    writeFileSync(join(publicRoute, 'printflow.ts'), 'export const printflowEnabled = true;\n');
    assert.equal(scanScope(root).length, 3);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('scope guard allows PrintFlow only as Coming Soon', () => {
  const root = fixture();
  try {
    const publicRoute = join(root, 'apps', 'web', 'src', 'routes', 'public');
    mkdirSync(publicRoute, { recursive: true });
    writeFileSync(
      join(publicRoute, 'printflow.ts'),
      "export const status = 'PrintFlow Coming Soon';\n",
    );
    assert.deepEqual(scanScope(root), []);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('secret scan rejects real-looking credentials and allows placeholders', () => {
  const accessKey = 'AKIA' + 'A'.repeat(16);
  assert.equal(scanText('fixture.env', `AWS_ACCESS_KEY_ID=${accessKey}`).length, 1);
  assert.deepEqual(
    scanText('.env.example', 'SUPABASE_SECRET_KEY=server-only-local-secret-placeholder'),
    [],
  );
});

test('secret scan includes Codex-native governance surfaces', () => {
  for (const path of [
    'AGENTS.md',
    '.codex/config.toml',
    '.codex/agents/atlas-backend.toml',
    '.agents/skills/atlas-backend-delivery/SKILL.md',
    'scripts/governance/codex_native_team_test.py',
  ]) {
    assert.equal(isTechnicalPath(path), true, `${path} is outside the secret scan`);
  }
});

test('dependency audit collector includes registry packages only', () => {
  const payload = collectRegistryVersions([
    {
      devDependencies: {
        public: {
          version: '1.2.3',
          resolved: 'https://registry.npmjs.org/public/-/public-1.2.3.tgz',
        },
        private: { version: '0.0.0', path: '/workspace/packages/private' },
      },
    },
  ]);
  assert.deepEqual(payload, { public: ['1.2.3'] });
});

test('dependency audit summary normalizes severity', () => {
  const summary = summarizeAdvisories({
    example: [{ severity: 'medium', title: 'Example', url: 'https://example.invalid' }],
  });
  assert.equal(summary.counts.moderate, 1);
});

const advisory = {
  name: 'demo',
  severity: 'high',
  title: 'Demo',
  url: 'https://github.com/advisories/GHSA-aaaa-bbbb-cccc',
};
const waiver = {
  advisory: 'GHSA-aaaa-bbbb-cccc',
  package: 'demo',
  reason: 'not reachable',
  owner: 'architect',
  expires: '2026-11-04',
};
const fullWaiver = {
  ...waiver,
  severity: 'high',
  opened: '2026-08-04',
};
const now = new Date('2026-08-04T00:00:00Z');

test('dependency audit blocks an advisory with no waiver', () => {
  const gate = applyWaivers([advisory], [], now);
  assert.equal(gate.counts.high, 1);
  assert.equal(gate.blocking.length, 1);
  assert.equal(gate.waived.length, 0);
});

test('dependency audit tolerates an advisory under an unexpired waiver', () => {
  const gate = applyWaivers([advisory], [waiver], now);
  assert.equal(gate.counts.high, 0);
  assert.equal(gate.blocking.length, 0);
  assert.equal(gate.waived.length, 1);
});

test('dependency audit blocks once a waiver has expired', () => {
  const gate = applyWaivers([advisory], [{ ...waiver, expires: '2026-01-01' }], now);
  assert.equal(gate.counts.high, 1);
  assert.equal(gate.expired.length, 1);
});

test('dependency audit does not let a waiver cover a different package', () => {
  const gate = applyWaivers([advisory], [{ ...waiver, package: 'other' }], now);
  assert.equal(gate.counts.high, 1);
  assert.equal(gate.blocking.length, 1);
});

test('dependency audit reports a waiver that matches nothing as stale', () => {
  const gate = applyWaivers([], [waiver], now);
  assert.equal(gate.stale.length, 1);
});

test('dependency audit always lists the whole workspace', () => {
  // Dropping --recursive shrinks the audit from 517 packages to 106 with no
  // other visible symptom. That regression is what BLK-M002-001 was.
  for (const platform of ['win32', 'linux']) {
    const command = buildListCommand(platform);
    assert.ok(
      command.arguments.some((argument) => argument.includes('--recursive')),
      `${platform} list command lost --recursive`,
    );
  }
});

test('a critical advisory cannot be waived even with a matching waiver', () => {
  const critical = { ...advisory, severity: 'critical' };
  const gate = applyWaivers([critical], [waiver], now);
  assert.equal(gate.counts.critical, 1);
  assert.equal(gate.waived.length, 0);
});

test('a waiver claiming critical severity is rejected outright', () => {
  assert.throws(() => validateWaiver({ ...fullWaiver, severity: 'critical' }), /cannot be waived/);
});

test('a waiver cannot run past the maximum horizon', () => {
  assert.throws(() => validateWaiver({ ...fullWaiver, expires: '2999-01-01' }), /maximum horizon/);
});

test('a waiver must carry every governance field', () => {
  const withoutOwner = { ...fullWaiver, owner: '' };
  assert.throws(() => validateWaiver(withoutOwner), /missing "owner"/);
});

test('the shipped waiver file satisfies the schema', () => {
  const shipped = JSON.parse(
    readFileSync(
      join(
        process.cwd(),
        'Project_Atlas_Team_Workspace/00_Governance/Tooling/DEPENDENCY_WAIVERS.json',
      ),
      'utf8',
    ),
  );
  for (const entry of shipped.waivers) validateWaiver(entry);
});

test('current source bindings are valid', () => {
  assert.deepEqual(validateBindings(process.cwd()), []);
});

test('performance budget guard parses the initial module script and stylesheet, ignoring ld+json', () => {
  const html = `<!doctype html><html><head>
    <script type="application/ld+json">{"not":"a script"}</script>
    <script type="module" crossorigin src="/assets/index-ABC123.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-XYZ789.css">
  </head><body></body></html>`;
  assert.deepEqual(parseInitialAssets(html), {
    scripts: ['/assets/index-ABC123.js'],
    styles: ['/assets/index-XYZ789.css'],
  });
});

test('performance budget guard passes comfortably under DOC-SEC-005 §4 budget', () => {
  const gate = checkBudget({ jsBytes: JS_BUDGET_BYTES - 1024, cssBytes: CSS_BUDGET_BYTES - 1024 });
  assert.equal(gate.passed, true);
  assert.deepEqual(gate.violations, []);
});

test('performance budget guard fails closed when the initial payload exceeds DOC-SEC-005 §4 budget', () => {
  const gate = checkBudget({ jsBytes: JS_BUDGET_BYTES + 1, cssBytes: CSS_BUDGET_BYTES + 1 });
  assert.equal(gate.passed, false);
  assert.equal(gate.violations.length, 2);
});

test('performance budget guard measures real gzip size of the built initial payload', () => {
  const root = fixture();
  try {
    writeFileSync(
      join(root, 'index.html'),
      '<script type="module" src="/app.js"></script><link rel="stylesheet" href="/app.css">',
    );
    // Highly compressible fixture content -- gzip should shrink it far under budget.
    writeFileSync(join(root, 'app.js'), 'console.log("a");'.repeat(100));
    writeFileSync(join(root, 'app.css'), 'body{color:red}'.repeat(100));

    const { jsBytes, cssBytes } = measureInitialPayload(root);
    assert.ok(jsBytes > 0 && jsBytes < JS_BUDGET_BYTES);
    assert.ok(cssBytes > 0 && cssBytes < CSS_BUDGET_BYTES);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('performance budget guard fails clearly when dist/index.html is missing', () => {
  const root = fixture();
  try {
    assert.throws(() => measureInitialPayload(root), /run the build first/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('production readiness guard passes when every required field is approved', () => {
  const manifest = {
    categories: [
      {
        id: 'business-identity',
        fields: [
          { id: 'legalName', label: 'Legal name', required: true, status: READY_STATUS },
          { id: 'seo', label: 'SEO copy', required: false, status: 'missing' },
        ],
      },
    ],
  };
  const { ready, violations } = checkManifest(manifest);
  assert.equal(ready, true);
  assert.deepEqual(violations, []);
});

test('production readiness guard fails closed on a missing required field', () => {
  const manifest = {
    categories: [
      {
        id: 'legal-commercial-copy',
        fields: [
          { id: 'privacyPolicy', label: 'Privacy policy', required: true, status: 'missing' },
        ],
      },
    ],
  };
  const { ready, violations } = checkManifest(manifest);
  assert.equal(ready, false);
  assert.equal(violations.length, 1);
  assert.match(violations[0], /legal-commercial-copy\.privacyPolicy/);
});

test('production readiness guard fails closed on a placeholder or pending-approval field, not just missing', () => {
  const manifest = {
    categories: [
      {
        id: 'commerce-catalog',
        fields: [
          { id: 'products', label: 'Products', required: true, status: 'placeholder' },
          {
            id: 'prices',
            label: 'Prices',
            required: true,
            status: 'provided_pending_approval',
          },
        ],
      },
    ],
  };
  const { ready, violations } = checkManifest(manifest);
  assert.equal(ready, false);
  assert.equal(violations.length, 2);
});

test('production readiness guard ignores optional fields that are not approved', () => {
  const manifest = {
    categories: [
      {
        id: 'testimonials-claims',
        fields: [{ id: 'entries', label: 'Testimonials', required: false, status: 'missing' }],
      },
    ],
  };
  const { ready } = checkManifest(manifest);
  assert.equal(ready, true);
});

test('production readiness guard loads and validates the real committed manifest', () => {
  const manifestPath = resolveRealManifestPath();
  const manifest = loadManifest(manifestPath);
  assert.ok(Array.isArray(manifest.categories) && manifest.categories.length > 0);
  // The real manifest is expected to be all-missing today -- this only proves the file
  // parses and every field has the shape checkManifest() expects, not that it's launch-ready.
  const { violations } = checkManifest(manifest);
  assert.ok(violations.length > 0, 'expected the real manifest to still have unmet fields');
});

test('production readiness guard fails loudly when the manifest file is missing', () => {
  const root = fixture();
  try {
    assert.throws(
      () => loadManifest(join(root, 'does-not-exist.json')),
      /No client-data manifest at/,
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('production readiness guard fails loudly on a malformed manifest', () => {
  const root = fixture();
  try {
    const manifestPath = join(root, 'malformed.json');
    writeFileSync(manifestPath, JSON.stringify({ notCategories: [] }));
    assert.throws(() => loadManifest(manifestPath), /missing "categories" array/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
