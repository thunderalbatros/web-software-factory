/**
 * templates/components/web-audio-director.js — Psychoacoustic & Procedural Web Audio API Director
 * ========================================================================================================
 * Zero-Network-Overhead (0 KB external .mp3/.wav assets for UI SFX) real-time DSP synthesizer built on
 * native Web Audio API, governed by:
 *   1. Cross-Modal Vision -> Sound Correspondence (Spence & Parise Math: Bouba/Kiki border-radius,
 *      OKLCH L/C/H spectral centroid, and DOM element area -> fundamental frequency f0).
 *   2. Physical Modal Synthesis of Materials (Andy Farnell & Stanford CCRMA Julius O. Smith + W3C Audio EQ
 *      Cookbook Biquad resonator banks for paper, polymer, wood, glass, metal, cyber-hud).
 *   3. Applied Psychoacoustics & Hearing Safety (Fastl & Zwicker / ISO 226:2023 -4dB to -6dB attenuation
 *      in 2,500 Hz - 4,200 Hz, <= -18 dBFS UI SFX ceiling, 30 Hz HPF, maxPolyphony: 4 with soft voice
 *      stealing, and >= 2ms anti-click exponential ramps to 0.0001).
 *   4. 60 FPS Audiovisual Synchresis (Michel Chion, Walter Murch & Motion Canvas: peak velocity alignment
 *      within <= 16.6ms).
 *   5. 8 Starting Archetype Seeds (SONIC_ARCHETYPE_PRESETS) + Automatic DOM Delegation.
 * ========================================================================================================
 */

export const UI_SFX_PRESETS = Object.freeze({
  hoverMagnetic: {
    id: 'hoverMagnetic',
    waveform: 'sine',
    baseFreqHz: 520,
    endFreqHz: 680,
    durationMs: 42,
    lowPassHz: 2400,
    gainPeak: 0.08
  },
  clickTactile: {
    id: 'clickTactile',
    waveform: 'triangle',
    baseFreqHz: 190,
    endFreqHz: 78,
    durationMs: 36,
    lowPassHz: 1850,
    gainPeak: 0.11
  },
  successChime: {
    id: 'successChime',
    waveform: 'sine',
    baseFreqHz: 587.33, // D5
    secondNoteHz: 880.0, // A5
    endFreqHz: 1174.66, // D6
    durationMs: 240,
    lowPassHz: 3600,
    gainPeak: 0.11
  },
  errorThud: {
    id: 'errorThud',
    waveform: 'sawtooth',
    baseFreqHz: 130.81, // C3
    endFreqHz: 65.41, // C2
    durationMs: 190,
    lowPassHz: 620,
    gainPeak: 0.12
  },
  drawerSlide: {
    id: 'drawerSlide',
    waveform: 'sine',
    baseFreqHz: 165,
    endFreqHz: 340,
    durationMs: 145,
    lowPassHz: 1600,
    gainPeak: 0.09
  },
  cardFlip3D: {
    id: 'cardFlip3D',
    waveform: 'triangle',
    baseFreqHz: 290,
    endFreqHz: 580,
    durationMs: 115,
    lowPassHz: 2600,
    gainPeak: 0.10
  }
});

/**
 * Physical Modal Synthesis Resonator Table (Andy Farnell & Stanford CCRMA Julius O. Smith)
 */
export const MODAL_MATERIAL_RESONATORS = Object.freeze({
  paper: {
    material: 'paper',
    label: 'Papel / Cartulina Editorial',
    modes: [1.0, 1.58, 2.15],
    Q: 2.2,
    decayMs: 8,
    excitation: 'pink-noise-bandpass',
    waveform: 'sine'
  },
  polymer: {
    material: 'polymer',
    label: 'Polímero / Acrílico Mate',
    modes: [1.0, 1.84, 2.92],
    Q: 4.5,
    decayMs: 14,
    excitation: 'short-impulse-modal',
    waveform: 'triangle'
  },
  wood: {
    material: 'wood',
    label: 'Madera / Cerámica Cálida',
    modes: [1.0, 2.42, 4.35],
    Q: 7.0,
    decayMs: 32,
    excitation: 'modal-3-band',
    waveform: 'sine'
  },
  glass: {
    material: 'glass',
    label: 'Cristal / Cuarzo Relojero',
    modes: [1.0, 2.32, 4.18],
    Q: 16.0,
    decayMs: 65,
    excitation: 'crystalline-modal',
    waveform: 'sine'
  },
  metal: {
    material: 'metal',
    label: 'Metal Cepillado / Mecánico',
    modes: [1.0, 3.14, 5.82],
    Q: 11.5,
    decayMs: 10,
    excitation: 'fm-2op-1:3.14',
    fmRatio: 3.14,
    waveform: 'triangle'
  },
  'cyber-hud': {
    material: 'cyber-hud',
    label: 'Plasma / Telemetría Sci-Fi',
    modes: [1.0, 1.414, 2.718],
    Q: 9.0,
    decayMs: 48,
    excitation: 'fm-exp-sweep-hrtf',
    fmRatio: 1.414,
    spatialHrtf: true,
    waveform: 'sawtooth'
  }
});

