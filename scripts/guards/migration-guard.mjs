import { existsSync, readdirSync } from 'node:fs';
import { extname, resolve } from 'node:path';

function sqlFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return sqlFiles(path);
    return entry.isFile() && extname(entry.name).toLowerCase() === '.sql' ? [path] : [];
  });
}

const migrations = sqlFiles(resolve('supabase/migrations'));
if (migrations.length === 0) {
  console.log('Migration dry-run: NOT_APPLICABLE (no migration SQL files)');
  process.exit(0);
}

console.error(
  'Migration dry-run: FAIL_CLOSED. SQL migrations require an Architect-approved local dry-run job before CI can pass.',
);
process.exit(1);
