/* ============================================================
   MAIN.JS — Logique commune à toutes les pages
   Curseur, navigation, thèmes, projets, filtres, footer, modal.
   ============================================================ */

// ════════════════════════════════════════════════════════════
// SYSTÈME I18N (internationalisation)
// ════════════════════════════════════════════════════════════
// Toutes les chaînes traduisibles fixes du site. Pour les textes
// liés à un projet (titre, description), on stocke titleEn/descriptionEn
// directement dans le projet dans config.js.
const I18N = {
  fr: {
    // Navigation
    'nav.projects': 'PROJETS',
    'nav.about': 'À PROPOS',
    'nav.contact': 'CONTACT',
    // Page home
    'home.sub': 'Graphisme & Illustration',
    // Filtres projets
    'filter.all': 'Tous',
    'filter.Identity': 'Identité',
    'filter.Print': 'Print',
    'filter.Illustration': 'Illustration',
    'filter.Edition': 'Édition',
    'filter.Web': 'Web',
    // Footer
    'footer.location': 'Conçu avec amour en 2026',
    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Confidentialité',
    // Modal projet — labels accessibilité
    'modal.close': 'Fermer',
    'modal.prev': 'Image précédente',
    'modal.next': 'Image suivante',
    'modal.imageN': 'Image {n}',
    // Bouton de langue
    'lang.toggle': 'EN',
    'lang.htmlAttr': 'fr',
    // Meta SEO par page (head)
    'meta.index.title': 'Thibaud Pagès — Graphiste & illustrateur',
    'meta.index.description': "Portfolio de Thibaud Pagès, graphiste et illustrateur basé sur le bassin lémanique.",
    'meta.projets.title': 'Projets — Thibaud Pagès',
    'meta.projets.description': "Projets de design graphique et d'illustration de Thibaud Pagès.",
    'meta.about.title': 'À propos — Thibaud Pagès',
    'meta.about.description': "À propos de Thibaud Pagès, graphiste et illustrateur indépendant.",
    'meta.contact.title': 'Contact — Thibaud Pagès',
    'meta.contact.description': "Contactez Thibaud Pagès pour vos projets graphiques et d'illustration.",
    'meta.legal.title': 'Mentions légales — Thibaud Pagès',
    'meta.legal.description': "Mentions légales du site thibaudpages.com.",
    'meta.privacy.title': 'Politique de confidentialité — Thibaud Pagès',
    'meta.privacy.description': "Politique de confidentialité conforme au RGPD.",
  },
  en: {
    // Navigation
    'nav.projects': 'PROJECTS',
    'nav.about': 'ABOUT ME',
    'nav.contact': 'CONTACT',
    // Page home
    'home.sub': 'Design & Illustration',
    // Filtres projets
    'filter.all': 'All',
    'filter.Identity': 'Identity',
    'filter.Print': 'Print',
    'filter.Illustration': 'Illustration',
    'filter.Edition': 'Edition',
    'filter.Web': 'Web',
    // Footer
    'footer.location': 'Created by yours truly in 2026',
    'footer.legal': 'Legal notice',
    'footer.privacy': 'Privacy',
    // Modal projet
    'modal.close': 'Close',
    'modal.prev': 'Previous image',
    'modal.next': 'Next image',
    'modal.imageN': 'Image {n}',
    // Bouton de langue
    'lang.toggle': 'FR',
    'lang.htmlAttr': 'en',
    // Meta SEO par page
    'meta.index.title': 'Thibaud Pagès — Design & illustration',
    'meta.index.description': 'Portfolio of Thibaud Pagès, graphic designer and illustrator based in the Lake Geneva basin.',
    'meta.projets.title': 'Projects — Thibaud Pagès',
    'meta.projets.description': 'Graphic design and illustration projects by Thibaud Pagès.',
    'meta.about.title': 'About — Thibaud Pagès',
    'meta.about.description': 'About Thibaud Pagès, independent graphic designer and illustrator.',
    'meta.contact.title': 'Contact — Thibaud Pagès',
    'meta.contact.description': 'Contact Thibaud Pagès for your graphic design and illustration projects.',
    'meta.legal.title': 'Legal notice — Thibaud Pagès',
    'meta.legal.description': "Legal notice for thibaudpages.com.",
    'meta.privacy.title': 'Privacy policy — Thibaud Pagès',
    'meta.privacy.description': "Privacy policy compliant with GDPR.",
  }
};

const LANG_STORAGE_KEY = 'tp_lang';

// Détecte la langue à utiliser :
// 1. localStorage (choix utilisateur précédent)
// 2. langue du navigateur (FR → 'fr', sinon 'en')
// 3. FR par défaut
function detectInitialLang() {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'fr' || stored === 'en') return stored;
  } catch (e) { /* localStorage indisponible */ }

  const navLang = (navigator.language || navigator.userLanguage || 'fr').toLowerCase();
  return navLang.startsWith('fr') ? 'fr' : 'en';
}

// Langue active (initialisée au chargement)
let CURRENT_LANG = detectInitialLang();

function getCurrentLang() {
  return CURRENT_LANG;
}

// Récupère une traduction par clé. Si manquante, fallback FR puis clé brute.
function t(key, vars) {
  const dict = I18N[CURRENT_LANG] || I18N.fr;
  let str = dict[key] || I18N.fr[key] || key;
  if (vars) {
    Object.keys(vars).forEach(k => {
      str = str.replace('{' + k + '}', vars[k]);
    });
  }
  return str;
}
// Expose pour usage depuis home.js
window.t = t;
window.getCurrentLang = getCurrentLang;

// Renvoie le champ d'un objet localisé (ex: project.title vs project.titleEn)
function localized(obj, baseKey) {
  if (!obj) return '';
  if (CURRENT_LANG === 'en') {
    const enKey = baseKey + 'En';
    if (obj[enKey] != null && obj[enKey] !== '') return obj[enKey];
  }
  return obj[baseKey] || '';
}

