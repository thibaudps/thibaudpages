// ============================================================
//  CONFIG.JS — Tout le contenu du site est ici.
//  C'est le seul fichier à modifier pour changer le contenu.
// ============================================================

const CONFIG = {

  // ── Identité ──────────────────────────────────────────────
  name: 'THIBAUD PAGÈS',
  nameShort: "TPD",
  tagline: "Design graphique & Illustration",
  description: "Je travaille avec des structures culturelles et associatives en France et en Suisse romande.",
  ctaLabel: "Voir les projets",
  url: "thibaudpages.com",
  location: "Made by yours truly in 2026",

  // ── Musique d'ambiance ────────────────────────────────────
  // file   : chemin vers le fichier audio (mp3, wav, m4a…)
  // artist : nom de l'artiste
  // title  : nom du morceau
  music: {
    file: "public/music/chill.mp3",
    artist: "Alex Morgan",
    title: "Autumn Leaves Falling",
  },

  // ── Navigation ────────────────────────────────────────────
  nav: [
    { label: "Projects",  href: "projets.html" },
    { label: "About me",  href: "about.html"   },
    { label: "Contact",   href: "contact.html" },
  ],

  // ── Titre hero (HTML autorisé : <em> pour l'italique) ─────
  heroTitle: "Identités, affiches<br>et illustrations pour les<br><em>acteurs culturels</em>",

  // ── Filtres de la grille ──────────────────────────────────
  filters: [
    "All",
    "Identity",
    "Print",
    "Illustration",
    "Edition",
    "Web",
  ],


  // ── Projets ───────────────────────────────────────────────
  // ⚠️ Les projets sont désormais gérés via Decap CMS (/admin/)
  //    et stockés dans data/projets.json.
  //    main.js fait un fetch au démarrage et injecte le contenu
  //    dans CONFIG.projects, donc ce tableau vide est juste un
  //    fallback safe (si le fetch échoue, le site ne plante pas).
  projects: [],

  // ── Page About ────────────────────────────────────────────
  // suffix    : petit texte affiché à droite du nom dans la nav (ex. "is a team")
  // image     : chemin de l'image à gauche (ou "" pour ne rien afficher)
  // paragraphs: tableau de paragraphes. HTML autorisé pour mettre en gras avec <strong>
  about: {
  suffix: "graphiste & illustrateur",
  suffixEn: "is a designer",
  image: "public/images/portrait.webp",
  paragraphs: [
    "<strong>Je suis Thibaud Pagès</strong>",
    "Graphiste et illustrateur indépendant basé sur le bassin lémanique. J'accompagne des entreprises, des marques et des porteurs de projets de tous horizons, que ce soit en France, en Suisse ou à l'international.",
    "Nourri par une passion de toujours pour la bande dessinée et l'image sous toutes ses formes, j'envisage le graphisme comme <strong>un terrain d'échange.</strong> J'aime prendre le temps de discuter avec vous pour cerner l'essence de votre projet et concevoir l'univers visuel qui vous correspondra le mieux. Pour moi, cette démarche collaborative est essentielle : elle vous garantit un résultat unique et sur-mesure, tout en me permettant d'enrichir mes propres compétences et d'élargir ma vision artistique.",
    "<strong>De l'échange à l'image : créons ensemble votre univers.</strong>",
  ],
  paragraphsEn: [
    "<strong>I'm Thibaud Pagès</strong>",
    "Independent graphic designer and illustrator based in the Lake Geneva area. I work with businesses, brands, and project leaders from all backgrounds, whether in France, Switzerland, or internationally.",
    "Driven by a lifelong passion for comics and visual storytelling, I see graphic design as <strong>a space for exchange.</strong> I take the time to discuss with you, understand the essence of your project, and craft the visual universe that fits you best. For me, this collaborative approach is essential: it guarantees you a unique, tailor-made result, while letting me enrich my own skills and broaden my artistic vision.",
    "<strong>From conversation to image: let's create your universe together.</strong>",
  ],
},

  // ── Page Contact ──────────────────────────────────────────
  // suffix      : petit texte à droite du nom dans la nav
  // headline    : grande question principale (HTML autorisé pour <em>)
  // sections    : tableau de sections email avec un titre et un mailto
  contact: {
    suffix: "discutons-en",
    suffixEn: "is open to talk",
    headline: "Un projet&nbsp;? Une idée&nbsp;?<br><em>Besoin d'une nouvelle identité&nbsp;?</em>",
    headlineEn: "A project? An idea?<br><em>Need a new identity?</em>",
    sections: [
  {
    title: "TRAVAILLONS ENSEMBLE",
    titleEn: "LET'S COLLABORATE",
    email: "thibaudpages@yahoo.fr",
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