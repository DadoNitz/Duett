/* Duett — Versão E · "Bento" */
(function () {
  var D = window.DUETT, c = D.c, M = c.media, esc = P.esc, plain = P.plain;
  var hl = c.hero.lines;

  var html = P.header() + '<main id="main"><div class="wrap">' +

  /* hero + números */
  '<section class="bento block" id="top" aria-label="Duett Software">' +
    '<div class="tile t-hero s8 r2"><canvas aria-hidden="true"></canvas>' +
      '<div><span class="pill"><i></i><span class="shiny">SaaS · Cloud Computing</span></span>' +
      '<h1 class="blur">' + fx.words(hl[0] + ' ' + hl[1] + ' <em>' + hl[2] + '</em> ' + hl[3]) + '</h1>' +
      '<p class="lead">' + c.hero.sub + '</p></div>' +
      '<div class="ctas">' + P.starBtn() + P.whatsBtn() + '</div></div>' +
    '<div class="tile t-photo s4 r2 tilt"><div class="tilt__in"><img src="' + M.hero + '" alt="" fetchpriority="high"><span class="glare" aria-hidden="true"></span>' +
      '<div class="tag"><div><b>' + c.projects.items[0].title + '</b><span>Just in Time (JIT)</span></div><span class="mk">' + duettLogo({ markOnly: true }) + '</span></div></div></div>' +
    P.stats('tile s3 spot reveal') +
    '<div class="tile t-clients s12 reveal"><p>' + c.clients.text + '</p>' + P.clientsLoop() + '</div>' +
  '</section>' +

  /* serviços */
  '<section class="bento block" id="servicos">' +
    '<div class="tile s12 reveal"><div class="sec-head"><div><span class="eyebrow">' + c.services.eyebrow + '</span><h2>' + c.services.title + '</h2></div><p>' + c.services.text + '</p></div></div>' +
    c.services.items.map(function (s, i) {
      var span = ['s7 svc--big', 's5', 's4', 's4', 's4'][i];
      return '<article class="tile svc spot reveal ' + span + '">' + P.ic(i) + '<h3>' + s.title + '</h3><p>' + s.text + '</p></article>';
    }).join('') +
    '<div class="tile t-feature s12 reveal"><h3>' + c.services.banner + '</h3>' + P.starBtn(c.nav.contact, '#contato') + '</div>' +
    '<div class="tile s12 reveal">' + P.serviceTabs() + '</div>' +
  '</section>' +

  /* projetos */
  '<section class="bento block" id="projetos">' +
    '<div class="tile s12 reveal"><div class="sec-head"><div><span class="eyebrow">' + c.projects.eyebrow + '</span><h2>' + c.projects.title + '</h2></div></div></div>' +
    c.projects.items.map(function (p, i) {
      return '<article class="tile proj reveal ' + (i === 0 ? 's7 r2 proj--big' : 's5') + '"><img src="' + M.projects[i][i ? 0 : 0] + '" alt="' + esc(p.title) + '" loading="lazy">' +
        '<div class="body"><span class="n">0' + (i + 1) + '</span><h3>' + p.title + '</h3><p>' + p.text + '</p></div></article>';
    }).join('') +
  '</section>' +

  /* metodologia */
  '<section class="bento block" id="metodologia">' +
    '<div class="tile s12 reveal"><div class="sec-head"><div><span class="eyebrow">' + c.method.eyebrow + '</span><h2>' + c.method.title + '</h2></div><p>' + c.method.text + '</p></div></div>' +
    c.method.steps.map(function (s, i) { return '<article class="tile step s4 spot reveal"><b>' + kit.pad(i + 1) + '</b><h3>' + s.title + '</h3><p>' + s.text + '</p></article>'; }).join('') +
  '</section>' +

  /* sobre */
  '<section class="bento block" id="sobre">' +
    '<div class="tile t-about s7 reveal"><span class="eyebrow">' + c.about.eyebrow + '</span><h2>' + c.about.bannerTitle + '</h2>' + c.about.text.map(function (t) { return '<p>' + t + '</p>'; }).join('') + '<p style="margin:0">' + c.about.bannerText + '</p></div>' +
    '<div class="tile t-img s5 reveal"><img src="' + M.servicesBanner + '" alt="" loading="lazy"></div>' +
    '<div class="tile t-mission s6 spot reveal"><h3>' + c.about.mission.title + '</h3><p>' + c.about.mission.text + '</p></div>' +
    '<div class="tile t-vision s6 spot reveal"><h3>' + c.about.vision.title + '</h3><p>' + c.about.vision.text + '</p></div>' +
    '<div class="tile s12 reveal"><span class="eyebrow">' + c.values.eyebrow + '</span><h3 style="font-size:clamp(26px,3vw,38px)">' + c.values.title + '</h3>' +
      '<div class="values">' + c.values.items.map(function (v) { return '<div><h4>' + v.title + '</h4><p>' + v.text + '</p></div>'; }).join('') + '</div></div>' +
    '<div class="tile t-tech s12 reveal"><h3>' + c.about.techTitle + '</h3>' + P.techLoop() + '</div>' +
  '</section>' +

  /* contato */
  '<section class="bento block" id="contato">' +
    '<div class="tile t-cta s12 reveal"><canvas aria-hidden="true"></canvas><div><h2>' + c.help.title + '</h2><p>' + c.help.text + '</p></div><div class="ctas">' + P.starBtn() + P.whatsBtn() + '</div></div>' +
    '<div class="tile s12 reveal"><div class="sec-head"><div><h2>' + c.contact.title + '</h2></div><p>' + c.contact.text + '</p></div></div>' +
    P.contactCards('tile contact s4 spot reveal') +
    '<div class="tile t-careers s12 reveal">' + P.careers(M.team) + '</div>' +
    '<div class="tile t-social s12 reveal">' + P.social() + '</div>' +
  '</section>' +
  '</div></main>' + P.footer();

  document.getElementById('app').innerHTML = html;
  P.init('bento');
  fx.blurText(document.querySelector('.t-hero h1'), 150);
  fx.aurora(document.querySelector('.t-hero canvas'), { colors: ['#3699ff', '#06ecb7', '#4146ff'], amplitude: 1.1, blend: .55, speed: .5 });
  fx.aurora(document.querySelector('.t-cta canvas'), { colors: ['#4146ff', '#06ecb7', '#3699ff'], amplitude: .9, blend: .6, speed: .4 });
  fx.clickSpark('#4146ff');
})();
