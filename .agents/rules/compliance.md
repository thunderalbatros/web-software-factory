# Rule: Web Compliance, Licensing & Privacy

1. **100% Free Tier & Permissive Open-Source Licensing:** Every library, font, icon, and service must operate on a permanent free tier (`USD 0`) without credit card requirements and use commercially permissive licenses (`MIT`, `Apache-2.0`, `BSD`, `ISC`, `CC0`, `OFL`). Log all dependencies in `docs/COST_AUDIT.md`.
2. **Data Privacy & Minimal Retention (GDPR / LGPD / Ley 25.326):** Collect only the strictly necessary user fields per project specification, provide clear privacy notices, and support user data export/deletion.
3. **Accessibility Compliance:** Every user-facing page must meet `WCAG 2.2 AA` and `APCA` contrast floors (`Lc >= 75` for body text, `Lc >= 60` for UI controls), with full keyboard navigation (`:focus-visible`) and semantic landmarks.
4. **Ethical Sourcing:** Never scrape copyrighted brand assets or proprietary templates; generate clean semantic HTML/CSS, SVG primitives, and W3C DTCG design tokens.
