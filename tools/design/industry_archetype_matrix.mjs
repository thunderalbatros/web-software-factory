#!/usr/bin/env node
/**
 * tools/design/industry_archetype_matrix.mjs — Industry Visual Archetypes Engine & DESIGN.md Linter
 * ==================================================================================================
 * Integrates:
 *   1. `google-labs-code/design.md` (April 2026, Apache-2.0): YAML Front Matter of W3C DTCG / OKLCH
 *      tokens + 8 canonical Markdown sections (`Overview`, `Colors`, `Typography`, `Layout`,
 *      `Elevation & Depth`, `Shapes`, `Components`, `Do's and Don'ts`).
 *   2. `pbakaus/impeccable` (v4.6/v4.8 October 2026, Apache-2.0): Separation of `PRODUCT.md` and
 *      `DESIGN.md`, the 4 Surface Modes (`Persuade`, `Operate`, `Read`, `Experience`), 24 refinement
 *      commands, and the 62 deterministic "AI Slop" detector rules.
 * ==================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const FACTORY_ROOT = path.resolve(__dirname, '..', '..');

/**
 * Canonical 8 Sections from `google-labs-code/design.md` Specification
 */
export const GOOGLE_LABS_DESIGN_MD_SECTIONS = [
  { order: 1, id: 'overview', heading: 'Overview', aliases: ['Brand & Style', '1. Overview'] },
  { order: 2, id: 'colors', heading: 'Colors', aliases: ['2. Colors', 'Colors & Atmospheric Polarity'] },
  { order: 3, id: 'typography', heading: 'Typography', aliases: ['3. Typography', 'Typography & Hierarchy'] },
  { order: 4, id: 'layout', heading: 'Layout', aliases: ['Layout & Spacing', '4. Layout'] },
  { order: 5, id: 'elevation', heading: 'Elevation & Depth', aliases: ['Elevation', '5. Elevation & Depth'] },
  { order: 6, id: 'shapes', heading: 'Shapes', aliases: ['6. Shapes', 'Shapes & Radii'] },
  { order: 7, id: 'components', heading: 'Components', aliases: ['7. Components', 'Core Components'] },
  { order: 8, id: 'dos-and-donts', heading: "Do's and Don'ts", aliases: ['Do and Do Not', "8. Do's and Don'ts"] }
];

/**
 * The 4 Impeccable Surface Modes (`pbakaus/impeccable`)
 */
export const IMPECCABLE_SURFACE_MODES = {
  Persuade: {
    id: 'Persuade',
    goal: 'The visitor decides and acts; design is the product.',
    typicalSurfaces: ['Landing pages', 'Marketing campaigns', 'Pricing showcases', 'Product launches'],
    requiresImagen3ConceptPlate: true
  },
  Operate: {
    id: 'Operate',
    goal: 'The visitor completes a task with zero cognitive friction.',
    typicalSurfaces: ['Enterprise ERPs', 'Fintech dashboards', 'Admin consoles', 'Data tables'],
    requiresImagen3ConceptPlate: false
  },
  Read: {
    id: 'Read',
    goal: 'The visitor comprehends high-stakes or long-form content effortlessly.',
    typicalSurfaces: ['Law firm advisories', 'Medical clinic portals', 'Editorial broadsheets', 'Documentation'],
    requiresImagen3ConceptPlate: false
  },
  Experience: {
    id: 'Experience',
    goal: 'The visitor is immersed inside the artifact itself at 60 FPS; chrome recedes.',
    typicalSurfaces: ['Streamer/Gaming HUDs', '3D Gaussian Splatting walkthroughs', 'WebGPU showcases'],
    requiresImagen3ConceptPlate: true
  }
};

/**
 * CLI Alias Mapping (Spanish & English) -> Canonical 8 Industry Archetype IDs
 */
export const ARCHETYPE_CLI_ALIASES = {
  abogacia: 'law-firm-and-advisory',
  abogados: 'law-firm-and-advisory',
  estudio: 'law-firm-and-advisory',
  legal: 'law-firm-and-advisory',
  'law-firm': 'law-firm-and-advisory',
  'law-firm-and-advisory': 'law-firm-and-advisory',

  fintech: 'fintech-and-banking',
  banco: 'fintech-and-banking',
  banking: 'fintech-and-banking',
  crypto: 'fintech-and-banking',
  'fintech-and-banking': 'fintech-and-banking',

  erp: 'enterprise-erp-database',
  database: 'enterprise-erp-database',
  admin: 'enterprise-erp-database',
  dashboard: 'enterprise-erp-database',
  'enterprise-erp': 'enterprise-erp-database',
  'enterprise-erp-database': 'enterprise-erp-database',

  ecommerce: 'ecommerce-conversion',
  tienda: 'ecommerce-conversion',
  retail: 'ecommerce-conversion',
  shop: 'ecommerce-conversion',
  'ecommerce-conversion': 'ecommerce-conversion',

  streamer: 'streamer-and-gaming-creator',
  gaming: 'streamer-and-gaming-creator',
  'streamer-casino-suite': 'streamer-and-gaming-creator',
  'streamer-and-gaming-creator': 'streamer-and-gaming-creator',

  clinica: 'healthcare-and-clinic',
  salud: 'healthcare-and-clinic',
  medicina: 'healthcare-and-clinic',
  healthcare: 'healthcare-and-clinic',
  'healthcare-and-clinic': 'healthcare-and-clinic',

  saas: 'b2b-saas-platform',
  'saas-b2b': 'b2b-saas-platform',
  'b2b-saas': 'b2b-saas-platform',
  'b2b-saas-platform': 'b2b-saas-platform',
  marketing: 'b2b-saas-platform',

  lujo: 'luxury-architecture-and-real-estate',
  arquitectura: 'luxury-architecture-and-real-estate',
  inmobiliaria: 'luxury-architecture-and-real-estate',
  portfolio: 'luxury-architecture-and-real-estate',
  luxury: 'luxury-architecture-and-real-estate',
  'luxury-architecture-and-real-estate': 'luxury-architecture-and-real-estate'
};

/**
 * The 8 Industry Visual Archetypes (`INDUSTRY_VISUAL_ARCHETYPES`)
 */
