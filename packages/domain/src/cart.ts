/**
 * Non-binding contract proposal (WPR-M2 prep). AD-014 section 3.3: "Client cart state is
 * provisional. The backend must revalidate item, variant/configuration, quantity,
 * availability, price, fulfillment, and allowed payment mode before order creation." This
 * shape describes only the client-held, pre-revalidation state.
 */
export interface CartLine {
  itemId: string;
  variantId?: string;
  /** Present only for configurable items -- see ConfiguratorSelection.chosenOptions. */
  configuration?: Record<string, string>;
  quantity: number;
}

export interface Cart {
  id: string;
  lines: CartLine[];
}
