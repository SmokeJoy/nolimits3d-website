import type {
  ConfiguratorModel,
  ConfiguratorSelection,
  ConfiguratorSubmissionState,
} from '@atlas/domain';

/**
 * Non-binding contract proposal (WPR-M2 prep). AD-014 section 3.5: preview, feasibility, and
 * final confirmation are distinct backend-verified states -- the frontend never marks a
 * selection "confirmed" on its own.
 */
export interface GetConfiguratorModelRequest {
  modelId: string;
}

export interface GetConfiguratorModelResponse {
  model: ConfiguratorModel;
}

export type ConfiguratorFeasibilityIssue = 'incompatible-choices' | 'missing-required-option';

export interface SubmitConfiguratorSelectionRequest {
  selection: ConfiguratorSelection;
  /** The state the client believes it is submitting for; the server is authoritative either way. */
  requestedState: ConfiguratorSubmissionState;
}

export interface SubmitConfiguratorSelectionResponse {
  selection: ConfiguratorSelection;
  issues: ConfiguratorFeasibilityIssue[];
  totalPriceMinorUnits: number;
}
