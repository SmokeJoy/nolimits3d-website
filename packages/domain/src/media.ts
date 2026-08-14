/**
 * Non-binding contract proposal (WPR-M2 prep, AD-015 section 2: "Claude Team may propose
 * architecture and contracts but cannot approve them"). Shared media shape referenced by
 * catalog and configurator items -- AD-014 section 3.2 requires rights/provenance approval and
 * alt text per asset before any media becomes public business content.
 */
export interface MediaAsset {
  url: string;
  altText: string;
  rightsApproved: boolean;
  provenance: string;
}
