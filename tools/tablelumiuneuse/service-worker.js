/* Table lumineuse, offline service worker.
   Bump CACHE (v1 -> v2 ...) whenever you change index.html or the icons,
   so the iPad picks up the new version. */
var CACHE = "table-lumineuse-v1";

var ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-152.png",
  "./icon-167.png",
  "./icon-180.png",
  "./icon-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      // Cache each asset individually so one missing file does not break the rest.
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
        // Keep a copy of anything new we fetch while online.
        var copy = res.clone();
        caches.open(CACHE).then(function (cache) { cache.put(req, copy).catch(function () {}); });
        return res;
      }).catch(function () {
        // Offline fallback: serve the app shell for navigations.
        if (req.mode === "navigate") { return caches.match("./index.html"); }
      });
    })
  );
});
