import type { IntakeAttachment, IntakeKind } from '@atlas/domain';

/**
 * Non-binding contract proposal (WPR-M2 prep). AD-014 section 3.4: server-validated submission
 * with explicit consent and controlled upload; section 3.4 also requires human follow-up, so
 * the response only ever confirms intake, never a final quote or commitment.
 */
export interface SubmitIntakeRequest {
  kind: IntakeKind;
  contactEmail: string;
  description: string;
  attachments: IntakeAttachment[];
  consentGiven: boolean;
}

export interface SubmitIntakeResponse {
  submissionId: string;
  /** ISO 8601 -- server-assigned, never trusted from the client. */
  receivedAt: string;
  status: 'received-pending-review';
}
