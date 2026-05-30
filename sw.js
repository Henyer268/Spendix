const CACHE_NAME = 'spendix-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/movimientos.html',
  '/categorias.html',
  '/metas.html',
  '/ajustes.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

self.addEventListener('push', e => {
  const data = e.data?.json() ?? {};
  const title = data.title || 'Spendix';
  const options = {
    body: data.body || '',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: data.url || '/'
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data));
});
