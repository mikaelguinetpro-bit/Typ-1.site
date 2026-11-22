// Rideau d'ouverture de Typ-1 (Vercel Routing Middleware), comme sur Nebula, Atlas.sea et Hasta La Vista.
//
// Jusqu'au lundi 21 décembre 2026 à 00:00, heure de Paris (= 20 déc. 23:00 UTC),
// les visiteurs voient seulement /bientot.html, avec le décompte. La recherche du feu (/api/) est fermée.
// Ritukah garde l'accès complet grâce à une clé secrète :
//   1. sur Vercel, variable d'environnement TYP1_PREVIEW_KEY = une longue phrase secrète (16 caractères au moins) ;
//   2. il ouvre une fois https://www.typ-1.site/?cle=<la phrase> ;
//   3. un cookie retient la clé 60 jours sur cet appareil.
// À l'heure dite, le rideau se lève tout seul pour tout le monde : rien à faire.
// Pour ouvrir plus tôt : TYP1_OPEN_NOW=1 sur Vercel, puis redéployer.
//
// Pas de bibliothèque : « laisser passer » et « montrer une autre page » s'écrivent avec les en-têtes
// que Vercel lit (x-middleware-next, x-middleware-rewrite). Pas de package.json : api/feu.js reste tel quel.

export const OPEN_AT = Date.UTC(2026, 11, 20, 23, 0, 0); // 21 déc. 2026 00:00 à Paris
const COOKIE = 'typ1_preview';
// Seulement ce dont la page d'attente a besoin (et l'image d'aperçu des liens).
// Tout le reste de /assets/ — les sons, la voix, les vidéos d'introduction — reste derrière le rideau.
const ALWAYS_PUBLIC = [
  /^\/bientot\.(html|css|js)$/,
  /^\/assets\/(apple-touch-icon|favicon-32|icone-192)\.png$/,
  /^\/assets\/typ1_feu_boucle\.mp4$/,
  /^\/assets\/typ1_poster\.jpg$/,
  /^\/assets\/polices\/[\w-]+\.woff2$/,
  /^\/favicon[^/]*$/,
  /^\/robots\.txt$/,
];

export const config = {
  matcher: ['/((?!_vercel).*)'],
};

const laisserPasser = () => new Response(null, { headers: { 'x-middleware-next': '1' } });
const montrer = (url, headers = {}) => new Response(null, { headers: { 'x-middleware-rewrite': String(url), ...headers } });

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function readCookie(request, name) {
  const raw = request.headers.get('cookie') || '';
  for (const part of raw.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return v.join('=');
  }
  return null;
}

export async function gate(request, now) {
  if (now >= OPEN_AT || process.env.TYP1_OPEN_NOW === '1') return laisserPasser();

  const url = new URL(request.url);
  if (ALWAYS_PUBLIC.some((re) => re.test(url.pathname))) return laisserPasser();

  const key = process.env.TYP1_PREVIEW_KEY || '';
  if (key.length >= 16) {
    const expected = await sha256(key);
    const given = url.searchParams.get('cle');
    if (given !== null) {
      url.searchParams.delete('cle');
      if (given === key) {
        return new Response(null, {
          status: 303,
          headers: {
            Location: url.toString(),
            'Set-Cookie': `${COOKIE}=${expected}; Path=/; Max-Age=5184000; HttpOnly; Secure; SameSite=Lax`,
            'Cache-Control': 'no-store',
          },
        });
      }
    }
    if (readCookie(request, COOKIE) === expected) return laisserPasser();
  }

  if (url.pathname.startsWith('/api/')) {
    return new Response(JSON.stringify({ erreur: 'Typ-1 ouvre le 21 décembre.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Retry-After': '86400' },
    });
  }
  return montrer(new URL('/bientot.html', request.url), { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' });
}

// Vercel appelle middleware(request) : l'heure est prise ici, au moment de la visite.
export default function middleware(request) {
  return gate(request, Date.now());
}
