/* Duett — Versão C · "Blueprint" */
(function () {
  var D = window.DUETT, c = D.c, L = c.links, M = c.media, RM = D.reducedMotion, EN = D.lang === 'en';
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  var plain = function (h) { var d = document.createElement('div'); d.innerHTML = h; return d.textContent; };
  var T = EN
    ? { sheet: 'Sheet', project: 'Project', scale: 'Scale', date: 'Date', rev: 'Rev.', item: 'Item', status: 'Status', fig: 'Fig.', render: 'Render', approved: 'Approved for production' }
    : { sheet: 'Folha', project: 'Projeto', scale: 'Escala', date: 'Data', rev: 'Rev.', item: 'Item', status: 'Status', fig: 'Fig.', render: 'Render', approved: 'Aprovado para produção' };
  var TOTAL = 9;
  var tag = function (n, t) { return '<p class="sheet-tag"><b>' + T.sheet + ' ' + kit.pad(n) + '/' + kit.pad(TOTAL) + '</b>' + t + '</p>'; };
  var render = function (src, alt, cls) {
    return '<figure class="render ' + (cls || '') + '" style="margin:0"><img class="draw" src="' + src + '" alt="" loading="lazy"><img class="photo" src="' + src + '" alt="' + esc(alt || '') + '" loading="lazy"><span class="scan" aria-hidden="true"></span><span class="pct" aria-hidden="true">' + T.render + ' 000%</span></figure>';
  };

  gsap.registerPlugin(ScrollTrigger);
  document.querySelector('.skip').textContent = EN ? 'Skip to content' : 'Pular para o conteúdo';

  /* ícones de linha desenhados à mão para os módulos */
  var glyphs = [
    '<svg class="glyph" viewBox="0 0 48 48"><rect x="4" y="8" width="40" height="30" rx="2"/><path d="M4 15h40M9 11.5h2M13 11.5h2M17 27l-5-4 5-4M31 19l5 4-5 4M27 17l-6 12"/></svg>',
    '<svg class="glyph" viewBox="0 0 48 48"><rect x="13" y="3" width="22" height="42" rx="4"/><path d="M21 7h6M22 40h4M17 14h14M17 19h14M17 24h9"/></svg>',
    '<svg class="glyph" viewBox="0 0 48 48"><circle cx="24" cy="24" r="6"/><circle cx="8" cy="10" r="3"/><circle cx="40" cy="10" r="3"/><circle cx="8" cy="38" r="3"/><circle cx="40" cy="38" r="3"/><path d="M10.5 12l9 8M37.5 12l-9 8M10.5 36l9-8M37.5 36l-9-8"/></svg>',
    '<svg class="glyph" viewBox="0 0 48 48"><circle cx="16" cy="15" r="6"/><circle cx="33" cy="17" r="5"/><path d="M4 40c1-8 6-13 12-13s11 5 12 13M26 30c2-3 4-5 7-5 5 0 9 5 10 13"/></svg>',
    '<svg class="glyph" viewBox="0 0 48 48"><path d="M6 42h36M10 42V26M20 42V18M30 42V22M40 42V8M8 22l12-9 10 5 12-12"/><path d="M36 6h6v6"/></svg>'
  ];
  var deviceSvgs = [
    '<svg viewBox="0 0 200 170"><rect x="70" y="8" width="60" height="154" rx="10"/><path class="acc" d="M92 16h16M95 154h10"/><rect x="78" y="28" width="44" height="22"/><path d="M78 60h44M78 68h44M78 76h30M78 94h20v20H78zM102 94h20v20h-20z"/><path class="acc" d="M40 85h22M138 85h22M30 85a4 4 0 1 0 8 0 4 4 0 1 0-8 0M162 85a4 4 0 1 0 8 0 4 4 0 1 0-8 0"/></svg>',
    '<svg viewBox="0 0 200 170"><rect x="30" y="20" width="56" height="130" rx="9"/><rect x="114" y="20" width="56" height="130" rx="9"/><path d="M38 40h40M38 48h40M38 56h26M122 40h40M122 48h40M122 56h26M38 72h40v40H38zM122 72h40v40h-40z"/><path class="acc" d="M86 92h28M100 82v20M58 8v6M142 8v6"/></svg>',
    '<svg viewBox="0 0 200 170"><rect x="14" y="18" width="172" height="120" rx="6"/><path d="M14 34h172M24 26h4M32 26h4M40 26h4M60 23h110v6H60z"/><rect x="28" y="46" width="70" height="78"/><path d="M110 50h62M110 60h62M110 70h40M110 90h62v34h-62z"/><path class="acc" d="M74 150h52M100 138v12"/></svg>'
  ];

  var hl = c.hero.lines;
  var html = '' +
  '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="edges" color-interpolation-filters="sRGB">' +
    '<feColorMatrix type="saturate" values="0"/>' +
    '<feConvolveMatrix order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true"/>' +
    '<feColorMatrix type="matrix" values="0 0 0 0 0.93  0 0 0 0 0.94  0 0 0 0 1  2.4 2.4 2.4 0 -0.08"/>' +
  '</filter></svg>' +
  '<header class="top">' +
    '<a class="brand" href="#top" aria-label="Duett Software — ' + c.nav.home + '">' + duettLogo() + '</a>' +
    '<span class="coords mono" aria-hidden="true">29°41′S 51°07′W · <span class="xy">X 0000 · Y 0000</span></span>' +
    '<button class="menu-btn" aria-expanded="false" aria-controls="nav">' + c.ui.menu + '</button>' +
    '<nav id="nav" aria-label="Principal">' +
      '<a href="#top">' + c.nav.home + '</a><a href="#servicos">' + c.nav.services + '</a><a href="#sobre">' + c.nav.about + '</a><a href="#contato">' + c.nav.contact + '</a>' +
      '<a href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + ' ↗</a>' +
      '<button class="lang" type="button" aria-label="' + c.ui.langLabel + '">' + c.ui.lang + '</button>' +
    '</nav>' +
  '</header>' +
  '<div class="ruler" aria-hidden="true"><i></i><b></b></div>' +
  '<div class="cross" aria-hidden="true"><span class="h"></span><span class="v"></span><span class="read"></span></div>' +
  kit.versions('blueprint') +

  '<main id="main">' +
  '<section class="hero" id="top">' +
    '<div class="hero__grid">' +
      '<div>' + tag(1, 'Duett Software') +
        '<h1 class="t-hero ink" id="h1">' + hl.map(function (l, i) { return i === 2 ? '<em>' + esc(l) + '</em>' : esc(l); }).join('<br>') + '</h1>' +
        '<div class="hero__sub"><span class="mono" style="color:var(--mint);white-space:nowrap">→ SaaS · Cloud</span><p class="lead">' + c.hero.sub + '</p></div>' +
      '</div>' +
      '<div class="hero__fig corners" aria-hidden="true"><span class="circ"></span><span class="fig mono">' + T.fig + ' 01 — Duett</span>' +
        duettLogo({ markOnly: true, cls: 'mark' }) +
        '<span class="dim dim--w">58.5</span><span class="dim dim--h">45.0</span></div>' +
    '</div>' +
    '<div class="titleblock" aria-hidden="true">' +
      '<div><span>' + T.project + '</span><b>Duett Software</b></div><div><span>' + T.scale + '</span><b>1:1</b></div><div><span>' + T.date + '</span><b>2018</b></div><div><span>' + T.sheet + '</span><b>01/' + TOTAL + '</b></div><div><span>' + T.rev + '</span><b>2026</b></div>' +
    '</div>' +
  '</section>' +

  '<section class="sheet wrap" id="servicos">' +
    '<div class="head"><div>' + tag(2, c.services.eyebrow) + '<h2 class="t-xl ink">' + c.services.title + '</h2></div><p class="lead">' + c.services.text + '</p></div>' +
    '<div class="modules">' + c.services.items.map(function (s, i) {
      return '<article class="module corners"><div class="code mono"><span>M-' + kit.pad(i + 1) + '</span>' + glyphs[i] + '</div><div><h3>' + s.title + '</h3><p>' + s.text + '</p></div></article>';
    }).join('') + '</div>' +
    '<div class="callout">' + render(M.servicesBanner, '') + '<p class="t-l ink">' + esc(c.services.banner) + '</p></div>' +
  '</section>' +

  '<section class="sheet wrap" id="desenvolvimento">' +
    '<div class="head"><div>' + tag(3, c.web.eyebrow) + '<h2 class="t-xl ink">' + c.web.title + '</h2></div><p class="lead">' + c.web.text + '</p></div>' +
    '<table class="bom"><thead><tr><th>Nº</th><th>' + T.item + '</th><th>' + T.status + '</th></tr></thead><tbody>' +
      c.web.list.map(function (x, i) { return '<tr><td>' + kit.pad(i + 1) + '</td><td>' + esc(x) + '</td><td>✓</td></tr>'; }).join('') + '</tbody></table>' +
    '<div style="margin-top:clamp(96px,14vh,180px)" class="head"><div><p class="sheet-tag"><b>' + c.mobile.eyebrow + '</b></p><h2 class="t-xl ink">' + c.mobile.title + '</h2></div><p class="lead">' + c.mobile.text + '</p></div>' +
    '<div class="devices">' + c.mobile.items.map(function (m, i) { return '<article class="device corners">' + deviceSvgs[i] + '<h4>' + m.title + '</h4><p>' + m.text + '</p></article>'; }).join('') + '</div>' +
  '</section>' +

  '<section class="sheet wrap" id="integracao">' +
    '<div class="head"><div>' + tag(4, c.integration.eyebrow) + '<h2 class="t-xl ink">' + c.integration.title + '</h2></div><div>' + c.integration.text.map(function (t) { return '<p class="lead">' + t + '</p>'; }).join('') + '</div></div>' +
    '<div class="schema corners" role="img" aria-label="' + esc(M.integrations.map(function (i) { return i.name; }).join(', ')) + '">' + schema() + '</div>' +
    '<div style="margin-top:clamp(96px,14vh,180px)" class="head"><div><p class="sheet-tag"><b>' + c.outsourcing.eyebrow + '</b></p><h2 class="t-xl ink">' + c.outsourcing.title + '</h2></div>' +
      '<div><p class="lead">' + c.outsourcing.text + '</p><div class="tabs"><div role="tablist" aria-label="' + esc(c.outsourcing.eyebrow) + '">' +
      c.outsourcing.tabs.map(function (t, i) { return '<button role="tab" id="tab-' + i + '" aria-controls="panel-' + i + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : '') + '>' + t.tab + '</button>'; }).join('') + '</div>' +
      c.outsourcing.tabs.map(function (t, i) { return '<div role="tabpanel" id="panel-' + i + '" aria-labelledby="tab-' + i + '"' + (i ? ' hidden' : '') + '><h4>' + t.title + '</h4><p>' + t.text + '</p></div>'; }).join('') +
      '</div></div></div>' +
  '</section>' +

  '<section class="stack" id="projetos" aria-label="' + esc(plain(c.projects.title)) + '">' +
    '<div class="stack__head"><div>' + tag(5, c.projects.eyebrow) + '<h2 class="t-l" style="font-stretch:125%;text-transform:uppercase">' + c.projects.title + '</h2></div><span class="mono st-count" style="color:var(--muted)">01 / 03</span></div>' +
    c.projects.items.map(function (p, i) {
      return '<article class="plate">' + render(M.projects[i][0], p.title) +
        '<div class="plate__txt"><span class="n" aria-hidden="true">' + kit.pad(i + 1) + '</span><h3>' + p.title + '</h3><p>' + p.text + '</p>' + render(M.projects[i][1], '', 'thumb') + '</div></article>';
    }).join('') +
  '</section>' +

  '<section class="gantt" id="metodologia">' +
    '<div class="gantt__in">' +
      '<div class="gantt__head"><div>' + tag(6, c.method.eyebrow) + '<h2 class="t-l" style="font-stretch:125%;text-transform:uppercase">' + c.method.title + '</h2></div><p class="lead">' + c.method.text + '</p></div>' +
      '<div class="gantt__rows">' + c.method.steps.map(function (s, i) {
        return '<div class="gantt__row"><span class="lbl"><span>' + kit.pad(i + 1) + '</span>' + s.title + '</span><div class="gantt__track"><span class="gantt__bar" style="left:' + (i * 14) + '%;width:' + (i === 5 ? 30 : 22) + '%"></span></div></div>';
      }).join('') + '</div>' +
      '<div class="gantt__detail" aria-live="polite">' + c.method.steps.map(function (s, i) {
        return '<div class="d' + (i === 0 ? ' on' : '') + '"><h3>' + kit.pad(i + 1) + ' — ' + s.title + '</h3><p>' + s.text + '</p></div>';
      }).join('') + '</div>' +
    '</div>' +
  '</section>' +

  '<section class="sheet wrap" id="sobre">' + tag(7, c.about.eyebrow) +
    '<div class="year ink" aria-label="' + c.about.founded + '"><span class="dim" aria-hidden="true">EST.</span>' + c.about.founded + '</div>' +
    '<h2 class="t-xl ink" style="margin-top:40px">' + c.about.title + '</h2>' +
    '<div class="cols">' + c.about.text.map(function (t) { return '<p>' + t + '</p>'; }).join('') + '</div>' +
    '<div class="wide-render">' + render(M.team, '') + '<div class="wide-render__txt corners"><h2>' + c.about.bannerTitle + '</h2><p>' + c.about.bannerText + '</p></div></div>' +
    '<div class="spec"><article><p class="sheet-tag">A</p><h3>' + c.about.mission.title + '</h3><p>' + c.about.mission.text + '</p></article><article><p class="sheet-tag">B</p><h3>' + c.about.vision.title + '</h3><p>' + c.about.vision.text + '</p></article></div>' +
    '<div style="margin-top:clamp(96px,14vh,180px)"><p class="sheet-tag"><b>' + c.values.eyebrow + '</b></p><h2 class="t-xl ink">' + c.values.title + '</h2>' +
      '<table class="vtable"><tbody>' + c.values.items.map(function (v, i) { return '<tr><td>V-' + kit.pad(i + 1) + '</td><td>' + v.title + '</td><td>' + v.text + '</td></tr>'; }).join('') + '</tbody></table></div>' +
    '<div style="margin-top:clamp(96px,14vh,180px)"><p class="sheet-tag"><b>' + c.about.techTitle + '</b></p>' +
      '<ul class="parts">' + M.tech.map(function (t, i) { return '<li data-n="P-' + kit.pad(i + 1) + '"><span class="chip"><img src="' + t.src + '" alt="" loading="lazy"></span><span>' + esc(t.name) + '</span></li>'; }).join('') + '</ul></div>' +
  '</section>' +

  '<section class="sheet wrap" id="clientes">' +
    '<div class="head"><div>' + tag(8, c.clients.eyebrow) + '<h2 class="t-xl ink">' + c.clients.title + '</h2></div><p class="lead">' + c.clients.text + '</p></div>' +
    '<div class="clients">' + M.clients.map(function (l) { return '<div class="corners"><img src="' + l.src + '" alt="' + esc(l.name) + '" loading="lazy"></div>'; }).join('') + '</div>' +
  '</section>' +

  '<section class="approve wrap" id="ajuda">' +
    '<div><div class="approve__stamp" aria-hidden="true"><svg viewBox="0 0 200 200"><defs><path id="circ" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0"/></defs><text><textPath href="#circ">' + esc(T.approved) + ' · Duett Software · </textPath></text></svg>' + duettLogo({ markOnly: true, cls: 'mk' }) + '</div>' +
    '<h2>' + c.help.title + '</h2><p>' + c.help.text + '</p>' +
    '<div class="ctas"><a class="btn btn--solid" href="' + D.mailto(c.help.demoSubject) + '">' + c.help.demo + kit.arrow + '</a><a class="btn" href="' + L.whatsapp + '" target="_blank" rel="noopener">' + c.help.whatsapp + kit.arrow + '</a></div></div>' +
  '</section>' +

  '<section class="sheet wrap" id="contato">' + tag(9, c.nav.contact) +
    '<h2 class="t-xl ink">' + c.contact.title + '</h2><p class="lead" style="margin-top:24px">' + c.contact.text + '</p>' +
    '<div class="contact">' +
      '<article><h3>' + c.contact.sales.title + '</h3><p>' + c.contact.sales.text + '</p><a href="mailto:' + L.emailSales + '">' + L.emailSales + '</a><a href="' + L.phoneHref + '">' + L.phone + '</a></article>' +
      '<article><h3>' + c.contact.support.title + '</h3><p>' + c.contact.support.text + '</p><a href="mailto:' + L.emailSupport + '">' + L.emailSupport + '</a><a href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + ' ↗</a></article>' +
      '<article><h3>' + c.contact.location.title + '</h3><address>' + c.contact.location.lines.join('<br>') + '</address></article>' +
    '</div>' +
    '<div class="careers">' + render(M.servicesBanner, '') + '<div><p class="sheet-tag"><b>' + c.careers.eyebrow + '</b></p><h2 class="t-l ink">' + c.careers.title + '</h2><p style="margin-top:22px">' + c.careers.text + '</p><p>' + c.careers.text2 + '</p>' +
      '<a class="btn" href="' + L.careers + '" target="_blank" rel="noopener">' + c.careers.cta + kit.arrow + '</a></div></div>' +
    '<div class="social"><div><p class="sheet-tag"><b>' + c.social.eyebrow + '</b></p><h2 class="t-l">' + c.social.title + '</h2><p style="color:var(--muted);margin-top:14px">' + c.social.text + '</p></div>' +
      '<div class="social__links">' + L.social.map(function (s) { return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.name + '"><img src="' + s.icon + '" alt=""></a>'; }).join('') + '</div></div>' +
  '</section>' +
  '</main>' +

  '<footer class="footer">' +
    '<div class="footer__grid">' +
      '<div><a class="brand" href="#top" aria-label="Duett Software">' + duettLogo() + '</a><div class="lines"><a href="mailto:' + L.emailSales + '">' + L.emailSales + '</a><a href="mailto:' + L.emailSupport + '">' + L.emailSupport + '</a><a href="' + L.phoneHref + '">' + L.phone + '</a></div></div>' +
      '<div><h4>' + c.footer.sitemap + '</h4><ul><li><a href="#top">' + c.nav.home + '</a></li><li><a href="#servicos">' + c.nav.services + '</a></li><li><a href="#contato">' + c.nav.contact + '</a></li></ul></div>' +
      '<div><h4>' + c.footer.links + '</h4><ul><li><a href="' + L.terms + '">' + c.footer.terms + '</a></li><li><a href="' + L.privacy + '">' + c.footer.privacy + '</a></li><li><a href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + '</a></li></ul></div>' +
      '<div><h4>' + c.footer.where + '</h4><address>' + c.footer.address.join('<br>') + '</address></div>' +
    '</div>' +
    '<div class="titleblock"><div><span>' + T.project + '</span><b>' + c.footer.copyright + '</b></div><div><span>' + T.scale + '</span><b>1:1</b></div><div><span>' + T.date + '</span><b>2018</b></div><div><span>' + T.sheet + '</span><b>' + TOTAL + '/' + TOTAL + '</b></div><div><span>↑</span><b><button type="button" class="to-top">' + c.ui.top + '</button></b></div></div>' +
  '</footer>';

  document.getElementById('app').innerHTML = html;

  /* diagrama: hub Duett ligado aos protocolos/fabricantes */
  function schema() {
    var W = 1200, H = 440, hub = { x: 600, y: 220 }, out = '';
    var nodes = M.integrations.map(function (n, i) {
      var left = i < 3, row = i % 3;
      return { name: n.name, x: left ? 170 : 1030, y: 70 + row * 150 };
    });
    nodes.forEach(function (n, i) {
      var mx = n.x < hub.x ? 380 : 820;
      var d = 'M' + hub.x + ' ' + hub.y + ' H' + mx + ' V' + n.y + ' H' + n.x;
      out += '<path class="wire" id="w' + i + '" d="' + d + '"/><circle class="pulse" r="4" data-w="w' + i + '"/>';
    });
    nodes.forEach(function (n) {
      var w = Math.max(150, n.name.length * 10 + 40);
      out += '<g class="node"><rect x="' + (n.x - w / 2) + '" y="' + (n.y - 24) + '" width="' + w + '" height="48"/><text x="' + n.x + '" y="' + (n.y + 5) + '" text-anchor="middle">' + esc(n.name) + '</text></g>';
    });
    out += '<g class="node hub"><rect x="' + (hub.x - 90) + '" y="' + (hub.y - 34) + '" width="180" height="68"/><text x="' + hub.x + '" y="' + (hub.y + 5) + '" text-anchor="middle">DUETT</text></g>';
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' + out + '</svg>';
  }

  /* --------------------------------------------------------- interações */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  $('.lang').addEventListener('click', D.toggleLang);
  var nav = $('#nav'), mb = $('.menu-btn');
  mb.addEventListener('click', function () { var o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', String(o)); mb.textContent = o ? c.ui.close : c.ui.menu; });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); mb.textContent = c.ui.menu; } });
  kit.tabs(document);
  var lenis = kit.smooth();
  $('.to-top').addEventListener('click', function () { lenis ? lenis.scrollTo(0, { duration: 2 }) : scrollTo({ top: 0, behavior: 'smooth' }); });

  /* mira + coordenadas */
  var cross = $('.cross'), xy = $('.xy');
  if (matchMedia('(hover: hover)').matches && !RM) {
    var h = cross.querySelector('.h'), v = cross.querySelector('.v'), rd = cross.querySelector('.read');
    addEventListener('mousemove', function (e) {
      cross.classList.add('on');
      h.style.top = e.clientY + 'px'; v.style.left = e.clientX + 'px';
      rd.style.left = e.clientX + 'px'; rd.style.top = e.clientY + 'px';
      var t = 'X ' + String(e.clientX).padStart(4, '0') + ' · Y ' + String(Math.round(e.clientY + scrollY)).padStart(4, '0');
      rd.textContent = t; xy.textContent = t;
    });
    document.addEventListener('mouseleave', function () { cross.classList.remove('on'); });
  }

  /* régua lateral acompanha a rolagem */
  var ruler = $('.ruler i');
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: function (s) { ruler.style.transform = 'translateY(' + (-(s.scroll() * .5) % 120) + 'px)'; } });

  /* clímax: a prancha é aprovada (fundo menta) */
  ScrollTrigger.create({ trigger: '.approve', start: 'top 55%', end: 'bottom 45%', onToggle: function (s) { document.body.classList.toggle('approved', s.isActive); } });

  if (RM) {
    $$('.render .pct, .render .scan').forEach(function (e) { e.remove(); });
    kit.restoreScroll(null);
    return;
  }

  /* ---------------------------------------------------------- coreografia */
  var mm = gsap.matchMedia();

  /* símbolo desenhado a traço, depois preenchido */
  var hooks = $$('.hero__fig .mark path');
  hooks.forEach(function (p) { var len = p.getTotalLength(); p.style.strokeDasharray = len; p.style.strokeDashoffset = len; });
  var intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  intro.to(hooks, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut', stagger: .3 }, .2)
       .to(hooks, { fill: '#06ecb7', duration: 1 }, 2.2)
       .fromTo('#h1', { '--fill': '0%' }, { '--fill': '100%', duration: 2.4, ease: 'power2.inOut' }, .4)
       .from('.hero__fig .dim, .hero__fig .circ, .hero__fig .fig', { opacity: 0, duration: 1, stagger: .15 }, 1.6)
       .from('.titleblock div', { opacity: 0, y: 12, duration: .8, stagger: .06 }, 1.2)
       .from('.hero__sub', { opacity: 0, y: 20, duration: 1 }, 1.4);
  gsap.to('.hero__fig .circ', { rotate: 360, duration: 60, repeat: -1, ease: 'none' });

  /* títulos: contorno → tinta com a rolagem */
  $$('.ink').forEach(function (el) {
    if (el.id === 'h1') return;
    gsap.fromTo(el, { '--fill': '0%' }, { '--fill': '100%', ease: 'none', scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 45%', scrub: true } });
  });

  /* imagens: desenho → render */
  function renderOn(fig, st) {
    var photo = fig.querySelector('.photo'), scan = fig.querySelector('.scan'), pct = fig.querySelector('.pct');
    var tl = gsap.timeline({ scrollTrigger: st });
    tl.fromTo(photo, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'none', duration: 1 }, 0)
      .fromTo(scan, { left: '0%' }, { left: '100%', ease: 'none', duration: 1 }, 0)
      .to(scan, { opacity: 0, duration: .05 }, .95)
      .to(pct, { opacity: 0, duration: .05 }, .97);
    tl.eventCallback('onUpdate', function () { pct.textContent = T.render + ' ' + String(Math.round(tl.progress() * 100)).padStart(3, '0') + '%'; });
    return tl;
  }
  $$('.render').forEach(function (f) {
    if (f.closest('.plate')) return;
    renderOn(f, { trigger: f, start: 'top 75%', end: 'center 40%', scrub: true });
  });

  /* módulos: tracejado → traço contínuo */
  $$('.module, .device, .clients > div').forEach(function (m) {
    ScrollTrigger.create({ trigger: m, start: 'top 80%', onEnter: function () { m.classList.add('drawn'); m.style.outlineStyle = 'solid'; m.style.outlineColor = 'var(--fg)'; } });
    gsap.from(m, { y: 40, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: m, start: 'top 90%' } });
  });
  $$('.bom tbody tr, .vtable tr').forEach(function (r, i) {
    gsap.from(r, { opacity: 0, x: -20, duration: .8, ease: 'expo.out', scrollTrigger: { trigger: r, start: 'top 92%' } });
  });

  /* dispositivos desenhados a traço */
  $$('.device svg').forEach(function (s) {
    var parts = s.querySelectorAll('rect, path');
    parts.forEach(function (p) { var l = p.getTotalLength ? p.getTotalLength() : 400; p.style.strokeDasharray = l; p.style.strokeDashoffset = l; });
    gsap.to(parts, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', stagger: .06, scrollTrigger: { trigger: s, start: 'top 80%' } });
  });

  /* esquema: fios desenham, pulsos de dados percorrem */
  var wires = $$('.schema .wire');
  wires.forEach(function (w) { var l = w.getTotalLength(); w.style.strokeDasharray = l; w.style.strokeDashoffset = l; });
  gsap.to(wires, { strokeDashoffset: 0, ease: 'none', stagger: .1, scrollTrigger: { trigger: '.schema', start: 'top 75%', end: 'center 45%', scrub: true } });
  gsap.from('.schema .node', { opacity: 0, scale: .9, transformOrigin: 'center', stagger: .08, duration: .8, scrollTrigger: { trigger: '.schema', start: 'top 70%' } });
  $$('.schema .pulse').forEach(function (p, i) {
    var w = document.getElementById(p.dataset.w), len = w.getTotalLength(), o = { t: 0 };
    gsap.to(o, { t: 1, duration: 2.2 + i * .25, repeat: -1, ease: 'none', delay: i * .3, onUpdate: function () {
      var back = Math.floor(o.t * 2) % 2, k = back ? 1 - (o.t * 2 - 1) : o.t * 2;
      var pt = w.getPointAtLength(len * Math.min(1, Math.max(0, k)));
      p.setAttribute('cx', pt.x); p.setAttribute('cy', pt.y);
    } });
  });

  mm.add('(min-width: 861px)', function () {
    /* projetos: pranchas empilhadas */
    var plates = $$('.plate'), count = $('.st-count');
    gsap.set(plates.slice(1), { yPercent: 120, rotate: 2 });
    var tl = gsap.timeline({ scrollTrigger: { trigger: '.stack', start: 'top top', end: '+=' + (plates.length * 100) + '%', scrub: 1, pin: true, anticipatePin: 1,
      onUpdate: function (s) { count.textContent = kit.pad(Math.min(plates.length, Math.floor(s.progress * plates.length) + 1)) + ' / ' + kit.pad(plates.length); } } });
    plates.forEach(function (pl, i) {
      if (i) tl.to(pl, { yPercent: 0, rotate: 0, duration: .6, ease: 'power2.out' }, i - .35).to(plates[i - 1], { scale: .94, opacity: .4, duration: .6 }, i - .35);
      var figs = pl.querySelectorAll('.render');
      figs.forEach(function (f, k) {
        var photo = f.querySelector('.photo'), scan = f.querySelector('.scan'), pct = f.querySelector('.pct'), st = i + (k ? .3 : 0), o = { p: 0 };
        tl.fromTo(photo, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'none', duration: .55 }, st)
          .fromTo(scan, { left: '0%', opacity: 1 }, { left: '100%', ease: 'none', duration: .55 }, st)
          .to(o, { p: 100, duration: .55, ease: 'none', onUpdate: function () { pct.textContent = T.render + ' ' + String(Math.round(o.p)).padStart(3, '0') + '%'; } }, st)
          .to([scan, pct], { opacity: 0, duration: .02 }, st + .56);
      });
    });

    /* metodologia: gantt preenche com a rolagem */
    var rows = $$('.gantt__row'), bars = $$('.gantt__bar'), ds = $$('.gantt__detail .d');
    var g = gsap.timeline({ scrollTrigger: { trigger: '.gantt', start: 'top top', end: '+=240%', scrub: 1, pin: true, anticipatePin: 1,
      onUpdate: function (s) {
        var a = Math.min(rows.length - 1, Math.floor(s.progress * rows.length));
        rows.forEach(function (r, i) { r.classList.toggle('on', i <= a); });
        ds.forEach(function (d, i) { d.classList.toggle('on', i === a); });
      } } });
    bars.forEach(function (b, i) { g.to(b, { scaleX: 1, duration: 1, ease: 'none' }, i * .85); });

    return function () { gsap.set(plates, { clearProps: 'all' }); };
  });

  mm.add('(max-width: 860px)', function () {
    $$('.plate .render').forEach(function (f) { renderOn(f, { trigger: f, start: 'top 75%', end: 'center 40%', scrub: true }); });
  });

  ScrollTrigger.sort();
  addEventListener('load', function () { ScrollTrigger.refresh(); kit.restoreScroll(lenis); });
})();
