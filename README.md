# Typ-1

Site Typ-1 — élément Feu du Sceau.

## Page d'accueil — « Créateur, entre dans le tipi »

- `index.html` : image d'accueil avec la phrase ; au clic, la vidéo d'entrée (12 s) se lance, puis le feu brûle en boucle à l'infini.
- `assets/typ1_intro_1080.mp4` (grands écrans) et `assets/typ1_intro_720.mp4` (téléphones) : l'animation d'entrée, rendue dans Blender.
- `assets/typ1_feu_boucle.mp4` : le feu en boucle sans coupure.
- `assets/typ1_poster.jpg` : l'image d'accueil (première image de la vidéo).

### Ajouter le son

Déposer les fichiers dans `assets/`, puis écrire leur nom dans `index.html`, bloc `SONS` :

```js
const SONS = {
  entree: "assets/son_etincelle.mp3",
  feu: "assets/son_feu.mp3"
};
```

Un petit bouton pour couper le son apparaît alors en haut à droite.

## Le feu savant (la vraie recherche)

`api/feu.js` est une fonction serveur : elle demande à Claude (API d'Anthropic) de chercher sur le web et renvoie 1, 3 ou 5 pages.

Mise en place chez Vercel :
1. Importer ce dépôt dans Vercel (type de projet : « Other », aucun réglage de construction).
2. Dans *Settings → Environment Variables*, ajouter `ANTHROPIC_API_KEY` (la clé créée sur platform.claude.com). Facultatif : `FEU_LIMITE_JOUR` (100 par défaut).
3. Dans *Settings → Deployment Protection*, activer *Vercel Authentication* pour que le site reste privé.

Tester sans appeler la vraie API : `node scripts/tester_feu.js`. Vérifier les traductions : `python3 scripts/verifier_traductions.py`.
