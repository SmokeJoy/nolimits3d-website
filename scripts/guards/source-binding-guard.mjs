import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const expectedOrder = [
  'documentation-bible',
  'development-playbook',
  'development-blueprint',
  'sprint-plan',
];

function normalizedSha256(path) {
  const content = readFileSync(path, 'utf8').replaceAll('\r\n', '\n');
  return createHash('sha256').update(content).digest('hex');
}

export function validateBindings(root) {
  const bindingPath = resolve(root, 'docs/source-bindings/project-sources.json');
  const document = JSON.parse(readFileSync(bindingPath, 'utf8'));
  const failures = [];

  if (document.production_effective !== false || document.production_blocker !== 'BLK-BASE-001') {
    failures.push('Production binding must remain disabled by BLK-BASE-001');
  }

  if (JSON.stringify(document.authority_order) !== JSON.stringify(expectedOrder)) {
    failures.push('Authority order differs from Bible -> Playbook -> Blueprint -> Sprint Plan');
  }

  for (const binding of document.bindings ?? []) {
    if (binding.path.includes('docs/source-bindings/')) {
      failures.push(`${binding.id}: source binding points to a parallel copy`);
      continue;
    }

    const sourcePath = resolve(root, binding.path);
    if (!existsSync(sourcePath)) {
      failures.push(`${binding.id}: missing source ${binding.path}`);
      continue;
    }

    const actual = normalizedSha256(sourcePath);
    if (actual !== binding.sha256_lf) {
      failures.push(`${binding.id}: expected ${binding.sha256_lf}, received ${actual}`);
    }
  }

  if ((document.bindings ?? []).length !== expectedOrder.length) {
    failures.push('Source binding set is incomplete');
  }

  return failures;
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const failures = validateBindings(process.cwd());
  if (failures.length > 0) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
  console.log('Documentation source-binding guard: PASS');
}
