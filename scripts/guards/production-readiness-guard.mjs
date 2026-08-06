import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/*
 * Enforces `AD-014` section 3.2: "The production-readiness guard must fail
 * closed when any launch-required field remains missing, uses a placeholder
 * marker, lacks provenance/rights approval, or has not received the required
 * business/legal approval." Reads the WPR-M1 client-data manifest
 * (`Project_Atlas_Team_Workspace/04_Planning/CLIENT_DATA_MANIFEST.json`) and
 * reports every required field that has not reached `approved` status.
 *
 * This is deliberately not wired into the day-to-day gate battery -- nothing
 * is launching yet, and every field is expected to read `missing` until
 * Andrea supplies real data (`WPR-M5`). It exists so a future launch-
 * readiness check has a real, fail-closed mechanism to run instead of a
 * manual review, matching the exact wording of the requirement above.
 */
export const READY_STATUS = 'approved';

/** Pure check -- given an already-parsed manifest object, lists unmet required fields. */
export function checkManifest(manifest) {
  const violations = [];
  for (const category of manifest.categories ?? []) {
    for (const field of category.fields ?? []) {
      if (!field.required) continue;
      if (field.status !== READY_STATUS) {
        violations.push(
          `${category.id}.${field.id}: status "${field.status}" (needs "${READY_STATUS}") -- ${field.label}`,
        );
      }
    }
  }
  return { ready: violations.length === 0, violations };
}

/** Reads and parses the manifest file, failing loudly on a missing or malformed file. */
export function loadManifest(manifestPath) {
  if (!existsSync(manifestPath)) {
    throw new Error(`No client-data manifest at ${manifestPath}`);
  }
  const raw = readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(raw);
  if (!Array.isArray(manifest.categories)) {
    throw new Error(`Manifest at ${manifestPath} is malformed: missing "categories" array`);
  }
  return manifest;
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const manifestPath = resolve(
    dirname(fileURLToPath(import.meta.url)),
    '../../Project_Atlas_Team_Workspace/04_Planning/CLIENT_DATA_MANIFEST.json',
  );
  const manifest = loadManifest(manifestPath);
  const { ready, violations } = checkManifest(manifest);

  if (!ready) {
    console.error(
      `Production readiness guard: ${violations.length} required field(s) not yet approved:`,
    );
    for (const violation of violations) {
      console.error(`  - ${violation}`);
    }
    console.error(
      'Production readiness guard: FAIL (expected before WPR-M5 -- not a build blocker)',
    );
    process.exit(1);
  }
  console.log('Production readiness guard: PASS -- every required field is approved.');
}
