# Dependency Adoption Policy

## Principle
Strategic dependencies require an ADR. Trivial dependencies require a Tooling Proposal. "Use every available plugin" is explicitly prohibited.

## Tool Maturity Levels
`PROPOSED` -> `EVALUATION` -> `APPROVED` -> `ACTIVE` -> `DEPRECATED` -> `REMOVED`

## Periodic Tool Review
Every 3 milestones, Gemini must verify:
- If a tool is still useful.
- If better alternatives exist.
- If it introduces unnecessary costs.
- If it increases lock-in.

## Process
1. Evaluate necessity vs CSS/native capabilities.
2. Document impact on bundle size and performance.
3. Verify accessibility compliance.
4. Verify Design System compatibility.
5. Obtain approval from Gemini (for trivial) or Chief Architect (for strategic).
