"""Vérifie que les 9 fichiers de langue (i18n/*.js) ont exactement les mêmes clés que fr.js,
le même nombre d'exemples et de paroles, et que {q} est au même endroit.
Usage : python3 scripts/verifier_traductions.py"""
import json, pathlib, sys

LANGUES = ["fr", "es", "en", "pt", "ru", "ar", "hi", "bn", "zh"]
DOSSIER = pathlib.Path(__file__).resolve().parent.parent / "i18n"

def lire(code):
    texte = (DOSSIER / f"{code}.js").read_text(encoding="utf-8")
    debut = texte.index(f".{code} = ") + len(f".{code} = ")
    return json.loads(texte[debut:texte.rindex(";")])

def comparer(ref, autre, chemin, erreurs):
    if type(ref) is not type(autre):
        erreurs.append(f"{chemin} : type différent")
    elif isinstance(ref, dict):
        for k in ref.keys() - autre.keys(): erreurs.append(f"{chemin}.{k} : manquant")
        for k in autre.keys() - ref.keys(): erreurs.append(f"{chemin}.{k} : en trop")
        for k in ref.keys() & autre.keys(): comparer(ref[k], autre[k], f"{chemin}.{k}", erreurs)
    elif isinstance(ref, list):
        if len(ref) != len(autre): erreurs.append(f"{chemin} : {len(autre)} éléments au lieu de {len(ref)}")
        for i, (a, b) in enumerate(zip(ref, autre)): comparer(a, b, f"{chemin}[{i}]", erreurs)
    elif isinstance(ref, str):
        if ("{q}" in ref) != ("{q}" in autre): erreurs.append(f"{chemin} : {{q}} présent d'un côté seulement")
        if not autre.strip(): erreurs.append(f"{chemin} : vide")

fr = lire("fr")
total = 0
for code in LANGUES:
    erreurs = []
    try:
        d = lire(code)
        if d.get("code") != code: erreurs.append("code : ne correspond pas au nom du fichier")
        comparer(fr, d, code, erreurs)
    except Exception as e:
        erreurs.append(f"fichier illisible : {e}")
    ignorer = {f"{code}.code : type différent"}
    erreurs = [e for e in erreurs if e not in ignorer]
    total += len(erreurs)
    print(f"{code} : {'OK' if not erreurs else str(len(erreurs)) + ' erreur(s)'}")
    for e in erreurs: print("   ", e)
sys.exit(1 if total else 0)
