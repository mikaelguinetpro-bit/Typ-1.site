# Règles communes — Typ-1

Ce fichier s'adresse à toutes les IA qui travaillent sur ce dépôt (Claude, ChatGPT / Codex, et toute autre).
**À lire en entier avant chaque intervention**, avec `JOURNAL.md` (ce qui a déjà été fait).

## Le projet

**Typ-1.help**, pour Tipi, est l'élément **Feu** du Sceau de l'Empire (décidé par Ritukah le 14 novembre 2026). Il est **en ligne depuis le 16 novembre 2026** sur https://typ-1site.vercel.app, mais **visible de Ritukah seul pour l'instant** : sur BNM1, il « fait la sieste ». Le dépôt GitHub s'appelle `Typ-1.site`.

- **Site** : site statique, à la racine du dépôt.
  - `index.html` : la page d'accueil. L'image du tipi avec « Créateur, entre dans le tipi / le feu t'attend » ; au clic, la vidéo d'entrée se lance, puis le feu brûle en boucle à l'infini.
  - `assets/` : les vidéos (`typ1_intro_1080.mp4` pour les grands écrans, `typ1_intro_720.mp4` pour les téléphones, `typ1_feu_boucle.mp4` pour le feu sans fin), l'image d'accueil (`typ1_poster.jpg`) et, plus tard, les sons.
- **L'animation d'entrée** (12 s, 24 images par seconde) a été fabriquée dans Blender et calculée sur RunPod. Son mouvement est **validé par Ritukah** : l'étincelle, la caméra, les traînées, le tipi qui grandit, la braise, la naissance du feu, et la pause de 1,2 s au début. Ne pas le changer sans son accord. Les fichiers Blender ne sont pas dans ce dépôt ; l'historique de leur fabrication est dans le document de projet `typ1-animation-resume.md`.
- **Le concept** (décidé par Ritukah le 16 novembre 2026) : une fois dans le tipi, **le Créateur parle au feu**, au clavier ou à la voix, et **des pages sortent du feu**. C'est une recherche sur le web faite par l'IA, plus précise qu'un moteur classique :
  - le nombre de pages **s'adapte à la demande** : 1 (question précise), 3 (un choix à faire) ou 5 (une exploration) ;
  - chaque page dit **pourquoi le feu l'a choisie** ; le Créateur peut la **rendre au feu** pour en recevoir une autre ;
  - **les flammes** sont des recherches spécialisées. Première version : **Chercher**, **Apprendre** (tutoriels), **Voir** (vidéos), **Apaiser** (le feu offre des paroles qui font du bien). Idées pour plus tard : Lire, Outils, Vérifier, Créer ;
  - pas de publicité, pas de pistage du Créateur ; le feu a le droit de dire qu'il n'a rien trouvé de fiable.
