# NAGI under-24MB package

This upload package keeps the complete source, SEO, sitemap, responsive UI, performance configuration, and the Biomedical Engineering Course certificate. The graduation PowerPoint is intentionally not embedded because it is larger than the upload budget.

To enable the external graduation-project download button, set this deployment variable to a public file URL:

VITE_GRADUATION_PROJECT_URL=https://your-public-file-host.example/manual-ventilator-simulator.pptx

Before production publishing, set the real domain and configure the SEO files:

SITE_URL=https://your-real-domain.example npm run configure:seo
npm run build

Install dependencies with npm install. The project data and certificate card remain included in the source.
