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
