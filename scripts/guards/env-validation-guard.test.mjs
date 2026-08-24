import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  ALLOWED_VAR_TYPES,
  checkEnv,
  loadSchema,
  parseCliArgs,
  SCHEMA_VERSION,
  validateEnvSchema,
} from './env-validation-guard.mjs';

/*
 * Dedicated tests for scripts/guards/env-validation-guard.mjs, this
 * self-scoped WPR-M2f increment's own artifact. Every fixture below is
 * synthetic and clearly non-production (EXAMPLE_FIXTURE_* naming), never
 * represented as a real required secret.
 */

const GUARD_PATH = fileURLToPath(new URL('./env-validation-guard.mjs', import.meta.url));

function tempDir() {
  return mkdtempSync(join(tmpdir(), 'wpr-m2f-env-guard-'));
}

function validSchema(overrides = {}) {
  return {
    $schemaVersion: SCHEMA_VERSION,
    purpose: 'test fixture',
    variables: [
      { name: 'EXAMPLE_FIXTURE_URL', required: true, type: 'url' },
      { name: 'EXAMPLE_FIXTURE_FLAG', required: false, type: 'boolean' },
    ],
    ...overrides,
  };
}

test('ALLOWED_VAR_TYPES is the expected closed set', () => {
  assert.deepEqual(ALLOWED_VAR_TYPES, ['string', 'boolean', 'number', 'url']);
});

test('validateEnvSchema: accepts a well-formed schema', () => {
  const { valid, errors } = validateEnvSchema(validSchema());
  assert.equal(valid, true);
  assert.deepEqual(errors, []);
});

test('validateEnvSchema: rejects non-object root', () => {
  assert.equal(validateEnvSchema(null).valid, false);
  assert.equal(validateEnvSchema([]).valid, false);
  assert.equal(validateEnvSchema('nope').valid, false);
});

test('validateEnvSchema: rejects wrong or missing $schemaVersion', () => {
  const { valid, errors } = validateEnvSchema(validSchema({ $schemaVersion: '9.9.9' }));
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.includes('$schemaVersion')));
});

test('validateEnvSchema: rejects unknown root key', () => {
  const { valid, errors } = validateEnvSchema({ ...validSchema(), extra: true });
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.includes('Unknown root key')));
});

test('validateEnvSchema: rejects non-array variables', () => {
  const { valid, errors } = validateEnvSchema(validSchema({ variables: 'nope' }));
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.includes('"variables" must be an array')));
});

test('validateEnvSchema: rejects a non-object variable entry', () => {
  const { valid, errors } = validateEnvSchema(validSchema({ variables: ['nope'] }));
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.includes('variables[0]: must be an object')));
});

test('validateEnvSchema: rejects unknown variable key', () => {
  const schema = validSchema({
    variables: [{ name: 'EXAMPLE_FIXTURE_URL', required: true, type: 'url', bogus: 1 }],
  });
  const { valid, errors } = validateEnvSchema(schema);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.includes('unknown key(s) bogus')));
});

test('validateEnvSchema: rejects a variable missing a required key', () => {
  const schema = validSchema({ variables: [{ name: 'EXAMPLE_FIXTURE_URL', type: 'url' }] });
  const { valid, errors } = validateEnvSchema(schema);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.includes('missing required key "required"')));
});

test('validateEnvSchema: rejects a malformed variable name', () => {
  const schema = validSchema({
    variables: [{ name: 'example_fixture_lowercase', required: true, type: 'string' }],
  });
  const { valid, errors } = validateEnvSchema(schema);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.includes('"name" must match')));
});

test('validateEnvSchema: rejects a duplicate variable name', () => {
  const schema = validSchema({
    variables: [
      { name: 'EXAMPLE_FIXTURE_URL', required: true, type: 'url' },
      { name: 'EXAMPLE_FIXTURE_URL', required: false, type: 'string' },
    ],
  });
  const { valid, errors } = validateEnvSchema(schema);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.includes('duplicate variable name')));
});

test('validateEnvSchema: rejects non-boolean "required"', () => {
  const schema = validSchema({
    variables: [{ name: 'EXAMPLE_FIXTURE_URL', required: 'yes', type: 'url' }],
  });
  const { valid, errors } = validateEnvSchema(schema);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.includes('"required" must be a boolean')));
});

test('validateEnvSchema: rejects an unlisted "type"', () => {
  const schema = validSchema({
    variables: [{ name: 'EXAMPLE_FIXTURE_URL', required: true, type: 'regex-of-doom' }],
  });
  const { valid, errors } = validateEnvSchema(schema);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.includes('"type" must be one of')));
});

test('validateEnvSchema: rejects an invalid "pattern" regex', () => {
  const schema = validSchema({
    variables: [{ name: 'EXAMPLE_FIXTURE_URL', required: true, type: 'string', pattern: '(' }],
  });
  const { valid, errors } = validateEnvSchema(schema);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.includes('not a valid regular expression')));
});

