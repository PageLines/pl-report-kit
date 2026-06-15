# Report Kit Overview

PL Report Kit is a lightweight system for turning source material into clear, evidence-backed reports that humans can read and AI agents can maintain.

The key idea is simple: PageLines gives adaptive agents access to a structured report repo, so non-technical users can update serious reports through natural language without learning Git, Markdown, VitePress, or deployment.

The docs are part of the product. They are not side notes. They tell agents what matters, where evidence lives, how to write, how to verify changes, and when to ask for approval.

---

## Quick Reference

| Aspect | Principle |
|---|---|
| Job to be done | Turn messy source material into a decision-ready report. |
| Primary user | Non-technical operator, consultant, analyst, client-service team, or founder. |
| Main promise | Add sources, ask naturally, review a sourced report update. |
| Report shape | Summary, findings, evidence, recommendation, risks, open questions. |
| Source model | Raw material in `records/`; synthesis in `reference/`; polished report in `index.md`. |
| AI entrypoint | `AGENTS.md` tells agents how to work safely and consistently. |
| Trust model | Every major claim maps to a source or labeled inference. |
| Deployment model | Static report site, Cloudflare Pages, optional Basic Auth. |

---

## Strategy

Most useful reports start as a pile of material: transcripts, PDFs, data exports, interview notes, links, screenshots, and old summaries. A normal document editor helps write the final prose, but it does not preserve the work system around the report.

PL Report Kit gives the report a durable structure:

- `records/` stores source material.
- `reference/` stores extracted facts, evidence tables, and working synthesis.
- `index.md` stores the reader-facing report.
- `overview.md` maps the workspace.
- `AGENTS.md` gives AI agents their operating instructions.
- `CHANGELOG.md` records what changed.

This makes the report updateable. A user can add new material next month and the agent can find the old evidence trail, update the right sections, preserve conventions, run checks, and explain the diff.

---

## PageLines Fit

PageLines is an adaptive-agent platform for owner-operated service teams. The first customers are small teams where communication, scheduling, client work, and follow-through are revenue-critical: agencies, consultancies, fractional operators, boutique GTM teams, and high-touch service shops.

PageLines gives each teammate an adaptive AI agent with durable context, files, tools, memory, standing orders, approvals, and supported work channels. The product posture is "adaptive teammate," not generic chatbot.

That makes report editing a natural PageLines use case.

| Generic chatbot | PageLines adaptive agent |
|---|---|
| Answers one prompt at a time | Learns the report's structure and conventions |
| Needs context pasted repeatedly | Reads `AGENTS.md`, `overview.md`, and source files |
| Produces prose outside the project | Edits the actual report files |
| Cannot verify deployment | Runs tests and builds before publishing |
| Makes changes hard to audit | Shows diffs, sources, and changelog entries |
| Leaves publishing to the user | Can prepare deployment after approval |

The user experience should feel like this:

> Add this client interview, update the risks section, make the recommendation sharper, show me what changed, and deploy it after I approve.

The user speaks naturally. The agent handles the repo.

---

## Job To Be Done

When a user has scattered source material and needs a credible report, they want to turn it into a clear answer with evidence so they can make a decision, brief a client, align a team, or publish a useful resource.

The kit serves three jobs:

| Job | User Outcome |
|---|---|
| Create | Turn source material into a first report. |
| Update | Add new material without losing the evidence trail. |
| Explain | Let readers inspect why the report says what it says. |

The red route:

1. Add source files to `records/`.
2. Tell the PageLines agent what the report should answer.
3. Agent extracts claims into `reference/evidence-matrix.md`.
4. Agent updates synthesis in `reference/research-notes.md`.
5. Agent revises `index.md`.
6. User reviews the diff.
7. Agent runs `npm run check`.
8. User approves deploy.

---

## Use Cases

PL Report Kit works best when the report needs both narrative and source discipline.

| Use Case | Inputs | Output |
|---|---|---|
| Strategic planning | Interviews, notes, metrics, internal docs | Operating plan or decision memo |
| Competitive research | Websites, pricing pages, sales notes | Competitor dossier |
| Due diligence | PDFs, calls, financial exports | Risk and opportunity report |
| Client research portal | Transcripts, proposals, links | Living client-facing report |
| Product discovery | Interviews, tickets, analytics | JTBD and roadmap report |
| Technical research | Specs, docs, papers, experiment logs | Evidence-backed explainer |
| Board or investor prep | Metrics, forecasts, narrative notes | Executive briefing |

The kit is not a CRM, BI warehouse, or full CMS. It is a small, legible workspace for reports that benefit from AI-assisted synthesis.

---

## Why Docs Matter

The docs are the control plane for the report. Humans skim them. Agents execute them.