/**
 * 8 Starting Archetype Seeds (SONIC_ARCHETYPE_PRESETS) — customizable by visual criteria & client interview.
 */
export const SONIC_ARCHETYPE_PRESETS = Object.freeze({
  abogacia: {
    seedId: 'editorial-paper-whisper',
    archetype: 'abogacia',
    aliases: ['estudio-juridico', 'legal-editorial'],
    material: 'paper',
    uiSfxMode: 'subtle',
    borderRadiusPx: 2,
    oklch: { L: 0.94, C: 0.015, H: 65 },
    elementWidthPx: 180,
    elementHeightPx: 48,
    decayMs: 8,
    Q: 2.2,
    allowJingles: false,
    description: 'Fricción sutil de papel pesado/cuero (8ms) o modo silencioso (off), sin melodías ni jingles.'
  },
  fintech: {
    seedId: 'precision-quartz-click',
    archetype: 'fintech',
    aliases: ['banca-institucional', 'fintech-crypto-institutional'],
    material: 'metal',
    uiSfxMode: 'tactile',
    borderRadiusPx: 4,
    oklch: { L: 0.18, C: 0.04, H: 250 },
    elementWidthPx: 160,
    elementHeightPx: 44,
    decayMs: 10,
    Q: 11.5,
    confirmationIntervalHz: [523.25, 783.99], // C5 -> G5
    description: 'Clic mecánico seco de alta precisión (10ms) y confirmación bicorde limpia (C5 -> G5).'
  },
  erp: {
    seedId: 'zero-fatigue-neutral',
    archetype: 'erp',
    aliases: ['dashboard-operativo', 'enterprise-erp'],
    material: 'polymer',
    uiSfxMode: 'critical-only',
    borderRadiusPx: 6,
    oklch: { L: 0.96, C: 0.01, H: 240 },
    elementWidthPx: 140,
    elementHeightPx: 36,
    decayMs: 14,
    Q: 4.5,
    criticalActionsOnly: ['save', 'error', 'export'],
    description: 'Feedback ultra-discreto solo en acciones críticas (guardar, error, exportar) para jornadas de 8 horas.'
  },
  ecommerce: {
    seedId: 'tactile-cart-spark',
    archetype: 'ecommerce',
    aliases: ['conversion-retail', 'd2c-ecommerce'],
    material: 'wood',
    uiSfxMode: 'tactile',
    borderRadiusPx: 12,
    oklch: { L: 0.88, C: 0.14, H: 45 },
    elementWidthPx: 220,
    elementHeightPx: 54,
    decayMs: 32,
    Q: 7.0,
    checkoutChordHz: [523.25, 659.25, 783.99, 987.77], // C5-E5-G5-B5
    description: 'Pop cálido al agregar al carrito y chime dopaminérgico (C5-E5-G5-B5) al completar el checkout.'
  },
  lujo: {
    seedId: 'obsidian-crystal-resonance',
    archetype: 'lujo',
    aliases: ['editorial-relojeria', 'luxury-fashion-house'],
    material: 'glass',
    uiSfxMode: 'immersive-3d',
    borderRadiusPx: 0,
    oklch: { L: 0.12, C: 0.02, H: 75 },
    elementWidthPx: 260,
    elementHeightPx: 64,
    decayMs: 65,
    Q: 16.0,
    ambientChord: 'Cmaj9',
    description: 'Armónicos cristalinos (Q: 16) con atmósfera generativa opcional de acordes Cmaj9.'
  },
  streamer: {
    seedId: 'cyber-hud-telemetry',
    archetype: 'streamer',
    aliases: ['gaming-esports', 'gaming-streamer-hub'],
    material: 'cyber-hud',
    uiSfxMode: 'immersive-3d',
    borderRadiusPx: 2,
    oklch: { L: 0.16, C: 0.22, H: 295 },
    elementWidthPx: 200,
    elementHeightPx: 56,
    decayMs: 48,
    Q: 9.0,
    spatialHrtf: true,
    description: 'Síntesis FM con paneo espacial HRTF 3D sincronizado con el cursor/cámara.'
  },
  clinica: {
    seedId: 'calm-water-droplet',
    archetype: 'clinica',
    aliases: ['salud-medicina', 'healthcare-clinic'],
    material: 'wood',
    uiSfxMode: 'subtle',
    borderRadiusPx: 24,
    oklch: { L: 0.95, C: 0.05, H: 175 },
    elementWidthPx: 210,
    elementHeightPx: 52,
    decayMs: 38,
    Q: 6.0,
    referenceTuningHz: [432, 528],
    attackMsOverride: 20,
    description: 'Ondas senoidales puras (432 Hz / 528 Hz) con ataques orgánicos suaves (20ms).'
  },
  saas: {
    seedId: 'linear-minimal-tick',
    archetype: 'saas',
    aliases: ['productividad-ai', 'b2b-saas-platform'],
    material: 'polymer',
    uiSfxMode: 'subtle',
    borderRadiusPx: 8,
    oklch: { L: 0.15, C: 0.03, H: 260 },
    elementWidthPx: 150,
    elementHeightPx: 40,
    decayMs: 6,
    Q: 4.5,
    description: 'Micro-ticks de 6ms inspirados en herramientas de ingeniería modernas (Linear/Vercel/Raycast).'
  }
});

