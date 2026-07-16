import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const textExtensions = new Set([
  '.cjs',
  '.html',
  '.js',
  '.jsx',
  '.json',
  '.md',
  '.mjs',
  '.ts',
  '.tsx',
]);
const sourceExtensions = new Set(['.cjs', '.js', '.jsx', '.mjs', '.ts', '.tsx']);

function withoutSourceComments(content) {
  return content.replace(/\/\*[\s\S]*?\*\//gu, '').replace(/^\s*\/\/.*$/gmu, '');
}

function walk(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return walk(path);
    return entry.isFile() && textExtensions.has(extname(entry.name).toLowerCase()) ? [path] : [];
  });
}

export function scanScope(root) {
  const violations = [];
  const forbiddenApps = ['admin', 'api', 'worker'];

  for (const app of forbiddenApps) {
    if (existsSync(resolve(root, 'apps', app))) {
      violations.push(`Forbidden M-001 application exists: apps/${app}`);
    }
  }

  const appsRoot = resolve(root, 'apps');
  for (const path of walk(appsRoot)) {
    const rel = relative(root, path).replaceAll('\\', '/');
    const relLower = rel.toLowerCase();
    const content = readFileSync(path, 'utf8');
    const guardContent = sourceExtensions.has(extname(path).toLowerCase())
      ? withoutSourceComments(content)
      : content;
    const contentLower = guardContent.toLowerCase();

    if (contentLower.includes('jarvis')) {
      violations.push(
        `${rel}: Jarvis implementation/reference is forbidden in M-001 application code`,
      );
    }

    if (contentLower.includes('printflow') && !/coming[\s-]+soon/i.test(guardContent)) {
      violations.push(`${rel}: PrintFlow may only be represented as Coming Soon`);
    }

    const publicOrAccount =
      relLower.includes('/routes/public/') || relLower.includes('/routes/account/');
    const navigationSurface = /(?:nav|menu|sitemap|public-routes?)/i.test(rel);
    const commandReference = /(?:routes\/command|['"`]\/command(?:[/'"`?#]|$))/i.test(guardContent);

    if ((publicOrAccount || navigationSurface) && commandReference) {
      violations.push(
        `${rel}: private command route is exposed from a public/account navigation surface`,
      );
    }
  }

  return violations;
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const violations = scanScope(process.cwd());
  if (violations.length > 0) {
    console.error(violations.join('\n'));
    process.exit(1);
  }
  console.log('Scope and private-route guard: PASS');
}
