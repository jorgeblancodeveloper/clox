var cacheName = 'hello-world-page';
var filesToCache = [
  '/',
  './index.html',
  './css/site.css',
  './js/js.js'
  './img/close.png',
  './img/config.png',
  './img/play.png',
  './img/save.png',
  './img/sonido.png',
  './mp3/buzzer.mp3',
  './mp3/campana.mp3',
  './mp3/click.mp3',
  './mp3/dong.mp3',
  './mp3/fail.mp3',
  './mp3/slap.mp3',
  './mp3/timbre.mp3'
];
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});