// Change la langue active, persiste le choix, et re-render tout le site
function setLang(lang) {
  if (lang !== 'fr' && lang !== 'en') return;
  if (lang === CURRENT_LANG) return;

  CURRENT_LANG = lang;
  try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) {}

  // Met à jour <html lang="...">
  document.documentElement.lang = t('lang.htmlAttr');

  // Met à jour les meta SEO selon la page courante
  updatePageMeta();

  // Fade out → swap contenu → fade in. La classe .lang-anim active la
  // transition sur opacity ; .lang-switching impose opacity: 0. En les
  // togglant à des moments différents, on obtient un fade symétrique.
  const main = document.getElementById('page-content');
  const targets = [main, document.querySelector('nav')];

  const FADE_DURATION = 280; // doit matcher .lang-anim dans style.css

  // 1. Active la transition, puis déclenche le fade-out (rAF pour que le
  //    navigateur commit l'état "transition active, opacity 1" avant de
  //    passer à opacity 0 — sinon le fade-out joue pas).
  targets.forEach(el => { if (el) el.classList.add('lang-anim'); });
  requestAnimationFrame(() => {
    targets.forEach(el => { if (el) el.classList.add('lang-switching'); });
  });

  setTimeout(() => {
    // Re-render tout (pendant que c'est invisible)
    renderNav();
    renderProjects(CONFIG.projects);
    renderFilters();
    renderAbout();
    renderContact();
    renderFooter();
    initFilters();
    initProjectModal();

    // Si on est sur la home, le sub-name est dans le HTML injecté par home.js
    if (document.body.classList.contains('page-home') && typeof window.initHomeTitle === 'function') {
      window.initHomeTitle(true);  // skip animation
      // re-fait apparaître le titre sans animation d'entrée
      const homeName = document.getElementById('home-name');
      if (homeName) homeName.classList.add('visible');
    }

    // Met à jour le bouton de toggle dans la nav
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = t('lang.toggle');

    // 2. Déclenche le fade-in en retirant .lang-switching (la transition
    //    .lang-anim est toujours active, donc opacity passe de 0 à 1 en douceur).
    targets.forEach(el => { if (el) el.classList.remove('lang-switching'); });

    // 3. Une fois le fade-in terminé, retire .lang-anim pour libérer la
    //    transition (évite tout effet de bord sur d'autres changements
    //    d'opacity ultérieurs, ex : pjax).
    setTimeout(() => {
      targets.forEach(el => { if (el) el.classList.remove('lang-anim'); });
    }, FADE_DURATION + 20);
  }, FADE_DURATION);
}

// Met à jour le <title> et meta description selon la page courante
function updatePageMeta() {
  let pageKey = 'index';
  if (document.body.classList.contains('page-projects')) pageKey = 'projets';
  else if (document.body.classList.contains('page-about')) pageKey = 'about';
  else if (document.body.classList.contains('page-contact')) pageKey = 'contact';
  else if (document.body.classList.contains('page-legal')) {
    // Distingue mentions légales vs confidentialité via l'URL
    pageKey = window.location.pathname.includes('confidentialite') ? 'privacy' : 'legal';
  }

  document.title = t('meta.' + pageKey + '.title');
  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.setAttribute('content', t('meta.' + pageKey + '.description'));
}

// Initialise la langue au chargement (et met à jour les attributs)
function initLang() {
  document.documentElement.lang = t('lang.htmlAttr');
  updatePageMeta();
}

// Wire up le bouton FR/EN de la nav (le DOM persiste à travers pjax,
// mais on rebinde pour être safe en cas de re-render éventuel)
function initLangButton() {
  const btn = document.getElementById('lang-btn');
  if (!btn) return;
  // Évite de double-binder
  if (btn.dataset.initialized === '1') {
    // Met juste le texte à jour (au cas où la langue ait changé)
    btn.textContent = t('lang.toggle');
    return;
  }
  btn.dataset.initialized = '1';
  btn.textContent = t('lang.toggle');
  btn.addEventListener('click', () => {
    setLang(getCurrentLang() === 'fr' ? 'en' : 'fr');
  });
}

// ──────────────────────────────────────────────────────────────
//  Mini converter Markdown → HTML
//  Gère : **gras**, *italique*, [texte](url), - listes, \n\n paragraphes
//  Échappe les autres caractères pour éviter les injections HTML
// ──────────────────────────────────────────────────────────────
function escapeHTML(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function mdToHTML(md) {
  if (!md || typeof md !== 'string') return '';
  var html = escapeHTML(md);

  // Liens : [texte](url) — on doit ré-déséchapper les URLs
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, function(_, txt, url) {
    return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + txt + '</a>';
  });

  // Gras : **texte**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Italique : *texte* (mais pas s'il y a déjà été matché par gras — regex sûre)
  html = html.replace(/(?:^|[^*])\*([^*\n]+)\*(?!\*)/g, function(match, content) {
    var prefix = match.startsWith('*') ? '' : match[0];
    return prefix + '<em>' + content + '</em>';
  });

  // Listes : lignes qui commencent par "- "
  html = html.replace(/(?:^|\n)(- .+(?:\n- .+)*)/g, function(_, block) {
    var items = block.trim().split('\n').map(function(line) {
      return '<li>' + line.replace(/^- /, '') + '</li>';
    }).join('');
    return '\n<ul>' + items + '</ul>';
  });

  // Paragraphes : doubles sauts de ligne
  html = html.split(/\n\n+/).map(function(para) {
    para = para.trim();
    if (!para) return '';
    if (para.startsWith('<ul>') || para.startsWith('<ol>')) return para;
    // Single line breaks → <br>
    return '<p>' + para.replace(/\n/g, '<br>') + '</p>';
  }).join('');

  return html;
}

