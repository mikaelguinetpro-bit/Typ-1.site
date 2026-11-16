# Règles communes — Typ-1

Ce fichier s'adresse à toutes les IA qui travaillent sur ce dépôt (Claude, ChatGPT / Codex, et toute autre).
**À lire en entier avant chaque intervention**, avec `JOURNAL.md` (ce qui a déjà été fait).

## Le projet

**Typ-1.help**, pour Tipi, est l'élément **Feu** du Sceau de l'Empire (décidé par Ritukah le 14 novembre 2026). Il est **en préparation, pas encore en ligne**. Le dépôt GitHub s'appelle `Typ-1.site`.

- **Site** : site statique, à la racine du dépôt.
  - `index.html` : la page d'accueil. L'image du tipi avec « Créateur, entre dans le tipi / le feu t'attend » ; au clic, la vidéo d'entrée se lance, puis le feu brûle en boucle à l'infini.
  - `assets/` : les vidéos (`typ1_intro_1080.mp4` pour les grands écrans, `typ1_intro_720.mp4` pour les téléphones, `typ1_feu_boucle.mp4` pour le feu sans fin), l'image d'accueil (`typ1_poster.jpg`) et, plus tard, les sons.
- **L'animation d'entrée** (12 s, 24 images par seconde) a été fabriquée dans Blender et calculée sur RunPod. Son mouvement est **validé par Ritukah** : l'étincelle, la caméra, les traînées, le tipi qui grandit, la braise, la naissance du feu, et la pause de 1,2 s au début. Ne pas le changer sans son accord. Les fichiers Blender ne sont pas dans ce dépôt ; l'historique de leur fabrication est dans le document de projet `typ1-animation-resume.md`.
- **Le concept** (décidé par Ritukah le 16 novembre 2026) : une fois dans le tipi, **le Créateur parle au feu**, au clavier ou à la voix, et **des pages sortent du feu**. C'est une recherche sur le web faite par l'IA, plus précise qu'un moteur classique :
  - le nombre de pages **s'adapte à la demande** : 1 (question précise), 3 (un choix à faire) ou 5 (une exploration) ;
  - chaque page dit **pourquoi le feu l'a choisie** ; le Créateur peut la **rendre au feu** pour en recevoir une autre ;
  - **les flammes** sont des recherches spécialisées. Première version : **Chercher**, **Apprendre** (tutoriels), **Voir** (vidéos), **Apaiser** (le feu offre des paroles qui font du bien). Idées pour plus tard : Lire, Outils, Vérifier, Créer ;
  - pas de publicité, pas de pistage du Créateur ; le feu a le droit de dire qu'il n'a rien trouvé de fiable.
- **Apaiser** : le feu ne se fait jamais passer pour un thérapeute, et la ligne d'aide (le 3114 en France) reste toujours visible avec les paroles. Ne pas la retirer.
- **État actuel** : le feu **n'est pas encore relié au web**. Les pages affichées sont des **exemples**, étiquetées « Exemple », avec une note visible. Ne jamais présenter une page d'exemple comme un vrai résultat. La vraie recherche demandera un serveur et aura un coût par recherche : à décider avec Ritukah.
- **Le son** : prêt à brancher dans le bloc `SONS` de `index.html` (son d'entrée, crépitement du feu). **La voix du feu viendra plus tard**, en surprise.

## Ce qui reste à décider par Ritukah

Ne rien construire sur ces points sans son accord :
- l'adresse définitive (Typ-1.help) et l'hébergement ;
- les **langues** du site (les autres sites en parlent 9 : français, espagnol, anglais, portugais, russe, arabe, hindi, bengali, chinois) ;
- le **serveur** de la vraie recherche (quel outil de recherche web, quelle IA, combien de recherches offertes par jour à chaque Créateur) ;
- la **voix** (parler au feu) : la reconnaissance vocale du navigateur passe par un service extérieur, il faut l'accord de Ritukah avant de la brancher.

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
| 🔥 Feu | Typ-1.help — pour Tipi (en préparation, pas encore en ligne) | `Typ-1.site` |
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
