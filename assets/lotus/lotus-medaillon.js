/*
 * Le Lotus de l'Éther — médaillon flottant.
 *
 * Un seul fichier, sans dépendance, posé à l'identique sur les quatre sites
 * offerts (Typ-1, Atlas.Sea, Nebula, Hasta La Vista). Il relie les quatre
 * entre eux et ramène au cœur, BNM1.
 *
 * Le lotus naît de la boue et s'élève : c'est l'histoire de l'Empire.
 *   · quatre pétales ouverts = les quatre sites donnés au monde ;
 *   · le cœur d'or = BNM1, l'Éther, ce qui relie les quatre.
 *
 * Pose-le ainsi, à la fin du <body> :
 *   <script src="/lotus/lotus-medaillon.js"
 *           data-lotus-ici="feu"
 *           data-lotus-coin="bas-droite"
 *           data-lotus-image="/lotus/lotus-ether.webp"></script>
 *
 *   data-lotus-ici    : feu | terre | air | eau — le site où l'on est.
 *                       Son pétale devient « tu es ici » et ne mène nulle part.
 *   data-lotus-coin   : bas-droite (défaut) | bas-gauche | haut-droite | haut-gauche
 *                       En écriture de droite à gauche (arabe), le coin est
 *                       retourné tout seul, pour ne pas tomber sur le reste.
 *   data-lotus-masque-classe : si <body> porte cette classe, le médaillon
 *                       s'efface (ex. quand le Créateur est entré dans le tipi).
 *   data-lotus-image  : chemin de la fleur entière (le panneau ouvert).
 *   data-lotus-rond   : chemin de la version carrée (le médaillon). Déduit du
 *                       précédent si on ne le donne pas.
 *
 * Le Créateur peut le fermer d'un seul clic ; un petit ▲ le rappelle.
 * Son choix est gardé dans son navigateur.
 *
 * La langue est lue sur <html lang="…"> ; à défaut, le français.
 * La devise reste en anglais dans toutes les langues, comme sur BNM1.
 */
