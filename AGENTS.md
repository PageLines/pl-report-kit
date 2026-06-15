# AGENTS.md

Instructions for AI coding and writing agents working in this report kit.

## Project Purpose

Build sharp, evidence-backed reports from source material. The report should be easy for humans to read and easy for AI tools to maintain.

This is a generic framework. Do not assume a specific domain. Adapt the report to the documents in `records/` and the user's stated audience.

## Setup Commands

- Install dependencies: `npm install`
- Start local docs server: `npm run dev`
- Build static site: `npm run build`
- Preview built site: `npm run preview`
- Test Cloudflare middleware helpers: `npm test`
- Run full check: `npm run check`

## Required Reading Order

1. `README.md` - project purpose and user-facing setup.
2. `report-kit-overview.md` - strategy, principles, PageLines fit, and report-kit operating model.
3. `overview.md` - file map and current report structure.
4. `index.md` - main report.
5. `GUIDE.md` - writing and source standards.
6. `docs/ai-workflow.md` - processing workflow for new documents.
7. Relevant source files under `records/` and synthesized files under `reference/`.

## Source Boundaries

- Put raw source material in `records/`.
- Put synthesized notes, evidence tables, and working analysis in `reference/`.
- Put the polished reader-facing report in `index.md`.
- Keep `overview.md` current when files are added, renamed, removed, or repurposed.
- Record meaningful report changes in `CHANGELOG.md`.

## Writing Standards

- Lead with the conclusion, then show evidence.
- Prefer tables for comparisons, timelines, evidence mapping, risks, and recommendations.
- Tie every major claim to a source, date, or explicitly labeled inference.
- Separate facts, interpretation, recommendations, and open questions.
- Use exact dates for time-sensitive claims.
- Mark certainty: confirmed, likely, emerging, speculative, or unknown.
- Cut filler. The report should read like a serious analyst wrote it.

## Research Standards

- Prefer primary sources and original documents over summaries.
- For web research, record publication dates and source URLs.
- Do not overstate source quality. Label weak evidence clearly.
- If sources disagree, state the disagreement and explain which source should carry more weight.

## Deployment

- Static build: `npm run build`
- Cloudflare Pages output directory: `.vitepress/dist`
- Optional Basic Auth: set `REPORT_PASSWORD` in Cloudflare Pages.
- Optional login prompt label: set `REPORT_REALM`.

The report is public by default so it can deploy with no manual environment setup. Add `REPORT_PASSWORD` for private reports.
