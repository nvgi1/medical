# NAGI Biomedical: the observatory

Independent React/TypeScript/Vite experience. No runtime requests to nvgi.vercel.app.
The live reference was inspected beyond the entry screen. Its actual environment is warm, architectural and pastel, with a minimal NAGI wordmark, restrained navigation and a dominant exploratory 3D scene. This new experience borrows the spatial hierarchy and quiet UI, not its scene or content. The requested nocturnal biomedical direction intentionally replaces its warm palette.

## Visual specification

Background #070d12; panel #0b151d; line rgba(153,190,204,.15); text #eff5f4; secondary #90a5af; accent #6de0d2. Grid at 64px, 2% opacity. A 48px desktop gutter and 24px mobile gutter, capped at 1500px, provide generous composition. Corners stay 4px on controls and 8px on media, avoiding pill-heavy dashboards.

Manrope 300/400/500/600 for Latin and IBM Plex Sans Arabic 300/400/500/600 for Arabic. Hero display clamp(44px,5.1vw,78px), Arabic line height 1.37 and Latin 1.12; body 15px/1.9; metadata 10px with .16em Latin tracking. H1 has a two-beat statement, primary white and restrained mint.

The opening is a split laboratory stage with a procedural holographic torso, rib cage, heart and scanning plane, not a medical diagnostic model. The model takes 52% of desktop width opposite the copy, with an isolated faint floor grid and projected instrument callouts. A mint primary CTA enters the lab. Secondary CTA opens the portfolio. A low-contrast 3-column discipline strip completes the opening.

The scene uses Three.js, a narrow camera, teal transparent points and geometry, fine wire contours, an orbital floor and purposeful red-orange heart contrast. Models are generated locally, with no heavy model download or licensing dependency. Equipment is deliberately schematic, not represented as manufacturer-accurate.

Shared header: wordmark plus technical subtitle, four principal destinations, persistent all-section menu, language control. The menu exposes all nine real routes and home; focus is trapped, escape and navigation close it, background scrolling is locked. A compact breadcrumb and route index establish orientation.

Subpages use an oversized editorial heading, small mono index, a muted introduction, then a distinct composition: profile split with portrait placeholder; project gallery and detail route; certificate archive with accessible fullscreen sample preview; animated journey timeline; tabbed skills with no proficiency claims; interactive split equipment lab; blueprint academic timeline; a paper-like resume; and a spare contact grid.

## Interaction

Entrance: 22px y to zero, opacity .2 to 1 over .65s, ease [.22,1,.36,1], .08s stagger. Page route transitions last .25s. Hovers change borders and shift arrows 3px over .2s. Scene mouse response is constrained; explicit pointer drag rotates and zoom buttons change bounded camera distance. Keyboard arrows rotate. Pause control stops ambient motion. Reduced-motion removes idle motion, page travel and ECG animation.

Mobile below 760px: no compressed desktop navigation. Menu contains all routes. Hero text comes first, visual below at 360px height, buttons full width when needed. Lab stacks scene above detail tabs. Project tiles become one column; data rows wrap. DPR max 1.5 and geometry counts are modest. WebGL failure retains a meaningful illustrated fallback. Rendering pauses offscreen and when document hidden. Only one 3D scene mounts per page.

## Content and safety

Arabic defaults; English changes all principal content and document direction. Personal facts remain explicit editable placeholders. The requested professional title is shown as portfolio positioning, with no invented degree, employer or achievements. Equipment content is educational only, cited inline to authoritative fetched pages. No fabricated technical specifications or clinical settings. Maintenance copy points to trained personnel and manufacturer instructions, never procedural repairs.

## QA inventory

All ten main routes, project details and unknown-route fallback; default Arabic/RTL and switched English/LTR; desktop/mobile screenshots of each route; full menu keyboard dismissal; project and certificate filters; certificate preview and zoom; all ten equipment selections and detail tabs; rotation, zoom, reset and pause; category skill selection; language-specific PDF download and extracted selectable text; contact unconfigured state; direct route refresh; browser console; reduced motion and WebGL fallback. Exploratory cases: invalid project URL and switching language with a dialog open.
