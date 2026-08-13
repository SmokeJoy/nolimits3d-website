import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/*
 * Deterministic, read-only, fail-closed production-readiness guard for
 * CLIENT_DATA_MANIFEST.json, per packet CLAUDE-WPR-M1-CORRECTED section 8.5.
 * Hand-implements the rules in CLIENT-DATA.schema.json -- no schema-validation
 * library is added (packet section 4 forbids new dependencies).
 *
 * All exported functions are pure (no I/O) except loadManifest/loadBinding
 * and the CLI entrypoint at the bottom, so every rule is directly testable.
 */

export const SCHEMA_VERSION = '2.0.0';
export const ALLOWED_CATEGORY_IDS = [
  'business-identity',
  'commerce-catalog',
  'content-media',
  'testimonials-claims',
  'legal-commercial-copy',
  'provider-credentials',
];
export const ALLOWED_VALUE_TYPES = ['string', 'number', 'boolean', 'array', 'object'];
export const ALLOWED_LIFECYCLE_STATUSES = [
  'missing',
  'draft',
  'provided_pending_approval',
  'rejected',
  'expired',
  'approved',
];
export const ALLOWED_BLOCKING_SEVERITIES = ['blocking', 'non-blocking'];
export const ALLOWED_BINDING_STATUSES = ['unbound', 'hardcoded-unbound', 'bound-unverified'];
/**
 * The exact consumptionMechanism values in current use in
 * WPR-M1-SOURCE-BINDING-CONTRACT.json. Closed-world by design, same rationale
 * as ALLOWED_CATEGORY_IDS: a curated, small, reviewable set. Extend this list
 * deliberately (with a matching binding-contract doc update) when a new real
 * consumption mechanism is introduced -- never widen it to accept arbitrary
 * strings, or the binding contract's own claims become unverifiable.
 */
export const ALLOWED_CONSUMPTION_MECHANISMS = [
  'not-consumed',
  'hardcoded-constant',
  'env-var (unset in production)',
  // Not yet used by any real binding as of this packet (nothing is wired to
  // an approved data source pre-WPR-M2) -- reserved for the first real
  // binding that is actually live-consumed from an approved manifest field.
  'live-consumed',
];
const ISO_DATE_TIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;

const CATEGORY_KEYS = new Set(['id', 'label', 'sourceRef', 'fields']);
const FIELD_KEYS = new Set([
  'id',
  'label',
  'required',
  'valueType',
  'format',
  'lifecycleStatus',
  'value',
  'provenance',
  'rightsConsentRequired',
  'rightsConsentEvidence',
  'businessApproval',
  'legalApprovalRequired',
  'legalApproval',
  'sourceBinding',
  'blockingSeverity',
  'lastVerified',
]);
const FIELD_REQUIRED_KEYS = [
  'id',
  'label',
  'required',
  'valueType',
  'lifecycleStatus',
  'value',
  'provenance',
  'rightsConsentRequired',
  'rightsConsentEvidence',
  'businessApproval',
  'legalApprovalRequired',
  'legalApproval',
  'sourceBinding',
  'blockingSeverity',
  'lastVerified',
];
const APPROVAL_KEYS = new Set(['approvedBy', 'approvedAt', 'evidenceRef']);
const FIELD_ID_PATTERN = /^[a-z][a-zA-Z0-9]*(\.[a-z][a-zA-Z0-9]*)+$/;

const BINDING_CONTRACT_ROOT_KEYS = new Set([
  '$schemaVersion',
  'purpose',
  'statusValues',
  'fieldNotes',
  'bindings',
]);
const BINDING_KEYS = new Set([
  'id',
  'manifestFieldId',
  'targetFile',
  'bindingIdentifier',
  'consumptionMechanism',
  'deploymentEnvironmentContract',
  'verificationRule',
  'status',
  'bindingVerifiedAt',
]);
const BINDING_REQUIRED_KEYS = [
  'id',
  'manifestFieldId',
  'targetFile',
  'bindingIdentifier',
  'consumptionMechanism',
  'deploymentEnvironmentContract',
  'verificationRule',
  'status',
  'bindingVerifiedAt',
];