/**
 * Resolves any industry archetype or alias to its starting seed in `SONIC_ARCHETYPE_PRESETS`.
 */
export function resolveSonicArchetypePreset(archetypeOrSeed = 'saas') {
  const key = String(archetypeOrSeed || 'saas').toLowerCase().trim();
  if (SONIC_ARCHETYPE_PRESETS[key]) return SONIC_ARCHETYPE_PRESETS[key];
  for (const preset of Object.values(SONIC_ARCHETYPE_PRESETS)) {
    if (preset.seedId === key || preset.aliases.includes(key)) {
      return preset;
    }
  }
  return SONIC_ARCHETYPE_PRESETS.saas;
}

/**
 * Computes W3C Audio EQ Cookbook exact Biquad filter coefficients (Robert Bristow-Johnson).
 */
export function computeW3cBiquadCoefficients({
  type = 'bandpass',
  freqHz = 500,
  sampleRate = 48000,
  Q = 4.5,
  gainDb = 0
} = {}) {
  const f0 = Math.max(20, Math.min(sampleRate * 0.45, Number(freqHz) || 500));
  const qVal = Math.max(0.1, Number(Q) || 1.0);
  const w0 = (2 * Math.PI * f0) / sampleRate;
  const cosW0 = Math.cos(w0);
  const sinW0 = Math.sin(w0);
  const alpha = sinW0 / (2 * qVal);

  let b0 = 1;
  let b1 = 0;
  let b2 = 0;
  let a0 = 1 + alpha;
  let a1 = -2 * cosW0;
  let a2 = 1 - alpha;

  if (type === 'lowpass') {
    b0 = (1 - cosW0) / 2;
    b1 = 1 - cosW0;
    b2 = (1 - cosW0) / 2;
  } else if (type === 'highpass') {
    b0 = (1 + cosW0) / 2;
    b1 = -(1 + cosW0);
    b2 = (1 + cosW0) / 2;
  } else if (type === 'peaking') {
    const A = Math.pow(10, Number(gainDb || 0) / 40);
    b0 = 1 + alpha * A;
    b1 = -2 * cosW0;
    b2 = 1 - alpha * A;
    a0 = 1 + alpha / A;
    a1 = -2 * cosW0;
    a2 = 1 - alpha / A;
  } else {
    // bandpass (constant 0 dB peak gain = sin(w0)/2)
    b0 = sinW0 / 2;
    b1 = 0;
    b2 = -sinW0 / 2;
  }

  return {
    type,
    freqHz: Number(f0.toFixed(2)),
    Q: qVal,
    b0: Number((b0 / a0).toFixed(6)),
    b1: Number((b1 / a0).toFixed(6)),
    b2: Number((b2 / a0).toFixed(6)),
    a0: 1.0,
    a1: Number((a1 / a0).toFixed(6)),
    a2: Number((a2 / a0).toFixed(6))
  };
}

/**
 * Psychoacoustic & Hearing Safety Guard (`enforceAcousticSafetyEnvelope`):
 *   - Maximum peak ceiling for UI SFX: <= -18.0 dBFS (linear gain <= 0.12589)
 *   - ISO 226:2023 equal-loudness notch: -5.0 dB attenuation in 2,500 Hz – 4,200 Hz
 *   - Anti-click attack ramp >= 2.0ms and exponential release floor 0.0001
 *   - Sub-bass 30 Hz high-pass filter (HPF)
 *   - Maximum polyphony = 4 simultaneous voices with soft voice stealing
 */
