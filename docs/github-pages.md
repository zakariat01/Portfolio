# GitHub Pages preview

Repository: https://github.com/zakariat01/Portfolio

Expected project URL after GitHub Pages is enabled and its build completes: https://zakariat01.github.io/Portfolio/

## Publishing source

The application source lives on `main`. The verified static build is published to `gh-pages`, at the branch root. `.nojekyll` keeps GitHub from processing these generated files as a Jekyll site. Vite's relative base supports the `/Portfolio/` project path.

For future updates:

```sh
npm ci
npm run deploy
```

The deployment command builds the site and publishes `dist/` to `gh-pages`. Git authentication must permit writes to this repository. No force push to `main` is used.

## First-time Pages activation

Open https://github.com/zakariat01/Portfolio/settings/pages and set:

1. **Source:** Deploy from a branch.
2. **Branch:** `gh-pages`.
3. **Folder:** `/ (root)`.
4. Save, then wait for GitHub's Pages build to finish.

The managed environment currently blocks `api.github.com`, so the agent cannot enable or inspect Pages through the API. It also needs `zakariat01.github.io` allowed to verify the public URL. These are network requirements, not missing Git repository credentials. The environment configuration draft rejected edits with `draft_not_editable`, so those network additions were not saved or applied.

The static build and browser checks are verified locally. Public availability must be checked after GitHub Pages activation; pushing a branch alone does not prove a site is live.
