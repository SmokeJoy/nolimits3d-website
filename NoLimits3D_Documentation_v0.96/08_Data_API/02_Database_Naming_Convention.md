# Database Naming Convention

> **Document ID:** DOC-DATA-002  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Data Architecture  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


- `snake_case`, nomi inglesi, plurale per tabelle.
- PK `id`; FK `{entity}_id`.
- Booleani con prefisso `is_`, `has_`, `can_`.
- Timestamp `created_at`, `updated_at`, `deleted_at`.
- Constraint: `pk_`, `fk_`, `uq_`, `ck_`; index `idx_{table}_{columns}`.
- Enum database solo per stati molto stabili; preferire lookup/versioned state quando evolutivi.
