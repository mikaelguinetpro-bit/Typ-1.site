// Tests du rideau d'ouverture : node scripts/tester_rideau.mjs
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const dossier = mkdtempSync(join(tmpdir(), 'rideau-'));
writeFileSync(join(dossier, 'm.mjs'), readFileSync(new URL('../middleware.js', import.meta.url)));
const { gate, OPEN_AT } = await import(join(dossier, 'm.mjs'));

const avant = OPEN_AT - 1000, apres = OPEN_AT;
const req = (chemin, cookie) => new Request('https://typ-1site.vercel.app' + chemin, { headers: cookie ? { cookie } : {} });
const passe = (r) => r.headers.get('x-middleware-next') === '1';
const rideau = (r) => (r.headers.get('x-middleware-rewrite') || '').endsWith('/bientot.html');

assert.equal(new Date(OPEN_AT).toISOString(), '2026-12-20T23:00:00.000Z', 'minuit à Paris le 21 décembre');
process.env.TYP1_PREVIEW_KEY = 'une longue phrase secrète du feu';
delete process.env.TYP1_OPEN_NOW;

assert.ok(rideau(await gate(req('/'), avant)), 'avant : le visiteur voit le décompte');
assert.ok(rideau(await gate(req('/index.html'), avant)));
let r = await gate(req('/api/feu'), avant);
assert.equal(r.status, 503, 'avant : la recherche du feu est fermée (aucun coût)');
for (const p of ['/bientot.html', '/bientot.css', '/bientot.js', '/assets/typ1_poster.jpg', '/favicon.ico']) assert.ok(passe(await gate(req(p), avant)), p);
assert.ok(rideau(await gate(req('/?cle=mauvaise%20cle'), avant)), 'mauvaise clé : rideau');

r = await gate(req('/?cle=' + encodeURIComponent(process.env.TYP1_PREVIEW_KEY)), avant);
assert.equal(r.status, 303); assert.equal(r.headers.get('location'), 'https://typ-1site.vercel.app/', 'la clé disparaît de l\'adresse');
const cookie = r.headers.get('set-cookie').split(';')[0];
assert.ok(!cookie.includes('phrase'), 'le cookie ne contient pas la clé en clair');
assert.ok(passe(await gate(req('/', cookie), avant)), 'avec le cookie : Ritukah entre');
assert.ok(passe(await gate(req('/api/feu', cookie), avant)), 'avec le cookie : le feu cherche');

process.env.TYP1_PREVIEW_KEY = 'court';
assert.ok(rideau(await gate(req('/', cookie), avant)), 'clé trop courte : personne n\'entre');

assert.ok(passe(await gate(req('/'), apres)), 'à minuit : ouvert à tous');
assert.ok(passe(await gate(req('/api/feu'), apres)));
process.env.TYP1_OPEN_NOW = '1';
assert.ok(passe(await gate(req('/'), avant)), 'ouverture anticipée');
console.log('Tous les tests du rideau passent.');
