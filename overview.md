# File Map

**Purpose:** Map the report, source records, and AI workflow so humans and agents can quickly find the right material.

---

## Project Structure

```text
pl-report-kit/
├── README.md              # Human quick start
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
| [AGENTS.md](AGENTS.md) | Agent instructions and workflow | AI tools |
| [GUIDE.md](GUIDE.md) | Writing and source standards | Editors |
| [docs/ai-workflow.md](docs/ai-workflow.md) | Processing checklist and reusable prompt | AI tools and editors |
| [reference/evidence-matrix.md](reference/evidence-matrix.md) | Claim-to-source table | Reviewers |
| [records/](records/) | Source document workspace | Editors and agents |

---

## AI Session Startup

1. Read `AGENTS.md`.
2. Read this file.
3. Read `index.md`.
4. Check `CHANGELOG.md`.
5. Inspect `records/` and `reference/` for the task.
6. Update `overview.md` and `CHANGELOG.md` after substantive changes.
