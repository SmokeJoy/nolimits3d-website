# State Machines

> **Document ID:** DOC-PROD-004  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Domain Architecture  
> **Ambito autorevole:** stati e transizioni degli aggregate principali.

## 1. Quote request

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Submitted
    Submitted --> Assigned
    Assigned --> InformationRequested
    InformationRequested --> Assigned
    Assigned --> UnderReview
    UnderReview --> Rejected
    UnderReview --> QuoteReady
    QuoteReady --> Sent
    Sent --> Accepted
    Sent --> Declined
    Sent --> Expired
    Accepted --> Converted
```

Guardrail: solo `QuoteReady` revisionata può diventare `Sent`; `Accepted` riferisce la versione inviata.

## 2. STL project

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> UploadPending
    UploadPending --> Quarantined
    Quarantined --> RejectedFile
    Quarantined --> AcceptedFile
    AcceptedFile --> AnalysisPending
    AnalysisPending --> QualificationNeeded
    AnalysisPending --> ManualReview
    QualificationNeeded --> ReadyForSlicing
    ReadyForSlicing --> Slicing
    Slicing --> ManualReview
    Slicing --> EstimateReady
    EstimateReady --> HumanReview
    HumanReview --> InformationRequested
    InformationRequested --> QualificationNeeded
    HumanReview --> Rejected
    HumanReview --> QuoteReady
```

## 3. Lantern configuration

```mermaid
stateDiagram-v2
    [*] --> Empty
    Empty --> Editing
    Editing --> Saving
    Saving --> Saved
    Saving --> SaveError
    SaveError --> Saving
    Saved --> Editing
    Saved --> Submitted
    Submitted --> UnderReview
    UnderReview --> ChangesRequested
    ChangesRequested --> Editing
    UnderReview --> Quoted
    Quoted --> Archived
```

`Submitted` è uno snapshot; il draft può generare una revisione successiva.

## 4. Order

```mermaid
stateDiagram-v2
    [*] --> PendingConfirmation
    PendingConfirmation --> Confirmed
    Confirmed --> AwaitingPayment
    Confirmed --> ReadyForProduction
    AwaitingPayment --> ReadyForProduction
    ReadyForProduction --> InProduction
    InProduction --> QualityCheck
    QualityCheck --> Rework
    Rework --> InProduction
    QualityCheck --> ReadyForDelivery
    ReadyForDelivery --> Shipped
    ReadyForDelivery --> Collected
    Shipped --> Delivered
    Delivered --> Completed
    PendingConfirmation --> Cancelled
    Confirmed --> Cancelled
```

Pagamento, fulfillment e stato ordine possono essere sottostati separati; non dedurre pagamento da `Confirmed`.

## 5. Assistance ticket

```mermaid
stateDiagram-v2
    [*] --> New
    New --> Triage
    Triage --> InformationRequested
    InformationRequested --> Triage
    Triage --> RemoteSupport
    Triage --> EstimateRequired
    EstimateRequired --> AwaitingApproval
    AwaitingApproval --> Workshop
    RemoteSupport --> Resolved
    RemoteSupport --> Workshop
    Workshop --> Testing
    Testing --> Resolved
    Testing --> Unresolved
    Triage --> Rejected
    Resolved --> Closed
    Unresolved --> Closed
    Rejected --> Closed
```

## 6. Content

```text
Draft → In Review → Approved → Scheduled → Published → Archived
                     ↘ Rejected → Draft
Published → Revised (new revision) → In Review
```

## 7. Media asset

```text
Uploaded → Quarantined → Metadata Required → In Review → Approved → Published/Used → Archived
             ↘ Rejected
```

## 8. Event

```text
Draft → Published → Ongoing → Completed → Archived
                  ↘ Postponed → Published
                  ↘ Cancelled
```

## 9. Newsletter subscriber

```text
Pending Confirmation → Active → Unsubscribed
                    ↘ Expired
Active → Suppressed (bounce/complaint/admin)
Suppressed → Active only through authorized remediation/new consent
```

## 10. AI execution

```text
Created → Authorized → Running → Awaiting Confirmation → Running → Succeeded
                               ↘ Failed
                               ↘ Cancelled
```

Una tool call con side effect non può passare da `Awaiting Confirmation` senza confirmation record valido.

## 11. Regole trasversali

- transizioni autorizzate server-side;
- stato precedente e nuovo nell'audit;
- optimistic concurrency;
- side effect successivi via outbox;
- retry non ripete transizioni non idempotenti;
- cancellazioni preservano gli obblighi di retention.

<!-- V0952-STATES:START -->
## 12. Cart e Order Confirmation

```mermaid
stateDiagram-v2
    [*] --> Cart
    Cart --> CheckoutReady: regole prodotto valide
    CheckoutReady --> PendingPayment: pagamento richiesto
    CheckoutReady --> PendingAdminConfirmation: su ordinazione / controllo necessario
    PendingPayment --> Paid: provider o conferma manuale
    PendingAdminConfirmation --> AwaitingPayment: approvato
    PendingAdminConfirmation --> Rejected: non producibile
    AwaitingPayment --> Paid
    Paid --> ProductionQueued
    ProductionQueued --> InProduction
    InProduction --> ReadyOrShipped
    ReadyOrShipped --> Completed
```

## 13. Jarvis Execution Mode

```mermaid
stateDiagram-v2
    [*] --> Assistant
    Assistant --> Architect: analisi architetturale richiesta
    Assistant --> OperationalPreview: azione richiesta
    Architect --> ChangeProposal
    ChangeProposal --> AwaitingApproval
    OperationalPreview --> AwaitingApproval: side effect rilevante
    AwaitingApproval --> Executing: approvazione esplicita
    AwaitingApproval --> Cancelled
    Executing --> AuditedSuccess
    Executing --> AuditedFailure
```

Nessuno stato Jarvis è raggiungibile da visitatore o cliente.
<!-- V0952-STATES:END -->
