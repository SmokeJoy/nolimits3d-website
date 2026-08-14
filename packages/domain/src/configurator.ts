import type { MediaAsset } from './media';
import type { Money } from './catalog';

/**
 * Non-binding contract proposal (WPR-M2 prep). AD-014 section 3.5: "Configurator options,
 * compatibility, capability, validation, and price behavior are data-driven and are not
 * hardcoded as business truth in Frontend code."
 */
export interface ConfiguratorOptionChoice {
  id: string;
  label: string;
  priceDelta: Money;
  /** Ids of choices (in other option groups) this choice remains valid alongside. */
  compatibleWith: string[];
}

export interface ConfiguratorOption {
  id: string;
  label: string;
  required: boolean;
  choices: ConfiguratorOptionChoice[];
}

export interface ConfiguratorModel {
  id: string;
  name: string;
  basePrice: Money;
  options: ConfiguratorOption[];
  media: MediaAsset[];
  /** AD-014 section 3.5: "A static or 2D fallback must support configuration and submission without WebGL." */
  supportsStaticFallback: boolean;
  dimensions?: string;
  materials?: string[];
  electricalSpec?: string;
}

/** AD-014 section 3.5: "Preview, technical feasibility, and final confirmation remain distinct states." */
export type ConfiguratorSubmissionState = 'preview' | 'feasibility-checked' | 'confirmed';

export interface ConfiguratorSelection {
  modelId: string;
  /** ConfiguratorOption id -> chosen ConfiguratorOptionChoice id. */
  chosenOptions: Record<string, string>;
  state: ConfiguratorSubmissionState;
}
