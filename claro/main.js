/* Duett — Versão F · "Claro" */
(function () {
  var D = window.DUETT, c = D.c, M = c.media, esc = P.esc;
  var hl = c.hero.lines;

  var html = P.header() + '<main id="main">' +

  '<section class="hero" id="top"><canvas aria-hidden="true"></canvas><div class="wrap">' +
    '<span class="badge"><b>Duett</b><span>SaaS · Cloud Computing</span></span>' +
    '<h1 class="split">' + fx.splitLetters(hl[0] + ' ' + hl[1] + ' <em>' + hl[2] + '</em> ' + hl[3]) + '</h1>' +
    '<p class="lead">' + c.hero.sub + '</p>' +
    '<div class="ctas">' + P.starBtn() + P.whatsBtn('btn--ghost') + '</div>' +
    '<div class="hero__media reveal"><figure><img src="' + M.hero + '" alt="" fetchpriority="high"></figure>' +
      '<div class="seal" aria-hidden="true">' + fx.circularText('Duett Software · Novo Hamburgo · RS · ') + '<span class="mk">' + duettLogo({ markOnly: true }) + '</span></div></div>' +
  '</div></section>' +

  '<section class="clients" aria-label="' + esc(P.plain(c.clients.title)) + '"><div class="wrap"><p>' + c.clients.text + '</p>' + P.clientsLoop() + '</div></section>' +

  '<section class="section" id="servicos"><div class="wrap">' +
    '<div class="head center reveal"><span class="eyebrow">' + c.services.eyebrow + '</span><h2 class="h2">' + c.services.title + '</h2><p class="lead">' + c.services.text + '</p></div>' +
    '<div class="rows">' + c.services.items.map(function (s, i) {
      return '<article class="row reveal">' + P.ic(i) + '<h3>' + s.title + '</h3><p>' + s.text + '</p><span class="go" aria-hidden="true">' + kit.arrow + '</span></article>';
    }).join('') + '</div>' +
    '<div class="banner reveal"><span>' + c.services.banner + '</span><a class="btn btn--sm" href="#contato">' + c.nav.contact + kit.arrow + '</a></div>' +
    '<div class="reveal">' + P.serviceTabs() + '</div>' +
    '<div class="stats reveal">' + P.stats() + '</div>' +
  '</div></section>' +

  '<section class="section section--alt" id="projetos"><div class="wrap projects">' +
    '<div class="reveal"><span class="eyebrow">' + c.projects.eyebrow + '</span><h2 class="h2">' + c.projects.title + '</h2>' +
      '<div class="list">' + c.projects.items.map(function (p) { return '<button type="button" class="swap__dot">' + p.title + '</button>'; }).join('') + '</div></div>' +
    '<div class="swap reveal" aria-live="polite">' + c.projects.items.map(function (p, i) {
      return '<article class="swap__card"><figure><img src="' + M.projects[i][0] + '" alt="' + esc(p.title) + '" loading="lazy"></figure><div class="body"><h3>' + p.title + '</h3><p>' + p.text + '</p></div></article>';
    }).join('') + '</div>' +
  '</div></section>' +

  '<section class="section" id="metodologia"><div class="wrap">' +
    '<div class="head center reveal"><span class="eyebrow">' + c.method.eyebrow + '</span><h2 class="h2">' + c.method.title + '</h2><p class="lead">' + c.method.text + '</p></div>' +
    '<div class="reveal">' + P.stepper() + '</div>' +
  '</div></section>' +

  '<section class="section section--alt" id="sobre"><div class="wrap">' +
    '<div class="about"><div class="reveal"><span class="eyebrow">' + c.about.eyebrow + '</span><h2 class="h2" style="margin-bottom:20px">' + c.about.bannerTitle + '</h2>' +
      c.about.text.map(function (t) { return '<p>' + t + '</p>'; }).join('') + '<p>' + c.about.bannerText + '</p></div>' +
      '<figure class="reveal"><img src="' + M.servicesBanner + '" alt="" loading="lazy"></figure></div>' +
    '<div class="mv"><article class="reveal"><h3>' + c.about.mission.title + '</h3><p>' + c.about.mission.text + '</p></article><article class="reveal"><h3>' + c.about.vision.title + '</h3><p>' + c.about.vision.text + '</p></article></div>' +
    '<div style="margin-top:clamp(56px,8vw,96px)" class="reveal"><span class="eyebrow">' + c.values.eyebrow + '</span><h2 class="h2">' + c.values.title + '</h2>' +
      '<div class="values">' + c.values.items.map(function (v) { return '<div><h4>' + v.title + '</h4><p>' + v.text + '</p></div>'; }).join('') + '</div></div>' +
    '<div style="margin-top:clamp(48px,6vw,72px)" class="reveal"><span class="eyebrow">' + c.about.techTitle + '</span>' + P.techLoop() + '</div>' +
  '</div></section>' +

  '<section class="section" id="contato"><div class="wrap">' +
    '<div class="cta reveal"><canvas aria-hidden="true"></canvas><h2>' + c.help.title + '</h2><p>' + c.help.text + '</p><div class="ctas">' + P.starBtn() + P.whatsBtn('btn--ghost') + '</div></div>' +
    '<div class="head center reveal" style="margin-top:clamp(64px,8vw,104px)"><h2 class="h2">' + c.contact.title + '</h2><p class="lead">' + c.contact.text + '</p></div>' +
    '<div class="contact">' + P.contactCards('reveal') + '</div>' +
    '<div class="careers reveal">' + P.careers(M.team) + '</div>' +
    '<div class="social reveal">' + P.social() + '</div>' +
  '</div></section>' +
  '</main>' + P.footer();

  document.getElementById('app').innerHTML = html;
  P.init('claro');
  fx.splitIn(document.querySelector('.hero h1'), 100);
  fx.squares(document.querySelector('.hero canvas'), { size: 48, line: 'rgba(65,70,255,.10)', fill: 'rgba(65,70,255,.08)', speed: .2, fadeColor: '#ffffff' });
  fx.squares(document.querySelector('.cta canvas'), { size: 52, line: 'rgba(255,255,255,.14)', fill: 'rgba(255,255,255,.10)', speed: .25, fadeColor: '#4146ff' });
  fx.cardSwap(document.querySelector('.swap'), 4200);
  fx.stepper(document.querySelector('.stp'));
  fx.clickSpark('#4146ff');
})();
