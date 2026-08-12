import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  ALLOWED_CATEGORY_IDS,
  checkManifestReadiness,
  computeReadiness,
  loadJson,
  parseCliArgs,
  SCHEMA_VERSION,
  validateBindings,
  validateFieldEvidence,
  validateStructure,
} from './production-readiness-guard.mjs';

/*
 * Dedicated tests for scripts/guards/production-readiness-guard.mjs, per
 * packet CLAUDE-WPR-M1-CORRECTED section 8.5. Every synthetic fixture below
 * is built in-memory or in a test-owned temp directory, is clearly fake
 * (e.g. "Synthetic Test Co."), and is never represented as Andrea-approved
 * production data. This file is intentionally separate from
 * scripts/guards/guards.test.mjs (packet section 5 item 9).
 */

const GUARD_PATH = fileURLToPath(new URL('./production-readiness-guard.mjs', import.meta.url));
const REPO_ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '../..');

function tempDir() {
  return mkdtempSync(join(tmpdir(), 'wpr-m1-guard-'));
}

const CATEGORY_FIELD_PREFIX = {
  'business-identity': 'business',
  'commerce-catalog': 'catalog',
  'content-media': 'media',
  'testimonials-claims': 'testimonials',
  'legal-commercial-copy': 'legal',
  'provider-credentials': 'provider',
};

function baseField(overrides = {}) {
  return {
    id: 'category.field',
    label: 'Fixture field',
    required: true,
    valueType: 'string',
    lifecycleStatus: 'missing',
    value: null,
    provenance: null,
    rightsConsentRequired: false,
    rightsConsentEvidence: null,
    businessApproval: null,
    legalApprovalRequired: false,
    legalApproval: null,
    sourceBinding: null,
    blockingSeverity: 'blocking',
    lastVerified: null,
    ...overrides,
  };
}

function approvedField(overrides = {}) {
  return baseField({
    lifecycleStatus: 'approved',
    value: 'Synthetic Test Co. fixture value',
    provenance:
      'synthetic-test-fixture: fabricated for guard testing, not real client-approved data',
    businessApproval: {
      approvedBy: 'Synthetic Test Approver',
      approvedAt: '2026-01-01T00:00:00Z',
      evidenceRef: 'synthetic-test-evidence-ref',
    },
    sourceBinding: 'binding-category.field',
    lastVerified: '2026-01-01T00:00:00Z',
    ...overrides,
  });
}

function manifestWith(categories) {
  return { schemaVersion: SCHEMA_VERSION, categories };
}

function category(id, fields, overrides = {}) {
  return { id, label: `${id} label`, sourceRef: 'fixture-source-ref', fields, ...overrides };
}

