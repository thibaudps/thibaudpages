/* ============================================================
   HOME.JS — Logique de la page d'accueil
   - Injection du titre + sous-titre
   - Calcul de taille adaptative
   - Animation d'entrée
   - Animation de sortie vers la nav (utilisée par pjax.js)
   ============================================================ */

// ── Init du titre — appelable plusieurs fois (pjax) ─────────
// Si skipEntryAnimation est true, on prépare le titre (injection,
// calcul de taille) mais on ne lance pas l'animation d'entrée.
// Utile quand pjax veut prendre le relais avec animateNavToHomeTitle.
function initHomeTitle(skipEntryAnimation = false) {
  const homeName = document.getElementById('home-name');
  if (!homeName) return;

  // Reset complet (au cas où on revient sur la home après pjax)
  homeName.classList.remove('visible');
  homeName.style.transition = '';
  homeName.style.transform = '';

  // Reset aussi les styles inline du main-name (au cas où l'animation
  // précédente lui a appliqué position/zIndex/left/top/margin)
  const mainNameReset = homeName.querySelector('.main-name');
  if (mainNameReset) {
    mainNameReset.style.position = '';
    mainNameReset.style.zIndex = '';
    mainNameReset.style.left = '';
    mainNameReset.style.top = '';
    mainNameReset.style.margin = '';
    mainNameReset.style.transformOrigin = '';
    mainNameReset.style.transition = '';
    mainNameReset.style.transform = '';
    mainNameReset.style.opacity = '';
    mainNameReset.style.fontWeight = '';
  }

  // Reset la nav (styles modifiés pendant l'animation)
  const navReset = document.querySelector('nav');
  if (navReset) {
    navReset.style.zIndex = '';
    navReset.style.background = '';
    navReset.style.borderBottomColor = '';
    navReset.style.transition = '';
  }

  // Reset le brand-full (au cas où il aurait été révélé par l'animation)
  // Sauf si pjax demande de skip l'animation d'entrée — dans ce cas, pjax
  // a délibérément mis data-revealed pour l'animation inverse à venir.
  if (!skipEntryAnimation) {
    const brandFull = document.querySelector('.brand-full');
    if (brandFull) {
      brandFull.removeAttribute('data-revealed');
      brandFull.style.transition = '';
      brandFull.style.opacity = '';
      brandFull.style.visibility = '';
    }
  }

  // Injecte le titre structuré (Gras / Fin)
  // Le crénage manuel s'applique sur "Thibaud Pagès" (paires BA, AU, PA, AG)
  const kernedName = (typeof window.applyManualKerning === 'function')
    ? window.applyManualKerning('Thibaud Pagès')
    : 'Thibaud Pagès';
  const subtitle = (typeof window.t === 'function')
    ? window.t('home.sub')
    : 'Design & Illustration';
  homeName.innerHTML = `
    <div class="main-name">${kernedName}</div>
    <div class="sub-name">${subtitle}</div>
  `;

  // Reset des styles inline qui pourraient rester d'une animation précédente
  const flower = document.getElementById('home-animation');
  if (flower) {
    flower.style.transition = '';
    flower.style.opacity = '';
  }

  // Calcule la taille initiale
  if (document.fonts) {
    document.fonts.ready.then(() => fitName(homeName));
  } else {
    setTimeout(() => fitName(homeName), 100);
  }

  // Animation d'entrée (skip si pjax veut prendre le relais)
  if (!skipEntryAnimation) {
    requestAnimationFrame(() => {
      setTimeout(() => homeName.classList.add('visible'), 100);
    });
  }
}

// ── Calcul de taille adaptative ─────────────────────────────
function fitName(homeName) {
  if (!homeName) homeName = document.getElementById('home-name');
  if (!homeName) return;

  const wrap = homeName.parentElement;
  if (!wrap) return;
  const wrapWidth = wrap.clientWidth;

  const mainNameEl = homeName.querySelector('.main-name');
  if (!mainNameEl) return;

  // Mesure la largeur du texte à une taille de référence
  const REFERENCE_SIZE = 160;
  homeName.style.fontSize = REFERENCE_SIZE + 'px';
  const textWidth = mainNameEl.scrollWidth;

  // Calcule la taille cible : on veut que le texte occupe 90% de la largeur
  const targetRatio = (wrapWidth * 0.9) / textWidth;
  const newSize = REFERENCE_SIZE * targetRatio;

  // Bornes adaptatives selon la taille d'écran
  let minSize, maxSize;
  if (window.innerWidth < 500) {
    minSize = 28;
    maxSize = 60;
  } else if (window.innerWidth < 900) {
    minSize = 40;
    maxSize = 100;
  } else {
    minSize = 60;
    maxSize = 180;
  }

  homeName.style.fontSize = Math.max(minSize, Math.min(newSize, maxSize)) + 'px';
}