test('validateEnvSchema: rejects non-string "description"', () => {
  const schema = validSchema({
    variables: [{ name: 'EXAMPLE_FIXTURE_URL', required: true, type: 'string', description: 42 }],
  });
  const { valid, errors } = validateEnvSchema(schema);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.includes('"description" must be a string')));
});

test('checkEnv: required + present + valid -> no violation', () => {
  const schema = validSchema({
    variables: [{ name: 'EXAMPLE_FIXTURE_URL', required: true, type: 'url' }],
  });
  const { ready, violations } = checkEnv(schema, { EXAMPLE_FIXTURE_URL: 'https://example.test' });
  assert.equal(ready, true);
  assert.deepEqual(violations, []);
});

test('checkEnv: required + missing -> violation', () => {
  const schema = validSchema({
    variables: [{ name: 'EXAMPLE_FIXTURE_URL', required: true, type: 'url' }],
  });
  const { ready, violations } = checkEnv(schema, {});
  assert.equal(ready, false);
  assert.equal(violations.length, 1);
  assert.match(violations[0], /required but missing or empty/);
});

test('checkEnv: required + empty string -> violation', () => {
  const schema = validSchema({
    variables: [{ name: 'EXAMPLE_FIXTURE_URL', required: true, type: 'string' }],
  });
  const { ready, violations } = checkEnv(schema, { EXAMPLE_FIXTURE_URL: '' });
  assert.equal(ready, false);
  assert.match(violations[0], /required but missing or empty/);
});

test('checkEnv: optional + missing -> no violation', () => {
  const schema = validSchema({
    variables: [{ name: 'EXAMPLE_FIXTURE_FLAG', required: false, type: 'boolean' }],
  });
  const { ready, violations } = checkEnv(schema, {});
  assert.equal(ready, true);
  assert.deepEqual(violations, []);
});

test('checkEnv: type "boolean" accepts only literal true/false', () => {
  const schema = validSchema({
    variables: [{ name: 'EXAMPLE_FIXTURE_FLAG', required: true, type: 'boolean' }],
  });
  assert.equal(checkEnv(schema, { EXAMPLE_FIXTURE_FLAG: 'true' }).ready, true);
  assert.equal(checkEnv(schema, { EXAMPLE_FIXTURE_FLAG: 'false' }).ready, true);
  assert.equal(checkEnv(schema, { EXAMPLE_FIXTURE_FLAG: 'yes' }).ready, false);
});

test('checkEnv: type "number" accepts only finite numeric strings', () => {
  const schema = validSchema({
    variables: [{ name: 'EXAMPLE_FIXTURE_COUNT', required: true, type: 'number' }],
  });
  assert.equal(checkEnv(schema, { EXAMPLE_FIXTURE_COUNT: '42' }).ready, true);
  assert.equal(checkEnv(schema, { EXAMPLE_FIXTURE_COUNT: '3.14' }).ready, true);
  assert.equal(checkEnv(schema, { EXAMPLE_FIXTURE_COUNT: 'NaN' }).ready, false);
  assert.equal(checkEnv(schema, { EXAMPLE_FIXTURE_COUNT: 'not-a-number' }).ready, false);
});

test('checkEnv: type "url" accepts only parseable URLs', () => {
  const schema = validSchema({
    variables: [{ name: 'EXAMPLE_FIXTURE_URL', required: true, type: 'url' }],
  });
  assert.equal(checkEnv(schema, { EXAMPLE_FIXTURE_URL: 'https://example.test/path' }).ready, true);
  assert.equal(checkEnv(schema, { EXAMPLE_FIXTURE_URL: 'not a url' }).ready, false);
});

test('checkEnv: "pattern" is enforced in addition to "type"', () => {
  const schema = validSchema({
    variables: [
      { name: 'EXAMPLE_FIXTURE_CODE', required: true, type: 'string', pattern: '^[0-9]{4}$' },
    ],
  });
  assert.equal(checkEnv(schema, { EXAMPLE_FIXTURE_CODE: '1234' }).ready, true);
  assert.equal(checkEnv(schema, { EXAMPLE_FIXTURE_CODE: 'abcd' }).ready, false);
});

test('checkEnv: multiple variables report every violation, not just the first', () => {
  const schema = validSchema({
    variables: [
      { name: 'EXAMPLE_FIXTURE_A', required: true, type: 'string' },
      { name: 'EXAMPLE_FIXTURE_B', required: true, type: 'number' },
    ],
  });
  const { ready, violations } = checkEnv(schema, { EXAMPLE_FIXTURE_B: 'not-a-number' });
  assert.equal(ready, false);
  assert.equal(violations.length, 2);
});