// ════════════════════════════════════════════════════════════
// CHARGEMENT DES PROJETS DEPUIS LE CMS (data/projets.json)
// ════════════════════════════════════════════════════════════
// Le JSON est édité via Decap CMS (/admin/). On le fetch au
// démarrage et on l'injecte dans CONFIG.projects en adaptant
// le format pour qu'il matche l'ancienne structure de config.js.
async function loadProjectsFromCMS() {
  try {
    const response = await fetch('data/projets.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('projets.json introuvable');
    const data = await response.json();
    if (!data || !Array.isArray(data.projects)) {
      throw new Error('Format projets.json invalide');
    }

    CONFIG.projects = data.projects.map(p => {
      const normalized = {
        title: p.title,
        titleEn: p.titleEn,
        cat: p.cat,
        year: p.year,
        image: p.image,
        crop: {
          zoom: p.cropZoom != null ? p.cropZoom : 1.1,
          x:    p.cropX    != null ? p.cropX    : 50,
          y:    p.cropY    != null ? p.cropY    : 50,
        },
        href: p.href || '#',
        details: {
          description:   p.description   || '',
          descriptionEn: p.descriptionEn || '',
        },
      };

      // Galerie : Decap stocke chaque item comme { media: "chemin" },
      // on aplatit en strings pour rester compat avec l'ancien format.
      if (Array.isArray(p.images) && p.images.length > 0) {
        normalized.details.images = p.images
          .map(item => (typeof item === 'string' ? item : item.media))
          .filter(Boolean);
      }

      // Reader interactif (livre feuilletable). Optionnel.
      // Decap peut stocker le chemin sous différentes formes selon que tu
      // l'as tapé à la main ou sélectionné via la media library :
      //   - "public/images/projects/hopi/HopiReader.html"  (relatif)
      //   - "/public/images/projects/hopi/HopiReader.html" (absolu site)
      //   - "https://..."                                  (URL externe)
      // On normalise en chemin relatif (sans slash initial) pour que ça
      // marche peu importe la page d'origine (avec pjax, l'URL courante
      // peut être /projets.html, donc un slash initial est plus sûr).
      if (p.reader && p.reader.url) {
        let readerUrl = String(p.reader.url).trim();
        // URL externe → on laisse tel quel
        if (!/^https?:\/\//i.test(readerUrl)) {
          // Force un slash initial pour que ça résolve depuis la racine
          // du site, indépendamment de l'URL courante.
          if (!readerUrl.startsWith('/')) readerUrl = '/' + readerUrl;
        }
        normalized.details.reader = readerUrl;
        if (typeof p.reader.ratio === 'number' && p.reader.ratio > 0) {
          normalized.details.readerRatio = p.reader.ratio;
        }
      }

      return normalized;
    });

    console.log(`✓ ${CONFIG.projects.length} projets chargés depuis le CMS`);
  } catch (err) {
    console.warn('Chargement projets CMS échoué, fallback config.js :', err);
    // Fallback : on garde CONFIG.projects tel que défini dans config.js
    // (utile si le fetch échoue ou si on ouvre le site en file:// local)
  }
}

/* ============================================================
   ── PRÉCHARGEMENT INTELLIGENT DES IMAGES ────────────────────
   Évite les flashs blancs à l'ouverture des modals et améliore
   l'expérience perçue, sans surcharger le chargement initial.
   ============================================================ */

// Cache des URLs déjà préchargées (évite les doublons)
const _preloadedImages = new Set();

// Précharge une URL d'image (ou vidéo) en arrière-plan
function preloadMedia(url) {
  if (!url || _preloadedImages.has(url)) return;
  _preloadedImages.add(url);

  // Vidéos : on précharge juste les métadonnées (poster + premier frame)
  // pour ne pas exploser la bande passante
  if (/\.(mp4|webm|mov)$/i.test(url)) {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = url;
    return;
  }

  // Images : on les place dans le cache du navigateur via new Image()
  const img = new Image();
  img.decoding = 'async';
  img.src = url;
}

// Précharge plusieurs URLs en série (pour ne pas saturer la connexion)
function preloadMediaList(urls) {
  urls.forEach(url => preloadMedia(url));
}

// Détecte la qualité de connexion via Network Information API.
// Retourne le nombre de cards à précharger immédiatement.
function getPreloadBudget() {
  const conn = navigator.connection
    || navigator.mozConnection
    || navigator.webkitConnection;

  // Pas d'API dispo (Safari, Firefox sur iOS) → on suppose connexion correcte
  if (!conn) return 12;

  // Mode économie de données → strict minimum
  if (conn.saveData) return 3;

  // Adapte selon la qualité estimée de la connexion
  switch (conn.effectiveType) {
    case 'slow-2g': return 2;
    case '2g':      return 4;
    case '3g':      return 8;
    case '4g':      return 16;
    default:        return 12;
  }
}

// Précharge les images des cards de la grille selon le budget connexion.
// À appeler APRÈS renderProjects().
function preloadGridImages() {
  if (!Array.isArray(CONFIG.projects)) return;
  const budget = getPreloadBudget();

  // Les N premières : préchargement immédiat (au-dessus de la ligne de flottaison)
  const immediate = CONFIG.projects.slice(0, budget);
  immediate.forEach(p => {
    if (p.image) preloadMedia(p.image);
  });

  // Les suivantes : préchargement différé en arrière-plan, sans pression
  // sur le réseau (via requestIdleCallback si dispo, sinon setTimeout)
  const deferred = CONFIG.projects.slice(budget);
  const scheduleIdle = window.requestIdleCallback
    || (cb => setTimeout(cb, 1500));

  deferred.forEach((p, i) => {
    scheduleIdle(() => {
      if (p.image) preloadMedia(p.image);
    }, { timeout: 5000 + i * 200 });
  });
}

// Précharge toutes les images d'un projet (pour le modal).
// Appelé au survol/touch d'une card → quand l'utilisateur clique
// quelques centaines de ms plus tard, tout est déjà en cache.
function preloadProjectModal(projectIndex) {
  const project = CONFIG.projects[projectIndex];
  if (!project) return;

  const details = project.details || {};
  const images = details.images || (project.image ? [project.image] : []);
  preloadMediaList(images);
}

// Attache les écouteurs de préchargement sur les cards de la grille.
// À appeler APRÈS renderProjects() (les cards doivent exister dans le DOM).
function bindCardPreload() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const idx = parseInt(card.dataset.index, 10);
    if (isNaN(idx)) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      preloadProjectModal(idx);
    };

    // Desktop : déclenche au survol (le délai entre hover et clic est
    // largement suffisant pour charger les images)
    card.addEventListener('mouseenter', trigger, { passive: true });

    // Mobile : déclenche au touchstart (le tap dure ~100-200ms, on a
    // le temps de commencer le téléchargement avant l'ouverture du modal)
    card.addEventListener('touchstart', trigger, { passive: true });

    // Sécurité : aussi au focus clavier (accessibilité)
    card.addEventListener('focus', trigger, { passive: true });
  });
}

