/**
 * Non-binding contract proposal (WPR-M2 prep, AD-015 section 2). AD-014 section 3.3: "Customer
 * access uses Supabase Auth with a lightweight passwordless-first flow, deny-by-default RLS,
 * object-level authorization, revocation, expiry, audit, and cross-account negative tests."
 * This module proposes only the session/authorization *shape* the frontend and contracts layer
 * would see -- it says nothing about how Supabase Auth or RLS policies are actually configured,
 * which stays Codex Root/Atlas Backend's architectural call.
 */
export interface CustomerSession {
  customerId: string;
  /** ISO 8601. */
  issuedAt: string;
  /** ISO 8601 -- AD-014 section 3.3 requires expiry, not indefinite sessions. */
  expiresAt: string;
}

/** Object-level authorization per AD-014 section 3.3, not role-based -- a scope names one resource. */
export interface AuthorizationScope {
  resourceType: 'cart' | 'intake-submission' | 'configurator-selection' | 'order';
  resourceId: string;
}

export type SessionRevocationReason = 'customer-requested' | 'expired' | 'security-event';
