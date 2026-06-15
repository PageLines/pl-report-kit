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

## 6. Deployment

Cloudflare Pages settings:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `.vitepress/dist` |

Fast deploy:

```bash
npm run setup:cloudflare -- --project your-report-handle
```

Optional environment variables:

| Variable | Purpose |
|---|---|
| `REPORT_PASSWORD` | Enables Basic Auth |
| `REPORT_REALM` | Browser login prompt label |

No password is required for public reports. If `REPORT_PASSWORD` is set, the whole site is protected at the Cloudflare edge.

---

## 7. Quality Checklist

- [ ] Main claim appears in the first section.
- [ ] Every major claim maps to a source or labeled inference.
- [ ] Open questions are explicit.
- [ ] Dates are exact where timing matters.
- [ ] `overview.md` reflects current files.
- [ ] `CHANGELOG.md` records substantive changes.
- [ ] `npm run check` passes.
