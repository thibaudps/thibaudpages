/* Convert & Compress by TP — service worker
   Bump CACHE à chaque déploiement pour forcer la mise à jour (v1 → v2 → …). */

var CACHE = 'convert-compress-v1';
var RUNTIME = 'convert-compress-runtime-v1';

var SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-152.png',
  './icon-167.png',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
  './vendor/pdf.min.js',
  './vendor/pdf.worker.min.js',
  './vendor/jspdf.umd.min.js',
  './vendor/pdf-lib.min.js'
];

/* Les polices Google sont mises en cache à la volée : opaques, mais réutilisables hors ligne. */
var FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      /* addAll échoue en bloc si une seule ressource manque : on encaisse fichier par fichier. */
      return Promise.all(SHELL.map(function (url) {
        return c.add(new Request(url, { cache: 'reload' })).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE && k !== RUNTIME) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }

  /* Navigation : réseau d'abord pour attraper les mises à jour, cache en secours. */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put('./index.html', copy); });
        return res;
      }).catch(function () {
        return caches.match('./index.html').then(function (r) {
          return r || caches.match('./');
        });
      })
    );
    return;
  }

  /* Polices : cache d'abord, puis réseau, conservé pour l'usage hors ligne. */
  if (FONT_HOSTS.indexOf(url.hostname) !== -1) {
    e.respondWith(
      caches.match(req).then(function (hit) {
        return hit || fetch(req).then(function (res) {
          var copy = res.clone();
          caches.open(RUNTIME).then(function (c) { c.put(req, copy); });
          return res;
        }).catch(function () { return hit; });
      })
    );
    return;
  }

  /* Ressources locales : cache d'abord. */
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then(function (hit) {
        return hit || fetch(req).then(function (res) {
          if (res && res.status === 200 && res.type === 'basic') {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put(req, copy); });
          }
          return res;
        });
      })
    );
  }
});
