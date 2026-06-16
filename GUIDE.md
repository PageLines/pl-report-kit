# Report Writing Guide

Use this guide to create reports that are concise, sourced, and easy for AI agents to update.

---

## 1. Document Model

| File Or Folder | Purpose |
|---|---|
| `index.md` | Main reader-facing report |
| `overview.md` | AI and human file map |
| `records/` | Raw source material |
| `reference/` | Synthesized analysis and evidence tables |
| `news.md` | Running update log |
| `CHANGELOG.md` | Change history |
| `AGENTS.md` | Agent operating instructions |
| `docs/ai-workflow.md` | Processing workflow and reusable prompt |
| `docs/formatting.md` | Visual formatting rules and examples |
| `docs/secrets-and-privacy.md` | Environment variables, secrets, and publishing privacy modes |

---

## 2. Report Shape

Strong reports usually follow this structure:

1. Executive summary
2. Current status
3. Key findings
4. Evidence table
5. Options or recommendations
6. Risks and uncertainties
7. Open questions
8. Source map

Keep the first screen useful. A reader should understand the report's point before scrolling.

---

## 3. Writing Standards

Lead with the practical implication.

```markdown
Good: The strongest near-term opportunity is automating tier-1 support because it has high volume, low regulatory exposure, and clean transcript data.
Weak: There are many possible automation opportunities to consider.
```

Use numbers before interpretation.

```markdown
Good: Support tickets rose 38% quarter-over-quarter while headcount stayed flat.
Weak: Support demand is growing quickly.
```

Use tables for comparisons.

```markdown
| Option | Upside | Risk | Evidence |
|---|---|---|---|
| Automate tier-1 support | High | Medium | 4,200 tickets/month |
```

Mark certainty.

- **Confirmed:** Directly supported by source material.
- **Likely:** Strong inference from multiple sources.
- **Emerging:** New or incomplete evidence.
- **Speculative:** Plausible but weakly supported.
- **Unknown:** Important question with insufficient evidence.

---

## 4. Source Standards

- Keep raw documents in `records/`.
- Do not rewrite raw source files for style.
- Pull extracted facts into `reference/evidence-matrix.md`.
- Attach source file names, dates, and URLs whenever available.
- If the source is a transcript, distinguish direct statements from inferred meaning.

---

## 5. AI Processing Workflow

When new source material is added:

1. Inventory files in `records/`.
2. Extract key facts into `reference/evidence-matrix.md`.
3. Identify contradictions, missing dates, weak claims, and open questions.
4. Update `reference/research-notes.md`.
5. Update the reader-facing `index.md`.
6. Update `overview.md`.
7. Add a dated `CHANGELOG.md` entry.
8. Run `npm run check`.

---

## 6. Visual Formatting

Use visuals to reduce reader effort, not to decorate the report.

| Need | Default Format |
|---|---|
| Exact values or evidence | Markdown table |
| Process or dependency | Mermaid |
| Trend or comparison | `ReportChart` |
| Formula or scoring logic | MathJax |
| Command or config | Fenced code block |
| Alternative commands/configs | Code group |
| Public/private variants | Tabs |
| Assumption or gotcha | Callout |

See [Visual Formatting Guide](docs/formatting.md) before adding charts, diagrams, code samples, math, tabs, or media.

---

## 7. Deployment

Cloudflare Pages settings:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `.vitepress/dist` |

Fast deploy:

```bash
npm run setup:cloudflare -- --project your-report-handle
```

Private deploy:

```bash
npm run setup:cloudflare -- --project your-report-handle --private
```

Optional environment variables:

| Variable | Purpose |
|---|---|
| `REPORT_PASSWORD` | Enables Basic Auth |
| `REPORT_REALM` | Browser login prompt label |
| `CLOUDFLARE_API_TOKEN` | Lets an agent or CI deploy with Wrangler |
| `CLOUDFLARE_ACCOUNT_ID` | Selects the right Cloudflare account |

No password is required for public reports. If `REPORT_PASSWORD` is set as a Cloudflare Pages secret, the whole site is protected at the Cloudflare edge.

For sensitive reports, use a private repo and Cloudflare Access. See [Secrets And Privacy](docs/secrets-and-privacy.md).

---

## 8. Quality Checklist

- [ ] Main claim appears in the first section.
- [ ] Every major claim maps to a source or labeled inference.
- [ ] Visuals follow `docs/formatting.md`.
- [ ] Open questions are explicit.
- [ ] Dates are exact where timing matters.
- [ ] `overview.md` reflects current files.
- [ ] `CHANGELOG.md` records substantive changes.
- [ ] Private or sensitive material uses the right privacy mode.
- [ ] `npm run check` passes.