- **Les six idées gardées par Ritukah** (16 novembre 2026) :
  1. **Le feu pose une question en retour** quand une demande est floue : une seule question, avant de chercher, avec 2 à 4 réponses à toucher (ou ses propres mots), et toujours « Cherche quand même ». Le feu ne pose jamais une deuxième question à la suite. *(fait ; sans serveur, l'aperçu la montre pour une demande d'un seul mot)*
  2. **Offrir une page comme une étincelle** : on l'envoie à quelqu'un, qui la voit arriver en étincelle. *(à faire, demande le serveur)*
  3. **La braise du jour** : chaque jour, une page **exceptionnellement** belle, drôle ou utile (exigence de Ritukah), même thème pour tous. *(fait : `GET /api/feu?braise=AAAA-MM-JJ&langue=xx`, gardée par le réseau de Vercel jusqu'au lendemain, donc une seule recherche par jour et par langue ; l'appareil la garde aussi ; elle change à minuit, heure de Paris)*
  - **« Surprends-moi »** (idée de Ritukah, 17 novembre 2026) : 3 pages, une **drôle**, une **utile**, une **belle**, avec leur étiquette. Le serveur tire un thème au hasard pour chacune dans `THEMES` (`api/feu.js`), Claude cherche une vraie page. Tout public, jamais de page inventée. Pour varier les surprises, on peut agrandir les listes de thèmes.
  - **L'élan messager** (rêve de Ritukah, 18 novembre 2026) : environ une « Surprends-moi » sur quatre (jamais plus de 5 sans lui), un élan doré traverse le fond du tipi et laisse une 4e carte « Message de l'élan », chaque fois un autre élément du Sceau (la première fois : l'Éther). Les phrases de ses cartes sont dans la liste `SCEAU` et les textes `site_*` (9 langues). Pour le voir à coup sûr pendant un test : ajouter `?elan` à l'adresse.
  - **Le Lotus de l'Éther** (PR #16, conversation BNM1) remplace le Sceau que j'avais dessiné : c'est le même médaillon sur les cinq sites, en bas à gauche de l'accueil. Dans le tipi il se cache ; le bouton « Le Lotus » sous le champ l'ouvre. Échap ferme le Lotus sans sortir du tipi. Ne pas recréer un deuxième objet qui relie les sites (choix de Ritukah, 18 novembre 2026).
  - **Règle d'honnêteté** : les autres sites de Ritukah sont montrés ouvertement (élan, Lotus), **jamais glissés en cachette dans les résultats de recherche du feu**.
  4. **Le feu change avec l'heure** : doré à l'aube, rouge et intime la nuit ; la nuit, Apaiser parle plus doucement. *(fait)*
  5. **Les braises gardées** : le Créateur garde une page près du feu. Elles restent **sur son appareil seulement**, sans compte. *(fait)*
  6. **La voix du feu** : le feu lit la parole d'Apaiser, avec **une voix installée sur l'appareil seulement** (rien ne part sur Internet). *(fait ; le bouton n'apparaît que si l'appareil a une voix française)*
- **Apaiser** : le feu ne se fait jamais passer pour un thérapeute, et la ligne d'aide (le 3114 en France) reste toujours visible avec les paroles. Ne pas la retirer.
- **Le feu savant** (décidé par Ritukah le 16 novembre 2026) : la recherche passe par **Claude** (API d'Anthropic, modèle Haiku, avec sa recherche web intégrée).
  - Le code est dans `api/feu.js`, une fonction serveur hébergée **chez Vercel, avec le site**. La clé `ANTHROPIC_API_KEY` vit **seulement** dans les réglages de Vercel, jamais dans le dépôt ni dans un message.
  - **Règle absolue** : une page n'arrive au Créateur que si son adresse vient vraiment des résultats de recherche (`filtrer` dans `api/feu.js`). Une adresse inventée par l'IA est rejetée. Ne jamais retirer ce contrôle.
  - Le portefeuille est protégé par la **limite de dépenses** réglée dans la console Claude, et par `FEU_LIMITE_JOUR` (100 recherches par jour par défaut).
  - Sans serveur (aperçu, fichier ouvert sur l'ordinateur), la page montre les **exemples**, étiquetés « Exemple », avec la note visible. Ne jamais présenter un exemple comme un vrai résultat.
  - Tester sans dépenser : `node scripts/tester_feu.js`.
- **Les langues** (décidé par Ritukah le 16 novembre 2026) : le site parle **9 langues**, les mêmes que les autres sites : français (langue source), espagnol, anglais, portugais, russe, arabe (de droite à gauche), hindi, bengali, chinois.
  - Tous les textes sont dans `i18n/<code>.js`. **Aucun texte en dur** dans `index.html` : un texte affiché porte `data-i18n` (ou `data-i18n-aria`, `data-i18n-alt`, `data-i18n-html`), ou passe par `T("cle")` dans le script.
  - Un texte ajouté ou changé en français l'est **dans les 9 fichiers, dans la même branche**. Vérifier avec `python3 scripts/verifier_traductions.py` (mêmes clés, même nombre d'exemples et de paroles, `{q}` au même endroit).
  - « Créateur » se traduit comme sur Nebula : Creador, Creator, Criador, Создатель, المبدع, निर्माता, সৃষ্টিকর্তা, 创造者. Le feu tutoie le Créateur dans toutes les langues.
  - La ligne d'aide d'Apaiser change selon la langue : le **3114** en français (France), et dans les autres langues le numéro d'urgence local et **findahelpline.com**. Ne jamais la retirer.
  - La langue choisie reste sur l'appareil du Créateur ; sinon le site prend celle de son navigateur, puis le français.
- **Installable comme une application** (demandé par Ritukah le 17 novembre 2026, comme Nebula, Atlas.sea et BNM1) : `manifest.webmanifest` + `sw.js`. Une petite pastille « Installer » en bas à droite, discrète (installer n'est jamais obligatoire, elle ne doit rien cacher de l'accueil), lance l'installation (Chrome, Edge, Android) ou explique le geste sur iPhone. La croix ne fait que **réduire** la pastille au petit logo rond, et un clic sur le logo la rouvre : on ne la fait jamais disparaître (choix de Ritukah). Le service worker ne touche **jamais** à `/api/` ni aux vidéos. **À chaque changement de fichier gardé, monter `VERSION` dans `sw.js`.** Le manifeste se charge avec `crossorigin="use-credentials"` : sans ça, la protection Vercel bloque l'installation.
- **Le son** (fichiers choisis par Ritukah, 16 novembre 2026) : un souffle quand le feu prend dans la vidéo d'entrée (vers 8,35 s), puis le crépitement en boucle ; un petit souffle chaque fois que le feu s'embrase. Tout passe par Web Audio (boucle sans trou). Le bouton 🔊 coupe tout, et ce choix reste sur l'appareil. Origine et licences : `assets/SOURCES.md`.
- **Parler au feu** (accord de Ritukah le 16 novembre 2026) : bouton micro dans le champ, seulement si le navigateur sait faire. La voix est transformée en texte **par le service du navigateur** (Google pour Chrome, Apple pour Safari) : le site le dit dans l'info-bulle du bouton. La question dite est envoyée au feu toute seule.

## Ce qui reste à décider par Ritukah

Ne rien construire sur ces points sans son accord :
- l'adresse définitive (Typ-1.help ou une autre ; aujourd'hui typ-1site.vercel.app, hébergé chez Vercel) ;
- quand le site sera **ouvert à tous** : combien de recherches offrir chaque jour à chaque Créateur (pour l'instant, le site est privé, visible par Ritukah seul) ;

## Les mots du projet

- Le visiteur est un **« Créateur »**, sur tous les sites de Ritukah. Ne jamais parler d'« utilisateurs » ni de « clients ».
- Les noms propres ne se traduisent pas : Typ-1, Tipi, Atlas.Sea, NbL, Nebula, BNM1, Hasta La Vista, Yuka · Yaka · Taha.
- La monnaie s'écrit **NbL** sur tous les sites (décidé par Ritukah). Le NbL est **100 % don** : on ne le vend jamais, on n'en fixe aucun prix, aucun vocabulaire d'investissement.

## Qualité attendue

- **Beau** : nuit chaude, braise et or ; polices **Cormorant Garamond** (titres), hébergées sur le site (`assets/polices/`, licence SIL OFL : ne pas supprimer `OFL.txt`).
- **Accessible** : textes lisibles, navigation au clavier, réglage « réduire les animations » respecté, **site utilisable sur téléphone** (vérifier qu'aucune page ne déborde sur un écran de 390 px).
- **Léger** : vidéos compressées pour le web, pas de fichier lourd inutile. La version 720p sert aux téléphones.
- **Vérifier avant la Pull Request** : ouvrir la page dans un navigateur, sur ordinateur et en format téléphone, et regarder la séquence entière (accueil → clic → vidéo → feu en boucle).

## Le Sceau de l'Empire (les sites de Ritukah)

Ce dépôt fait partie d'un ensemble de sites. Pour rester cohérent avec les autres, voici la carte telle qu'elle est affichée aujourd'hui sur brand-new-meta-1.agency :

| Élément | Site | Dépôt GitHub |
|---|---|---|
| 🔥 Feu | Typ-1 — pour Tipi — typ-1site.vercel.app (en ligne depuis le 16 novembre 2026, visible du seul Ritukah pour l'instant : il « fait la sieste ») | `Typ-1.site` |
| 🌍 Terre | Atlas.Sea — atlassea.me | `Atlas.sea` |
| 💨 Air | Nebula — www.nebulatkn.foundation | `NebulaTkn.foundation` |
| 💧 Eau | Hasta La Vista — hasta-la-vista.org | `Hasta-La-Vista` |
| ✨ Éther | BNM1 — brand-new-meta-1.agency, ce qui relie les quatre | `Brand-New-Meta-1.com` |

- Carte décidée par Ritukah le 14 novembre 2026 : les quatre sites donnés suivent l'ordre du zodiaque (Feu, Terre, Air, Eau) ; BNM1 n'en fait plus partie, il est l'Éther qui les relie.
- Philosophie commune : **le Triangle Ultime** (⅓ Dons · ⅓ Travail · ⅓ Plaisir — le Don, le Recevoir, l'Abondance). Les Trois Célestes : **Yuka · Yaka · Taha**.
- Toute modification de cette carte, d'un élément ou d'un texte qui parle d'un autre site doit être **décidée par Ritukah** et répercutée dans les autres dépôts concernés.
- Hasta La Vista ne parle pas encore des autres sites : ce lien n'est pas décidé. Ne pas le construire sans accord.
- Plus aucune mention, aucun badge ni script **Emergent** sur les sites (Ritukah a quitté Emergent en novembre 2026).

## Qui décide

- **Ritukah est le seul à décider.** Les IA proposent et Ritukah choisit ce qui est gardé.
- Une IA ne change jamais la direction du projet (le ton, les textes de fond, la mythologie, l'identité visuelle) sans l'accord explicite de Ritukah. Avant de retirer ou remplacer un de ses textes, lui demander son avis.
- Ritukah préfère des explications claires et directes, sans jargon, et une seule question à la fois quand il faut trancher.
- Quand une demande est ambiguë, **demander avant de faire** plutôt que deviner.

## Comment travailler

1. **Une seule IA à la fois.** Avant de commencer, récupérer la dernière version de `main`.
2. **Chaque IA travaille sur sa propre branche** et ne modifie jamais `main` directement :
   - Claude : `claude/<sujet>` (exemple : `claude/son-du-feu`)
   - ChatGPT : `chatgpt/<sujet>`
3. **Une branche = un sujet.** Pas de mélange de plusieurs améliorations dans la même branche.
4. Quand le travail est prêt, l'IA ouvre une **Pull Request** vers `main`. Ritukah la relit, puis l'accepte (« Merge ») ou la refuse. Avancer pas à pas.
5. Ne pas rappeler sans cesse à Ritukah de fusionner les Pull Requests : vérifier soi-même si c'est fait, et le lui dire seulement si ce n'est pas le cas.
6. Les échanges avec Ritukah, les messages de commit, les Pull Requests et le journal sont **en français**, courts et clairs : ce qui a changé et pourquoi.

## Ce qui est interdit

- Réécrire ou supprimer l'historique : pas de `git push --force` ni de `git reset` sur `main`.
- Ajouter des outils, des bibliothèques ou des services extérieurs (paiement, statistiques, traceurs, polices hébergées ailleurs…) sans accord. Polices, images, vidéos et scripts sont **hébergés sur le site** : rien ne se charge depuis l'extérieur.
- Mettre des mots de passe, des clés d'API ou des données personnelles dans le dépôt. Les secrets vivent chez l'hébergeur ; le dépôt ne contient que des modèles `.env.example` sans valeurs.
- Toucher aux DNS ou aux comptes d'hébergement : c'est Ritukah qui le fait, l'IA lui donne les étapes.
- Ajouter un son ou une image sans connaître sa licence : seulement des fichiers libres d'usage (CC0 ou licence équivalente), et noter leur source dans `assets/SOURCES.md`.

## Annuler le travail d'une autre IA

C'est permis, à condition de le faire proprement :
- annuler avec `git revert` (l'annulation reste visible dans l'historique et peut elle-même être annulée) ;
- dire dans le message de commit et dans le journal **ce qui a été annulé, et pourquoi**.

## Le journal

À chaque intervention, ajouter une entrée **en haut** de `JOURNAL.md`, sur ce modèle :

```
## AAAA-MM-JJ — Nom de l'IA — branche
- Ce qui a changé
- Pourquoi
- Ce qui reste à faire ou à vérifier
```