That means vague docs create vague edits. Stale docs create stale behavior. Missing docs force the agent to improvise.

Good docs do four jobs:

| Job | Why It Matters |
|---|---|
| Orient | New humans and agents know where to start. |
| Constrain | Agents know what not to change and where claims belong. |
| Preserve decisions | Future updates keep the same standard. |
| Create trust | Readers can trace conclusions back to evidence. |

Write docs as evergreen operating rules:

```markdown
Put raw transcripts in `records/` and summarize them in `reference/`.
Why: source files need to remain auditable.
Anti-pattern: editing transcript wording directly so it reads better.
```

---

## Organization Principles

Keep the workspace boring and predictable.

| Place | Belongs Here | Does Not Belong Here |
|---|---|---|
| `records/` | Raw source docs, transcripts, PDFs, exports, media metadata | Polished conclusions |
| `reference/` | Evidence tables, research notes, extracted facts, open questions | Raw unprocessed dumps |
| `index.md` | Final reader-facing report | Long scratch work |
| `overview.md` | File map and reading order | Detailed analysis |
| `news.md` | Dated research or update feed | Final conclusions without context |
| `CHANGELOG.md` | What changed and why | Full source summaries |
| `docs/` | Workflows and meta guidance | Report-specific evidence |

Rules:

- Use lowercase kebab-case filenames.
- Use exact dates in source filenames when available.
- Add a README to folders whose purpose is not obvious.
- Update `overview.md` when the file map changes.
- Update `CHANGELOG.md` when report meaning changes.
- Keep raw source and polished interpretation separate.

---

## Writing Principles

Reports should read like serious analysis, not content marketing.

### Lead With The Point

Good:

```markdown
The strongest first automation opportunity is support triage because ticket volume is high, categories repeat, and downside is manageable with human review.
```

Weak:

```markdown
This report explores several possible automation opportunities across the company.
```

### Show Evidence Before Confidence

Good:

```markdown
Support tickets rose 38% quarter-over-quarter while support headcount stayed flat.
```

Weak:

```markdown
Support demand is growing quickly.
```

### Separate Facts From Judgment

Use explicit labels:

- **Fact:** directly supported by source material.
- **Inference:** reasonable conclusion from facts.
- **Recommendation:** what to do.
- **Open question:** what is not known yet.

### Prefer Tables For Thinking

Use tables for options, timelines, risks, source comparisons, claims, and metrics. Tables force sharper distinctions than paragraphs.

### Cut Filler

Avoid vague setup phrases:

- "It is important to note"
- "There are many factors"
- "In today's fast-paced landscape"
- "This report aims to explore"

Say the thing.

---

## AI Pipeline

The pipeline is simple enough for non-technical users and structured enough for agents.

```mermaid
flowchart LR
  A[Source material] --> B[records]
  B --> C[Evidence extraction]
  C --> D[Evidence matrix]
  D --> E[Research notes]
  E --> F[Main report]
  F --> G[Review diff]
  G --> H[Check]
  H --> I[Deploy]
```

Agent workflow:

1. Read `AGENTS.md`.
2. Read `report-kit-overview.md`, `overview.md`, `GUIDE.md`, and `index.md`.
3. Inventory `records/`.
4. Extract atomic claims into `reference/evidence-matrix.md`.
5. Write synthesis in `reference/research-notes.md`.
6. Update the polished report in `index.md`.
7. Update navigation docs.
8. Run checks.
9. Summarize changes for approval.

The agent should not skip the evidence matrix. It is the bridge between raw material and confident prose.

---

## Natural-Language Editing

The ideal PageLines interaction is conversational.

The user should not need to know the file structure. They can say:

> Add the new customer interview, update the adoption risks section, and make the recommendation more direct.

The agent turns that into a controlled editing loop:

| Step | Agent Behavior |
|---|---|
| Understand | Reads the report docs and asks only if the request is ambiguous. |
| Locate | Finds the right files from `AGENTS.md` and `overview.md`. |
| Edit | Updates source, evidence, synthesis, and report files in the right places. |
| Verify | Runs checks and catches broken links or build failures. |
| Explain | Summarizes what changed in plain language. |
| Approve | Asks before deploys, destructive edits, or publishing private material. |
| Learn | Saves user preferences and report conventions for next time. |

This is where PageLines matters. The agent is not just editing prose. It is maintaining the report system.

---

## Story Mapping For Reports

Use story mapping before expanding a report.

| Backbone Step | Report Equivalent |
|---|---|
| Understand audience | Who will read this and what decision do they need to make? |
| Add sources | What raw material is available? |
| Extract facts | What claims are directly supported? |
| Find pattern | What story does the evidence tell? |
| Decide recommendation | What should the reader do next? |
| Review trust | Can each important claim be traced? |
| Publish update | Can the report deploy without manual cleanup? |

