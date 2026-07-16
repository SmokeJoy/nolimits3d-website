import { describe, expect, it } from 'vitest';

import * as apiContracts from '@atlas/api-contracts';
import * as config from '@atlas/config';
import * as domain from '@atlas/domain';
import * as ui from '@atlas/ui';

describe('Shared workspace packages (M001-B / M001-C)', () => {
  it('resolves @atlas/ui', () => {
    expect(ui).toBeDefined();
    expect(typeof ui).toBe('object');
  });

  it('resolves @atlas/domain', () => {
    expect(domain).toBeDefined();
    expect(typeof domain).toBe('object');
  });

  it('resolves @atlas/api-contracts', () => {
    expect(apiContracts).toBeDefined();
    expect(typeof apiContracts).toBe('object');
  });

  it('resolves @atlas/config', () => {
    expect(config).toBeDefined();
    expect(typeof config).toBe('object');
  });

  it('keeps the scaffolds empty of business exports (M001 scope guard)', () => {
    for (const moduleNamespace of [ui, domain, apiContracts, config] as Record<string, unknown>[]) {
      expect(Object.keys(moduleNamespace)).toHaveLength(0);
    }
  });
});
