# Newsletter

> **Document ID:** DOC-FEAT-013  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** CRM / Marketing  
> **Ambito autorevole:** subscription, consenso, campagne, delivery e misurazione.

## Requisiti stabili

| ID | Requisito | Pri |
|---|---|---|
| NEWS-F-001 | Raccogliere iscrizione con double opt-in. | Must |
| NEWS-F-002 | Gestire preferenze e unsubscribe immediato. | Must |
| NEWS-F-003 | Creare campagne in draft, review e schedule. | Must |
| NEWS-F-004 | Segmentare solo con dati e consensi ammessi. | Must |
| NEWS-F-005 | Tracciare delivery e engagement nel rispetto privacy. | Must |
| NEWS-F-006 | Gestire suppression, bounce e audit del consenso. | Must |

## Subscription

Pending record → confirmation token monouso/scadenza → Active. Reinvio conferma è rate-limited. Unsubscribe non richiede login.

## Campaign workflow

Brief → Draft → Content Review → Compliance/Links → Approved → Scheduled → Queued → Sending → Completed/Stopped. AI produce solo draft.

## Segmentation

Categorie consentite: interessi espliciti, cliente/prospect quando appropriato, fonte/evento e engagement secondo policy. Vietate inferenze sensibili e segmenti troppo piccoli che espongano individui.

## Delivery

Batch/queue, idempotency, provider webhook firmati, bounce/complaint e suppression. Il sistema conserva message/campaign IDs, non contenuti personali in analytics.

## Acceptance

Double opt-in verificato, unsubscribe precedence, test email, link checker, plain text, mobile rendering, domain authentication configurata prima del launch.

<!-- V0952-NEWSLETTER:START -->
## Jarvis e approvazione

Jarvis può preparare segmentazione, oggetto e bozza nel Command Center. Invio, scheduling, variazioni di consenso e contenuti legali richiedono conferma esplicita e audit. Nessun modulo AI pubblico è esposto agli iscritti.
<!-- V0952-NEWSLETTER:END -->
