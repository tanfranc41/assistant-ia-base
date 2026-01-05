const CACHE_NAME = "ai-assistant-shell-v1";
const SHELL_URL = "./index.html";
// Update this list if shell assets change.
const ASSETS = [
  "./",
  SHELL_URL,
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches
          .match(SHELL_URL)
          .then(
            (cached) =>
              cached ||
              new Response(
                "<!doctype html><html><body><h1>Offline</h1><p>App is offline. Please check your connection and try again.</p></body></html>",
                {
                  status: 503,
                  statusText: "Offline",
                  headers: { "Content-Type": "text/html" },
                }
              )
          )
      )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