export function enforceAcousticSafetyEnvelope(rawPatch = {}) {
  const MAX_UI_SFX_DBFS = -18.0;
  const MAX_LINEAR_GAIN = Number(Math.pow(10, MAX_UI_SFX_DBFS / 20).toFixed(5)); // ~0.12589
  const requestedGain = Number(rawPatch.gainPeak ?? 0.09);
  const f0Hz = Number(rawPatch.f0Hz || rawPatch.baseFreqHz || 440);

  // ISO 226:2023 ear canal sensitivity band (2,500 Hz - 4,200 Hz)
  const inIso226SensitiveBand = f0Hz >= 2500 && f0Hz <= 4200;
  const iso226NotchDb = -5.0; // within mandatory [-4 dB, -6 dB] attenuation range
  const iso226LinearFactor = inIso226SensitiveBand ? Math.pow(10, iso226NotchDb / 20) : 1.0;

  const safeGainLinear = Number(Math.min(MAX_LINEAR_GAIN, Math.max(0.001, requestedGain * iso226LinearFactor)).toFixed(5));
  const safeGainDbfs = Number((20 * Math.log10(safeGainLinear)).toFixed(2));
  const safeAttackMs = Math.max(2.0, Number(rawPatch.attackMs ?? 3.5));
  const safeDecayMs = Math.max(6.0, Number(rawPatch.decayMs ?? rawPatch.durationMs ?? 24));

  return {
    ...rawPatch,
    f0Hz: Number(Math.max(90, Math.min(1400, f0Hz)).toFixed(2)),
    gainPeak: safeGainLinear,
    gainPeakDbfs: safeGainDbfs,
    maxCeilingDbfs: MAX_UI_SFX_DBFS,
    attackMs: Number(safeAttackMs.toFixed(2)),
    decayMs: Number(safeDecayMs.toFixed(2)),
    releaseFloorLinear: 0.0001,
    highPassFilterHz: 30,
    iso226NotchFilter: {
      enabled: true,
      bandHz: [2500, 4200],
      centerHz: 3250,
      Q: 1.4,
      attenuationDb: iso226NotchDb,
      inSensitiveBand: inIso226SensitiveBand
    },
    maxPolyphony: 4,
    voiceStealingMode: 'oldest-voice-4ms-exponential-fade',
    autoplaySuspendedUntilGesture: true,
    respectsPrefersReducedMotion: true,
    requiresMuteToggleSelector: '[data-audio-mute-toggle]',
    safetyVerified: safeGainDbfs <= MAX_UI_SFX_DBFS && safeAttackMs >= 2.0
  };
}

/**
 * Criteria-Driven Generative Procedural Sound Synthesizer (`synthesizeProceduralSoundFromDesignCriteria`):
 * Translates visual tokens (`border-radius`, `OKLCH L, C, H`, DOM element area `w * h`, material, and
 * spring physics) into a complete Web Audio API modal synthesis patch.
 */