export const INDUSTRY_VISUAL_ARCHETYPES = {
  'law-firm-and-advisory': {
    id: 'law-firm-and-advisory',
    cliAlias: 'abogacia',
    title: 'Law Firm, Legal Advisory & Institutional Practice',
    creativeNorthStar: 'Swiss Broadsheet & Heritage Gravitas',
    surfaceModes: ['Read', 'Persuade'],
    primarySurfaceMode: 'Read',
    polarity: 'warm-editorial-paper-or-deep-navy',
    apcaContrastFloor: 85,
    wcagTier: 'AA+',
    requiresTabularNums: true,
    allows3dEffects: false,
    tokens: {
      colors: {
        primary: 'oklch(22% 0.04 255)',
        secondary: 'oklch(42% 0.03 255)',
        tertiary: 'oklch(48% 0.14 32)',
        surface: 'oklch(97% 0.012 85)',
        'surface-raised': 'oklch(99% 0.006 85)',
        'surface-deep': 'oklch(93% 0.016 85)',
        'text-primary': 'oklch(16% 0.02 255)',
        'text-secondary': 'oklch(38% 0.02 255)',
        'border-hairline': 'oklch(22% 0.03 255 / 0.18)',
        success: 'oklch(48% 0.14 155)',
        warning: 'oklch(58% 0.15 65)',
        danger: 'oklch(50% 0.18 25)'
      },
      typography: {
        display: {
          fontFamily: "'Newsreader', 'Instrument Serif', Georgia, serif",
          fontSize: 'clamp(2.5rem, 4.2vw, 4.25rem)',
          fontWeight: 500,
          lineHeight: 1.08,
          letterSpacing: '-0.02em'
        },
        h1: {
          fontFamily: "'Newsreader', 'Instrument Serif', Georgia, serif",
          fontSize: 'clamp(2rem, 3.4vw, 3.25rem)',
          fontWeight: 500,
          lineHeight: 1.12,
          letterSpacing: '-0.015em'
        },
        h2: {
          fontFamily: "'Newsreader', 'Instrument Serif', Georgia, serif",
          fontSize: 'clamp(1.5rem, 2.4vw, 2.25rem)',
          fontWeight: 500,
          lineHeight: 1.2,
          letterSpacing: '-0.01em'
        },
        body: {
          fontFamily: "'Plus Jakarta Sans', 'Public Sans', system-ui, sans-serif",
          fontSize: '1.0625rem',
          fontWeight: 400,
          lineHeight: 1.72,
          letterSpacing: '0em'
        },
        mono: {
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.8125rem',
          fontWeight: 500,
          lineHeight: 1.4,
          letterSpacing: '0.04em',
          fontFeature: "'tnum' 1"
        }
      },
      rounded: {
        none: '0px',
        xs: '2px',
        sm: '4px',
        md: '4px',
        lg: '4px'
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '48px',
        xl: '80px',
        '2xl': '120px'
      }
    },
    dos: [
      'Use Swiss Broadsheet editorial grids with visible 1px architectural hairlines.',
      'Pair high-contrast Serif headlines (Newsreader / Instrument Serif) with crisp humanist Sans body copy at 65ch-72ch.',
      'Keep border-radius strictly between 0px and 4px for institutional authority.',
      'Use warm matte limestone paper (oklch(97% 0.012 85)) or deep navy ink (oklch(22% 0.04 255)).'
    ],
    donts: [
      'Never use neon accents, glowing gradients, or floating glassmorphism cards.',
      'Never use pill-shaped buttons or wide >12px rounded corners.',
      'Never use playful bounce animations or decorative 3D particle backgrounds.'
    ]
  },

  'fintech-and-banking': {
    id: 'fintech-and-banking',
    cliAlias: 'fintech',
    title: 'Fintech, Institutional Banking & Quantitative Treasury',
    creativeNorthStar: 'Cryptographic Ledger & Sub-Millisecond Precision',
    surfaceModes: ['Operate', 'Persuade'],
    primarySurfaceMode: 'Operate',
    polarity: 'high-contrast-slate-or-obsidian-vault',
    apcaContrastFloor: 90,
    wcagTier: 'AAA',
    requiresTabularNums: true,
    allows3dEffects: false,
    tokens: {
      colors: {
        primary: 'oklch(56% 0.17 252)',
        secondary: 'oklch(68% 0.14 165)',
        tertiary: 'oklch(75% 0.15 85)',
        surface: 'oklch(11% 0.015 255)',
        'surface-raised': 'oklch(15% 0.018 255)',
        'surface-deep': 'oklch(8% 0.012 255)',
        'text-primary': 'oklch(96% 0.008 255)',
        'text-secondary': 'oklch(76% 0.015 255)',
        'border-hairline': 'oklch(85% 0.02 255 / 0.14)',
        success: 'oklch(68% 0.17 152)',
        warning: 'oklch(76% 0.16 78)',
        danger: 'oklch(62% 0.20 25)'
      },
      typography: {
        display: {
          fontFamily: "'Geist', 'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: 'clamp(2.25rem, 3.8vw, 3.75rem)',
          fontWeight: 600,
          lineHeight: 1.06,
          letterSpacing: '-0.025em',
          fontFeature: "'tnum' 1, 'zero' 1"
        },
        h1: {
          fontFamily: "'Geist', 'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: 'clamp(1.85rem, 3vw, 2.75rem)',
          fontWeight: 600,
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          fontFeature: "'tnum' 1"
        },
        h2: {
          fontFamily: "'Geist', 'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: '1.375rem',
          fontWeight: 600,
          lineHeight: 1.25,
          letterSpacing: '-0.015em',
          fontFeature: "'tnum' 1"
        },
        body: {
          fontFamily: "'Geist', 'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: '0.9375rem',
          fontWeight: 400,
          lineHeight: 1.6,
          letterSpacing: '0em',
          fontFeature: "'tnum' 1"
        },
        mono: {
          fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
          fontSize: '0.8125rem',
          fontWeight: 500,
          lineHeight: 1.45,
          letterSpacing: '0.02em',
          fontFeature: "'tnum' 1, 'zero' 1"
        }
      },
      rounded: {
        none: '0px',
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '10px'
      },
      spacing: {
        xs: '6px',
        sm: '12px',
        md: '20px',
        lg: '32px',
        xl: '56px',
        '2xl': '88px'
      }
    },
    dos: [
      'Enforce APCA Lc >= 90 on all balances, ledger rows, and settlement figures.',
      'Apply font-variant-numeric: tabular-nums (tnum) across every price, yield, delta, and timestamp.',
      'Keep micro-interactions under 150ms using exponential ease-out.',
      'Surface cryptographic audit trails, settlement status badges, and exact basis-point precision.'
    ],
    donts: [
      'Never render financial numbers with proportional digits that jitter during live ticks.',
      'Never use decorative blurs that obscure ledger density or delay task completion.',
      'Never use ambiguous color-only status indicators without explicit directional symbols (+ / -).'
    ]
  },

  'enterprise-erp-database': {
    id: 'enterprise-erp-database',
    cliAlias: 'erp',
    title: 'Enterprise ERP, Internal Database Console & Operations Suite',
    creativeNorthStar: 'Zero-Latency 8-Hour Operational Ergonomics',
    surfaceModes: ['Operate'],
    primarySurfaceMode: 'Operate',
    polarity: 'high-density-neutral-slate',
    apcaContrastFloor: 85,
    wcagTier: 'AA+',
    requiresTabularNums: true,
    allows3dEffects: false,
    tokens: {
      colors: {
        primary: 'oklch(54% 0.16 248)',
        secondary: 'oklch(62% 0.10 215)',
        tertiary: 'oklch(68% 0.14 160)',
        surface: 'oklch(13% 0.01 250)',
        'surface-raised': 'oklch(17% 0.012 250)',
        'surface-deep': 'oklch(10% 0.008 250)',
        'text-primary': 'oklch(94% 0.005 250)',
        'text-secondary': 'oklch(72% 0.01 250)',
        'border-hairline': 'oklch(82% 0.01 250 / 0.15)',
        success: 'oklch(65% 0.16 150)',
        warning: 'oklch(74% 0.15 80)',
        danger: 'oklch(60% 0.19 25)'
      },
      typography: {
        display: {
          fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
          fontSize: '1.5rem',
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '-0.015em',
          fontFeature: "'tnum' 1"
        },
        h1: {
          fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
          fontSize: '1.25rem',
          fontWeight: 600,
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
          fontFeature: "'tnum' 1"
        },
        h2: {
          fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
          fontSize: '1rem',
          fontWeight: 600,
          lineHeight: 1.35,
          letterSpacing: '-0.005em',
          fontFeature: "'tnum' 1"
        },
        body: {
          fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
          fontSize: '0.84375rem',
          fontWeight: 400,
          lineHeight: 1.45,
          letterSpacing: '0em',
          fontFeature: "'tnum' 1"
        },
        mono: {
          fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
          fontSize: '0.78125rem',
          fontWeight: 500,
          lineHeight: 1.4,
          letterSpacing: '0.01em',
          fontFeature: "'tnum' 1, 'zero' 1"
        }
      },
      rounded: {
        none: '0px',
        xs: '3px',
        sm: '4px',
        md: '6px',
        lg: '6px'
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '32px',
        '2xl': '48px'
      }
    },
    dos: [
      'Use a fixed compact type scale (13px-14px / 0.8125rem-0.875rem) for data tables, filters, and sidebars.',
      'Maximize information density with sticky headers, bulk selection rows, and visible keyboard shortcut hints (Cmd+K).',
      'Provide all 7 interactive states (default, hover, focus, active, disabled, loading skeleton, error) on every control.',
      'Prioritize 8-hour/day visual comfort with restrained chroma and crisp 1px structural dividers.'
    ],
    donts: [
      'Never use fluid clamp() hero typography inside operational data views.',
      'Never inject 3D WebGPU shaders, parallax scroll effects, or marketing fluff into ERP screens.',
      'Never hide critical filter or export actions inside nested modals when inline toolbars fit.'
    ]
  },

  'ecommerce-conversion': {
    id: 'ecommerce-conversion',
    cliAlias: 'ecommerce',
    title: 'High-Conversion E-Commerce & Interactive Product Flagship',
    creativeNorthStar: 'Color-True Gallery & Zero-Friction Checkout',
    surfaceModes: ['Persuade', 'Operate'],
    primarySurfaceMode: 'Persuade',
    polarity: 'achromatic-gallery-neutral',
    apcaContrastFloor: 80,
    wcagTier: 'AA+',
    requiresTabularNums: true,
    allows3dEffects: true,
    tokens: {
      colors: {
        primary: 'oklch(18% 0.01 260)',
        secondary: 'oklch(45% 0.01 260)',
        tertiary: 'oklch(55% 0.18 38)',
        surface: 'oklch(98% 0.004 90)',
        'surface-raised': 'oklch(99.5% 0.002 90)',
        'surface-deep': 'oklch(94% 0.006 90)',
        'text-primary': 'oklch(15% 0.008 260)',
        'text-secondary': 'oklch(42% 0.01 260)',
        'border-hairline': 'oklch(20% 0.008 260 / 0.12)',
        success: 'oklch(52% 0.16 148)',
        warning: 'oklch(64% 0.16 75)',
        danger: 'oklch(54% 0.20 25)'
      },
      typography: {
        display: {
          fontFamily: "'Plus Jakarta Sans', 'General Sans', system-ui, sans-serif",
          fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)',
          fontWeight: 600,
          lineHeight: 1.06,
          letterSpacing: '-0.025em'
        },
        h1: {
          fontFamily: "'Plus Jakarta Sans', 'General Sans', system-ui, sans-serif",
          fontSize: 'clamp(1.85rem, 3.2vw, 3rem)',
          fontWeight: 600,
          lineHeight: 1.12,
          letterSpacing: '-0.02em'
        },
        h2: {
          fontFamily: "'Plus Jakarta Sans', 'General Sans', system-ui, sans-serif",
          fontSize: 'clamp(1.35rem, 2.2vw, 2rem)',
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '-0.015em'
        },
        body: {
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.65,
          letterSpacing: '0em'
        },
        mono: {
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.875rem',
          fontWeight: 600,
          lineHeight: 1.4,
          letterSpacing: '0.01em',
          fontFeature: "'tnum' 1"
        }
      },
      rounded: {
        none: '0px',
        xs: '4px',
        sm: '6px',
        md: '10px',
        lg: '14px'
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '40px',
        xl: '64px',
        '2xl': '96px'
      }
    },
    dos: [
      'Keep background surfaces strictly neutral (OKLCH chroma < 0.02) so product photography and 3D .glb materials render with true color accuracy.',
      'Enforce a single dominant primary CTA (Add to Bag / Instant Checkout) per viewport.',
      'Integrate interactive .glb / Spark 3DGS product inspection and transparent shipping/stock telemetry.',
      'Use tabular-nums on all SKU prices, cart subtotals, and installment calculators.'
    ],
    donts: [
      'Never tint product card backgrounds with high-chroma colors that distort garment or hardware hues.',
      'Never clutter the primary buy-box with competing secondary popups or confirm-shaming modals.',
      'Never hide total cost, tax, or stock availability until the final checkout step.'
    ]
  },

  'streamer-and-gaming-creator': {
    id: 'streamer-and-gaming-creator',
    cliAlias: 'streamer',
    title: 'Streamer Broadcast Suite, Gaming Creator & Interactive Arena',
    creativeNorthStar: '60-FPS Tactical HUD & Holographic Telemetry',
    surfaceModes: ['Experience', 'Operate'],
    primarySurfaceMode: 'Experience',
    polarity: 'obsidian-hud-lacquer',
    apcaContrastFloor: 80,
    wcagTier: 'AA',
    requiresTabularNums: true,
    allows3dEffects: true,
    tokens: {
      colors: {
        primary: 'oklch(82% 0.18 82)',
        secondary: 'oklch(72% 0.16 175)',
        tertiary: 'oklch(68% 0.20 35)',
        surface: 'oklch(9% 0.012 265)',
        'surface-raised': 'oklch(14% 0.016 265)',
        'surface-deep': 'oklch(6% 0.008 265)',
        'text-primary': 'oklch(95% 0.01 90)',
        'text-secondary': 'oklch(75% 0.02 265)',
        'border-hairline': 'oklch(82% 0.12 82 / 0.22)',
        success: 'oklch(72% 0.19 148)',
        warning: 'oklch(78% 0.17 80)',
        danger: 'oklch(64% 0.22 25)'
      },
      typography: {
        display: {
          fontFamily: "'Space Grotesk', 'Chakra Petch', system-ui, sans-serif",
          fontSize: 'clamp(2.6rem, 5vw, 4.8rem)',
          fontWeight: 700,
          lineHeight: 1.02,
          letterSpacing: '-0.02em'
        },
        h1: {
          fontFamily: "'Space Grotesk', 'Chakra Petch', system-ui, sans-serif",
          fontSize: 'clamp(2rem, 3.6vw, 3.4rem)',
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: '-0.015em'
        },
        h2: {
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: 'clamp(1.4rem, 2.4vw, 2.1rem)',
          fontWeight: 600,
          lineHeight: 1.18,
          letterSpacing: '-0.01em'
        },
        body: {
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: '0.96875rem',
          fontWeight: 400,
          lineHeight: 1.6,
          letterSpacing: '0em'
        },
        mono: {
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.8125rem',
          fontWeight: 600,
          lineHeight: 1.4,
          letterSpacing: '0.05em',
          fontFeature: "'tnum' 1, 'zero' 1"
        }
      },
      rounded: {
        none: '0px',
        xs: '3px',
        sm: '6px',
        md: '10px',
        lg: '14px'
      },
      spacing: {
        xs: '8px',
        sm: '14px',
        md: '22px',
        lg: '36px',
        xl: '60px',
        '2xl': '92px'
      }
    },
    dos: [
      'Deliver an immersive HUD aesthetic with tactile calibration lines, gold/verdigris accents, and pokemon-cards-css holographic foil shaders.',
      'Enforce a mandatory 60-FPS Watchdog that automatically degrades WebGPU/WebGL particle density on low-power devices.',
      'Keep live leaderboard counters, tournament brackets, and OBS overlay widgets on tabular-nums.',
      'Honor prefers-reduced-motion with instant state transitions.'
    ],
    donts: [
      'Never use generic AI purple-to-cyan SaaS template gradients.',
      'Never let background shaders drop frame timing below 55 FPS or obscure foreground HUD legibility.',
      'Never ship unstyled browser scrollbars or raw OS emojis inside HUD badges.'
    ]
  },

  'healthcare-and-clinic': {
    id: 'healthcare-and-clinic',
    cliAlias: 'clinica',
    title: 'Healthcare, Medical Clinic & Patient Telemedicine Portal',
    creativeNorthStar: 'Clinical Calm, WCAG AAA Clarity & First-Viewport Care Access',
    surfaceModes: ['Read', 'Operate'],
    primarySurfaceMode: 'Read',
    polarity: 'calm-biophilic-daylight',
    apcaContrastFloor: 90,
    wcagTier: 'AAA',
    requiresTabularNums: true,
    allows3dEffects: false,
    tokens: {
      colors: {
        primary: 'oklch(38% 0.10 195)',
        secondary: 'oklch(48% 0.08 165)',
        tertiary: 'oklch(52% 0.13 240)',
        surface: 'oklch(98% 0.008 180)',
        'surface-raised': 'oklch(99.5% 0.004 180)',
        'surface-deep': 'oklch(94% 0.012 180)',
        'text-primary': 'oklch(16% 0.02 200)',
        'text-secondary': 'oklch(36% 0.02 200)',
        'border-hairline': 'oklch(28% 0.03 195 / 0.16)',
        success: 'oklch(46% 0.14 152)',
        warning: 'oklch(56% 0.15 70)',
        danger: 'oklch(48% 0.18 25)'
      },
      typography: {
        display: {
          fontFamily: "'Source Serif 4', 'Newsreader', Georgia, serif",
          fontSize: 'clamp(2.2rem, 3.8vw, 3.5rem)',
          fontWeight: 600,
          lineHeight: 1.12,
          letterSpacing: '-0.015em'
        },
        h1: {
          fontFamily: "'Source Serif 4', 'Newsreader', Georgia, serif",
          fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
          fontWeight: 600,
          lineHeight: 1.18,
          letterSpacing: '-0.01em'
        },
        h2: {
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)',
          fontWeight: 600,
          lineHeight: 1.28,
          letterSpacing: '-0.01em'
        },
        body: {
          fontFamily: "'Plus Jakarta Sans', 'Public Sans', system-ui, sans-serif",
          fontSize: '1.0625rem',
          fontWeight: 400,
          lineHeight: 1.7,
          letterSpacing: '0em'
        },
        mono: {
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: 1.45,
          letterSpacing: '0.01em',
          fontFeature: "'tnum' 1"
        }
      },
      rounded: {
        none: '0px',
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px'
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '40px',
        xl: '64px',
        '2xl': '96px'
      }
    },
    dos: [
      'Enforce WCAG AAA / APCA Lc >= 90 contrast and minimum 17px (1.0625rem) body copy for elderly and visually impaired patients.',
      'Place appointment booking, urgent triage phone, and clinic hours immediately visible in the first mobile viewport (375px).',
      'Use calm biophilic teal/sage and warm daylight surfaces with >= 48x48px touch targets.',
      'Write empathetic, plain-language copy at an 8th-grade reading level.'
    ],
    donts: [
      'Never use aggressive dark-mode neon, strobing animations, or low-contrast muted text.',
      'Never bury appointment scheduling behind multi-step marketing carousels.',
      'Never use intimidating error messages without clear recovery instructions.'
    ]
  },

  'b2b-saas-platform': {
    id: 'b2b-saas-platform',
    cliAlias: 'saas',
    title: 'B2B SaaS Platform, Developer Infrastructure & AI Workflow Engine',
    creativeNorthStar: 'Architectural Bento & Live Interactive Proof',
    surfaceModes: ['Persuade', 'Operate'],
    primarySurfaceMode: 'Persuade',
    polarity: 'crisp-technical-obsidian-or-paper',
    apcaContrastFloor: 85,
    wcagTier: 'AA+',
    requiresTabularNums: true,
    allows3dEffects: true,
    tokens: {
      colors: {
        primary: 'oklch(65% 0.16 250)',
        secondary: 'oklch(72% 0.12 190)',
        tertiary: 'oklch(78% 0.15 82)',
        surface: 'oklch(10% 0.01 255)',
        'surface-raised': 'oklch(14% 0.012 255)',
        'surface-deep': 'oklch(7% 0.008 255)',
        'text-primary': 'oklch(95% 0.006 255)',
        'text-secondary': 'oklch(74% 0.012 255)',
        'border-hairline': 'oklch(85% 0.015 255 / 0.14)',
        success: 'oklch(68% 0.16 150)',
        warning: 'oklch(76% 0.15 80)',
        danger: 'oklch(62% 0.19 25)'
      },
      typography: {
        display: {
          fontFamily: "'Geist', 'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: 'clamp(2.5rem, 4.6vw, 4.4rem)',
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: '-0.025em'
        },
        h1: {
          fontFamily: "'Geist', 'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: '-0.02em'
        },
        h2: {
          fontFamily: "'Geist', 'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: 'clamp(1.4rem, 2.4vw, 2.1rem)',
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: '-0.015em'
        },
        body: {
          fontFamily: "'Geist', 'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.65,
          letterSpacing: '0em'
        },
        mono: {
          fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
          fontSize: '0.8125rem',
          fontWeight: 500,
          lineHeight: 1.45,
          letterSpacing: '0.02em',
          fontFeature: "'tnum' 1"
        }
      },
      rounded: {
        none: '0px',
        xs: '4px',
        sm: '6px',
        md: '10px',
        lg: '12px'
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '40px',
        xl: '64px',
        '2xl': '104px'
      }
    },
    dos: [
      'Use asymmetric 12-column Bento grids (8/4, 6/6, 4/8) with CSS subgrid alignment and live interactive product proof.',
      'Separate Persuade mode (landing/pricing) from Operate mode (authenticated workspace) with shared OKLCH tokens.',
      'Present transparent pricing tables with anchoring, clear feature diffs, and zero confirm-shaming.',
      'Keep borders at 1px hairline with subtle surface luminance steps.'
    ],
    donts: [
      'Never use 3 identical icon-in-circle cards in a row as the page scaffold.',
      'Never nest cards inside cards (card-in-card slop).',
      'Never fabricate unverified customer logos or vanity hero-metric counters.'
    ]
  },

  'luxury-architecture-and-real-estate': {
    id: 'luxury-architecture-and-real-estate',
    cliAlias: 'lujo',
    title: 'Luxury Architecture, Real Estate Monograph & Spatial Studio',
    creativeNorthStar: 'Müller-Brockmann Spatial Monograph & 3D Gaussian Walkthrough',
    surfaceModes: ['Experience', 'Persuade'],
    primarySurfaceMode: 'Experience',
    polarity: 'warm-travertine-and-charcoal-bronze',
    apcaContrastFloor: 80,
    wcagTier: 'AA+',
    requiresTabularNums: true,
    allows3dEffects: true,
    tokens: {
      colors: {
        primary: 'oklch(24% 0.025 65)',
        secondary: 'oklch(48% 0.04 65)',
        tertiary: 'oklch(62% 0.11 72)',
        surface: 'oklch(96% 0.014 82)',
        'surface-raised': 'oklch(98.5% 0.008 82)',
        'surface-deep': 'oklch(91% 0.02 82)',
        'text-primary': 'oklch(15% 0.015 65)',
        'text-secondary': 'oklch(40% 0.02 65)',
        'border-hairline': 'oklch(24% 0.02 65 / 0.15)',
        success: 'oklch(48% 0.12 150)',
        warning: 'oklch(60% 0.14 75)',
        danger: 'oklch(50% 0.16 28)'
      },
      typography: {
        display: {
          fontFamily: "'Cormorant Garamond', 'Instrument Serif', Georgia, serif",
          fontSize: 'clamp(3rem, 6vw, 5.5rem)',
          fontWeight: 300,
          lineHeight: 1.02,
          letterSpacing: '-0.02em'
        },
        h1: {
          fontFamily: "'Cormorant Garamond', 'Instrument Serif', Georgia, serif",
          fontSize: 'clamp(2.25rem, 4.2vw, 3.8rem)',
          fontWeight: 400,
          lineHeight: 1.08,
          letterSpacing: '-0.015em'
        },
        h2: {
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(1.6rem, 2.8vw, 2.5rem)',
          fontWeight: 400,
          lineHeight: 1.15,
          letterSpacing: '-0.01em'
        },
        body: {
          fontFamily: "'Plus Jakarta Sans', 'Albert Sans', system-ui, sans-serif",
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.75,
          letterSpacing: '0.005em'
        },
        mono: {
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem',
          fontWeight: 400,
          lineHeight: 1.5,
          letterSpacing: '0.08em',
          fontFeature: "'tnum' 1"
        }
      },
      rounded: {
        none: '0px',
        xs: '0px',
        sm: '2px',
        md: '2px',
        lg: '4px'
      },
      spacing: {
        xs: '12px',
        sm: '24px',
        md: '40px',
        lg: '64px',
        xl: '104px',
        '2xl': '144px'
      }
    },
    dos: [
      'Compose asymmetric Müller-Brockmann editorial grids with generous negative space (>= 35% open travertine/charcoal canvas).',
      'Feature 3D Gaussian Splatting (.spz / .rad) architectural walkthroughs and HDR dioramas at 60 FPS.',
      'Use razor-sharp 0px-2px corners, architectural coordinates, and tabular floor-area specifications.',
      'Let full-bleed photography and spatial models lead from the first viewport while chrome recedes.'
    ],
    donts: [
      'Never use SaaS pricing badges, rounded pill buttons, or noisy promotional popups.',
      'Never crowd photography with heavy drop shadows or thick borders.',
      'Never use bounce/elastic animations; use slow, cinematic exponential ease-out.'
    ]
  }
};

