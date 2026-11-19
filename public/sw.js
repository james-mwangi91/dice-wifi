/* DICE WiFi — service worker (production only)

   All paths are derived from the worker's own location so the same file works
   whether the app is served from a domain root or a sub-path (GitHub Pages). */

const CACHE_NAME = 'dice-wifi-v3';

/* '/sw.js' -> '/', '/dice-wifi/sw.js' -> '/dice-wifi/' */
const BASE = self.location.pathname.replace(/sw\.js$/, '');

const SHELL_URL = `${BASE}index.html`;
const PRECACHE_URLS = [BASE, SHELL_URL, `${BASE}manifest.webmanifest`, `${BASE}favicon.svg`];

/* Install: precache the app shell. Individual failures must not abort install. */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.all(
          PRECACHE_URLS.map((url) =>
            cache.add(new Request(url, { cache: 'reload' })).catch(() => {
              /* a missing shell entry should not break the whole install */
            })
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

/* Activate: clean up old caches */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  /* The hotspot site is a separate app under this path; leave it alone so its
     pages are never cached as this site's shell. */
  if (url.pathname.startsWith(`${BASE}hotspot/`)) return;

  /* Navigations: network first, fall back to the cached shell when offline */
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(SHELL_URL, copy));
          }
          return response;
        })
        .catch(() => caches.match(SHELL_URL))
    );
    return;
  }

  /* Build assets carry a content hash, so they are safe to serve cache-first */
  if (url.pathname.startsWith(`${BASE}assets/`)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ??
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return response;
          })
      )
    );
    return;
  }

  /* Everything else (icons, manifest): serve from cache but refresh in the
     background so an updated file is picked up on the next visit. */
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached ?? network;
    })
  );
});
