# Start the portfolio in a cloud task

Use the existing `/workspace/Portfolio` checkout. Cloud tasks are already isolated; do not create a Git worktree unless explicitly requested. Preserve existing work.

Node.js 22.12+ and npm are required. No credentials, database, or external service is needed. Dependencies, fonts, images, and the French CV are retained files; live processes must restart after restoring a snapshot.

From `/workspace/Portfolio`, start a long-lived process:

```sh
npm run dev -- --host 0.0.0.0 --port 4173 --strictPort
```

Retain its process/session handle. If the port is occupied, inspect the service and reuse it only if it is this portfolio. Never kill unrelated processes. Use the platform's supported execution permission flow when a command sandbox blocks socket binding or Chromium.

Readiness requires a rendered browser check, not just a PID. Use available Chromium/Playwright to confirm the Zakaria Toura heading, EN/FR switch, work anchors, three intentional project placeholders, real CV PDF, and lack of browser errors. Make internal local requests for smoke checks.

```sh
npm run build
npm run test:e2e
```

The browser suite starts/reuses port 4173 and uses `/usr/bin/chromium` if available. Otherwise set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` or install the browser with `npx playwright install chromium`. If dependencies are absent or the lockfile changes, run `npm ci --no-audit --no-fund` first.

`README.md` covers setup and content editing. `src/content.ts` holds translations, projects, background, and private editorial notes. `public/cv/Zakaria-Toura-CV-FR.pdf` is the supplied French CV. Education status and the exact LinkedIn URL remain unconfirmed; do not invent them. Keep project placeholders until actual material is provided.

Keep the app running during development. Do not deploy or publish unless explicitly requested.

These instructions were preserved locally because the environment configuration draft rejected edits with `draft_not_editable`; saving its install/start fields was not confirmed. A fresh setup chat from environment settings is needed if those fields must be applied to a new draft. The working app and source archive do not depend on that configuration change.
