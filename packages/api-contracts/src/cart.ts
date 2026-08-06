import type { Cart, CartLine, CommercialMode, Money } from '@atlas/domain';

/**
 * Non-binding contract proposal (WPR-M2 prep). AD-014 section 3.3: "The backend must revalidate
 * item, variant/configuration, quantity, availability, price, fulfillment, and allowed payment
 * mode before order creation." The client cart in the request is untrusted input; the response
 * is the only source of truth for what can actually be ordered.
 */
export interface RevalidateCartRequest {
  cart: Cart;
}

export type CartLineRevalidationIssue =
  | 'unavailable'
  | 'quantity-exceeds-availability'
  | 'price-changed'
  | 'configuration-invalid'
  | 'item-not-found';

export interface RevalidatedCartLine {
  line: CartLine;
  currentPrice: Money;
  commercialMode: CommercialMode;
  issues: CartLineRevalidationIssue[];
}

export interface RevalidateCartResponse {
  lines: RevalidatedCartLine[];
  total: Money;
  /** True only when every line has zero issues -- the frontend must not compute this itself. */
  canProceedToCheckout: boolean;
}
