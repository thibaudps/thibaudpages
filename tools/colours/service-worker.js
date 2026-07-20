/* Colours, service worker hors ligne.
   Met en cache la coquille de l'app au premier chargement en ligne, puis la
   sert sans connexion. Change CACHE (v1 -> v2 ...) chaque fois que tu modifies
   index.html ou les icones, pour forcer les appareils a reprendre la nouvelle version. */
var CACHE = "colours-v1";

var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-152.png",
  "./icon-167.png",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      // Chaque fichier est mis en cache individuellement : un fichier manquant
      // ne fait pas echouer tout le reste.
      return Promise.all(ASSETS.map(function (url) {
        return cache.add(url).catch(function () { return null; });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) { return caches.delete(k); }
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") { return; }
  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) { return cached; }
      return fetch(req).then(function (res) {
        // Garde une copie de tout ce qu'on telecharge en ligne (polices Google comprises),
        // pour que l'app fonctionne ensuite hors connexion.
        var copy = res.clone();
        caches.open(CACHE).then(function (cache) { cache.put(req, copy).catch(function () {}); });
        return res;
      }).catch(function () {
        // Repli hors ligne : sert la coquille de l'app pour les navigations.
        if (req.mode === "navigate") { return caches.match("./index.html"); }
      });
    })
  );
});
