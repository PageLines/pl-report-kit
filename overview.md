# File Map

**Purpose:** Map the report, source records, and AI workflow so humans and agents can quickly find the right material.

---

## Project Structure

```text
pl-report-kit/
├── README.md              # Human quick start
├── report-kit-overview.md # Strategy, principles, PageLines fit
├── AGENTS.md              # AI operating instructions; read first
├── CLAUDE.md              # Claude compatibility pointer
├── GUIDE.md               # Writing and source standards
├── index.md               # Main report
├── overview.md            # This file
├── news.md                # Running update log
├── CHANGELOG.md           # Change history
├── docs/
│   └── ai-workflow.md     # Prompt and processing checklist
├── reference/
│   ├── evidence-matrix.md # Extracted claims and source links
│   ├── research-notes.md  # Synthesized notes
│   └── questions.md       # Open questions and next research tasks
└── records/
    └── README.md          # Source document instructions
```

---

## Core Files

| File | Purpose | Audience |
|---|---|---|
| [index.md](index.md) | Main report and example format | Readers |
| [report-kit-overview.md](report-kit-overview.md) | Strategy, PageLines fit, AI workflow, charting/media guidance, gotchas | Product owners, editors, AI tools |
| [AGENTS.md](AGENTS.md) | Agent instructions and workflow | AI tools |
| [GUIDE.md](GUIDE.md) | Writing and source standards | Editors |
| [docs/ai-workflow.md](docs/ai-workflow.md) | Processing checklist and reusable prompt | AI tools and editors |
| [reference/evidence-matrix.md](reference/evidence-matrix.md) | Claim-to-source table | Reviewers |
| [records/](records/) | Source document workspace | Editors and agents |

---

## AI Session Startup

1. Read `AGENTS.md`.
2. Read `report-kit-overview.md`.
3. Read this file.
4. Read `index.md`.
5. Check `CHANGELOG.md`.
6. Inspect `records/` and `reference/` for the task.
7. Update `overview.md` and `CHANGELOG.md` after substantive changes.
