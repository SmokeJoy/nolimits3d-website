import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const expectedNode = '24.18.0';
const expectedPnpm = '9.15.0';
const packageJson = JSON.parse(
  readFileSync(new URL('../../package.json', import.meta.url), 'utf8'),
);
const failures = [];

if (process.version !== `v${expectedNode}`) {
  failures.push(`Node mismatch: expected v${expectedNode}, received ${process.version}`);
}

const pnpmCommand =
  process.platform === 'win32'
    ? { executable: process.env.ComSpec, arguments: ['/d', '/s', '/c', 'pnpm --version'] }
    : { executable: 'pnpm', arguments: ['--version'] };
const pnpm = spawnSync(pnpmCommand.executable, pnpmCommand.arguments, {
  encoding: 'utf8',
});

if (pnpm.status !== 0) {
  failures.push(`pnpm version check failed: ${(pnpm.stderr ?? pnpm.error?.message ?? '').trim()}`);
} else if (pnpm.stdout.trim() !== expectedPnpm) {
  failures.push(`pnpm mismatch: expected ${expectedPnpm}, received ${pnpm.stdout.trim()}`);
}

if (packageJson.packageManager !== `pnpm@${expectedPnpm}`) {
  failures.push(`packageManager must be pnpm@${expectedPnpm}`);
}

if (packageJson.engines?.node !== expectedNode || packageJson.engines?.pnpm !== expectedPnpm) {
  failures.push('package.json engine pins do not match the M-001 baseline');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Toolchain guard: PASS (Node ${expectedNode}, pnpm ${expectedPnpm})`);
