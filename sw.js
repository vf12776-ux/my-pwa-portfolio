const CACHE_NAME = 'my-pwa-cache-v5';  // меняйте цифру при каждом обновлении сайта
const urlsToCache = [
    '/my-pwa-portfolio/',
    '/my-pwa-portfolio/index.html',
    '/my-pwa-portfolio/manifest.json',
    '/my-pwa-portfolio/icon-192.png',
    '/my-pwa-portfolio/icon-512.png',
    '/my-pwa-portfolio/qrcode.png'   // добавьте, если файл так называется
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting(); // немедленно активировать новую версию
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
    self.clients.claim(); // сразу перехватить контроль над страницами
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});