const CACHE_NAME = "titan-os-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./guess.html",
  "./toe.html",
  "./warfare.html",
  "./football.html",
  "./particle.html",
  "./terminal.html",
  "./logic.html",
  "./quantum.html",
];

// 1. Install Service Worker & Cache Files
self.addEventListener("install", (e) => {
  console.log("[SW] Installing Titan OS v4...");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching All Games");
      return cache.addAll(ASSETS);
    }),
  );
});

// 2. Activate & Clean Old Caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Removing old cache", key);
            return caches.delete(key);
          }
        }),
      );
    }),
  );
});

// 3. Fetch (Serve from Cache first, then Network)
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Return cached file if found, otherwise fetch from network
      return response || fetch(e.request);
    }),
  );
});
