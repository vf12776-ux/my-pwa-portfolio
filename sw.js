const CACHE_NAME = 'my-pwa-cache-v1'; // при каждом изменении сайта меняйте v1 на v2 и т.д.

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll([
            '/my-pwa-portfolio/',
            '/my-pwa-portfolio/index.html',
            '/my-pwa-portfolio/manifest.json',
            '/my-pwa-portfolio/icon-192.png',
            '/my-pwa-portfolio/icon-512.png'
        ]))
    );
    self.skipWaiting(); // заставляет активироваться новую версию сразу
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});