// ── Animation du titre vers la nav ──────────────────────────
// Appelée par pjax.js AVANT de charger la nouvelle page.
// onComplete() est appelé à la fin de l'animation pour
// déclencher le chargement de la nouvelle page.
function animateTitleToNav(onComplete) {
  const homeName  = document.getElementById('home-name');
  const mainName  = homeName && homeName.querySelector('.main-name');
  const subName   = homeName && homeName.querySelector('.sub-name');
  const brandFull = document.querySelector('.brand-full');

  if (!mainName || !brandFull) {
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  // Mesure la position de destination (.brand-full caché par CSS sur home)
  brandFull.style.visibility = 'visible';
brandFull.style.opacity = '0';
void brandFull.offsetWidth;
// Mesure plus précise : on utilise la range du nœud texte directement
// pour avoir le bounding box du contenu textuel sans les espaces autour
const range = document.createRange();
range.selectNodeContents(brandFull);
const destRect = range.getBoundingClientRect();
range.detach && range.detach();
  const destFontSize = parseFloat(window.getComputedStyle(brandFull).fontSize);
  brandFull.style.opacity = '';
  brandFull.style.visibility = '';

  // Position actuelle du titre
  const fromRange = document.createRange();
fromRange.selectNodeContents(mainName);
const fromRect = fromRange.getBoundingClientRect();
fromRange.detach && fromRange.detach();
  const fromFontSize = parseFloat(window.getComputedStyle(mainName).fontSize);

  const dx = (destRect.left + destRect.width / 2) - (fromRect.left + fromRect.width / 2);
  const dy = (destRect.top  + destRect.height / 2) - (fromRect.top  + fromRect.height / 2);
  const scale = destFontSize / fromFontSize;

  // Fade out sous-titre + fleur
  if (subName) {
    subName.style.transition = 'opacity 0.25s ease';
    subName.style.opacity = '0';
  }
  const flower = document.getElementById('home-animation');
  if (flower) {
    flower.style.transition = 'opacity 0.3s ease';
    flower.style.opacity = '0';
  }

  // ────────────────────────────────────────────────────────────
  // Pour que le titre passe AU-DESSUS de la nav pendant l'animation,
  // on rend la nav transparente (sauf le brand-full qui n'est pas
  // encore révélé à ce stade — il sera révélé à 880ms).
  // Mais on garde la nav cliquable et visible au niveau structure.
  // ────────────────────────────────────────────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.transition = 'background 0.3s ease';
    nav.style.background = 'transparent';
  }
  mainName.style.position = 'relative';
  mainName.style.zIndex = '999';
  mainName.style.transformOrigin = 'center center';

  // Anime le titre vers la nav
  mainName.style.transition = 'transform 0.9s cubic-bezier(0.7, 0, 0.3, 1)';

  requestAnimationFrame(() => {
    setTimeout(() => {
      mainName.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
    }, 80);
  });

  // ────────────────────────────────────────────────────────────
  // À 880ms : le brand-full est révélé instantanément
  // (le titre animé est juste dessus à ce moment-là)
  // En même temps, le titre animé commence à fade-out pour
  // masquer le micro-décalage entre les deux rendus.
  // ────────────────────────────────────────────────────────────
  setTimeout(() => {
    brandFull.setAttribute('data-revealed', 'true');
    brandFull.style.transition = 'none';
    brandFull.style.opacity = '1';
    brandFull.style.visibility = 'visible';

    // Fade out du titre animé pour cacher le saut visuel
    mainName.style.transition = 'transform 0.9s cubic-bezier(0.7, 0, 0.3, 1), opacity 0.3s ease';    mainName.style.opacity = '0';
  }, 940);

  // Au moment où le titre arrive à destination, on appelle onComplete
  // pour que pjax remplace le contenu.
  setTimeout(() => {
    if (typeof onComplete === 'function') onComplete();
  }, 950);
}