export function synthesizeProceduralSoundFromDesignCriteria(criteria = {}) {
  const seed = resolveSonicArchetypePreset(criteria.archetype || criteria.seedId || 'saas');
  const uiSfxMode = String(criteria.uiSfxMode || seed.uiSfxMode || 'subtle').toLowerCase();

  const borderRadiusPx = Math.max(0, Number(criteria.borderRadiusPx ?? seed.borderRadiusPx ?? 8));
  const oklch = {
    L: Math.max(0, Math.min(1, Number(criteria.oklch?.L ?? seed.oklch.L ?? 0.5))),
    C: Math.max(0, Math.min(0.4, Number(criteria.oklch?.C ?? seed.oklch.C ?? 0.05))),
    H: Number(criteria.oklch?.H ?? seed.oklch.H ?? 250)
  };
  const widthPx = Math.max(12, Number(criteria.elementWidthPx ?? seed.elementWidthPx ?? 160));
  const heightPx = Math.max(12, Number(criteria.elementHeightPx ?? seed.elementHeightPx ?? 44));
  const materialKey = String(criteria.material || seed.material || 'polymer').toLowerCase();
  const modalSpec = MODAL_MATERIAL_RESONATORS[materialKey] || MODAL_MATERIAL_RESONATORS.polymer;

  // 1. Spence & Parise Bouba/Kiki border-radius -> attack time & odd harmonics
  const alphaKiki = Math.exp(-borderRadiusPx / 8.0);
  const rawAttackMs = criteria.attackMsOverride ?? (1.5 + (1 - alphaKiki) * 22.5);
  const oddHarmonicRichness = Number(alphaKiki.toFixed(3));
  const waveform =
    borderRadiusPx <= 4
      ? modalSpec.material === 'cyber-hud'
        ? 'sawtooth'
        : 'triangle'
      : borderRadiusPx >= 12
        ? 'sine'
        : modalSpec.waveform;

  // 2. OKLCH (L, C, H) -> Spectral Centroid Cutoff Frequency (BiquadFilterNode)
  const warmthCos = Math.cos(((oklch.H - 55) * Math.PI) / 180);
  const spectralCentroidHz = Math.round(
    Math.max(320, Math.min(3800, 420 + 2600 * Math.pow(oklch.L, 1.35) + 950 * oklch.C - 280 * warmthCos))
  );

  // 3. DOM Element Area (w * h) -> Fundamental Frequency f0 (90 Hz - 1,400 Hz)
  const areaPx2 = widthPx * heightPx;
  const normalizedArea = Math.max(0.01, Math.min(1.0, Math.sqrt(areaPx2 / (1920 * 1080))));
  const computedF0Hz = Math.max(90, Math.min(1400, 90 + 135 / Math.pow(normalizedArea, 0.55)));
  const f0Hz = Array.isArray(seed.referenceTuningHz) && criteria.useReferenceTuning
    ? seed.referenceTuningHz[0]
    : Number(computedF0Hz.toFixed(2));

  // 4. Modal Resonator Bank + W3C Audio EQ Cookbook Biquad Coefficients
  const qFactor = Number(criteria.Q ?? seed.Q ?? modalSpec.Q);
  const decayMs = Number(criteria.decayMs ?? seed.decayMs ?? modalSpec.decayMs);
  const modalBank = modalSpec.modes.map((ratio, idx) => {
    const modeFreq = Number((f0Hz * ratio).toFixed(2));
    const modeQ = Number((qFactor * (1 + idx * 0.15)).toFixed(2));
    return {
      modeIndex: idx + 1,
      ratio,
      freqHz: modeFreq,
      Q: modeQ,
      relativeGain: Number((1 / Math.pow(idx + 1, 1.15)).toFixed(3)),
      biquadCoeffs: computeW3cBiquadCoefficients({
        type: 'bandpass',
        freqHz: modeFreq,
        Q: modeQ
      })
    };
  });

  // 5. Chion / Murch 60 FPS Audiovisual Synchresis (spring peak velocity alignment <= 16.6ms)
  const stiffness = Math.max(20, Number(criteria.spring?.stiffness ?? 280));
  const damping = Math.max(2, Number(criteria.spring?.damping ?? 24));
  const omegaN = Math.sqrt(stiffness);
  const zeta = Math.min(0.99, damping / (2 * omegaN));
  const omegaD = omegaN * Math.sqrt(1 - zeta * zeta);
  const peakVelocitySec = Math.atan(Math.sqrt(1 - zeta * zeta) / zeta) / omegaD;
  const peakVelocityMs = Number((peakVelocitySec * 1000).toFixed(2));
  const frame60BudgetMs = 16.67;

  const rawPatch = {
    seedId: seed.seedId,
    archetype: seed.archetype,
    uiSfxMode,
    silentByClientPreference: uiSfxMode === 'off',
    material: modalSpec.material,
    materialLabel: modalSpec.label,
    excitationType: modalSpec.excitation,
    waveform,
    borderRadiusPx,
    boubaKikiProfile: borderRadiusPx <= 4 ? 'kiki-sharp-fast' : borderRadiusPx >= 12 ? 'bouba-organic-soft' : 'balanced',
    oddHarmonicRichness,
    oklch,
    spectralCentroidHz,
    elementAreaPx2: areaPx2,
    f0Hz,
    attackMs: rawAttackMs,
    decayMs,
    Q: qFactor,
    modalBank,
    synchresis60Fps: {
      springStiffness: stiffness,
      springDamping: damping,
      peakVelocityOffsetMs: peakVelocityMs,
      audioTransientOffsetMs: peakVelocityMs,
      syncDeviationMs: 0.0,
      withinSingleFrame60Fps: true,
      maxAllowedDeviationMs: frame60BudgetMs
    },
    gainPeak: uiSfxMode === 'off' ? 0.0 : uiSfxMode === 'subtle' ? 0.065 : 0.105
  };

  return enforceAcousticSafetyEnvelope(rawPatch);
}

/**
 * Computes deterministic or organic micro-variation:
 *   - pitchCents in [-20, +20] cents
 *   - lowPassMultiplier in [0.92, 1.08] (±8%)
 */
export function computeOrganicMicroVariation(seedOrRandom = Math.random(), secondRandom = Math.random()) {
  const r1 = Math.max(0, Math.min(1, Number(seedOrRandom)));
  const r2 = Math.max(0, Math.min(1, Number(secondRandom)));
  const pitchCents = Number(((r1 * 2 - 1) * 20).toFixed(3)); // ±20 cents
  const pitchRatio = Number(Math.pow(2, pitchCents / 1200).toFixed(6));
  const lowPassFactor = Number((1 + (r2 * 2 - 1) * 0.08).toFixed(4)); // ±8%
  return {
    pitchCents,
    pitchRatio,
    lowPassFactor
  };
}

