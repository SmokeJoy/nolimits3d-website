import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import {
  applyWaivers,
  buildListCommand,
  collectRegistryVersions,
  summarizeAdvisories,
  validateWaiver,
} from './dependency-audit.mjs';
import { scanText } from './secret-scan.mjs';
import { scanScope } from './scope-guard.mjs';
import { validateBindings } from './source-binding-guard.mjs';

function fixture() {
  return mkdtempSync(join(tmpdir(), 'atlas-guard-'));
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