(function () {
    'use strict';

    if (window.__lotusEtherPose) return;
    window.__lotusEtherPose = true;

    var script = document.currentScript;
    var ICI = (script && script.dataset.lotusIci) || '';
    var COIN = (script && script.dataset.lotusCoin) || 'bas-droite';
    var IMAGE = (script && script.dataset.lotusImage) || '/lotus/lotus-ether.webp';
    // Le médaillon rond utilise une version carrée, où la fleur remplit le cercle.
    var ROND = (script && script.dataset.lotusRond) || IMAGE.replace(/lotus-ether\.webp$/, 'lotus-medaillon.webp');
    var MASQUE_CLASSE = (script && script.dataset.lotusMasqueClasse) || '';
    var CLE = 'lotus_ether_cache';
    var DEVISE = 'Here, marketing is the offering.';

    // ---------------------------------------------------------------- les mots
    var MOTS = {
        fr: { titre: 'Le Lotus de l’Éther', sous: 'Quatre sites offerts au monde.', ici: 'tu es ici', cacher: 'Cacher le Lotus', rappeler: 'Rappeler le Lotus', fermer: 'Fermer', ouvrir: 'Ouvrir le Lotus', feu: 'Feu', terre: 'Terre', air: 'Air', eau: 'Eau', coeur: 'Le cœur' },
        en: { titre: 'The Lotus of the Ether', sous: 'Four sites given to the world.', ici: 'you are here', cacher: 'Hide the Lotus', rappeler: 'Bring back the Lotus', fermer: 'Close', ouvrir: 'Open the Lotus', feu: 'Fire', terre: 'Earth', air: 'Air', eau: 'Water', coeur: 'The heart' },
        es: { titre: 'El Loto del Éter', sous: 'Cuatro sitios dados al mundo.', ici: 'estás aquí', cacher: 'Ocultar el Loto', rappeler: 'Volver a mostrar el Loto', fermer: 'Cerrar', ouvrir: 'Abrir el Loto', feu: 'Fuego', terre: 'Tierra', air: 'Aire', eau: 'Agua', coeur: 'El corazón' },
        pt: { titre: 'O Lótus do Éter', sous: 'Quatro sites oferecidos ao mundo.', ici: 'estás aqui', cacher: 'Esconder o Lótus', rappeler: 'Trazer o Lótus de volta', fermer: 'Fechar', ouvrir: 'Abrir o Lótus', feu: 'Fogo', terre: 'Terra', air: 'Ar', eau: 'Água', coeur: 'O coração' },
        ru: { titre: 'Лотос Эфира', sous: 'Четыре сайта, подаренных миру.', ici: 'вы здесь', cacher: 'Скрыть Лотос', rappeler: 'Вернуть Лотос', fermer: 'Закрыть', ouvrir: 'Открыть Лотос', feu: 'Огонь', terre: 'Земля', air: 'Воздух', eau: 'Вода', coeur: 'Сердце' },
        ar: { titre: 'لوتس الأثير', sous: 'أربعة مواقع مُهداة إلى العالم.', ici: 'أنت هنا', cacher: 'إخفاء اللوتس', rappeler: 'إظهار اللوتس', fermer: 'إغلاق', ouvrir: 'افتح اللوتس', feu: 'نار', terre: 'أرض', air: 'هواء', eau: 'ماء', coeur: 'القلب' },
        hi: { titre: 'आकाश का कमल', sous: 'दुनिया को दी गई चार साइटें।', ici: 'आप यहाँ हैं', cacher: 'कमल छिपाएँ', rappeler: 'कमल वापस लाएँ', fermer: 'बंद करें', ouvrir: 'कमल खोलें', feu: 'अग्नि', terre: 'पृथ्वी', air: 'वायु', eau: 'जल', coeur: 'हृदय' },
        bn: { titre: 'ইথারের পদ্ম', sous: 'বিশ্বকে দেওয়া চারটি সাইট।', ici: 'আপনি এখানে', cacher: 'পদ্ম লুকান', rappeler: 'পদ্ম ফিরিয়ে আনুন', fermer: 'বন্ধ', ouvrir: 'পদ্ম খুলুন', feu: 'অগ্নি', terre: 'পৃথিবী', air: 'বায়ু', eau: 'জল', coeur: 'হৃদয়' },
        zh: { titre: '以太之莲', sous: '赠予世界的四个网站。', ici: '你在这里', cacher: '隐藏莲花', rappeler: '找回莲花', fermer: '关闭', ouvrir: '打开莲花', feu: '火', terre: '土', air: '风', eau: '水', coeur: '花心' }
    };

    function langue() {
        var l = (document.documentElement.getAttribute('lang') || 'fr').toLowerCase().split('-')[0];
        return MOTS[l] ? l : 'fr';
    }
    var M = MOTS[langue()];
    var RTL = langue() === 'ar';

    // ------------------------------------------------- les pétales et le cœur
    // Le Feu fait la sieste : son pétale mène à sa page de présentation sur BNM1,
    // pas au site lui-même, que seul son gardien peut voir.
    var BNM1 = 'https://brand-new-meta-1.agency';
    var PETALES = [
        { cle: 'feu',   nom: 'Typ-1',            url: BNM1 + '/typ1',          lueur: 'rgba(255,110,40,0.55)',  zone: [42, 24, 15.5, 23] },
        { cle: 'terre', nom: 'AtlasSea.me',      url: 'https://www.atlassea.me',       lueur: 'rgba(120,220,110,0.5)',  zone: [58.5, 45, 23, 24] },
        { cle: 'air',   nom: 'NebulaTkn',        url: 'https://nebulatkn.foundation',  lueur: 'rgba(150,170,255,0.55)', zone: [43, 69, 16, 24] },
        { cle: 'eau',   nom: 'HastaLaVista.org', url: 'https://hasta-la-vista.org',    lueur: 'rgba(90,220,230,0.5)',   zone: [20.5, 50.5, 20.5, 17.5] }
    ];
    var COEUR = { cle: 'coeur', nom: 'BNM1.agency', url: BNM1, lueur: 'rgba(212,175,55,0.6)', zone: [43.5, 48.5, 17, 24] };

    // -------------------------------------------------------------- le style
    var COINS = {
        'bas-droite': 'bottom:1.5rem;right:1.5rem;',
        'bas-gauche': 'bottom:1.5rem;left:1.5rem;',
        'haut-droite': 'top:1.5rem;right:1.5rem;',
        'haut-gauche': 'top:1.5rem;left:1.5rem;'
    };
    // En arabe (et tout dir="rtl"), on retourne le coin : le reste de la page
    // a déjà migré de l'autre côté.
    if ((document.documentElement.getAttribute('dir') || '').toLowerCase() === 'rtl' ||
        (document.documentElement.getAttribute('lang') || '').toLowerCase().indexOf('ar') === 0) {
        COIN = COIN.indexOf('droite') > -1 ? COIN.replace('droite', 'gauche') : COIN.replace('gauche', 'droite');
    }

    var style = document.createElement('style');
    style.textContent = [
        '.lotus-flottant{position:fixed;' + (COINS[COIN] || COINS['bas-droite']) + 'z-index:2147483000;font-family:Georgia,"Times New Roman",serif;}',
        '.lotus-bouton{position:relative;display:block;width:88px;height:88px;border-radius:50%;border:0;padding:0;cursor:pointer;transition:transform .35s ease;background:radial-gradient(circle at 50% 42%, rgba(30,24,44,.97) 0%, rgba(8,8,12,.97) 72%);box-shadow:0 0 22px rgba(0,0,0,.5);}',
        '@media(min-width:768px){.lotus-bouton{width:104px;height:104px;}}',
        '.lotus-bouton:hover,.lotus-bouton:focus-visible{transform:scale(1.08);}',
        '.lotus-bouton img{position:absolute;inset:7%;width:86%;height:86%;object-fit:contain;border-radius:50%;display:block;filter:drop-shadow(0 0 9px rgba(212,175,55,.6));user-select:none;}',
        '.lotus-cercle{position:absolute;inset:0;border-radius:50%;border:2px solid rgba(212,175,55,.5);pointer-events:none;}',
        '.lotus-onde{position:absolute;inset:-14px;border-radius:50%;border:1px solid rgba(212,175,55,.5);pointer-events:none;animation:lotus-onde 6.28s ease-out infinite;}',
        '@keyframes lotus-onde{0%{transform:scale(.72);opacity:.75}100%{transform:scale(1.25);opacity:0}}',
        '.lotus-fermer{position:absolute;top:-2px;right:-2px;width:22px;height:22px;border-radius:50%;background:rgba(10,10,12,.92);border:1px solid rgba(212,175,55,.55);color:rgba(240,214,140,.95);font-size:12px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;opacity:0;transition:opacity .25s;}',
        '.lotus-flottant:hover .lotus-fermer,.lotus-flottant:focus-within .lotus-fermer{opacity:1;}',
        '.lotus-rappel{width:28px;height:28px;border-radius:50%;background:rgba(10,10,12,.78);border:1px solid rgba(212,175,55,.5);color:rgba(240,214,140,.95);font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;}',
        '.lotus-voile{position:fixed;inset:0;z-index:2147483100;background:rgba(5,5,8,.88);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:1.25rem;opacity:0;transition:opacity .4s ease;overflow-y:auto;}',
        '.lotus-voile.ouvert{opacity:1;}',
        '.lotus-panneau{position:relative;width:100%;max-width:560px;text-align:center;color:#EDEAE2;}',
        '.lotus-titre{font-size:12px;letter-spacing:.34em;text-transform:uppercase;color:#D4AF37;font-family:ui-monospace,Menlo,Consolas,monospace;}',
        '.lotus-sous{margin:.6rem 0 0;font-style:italic;color:rgba(237,234,226,.72);font-size:15px;}',
        '.lotus-fleur{position:relative;margin:1rem auto 0;width:100%;max-width:420px;}',
        '.lotus-fleur img{width:100%;display:block;user-select:none;}',
        '.lotus-zone{position:absolute;border-radius:50%;transition:box-shadow .3s,background .3s;display:block;outline:none;}',
        '.lotus-zone:focus-visible{box-shadow:0 0 0 2px rgba(212,175,55,.9);}',
        '.lotus-legende{min-height:76px;margin-top:.5rem;}',
        '.lotus-elem{font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#D4AF37;font-family:ui-monospace,Menlo,Consolas,monospace;}',
        '.lotus-nom{font-size:26px;margin-top:.35rem;}',
        '.lotus-etat{font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:rgba(237,234,226,.45);font-family:ui-monospace,Menlo,Consolas,monospace;margin-top:.35rem;}',
        '.lotus-portes{display:flex;flex-wrap:wrap;gap:1px;background:rgba(212,175,55,.18);border:1px solid rgba(212,175,55,.22);margin-top:1rem;}',
        '.lotus-porte{flex:1 1 140px;background:rgba(10,10,12,.92);padding:.7rem .5rem;color:inherit;text-decoration:none;transition:background .25s;}',
        '.lotus-porte:hover{background:rgba(26,24,32,.96);}',
        '.lotus-porte[aria-disabled="true"]{cursor:default;opacity:.62;}',
        '.lotus-porte b{display:block;font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:#D4AF37;font-weight:400;font-family:ui-monospace,Menlo,Consolas,monospace;}',
        '.lotus-porte span{display:block;font-size:16px;margin-top:.25rem;}',
        '.lotus-devise{margin-top:1.1rem;font-style:italic;font-size:19px;color:#D4AF37;text-shadow:0 0 18px rgba(212,175,55,.35);}',
        '.lotus-quitter{margin-top:1rem;background:transparent;border:1px solid rgba(212,175,55,.35);color:rgba(240,214,140,.9);font-size:10px;letter-spacing:.26em;text-transform:uppercase;padding:.5rem 1.4rem;cursor:pointer;font-family:ui-monospace,Menlo,Consolas,monospace;}',
        '@media(prefers-reduced-motion:reduce){.lotus-onde{animation:none;opacity:0;}.lotus-bouton,.lotus-voile,.lotus-zone{transition:none;}}'
    ].join('\n');
    document.head.appendChild(style);

    // ------------------------------------------------------------- le médaillon
    var hote = document.createElement('div');
    hote.className = 'lotus-flottant';
    hote.setAttribute('data-testid', 'lotus-medaillon');
    document.body.appendChild(hote);

    function cache() { try { return localStorage.getItem(CLE) === '1'; } catch (e) { return false; } }
    function noteCache(v) { try { localStorage.setItem(CLE, v ? '1' : '0'); } catch (e) { /* rien */ } }

    function dessine() {
        hote.innerHTML = '';
        if (cache()) {
            var rappel = document.createElement('button');
            rappel.type = 'button';
            rappel.className = 'lotus-rappel';
            rappel.setAttribute('data-testid', 'lotus-rappel');
            rappel.setAttribute('aria-label', M.rappeler);
            rappel.title = M.rappeler;
            rappel.textContent = '▲';
            rappel.addEventListener('click', function () { noteCache(false); dessine(); });
            hote.appendChild(rappel);
            return;
        }
        var bouton = document.createElement('button');
        bouton.type = 'button';
        bouton.className = 'lotus-bouton';
        bouton.setAttribute('data-testid', 'lotus-ouvrir');
        bouton.setAttribute('aria-label', M.ouvrir);
        bouton.title = M.titre;
        bouton.innerHTML =
            '<span class="lotus-onde"></span>' +
            '<span class="lotus-onde" style="animation-delay:3.14s"></span>' +
            '<img src="' + ROND + '" alt="" loading="lazy" decoding="async" draggable="false">' +
            '<span class="lotus-cercle"></span>';
        bouton.addEventListener('click', ouvre);
        hote.appendChild(bouton);

        var fermer = document.createElement('button');
        fermer.type = 'button';
        fermer.className = 'lotus-fermer';
        fermer.setAttribute('data-testid', 'lotus-cacher');
        fermer.setAttribute('aria-label', M.cacher);
        fermer.title = M.cacher;
        fermer.textContent = '×';
        fermer.addEventListener('click', function (e) { e.stopPropagation(); noteCache(true); dessine(); });
        hote.appendChild(fermer);
    }

    // ---------------------------------------------------------- la fleur ouverte
    var voile = null;
    var rendu = null;

    function legende(p) {
        if (!rendu) return;
        if (!p) { rendu.innerHTML = ''; return; }
        var ici = p.cle === ICI;
        rendu.innerHTML =
            '<div class="lotus-elem">· ' + (M[p.cle] || M.coeur) + ' ·</div>' +
            '<div class="lotus-nom">' + p.nom + '</div>' +
            (ici || p.cle === 'coeur' ? '<div class="lotus-etat">' + M.ici + '</div>' : '');
    }

    function zone(p) {
        var ici = p.cle === ICI || p.cle === 'coeur';
        var el = document.createElement(ici ? 'span' : 'a');
        el.className = 'lotus-zone';
        el.setAttribute('data-testid', 'lotus-zone-' + p.cle);
        el.style.left = p.zone[0] + '%';
        el.style.top = p.zone[1] + '%';
        el.style.width = p.zone[2] + '%';
        el.style.height = p.zone[3] + '%';
        if (!ici) {
            el.href = p.url;
            el.setAttribute('aria-label', (M[p.cle] || '') + ' · ' + p.nom);
        } else {
            el.setAttribute('aria-hidden', 'true');
        }
        function allume() {
            el.style.boxShadow = '0 0 70px 22px ' + p.lueur;
            el.style.background = 'radial-gradient(ellipse at center, ' + p.lueur + ' 0%, transparent 70%)';
            legende(p);
        }
        function eteint() {
            el.style.boxShadow = 'none';
            el.style.background = 'transparent';
            legende(null);
        }
        el.addEventListener('mouseenter', allume);
        el.addEventListener('mouseleave', eteint);
        el.addEventListener('focus', allume);
        el.addEventListener('blur', eteint);
        return el;
    }

    function ouvre() {
        if (voile) return;
        voile = document.createElement('div');
        voile.className = 'lotus-voile';
        voile.setAttribute('data-testid', 'lotus-voile');
        voile.setAttribute('role', 'dialog');
        voile.setAttribute('aria-modal', 'true');
        voile.setAttribute('aria-label', M.titre);
        if (RTL) voile.setAttribute('dir', 'rtl');

        var panneau = document.createElement('div');
        panneau.className = 'lotus-panneau';
        panneau.innerHTML =
            '<div class="lotus-titre">· ' + M.titre + ' ·</div>' +
            '<p class="lotus-sous">' + M.sous + '</p>';

        var fleur = document.createElement('div');
        fleur.className = 'lotus-fleur';
        var img = document.createElement('img');
        img.src = IMAGE;
        img.alt = M.titre;
        img.draggable = false;
        fleur.appendChild(img);
        PETALES.forEach(function (p) { fleur.appendChild(zone(p)); });
        fleur.appendChild(zone(COEUR));
        panneau.appendChild(fleur);

        rendu = document.createElement('div');
        rendu.className = 'lotus-legende';
        rendu.setAttribute('data-testid', 'lotus-legende');
        rendu.setAttribute('aria-live', 'polite');
        panneau.appendChild(rendu);

        var portes = document.createElement('nav');
        portes.className = 'lotus-portes';
        portes.setAttribute('data-testid', 'lotus-portes');
        PETALES.concat([COEUR]).forEach(function (p) {
            var ici = p.cle === ICI;
            var a = document.createElement(ici ? 'span' : 'a');
            a.className = 'lotus-porte';
            a.setAttribute('data-testid', 'lotus-porte-' + p.cle);
            if (ici) a.setAttribute('aria-disabled', 'true');
            else a.href = p.url;
            a.innerHTML = '<b>' + (M[p.cle] || M.coeur) + '</b><span>' + p.nom + '</span>' +
                (ici ? '<b style="color:rgba(237,234,226,.45);margin-top:.3rem">' + M.ici + '</b>' : '');
            a.addEventListener('mouseenter', function () { legende(p); });
            a.addEventListener('mouseleave', function () { legende(null); });
            portes.appendChild(a);
        });
        panneau.appendChild(portes);

        var devise = document.createElement('p');
        devise.className = 'lotus-devise';
        devise.lang = 'en';
        devise.textContent = DEVISE;
        panneau.appendChild(devise);

        var quitter = document.createElement('button');
        quitter.type = 'button';
        quitter.className = 'lotus-quitter';
        quitter.setAttribute('data-testid', 'lotus-quitter');
        quitter.textContent = M.fermer;
        quitter.addEventListener('click', ferme);
        panneau.appendChild(quitter);

        voile.appendChild(panneau);
        voile.addEventListener('click', function (e) { if (e.target === voile) ferme(); });
        document.body.appendChild(voile);
        requestAnimationFrame(function () { voile.classList.add('ouvert'); });
        document.addEventListener('keydown', surTouche);
        quitter.focus();
    }

    function surTouche(e) { if (e.key === 'Escape') ferme(); }

    function ferme() {
        if (!voile) return;
        document.removeEventListener('keydown', surTouche);
        var v = voile;
        voile = null;
        rendu = null;
        v.classList.remove('ouvert');
        setTimeout(function () { if (v.parentNode) v.parentNode.removeChild(v); }, 400);
        var b = hote.querySelector('.lotus-bouton');
        if (b) b.focus();
    }

    dessine();

    // Le médaillon s'efface quand la page le demande (ex. body.dedans sur Typ-1).
    if (MASQUE_CLASSE) {
        var regarde = function () {
            var dedans = document.body.classList.contains(MASQUE_CLASSE);
            hote.style.display = dedans ? 'none' : '';
            if (dedans) ferme();
        };
        regarde();
        if (typeof MutationObserver !== 'undefined') {
            new MutationObserver(regarde).observe(document.body, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    }
})();