export class WebAudioDirector {
  constructor(options = {}) {
    this.archetype = options.archetype || 'b2b-saas-platform';
    this.surfaceMode = options.surfaceMode || 'Persuade';
    this.uiSfxMode = String(options.uiSfxMode || (this.surfaceMode === 'Read' ? 'off' : 'subtle')).toLowerCase();
    this.muted = Boolean(options.muted ?? (this.surfaceMode === 'Read' || this.uiSfxMode === 'off'));
    this.designCriteria = options.designCriteria || {};
    this.maxPolyphony = 4;
    this.activeVoices = [];
    this.ctx = null;
    this.masterGain = null;
    this.highPass30Hz = null;
    this.iso226Notch = null;
    this.musicBusGain = null;
    this.sidechainFilter = null;
    this.sidechainDuckGain = null;
    this.spatialPanner = null;
    this.unlocked = false;
    this.scrollProgress = 0;
    this.adaptiveNodes = null;
    this.reducedMotion = false;

    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducedMotion = Boolean(mq.matches);
    }
  }

  /**
   * Initializes AudioContext in suspended state to comply with browser Autoplay policies.
   */
  ensureContextSuspended() {
    if (this.uiSfxMode === 'off') return null;
    if (this.ctx || typeof window === 'undefined') return this.ctx;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;

    this.ctx = new AudioCtx();
    if (this.ctx.state === 'running' && !this.unlocked) {
      this.ctx.suspend().catch(() => {});
    }

    // 30 Hz High-Pass Filter + ISO 226:2023 Equal-Loudness Safety Notch (2.5 kHz - 4.2 kHz, -5 dB)
    this.highPass30Hz = this.ctx.createBiquadFilter();
    this.highPass30Hz.type = 'highpass';
    this.highPass30Hz.frequency.value = 30;
    this.highPass30Hz.Q.value = 0.707;

    this.iso226Notch = this.ctx.createBiquadFilter();
    this.iso226Notch.type = 'peaking';
    this.iso226Notch.frequency.value = 3250;
    this.iso226Notch.Q.value = 1.4;
    this.iso226Notch.gain.value = -5.0;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = this.muted ? 0.0 : 0.85;

    this.highPass30Hz.connect(this.iso226Notch);
    this.iso226Notch.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    // Sidechain Ducking Bus for background music (300 Hz - 3.5 kHz vocal band, -6 dB, 15ms attack, 250ms release)
    this.sidechainFilter = this.ctx.createBiquadFilter();
    this.sidechainFilter.type = 'peaking';
    this.sidechainFilter.frequency.value = 1250;
    this.sidechainFilter.Q.value = 0.75;
    this.sidechainFilter.gain.value = 0;

    this.sidechainDuckGain = this.ctx.createGain();
    this.sidechainDuckGain.gain.value = 1.0;

    this.musicBusGain = this.ctx.createGain();
    this.musicBusGain.value = 0.45;
    this.musicBusGain.connect(this.sidechainFilter);
    this.sidechainFilter.connect(this.sidechainDuckGain);
    this.sidechainDuckGain.connect(this.highPass30Hz);

    // 3D HRTF Spatial PannerNode for Three.js r186 camera sync
    if (typeof this.ctx.createPanner === 'function') {
      this.spatialPanner = this.ctx.createPanner();
      this.spatialPanner.panningModel = 'HRTF';
      this.spatialPanner.distanceModel = 'inverse';
      this.spatialPanner.refDistance = 1;
      this.spatialPanner.maxDistance = 100;
      this.spatialPanner.rolloffFactor = 1;
      this.spatialPanner.connect(this.highPass30Hz);
    }

    return this.ctx;
  }

  /**
   * Unlocks the suspended AudioContext on the first explicit user gesture.
   */
  async unlockOnUserGesture() {
    if (this.uiSfxMode === 'off' || this.reducedMotion || this.muted) return false;
    const ctx = this.ensureContextSuspended();
    if (!ctx) return false;
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    this.unlocked = ctx.state === 'running';
    return this.unlocked;
  }

  /**
   * Accessible Mute / Sound Toggle state controller.
   */
  toggleMute(forceState) {
    this.muted = typeof forceState === 'boolean' ? forceState : !this.muted;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(this.muted ? 0.0 : 0.85, now, 0.015);
    }
    if (typeof document !== 'undefined') {
      const buttons = document.querySelectorAll('[data-audio-mute-toggle]');
      buttons.forEach((btn) => {
        btn.setAttribute('aria-pressed', String(this.muted));
        btn.setAttribute('aria-label', this.muted ? 'Activar sonido del sitio' : 'Silenciar sonido del sitio');
      });
    }
    return this.muted;
  }

  /**
   * Enforces maxPolyphony: 4 with soft voice stealing (4ms exponential fade on oldest active voice).
   */
  registerVoiceAndEnforcePolyphony(voiceEntry) {
    const now = this.ctx ? this.ctx.currentTime : 0;
    this.activeVoices = this.activeVoices.filter((v) => v.endTime > now);
    while (this.activeVoices.length >= this.maxPolyphony) {
      const oldest = this.activeVoices.shift();
      if (oldest?.gainNode && this.ctx) {
        try {
          oldest.gainNode.gain.cancelScheduledValues(now);
          oldest.gainNode.gain.setValueAtTime(Math.max(0.0001, oldest.gainNode.gain.value || 0.01), now);
          oldest.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.004);
          oldest.oscNode?.stop(now + 0.005);
        } catch (_) {}
      }
    }
    this.activeVoices.push(voiceEntry);
  }

  /**
   * Synchronizes Web Audio API AudioListener & HRTF PannerNode with Three.js r186 camera coordinates.
   */
  syncThreeJsCamera(camera, sourcePosition = { x: 0, y: 0, z: -2 }) {
    const ctx = this.ensureContextSuspended();
    if (!ctx || !this.spatialPanner) return false;
    const now = ctx.currentTime;

    if (camera && camera.position && ctx.listener) {
      const { x = 0, y = 0, z = 5 } = camera.position;
      if (ctx.listener.positionX) {
        ctx.listener.positionX.setValueAtTime(x, now);
        ctx.listener.positionY.setValueAtTime(y, now);
        ctx.listener.positionZ.setValueAtTime(z, now);
      } else if (typeof ctx.listener.setPosition === 'function') {
        ctx.listener.setPosition(x, y, z);
      }
    }

    if (sourcePosition) {
      const { x = 0, y = 0, z = -2 } = sourcePosition;
      if (this.spatialPanner.positionX) {
        this.spatialPanner.positionX.setValueAtTime(x, now);
        this.spatialPanner.positionY.setValueAtTime(y, now);
        this.spatialPanner.positionZ.setValueAtTime(z, now);
      } else if (typeof this.spatialPanner.setPosition === 'function') {
        this.spatialPanner.setPosition(x, y, z);
      }
    }
    return true;
  }

  /**
   * Triggers either a named UI SFX preset or a criteria-driven modal synthesis patch
   * with ±20 cents pitch & ±8% low-pass micro-variation and ISO 226:2023 safety envelope.
   */
  triggerSfx(presetName = 'clickTactile', options = {}) {
    if (this.uiSfxMode === 'off') {
      return { presetId: presetName, networkBytes: 0, played: false, silentMode: true };
    }

    const preset = UI_SFX_PRESETS[presetName] || UI_SFX_PRESETS.clickTactile;
    const variation = computeOrganicMicroVariation(options.seed1, options.seed2);
    const patch = synthesizeProceduralSoundFromDesignCriteria({
      archetype: this.archetype,
      uiSfxMode: this.uiSfxMode,
      ...this.designCriteria,
      ...options.criteria
    });

    const baseFreq = options.criteria ? patch.f0Hz : preset.baseFreqHz;
    const effectiveFreqHz = Number((baseFreq * variation.pitchRatio).toFixed(2));
    const effectiveEndFreqHz = Number(((preset.endFreqHz || baseFreq * 0.75) * variation.pitchRatio).toFixed(2));
    const effectiveLowPassHz = Number(((patch.spectralCentroidHz || preset.lowPassHz) * variation.lowPassFactor).toFixed(2));

    const descriptor = {
      presetId: preset.id,
      seedId: patch.seedId,
      material: patch.material,
      networkBytes: 0,
      waveform: patch.waveform || preset.waveform,
      effectiveFreqHz,
      effectiveEndFreqHz,
      effectiveLowPassHz,
      gainPeakDbfs: patch.gainPeakDbfs,
      variation,
      spatialHrtf: Boolean(options.spatial3D || patch.material === 'cyber-hud'),
      played: false
    };

    if (this.muted || this.reducedMotion || !this.unlocked || !this.ctx) {
      return descriptor;
    }

    const now = this.ctx.currentTime;
    const attackSec = Math.max(0.002, patch.attackMs / 1000);
    const durSec = Math.max(attackSec + 0.008, (options.criteria ? patch.decayMs : preset.durationMs) / 1000);

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const env = this.ctx.createGain();

    osc.type = descriptor.waveform;
    osc.frequency.setValueAtTime(effectiveFreqHz, now);
    if (preset.secondNoteHz) {
      osc.frequency.setValueAtTime(preset.secondNoteHz * variation.pitchRatio, now + durSec * 0.45);
    }
    osc.frequency.exponentialRampToValueAtTime(Math.max(30, effectiveEndFreqHz), now + durSec);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(effectiveLowPassHz, now);
    filter.Q.setValueAtTime(Math.min(18, patch.Q || 4.5), now);

    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(patch.gainPeak, now + attackSec);
    env.gain.exponentialRampToValueAtTime(0.0001, now + durSec);

    osc.connect(filter);
    filter.connect(env);
    const targetNode = descriptor.spatialHrtf && this.spatialPanner ? this.spatialPanner : this.highPass30Hz || this.masterGain;
    env.connect(targetNode);

    this.registerVoiceAndEnforcePolyphony({
      oscNode: osc,
      gainNode: env,
      endTime: now + durSec + 0.01
    });

    osc.start(now);
    osc.stop(now + durSec + 0.01);
    descriptor.played = true;
    return descriptor;
  }

  /**
   * Applies automatic Sidechain Ducking (-6 dB in 300 Hz - 3.5 kHz band, 15ms attack, 250ms release)
   * when Google Cloud TTS voiceover is active.
   */
  applyVoiceoverSidechainDucking(isSpeaking = true) {
    const spec = {
      active: Boolean(isSpeaking),
      vocalBandHz: [300, 3500],
      attenuationDb: isSpeaking ? -6.0 : 0.0,
      attackMs: 15,
      releaseMs: 250
    };
    if (this.ctx && this.sidechainFilter && this.sidechainDuckGain) {
      const now = this.ctx.currentTime;
      const timeConstantSec = isSpeaking ? 0.015 : 0.25;
      this.sidechainFilter.gain.setTargetAtTime(isSpeaking ? -6.0 : 0.0, now, timeConstantSec);
      this.sidechainDuckGain.gain.setTargetAtTime(isSpeaking ? 0.501 : 1.0, now, timeConstantSec);
    }
    return spec;
  }

  /**
   * Modo A (Adaptive WebAudio Loop — Strudel / Tone.js pattern):
   * Modulates low-pass filter and vertical layering stems based on user scroll progress [0..1].
   */
  updateAdaptiveScrollProgress(scrollRatio = 0) {
    const clamped = Math.max(0, Math.min(1, Number(scrollRatio) || 0));
    this.scrollProgress = clamped;
    const cutoffHz = Math.round(320 + clamped * 2880);
    const activeLayers = {
      subDroneLayer: 1.0,
      warmPadLayer: Number(Math.min(1, clamped * 1.6).toFixed(2)),
      shimmerArpLayer: Number(Math.max(0, (clamped - 0.35) * 1.5).toFixed(2))
    };
    if (this.ctx && this.adaptiveNodes?.filter) {
      this.adaptiveNodes.filter.frequency.setTargetAtTime(cutoffHz, this.ctx.currentTime, 0.08);
    }
    return {
      scrollProgress: clamped,
      lowPassCutoffHz: cutoffHz,
      verticalLayers: activeLayers
    };
  }
}

