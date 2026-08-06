import type { MediaAsset } from './media';

/**
 * Non-binding contract proposal (WPR-M2 prep). AD-014 section 3.3: "One Unified Commerce
 * Catalog represents products, services, configurables, event offers, and quote-only items
 * using explicit commercial modes and checkout rules."
 */
export type CatalogItemKind = 'product' | 'service' | 'configurable' | 'event-offer' | 'quote-only';

/** AD-014 section 3.3: "Initial commercial methods are configurable ... automatic online payment is not required for quote-only or admin-confirmed offers." */
export type CommercialMode = 'instant-checkout' | 'admin-confirmed' | 'quote-only';

export type Availability = 'in-stock' | 'made-to-order' | 'unavailable';

export interface Money {
  amountMinorUnits: number;
  /** ISO 4217, e.g. "EUR". */
  currencyCode: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  price: Money;
  availability: Availability;
  media: MediaAsset[];
}

export interface CatalogItem {
  id: string;
  kind: CatalogItemKind;
  commercialMode: CommercialMode;
  name: string;
  description: string;
  variants: ProductVariant[];
  media: MediaAsset[];
  seo?: {
    title: string;
    description: string;
  };
}
