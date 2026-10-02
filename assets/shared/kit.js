/* Utilitários compartilhados pelas três versões. */
(function () {
  var D = window.DUETT;

  var VERSIONS = [
    { id: 'jit', label: 'A', name: 'Just in Time' },
    { id: 'duet', label: 'B', name: D.lang === 'en' ? 'Two voices' : 'Duas vozes' },
    { id: 'blueprint', label: 'C', name: 'Blueprint' }
  ];

  var kit = {
    /* Rolagem suave (Lenis) sincronizada com o ScrollTrigger. */
    smooth: function () {
      if (D.reducedMotion || !window.Lenis) return null;
      var lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
      document.addEventListener('click', function (e) {
        var a = e.target.closest('a[href^="#"]');
        if (!a) return;
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el, { offset: 0, duration: 1.6 });
      });
      return lenis;
    },

    /* Código de barras decorativo e determinístico a partir de um texto. */
    barcode: function (seed, color) {
      var h = 2166136261, bars = '', x = 0;
      for (var i = 0; i < 64; i++) {
        h ^= (seed.charCodeAt(i % seed.length) + i * 31);
        h = Math.imul(h, 16777619) >>> 0;
        var w = 1 + (h % 4), gap = 1 + ((h >> 3) % 3);
        bars += '<rect x="' + x + '" y="0" width="' + w + '" height="100" />';
        x += w + gap;
      }
      return '<svg viewBox="0 0 ' + x + ' 100" preserveAspectRatio="none" aria-hidden="true" fill="' + (color || 'currentColor') + '">' + bars + '</svg>';
    },

    /* Abas acessíveis (setas ← →). */
    tabs: function (root) {
      root.querySelectorAll('.tabs').forEach(function (t) {
        var tabs = [].slice.call(t.querySelectorAll('[role=tab]'));
        function select(i) {
          tabs.forEach(function (b, j) {
            b.setAttribute('aria-selected', String(i === j));
            b.tabIndex = i === j ? 0 : -1;
            document.getElementById(b.getAttribute('aria-controls')).hidden = i !== j;
          });
        }
        tabs.forEach(function (b, i) {
          b.addEventListener('click', function () { select(i); });
          b.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
              var n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
              select(n); tabs[n].focus();
            }
          });
        });
      });
    },

    /* Seletor A/B/C entre as versões. */
    versions: function (current) {
      var q = '?lang=' + D.lang;
      return '<nav class="versions" aria-label="' + D.c.ui.versions + '">' + VERSIONS.map(function (v) {
        return '<a href="../' + v.id + '/' + q + '" title="' + v.name + '"' + (v.id === current ? ' aria-current="page"' : '') + '>' + v.label + '</a>';
      }).join('') + '</nav>';
    },

    arrow: '<svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',

    /* Restaura a posição depois de trocar idioma. */
    restoreScroll: function (lenis) {
      var r = D.takeScroll();
      if (r === null || isNaN(r)) return;
      requestAnimationFrame(function () {
        ScrollTrigger.refresh();
        var y = r * (document.documentElement.scrollHeight - innerHeight);
        if (lenis) lenis.scrollTo(y, { immediate: true }); else scrollTo(0, y);
      });
    },

    pad: function (n) { return (n < 10 ? '0' : '') + n; }
  };

  window.kit = kit;
})();
