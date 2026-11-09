import { readFile, writeFile } from "node:fs/promises";

const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || "").replace(/\/$/, "");
if (!siteUrl || !/^https?:\/\//.test(siteUrl)) {
  console.error("Set SITE_URL or VITE_SITE_URL to the deployed HTTPS/HTTP origin.");
  process.exit(1);
}
for (const file of ["public/sitemap.xml", "public/robots.txt"]) {
  const source = await readFile(file, "utf8");
  await writeFile(file, source.replaceAll("__SITE_URL__", siteUrl));
}
console.log(`Configured SEO files for ${siteUrl}`);
