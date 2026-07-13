/* Table lumineuse, service worker hors ligne.
   Met en cache la coquille de l'app au premier chargement en ligne, puis la
   sert sans connexion. Change CACHE (v1 -> v2 ...) chaque fois que tu modifies
   index.html ou les icones, pour forcer l'iPad a reprendre la nouvelle version. */
var CACHE = "table-lumineuse-v1";

var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-152.png",
  "./icon-167.png",
  "./icon-180.png",
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
        // Met en cache au vol tout ce qu'on telecharge en ligne (dont les
        // polices Google), pour que ce soit disponible ensuite hors connexion.
        var copy = res.clone();
        caches.open(CACHE).then(function (cache) { cache.put(req, copy).catch(function () {}); });
        return res;
      }).catch(function () {
        // Hors ligne : pour une navigation, on sert la coquille de l'app.
        if (req.mode === "navigate") { return caches.match("./index.html"); }
      });
    })
  );
});
