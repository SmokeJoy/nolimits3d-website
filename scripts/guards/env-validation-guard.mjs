import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/*
 * Deterministic, fail-closed environment/secret-presence validator, matching
 * `AD-014` section 3.2's "provider/project identifiers and production
 * credentials supplied through approved secret paths" requirement and the
 * `WPR-M2` planning proposal's `WPR-M2f` scope (`PR #32`): "secret/env
 * validation tooling ... fails closed on missing/malformed required
 * environment variables."
 *
 * This guard is deliberately schema-driven and carries no built-in list of
 * "real" required variables -- which secrets a production deployment
 * actually needs is an infrastructure decision `BLK-BASE-001`/Codex Root
 * Architect Review has not yet made, and this self-scoped increment does not
 * invent one. Callers (a future, properly-issued `WPR-M2f` packet, or any
 * other caller) supply their own schema describing what they require; this
 * file only proves the fail-closed *mechanism* works, via a non-production
 * example schema (`env-schema.example.json`) and a dedicated test suite.
 *
 * Hand-implemented, no new dependency, mirroring
 * `scripts/guards/production-readiness-guard.mjs`'s existing convention
 * (pure check functions separate from I/O, closed-world allow-lists).
 *
 * Security note: this guard reports variable NAMES and violation reasons
 * only. It never prints an actual environment-variable VALUE anywhere (not
 * to stdout, not to a thrown error message) -- values may be real secrets
 * when this runs in a real environment, and a presence/format check has no
 * legitimate reason to disclose them.
 */

export const SCHEMA_VERSION = '1.0.0';
export const ALLOWED_VAR_TYPES = ['string', 'boolean', 'number', 'url'];

const SCHEMA_ROOT_KEYS = new Set(['$schemaVersion', 'purpose', 'variables']);
const VARIABLE_KEYS = new Set(['name', 'required', 'type', 'pattern', 'description']);
const VARIABLE_REQUIRED_KEYS = ['name', 'required', 'type'];
const VAR_NAME_PATTERN = /^[A-Z][A-Z0-9_]*$/;

/**
 * Validates the *structure* of a schema definition itself (not the
 * environment) -- closed-world key checks, well-formed variable entries,
 * unique names, valid declared types, and (if present) a syntactically valid
 * `pattern`. Returns `{ valid, errors }`; never throws on malformed input,
 * so a caller can report every structural problem at once.
 */
export function validateEnvSchema(schema) {
  const errors = [];

  if (schema === null || typeof schema !== 'object' || Array.isArray(schema)) {
    return { valid: false, errors: ['Schema root must be a JSON object'] };
  }

  const unknownRootKeys = Object.keys(schema).filter((key) => !SCHEMA_ROOT_KEYS.has(key));
  if (unknownRootKeys.length > 0) {
    errors.push(`Unknown root key(s): ${unknownRootKeys.join(', ')}`);
  }
  if (schema.$schemaVersion !== SCHEMA_VERSION) {
    errors.push(`$schemaVersion must be exactly "${SCHEMA_VERSION}"`);
  }
  if (!Array.isArray(schema.variables)) {
    errors.push('"variables" must be an array');
    return { valid: false, errors };
  }

  const seenNames = new Set();
  schema.variables.forEach((entry, index) => {
    const label = `variables[${index}]`;
    if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) {
      errors.push(`${label}: must be an object`);
      return;
    }
    const unknownKeys = Object.keys(entry).filter((key) => !VARIABLE_KEYS.has(key));
    if (unknownKeys.length > 0) {
      errors.push(`${label}: unknown key(s) ${unknownKeys.join(', ')}`);
    }
    for (const requiredKey of VARIABLE_REQUIRED_KEYS) {
      if (!(requiredKey in entry)) {
        errors.push(`${label}: missing required key "${requiredKey}"`);
      }
    }
    if (typeof entry.name !== 'string' || !VAR_NAME_PATTERN.test(entry.name)) {
      errors.push(
        `${label}: "name" must match ${VAR_NAME_PATTERN} (got ${JSON.stringify(entry.name)})`,
      );
    } else if (seenNames.has(entry.name)) {
      errors.push(`${label}: duplicate variable name "${entry.name}"`);
    } else {
      seenNames.add(entry.name);
    }
    if (typeof entry.required !== 'boolean') {
      errors.push(`${label}: "required" must be a boolean`);
    }
    if (!ALLOWED_VAR_TYPES.includes(entry.type)) {
      errors.push(
        `${label}: "type" must be one of ${ALLOWED_VAR_TYPES.join(', ')} (got ${JSON.stringify(entry.type)})`,
      );
    }
    if ('pattern' in entry) {
      if (typeof entry.pattern !== 'string') {
        errors.push(`${label}: "pattern" must be a string when present`);
      } else {
        try {
          new RegExp(entry.pattern);
        } catch {
          errors.push(`${label}: "pattern" is not a valid regular expression`);
        }
      }
    }
    if ('description' in entry && typeof entry.description !== 'string') {
      errors.push(`${label}: "description" must be a string when present`);
    }
  });

  return { valid: errors.length === 0, errors };
}