// Expose pour debug / usage externe éventuel
window._preloadStats = () => ({
  preloaded: _preloadedImages.size,
  budget: getPreloadBudget(),
  connection: navigator.connection ? {
    effectiveType: navigator.connection.effectiveType,
    saveData: navigator.connection.saveData,
    downlink: navigator.connection.downlink,
  } : 'unavailable'
});

document.addEventListener('DOMContentLoaded', async () => {

  // Init i18n (lang, title, meta) avant tout rendu
  initLang();

  // ⚠️ Charge les projets depuis le CMS AVANT le premier render
  await loadProjectsFromCMS();

  // Rendu commun (ne plante jamais : chaque renderer vérifie l'existence)
  renderNav();
  renderThemes();
  renderProjects(CONFIG.projects);
  renderFilters();
  renderAbout();
  renderContact();
  renderFooter();

  // Curseur custom (présent sur toutes les pages)
  initCursor();

  // Pot de peinture (présent sur toutes les pages)
  initPaintPot();

  // Lecteur de musique (présent sur toutes les pages, persiste via pjax)
  initMusicPlayer();

  // Filtres (uniquement si présents)
  initFilters();

  // Modal projet (uniquement si présent)
  initProjectModal();

  // Bouton de langue dans la nav
  initLangButton();

  // Singe animé (page contact uniquement, géré en interne)
  initContactSinge();
});

// Quand on change de page via pjax (sans rechargement),
// on re-rend les éléments qui dépendent du contenu fraîchement injecté.
document.addEventListener('pjax:loaded', e => {
  // Mise à jour des meta SEO selon la nouvelle page
  updatePageMeta();

  renderNav();
  renderProjects(CONFIG.projects);
  renderFilters();
  renderAbout();
  renderContact();
  renderFooter();
  initFilters();
  initProjectModal();
  initLangButton();
  initContactSinge();

  // Re-bind le curseur custom pour les éléments fraîchement injectés
  // (about-text, contact-sections, etc.) et reset l'état .hov au cas où
  // un élément hoverable aurait été détruit pendant l'animation pjax.
  bindCursorHover();

  // Si on arrive sur la page d'accueil, on relance la logique du titre.
  // Si pjax demande de skip l'animation d'entrée (cas de l'animation
  // inverse nav → titre central), on prépare juste le titre sans le
  // faire apparaître ; pjax.js lancera l'animation inverse ensuite.
  if (document.body.classList.contains('page-home')) {
    if (typeof window.initHomeTitle === 'function') {
      const skipEntry = e && e.detail && e.detail.skipHomeEntryAnimation === true;
      window.initHomeTitle(skipEntry);
    }
  }
});


/* ============================================================
   ── CURSEUR ─────────────────────────────────────────────────
   ============================================================ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  bindCursorHover();
}

function bindCursorHover() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  // Reset l'état hover au démarrage : si on a swap des éléments hoverables
  // via pjax pendant que la souris était dessus, leur mouseleave n'a jamais
  // été déclenché et le curseur reste bloqué en mode hov.
  cursor.classList.remove('hov');

  const SELECTOR = '.project-card, .nav-links a, .about-lang-toggle, .nav-brand a, .filter-item, .paint-btn, .swatch, .music-btn, .lang-btn, .contact-email, .project-modal-close';

  document.querySelectorAll(SELECTOR).forEach(el => {
    // Évite d'attacher deux fois les mêmes listeners (au cas où l'élément
    // persiste à travers pjax — nav, music-btn, paint-btn, etc.)
    if (el.dataset.cursorBound === '1') return;
    el.dataset.cursorBound = '1';
    el.addEventListener('mouseenter', () => cursor.classList.add('hov'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hov'));
  });
}


/* ============================================================
   ── CRÉNAGE MANUEL ──────────────────────────────────────────
   Outfit a un kerning automatique insuffisant à grande échelle
   sur les paires autour du A (BA, AU, PA, AG). Cette fonction
   entoure les lettres concernées de spans pour qu'on puisse
   les resserrer en CSS via .kern-ba, .kern-pa, etc.
   ============================================================ */
function applyManualKerning(text) {
  const upper = text.toUpperCase();

  const safe = upper
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  let out = '';
  for (let i = 0; i < safe.length; i++) {
    const prev = safe[i - 1];
    const curr = safe[i];
    const next = safe[i + 1];

    if (curr === 'A') {
      const classes = [];
      if (prev === 'B') classes.push('kern-ba');
      if (prev === 'P') classes.push('kern-pa');
      if (next === 'U') classes.push('kern-au');
      if (next === 'G') classes.push('kern-ag');

      if (classes.length > 0) {
        out += '<span class="' + classes.join(' ') + '">A</span>';
      } else {
        out += 'A';
      }
    } else {
      out += curr;
    }
  }

  return out;
}

