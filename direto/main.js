/* Duett — Versão D · "Direto": rolagem normal, conteúdo em blocos objetivos. */
(function () {
  var D = window.DUETT, c = D.c, L = c.links, M = c.media;
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  var plain = function (h) { var d = document.createElement('div'); d.innerHTML = h; return d.textContent; };
  document.documentElement.classList.add('js');
  document.querySelector('.skip').textContent = D.lang === 'en' ? 'Skip to content' : 'Pular para o conteúdo';

  var icons = [
    '<svg viewBox="0 0 24 24"><rect x="2.5" y="4" width="19" height="15" rx="2"/><path d="M2.5 8h19M9 13l-2 2 2 2M15 13l2 2-2 2"/></svg>',
    '<svg viewBox="0 0 24 24"><rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/></svg>',
    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="4.5" cy="5" r="1.8"/><circle cx="19.5" cy="5" r="1.8"/><circle cx="4.5" cy="19" r="1.8"/><circle cx="19.5" cy="19" r="1.8"/><path d="M6 6.3l3.8 3.6M18 6.3l-3.8 3.6M6 17.7l3.8-3.6M18 17.7l-3.8-3.6"/></svg>',
    '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.6"/><path d="M3 20c.5-4 3-6.5 6-6.5s5.5 2.5 6 6.5M15 14c1-.9 2-1.4 3-1.4 2.4 0 4 2.3 4.5 5.9"/></svg>',
    '<svg viewBox="0 0 24 24"><path d="M3 21h18M5.5 21v-7M10.5 21V10M15.5 21v-5M20.5 21V5M4 11l6.5-5 5 3L21 3"/></svg>'
  ];

  var demo = '<a class="btn btn--primary btn--sm" href="' + D.mailto(c.help.demoSubject) + '">' + c.help.demo + '</a>';

  /* detalhes de serviço em abas */
  var tabs = [
    { label: plain(c.web.eyebrow), html:
      '<div><span class="eyebrow">' + c.web.eyebrow + '</span><h3>' + c.web.title + '</h3><p>' + c.web.text + '</p></div>' +
      '<ul class="chips">' + c.web.list.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' },
    { label: plain(c.mobile.eyebrow), html:
      '<div><span class="eyebrow">' + c.mobile.eyebrow + '</span><h3>' + c.mobile.title + '</h3><p>' + c.mobile.text + '</p></div>' +
      '<div class="stack">' + c.mobile.items.map(function (m) { return '<div class="mini"><h4>' + m.title + '</h4><p>' + m.text + '</p></div>'; }).join('') + '</div>' },
    { label: plain(c.integration.eyebrow), html:
      '<div><span class="eyebrow">' + c.integration.eyebrow + '</span><h3>' + c.integration.title + '</h3>' + c.integration.text.map(function (t) { return '<p>' + t + '</p>'; }).join('') + '</div>' +
      '<div class="logos">' + M.integrations.map(function (l) { return '<div><img src="' + l.src + '" alt="' + esc(l.name) + '" loading="lazy"></div>'; }).join('') + '</div>' },
    { label: plain(c.outsourcing.eyebrow), html:
      '<div><span class="eyebrow">' + c.outsourcing.eyebrow + '</span><h3>' + c.outsourcing.title + '</h3><p>' + c.outsourcing.text + '</p></div>' +
      '<div class="stack">' + c.outsourcing.tabs.map(function (t) { return '<div class="mini"><h4>' + t.title + '</h4><p>' + t.text + '</p></div>'; }).join('') + '</div>' }
  ];

  var html = '' +
  '<header class="top"><div class="wrap">' +
    '<a class="brand" href="#top" aria-label="Duett Software — ' + c.nav.home + '">' + duettLogo() + '</a>' +
    '<nav id="nav" aria-label="Principal">' +
      '<a href="#servicos">' + c.nav.services + '</a>' +
      '<a href="#projetos">' + plain(c.projects.eyebrow) + '</a>' +
      '<a href="#sobre">' + c.nav.about + '</a>' +
      '<a href="#contato">' + c.nav.contact + '</a>' +
      '<a href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + ' ↗</a>' +
    '</nav>' +
    '<div class="actions">' + demo +
      '<button class="lang" type="button" aria-label="' + c.ui.langLabel + '">' + c.ui.lang + '</button>' +
      '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">' + c.ui.menu + '</button>' +
    '</div>' +
  '</div></header>' +

  '<main id="main">' +
  '<section class="hero" id="top"><canvas class="hero__aurora" aria-hidden="true"></canvas><div class="wrap">' +
    '<div><span class="pill"><span class="pill__dot"></span><span class="shiny">SaaS · Cloud Computing</span></span>' +
      '<h1 class="blur">' + fx.words(c.hero.lines[0] + ' ' + c.hero.lines[1] + ' <em>' + c.hero.lines[2] + '</em> ' + c.hero.lines[3]) + '</h1>' +
      '<p class="lead">' + c.hero.sub + '</p>' +
      '<div class="ctas"><a class="btn btn--star magnet" href="' + D.mailto(c.help.demoSubject) + '"><span class="star"></span><span class="btn__in">' + c.help.demo + kit.arrow + '</span></a>' +
      '<a class="btn btn--ghost" href="' + L.whatsapp + '" target="_blank" rel="noopener">' + c.help.whatsapp + '</a></div></div>' +
    '<div class="tilt hero__tilt"><figure class="tilt__in"><img src="' + M.hero + '" alt="" fetchpriority="high"><span class="glare" aria-hidden="true"></span>' +
      '<figcaption class="float-chip"><b>' + c.projects.items[0].title + '</b><span>Just in Time (JIT)</span></figcaption></figure></div>' +
  '</div></section>' +

  '<section class="stats" aria-label="Duett Software"><div class="wrap"><ul>' +
    [[c.about.founded, D.lang === 'en' ? 'Founded' : 'Fundação', 1990],
     [M.clients.length, D.lang === 'en' ? 'Clients & partners shown' : 'Clientes e parceiros em destaque', 0],
     [M.tech.length, D.lang === 'en' ? 'Technologies in our stack' : 'Tecnologias no nosso stack', 0],
     [c.method.steps.length, D.lang === 'en' ? 'Steps from idea to delivery' : 'Etapas da ideia à entrega', 0]].map(function (s) {
      return '<li class="reveal spot"><b class="count" data-to="' + s[0] + '" data-from="' + s[2] + '">' + s[0] + '</b><span>' + s[1] + '</span></li>';
    }).join('') +
  '</ul></div></section>' +

  '<section class="clients" aria-label="' + esc(plain(c.clients.title)) + '"><div class="wrap">' +
    '<p>' + c.clients.text + '</p>' +
    '<div class="loop"><div class="loop__track">' + M.clients.map(function (l) { return '<img src="' + l.src + '" alt="' + esc(l.name) + '" loading="lazy">'; }).join('') + '</div></div>' +
  '</div></section>' +

  '<section class="section" id="servicos"><div class="wrap">' +
    '<div class="head reveal"><div><span class="eyebrow">' + c.services.eyebrow + '</span><h2 class="h2">' + c.services.title + '</h2></div><p class="lead">' + c.services.text + '</p></div>' +
    '<div class="cards cards--services">' + c.services.items.map(function (s, i) {
      return '<article class="card spot reveal"><span class="ic" aria-hidden="true">' + icons[i] + '</span><h3>' + s.title + '</h3><p>' + s.text + '</p></article>';
    }).join('') +
      '<article class="card card--feature spot reveal"><h3>' + c.services.banner + '</h3>' +
      '<a class="btn btn--mint btn--sm" style="align-self:start" href="#contato">' + c.nav.contact + kit.arrow + '</a></article>' +
    '</div>' +
    '<div class="tabs reveal"><div role="tablist" aria-label="' + esc(c.services.eyebrow) + '">' +
      tabs.map(function (t, i) { return '<button role="tab" id="tab-' + i + '" aria-controls="panel-' + i + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : '') + '>' + esc(t.label) + '</button>'; }).join('') +
    '</div>' +
      tabs.map(function (t, i) { return '<div class="panel" role="tabpanel" id="panel-' + i + '" aria-labelledby="tab-' + i + '"' + (i ? ' hidden' : '') + '>' + t.html + '</div>'; }).join('') +
    '</div>' +
  '</div></section>' +

  '<section class="section section--alt" id="projetos"><div class="wrap">' +
    '<div class="head reveal"><div><span class="eyebrow">' + c.projects.eyebrow + '</span><h2 class="h2">' + c.projects.title + '</h2></div></div>' +
    '<div class="projects">' + c.projects.items.map(function (p, i) {
      return '<article class="project tilt reveal"><div class="tilt__in"><figure><img src="' + M.projects[i][0] + '" alt="' + esc(p.title) + '" loading="lazy"><span class="glare" aria-hidden="true"></span><span class="num">0' + (i + 1) + '</span></figure><div class="body"><h3>' + p.title + '</h3><p>' + p.text + '</p></div></div></article>';
    }).join('') + '</div>' +
  '</div></section>' +

  '<section class="section" id="metodologia"><div class="wrap">' +
    '<div class="head reveal"><div><span class="eyebrow">' + c.method.eyebrow + '</span><h2 class="h2">' + c.method.title + '</h2></div><p class="lead">' + c.method.text + '</p></div>' +
    '<ol class="steps">' + c.method.steps.map(function (s) { return '<li class="spot reveal"><h3>' + s.title + '</h3><p>' + s.text + '</p></li>'; }).join('') + '</ol>' +
  '</div></section>' +

  '<section class="section section--alt" id="sobre"><div class="wrap">' +
    '<div class="about">' +
      '<div class="reveal"><span class="eyebrow">' + c.about.eyebrow + '</span><h2 class="h2" style="margin-bottom:20px">' + c.about.bannerTitle + '</h2>' +
        '<div class="since"><b class="count" data-to="' + c.about.founded + '" data-from="1990">' + c.about.founded + '</b><span>' + (D.lang === 'en' ? 'founded in Novo Hamburgo, RS' : 'fundada em Novo Hamburgo, RS') + '</span></div>' +
        c.about.text.map(function (t) { return '<p>' + t + '</p>'; }).join('') +
        '<div class="quote"><p>' + c.about.bannerText + '</p></div></div>' +
      '<figure class="reveal"><img src="' + M.servicesBanner + '" alt="" loading="lazy"></figure>' +
    '</div>' +
    '<div class="mv">' +
      '<article class="reveal"><h3>' + c.about.mission.title + '</h3><p>' + c.about.mission.text + '</p></article>' +
      '<article class="reveal"><h3>' + c.about.vision.title + '</h3><p>' + c.about.vision.text + '</p></article>' +
    '</div>' +
    '<div style="margin-top:clamp(56px,8vw,96px)"><div class="head reveal" style="margin-bottom:28px"><div><span class="eyebrow">' + c.values.eyebrow + '</span><h2 class="h2">' + c.values.title + '</h2></div></div>' +
      '<ul class="values">' + c.values.items.map(function (v) { return '<li class="spot reveal"><h3>' + v.title + '</h3><p>' + v.text + '</p></li>'; }).join('') + '</ul></div>' +
    '<div style="margin-top:clamp(56px,8vw,96px)"><span class="eyebrow">' + c.about.techTitle + '</span>' +
      '<div class="loop loop--tech"><div class="loop__track">' + M.tech.map(function (t) { return '<span class="tchip"><img src="' + t.src + '" alt="' + esc(t.name) + '" loading="lazy"><span aria-hidden="true">' + esc(t.name) + '</span></span>'; }).join('') + '</div></div></div>' +
  '</div></section>' +

  '<section class="section" id="contato"><div class="wrap">' +
    '<div class="cta reveal"><canvas class="cta__aurora" aria-hidden="true"></canvas><div><h2>' + c.help.title + '</h2><p>' + c.help.text + '</p></div>' +
      '<div class="ctas"><a class="btn btn--star magnet" href="' + D.mailto(c.help.demoSubject) + '"><span class="star"></span><span class="btn__in">' + c.help.demo + kit.arrow + '</span></a>' +
      '<a class="btn btn--ghost" href="' + L.whatsapp + '" target="_blank" rel="noopener">' + c.help.whatsapp + '</a></div></div>' +
    '<div class="head reveal" style="margin-top:clamp(56px,8vw,96px)"><div><h2 class="h2">' + c.contact.title + '</h2></div><p class="lead">' + c.contact.text + '</p></div>' +
    '<div class="contact">' +
      '<article class="spot reveal"><h3>' + c.contact.sales.title + '</h3><p>' + c.contact.sales.text + '</p><a href="mailto:' + L.emailSales + '">' + L.emailSales + '</a><a href="' + L.phoneHref + '">' + L.phone + '</a></article>' +
      '<article class="spot reveal"><h3>' + c.contact.support.title + '</h3><p>' + c.contact.support.text + '</p><a href="mailto:' + L.emailSupport + '">' + L.emailSupport + '</a><a href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + ' ↗</a></article>' +
      '<article class="spot reveal"><h3>' + c.contact.location.title + '</h3><address>' + c.contact.location.lines.join('<br>') + '</address></article>' +
    '</div>' +
    '<div class="careers reveal"><figure><img src="' + M.team + '" alt="" loading="lazy"></figure>' +
      '<div><span class="eyebrow">' + c.careers.eyebrow + '</span><h3>' + c.careers.title + '</h3><p>' + c.careers.text + '</p><p>' + c.careers.text2 + '</p>' +
      '<a class="btn btn--outline" href="' + L.careers + '" target="_blank" rel="noopener">' + c.careers.cta + kit.arrow + '</a></div></div>' +
    '<div class="social reveal"><div><h3>' + plain(c.social.title) + '</h3><p>' + c.social.text + '</p></div>' +
      '<div class="social__links">' + L.social.map(function (s) { return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.name + '"><img src="' + s.icon + '" alt=""></a>'; }).join('') + '</div></div>' +
  '</div></section>' +
  '</main>' +

  '<footer class="footer"><div class="wrap">' +
    '<div class="footer__grid">' +
      '<div><a class="brand" href="#top" aria-label="Duett Software" style="display:block">' + duettLogo() + '</a><div class="lines"><a href="mailto:' + L.emailSales + '">' + L.emailSales + '</a><a href="mailto:' + L.emailSupport + '">' + L.emailSupport + '</a><a href="' + L.phoneHref + '">' + L.phone + '</a></div></div>' +
      '<div><h4>' + c.footer.sitemap + '</h4><ul><li><a href="#top">' + c.nav.home + '</a></li><li><a href="#servicos">' + c.nav.services + '</a></li><li><a href="#sobre">' + c.nav.about + '</a></li><li><a href="#contato">' + c.nav.contact + '</a></li></ul></div>' +
      '<div><h4>' + c.footer.links + '</h4><ul><li><a href="' + L.terms + '">' + c.footer.terms + '</a></li><li><a href="' + L.privacy + '">' + c.footer.privacy + '</a></li><li><a href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + '</a></li></ul></div>' +
      '<div><h4>' + c.footer.where + '</h4><address>' + c.footer.address.join('<br>') + '</address></div>' +
    '</div>' +
    '<div class="footer__bottom"><span>' + c.footer.copyright + '</span><span>' + L.social.map(function (s) { return '<a href="' + s.href + '" target="_blank" rel="noopener" style="margin-right:14px">' + s.name + '</a>'; }).join('') + '</span><button type="button" class="to-top">' + c.ui.top + ' ↑</button></div>' +
  '</div></footer>' +
  kit.versions('direto');

  document.getElementById('app').innerHTML = html;

  var $ = function (s) { return document.querySelector(s); };
  $('.lang').addEventListener('click', D.toggleLang);
  $('.to-top').addEventListener('click', function () { scrollTo({ top: 0, behavior: D.reducedMotion ? 'auto' : 'smooth' }); });
  var nav = $('#nav'), mb = $('.menu-btn');
  mb.addEventListener('click', function () { var o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', String(o)); mb.textContent = o ? c.ui.close : c.ui.menu; });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); mb.textContent = c.ui.menu; } });
  kit.tabs(document);

  var top = $('.top');
  var onScroll = function () { top.classList.toggle('scrolled', scrollY > 8); };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* entrada suave quando o bloco aparece (sem prender a rolagem) */
  var els = [].slice.call(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window) || D.reducedMotion) { els.forEach(function (e) { e.classList.add('in'); }); }
  else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e, i) { e.style.transitionDelay = (i % 3) * 60 + 'ms'; io.observe(e); });
  }

  /* componentes (React Bits, em JS puro) */
  fx.blurText(document.querySelector('.hero h1'), 150);
  document.querySelectorAll('.count').forEach(fx.countUp);
  document.querySelectorAll('.loop').forEach(fx.logoLoop);
  fx.spotlight('.spot');
  fx.tilt('.tilt', 9);
  fx.magnet('.magnet', 7);
  fx.clickSpark('#4146ff');
  fx.aurora(document.querySelector('.hero__aurora'), { colors: ['#3699ff', '#06ecb7', '#4146ff'], amplitude: 1.1, blend: .55, speed: .5 });
  fx.aurora(document.querySelector('.cta__aurora'), { colors: ['#4146ff', '#06ecb7', '#3699ff'], amplitude: .9, blend: .6, speed: .4 });

  var r = D.takeScroll();
  if (r !== null && !isNaN(r)) addEventListener('load', function () { scrollTo(0, r * (document.documentElement.scrollHeight - innerHeight)); });
})();
