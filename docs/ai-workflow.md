# AI Workflow

Use this workflow when turning source material into a strategic or research report.

---

## Processing Checklist

1. Read `AGENTS.md`, `overview.md`, `GUIDE.md`, `docs/formatting.md`, `docs/secrets-and-privacy.md`, and `index.md`.
2. Inventory `records/` and list each source with date, type, author, and reliability.
3. Extract atomic claims into `reference/evidence-matrix.md`.
4. Group related findings in `reference/research-notes.md`.
5. Identify contradictions, missing context, weak evidence, and open questions.
6. Rewrite `index.md` as a reader-facing report.
7. Update `overview.md` and `CHANGELOG.md`.
8. Run `npm run check`.
9. Ask for approval before publishing private or sensitive material.

---

## Reusable Prompt

```text
Read AGENTS.md first, then overview.md, GUIDE.md, docs/formatting.md, docs/secrets-and-privacy.md, index.md, and all relevant files in records/ and reference/.

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
9. If the report contains private or sensitive material, recommend the right privacy mode before deploy.

Style:
- Lead with the practical implication.
- Use tables for comparisons and evidence.
- Label uncertainty.
- Avoid filler and generic business prose.
- Do not invent facts not supported by source material.
```

---

## Report Recipes

| Report Type | Good Inputs | Default Output |
|---|---|---|
| Strategic report | Interviews, operating metrics, market notes, internal docs | Executive summary, decision snapshot, options, recommendation, risks |
| Competitive research | Competitor pages, pricing screenshots, sales notes, win/loss data | Comparison table, positioning map, evidence matrix, gaps |
| Client research portal | Calls, proposals, project docs, deliverables | Living client-facing report with source trail and update log |
| Medical or personal research | Records, labs, visit notes, transcripts, questions | Timeline, source summary, question list for professionals |
| Due diligence | PDFs, calls, exports, web research | Risk/opportunity matrix, verification checklist, open issues |

For medical, legal, financial, or similar high-stakes topics, organize evidence and questions. Do not present the report as professional advice.

---

## Publishing Gate

Before deploy, classify the report:

| Mode | Criteria | Required Action |
|---|---|---|
| Public | Only public or synthetic material | Deploy without `REPORT_PASSWORD` |
| Private | Client/internal material with shared-password access acceptable | Use `npm run setup:cloudflare -- --project <handle> --private` |
| Sensitive | Medical, legal, financial, HR, regulated, or high-trust client material | Use private repo, custom domain, and Cloudflare Access |

If the mode is unclear, stop and ask.

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
