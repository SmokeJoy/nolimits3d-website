# Schema.org

> **Document ID:** DOC-SEO-006  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** SEO Engineering  
> **Ambito autorevole:** mapping dei contenuti visibili a dati strutturati.

## Requisiti

| ID | Requisito | Pri |
|---|---|---|
| SCHEMA-F-001 | Structured data deve rappresentare contenuto visibile e reale. | Must |
| SCHEMA-F-002 | ID e relazioni tra Organization, WebSite e pagine sono stabili. | Must |
| SCHEMA-F-003 | Product/Offer solo quando prezzo/disponibilità sono corretti. | Must |
| SCHEMA-F-004 | Event riflette cancellation/postponement e timezone. | Must |
| SCHEMA-F-005 | SoftwareApplication per PrintFlow non suggerisce release disponibile. | Must |
| SCHEMA-F-006 | CI valida JSON-LD e campi richiesti. | Must |

## Mapping iniziale

Organization/LocalBusiness, WebSite, BreadcrumbList, Product quando applicabile, Service, Article/BlogPosting, Event, FAQPage solo per FAQ visibile e VideoObject quando esiste video reale.

## Governance

Template genera schema da dati autorevoli, non da testo AI libero. Errori rich result vengono monitorati e assegnati.

<!-- V0953-SCHEMA:START -->
## Schema e veridicità

Usare Organization/LocalBusiness solo con dati reali; Person per Andrea se pubblicamente appropriato; Product/Offer per catalogo; CreativeWork/VisualArtwork per HueForge quando corretto; Event per eventi reali; Article e BreadcrumbList. Non marcare render come prodotto consegnato né recensioni non verificabili.
<!-- V0953-SCHEMA:END -->