// Expose pour home.js
window.applyManualKerning = applyManualKerning;


/* ============================================================
   ── NAVIGATION ──────────────────────────────────────────────
   ============================================================ */
function renderNav() {
  const brand = document.querySelector('.brand-full');
  if (brand) {
    brand.innerHTML = applyManualKerning(CONFIG.name);

    if (sessionStorage.getItem('skipBrandFadeIn') === '1') {
      sessionStorage.removeItem('skipBrandFadeIn');
      const prevTransition = brand.style.transition;
      brand.style.transition = 'none';
      brand.style.opacity = '1';
      brand.style.visibility = 'visible';
      requestAnimationFrame(() => {
        brand.style.transition = prevTransition;
      });
    }
  }

  const links = document.getElementById('nav-links');
  if (!links) return;

  // Mapping : href du lien → clé de traduction du label
  const navLabelKeys = {
    'projets.html': 'nav.projects',
    'about.html': 'nav.about',
    'contact.html': 'nav.contact',
  };

  links.innerHTML = CONFIG.nav.map(n => {
    const key = navLabelKeys[n.href] || null;
    const label = key ? t(key) : n.label;
    return `<a href="${n.href}">${label}</a>`;
  }).join('');

  // Brand suffix (texte italique à droite du nom dans la nav)
  const suffix = document.getElementById('brand-suffix');
  if (suffix) {
    const path = window.location.pathname;
    let suffixText = '';
    if (path.endsWith('about.html') && CONFIG.about) {
      suffixText = localized(CONFIG.about, 'suffix');
    } else if (path.endsWith('contact.html') && CONFIG.contact) {
      suffixText = localized(CONFIG.contact, 'suffix');
    }
    animateSuffixChange(suffix, suffixText);
  }
}

/* ── Animation du brand-suffix ────────────────────────────── */
// Cycle complet : sortie de l'ancien texte (fade-out + slide-left)
// puis entrée du nouveau (fade-in + slide-right depuis la gauche).
function animateSuffixChange(suffix, newText) {
  const wasVisible = suffix.classList.contains('visible');
  const currentText = suffix.textContent;

  // Si le texte ne change pas et est déjà visible, on ne fait rien
  if (currentText === newText && wasVisible) return;

  if (wasVisible && currentText) {
    // Phase 1 : sortie de l'ancien suffix
    suffix.classList.remove('visible');
    suffix.classList.add('leaving');

    setTimeout(() => {
      suffix.classList.remove('leaving');
      updateSuffix(suffix, newText);
    }, 400);
  } else {
    // Pas de suffix précédent : on entre directement
    updateSuffix(suffix, newText);
  }
}

function updateSuffix(suffix, newText) {
  if (!newText) {
    suffix.textContent = '';
    suffix.style.display = 'none';
    suffix.classList.remove('visible', 'leaving');
    return;
  }

  suffix.textContent = newText;
  suffix.style.display = 'inline-block';
  suffix.classList.remove('visible', 'leaving');

  // Double rAF pour garantir que l'état initial (opacity 0, translateX -12px)
  // est commit AVANT qu'on déclenche l'animation vers visible
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      suffix.classList.add('visible');
    });
  });
}


/* ============================================================
   ── PAGE ABOUT ──────────────────────────────────────────────
   ============================================================ */
function renderAbout() {
  const imageEl = document.getElementById('about-image');
  const textElFr = document.getElementById('about-text-fr');
  const textElEn = document.getElementById('about-text-en');
  if (!imageEl || !textElFr || !CONFIG.about) return;

  if (CONFIG.about.image) {
    imageEl.innerHTML = `<img src="${CONFIG.about.image}" alt="Portrait de Thibaud Pagès, graphiste et illustrateur freelance">`;
  } else {
    imageEl.innerHTML = '';
  }

  // Helper : transforme un item (string OU objet {text, spacer}) en <p>.
  // Si l'item est un objet avec spacer: true, on ajoute la classe is-spacer
  // qui ajoute un gros saut de ligne AVANT le paragraphe (géré en CSS).
  function paragraphToHTML(item) {
    if (typeof item === 'string') {
      return `<p>${item}</p>`;
    }
    if (item && typeof item === 'object' && typeof item.text === 'string') {
      const cls = item.spacer ? ' class="is-spacer"' : '';
      return `<p${cls}>${item.text}</p>`;
    }
    return '';
  }

  textElFr.innerHTML = CONFIG.about.paragraphs.map(paragraphToHTML).join('');
  if (textElEn && CONFIG.about.paragraphsEn) {
    textElEn.innerHTML = CONFIG.about.paragraphsEn.map(paragraphToHTML).join('');
  }

  // La langue est pilotée par le toggle global de la nav : on applique
  // la classe lang-en sur le layout selon la langue active.
  const layout = document.querySelector('.about-layout');
  if (layout) {
    if (getCurrentLang() === 'en') layout.classList.add('lang-en');
    else layout.classList.remove('lang-en');
  }
}


/* ============================================================
   ── PAGE CONTACT ────────────────────────────────────────────
   ============================================================ */
function renderContact() {
  const headlineEl = document.getElementById('contact-headline');
  const sectionsEl = document.getElementById('contact-sections');
  if (!headlineEl || !sectionsEl || !CONFIG.contact) return;

  headlineEl.innerHTML = localized(CONFIG.contact, 'headline');

  sectionsEl.innerHTML = CONFIG.contact.sections.map(s => {
    const isLink = !!s.link;
    const href = isLink ? s.link : `mailto:${s.email}`;
    const label = isLink ? (s.linkLabel || s.link) : s.email;
    const targetAttr = isLink ? ' target="_blank" rel="noopener"' : '';
    const title = localized(s, 'title');
    const subtitle = localized(s, 'subtitle');
    return `
      <div class="contact-section">
        <div class="contact-section-title">${title}</div>
        ${subtitle ? `<div class="contact-section-subtitle">${subtitle}</div>` : ''}
        <a class="contact-email" href="${href}"${targetAttr}>${label}</a>
      </div>
    `;
  }).join('');
}


