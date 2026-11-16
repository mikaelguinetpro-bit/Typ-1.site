# Journal de Typ-1

Chaque IA ajoute une entrée **en haut**, à chaque intervention (voir `AGENTS.md`).

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