/**
 * Deliberately broad, since packet section 8.3 requires that
 * "Placeholder/test/example values can never satisfy production readiness"
 * with no carve-out -- a false positive here only means a real value gets
 * flagged for human review, which is the correct fail-closed direction; a
 * false negative lets fabricated data ship as approved, which is not
 * acceptable. Every pattern is word/token-boundary anchored to limit false
 * positives on legitimate prose that happens to share a substring.
 */
const PLACEHOLDER_PATTERNS = [
  /\btodo\b/i,
  /\bplaceholder\b/i,
  /\btbd\b/i,
  /\btba\b/i,
  /\bexample\b/i,
  /\besempio\b/i,
  /\blorem ipsum\b/i,
  /\bn\/a\b/i,
  /\bx{3,}\b/i,
  /\bfixme\b/i,
  /\breplace\b/i,
  /\binsert\b/i,
  /<[^<>]*>/,
  /\byour\s+(company|business)\b/i,
  /\bchange\s*me\b/i,
  /\bdummy\b/i,
  /\bsample\b/i,
  /\bfake\b/i,
  /\btest\b/i,
  /\bcoming\s+soon\b/i,
  /\bpending\b/i,
  /\bto\s+be\s+(determined|confirmed|filled|decided)\b/i,
  /\bredacted\b/i,
  /\bunknown\b/i,
];

function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function looksLikePlaceholder(value) {
  if (typeof value !== 'string') return false;
  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(value));
}

function isBlankString(value) {
  return typeof value === 'string' && value.trim().length === 0;
}

function isValidIsoDateTime(value) {
  return (
    typeof value === 'string' &&
    ISO_DATE_TIME_PATTERN.test(value) &&
    !Number.isNaN(Date.parse(value))
  );
}

function violation(code, message, extra = {}) {
  return { code, message, ...extra };
}

/** Structural validation mirroring CLIENT-DATA.schema.json's closed-world rules. */
export function validateStructure(manifest) {
  const violations = [];

  if (!isPlainObject(manifest)) {
    return [violation('ROOT_NOT_OBJECT', 'Manifest root must be an object.')];
  }
  const rootKeys = new Set(Object.keys(manifest));
  for (const key of rootKeys) {
    if (key !== 'schemaVersion' && key !== 'categories') {
      violations.push(violation('ROOT_UNKNOWN_PROPERTY', `Unknown root property "${key}".`));
    }
  }
  if (manifest.schemaVersion !== SCHEMA_VERSION) {
    violations.push(
      violation(
        'SCHEMA_VERSION_MISMATCH',
        `schemaVersion must be "${SCHEMA_VERSION}", got ${JSON.stringify(manifest.schemaVersion)}.`,
      ),
    );
  }
  if (!Array.isArray(manifest.categories) || manifest.categories.length === 0) {
    violations.push(violation('EMPTY_CATEGORIES', 'categories must be a non-empty array.'));
    return violations;
  }

  const seenCategoryIds = new Set();
  const seenFieldIds = new Set();

  for (const category of manifest.categories) {
    if (!isPlainObject(category)) {
      violations.push(violation('CATEGORY_NOT_OBJECT', 'Each category must be an object.'));
      continue;
    }
    for (const key of Object.keys(category)) {
      if (!CATEGORY_KEYS.has(key)) {
        violations.push(
          violation('CATEGORY_UNKNOWN_PROPERTY', `Unknown category property "${key}".`, {
            categoryId: category.id,
          }),
        );
      }
    }
    if (!ALLOWED_CATEGORY_IDS.includes(category.id)) {
      violations.push(
        violation(
          'CATEGORY_UNKNOWN_ID',
          `Unknown or missing category id ${JSON.stringify(category.id)}.`,
        ),
      );
    } else if (seenCategoryIds.has(category.id)) {
      violations.push(
        violation('CATEGORY_DUPLICATE_ID', `Duplicate category id "${category.id}".`, {
          categoryId: category.id,
        }),
      );
    } else {
      seenCategoryIds.add(category.id);
    }
    if (typeof category.label !== 'string' || category.label.length === 0) {
      violations.push(
        violation(
          'CATEGORY_MISSING_LABEL',
          `Category "${category.id}" is missing a non-empty label.`,
          {
            categoryId: category.id,
          },
        ),
      );
    }
    if (typeof category.sourceRef !== 'string' || category.sourceRef.length === 0) {
      violations.push(
        violation(
          'CATEGORY_MISSING_SOURCE_REF',
          `Category "${category.id}" is missing a non-empty sourceRef.`,
          {
            categoryId: category.id,
          },
        ),
      );
    }
    if (!Array.isArray(category.fields) || category.fields.length === 0) {
      violations.push(
        violation(
          'CATEGORY_EMPTY_FIELDS',
          `Category "${category.id}" has an empty or missing fields array.`,
          {
            categoryId: category.id,
          },
        ),
      );
      continue;
    }

    for (const field of category.fields) {
      violations.push(...validateFieldStructure(field, category.id, seenFieldIds));
    }
  }

  return violations;
}

