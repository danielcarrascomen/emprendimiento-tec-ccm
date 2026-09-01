/* Service worker: caché para que la página cargue al instante en visitas repetidas.
   · index.html, eventos.json, admin.json: primero red, y si no hay conexión, caché (siempre lo más nuevo posible).
   · assets/ (logos, ilustraciones, videos, fuentes): primero caché y se actualiza en segundo plano.
   Para forzar que todo el mundo baje archivos nuevos, sube el número de VERSION. */
const VERSION = 'etccm-v4';
const CORE = ['./', 'index.html', 'styles.css', 'programas.js', 'catalogo.js', 'experiencias.html', 'eventos.html', 'assets/logo-emprendimiento-ieegl.png', 'assets/logo-emprendimiento.png', 'assets/rayo-azul.png', 'assets/rayo-blanco.png',
  'assets/ilustracion-1.webp', 'assets/ilustracion-2.webp', 'assets/ilustracion-3.webp', 'assets/ilustracion-4.webp', 'assets/ilustracion-5.webp'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).catch(() => {}).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

const isFresh = url => /\/(index\.html)?$/.test(url.pathname) || /\/(eventos|admin)\.json$/.test(url.pathname) || /\.html$|\.js$|\.css$/.test(url.pathname);

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname === 'api.github.com') return;                       // publicación del admin: nunca por caché
  if (url.origin !== location.origin && !/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) return;

  if (url.origin === location.origin && isFresh(url)) {
    // red primero (sin la marca de tiempo en la clave de caché)
    const key = new Request(url.origin + url.pathname);
    e.respondWith(fetch(req).then(res => { if (res.ok) caches.open(VERSION).then(c => c.put(key, res.clone())); return res; })
      .catch(() => caches.match(key).then(r => r || caches.match('index.html'))));
    return;
  }
  // caché primero, actualizando en segundo plano (stale-while-revalidate)
  e.respondWith(caches.open(VERSION).then(async c => {
    const cached = await c.match(req);
    const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => cached);
    return cached || net;
  }));
});