// ── Animation inverse : nav → titre home ────────────────────
// Appelée par pjax.js APRÈS avoir chargé la home page mais
// AVANT de révéler son contenu normalement. Le contenu de la
// page précédente a déjà fade out, et la home est déjà en place
// (mais on a empêché son animation d'entrée standard).
// Le brand-full est encore visible dans la nav (la classe page-home
// n'a pas encore été activée pour lui) — on l'utilise comme point
// de départ et on l'anime jusqu'à la position du titre central.
function animateNavToHomeTitle(onComplete) {
  const homeName  = document.getElementById('home-name');
  const mainName  = homeName && homeName.querySelector('.main-name');
  const subName   = homeName && homeName.querySelector('.sub-name');
  const brandFull = document.querySelector('.brand-full');
  const flower    = document.getElementById('home-animation');

  if (!mainName || !brandFull || !homeName) {
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  // Le titre central doit être positionné mais invisible pour qu'on
  // puisse mesurer sa position cible. On retire la classe visible
  // (déjà fait par initHomeTitle si on vient d'arriver), et on force
  // l'opacity à 0.
  homeName.classList.remove('visible');
  homeName.style.transition = 'none';
  homeName.style.opacity = '0';
  // S'assure que la taille est calculée
  fitName(homeName);

  // Cache le sous-titre et la fleur le temps de l'animation
  if (subName) {
    subName.style.transition = 'none';
    subName.style.opacity = '0';
  }
  if (flower) {
    flower.style.transition = 'none';
    flower.style.opacity = '0';
  }

  // Force un reflow pour que les styles soient appliqués avant mesure
  void mainName.offsetWidth;

  // Mesure la position de destination (titre central sur la home)
  const toRange = document.createRange();
  toRange.selectNodeContents(mainName);
  const toRect = toRange.getBoundingClientRect();
  toRange.detach && toRange.detach();
  const toFontSize = parseFloat(window.getComputedStyle(mainName).fontSize);

  // Mesure la position de départ (brand-full dans la nav)
  // Le brand-full est encore visible à ce stade (avant qu'on bascule
  // body en page-home).
  const fromRange = document.createRange();
  fromRange.selectNodeContents(brandFull);
  const fromRect = fromRange.getBoundingClientRect();
  fromRange.detach && fromRange.detach();
  const fromFontSize = parseFloat(window.getComputedStyle(brandFull).fontSize);

  // Calcule la transformation INVERSE : on positionne le mainName
  // (qui est à sa position finale) avec un transform qui le ramène
  // visuellement à la position du brand-full, puis on l'anime vers
  // transform: none pour qu'il glisse à sa vraie place.
  const dx = (fromRect.left + fromRect.width / 2) - (toRect.left + toRect.width / 2);
  const dy = (fromRect.top  + fromRect.height / 2) - (toRect.top  + toRect.height / 2);
  const scale = fromFontSize / toFontSize;

  // Applique la transformation initiale (position de la nav)
  mainName.style.position = 'relative';
  mainName.style.zIndex = '999';
  mainName.style.transformOrigin = 'center center';
  mainName.style.transition = 'none';
  mainName.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
  mainName.style.opacity = '1';
  homeName.style.opacity = '1';

  // Cache le brand-full instantanément (le mainName animé prend sa place)
  brandFull.style.transition = 'none';
  brandFull.style.opacity = '0';
  brandFull.style.visibility = 'hidden';

  // Rend la nav transparente comme dans l'animation aller, pour que
  // le titre puisse passer "au-dessus" sans être coupé par la bordure
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.transition = 'background 0.3s ease';
    nav.style.background = 'transparent';
  }

  // Force un reflow pour que la position initiale soit commit
  void mainName.offsetWidth;

  // Lance l'animation vers la position centrale (transform: none)
  requestAnimationFrame(() => {
    mainName.style.transition = 'transform 0.9s cubic-bezier(0.7, 0, 0.3, 1)';
    mainName.style.transform = 'translate(0, 0) scale(1)';
  });

  // À la fin de l'animation, on révèle le sous-titre et la fleur
  // en fade in, et on nettoie les styles inline.
  setTimeout(() => {
    // Nettoie les styles inline du mainName pour rendre la main au CSS
    mainName.style.transition = '';
    mainName.style.transform = '';
    mainName.style.position = '';
    mainName.style.zIndex = '';
    mainName.style.transformOrigin = '';
    mainName.style.opacity = '';

    // Restaure la nav
    if (nav) {
      nav.style.transition = '';
      nav.style.background = '';
    }

    // Le brand-full reste caché par le CSS (.page-home .brand-full)
    // une fois que body.page-home est actif. On nettoie nos styles inline
    // pour laisser le CSS reprendre la main.
    brandFull.style.transition = '';
    brandFull.style.opacity = '';
    brandFull.style.visibility = '';

    // Fade in du sous-titre et de la fleur
    if (subName) {
      subName.style.transition = 'opacity 0.4s ease';
      subName.style.opacity = '1';
    }
    if (flower) {
      flower.style.transition = 'opacity 0.5s ease';
      flower.style.opacity = '1';
    }

    // Nettoie après le fade in
    setTimeout(() => {
      if (subName) {
        subName.style.transition = '';
        subName.style.opacity = '';
      }
      if (flower) {
        flower.style.transition = '';
        flower.style.opacity = '';
      }
      homeName.style.transition = '';
      homeName.style.opacity = '';
      homeName.classList.add('visible');
    }, 500);

    if (typeof onComplete === 'function') onComplete();
  }, 920);
}

// Expose pour pjax.js
window.animateTitleToNav = animateTitleToNav;
window.animateNavToHomeTitle = animateNavToHomeTitle;
window.initHomeTitle = initHomeTitle;

// ── Init au chargement initial ──────────────────────────────
window.addEventListener('resize', () => fitName());

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('page-home')) {
    initHomeTitle();
  }
});