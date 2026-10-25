# CANON: Multi-Brand Design Systems (W3C DTCG 2025.10, Style Dictionary v4, OKLCH & Industry Archetypes)

> **Scope:** Canonical design engineering guide for Squad 1, Squad 4, Squad 5, and Squad 8 on theming and crafting bespoke, non-generic websites across diverse industries using a unified 3-Tier W3C DTCG Token Architecture.
> **Sources Verified:** W3C Design Tokens Community Group (`DTCG 2025.10` Format Module); Style Dictionary v4 ESM Architecture; Björn Ottosson (OKLCH Perceptual Color Space); Myndex APCA Contrast (`Lc`); Utopia Fluid Responsive Design (`clamp()`); Alla Kholmatova (*Design Systems*); Adam Wathan & Steve Schoger (*Refactoring UI*) `[VERIFICADO: 2026-10-25]`.

---

## 1. The 3-Tier Multi-Brand Token Architecture

To build websites for dozens of different clients without ever producing repetitive "AI template slop", our Software Factory separates design tokens (`tokens/design.tokens.json`) into three strict layers:

1. **Tier 1 — Core Primitives (Immutable Math):**
   - Perceptual lightness ramps (`L` in OKLCH from `0.10` to `0.98`), fluid Utopia spacing & typography scales (`--step--1` to `--step-5`), and physical spring curves (`linear()`).
2. **Tier 2 — Brand & Industry Semantics (Per-Client Override):**
   - `--surface-canvas`, `--surface-elevated`, `--surface-glass`, `--text-primary`, `--text-secondary`, `--brand-accent`, `--brand-cta`, `--radius-card`, and font families (`--font-display`, `--font-sans`, `--font-mono`).
3. **Tier 3 — Component Tokens:**
   - Scoped bindings (`--btn-primary-bg: var(--brand-cta)`, `--card-border-luminance`) obeying the **90/8/2 Chromatic Budget** (90% neutral surface/text, 8% secondary structural accents, 2% high-chroma focal CTA).

---

## 2. Industry Visual Archetypes Matrix (Zero-Slop Customization)

When `node tools/factory.mjs new <slug> --archetype <type>` is invoked, Squad 4 applies the corresponding industry archetype to `tokens/design.tokens.json` and `design-tokens.css`:

| Industry Archetype | Surface Polarity & OKLCH Palette | Typography Pairing | Layout & Motion Signature |
| :--- | :--- | :--- | :--- |
| **`saas-b2b` / `fintech`** | High-craft dark (`L=0.13, C=0.015, H=260`) or crisp alabaster (`L=0.98, C=0.005, H=250`); Emerald/Indigo CTA (`C=0.17, H=160/265`) | Geometric Sans (`Inter` / `Plus Jakarta Sans`) + Tabular Mono (`JetBrains Mono`) for metrics | Asymmetric Bento grids, live interactive ROI/pricing calculators, `1px` specular hairline borders |
| **`ecommerce-luxury` / `hospitality`** | Warm obsidian (`L=0.14, C=0.01, H=65`) or warm ivory (`L=0.97, C=0.012, H=80`); Champagne Gold (`L=0.80, C=0.12, H=85`) | Editorial High-Contrast Serif (`Playfair Display` / `Instrument Serif`) + Humanist Sans | Editorial full-bleed imagery, generous negative space (De-Boxing), subtle `240ms` ease-out reveals |
| **`healthcare` / `legal` / `corporate`** | High-trust daylight surface (`L=0.985, C=0.004, H=220`); Deep Navy (`L=0.28, C=0.08, H=245`) + Teal trust accent (`L=0.62, C=0.14, H=195`) | Neo-Grotesque Sans + Clear Reading Serif | High-scannability F-pattern hierarchy, APCA `Lc >= 75` body text, instant appointment/lead booking |
| **`creative-portfolio` / `agency`** | Deep carbon (`L=0.11, C=0.005, H=0`) + Electric Acid/Coral focal (`L=0.78, C=0.20, H=115/35`) | Expressive Display Grotesque (`Syne` / `Space Grotesk`) + Technical Mono | Kinetic typography, `@starting-style` view transitions, 60-FPS composite-only parallax |
| **`streamer-casino-suite`** (`client-portal`) | Deep obsidian (`L=0.12, C=0.02, H=265`) + Gold (`H=85`) + RealtimeHub Neon Green (`L=0.86, C=0.24, H=142`) | `Chakra Petch` Display + `Inter` UI + `JetBrains Mono` | Real-time edge telemetry, Provably Fair HUDs, 1920x1080 OBS overlays (`<=5% CPU`) |

---

## 3. Agentic SEO (AEO) & Conversion Rate Optimization (CRO) Standard

Every website produced by the Factory ships with **100/100 Agentic SEO (AEO)** and **CRO Foundations** out of the box:
1. **`/llms.txt`:** Markdown manifest at the site root summarizing the business value proposition, services/products, pricing structure, and canonical URLs so AI search engines (ChatGPT Search, Perplexity, Google AI Overviews) cite the client accurately.
2. **`/robots.txt` & `Schema.org JSON-LD`:** Structured `<script type="application/ld+json">` (`WebSite`, `Organization`, `LocalBusiness`, `Product`, or `SoftwareApplication`) embedded in `<head>`.
3. **Fogg Behavior Model ($B = MAP$) & Cialdini Ethical Conversion:** Above-the-fold clarity of the primary user job within 3 seconds, verifiable social proof, friction-free primary CTA (`min-height: 44px` tap target), and zero layout shift (`CLS = 0`).

---

## 4. Knowledge Graph Connections (Obsidian)
- [[INDEX]]
- [[CANON_SPLE_ISO26550_AND_SOFTWARE_FACTORIES_ARCHITECTURE_2026]]
- [[CANON_ASTRO5_CLOUDFLARE_WORKERS_AND_MODERN_WEB_TEMPLATES_2026]]
- [[CANON_SOFTWARE_FACTORY_CURRICULUM_BOOKS_PAPERS_AND_VIDEO_COURSES_2026]]
- #software_factory #visual_craft_and_motion
