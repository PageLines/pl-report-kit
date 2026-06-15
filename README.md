# PL Report Kit

AI-ready framework for building, reviewing, and deploying strategic reports, research dossiers, client briefs, and document-backed analysis sites.

The kit is intentionally simple: Markdown content, VitePress publishing, source documents in `records/`, synthesized analysis in `reference/`, and agent instructions in `AGENTS.md`.

## Use It For

- Strategic plans and market research reports
- Competitive or technical due diligence
- Meeting transcript synthesis
- Client-facing research portals
- Internal decision memos with source evidence

## Quick Start

```bash
npm install
npm run dev
```

Then edit:

- `index.md` for the main report
- `overview.md` for the file map
- `records/` for source documents
- `reference/` for synthesized notes and evidence
- `AGENTS.md` for AI agent instructions

## AI Workflow

1. Add source material to `records/`.
2. Ask an AI coding agent to read `AGENTS.md` first.
3. Have it extract facts into `reference/evidence-matrix.md`.
4. Have it synthesize the reader-facing report in `index.md`.
5. Review claims against sources.
6. Run `npm run check`.
7. Deploy.

See [docs/ai-workflow.md](docs/ai-workflow.md) for a reusable prompt and processing checklist.

## Cloudflare Pages

Recommended settings:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `.vitepress/dist` |

Direct deploy:

```bash
npm run deploy
```

By default, the report deploys publicly but includes `noindex` headers and robots rules. To add Basic Auth, set `REPORT_PASSWORD` in Cloudflare Pages environment variables. The middleware turns protection on only when that variable is present.

## Repository Name Ideas

The current name is `pl-report-kit`. Other reasonable names:

- `pl-report-framework`
- `ai-report-kit`
- `strategic-report-kit`
- `research-report-kit`
- `evidence-report-kit`

## Agent Instructions

This repo follows the `AGENTS.md` convention for agent-readable project instructions: https://agents.md/
