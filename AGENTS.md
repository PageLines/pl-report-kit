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
- Create and deploy Cloudflare Pages project: `npm run setup:cloudflare -- --project <handle>`
- Create private Cloudflare Pages project: `npm run setup:cloudflare -- --project <handle> --private`
- Deploy existing Cloudflare Pages project: `npm run deploy -- --project <handle>`
- Test Cloudflare middleware helpers: `npm test`
- Run full check: `npm run check`

## Required Reading Order

1. `README.md` - project purpose and user-facing setup.
2. `report-kit-overview.md` - strategy, principles, PageLines fit, and report-kit operating model.
3. `overview.md` - file map and current report structure.
4. `index.md` - main report.
5. `GUIDE.md` - writing and source standards.
6. `docs/formatting.md` - visual formatting rules for tables, charts, diagrams, code, math, tabs, and callouts.
7. `docs/secrets-and-privacy.md` - environment variables, secrets, privacy modes, and publishing rules.
8. `docs/ai-workflow.md` - processing workflow for new documents.
9. Relevant source files under `records/` and synthesized files under `reference/`.

## Source Boundaries

- Put raw source material in `records/`.
- Put synthesized notes, evidence tables, and working analysis in `reference/`.
- Put the polished reader-facing report in `index.md`.
- Keep `overview.md` current when files are added, renamed, removed, or repurposed.
- Record meaningful report changes in `CHANGELOG.md`.

## Writing Standards

- Lead with the conclusion, then show evidence.
- Prefer tables for comparisons, timelines, evidence mapping, risks, and recommendations.
- Use `docs/formatting.md` before adding charts, diagrams, code samples, math, tabs, or media.
- Tie every major claim to a source, date, or explicitly labeled inference.
- Separate facts, interpretation, recommendations, and open questions.
- Use exact dates for time-sensitive claims.
- Mark certainty: confirmed, likely, emerging, speculative, or unknown.
- Cut filler. The report should read like a serious analyst wrote it.

## Visual And Technical Formatting

- Use Markdown tables for exact values, evidence trails, risks, decisions, and comparisons.
- Use Mermaid for workflows, timelines, system maps, and relationship diagrams.
- Use `ReportChart` for small, source-backed business charts where visual shape matters.
- Use syntax-highlighted fenced code blocks for code, config, CLI commands, and data samples.
- Use code groups for command/config alternatives.
- Use MathJax only when an equation is clearer than prose.
- Use tabs for variants such as public/private publishing; never hide the main recommendation behind a tab.

## Research Standards

- Prefer primary sources and original documents over summaries.
- For web research, record publication dates and source URLs.
- Do not overstate source quality. Label weak evidence clearly.
- If sources disagree, state the disagreement and explain which source should carry more weight.

## Secrets And Privacy

- Never commit real `.env`, `.env.*`, `.dev.vars`, `.dev.vars.*`, API tokens, passwords, cookies, private keys, or service credentials.
- Use `.env.example` and `.dev.vars.example` only for placeholders.
- Public reports deploy without `REPORT_PASSWORD`.
- Private reports use `REPORT_PASSWORD` as a Cloudflare Pages secret. Prefer `npm run setup:cloudflare -- --project <handle> --private`.
- Sensitive reports should use a private GitHub repo, a custom domain, and Cloudflare Access.
- Stop and ask before publishing medical, legal, financial, HR, regulated, or client-confidential material.
- Do not print secret values in summaries, logs, docs, or changelog entries.
- Read `docs/secrets-and-privacy.md` before changing deployment or auth behavior.

## Deployment

- Static build: `npm run build`
- Cloudflare Pages output directory: `.vitepress/dist`
- First deploy: `npm run setup:cloudflare -- --project <handle>`
- First private deploy: `npm run setup:cloudflare -- --project <handle> --private`
- Later deploys: `npm run deploy -- --project <handle>`
- Optional Basic Auth: set `REPORT_PASSWORD` as a Cloudflare Pages secret.
- Optional login prompt label: set `REPORT_REALM`.

The report is public by default so it can deploy with no manual environment setup. Add `REPORT_PASSWORD` for private reports.