function bindingFor(field, overrides = {}) {
  return {
    id: `binding-${field.id}`,
    manifestFieldId: field.id,
    targetFile: 'apps/web/src/fixture-consumer.ts',
    bindingIdentifier: 'fixtureConsumer.value',
    consumptionMechanism: 'verified-consumed',
    deploymentEnvironmentContract: null,
    verificationRule: 'fixture-only verification rule',
    status: 'bound-unverified',
    bindingVerifiedAt: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}

function bindingsDoc(bindings) {
  return { $schemaVersion: '1.0', purpose: 'fixture', statusValues: {}, bindings };
}

// --- 1. empty category arrays ---------------------------------------------

test('1. empty categories array fails closed', () => {
  const violations = validateStructure(manifestWith([]));
  assert.ok(violations.some((v) => v.code === 'EMPTY_CATEGORIES'));
});

// --- 2. category without fields / with empty fields ------------------------

test('2a. category object missing the fields property fails closed', () => {
  const cat = category('business-identity', [baseField()]);
  delete cat.fields;
  const violations = validateStructure(manifestWith([cat]));
  assert.ok(violations.some((v) => v.code === 'CATEGORY_EMPTY_FIELDS'));
});

test('2b. category with an empty fields array fails closed', () => {
  const violations = validateStructure(manifestWith([category('business-identity', [])]));
  assert.ok(violations.some((v) => v.code === 'CATEGORY_EMPTY_FIELDS'));
});

// --- 3. missing required / unknown extra properties at each level ---------

test('3a. unknown extra property at root level fails closed', () => {
  const manifest = manifestWith([category('business-identity', [baseField({ id: 'business.x' })])]);
  manifest.unexpectedRootKey = true;
  const violations = validateStructure(manifest);
  assert.ok(violations.some((v) => v.code === 'ROOT_UNKNOWN_PROPERTY'));
});

test('3b. unknown extra property at category level fails closed', () => {
  const cat = category('business-identity', [baseField({ id: 'business.x' })]);
  cat.unexpectedCategoryKey = true;
  const violations = validateStructure(manifestWith([cat]));
  assert.ok(violations.some((v) => v.code === 'CATEGORY_UNKNOWN_PROPERTY'));
});

test('3c. unknown extra property at field level fails closed', () => {
  const field = baseField({ id: 'business.x', unexpectedFieldKey: true });
  const violations = validateStructure(manifestWith([category('business-identity', [field])]));
  assert.ok(violations.some((v) => v.code === 'FIELD_UNKNOWN_PROPERTY'));
});

test('3d. unknown extra property inside approvalEvidence fails closed', () => {
  const field = approvedField({
    id: 'business.x',
    businessApproval: {
      approvedBy: 'Synthetic Test Approver',
      approvedAt: '2026-01-01T00:00:00Z',
      evidenceRef: 'ref',
      unexpectedApprovalKey: true,
    },
  });
  const violations = validateStructure(manifestWith([category('business-identity', [field])]));
  assert.ok(violations.some((v) => v.code === 'FIELD_APPROVAL_UNKNOWN_PROPERTY'));
});

test('3e. missing required property at field level fails closed', () => {
  const field = baseField({ id: 'business.x' });
  delete field.provenance;
  const violations = validateStructure(manifestWith([category('business-identity', [field])]));
  assert.ok(violations.some((v) => v.code === 'FIELD_MISSING_PROPERTY'));
});

// --- 4. duplicate category and field identifiers ---------------------------

test('4a. duplicate category ids fail closed', () => {
  const violations = validateStructure(
    manifestWith([
      category('business-identity', [baseField({ id: 'business.a' })]),
      category('business-identity', [baseField({ id: 'business.b' })]),
    ]),
  );
  assert.ok(violations.some((v) => v.code === 'CATEGORY_DUPLICATE_ID'));
});

test('4b. duplicate field ids across different categories fail closed', () => {
  const violations = validateStructure(
    manifestWith([
      category('business-identity', [baseField({ id: 'shared.id' })]),
      category('commerce-catalog', [baseField({ id: 'shared.id' })]),
    ]),
  );
  assert.ok(violations.some((v) => v.code === 'FIELD_DUPLICATE_ID'));
});

// --- 5. invalid value type/format and lifecycle status ---------------------

test('5a. invalid valueType fails closed', () => {
  const field = baseField({ id: 'business.x', valueType: 'not-a-real-type' });
  const violations = validateStructure(manifestWith([category('business-identity', [field])]));
  assert.ok(violations.some((v) => v.code === 'FIELD_INVALID_VALUE_TYPE'));
});

test('5b. invalid lifecycleStatus fails closed', () => {
  const field = baseField({ id: 'business.x', lifecycleStatus: 'not-a-real-status' });
  const violations = validateStructure(manifestWith([category('business-identity', [field])]));
  assert.ok(violations.some((v) => v.code === 'FIELD_INVALID_LIFECYCLE_STATUS'));
});

// --- 6. required fields in missing/draft/rejected/expired/approved-without-evidence ---

for (const status of ['missing', 'draft', 'rejected', 'expired']) {
  test(`6. required blocking field in "${status}" status is unready`, () => {
    const field = baseField({ id: 'business.x', lifecycleStatus: status });
    const { ready, unreadyRequiredFields } = computeReadiness(
      manifestWith([category('business-identity', [field])]),
    );
    assert.equal(ready, false);
    assert.ok(unreadyRequiredFields.some((f) => f.fieldId === 'business.x'));
  });
}

test('6. approved field without evidence is not readiness-blocked by computeReadiness alone but fails overall via violations', () => {
  const field = baseField({ id: 'business.x', lifecycleStatus: 'approved' });
  const { ready } = computeReadiness(manifestWith([category('business-identity', [field])]));
  assert.equal(ready, true);
  const evidenceViolations = validateFieldEvidence(field, 'business-identity');
  assert.ok(evidenceViolations.length > 0);
});

// --- 7. approved field independently missing each evidence property --------

test('7a. approved field missing provenance fails closed', () => {
  const field = approvedField({ id: 'business.x', provenance: null });
  const violations = validateFieldEvidence(field, 'business-identity');
  assert.ok(violations.some((v) => v.code === 'APPROVED_WITHOUT_PROVENANCE'));
});

test('7b. approved field requiring rights/consent but missing evidence fails closed', () => {
  const field = approvedField({
    id: 'media.x',
    rightsConsentRequired: true,
    rightsConsentEvidence: null,
  });
  const violations = validateFieldEvidence(field, 'content-media');
  assert.ok(violations.some((v) => v.code === 'APPROVED_WITHOUT_RIGHTS_CONSENT'));
});

test('7c. approved field missing business approval fails closed', () => {
  const field = approvedField({ id: 'business.x', businessApproval: null });
  const violations = validateFieldEvidence(field, 'business-identity');
  assert.ok(violations.some((v) => v.code === 'APPROVED_WITHOUT_BUSINESS_APPROVAL'));
});

test('7d. approved field requiring legal approval but missing evidence fails closed', () => {
  const field = approvedField({ id: 'legal.x', legalApprovalRequired: true, legalApproval: null });
  const violations = validateFieldEvidence(field, 'legal-commercial-copy');
  assert.ok(violations.some((v) => v.code === 'APPROVED_WITHOUT_LEGAL_APPROVAL'));
});

test('7e. approved field missing source binding fails closed', () => {
  const field = approvedField({ id: 'business.x', sourceBinding: null });
  const violations = validateFieldEvidence(field, 'business-identity');
  assert.ok(violations.some((v) => v.code === 'APPROVED_WITHOUT_SOURCE_BINDING'));
});

// --- 8. placeholder/example/test value masquerading as approved ------------

test('8a. placeholder-looking value on an approved field fails closed', () => {
  for (const placeholder of [
    'TODO',
    'placeholder',
    'TBD',
    'Example business name',
    '[Esempio]',
    'lorem ipsum',
    'N/A',
  ]) {
    const field = approvedField({ id: 'business.x', value: placeholder });
    const violations = validateFieldEvidence(field, 'business-identity');
    assert.ok(
      violations.some((v) => v.code === 'APPROVED_PLACEHOLDER_VALUE'),
      `expected placeholder detection for value ${JSON.stringify(placeholder)}`,
    );
  }
});

test('8b. placeholder-looking provenance on an approved field fails closed', () => {
  const field = approvedField({ id: 'business.x', provenance: 'TODO: fill in later' });
  const violations = validateFieldEvidence(field, 'business-identity');
  assert.ok(violations.some((v) => v.code === 'APPROVED_PLACEHOLDER_PROVENANCE'));
});

// --- 9. binding: target absent, stale, unconsumed, approved-but-unused, hardcoded-unbound ---

test('9a. approved field whose binding has no target file fails closed', () => {
  const field = approvedField({ id: 'business.x' });
  const manifest = manifestWith([category('business-identity', [field])]);
  const binding = bindingFor(field, { targetFile: null });
  const violations = validateBindings(manifest, bindingsDoc([binding]));
  assert.ok(violations.some((v) => v.code === 'APPROVED_FIELD_MISSING_TARGET'));
});

test('9b. approved field whose binding verification is stale (missing bindingVerifiedAt) fails closed', () => {
  const field = approvedField({ id: 'business.x' });
  const manifest = manifestWith([category('business-identity', [field])]);
  const binding = bindingFor(field, { bindingVerifiedAt: null });
  const violations = validateBindings(manifest, bindingsDoc([binding]));
  assert.ok(violations.some((v) => v.code === 'APPROVED_FIELD_STALE_BINDING'));
});

test('9b2. approved field whose binding verification predates the field lastVerified fails closed', () => {
  const field = approvedField({ id: 'business.x', lastVerified: '2026-06-01T00:00:00Z' });
  const manifest = manifestWith([category('business-identity', [field])]);
  const binding = bindingFor(field, { bindingVerifiedAt: '2025-01-01T00:00:00Z' });
  const violations = validateBindings(manifest, bindingsDoc([binding]));
  assert.ok(violations.some((v) => v.code === 'APPROVED_FIELD_STALE_BINDING'));
});

test('9c. approved field whose binding is not consumed fails closed (approved-but-unused)', () => {
  const field = approvedField({ id: 'business.x' });
  const manifest = manifestWith([category('business-identity', [field])]);
  const binding = bindingFor(field, { consumptionMechanism: 'not-consumed' });
  const violations = validateBindings(manifest, bindingsDoc([binding]));
  assert.ok(violations.some((v) => v.code === 'APPROVED_FIELD_UNCONSUMED'));
});

test('9d. approved field whose binding is unbound fails closed', () => {
  const field = approvedField({ id: 'business.x' });
  const manifest = manifestWith([category('business-identity', [field])]);
  const binding = bindingFor(field, { status: 'unbound' });
  const violations = validateBindings(manifest, bindingsDoc([binding]));
  assert.ok(violations.some((v) => v.code === 'APPROVED_FIELD_UNBOUND'));
});

test('9e. hard-coded production value without an approved manifest binding fails closed', () => {
  const field = baseField({ id: 'business.x', lifecycleStatus: 'missing' });
  const manifest = manifestWith([category('business-identity', [field])]);
  const binding = bindingFor(field, {
    status: 'hardcoded-unbound',
    consumptionMechanism: 'hardcoded-constant',
  });
  const violations = validateBindings(manifest, bindingsDoc([binding]));
  assert.ok(violations.some((v) => v.code === 'HARDCODED_VALUE_WITHOUT_APPROVAL'));
});

// --- 10. complete valid non-production fixture ------------------------------

test('10. a complete structurally valid fixture with no approvals is ready:false with zero violations', () => {
  const fields = ALLOWED_CATEGORY_IDS.map((catId, i) =>
    baseField({ id: `${CATEGORY_FIELD_PREFIX[catId]}.fixtureField${i}` }),
  );
  const manifest = manifestWith(
    ALLOWED_CATEGORY_IDS.map((catId, i) => category(catId, [fields[i]])),
  );
  const result = checkManifestReadiness(manifest, bindingsDoc([]));
  assert.equal(result.violations.length, 0);
  assert.equal(result.ready, false);
  assert.equal(result.unreadyRequiredFields.length, ALLOWED_CATEGORY_IDS.length);
});

// --- 11. complete valid synthetic production-shaped fixture (no real Andrea data) ---

function buildSyntheticProductionFixture() {
  const fields = ALLOWED_CATEGORY_IDS.map((catId, i) =>
    approvedField({
      id: `${CATEGORY_FIELD_PREFIX[catId]}.fixtureField${i}`,
      rightsConsentRequired: catId === 'content-media' || catId === 'testimonials-claims',
      rightsConsentEvidence:
        catId === 'content-media' || catId === 'testimonials-claims'
          ? 'synthetic-test-fixture: fake rights-consent record, not a real client approval'
          : null,
      legalApprovalRequired: catId === 'legal-commercial-copy',
      legalApproval:
        catId === 'legal-commercial-copy'
          ? {
              approvedBy: 'Synthetic Test Legal Reviewer',
              approvedAt: '2026-01-01T00:00:00Z',
              evidenceRef: 'synthetic-test-legal-evidence-ref',
            }
          : null,
    }),
  );
  const manifest = manifestWith(
    ALLOWED_CATEGORY_IDS.map((catId, i) => category(catId, [fields[i]])),
  );
  const bindings = bindingsDoc(fields.map((f) => bindingFor(f)));
  return { manifest, bindings };
}

test('11. a complete valid synthetic production-shaped fixture is ready:true with zero violations', () => {
  const { manifest, bindings } = buildSyntheticProductionFixture();
  const result = checkManifestReadiness(manifest, bindings);
  assert.deepEqual(result.violations, []);
  assert.equal(result.ready, true);
  const serialized = JSON.stringify(manifest);
  assert.ok(!/andrea/i.test(serialized), 'synthetic fixture must not reference real Andrea data');
});

test('11. CLI: dedicated positive synthetic-fixture invocation exits 0 with ready:true and is labelled fixture-only', () => {
  const dir = tempDir();
  try {
    const { manifest, bindings } = buildSyntheticProductionFixture();
    const manifestPath = join(dir, 'synthetic-manifest.json');
    const bindingPath = join(dir, 'synthetic-binding.json');
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    writeFileSync(bindingPath, JSON.stringify(bindings, null, 2));

    const stdout = execFileSync(
      process.execPath,
      [GUARD_PATH, '--manifest', manifestPath, '--binding', bindingPath],
      { cwd: REPO_ROOT, encoding: 'utf8' },
    );
    const result = JSON.parse(stdout);
    assert.equal(result.ready, true);
    assert.equal(result.fixtureOnly, true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// --- 12. the real committed manifest remains ready:false --------------------

test('12. the real committed CLIENT_DATA_MANIFEST.json remains ready:false against the real binding contract', () => {
  const manifestPath = resolve(
    REPO_ROOT,
    'Project_Atlas_Team_Workspace/04_Planning/CLIENT_DATA_MANIFEST.json',
  );
  const bindingPath = resolve(
    REPO_ROOT,
    'Project_Atlas_Team_Workspace/04_Planning/WPR-M1-SOURCE-BINDING-CONTRACT.json',
  );
  const manifest = loadJson(manifestPath, 'client-data manifest');
  const bindingContract = loadJson(bindingPath, 'source-binding contract');
  const result = checkManifestReadiness(manifest, bindingContract);
  assert.equal(result.ready, false);
  const serialized = JSON.stringify(manifest);
  assert.ok(!/andrea/i.test(serialized), 'the committed manifest must contain no real Andrea data');
});

test('12. CLI: real committed manifest run exits non-zero and is not fixtureOnly', () => {
  assert.throws(
    () => {
      execFileSync(process.execPath, [GUARD_PATH], { cwd: REPO_ROOT, encoding: 'utf8' });
    },
    (error) => {
      assert.equal(error.status, 1);
      const result = JSON.parse(error.stdout);
      assert.equal(result.ready, false);
      assert.equal(result.fixtureOnly, false);
      return true;
    },
  );
});

// --- CLI argument parsing (unit-level, supports the section 10.1 item 3 gate) ---

test('parseCliArgs reads --manifest and --binding overrides', () => {
  const args = parseCliArgs(['--manifest', 'a.json', '--binding', 'b.json']);
  assert.deepEqual(args, { manifestPath: 'a.json', bindingPath: 'b.json' });
});

test('parseCliArgs defaults to null when no overrides are given', () => {
  assert.deepEqual(parseCliArgs([]), { manifestPath: null, bindingPath: null });
});
