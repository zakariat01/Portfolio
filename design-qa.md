# Design QA

final result: passed

## Comparison target and evidence

- Source visual truth: `docs/design/reference.png` (selected third displayed concept), 946 × 1663 px.
- Initial implementation: `docs/verification/desktop-reference-frame.png`, CSS viewport 946 × 1663, device scale factor 1. No density normalization or device chrome.
- Full-view comparison: `docs/verification/comparison-initial.jpg`, source left / implementation right in the same image.
- Additional browser evidence: `docs/verification/desktop-1440.png`, `tablet-834.png`, `mobile-390.png`, `mobile-fr-390.png`, and `monogram-detail.png`.
- Final full-view comparison: `docs/verification/comparison-final.jpg` (1892 × 1663 px, source left / revised implementation right). Both source and implementation are 946 × 1663 px, captured at CSS size and device scale factor 1.
- Focused combined comparisons: `docs/verification/comparison-hero.jpg` (both artifacts cropped to y=60–725) and `docs/verification/comparison-work.jpg` (both cropped to y=725–1450). These expose headline wrapping, controls, artwork, and media alignment at readable size. No separate images were treated as a side-by-side comparison.
- State: English, introductory hero at rest, three intentional project placeholders. About, skills, education, and footer are deliberate additions required by the written brief; the selected concept only depicts hero, work, and contact.

## Initial findings

1. [P2] Hero typography and vertical rhythm differ at the source viewport. The implementation's introductory label and monogram begin below the source, its headline is smaller, and the supporting paragraph wraps into two lines instead of three. This changes the balance between the name, statement, and artwork. Fix the name's bottom margin, headline size, and paragraph size/measure at 946 px, then recapture and compare.
2. [P2] The placeholder media labels fall below WCAG AA contrast in the automated browser check. Use the darker muted text token while retaining the intentional neutral media surface.
3. [P2] The small wordmark link needs a larger hit area. Keep the visible logo size and give its anchor a 44 px minimum height.

## Fixes and final comparison

The initial comparison remains in `comparison-initial.jpg`. The revised capture follows the concrete fixes below:

1. Reduced the name-to-hero gap at the source viewport from 42 to 22 px. Increased the statement from 6.6 to 7.5 vw, adjusted the supporting text to 22 px with a 430 px measure, and moved the optional desktop experiment hint out of layout flow. The final focused hero comparison shows the intended two-line statement, three-line introduction, balanced artwork, and the selected-work boundary close to the source.
2. Changed placeholder labels to the darker shared muted token. All eight bilingual viewport accessibility scans now pass with no A/AA violations reported by axe.
3. Gave the wordmark anchor a 44 px minimum height while retaining its visible proportions. Browser checks confirm usable header target sizes at all four widths.

The final full-view and both focused comparisons were inspected after these fixes. No actionable P0/P1/P2 differences remain. Small generated-asset construction differences and approximately 10–25 px shifts in work-section rhythm at the source frame are P3 polish rather than changes to composition, hierarchy, or usability.

## Required fidelity surfaces — final review

- Fonts/typography: self-hosted Inter Variable and IBM Plex Mono reproduce the grotesk/monospace hierarchy. The revised headline scale and three-line description follow the source. Mobile uses a deliberate two-line name. French text wraps naturally without truncation; body text remains readable. Minor letterform differences from the generated mock are acceptable.
- Spacing/layout rhythm: broad name, split hero, wide first media field, two smaller fields, flat surfaces and rules preserved. Revised hero spacing restores the source hierarchy. Tablet retains the split layout; mobile stacks the introduction, artwork and media. The additional about/education content extends page height intentionally. Contact reuses the source's typography and rule treatment.
- Colors/tokens: warm paper (#f3f2ed), charcoal (#20211f), restrained cobalt (#2444e8), neutral media (#e7e6e0), and the darker muted label token preserve the selected direction with accessible contrast. No gradients, fake elevations, or extra card containers introduced.
- Asset fidelity: generated raster wordmark and generated raster Z/T construction study preserve the source's subjects. Small differences in grid spacing are acceptable; no handcrafted SVG/CSS substitutes for artwork. Phosphor supplies standard UI icons. Neutral project blocks are explicitly requested empty states.
- Copy/content: selected copy, accurate French CV label, actual contact destinations, and intentional placeholders retained. No project evidence, education completion, or LinkedIn URL invented. Additional bilingual about/skills/education follow the source CV and brief.

## Browser interaction and responsiveness evidence

The final browser run completed **10 tests, all passed**. This includes eight axe A/AA scans across 1440×1024, 834×1194, 390×844, and 320×740 CSS viewports in English and French. No horizontal viewport overflow was detected. Desktop, tablet, English mobile, French mobile, and zoomed-monogram screenshots were opened and visually reviewed. The saved full-page screenshots represent their recorded widths, device scale factor 1, with finite animations completed for capture.

Verified behaviors: section navigation, three honest empty work entries with no unavailable actions, real PDF download (HTTP 200, PDF signature, correct French filename), mail and GitHub destinations, section-preserving language changes, localized title/description/social locale, preference persistence, switching with storage disabled, visible keyboard skip link and focus, monogram Enter/arrow/Escape controls, pointer-driven transform, completed entrance animation, reduced-motion scrolling, and no-JavaScript contact/CV fallback. The recruiter-journey test monitored page errors and console errors and found none.

`npm run build` also passed, including TypeScript checking. The review uses local Chromium via Playwright in the managed Codex environment. No hosted preview, cloud-browser connector, deployment, purchase, or publication was claimed.

## Residual limits and P3 follow-up

- The generated construction study has slight line-spacing differences from the mock; the core Z/T, circles, grid, cobalt mark and raster quality are preserved.
- The implemented work heading and spacing are close rather than pixel-identical to the generated reference. This does not alter information hierarchy or media proportions.
- Manual screen-reader/device testing and Firefox/WebKit validation were not run. Automated accessibility checks are evidence, not a universal compliance guarantee.
- Canonical/social image URLs depend on the eventual deployment domain and are documented as deployment setup. No domain was invented.

## Implementation checklist

1. [x] Correct hero scale/spacing/wrapping, media-label contrast, and logo hit target.
2. [x] Recapture matching desktop state and focused hero/work regions; inspect combined comparisons.
3. [x] Re-run bilingual responsive and accessibility checks, then production build.
4. [x] Record final evidence and result.
