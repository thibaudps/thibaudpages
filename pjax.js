/* ============================================================
   PJAX.JS — Transition entre pages sans recharger la nav
   - Intercepte les clics sur les liens internes
   - Fetch la nouvelle page en arrière-plan
   - Remplace uniquement le contenu de #page-content
   - Synchronise les <link rel="stylesheet"> du <head>
   - Synchronise <title>, meta description, canonical
   - La nav, le curseur et le footer restent intacts
   - Gère le fade-in/out global du contenu
   ============================================================ */

(function() {
  'use strict';

  const CONTENT_ID = 'page-content';
  const FADE_OUT_DURATION = 350; // ms (doit correspondre au CSS)
  const FADE_IN_DURATION = 600;  // ms (doit correspondre au CSS)

  // Cache des pages déjà chargées (pour la rapidité)
  const pageCache = new Map();


  // ── Détermine si un lien doit être géré par pjax ──────────
  function shouldHandleLink(link) {
    const href = link.getAttribute('href');
    if (!href) return false;
    if (href.startsWith('http://') || href.startsWith('https://')) return false;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    if (href.startsWith('#')) return false;
    if (link.hasAttribute('target')) return false;
    if (link.hasAttribute('download')) return false;
    return href.endsWith('.html') || href === '/' || !href.includes('.');
  }


  // ── Fetch et parse une page ───────────────────────────────
  async function fetchPage(url) {
    if (pageCache.has(url)) return pageCache.get(url);

    const response = await fetch(url);
    if (!response.ok) throw new Error('Page introuvable');
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const contentEl = doc.getElementById(CONTENT_ID);

    // Récupère les stylesheets de la page cible (uniquement les locales,
    // on ignore les fonts Google et autres CDN qui sont identiques partout
    // et qu'on veut pas re-toggler à chaque navigation).
    const stylesheets = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'))
      .map(l => l.getAttribute('href'))
      .filter(href => href && !/^https?:\/\//i.test(href));

    // Récupère meta description et canonical pour synchro SEO
    const metaDesc = doc.querySelector('meta[name="description"]');
    const canonical = doc.querySelector('link[rel="canonical"]');

    const data = {
      title: doc.title,
      content: contentEl,
      bodyClass: doc.body.className,
      contentClass: contentEl ? contentEl.className : '',
      stylesheets: stylesheets,
      metaDescription: metaDesc ? metaDesc.getAttribute('content') : '',
      canonical: canonical ? canonical.getAttribute('href') : '',
    };

    pageCache.set(url, data);
    return data;
  }


  // ── Synchronise les <link rel="stylesheet"> du <head> ────
  // Compare les feuilles déjà présentes à celles attendues par la nouvelle
  // page. Ajoute celles qui manquent, retire celles qui ne sont plus utiles.
  // On ne touche qu'aux stylesheets locales (chemins relatifs), pas aux CDN.
  function syncStylesheets(targetHrefs) {
    const head = document.head;
    const currentLinks = Array.from(head.querySelectorAll('link[rel="stylesheet"]'))
      .filter(l => {
        const href = l.getAttribute('href');
        return href && !/^https?:\/\//i.test(href);
      });
    const currentHrefs = currentLinks.map(l => l.getAttribute('href'));

    // 1. Retire les stylesheets qui ne sont plus dans la nouvelle page
    currentLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!targetHrefs.includes(href)) {
        link.remove();
      }
    });

    // 2. Ajoute les stylesheets manquantes
    targetHrefs.forEach(href => {
      if (!currentHrefs.includes(href)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        head.appendChild(link);
      }
    });
  }


  // ── Synchronise meta description et canonical ────────────
  function syncMeta(description, canonicalHref) {
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    if (canonicalHref) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalHref);
    }
  }


  // ── Charge une nouvelle page ──────────────────────────────
  async function loadPage(url, addToHistory = true) {
    const currentContent = document.getElementById(CONTENT_ID);
    if (!currentContent) {
      window.location.href = url;
      return;
    }

    // Retire l'état hover du curseur custom dès le début : si la souris
    // était sur un élément qui va être détruit par le swap, son mouseleave
    // ne se déclenchera jamais et le curseur resterait bloqué.
    const cursorEl = document.getElementById('cursor');
    if (cursorEl) cursorEl.classList.remove('hov');

    try {
      // Précharge la nouvelle page en parallèle
      const fetchPromise = fetchPage(url);

      // Détecte si on quitte la home (l'animation du titre gère le fade-out)
      const isLeavingHome = document.body.classList.contains('page-home');

      // Fade-out : sauf depuis la home (animation du titre s'en charge).
      // On fait le fade-out via JS direct (au lieu d'une classe CSS) pour
      // garantir que la transition joue toujours, même si le navigateur
      // tente de coalescer les changements de style.
      if (!isLeavingHome) {
        currentContent.classList.remove('fading-in', 'fading-out');
        // Reset toute opacité résiduelle et force l'état initial
        currentContent.style.transition = 'none';
        currentContent.style.opacity = '1';
        void currentContent.offsetHeight; // commit reflow
        // Active la transition et passe à opacity 0
        currentContent.style.transition = 'opacity 0.35s ease';
        currentContent.style.opacity = '0';
        await new Promise(resolve => setTimeout(resolve, FADE_OUT_DURATION));
      }

      const newPage = await fetchPromise;
      if (!newPage.content) {
        window.location.href = url;
        return;
      }

      // ⚡ Synchronise les stylesheets AVANT d'injecter le HTML, pour que
      // les styles spécifiques (ex: style-legal.css) soient déjà chargés
      // quand le DOM apparaît. Évite le flash de contenu non stylé (FOUC).
      syncStylesheets(newPage.stylesheets);

      // Synchronise meta description et canonical (SEO + onglet)
      syncMeta(newPage.metaDescription, newPage.canonical);

      // Swap du contenu et de la classe du <main>
      currentContent.innerHTML = newPage.content.innerHTML;
      currentContent.className = newPage.contentClass;

      // Détecte la transition vers la home AVANT de swap les classes
      const wasHome = document.body.classList.contains('page-home');
      const willBeHome = /\bpage-home\b/.test(newPage.bodyClass);
      const isReturningToHome = !wasHome && willBeHome;

      // Si on retourne à la home, on doit pré-marquer le brand-full
      // comme révélé AVANT de basculer body.page-home, sinon le CSS
      // .page-home .brand-full le cache pendant un instant.
      if (isReturningToHome) {
        const brand = document.querySelector('.brand-full');
        if (brand) brand.setAttribute('data-revealed', 'true');
      }

      // Met à jour les classes du body
      document.body.className = newPage.bodyClass;
      const isNowHome = document.body.classList.contains('page-home');

      // Si on quitte la home, restaure brand-full et nav
      // (l'animation du titre les avait modifiés)
      if (wasHome && !isNowHome) {
        restoreNavAfterHomeAnimation();
      }

      // Met à jour le titre et l'URL
      document.title = newPage.title;
      if (addToHistory) history.pushState({ url }, '', url);
      window.scrollTo(0, 0);

      // Si on arrive sur la home depuis une autre page, on déclenche
      // l'animation inverse : le titre glisse depuis la nav vers le centre.
      // On notifie d'abord les autres scripts pour qu'ils initialisent
      // leur contenu, mais on demande à home.js de NE PAS lancer son
      // animation d'entrée standard (skipEntryAnimation = true).
      if (!wasHome && isNowHome) {
        // Notifie les autres scripts (renderNav, etc.)
        // renderNav() va ré-injecter le contenu de .brand-full ; il faut
        // re-marquer data-revealed après.
        document.dispatchEvent(new CustomEvent('pjax:loaded', {
          detail: { url, skipHomeEntryAnimation: true }
        }));

        // Re-marque data-revealed (renderNav peut avoir réinjecté le brand)
        const brand = document.querySelector('.brand-full');
        if (brand) {
          brand.setAttribute('data-revealed', 'true');
          // Et force visibilité (le CSS .page-home la cacherait sinon)
          brand.style.opacity = '1';
          brand.style.visibility = 'visible';
        }

        // Le contenu de #page-content (le wrap du titre, la fleur) est
        // déjà en place mais on retire l'éventuelle classe fading-out
        // sans ajouter fading-in (l'animation inverse s'en charge).
        // On force opacity à 1 instantanément pour annuler le fade-out
        // qui a été appliqué via inline styles juste avant le swap.
        currentContent.classList.remove('fading-out', 'fading-in');
        currentContent.style.transition = 'none';
        currentContent.style.opacity = '1';
        // Force un reflow pour commit l'état "opacity: 1, no transition"
        void currentContent.offsetHeight;
        // Puis nettoie tout pour rendre la main au CSS
        currentContent.style.transition = '';
        currentContent.style.opacity = '';

        // Lance l'animation inverse
        if (typeof window.animateNavToHomeTitle === 'function') {
          window.animateNavToHomeTitle(() => {
            // À la fin, on retire data-revealed pour que le CSS reprenne
            // la main et cache le brand-full sur la home.
            if (brand) brand.removeAttribute('data-revealed');
          });
        } else {
          // Fallback : si la fonction n'est pas dispo, on lance
          // l'animation d'entrée standard.
          if (typeof window.initHomeTitle === 'function') {
            window.initHomeTitle();
          }
        }

        return;
      }

      // Cas standard : on notifie les autres scripts
      document.dispatchEvent(new CustomEvent('pjax:loaded', { detail: { url } }));

      // Lance l'animation de fade-in
      // On retire d'abord toute classe résiduelle ET les styles inline
      // posés par le fade-out, puis on force un reflow pour que
      // l'animation se relance à coup sûr.
      currentContent.classList.remove('fading-out', 'fading-in');
      currentContent.style.transition = '';
      currentContent.style.opacity = '';
      void currentContent.offsetHeight;
      currentContent.classList.add('fading-in');

      // Nettoie la classe une fois l'animation terminée
      setTimeout(() => {
        currentContent.classList.remove('fading-in');
      }, FADE_IN_DURATION);

    } catch (err) {
      console.error('PJAX error:', err);
      window.location.href = url;
    }
  }


  // ── Restaure les styles de la nav après l'animation home ──
  function restoreNavAfterHomeAnimation() {
    const brand = document.querySelector('.brand-full');
    if (brand) {
      const oldTransition = brand.style.transition;
      brand.style.transition = 'none';
      brand.style.opacity = '1';
      brand.style.visibility = 'visible';
      void brand.offsetWidth;
      requestAnimationFrame(() => {
        brand.style.transition = oldTransition;
      });
    }
    const navEl = document.querySelector('nav');
    if (navEl) {
      navEl.style.background = '';
      navEl.style.transition = '';
    }
  }


  // ── Intercepte les clics sur les liens internes ──────────
  function bindClicks() {
    document.body.addEventListener('click', e => {
      const link = e.target.closest('a');
      if (!link || !shouldHandleLink(link)) return;

      const href = link.getAttribute('href');
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const targetPath = href.split('/').pop();

      // Si on clique sur la page actuelle, ignore
      if (currentPath === targetPath) {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      // Si on quitte la home, lance d'abord l'animation du titre
      const isLeavingHome = document.body.classList.contains('page-home');
      if (isLeavingHome && typeof window.animateTitleToNav === 'function') {
        window.animateTitleToNav(() => loadPage(href));
      } else {
        loadPage(href);
      }
    });
  }


  // ── Préchargement au survol (pour la rapidité) ───────────
  function bindHoverPreload() {
    document.body.addEventListener('mouseover', e => {
      const link = e.target.closest('a');
      if (!link || !shouldHandleLink(link)) return;
      const href = link.getAttribute('href');
      if (!pageCache.has(href)) {
        fetchPage(href).catch(() => {});
      }
    });
  }


  // ── Bouton retour navigateur ─────────────────────────────
  window.addEventListener('popstate', e => {
    const url = (e.state && e.state.url) || window.location.pathname;
    loadPage(url, false);
  });


  // ── Init ──────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    bindClicks();
    bindHoverPreload();
    history.replaceState({ url: window.location.pathname }, '', window.location.pathname);
  });

})();
