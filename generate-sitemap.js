#!/usr/bin/env node
/* ============================================================
   GENERATE-SITEMAP.JS
   Génère sitemap.xml à partir de data/projets.json + pages fixes.
   À lancer au build Netlify : "node generate-sitemap.js"

   Utilise la vraie date de modification de chaque fichier (mtime)
   pour donner des signaux honnêtes à Google.
   ============================================================ */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://thibaudpages.com';

// Fallback : date du jour au format YYYY-MM-DD (si fichier introuvable)
const today = new Date().toISOString().split('T')[0];

/**
 * Renvoie la date de dernière modification d'un fichier (YYYY-MM-DD).
 * Si le fichier n'existe pas, fallback à la date du jour.
 * Si plusieurs fichiers sont passés, retourne la plus récente.
 */
function getLastMod(...relativePaths) {
  let maxTime = 0;
  for (const rel of relativePaths) {
    const full = path.join(__dirname, rel);
    try {
      const stat = fs.statSync(full);
      if (stat.mtimeMs > maxTime) maxTime = stat.mtimeMs;
    } catch {
      // fichier absent, on ignore
    }
  }
  if (!maxTime) return today;
  return new Date(maxTime).toISOString().split('T')[0];
}

// Pages fixes
// `sources` = fichier(s) dont la mtime détermine le lastmod de cette page
const pages = [
  {
    loc: '/',
    priority: '1.0',
    changefreq: 'weekly',
    sources: ['index.html'],
  },
  {
    loc: '/projets.html',
    priority: '0.9',
    changefreq: 'weekly',
    sources: ['projets.html', 'data/projets.json'],
    withImages: true,
  },
  {
    loc: '/about.html',
    priority: '0.7',
    changefreq: 'monthly',
    sources: ['about.html'],
  },
  {
    loc: '/contact.html',
    priority: '0.5',
    changefreq: 'monthly',
    sources: ['contact.html'],
  },
  {
    loc: '/mentions-legales.html',
    priority: '0.3',
    changefreq: 'yearly',
    sources: ['mentions-legales.html'],
  },
  {
    loc: '/confidentialite.html',
    priority: '0.3',
    changefreq: 'yearly',
    sources: ['confidentialite.html'],
  },
];

// Lit les projets pour le sitemap-image
let projects = [];
try {
  const raw = fs.readFileSync(path.join(__dirname, 'data', 'projets.json'), 'utf8');
  projects = JSON.parse(raw).projects || [];
} catch (err) {
  console.warn('⚠️ projets.json introuvable, sitemap généré sans images');
}

// Échappe les caractères XML
function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Construit le XML
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

for (const page of pages) {
  const lastmod = getLastMod(...page.sources);

  xml += `
  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

  // Sur la page projets, on liste toutes les images
  if (page.withImages) {
    for (const p of projects) {
      if (!p.image) continue;
      const imageUrl = `${SITE_URL}/${p.image.replace(/^\//, '')}`;
      const title = xmlEscape(p.titleEn || p.title || '');
      xml += `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${title}</image:title>
    </image:image>`;
    }
  }

  xml += `
  </url>
`;
}

xml += `</urlset>
`;

// Écrit le fichier
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf8');
console.log(`✓ sitemap.xml généré (${projects.length} projets indexés)`);