/* ============================================================
   ── POT DE PEINTURE ─────────────────────────────────────────
   ============================================================ */
function initPaintPot() {
  const paintBtn = document.getElementById('paint-btn');
  const tray     = document.getElementById('paint-tray');
  const wrap     = document.getElementById('paint-wrap');
  if (!paintBtn || !tray || !wrap) return;

  paintBtn.addEventListener('click', e => {
    e.stopPropagation();
    tray.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!wrap.contains(e.target)) tray.classList.remove('open');
  });
}

function renderThemes() {
  const tray = document.getElementById('paint-tray');
  if (!tray) return;

  tray.innerHTML = '';

  const prefersDark = window.matchMedia &&
                      window.matchMedia('(prefers-color-scheme: dark)').matches;

  let defaultTheme = CONFIG.themes.find(t =>
    prefersDark ? t.defaultDark : t.defaultLight
  );
  if (!defaultTheme) {
    defaultTheme = CONFIG.themes.find(t => t.active) || CONFIG.themes[0];
  }

  CONFIG.themes.forEach(theme => {
    const sw = document.createElement('div');
    sw.className = 'swatch';
    sw.style.background = theme.swatch;
    sw.title = theme.label;
    sw.addEventListener('click', () => applyTheme(theme, sw));
    tray.appendChild(sw);
    if (theme === defaultTheme) applyTheme(theme, sw);
  });
}

function applyTheme(theme, swatchEl) {
  const r = document.documentElement.style;
  r.setProperty('--bg',     theme.bg);
  r.setProperty('--fg',     theme.fg);
  r.setProperty('--border', theme.border);
  r.setProperty('--mid',    theme.mid);
  r.setProperty('--card',   theme.card);

  const cursor = document.getElementById('cursor');
  if (cursor) cursor.style.background = theme.fg;

  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  if (swatchEl) swatchEl.classList.add('active');

  // Mémorise la palette courante et la pousse vers l'éventuel reader iframe
  window.__currentTheme = theme;
  syncThemeToReader();
}

// Envoie la palette courante à toute iframe de reader ouverte
function syncThemeToReader() {
  const theme = window.__currentTheme;
  if (!theme) return;
  document.querySelectorAll('.project-modal-reader iframe').forEach(f => {
    try {
      f.contentWindow.postMessage({ type: 'theme', fg: theme.fg, bg: theme.bg }, '*');
    } catch (_) {}
  });
}

// Quand le reader iframe signale qu'il est prêt, on lui envoie la palette
window.addEventListener('message', e => {
  if (e.data && e.data.type === 'reader-ready') syncThemeToReader();
});


/* ============================================================
   ── PROJETS (grille + cards) ────────────────────────────────
   ============================================================ */
function renderProjects(projects) {
  const grid = document.getElementById('grid');
  if (!grid) return;

  grid.innerHTML = projects.map((p, i) => {
    const title = localized(p, 'title');
    const cat = t('filter.' + p.cat);  // catégorie traduite

    let imgContent;
    if (p.image && /\.(mp4|webm|mov)$/i.test(p.image)) {
      imgContent = `<video src="${p.image}" muted loop playsinline preload="metadata"></video>`;
    } else if (p.image) {
      imgContent = `<img src="${p.image}" alt="${title}" loading="lazy">`;
    } else {
      imgContent = `<span>${p.placeholder || ''}</span>`;
    }

    const crop = p.crop || { zoom: 1, x: 50, y: 50 };
    const cardStyle = `--zoom: ${crop.zoom}; --crop-x: ${crop.x}%; --crop-y: ${crop.y}%;${p.color ? ` background:${p.color};` : ''}`;

    return `
      <a class="project-card" href="${p.href}" data-cat="${p.cat}" data-index="${i}" style="${cardStyle}">
        <div class="card-img">${imgContent}</div>
        <div class="card-body">
          <div class="card-cat">${cat}</div>
          <div class="card-title">${title}</div>
          <div class="card-year">${p.year}</div>
        </div>
      </a>`;
  }).join('');

  // Intercepte les clics pour ouvrir le modal
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      const idx = parseInt(card.dataset.index, 10);
      openProjectModal(idx, card);
    });
  });

  // Force un reflow (résout un bug de timing avec aspect-ratio + pjax)
  void grid.offsetHeight;

  bindCursorHover();
  bindVideoHover();
  bindCardPreload();    // ← attache les écouteurs hover/touch pour précharger les modals
  preloadGridImages();  // ← précharge les images des cards selon connexion
}

function bindVideoHover() {
  document.querySelectorAll('.project-card video').forEach(video => {
    const card = video.closest('.project-card');
    if (!card) return;
    card.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });
    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}


/* ============================================================
   ── FILTRES ─────────────────────────────────────────────────
   ============================================================ */
function renderFilters() {
  const wrap = document.getElementById('filter');
  if (!wrap) return;
  // Les valeurs canoniques de CONFIG.filters (Identity, Print...) sont
  // conservées dans data-cat, mais on affiche un label traduit.
  wrap.innerHTML = CONFIG.filters.map((f, i) => {
    const label = (f === 'All') ? t('filter.all') : t('filter.' + f);
    return `<span class="filter-item${i === 0 ? ' active' : ''}" data-cat="${f}">${label}</span>`;
  }).join('');
}

function initFilters() {
  const filter = document.getElementById('filter');
  if (!filter) return;

  filter.addEventListener('click', e => {
    const item = e.target.closest('.filter-item');
    if (!item) return;
    document.querySelectorAll('.filter-item').forEach(f => f.classList.remove('active'));
    item.classList.add('active');
    filterProjects(item.dataset.cat);
  });
}

