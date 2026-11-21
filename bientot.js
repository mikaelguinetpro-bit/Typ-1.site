// Page « Bientôt » de Typ-1 : décompte jusqu'au 21 décembre 2026, 00:00 à Paris (20 déc. 23:00 UTC).
(function () {
  var OPEN_AT = Date.UTC(2026, 11, 20, 23, 0, 0);
  var T = {
    fr: { kicker: "Typ-1 · L'élément Feu", title: "Le feu s'allume bientôt", date: "Lundi 21 décembre à minuit, heure de Paris.", days: "jours", hours: "heures", minutes: "minutes", seconds: "secondes", line: "Le jour du solstice d'hiver, le feu s'allume pour le monde entier. À très vite, Créateur." },
    en: { kicker: "Typ-1 · The Fire element", title: "The fire lights up soon", date: "Monday 21 December at midnight, Paris time.", days: "days", hours: "hours", minutes: "minutes", seconds: "seconds", line: "On the day of the winter solstice, the fire lights up for the whole world. See you very soon, Creator." },
    es: { kicker: "Typ-1 · El elemento Fuego", title: "El fuego se enciende pronto", date: "Lunes 21 de diciembre a medianoche, hora de París.", days: "días", hours: "horas", minutes: "minutos", seconds: "segundos", line: "El día del solsticio de invierno, el fuego se enciende para el mundo entero. Hasta muy pronto, Creador." },
    pt: { kicker: "Typ-1 · O elemento Fogo", title: "O fogo se acende em breve", date: "Segunda-feira, 21 de dezembro, à meia-noite, horário de Paris.", days: "dias", hours: "horas", minutes: "minutos", seconds: "segundos", line: "No dia do solstício de inverno, o fogo se acende para o mundo inteiro. Até muito em breve, Criador." },
    ru: { kicker: "Typ-1 · Стихия Огня", title: "Огонь скоро зажжётся", date: "Понедельник, 21 декабря, в полночь по парижскому времени.", days: "дней", hours: "часов", minutes: "минут", seconds: "секунд", line: "В день зимнего солнцестояния огонь зажжётся для всего мира. До скорой встречи, Создатель." },
    ar: { kicker: "Typ-1 · عنصر النار", title: "النار تشتعل قريبًا", date: "الاثنين 21 ديسمبر عند منتصف الليل بتوقيت باريس.", days: "أيام", hours: "ساعات", minutes: "دقائق", seconds: "ثوانٍ", line: "في يوم الانقلاب الشتوي، تشتعل النار للعالم كله. إلى اللقاء قريبًا أيها المبدع." },
    hi: { kicker: "Typ-1 · अग्नि तत्व", title: "आग जल्द जलेगी", date: "सोमवार 21 दिसंबर, आधी रात, पेरिस समय।", days: "दिन", hours: "घंटे", minutes: "मिनट", seconds: "सेकंड", line: "शीत अयनांत के दिन, आग पूरी दुनिया के लिए जलेगी। जल्द मिलेंगे, निर्माता।" },
    bn: { kicker: "Typ-1 · আগুনের উপাদান", title: "আগুন শিগগিরই জ্বলবে", date: "সোমবার ২১ ডিসেম্বর মধ্যরাতে, প্যারিস সময়।", days: "দিন", hours: "ঘণ্টা", minutes: "মিনিট", seconds: "সেকেন্ড", line: "শীতকালীন অয়নান্তের দিনে, আগুন জ্বলবে গোটা পৃথিবীর জন্য। শিগগিরই দেখা হবে, সৃষ্টিকর্তা।" },
    zh: { kicker: "Typ-1 · 火之元素", title: "火即将点燃", date: "12 月 21 日星期一午夜（巴黎时间）。", days: "天", hours: "小时", minutes: "分钟", seconds: "秒", line: "冬至这一天，火为全世界点燃。很快见，创造者。" }
  };
  var choisie = null;
  try { choisie = localStorage.getItem("typ1_langue"); } catch (e) {}
  var lang = [choisie].concat((navigator.languages || [navigator.language || "fr"]).map(function (l) { return String(l).slice(0, 2).toLowerCase(); }))
    .filter(function (l) { return l && T[l]; })[0] || "fr";
  var dict = T[lang];
  document.documentElement.lang = lang;
  if (lang === "ar") document.documentElement.dir = "rtl";
  document.title = "Typ-1 — " + dict.title;
  [].forEach.call(document.querySelectorAll("[data-t]"), function (el) { el.textContent = dict[el.getAttribute("data-t")]; });

  var pad = function (n) { return n < 10 ? "0" + n : String(n); };
  var ids = ["d", "h", "m", "s"].map(function (id) { return document.getElementById(id); });
  function tick() {
    var left = Math.max(0, OPEN_AT - Date.now());
    if (left === 0) { setTimeout(function () { location.reload(); }, 5000); return; } // le rideau se lève : on recharge la page demandée
    var s = Math.floor(left / 1000);
    var parts = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
    parts.forEach(function (v, i) { ids[i].textContent = pad(v); });
    setTimeout(tick, 1000 - (Date.now() % 1000));
  }
  tick();
})();
