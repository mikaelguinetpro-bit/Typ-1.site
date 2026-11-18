/*
 * Le feu savant — la fonction serveur de Typ-1.
 * Le navigateur du Créateur envoie sa question ; cette fonction demande à Claude (API d'Anthropic)
 * de chercher sur le web et de choisir 1, 3 ou 5 pages, puis renvoie ces pages au feu.
 * Si la demande est trop floue, le feu pose d'abord UNE question en retour (avec 2 à 4 réponses
 * possibles) ; le Créateur répond, et cette fois le feu cherche sans plus rien demander.
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

// --- « Surprends-moi » et la braise du jour -----------------------------------
// Une IA à qui l'on dit juste « une page au hasard » propose toujours les mêmes : le serveur tire donc
// un thème au hasard dans ces réserves, et Claude va chercher une vraie page sur ce thème.
const THEMES = {
  drole: [
    "un site web absurde qui ne sert à rien mais fait rire", "un jeu en ligne idiot et génial", "les inventions les plus bizarres de l'histoire",
    "des animaux qui font des choses inattendues", "un générateur en ligne drôle", "les records du monde les plus étranges",
    "des panneaux ou des notices mal traduits", "la science des choses ridicules (prix Ig Nobel)", "des cartes du monde décalées",
    "des métiers insolites", "des lois étranges encore en vigueur", "un simulateur loufoque dans le navigateur",
    "des chats et des chiens qui font des bêtises célèbres", "l'histoire drôle d'un objet du quotidien", "des recettes improbables qui marchent",
    "des expériences scientifiques amusantes à faire chez soi", "un musée des objets ratés", "des mots intraduisibles et rigolos",
    "des sports bizarres pratiqués quelque part dans le monde", "des illusions d'optique", "des erreurs célèbres qui ont donné quelque chose de génial",
    "des bruits et sons étonnants à écouter en ligne", "des statues et monuments insolites", "un quiz amusant et surprenant"
  ],
  utile: [
    "un outil en ligne gratuit et méconnu", "une astuce pour mieux dormir", "apprendre une compétence pratique en 10 minutes",
    "un site pour réparer soi-même ses objets", "une méthode simple pour mieux s'organiser", "un outil gratuit pour retoucher ou créer des images",
    "apprendre les premiers secours", "un site pour apprendre une langue gratuitement", "des astuces de cuisine qui changent tout",
    "un outil pour protéger sa vie privée en ligne", "un site de cartes et d'itinéraires à pied ou à vélo", "comprendre son argent simplement",
    "un outil pour taper plus vite ou mieux écrire", "jardiner sur un balcon", "un site de musique libre et gratuite",
    "une bibliothèque en ligne de livres gratuits", "un outil pour apprendre à coder en s'amusant", "des exercices simples pour le dos",
    "fabriquer quelque chose avec des objets de récupération", "un site pour identifier une plante ou un oiseau", "un convertisseur ou calculateur malin",
    "des astuces pour économiser l'énergie à la maison", "un site pour apprendre à dessiner", "une technique de mémoire efficace"
  ],
  belle: [
    "des photos de l'espace prises par un télescope", "une carte interactive magnifique", "les fonds marins et leurs créatures",
    "des aurores boréales en direct ou en images", "une œuvre d'art numérique interactive", "des architectures incroyables du monde",
    "la beauté des cristaux et minéraux au microscope", "des forêts anciennes et arbres remarquables", "des musiques du monde à écouter",
    "un musée qu'on peut visiter en ligne", "des webcams en direct sur la nature sauvage", "les plus beaux ciels étoilés du monde",
    "des volcans en activité", "l'art des motifs et de la géométrie dans la nature", "des bibliothèques parmi les plus belles du monde",
    "la migration des animaux vue d'en haut", "des photos anciennes en couleur", "un artiste qui crée avec la lumière",
    "les déserts et leurs paysages", "des jardins japonais", "la Terre vue depuis la Station spatiale", "des insectes vus de très près",
    "des ponts et routes spectaculaires", "une expérience sonore ou visuelle apaisante"
  ]
};
// La braise du jour : un thème par jour (le même pour tous), choisi parmi ceux-ci selon la date
const THEMES_BRAISE = [
  "le ciel et l'espace", "les océans", "les animaux étonnants", "les inventions géniales", "l'art du monde entier", "la musique",
  "les jeux en ligne merveilleux", "la nature sauvage", "les outils gratuits qui changent la vie", "l'histoire étonnante",
  "les langues et les mots", "la cuisine du monde", "les cartes et les voyages", "la science expliquée simplement", "les livres",
  "les montagnes et volcans", "le corps humain", "les arbres et les forêts", "la photographie", "l'architecture",
  "les illusions et énigmes", "les insectes et petites bêtes", "la Terre vue d'en haut", "les fêtes et traditions du monde",
  "les mathématiques belles et drôles", "la météo et les phénomènes du ciel", "le cinéma d'animation", "les déserts", "les oiseaux", "la lumière et les couleurs"
];
const GENRES = ["drole", "utile", "belle"];
const tirer = l => l[Math.floor(Math.random() * l.length)];

const DECOUVERTE = `Le Créateur ne te demande rien de précis : il veut découvrir. Cherche des pages vivantes et originales, du genre qu'on a envie de montrer à un ami :
petits sites étonnants, outils gratuits, merveilles du web, jeux, cartes, images. Évite les pages évidentes (accueil de Wikipédia, listes « top 10 » sans âme, grands sites que tout le monde connaît déjà).
Tout public : rien de choquant, de méchant, d'effrayant, de politique ni de vulgaire.
Une page dans la langue du Créateur est mieux ; une page en anglais va si elle est visuelle, ludique ou exceptionnelle.
Chaque page a un champ « genre » : "drole", "utile" ou "belle" (belle veut aussi dire étonnante).`;

function systemeDecouverte(mode, langue) {
  const forme = mode === "braise"
    ? `C'est la braise du jour : UNE seule page, exceptionnellement belle, drôle ou utile — un vrai trésor, celui qu'on garde et qu'on montre à tout le monde. Sois très exigeant.
Ajoute dans « reserve » 1 page de rechange aussi exceptionnelle.`
    : `C'est « Surprends-moi » : exactement 3 pages, une de chaque genre, dans cet ordre : une drôle, une utile, une belle.
Ajoute dans « reserve » jusqu'à 3 pages de rechange (de préférence une de chaque genre).`;
  return `Tu es le feu sacré de Typ-1, un site où un « Créateur » parle au feu, et où des pages « sortent du feu ».
${DECOUVERTE}
${forme}

Règles absolues :
- N'utilise QUE des adresses (url) qui figurent dans les résultats de tes recherches. N'invente jamais une adresse, un titre ou un fait.
- Si tu ne trouves rien d'assez bon, renvoie moins de pages : jamais une page médiocre.
- Pas de pages de vente déguisées, pas de fermes à contenu.
- Écris tous les textes en ${LANGUES[langue]}, en tutoyant le Créateur, avec des mots simples et un peu d'émerveillement.

Réponds UNIQUEMENT avec un objet JSON, sans texte autour, de cette forme :
{"pages":[{"genre":"drole|utile|belle","titre":"…","url":"https://…","source":"nom du site","meta":"type · détail court","resume":"une ou deux phrases","pourquoi":"pourquoi le feu l'a choisie, en une phrase qui commence par une minuscule"}],"reserve":[…mêmes champs…]}`;
}
function demandeSurprise() {
  return `Surprends-moi ! Pistes tirées au hasard par le feu (si tu trouves mieux tout près de chaque piste, prends-le) :
- drôle : ${tirer(THEMES.drole)}
- utile : ${tirer(THEMES.utile)}
- belle : ${tirer(THEMES.belle)}`;
}
function demandeBraise(jour) {
  let h = 0;
  for (const c of jour) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `Offre-moi la braise du jour (${jour}). Thème du jour, comme piste : ${THEMES_BRAISE[h % THEMES_BRAISE.length]}.
Choisis le genre qui donnera la page la plus exceptionnelle.`;
}
// la date du jour à Paris : la braise change à minuit, heure de Ritukah
const jourParis = (d = new Date()) => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(d);

const PEUT_DEMANDER = `Avant de chercher : si la demande est vraiment trop floue pour bien choisir des pages
(un mot qui a plusieurs sens très différents, ou une information essentielle qui manque, comme le lieu pour une recherche près de chez soi),
NE CHERCHE PAS et réponds seulement avec ce JSON : {"question":"une seule question courte","choix":["2 à 4 réponses courtes possibles"]}.
Fais-le rarement : si tu peux deviner raisonnablement ce que veut le Créateur, cherche directement.`;
const NE_DEMANDE_PLUS = "Le Créateur a déjà répondu à ta question : ne pose plus aucune question, cherche directement.";

function systeme(flamme, langue, dejaDemande) {
  if (flamme === "surprise" || flamme === "braise") return systemeDecouverte(flamme, langue);
  return `Tu es le feu sacré de Typ-1, un site où un « Créateur » pose une question au feu, et où des pages « sortent du feu ».
${CONSIGNES[flamme]}

${dejaDemande ? NE_DEMANDE_PLUS : PEUT_DEMANDER}

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

async function appelerClaude(question, flamme, langue, suite = {}, fetchFn = fetch) {
  const dejaDemande = !!suite.precision;
  const contenu = dejaDemande
    ? `${question}\n\n(Le feu a demandé : « ${suite.questionFeu || "…"} » — le Créateur a répondu : « ${suite.precision} »)`
    : question;
  const messages = [{ role: "user", content: contenu }];
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
        system: systeme(flamme, langue, dejaDemande),
        messages,
        tools: [{ type: "web_search_20250305", name: "web_search", max_uses: flamme === "surprise" ? 4 : 3 }]
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
  return { texte, urlsVues, dejaDemande };
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
      ...(GENRES.includes(p.genre) ? { genre: p.genre } : {}),
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

// Un tour du feu de plus aujourd'hui ? (limite par jour, pour ne jamais dépasser le budget)
function compter() {
  const aujourdhui = new Date().toISOString().slice(0, 10);
  if (jour !== aujourdhui) { jour = aujourdhui; compte = 0; }
  if (compte >= LIMITE_JOUR) return false;
  compte++;
  return true;
}

// GET /api/feu?braise=AAAA-MM-JJ&langue=fr — la braise du jour.
// La réponse est gardée par le réseau de Vercel jusqu'au lendemain : une seule recherche par jour et par langue.
async function braiseDuJour(req, res, params) {
  const jourDemande = params.get("braise") || "";
  const langue = LANGUES[params.get("langue")] ? params.get("langue") : "fr";
  const hier = jourParis(new Date(Date.now() - 864e5)), demain = jourParis(new Date(Date.now() + 864e5));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(jourDemande) || jourDemande < hier || jourDemande > demain) return res.status(400).json({ erreur: "jour" });
  if (!compter()) return res.status(429).json({ erreur: "limite" });
  try {
    const { texte, urlsVues } = await feu.appelerClaude(demandeBraise(jourDemande), "braise", langue);
    const d = lireJSON(texte) || {};
    const pages = filtrer([...(Array.isArray(d.pages) ? d.pages : []), ...(Array.isArray(d.reserve) ? d.reserve : [])], urlsVues, 1);
    if (pages.length) res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=93600");
    return res.status(200).json({ jour: jourDemande, pages, reserve: [] });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ erreur: "feu" });
  }
}

async function feu(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "GET") {
    const params = new URL(req.url || "/", "http://typ-1").searchParams;
    if (params.has("braise")) return braiseDuJour(req, res, params);
  }
  if (req.method !== "POST") return res.status(405).json({ erreur: "methode" });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ erreur: "cle" });

  let corps = req.body || {};
  if (typeof corps === "string") { try { corps = JSON.parse(corps); } catch (e) { corps = {}; } }
  const surprise = corps.mode === "surprise";
  const question = surprise ? demandeSurprise() : propre(corps.q, 200);
  const flamme = surprise ? "surprise" : FLAMMES.includes(corps.flamme) ? corps.flamme : "chercher";
  const langue = LANGUES[corps.langue] ? corps.langue : "fr";
  if (!question) return res.status(400).json({ erreur: "question" });
  const suite = { precision: propre(corps.precision, 120), questionFeu: propre(corps.questionFeu, 160) };

  if (!compter()) return res.status(429).json({ erreur: "limite" });

  try {
    const { texte, urlsVues } = await feu.appelerClaude(question, flamme, langue, suite);
    const d = lireJSON(texte) || {};
    // le feu pose une question en retour (une seule fois : jamais après une précision du Créateur)
    const qf = propre(d.question, 160);
    if (qf && !surprise && !suite.precision && !(Array.isArray(d.pages) && d.pages.length)) {
      const choix = (Array.isArray(d.choix) ? d.choix : []).map(c => propre(c, 40)).filter(Boolean).slice(0, 4);
      return res.status(200).json({ pages: [], reserve: [], question: qf, choix });
    }
    const pages = filtrer(d.pages, urlsVues, surprise ? 3 : 5);
    const reserve = filtrer(d.reserve, urlsVues, surprise ? 3 : 2).filter(p => !pages.some(x => x.url === p.url));
    return res.status(200).json({ pages, reserve });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ erreur: "feu" });
  }
}
feu.appelerClaude = appelerClaude;   // remplaçable dans les tests
feu.filtrer = filtrer;
feu.lireJSON = lireJSON;
feu.demandeBraise = demandeBraise;
module.exports = feu;
