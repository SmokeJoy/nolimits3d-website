import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  ALLOWED_CATEGORY_IDS,
  ALLOWED_CONSUMPTION_MECHANISMS,
  checkManifestReadiness,
  computeReadiness,
  loadJson,
  parseCliArgs,
  SCHEMA_VERSION,
  validateBindingConsumption,
  validateBindingContractStructure,
  validateBindings,
  validateFieldEvidence,
  validateStructure,
} from './production-readiness-guard.mjs';

/*
 * Dedicated tests for scripts/guards/production-readiness-guard.mjs, per
 * packet CLAUDE-WPR-M1-CORRECTED section 8.5. Every synthetic fixture below
 * is built in-memory or in a test-owned temp directory, is clearly
 * non-production (e.g. "Northwind Fixture Co."), and is never represented as
 * Andrea-approved production data. Deliberately avoids the words the guard's
 * own PLACEHOLDER_PATTERNS now flag (test/example/sample/fake/dummy/etc.) so
 * the "valid synthetic production-shaped fixture" tests exercise the happy
 * path rather than the placeholder-rejection path. This file is
 * intentionally separate from scripts/guards/guards.test.mjs (packet
 * section 5 item 9).
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
    value: 'Northwind Fixture Co. value',
    provenance:
      'synthetic-fixture-record: fabricated for guard verification, not real client-approved data',
    businessApproval: {
      approvedBy: 'Northwind Fixture Approver',
      approvedAt: '2026-01-01T00:00:00Z',
      evidenceRef: 'synthetic-fixture-evidence-ref',
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
    consumptionMechanism: 'live-consumed',
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
  const bindings = bindingsDoc(
    fields.map((f) =>
      bindingFor(f, {
        status: 'unbound',
        consumptionMechanism: 'not-consumed',
        targetFile: null,
        bindingVerifiedAt: null,
      }),
    ),
  );
  const result = checkManifestReadiness(manifest, bindings);
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
          ? 'synthetic-fixture-record: fabricated rights-consent record, not a real client approval'
          : null,
      legalApprovalRequired: catId === 'legal-commercial-copy',
      legalApproval:
        catId === 'legal-commercial-copy'
          ? {
              approvedBy: 'Northwind Fixture Legal Reviewer',
              approvedAt: '2026-01-01T00:00:00Z',
              evidenceRef: 'synthetic-fixture-legal-evidence-ref',
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

// --- 13. Full violation-code coverage sweep -------------------------------
//
// Added after an independent adversarial peer review found: (a) a guard
// bypass letting fabricated placeholder data pass as ready:true, closed by
// broadening PLACEHOLDER_PATTERNS, catching blank values, and adding
// validateBindingContractStructure; and (b) roughly 20 implemented violation
// codes with zero test assertions. This section closes both gaps: one
// targeted test per previously-uncovered code, plus permanent regression
// coverage for the exact fabricated-data reproduction the reviewer used.

function singleFieldManifest(fieldOverrides = {}, categoryOverrides = {}) {
  return manifestWith([
    category(
      'business-identity',
      [baseField({ id: 'business.x', ...fieldOverrides })],
      categoryOverrides,
    ),
  ]);
}

test('13. ROOT_NOT_OBJECT fails closed on a non-object manifest', () => {
  assert.deepEqual(validateStructure('not-an-object'), [
    { code: 'ROOT_NOT_OBJECT', message: 'Manifest root must be an object.' },
  ]);
  assert.deepEqual(validateStructure(null)[0].code, 'ROOT_NOT_OBJECT');
});

test('13. SCHEMA_VERSION_MISMATCH fails closed', () => {
  const manifest = singleFieldManifest();
  manifest.schemaVersion = '1.0.0';
  assert.ok(validateStructure(manifest).some((v) => v.code === 'SCHEMA_VERSION_MISMATCH'));
});

test('13. CATEGORY_NOT_OBJECT fails closed', () => {
  const violations = validateStructure(manifestWith(['not-an-object']));
  assert.ok(violations.some((v) => v.code === 'CATEGORY_NOT_OBJECT'));
});

test('13. CATEGORY_UNKNOWN_ID fails closed', () => {
  const violations = validateStructure(
    manifestWith([category('not-a-real-category', [baseField({ id: 'x.y' })])]),
  );
  assert.ok(violations.some((v) => v.code === 'CATEGORY_UNKNOWN_ID'));
});

test('13. CATEGORY_MISSING_LABEL fails closed', () => {
  const violations = validateStructure(singleFieldManifest({}, { label: '' }));
  assert.ok(violations.some((v) => v.code === 'CATEGORY_MISSING_LABEL'));
});

test('13. CATEGORY_MISSING_SOURCE_REF fails closed', () => {
  const violations = validateStructure(singleFieldManifest({}, { sourceRef: '' }));
  assert.ok(violations.some((v) => v.code === 'CATEGORY_MISSING_SOURCE_REF'));
});

test('13. FIELD_NOT_OBJECT fails closed', () => {
  const violations = validateStructure(
    manifestWith([category('business-identity', ['not-an-object'])]),
  );
  assert.ok(violations.some((v) => v.code === 'FIELD_NOT_OBJECT'));
});

test('13. FIELD_INVALID_ID fails closed on a malformed (non-dotted) id', () => {
  const violations = validateStructure(singleFieldManifest({ id: 'not-dotted' }));
  assert.ok(violations.some((v) => v.code === 'FIELD_INVALID_ID'));
});

test('13. FIELD_MISSING_LABEL fails closed', () => {
  const violations = validateStructure(singleFieldManifest({ label: '' }));
  assert.ok(violations.some((v) => v.code === 'FIELD_MISSING_LABEL'));
});

test('13. FIELD_INVALID_REQUIRED fails closed', () => {
  const violations = validateStructure(singleFieldManifest({ required: 'yes' }));
  assert.ok(violations.some((v) => v.code === 'FIELD_INVALID_REQUIRED'));
});

test('13. FIELD_INVALID_RIGHTS_CONSENT_REQUIRED fails closed', () => {
  const violations = validateStructure(singleFieldManifest({ rightsConsentRequired: 'true' }));
  assert.ok(violations.some((v) => v.code === 'FIELD_INVALID_RIGHTS_CONSENT_REQUIRED'));
});

test('13. FIELD_INVALID_LEGAL_APPROVAL_REQUIRED fails closed', () => {
  const violations = validateStructure(singleFieldManifest({ legalApprovalRequired: 1 }));
  assert.ok(violations.some((v) => v.code === 'FIELD_INVALID_LEGAL_APPROVAL_REQUIRED'));
});

test('13. FIELD_INVALID_BLOCKING_SEVERITY fails closed', () => {
  const violations = validateStructure(singleFieldManifest({ blockingSeverity: 'urgent' }));
  assert.ok(violations.some((v) => v.code === 'FIELD_INVALID_BLOCKING_SEVERITY'));
});

test('13. FIELD_INVALID_APPROVAL_SHAPE fails closed', () => {
  const violations = validateStructure(singleFieldManifest({ businessApproval: 'not-an-object' }));
  assert.ok(violations.some((v) => v.code === 'FIELD_INVALID_APPROVAL_SHAPE'));
});

test('13. FIELD_APPROVAL_MISSING_PROPERTY fails closed', () => {
  const violations = validateStructure(
    singleFieldManifest({ businessApproval: { approvedBy: 'x', evidenceRef: 'y' } }),
  );
  assert.ok(violations.some((v) => v.code === 'FIELD_APPROVAL_MISSING_PROPERTY'));
});

test('13. FIELD_INVALID_FORMAT fails closed', () => {
  const violations = validateStructure(singleFieldManifest({ format: { nested: 'object' } }));
  assert.ok(violations.some((v) => v.code === 'FIELD_INVALID_FORMAT'));
});

test('13. APPROVED_WITHOUT_VALUE fires on both null and blank-string values', () => {
  const nullViolations = validateFieldEvidence(
    approvedField({ id: 'business.x', value: null }),
    'business-identity',
  );
  assert.ok(nullViolations.some((v) => v.code === 'APPROVED_WITHOUT_VALUE'));
  const blankViolations = validateFieldEvidence(
    approvedField({ id: 'business.x', value: '   ' }),
    'business-identity',
  );
  assert.ok(blankViolations.some((v) => v.code === 'APPROVED_WITHOUT_VALUE'));
});

test('13. APPROVED_WITHOUT_LAST_VERIFIED fails closed', () => {
  const violations = validateFieldEvidence(
    approvedField({ id: 'business.x', lastVerified: null }),
    'business-identity',
  );
  assert.ok(violations.some((v) => v.code === 'APPROVED_WITHOUT_LAST_VERIFIED'));
});

test('13. APPROVED_PLACEHOLDER_BUSINESS_APPROVAL fails closed', () => {
  const field = approvedField({
    id: 'business.x',
    businessApproval: { approvedBy: 'x', approvedAt: '2026-01-01T00:00:00Z', evidenceRef: 'TODO' },
  });
  const violations = validateFieldEvidence(field, 'business-identity');
  assert.ok(violations.some((v) => v.code === 'APPROVED_PLACEHOLDER_BUSINESS_APPROVAL'));
});

test('13. APPROVED_PLACEHOLDER_RIGHTS_CONSENT fails closed', () => {
  const field = approvedField({
    id: 'media.x',
    rightsConsentRequired: true,
    rightsConsentEvidence: 'TBD',
  });
  const violations = validateFieldEvidence(field, 'content-media');
  assert.ok(violations.some((v) => v.code === 'APPROVED_PLACEHOLDER_RIGHTS_CONSENT'));
});

test('13. APPROVED_PLACEHOLDER_LEGAL_APPROVAL fails closed', () => {
  const field = approvedField({
    id: 'legal.x',
    legalApprovalRequired: true,
    legalApproval: {
      approvedBy: 'x',
      approvedAt: '2026-01-01T00:00:00Z',
      evidenceRef: 'placeholder',
    },
  });
  const violations = validateFieldEvidence(field, 'legal-commercial-copy');
  assert.ok(violations.some((v) => v.code === 'APPROVED_PLACEHOLDER_LEGAL_APPROVAL'));
});

test('13. APPROVED_FIELD_MISSING_BINDING fails closed when the field has a sourceBinding but no matching contract entry', () => {
  const field = approvedField({ id: 'business.x', sourceBinding: 'binding-business.x' });
  const manifest = manifestWith([category('business-identity', [field])]);
  const violations = validateBindings(manifest, bindingsDoc([]));
  assert.ok(violations.some((v) => v.code === 'APPROVED_FIELD_MISSING_BINDING'));
});

// --- 13. Binding contract structural validation (new in this remediation) ---

test('13. BINDING_ROOT_NOT_OBJECT fails closed', () => {
  assert.equal(
    validateBindingContractStructure('not-an-object')[0].code,
    'BINDING_ROOT_NOT_OBJECT',
  );
});

test('13. BINDING_ROOT_UNKNOWN_PROPERTY fails closed', () => {
  const doc = bindingsDoc([bindingFor({ id: 'business.x' })]);
  doc.unexpectedRootKey = true;
  assert.ok(
    validateBindingContractStructure(doc).some((v) => v.code === 'BINDING_ROOT_UNKNOWN_PROPERTY'),
  );
});

test('13. BINDING_EMPTY_BINDINGS fails closed', () => {
  assert.ok(
    validateBindingContractStructure(bindingsDoc([])).some(
      (v) => v.code === 'BINDING_EMPTY_BINDINGS',
    ),
  );
});

test('13. BINDING_NOT_OBJECT fails closed', () => {
  assert.ok(
    validateBindingContractStructure(bindingsDoc(['not-an-object'])).some(
      (v) => v.code === 'BINDING_NOT_OBJECT',
    ),
  );
});

test('13. BINDING_UNKNOWN_PROPERTY fails closed', () => {
  const binding = bindingFor({ id: 'business.x' });
  binding.unexpectedBindingKey = true;
  assert.ok(
    validateBindingContractStructure(bindingsDoc([binding])).some(
      (v) => v.code === 'BINDING_UNKNOWN_PROPERTY',
    ),
  );
});

test('13. BINDING_MISSING_PROPERTY fails closed', () => {
  const binding = bindingFor({ id: 'business.x' });
  delete binding.verificationRule;
  assert.ok(
    validateBindingContractStructure(bindingsDoc([binding])).some(
      (v) => v.code === 'BINDING_MISSING_PROPERTY',
    ),
  );
});

test('13. BINDING_INVALID_ID fails closed', () => {
  const binding = bindingFor({ id: 'business.x' }, { id: '' });
  assert.ok(
    validateBindingContractStructure(bindingsDoc([binding])).some(
      (v) => v.code === 'BINDING_INVALID_ID',
    ),
  );
});

test('13. BINDING_DUPLICATE_ID fails closed', () => {
  const a = bindingFor(
    { id: 'business.x' },
    { id: 'binding-shared', manifestFieldId: 'business.x' },
  );
  const b = bindingFor(
    { id: 'business.y' },
    { id: 'binding-shared', manifestFieldId: 'business.y' },
  );
  assert.ok(
    validateBindingContractStructure(bindingsDoc([a, b])).some(
      (v) => v.code === 'BINDING_DUPLICATE_ID',
    ),
  );
});

test('13. BINDING_INVALID_MANIFEST_FIELD_ID fails closed', () => {
  const binding = bindingFor({ id: 'business.x' }, { manifestFieldId: '' });
  assert.ok(
    validateBindingContractStructure(bindingsDoc([binding])).some(
      (v) => v.code === 'BINDING_INVALID_MANIFEST_FIELD_ID',
    ),
  );
});

test('13. BINDING_DUPLICATE_MANIFEST_FIELD_ID fails closed', () => {
  const a = bindingFor({ id: 'business.x' }, { id: 'binding-a' });
  const b = bindingFor({ id: 'business.x' }, { id: 'binding-b' });
  assert.ok(
    validateBindingContractStructure(bindingsDoc([a, b])).some(
      (v) => v.code === 'BINDING_DUPLICATE_MANIFEST_FIELD_ID',
    ),
  );
});

test('13. BINDING_INVALID_STATUS fails closed on a typo/garbage status', () => {
  const binding = bindingFor({ id: 'business.x' }, { status: 'bound-verified-TYPO' });
  assert.ok(
    validateBindingContractStructure(bindingsDoc([binding])).some(
      (v) => v.code === 'BINDING_INVALID_STATUS',
    ),
  );
});

test('13. BINDING_INVALID_CONSUMPTION_MECHANISM fails closed on a fabricated mechanism string', () => {
  const binding = bindingFor(
    { id: 'business.x' },
    { consumptionMechanism: 'totally-fabricated-nonsense-value' },
  );
  assert.ok(
    validateBindingContractStructure(bindingsDoc([binding])).some(
      (v) => v.code === 'BINDING_INVALID_CONSUMPTION_MECHANISM',
    ),
  );
  // every currently-allowed mechanism must itself be accepted without this code
  for (const mechanism of ALLOWED_CONSUMPTION_MECHANISMS) {
    const ok = bindingFor({ id: 'business.x' }, { consumptionMechanism: mechanism });
    assert.ok(
      !validateBindingContractStructure(bindingsDoc([ok])).some(
        (v) => v.code === 'BINDING_INVALID_CONSUMPTION_MECHANISM',
      ),
      `expected ${mechanism} to be accepted`,
    );
  }
});

test('13. BINDING_MISSING_VERIFICATION_RULE fails closed', () => {
  const binding = bindingFor({ id: 'business.x' }, { verificationRule: '' });
  assert.ok(
    validateBindingContractStructure(bindingsDoc([binding])).some(
      (v) => v.code === 'BINDING_MISSING_VERIFICATION_RULE',
    ),
  );
});

test('13. BINDING_INVALID_TARGET_FILE fails closed', () => {
  const binding = bindingFor({ id: 'business.x' }, { targetFile: 42 });
  assert.ok(
    validateBindingContractStructure(bindingsDoc([binding])).some(
      (v) => v.code === 'BINDING_INVALID_TARGET_FILE',
    ),
  );
});

test('13. BINDING_INVALID_VERIFIED_AT fails closed on a non-ISO-8601 string', () => {
  const binding = bindingFor({ id: 'business.x' }, { bindingVerifiedAt: 'not-a-date' });
  assert.ok(
    validateBindingContractStructure(bindingsDoc([binding])).some(
      (v) => v.code === 'BINDING_INVALID_VERIFIED_AT',
    ),
  );
  const nullOk = bindingFor({ id: 'business.x' }, { bindingVerifiedAt: null });
  assert.ok(
    !validateBindingContractStructure(bindingsDoc([nullOk])).some(
      (v) => v.code === 'BINDING_INVALID_VERIFIED_AT',
    ),
  );
});

// --- 13. Placeholder-pattern regression coverage (the adversarial finding) --

test('13. every adversarially-tested fake value is now caught (regression guard for the CRITICAL finding)', () => {
  const fakeValues = [
    'REPLACE ME',
    'FIXME',
    '<insert here>',
    'TEST VALUE',
    'test',
    'XXX Corp Ltd',
    'Company: N/A pending',
    'sample data',
    'dummy value',
    'changeme',
    'your company name here',
    'COMING SOON',
    'INSERT VALUE HERE',
    'fake business name',
  ];
  for (const value of fakeValues) {
    const field = approvedField({ id: 'business.x', value });
    const violations = validateFieldEvidence(field, 'business-identity');
    assert.ok(
      violations.some((v) => v.code === 'APPROVED_PLACEHOLDER_VALUE'),
      `expected "${value}" to be caught as a placeholder`,
    );
  }
});

test('13. end-to-end regression: the exact fabricated manifest from the adversarial review is rejected', () => {
  function fakeField(id) {
    return {
      id,
      label: 'x',
      required: true,
      valueType: 'string',
      lifecycleStatus: 'approved',
      value: 'REPLACE ME',
      provenance: 'FIXME',
      rightsConsentRequired: false,
      rightsConsentEvidence: null,
      businessApproval: {
        approvedBy: 'FIXME',
        approvedAt: '2026-01-01T00:00:00Z',
        evidenceRef: 'FIXME',
      },
      legalApprovalRequired: false,
      legalApproval: null,
      sourceBinding: `binding-${id}`,
      blockingSeverity: 'blocking',
      lastVerified: '2026-01-01T00:00:00Z',
    };
  }
  const categories = ALLOWED_CATEGORY_IDS.map((catId, i) =>
    category(catId, [fakeField(`${CATEGORY_FIELD_PREFIX[catId]}.fake${i}`)]),
  );
  const manifest = manifestWith(categories);
  const bindings = bindingsDoc(
    categories.map((c) =>
      bindingFor(c.fields[0], {
        consumptionMechanism: 'totally-fabricated-nonsense-value',
        bindingVerifiedAt: '2099-01-01T00:00:00Z',
      }),
    ),
  );
  const result = checkManifestReadiness(manifest, bindings);
  assert.equal(result.ready, false, 'fabricated placeholder data must never be ready:true');
  assert.ok(result.violations.length > 0, 'fabricated placeholder data must produce violations');
});

// --- 14. Second Technical Review round: fail-closed contract completeness --
//
// Atlas TPM's 2026-08-13 Technical Review (CHANGES REQUESTED, head 1cf9a1a) found the guard did
// not completely enforce required-category presence, declared value type/format, manifest
// date-time validity, target-file existence, or actual binding consumption. This section adds
// dedicated coverage for every one of those gaps.

test('14. MISSING_REQUIRED_CATEGORY fails closed when a required category is entirely absent', () => {
  const onlyFive = ALLOWED_CATEGORY_IDS.slice(1).map((catId, i) =>
    category(catId, [baseField({ id: `${CATEGORY_FIELD_PREFIX[catId]}.x${i}` })]),
  );
  const violations = validateStructure(manifestWith(onlyFive));
  const missing = violations.find((v) => v.code === 'MISSING_REQUIRED_CATEGORY');
  assert.ok(missing, 'expected MISSING_REQUIRED_CATEGORY');
  assert.equal(missing.categoryId, ALLOWED_CATEGORY_IDS[0]);
});

test('14. MISSING_REQUIRED_CATEGORY does not fire when all six categories are present', () => {
  const all = ALLOWED_CATEGORY_IDS.map((catId, i) =>
    category(catId, [baseField({ id: `${CATEGORY_FIELD_PREFIX[catId]}.x${i}` })]),
  );
  const violations = validateStructure(manifestWith(all));
  assert.ok(!violations.some((v) => v.code === 'MISSING_REQUIRED_CATEGORY'));
});

test('14. FIELD_VALUE_TYPE_MISMATCH fails closed when the value does not match the declared valueType', () => {
  const violations = validateStructure(
    singleFieldManifest({ valueType: 'boolean', value: 'not-a-boolean' }),
  );
  assert.ok(violations.some((v) => v.code === 'FIELD_VALUE_TYPE_MISMATCH'));
});

test('14. FIELD_VALUE_TYPE_MISMATCH does not fire when the value genuinely matches valueType', () => {
  for (const [valueType, value] of [
    ['string', 'a real string'],
    ['number', 42],
    ['boolean', true],
    ['array', ['a', 'b']],
    ['object', { k: 'v' }],
  ]) {
    const violations = validateStructure(singleFieldManifest({ valueType, value }));
    assert.ok(
      !violations.some((v) => v.code === 'FIELD_VALUE_TYPE_MISMATCH'),
      `expected valueType "${valueType}" with a matching value to pass`,
    );
  }
});

test('14. FIELD_VALUE_TYPE_MISMATCH does not fire when value is null (not-yet-provided is valid)', () => {
  const violations = validateStructure(singleFieldManifest({ valueType: 'boolean', value: null }));
  assert.ok(!violations.some((v) => v.code === 'FIELD_VALUE_TYPE_MISMATCH'));
});

test('14. FIELD_VALUE_FORMAT_MISMATCH fails closed when value does not match a recognized declared format', () => {
  const violations = validateStructure(
    singleFieldManifest({ valueType: 'string', format: 'email', value: 'not-an-email' }),
  );
  assert.ok(violations.some((v) => v.code === 'FIELD_VALUE_FORMAT_MISMATCH'));
});

test('14. FIELD_VALUE_FORMAT_MISMATCH does not fire when value genuinely matches a recognized format', () => {
  for (const [format, value] of [
    ['email', 'contact@example.com'],
    ['date', '2026-01-01'],
    ['date-time', '2026-01-01T00:00:00Z'],
    ['url', 'https://example.com/path'],
    ['uuid', '123e4567-e89b-12d3-a456-426614174000'],
  ]) {
    const violations = validateStructure(
      singleFieldManifest({ valueType: 'string', format, value }),
    );
    assert.ok(
      !violations.some((v) => v.code === 'FIELD_VALUE_FORMAT_MISMATCH'),
      `expected format "${format}" with a matching value to pass`,
    );
  }
});

test('14. an unrecognized format string is not itself a defect (no validator registered, no false positive)', () => {
  const violations = validateStructure(
    singleFieldManifest({
      valueType: 'string',
      format: 'not-a-registered-format',
      value: 'anything',
    }),
  );
  assert.ok(!violations.some((v) => v.code === 'FIELD_VALUE_FORMAT_MISMATCH'));
});

test('14. FIELD_INVALID_LAST_VERIFIED_FORMAT fails closed on a non-ISO-8601 lastVerified, structurally (any status)', () => {
  const violations = validateStructure(singleFieldManifest({ lastVerified: 'not-a-date' }));
  assert.ok(violations.some((v) => v.code === 'FIELD_INVALID_LAST_VERIFIED_FORMAT'));
});

test('14. FIELD_INVALID_LAST_VERIFIED_FORMAT does not fire when lastVerified is null or a valid date-time', () => {
  assert.ok(
    !validateStructure(singleFieldManifest({ lastVerified: null })).some(
      (v) => v.code === 'FIELD_INVALID_LAST_VERIFIED_FORMAT',
    ),
  );
  assert.ok(
    !validateStructure(singleFieldManifest({ lastVerified: '2026-01-01T00:00:00Z' })).some(
      (v) => v.code === 'FIELD_INVALID_LAST_VERIFIED_FORMAT',
    ),
  );
});

test('14. FIELD_APPROVAL_INVALID_APPROVED_AT fails closed on a non-ISO-8601 businessApproval.approvedAt', () => {
  const field = approvedField({
    id: 'business.x',
    businessApproval: { approvedBy: 'x', approvedAt: 'not-a-date', evidenceRef: 'y' },
  });
  const violations = validateStructure(manifestWith([category('business-identity', [field])]));
  assert.ok(violations.some((v) => v.code === 'FIELD_APPROVAL_INVALID_APPROVED_AT'));
});

test('14. FIELD_APPROVAL_INVALID_APPROVED_AT fails closed on a non-ISO-8601 legalApproval.approvedAt', () => {
  const field = approvedField({
    id: 'legal.x',
    legalApprovalRequired: true,
    legalApproval: { approvedBy: 'x', approvedAt: 'garbage', evidenceRef: 'y' },
  });
  const violations = validateStructure(manifestWith([category('legal-commercial-copy', [field])]));
  assert.ok(violations.some((v) => v.code === 'FIELD_APPROVAL_INVALID_APPROVED_AT'));
});

// --- 14. Binding consumption proof (validateBindingConsumption, real file reads) ---

test('14. BINDING_TARGET_FILE_NOT_FOUND fails closed when targetFile does not exist on disk', () => {
  const dir = tempDir();
  try {
    const binding = bindingFor({ id: 'business.x' }, { targetFile: 'does-not-exist.ts' });
    const violations = validateBindingConsumption(bindingsDoc([binding]), dir);
    assert.ok(violations.some((v) => v.code === 'BINDING_TARGET_FILE_NOT_FOUND'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('14. BINDING_IDENTIFIER_NOT_CONSUMED fails closed when the target file exists but does not contain the identifier', () => {
  const dir = tempDir();
  try {
    writeFileSync(join(dir, 'consumer.ts'), 'export const somethingElse = 1;\n');
    const binding = bindingFor(
      { id: 'business.x' },
      { targetFile: 'consumer.ts', bindingIdentifier: 'totallyUnrelated.token' },
    );
    const violations = validateBindingConsumption(bindingsDoc([binding]), dir);
    const found = violations.find((v) => v.code === 'BINDING_IDENTIFIER_NOT_CONSUMED');
    assert.ok(found);
    assert.match(found.message, /totallyUnrelated/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('14. validateBindingConsumption passes when the target file genuinely contains every identifier token', () => {
  const dir = tempDir();
  try {
    writeFileSync(
      join(dir, 'consumer.ts'),
      "export const siteContact = { email: 'x@example.com', phone: '+1' };\n",
    );
    const binding = bindingFor(
      { id: 'business.x' },
      { targetFile: 'consumer.ts', bindingIdentifier: 'siteContact.email, siteContact.phone' },
    );
    const violations = validateBindingConsumption(bindingsDoc([binding]), dir);
    assert.deepEqual(violations, []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('14. validateBindingConsumption skips consumption checking when targetFile is null (honestly unbound)', () => {
  const binding = bindingFor({ id: 'business.x' }, { targetFile: null, status: 'unbound' });
  const violations = validateBindingConsumption(bindingsDoc([binding]), tempDir());
  assert.deepEqual(violations, []);
});

test('14. validateBindingConsumption independently proves the real committed bindings are truthful', () => {
  const bindingPath = resolve(
    REPO_ROOT,
    'Project_Atlas_Team_Workspace/04_Planning/WPR-M1-SOURCE-BINDING-CONTRACT.json',
  );
  const bindingContract = loadJson(bindingPath, 'source-binding contract');
  const violations = validateBindingConsumption(bindingContract, REPO_ROOT);
  assert.deepEqual(
    violations,
    [],
    'every real binding that declares a targetFile must genuinely be found there',
  );
  const populated = bindingContract.bindings.filter((b) => b.targetFile);
  assert.equal(populated.length, 3, 'expected exactly the 3 currently-populated real bindings');
});

test('14. checkManifestReadiness wires consumption proof in when repoRoot is supplied, and the real manifest is unaffected', () => {
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
  const withRoot = checkManifestReadiness(manifest, bindingContract, REPO_ROOT);
  const withoutRoot = checkManifestReadiness(manifest, bindingContract);
  assert.deepEqual(
    withRoot.violations.map((v) => v.code).sort(),
    withoutRoot.violations.map((v) => v.code).sort(),
    'the real manifest has no consumption-proof findings either way (only the 2 known hardcoded-unapproved violations)',
  );
  assert.equal(withRoot.ready, false);
  assert.equal(withRoot.summary.violationCount, 2);
});

test('14. end-to-end regression: a fabricated binding claiming consumption of a file that does not say so is rejected', () => {
  const dir = tempDir();
  try {
    mkdirSync(join(dir, 'apps', 'web', 'src'), { recursive: true });
    writeFileSync(join(dir, 'apps', 'web', 'src', 'real.ts'), 'export const realExport = 1;\n');

    const field = approvedField({ id: 'business.x', sourceBinding: 'binding-business.x' });
    const binding = bindingFor(field, {
      targetFile: 'apps/web/src/real.ts',
      bindingIdentifier: 'fabricatedIdentifierNeverActuallyThere',
    });
    const violations = validateBindingConsumption(bindingsDoc([binding]), dir);
    assert.ok(violations.some((v) => v.code === 'BINDING_IDENTIFIER_NOT_CONSUMED'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// --- CLI argument parsing (unit-level, supports the section 10.1 item 3 gate) ---

test('parseCliArgs reads --manifest and --binding overrides', () => {
  const args = parseCliArgs(['--manifest', 'a.json', '--binding', 'b.json']);
  assert.deepEqual(args, { manifestPath: 'a.json', bindingPath: 'b.json' });
});

test('parseCliArgs defaults to null when no overrides are given', () => {
  assert.deepEqual(parseCliArgs([]), { manifestPath: null, bindingPath: null });
});
