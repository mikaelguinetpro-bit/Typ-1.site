/* Typ-1 — le service worker : rend le site installable et garde le tipi même sans réseau.
   - Les pages, les textes (i18n) et le code : réseau d'abord (toujours la dernière version), sinon la copie gardée.
   - Les polices, les icônes, l'image d'accueil et les sons : copie gardée d'abord (ils ne changent presque jamais).
   - Jamais touchés : la recherche du feu (/api/), les vidéos (le navigateur les lit par morceaux), les autres sites. */
const VERSION = "typ1-v7-2026-11-19";
const CACHE = "typ1-" + VERSION;
const A_GARDER = [
  "/", "/index.html", "/manifest.webmanifest", "/favicon.ico",
  "/i18n/fr.js", "/i18n/es.js", "/i18n/en.js", "/i18n/pt.js", "/i18n/ru.js",
  "/i18n/ar.js", "/i18n/hi.js", "/i18n/bn.js", "/i18n/zh.js",
  "/assets/typ1_poster.jpg", "/assets/favicon-32.png", "/assets/icone-192.png", "/assets/apple-touch-icon.png",
  "/assets/polices/cormorant-garamond-latin-500-normal.woff2", "/assets/polices/cormorant-garamond-latin-400-italic.woff2",
  "/assets/polices/cormorant-garamond-latin-ext-500-normal.woff2", "/assets/polices/cormorant-garamond-latin-ext-400-italic.woff2",
  "/assets/polices/cormorant-garamond-cyrillic-500-normal.woff2", "/assets/polices/cormorant-garamond-cyrillic-400-italic.woff2",
  "/assets/son_feu.mp3", "/assets/son_souffle_1.mp3", "/assets/son_souffle_2.mp3", "/assets/son_souffle_3.mp3",
  "/assets/son_souffle_4.mp3", "/assets/son_souffle_5.mp3", "/assets/son_souffle_6.mp3",
  "/assets/lotus/lotus-medaillon.js", "/assets/lotus/lotus-medaillon.css", "/assets/lotus/lotus-medaillon.webp", "/assets/lotus/lotus-ether.webp"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c =>
    // un par un : si un fichier manque, les autres sont quand même gardés
    Promise.all(A_GARDER.map(u => c.add(new Request(u, { cache: "reload", credentials: "same-origin" })).catch(() => {})))
  ).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(cles => Promise.all(cles.filter(k => k.startsWith("typ1-") && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

const STABLE = /\.(woff2|png|ico|jpg|mp3)$/;

self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  const url = new URL(r.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/") || url.pathname.endsWith(".mp4") || r.headers.has("range")) return;

  if (STABLE.test(url.pathname)) {
    e.respondWith(caches.match(r, { ignoreSearch: true }).then(gardee => gardee || fetch(r).then(rep => {
      if (rep.ok) { const copie = rep.clone(); caches.open(CACHE).then(c => c.put(r, copie)); }
      return rep;
    })));
    return;
  }

  e.respondWith(fetch(r).then(rep => {
    // on ne garde que les vraies réponses (pas la page de connexion de Vercel ni une erreur)
    if (rep.ok && !rep.redirected) { const copie = rep.clone(); caches.open(CACHE).then(c => c.put(r, copie)); }
    return rep;
  }).catch(() => caches.match(r, { ignoreSearch: true })
    .then(gardee => gardee || (r.mode === "navigate" ? caches.match("/") : Response.error()))));
});
