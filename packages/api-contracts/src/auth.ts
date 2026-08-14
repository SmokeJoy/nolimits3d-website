import type { AuthorizationScope, CustomerSession, SessionRevocationReason } from '@atlas/domain';

/**
 * Non-binding contract proposal (WPR-M2 prep). Pairs with `packages/domain/src/auth.ts` --
 * AD-014 section 3.3's passwordless-first, deny-by-default, auditable session lifecycle.
 */
export interface RefreshSessionRequest {
  session: CustomerSession;
}

export interface RefreshSessionResponse {
  session: CustomerSession;
  authorizedScopes: AuthorizationScope[];
}

export interface RevokeSessionRequest {
  customerId: string;
  reason: SessionRevocationReason;
}

export interface RevokeSessionResponse {
  revokedAt: string;
}
