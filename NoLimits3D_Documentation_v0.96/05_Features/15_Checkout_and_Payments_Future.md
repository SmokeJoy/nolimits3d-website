# Checkout e pagamenti — strategia controllata e progressiva

> **Document ID:** DOC-FEAT-016  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Product / Commerce  
> **Ambito autorevole:** carrello, checkout, conferma ordine, pagamento e progressione provider.

## 1. Principio

Il metodo di pagamento dipende dal tipo di prodotto/servizio, dalla producibilità, dal prezzo definitivo e dallo stato di approvazione. Il sistema non forza un checkout unico su offerte eterogenee.

## 2. Matrice

| Offerta | Percorso | Pagamento |
|---|---|---|
| Prodotto standard | cart → checkout → order | metodo abilitato; auto-conferma solo se consentita. |
| Lanterna da catalogo | configure → validate → cart/order | dopo configurazione valida. |
| Prodotto personalizzato | request → analysis → quote → approval | dopo prezzo finale approvato. |
| STL Fase 2 | upload → analysis → stima → Andrea review | dopo preventivo definitivo. |
| Servizio | request → evaluation → quote | secondo condizioni approvate. |
| Fiera | reservation/direct sale | contanti/POS o altro metodo abilitato. |

## 3. Metodi iniziali configurabili

Bonifico, PayPal, contanti in fiera, POS in fiera, consegna locale se abilitata ed eventuale online payment per prodotti idonei. Stripe, carte, Apple Pay e Google Pay sono capability future e non bloccano la Fase 1.

## 4. Cart e checkout

Il cart conserva item ref, variant/configuration ref, quantità e snapshot provvisorio. Prima dell’ordine, il backend rivalida disponibilità, prezzo, commercial mode e metodo. Checkout raccoglie dati minimi, fulfillment, termini e consenso necessario. Submit è idempotente.

## 5. Order/payment separation

Order e PaymentIntent hanno stati separati. Webhook e conferme manuali producono audit e reconciliation. Nessun dato carta viene memorizzato. Refund/cancel non è azione autonoma di Jarvis.

## 6. Requisiti

| ID | Requisito |
|---|---|
| PAY-F-001 | Distinguere prodotti immediatamente acquistabili da quote/configurazioni. |
| PAY-F-002 | Calcolare totali, imposte e spedizione con snapshot. |
| PAY-F-003 | Usare provider tokenizzato; nessun dato carta nel sistema. |
| PAY-F-004 | Verificare webhook, idempotency e reconciliation. |
| PAY-F-005 | Gestire failure, retry, refund/cancel e stato separato. |
| PAY-F-006 | Fornire termini, conferme e documenti fiscali approvati. |
| PAY-F-007 | Selezionare metodi e conferma in base a commercial mode e stato ordine. |
| PAY-F-008 | Supportare bonifico, PayPal, contanti/POS fiera e consegna locale come opzioni configurabili iniziali. |
| PAY-F-009 | Richiedere conferma amministrativa prima del pagamento quando prezzo/producibilità non sono definitivi. |
| PAY-F-010 | Trattare Stripe/wallet/carte avanzate come evoluzione non bloccante. |
