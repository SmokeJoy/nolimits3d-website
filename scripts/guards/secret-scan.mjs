import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const directPatterns = [
  ['private-key', /-----BEGIN (?:EC |OPENSSH |PGP |RSA )?PRIVATE KEY-----/g],
  ['aws-access-key', /AKIA[0-9A-Z]{16}/g],
  ['github-token', /(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,})/g],
  ['openai-key', /sk-(?:proj-)?[A-Za-z0-9_-]{20,}/g],
  ['slack-token', /xox[baprs]-[A-Za-z0-9-]{20,}/g],
  ['supabase-secret-key', /sb_secret_[A-Za-z0-9_-]{20,}/g],
];

const allowedValueMarkers = [
  'env(',
  'example',
  'import.meta.env',
  'local-',
  'placeholder',
  'process.env',
  '${',
  '${{',
];

export function scanText(path, content) {
  const findings = [];

  for (const [name, pattern] of directPatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(content)) findings.push(`${path}: ${name}`);
  }

  for (const [index, line] of content.split(/\r?\n/u).entries()) {
    if (line.trimStart().startsWith('#')) continue;
    const assignment = line.match(
      /^\s*(?:"([^"]+)"|'([^']+)'|([A-Za-z0-9_.-]+))\s*[:=]\s*(.*?)\s*,?\s*$/u,
    );
    if (!assignment) continue;

    const key = assignment[1] ?? assignment[2] ?? assignment[3];
    const keyLower = key.toLowerCase();
    const uppercaseCredential =
      /^[A-Z0-9_]+$/u.test(key) && /(?:SECRET|TOKEN|PASSWORD|API_KEY|PRIVATE_KEY)$/u.test(key);
    const configCredential =
      /(?:^|[_.-])(?:secret(?:[_-]key)?|password|api[_-]?key|private[_-]?key|auth[_-]?token|access[_-]?token|service[_-]?role[_-]?key)$/u.test(
        keyLower,
      );
    if (!uppercaseCredential && !configCredential) continue;

    const value = assignment[4]
      .trim()
      .replace(/^['"]|['"]$/gu, '')
      .toLowerCase();
    const isPlaceholder =
      value.length === 0 || allowedValueMarkers.some((marker) => value.includes(marker));
    if (!isPlaceholder) findings.push(`${path}:${index + 1}: non-placeholder secret assignment`);
  }

  return findings;
}

function isTechnicalPath(path) {
  return (
    [
      '.github/',
      'apps/',
      'docs/source-bindings/',
      'packages/',
      'scripts/guards/',
      'supabase/',
    ].some((prefix) => path.startsWith(prefix)) ||
    [
      '.env.example',
      'eslint.config.js',
      'package.json',
      'pnpm-lock.yaml',
      'pnpm-workspace.yaml',
    ].includes(path)
  );
}

function trackedAndUntrackedFiles() {
  const result = spawnSync(
    'git',
    ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
    {
      encoding: 'buffer',
    },
  );
  if (result.status !== 0) throw new Error(result.stderr.toString('utf8').trim());
  return result.stdout
    .toString('utf8')
    .split('\0')
    .filter(Boolean)
    .map((path) => path.replaceAll('\\', '/'));
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const findings = [];
  for (const path of trackedAndUntrackedFiles().filter(isTechnicalPath)) {
    const content = readFileSync(path);
    if (content.includes(0) || content.length > 2_000_000) continue;
    findings.push(...scanText(path, content.toString('utf8')));
  }

  if (findings.length > 0) {
    console.error(findings.join('\n'));
    process.exit(1);
  }
  console.log('Secret scan fallback: PASS');
}
