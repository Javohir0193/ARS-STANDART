const CACHE = "ars-1.0-6688bac9";
const FILES = ["./", "index.html", "manifest.webmanifest", "img/164dca05a7cbdf60e2d87742a86c3820.jpg", "img/1e91397963e9541cb010aeae5d0484e7.jpg", "img/472a1cffb88850668e17311783a7bf42.jpg", "img/58560d0400749043a8c4665be00603ce.jpg", "img/769e36fe6e56fd9cabaf1c0ae79f481a.jpg", "img/bdac99dac657118ae37f668fdb635fc7.jpg", "img/d40f6f4bba51664e7d8a7fac30616c8c.jpg", "img/d4dbee60e05f3e94cdac5a59b43eba60.jpg", "img/d7df8835c9e8fe0c7c1a944a79eb76f9.jpg", "img/e05753aa0ea84d978972a219ae1e39cc.jpg", "img/ea01b54c55acef02ee3ce380de222df2.jpg", "fonts/inter-cyrillic-wght-normal.woff2", "fonts/inter-latin-ext-wght-normal.woff2", "fonts/inter-latin-wght-normal.woff2", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request).catch(() => caches.match('index.html'))));
});