function validateFieldStructure(field, categoryId, seenFieldIds) {
  const violations = [];
  if (!isPlainObject(field)) {
    return [violation('FIELD_NOT_OBJECT', 'Each field must be an object.', { categoryId })];
  }
  const fieldId = typeof field.id === 'string' ? field.id : '(missing id)';

  for (const key of Object.keys(field)) {
    if (!FIELD_KEYS.has(key)) {
      violations.push(
        violation('FIELD_UNKNOWN_PROPERTY', `Unknown property "${key}" on field "${fieldId}".`, {
          categoryId,
          fieldId,
        }),
      );
    }
  }
  for (const key of FIELD_REQUIRED_KEYS) {
    if (!(key in field)) {
      violations.push(
        violation(
          'FIELD_MISSING_PROPERTY',
          `Field "${fieldId}" is missing required property "${key}".`,
          {
            categoryId,
            fieldId,
          },
        ),
      );
    }
  }

  if (typeof field.id !== 'string' || !FIELD_ID_PATTERN.test(field.id)) {
    violations.push(
      violation(
        'FIELD_INVALID_ID',
        `Field id ${JSON.stringify(field.id)} is missing or malformed.`,
        {
          categoryId,
          fieldId,
        },
      ),
    );
  } else if (seenFieldIds.has(field.id)) {
    violations.push(
      violation('FIELD_DUPLICATE_ID', `Duplicate field id "${field.id}" across the document.`, {
        categoryId,
        fieldId,
      }),
    );
  } else {
    seenFieldIds.add(field.id);
  }

  if (typeof field.label !== 'string' || field.label.length === 0) {
    violations.push(
      violation('FIELD_MISSING_LABEL', `Field "${fieldId}" is missing a non-empty label.`, {
        categoryId,
        fieldId,
      }),
    );
  }
  if (typeof field.required !== 'boolean') {
    violations.push(
      violation(
        'FIELD_INVALID_REQUIRED',
        `Field "${fieldId}" property "required" must be boolean.`,
        {
          categoryId,
          fieldId,
        },
      ),
    );
  }
  if (!ALLOWED_VALUE_TYPES.includes(field.valueType)) {
    violations.push(
      violation(
        'FIELD_INVALID_VALUE_TYPE',
        `Field "${fieldId}" has invalid valueType ${JSON.stringify(field.valueType)}.`,
        {
          categoryId,
          fieldId,
        },
      ),
    );
  }
  if ('format' in field && typeof field.format !== 'string') {
    violations.push(
      violation('FIELD_INVALID_FORMAT', `Field "${fieldId}" property "format" must be a string.`, {
        categoryId,
        fieldId,
      }),
    );
  }
  if (!ALLOWED_LIFECYCLE_STATUSES.includes(field.lifecycleStatus)) {
    violations.push(
      violation(
        'FIELD_INVALID_LIFECYCLE_STATUS',
        `Field "${fieldId}" has invalid lifecycleStatus ${JSON.stringify(field.lifecycleStatus)}.`,
        { categoryId, fieldId },
      ),
    );
  }
  if (!ALLOWED_BLOCKING_SEVERITIES.includes(field.blockingSeverity)) {
    violations.push(
      violation(
        'FIELD_INVALID_BLOCKING_SEVERITY',
        `Field "${fieldId}" has invalid blockingSeverity ${JSON.stringify(field.blockingSeverity)}.`,
        { categoryId, fieldId },
      ),
    );
  }
  if (typeof field.rightsConsentRequired !== 'boolean') {
    violations.push(
      violation(
        'FIELD_INVALID_RIGHTS_CONSENT_REQUIRED',
        `Field "${fieldId}" property "rightsConsentRequired" must be boolean.`,
        { categoryId, fieldId },
      ),
    );
  }
  if (typeof field.legalApprovalRequired !== 'boolean') {
    violations.push(
      violation(
        'FIELD_INVALID_LEGAL_APPROVAL_REQUIRED',
        `Field "${fieldId}" property "legalApprovalRequired" must be boolean.`,
        { categoryId, fieldId },
      ),
    );
  }
  for (const [key, val] of [
    ['businessApproval', field.businessApproval],
    ['legalApproval', field.legalApproval],
  ]) {
    if (val !== null && val !== undefined) {
      if (!isPlainObject(val)) {
        violations.push(
          violation(
            'FIELD_INVALID_APPROVAL_SHAPE',
            `Field "${fieldId}" property "${key}" must be null or an object.`,
            {
              categoryId,
              fieldId,
            },
          ),
        );
      } else {
        for (const k of Object.keys(val)) {
          if (!APPROVAL_KEYS.has(k)) {
            violations.push(
              violation(
                'FIELD_APPROVAL_UNKNOWN_PROPERTY',
                `Field "${fieldId}" property "${key}" has unknown sub-property "${k}".`,
                { categoryId, fieldId },
              ),
            );
          }
        }
        for (const k of APPROVAL_KEYS) {
          if (!(k in val) || typeof val[k] !== 'string' || val[k].length === 0) {
            violations.push(
              violation(
                'FIELD_APPROVAL_MISSING_PROPERTY',
                `Field "${fieldId}" property "${key}" is missing non-empty "${k}".`,
                { categoryId, fieldId },
              ),
            );
          }
        }
      }
    }
  }

  return violations;
}

