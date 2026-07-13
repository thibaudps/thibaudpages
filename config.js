// ============================================================
//  CONFIG.JS
//  ------------------------------------------------------------
//  ⚠️ Tu n'as plus besoin de modifier le contenu ici.
//  Le contenu des pages se modifie désormais dans le CMS (/admin/),
//  qui écrit dans le fichier data/site.json.
//
//  Les valeurs ci-dessous ne servent plus que de SECOURS (fallback) :
//  si data/site.json ne se charge pas, le site reste fonctionnel
//  avec ce contenu. C'est aussi pourquoi il est dupliqué.
// ============================================================

const CONFIG = {

  // ── Identité ──────────────────────────────────────────────
  name: 'THIBAUD PAGÈS',
  nameShort: "TPD",
  tagline: "Graphisme & Illustration",
  taglineEn: "Design & Illustration",
  description: "Je travaille avec des structures culturelles et associatives en France et en Suisse romande.",
  ctaLabel: "Voir les projets",
  url: "thibaudpages.com",
  location: "Made by yours truly in 2026",

  // ── Musique d'ambiance ────────────────────────────────────
  music: {
    file: "public/music/chill.mp3",
    artist: "Alex Morgan",
    title: "Autumn Leaves Falling",
  },

  // ── Navigation ────────────────────────────────────────────
  nav: [
    { label: "Projects",  href: "projets.html" },
    { label: "Tools",     href: "tools.html"   },
    { label: "About me",  href: "about.html"   },
    { label: "Contact",   href: "contact.html" },
  ],

  // ── Titre hero (HTML autorisé : <em> pour l'italique) ─────
  heroTitle: "Identités, affiches<br>et illustrations pour les<br><em>acteurs culturels</em>",

  // ── Filtres de la grille ──────────────────────────────────
  //    (Volontairement NON géré par le CMS : ces valeurs doivent
  //     rester synchronisées avec les catégories des projets.)
  filters: [
    "All",
    "Identity",
    "Print",
    "Illustration",
    "Edition",
    "Web",
  ],

  // ── Projets ───────────────────────────────────────────────
  //    Gérés via Decap CMS dans data/projets.json (fetch dans main.js).
  //    Ce tableau vide est un fallback safe.
  projects: [],

  // ── Page About ────────────────────────────────────────────
  about: {
    suffix: "graphiste & illustrateur",
    suffixEn: "is a designer",
    image: "public/images/portrait.webp",
    paragraphs: [
      "<strong>Je suis Thibaud Pagès,</strong>",
      "Graphiste et illustrateur indépendant basé dans le bassin lémanique. J’accompagne des entreprises, des marques et des porteurs de projets de tout genre, en France, en Suisse ou ailleurs.",
      "Nourri par une passion de toujours pour la bande dessinée et l’image sous toutes ses formes, j’envisage le graphisme comme un terrain d’échange. J’aime prendre le temps de discuter avec vous pour cerner l’essence de votre projet et concevoir l’univers visuel qui vous correspondra le mieux. Pour moi, cette démarche collaborative est essentielle : elle vous garantit un résultat unique et sur-mesure, tout en me permettant d’élargir et toujours adapter ma vision artistique.",
      "<strong>De l’échange à l’image, créons ensemble votre univers.</strong>",
    ],
    paragraphsEn: [
      "<strong>I'm Thibaud Pagès,</strong>",
      "A freelance graphic designer and illustrator based in the Lake Geneva area. I work with businesses, brands, and project leaders of all kinds, in France, Switzerland, and beyond.",
      "Driven by a lifelong passion for comics and imagery in all its forms, I see graphic design as a space for exchange. I like to take the time to talk with you, to grasp the essence of your project and craft the visual world that fits you best. For me, this collaborative approach is essential: it ensures you a unique, tailor-made result, while allowing me to broaden and continually adapt my artistic vision.",
      "<strong>From conversation to image, let's create your world together.</strong>",
    ],
  },

  // ── Page Contact ──────────────────────────────────────────
  contact: {
    suffix: "discutons-en",
    suffixEn: "is open to talk",
    headline: "Un projet&nbsp;? Une idée&nbsp;?<br><em>Besoin d'une nouvelle identité&nbsp;?</em>",
    headlineEn: "A project? An idea?<br><em>Need a new identity?</em>",
    sections: [
      {
        title: "TRAVAILLONS ENSEMBLE",
        titleEn: "LET'S COLLABORATE",
        email: "contact@thibaudpages.com",
      },
      {
        title: "Dites bonjour et suivez mon actualité",
        titleEn: "Just say hi and see my latest news",
        link: "https://www.instagram.com/thibaudpagesdesigns/",
        linkLabel: "@thibaudpagesdesigns",
      },
    ],
  },

  // ── Palettes (pot de peinture) ────────────────────────────
  //    (Volontairement NON géré par le CMS pour l'instant :
  //     les flags defaultLight / defaultDark sont sensibles.)
  themes: [
    {
      label: "Blanc",
      swatch: "#ffffff",
      bg: "#ffffff",
      fg: "#1a1a1a",
      border: "#e0e0e0",
      mid: "#888888",
      card: "#f5f5f5",
    },
    {
      label: "Crème",
      swatch: "#FFFDF2",
      bg: "#FFFDF2",
      fg: "#2A2A24",
      border: "#D8D0C0",
      mid: "#8A8678",
      card: "#EDE8DC",
      defaultLight: true,
    },
    {
      label: "Encre",
      swatch: "#2A2A24",
      bg: "#2A2A24",
      fg: "#F5F0E8",
      border: "#444438",
      mid: "#9A9A88",
      card: "#3A3A30",
      defaultDark: true,
    },
    {
      label: "Sauge",
      swatch: "#E8EDE4",
      bg: "#E8EDE4",
      fg: "#2A3424",
      border: "#C8D4C0",
      mid: "#728060",
      card: "#DDE5D8",
    },
    {
      label: "Nuit",
      swatch: "#1C2B3A",
      bg: "#1C2B3A",
      fg: "#E8F0F8",
      border: "#2E4258",
      mid: "#7A9AB8",
      card: "#243444",
    },
  ],
};

// ============================================================
//  Chargement du contenu géré par le CMS (data/site.json)
//  ------------------------------------------------------------
//  Chargement SYNCHRONE volontaire : CONFIG est entièrement
//  rempli AVANT l'exécution de main.js / home.js / pjax.js.
//  => aucun changement nécessaire dans ces fichiers.
//  Si le fetch échoue, on garde les valeurs de secours ci-dessus.
// ============================================================
(function loadSiteContent() {
  try {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/data/site.json", false); // false = synchrone
    xhr.send(null);
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);
      // Remplace les clés présentes dans site.json (fusion de surface).
      // 'projects', 'filters' et 'themes' restent ceux définis ci-dessus.
      Object.assign(CONFIG, data);
    }
  } catch (e) {
    console.warn("[config] data/site.json non chargé, fallback utilisé.", e);
  }
})();