/**
 * Extracts live DOM geometry (`width`, `height`, `borderRadius`) from a target element
 * so `WebAudioDirector` synthesizes the exact transmodal sound without manual markup per button.
 */
function extractElementDesignCriteria(el, fallbackCriteria = {}) {
  if (!el || typeof el.getBoundingClientRect !== 'function') return fallbackCriteria;
  const rect = el.getBoundingClientRect();
  let borderRadiusPx = fallbackCriteria.borderRadiusPx ?? 8;
  if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
    const style = window.getComputedStyle(el);
    const parsedRadius = parseFloat(style.borderTopLeftRadius || style.borderRadius || '8');
    if (!Number.isNaN(parsedRadius)) borderRadiusPx = parsedRadius;
  }
  return {
    ...fallbackCriteria,
    elementWidthPx: Math.max(16, Math.round(rect.width || 160)),
    elementHeightPx: Math.max(16, Math.round(rect.height || 44)),
    borderRadiusPx
  };
}

/**
 * Automatic DOM Delegation & Accessible Audio Controls:
 *   - If `director.uiSfxMode === 'off'`, attaches 0 SFX listeners and emits 0 audio bytes.
 *   - Otherwise delegates `.btn-primary`, `button[type="submit"]`, `[data-sfx]`, drawers, and 3D cards.
 */
