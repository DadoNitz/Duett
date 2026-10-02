/* Duett — Versão B · "Duas vozes" */
(function () {
  var D = window.DUETT, c = D.c, L = c.links, M = c.media, RM = D.reducedMotion;
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  var plain = function (h) { var d = document.createElement('div'); d.innerHTML = h; return d.textContent; };
  var W = D.words, R = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
  var roman = function (i, t) { return '<p class="label"><span class="roman">' + R[i] + '.</span>' + t + '</p>'; };

  gsap.registerPlugin(ScrollTrigger);
  document.querySelector('.skip').textContent = D.lang === 'en' ? 'Skip to content' : 'Pular para o conteúdo';

  var hl = c.hero.lines;
  var chapters = [
    { img: M.team, cap: c.web.eyebrow, body:
      roman(1, c.web.eyebrow) + '<h2 class="d-l split">' + W(c.web.title) + '</h2><p class="lead reveal">' + c.web.text + '</p>' +
      '<ul class="tags reveal">' + c.web.list.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' },
    { img: M.projects[2][0], cap: c.mobile.eyebrow, body:
      roman(2, c.mobile.eyebrow) + '<h2 class="d-l split">' + W(c.mobile.title) + '</h2><p class="lead reveal">' + c.mobile.text + '</p>' +
      '<div class="trio">' + c.mobile.items.map(function (m) { return '<article class="reveal"><h4>' + m.title + '</h4><p>' + m.text + '</p></article>'; }).join('') + '</div>' },
    { img: M.projects[0][0], cap: c.integration.eyebrow, body:
      roman(3, c.integration.eyebrow) + '<h2 class="d-l split">' + W(c.integration.title) + '</h2>' +
      c.integration.text.map(function (t) { return '<p class="lead reveal">' + t + '</p>'; }).join('') +
      '<div class="logos reveal">' + M.integrations.map(function (l) { return '<div><img src="' + l.src + '" alt="' + esc(l.name) + '" loading="lazy"></div>'; }).join('') + '</div>' },
    { img: M.servicesBanner, cap: c.outsourcing.eyebrow, body:
      roman(4, c.outsourcing.eyebrow) + '<h2 class="d-l split">' + W(c.outsourcing.title) + '</h2><p class="lead reveal">' + c.outsourcing.text + '</p>' +
      '<div class="tabs reveal"><div role="tablist" aria-label="' + esc(c.outsourcing.eyebrow) + '">' +
        c.outsourcing.tabs.map(function (t, i) { return '<button role="tab" id="tab-' + i + '" aria-controls="panel-' + i + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : '') + '>' + t.tab + '</button>'; }).join('') + '</div>' +
        c.outsourcing.tabs.map(function (t, i) { return '<div role="tabpanel" id="panel-' + i + '" aria-labelledby="tab-' + i + '"' + (i ? ' hidden' : '') + '><h4>' + t.title + '</h4><p>' + t.text + '</p></div>'; }).join('') +
      '</div>' }
  ];

  var html = '' +
  '<div class="progress" aria-hidden="true"></div>' +
  '<header class="top">' +
    '<a class="brand" href="#top" aria-label="Duett Software — ' + c.nav.home + '">' + duettLogo({ mark: 'currentColor', word: 'currentColor' }) + '</a>' +
    '<button class="menu-btn" aria-expanded="false" aria-controls="nav">' + c.ui.menu + '</button>' +
    '<nav id="nav" aria-label="Principal">' +
      '<a href="#top">' + c.nav.home + '</a><a href="#servicos">' + c.nav.services + '</a><a href="#sobre">' + c.nav.about + '</a><a href="#contato">' + c.nav.contact + '</a>' +
      '<a href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + ' ↗</a>' +
      '<button class="lang" type="button" aria-label="' + c.ui.langLabel + '">' + c.ui.lang + '</button>' +
    '</nav>' +
  '</header>' +
  '<div class="cursor" aria-hidden="true"></div>' +
  kit.versions('duet') +

  '<main id="main">' +
  '<section class="hero" id="top" aria-label="' + esc(hl.join(' ')) + '">' +
    '<div class="hero__half hero__l"><img src="' + M.hero + '" alt=""></div>' +
    '<div class="hero__half hero__r"></div>' +
    '<span class="hero__seam" aria-hidden="true"></span>' +
    '<p class="hero__voice hero__voice--l" aria-hidden="true">' + (D.lang === 'en' ? 'Industry' : 'Indústria') + '</p>' +
    '<p class="hero__voice hero__voice--r" aria-hidden="true">Software</p>' +
    '<div class="hero__mark" aria-hidden="true">' + duettLogo({ markOnly: true }) + '</div>' +
    '<h1 style="margin:0">' +
      '<span class="hero__txt hero__txt--l"><span class="ln d-xxl">' + W(hl[0]) + '</span><span class="ln d-xxl">' + W(hl[1]) + '</span></span>' +
      '<span class="hero__txt hero__txt--r"><span class="ln">' + W(hl[2]) + '</span><span class="ln">' + W(hl[3]) + '</span></span>' +
    '</h1>' +
    '<p class="hero__sub"><span>' + c.hero.sub + '</span></p>' +
  '</section>' +

  '<section class="sec wrap" id="servicos">' +
    '<div class="two">' +
      '<div class="sticky">' + roman(0, c.services.eyebrow) + '<h2 class="d-xl split">' + W(c.services.title) + '</h2><p class="lead reveal" style="margin-top:28px">' + c.services.text + '</p></div>' +
      '<ol class="rows">' + c.services.items.map(function (s, i) {
        return '<li class="row reveal"><span class="n">' + (i + 1) + '</span><div><h3>' + s.title + '</h3><p>' + s.text + '</p></div></li>';
      }).join('') + '</ol>' +
    '</div>' +
  '</section>' +

  '<section class="statement" aria-label="' + esc(c.services.banner) + '">' + splitStatement(c.services.banner) + '</section>' +

  '<section class="chapters" id="capitulos">' +
    '<div class="chapters__media" aria-hidden="true">' + chapters.map(function (ch, i) {
      return '<figure' + (i === 0 ? ' class="on"' : '') + '><img src="' + ch.img + '" alt="" loading="lazy"><figcaption class="cap">' + R[i + 1] + '. ' + ch.cap + '</figcaption></figure>';
    }).join('') + '</div>' +
    '<div class="chapters__list">' + chapters.map(function (ch, i) {
      return '<article class="chapter" data-i="' + i + '"><div class="chapter__img"><img src="' + ch.img + '" alt="" loading="lazy"></div>' + ch.body + '</article>';
    }).join('') + '</div>' +
  '</section>' +

  '<div class="marquee" aria-hidden="true"><div class="marquee__row">' + marquee() + '</div></div>' +

  '<section class="projects" id="projetos" aria-label="' + esc(plain(c.projects.title)) + '"><div class="projects__track">' +
    '<div class="projects__intro">' + roman(5, c.projects.eyebrow) + '<h2 class="d-xl split">' + W(c.projects.title) + '</h2></div>' +
    c.projects.items.map(function (p, i) {
      return '<article class="proj"><div class="proj__imgs"><div><img src="' + M.projects[i][0] + '" alt="' + esc(p.title) + '" loading="lazy"></div><div><img src="' + M.projects[i][1] + '" alt="" loading="lazy"></div></div>' +
        '<div class="proj__txt"><span class="n">0' + (i + 1) + '</span><h3>' + p.title + '</h3><p>' + p.text + '</p></div></article>';
    }).join('') +
  '</div></section>' +

  '<section class="sec wrap" id="metodologia">' +
    '<div class="two" style="align-items:end"><div>' + roman(6, c.method.eyebrow) + '<h2 class="d-xl split">' + W(c.method.title) + '</h2></div><p class="lead reveal">' + c.method.text + '</p></div>' +
    '<ol class="zig"><span class="zig__seam" aria-hidden="true"><i></i></span>' + c.method.steps.map(function (s, i) {
      return '<li class="reveal"><span class="n">' + (i + 1) + '</span><h3>' + s.title + '</h3><p>' + s.text + '</p></li>';
    }).join('') + '</ol>' +
  '</section>' +

  '<section class="sec" id="sobre" style="padding-bottom:0">' +
    '<div class="wrap">' + roman(7, c.about.eyebrow) + '</div>' +
    '<div class="year" aria-label="' + c.about.founded + '"><span aria-hidden="true">20</span><span aria-hidden="true">18</span></div>' +
    '<div class="wrap"><h2 class="d-l split" style="margin-top:40px">' + W(c.about.title) + '</h2>' +
      '<div class="about-cols reveal">' + c.about.text.map(function (t) { return '<p>' + t + '</p>'; }).join('') + '</div></div>' +
    '<div class="reveal-img"><div class="reveal-img__pin"><div class="reveal-img__frame"><img src="' + M.team + '" alt="" loading="lazy"></div>' +
      '<div class="reveal-img__txt"><h2 class="d-xl">' + c.about.bannerTitle + '</h2><p>' + c.about.bannerText + '</p></div></div></div>' +
    '<div class="mv">' +
      '<article><p class="label" style="color:inherit;opacity:.6">' + c.about.eyebrow + '</p><h3>' + c.about.mission.title + '</h3><p>' + c.about.mission.text + '</p></article>' +
      '<article><p class="label" style="color:inherit;opacity:.7">' + c.about.eyebrow + '</p><h3>' + c.about.vision.title + '</h3><p>' + c.about.vision.text + '</p></article>' +
    '</div>' +
    '<div class="wrap sec">' + roman(8, c.values.eyebrow) + '<h2 class="d-xl split">' + W(c.values.title) + '</h2>' +
      '<ol class="values">' + c.values.items.map(function (v, i) { return '<li class="reveal"><span class="n">' + (i + 1) + '</span><h3>' + v.title + '</h3><p>' + v.text + '</p></li>'; }).join('') + '</ol>' +
      '<div style="margin-top:clamp(96px,14vh,180px)"><p class="label">' + c.about.techTitle + '</p>' +
      '<ul class="tech">' + M.tech.map(function (t) { return '<li><img src="' + t.src + '" alt="" loading="lazy"><span>' + esc(t.name) + '</span></li>'; }).join('') + '</ul></div>' +
    '</div>' +
  '</section>' +

  '<section class="sec" id="clientes" style="padding-top:0">' +
    '<div class="wrap two" style="align-items:end;margin-bottom:56px"><div><p class="label">' + c.clients.eyebrow + '</p><h2 class="d-xl split">' + W(c.clients.title) + '</h2></div><p class="lead reveal">' + c.clients.text + '</p></div>' +
    '<div class="belt" data-dir="1"><div class="belt__row">' + belt(M.clients) + '</div></div>' +
    '<div class="belt" data-dir="-1"><div class="belt__row">' + belt(M.clients.slice(4).concat(M.clients.slice(0, 4))) + '</div></div>' +
  '</section>' +

  '<section class="doors" id="ajuda" aria-label="' + esc(c.help.title) + '">' +
    '<div class="doors__hint" aria-hidden="true">' + c.help.title + '</div>' +
    '<div class="door door--l"></div><div class="door door--r"></div>' +
    '<div class="doors__mark" aria-hidden="true">' + duettLogo({ markOnly: true }) + '</div>' +
    '<div class="doors__inner"><div><h2>' + c.help.title + '</h2><p>' + c.help.text + '</p><div class="ctas">' +
      '<a class="btn btn--mint" href="' + D.mailto(c.help.demoSubject) + '">' + c.help.demo + kit.arrow + '</a>' +
      '<a class="btn btn--light" href="' + L.whatsapp + '" target="_blank" rel="noopener">' + c.help.whatsapp + kit.arrow + '</a>' +
    '</div></div></div>' +
  '</section>' +

  '<section class="sec wrap" id="contato">' +
    '<h2 class="d-xxl split">' + W(c.contact.title) + '</h2><p class="lead reveal" style="margin-top:24px">' + c.contact.text + '</p>' +
    '<div class="contact-grid">' +
      '<article class="reveal"><h3>' + c.contact.sales.title + '</h3><p>' + c.contact.sales.text + '</p><a href="mailto:' + L.emailSales + '">' + L.emailSales + '</a><a href="' + L.phoneHref + '">' + L.phone + '</a></article>' +
      '<article class="reveal"><h3>' + c.contact.support.title + '</h3><p>' + c.contact.support.text + '</p><a href="mailto:' + L.emailSupport + '">' + L.emailSupport + '</a><a href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + ' ↗</a></article>' +
      '<article class="reveal"><h3>' + c.contact.location.title + '</h3><address>' + c.contact.location.lines.join('<br>') + '</address></article>' +
    '</div>' +
    '<div class="careers"><figure class="reveal"><img src="' + M.servicesBanner + '" alt="" loading="lazy"></figure>' +
      '<div><p class="label">' + c.careers.eyebrow + '</p><h2 class="d-l split">' + W(c.careers.title) + '</h2><p class="reveal" style="margin-top:22px">' + c.careers.text + '</p><p class="reveal">' + c.careers.text2 + '</p>' +
      '<a class="btn btn--fill" href="' + L.careers + '" target="_blank" rel="noopener">' + c.careers.cta + kit.arrow + '</a></div></div>' +
    '<div class="social"><div><p class="label">' + c.social.eyebrow + '</p><h2 class="d-l split">' + W(c.social.title) + '</h2><p class="reveal" style="color:var(--muted);margin-top:14px">' + c.social.text + '</p></div>' +
      '<div class="social__links">' + L.social.map(function (s) { return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.name + '"><img src="' + s.icon + '" alt=""></a>'; }).join('') + '</div></div>' +
  '</section>' +
  '</main>' +

  '<footer class="footer">' +
    '<div class="footer__grid">' +
      '<div><a class="brand" href="#top" aria-label="Duett Software">' + duettLogo({ word: '#f3f1ea' }) + '</a><div class="lines"><a href="mailto:' + L.emailSales + '">' + L.emailSales + '</a><a href="mailto:' + L.emailSupport + '">' + L.emailSupport + '</a><a href="' + L.phoneHref + '">' + L.phone + '</a></div></div>' +
      '<div><h4>' + c.footer.sitemap + '</h4><ul><li><a href="#top">' + c.nav.home + '</a></li><li><a href="#servicos">' + c.nav.services + '</a></li><li><a href="#contato">' + c.nav.contact + '</a></li></ul></div>' +
      '<div><h4>' + c.footer.links + '</h4><ul><li><a href="' + L.terms + '">' + c.footer.terms + '</a></li><li><a href="' + L.privacy + '">' + c.footer.privacy + '</a></li><li><a href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + '</a></li></ul></div>' +
      '<div><h4>' + c.footer.where + '</h4><address>' + c.footer.address.join('<br>') + '</address></div>' +
    '</div>' +
    '<div class="footer__big" aria-hidden="true"><span>du</span><span>ett</span></div>' +
    '<div class="footer__bottom"><span>' + c.footer.copyright + '</span><span>' + L.social.map(function (s) { return '<a href="' + s.href + '" target="_blank" rel="noopener" style="margin-right:16px">' + s.name + '</a>'; }).join('') + '</span><button type="button" class="to-top">' + c.ui.top + ' ↑</button></div>' +
  '</footer>';

  document.getElementById('app').innerHTML = html;

  function splitStatement(t) {
    var words = t.split(' '), lines = [], per = Math.ceil(words.length / 3);
    for (var i = 0; i < words.length; i += per) lines.push(words.slice(i, i + per).join(' '));
    return lines.map(function (l) { return '<span class="ln">' + esc(l) + '</span>'; }).join('');
  }
  function marquee() {
    var s = c.projects.items.map(function (p) { return '<span>' + p.title + '<i>✦</i></span>'; }).join('');
    return s + s + s;
  }
  function belt(list) {
    var one = list.map(function (l) { return '<img src="' + l.src + '" alt="' + esc(l.name) + '" loading="lazy">'; }).join('');
    return one + one.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"') + one.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"');
  }

  /* ---------------------------------------------------------- interações */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  $('.lang').addEventListener('click', D.toggleLang);
  var nav = $('#nav'), mb = $('.menu-btn');
  mb.addEventListener('click', function () { var o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', String(o)); mb.textContent = o ? c.ui.close : c.ui.menu; });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); mb.textContent = c.ui.menu; } });
  kit.tabs(document);
  var lenis = kit.smooth();
  $('.to-top').addEventListener('click', function () { lenis ? lenis.scrollTo(0, { duration: 2 }) : scrollTo({ top: 0, behavior: 'smooth' }); });

  var cur = $('.cursor');
  if (matchMedia('(hover: hover)').matches && !RM) {
    var cx = gsap.quickTo(cur, 'x', { duration: .35, ease: 'power3' }), cy = gsap.quickTo(cur, 'y', { duration: .35, ease: 'power3' });
    addEventListener('mousemove', function (e) { cx(e.clientX); cy(e.clientY); });
    document.addEventListener('mouseover', function (e) { cur.classList.toggle('big', !!e.target.closest('a, button, .row, .tech li')); });
  }

  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: function (s) { $('.progress').style.transform = 'scaleX(' + s.progress.toFixed(4) + ')'; } });

  /* capítulos: imagem fixa troca quando o texto entra */
  var figs = $$('.chapters__media figure');
  $$('.chapter').forEach(function (ch, i) {
    ScrollTrigger.create({ trigger: ch, start: 'top 55%', end: 'bottom 55%', onToggle: function (s) {
      if (!s.isActive) return;
      figs.forEach(function (f, j) {
        if (RM) { f.classList.toggle('on', j === i); return; }
        gsap.to(f, { clipPath: j <= i ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)', duration: 1.1, ease: 'expo.inOut', overwrite: true });
        gsap.to(f.querySelector('img'), { scale: j === i ? 1 : 1.15, duration: 1.6, ease: 'expo.out', overwrite: true });
      });
    } });
  });

  if (RM) { kit.restoreScroll(null); return; }

  /* ------------------------------------------------------------- coreografia */
  var mm = gsap.matchMedia();

  var intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  intro.from('.hero__l', { xPercent: -100, duration: 1.6, ease: 'expo.inOut' }, 0)
       .from('.hero__r', { xPercent: 100, duration: 1.6, ease: 'expo.inOut' }, 0)
       .from('.hero__seam', { scaleY: 0, duration: 1.4, ease: 'expo.inOut' }, .6)
       .from('.hero__txt--l .wi', { yPercent: 110, duration: 1.3, stagger: .07 }, .9)
       .from('.hero__txt--r .wi', { yPercent: -110, duration: 1.3, stagger: .07 }, .9)
       .from('.hero__mark .hook-a', { x: -220, rotate: -30, opacity: 0, duration: 1.6 }, 1)
       .from('.hero__mark .hook-b', { x: 220, rotate: 30, opacity: 0, duration: 1.6 }, 1)
       .from('.hero__sub, .hero__voice, .top, .versions', { opacity: 0, y: 12, duration: 1, stagger: .05 }, 1.4);

  mm.add('(min-width: 861px)', function () {
    /* Hero: as metades se afastam, o símbolo se encaixa, a página "abre" */
    gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=100%', scrub: 1, pin: true, anticipatePin: 1 } })
      .to('.hero__mark', { top: '50%', scale: 1.5, duration: .5 }, 0)
      .to('.hero__txt--l', { xPercent: -14, opacity: 0, duration: .6 }, .2)
      .to('.hero__txt--r', { xPercent: 14, opacity: 0, duration: .6 }, .2)
      .to('.hero__l', { xPercent: -100, duration: .7, ease: 'power2.in' }, .3)
      .to('.hero__r', { xPercent: 100, duration: .7, ease: 'power2.in' }, .3)
      .to('.hero__seam', { scaleY: 0, transformOrigin: 'bottom', duration: .4 }, .3)
      .to('.hero__mark .hook-a', { fill: '#090039', duration: .3 }, .6)
      .to('.hero__mark .hook-b', { fill: '#4146ff', duration: .3 }, .6)
      .to('.hero__sub', { bottom: '42%', scale: 1.35, duration: .6 }, .4)
      .to('.hero__voice', { opacity: 0, duration: .2 }, 0);

    /* Projetos: trilho horizontal com imagens em contra-movimento */
    var track = $('.projects__track');
    var tween = gsap.to(track, {
      x: function () { return -(track.scrollWidth - innerWidth); }, ease: 'none',
      scrollTrigger: { trigger: '.projects', start: 'top top', end: function () { return '+=' + (track.scrollWidth - innerWidth); }, scrub: 1, pin: true, invalidateOnRefresh: true, anticipatePin: 1 }
    });
    $$('.proj').forEach(function (p) {
      var imgs = p.querySelectorAll('img');
      gsap.fromTo(imgs[0], { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
      gsap.fromTo(imgs[1], { xPercent: 10, yPercent: 6 }, { xPercent: -10, yPercent: -6, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
      gsap.from(p.querySelector('.proj__txt'), { y: 60, opacity: 0, ease: 'expo.out', duration: 1.2, scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left 70%' } });
    });

    /* Portas: duas metades se fecham sobre o convite */
    gsap.timeline({ scrollTrigger: { trigger: '.doors', start: 'top top', end: '+=120%', scrub: 1, pin: true, anticipatePin: 1 } })
      .to('.door--l', { xPercent: 0, x: 0, duration: 1 }, 0)
      .to('.door--r', { xPercent: 0, x: 0, duration: 1 }, 0)
      .fromTo('.doors__mark .hook-a', { x: -160, rotate: -30 }, { x: 0, rotate: 0, duration: 1 }, 0)
      .fromTo('.doors__mark .hook-b', { x: 160, rotate: 30 }, { x: 0, rotate: 0, duration: 1 }, 0)
      .to('.doors__hint', { opacity: 0, duration: .3 }, .2)
      .to('.doors__inner', { opacity: 1, duration: .4 }, .8)
      .from('.doors__inner h2', { y: 60, duration: .5 }, .8);
    gsap.set('.door--l', { xPercent: -100 }); gsap.set('.door--r', { xPercent: 100 });

    /* Ano: "20" e "18" vêm de lados opostos */
    gsap.fromTo('.year span:first-child', { xPercent: -60 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.year', start: 'top bottom', end: 'center 55%', scrub: true } });
    gsap.fromTo('.year span:last-child', { xPercent: 60 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '.year', start: 'top bottom', end: 'center 55%', scrub: true } });

    return function () { gsap.set('.door--l, .door--r, .doors__inner', { clearProps: 'all' }); };
  });

  mm.add('(max-width: 860px)', function () {
    gsap.set('.door--l, .door--r', { xPercent: 0, x: 0 });
    gsap.set('.doors__inner', { opacity: 1 });
  });

  $$('.split').forEach(function (h) {
    gsap.from(h.querySelectorAll('.wi'), { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: .05, scrollTrigger: { trigger: h, start: 'top 85%' } });
  });
  $$('.reveal').forEach(function (el) {
    gsap.from(el, { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });

  /* Frase: linhas deslizam em sentidos opostos */
  $$('.statement .ln').forEach(function (ln, i) {
    gsap.fromTo(ln, { xPercent: i % 2 ? 6 : -6 }, { xPercent: i % 2 ? -3 : 3, ease: 'none', scrollTrigger: { trigger: '.statement', start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* Marquee acompanha a rolagem */
  gsap.fromTo('.marquee__row', { xPercent: 0 }, { xPercent: -33.333, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: true } });

  /* Metodologia: costura central desenha com a rolagem */
  gsap.to('.zig__seam i', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.zig', start: 'top 60%', end: 'bottom 60%', scrub: true } });
  $$('.zig li').forEach(function (li) {
    ScrollTrigger.create({ trigger: li, start: 'top 60%', onEnter: function () { li.classList.add('on'); }, onLeaveBack: function () { li.classList.remove('on'); } });
  });

  /* Imagem que abre até ocupar a tela */
  gsap.timeline({ scrollTrigger: { trigger: '.reveal-img', start: 'top top', end: 'bottom bottom', scrub: true } })
    .to('.reveal-img__frame', { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none' }, 0)
    .to('.reveal-img__frame img', { scale: 1, ease: 'none' }, 0);
  gsap.from('.reveal-img__txt', { y: 80, opacity: 0, scrollTrigger: { trigger: '.reveal-img', start: 'top 30%', end: 'top -20%', scrub: true } });

  /* Esteiras opostas de clientes */
  $$('.belt').forEach(function (b) {
    var row = b.querySelector('.belt__row'), dir = +b.dataset.dir, x = dir > 0 ? 0 : -1, boost = 0, w = 0;
    ScrollTrigger.create({ trigger: b, start: 'top bottom', end: 'bottom top', onUpdate: function (s) { boost = Math.min(Math.abs(s.getVelocity()) / 260, 12); } });
    gsap.ticker.add(function () {
      w = row.scrollWidth / 3; if (x === -1) x = -w;
      x -= (0.45 + boost) * dir; boost *= 0.93;
      if (x <= -w) x += w; if (x > 0) x -= w;
      row.style.transform = 'translate3d(' + x + 'px,0,0)';
    });
  });

  gsap.from('.footer__big span:first-child', { xPercent: -40, scrollTrigger: { trigger: '.footer__big', start: 'top bottom', end: 'bottom bottom', scrub: 1 } });
  gsap.from('.footer__big span:last-child', { xPercent: 40, scrollTrigger: { trigger: '.footer__big', start: 'top bottom', end: 'bottom bottom', scrub: 1 } });

  ScrollTrigger.sort();
  addEventListener('load', function () { ScrollTrigger.refresh(); kit.restoreScroll(lenis); });
})();
