# Kirti Bhanu — Data Analytics Portfolio

Live site: https://kirtibhanu07.github.io/

The repository root contains the production website for GitHub Pages. Editable source lives in `source/`. The site uses the original Syne, DM Sans and DM Mono fonts, Anime.js motion, a skills section, five projects, horizontal project navigation, work experience, writing, recognition and contact links.

## Update

Use Node.js 22.12+ and pnpm 10.18.3. From source/:

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

After building, copy the contents of source/dist/ to the repository root, retaining source/ and .nojekyll. Commit and push to main. Existing GitHub Pages branch deployment publishes the root. Do not change Pages to source/; its index.html requires a build.

## Content

Project descriptions: source/src/data.js and source/preview/extra-projects.js. Layout: source/index.html. Styling and interactions: source/preview/. Images: source/public/project-media/. The résumé is available by email request; no résumé PDF is published.

The rainfall chart contains 115 historical India observations, 1901–2015. OCR results are synthetic-document benchmarks; weather charts describe retrospective research, and the YouTube screenshot uses sample data. Full-size project images and source links are included where available.

Motion respects the system reduced-motion preference and a manual toggle. The carousel supports touch, buttons, keyboard arrows and Home/End. No analytics tracking is installed.