Walking skeleton:

1. One clear question.
2. Five to ten source-backed claims.
3. One evidence table.
4. One recommendation.
5. One open-question list.
6. A passing build.

Cut everything else until that works.

---

## UX Principles For Reports

A report has a user experience. The reader has a job, a path, and a limited attention budget.

| UX Rule | Report Practice |
|---|---|
| First 30 seconds is the product | Put the answer and status above the fold. |
| Law of one | One main point per section. |
| Red route first | Make the main decision path obvious before appendices. |
| Sequencing beats completeness | Put conclusions before background. |
| Reduce, do not hide ownership | Let agents draft; keep human approval for publishing. |
| No magic | Show what changed, why, and what source supports it. |
| Cold-start friendly | A returning reader should know what changed since last time. |

The report should never make a reader hunt for the point.

---

## Charting And Data Principles

Use charts only when they make a comparison faster than prose or a table.

| Tool | Use For | Avoid |
|---|---|---|
| Markdown tables | Comparisons, evidence matrices, risks, timelines | Huge datasets |
| Mermaid | Flows, timelines, system maps, simple journeys | Precise quantitative charts |
| Chart.js | Trends, bars, lines, distributions | Decorative dashboards |
| CSV or JSON files | Reusable structured data | One-off numbers better shown in a table |
| D3 or custom embeds | Custom analysis views | Static reports that do not need interaction |

Chart rules:

- Title the takeaway, not the chart type.
- Label axes and units.
- Keep colors semantic and sparse.
- Show source and date near the chart.
- Prefer a table when exact values matter.
- Prefer a chart when shape, trend, or comparison matters.
- Never use chart decoration as proof of rigor.

---

## Media, Audio, Video, And Transcripts

Reports often start from spoken work: calls, interviews, demos, sales meetings, research conversations.

| Material | Location | Notes |
|---|---|---|
| Raw audio or video | External storage or `public/media/` if small and safe to publish | Avoid committing large private media by default. |
| Transcript | `records/transcript-YYYY-MM-DD-topic.md` | Keep close to raw wording. |
| Transcript summary | `reference/research-notes.md` or a topic file | Separate facts from interpretation. |
| Clips or embeds | `index.md` or supporting pages | Use only when readers need the original moment. |
| Source metadata | Evidence matrix | Include speaker, date, and reliability. |

Embedding rules:

- Embed video only when seeing the source changes understanding.
- Use transcripts for searchability and AI processing.
- Mark unclear transcript sections instead of guessing.
- Quote sparingly.
- Do not publish private recordings in a public report without explicit approval.

---

## Technical Principles

The kit stays small on purpose.

| Principle | Reason |
|---|---|
| Markdown first | Easy for humans, Git, and AI agents. |
| Static site output | Cheap, fast, portable, easy to deploy. |
| Docs engine | Strong Markdown docs, local search, Mermaid support, simple build. |
| Cloudflare Pages | Low-friction hosting and optional edge auth. |
| Optional auth | Public reports work with no setup; private reports set `REPORT_PASSWORD`. |
| No database by default | Source control is enough for most reports. |
| Checks before publish | Build and tests catch common mistakes. |

Do not add infrastructure until the report needs it. A report kit should feel lighter than the material it organizes.

---

## Gotchas

| Gotcha | Fix |
|---|---|
| AI writes confident prose without evidence | Require `reference/evidence-matrix.md` before `index.md`. |
| Raw records get rewritten | Keep `records/` source-only and summarize elsewhere. |
| Report becomes a junk drawer | Update `overview.md` and split long synthesis into `reference/`. |
| Charts become decoration | Use charts only for comparisons that benefit from visual shape. |
| Private material gets deployed | Use `REPORT_PASSWORD`, `noindex`, and explicit approval. |
| Readers miss what changed | Keep `CHANGELOG.md` and a dated status line in `index.md`. |
| Agent edits the wrong file | Strengthen `AGENTS.md` and `overview.md`. |
| The report tries to answer everything | Define the decision, audience, and walking skeleton first. |

---

## Definition Of Done

A report update is done when:

- The main conclusion is visible in the first section.
- Every major claim has a source or labeled inference.
- Raw material remains in `records/`.
- Synthesis lives in `reference/`.
- `overview.md` reflects the file map.
- `CHANGELOG.md` says what changed.
- Charts and tables have labels, units, and source context.
- `npm run check` passes.
- The user has approved publishing if the report contains private or sensitive material.

---

## Product Principle

PL Report Kit should make a non-technical user feel like they have a careful analyst maintaining their report.

The user speaks naturally. The PageLines agent handles structure. The docs preserve the standard. The evidence keeps everyone honest.
