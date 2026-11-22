# Journal de Typ-1

Chaque IA ajoute une entrée **en haut**, à chaque intervention (voir `AGENTS.md`).

## 2026-11-22 — Claude — claude/adresse-typ-1-site — www.typ-1.site
- Typ-1 a son nom de domaine : **www.typ-1.site** (typ-1.site redirige vers www). Aperçu du lien de `index.html`, clé d'aperçu (`middleware.js`, README) et `scripts/tester_rideau.mjs` passent à la nouvelle adresse.
- `bientot.html` reçoit ses balises d'aperçu (poster du feu, déjà public) : un lien partagé avant le 21 décembre s'affiche avec son image.
- `sw.js` : `typ1-v11-2026-11-22`.

## 2026-11-21 — Claude — claude/rideau-ouverture
- Rideau d'ouverture, comme sur Nebula, Atlas.sea et Hasta La Vista : jusqu'au lundi 21 décembre 2026 à 00:00 (Paris), les visiteurs voient seulement le décompte (`bientot.html`, le feu en fond, 9 langues) ; la recherche du feu est fermée.
- Ritukah entre avec sa clé secrète (`TYP1_PREVIEW_KEY` sur Vercel, puis `/?cle=…` une fois par appareil). Le rideau se lève tout seul à minuit.
- `middleware.js` sans bibliothèque (en-têtes Vercel) pour ne pas changer `api/feu.js` ; tests `scripts/tester_rideau.mjs`.
- Pourquoi : demandé par Ritukah, ouverture officielle de Typ-1 au monde entier le 21 décembre.

## 2026-11-21 — Claude — claude/sens-revelation
- **La phrase sous le décompte**, changée par Ritukah : « Soyez prêts, car son nom sera un don. Tout cela pour le salut. Pour votre salut. » Elle ne nomme plus les sens. Et avant leur jour, les sens restent secrets : « · · · » à la place du mot. Ils se découvrent vraiment, un par pétale.
- **Les cinq sens de l'association**, choisis par Ritukah le 21/11/2026, sous le décompte : chaque pétale du Lotus en allume un le jour de son lancement (date de Paris). **Résilience** le 1er décembre (Eau · Hasta La Vista), **Intelligence** le 8 (Air · Nebula), **Sagesse** le 15 (Terre · Atlas.Sea), **Salut** le 21 (Feu · Typ-1). La **Force** arrive avec le nom, à 12h21. Avant leur jour, les mots restent en gris, avec « Un sens s'allume à chaque pétale du Lotus ». Traduit dans les 9 langues.
- Aperçu à une autre date : ajouter `?calendrier=2026-12-08` à l'adresse.
- Dans `lotus/revelation.js` et `revelation.css`, identiques sur les quatre sites offerts. Service worker : version montée.

## 2026-11-21 — Claude — claude/revelation
- **Décidé par Ritukah** : l'association qui porte les quatre sites offerts révèle son nom le **21 décembre 2026 à 12h21, heure de Paris**, au cœur du Lotus, sur BNM1. D'ici là, un décompte sur les quatre sites.
- **Le bandeau de la Révélation**, tout en haut de l'accueil, devant le tipi : l'annonce, le décompte (jours · heures · minutes · secondes), les mots de Ritukah (« Soyez prêts… Pour votre salut. ») et un lien « Au cœur du Lotus → » vers BNM1. À 12h21, il dit : « Le nom est révélé. Il vous attend au cœur du Lotus. » On peut le fermer : il revient à la visite suivante.
- `lotus/revelation.js` et `revelation.css` : **les mêmes fichiers, à l'identique, sur les quatre sites offerts** (comme le médaillon du Lotus). Traduits dans les 9 langues ; le bandeau suit la langue quand elle change sans rechargement.
- **Le nom n'est écrit nulle part** dans ce dépôt ni sur le site : ce code est lisible par tous. Il ne vit que sur le serveur de BNM1.
- Il **s'efface dans le tipi** (`data-revelation-masque-classe="dedans"`, comme le Lotus) et laisse le coin haut-droit au bouton du son (`data-revelation-coin-occupe`, sa croix passe à gauche).
- Service worker : version montée, les deux fichiers ajoutés à la liste gardée.