/**
 * Conditional/semantic rules for a single field: if lifecycleStatus is
 * "approved", every required evidence property must be present and must not
 * look like a placeholder value masquerading as approved.
 */
export function validateFieldEvidence(field, categoryId) {
  const violations = [];
  if (field.lifecycleStatus !== 'approved') {
    return violations;
  }
  const fieldId = field.id;

  if (field.value === null || field.value === undefined || isBlankString(field.value)) {
    violations.push(
      violation(
        'APPROVED_WITHOUT_VALUE',
        `Field "${fieldId}" is approved but has no value (null, undefined, or blank).`,
        {
          categoryId,
          fieldId,
        },
      ),
    );
  } else if (looksLikePlaceholder(field.value)) {
    violations.push(
      violation(
        'APPROVED_PLACEHOLDER_VALUE',
        `Field "${fieldId}" is approved but its value looks like a placeholder/example/test marker.`,
        { categoryId, fieldId },
      ),
    );
  }
  if (typeof field.provenance !== 'string' || field.provenance.length === 0) {
    violations.push(
      violation(
        'APPROVED_WITHOUT_PROVENANCE',
        `Field "${fieldId}" is approved but has no provenance.`,
        {
          categoryId,
          fieldId,
        },
      ),
    );
  } else if (looksLikePlaceholder(field.provenance)) {
    violations.push(
      violation(
        'APPROVED_PLACEHOLDER_PROVENANCE',
        `Field "${fieldId}" provenance looks like a placeholder.`,
        {
          categoryId,
          fieldId,
        },
      ),
    );
  }
  if (!isPlainObject(field.businessApproval)) {
    violations.push(
      violation(
        'APPROVED_WITHOUT_BUSINESS_APPROVAL',
        `Field "${fieldId}" is approved but has no businessApproval evidence.`,
        { categoryId, fieldId },
      ),
    );
  } else if (looksLikePlaceholder(field.businessApproval.evidenceRef)) {
    violations.push(
      violation(
        'APPROVED_PLACEHOLDER_BUSINESS_APPROVAL',
        `Field "${fieldId}" businessApproval.evidenceRef looks like a placeholder.`,
        { categoryId, fieldId },
      ),
    );
  }
  if (field.rightsConsentRequired) {
    if (
      typeof field.rightsConsentEvidence !== 'string' ||
      field.rightsConsentEvidence.length === 0
    ) {
      violations.push(
        violation(
          'APPROVED_WITHOUT_RIGHTS_CONSENT',
          `Field "${fieldId}" requires rights/consent evidence but has none.`,
          { categoryId, fieldId },
        ),
      );
    } else if (looksLikePlaceholder(field.rightsConsentEvidence)) {
      violations.push(
        violation(
          'APPROVED_PLACEHOLDER_RIGHTS_CONSENT',
          `Field "${fieldId}" rightsConsentEvidence looks like a placeholder.`,
          { categoryId, fieldId },
        ),
      );
    }
  }
  if (field.legalApprovalRequired) {
    if (!isPlainObject(field.legalApproval)) {
      violations.push(
        violation(
          'APPROVED_WITHOUT_LEGAL_APPROVAL',
          `Field "${fieldId}" requires legal/privacy approval but has none.`,
          { categoryId, fieldId },
        ),
      );
    } else if (looksLikePlaceholder(field.legalApproval.evidenceRef)) {
      violations.push(
        violation(
          'APPROVED_PLACEHOLDER_LEGAL_APPROVAL',
          `Field "${fieldId}" legalApproval.evidenceRef looks like a placeholder.`,
          { categoryId, fieldId },
        ),
      );
    }
  }
  if (typeof field.sourceBinding !== 'string' || field.sourceBinding.length === 0) {
    violations.push(
      violation(
        'APPROVED_WITHOUT_SOURCE_BINDING',
        `Field "${fieldId}" is approved but has no sourceBinding.`,
        {
          categoryId,
          fieldId,
        },
      ),
    );
  }
  if (typeof field.lastVerified !== 'string' || field.lastVerified.length === 0) {
    violations.push(
      violation(
        'APPROVED_WITHOUT_LAST_VERIFIED',
        `Field "${fieldId}" is approved but has no lastVerified timestamp.`,
        {
          categoryId,
          fieldId,
        },
      ),
    );
  }

  return violations;
}

