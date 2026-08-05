import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const waiverPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../Project_Atlas_Team_Workspace/00_Governance/Tooling/DEPENDENCY_WAIVERS.json',
);

export function advisoryId(url) {
  const match = /GHSA-[a-z0-9-]+/i.exec(url ?? '');
  return match ? match[0] : null;
}

/* A waiver may never cover a critical advisory, and may never be open-ended.
   Without these two bounds a one-line JSON edit silences anything, forever. */
export const UNWAIVABLE_SEVERITIES = new Set(['critical']);
export const MAX_WAIVER_DAYS = 180;

export function validateWaiver(waiver) {
  for (const field of ['advisory', 'package', 'severity', 'reason', 'owner', 'opened', 'expires']) {
    if (typeof waiver[field] !== 'string' || waiver[field].trim() === '') {
      throw new Error(`Waiver for ${waiver.advisory ?? '(unnamed)'} is missing "${field}"`);
    }
  }
  if (UNWAIVABLE_SEVERITIES.has(waiver.severity)) {
    throw new Error(
      `Waiver ${waiver.advisory} claims severity "${waiver.severity}", which cannot be waived`,
    );
  }
  const opened = Date.parse(waiver.opened);
  const expires = Date.parse(waiver.expires);
  if (Number.isNaN(opened))
    throw new Error(`Waiver ${waiver.advisory} has an unparseable "opened"`);
  if (Number.isNaN(expires)) {
    throw new Error(`Waiver ${waiver.advisory} has an unparseable expiry "${waiver.expires}"`);
  }
  if (expires <= opened) {
    throw new Error(`Waiver ${waiver.advisory} expires on or before the day it was opened`);
  }
  const days = (expires - opened) / 86_400_000;
  if (days > MAX_WAIVER_DAYS) {
    throw new Error(
      `Waiver ${waiver.advisory} runs ${Math.round(days)} days; the maximum horizon is ${MAX_WAIVER_DAYS}`,
    );
  }
  return waiver;
}

export function loadWaivers(path) {
  let raw;
  try {
    raw = readFileSync(path, 'utf8');
  } catch {
    return [];
  }
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed.waivers)) throw new Error('Waiver file must expose a waivers array');
  return parsed.waivers.map(validateWaiver);
}

// An advisory is tolerated only while a matching, unexpired waiver exists. Expired waivers
// block, and waivers matching nothing are surfaced so the file cannot quietly rot.
export function applyWaivers(advisories, waivers, now) {
  const blocking = [];
  const waived = [];
  const expired = [];
  const used = new Set();

  for (const advisory of advisories) {
    const id = advisoryId(advisory.url);
    const waiver = waivers.find(
      (entry) => entry.advisory === id && entry.package === advisory.name,
    );
    // The live severity wins over whatever the waiver claims: a package that
    // escalates to critical after the waiver was written must block again.
    if (!waiver || UNWAIVABLE_SEVERITIES.has(advisory.severity)) {
      blocking.push(advisory);
      continue;
    }
    used.add(waiver.advisory);
    if (Date.parse(waiver.expires) < now.getTime()) {
      expired.push({ ...advisory, waiver });
      blocking.push(advisory);
      continue;
    }
    waived.push({ ...advisory, waiver });
  }

  const stale = waivers.filter((entry) => !used.has(entry.advisory));
  const counts = { critical: 0, high: 0, moderate: 0, low: 0, info: 0, unknown: 0 };
  for (const advisory of blocking) counts[advisory.severity] += 1;

  return { blocking, waived, expired, stale, counts };
}

const dependencyKeys = [
  'dependencies',
  'devDependencies',
  'optionalDependencies',
  'unsavedDependencies',
];

