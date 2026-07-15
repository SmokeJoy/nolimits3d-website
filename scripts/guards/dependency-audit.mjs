import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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

async function runAudit() {
  const pnpmCommand =
    process.platform === 'win32'
      ? {
          executable: process.env.ComSpec,
          arguments: ['/d', '/s', '/c', 'pnpm list --json --depth Infinity'],
        }
      : { executable: 'pnpm', arguments: ['list', '--json', '--depth', 'Infinity'] };
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
  console.log(`Dependency audit counts: ${JSON.stringify(summary.counts)}`);
  for (const advisory of summary.advisories) {
    console.log(`[${advisory.severity}] ${advisory.name}: ${advisory.title} (${advisory.url})`);
  }

  if (summary.counts.critical > 0 || summary.counts.high > 0) {
    throw new Error('Critical/High dependency advisories block M-001');
  }
  if (summary.counts.moderate > 0) {
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
