# Secrets And Privacy

Use this guide before deploying private or sensitive reports.

The short rule: **examples live in the repo; secrets never do.**

---

## Quick Answer

| Need | Put It Here | Commit It? | Why |
|---|---|---:|---|
| Example variable names | `.env.example`, `.dev.vars.example` | Yes | Shows humans and agents what can be configured |
| Local report password | `.dev.vars` or `.env` | No | Used only by local Cloudflare Pages Functions testing |
| Deployed report password | Cloudflare Pages secret `REPORT_PASSWORD` | No | Enforced by the edge middleware |
| Cloudflare API token | Shell env, PageLines secret store, or GitHub Actions secret | No | Lets an agent create/deploy Pages projects |
| GitHub token | PageLines/GitHub app or GitHub Actions secret | No | Lets an agent push repo changes or trigger CI |

Do not paste secrets into Markdown files, report pages, source records, changelog entries, issues, screenshots, or terminal output.

---

## Variables

| Name | Purpose | Sensitive? | Where It Belongs |
|---|---|---:|---|
| `REPORT_PASSWORD` | Enables Basic Auth for the whole deployed report | Yes | Cloudflare Pages secret; local `.dev.vars` for testing |
| `REPORT_REALM` | Browser login prompt label | Low | Cloudflare Pages variable or secret; local `.dev.vars` |
| `CLOUDFLARE_API_TOKEN` | Lets the agent call Cloudflare APIs/Wrangler | Yes | Local shell, PageLines secret store, or GitHub Actions secret |
| `CLOUDFLARE_ACCOUNT_ID` | Selects the Cloudflare account | Low | Local shell, PageLines secret store, or GitHub Actions secret |
| `CLOUDFLARE_PROJECT_NAME` | Default Pages project handle | No | Local shell or CI variable |

Cloudflare Pages Functions read `REPORT_PASSWORD` and `REPORT_REALM` from `context.env`.

---

## Public Reports

Use public mode for demos, public research, and reports with no private source material.

```bash
npm run setup:cloudflare -- --project acme-report
```

Public mode does not set `REPORT_PASSWORD`. Anyone with the URL can read the deployed report.

---

## Private Reports

Use private mode for client portals, internal reports, diligence, or work that should not be open on the internet.

```bash
npm run setup:cloudflare -- --project acme-report --private
```

The helper creates or reuses the Cloudflare Pages project, then Wrangler prompts for `REPORT_PASSWORD` and stores it as a Cloudflare Pages secret.

For agent-run automation where an interactive prompt is not available, provide `REPORT_PASSWORD` through the agent's secret store or process environment. The command does not need to include the value:

```bash
npm run setup:cloudflare -- --project acme-report
```

Avoid this legacy shortcut unless you understand the risk:

```bash
npm run setup:cloudflare -- --project acme-report --password "not-recommended"
```

Command-line secrets can land in shell history or process listings. Prefer `--private` or an environment variable supplied by a secret manager.

---

## Sensitive Reports

Use sensitive mode for medical, legal, financial, HR, regulated, or high-trust client material.

Recommended setup:

| Control | Recommendation |
|---|---|
| Source repo | Private GitHub repository |
| Deployed site | Custom domain on Cloudflare Pages |
| Access control | Cloudflare Access self-hosted application |
| Users | Named emails or identity-provider groups |
| Auth strength | MFA or SSO where available |
| Publishing | Human approval before deploy |
| Source handling | Do not commit files that should not live in Git |

Shared Basic Auth is simple and useful, but Cloudflare Access is better for sensitive reports because it can use identity-aware policies, named users, session controls, MFA, and audit logs.

`noindex` and `robots.txt` are not security controls. They only ask search engines not to index the site.

---

## Local Testing

For local Cloudflare Pages Functions testing, use `.dev.vars` or `.env` in the same directory as `wrangler.jsonc`.

```txt
REPORT_PASSWORD="local-dev-password"
REPORT_REALM="Acme Report"
```

Choose one local secret file style. If `.dev.vars` exists, Wrangler will not load `.env` values into the local Pages Functions environment.

Run the Cloudflare local preview:

```bash
npm run dev:cloudflare
```

The normal VitePress dev server (`npm run dev`) is useful for writing, but it does not run Cloudflare Pages Functions middleware.

---

## What The Agent Can Do

With GitHub and Cloudflare access, a PageLines agent can usually handle:

- create or update the report repo;
- add source files the user provides;
- update the evidence matrix, report, and changelog;
- run tests and build checks;
- create a Cloudflare Pages project;
- set `REPORT_PASSWORD` as a Pages secret;
- deploy the report;
- add a custom domain when the zone is in the same Cloudflare account;
- prepare Cloudflare Access setup for sensitive reports.

The user still controls high-trust steps:

- authorizing GitHub and Cloudflare access;
- choosing who can see sensitive reports;
- providing source files;
- approving publication;
- deciding whether a report should use Basic Auth or Cloudflare Access.

---

## Agent Rules

Agents working in this repo must follow these rules:

1. Never commit `.env`, `.env.*`, `.dev.vars`, `.dev.vars.*`, API tokens, passwords, access tokens, cookies, or private keys.
2. Use `.env.example` and `.dev.vars.example` only for placeholders.
3. Prefer `npm run setup:cloudflare -- --project <handle> --private` for human-run private setup.
4. Prefer secret-manager environment variables for agent-run setup.
5. Do not print secret values in summaries, logs, diffs, or docs.
6. Stop and ask before publishing medical, legal, financial, HR, regulated, or client-confidential material.
7. Recommend Cloudflare Access for sensitive reports.
8. Keep source records private unless the user explicitly says they are safe to publish.

---

## References

- [Cloudflare Pages Functions bindings and secrets](https://developers.cloudflare.com/pages/functions/bindings/)
- [Cloudflare Wrangler Pages commands](https://developers.cloudflare.com/workers/wrangler/commands/#pages)
- [Cloudflare Access self-hosted applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/)
