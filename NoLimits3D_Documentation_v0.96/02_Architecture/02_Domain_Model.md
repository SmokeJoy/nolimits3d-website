# Domain Model

> **Document ID:** DOC-ARCH-002  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Domain Architecture  
> **Ambito autorevole:** concetti di business, aggregate boundaries, value object e invarianti; non lo schema fisico.

## 1. Aggregate map

| Aggregate | Root | Responsabilità |
|---|---|---|
| Customer | Customer | identità commerciale, contatti e relazione |
| Organization | Organization | account B2B e membri |
| Product | Product | offerta catalogo e varianti |
| ContentItem | ContentItem | contenuto editoriale e revisioni |
| MediaAsset | MediaAsset | provenance, diritti, original e derivative |
| LanternModel | LanternModel | capability/versioni di un modello configurabile |
| LanternConfiguration | LanternConfiguration | draft, selezioni, snapshot e review |
| QuoteRequest | QuoteRequest | richiesta e workflow commerciale |
| Quote | QuoteVersion | proposta commerciale immutabile/versionata |
| STLProject | STLProject | file, analysis, slicing e brief tecnico |
| Order | Order | impegno accettato e fulfillment |
| AssistanceTicket | AssistanceTicket | triage e intervento |
| Event | Event | pubblicazione, status e registrazioni |
| NewsletterSubscriber | NewsletterSubscriber | consenso e preferenze |
| NewsletterCampaign | NewsletterCampaign | contenuto, segment, schedule e delivery |
| AIExecution | AIExecution | provenance, messaggi, tool e outcome |

## 2. Value objects

- Money(currency, amount);
- DateRange;
- ContactPoint;
- Address;
- ConsentRecord;
- Slug;
- MediaReference(assetId, version, derivativeProfile);
- FileFingerprint(checksum, size, detectedType);
- ModelVersion;
- ConfigurationSnapshot;
- QuoteValidity;
- SlicingProfileRef;
- AIModelRef;
- ConfidenceScore con metodologia/versione.

## 3. Domain services

- CompatibilityEvaluator per lanterne;
- QuotePolicy;
- PricingCalculator;
- MaterialRecommendationPolicy;
- ConsentPolicy;
- PublicationPolicy;
- MediaUsageResolver;
- PermissionEvaluator;
- NotificationPolicy;
- AIReviewPolicy.

Un domain service non accede direttamente a DB/provider; riceve dati e produce decisioni/eventi.

## 4. Domain events

- QuoteRequestSubmitted;
- QuoteInformationRequested;
- QuoteVersionSent;
- QuoteAccepted;
- FileAccepted/Rejected;
- STLAnalysisCompleted;
- LanternConfigurationSubmitted;
- AssistanceTicketOpened/Resolved;
- EventPublished/Changed/Cancelled;
- SubscriberConfirmed/Unsubscribed;
- ContentPublished;
- MediaApproved/Archived;
- AIActionConfirmationRequested;
- AIExecutionCompleted/Failed.

## 5. Invariants

- Quote sent is immutable and has valid lines/currency/expiry.
- Accepted quote version exists and was sent to that customer.
- Submitted lantern snapshot references compatible model/options.
- Published content/media meet publication policy.
- Active subscriber has a valid confirmation event and no overriding suppression.
- Project file used by analyzer is accepted, fingerprinted and authorized.
- AI tool call cannot exceed execution/user capability.

## 6. Aggregate interaction

Cross-aggregate consistency that cannot be transactional immediately is expressed as explicit pending state and event-driven process. The UI must show `processing`, `awaiting confirmation` or `failed`; it must not pretend synchronous completion.

## 7. Anti-corruption layers

External representations are translated into domain types:

- email provider events → DeliveryOutcome;
- AI provider result → validated assistant output;
- slicer output → SlicingResult;
- storage object → FileReference;
- future PrintFlow data → PrintFlow adapter model.

External enum/status values never become domain state directly.

<!-- V0952-DOMAIN:START -->
## 8. Aggregate v0.95.2

| Aggregate | Responsabilità aggiuntiva |
|---|---|
| CatalogItem | tipo offerta, commercial mode, disponibilità, fiscalità e checkout policy. |
| Cart | selezione mutabile e validazione preliminare, non prova di prezzo finale. |
| Order | snapshot commerciale, conferma amministrativa, produzione e fulfillment. |
| PaymentIntent | metodo, stato e reconciliation separati dall’ordine. |
| CommandCenterWorkItem | read model di attività, urgenza, owner e deep link. |
| JarvisExecution | modalità, tool plan, approval, result, provenance e audit. |
| WorkerJob | capability, lease, input/output refs, retry, heartbeat e outcome. |

JarvisExecution non appartiene al dominio cliente; è amministrativo e accessibile solo all’identità autorizzata.
<!-- V0952-DOMAIN:END -->