/** True if `raw` satisfies the declared `type` (does not enforce `pattern`; see `matchesFormat`). */
function matchesType(raw, type) {
  switch (type) {
    case 'string':
      return true; // any non-empty string is already guaranteed by the presence check
    case 'boolean':
      return raw === 'true' || raw === 'false';
    case 'number':
      return raw.trim() !== '' && Number.isFinite(Number(raw));
    case 'url':
      try {
        new URL(raw);
        return true;
      } catch {
        return false;
      }
    default:
      return false;
  }
}

/**
 * Checks a plain environment-like object (e.g. `process.env`) against a
 * schema already known to be structurally valid (call `validateEnvSchema`
 * first). Returns `{ ready, violations }`; `violations` never contains the
 * actual variable value, only its name and the reason it failed.
 */
export function checkEnv(schema, env) {
  const violations = [];

  for (const variable of schema.variables) {
    const raw = env[variable.name];
    const present = typeof raw === 'string' && raw.length > 0;

    if (!present) {
      if (variable.required) {
        violations.push(`${variable.name}: required but missing or empty`);
      }
      continue; // an absent optional variable is not a violation
    }

    if (!matchesType(raw, variable.type)) {
      violations.push(`${variable.name}: does not match declared type "${variable.type}"`);
      continue;
    }

    if (variable.pattern) {
      const regex = new RegExp(variable.pattern);
      if (!regex.test(raw)) {
        violations.push(`${variable.name}: does not match declared pattern`);
      }
    }
  }

  return { ready: violations.length === 0, violations };
}

/** Reads and parses a schema file, failing loudly (but without leaking any env value) on a missing or malformed file. */
export function loadSchema(schemaPath) {
  if (!existsSync(schemaPath)) {
    throw new Error(`No env schema at ${schemaPath}`);
  }
  const raw = readFileSync(schemaPath, 'utf8');
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (cause) {
    throw new Error(`Env schema at ${schemaPath} is not valid JSON`, { cause });
  }
  const { valid, errors } = validateEnvSchema(parsed);
  if (!valid) {
    throw new Error(`Env schema at ${schemaPath} is structurally invalid: ${errors.join('; ')}`);
  }
  return parsed;
}

/** Parses `--schema <path>` from argv; throws with a usage message if absent. */
export function parseCliArgs(argv) {
  const schemaIndex = argv.indexOf('--schema');
  if (schemaIndex === -1 || argv[schemaIndex + 1] === undefined) {
    throw new Error('Usage: env-validation-guard.mjs --schema <path-to-env-schema.json>');
  }
  return { schemaPath: argv[schemaIndex + 1] };
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  let schemaPath;
  try {
    ({ schemaPath } = parseCliArgs(process.argv.slice(2)));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const resolvedSchemaPath = resolve(dirname(fileURLToPath(import.meta.url)), '../..', schemaPath);
  let schema;
  try {
    schema = loadSchema(resolvedSchemaPath);
  } catch (err) {
    console.error(`Env validation guard: FAIL -- ${err.message}`);
    process.exit(1);
  }

  const { ready, violations } = checkEnv(schema, process.env);
  if (!ready) {
    console.error(`Env validation guard: ${violations.length} violation(s):`);
    for (const violation of violations) {
      console.error(`  - ${violation}`);
    }
    console.error('Env validation guard: FAIL');
    process.exit(1);
  }
  console.log('Env validation guard: PASS -- every declared variable satisfies its schema.');
}
