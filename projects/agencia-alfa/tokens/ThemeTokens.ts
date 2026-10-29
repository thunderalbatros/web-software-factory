export const ThemeTokens = {
  "$schema": "https://tr.designtokens.org/format/2025.10/style-dictionary-multi-target.json",
  "meta": {
    "archetype": "saas-b2b",
    "styleSkill": "bento",
    "minTouchTargetDp": 48
  },
  "tokens": {
    "color.surface.canvas": {
      "$type": "color",
      "$value": "oklch(0.13 0.0127 258)",
      "rawValue": "oklch(0.13 0.0127 258)",
      "$description": "90% Primary background canvas"
    },
    "color.surface.elevated": {
      "$type": "color",
      "$value": "oklch(0.18 0.0146 258)",
      "rawValue": "oklch(0.18 0.0146 258)",
      "$description": "Elevated card surface (+5% L)"
    },
    "color.surface.interactive": {
      "$type": "color",
      "$value": "oklch(0.22 0.022 258)",
      "rawValue": "oklch(0.22 0.022 258)",
      "$description": "Interactive hover surface (+9% L)"
    },
    "color.surface.glass": {
      "$type": "color",
      "$value": "oklch(0.20 0.02 258 / 0.76)",
      "rawValue": "oklch(0.20 0.02 258 / 0.76)",
      "$description": "Glassmorphic sticky header surface"
    },
    "color.text.primary": {
      "$type": "color",
      "$value": "oklch(0.96 0.008 258)",
      "rawValue": "oklch(0.96 0.008 258)",
      "$description": "Primary headline & body text (APCA Lc >= 90)"
    },
    "color.text.secondary": {
      "$type": "color",
      "$value": "oklch(0.76 0.015 258)",
      "rawValue": "oklch(0.76 0.015 258)",
      "$description": "Supporting copy (APCA Lc >= 65)"
    },
    "color.text.muted": {
      "$type": "color",
      "$value": "oklch(0.62 0.015 258)",
      "rawValue": "oklch(0.62 0.015 258)",
      "$description": "Metadata & captions (APCA Lc >= 50)"
    },
    "color.brand.primary": {
      "$type": "color",
      "$value": "oklch(0.78 0.187 234)",
      "rawValue": "oklch(0.78 0.187 234)",
      "$description": "Locked primary client brand color"
    },
    "color.brand.secondary": {
      "$type": "color",
      "$value": "oklch(0.42 0.094 258)",
      "rawValue": "oklch(0.42 0.094 258)",
      "$description": "Locked secondary client brand color"
    },
    "color.brand.accent": {
      "$type": "color",
      "$value": "oklch(0.74 0.156 286)",
      "rawValue": "oklch(0.74 0.156 286)",
      "$description": "8% Supporting brand accent"
    },
    "color.brand.cta": {
      "$type": "color",
      "$value": "oklch(0.78 0.187 234)",
      "rawValue": "oklch(0.78 0.187 234)",
      "$description": "2% High-conversion focal CTA"
    },
    "color.brand.ctaInk": {
      "$type": "color",
      "$value": "oklch(0.14 0.02 258)",
      "rawValue": "oklch(0.14 0.02 258)",
      "$description": "High-contrast ink on CTA button"
    },
    "color.border.subtle": {
      "$type": "color",
      "$value": "oklch(1 0 0 / 0.08)",
      "rawValue": "oklch(1 0 0 / 0.08)",
      "$description": "1px subtle hairline border"
    },
    "color.border.highlight": {
      "$type": "color",
      "$value": "oklch(1 0 0 / 0.18)",
      "rawValue": "oklch(1 0 0 / 0.18)",
      "$description": "Interactive hover hairline"
    },
    "typography.fontFamily.sans": {
      "$type": "fontFamily",
      "$value": "'Rubik', system-ui, sans-serif",
      "rawValue": "'Rubik', system-ui, sans-serif",
      "$description": ""
    },
    "typography.fontFamily.display": {
      "$type": "fontFamily",
      "$value": "'Spectral', Georgia, serif",
      "rawValue": "'Spectral', Georgia, serif",
      "$description": ""
    },
    "typography.fontFamily.mono": {
      "$type": "fontFamily",
      "$value": "'Source Code Pro', monospace",
      "rawValue": "'Source Code Pro', monospace",
      "$description": ""
    },
    "typography.scale.stepMinus1": {
      "$type": "dimension",
      "$value": "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)",
      "rawValue": "clamp(0.82rem, 0.78rem + 0.2vw, 0.92rem)",
      "$description": ""
    },
    "typography.scale.step0": {
      "$type": "dimension",
      "$value": "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
      "rawValue": "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
      "$description": ""
    },
    "typography.scale.step1": {
      "$type": "dimension",
      "$value": "clamp(1.22rem, 1.12rem + 0.5vw, 1.406rem)",
      "rawValue": "clamp(1.22rem, 1.12rem + 0.5vw, 1.406rem)",
      "$description": ""
    },
    "typography.scale.step2": {
      "$type": "dimension",
      "$value": "clamp(1.5rem, 1.3rem + 1vw, 1.757rem)",
      "rawValue": "clamp(1.5rem, 1.3rem + 1vw, 1.757rem)",
      "$description": ""
    },
    "typography.scale.step3": {
      "$type": "dimension",
      "$value": "clamp(1.9rem, 1.55rem + 1.6vw, 2.196rem)",
      "rawValue": "clamp(1.9rem, 1.55rem + 1.6vw, 2.196rem)",
      "$description": ""
    },
    "typography.scale.step4": {
      "$type": "dimension",
      "$value": "clamp(2.25rem, 1.8rem + 2.2vw, 2.745rem)",
      "rawValue": "clamp(2.25rem, 1.8rem + 2.2vw, 2.745rem)",
      "$description": ""
    },
    "radius.card": {
      "$type": "dimension",
      "$value": "18px",
      "rawValue": "18px",
      "$description": "Primary card border radius"
    },
    "radius.pill": {
      "$type": "dimension",
      "$value": "9999px",
      "rawValue": "9999px",
      "$description": "Full pill button border radius"
    },
    "motion.easing.springSnappy": {
      "$type": "cubicBezier",
      "$value": "linear(0, 0.3566 9.6%, 0.7852 21.1%, 1.0156 32.2%, 1.0738 41.3%, 1.0468 53.6%, 1.0062 69.8%, 1)",
      "rawValue": "linear(0, 0.3566 9.6%, 0.7852 21.1%, 1.0156 32.2%, 1.0738 41.3%, 1.0468 53.6%, 1.0062 69.8%, 1)",
      "$description": "Real spring physics curve via CSS linear() for buttons & micro-interactions"
    },
    "motion.easing.springGentle": {
      "$type": "cubicBezier",
      "$value": "linear(0, 0.245 8.5%, 0.642 19.8%, 0.916 31.4%, 1.021 43.2%, 1.018 59.1%, 1)",
      "rawValue": "linear(0, 0.245 8.5%, 0.642 19.8%, 0.916 31.4%, 1.021 43.2%, 1.018 59.1%, 1)",
      "$description": "Gentle spring physics curve for cards & dialogs"
    },
    "motion.easing.cinematicOut": {
      "$type": "cubicBezier",
      "$value": "cubic-bezier(0.22, 1, 0.36, 1)",
      "rawValue": "cubic-bezier(0.22, 1, 0.36, 1)",
      "$description": "Cinematic deceleration curve"
    },
    "motion.easing.cinematicInOut": {
      "$type": "cubicBezier",
      "$value": "cubic-bezier(0.65, 0, 0.35, 1)",
      "rawValue": "cubic-bezier(0.65, 0, 0.35, 1)",
      "$description": "Symmetric cinematic curve for morphs"
    },
    "motion.duration.fast": {
      "$type": "duration",
      "$value": "160ms",
      "rawValue": "160ms",
      "$description": "Micro-interaction duration"
    },
    "motion.duration.normal": {
      "$type": "duration",
      "$value": "280ms",
      "rawValue": "280ms",
      "$description": "Standard surface & modal transition"
    },
    "motion.duration.slow": {
      "$type": "duration",
      "$value": "520ms",
      "rawValue": "520ms",
      "$description": "Hero & view-transition morph duration"
    },
    "audio.feedback": {
      "$type": "boolean",
      "$value": false,
      "rawValue": false,
      "$description": "Procedural ZzFX 1KB UI micro-audio feedback (disabled by default; set true to enable)"
    },
    "semantic.pageBackground": {
      "$type": "color",
      "$value": "oklch(0.13 0.0127 258)",
      "rawValue": "{color.surface.canvas}",
      "$description": "Alias to primary 90% neutral surface canvas"
    },
    "semantic.cardBackground": {
      "$type": "color",
      "$value": "oklch(0.18 0.0146 258)",
      "rawValue": "{color.surface.elevated}",
      "$description": "Alias to elevated surface"
    },
    "semantic.primaryActionBg": {
      "$type": "color",
      "$value": "oklch(0.78 0.187 234)",
      "rawValue": "{color.brand.cta}",
      "$description": "Alias to 2% focal CTA color"
    },
    "semantic.primaryActionInk": {
      "$type": "color",
      "$value": "oklch(0.14 0.02 258)",
      "rawValue": "{color.brand.ctaInk}",
      "$description": "Alias to high-contrast CTA text"
    },
    "semantic.headingFont": {
      "$type": "fontFamily",
      "$value": "'Spectral', Georgia, serif",
      "rawValue": "{typography.fontFamily.display}",
      "$description": "Alias to display typography"
    },
    "semantic.defaultSpringEasing": {
      "$type": "cubicBezier",
      "$value": "linear(0, 0.3566 9.6%, 0.7852 21.1%, 1.0156 32.2%, 1.0738 41.3%, 1.0468 53.6%, 1.0062 69.8%, 1)",
      "rawValue": "{motion.easing.springSnappy}",
      "$description": "Alias to primary linear() spring"
    }
  }
} as const;
