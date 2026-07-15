# Design Tokens

> **Document ID:** DOC-DES-007  
> **Versione:** 0.95.3  
> **Stato:** In Review  
> **Owner:** Product Design  
> **Ambito autorevole:** definito dall’Owner Document Registry; eventuali riferimenti prevalgono sui riepiloghi locali.


## Categorie
`color.*`, `space.*`, `size.*`, `radius.*`, `shadow.*`, `font.*`, `lineHeight.*`, `breakpoint.*`, `motion.*`, `zIndex.*`.

## Esempio
```json
{
  "color": {"surface": {"default": "{palette.neutral.0}"}, "action": {"primary": "{palette.brand.600}"}},
  "space": {"1": "0.25rem", "2": "0.5rem", "4": "1rem"},
  "radius": {"card": "0.75rem"}
}
```

## Governance
Token modificati tramite pull request visuale e regressione screenshot. Vietati valori “magici” nei componenti salvo eccezione documentata.

## Token Atlas per motion ed effetti

- `motion.duration.instant|fast|base|slow`;
- `motion.easing.enter|exit|standard`;
- `motion.distance.micro|component|route`;
- `effect.glow.focus|cta|selection|hero`;
- `media.motion.enabled`;
- `media.reducedMotion`;
- `performance.qualityTier.low|balanced|high`.

I componenti non possono introdurre easing, glow o durate locali non registrate. La categoria funzionale dell’animazione è metadata del pattern, non un valore cromatico.
