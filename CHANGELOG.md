# Changelog

All notable changes to this report should be documented here.

---

## June 15, 2026

### Added

- Added report visual tooling: `ReportChart`, Chart.js defaults, math, tabs, code-group icons, LLM-friendly output, and `docs/formatting.md` agent guidance.
- Replaced the default demo report with a concise client-ops automation brief that shows tables, Mermaid charts, a source trail, and PageLines-style human approval flow without bloating the sample.
- Added `scripts/cloudflare-pages.mjs` plus `npm run setup:cloudflare` and dynamic `npm run deploy -- --project <handle>` commands to make Cloudflare Pages setup agent-friendly.
- Reworked `README.md` around a mainstream 1-2-3 quickstart: make a report, tell PageLines what to change, put it live.
- Added the PageLines logo asset and refreshed `README.md` with clearer background, positioning, PageLines fit, natural-language editing examples, workflow, setup, and deployment guidance.
- Added `report-kit-overview.md` with report-kit strategy, PageLines platform fit, natural-language editing workflow, writing principles, organization rules, media guidance, charting principles, gotchas, and definition of done.
- Linked the overview from `README.md`, `AGENTS.md`, `CLAUDE.md`, `overview.md`, and site navigation.
- Initial PL Report Kit structure.
- Static site configuration.
- `AGENTS.md` instructions for AI tools.
- Source document workflow under `records/` and `reference/`.
- Optional Cloudflare Pages Basic Auth middleware.
