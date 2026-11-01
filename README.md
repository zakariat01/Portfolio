# Zakaria Toura — Portfolio

A bilingual English/French portfolio based on the selected **Interface Notebook** direction: oversized type, warm paper, cobalt, a Z/T construction study, and honest project placeholders.

## Develop

Use Node.js **22.12+** (validated with 24.19.0) and npm. No API keys, database, or external service is required.

```sh
cd /workspace/Portfolio
npm ci
npm run dev -- --host 0.0.0.0 --port 4173 --strictPort
```

Use the existing checkout. Cloud tasks already run in an isolated environment; a Git worktree is unnecessary unless explicitly requested.

```sh
npm run typecheck
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

`npm run build` creates the static deployment output in `dist/`. Vite uses a relative base, so the output can be hosted at a domain root or a subdirectory. The selected hosting target is GitHub Pages; see [GitHub Pages setup](docs/github-pages.md) for first-time activation and `npm run deploy`. No paid service is configured. Add canonical and absolute social image URLs plus a sitemap when public deployment is confirmed.

## Content and translations

Edit **`src/content.ts`**:

- `profile`: contact destinations and the supplied French CV path.
- `copy.en` and `copy.fr`: navigation, page copy, buttons, empty states, metadata, and accessibility labels.
- `projects`: the one source for featured work.
- `skillGroups` and `education`: factual background; technologies are grouped without proficiency ratings.
- `pendingConfirmation`: private editorial notes, never rendered.

English is the first-visit default. The EN / FR switch remembers an explicit choice in local storage when available, updates document language and metadata, and preserves the visitor’s section position. A link such as `?lang=fr#work` opens the French work section. Storage-disabled visitors can still switch languages.

The real CV is **`public/cv/Zakaria-Toura-CV-FR.pdf`**. Both languages label it as French. Replace that PDF in place when updating the CV.

## Replace the three project placeholders

Keep a stable `id` and replace the corresponding item in `projects`. All copy uses `{ en, fr }`. Put media in `public/images/` or `public/videos/` and use paths relative to `public/`:

```ts
{
  id: 'project-01',
  title: { en: 'Confirmed title', fr: 'Titre confirmé' },
  description: { en: 'A factual description.', fr: 'Une description factuelle.' },
  contribution: { en: 'What I built.', fr: 'Ce que j’ai réalisé.' },
  technologies: ['React', 'TypeScript'],
  media: {
    type: 'image',
    src: 'images/your-project.webp',
    alt: { en: 'Describe the actual screen.', fr: 'Décrivez l’écran réel.' },
  },
  // Include only real, tested destinations; omit unavailable actions.
  github: 'https://github.com/your-confirmed-repository',
  demo: 'https://your-confirmed-demo.example',
  caseStudy: {
    summary: { en: 'Context and scope.', fr: 'Contexte et périmètre.' },
    sections: [{
      title: { en: 'Approach', fr: 'Démarche' },
      body: { en: 'Describe your decisions.', fr: 'Décrivez vos choix.' },
    }],
  },
}
```

Do not paste the example destinations as live links. Omit `github`, `demo`, `caseStudy`, or `media` until real content exists. Case studies expand inline; no extra route is needed. Videos use `type: 'video'`, a local `src`, an optional local `poster`, translated `alt`, native controls, and metadata-only preload. Avoid autoplay and include captions in the media when speech conveys information. Media fields reserve their size; optimize real images as WebP/AVIF and give each a meaningful translated description. Update any larger media dimensions if the source composition changes.

## Motion and interaction

**Motion for React** is the single animation system. It handles the coordinated hero entrance, small scroll reveals, and a spring-driven monogram study. Text is visible before animation; no scrolling is hijacked. CSS handles simple button, navigation, and media hover states.

The monogram is a generated raster asset, not fabricated project work. Move a pointer to subtly inspect its perspective, press/click to look closer, use arrow keys to explore, and Escape to reset. Touch and keyboard visitors can use the same zoom control. Reduced-motion preferences disable perspective movement and use immediate zoom changes. `noscript` retains identity, email, GitHub, and CV access if JavaScript cannot run.

Fonts are self-hosted: Inter Variable and IBM Plex Mono. Standard icons come from Phosphor. Assets are in `public/images/`; the selected visual target is saved in `docs/design/reference.png`.

## Browser validation

```sh
# A system Chromium is used automatically if /usr/bin/chromium exists.
# Otherwise install Playwright's Chromium once:
npx playwright install chromium
npm run test:e2e
```

For another installed Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path. Browser tests start/reuse the dev server on port 4173. In this managed cloud environment, browser and server processes need the platform’s normal network/process permissions outside the command sandbox.

The suite checks navigation, a real PDF download, contact URLs, intentional empty states, language persistence and section position, localized metadata, disabled storage, keyboard use, reduced motion, no-JavaScript fallback, overflow, and automated WCAG A/AA checks at 1440, 834, 390, and 320 px in both languages. It also captures rendered animation states and screenshots in `docs/verification/`. Automated checks do not replace manual assistive-technology testing.

See **`design-qa.md`** for the source-to-render comparison and visual review. `test-results/`, installed dependencies, and production output are ignored.

## Details awaiting confirmation

- The CV marks ISGI as October 2023–present. Current enrollment/completion and the exact qualification remain unconfirmed. The site lists the study area and institution without claiming a completed award or current status.
- The CV’s LinkedIn address is incomplete; it is omitted until an exact URL is supplied.
- Three project entries intentionally remain placeholders. No CV project, outcome, or screenshot has been invented.