/**
 * Closed-world structural validation of the binding contract itself, mirroring
 * validateStructure's treatment of the manifest. Without this, a binding
 * entry with a garbage/typo'd `status` or `consumptionMechanism` (e.g.
 * "bound-verified-TYPO") passed the exact-literal checks in validateBindings
 * silently, since those checks only test equality against one specific
 * "bad" value ('unbound' / 'not-consumed') rather than membership in the
 * allowed set. This closes that hole by validating every binding entry
 * against the same closed-world discipline as the manifest.
 */
export function validateBindingContractStructure(bindingContract) {
  const violations = [];

  if (!isPlainObject(bindingContract)) {
    return [violation('BINDING_ROOT_NOT_OBJECT', 'Binding contract root must be an object.')];
  }
  for (const key of Object.keys(bindingContract)) {
    if (!BINDING_CONTRACT_ROOT_KEYS.has(key)) {
      violations.push(
        violation(
          'BINDING_ROOT_UNKNOWN_PROPERTY',
          `Unknown binding contract root property "${key}".`,
        ),
      );
    }
  }
  if (!Array.isArray(bindingContract.bindings) || bindingContract.bindings.length === 0) {
    violations.push(violation('BINDING_EMPTY_BINDINGS', 'bindings must be a non-empty array.'));
    return violations;
  }

  const seenBindingIds = new Set();
  const seenManifestFieldIds = new Set();

  for (const binding of bindingContract.bindings) {
    if (!isPlainObject(binding)) {
      violations.push(violation('BINDING_NOT_OBJECT', 'Each binding entry must be an object.'));
      continue;
    }
    const bindingId = typeof binding.id === 'string' ? binding.id : '(missing id)';

    for (const key of Object.keys(binding)) {
      if (!BINDING_KEYS.has(key)) {
        violations.push(
          violation(
            'BINDING_UNKNOWN_PROPERTY',
            `Unknown property "${key}" on binding "${bindingId}".`,
            {
              bindingId,
            },
          ),
        );
      }
    }
    for (const key of BINDING_REQUIRED_KEYS) {
      if (!(key in binding)) {
        violations.push(
          violation(
            'BINDING_MISSING_PROPERTY',
            `Binding "${bindingId}" is missing required property "${key}".`,
            { bindingId },
          ),
        );
      }
    }

    if (typeof binding.id !== 'string' || binding.id.length === 0) {
      violations.push(
        violation(
          'BINDING_INVALID_ID',
          `Binding id ${JSON.stringify(binding.id)} is missing or empty.`,
        ),
      );
    } else if (seenBindingIds.has(binding.id)) {
      violations.push(
        violation('BINDING_DUPLICATE_ID', `Duplicate binding id "${binding.id}".`, { bindingId }),
      );
    } else {
      seenBindingIds.add(binding.id);
    }

    if (typeof binding.manifestFieldId !== 'string' || binding.manifestFieldId.length === 0) {
      violations.push(
        violation(
          'BINDING_INVALID_MANIFEST_FIELD_ID',
          `Binding "${bindingId}" has a missing or empty manifestFieldId.`,
          {
            bindingId,
          },
        ),
      );
    } else if (seenManifestFieldIds.has(binding.manifestFieldId)) {
      violations.push(
        violation(
          'BINDING_DUPLICATE_MANIFEST_FIELD_ID',
          `Duplicate binding for manifestFieldId "${binding.manifestFieldId}".`,
          { bindingId, manifestFieldId: binding.manifestFieldId },
        ),
      );
    } else {
      seenManifestFieldIds.add(binding.manifestFieldId);
    }

    if (!ALLOWED_BINDING_STATUSES.includes(binding.status)) {
      violations.push(
        violation(
          'BINDING_INVALID_STATUS',
          `Binding "${bindingId}" has invalid status ${JSON.stringify(binding.status)}.`,
          { bindingId },
        ),
      );
    }
    if (!ALLOWED_CONSUMPTION_MECHANISMS.includes(binding.consumptionMechanism)) {
      violations.push(
        violation(
          'BINDING_INVALID_CONSUMPTION_MECHANISM',
          `Binding "${bindingId}" has invalid consumptionMechanism ${JSON.stringify(binding.consumptionMechanism)}.`,
          { bindingId },
        ),
      );
    }
    if (typeof binding.verificationRule !== 'string' || binding.verificationRule.length === 0) {
      violations.push(
        violation(
          'BINDING_MISSING_VERIFICATION_RULE',
          `Binding "${bindingId}" has no verificationRule.`,
          {
            bindingId,
          },
        ),
      );
    }
    if (binding.targetFile !== null && typeof binding.targetFile !== 'string') {
      violations.push(
        violation(
          'BINDING_INVALID_TARGET_FILE',
          `Binding "${bindingId}" targetFile must be null or a string.`,
          {
            bindingId,
          },
        ),
      );
    }
    if (binding.bindingVerifiedAt !== null && !isValidIsoDateTime(binding.bindingVerifiedAt)) {
      violations.push(
        violation(
          'BINDING_INVALID_VERIFIED_AT',
          `Binding "${bindingId}" bindingVerifiedAt must be null or a valid ISO-8601 date-time.`,
          { bindingId },
        ),
      );
    }
  }

  return violations;
}