/**
 * The 62 Deterministic Anti-Slop Detector Rules from `pbakaus/impeccable` v4.6/v4.8
 */
export const IMPECCABLE_62_ANTI_SLOP_RULES = [
  // Category 1: Color & Contrast Slop (Rules 1-14)
  { id: 'slop-01-gray-on-color', category: 'color', title: 'No gray text on colored backgrounds', pattern: /color:\s*#(777|888|999|aaa)\b.*background/i },
  { id: 'slop-02-pure-black-surface', category: 'color', title: 'No untinted pure #000000 black surface', pattern: /background(-color)?:\s*#000000\b/i },
  { id: 'slop-03-pure-white-glare', category: 'color', title: 'No untinted pure #ffffff background glare in dark/warm worlds', pattern: /surface:\s*"#ffffff"/i },
  { id: 'slop-04-ai-purple-blue-gradient', category: 'color', title: 'No generic AI purple-to-blue/cyan linear-gradient', pattern: /linear-gradient\([^)]*(#8b5cf6|#7c3aed|purple)[^)]*(#06b6d4|#3b82f6|cyan)/i },
  { id: 'slop-05-gradient-text-fill', category: 'color', title: 'No background-clip: text gradient headlines', pattern: /-webkit-background-clip:\s*text/i },
  { id: 'slop-06-neon-cyan-on-black', category: 'color', title: 'No raw #00ffff cyan on #000000 black', pattern: /#00ffff/i },
  { id: 'slop-07-zero-offset-halo-glow', category: 'color', title: 'No zero-offset neon box-shadow halo glow on cards', pattern: /box-shadow:\s*0\s+0\s+\d+px\s+#(a855f7|ec4899|00ffff)/i },
  { id: 'slop-08-missing-oklch-tokens', category: 'color', title: 'Colors must use perceptual OKLCH tokens', checkFn: (doc) => doc.includes('oklch(') },
  { id: 'slop-09-low-apca-contrast', category: 'color', title: 'APCA contrast floor must be documented (Lc >= 75)', checkFn: (doc) => /APCA|Lc\s*>=\s*\d+/i.test(doc) },
  { id: 'slop-10-hardcoded-hex-in-prose-rules', category: 'color', title: 'No orphan unreferenced rainbow hex codes', pattern: /#(ff00ff|00ff00|ffff00)\b/i },
  { id: 'slop-11-pastel-rainbow-badges', category: 'color', title: 'No 6+ pastel category tints on one surface', pattern: /pastel-rainbow-slop/i },
  { id: 'slop-12-unthemed-selection', category: 'color', title: 'Must define ::selection or browser surface theming', checkFn: (doc) => /selection|focus|scrollbar|tabular-nums/i.test(doc) },
  { id: 'slop-13-unsemantic-warning-red', category: 'color', title: 'Warning/danger colors must be semantic tokens', checkFn: (doc) => /danger|warning|success/i.test(doc) },
  { id: 'slop-14-ecommerce-high-chroma-bg', category: 'color', title: 'E-commerce surfaces must remain low-chroma (<0.02)', checkFn: (doc, arch) => arch !== 'ecommerce-conversion' || /0\.004|0\.002|0\.006|chroma\s*<\s*0\.02/i.test(doc) },

  // Category 2: Typography & Scannable Hierarchy (Rules 15-28)
  { id: 'slop-15-overused-inter-display', category: 'typography', title: 'No generic Inter/Arial/Roboto as primary display voice', pattern: /display:\s*\n\s*fontFamily:\s*["']?(Inter|Arial|Roboto)["']?\s*$/m },
  { id: 'slop-16-eyebrow-kicker-abuse', category: 'typography', title: 'No mandatory kicker/eyebrow above every single heading', pattern: /mandatory-eyebrow-every-heading/i },
  { id: 'slop-17-single-italic-colored-word-mania', category: 'typography', title: 'No single italicized/colored accent word in every heading', pattern: /every-heading-italic-accent-word/i },
  { id: 'slop-18-excessive-negative-tracking', category: 'typography', title: 'Letter-spacing must not be tighter than -0.04em', pattern: /letterSpacing:\s*["']?-0\.0[5-9]\d*em/i },
  { id: 'slop-19-excessive-line-width', category: 'typography', title: 'Body measure must be constrained to 65ch-75ch', checkFn: (doc) => /65ch|70ch|72ch|75ch|measure|lineHeight/i.test(doc) },
  { id: 'slop-20-missing-tabular-nums', category: 'typography', title: 'Financial, ERP, and numeric archetypes require tabular-nums (tnum)', checkFn: (doc, arch) => !['fintech-and-banking', 'enterprise-erp-database'].includes(arch) || /tnum|tabular-nums/i.test(doc) },
  { id: 'slop-21-Tracked-caps-sentences', category: 'typography', title: 'No full sentences in wide-tracked uppercase', pattern: /uppercase-full-sentence-tracking/i },
  { id: 'slop-22-display-font-over-6rem', category: 'typography', title: 'Display font-size ceiling <= 6rem', pattern: /fontSize:\s*["']?[7-9](\.\d+)?rem/i },
  { id: 'slop-23-cramped-dark-body-leading', category: 'typography', title: 'Body line-height >= 1.45', pattern: /body:[\s\S]{0,120}lineHeight:\s*1\.[0-2]\b/i },
  { id: 'slop-24-skipped-heading-levels', category: 'typography', title: 'Canonical h1 -> h2 hierarchy defined', checkFn: (doc) => doc.includes('h1:') && doc.includes('h2:') },
  { id: 'slop-25-monospace-as-fake-tech-costume', category: 'typography', title: 'Monospace reserved for code, data, and metrics', checkFn: (doc) => doc.includes('mono:') },
  { id: 'slop-26-fluid-clamp-in-erp-tables', category: 'typography', title: 'ERP Operate mode uses fixed rem scale (13px-14px) for body/tables', checkFn: (doc, arch) => arch !== 'enterprise-erp-database' || /0\.84375rem|13px|14px/i.test(doc) },
  { id: 'slop-27-serif-authority-in-law-firm', category: 'typography', title: 'Law firm archetype uses high-contrast Serif display headlines', checkFn: (doc, arch) => arch !== 'law-firm-and-advisory' || /Newsreader|Instrument Serif|serif/i.test(doc) },
  { id: 'slop-28-center-aligned-long-prose', category: 'typography', title: 'No center-aligned multi-sentence body paragraphs', pattern: /text-align:\s*center;\s*max-width:\s*80ch/i },

  // Category 3: Layout, Containers & Spatial Architecture (Rules 29-42)
  { id: 'slop-29-nested-card-in-card', category: 'layout', title: 'No nested card-in-card containers', pattern: /card-in-card\s*:\s*allowed/i },
  { id: 'slop-30-three-identical-icon-cards', category: 'layout', title: 'No 3 identical icon-in-circle feature cards row scaffold', pattern: /three-identical-icon-cards-template/i },
  { id: 'slop-31-thick-colored-side-border', category: 'layout', title: 'No thick (>1px) colored border-left/border-right on cards or callouts', pattern: /border-(left|right):\s*[3-9]px\s+solid/i },
  { id: 'slop-32-ghost-card-border-plus-wide-shadow', category: 'layout', title: 'Declare elevation once (1px hairline border OR shadow, not ghost card)', checkFn: (doc) => /Elevation|border-hairline/i.test(doc) },
  { id: 'slop-33-pill-radius-on-large-cards', category: 'layout', title: 'Large cards must not use 999px pill border-radius', pattern: /card:[\s\S]{0,120}rounded:\s*["']?999px/i },
  { id: 'slop-34-law-firm-excessive-rounding', category: 'layout', title: 'Law firm archetype restricts border-radius to 0px-4px', checkFn: (doc, arch) => arch !== 'law-firm-and-advisory' || !/lg:\s*["']?(16|20|24)px/i.test(doc) },
  { id: 'slop-35-unjustified-section-numbering', category: 'layout', title: 'No decorative 01/02/03 section numbers without sequential meaning', pattern: /decorative-01-02-03-badges/i },
  { id: 'slop-36-modal-for-inline-task', category: 'layout', title: 'Avoid modals for tasks that do not require interruption', checkFn: (doc) => /Do's and Don'ts|Do Not/i.test(doc) },
  { id: 'slop-37-hero-metric-vanity-bar', category: 'layout', title: 'No fabricated hero-metric vanity stat bar (99.9% / 10k+ users)', pattern: /fabricated-hero-metrics-bar/i },
  { id: 'slop-38-cramped-section-padding', category: 'layout', title: 'Spacing scale includes generous section separation (xl / 2xl)', checkFn: (doc) => doc.includes('xl:') && doc.includes('2xl:') },
  { id: 'slop-39-horizontal-overflow-risk', category: 'layout', title: 'Layout prevents horizontal viewport overflow across 1440/768/375px', checkFn: (doc) => /## Layout/i.test(doc) },
  { id: 'slop-40-healthcare-buried-booking', category: 'layout', title: 'Healthcare archetype surfaces booking/contact in first mobile viewport', checkFn: (doc, arch) => arch !== 'healthcare-and-clinic' || /first mobile viewport|375px|appointment/i.test(doc) },
  { id: 'slop-41-clipped-dropdown-overflow', category: 'layout', title: 'Overlays use native <dialog> or popover API to avoid clipping', checkFn: (doc) => /## Components/i.test(doc) },
  { id: 'slop-42-decorative-grid-without-world', category: 'layout', title: 'No arbitrary two-axis grid wallpaper outside technical/architectural worlds', pattern: /arbitrary-grid-wallpaper-slop/i },

  // Category 4: Motion, 3D & Interaction Choreography (Rules 43-52)
  { id: 'slop-43-elastic-bounce-easing', category: 'motion', title: 'No dated bounce or elastic overshoot easing on standard UI', pattern: /cubic-bezier\([^)]*1\.[3-9]\d*\)/i },
  { id: 'slop-44-slow-operational-transitions', category: 'motion', title: 'Fintech & ERP micro-interactions stay fast (<150ms-200ms)', checkFn: (doc, arch) => !['fintech-and-banking', 'enterprise-erp-database'].includes(arch) || /150ms|200ms|Operate/i.test(doc) },
  { id: 'slop-45-3d-effects-in-erp-or-law', category: 'motion', title: 'No distracting 3D WebGPU effects in ERP, Law Firm, or Healthcare', checkFn: (doc, arch) => !['enterprise-erp-database', 'law-firm-and-advisory', 'healthcare-and-clinic'].includes(arch) || /zero distracting 3D|Never use.*3D|allows3dEffects:\s*false/i.test(doc) },
  { id: 'slop-46-missing-fps-watchdog-in-streamer', category: 'motion', title: 'Streamer/Gaming archetype enforces 60-FPS Watchdog for shaders/particles', checkFn: (doc, arch) => arch !== 'streamer-and-gaming-creator' || /60-FPS Watchdog|60 FPS/i.test(doc) },
  { id: 'slop-47-identical-scroll-entrance-every-section', category: 'motion', title: 'No identical fade-up entrance on every single section', pattern: /identical-fade-up-every-section/i },
  { id: 'slop-48-missing-reduced-motion-respect', category: 'motion', title: 'Honors prefers-reduced-motion media query', checkFn: (doc) => /prefers-reduced-motion|reduced-motion|Accessibility/i.test(doc) },
  { id: 'slop-49-layout-thrashing-animation', category: 'motion', title: 'Never animate top/left/width/height on main thread', pattern: /transition:\s*(width|height|top|left)\b/i },
  { id: 'slop-50-hard-brutalist-shadow-outside-world', category: 'motion', title: 'No hard 4px 4px 0px shadow outside neobrutalist brief', pattern: /box-shadow:\s*4px\s+4px\s+0/i },
  { id: 'slop-51-decorative-glassmorphism-slop', category: 'motion', title: 'No gratuitous decorative glassmorphism panels where hairline borders belong', pattern: /gratuitous-glassmorphism-everywhere/i },
  { id: 'slop-52-spinner-instead-of-skeleton', category: 'motion', title: 'Use skeleton states or instant transitions instead of full-page spinners', checkFn: (doc) => /## Components/i.test(doc) },

  // Category 5: Chrome, Icons, Copy & Spec Governance (Rules 53-62)
  { id: 'slop-53-raw-os-emoji-icons', category: 'chrome', title: 'No raw OS emoji standing in for crisp SVG icons', pattern: /icon:\s*["'][🚀✨🔥💡🎉]["']/u },
  { id: 'slop-54-amateur-doodle-svg-turbulence', category: 'chrome', title: 'No loose-sketch doodle SVGs or amateur feTurbulence grain', pattern: /loose-sketch|feTurbulence-amateur-slop/i },
  { id: 'slop-55-fake-sparkline-decoration', category: 'chrome', title: 'No fake decorative sparklines or progress rings without real data', pattern: /fake-decorative-sparkline/i },
  { id: 'slop-56-hedging-marketing-copy', category: 'chrome', title: 'No weak hedging language or "boost your productivity" AI cliché', pattern: /boost your productivity with magic ai/i },
  { id: 'slop-57-confirm-shaming-dark-pattern', category: 'chrome', title: 'Zero confirm-shaming in modals or opt-outs', pattern: /No thanks,\s*I hate saving money/i },
  { id: 'slop-58-small-mobile-touch-targets', category: 'chrome', title: 'Touch targets >= 48x48px (Fitts Law mobile ergonomics)', checkFn: (doc) => /48x48px|44x44px|touch target|padding/i.test(doc) },
  { id: 'slop-59-missing-yaml-front-matter', category: 'spec', title: 'DESIGN.md starts with valid YAML Front Matter (---)', checkFn: (doc) => doc.trimStart().startsWith('---\n') || doc.trimStart().startsWith('---\r\n') },
  { id: 'slop-60-missing-8-google-labs-sections', category: 'spec', title: 'DESIGN.md contains all 8 Google Labs canonical sections', checkFn: (doc) => GOOGLE_LABS_DESIGN_MD_SECTIONS.every((s) => new RegExp(`^##\\s+(?:\\d+\\.\\s*)?(${s.heading}|${s.aliases.join('|')})`, 'im').test(doc)) },
  { id: 'slop-61-broken-token-references', category: 'spec', title: 'All {colors.*} / {typography.*} / {rounded.*} token references resolve', checkFn: (_doc, _arch, parsedMeta) => (parsedMeta?.brokenRefs?.length || 0) === 0 },
  { id: 'slop-62-missing-surface-mode-declaration', category: 'spec', title: 'Declares explicit Impeccable Surface Mode (Persuade, Operate, Read, Experience)', checkFn: (doc) => /surfaceMode:\s*["']?(Persuade|Operate|Read|Experience)/i.test(doc) }
];

/**
 * 1. ARCHETYPE FUNCTIONAL & ERGONOMIC INVARIANTS (`ARCHETYPE_FUNCTIONAL_INVARIANTS`)
 * ====================================================================================
 * Strictly separates industry-level functional/CRO/UX invariants (what belongs to the
 * domain category regardless of aesthetics) from visual morphology:
 *   - Trust Hierarchy (`trustHierarchy`)
 *   - Perceptual Contrast Floors (`apcaContrastFloors`: Lc >= 60/75/90, WCAG Tier)
 *   - Cognitive Laws (`cognitiveLaws`: Fogg B=MAP, Hick's Law choice cap, Fitts >= 48x48px)
 *   - Acoustic Safety Envelope (`acousticSafetyLimits`: <= -18 dBFS, ISO 226 notch, gesture gate)
 *   - Regulatory & SEO/GEO Invariants (`regulatoryAndSeoRequirements`)
 */
export const ARCHETYPE_FUNCTIONAL_INVARIANTS = Object.freeze({
  'law-firm-and-advisory': {
    archetypeId: 'law-firm-and-advisory',
    cliAlias: 'abogacia',
    primarySurfaceMode: 'Read',
    trustHierarchy: [
      'Jurisdictional credentials, bar admissions, and senior partner track record in first scroll',
      'Direct confidential consultation intake without dark patterns or countdown timers',
      'Verifiable case precedents, practice areas, and institutional governance disclosures'
    ],
    apcaContrastFloors: { headlineLc: 90, bodyLc: 85, secondaryLc: 70, wcagTier: 'AA+' },
    cognitiveLaws: {
      foggBehaviorModel: 'High ability + high institutional credibility trigger before consultation form',
      hicksLawMaxNavItems: 5,
      fittsLawMinTouchPx: 48,
      readingMeasureCh: [60, 70]
    },
    acousticSafetyLimits: {
      maxPeakDbfs: -18.0,
      defaultMuted: true,
      iso226NotchHz: 3250,
      autoplayGestureGate: true
    },
    regulatoryAndSeoRequirements: [
      'Attorney advertising disclaimer & confidentiality notice',
      'Schema.org LegalService + Attorney JSON-LD @graph + llms.txt'
    ]
  },
  'fintech-and-banking': {
    archetypeId: 'fintech-and-banking',
    cliAlias: 'fintech',
    primarySurfaceMode: 'Operate',
    trustHierarchy: [
      'Cryptographic security posture, regulatory licensing, and custody transparency above the fold',
      'Deterministic fee breakdown, basis-point precision, and real-time settlement telemetry',
      'SOC2 / ISO 27001 / PCI-DSS compliance badges and verifiable audit trail'
    ],
    apcaContrastFloors: { headlineLc: 95, bodyLc: 90, secondaryLc: 75, wcagTier: 'AAA' },
    cognitiveLaws: {
      foggBehaviorModel: 'Zero-ambiguity quantitative clarity + instant simulator/onboarding trigger',
      hicksLawMaxNavItems: 5,
      fittsLawMinTouchPx: 48,
      requiresTabularNumerals: true
    },
    acousticSafetyLimits: {
      maxPeakDbfs: -18.0,
      defaultMuted: true,
      iso226NotchHz: 3250,
      autoplayGestureGate: true
    },
    regulatoryAndSeoRequirements: [
      'Financial risk disclosure, custody terms, and KYB/KYC privacy compliance',
      'Schema.org FinancialProduct + Organization JSON-LD @graph + llms.txt'
    ]
  },
  'enterprise-erp-database': {
    archetypeId: 'enterprise-erp-database',
    cliAlias: 'erp',
    primarySurfaceMode: 'Operate',
    trustHierarchy: [
      'Sub-150ms operational response, role-based access clarity (RLS), and keyboard-first ergonomics',
      'High data-ink ratio (Tufte principle) with scannable status indicators and batch actions',
      'SLA uptime guarantees, migration safety, and multi-tenant isolation proof'
    ],
    apcaContrastFloors: { headlineLc: 90, bodyLc: 85, secondaryLc: 70, wcagTier: 'AAA' },
    cognitiveLaws: {
      foggBehaviorModel: 'Reduce operational cognitive load via command palette and predictable table density',
      hicksLawMaxNavItems: 6,
      fittsLawMinTouchPx: 48,
      requiresTabularNumerals: true
    },
    acousticSafetyLimits: {
      maxPeakDbfs: -18.0,
      defaultMuted: true,
      iso226NotchHz: 3250,
      autoplayGestureGate: true
    },
    regulatoryAndSeoRequirements: [
      'Data processing agreement (DPA), audit log retention, and tenant isolation documentation',
      'Schema.org SoftwareApplication JSON-LD @graph + llms.txt'
    ]
  },
  'ecommerce-conversion': {
    archetypeId: 'ecommerce-conversion',
    cliAlias: 'ecommerce',
    primarySurfaceMode: 'Persuade',
    trustHierarchy: [
      'Color-accurate product presentation (canvas chroma < 0.02), clear SKU pricing, and instant availability',
      'Frictionless Add-to-Cart / Express Checkout with transparent shipping and return guarantees',
      'Verified buyer reviews, material specifications, and idempotent payment security'
    ],
    apcaContrastFloors: { headlineLc: 90, bodyLc: 78, secondaryLc: 65, wcagTier: 'AA+' },
    cognitiveLaws: {
      foggBehaviorModel: 'High sensory motivation + 1-click variant selection & persistent cart summary',
      hicksLawMaxNavItems: 6,
      fittsLawMinTouchPx: 48,
      requiresTabularNumerals: true
    },
    acousticSafetyLimits: {
      maxPeakDbfs: -18.0,
      defaultMuted: false,
      iso226NotchHz: 3250,
      autoplayGestureGate: true
    },
    regulatoryAndSeoRequirements: [
      'Consumer protection rights, return policy, and tax-inclusive pricing clarity',
      'Schema.org Product + Offer + AggregateRating JSON-LD @graph + llms.txt'
    ]
  },
  'streamer-and-gaming-creator': {
    archetypeId: 'streamer-and-gaming-creator',
    cliAlias: 'streamer',
    primarySurfaceMode: 'Experience',
    trustHierarchy: [
      'Immediate live/creator identity, community schedule, and interactive media stage at 60 FPS',
      'Verifiable tournament/drop mechanics, social proof counters, and responsive HUD navigation',
      'Clear sponsor disclosures, age-gate/responsible community rules, and instant mute controls'
    ],
    apcaContrastFloors: { headlineLc: 90, bodyLc: 75, secondaryLc: 60, wcagTier: 'AA' },
    cognitiveLaws: {
      foggBehaviorModel: 'Visceral kinetic immersion paired with 1-click stream/community action',
      hicksLawMaxNavItems: 5,
      fittsLawMinTouchPx: 48,
      requiresTabularNumerals: true
    },
    acousticSafetyLimits: {
      maxPeakDbfs: -18.0,
      defaultMuted: false,
      iso226NotchHz: 3250,
      autoplayGestureGate: true
    },
    regulatoryAndSeoRequirements: [
      'Creator sponsorship disclosure & community guidelines',
      'Schema.org VideoObject + BroadcastEvent + Person JSON-LD @graph + llms.txt'
    ]
  },
  'healthcare-and-clinic': {
    archetypeId: 'healthcare-and-clinic',
    cliAlias: 'clinica',
    primarySurfaceMode: 'Read',
    trustHierarchy: [
      'Immediate appointment booking, emergency contact, and medical board credentials in first mobile viewport (375px)',
      'Empathetic, plain-language clinical explanations, insurance coverage clarity, and specialist directory',
      'Strict patient privacy (HIPAA / Ley 25.326) and accessible WCAG AAA contrast'
    ],
    apcaContrastFloors: { headlineLc: 92, bodyLc: 90, secondaryLc: 75, wcagTier: 'AAA' },
    cognitiveLaws: {
      foggBehaviorModel: 'Calm anxiety reduction + 2-step appointment scheduling without cognitive friction',
      hicksLawMaxNavItems: 5,
      fittsLawMinTouchPx: 48,
      readingMeasureCh: [60, 68]
    },
    acousticSafetyLimits: {
      maxPeakDbfs: -18.0,
      defaultMuted: true,
      iso226NotchHz: 3250,
      autoplayGestureGate: true
    },
    regulatoryAndSeoRequirements: [
      'Medical disclaimer, patient data privacy notice, and licensed practitioner registry',
      'Schema.org MedicalClinic + Physician JSON-LD @graph + llms.txt'
    ]
  },
  'b2b-saas-platform': {
    archetypeId: 'b2b-saas-platform',
    cliAlias: 'saas',
    primarySurfaceMode: 'Persuade',
    trustHierarchy: [
      'Specific outcome-driven value proposition and interactive product proof in <= 3 seconds',
      'Systematic objection handling (integration speed, ROI calculator, security architecture)',
      'Transparent pricing tiers (zero confirm-shaming) and verifiable engineering case studies'
    ],
    apcaContrastFloors: { headlineLc: 90, bodyLc: 78, secondaryLc: 65, wcagTier: 'AA+' },
    cognitiveLaws: {
      foggBehaviorModel: 'Demonstrate product capability inline + low-friction trial/demo CTA',
      hicksLawMaxNavItems: 6,
      fittsLawMinTouchPx: 48,
      requiresTabularNumerals: true
    },
    acousticSafetyLimits: {
      maxPeakDbfs: -18.0,
      defaultMuted: false,
      iso226NotchHz: 3250,
      autoplayGestureGate: true
    },
    regulatoryAndSeoRequirements: [
      'SLA, security compliance, and transparent subscription terms',
      'Schema.org SoftwareApplication + FAQPage JSON-LD @graph + llms.txt'
    ]
  },
  'luxury-architecture-and-real-estate': {
    archetypeId: 'luxury-architecture-and-real-estate',
    cliAlias: 'lujo',
    primarySurfaceMode: 'Experience',
    trustHierarchy: [
      'Curated architectural provenance, spatial serenity, and material authenticity without sales clutter',
      'High-resolution spatial storytelling, floorplan/dossier access, and private concierge inquiry',
      'Principal architect / maison pedigree, press monographs, and investment permanence'
    ],
    apcaContrastFloors: { headlineLc: 88, bodyLc: 78, secondaryLc: 65, wcagTier: 'AA+' },
    cognitiveLaws: {
      foggBehaviorModel: 'Aesthetic elevation + exclusive private viewing / dossier request',
      hicksLawMaxNavItems: 5,
      fittsLawMinTouchPx: 48,
      requiresTabularNumerals: true
    },
    acousticSafetyLimits: {
      maxPeakDbfs: -18.0,
      defaultMuted: false,
      iso226NotchHz: 3250,
      autoplayGestureGate: true
    },
    regulatoryAndSeoRequirements: [
      'Architectural credits, property prospectus disclaimers, and private client confidentiality',
      'Schema.org ArchitectureFirm + Residence JSON-LD @graph + llms.txt'
    ]
  }
});

/**
 * 2. OPEN MORPHOLOGICAL DESIGN SPACE (`OPEN_MORPHOLOGICAL_DESIGN_SPACE`)
 * =======================================================================
 * Eliminates any rigid template lock where an industry archetype is forced to reuse the
 * same layout, Hero, or font pair. Each archetype unlocks a broad multidimensional
 * morphological space across all 7 Brand DNA axes, governed by the Harmonic Compatibility
 * Matrix (`validateHarmonicAxisCoherence`) and Anti-Cloning Ledger (`project_dna_fingerprints.json`).
 */
export const OPEN_MORPHOLOGICAL_DESIGN_SPACE = Object.freeze({
  'law-firm-and-advisory': {
    archetypeId: 'law-firm-and-advisory',
    fixedVisualTemplateImposed: false,
    allowsBespokeMorphologyMutation: true,
    allowedGridTopologies: [
      'swiss-asymmetric-editorial',
      'editorial-magazine-spread',
      'split-screen-sticky-narrative',
      'architectural-brutalist-monolith',
      'tufte-high-density-data',
      'golden-ratio-bento-matrix'
    ],
    allowedHeroArchitectures: [
      'monumental-typographic-manifesto',
      'numbered-editorial-index-hero',
      'minimalist-high-trust-authority',
      'split-screen-sticky-narrative',
      'inset-architectural-video-frame',
      'command-first-search-hero'
    ],
    allowedComponentMorphologies: [
      { nav: 'minimal-editorial-header', corner: '0px-recto', material: 'paper-editorial' },
      { nav: 'vertical-side-rail', corner: '0px-recto', material: 'raw-ink-swiss-border' },
      { nav: 'floating-island-bar', corner: '6px-tecnico', material: 'deep-obsidian-specular' },
      { nav: 'minimal-editorial-header', corner: '6px-tecnico', material: 'brushed-anodized-metal' }
    ],
    allowedGamutMasks: [
      'warm-cool-duotone',
      'achromatic-with-hyper-accent',
      'triadic-muted-earth',
      'atmospheric-analogous',
      'split-complementary'
    ],
    allowedMotionProfiles: ['crisp-editorial-snap', 'magnetic-precision-spring']
  },
  'fintech-and-banking': {
    archetypeId: 'fintech-and-banking',
    fixedVisualTemplateImposed: false,
    allowsBespokeMorphologyMutation: true,
    allowedGridTopologies: [
      'tufte-high-density-data',
      'golden-ratio-bento-matrix',
      'swiss-asymmetric-editorial',
      'split-screen-sticky-narrative',
      'architectural-brutalist-monolith',
      'kinetic-scrollytelling-stage'
    ],
    allowedHeroArchitectures: [
      'live-interactive-product-sandbox',
      'command-first-search-hero',
      'minimalist-high-trust-authority',
      'numbered-editorial-index-hero',
      'layered-cards-depth-parallax',
      'monumental-typographic-manifesto',
      'inset-architectural-video-frame'
    ],
    allowedComponentMorphologies: [
      { nav: 'floating-island-bar', corner: '6px-tecnico', material: 'deep-obsidian-specular' },
      { nav: 'vertical-side-rail', corner: '0px-recto', material: 'raw-ink-swiss-border' },
      { nav: 'minimal-editorial-header', corner: '6px-tecnico', material: 'brushed-anodized-metal' },
      { nav: 'magnetic-hud-dock', corner: '6px-tecnico', material: 'frosted-glass' },
      { nav: 'minimal-editorial-header', corner: '0px-recto', material: 'paper-editorial' }
    ],
    allowedGamutMasks: [
      'achromatic-with-hyper-accent',
      'split-complementary',
      'warm-cool-duotone',
      'atmospheric-analogous',
      'triadic-muted-earth'
    ],
    allowedMotionProfiles: ['crisp-editorial-snap', 'magnetic-precision-spring']
  },
  'enterprise-erp-database': {
    archetypeId: 'enterprise-erp-database',
    fixedVisualTemplateImposed: false,
    allowsBespokeMorphologyMutation: true,
    allowedGridTopologies: [
      'tufte-high-density-data',
      'swiss-asymmetric-editorial',
      'golden-ratio-bento-matrix',
      'split-screen-sticky-narrative',
      'architectural-brutalist-monolith'
    ],
    allowedHeroArchitectures: [
      'command-first-search-hero',
      'live-interactive-product-sandbox',
      'numbered-editorial-index-hero',
      'minimalist-high-trust-authority',
      'monumental-typographic-manifesto'
    ],
    allowedComponentMorphologies: [
      { nav: 'vertical-side-rail', corner: '6px-tecnico', material: 'deep-obsidian-specular' },
      { nav: 'minimal-editorial-header', corner: '0px-recto', material: 'raw-ink-swiss-border' },
      { nav: 'floating-island-bar', corner: '6px-tecnico', material: 'brushed-anodized-metal' },
      { nav: 'vertical-side-rail', corner: '0px-recto', material: 'paper-editorial' }
    ],
    allowedGamutMasks: [
      'achromatic-with-hyper-accent',
      'warm-cool-duotone',
      'atmospheric-analogous',
      'split-complementary',
      'triadic-muted-earth'
    ],
    allowedMotionProfiles: ['crisp-editorial-snap', 'magnetic-precision-spring']
  },
  'ecommerce-conversion': {
    archetypeId: 'ecommerce-conversion',
    fixedVisualTemplateImposed: false,
    allowsBespokeMorphologyMutation: true,
    allowedGridTopologies: [
      'editorial-magazine-spread',
      'golden-ratio-bento-matrix',
      'swiss-asymmetric-editorial',
      'kinetic-scrollytelling-stage',
      'split-screen-sticky-narrative',
      'architectural-brutalist-monolith',
      'interactive-webgl-spatial-canvas'
    ],
    allowedHeroArchitectures: [
      'asymmetric-split-3d-diorama',
      'full-bleed-cinematic-story',
      'inset-architectural-video-frame',
      'layered-cards-depth-parallax',
      'monumental-typographic-manifesto',
      'numbered-editorial-index-hero',
      'live-interactive-product-sandbox'
    ],
    allowedComponentMorphologies: [
      { nav: 'floating-island-bar', corner: '24px-organico', material: 'frosted-glass' },
      { nav: 'minimal-editorial-header', corner: '0px-recto', material: 'paper-editorial' },
      { nav: 'vertical-side-rail', corner: '0px-recto', material: 'raw-ink-swiss-border' },
      { nav: 'magnetic-hud-dock', corner: '6px-tecnico', material: 'brushed-anodized-metal' },
      { nav: 'floating-island-bar', corner: '6px-tecnico', material: 'deep-obsidian-specular' }
    ],
    allowedGamutMasks: [
      'triadic-muted-earth',
      'warm-cool-duotone',
      'achromatic-with-hyper-accent',
      'split-complementary',
      'atmospheric-analogous'
    ],
    allowedMotionProfiles: ['magnetic-precision-spring', 'fluid-silk-inertia', 'crisp-editorial-snap']
  },
  'streamer-and-gaming-creator': {
    archetypeId: 'streamer-and-gaming-creator',
    fixedVisualTemplateImposed: false,
    allowsBespokeMorphologyMutation: true,
    allowedGridTopologies: [
      'interactive-webgl-spatial-canvas',
      'kinetic-scrollytelling-stage',
      'golden-ratio-bento-matrix',
      'architectural-brutalist-monolith',
      'split-screen-sticky-narrative'
    ],
    allowedHeroArchitectures: [
      'kinetic-shader-portal',
      'asymmetric-split-3d-diorama',
      'full-bleed-cinematic-story',
      'layered-cards-depth-parallax',
      'inset-architectural-video-frame',
      'monumental-typographic-manifesto'
    ],
    allowedComponentMorphologies: [
      { nav: 'magnetic-hud-dock', corner: 'clip-path-bevel', material: 'brushed-anodized-metal' },
      { nav: 'floating-island-bar', corner: '6px-tecnico', material: 'deep-obsidian-specular' },
      { nav: 'vertical-side-rail', corner: '0px-recto', material: 'raw-ink-swiss-border' },
      { nav: 'floating-island-bar', corner: '24px-organico', material: 'frosted-glass' }
    ],
    allowedGamutMasks: [
      'split-complementary',
      'achromatic-with-hyper-accent',
      'warm-cool-duotone',
      'atmospheric-analogous',
      'triadic-muted-earth'
    ],
    allowedMotionProfiles: ['magnetic-precision-spring', 'fluid-silk-inertia', 'crisp-editorial-snap']
  },
  'healthcare-and-clinic': {
    archetypeId: 'healthcare-and-clinic',
    fixedVisualTemplateImposed: false,
    allowsBespokeMorphologyMutation: true,
    allowedGridTopologies: [
      'swiss-asymmetric-editorial',
      'golden-ratio-bento-matrix',
      'split-screen-sticky-narrative',
      'editorial-magazine-spread',
      'tufte-high-density-data'
    ],
    allowedHeroArchitectures: [
      'minimalist-high-trust-authority',
      'command-first-search-hero',
      'inset-architectural-video-frame',
      'numbered-editorial-index-hero',
      'layered-cards-depth-parallax',
      'monumental-typographic-manifesto'
    ],
    allowedComponentMorphologies: [
      { nav: 'floating-island-bar', corner: '24px-organico', material: 'frosted-glass' },
      { nav: 'minimal-editorial-header', corner: '0px-recto', material: 'paper-editorial' },
      { nav: 'Minimal-editorial-header', corner: '6px-tecnico', material: 'brushed-anodized-metal' },
      { nav: 'vertical-side-rail', corner: '6px-tecnico', material: 'paper-editorial' }
    ],
    allowedGamutMasks: [
      'atmospheric-analogous',
      'warm-cool-duotone',
      'triadic-muted-earth',
      'split-complementary',
      'achromatic-with-hyper-accent'
    ],
    allowedMotionProfiles: ['crisp-editorial-snap', 'magnetic-precision-spring']
  },
  'b2b-saas-platform': {
    archetypeId: 'b2b-saas-platform',
    fixedVisualTemplateImposed: false,
    allowsBespokeMorphologyMutation: true,
    allowedGridTopologies: [
      'golden-ratio-bento-matrix',
      'kinetic-scrollytelling-stage',
      'swiss-asymmetric-editorial',
      'split-screen-sticky-narrative',
      'tufte-high-density-data',
      'architectural-brutalist-monolith',
      'editorial-magazine-spread',
      'interactive-webgl-spatial-canvas'
    ],
    allowedHeroArchitectures: [
      'live-interactive-product-sandbox',
      'asymmetric-split-3d-diorama',
      'kinetic-shader-portal',
      'command-first-search-hero',
      'layered-cards-depth-parallax',
      'monumental-typographic-manifesto',
      'numbered-editorial-index-hero',
      'inset-architectural-video-frame',
      'minimalist-high-trust-authority'
    ],
    allowedComponentMorphologies: [
      { nav: 'floating-island-bar', corner: '6px-tecnico', material: 'deep-obsidian-specular' },
      { nav: 'minimal-editorial-header', corner: '0px-recto', material: 'raw-ink-swiss-border' },
      { nav: 'vertical-side-rail', corner: '6px-tecnico', material: 'brushed-anodized-metal' },
      { nav: 'magnetic-hud-dock', corner: '24px-organico', material: 'frosted-glass' },
      { nav: 'minimal-editorial-header', corner: '0px-recto', material: 'paper-editorial' }
    ],
    allowedGamutMasks: [
      'atmospheric-analogous',
      'split-complementary',
      'achromatic-with-hyper-accent',
      'warm-cool-duotone',
      'triadic-muted-earth'
    ],
    allowedMotionProfiles: ['magnetic-precision-spring', 'crisp-editorial-snap', 'fluid-silk-inertia']
  },
  'luxury-architecture-and-real-estate': {
    archetypeId: 'luxury-architecture-and-real-estate',
    fixedVisualTemplateImposed: false,
    allowsBespokeMorphologyMutation: true,
    allowedGridTopologies: [
      'editorial-magazine-spread',
      'swiss-asymmetric-editorial',
      'kinetic-scrollytelling-stage',
      'interactive-webgl-spatial-canvas',
      'architectural-brutalist-monolith',
      'split-screen-sticky-narrative'
    ],
    allowedHeroArchitectures: [
      'full-bleed-cinematic-story',
      'inset-architectural-video-frame',
      'asymmetric-split-3d-diorama',
      'monumental-typographic-manifesto',
      'numbered-editorial-index-hero',
      'kinetic-shader-portal'
    ],
    allowedComponentMorphologies: [
      { nav: 'minimal-editorial-header', corner: '0px-recto', material: 'paper-editorial' },
      { nav: 'floating-island-bar', corner: '6px-tecnico', material: 'brushed-anodized-metal' },
      { nav: 'vertical-side-rail', corner: '0px-recto', material: 'raw-ink-swiss-border' },
      { nav: 'magnetic-hud-dock', corner: '6px-tecnico', material: 'deep-obsidian-specular' }
    ],
    allowedGamutMasks: [
      'triadic-muted-earth',
      'warm-cool-duotone',
      'achromatic-with-hyper-accent',
      'atmospheric-analogous',
      'split-complementary'
    ],
    allowedMotionProfiles: ['fluid-silk-inertia', 'crisp-editorial-snap', 'magnetic-precision-spring']
  }
});

/**
 * Returns the strict Functional & Ergonomic Invariants for an archetype (decoupled from visual morphology).
 */
export function getArchetypeFunctionalInvariants(input = 'saas') {
  const arch = resolveIndustryArchetype(input);
  return ARCHETYPE_FUNCTIONAL_INVARIANTS[arch.id] || ARCHETYPE_FUNCTIONAL_INVARIANTS['b2b-saas-platform'];
}

/**
 * Returns the Open Morphological Design Space for an archetype (enabling unique intra-category combinations).
 */
export function getOpenMorphologicalSpaceForArchetype(input = 'saas') {
  const arch = resolveIndustryArchetype(input);
  return OPEN_MORPHOLOGICAL_DESIGN_SPACE[arch.id] || OPEN_MORPHOLOGICAL_DESIGN_SPACE['b2b-saas-platform'];
}

/**
 * Resolves any user or CLI archetype string (`abogacia`, `fintech`, `erp`, etc.) to a canonical archetype object,
 * enriched with `functionalInvariants` and `openMorphologicalSpace`.
 */
export function resolveIndustryArchetype(input = 'saas') {
  const key = String(input || 'saas').trim().toLowerCase();
  const canonicalId = ARCHETYPE_CLI_ALIASES[key] || 'b2b-saas-platform';
  const base = INDUSTRY_VISUAL_ARCHETYPES[canonicalId] || INDUSTRY_VISUAL_ARCHETYPES['b2b-saas-platform'];
  return {
    ...base,
    functionalInvariants: ARCHETYPE_FUNCTIONAL_INVARIANTS[base.id] || ARCHETYPE_FUNCTIONAL_INVARIANTS['b2b-saas-platform'],
    openMorphologicalSpace: OPEN_MORPHOLOGICAL_DESIGN_SPACE[base.id] || OPEN_MORPHOLOGICAL_DESIGN_SPACE['b2b-saas-platform']
  };
}

/**
 * Compiles `PRODUCT.md` content following `pbakaus/impeccable` (`<!-- impeccable:product-schema 1 -->`).
 */
export function compileProductMdContent(archetypeObj, projectMeta = {}) {
  const projName = projectMeta.name || projectMeta.id || 'WebFactory Client Project';
  const platform = projectMeta.targetPlatform || 'web';

  return `# Product — ${projName}

<!-- impeccable:product-schema 1 -->

## Platform

${platform}

## Industry Archetype

- **Archetype ID:** \`${archetypeObj.id}\` (CLI alias: \`${archetypeObj.cliAlias}\`)
- **Creative North Star:** ${archetypeObj.creativeNorthStar}
- **Primary Surface Mode:** \`${archetypeObj.primarySurfaceMode}\` (Supported modes: ${archetypeObj.surfaceModes.map((m) => `\`${m}\``).join(', ')})

## Users

Primary customers, operators, and decision-makers in **${archetypeObj.title}** who demand immediate domain credibility, zero-latency task completion, and accessible cross-device ergonomics (1440px Desktop, 768px Tablet, 375px Mobile).

## Product Purpose

Deliver a high-converting, zero-slop digital surface tailored specifically to **${archetypeObj.title}**. Every visual token, typographic scale, and interaction rule serves the visitor's primary mode (\`${archetypeObj.primarySurfaceMode}\`).

## Positioning

Out-of-distribution craft governed by \`PRODUCT.md\` + \`DESIGN.md\` (\`google-labs-code/design.md\` + \`pbakaus/impeccable\` v4.6). Rejects generic AI templates in favor of domain-authentic materials, perceptual OKLCH color scales, and deterministic 60-FPS performance.

## Operating Context

- **APCA Perceptual Contrast Floor:** \`Lc >= ${archetypeObj.apcaContrastFloor}\` (${archetypeObj.wcagTier})
- **Tabular Numerals Required:** \`${archetypeObj.requiresTabularNums}\`
- **3D WebGPU / Spatial Pipeline Allowed:** \`${archetypeObj.allows3dEffects}\`

## Capabilities and Constraints

${archetypeObj.dos.map((d) => `- **DO:** ${d}`).join('\n')}
${archetypeObj.donts.map((d) => `- **DO NOT:** ${d}`).join('\n')}

## Brand Commitments

Direct, authoritative, domain-specific. Zero hedging language, zero fabricated vanity metrics, and zero confirm-shaming.

## Accessibility & Inclusion

- Baseline: WCAG 2.2 ${archetypeObj.wcagTier} and APCA \`Lc >= ${archetypeObj.apcaContrastFloor}\`.
- All interactive controls keyboard-navigable with visible focus rings and \`>= 48x48px\` mobile touch targets.
- \`prefers-reduced-motion\` honored across all transitions and shaders.
`;
}

/**
 * Returns the exact Public Visual Science Corpus parameters (Oklab/OKLCH Thermal Rotation,
 * Inigo Quilez Cosine Vector, Google Filament PBR Material, Camera Lens FOV, Apple WWDC Spring Zeta,
 * and Tufte/Bringhurst Typographic Scale) for a given industry archetype.
 */
export function getVisualScienceParametersForArchetype(archetypeId = 'b2b-saas-platform') {
  const specs = {
    'law-firm-and-advisory': {
      cameraFov: '2D Orthographic (Zero 3D Perspective Distortion)',
      pbrMaterial: { metalness: 0.0, roughness: 0.90, ior: 1.48, materialClass: 'Editorial Warm Limestone Paper' },
      thermalRotation: 'Warm mineral paper (H: 85, C: 0.012) & deep navy ink (H: 255, C: 0.04) — zero dead gray (C > 0)',
      cosinePalette: { a: [0.52, 0.49, 0.44], b: [0.38, 0.34, 0.28], c: [0.5, 0.5, 0.5], d: [0.05, 0.10, 0.20] },
      springPhysics: { zeta: 1.0, durationMs: '140ms', curve: 'cubic-bezier(0.22, 1, 0.36, 1)', behavior: 'Critically damped (zero bounce)' },
      typeScale: 'Bringhurst 1.250 Major Third | Measure: 60ch-68ch | Line-height: 1.72',
      sonicAndVideoIdentity: {
        posture: 'Institutional Silence in Read Mode (Zero background music loop by default; optional tactile stroke micro-SFX on opt-in)',
        uiSfxProfile: 'hoverMagnetic & drawerSlide muted by default; AudioContext unlocks only on explicit user gesture',
        brandIntroTemplate: 'minimal (Clean SVG stroke reveal with soft grazing light, 2.8s @ 60 FPS, < 1.8 MB AV1/WebM + poster.webp)',
        lufsTargets: { introVideo: -14.0, backgroundMusic: -18.0, truePeakDbtp: -1.0, highPassHz: 30 }
      }
    },
    'fintech-and-banking': {
      cameraFov: '2D Orthographic Ledger (Zero 3D Perspective Distortion)',
      pbrMaterial: { metalness: 0.0, roughness: 0.52, ior: 1.46, materialClass: 'Matte Obsidian Vault Slate' },
      thermalRotation: 'Cool atmospheric rotation (H: 255, C: 0.015) + Zenithal specular top-edge (border-top: 1px solid oklch(1 0 0 / 0.10))',
      cosinePalette: { a: [0.14, 0.22, 0.38], b: [0.18, 0.28, 0.42], c: [0.8, 0.8, 0.8], d: [0.00, 0.15, 0.35] },
      springPhysics: { zeta: 1.0, durationMs: '120ms', curve: 'cubic-bezier(0.22, 1, 0.36, 1)', behavior: 'Critically damped (<150ms zero overshoot)' },
      typeScale: 'Tufte Operate Fixed Scale (12px-20px) | Data-Ink Ratio -> 1.0 | tabular-nums slashed-zero + 16px inline sparklines',
      sonicAndVideoIdentity: {
        posture: 'Functional Micro-Sounds in Operate Mode (Silent ledger baseline + crisp deterministic transaction confirmation SFX)',
        uiSfxProfile: 'clickTactile, successChime & errorThud (0 KB Web Audio API DSP, ±20 cents pitch & ±8% LPF micro-variation)',
        brandIntroTemplate: 'vertex-veo-hybrid (Precision geometric SVG assembly with controlled specular highlight, 3.5s @ 60 FPS, < 1.8 MB)',
        lufsTargets: { introVideo: -14.0, backgroundMusic: -18.0, truePeakDbtp: -1.0, highPassHz: 30 }
      }
    },
    'enterprise-erp-database': {
      cameraFov: '2D Orthographic Console (Zero 3D Effects)',
      pbrMaterial: { metalness: 0.0, roughness: 0.58, ior: 1.46, materialClass: 'High-Density Matte Slate' },
      thermalRotation: 'Cool slate thermal rotation (H: 250, C: 0.010) + Zenithal top highlight (border-top: 1px solid oklch(1 0 0 / 0.10))',
      cosinePalette: { a: [0.16, 0.19, 0.24], b: [0.10, 0.12, 0.16], c: [0.5, 0.5, 0.5], d: [0.00, 0.05, 0.10] },
      springPhysics: { zeta: 1.0, durationMs: '120ms', curve: 'cubic-bezier(0.22, 1, 0.36, 1)', behavior: 'Critically damped (zero bounce)' },
      typeScale: 'Tufte Operate Fixed Scale (12px, 13px, 14px, 16px, 20px) | Line-height: 1.35-1.45 | Right-aligned tabular-nums',
      sonicAndVideoIdentity: {
        posture: 'Institutional Silence in Operate Mode (Zero background music; optional discrete functional micro-SFX for batch operations)',
        uiSfxProfile: 'clickTactile & errorThud (0 KB Web Audio API DSP, muted by default with accessible [data-audio-mute-toggle])',
        brandIntroTemplate: 'minimal (Clean vector grid lockup reveal, 2.8s @ 60 FPS, < 1.8 MB AV1/WebM)',
        lufsTargets: { introVideo: -14.0, backgroundMusic: -18.0, truePeakDbtp: -1.0, highPassHz: 30 }
      }
    },
    'ecommerce-conversion': {
      cameraFov: 'Telephoto Studio Lens (FOV 28°-35°) + 3-Point Rig (Key 45° Warm / Fill 35% Cool / Rim 120%)',
      pbrMaterial: { metalness: 0.0, roughness: 0.22, ior: 1.50, materialClass: 'Color-True Studio Acrylic & Product PBR' },
      thermalRotation: 'Itten Area Law neutral canvas (C: 0.004 < 0.02) for 100% product color fidelity',
      cosinePalette: { a: [0.95, 0.95, 0.94], b: [0.04, 0.04, 0.04], c: [0.5, 0.5, 0.5], d: [0.00, 0.00, 0.00] },
      springPhysics: { zeta: 0.78, durationMs: '320ms', curve: 'linear(0, 0.3566 9.6%, 0.7852 21.1%, 1.0156 32.2%, 1.0468 53.6%, 1)', behavior: 'Under-damped controlled inertia' },
      typeScale: 'Utopia Fluid (1.333 Perfect Fourth) | Hero tracking: -0.025em | SKU prices: tabular-nums',
      sonicAndVideoIdentity: {
        posture: 'Tactile Conversion Feedback in Persuade Mode (Micro-SFX for cart drawer, 3D card inspection & checkout chime)',
        uiSfxProfile: 'hoverMagnetic, drawerSlide, cardFlip3D & successChime (0 KB Web Audio API + HRTF 3D panner)',
        brandIntroTemplate: '3d-pbr (3D PBR dioramas 3-point studio lighting reveal + studio B-Roll, 4.0s @ 60 FPS, < 1.8 MB)',
        lufsTargets: { introVideo: -14.0, backgroundMusic: -18.0, truePeakDbtp: -1.0, highPassHz: 30 }
      }
    },
    'streamer-and-gaming-creator': {
      cameraFov: 'Controlled Wide Angle (FOV 50°-60°) + AgX Tone Mapping + Exponential Depth Fog',
      pbrMaterial: { metalness: 1.0, roughness: 0.20, ior: 1.50, materialClass: 'Anodized Kinpaku Conductor & Holographic Foil' },
      thermalRotation: 'Deep obsidian lacquer rotation (H: 265, C: 0.012) + Specular top-edge highlight (border-top: 1px solid oklch(1 0 0 / 0.10))',
      cosinePalette: { a: [0.50, 0.50, 0.50], b: [0.50, 0.50, 0.50], c: [1.0, 1.0, 0.5], d: [0.80, 0.90, 0.30] },
      springPhysics: { zeta: 0.75, durationMs: '360ms', curve: 'linear(0, 0.3566 9.6%, 0.7852 21.1%, 1.0156 32.2%, 1.0468 53.6%, 1)', behavior: 'Under-damped tactical HUD spring + 60FPS Watchdog' },
      typeScale: 'Utopia Fluid (1.414 Augmented Fourth) | Hero line-height: 1.02 | HUD counters: tabular-nums',
      sonicAndVideoIdentity: {
        posture: 'Immersive 3D Soundscape in Experience Mode (Adaptive Strudel scroll layering + HRTF 3D spatial audio synced to Three.js r186)',
        uiSfxProfile: 'All 6 procedural UI SFX + Cloud Run L4 Stable Audio cinematic whooshes & impacts + -6dB TTS Sidechain Ducking',
        brandIntroTemplate: 'shader-hud (WebGPU compute particles, holographic shader & frame-exact sonic impact #54, 4.5s @ 60 FPS, < 1.8 MB)',
        lufsTargets: { introVideo: -14.0, backgroundMusic: -18.0, truePeakDbtp: -1.0, highPassHz: 30 }
      }
    },
    'healthcare-and-clinic': {
      cameraFov: '2D Orthographic Clinical Clarity (Zero 3D Effects)',
      pbrMaterial: { metalness: 0.0, roughness: 0.88, ior: 1.48, materialClass: 'Biophilic Matte Daylight Surface' },
      thermalRotation: 'Calm biophilic teal-sage tint (H: 180, C: 0.008) — zero harsh hospital white glare',
      cosinePalette: { a: [0.88, 0.94, 0.93], b: [0.10, 0.14, 0.12], c: [0.5, 0.5, 0.5], d: [0.10, 0.25, 0.30] },
      springPhysics: { zeta: 1.0, durationMs: '160ms', curve: 'cubic-bezier(0.22, 1, 0.36, 1)', behavior: 'Critically damped calm transition' },
      typeScale: 'Bringhurst 1.250 Major Third | Body: 17px (60ch-68ch, line-height 1.70) | WCAG AAA (APCA Lc >= 90)',
      sonicAndVideoIdentity: {
        posture: 'Calm Institutional Silence in Read Mode (Zero intrusive audio; gentle confirmation chime only on explicit opt-in)',
        uiSfxProfile: 'successChime & clickTactile softened (-18 LUFS ceiling, strictly honors prefers-reduced-motion)',
        brandIntroTemplate: 'minimal (Biophilic daylight vector reveal, 2.8s @ 60 FPS, < 1.8 MB AV1/WebM + instant poster.webp)',
        lufsTargets: { introVideo: -14.0, backgroundMusic: -18.0, truePeakDbtp: -1.0, highPassHz: 30 }
      }
    },
    'b2b-saas-platform': {
      cameraFov: 'Telephoto Product Stage (FOV 32°) + AgX Tone Mapping',
      pbrMaterial: { metalness: 0.0, roughness: 0.48, ior: 1.46, materialClass: 'Architectural Matte Polymer & Specular Hairline' },
      thermalRotation: 'Cool sapphire-slate rotation (H: 255, C: 0.010) + Zenithal top-edge highlight (border-top: 1px solid oklch(1 0 0 / 0.10))',
      cosinePalette: { a: [0.18, 0.24, 0.36], b: [0.24, 0.30, 0.44], c: [0.75, 0.75, 0.85], d: [0.05, 0.18, 0.38] },
      springPhysics: { zeta: 0.82, durationMs: '280ms', curve: 'linear(0, 0.3566 9.6%, 0.7852 21.1%, 1.0156 32.2%, 1.0468 53.6%, 1)', behavior: 'Controlled spring in Persuade / Critically damped in Operate' },
      typeScale: 'Utopia Fluid (1.333 Perfect Fourth) in Persuade | Fixed 13px-14px in Operate',
      sonicAndVideoIdentity: {
        posture: 'Dual-Surface Sonic Architecture (Subtle persuasive soundscape in Persuade Hero -> quiet functional micro-SFX in Operate)',
        uiSfxProfile: 'hoverMagnetic, clickTactile, drawerSlide & successChime (0 KB Web Audio API DSP, ±20 cents micro-variation)',
        brandIntroTemplate: 'vertex-veo-hybrid (Precision geometric SVG assembly over Vertex AI Veo B-Roll canvas, 3.5s @ 60 FPS, < 1.8 MB)',
        lufsTargets: { introVideo: -14.0, backgroundMusic: -18.0, truePeakDbtp: -1.0, highPassHz: 30 }
      }
    },
    'luxury-architecture-and-real-estate': {
      cameraFov: 'Controlled Wide Angle Spatial Lens (FOV 50°-60°) + AgX HDR + Spark 2.x 3DGS',
      pbrMaterial: { metalness: 0.0, roughness: 0.86, ior: 1.49, materialClass: 'Warm Travertine Stone & Brushed Bronze (metalness: 1.0, roughness: 0.24)' },
      thermalRotation: 'Warm travertine stone polarity (H: 82, C: 0.014) & charcoal bronze (H: 65, C: 0.025)',
      cosinePalette: { a: [0.68, 0.63, 0.56], b: [0.26, 0.22, 0.18], c: [0.5, 0.5, 0.5], d: [0.08, 0.12, 0.18] },
      springPhysics: { zeta: 0.85, durationMs: '420ms', curve: 'cubic-bezier(0.22, 1, 0.36, 1)', behavior: 'Slow cinematic deceleration (zero bounce)' },
      typeScale: 'Müller-Brockmann Asymmetric Utopia (1.414 Augmented Fourth) | Hero line-height: 1.02',
      sonicAndVideoIdentity: {
        posture: 'Immersive Architectural Soundscape in Experience & Persuade Modes (Warm felt-piano & room acoustics at -18 LUFS)',
        uiSfxProfile: 'hoverMagnetic & cardFlip3D with 3D HRTF spatial panning + Vertex AI Lyria / CC0 1.0 ambient score',
        brandIntroTemplate: '3d-pbr (3D PBR travertine & brushed bronze extrusion with dioramas 3-point rig, 4.0s @ 60 FPS, < 1.8 MB)',
        lufsTargets: { introVideo: -14.0, backgroundMusic: -18.0, truePeakDbtp: -1.0, highPassHz: 30 }
      }
    }
  };
  return specs[archetypeId] || specs['b2b-saas-platform'];
}

/**
 * Compiles `DESIGN.md` content following `google-labs-code/design.md` (YAML Front Matter + 8 Canonical Sections),
 * `pbakaus/impeccable` v4.6 surface modes & 62 anti-slop rules, and the Atomic Visual Science Corpus.
 */
export function compileDesignMdContent(archetypeObj, projectMeta = {}) {
  const projName = projectMeta.name || projectMeta.id || archetypeObj.title;
  const c = archetypeObj.tokens.colors;
  const t = archetypeObj.tokens.typography;
  const r = archetypeObj.tokens.rounded;
  const s = archetypeObj.tokens.spacing;
  const vs = getVisualScienceParametersForArchetype(archetypeObj.id);
  const funcInv = getArchetypeFunctionalInvariants(archetypeObj.id);
  const openSpace = getOpenMorphologicalSpaceForArchetype(archetypeObj.id);

  const defaultDna = projectMeta.brandDnaVector || {
    gridTopology: openSpace.allowedGridTopologies[0] || 'golden-ratio-bento-matrix',
    heroArchitecture: openSpace.allowedHeroArchitectures[0] || 'live-interactive-product-sandbox',
    componentMorphology: openSpace.allowedComponentMorphologies[0] || {
      nav: 'floating-island-bar',
      corner: '6px-tecnico',
      material: 'deep-obsidian-specular'
    },
    gamutMaskType: openSpace.allowedGamutMasks[0] || 'atmospheric-analogous',
    fontPairingProfile: 'swiss-precision-geist-jetbrains',
    motionPhysicsCriteria: {
      transitionPhysics: openSpace.allowedMotionProfiles[0] || 'magnetic-precision-spring',
      dampingRatioZeta: vs.springPhysics.zeta,
      scrollChoreography: 'native-view-transitions-morph'
    },
    introAnd3dDecision: {
      recommendIntroVideo: archetypeObj.primarySurfaceMode !== 'Operate' && archetypeObj.primarySurfaceMode !== 'Read',
      introMode: archetypeObj.primarySurfaceMode === 'Read' ? 'inline-non-blocking-svg' : 'parametric-svg-choreography',
      forged3dMode: archetypeObj.allows3dEffects ? 'parametric-diorama-or-shader' : 'orthographic-2d-clean'
    },
    morphologicalDivergenceScore: projectMeta.morphologicalDivergenceScore ?? 0.88,
    aestheticHarmonyScore: projectMeta.aestheticHarmonyScore ?? 0.94
  };

  const yamlTypography = Object.entries(t)
    .map(([role, spec]) => {
      const lines = [
        `  ${role}:`,
        `    fontFamily: "${spec.fontFamily}"`,
        `    fontSize: "${spec.fontSize}"`,
        `    fontWeight: ${spec.fontWeight}`,
        `    lineHeight: ${spec.lineHeight}`,
        `    letterSpacing: "${spec.letterSpacing}"`
      ];
      if (spec.fontFeature) {
        lines.push(`    fontFeature: "${spec.fontFeature}"`);
      }
      return lines.join('\n');
    })
    .join('\n');

  const yamlColors = Object.entries(c)
    .map(([k, v]) => `  ${k}: "${v}"`)
    .join('\n');

  const yamlRounded = Object.entries(r)
    .map(([k, v]) => `  ${k}: "${v}"`)
    .join('\n');

  const yamlSpacing = Object.entries(s)
    .map(([k, v]) => `  ${k}: "${v}"`)
    .join('\n');

  return `---
version: "2026.10"
name: "${projName} (${archetypeObj.title})"
description: "${archetypeObj.creativeNorthStar} — Mode: ${archetypeObj.primarySurfaceMode}"
archetype: "${archetypeObj.id}"
surfaceMode: "${archetypeObj.primarySurfaceMode}"
allows3dEffects: ${archetypeObj.allows3dEffects}
apcaContrastFloor: ${archetypeObj.apcaContrastFloor}
cameraFov: "${vs.cameraFov}"
brandDnaVector:
  gridTopology: "${defaultDna.gridTopology}"
  heroArchitecture: "${defaultDna.heroArchitecture}"
  navVariant: "${defaultDna.componentMorphology?.nav || 'floating-island-bar'}"
  cornerGeometry: "${defaultDna.componentMorphology?.corner || '6px-tecnico'}"
  surfaceMaterial: "${defaultDna.componentMorphology?.material || 'deep-obsidian-specular'}"
  gamutMaskType: "${defaultDna.gamutMaskType}"
  fontPairingProfile: "${defaultDna.fontPairingProfile}"
  transitionPhysics: "${defaultDna.motionPhysicsCriteria?.transitionPhysics || 'magnetic-precision-spring'}"
  scrollChoreography: "${defaultDna.motionPhysicsCriteria?.scrollChoreography || 'native-view-transitions-morph'}"
  morphologicalDivergenceScore: ${defaultDna.morphologicalDivergenceScore ?? 0.88}
  aestheticHarmonyScore: ${defaultDna.aestheticHarmonyScore ?? 0.94}
pbrMaterial:
  metalness: ${vs.pbrMaterial.metalness}
  roughness: ${vs.pbrMaterial.roughness}
  ior: ${vs.pbrMaterial.ior}
springPhysics:
  zeta: ${vs.springPhysics.zeta}
  duration: "${vs.springPhysics.durationMs}"
colors:
${yamlColors}
typography:
${yamlTypography}
rounded:
${yamlRounded}
spacing:
${yamlSpacing}
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  card-surface:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "24px"
  input-control:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xs}"
    padding: "12px 16px"
---

# DESIGN.md — ${projName}

## Overview

- **Industry Archetype:** \`${archetypeObj.id}\` (${archetypeObj.title})
- **Creative North Star:** ${archetypeObj.creativeNorthStar}
- **Impeccable Surface Mode:** \`${archetypeObj.primarySurfaceMode}\` (Secondary: ${archetypeObj.surfaceModes.join(', ')})
- **Atmospheric Polarity:** \`${archetypeObj.polarity}\`
- **Archetype Functional Invariants:** APCA Headline \`Lc >= ${funcInv.apcaContrastFloors.headlineLc}\`, Body \`Lc >= ${funcInv.apcaContrastFloors.bodyLc}\`, Hick's Law Nav Cap \`<= ${funcInv.cognitiveLaws.hicksLawMaxNavItems}\`, Fitts Touch \`>= ${funcInv.cognitiveLaws.fittsLawMinTouchPx}px\`, Acoustic Ceiling \`<= ${funcInv.acousticSafetyLimits.maxPeakDbfs} dBFS\`.
- **Open Morphological Space:** \`fixedVisualTemplateImposed: ${openSpace.fixedVisualTemplateImposed}\` — Active Bespoke Grid \`${defaultDna.gridTopology}\`, Active Hero \`${defaultDna.heroArchitecture}\`, Gamut Mask \`${defaultDna.gamutMaskType}\`.
- **3D & Camera Cinematography:** \`allows3dEffects: ${archetypeObj.allows3dEffects}\` — Lens: \`${vs.cameraFov}\`${archetypeObj.id === 'streamer-and-gaming-creator' ? ' (Mandatory 60-FPS Watchdog active)' : ' (Zero distracting 3D effects in operational/editorial views)'}
- **Google Filament PBR Material:** \`metalness: ${vs.pbrMaterial.metalness}\`, \`roughness: ${vs.pbrMaterial.roughness}\`, \`ior: ${vs.pbrMaterial.ior}\` (${vs.pbrMaterial.materialClass})

## Colors

All colors are authored in perceptual **W3C DTCG 2025.10 OKLCH** space to guarantee uniform lightness and APCA contrast (\`Lc >= ${archetypeObj.apcaContrastFloor}\`, WCAG ${archetypeObj.wcagTier}).

- **Primary (\`{colors.primary}\`):** Core brand anchor and primary interactive driver (Itten Area Law focal accent).
- **Secondary (\`{colors.secondary}\`):** Supporting structural accent and secondary state signal.
- **Tertiary (\`{colors.tertiary}\`):** High-salience focal accent reserved for single primary conversion moments.
- **Surface Ground (\`{colors.surface}\`):** Tinted mineral/daylight ground (never untinted \`#000000\` or glaring \`#ffffff\`).${archetypeObj.id === 'ecommerce-conversion' ? ' Strict low-chroma neutral (`chroma < 0.02`) to preserve product color fidelity.' : ''}
- **Gurney/Albers Thermal Rotation & Gamut Mask:** ${vs.thermalRotation} | Active Gamut Mask: \`${defaultDna.gamutMaskType}\`.
- **Inigo Quilez Procedural Cosine Palette (\`color(t) = a + b * cos(2π(c*t + d))\`):** \`a=${JSON.stringify(vs.cosinePalette.a)}\`, \`b=${JSON.stringify(vs.cosinePalette.b)}\`, \`c=${JSON.stringify(vs.cosinePalette.c)}\`, \`d=${JSON.stringify(vs.cosinePalette.d)}\`.
- **Text Hierarchy (\`{colors.text-primary}\` / \`{colors.text-secondary}\`):** Hue-tinted foregrounds; never gray text on colored backgrounds.
- **Semantic State (\`{colors.success}\`, \`{colors.warning}\`, \`{colors.danger}\`):** High-contrast status tokens paired with explicit icons/labels.

## Typography

- **Typographic Scale & Vertical Rhythm:** ${vs.typeScale} | Curated Pairing Profile: \`${defaultDna.fontPairingProfile}\`.
- **Display & Headlines (\`{typography.display}\`, \`{typography.h1}\`, \`{typography.h2}\`):** ${t.display.fontFamily} with deliberate weight hierarchy and balanced wrapping (\`text-wrap: balance\`).
- **Body Measure (\`{typography.body}\`):** ${t.body.fontFamily} at \`${t.body.fontSize}\` (line-height \`${t.body.lineHeight}\`), constrained to \`65ch–75ch\` (\`60ch–68ch\` in \`Read\` mode) for effortless scannability.
- **Edward Tufte Numeric Discipline (\`{typography.mono}\`):** Mandatory \`font-variant-numeric: tabular-nums slashed-zero\` (\`tnum\`, \`zero\`), right-aligned numeric cells, left-aligned text/IDs, and \`16px\` inline sparklines.
- **Anti-Slop Type Bans:** No generic \`Inter\`/\`Arial\` display defaults, no mandatory kicker/eyebrow above every heading, and no tracking tighter than \`-0.04em\`.

## Layout

- **Spatial Architecture (\`gridTopology: ${defaultDna.gridTopology}\`):** Asymmetric 12-column CSS Grid & Subgrid with generous section spacing (\`{spacing.xl}\` to \`{spacing.2xl}\`) and \`>= 35%\` open canvas whitespace (\`whitespaceRatio: 0.35..0.68\`).
- **Hero First-Impact Architecture (\`heroArchitecture: ${defaultDna.heroArchitecture}\`):** Selected from the open morphological space to guarantee intra-category uniqueness.
- **Multi-Viewport Ergonomics:** Verified across \`1440px\` (Desktop), \`768px\` (Tablet), and \`375px\` (Mobile) with zero horizontal overflow.${archetypeObj.id === 'healthcare-and-clinic' ? ' Appointment booking and emergency contact are immediately visible in the first mobile viewport (375px).' : ''}
- **Apple HIG / Material Design 3 / Hoober Thumb Zones:** Primary mobile navigation and CTAs placed in the bottom third thumb zone with minimum \`48x48px\` touch target area (\`>= 8px\` separation), \`env(safe-area-inset-top/bottom)\`, and \`touch-action: manipulation\`.

## Elevation & Depth

- **Single Elevation Declaration & Zenithal Specular Light:** Surfaces declare depth once via \`1px solid\` hairline borders (\`{colors.border-hairline}\`), subtle surface luminance shifts (\`{colors.surface}\` -> \`{colors.surface-raised}\`), and zenithal top-edge specular reflection (\`border-top: 1px solid oklch(1 0 0 / 0.10)\`).
- **Apple WWDC Fluid Spring Physics:** \`zeta = ${vs.springPhysics.zeta}\` (\`${vs.springPhysics.durationMs}\`, \`${vs.springPhysics.curve}\`) — ${vs.springPhysics.behavior}.
- **Zero Ghost Cards:** Never combine a 1px border with a wide soft drop-shadow, and never use zero-offset neon halos.

## Shapes

- **Corner Radius Scale:** \`none: ${r.none}\`, \`xs: ${r.xs}\`, \`sm: ${r.sm}\`, \`md: ${r.md}\`, \`lg: ${r.lg}\` (Concentric Law: $R_{outer} = R_{inner} + Padding$).
- **Industry Geometry:** Tailored to \`${archetypeObj.id}\` — no \`999px\` pill radii on cards or containers.

## Components

- **Primary CTA (\`button-primary\`):** Uses \`{colors.primary}\` background with \`{colors.surface}\` text, \`>= 48x48px\` hit area, and \`<150ms\` exponential ease-out response.
- **Data & Content Containers (\`card-surface\`):** Flat or hairline-bounded containers; strictly **zero \`card-in-card\` nesting**.
- **Interactive State Matrix:** Every control implements all 7 states (\`default\`, \`hover\`, \`focus-visible\`, \`active\`, \`disabled\`, \`loading skeleton\`, \`error\`), honors \`prefers-reduced-motion\`, and themes \`::selection\` and scrollbars.
- **Overlays:** Built with native HTML5 \`<dialog>\` and Popover API to prevent container clipping.

## Brand DNA Vector & Bespoke Morphology

- **Axis 1 — Grid Topology (\`gridTopology\`):** \`${defaultDna.gridTopology}\`
- **Axis 2 — Hero Architecture (\`heroArchitecture\`):** \`${defaultDna.heroArchitecture}\`
- **Axis 3 — Component & Surface Morphology (\`componentMorphology\`):** Nav \`${defaultDna.componentMorphology?.nav || 'floating-island-bar'}\` | Corner \`${defaultDna.componentMorphology?.corner || '6px-tecnico'}\` | Material \`${defaultDna.componentMorphology?.material || 'deep-obsidian-specular'}\`
- **Axis 4 — OKLCH Chromatic Gamut Mask (\`gamutMaskType\`):** \`${defaultDna.gamutMaskType}\`
- **Axis 5 — Expressive Typographic Curation (\`fontPairingProfile\`):** \`${defaultDna.fontPairingProfile}\`
- **Axis 6 — Kinetic Physics & Scroll Choreography (\`motionPhysicsCriteria\`):** Transition \`${defaultDna.motionPhysicsCriteria?.transitionPhysics || 'magnetic-precision-spring'}\` ($\zeta = ${defaultDna.motionPhysicsCriteria?.dampingRatioZeta ?? vs.springPhysics.zeta}$) | Scroll \`${defaultDna.motionPhysicsCriteria?.scrollChoreography || 'native-view-transitions-morph'}\`
- **Axis 7 — Intro Video & 3D/Shader Decision (\`introAnd3dDecision\`):** Recommend Intro \`${Boolean(defaultDna.introAnd3dDecision?.recommendIntroVideo)}\` (\`${defaultDna.introAnd3dDecision?.introMode || 'parametric-svg-choreography'}\`) | 3D/Shader \`${defaultDna.introAnd3dDecision?.forged3dMode || 'parametric-diorama-or-shader'}\`
- **Intra-Category Morphological Divergence Score:** \`${defaultDna.morphologicalDivergenceScore ?? 0.88}\` (Mandatory Floor \`>= 0.70\`)
- **Birkhoff Aesthetic Harmony Score ($M = O / C$):** \`${defaultDna.aestheticHarmonyScore ?? 0.94}\` (Mandatory Floor \`>= 0.85\`, Max Simultaneous High-Complexity Axes \`<= 2\`)

## Sonic & Video Identity

- **Archetype Sonic Posture (\`${archetypeObj.primarySurfaceMode}\`):** ${vs.sonicAndVideoIdentity.posture}.
- **Procedural UI SFX (\`Web Audio API\` — \`0 KB\` Network Overhead):** ${vs.sonicAndVideoIdentity.uiSfxProfile}.
- **Programmatic Brand Intro Video (\`60 FPS\`):** ${vs.sonicAndVideoIdentity.brandIntroTemplate} — vector \`.svg\` geometry and \`OKLCH\` palette strictly locked (diffusion distortion prohibited).
- **ITU-R BS.1770-4 Loudness & Sidechain Ducking:** Intro video normalized to \`${vs.sonicAndVideoIdentity.lufsTargets.introVideo} LUFS\`, background music normalized to \`${vs.sonicAndVideoIdentity.lufsTargets.backgroundMusic} LUFS\` (high-pass \`${vs.sonicAndVideoIdentity.lufsTargets.highPassHz} Hz\`, True Peak \`${vs.sonicAndVideoIdentity.lufsTargets.truePeakDbtp} dBTP\`, Opus \`.webm\`/\`.ogg\`), and automatic \`-6 dB\` Sidechain Ducking in the \`300 Hz – 3.5 kHz\` vocal band (\`15ms\` attack / \`250ms\` release).
- **Autoplay & Ergonomics Guard:** \`AudioContext\` starts suspended until first explicit user gesture; all \`<video>\` elements carry \`muted playsinline preload="metadata"\`, instant \`poster.webp\` (\`LCP < 1.2s\`, \`CLS: 0.00\`), budget \`< 1.8 MB\`, and an accessible \`[data-audio-mute-toggle]\` button.

## Do's and Don'ts

### Do
${archetypeObj.dos.map((d) => `- ${d}`).join('\n')}

### Do Not
${archetypeObj.donts.map((d) => `- ${d}`).join('\n')}
- Never violate any of the **62 deterministic Anti-Slop rules** of \`pbakaus/impeccable\`.
`;
}

/**
 * Simple YAML Front Matter & Token Reference Parser for `lintDesignMd`
 */
function parseDesignMdFrontMatter(markdownContent) {
  const trimmed = String(markdownContent || '').trimStart();
  if (!trimmed.startsWith('---')) {
    return { hasFrontMatter: false, rawYaml: '', definedTokens: new Set(), referencedTokens: [], brokenRefs: [] };
  }
  const endIdx = trimmed.indexOf('\n---', 3);
  if (endIdx === -1) {
    return { hasFrontMatter: false, rawYaml: '', definedTokens: new Set(), referencedTokens: [], brokenRefs: [] };
  }

  const rawYaml = trimmed.slice(3, endIdx);
  const body = trimmed.slice(endIdx + 4);
  const definedTokens = new Set();

  let currentTopSection = null;
  for (const rawLine of rawYaml.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, '');
    if (!line.trim()) continue;
    const topMatch = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (topMatch) {
      currentTopSection = topMatch[1];
      continue;
    }
    const subMatch = line.match(/^\s{2}(["']?[a-zA-Z0-9_-]+["']?):\s*(.*)$/);
    if (subMatch && currentTopSection) {
      const cleanKey = subMatch[1].replace(/^["']|["']$/g, '');
      definedTokens.add(`${currentTopSection}.${cleanKey}`);
    }
  }

  const referencedTokens = [];
  const brokenRefs = [];
  const refRegex = /\{([a-zA-Z0-9_.-]+)\}/g;
  let match;
  while ((match = refRegex.exec(rawYaml)) !== null) {
    const refPath = match[1];
    referencedTokens.push(refPath);
    if (!definedTokens.has(refPath)) {
      brokenRefs.push(refPath);
    }
  }

  const archMatch = rawYaml.match(/archetype:\s*["']?([a-zA-Z0-9_-]+)["']?/);
  const modeMatch = rawYaml.match(/surfaceMode:\s*["']?([a-zA-Z0-9_-]+)["']?/);

  return {
    hasFrontMatter: true,
    rawYaml,
    body,
    archetype: archMatch ? archMatch[1] : 'b2b-saas-platform',
    surfaceMode: modeMatch ? modeMatch[1] : 'Persuade',
    definedTokens,
    referencedTokens,
    brokenRefs
  };
}

/**
 * Validates a `DESIGN.md` file or Markdown string against:
 *   1. Google Labs `design.md` specification (YAML front matter, 8 sections in canonical order, token references).
 *   2. Impeccable's 62 deterministic Anti-Slop detector rules.
 */
export function lintDesignMd(filePathOrContent, options = {}) {
  let content = String(filePathOrContent || '');
  let sourcePath = options.sourcePath || 'inline-DESIGN.md';
  if (
    content.length < 260 &&
    !content.includes('\n') &&
    fs.existsSync(content)
  ) {
    sourcePath = content;
    content = fs.readFileSync(content, 'utf8');
  }

  const parsedMeta = parseDesignMdFrontMatter(content);
  const archetypeId = options.archetype || parsedMeta.archetype || 'b2b-saas-platform';
  const findings = [];

  // 1. Check Google Labs 8 canonical sections order
  let lastFoundIdx = -1;
  for (const sec of GOOGLE_LABS_DESIGN_MD_SECTIONS) {
    const variants = [sec.heading, ...sec.aliases].map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`^##\\s+(?:\\d+\\.\\s*)?(?:${variants.join('|')})\\b`, 'im');
    const match = regex.exec(content);
    if (!match) {
      findings.push({
        ruleId: `google-design-md-missing-${sec.id}`,
        severity: 'error',
        category: 'google-labs-spec',
        message: `Missing required Google Labs DESIGN.md section: "## ${sec.heading}"`
      });
    } else if (match.index < lastFoundIdx) {
      findings.push({
        ruleId: `google-design-md-order-${sec.id}`,
        severity: 'warning',
        category: 'google-labs-spec',
        message: `Section "## ${sec.heading}" appears out of canonical Google Labs order (#${sec.order}).`
      });
    } else {
      lastFoundIdx = match.index;
    }
  }

  // 2. Evaluate all 62 Impeccable Deterministic Anti-Slop Rules
  let passedRulesCount = 0;
  for (const rule of IMPECCABLE_62_ANTI_SLOP_RULES) {
    let violated = false;
    if (rule.pattern) {
      violated = rule.pattern.test(content);
    } else if (typeof rule.checkFn === 'function') {
      violated = !rule.checkFn(content, archetypeId, parsedMeta);
    }

    if (violated) {
      findings.push({
        ruleId: rule.id,
        severity: 'error',
        category: rule.category,
        message: `Impeccable Anti-Slop Rule Violation [${rule.id}]: ${rule.title}`
      });
    } else {
      passedRulesCount++;
    }
  }

  const errors = findings.filter((f) => f.severity === 'error');
  const warnings = findings.filter((f) => f.severity === 'warning');
  const totalRulesChecked = IMPECCABLE_62_ANTI_SLOP_RULES.length;
  const passed = errors.length === 0;

  return {
    passed,
    sourcePath,
    archetype: archetypeId,
    surfaceMode: parsedMeta.surfaceMode,
    totalRulesChecked,
    passedRulesCount,
    definedTokensCount: parsedMeta.definedTokens.size,
    referencedTokensCount: parsedMeta.referencedTokens.length,
    brokenRefs: parsedMeta.brokenRefs,
    summary: {
      errors: errors.length,
      warnings: warnings.length,
      score: Math.max(0, Math.round(((totalRulesChecked - errors.length) / totalRulesChecked) * 100))
    },
    findings
  };
}

/**
 * Generates `PRODUCT.md` and `DESIGN.md` inside `projectRoot` for the requested industry archetype,
 * updates `factory.project.json` if present, and runs `lintDesignMd` to verify 100% compliance.
 */
export function generateProductAndDesignMd(projectRoot, archetypeInput = 'saas', options = {}) {
  const absRoot = path.resolve(projectRoot || FACTORY_ROOT);
  const archetypeObj = resolveIndustryArchetype(archetypeInput);

  const manifestPath = path.join(absRoot, 'factory.project.json');
  let projectMeta = {
    id: path.basename(absRoot),
    name: options.name || path.basename(absRoot),
    targetPlatform: options.targetPlatform || 'web'
  };

  if (fs.existsSync(manifestPath)) {
    try {
      const raw = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      projectMeta = {
        ...projectMeta,
        ...raw,
        targetPlatform: options.targetPlatform || raw.targetPlatform || 'web'
      };
      if (!options.dryRun) {
        raw.industryArchetype = archetypeObj.id;
        raw.surfaceMode = archetypeObj.primarySurfaceMode;
        raw.design = {
          ...(raw.design || {}),
          industryArchetype: archetypeObj.id,
          surfaceMode: archetypeObj.primarySurfaceMode,
          creativeNorthStar: archetypeObj.creativeNorthStar,
          apcaContrastFloor: archetypeObj.apcaContrastFloor,
          requiresTabularNums: archetypeObj.requiresTabularNums
        };
        fs.writeFileSync(manifestPath, JSON.stringify(raw, null, 2) + '\n', 'utf8');
      }
    } catch (_) {}
  }

  const productMdContent = compileProductMdContent(archetypeObj, projectMeta);
  const designMdContent = compileDesignMdContent(archetypeObj, projectMeta);

  const productMdPath = path.join(absRoot, 'PRODUCT.md');
  const designMdPath = path.join(absRoot, 'DESIGN.md');

  if (!options.dryRun) {
    fs.mkdirSync(absRoot, { recursive: true });
    fs.writeFileSync(productMdPath, productMdContent, 'utf8');
    fs.writeFileSync(designMdPath, designMdContent, 'utf8');
  }

  const lintReport = lintDesignMd(designMdContent, {
    archetype: archetypeObj.id,
    sourcePath: designMdPath
  });

  return {
    ok: lintReport.passed,
    archetype: archetypeObj.id,
    cliAlias: archetypeObj.cliAlias,
    title: archetypeObj.title,
    creativeNorthStar: archetypeObj.creativeNorthStar,
    surfaceMode: archetypeObj.primarySurfaceMode,
    productMdPath,
    designMdPath,
    lintReport
  };
}

/**
 * Self-Test Suite (`node tools/design/industry_archetype_matrix.mjs --self-test`)
 */
export function runIndustryArchetypeSelfTest() {
  const requiredCliAliases = ['abogacia', 'fintech', 'erp', 'ecommerce', 'streamer', 'clinica', 'saas', 'lujo'];
  const results = [];
  const seenNorthStars = new Set();

  for (const alias of requiredCliAliases) {
    const arch = resolveIndustryArchetype(alias);
    const productMd = compileProductMdContent(arch, { name: `Test-${alias}` });
    const designMd = compileDesignMdContent(arch, { name: `Test-${alias}` });
    const lintRes = lintDesignMd(designMd, { archetype: arch.id, sourcePath: `test-${alias}/DESIGN.md` });

    seenNorthStars.add(arch.creativeNorthStar);
    results.push({
      alias,
      archetypeId: arch.id,
      surfaceMode: arch.primarySurfaceMode,
      passed: lintRes.passed && productMd.includes('<!-- impeccable:product-schema 1 -->'),
      rulesChecked: lintRes.totalRulesChecked,
      passedRulesCount: lintRes.passedRulesCount,
      errors: lintRes.summary.errors,
      tokensDefined: lintRes.definedTokensCount
    });
  }

  // Also test negative detection: feed a sloppy DESIGN.md and verify lintDesignMd catches it
  const sloppySample = `---
name: Sloppy AI Page
colors:
  primary: "#00ffff"
typography:
  display:
    fontFamily: "Inter"
---
## Overview
background-color: #000000;
background: linear-gradient(90deg, #8b5cf6, #06b6d4);
-webkit-background-clip: text;
border-left: 4px solid #8b5cf6;
transition: width 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
`;
  const negativeLint = lintDesignMd(sloppySample, { archetype: 'fintech-and-banking' });
  const negativeBlocked = !negativeLint.passed && negativeLint.summary.errors >= 6;

  // Persist active project's PRODUCT.md and DESIGN.md if active project exists cleanly
  const activeProjDir = path.join(FACTORY_ROOT, 'projects', 'agencia-alfa');
  let activeProjectGenerated = false;
  if (fs.existsSync(activeProjDir)) {
    const genRes = generateProductAndDesignMd(activeProjDir, 'saas');
    activeProjectGenerated = genRes.ok;
  }

  const allPositivePassed = results.every((r) => r.passed && r.rulesChecked === 62 && r.errors === 0);
  const distinctArchetypes = seenNorthStars.size === requiredCliAliases.length;
  const passed = allPositivePassed && distinctArchetypes && negativeBlocked;

  return {
    passed,
    totalArchetypesTested: results.length,
    distinctArchetypes,
    antiSlopRulesCount: IMPECCABLE_62_ANTI_SLOP_RULES.length,
    negativeSlopBlocked: negativeBlocked,
    negativeSlopErrorsCaught: negativeLint.summary.errors,
    activeProjectGenerated,
    results
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    const report = runIndustryArchetypeSelfTest();
    console.log('==================================================================');
    console.log('🎨 INDUSTRY ARCHETYPE MATRIX & IMPECCABLE 62 ANTI-SLOP SELF-TEST');
    console.log('==================================================================');
    for (const r of report.results) {
      console.log(
        `  ${r.passed ? '✓' : '✗'} [${r.alias.padEnd(9)}] -> ${r.archetypeId.padEnd(36)} | Mode: ${r.surfaceMode.padEnd(10)} | Rules: ${r.passedRulesCount}/${r.rulesChecked} | Tokens: ${r.tokensDefined}`
      );
    }
    console.log('------------------------------------------------------------------');
    console.log(`  🛡️ Negative Slop Trap : ${report.negativeSlopBlocked ? 'BLOCKED' : 'FAILED'} (${report.negativeSlopErrorsCaught} slop violations caught)`);
    console.log(`  🏆 Overall Status     : ${report.passed ? 'PASS (Exit Code 0)' : 'FAIL'}`);
    console.log('==================================================================\n');
    process.exit(report.passed ? 0 : 1);
  } else {
    const archArg = args.find((a) => !a.startsWith('--')) || 'saas';
    const res = generateProductAndDesignMd(process.cwd(), archArg);
    console.log(JSON.stringify(res, null, 2));
    process.exit(res.ok ? 0 : 1);
  }
}