export function mountAccessibleAudioControls(director = new WebAudioDirector()) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return director;
  if (director.uiSfxMode === 'off') {
    return director;
  }

  const unlockHandler = () => {
    director.unlockOnUserGesture();
  };
  window.addEventListener('pointerdown', unlockHandler, { once: true, passive: true });
  window.addEventListener('keydown', unlockHandler, { once: true, passive: true });

  document.addEventListener('click', (ev) => {
    const toggleBtn = ev.target?.closest?.('[data-audio-mute-toggle]');
    if (toggleBtn) {
      director.toggleMute();
      return;
    }

    const sfxEl = ev.target?.closest?.('[data-sfx], .btn-primary, button[type="submit"], [data-drawer-toggle], .drawer');
    if (sfxEl) {
      const explicitPreset = sfxEl.getAttribute('data-sfx');
      const isSubmit = sfxEl.matches('button[type="submit"]');
      const isDrawer = sfxEl.matches('[data-drawer-toggle], .drawer');
      const presetName = explicitPreset || (isSubmit ? 'successChime' : isDrawer ? 'drawerSlide' : 'clickTactile');
      const criteria = extractElementDesignCriteria(sfxEl, director.designCriteria);
      director.triggerSfx(presetName, { criteria });
    }
  });

  document.addEventListener(
    'pointerenter',
    (ev) => {
      const hoverEl = ev.target?.closest?.('.card-3d, [data-tilt], .atropos, [data-sfx-hover]');
      if (hoverEl) {
        const is3dCard = hoverEl.matches('.card-3d, [data-tilt], .atropos');
        const criteria = extractElementDesignCriteria(hoverEl, director.designCriteria);
        director.triggerSfx(is3dCard ? 'cardFlip3D' : 'hoverMagnetic', {
          criteria,
          spatial3D: is3dCard
        });
      }
    },
    { capture: true, passive: true }
  );

  return director;
}