function filterProjects(cat) {
  // Le premier filtre de CONFIG.filters est toujours "tout afficher"
  const showAll = CONFIG.filters && cat === CONFIG.filters[0];
  document.querySelectorAll('.project-card').forEach(card => {
    if (showAll || card.dataset.cat === cat) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}


/* ============================================================
   ── MODAL PROJET ────────────────────────────────────────────
   ============================================================ */
function openProjectModal(projectIndex, sourceCard) {
  const project = CONFIG.projects[projectIndex];
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const inner = document.getElementById('project-modal-inner');
  const content = modal && modal.querySelector('.project-modal-content');
  if (!modal || !inner || !content) return;

  const details = project.details || {};
  const images = details.images || (project.image ? [project.image] : []);

  // Champs localisés selon la langue active du site
  const title = localized(project, 'title');
  const cat = t('filter.' + project.cat);
  const desc = localized(details, 'description');

  const descBlock = desc ? `<div class="project-modal-description">${mdToHTML(desc)}</div>` : '';

  // Si le projet a un "reader" (lecteur de livre interactif), on l'affiche
  // dans une iframe à la place de la galerie d'images classique.
  if (details.reader) {
    inner.innerHTML = `
      <div class="project-modal-cat">${cat}</div>
      <h2 class="project-modal-title">${title}</h2>
      <div class="project-modal-year">${project.year}</div>
      ${descBlock}
      <div class="project-modal-reader">
        <iframe src="${details.reader}" title="${title}" allowfullscreen></iframe>
      </div>
    `;
  } else {
    inner.innerHTML = `
      <div class="project-modal-cat">${cat}</div>
      <h2 class="project-modal-title">${title}</h2>
      <div class="project-modal-year">${project.year}</div>
      ${descBlock}
      <div class="project-modal-images">
        <div class="carousel-track">
          ${images.map((src, i) => {
            if (/\.(mp4|webm|mov)$/i.test(src)) {
              return `<div class="carousel-slide${i === 0 ? ' active' : ''}"><video src="${src}" controls muted loop playsinline></video></div>`;
            }
            return `<div class="carousel-slide${i === 0 ? ' active' : ''}"><img src="${src}" alt="${title}"></div>`;
          }).join('')}
        </div>
        ${images.length > 1 ? `
          <div class="carousel-controls">
            <button class="carousel-arrow carousel-prev" type="button" aria-label="${t('modal.prev')}">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M13 3L6 10L13 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="carousel-dots">
              ${images.map((_, i) => `<button class="carousel-dot${i === 0 ? ' active' : ''}" type="button" aria-label="${t('modal.imageN', { n: i + 1 })}"></button>`).join('')}
            </div>
            <button class="carousel-arrow carousel-next" type="button" aria-label="${t('modal.next')}">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M7 3L14 10L7 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  // Calcule l'origine de l'animation depuis la card cliquée
  if (sourceCard) {
    const cardRect = sourceCard.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    const originX = (cardCenterX / window.innerWidth) * 100;
    const originY = (cardCenterY / window.innerHeight) * 100;
    content.style.transformOrigin = `${originX}% ${originY}%`;
  } else {
    content.style.transformOrigin = '50% 50%';
  }

  // Compense la disparition de la scrollbar pour éviter le shift de page
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = scrollbarWidth + 'px';

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  // Initialise le carrousel si présent
  initCarousel(inner);
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  document.body.style.paddingRight = '';
}

// ────────────────────────────────────────────────────────────
// CARROUSEL D'IMAGES DANS LA MODAL PROJET
// ────────────────────────────────────────────────────────────
function initCarousel(container) {
  const slides = container.querySelectorAll('.carousel-slide');
  const dots = container.querySelectorAll('.carousel-dot');
  const prevBtn = container.querySelector('.carousel-prev');
  const nextBtn = container.querySelector('.carousel-next');

  if (slides.length <= 1) return; // pas de carrousel pour une seule image

  let current = 0;

  function goTo(index) {
    // Boucle
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');

    current = index;

    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');

    // Pause les vidéos non actives, play la vidéo active
    slides.forEach((slide, i) => {
      const video = slide.querySelector('video');
      if (video) {
        if (i === current) { video.currentTime = 0; video.play().catch(() => {}); }
        else { video.pause(); }
      }
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Support clavier (flèches gauche/droite quand la modal est ouverte)
  container._carouselKeyHandler = (e) => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  };
  document.addEventListener('keydown', container._carouselKeyHandler);
}

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  if (modal.dataset.initialized === '1') return;
  modal.dataset.initialized = '1';

  // Fermeture via bouton X
  const closeBtn = modal.querySelector('.project-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);

  // Fermeture via clic sur le backdrop
  const backdrop = modal.querySelector('.project-modal-backdrop');
  if (backdrop) backdrop.addEventListener('click', closeProjectModal);

  // Fermeture via touche Échap
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeProjectModal();
    }
  });
}


/* ============================================================
   ── FOOTER ──────────────────────────────────────────────────
   ============================================================ */
function renderFooter() {
  const loc = document.getElementById('footer-location');
  const url = document.getElementById('footer-url');
  if (loc) loc.textContent = t('footer.location');
  if (url) {
    url.textContent = CONFIG.url;
    url.href = 'https://' + CONFIG.url;
  }

  // Ajoute les liens légaux dans tous les footers
  // (sauf s'ils sont déjà présents — évite la duplication au re-render i18n)
  document.querySelectorAll('footer').forEach(footer => {
    if (footer.querySelector('.footer-legal')) return;

    const legal = document.createElement('span');
    legal.className = 'footer-legal';
    legal.innerHTML = ' · <a href="mentions-legales.html">' + t('footer.legal') + '</a> · <a href="confidentialite.html">' + t('footer.privacy') + '</a>';
    footer.appendChild(legal);
  });
}


/* ============================================================
   ── LECTEUR DE MUSIQUE ──────────────────────────────────────
   La nav et le bouton musique vivent en dehors de #page-content,
   donc ils persistent à travers les changements de page pjax.
   La musique continue donc naturellement entre les pages.
   ============================================================ */
function initMusicPlayer() {
  const btn   = document.getElementById('music-btn');
  const audio = document.getElementById('music-audio');
  const label = document.getElementById('music-label');

  if (!btn || !audio || !label || !CONFIG.music) return;

  // Évite la double-initialisation si jamais la fonction est rappelée
  if (btn.dataset.initialized === '1') return;
  btn.dataset.initialized = '1';

  audio.src = CONFIG.music.file;

  label.innerHTML = `<span class="music-label-artist">${CONFIG.music.artist}</span><span class="music-label-sep">—</span>${CONFIG.music.title}`;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(err => {
        console.warn('Lecture musique impossible :', err);
      });
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', () => {
    btn.classList.add('playing');
    btn.setAttribute('title', 'Mettre en pause');
    label.classList.add('visible');
  });

  audio.addEventListener('pause', () => {
    btn.classList.remove('playing');
    btn.setAttribute('title', 'Lancer la musique');
    label.classList.remove('visible');
  });

  audio.addEventListener('ended', () => {
    btn.classList.remove('playing');
    label.classList.remove('visible');
  });
}

