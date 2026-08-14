/**
 * Non-binding contract proposal (WPR-M2 prep). AD-014 section 3.4: "Production intake uses
 * server-validated submission, explicit consent, controlled upload, retention, abuse
 * protection, delivery status, audit, and failure recovery." Covers the project/service/
 * support/quote intake routes named in section 2.
 */
export type IntakeKind = 'project' | 'service' | 'support' | 'quote';

export interface IntakeAttachment {
  fileName: string;
  contentType: string;
  sizeBytes: number;
}

export interface IntakeSubmission {
  kind: IntakeKind;
  contactEmail: string;
  description: string;
  attachments: IntakeAttachment[];
  /** ISO 8601 timestamp -- AD-014 section 3.4 requires explicit consent, not implied. */
  consentGivenAt: string;
}
