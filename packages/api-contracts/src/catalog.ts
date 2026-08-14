import type { CatalogItem, CatalogItemKind } from '@atlas/domain';

/**
 * Non-binding contract proposal (WPR-M2 prep, AD-015 section 2). AD-014 section 3.2: "All
 * client-owned content must enter through centralized, typed contracts" -- this is the read
 * path for the Unified Commerce Catalog (AD-014 section 3.3), independent of whichever backend
 * (Supabase REST, RPC, or Edge Function) ends up serving it.
 */
export interface GetCatalogRequest {
  kind?: CatalogItemKind;
  /** Opaque cursor for pagination; absent on the first request. */
  cursor?: string;
  pageSize: number;
}

export interface GetCatalogResponse {
  items: CatalogItem[];
  nextCursor?: string;
}
