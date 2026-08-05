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

  it('keeps the not-yet-started scaffolds empty of business exports (scope guard)', () => {
    for (const moduleNamespace of [domain, apiContracts, config] as Record<string, unknown>[]) {
      expect(Object.keys(moduleNamespace)).toHaveLength(0);
    }
  });

  it('limits @atlas/ui to the approved M-002 Wave C1 primitive surface (scope guard)', () => {
    // Widening this list requires an approved Task Packet deliverable, not a local decision.
    expect(Object.keys(ui).sort()).toEqual([
      'Badge',
      'Button',
      'Card',
      'CardContent',
      'CardDescription',
      'CardFooter',
      'CardHeader',
      'CardTitle',
      'Skeleton',
      'StatusIndicator',
    ]);
  });
});