## 2026-11-19 — Claude — claude/secrets-du-feu
- Les secrets du feu : un mot seul déclenche un moment (élan qui s'arrête devant le feu, bouteille d'Atlas, étincelles au vent pour Nebula, feu bleu et « Adieu ne veut pas dire jamais » pour Hasta La Vista, feu doré et Lotus qui s'ouvre pour BNM1, grande gerbe pour Typ-1, un mot sur Ritukah, merci, un cœur d'étincelles pour « je t'aime »).
- Toujours une vraie recherche possible : le secret ne joue que sur le mot seul, et un bouton « Cherche aussi … sur le web » suit chaque secret. « Élan » : le feu demande l'animal ou le secret.
- Phrases dans les 9 langues. Testé dans Chrome sans erreur (secrets, recherche normale avec un mot de plus, bouton de recherche, Échap avec le Lotus).
- Pourquoi : idée validée par Ritukah, avec sa condition : qu'on puisse toujours faire une vraie recherche sur ces mots.

## 2026-11-18 — Claude — claude/elan-et-sceau
- L'élan messager : parfois, après « Surprends-moi », un élan doré traverse le fond du tipi et laisse une 4e carte « Message de l'élan » qui mène vers un autre site du Sceau (chacun son tour, l'Éther en premier).
- Mon Sceau (emblème + roue) est retiré à la demande de Ritukah : le Lotus de l'Éther (#16, fusionné dans cette branche) fait ce travail sur tous les sites. Un bouton « Le Lotus » sous le champ l'ouvre depuis le tipi ; Échap ferme le Lotus sans sortir du tipi.
- Textes dans les 9 langues. Testé ordinateur, téléphone, arabe.
- Pourquoi : marketing « beau, drôle et utile » voulu par Ritukah, inspiré de son rêve d'élan.

## 2026-11-18 — Claude — claude/lotus-ether
- **Le Lotus de l'Éther** : un médaillon flottant en bas à gauche, qui s'ouvre sur la fleur des quatre sites offerts et ramène au cœur, BNM1. Même objet, même geste, sur les quatre sites — c'est la plaque tournante de l'Empire, et chaque site cesse d'être une impasse.
  - le pétale du **Feu** porte « tu es ici » et ne mène nulle part : on y est ;
  - les trois autres pétales mènent à Atlas.Sea, Nebula et Hasta La Vista ; le cœur d'or mène à BNM1 ;
  - le Créateur le **ferme d'un seul clic** (la croix) ; un petit ▲ le rappelle, et son choix reste sur son appareil ;
  - il **s'efface quand le Créateur est dans le tipi** (`body.dedans`) : le feu doit rester seul ;
  - la pastille « Installer » garde le bas à droite ; en arabe, le médaillon passe tout seul de l'autre côté ;
  - Échap ou un clic à côté referme la fleur.
- Tout tient dans `assets/lotus/` : `lotus-medaillon.js` et son style `lotus-medaillon.css`, sans dépendance, avec ses propres traductions dans les 9 langues (il ne touche pas à `i18n/`), la fleur `lotus-ether.webp` et sa version ronde `lotus-medaillon.webp`. Les mêmes fichiers sont posés à l'identique sur Atlas.Sea, Nebula et Hasta La Vista. Le style est dans son propre fichier (et non injecté) parce que Nebula interdit les styles en ligne ; les quatre sites en profitent.
- Le Lotus **relit la langue** à chaque ouverture, et il n'impose pas de police : il parle avec la typographie de Typ-1.
- **L'aperçu du lien réparé.** `og:image` pointait vers `assets/typ1_poster.jpg`, un chemin relatif : les messageries et les réseaux ne le suivent pas, et la vignette restait vide. L'adresse est maintenant entière, avec `og:url`, `og:type`, les dimensions, le texte de remplacement et les balises Twitter. (Tant que Vercel protège le site, les robots ne verront rien : ce sera prêt au réveil.)
- `sw.js` : `VERSION` montée à `typ1-v3-2026-11-18`, et les trois fichiers du Lotus ajoutés à la liste gardée.
- **La graine de ce site : « Sieste »**. Quand le Créateur ouvre le Lotus, la fleur lui donne la graine d'ici et l'invite à la porter au cœur, sur BNM1. Quatre graines rapportées et la fleur s'ouvre entièrement. Les quatre mots ont été choisis par Ritukah le 18/11/2026, sans accent : ils seront tapés sur neuf claviers différents.
- La fleur a été créée par Ritukah ; elle vient de BNM1, où elle a remplacé la grille des quatre cartes.

## 2026-11-17 — Claude — claude/surprends-moi
- Deux petits boutons sous le champ : « Surprends-moi » et « Braise du jour » (cachés quand on choisit Apaiser).
- Surprends-moi : 3 pages, une drôle, une utile, une belle, avec une étiquette de couleur. Le serveur tire un thème au hasard pour chacune (72 thèmes), Claude cherche de vraies pages ; une page rendue au feu est remplacée par une de rechange.
- Braise du jour : une seule page exceptionnelle, même thème pour tous, plus grande et plus lumineuse. Une seule recherche par jour et par langue (gardée par Vercel et par l'appareil).
- Aperçus d'exemple dans les 9 langues quand il n'y a pas de serveur ; tests du feu complétés ; testé ordinateur, téléphone, arabe, sans serveur.
- Pourquoi : idée de Ritukah ; braise du jour demandée « exceptionnellement belle, drôle ou utile ».
## 2026-11-17 — Claude — claude/installer-discret
- Le bandeau d'installation devient une petite pastille discrète en bas à droite : installer reste un choix, rien ne cache l'accueil.
- La croix réduit la pastille au petit logo rond (au lieu de la cacher 30 jours) ; un clic sur le logo la rouvre. Le choix reste sur l'appareil.
- Pourquoi : demandé par Ritukah (« on dirait qu'on est obligé »). La #13 était déjà fusionnée, d'où cette branche.

## 2026-11-17 — Claude — claude/installable
- Typ-1 s'installe comme une application, comme Nebula, Atlas.sea et BNM1 : manifeste, icônes 512 et « masquables » (le rond du tipi sur la nuit chaude), service worker.
- Une petite pastille « Installer » en bas à droite de l'image d'accueil, discrète : installer reste un choix, elle ne cache ni le titre ni « Toucher pour entrer » (demandé par Ritukah). Sur iPhone, la toucher explique le geste dans Safari. Traduit dans les 9 langues.
- Sans réseau, le tipi s'ouvre quand même (la recherche du feu, elle, a besoin du réseau).
- Testé dans Chrome : manifeste sans erreur, service worker actif, hors ligne, bandeau, iPhone, refus gardé.
- Pourquoi : demandé par Ritukah.

## 2026-11-16 — Claude — claude/sons-et-voix
- Les sons choisis par Ritukah : un souffle quand le feu prend dans la vidéo d'entrée, le crépitement en boucle sans couture ensuite, un petit souffle (6 variantes) à chaque embrasement. Web Audio ; le bouton son reste coupé si on l'a coupé.
- Parler au feu : bouton micro (reconnaissance vocale du navigateur, dans la langue du site) ; la question dite est envoyée au feu, et sert aussi à répondre à sa question.
- Quatre nouveaux textes dans les 9 langues. Testé dans Chrome (micro simulé), sans erreur.
- Pourquoi : demandé par Ritukah, qui a donné son accord pour le micro.
- À faire : confirmer la licence des souffles sur Freesound (mikiko850, n° 848728).

## 2026-11-16 — Claude — claude/question-du-feu
- Idée 1 : quand une demande est trop floue (« jaguar »), le feu pose **une seule** question en retour, avant de chercher, avec 2 à 4 réponses à toucher et « Cherche quand même ». Le Créateur peut aussi répondre avec ses propres mots dans le champ.
- `api/feu.js` : Claude peut répondre `{question, choix}` au lieu de chercher (rarement, seulement si c'est vraiment flou) ; après la réponse du Créateur, il cherche toujours, sans reposer de question.
- Sans serveur, l'aperçu montre la question pour une demande d'un seul mot, avec l'étiquette « Aperçu ».
- Quatre nouveaux textes dans les 9 langues ; tests du feu complétés ; page testée (ordinateur, téléphone, arabe, sans serveur).
- Pourquoi : idée gardée par Ritukah.
- À faire : l'étincelle offerte, puis la braise du jour.
## 2026-11-16 — Claude — claude/typ1-en-ligne
- `AGENTS.md` dit maintenant que Typ-1 est en ligne depuis le 16 novembre 2026 sur https://typ-1site.vercel.app. Il est visible de Ritukah seul pour l'instant, et il « fait la sieste » sur BNM1. Avant, le fichier disait « en préparation, pas encore en ligne ».
- La carte du Sceau suit le même texte que sur BNM1, Nebula et Atlas.
- L'adresse définitive reste à décider ; aujourd'hui, c'est typ-1site.vercel.app.
- Sur BNM1 : logo animé de Typ-1 (en bas à gauche, au-dessus de l'Ange) et carte Feu « Fait la sieste » dans le Sceau (Brand-New-Meta-1.com #47).
- Pourquoi : demandé par Ritukah.

## 2026-11-16 — Claude — claude/icone-du-site
- L'icône du site (onglet du navigateur, écran d'accueil du téléphone) : ronde, avec le tipi entier au milieu (bords de l'image fondus dans le ciel).
- Pourquoi : demandé par Ritukah, l'onglet n'avait pas d'icône.

## 2026-11-16 — Claude — claude/feu-savant
- Le feu est relié au vrai web : `api/feu.js` demande à Claude (Haiku, recherche web intégrée) de choisir 1, 3 ou 5 pages, plus 2 de réserve pour « Rendre au feu ».
- Seules les adresses vraiment trouvées pendant la recherche sont gardées ; une adresse inventée est rejetée.
- La page appelle `api/feu` ; sans serveur, elle montre les exemples comme avant. Les vraies pages ont un titre-lien et leur source ; les braises gardent l'adresse.
- Deux nouveaux textes dans les 9 langues : « rien trouvé » et « limite du jour ».
- Tests : `scripts/tester_feu.js` (sans dépenser), et la page testée avec un faux serveur.
- Pourquoi : Ritukah a choisi Claude pour le feu savant.
- À faire : Ritukah importe le dépôt dans Vercel, ajoute la clé et active la protection ; premier vrai essai ; puis la question en retour, l'étincelle offerte et la braise du jour.

## 2026-11-16 — Claude — claude/neuf-langues
- Le site parle 9 langues (fr, es, en, pt, ru, ar, hi, bn, zh), comme les autres sites : tous les textes sont dans `i18n/<code>.js`, y compris les pages d'exemple et les paroles d'Apaiser.
- Un choix de langue discret en haut de l'accueil ; sinon la langue du navigateur. L'arabe s'écrit de droite à gauche (boutons et panneau inversés).
- Police Cormorant en cyrillique pour le russe ; arabe, hindi, bengali et chinois avec les polices de l'appareil.
- Ligne d'aide d'Apaiser adaptée : 3114 en français, numéro d'urgence local et findahelpline.com ailleurs.
- `scripts/verifier_traductions.py` vérifie que les 9 fichiers ont les mêmes clés.
- Pourquoi : demandé par Ritukah (« comme d'habitude »).
- À faire : faire relire les traductions par des personnes qui parlent ces langues, surtout les paroles d'Apaiser.

## 2026-11-16 — Claude — claude/feu-qui-respire
- Le feu respire quand le Créateur écrit : il s'avive un peu à chaque lettre, avec quelques étincelles.
- Des étincelles montent toujours du feu ; une gerbe jaillit quand on offre une question ; des étincelles accompagnent chaque page qui sort du feu.
- Une page rendue au feu tombe en cendres, qui retournent dans les flammes.
- Tout est dessiné sur une toile par-dessus la vidéo (61 images par seconde à l'essai). Rien ne bouge si le Créateur a demandé de réduire les animations.
- Pourquoi : rendre le feu plus vivant à l'écran (choix de Ritukah), et faire oublier que la boucle du feu ne dure qu'une seconde.
- À faire : le serveur de recherche.

## 2026-11-16 — Claude — claude/feu-vivant
- Le feu change avec l'heure du Créateur (aube, jour, soir, nuit) ; la nuit, Apaiser a ses propres paroles (6 phrases, à relire par Ritukah).
- « Garder près du feu » sur chaque page, et le bouton « Braises » qui les retrouve. Elles restent sur l'appareil (stockage du navigateur), sans compte.
- « Écouter le feu » dans Apaiser : seulement avec une voix installée sur l'appareil, sinon le bouton n'apparaît pas.
- Les six idées gardées par Ritukah sont notées dans `AGENTS.md`.
- Pourquoi : Ritukah a gardé les six idées ; ces trois-là n'ont pas besoin de serveur.
- À faire : la question en retour, l'étincelle offerte et la braise du jour, avec le serveur.

## 2026-11-16 — Claude — claude/le-feu-repond
- Dans le tipi, une fois le feu allumé : un champ pour parler au feu, quatre flammes (Chercher, Apprendre, Voir, Apaiser) et des pages qui sortent du feu (1, 3 ou 5 selon la demande), chacune avec « pourquoi le feu l'a choisie » et « Rendre au feu ».
- Apaiser donne déjà de vraies paroles (12 phrases, à relire par Ritukah), avec la ligne d'aide du 3114 toujours visible.
- Le feu n'est pas encore relié au web : les pages sont des exemples, étiquetées et annoncées comme tels.
- Le concept et ses règles sont notés dans `AGENTS.md`.
- Pourquoi : première étape du concept expliqué par Ritukah, pour juger le geste avant de construire le serveur.
- À faire : le serveur de recherche (outil web + IA, limite par jour), la voix, les autres flammes.

## 2026-11-16 — Claude — claude/accueil-tipi
- Page d'accueil `index.html` : l'image du tipi avec « Créateur, entre dans le tipi / le feu t'attend » ; au clic, la vidéo d'entrée (12 s), puis le feu en boucle à l'infini. Version vidéo légère sur téléphone.
- Bouton « ← Sortir » (en haut à gauche, ou touche Échap) : arrête la vidéo et le feu et revient à l'accueil (demandé par Ritukah).
- Polices hébergées sur le site (`assets/polices/`), comme le demandent les règles. Sources et licences dans `assets/SOURCES.md`.
- Pourquoi : première page de Typ-1, avec l'animation validée par Ritukah.
- À faire : brancher les sons (bloc `SONS` de `index.html`) quand Ritukah aura choisi les fichiers ; la boucle du feu ne dure qu'une seconde (pour un feu plus long, calculer quelques secondes de plus dans Blender).

## 2026-11-16 — Claude — claude/regles-communes
- Ajout de `AGENTS.md` (les règles communes), `CLAUDE.md` (renvoie vers `AGENTS.md`) et de ce journal.
- Pourquoi : appliquer à Typ-1 les règles déjà utilisées sur Atlas.Sea, Nebula, BNM1 et Hasta La Vista, à la demande de Ritukah.
- À faire : quand Typ-1 aura son dépôt et son adresse, mettre à jour la ligne 🔥 Feu du tableau du Sceau dans les autres dépôts (décision de Ritukah).
