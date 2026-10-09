/*
 * Duett — propaganda comercial (~42 s) em uma única linha do tempo GSAP.
 * ?render=1 deixa a timeline pausada e expõe window.__seek(t) / window.__duration
 * para o render.mjs capturar quadro a quadro.
 */
(function () {
  var RENDER = /[?&]render\b/.test(location.search);
  if (RENDER) document.documentElement.classList.add('render');

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- palco escalado ---------- */
  var stage = $('#stage');
  function fit() {
    var s = RENDER ? 1 : Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.transform = 'scale(' + s + ')';
  }
  addEventListener('resize', fit); fit();

  /* ---------- conteúdo montado em JS ---------- */
  $('#brandLogo').innerHTML = duettLogo({ mark: '#06ECB7', word: '#FFFFFF' });
  $('#ctaLogo').innerHTML = duettLogo({ mark: '#06ECB7', word: '#FFFFFF' });

  // Detecções sobre a foto aérea (coordenadas do palco 1920×1080).
  var dets = [
    { x: 1042, y: 70, w: 234, h: 336, t: 'CX-0482 · 98%' },
    { x: 1780, y: 70, w: 160, h: 222, t: 'PALETE · 97%', r: true },
    { x: 1048, y: 500, w: 300, h: 120, t: 'PALETEIRA · EM MOVIMENTO' },
    { x: 1080, y: 800, w: 400, h: 260, t: 'OPERADOR · EPI OK' },
    { x: 772, y: 70, w: 150, h: 100, t: 'AVARIA · CX-0391', warn: true }
  ];
  $('#dets').innerHTML = dets.map(function (d) {
    return '<div class="det' + (d.warn ? ' warn' : '') + (d.r ? ' r' : '') + '" style="left:' + d.x + 'px;top:' + d.y + 'px;width:' + d.w + 'px;height:' + d.h + 'px"><span>' + d.t + '</span></div>';
  }).join('');

  var clients = ['logo-bosch-color', 'natura', 'ceva-logistics', 'valeo', 'grendene', 'mercado-pago', 'libracom', 'taginfo'];
  var logoHTML = clients.map(function (n) { return '<span><img src="../assets/img/logos/' + n + '.png" alt=""></span>'; }).join('');
  $('#logos').innerHTML = logoHTML + logoHTML;

  /* ---------- helpers ---------- */
  function fmt(v, dec) {
    return v.toLocaleString('pt-BR', { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 });
  }
  // Contador reversível (funciona ao arrastar a timeline para trás).
  function count(tl, el, from, to, dur, at, dec) {
    var o = { v: from };
    el.textContent = fmt(from, dec);
    tl.to(o, { v: to, duration: dur, ease: 'power2.out', onUpdate: function () { el.textContent = fmt(o.v, dec); } }, at);
  }
  function show(tl, sel, at) { tl.set(sel, { visibility: 'visible' }, at); }
  function hide(tl, sel, at) { tl.set(sel, { visibility: 'hidden' }, at); }

  var tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

  /* ---------- 1 · Gancho (0 – 5,5 s) ---------- */
  show(tl, '.s-hook', 0);
  tl.from('.s-hook .grid-bg', { scale: 1.15, opacity: 0, duration: 2.5, ease: 'power2.out' }, 0)
    .from('.s-hook .kicker', { opacity: 0, y: 20, duration: .6 }, .2)
    .from('.hook-title .w', { yPercent: 110, duration: .8, stagger: .09 }, .35)
    .from('.mismatch', { opacity: 0, y: 40, duration: .7 }, 1.6);
  count(tl, $('.mm-real'), 1248, 1193, 1.6, 2.4);
  count(tl, $('.mm-gap'), 0, 55, 1.6, 2.4);
  tl.to('.mm-real', { color: '#ff4d6d', duration: .3 }, 2.6)
    .to('.mismatch', { x: 8, duration: .05, repeat: 7, yoyo: true, ease: 'none' }, 4.0)
    .to('.s-hook', { opacity: 0, duration: .5, ease: 'power2.in' }, 5.0);
  hide(tl, '.s-hook', 5.5);

  /* ---------- 2 · Problema (5,5 – 9,5 s) ---------- */
  show(tl, '.s-pain', 5.5);
  tl.from('.pain-list li', { opacity: 0, x: -60, duration: .6, stagger: .45 }, 5.6)
    .to('.pain-list i', { scaleX: 1, duration: .35, ease: 'power2.inOut', stagger: .45 }, 6.0)
    .to('.pain-list li span', { opacity: .35, duration: .3, stagger: .45 }, 6.2)
    .from('.pain-q', { opacity: 0, y: 30, duration: .7 }, 7.7);
  hide(tl, '.s-pain', 9.9);

  /* ---------- 3 · Marca (9,5 – 13 s) ---------- */
  show(tl, '.s-brand', 9.5);
  tl.from('.s-brand .wipe', { scaleX: 0, duration: .5, ease: 'expo.inOut' }, 9.5)
    .from('.brand-logo .hook-a', { x: 60, y: -50, rotation: 25, opacity: 0, svgOrigin: '30 22', duration: .9, ease: 'back.out(1.6)' }, 9.9)
    .from('.brand-logo .hook-b', { x: -60, y: 50, rotation: -25, opacity: 0, svgOrigin: '30 22', duration: .9, ease: 'back.out(1.6)' }, 9.9)
    .from('.brand-logo .word', { opacity: 0, x: -30, duration: .8 }, 10.5)
    .from('.brand-tag', { opacity: 0, y: 24, duration: .6 }, 10.9)
    .to('.s-brand', { scale: 1.12, opacity: 0, duration: .6, ease: 'power2.in' }, 12.5);
  hide(tl, '.s-brand', 13.1);

  /* ---------- 4 · Inventário por drone (13 – 22 s) ---------- */
  show(tl, '.s-drone', 12.9);
  tl.fromTo('.s-drone .photo', { scale: 1.25 }, { scale: 1, duration: 9.2, ease: 'sine.out' }, 12.9)
    .from('.s-drone', { opacity: 0, duration: .4 }, 12.9)
    .from('.hud .c', { scale: 1.6, opacity: 0, duration: .6, stagger: .06 }, 13.2)
    .from('.hud-top', { opacity: 0, duration: .4 }, 13.4)
    .to('.rec', { opacity: .2, duration: .5, repeat: 15, yoyo: true, ease: 'none' }, 13.4)
    .fromTo('.scanline', { y: -180 }, { y: 1100, duration: 2.6, ease: 'none', repeat: 2 }, 13.4)
    .from('.det', { scale: 1.4, opacity: 0, duration: .45, ease: 'back.out(2)', stagger: .55 }, 14.0)
    .from('.det span', { opacity: 0, x: -10, duration: .3, stagger: .55 }, 14.2)
    .from('.drone-copy .eyebrow', { opacity: 0, y: 20, duration: .5 }, 13.6)
    .from('.drone-copy h2', { opacity: 0, y: 40, duration: .8 }, 13.8)
    .from('.stats .stat', { opacity: 0, y: 30, duration: .6, stagger: .15 }, 15.0)
    .from('.occ', { opacity: 0, y: 30, duration: .6 }, 16.4)
    .to('.occ-bar i', { scaleX: .87, duration: 2.4, ease: 'power2.out' }, 16.7);
  var nums = $$('.s-drone .num');
  count(tl, nums[0], 0, 1248, 3.4, 15.1);
  count(tl, nums[1], 0, 99.7, 3.0, 15.3, 1);
  count(tl, nums[2], 0, 87, 2.4, 16.7);
  tl.to('.s-drone', { clipPath: 'inset(0 0 0 100%)', duration: .7, ease: 'expo.inOut' }, 21.6);
  hide(tl, '.s-drone', 22.3);

  /* ---------- 5 · WMS (22 – 31 s) ---------- */
  show(tl, '.s-wms', 21.6);
  tl.from('.s-wms .eyebrow', { opacity: 0, y: 20, duration: .5 }, 22.1)
    .from('.wms-title', { opacity: 0, y: 40, duration: .8 }, 22.2)
    .from('.node', { opacity: 0, y: 50, duration: .6, stagger: .12 }, 22.6)
    .from('.crate', { opacity: 0, y: -60, duration: .6, ease: 'bounce.out' }, 23.4);
  var stepT = 24.2, stepD = 1.25;
  $$('.node').forEach(function (n, i) {
    var at = stepT + i * stepD;
    if (i > 0) {
      tl.to('.crate', { left: (i * 25) + '%', duration: stepD * .7, ease: 'power2.inOut' }, at - stepD * .7)
        .to('.flow-line .prog', { strokeDashoffset: 1600 - i * 400, duration: stepD * .7, ease: 'power2.inOut' }, at - stepD * .7);
    }
    tl.to(n.querySelector('.dot'), { backgroundColor: '#4146ff', borderColor: '#4146ff', scale: 1.08, duration: .3 }, at)
      .to(n.querySelector('.dot'), { scale: 1, duration: .4, ease: 'back.out(3)' }, at + .3)
      .to(n.querySelector('svg'), { stroke: '#ffffff', duration: .3 }, at)
      .from(n.querySelector('p'), { opacity: 0, y: 10, duration: .4 }, at + .1);
  });
  tl.to('.crate', { x: 260, opacity: 0, duration: .6, ease: 'power2.in' }, stepT + 4 * stepD + .5)
    .from('.wms-foot span', { opacity: 0, y: 20, duration: .5, stagger: .12 }, 28.2);
  count(tl, $('.wms-foot .num'), 0, 342, 1.8, 28.3);
  tl.to('.s-wms', { yPercent: -100, duration: .8, ease: 'expo.inOut' }, 30.6);
  hide(tl, '.s-wms', 31.4);

  /* ---------- 6 · Prova (31 – 36 s) ---------- */
  show(tl, '.s-proof', 30.6);
  tl.from('.proof-title', { opacity: 0, y: 40, duration: .8 }, 31.2)
    .from('.card', { opacity: 0, y: 120, rotationY: function (i) { return (i - 1) * -28; }, rotationX: 18, duration: 1.1, stagger: .15 }, 31.4)
    .to('.card', { y: function (i) { return i === 1 ? -14 : 10; }, duration: 3, ease: 'sine.inOut' }, 32.6)
    .from('.logos', { opacity: 0, duration: .6 }, 32.2)
    .fromTo('.logos-track', { x: 0 }, { x: -(8 * 280), duration: 9, ease: 'none' }, 31.4)
    .to('.s-proof', { opacity: 0, duration: .6, ease: 'power2.in' }, 35.6);
  hide(tl, '.s-proof', 36.2);

  /* ---------- 7 · CTA (36 – 42 s) ---------- */
  show(tl, '.s-cta', 35.9);
  tl.from('.s-cta', { opacity: 0, duration: .5 }, 35.9)
    .from('.aurora i', { scale: .4, duration: 6, ease: 'sine.out', stagger: .2 }, 35.9)
    .to('.aurora i:nth-child(1)', { x: 300, y: 120, duration: 6, ease: 'sine.inOut' }, 35.9)
    .to('.aurora i:nth-child(2)', { x: -260, y: -100, duration: 6, ease: 'sine.inOut' }, 35.9)
    .from('.cta-logo .hook-a', { x: 40, y: -30, opacity: 0, duration: .7, ease: 'back.out(1.6)' }, 36.2)
    .from('.cta-logo .hook-b', { x: -40, y: 30, opacity: 0, duration: .7, ease: 'back.out(1.6)' }, 36.2)
    .from('.cta-logo .word', { opacity: 0, duration: .6 }, 36.6)
    .from('.cta-title', { opacity: 0, y: 40, duration: .8 }, 36.8)
    .from('.cta-btn', { opacity: 0, scale: .8, duration: .6, ease: 'back.out(2)' }, 37.6)
    .to('.cta-btn', { scale: 1.05, duration: .5, repeat: 3, yoyo: true, ease: 'sine.inOut' }, 38.4)
    .from('.cta-contact', { opacity: 0, y: 20, duration: .6 }, 38.0)
    .to({}, { duration: .1 }, 41.9);

  /* ---------- reprodução ---------- */
  var DUR = tl.duration();
  window.__duration = DUR;
  window.__seek = function (t) { tl.time(Math.min(t, DUR), false); };

  if (RENDER) { tl.time(0); return; }

  var play = $('#play'), scrub = $('#scrub'), time = $('#time'), dragging = false;
  tl.eventCallback('onUpdate', function () {
    if (!dragging) scrub.value = Math.round(tl.progress() * 1000);
    time.textContent = tl.time().toFixed(1).replace('.', ',') + ' s';
  });
  tl.eventCallback('onComplete', function () { play.textContent = '▶'; });
  function toggle() {
    if (tl.progress() === 1) tl.restart();
    else tl.paused(!tl.paused());
    play.textContent = tl.paused() ? '▶' : '❚❚';
  }
  play.addEventListener('click', toggle);
  $('#restart').addEventListener('click', function () { tl.restart(); play.textContent = '❚❚'; });
  scrub.addEventListener('input', function () { dragging = true; tl.pause(); tl.progress(scrub.value / 1000); play.textContent = '▶'; dragging = false; });
  addEventListener('keydown', function (e) { if (e.code === 'Space') { e.preventDefault(); toggle(); } });

  tl.play(0);
})();