// Cache le curseur parent quand la souris entre dans l'iframe du reader
document.addEventListener('mouseover', e => {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;
  if (e.target.closest('.project-modal-reader')) {
    cursor.style.opacity = '0';
  }
});
document.addEventListener('mouseout', e => {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;
  if (e.target.closest('.project-modal-reader')) {
    cursor.style.opacity = '1';
  }
});

// ────────────────────────────────────────────────────────────
// SINGE ANIMÉ (page contact) — boucle avec délai initial + pause
// 5s avant le premier passage, puis cycle :
//   visible (durée de l'animation) → caché 10s → visible → ...
// ────────────────────────────────────────────────────────────
const CONTACT_SINGE_DELAY_INITIAL = 5000;  // attente avant la 1ère apparition
const CONTACT_SINGE_DURATION      = 6000;  // durée d'un passage complet (~36 frames à 6fps)
const CONTACT_SINGE_PAUSE         = 6000;  // pause entre deux passages

let contactSingeTimers = [];  // timers actifs, pour pouvoir les annuler

function clearContactSingeTimers() {
  contactSingeTimers.forEach(id => clearTimeout(id));
  contactSingeTimers = [];
}

function initContactSinge() {
  // Annule toute boucle précédente (cas où on quitte/revient sur la page)
  clearContactSingeTimers();

  // Ne fait rien si on n'est pas sur la page contact
  if (!document.body.classList.contains('page-contact')) return;

  const singe = document.querySelector('.contact-singe');
  if (!singe) return;

  // Garde le src d'origine pour pouvoir le réinjecter à chaque cycle
  // (réinjecter le src force le WebP à redémarrer à la frame 0)
  const src = singe.getAttribute('src');
  if (!src) return;

  // État initial : invisible, pas de src (animation à l'arrêt)
  singe.classList.remove('is-visible');
  singe.removeAttribute('src');

  function showSinge() {
    // Si l'élément n'est plus dans le DOM (pjax a changé de page), on stoppe
    if (!singe.isConnected) {
      clearContactSingeTimers();
      return;
    }
    // Réinjecte le src → l'animation WebP redémarre depuis la frame 0
    singe.setAttribute('src', src);
    // Fade-in via la classe CSS
    singe.classList.add('is-visible');

    // Après la durée du cycle, on fade-out et on relance après la pause
    contactSingeTimers.push(setTimeout(() => {
      if (!singe.isConnected) return;
      singe.classList.remove('is-visible');
      // Attend la fin du fade-out (0.18s défini en CSS) avant de retirer le src
      contactSingeTimers.push(setTimeout(() => {
        if (!singe.isConnected) return;
        singe.removeAttribute('src');
      }, 200));
      contactSingeTimers.push(setTimeout(showSinge, CONTACT_SINGE_PAUSE));
    }, CONTACT_SINGE_DURATION));
  }

  // Première apparition après le délai initial
  contactSingeTimers.push(setTimeout(showSinge, CONTACT_SINGE_DELAY_INITIAL));

  /* ============================================================
   ── HOPIREADER : PRÉCHARGEMENT DES PAGES VOISINES ───────────
   Le parent ne connaît pas le contenu de l'iframe, mais on lui
   envoie un signal "preload-neighbors" pour qu'elle précharge
   N+1 et N+2 dès qu'elle arrive sur la page N.
   L'iframe doit avoir le listener correspondant côté HopiReader.
   ============================================================ */
window.addEventListener('message', (event) => {
  // Sécurité : on ne répond qu'aux messages d'iframes embarquées
  // dans une modal de notre site (pas de cross-origin malveillant)
  const iframe = document.querySelector('.project-modal-reader iframe');
  if (!iframe || event.source !== iframe.contentWindow) return;

  const data = event.data;
  if (!data || typeof data !== 'object') return;

  // L'iframe annonce qu'elle est sur la page N (envoyé par HopiReader
  // à chaque changement de page). On lui demande de précharger N+1 et N+2.
  if (data.type === 'hopi:page-changed') {
    iframe.contentWindow.postMessage({
      type: 'hopi:preload-neighbors',
      pages: [data.currentPage + 1, data.currentPage + 2]
    }, '*');
  }

  // L'iframe annonce qu'elle est prête au démarrage : on lui demande
  // de précharger les 3 premières pages en plus de la page 0.
  if (data.type === 'hopi:ready') {
    iframe.contentWindow.postMessage({
      type: 'hopi:preload-neighbors',
      pages: [1, 2, 3]
    }, '*');
  }
});
}