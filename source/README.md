# Upgrade Stab 1

Full-page scroll-linked data mesh, résumé contact navigation, WhatsApp messaging and Nielsen MVP recognition.

# Kirti Bhanu — Data Analytics Portfolio

The approved animated design is now the main site at `/`. `/preview.html` is kept as a matching review link. `/original.html` preserves the original uploaded HTML exactly.

## Run

Use Node.js 22.12+ and pnpm 10.18.3.

```sh
npm install -g pnpm@10.18.3
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

Production output: `dist/`. Serve it over HTTP; do not double-click the module-based HTML. The production ZIP contains the contents of dist at its root.

## Deployment to GitHub Pages

1. Extract the source ZIP and push its contents to your repository root on `main`.
2. In repository Settings → Pages → Build and deployment, choose **GitHub Actions**.
3. The included workflow installs dependencies, builds and deploys `dist/`. Push to main or run the workflow manually.
4. A profile repository named `Kirtibhanu07.github.io` serves at `https://kirtibhanu07.github.io/`; a project repository serves beneath its repository name. Relative build paths support both.

Preserve a custom domain by adding its CNAME file to `public/` before building. The public repository serves the prebuilt files at its root; editable Vite sources are in `source/`.

## Main files

- `index.html`: canonical portfolio markup.
- `preview.html`: identical review entry point; keep in sync with index.html.
- `preview/preview.css`: presentation and responsive layouts over the original embedded styles.
- `preview/motion.js`: Anime.js motion, chart, carousel and interactions.
- `preview/extra-projects.js`: Weather research description.
- `preview/rainfall.json`: 115 source-derived annual observations.
- `src/data.js`: original four project descriptions and source links used by the gallery. Legacy React files in src are retained for recovery but not loaded by the current site.
- `public/project-media/`: real project screenshots and evaluation plots.
- `public/Kirti_Bhanu_Resume.pdf`: latest supplied resume attachment, preserved unmodified.
- `original.html`, `reference/original.html`: exact original portfolio.
- `PROJECT_IDEAS.md`: proposed next projects, distinct from completed work.
- `TEST_REPORT.md`, `CONTENT_SOURCES.md`: verification and provenance.

## Included experience

Skills are directly after the hero. Five projects are represented: featured rainfall analysis plus a horizontal four-card gallery. Gallery supports touch/trackpad scrolling, next/previous buttons, keyboard arrows and Home/End. Project images open full-size. Case studies contain methods and caveats, including synthetic OCR benchmarks and retrospective weather research. Suggested future projects are not represented as completed work.

Anime.js 4.5.0 handles hero sequencing, entry effects, results and SVG drawing. CSS handles hover feedback. A manual motion toggle and system reduced-motion listener show final values and static content. There is no scroll hijacking, autoplay carousel, tracker or simulated contact form. Google Fonts use swap and local fallbacks.