/**
 * Cross-checks every field against the source-binding contract: missing
 * target, missing/unused binding, approved-but-unconsumed, stale binding
 * verification, and hard-coded production values without an approved
 * manifest binding are all blocking, per packet section 8.4/8.5.
 *
 * Note on inherent limits: this function (and validateBindingContractStructure
 * above) can only judge the binding contract's internal shape and consistency
 * with the manifest -- it has no static-analysis access to apps/** (read-only
 * for this packet by design), so it cannot independently discover a hardcoded
 * production value that was never disclosed as a binding entry in the first
 * place. That gap is a human-review responsibility (does the binding contract
 * actually enumerate every real consumer?), not something a JSON validator
 * can close. Likewise, `bindingVerifiedAt`/`lastVerified` are self-reported
 * evidence timestamps, validated here only for well-formedness and internal
 * ordering, not against a wall-clock (the guard must stay deterministic) --
 * their truth still depends on `businessApproval`/`legalApproval`
 * `evidenceRef` pointing to something a human actually checked.
 */
export function validateBindings(manifest, bindingContract) {
  const violations = [];
  const bindingsByFieldId = new Map();
  for (const binding of bindingContract?.bindings ?? []) {
    bindingsByFieldId.set(binding.manifestFieldId, binding);
  }

  for (const category of manifest.categories ?? []) {
    for (const field of category.fields ?? []) {
      const binding = bindingsByFieldId.get(field.id);

      if (field.lifecycleStatus === 'approved') {
        if (!binding) {
          violations.push(
            violation(
              'APPROVED_FIELD_MISSING_BINDING',
              `Field "${field.id}" is approved but has no source-binding entry.`,
              {
                categoryId: category.id,
                fieldId: field.id,
              },
            ),
          );
        } else {
          if (binding.status === 'unbound') {
            violations.push(
              violation(
                'APPROVED_FIELD_UNBOUND',
                `Field "${field.id}" is approved but its binding is "unbound".`,
                {
                  categoryId: category.id,
                  fieldId: field.id,
                },
              ),
            );
          }
          if (binding.consumptionMechanism === 'not-consumed') {
            violations.push(
              violation(
                'APPROVED_FIELD_UNCONSUMED',
                `Field "${field.id}" is approved but its binding is not consumed anywhere in source.`,
                { categoryId: category.id, fieldId: field.id },
              ),
            );
          }
          if (!binding.targetFile) {
            violations.push(
              violation(
                'APPROVED_FIELD_MISSING_TARGET',
                `Field "${field.id}" is approved but its binding has no target file.`,
                {
                  categoryId: category.id,
                  fieldId: field.id,
                },
              ),
            );
          }
          if (
            !binding.bindingVerifiedAt ||
            (typeof field.lastVerified === 'string' &&
              binding.bindingVerifiedAt < field.lastVerified)
          ) {
            violations.push(
              violation(
                'APPROVED_FIELD_STALE_BINDING',
                `Field "${field.id}" is approved but its binding verification is missing or older than the field's own lastVerified.`,
                { categoryId: category.id, fieldId: field.id },
              ),
            );
          }
        }
      }

      if (binding?.status === 'hardcoded-unbound' && field.lifecycleStatus !== 'approved') {
        violations.push(
          violation(
            'HARDCODED_VALUE_WITHOUT_APPROVAL',
            `Field "${field.id}" has a hard-coded production value in source (${binding.targetFile}) without an approved manifest binding.`,
            { categoryId: category.id, fieldId: field.id, targetFile: binding.targetFile },
          ),
        );
      }
    }
  }

  return violations;
}

