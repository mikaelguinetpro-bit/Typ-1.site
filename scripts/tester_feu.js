/* Teste api/feu.js sans appeler la vraie API : une fausse réponse de Claude remplace l'appel.
   Usage : node scripts/tester_feu.js */
const assert = require("assert");
process.env.ANTHROPIC_API_KEY = "test";
const feu = require("../api/feu.js");

function fausseReponse(json, urls) {
  return { ok: true, json: async () => ({
    stop_reason: "end_turn",
    content: [
      { type: "server_tool_use", name: "web_search", input: { query: "x" } },
      { type: "web_search_tool_result", content: urls.map(u => ({ type: "web_search_result", url: u, title: "t" })) },
      { type: "text", text: "Voici :\n" + JSON.stringify(json) }
    ]
  }) };
}
function faux(res) { const r = { code: 0, corps: null, headers: {} };
  r.setHeader = (k, v) => { r.headers[k] = v; }; r.status = c => { r.code = c; return r; }; r.json = j => { r.corps = j; return r; }; return r; }

(async () => {
  const vraies = ["https://exemple.org/a", "https://www.site.fr/b", "https://video.com/c", "https://d.net/d"];
  const reponse = {
    pages: [
      { titre: "A", url: vraies[0], source: "Exemple", meta: "Page", resume: "r", pourquoi: "p" },
      { titre: "Inventée", url: "https://invente.com/x", resume: "r", pourquoi: "p" },   // pas dans les résultats : rejetée
      { titre: "B", url: vraies[1], resume: "r", pourquoi: "p" },
      { titre: "A en double", url: vraies[0] }                                          // doublon : rejeté
    ],
    reserve: [{ titre: "C", url: vraies[2] }, { titre: "D", url: vraies[3] }, { titre: "E", url: vraies[0] }]
  };
  const original = feu.appelerClaude;
  feu.appelerClaude = (q, f, l) => original(q, f, l, async () => fausseReponse(reponse, vraies));

  let r = faux(); await feu({ method: "POST", body: { q: "apprendre le piano", flamme: "apprendre", langue: "es" } }, r);
  assert.equal(r.code, 200);
  assert.deepEqual(r.corps.pages.map(p => p.titre), ["A", "B"], "seules les vraies adresses restent");
  assert.equal(r.corps.pages[1].source, "site.fr", "source déduite de l'adresse");
  assert.deepEqual(r.corps.reserve.map(p => p.titre), ["C", "D"], "la réserve exclut les doublons");

  r = faux(); await feu({ method: "POST", body: JSON.stringify({ q: "" }) }, r);
  assert.equal(r.code, 400, "question vide refusée");

  r = faux(); await feu({ method: "GET" }, r);
  assert.equal(r.code, 405);

  feu.appelerClaude = (q, f, l) => original(q, f, l, async () => ({ ok: true, json: async () => ({ stop_reason: "end_turn", content: [{ type: "text", text: "pas de JSON" }] }) }));
  r = faux(); await feu({ method: "POST", body: { q: "x" } }, r);
  assert.equal(r.code, 200); assert.deepEqual(r.corps, { pages: [], reserve: [] }, "réponse illisible : rien, sans planter");

  feu.appelerClaude = (q, f, l) => original(q, f, l, async () => ({ ok: false, status: 401, text: async () => "clé invalide" }));
  r = faux(); await feu({ method: "POST", body: { q: "x" } }, r);
  assert.equal(r.code, 502, "erreur de l'API : 502");

  // pause_turn : la fonction relance et accumule les résultats
  let n = 0;
  feu.appelerClaude = (q, f, l) => original(q, f, l, async () => {
    n++;
    if (n === 1) return { ok: true, json: async () => ({ stop_reason: "pause_turn", content: [{ type: "web_search_tool_result", content: [{ url: vraies[0] }] }] }) };
    return fausseReponse({ pages: [{ titre: "A", url: vraies[0] }, { titre: "D", url: vraies[3] }] }, [vraies[3]]);
  });
  r = faux(); await feu({ method: "POST", body: { q: "x" } }, r);
  assert.equal(n, 2); assert.deepEqual(r.corps.pages.map(p => p.titre), ["A", "D"], "résultats gardés d'un tour à l'autre");

  delete process.env.ANTHROPIC_API_KEY;
  r = faux(); await feu({ method: "POST", body: { q: "x" } }, r);
  assert.equal(r.code, 503, "sans clé : 503");
  console.log("Tous les tests du feu passent.");
})().catch(e => { console.error(e); process.exit(1); });
