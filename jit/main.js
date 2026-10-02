/* Duett — Versão A · "Just in Time" */
(function () {
  var D = window.DUETT, c = D.c, L = c.links, M = c.media, RM = D.reducedMotion;
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  var plain = function (h) { var d = document.createElement('div'); d.innerHTML = h; return d.textContent; };
  var W = D.words;

  gsap.registerPlugin(ScrollTrigger);
  document.querySelector('.skip').textContent = D.lang === 'en' ? 'Skip to content' : 'Pular para o conteúdo';

  /* ------------------------------------------------------------------ render */
  var stations = [];
  function station(label) { stations.push(label); return '<span class="station" data-station="' + esc(label) + '" aria-hidden="true"></span>'; }

  var heroLines = c.hero.lines.map(function (l) { return '<span class="ln">' + W(l) + '</span>'; }).join('');

  var html = '' +
  '<header class="hud">' +
    '<a class="brand" href="#top" aria-label="Duett Software — ' + c.nav.home + '">' + duettLogo() + '</a>' +
    '<button class="menu-btn" aria-expanded="false" aria-controls="nav">' + c.ui.menu + '</button>' +
    '<nav id="nav" aria-label="Principal">' +
      '<a href="#top">' + c.nav.home + '</a>' +
      '<a href="#servicos">' + c.nav.services + '</a>' +
      '<a href="#sobre">' + c.nav.about + '</a>' +
      '<a href="#contato">' + c.nav.contact + '</a>' +
      '<a class="ext" href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + '</a>' +
      '<button class="lang" type="button" aria-label="' + c.ui.langLabel + '">' + c.ui.lang + '</button>' +
    '</nav>' +
  '</header>' +

  '<div class="rail" aria-hidden="true"><svg preserveAspectRatio="none"><line class="track" x1="50%" y1="0" x2="50%" y2="100%"/><line class="rollers" x1="50%" y1="0" x2="50%" y2="100%"/></svg></div>' +
  '<div class="part" aria-hidden="true"><span class="ping"></span><span class="box"></span>' + duettLogo({ markOnly: true, mark: '#06ECB7' }) + '</div>' +

  '<div class="hud-low mono" aria-hidden="true">' +
    '<div class="readout"><span>' + c.ui.station + ' <b class="st-n">00</b> / <b class="st-t">00</b></span><span class="st-l">—</span><span class="clock">T+ 00:00:00</span></div>' +
    '<div class="bar"><i></i></div>' +
  '</div>' +
  kit.versions('jit') +

  '<main id="main">' +

  /* HERO */
  '<section class="hero wrap" id="top">' +
    '<div class="hero__photo" aria-hidden="true"><img src="' + M.hero + '" alt=""><span class="hero__scan"></span></div>' +
    '<div class="hero__coords mono" aria-hidden="true">29°41′S 51°07′W<br>Novo Hamburgo · RS<br>EST. 2018</div>' +
    '<div class="hero__mark" aria-hidden="true">' + duettLogo({ markOnly: true }) + '</div>' +
    '<h1 class="hero__title h-xl">' + heroLines + '</h1>' +
    '<div class="hero__foot"><p class="lead">' + c.hero.sub + '</p><div class="cue mono"><i></i>' + c.ui.scroll + '</div></div>' +
  '</section>' +

  /* SERVIÇOS */
  '<section class="section" id="servicos">' + station(c.services.eyebrow) +
    '<div class="wrap intro">' +
      '<div><p class="eyebrow">01 — ' + c.services.eyebrow + '</p><h2 class="h-xl split-words">' + W(c.services.title) + '</h2></div>' +
      '<p class="lead reveal">' + c.services.text + '</p>' +
    '</div>' +
    '<div class="hscroll"><div class="hscroll__track">' +
      c.services.items.map(function (s, i) {
        return '<article class="card"><div class="num"><span>' + kit.pad(i + 1) + ' / 05</span><span>●</span></div>' +
          '<span class="idx" aria-hidden="true">' + kit.pad(i + 1) + '</span>' +
          '<div><h3>' + s.title + '</h3><p>' + s.text + '</p></div></article>';
      }).join('') +
      '<div class="card card--end" aria-hidden="true"><p class="mono" style="color:var(--muted)">→ ' + c.web.eyebrow + '</p></div>' +
    '</div></div>' +
  '</section>' +

  '<section class="statement wrap" aria-label="' + esc(c.services.banner) + '">' +
    '<p class="h-l scrub-words">' + W(c.services.banner) + '</p>' +
    '<div class="statement__img"><img src="' + M.servicesBanner + '" alt="" loading="lazy"></div>' +
  '</section>' +

  /* DESENVOLVIMENTO WEB + MOBILE */
  '<section class="section wrap" id="desenvolvimento">' + station(c.web.eyebrow) +
    '<div class="split">' +
      '<div><p class="eyebrow">02 — ' + c.web.eyebrow + '</p><h2 class="h-l split-words">' + W(c.web.title) + '</h2><p class="lead reveal" style="margin-top:28px">' + c.web.text + '</p></div>' +
      '<ul class="manifest">' + c.web.list.map(function (x) { return '<li class="reveal">' + esc(x) + '</li>'; }).join('') + '</ul>' +
    '</div>' +
    '<div style="margin-top:clamp(96px,16vh,200px)">' +
      '<p class="eyebrow">' + c.mobile.eyebrow + '</p><h2 class="h-l split-words">' + W(c.mobile.title) + '</h2>' +
      '<p class="lead reveal" style="margin-top:28px;max-width:60ch">' + c.mobile.text + '</p>' +
      '<div class="trio">' + c.mobile.items.map(function (m) { return '<article class="reveal"><h4>' + m.title + '</h4><p>' + m.text + '</p></article>'; }).join('') + '</div>' +
    '</div>' +
  '</section>' +

  /* INTEGRAÇÃO + OUTSOURCING */
  '<section class="section" id="integracao">' + station(c.integration.eyebrow) +
    '<div class="wrap split">' +
      '<div><p class="eyebrow">03 — ' + c.integration.eyebrow + '</p><h2 class="h-l split-words">' + W(c.integration.title) + '</h2></div>' +
      '<div class="reveal">' + c.integration.text.map(function (t, i) { return '<p class="lead"' + (i ? '' : ' style="color:var(--ink)"') + '>' + t + '</p>'; }).join('') + '</div>' +
    '</div>' +
    '<div class="belt belt--tall" data-speed="1"><div class="belt__row">' + beltItems(M.integrations, 3) + '</div></div>' +
    '<div class="wrap" style="margin-top:clamp(96px,16vh,200px)">' +
      '<div class="split"><div><p class="eyebrow">' + c.outsourcing.eyebrow + '</p><h2 class="h-l split-words">' + W(c.outsourcing.title) + '</h2></div>' +
      '<div><p class="lead reveal">' + c.outsourcing.text + '</p>' +
      '<div class="tabs reveal"><div role="tablist" aria-label="' + esc(c.outsourcing.eyebrow) + '">' +
        c.outsourcing.tabs.map(function (t, i) { return '<button role="tab" id="tab-' + i + '" aria-controls="panel-' + i + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : '') + '>' + t.tab + '</button>'; }).join('') +
      '</div>' +
      c.outsourcing.tabs.map(function (t, i) { return '<div role="tabpanel" id="panel-' + i + '" aria-labelledby="tab-' + i + '"' + (i ? ' hidden' : '') + '><h4>' + t.title + '</h4><p>' + t.text + '</p></div>'; }).join('') +
      '</div></div></div>' +
    '</div>' +
  '</section>' +

  /* PROJETOS */
  '<section class="projects" id="projetos" aria-label="' + esc(plain(c.projects.title)) + '">' + station(c.projects.eyebrow) +
    '<div class="projects__head wrap" style="padding:0"><p class="eyebrow">04 — ' + c.projects.eyebrow + '</p></div>' +
    '<div class="projects__inner wrap">' +
      '<div class="projects__stage">' +
        M.projects.map(function (p, i) {
          return '<figure><img src="' + p[0] + '" alt="' + esc(c.projects.items[i].title) + '" loading="lazy"><div class="inset"><img src="' + p[1] + '" alt="" loading="lazy"></div></figure>';
        }).join('') +
      '</div>' +
      '<div><h2 class="h-m" style="margin-bottom:28px">' + c.projects.title + '</h2>' +
        '<div class="labels">' + c.projects.items.map(function (p, i) {
          return '<article class="label">' +
            '<div class="label__top"><span>DUETT · ' + esc(c.projects.eyebrow) + '</span><span>' + kit.pad(i + 1) + '/03</span></div>' +
            '<img class="label__icon" src="' + p.icon + '" alt="">' +
            '<h3>' + p.title + '</h3><p>' + p.text + '</p>' +
            '<div class="label__grid"><div>From<b>NH · RS</b></div><div>Lot<b>' + kit.pad(i + 1) + '-' + (2018 + i * 2) + '</b></div><div>JIT<b>✓</b></div></div>' +
            '<div class="label__bars">' + kit.barcode(p.title, '#07012f') + '</div>' +
          '</article>';
        }).join('') + '</div>' +
      '</div>' +
    '</div>' +
  '</section>' +

  /* METODOLOGIA */
  '<section class="section wrap" id="metodologia">' + station(c.method.eyebrow) +
    '<div class="intro"><div><p class="eyebrow">05 — ' + c.method.eyebrow + '</p><h2 class="h-l split-words">' + W(c.method.title) + '</h2></div><p class="lead reveal">' + c.method.text + '</p></div>' +
    '<ol class="steps">' + c.method.steps.map(function (s, i) {
      return '<li class="step"><div class="n"><span class="stamp" aria-hidden="true">✓</span>' + kit.pad(i + 1) + '</div><h3>' + s.title + '</h3><p>' + s.text + '</p></li>';
    }).join('') + '</ol>' +
  '</section>' +

  /* SOBRE */
  '<section class="section wrap" id="sobre">' + station(c.about.eyebrow) +
    '<div class="about-top">' +
      '<div><p class="eyebrow">06 — ' + c.about.eyebrow + '</p>' +
        '<div class="odometer" aria-label="' + c.about.founded + '">' + String(c.about.founded).split('').map(function (d) {
          var col = ''; for (var k = 0; k <= +d; k++) col += '<i>' + k + '</i>';
          return '<span class="d" aria-hidden="true"><span data-to="' + d + '">' + col + '</span></span>';
        }).join('') + '</div></div>' +
      '<h2 class="h-m split-words">' + W(c.about.title) + '</h2>' +
    '</div>' +
    '<div class="about-text reveal">' + c.about.text.map(function (t) { return '<p>' + t + '</p>'; }).join('') + '</div>' +
    '<div class="banner"><img src="' + M.team + '" alt="" loading="lazy"><div><h2 class="h-l split-words">' + W(c.about.bannerTitle) + '</h2><p class="reveal">' + c.about.bannerText + '</p></div></div>' +
    '<div class="mv">' +
      '<article class="reveal"><p class="eyebrow">01</p><h3>' + c.about.mission.title + '</h3><p>' + c.about.mission.text + '</p></article>' +
      '<article class="reveal"><p class="eyebrow">02</p><h3>' + c.about.vision.title + '</h3><p>' + c.about.vision.text + '</p></article>' +
    '</div>' +
    '<div style="margin-top:clamp(96px,16vh,200px)"><p class="eyebrow">' + c.values.eyebrow + '</p><h2 class="h-l split-words">' + W(c.values.title) + '</h2>' +
      '<ul class="values">' + c.values.items.map(function (v, i) {
        return '<li' + (i === 0 ? ' class="open"' : '') + '><button aria-expanded="' + (i === 0) + '" aria-controls="val-' + i + '"><span class="mono" style="color:var(--muted)">' + kit.pad(i + 1) + '</span><span class="t">' + v.title + '</span><span class="pm" aria-hidden="true"></span></button>' +
          '<div class="body" id="val-' + i + '"><div><p>' + v.text + '</p></div></div></li>';
      }).join('') + '</ul>' +
    '</div>' +
    '<div style="margin-top:clamp(96px,16vh,200px)"><p class="eyebrow">' + c.about.techTitle + '</p>' +
      '<ul class="tech">' + M.tech.map(function (t) { return '<li><span class="chip"><img src="' + t.src + '" alt="" loading="lazy"></span><span>' + esc(t.name) + '</span></li>'; }).join('') + '</ul>' +
    '</div>' +
  '</section>' +

  /* CLIENTES */
  '<section class="section" id="clientes">' + station(c.clients.eyebrow) +
    '<div class="wrap intro"><div><p class="eyebrow">07 — ' + c.clients.eyebrow + '</p><h2 class="h-l split-words">' + W(c.clients.title) + '</h2></div><p class="lead reveal">' + c.clients.text + '</p></div>' +
    '<div class="belt" data-speed="1"><div class="belt__row">' + beltItems(M.clients, 3) + '</div></div>' +
    '<div class="belt" data-speed="-1" style="margin-top:0;border-top:0"><div class="belt__row">' + beltItems(M.clients.slice().reverse(), 3) + '</div></div>' +
  '</section>' +

  /* EXPEDIÇÃO (CTA) */
  '<section class="ship wrap" id="expedicao" aria-label="' + esc(c.help.title) + '">' + station(c.help.title) +
    '<div class="printer">' +
      '<div class="printer__slot" aria-hidden="true"></div>' +
      '<div class="printer__paper"><div class="printer__label">' +
        '<div class="label__top"><span>DUETT SOFTWARE · NOVO HAMBURGO — RS</span><span>08/08</span></div>' +
        '<h2>' + c.help.title + '</h2><p>' + c.help.text + '</p>' +
        '<div class="ctas">' +
          '<a class="btn btn--dark" href="' + D.mailto(c.help.demoSubject) + '">' + c.help.demo + kit.arrow + '</a>' +
          '<a class="btn" href="' + L.whatsapp + '" target="_blank" rel="noopener">' + c.help.whatsapp + kit.arrow + '</a>' +
        '</div>' +
        '<div class="label__bars">' + kit.barcode('duett-ship', '#07012f') + '</div>' +
      '</div></div>' +
    '</div>' +
  '</section>' +

  /* CONTATO */
  '<section class="section wrap" id="contato">' +
    '<h2 class="h-xl split-words">' + W(c.contact.title) + '</h2>' +
    '<p class="lead reveal" style="margin-top:28px">' + c.contact.text + '</p>' +
    '<div class="contact-grid">' +
      '<article class="reveal"><h3>' + c.contact.sales.title + '</h3><p>' + c.contact.sales.text + '</p><a href="mailto:' + L.emailSales + '">' + L.emailSales + '</a><a href="' + L.phoneHref + '">' + L.phone + '</a></article>' +
      '<article class="reveal"><h3>' + c.contact.support.title + '</h3><p>' + c.contact.support.text + '</p><a href="mailto:' + L.emailSupport + '">' + L.emailSupport + '</a><a href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + ' ↗</a></article>' +
      '<article class="reveal"><h3>' + c.contact.location.title + '</h3><address>' + c.contact.location.lines.join('<br>') + '</address></article>' +
    '</div>' +
    '<div class="careers">' +
      '<div class="careers__img"><img src="' + M.team + '" alt="" loading="lazy" style="object-position:50% 30%"></div>' +
      '<div><p class="eyebrow">' + c.careers.eyebrow + '</p><h2 class="h-l split-words">' + W(c.careers.title) + '</h2>' +
        '<p class="reveal" style="margin-top:24px">' + c.careers.text + '</p><p class="reveal">' + c.careers.text2 + '</p>' +
        '<a class="btn" href="' + L.careers + '" target="_blank" rel="noopener">' + c.careers.cta + kit.arrow + '</a></div>' +
    '</div>' +
    '<div class="social">' +
      '<div><p class="eyebrow">' + c.social.eyebrow + '</p><h2 class="h-m split-words">' + W(c.social.title) + '</h2><p class="reveal" style="color:var(--muted);margin-top:14px">' + c.social.text + '</p></div>' +
      '<div class="social__links">' + L.social.map(function (s) { return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.name + '"><img src="' + s.icon + '" alt=""></a>'; }).join('') + '</div>' +
    '</div>' +
  '</section>' +
  '</main>' +

  /* FOOTER */
  '<footer class="footer wrap">' +
    '<div class="footer__grid">' +
      '<div><a href="#top" style="display:block;width:140px;margin-bottom:24px" aria-label="Duett Software">' + duettLogo() + '</a>' +
        '<div class="contact-lines"><a href="mailto:' + L.emailSales + '">' + L.emailSales + '</a><a href="mailto:' + L.emailSupport + '">' + L.emailSupport + '</a><a href="' + L.phoneHref + '">' + L.phone + '</a></div></div>' +
      '<div><h4>' + c.footer.sitemap + '</h4><ul><li><a href="#top">' + c.nav.home + '</a></li><li><a href="#servicos">' + c.nav.services + '</a></li><li><a href="#contato">' + c.nav.contact + '</a></li></ul></div>' +
      '<div><h4>' + c.footer.links + '</h4><ul><li><a href="' + L.terms + '">' + c.footer.terms + '</a></li><li><a href="' + L.privacy + '">' + c.footer.privacy + '</a></li><li><a href="' + L.support + '" target="_blank" rel="noopener">' + c.nav.support + '</a></li></ul></div>' +
      '<div><h4>' + c.footer.where + '</h4><address>' + c.footer.address.join('<br>') + '</address></div>' +
    '</div>' +
    '<div class="footer__giant" aria-hidden="true">' + duettLogo({ cls: 'giant' }) + '</div>' +
    '<div class="footer__bottom"><span>' + c.footer.copyright + '</span>' +
      '<div class="social__links" style="gap:6px">' + L.social.map(function (s) { return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.name + '" style="width:40px;height:40px"><img src="' + s.icon + '" alt="" style="width:16px;height:16px"></a>'; }).join('') + '</div>' +
      '<button class="to-top" type="button">' + c.ui.top + ' ↑</button></div>' +
  '</footer>';

  document.getElementById('app').innerHTML = html;

  function beltItems(list, times) {
    var one = list.map(function (l) { return '<img src="' + l.src + '" alt="' + esc(l.name) + '" loading="lazy">'; }).join('');
    var s = ''; for (var i = 0; i < times; i++) s += i ? one.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"') : one;
    return s;
  }

  /* --------------------------------------------------------------- interações */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  $('.lang').addEventListener('click', D.toggleLang);
  var nav = $('#nav'), menuBtn = $('.menu-btn');
  menuBtn.addEventListener('click', function () {
    var o = nav.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(o));
    menuBtn.textContent = o ? c.ui.close : c.ui.menu;
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.textContent = c.ui.menu; } });
  kit.tabs(document);
  $$('.values button').forEach(function (b) {
    b.addEventListener('click', function () {
      var li = b.parentNode, o = !li.classList.contains('open');
      li.classList.toggle('open', o); b.setAttribute('aria-expanded', String(o));
      setTimeout(function () { ScrollTrigger.refresh(); }, 600);
    });
  });

  var lenis = kit.smooth();
  $('.to-top').addEventListener('click', function () { lenis ? lenis.scrollTo(0, { duration: 2 }) : scrollTo({ top: 0, behavior: 'smooth' }); });

  /* HUD: estação atual */
  var stEls = $$('.station');
  $('.st-t').textContent = kit.pad(stEls.length);
  function setStation(i) {
    stEls.forEach(function (s, j) { s.classList.toggle('on', j <= i); });
    $('.st-n').textContent = kit.pad(i + 1);
    $('.st-l').textContent = i >= 0 ? stEls[i].dataset.station : '—';
    if (!RM) gsap.fromTo('.part .ping', { scale: .4, opacity: 1 }, { scale: 2.2, opacity: 0, duration: .9, ease: 'power2.out' });
  }

  /* Relógio JIT + barra de progresso + esteira */
  var clock = $('.clock'), bar = $('.hud-low .bar i'), rollers = $('.rail .rollers');
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: function (self) {
      var t = self.scroll() / 6, s = Math.floor(t / 60), m = Math.floor(s / 60);
      clock.textContent = 'T+ ' + kit.pad(m % 60) + ':' + kit.pad(s % 60) + ':' + kit.pad(Math.floor(t % 60));
      bar.style.transform = 'scaleX(' + self.progress.toFixed(4) + ')';
      rollers.style.strokeDashoffset = String(-self.scroll() * 0.6);
    }
  });

  if (RM) {
    gsap.set('.part', { opacity: 1 });
    $$('.odometer .d span').forEach(function (col) { gsap.set(col, { yPercent: -100 * (+col.dataset.to) / (+col.dataset.to + 1) }); });
    stEls.forEach(function (st, i) { ScrollTrigger.create({ trigger: st, start: 'top 50%', onEnter: function () { setStation(i); }, onLeaveBack: function () { setStation(i - 1); } }); });
    kit.restoreScroll(null);
    return;
  }

  /* ----------------------------------------------------------- coreografia */
  var mm = gsap.matchMedia();

  /* Intro: palavras do título sobem; símbolo se monta */
  var intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  intro.from('.hero__title .wi', { yPercent: 110, duration: 1.4, stagger: .06 }, .15)
       .from('.hero__photo', { clipPath: 'inset(0 0 100% 0)', duration: 1.6, ease: 'expo.inOut' }, 0)
       .from('.hero__photo img', { scale: 1.5, duration: 2.2 }, 0)
       .from('.hero__foot > *', { y: 30, opacity: 0, duration: 1.2, stagger: .1 }, .8)
       .from('.hud, .hud-low, .versions', { opacity: 0, duration: 1 }, 1)
       .from('.hero__mark .hook-a', { x: 90, y: -50, rotate: 18, opacity: 0, transformOrigin: '50% 50%', duration: 1.8 }, .4)
       .from('.hero__mark .hook-b', { x: -90, y: 50, rotate: -18, opacity: 0, transformOrigin: '50% 50%', duration: 1.8 }, .4);

  gsap.to('.hero__scan', { top: '100%', duration: 3.2, ease: 'none', repeat: -1, yoyo: true });

  /* Hero fixo: o símbolo encolhe, sobe, corre pelo topo até a esteira e desce nela,
     sem cruzar o título. As posições vêm do layout (offset*), não de transforms. */
  var mark = $('.hero__mark'), part = $('.part');
  function mc() { return { x: mark.offsetLeft + mark.offsetWidth / 2, y: mark.offsetTop + mark.offsetHeight / 2 }; }
  function pc() { var r = part.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
  var topLane = function () { return Math.min(110, innerHeight * .13) - mc().y; };
  var heroTl = gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=110%', scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true }
  });
  heroTl.to('.hero__title .ln:nth-child(odd)', { xPercent: -6, duration: 1 }, 0)
        .to('.hero__title .ln:nth-child(even)', { xPercent: 4, duration: 1 }, 0)
        .to('.hero__photo img', { scale: 1.32, duration: 1 }, 0)
        .to(mark, { rotate: -12, duration: .3, ease: 'none' }, 0)
        .to(mark, { y: topLane, rotate: 0, scale: function () { return 44 / mark.offsetWidth; }, duration: .2, ease: 'power2.inOut' }, .3)
        .to(mark, { x: function () { return pc().x - mc().x; }, duration: .25, ease: 'power1.inOut' }, .5)
        .to(mark, { y: function () { return pc().y - mc().y; }, scale: function () { return 22 / mark.offsetWidth; }, duration: .2, ease: 'power2.in' }, .75)
        .to(mark, { opacity: 0, duration: .03 }, .95)
        .to(part, { opacity: 1, duration: .03 }, .95)
        .to('.hero__title, .hero__foot', { opacity: .15, duration: .4 }, .6);

  /* Palavras de títulos */
  $$('.split-words').forEach(function (h) {
    gsap.from(h.querySelectorAll('.wi'), { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: .05, scrollTrigger: { trigger: h, start: 'top 85%' } });
  });
  $$('.reveal').forEach(function (el) {
    gsap.from(el, { y: 40, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });

  /* Frase que se acende palavra por palavra */
  $$('.scrub-words').forEach(function (p) {
    gsap.to(p.querySelectorAll('.wi'), { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: p, start: 'top 75%', end: 'bottom 40%', scrub: true } });
  });
  gsap.fromTo('.statement__img img', { yPercent: -10 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.statement', start: 'top bottom', end: 'bottom top', scrub: true } });

  mm.add('(min-width: 861px)', function () {
    /* Trilho horizontal dos serviços */
    var track = $('.hscroll__track');
    gsap.to(track, {
      x: function () { return -(track.scrollWidth - innerWidth); }, ease: 'none',
      scrollTrigger: { trigger: '.hscroll', start: 'center center', end: function () { return '+=' + (track.scrollWidth - innerWidth); }, scrub: 1, pin: true, invalidateOnRefresh: true, anticipatePin: 1 }
    });

    /* Projetos: palco fixo, fotos trocam por cortina, etiquetas sobem */
    var figs = $$('.projects__stage figure'), labels = $$('.label');
    var ptl = gsap.timeline({ scrollTrigger: { trigger: '.projects', start: 'top top', end: '+=260%', scrub: 1, pin: true, anticipatePin: 1 } });
    figs.forEach(function (f, i) {
      ptl.fromTo(f.querySelector('img'), { scale: 1.25 }, { scale: 1, duration: 1, ease: 'none' }, i)
         .fromTo(f.querySelector('.inset'), { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .4 }, i + .2);
      if (i) {
        ptl.to(f, { clipPath: 'inset(0% 0 0 0)', duration: .6, ease: 'power2.inOut' }, i - .1)
           .to(labels[i - 1], { yPercent: -8, scale: .92, opacity: 0, duration: .5 }, i - .1)
           .to(labels[i], { y: 0, yPercent: 0, duration: .6, ease: 'power3.out' }, i - .1);
      }
    });
    gsap.set(labels.slice(1), { yPercent: 110 });

    return function () { gsap.set(labels, { clearProps: 'all' }); };
  });

  /* Metodologia: a peça passa pelos checkpoints */
  $$('.step').forEach(function (s) {
    ScrollTrigger.create({ trigger: s, start: 'top 50%', onEnter: function () { s.classList.add('done'); }, onLeaveBack: function () { s.classList.remove('done'); } });
  });

  /* Odômetro 0000 → 2018 */
  $$('.odometer .d span').forEach(function (col, i) {
    var to = +col.dataset.to;
    gsap.fromTo(col, { yPercent: 0 }, { yPercent: -100 * to / (to + 1), duration: 1.3 + i * .15, ease: 'expo.inOut', scrollTrigger: { trigger: '.odometer', start: 'top 80%' } });
  });

  gsap.fromTo('.banner img', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.banner', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('.careers__img img', { yPercent: -10 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.careers', start: 'top bottom', end: 'bottom top', scrub: true } });

  /* Esteiras de logos reagem à velocidade da rolagem */
  $$('.belt').forEach(function (b) {
    var row = b.querySelector('.belt__row'), dir = +b.dataset.speed || 1, x = 0, boost = 0;
    ScrollTrigger.create({ trigger: b, start: 'top bottom', end: 'bottom top', onUpdate: function (s) { boost = Math.min(Math.abs(s.getVelocity()) / 220, 14); } });
    gsap.ticker.add(function () {
      var w = row.scrollWidth / 3;
      x -= (0.5 + boost) * dir; boost *= 0.92;
      if (x <= -w) x += w; if (x > 0) x -= w;
      row.style.transform = 'translate3d(' + x + 'px,0,0)';
    });
  });

  /* Clímax: fundo vira menta, etiqueta sai da impressora */
  ScrollTrigger.create({
    trigger: '.ship', start: 'top 55%', end: 'bottom 30%',
    onToggle: function (s) { document.body.classList.toggle('is-shipping', s.isActive); }
  });
  gsap.to('.printer__label', { yPercent: 0, y: 0, ease: 'none', scrollTrigger: { trigger: '.ship', start: 'top 70%', end: 'center 50%', scrub: 1 } });
  gsap.set('.printer__label', { yPercent: -100 });
  gsap.to('.part', { opacity: 0, scrollTrigger: { trigger: '.ship', start: 'center 50%', end: 'center 40%', scrub: true } });

  /* Footer: símbolo gigante se encaixa */
  gsap.from('.footer__giant .hook-a', { x: 60, y: -30, rotate: 12, transformOrigin: '50% 50%', scrollTrigger: { trigger: '.footer__giant', start: 'top bottom', end: 'bottom bottom', scrub: 1 } });
  gsap.from('.footer__giant .hook-b', { x: -60, y: 30, rotate: -12, transformOrigin: '50% 50%', scrollTrigger: { trigger: '.footer__giant', start: 'top bottom', end: 'bottom bottom', scrub: 1 } });

  /* Peça gira levemente com a velocidade */
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: function (s) { gsap.to('.part .box', { rotate: 45 + gsap.utils.clamp(-40, 40, s.getVelocity() / 40), duration: .4, overwrite: true }); } });

  /* Estações criadas por último: dependem do espaço dos pins acima */
  stEls.forEach(function (s, i) {
    ScrollTrigger.create({ trigger: s, start: 'top 50%', onEnter: function () { setStation(i); }, onLeaveBack: function () { setStation(i - 1); } });
  });
  ScrollTrigger.sort();

  addEventListener('load', function () { ScrollTrigger.refresh(); kit.restoreScroll(lenis); });
})();
