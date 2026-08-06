import type { IntakeAttachment } from '@atlas/domain';

/**
 * Non-binding contract proposal (WPR-M2 prep). AD-014 section 3.4: "Production intake uses
 * server-validated submission, explicit consent, controlled upload, retention, abuse
 * protection, delivery status, audit, and failure recovery." This is the upload leg that
 * `IntakeSubmission`/`SubmitIntakeRequest` reference by attachment metadata alone.
 */
export interface RequestUploadRequest {
  fileName: string;
  contentType: string;
  sizeBytes: number;
}

export interface RequestUploadResponse {
  /** Server-issued, time-limited target the client uploads directly to -- never a public write path. */
  uploadUrl: string;
  /** ISO 8601 -- controlled upload means the URL itself expires, not just the session. */
  expiresAt: string;
  attachment: IntakeAttachment;
}

export type UploadFailureReason =
  | 'file-too-large'
  | 'content-type-not-allowed'
  | 'upload-url-expired'
  | 'abuse-protection-triggered';
