---
id: multi-locale-currency-parsing
trigger: "when parsing numbers, balance amounts, currency, bets, or chat guesses"
confidence: 0.95
domain: "math-and-currency"
source: "session-observation"
scope: project
project_id: "web-software-factory-WebFactory"
project_name: "Web Software Factory Studio"
---

# International Multi-Locale Currency & Numerical Parsing

## Action
Always use the robust multi-locale number parser (`.agents/skills/number-parsing/SKILL.md`) that handles international decimal and thousands separators (both dot-thousands `1.500,50` and comma-thousands `1,500.50`), shorthand multipliers (`1.5k` = `1500`, `2m` = `2000000`, `100b`), and strictly sanitizes/rejects `NaN`, negative values, or out-of-bound inputs before pricing or financial state mutations.

## Evidence
- E-commerce customers and SaaS users across the US, Europe, and Latin America input values in diverse formats (e.g., `1,500.00`, `1.500`, `1,5k`, `500k`). Standard JavaScript `parseFloat("1.500")` parses as `1.5` instead of `1500`, causing critical calculation discrepancies.
- Verified across Studio pricing, ROI calculator, and checkout components.
