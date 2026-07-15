import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { collectRegistryVersions, summarizeAdvisories } from './dependency-audit.mjs';
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

test('current source bindings are valid', () => {
  assert.deepEqual(validateBindings(process.cwd()), []);
});
