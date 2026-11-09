# Performance Audit Report — Nagi Alnoor

## Work completed

The optimization focused on initial loading and delivery without changing the visual design, routes, SEO metadata, or interactive behavior.

The intro video is now requested after a short post-render delay while the existing poster remains available immediately. This prevents a 4.18 MB MP4 from competing with the first meaningful render. It still auto-plays normally once its source is attached.

The Vite production build now separates React and router dependencies, Lucide icons, Framer Motion, and Three.js into cacheable chunks. Three.js remains lazy-loaded by the existing Scene component, so the 3D library is not required for ordinary non-scene routes.

Vercel and Netlify static delivery rules were added. Versioned JavaScript/CSS assets and fonts use immutable long-term caching. Media and preview assets use one-week caching. HTML is not assigned immutable caching, avoiding stale route metadata after deployment.

## Build comparison

The previous production build had a main JavaScript chunk of approximately 388.68 KB (146.12 KB gzip). After splitting, the main application chunk is approximately 335.83 KB (129.31 KB gzip), a reduction of about 52.85 KB raw and 16.81 KB gzip for the main entry chunk.

Additional output chunks are now independently cacheable: React/router at approximately 52.12 KB, Framer Motion at approximately 139.31 KB, Lucide icons at approximately 10.70 KB, the Scene module at approximately 14.02 KB, and Three.js at approximately 688.39 KB. Three.js is only needed on routes that mount a 3D scene.

## Asset audit

The largest public assets are intentionally kept as user-facing downloads or media: the graduation PowerPoint is approximately 27.3 MB, the second certificate PDF approximately 5.7 MB, the intro MP4 approximately 4.2 MB, and the portrait PNG approximately 3.2 MB. The PowerPoint and PDFs are not downloaded on the home route. The intro MP4 is now deferred until after the first render.

No image format conversion was forced because the local environment did not include a verified image encoder, and changing the portrait format without visual inspection could reduce quality. The existing image uses lazy loading outside the initial page and the certificate/project media already uses lazy loading or metadata-only video loading.

## Verification

- `npm run build` passes successfully after the optimization.
- Production output is generated in `dist/`.
- Existing SEO implementation remains present, including dynamic canonical URLs, JSON-LD, robots metadata, sitemap, and route metadata.
- Existing routes, navigation, 3D scene fallback, responsive lab layout, and contact/project/certificate functionality remain in the source.
- Cache configuration files are present at `public/vercel.json` and `public/_headers`.

## Remaining bottlenecks and realistic expectations

The Three.js vendor chunk is inherently large because the site provides interactive 3D scenes. It is already isolated and loaded lazily. The graduation presentation and PDFs are downloads rather than initial resources; they should not affect the home page transfer unless a visitor opens their pages or clicks them.

A formal Lighthouse run could not be completed in this local environment because the installed Playwright package has no downloaded Chromium executable. Real Core Web Vitals also require a deployed URL and representative devices/network conditions. After deployment, run Lighthouse in Chrome and monitor Search Console and CrUX data. Targets such as LCP ≤ 2.5s, INP ≤ 200ms, and CLS ≤ 0.1 should be measured rather than claimed in advance.
