/*
 * Le feu savant — la fonction serveur de Typ-1.
 * Le navigateur du Créateur envoie sa question ; cette fonction demande à Claude (API d'Anthropic)
 * de chercher sur le web et de choisir 1, 3 ou 5 pages, puis renvoie ces pages au feu.
 *
 * Réglages (variables d'environnement, chez l'hébergeur — jamais dans le dépôt) :
 *   ANTHROPIC_API_KEY   la clé de l'API Claude (obligatoire)
 *   FEU_MODELE          le modèle (par défaut claude-haiku-5-5)
 *   FEU_LIMITE_JOUR     nombre de recherches par jour pour une instance (par défaut 100)
 */

const MODELE = process.env.FEU_MODELE || "claude-haiku-5-5";
const LIMITE_JOUR = Number(process.env.FEU_LIMITE_JOUR || 100);
const FLAMMES = ["chercher", "apprendre", "voir"];
const LANGUES = {
  fr: "français", es: "espagnol", en: "anglais", pt: "portugais (du Brésil)", ru: "russe",
  ar: "arabe", hi: "hindi", bn: "bengali", zh: "chinois simplifié"
};

// Compteur du jour (approximatif : il repart à zéro si la fonction redémarre).
// La vraie protection du porte-monnaie est la limite de dépenses réglée dans la console Claude.
let jour = "", compte = 0;

const CONSIGNES = {
  chercher: "Trouve les meilleures pages du web pour répondre à la demande : claires, fiables, sans publicité envahissante, écrites de préférence par des humains qui connaissent le sujet. Varie les points de vue quand c'est utile.",
  apprendre: "Trouve les meilleurs tutoriels et cours pour apprendre ce que demande le Créateur. Dans « meta », indique le niveau (débutant, avancé…) et la durée ou le nombre d'étapes si la page les donne.",
  voir: "Trouve les meilleures vidéos (YouTube ou autres) sur la demande. Dans « meta », indique la durée si elle est connue, et le moment précis où se trouve la réponse seulement si une source le dit."
};

function systeme(flamme, langue) {
  return `Tu es le feu sacré de Typ-1, un site où un « Créateur » pose une question au feu, et où des pages « sortent du feu ».
${CONSIGNES[flamme]}

Combien de pages :
- 1 page si la demande est une question précise qui a une seule bonne réponse (une heure, un chiffre, une date, une définition) ;
- 3 pages si le Créateur doit faire un choix ou comparer ;
- 5 pages si c'est une exploration ou un sujet large.
Ajoute en plus, dans « reserve », jusqu'à 2 autres bonnes pages, données si le Créateur rend une page au feu.

Règles absolues :
- N'utilise QUE des adresses (url) qui figurent dans les résultats de tes recherches. N'invente jamais une adresse, un titre ou un fait.
- Si tu ne trouves rien de fiable, renvoie des listes vides : le feu a le droit de dire qu'il n'a rien trouvé.
- Pas de pages de vente déguisées, pas de fermes à contenu.
- Écris tous les textes en ${LANGUES[langue]}, en tutoyant le Créateur, avec des mots simples.

Réponds UNIQUEMENT avec un objet JSON, sans texte autour, de cette forme :
{"pages":[{"titre":"…","url":"https://…","source":"nom du site","meta":"type · durée ou détail court","resume":"une ou deux phrases","pourquoi":"pourquoi le feu l'a choisie, en une phrase qui commence par une minuscule"}],"reserve":[…mêmes champs…]}`;
}

async function appelerClaude(question, flamme, langue, fetchFn = fetch) {
  const messages = [{ role: "user", content: question }];
  const urlsVues = new Set();
  let texte = "";
  for (let tour = 0; tour < 3; tour++) {
    const r = await fetchFn("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: MODELE,
        max_tokens: 2000,
        system: systeme(flamme, langue),
        messages,
        tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 3 }]
      })
    });
    if (!r.ok) {
      const detail = await r.text();
      throw new Error(`API Claude ${r.status} : ${detail.slice(0, 300)}`);
    }
    const rep = await r.json();
    for (const b of rep.content || []) {
      if (b.type === "web_search_tool_result" && Array.isArray(b.content)) {
        for (const res of b.content) if (res && res.url) urlsVues.add(res.url);
      }
      if (b.type === "text") texte += b.text;
    }
    if (rep.stop_reason !== "pause_turn") break;
    // la recherche a été mise en pause : on laisse Claude reprendre là où il en était
    messages.push({ role: "assistant", content: rep.content });
  }
  return { texte, urlsVues };
}

function lireJSON(texte) {
  const debut = texte.indexOf("{"), fin = texte.lastIndexOf("}");
  if (debut < 0 || fin <= debut) return null;
  try { return JSON.parse(texte.slice(debut, fin + 1)); } catch (e) { return null; }
}

const propre = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Ne garde que les pages bien formées dont l'adresse vient vraiment des résultats de recherche
function filtrer(liste, urlsVues, max) {
  if (!Array.isArray(liste)) return [];
  const vues = new Set();
  const sortie = [];
  for (const p of liste) {
    const url = propre(p && p.url, 600);
    if (!/^https?:\/\//i.test(url) || !urlsVues.has(url) || vues.has(url)) continue;
    vues.add(url);
    let site = "";
    try { site = new URL(url).hostname.replace(/^www\./, ""); } catch (e) { continue; }
    sortie.push({
      titre: propre(p.titre, 140) || site,
      url,
      source: propre(p.source, 60) || site,
      meta: propre(p.meta, 90),
      resume: propre(p.resume, 280),
      pourquoi: propre(p.pourquoi, 200)
    });
    if (sortie.length >= max) break;
  }
  return sortie;
}

async function feu(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ erreur: "methode" });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ erreur: "cle" });

  let corps = req.body || {};
  if (typeof corps === "string") { try { corps = JSON.parse(corps); } catch (e) { corps = {}; } }
  const question = propre(corps.q, 200);
  const flamme = FLAMMES.includes(corps.flamme) ? corps.flamme : "chercher";
  const langue = LANGUES[corps.langue] ? corps.langue : "fr";
  if (!question) return res.status(400).json({ erreur: "question" });

  const aujourdhui = new Date().toISOString().slice(0, 10);
  if (jour !== aujourdhui) { jour = aujourdhui; compte = 0; }
  if (compte >= LIMITE_JOUR) return res.status(429).json({ erreur: "limite" });
  compte++;

  try {
    const { texte, urlsVues } = await feu.appelerClaude(question, flamme, langue);
    const d = lireJSON(texte) || {};
    const pages = filtrer(d.pages, urlsVues, 5);
    const reserve = filtrer(d.reserve, urlsVues, 2).filter(p => !pages.some(x => x.url === p.url));
    return res.status(200).json({ pages, reserve });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ erreur: "feu" });
  }
}
feu.appelerClaude = appelerClaude;   // remplaçable dans les tests
feu.filtrer = filtrer;
feu.lireJSON = lireJSON;
module.exports = feu;