test('checkEnv: violation messages never contain the actual variable value', () => {
  const schema = validSchema({
    variables: [{ name: 'EXAMPLE_FIXTURE_SECRET', required: true, type: 'number' }],
  });
  const secretLookingValue = 'fixture-value-must-not-appear-in-guard-output-9f8e7d6c';
  const { violations } = checkEnv(schema, { EXAMPLE_FIXTURE_SECRET: secretLookingValue });
  for (const violation of violations) {
    assert.ok(
      !violation.includes(secretLookingValue),
      'violation message must not contain the raw value',
    );
  }
});

test('loadSchema: throws with the path when the file is missing', () => {
  const dir = tempDir();
  try {
    assert.throws(() => loadSchema(join(dir, 'missing.json')), /No env schema at/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('loadSchema: throws on malformed JSON', () => {
  const dir = tempDir();
  const path = join(dir, 'bad.json');
  writeFileSync(path, '{ not json', 'utf8');
  try {
    assert.throws(() => loadSchema(path), /not valid JSON/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('loadSchema: throws on a structurally invalid schema', () => {
  const dir = tempDir();
  const path = join(dir, 'invalid.json');
  writeFileSync(
    path,
    JSON.stringify({ $schemaVersion: SCHEMA_VERSION, variables: 'nope' }),
    'utf8',
  );
  try {
    assert.throws(() => loadSchema(path), /structurally invalid/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('loadSchema: loads and returns a valid schema file', () => {
  const dir = tempDir();
  const path = join(dir, 'valid.json');
  writeFileSync(path, JSON.stringify(validSchema()), 'utf8');
  try {
    const loaded = loadSchema(path);
    assert.equal(loaded.$schemaVersion, SCHEMA_VERSION);
    assert.equal(loaded.variables.length, 2);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('parseCliArgs: extracts --schema value', () => {
  assert.deepEqual(parseCliArgs(['--schema', 'foo.json']), { schemaPath: 'foo.json' });
});

test('parseCliArgs: throws a usage message when --schema is absent', () => {
  assert.throws(() => parseCliArgs([]), /Usage: env-validation-guard\.mjs --schema/);
});

test('parseCliArgs: throws a usage message when --schema has no value', () => {
  assert.throws(() => parseCliArgs(['--schema']), /Usage: env-validation-guard\.mjs --schema/);
});

test('CLI: exits 0 and prints PASS when the environment satisfies the schema', () => {
  const dir = tempDir();
  const schemaPath = join(dir, 'schema.json');
  writeFileSync(
    schemaPath,
    JSON.stringify(
      validSchema({ variables: [{ name: 'EXAMPLE_FIXTURE_URL', required: true, type: 'url' }] }),
    ),
    'utf8',
  );
  try {
    const output = execFileSync('node', [GUARD_PATH, '--schema', schemaPath], {
      encoding: 'utf8',
      env: { ...process.env, EXAMPLE_FIXTURE_URL: 'https://example.test' },
    });
    assert.match(output, /PASS/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('CLI: exits 1, reports the violation, and never leaks the offending value', () => {
  const dir = tempDir();
  const schemaPath = join(dir, 'schema.json');
  writeFileSync(
    schemaPath,
    JSON.stringify(
      validSchema({ variables: [{ name: 'EXAMPLE_FIXTURE_URL', required: true, type: 'url' }] }),
    ),
    'utf8',
  );
  const secretLookingValue = 'fixture-value-must-not-appear-in-guard-output-9f8e7d6c';
  try {
    execFileSync('node', [GUARD_PATH, '--schema', schemaPath], {
      encoding: 'utf8',
      env: { ...process.env, EXAMPLE_FIXTURE_URL: secretLookingValue },
    });
    assert.fail('expected the guard to exit non-zero');
  } catch (err) {
    assert.equal(err.status, 1);
    const combined = `${err.stdout ?? ''}${err.stderr ?? ''}`;
    assert.match(combined, /FAIL/);
    assert.match(combined, /EXAMPLE_FIXTURE_URL/);
    assert.ok(!combined.includes(secretLookingValue), 'CLI output must not contain the raw value');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('CLI: exits 1 with a usage message when --schema is omitted', () => {
  try {
    execFileSync('node', [GUARD_PATH], { encoding: 'utf8' });
    assert.fail('expected the guard to exit non-zero');
  } catch (err) {
    assert.equal(err.status, 1);
    assert.match(err.stderr, /Usage: env-validation-guard\.mjs --schema/);
  }
});

test('CLI: exits 1 when the schema file does not exist', () => {
  const dir = tempDir();
  try {
    execFileSync('node', [GUARD_PATH, '--schema', join(dir, 'nope.json')], { encoding: 'utf8' });
    assert.fail('expected the guard to exit non-zero');
  } catch (err) {
    assert.equal(err.status, 1);
    assert.match(err.stderr, /No env schema at/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('the committed example schema is itself structurally valid', () => {
  const examplePath = fileURLToPath(new URL('./env-schema.example.json', import.meta.url));
  const schema = loadSchema(examplePath); // throws if structurally invalid
  assert.ok(schema.purpose.toLowerCase().includes('non-production'));
});
