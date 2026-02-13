self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('adansimart-v1').then((cache) => cache.addAll([
      '/adansimart/',
      '/adansimart/index.html'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