/** True only when every required field is approved with complete, non-placeholder evidence. */
export function computeReadiness(manifest) {
  const blockingUnready = [];
  for (const category of manifest.categories ?? []) {
    for (const field of category.fields ?? []) {
      if (
        field.required &&
        field.blockingSeverity === 'blocking' &&
        field.lifecycleStatus !== 'approved'
      ) {
        blockingUnready.push({
          categoryId: category.id,
          fieldId: field.id,
          status: field.lifecycleStatus,
        });
      }
    }
  }
  return { ready: blockingUnready.length === 0, unreadyRequiredFields: blockingUnready };
}

/** Full check: structure + per-field evidence + bindings + readiness, in one deterministic pass. */
export function checkManifestReadiness(manifest, bindingContract) {
  const structural = validateStructure(manifest);
  const bindingStructural = validateBindingContractStructure(bindingContract);
  const evidence = (manifest.categories ?? []).flatMap((category) =>
    (category.fields ?? []).flatMap((field) => validateFieldEvidence(field, category.id)),
  );
  const bindings = validateBindings(manifest, bindingContract);
  const readiness = computeReadiness(manifest);

  const violations = [...structural, ...bindingStructural, ...evidence, ...bindings];
  const ready = readiness.ready && violations.length === 0;

  return {
    ready,
    violations,
    unreadyRequiredFields: readiness.unreadyRequiredFields,
    summary: {
      categories: manifest.categories?.length ?? 0,
      fields: (manifest.categories ?? []).reduce((n, c) => n + (c.fields?.length ?? 0), 0),
      violationCount: violations.length,
    },
  };
}

