/* Blocos de conteúdo compartilhados pelas versões E–G (o layout e o visual ficam em cada versão). */
(function () {
  var D = window.DUETT, c = D.c, L = c.links, M = c.media, EN = D.lang === 'en';
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  var plain = function (h) { var d = document.createElement('div'); d.innerHTML = h; return d.textContent; };
  var P = { esc: esc, plain: plain, EN: EN };

  P.icons = [
    '<svg viewBox="0 0 24 24"><rect x="2.5" y="4" width="19" height="15" rx="2"/><path d="M2.5 8h19M9 13l-2 2 2 2M15 13l2 2-2 2"/></svg>',
    '<svg viewBox="0 0 24 24"><rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/></svg>',
    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="4.5" cy="5" r="1.8"/><circle cx="19.5" cy="5" r="1.8"/><circle cx="4.5" cy="19" r="1.8"/><circle cx="19.5" cy="19" r="1.8"/><path d="M6 6.3l3.8 3.6M18 6.3l-3.8 3.6M6 17.7l3.8-3.6M18 17.7l-3.8-3.6"/></svg>',
    '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.6"/><path d="M3 20c.5-4 3-6.5 6-6.5s5.5 2.5 6 6.5M15 14c1-.9 2-1.4 3-1.4 2.4 0 4 2.3 4.5 5.9"/></svg>',
    '<svg viewBox="0 0 24 24"><path d="M3 21h18M5.5 21v-7M10.5 21V10M15.5 21v-5M20.5 21V5M4 11l6.5-5 5 3L21 3"/></svg>'
  ];
  P.ic = function (i) { return '<span class="ic" aria-hidden="true">' + P.icons[i] + '</span>'; };

  P.demoHref = D.mailto(c.help.demoSubject);
  P.starBtn = function (label, href, extra) {
    return '<a class="btn btn--star magnet ' + (extra || '') + '" href="' + (href || P.demoHref) + '"><span class="star"></span><span class="btn__in">' + (label || c.help.demo) + kit.arrow + '</span></a>';
  };
  P.whatsBtn = function (cls) { return '<a class="btn ' + (cls || 'btn--ghost') + '" href="' + L.whatsapp + '" target="_blank" rel="noopener">' + c.help.whatsapp + '</a>'; };

  P.header = function (opts) {
    opts = opts || {};
    return '<header class="top ' + (opts.cls || '') + '"><div class="wrap top__in">' +
      '<a class="brand" href="#top" aria-label="Duett Software — ' + c.nav.home + '">' + duettLogo() + '</a>' +
      '<nav id="nav" aria-label="Principal">' +
        '<a href="#servicos">' + c.nav.services + '</a>' +
        '<a href="#projetos">' + plain(c.projects.eyebrow) + '</a>' +
        '<a href="#sobre">' + c.nav.about + '</a>' +
        '<a href="#contato">' + c.nav.contact + '</a>' +
        '<a href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + ' ↗</a>' +
      '</nav>' +
      '<div class="actions"><a class="btn btn--primary btn--sm top__cta" href="' + P.demoHref + '">' + c.help.demo + '</a>' +
        '<button class="lang" type="button" aria-label="' + c.ui.langLabel + '">' + c.ui.lang + '</button>' +
        '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">' + c.ui.menu + '</button></div>' +
    '</div></header>';
  };

  P.stats = function (cls) {
    return [[c.about.founded, EN ? 'Founded' : 'Fundação', 1990],
      [M.clients.length, EN ? 'Clients & partners shown' : 'Clientes e parceiros em destaque', 0],
      [M.tech.length, EN ? 'Technologies in our stack' : 'Tecnologias no nosso stack', 0],
      [c.method.steps.length, EN ? 'Steps from idea to delivery' : 'Etapas da ideia à entrega', 0]].map(function (s) {
      return '<div class="stat ' + (cls || '') + '"><b class="count" data-to="' + s[0] + '" data-from="' + s[2] + '">' + s[0] + '</b><span>' + s[1] + '</span></div>';
    }).join('');
  };

  P.clientsLoop = function () {
    return '<div class="loop"><div class="loop__track">' + M.clients.map(function (l) { return '<img src="' + l.src + '" alt="' + esc(l.name) + '" loading="lazy">'; }).join('') + '</div></div>';
  };
  P.techLoop = function () {
    return '<div class="loop loop--rev"><div class="loop__track">' + M.tech.map(function (t) { return '<span class="tchip"><span class="ti"><img src="' + t.src + '" alt="" loading="lazy"></span>' + esc(t.name) + '</span>'; }).join('') + '</div></div>';
  };

  /* detalhes dos serviços em abas */
  P.serviceTabs = function () {
    var tabs = [
      { label: plain(c.web.eyebrow), html: '<div><h3>' + c.web.title + '</h3><p>' + c.web.text + '</p></div><ul class="chips">' + c.web.list.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' },
      { label: plain(c.mobile.eyebrow), html: '<div><h3>' + c.mobile.title + '</h3><p>' + c.mobile.text + '</p></div><div class="stack">' + c.mobile.items.map(function (m) { return '<div class="mini"><h4>' + m.title + '</h4><p>' + m.text + '</p></div>'; }).join('') + '</div>' },
      { label: plain(c.integration.eyebrow), html: '<div><h3>' + c.integration.title + '</h3>' + c.integration.text.map(function (t) { return '<p>' + t + '</p>'; }).join('') + '</div><div class="logos">' + M.integrations.map(function (l) { return '<div><img src="' + l.src + '" alt="' + esc(l.name) + '" loading="lazy"></div>'; }).join('') + '</div>' },
      { label: plain(c.outsourcing.eyebrow), html: '<div><h3>' + c.outsourcing.title + '</h3><p>' + c.outsourcing.text + '</p></div><div class="stack">' + c.outsourcing.tabs.map(function (t) { return '<div class="mini"><h4>' + t.title + '</h4><p>' + t.text + '</p></div>'; }).join('') + '</div>' }
    ];
    return '<div class="tabs"><div role="tablist" aria-label="' + esc(c.services.eyebrow) + '">' +
      tabs.map(function (t, i) { return '<button role="tab" id="tab-' + i + '" aria-controls="panel-' + i + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : '') + '>' + esc(t.label) + '</button>'; }).join('') + '</div>' +
      tabs.map(function (t, i) { return '<div class="panel" role="tabpanel" id="panel-' + i + '" aria-labelledby="tab-' + i + '"' + (i ? ' hidden' : '') + '>' + t.html + '</div>'; }).join('') + '</div>';
  };

  P.stepper = function () {
    var s = c.method.steps;
    return '<div class="stp"><div class="stp__nav"><span class="stp__bar" aria-hidden="true"><i></i></span>' +
      s.map(function (x, i) { return '<button class="stp__btn" type="button"><b>' + kit.pad(i + 1) + '</b><span>' + x.title + '</span></button>'; }).join('') + '</div>' +
      s.map(function (x, i) { return '<div class="stp__panel" ' + (i ? 'hidden' : '') + '><span class="stp__k">' + kit.pad(i + 1) + ' / ' + kit.pad(s.length) + '</span><h3>' + x.title + '</h3><p>' + x.text + '</p></div>'; }).join('') +
      '<div class="stp__ctrl"><button type="button" class="stp__prev">← ' + c.ui.prev + '</button><button type="button" class="stp__next">' + c.ui.next + ' →</button></div></div>';
  };

  P.contactCards = function (cls) {
    cls = cls || '';
    return '<article class="' + cls + '"><h3>' + c.contact.sales.title + '</h3><p>' + c.contact.sales.text + '</p><a href="mailto:' + L.emailSales + '">' + L.emailSales + '</a><a href="' + L.phoneHref + '">' + L.phone + '</a></article>' +
      '<article class="' + cls + '"><h3>' + c.contact.support.title + '</h3><p>' + c.contact.support.text + '</p><a href="mailto:' + L.emailSupport + '">' + L.emailSupport + '</a><a href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + ' ↗</a></article>' +
      '<article class="' + cls + '"><h3>' + c.contact.location.title + '</h3><address>' + c.contact.location.lines.join('<br>') + '</address></article>';
  };

  P.careers = function (img) {
    return '<figure><img src="' + (img || M.team) + '" alt="" loading="lazy"></figure><div><span class="eyebrow">' + c.careers.eyebrow + '</span><h3>' + c.careers.title + '</h3><p>' + c.careers.text + '</p><p>' + c.careers.text2 + '</p>' +
      '<a class="btn btn--outline" href="' + L.careers + '" target="_blank" rel="noopener">' + c.careers.cta + kit.arrow + '</a></div>';
  };

  P.social = function () {
    return '<div><h3>' + plain(c.social.title) + '</h3><p>' + c.social.text + '</p></div><div class="social__links">' +
      L.social.map(function (s) { return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.name + '"><img src="' + s.icon + '" alt=""></a>'; }).join('') + '</div>';
  };

  P.footer = function (cls) {
    return '<footer class="footer ' + (cls || '') + '"><div class="wrap"><div class="footer__grid">' +
      '<div><a class="brand" href="#top" aria-label="Duett Software">' + duettLogo() + '</a><div class="lines"><a href="mailto:' + L.emailSales + '">' + L.emailSales + '</a><a href="mailto:' + L.emailSupport + '">' + L.emailSupport + '</a><a href="' + L.phoneHref + '">' + L.phone + '</a></div></div>' +
      '<div><h4>' + c.footer.sitemap + '</h4><ul><li><a href="#top">' + c.nav.home + '</a></li><li><a href="#servicos">' + c.nav.services + '</a></li><li><a href="#sobre">' + c.nav.about + '</a></li><li><a href="#contato">' + c.nav.contact + '</a></li></ul></div>' +
      '<div><h4>' + c.footer.links + '</h4><ul><li><a href="' + L.terms + '">' + c.footer.terms + '</a></li><li><a href="' + L.privacy + '">' + c.footer.privacy + '</a></li><li><a href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + '</a></li></ul></div>' +
      '<div><h4>' + c.footer.where + '</h4><address>' + c.footer.address.join('<br>') + '</address></div></div>' +
      '<div class="footer__bottom"><span>' + c.footer.copyright + '</span><span>' + L.social.map(function (s) { return '<a href="' + s.href + '" target="_blank" rel="noopener">' + s.name + '</a>'; }).join(' · ') + '</span><button type="button" class="to-top">' + c.ui.top + ' ↑</button></div>' +
    '</div></footer>';
  };

  /* comportamentos comuns */
  P.init = function (versionId) {
    document.documentElement.classList.add('js');
    var skip = document.querySelector('.skip'); if (skip) skip.textContent = EN ? 'Skip to content' : 'Pular para o conteúdo';
    var $ = function (s) { return document.querySelector(s); };
    var app = document.getElementById('app');
    app.insertAdjacentHTML('beforeend', kit.versions(versionId));
    $('.lang').addEventListener('click', D.toggleLang);
    $('.to-top').addEventListener('click', function () { scrollTo({ top: 0, behavior: D.reducedMotion ? 'auto' : 'smooth' }); });
    var nav = $('#nav'), mb = $('.menu-btn');
    mb.addEventListener('click', function () { var o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', String(o)); mb.textContent = o ? c.ui.close : c.ui.menu; });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); mb.textContent = c.ui.menu; } });
    kit.tabs(document);
    var top = $('.top'); var onScroll = function () { top.classList.toggle('scrolled', scrollY > 8); };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    document.querySelectorAll('.count').forEach(fx.countUp);
    document.querySelectorAll('.loop').forEach(fx.logoLoop);
    fx.spotlight('.spot'); fx.tilt('.tilt', 9); fx.magnet('.magnet', 7);
    fx.reveal('.reveal');
    var r = D.takeScroll();
    if (r !== null && !isNaN(r)) addEventListener('load', function () { scrollTo(0, r * (document.documentElement.scrollHeight - innerHeight)); });
  };

  window.P = P;
})();
