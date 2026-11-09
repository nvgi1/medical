# NAGI | Biomedical Engineering

An independent Arabic-first, bilingual portfolio with a procedural Three.js anatomy study and a ten-device educational equipment laboratory. The original NAGI website is untouched and is not a runtime dependency.

## Install and run

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open the localhost URL printed by Vite. Development uses React, TypeScript, Vite, React Router, Framer Motion, Three.js, and Lucide. No server, database, API keys, or original-site assets are required.

## Build and preview

```sh
npm run build
npm run preview
```

Deploy the `dist/` directory, not the source directory. Fonts and PDFs are served locally. Three.js is lazy-loaded only when a scene is mounted. The archive contains complete source and a ready-built `dist/`. The separate `npm run build:preview` command creates `dist-preview/` with relative assets for the sandboxed Computer preview; use the normal build for an independent domain with direct route loads.

## Motion and 3D layer

The site ships with a presentation layer built on Framer Motion plus targeted WebGL and CSS-3D work. Nothing here is required for content editing.

- `src/components/motion.tsx` holds the reusable motion system: scroll reveals, pointer 3D tilt, magnetic buttons, reading progress, route wipe, boot sequence, chapter orb and the cursor spotlight.
- `src/components/Scene.tsx` renders the anatomical study and the ten device schematics. It now adds a volumetric glow sprite, depth fog, an orbiting ring rig and pointer-driven camera parallax on top of drag, zoom, reset and pause.
- CSS-3D additions live at the end of `src/styles.css`: the hero depth stack, the chapter orb beside every section heading, the rotating discipline globe on `/skills`, and all hover choreography.

Behaviour notes:

- Every reveal, wipe, tilt and ambient loop is disabled under `prefers-reduced-motion: reduce`, and reveals stay visible in print.
- Tilt and magnetic effects only attach on `hover: hover` and `pointer: fine`, so touch devices keep flat, fast interactions.
- Route changes swap content instantly and animate the new page in, so the wipe never leaves a blank frame.
- Only one WebGL canvas is mounted per page; the equipment scene and hero scene are both lazy-loaded with the Three.js chunk.

## Content and honest placeholders

Edit `src/data/content.ts`. Each localized value uses `{ ar: "...", en: "..." }`, or the `l(ar, en)` helper.

- `profile`: full name, professional positioning, qualification, university, dates, location, biography, career objective, interests, languages, portrait and contact links. Bracketed values are visibly unfinished.
- `projects`, `projectDetails`, `projectCategories`: add entries, descriptions, methods, results, image/diagram/video/document URLs. Project IDs create `/projects/:id`.
- `certificates`, `certificateCategories`: title, issuer, date, description, category, real image/PDF file and optional verification URL.
- `experience`: organizations, roles, dates, responsibilities, technical exposure, achievements and supporting files.
- `skills`: editable discipline categories and skills. Initial entries are proposed areas, not personal proficiency claims. Optional verified levels can be added per item through `skillLevels`.
- `resumeContent`: shared explicit CV fields. Complete these with verified content, then regenerate PDFs.

Add files to `public/` and reference them with a root-relative URL such as `/media/project-photo.webp`. Use small optimized images and meaningful image captions. Do not add personal claims without verification.

Contact configuration intentionally starts empty:

```ts
email: 'your-real-address',
linkedin: 'https://www.linkedin.com/in/your-real-profile',
whatsapp: 'international-number-digits-only',
```

Empty contacts show a configuration explanation, not fake links. There is no simulated form or email backend. Portrait, contact data and actual certificates must be supplied before professional publication.

## Routes

| Route | Experience |
|---|---|
| `/` | Immersive overview |
| `/profile` | Biography, portrait and journey |
| `/projects` | Category-filtered project templates |
| `/projects/:id` | Individual engineering case study |
| `/certifications` | Filtered archive, fullscreen preview, zoom |
| `/experience` | Professional timeline |
| `/skills` | Interactive discipline map |
| `/medical-equipment` | Ten interactive device studies |
| `/education` | Academic blueprint and timeline |
| `/resume` | Interactive CV and bilingual downloads |
| `/contact` | Configurable contact methods |

Direct routes need a fallback rewrite to `index.html`. The root `vercel.json` and `public/_redirects` supply the usual Vercel and Netlify configurations.

## Generate bilingual CV PDFs

The PDFs are real selectable text, not canvas screenshots. They use one-column A4 layouts, embedded local fonts and clear template notices. They are designed for straightforward parsing, but Arabic ATS support varies by vendor; check the target application system.

```sh
# On a normal development machine, install Chromium once:
npx playwright install chromium
npm run cv
npm run build
```

The generator imports the same editable TypeScript data and writes these PDFs plus the generated `src/data/cv-pdfs.ts` module used for offline, no-fetch downloads:

- `public/cv/NAGI-CV-Arabic.pdf`
- `public/cv/NAGI-CV-English.pdf`

The sandbox uses `channel: 'chromium'`. If your installation needs it, change that launch option in `scripts/generate-cv.mjs`. Regenerate after editing personal data or CV fields; a static host does not run the generator at visitor time. `qa/` contains temporary CV inspection output and is not deployed.

## Independent deployment

### Vercel

1. Upload this folder to your own new Git repository.
2. Import it as a new Vercel project, separate from `nvgi.vercel.app`.
3. Choose the Vite framework preset.
4. Build command: `npm run build`. Output: `dist`.
5. Deploy. The included rewrite enables fresh loads of `/profile`, `/medical-equipment`, and the other routes.
6. Open every direct URL after deployment.
7. Only when ready, manually change your existing site's About Me icon target to the new site's deployed URL. This project does not modify that website.

### Netlify or another static host

Use `npm run build` and publish `dist`. Netlify reads `_redirects`. Other hosts must configure SPA fallback themselves. Serve assets normally and rewrite only application routes. For deployment under a subdirectory rather than a separate domain, update Vite's `base` and React Router's `basename` together and retest deep links.

## Interaction, accessibility and performance

Arabic defaults with full document RTL; English switches to LTR and remains selected while navigating. A fresh page load returns to Arabic, without browser storage. The header always offers an accessible section menu. Dialogs trap focus, restore it and close with Escape. Every model supports drag, arrow-key rotation, bounded zoom, reset, and ambient-motion pause. Only one canvas is mounted on a page. Rendering is capped around 30 FPS and pauses offscreen or in hidden tabs, with DPR capped at 1.5. Reduced motion disables idle animation and transforms. If WebGL initialization or context fails, an illustrated fallback remains.

The anatomy and devices are original procedural schematic artwork, not anatomical or manufacturer-accurate models. Signal traces are illustrative, not patient data. Content is educational, not a clinical or maintenance manual. Numerical specifications are intentionally withheld without a specific verified model. Every equipment study links inline to the reference supporting its purpose, principle and components, in `src/data/equipment.ts`.

No analytics, tracking cookies, remote model downloads or authentication are included. Outbound educational and configured contact links open only on visitor interaction.

## Quality checks

See `QA.md` for the tested inventory and results. Repeat browser QA at 1440px and 375px after content changes, especially long Arabic titles, menu focus, direct routes, project filters, certificates, equipment tabs and PDF download paths. Source PDFs should be regenerated and text-extracted after any CV change.

## Asset notes

No reference-site photos, contacts or proprietary models are reused. The site uses locally hosted Manrope and IBM Plex Sans Arabic fonts under the SIL Open Font License; their license files are in `public/fonts/`. Lucide icons and installed libraries retain their respective package licenses.