export function collectRegistryVersions(projects) {
  const packages = new Map();
  const visited = new WeakSet();

  function visitDependencies(container) {
    if (!container || typeof container !== 'object' || visited.has(container)) return;
    visited.add(container);

    for (const key of dependencyKeys) {
      const dependencies = container[key];
      if (!dependencies || typeof dependencies !== 'object') continue;

      for (const [name, dependency] of Object.entries(dependencies)) {
        if (!dependency || typeof dependency !== 'object') continue;
        if (
          typeof dependency.version === 'string' &&
          dependency.resolved?.startsWith('https://registry.npmjs.org/')
        ) {
          const versions = packages.get(name) ?? new Set();
          versions.add(dependency.version);
          packages.set(name, versions);
        }
        visitDependencies(dependency);
      }
    }
  }

  for (const project of projects) visitDependencies(project);
  return Object.fromEntries(
    [...packages.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([name, versions]) => [name, [...versions].sort()]),
  );
}

export function summarizeAdvisories(response) {
  const counts = { critical: 0, high: 0, moderate: 0, low: 0, info: 0, unknown: 0 };
  const advisories = [];

  for (const [name, packageAdvisories] of Object.entries(response)) {
    if (!Array.isArray(packageAdvisories)) throw new Error(`Invalid advisory response for ${name}`);
    for (const advisory of packageAdvisories) {
      const severity = advisory.severity === 'medium' ? 'moderate' : advisory.severity;
      const bucket = Object.hasOwn(counts, severity) ? severity : 'unknown';
      counts[bucket] += 1;
      advisories.push({ name, severity: bucket, title: advisory.title, url: advisory.url });
    }
  }

  return { advisories, counts };
}

/* Exported so the --recursive flag is pinned by a test. Dropping it silently
   shrinks the audit from the whole workspace to the root project alone, which
   is exactly how BLK-M002-001 went unnoticed. */
export function buildListCommand(platform) {
  return platform === 'win32'
    ? {
        executable: process.env.ComSpec,
        arguments: ['/d', '/s', '/c', 'pnpm list --recursive --json --depth Infinity'],
      }
    : {
        executable: 'pnpm',
        arguments: ['list', '--recursive', '--json', '--depth', 'Infinity'],
      };
}

async function runAudit() {
  const pnpmCommand = buildListCommand(process.platform);
  const list = spawnSync(pnpmCommand.executable, pnpmCommand.arguments, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });
  if (list.status !== 0) throw new Error(`pnpm list failed: ${list.stderr.trim()}`);

  const payload = collectRegistryVersions(JSON.parse(list.stdout));
  if (Object.keys(payload).length === 0)
    throw new Error('Dependency tree is empty; audit fails closed');

  const response = await fetch('https://registry.npmjs.org/-/npm/v1/security/advisories/bulk', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`npm bulk advisory endpoint returned HTTP ${response.status}`);

  const summary = summarizeAdvisories(await response.json());
  const audited = Object.keys(payload).length;
  const gate = applyWaivers(summary.advisories, loadWaivers(waiverPath), new Date());

  console.log(`Dependency audit scope: ${audited} registry packages across the workspace`);
  console.log(`Dependency audit counts: ${JSON.stringify(gate.counts)}`);
  for (const advisory of gate.blocking) {
    console.log(`[${advisory.severity}] ${advisory.name}: ${advisory.title} (${advisory.url})`);
  }
  for (const advisory of gate.waived) {
    console.log(
      `[waived until ${advisory.waiver.expires}] ${advisory.name}: ${advisory.title} (${advisory.url})`,
    );
  }
  for (const advisory of gate.expired) {
    console.log(`[WAIVER EXPIRED ${advisory.waiver.expires}] ${advisory.name}: ${advisory.title}`);
  }
  for (const waiver of gate.stale) {
    console.log(`[stale waiver] ${waiver.advisory} for ${waiver.package} matches no advisory`);
  }

  if (gate.expired.length > 0) {
    throw new Error('A dependency waiver has expired; renew it or fix the advisory');
  }
  if (gate.counts.critical > 0 || gate.counts.high > 0) {
    throw new Error('Critical/High dependency advisories block M-001');
  }
  if (gate.counts.moderate > 0) {
    throw new Error('Moderate advisories require review and a time-bound approved waiver');
  }
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  runAudit().catch((error) => {
    console.error(`Dependency audit failed closed: ${error.message}`);
    process.exit(1);
  });
}