export function loadJson(path, label) {
  if (!existsSync(path)) {
    throw new Error(`No ${label} at ${path}`);
  }
  return JSON.parse(readFileSync(path, 'utf8'));
}

/**
 * Parses optional --manifest/--binding overrides. Only used by the dedicated
 * synthetic-fixture invocation (packet section 10.1 item 3); `pnpm
 * guard:production-readiness` always takes the plain no-argv path below
 * against the real committed manifest.
 */
export function parseCliArgs(argv) {
  const args = { manifestPath: null, bindingPath: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--manifest') args.manifestPath = argv[i + 1];
    if (argv[i] === '--binding') args.bindingPath = argv[i + 1];
  }
  return args;
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
  const cliArgs = parseCliArgs(process.argv.slice(2));
  const fixtureOnly = Boolean(cliArgs.manifestPath || cliArgs.bindingPath);
  const manifestPath = cliArgs.manifestPath
    ? resolve(cliArgs.manifestPath)
    : resolve(root, 'Project_Atlas_Team_Workspace/04_Planning/CLIENT_DATA_MANIFEST.json');
  const bindingPath = cliArgs.bindingPath
    ? resolve(cliArgs.bindingPath)
    : resolve(root, 'Project_Atlas_Team_Workspace/04_Planning/WPR-M1-SOURCE-BINDING-CONTRACT.json');

  const manifest = loadJson(manifestPath, 'client-data manifest');
  const bindingContract = loadJson(bindingPath, 'source-binding contract');
  const result = { ...checkManifestReadiness(manifest, bindingContract), fixtureOnly };

  // stdout carries only the machine-readable JSON summary; all human-readable
  // status lines go to stderr so callers can safely JSON.parse(stdout).
  console.log(JSON.stringify(result, null, 2));

  if (fixtureOnly) {
    console.error(
      'FIXTURE-ONLY RESULT -- synthetic test fixture, not a production readiness determination, not real client-approved data.',
    );
  }

  if (!result.ready) {
    console.error(
      `Production readiness guard: FAIL -- ${result.violations.length} violation(s), ${result.unreadyRequiredFields.length} required field(s) not approved.`,
    );
    process.exit(1);
  }
  console.error(
    fixtureOnly
      ? 'Production readiness guard: PASS (fixture-only)'
      : 'Production readiness guard: PASS',
  );
}
