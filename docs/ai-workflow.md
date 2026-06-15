# AI Workflow

Use this workflow when turning source material into a strategic or research report.

---

## Processing Checklist

1. Read `AGENTS.md`, `overview.md`, `GUIDE.md`, `docs/formatting.md`, and `index.md`.
2. Inventory `records/` and list each source with date, type, author, and reliability.
3. Extract atomic claims into `reference/evidence-matrix.md`.
4. Group related findings in `reference/research-notes.md`.
5. Identify contradictions, missing context, weak evidence, and open questions.
6. Rewrite `index.md` as a reader-facing report.
7. Update `overview.md` and `CHANGELOG.md`.
8. Run `npm run check`.

---

## Reusable Prompt

```text
Read AGENTS.md first, then overview.md, GUIDE.md, docs/formatting.md, index.md, and all relevant files in records/ and reference/.

Goal: turn the source material into a sharp, evidence-backed report for [AUDIENCE].

Process:
1. Inventory the source files.
2. Extract claims into reference/evidence-matrix.md with source, date, certainty, and implication.
3. Summarize patterns in reference/research-notes.md.
4. Draft or update index.md with executive summary, key findings, evidence, recommendations, risks, and open questions.
5. Use docs/formatting.md to choose tables, charts, diagrams, code blocks, math, tabs, callouts, and media.
6. Keep facts, interpretation, and recommendations separate.
7. Update overview.md and CHANGELOG.md.
8. Run npm run check and report the result.

Style:
- Lead with the practical implication.
- Use tables for comparisons and evidence.
- Label uncertainty.
- Avoid filler and generic business prose.
- Do not invent facts not supported by source material.
```

---

## Evidence Matrix Fields

| Field | Meaning |
|---|---|
| Claim | Atomic factual statement or inference |
| Source | File, URL, transcript, dataset, or interview |
| Date | Source date or retrieval date |
| Certainty | Confirmed, likely, emerging, speculative, unknown |
| Implication | Why the claim matters |
| Report Location | Where the claim appears in the report |
