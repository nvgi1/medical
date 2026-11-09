# NAGI biomedical website quality checks

Checks were performed against the built Vite application, not only the development server. Personal data and achievements remain intentionally unverified placeholders.

## Build and route checks

- `npm run build`: passes TypeScript and production bundling.
- `npm run build:preview`: passes, with relative assets for the Computer preview.
- Production route matrix: 52 checks covering the homepage, nine section routes and three project-detail routes in Arabic and English at 1440 × 1000 and 375 × 900.
- All matrix entries showed the correct document direction and no horizontal overflow. No page JavaScript errors or HTTP responses of 400 or higher were recorded in that matrix.
- Unknown routes show the designed 404 view.
- Tablet route checks at 768 × 1024 showed no horizontal overflow across the homepage, nine sections and a project detail.
- The sandbox preview uses memory routing. A normal independent domain uses browser routing and the included SPA rewrites.
- Vite reports its expected large-chunk advisory for the lazy-loaded Three.js engine. This is not a TypeScript or build error; the engine is separate from the primary application bundle.

## Interaction checks

- Project category filters show matching entries or explanatory empty states.
- Project detail navigation shows all eight case-study fields.
- Certificate template preview opens, zooms and closes with Escape. Focus returns to its trigger.
- Certificate categories with no entries show an explanatory empty state.
- All four skills tabs display the associated discipline content without fabricated proficiency.
- All ten equipment selections and all three information tabs per device were exercised.
- Scene drag, arrow-key rotation, zoom, reset and pause controls were exercised.
- The section menu contains ten page links. Keyboard focus stays inside the dialog; Escape restores focus to the menu trigger.
- Unconfigured contacts show a configuration explanation and do not pretend to submit a message.
- WebGL-unavailable behavior was tested by disabling WebGL context creation: the equipment schematic fallback remained visible.
- Reduced-motion media preference was tested with the fallback and is also respected by the scene's animation loop.

## PDF checks

- Both CV download buttons produced actual PDF downloads with the expected filenames and no browser download failures.
- The generated Arabic and English documents each contain one A4 page for the initial placeholder content.
- `qpdf --check` passes for both files.
- Text extraction confirms actual selectable text, not screenshot content.
- Font inspection confirms embedded Unicode Arabic fonts.
- Both documents explicitly say they are templates, not verified qualifications or completed applications.
- PDFs are regenerated from the shared content data with `npm run cv`. The generated base64 module permits download without cross-origin binary fetches.

## Visual inspection

Desktop and 375px screenshots were captured for every section in both languages. The opening scene, mobile homepage, project details, resume, equipment laboratory, PDF layouts and interior-page overview were inspected for spacing, clipping and hierarchy.

## Hosted preview verification

- A fresh browser context opened the actual deployed proxy URL and showed the Arabic homepage and rendered anatomy scene.
- All nine section pages were reached using the hosted section menu.
- Arabic-to-English switching, equipment selection, information tabs, model pause/zoom/reset and mobile menu navigation were exercised on the hosted site.
- The final mobile laboratory had no horizontal overflow and the scene controls measured 44px wide.
- Both hosted CV downloads completed without failure. Their SHA-256 hashes matched the corresponding generated PDF files exactly.
- An additional iframe test with an opaque sandbox origin and `allow-downloads` confirmed that the Arabic CV download also works inside a sandboxed preview.
- No page JavaScript errors or failed HTTP responses were recorded during the hosted navigation and download checks.
- The preview-host routing mismatch found during the first check was corrected. No permanent public publication or Vercel deployment was performed.

## Scope and limitations

- Testing was performed in Chromium. Real-device Safari and Firefox testing is still recommended before a professional public launch.
- Uploaded real certificate images/PDFs and actual project media cannot be validated until those files are supplied.
- Contact destinations are intentionally absent and cannot be end-to-end tested until real details are configured.
- The models are procedural educational schematics, not manufacturer-accurate or clinical models.
- No Lighthouse score or universal ATS compatibility is claimed.
- A standalone deployment still needs its host's SPA fallback configuration; the README covers Vercel and Netlify.

## Motion and 3D layer checks (2026 upgrade)

- Production build passes TypeScript and Vite; the only build output is the existing Three.js chunk-size advisory.
- Home, profile, projects, project detail, certifications, experience, skills, equipment, education, resume and contact pages were loaded in Chromium at 1440×900 and 390×844 with no console errors, page errors or failed requests.
- Scroll reveals were exercised by stepping through every page at 60% viewport increments: zero elements remained hidden or transparent after the pass on both widths.
- No horizontal overflow was measured on any route at 390px after the new transforms were added.
- Route transitions were captured at 140ms and 560ms: the new page mounts immediately behind the scan wipe, so no blank frame appears between routes.
- Card tilt and the pointer spotlight were exercised with a fine pointer; both are skipped entirely on touch and under reduced motion.
- `prefers-reduced-motion: reduce` was tested with a reduced-motion browser context: the boot screen is skipped, reveals render in their final state, the orb and progress bar are hidden and the render loop stops animating.
- Both language modes were checked after the changes; the boot wordmark is pinned to LTR so it never mirrors in Arabic.
- WebGL fallback, zoom, rotate, reset and pause were re-exercised on the enhanced scene (glow sprite, depth fog, orbit rig, camera parallax).
