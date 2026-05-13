#!/usr/bin/env node
/* ============================================================
   GENERATE-SITEMAP.JS
   Génère sitemap.xml à partir de data/projets.json + pages fixes.
   À lancer au build Netlify : "node generate-sitemap.js"
   ============================================================ */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://thibaudpages.com';

// Date du jour au format YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

// Pages fixes
const pages = [
  { loc: '/',              priority: '1.0' },
  { loc: '/projets.html',  priority: '0.9', withImages: true },
  { loc: '/about.html',    priority: '0.7' },
  { loc: '/contact.html',  priority: '0.5' },
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
  xml += `
  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
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
