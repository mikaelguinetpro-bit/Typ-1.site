# Journal de Typ-1

Chaque IA ajoute une entrée **en haut**, à chaque intervention (voir `AGENTS.md`).

## 2026-11-17 — Claude — claude/installer-discret
- Le bandeau d'installation devient une petite pastille discrète en bas à droite : installer reste un choix, rien ne cache l'accueil.
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
