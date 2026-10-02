/* Duett — Versão G · "Noite" */
(function () {
  var D = window.DUETT, c = D.c, M = c.media, esc = P.esc, plain = P.plain;
  var hl = c.hero.lines;
  var svcNames = c.services.items.map(function (s) { return plain(s.title); });
  var projNames = c.projects.items.map(function (p) { return p.title; });

  var html = P.header() + '<main id="main">' +

  '<section class="hero" id="top"><canvas aria-hidden="true"></canvas><div class="wrap">' +
    '<div><span class="chip"><b>●</b> SaaS · Cloud Computing</span>' +
      '<h1 class="decrypt">' + fx.decryptWords(hl[0] + ' ' + hl[1] + ' <em>' + hl[2] + '</em> ' + hl[3]) + '</h1>' +
      '<p class="lead">' + c.hero.sub + '</p>' +
      '<div class="ctas">' + P.starBtn() + P.whatsBtn('btn--ghost') + '</div></div>' +
    '<div class="tilt"><div class="card tilt__in"><img src="' + M.hero + '" alt="" fetchpriority="high"><span class="glare" aria-hidden="true"></span>' +
      '<div class="mini-stat"><b class="count" data-to="' + c.about.founded + '" data-from="1990">' + c.about.founded + '</b><span>' + (P.EN ? 'Founded in Novo Hamburgo, RS' : 'Fundada em Novo Hamburgo, RS') + '</span></div></div></div>' +
  '</div></section>' +

  '<div class="sv" aria-hidden="true">' +
    '<div class="sv__row">' + svcNames.map(function (n) { return '<span>' + esc(n) + '<i>✦</i></span>'; }).join('') + '</div>' +
    '<div class="sv__row">' + projNames.concat(projNames).map(function (n) { return '<span>' + esc(n) + '<i>✦</i></span>'; }).join('') + '</div>' +
  '</div>' +

  '<section class="clients" aria-label="' + esc(plain(c.clients.title)) + '"><div class="wrap"><p>' + c.clients.text + '</p>' + P.clientsLoop() + '</div></section>' +

  '<section class="section" id="servicos"><span class="glow glow--b" style="left:-320px;top:80px" aria-hidden="true"></span><div class="wrap" style="position:relative">' +
    '<div class="head reveal"><div><span class="eyebrow">' + c.services.eyebrow + '</span><h2 class="h2">' + c.services.title + '</h2></div><p class="lead">' + c.services.text + '</p></div>' +
    '<div class="cards">' + c.services.items.map(function (s, i) {
      return '<article class="card-s spot reveal">' + P.ic(i) + '<h3>' + s.title + '</h3><p>' + s.text + '</p></article>';
    }).join('') +
      '<article class="card-s card-s--feature spot reveal"><h3>' + c.services.banner + '</h3>' + P.starBtn(c.nav.contact, '#contato') + '</article>' +
    '</div>' +
    '<div class="reveal">' + P.serviceTabs() + '</div>' +
  '</div></section>' +

  '<section class="section" id="projetos"><span class="glow glow--m" style="right:-300px;top:0" aria-hidden="true"></span><div class="wrap" style="position:relative">' +
    '<div class="head reveal"><div><span class="eyebrow">' + c.projects.eyebrow + '</span><h2 class="h2">' + c.projects.title + '</h2></div></div>' +
    '<div class="masonry">' + c.projects.items.map(function (p, i) {
      return '<article class="mcard tilt reveal"><div class="tilt__in"><figure><img src="' + M.projects[i][0] + '" alt="' + esc(p.title) + '" loading="lazy"><span class="duo"><img src="' + M.projects[i][1] + '" alt="" loading="lazy"></span><span class="glare" aria-hidden="true"></span></figure>' +
        '<div class="body"><span class="n">0' + (i + 1) + '</span><h3>' + p.title + '</h3><p>' + p.text + '</p></div></div></article>';
    }).join('') + '</div>' +
  '</div></section>' +

  '<section class="section" id="metodologia"><div class="wrap">' +
    '<div class="head reveal"><div><span class="eyebrow">' + c.method.eyebrow + '</span><h2 class="h2">' + c.method.title + '</h2></div><p class="lead">' + c.method.text + '</p></div>' +
    '<div class="timeline"><span class="timeline__track" aria-hidden="true"><i></i></span>' + c.method.steps.map(function (s, i) {
      return '<article class="tl reveal" data-n="' + kit.pad(i + 1) + '"><h3>' + s.title + '</h3><p>' + s.text + '</p></article>';
    }).join('') + '</div>' +
  '</div></section>' +

  '<section class="section" id="sobre"><span class="glow glow--b" style="left:40%;top:-200px" aria-hidden="true"></span><div class="wrap" style="position:relative">' +
    '<div class="about"><div class="reveal"><span class="eyebrow">' + c.about.eyebrow + '</span><h2 class="h2" style="margin-bottom:20px">' + c.about.bannerTitle + '</h2>' +
      c.about.text.map(function (t) { return '<p>' + t + '</p>'; }).join('') + '<p>' + c.about.bannerText + '</p></div>' +
      '<figure class="reveal"><img src="' + M.servicesBanner + '" alt="" loading="lazy"></figure></div>' +
    '<div class="mv"><article class="spot reveal"><h3>' + c.about.mission.title + '</h3><p>' + c.about.mission.text + '</p></article><article class="spot reveal"><h3>' + c.about.vision.title + '</h3><p>' + c.about.vision.text + '</p></article></div>' +
    '<div style="margin-top:clamp(56px,8vw,96px)" class="reveal"><span class="eyebrow">' + c.values.eyebrow + '</span><h2 class="h2">' + c.values.title + '</h2>' +
      '<div class="values">' + c.values.items.map(function (v) { return '<div class="spot"><h4>' + v.title + '</h4><p>' + v.text + '</p></div>'; }).join('') + '</div></div>' +
    '<div style="margin-top:clamp(48px,6vw,72px)" class="reveal"><span class="eyebrow">' + c.about.techTitle + '</span>' + P.techLoop() + '</div>' +
  '</div></section>' +

  '<section class="section" id="contato"><div class="wrap">' +
    '<div class="cta reveal"><canvas aria-hidden="true"></canvas><div><h2>' + c.help.title + '</h2><p>' + c.help.text + '</p></div><div class="ctas">' + P.starBtn() + P.whatsBtn('btn--ghost') + '</div></div>' +
    '<div class="head reveal" style="margin-top:clamp(64px,8vw,104px)"><div><h2 class="h2">' + c.contact.title + '</h2></div><p class="lead">' + c.contact.text + '</p></div>' +
    '<div class="contact">' + P.contactCards('spot reveal') + '</div>' +
    '<div class="careers reveal">' + P.careers(M.team) + '</div>' +
    '<div class="social reveal">' + P.social() + '</div>' +
  '</div></section>' +
  '</main>' + P.footer();

  document.getElementById('app').innerHTML = html;
  P.init('noite');
  fx.decrypt(document.querySelector('.hero h1'), 200);
  fx.particles(document.querySelector('.hero canvas'), { colors: ['#4146ff', '#3699ff', '#06ecb7'], density: 12000, link: 130 });
  fx.scrollVelocity(document.querySelector('.sv'));
  fx.fillLine(document.querySelector('.timeline'), document.querySelector('.timeline__track i'));
  fx.aurora(document.querySelector('.cta canvas'), { colors: ['#4146ff', '#06ecb7', '#3699ff'], amplitude: 1, blend: .6, speed: .4 });
  fx.clickSpark('#06ecb7');
})();
