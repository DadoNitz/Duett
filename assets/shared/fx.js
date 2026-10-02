/*
 * Efeitos das versões D–G, recriados em JavaScript puro a partir de componentes do
 * React Bits (reactbits.dev): Aurora, BlurText, CountUp, LogoLoop, SpotlightCard /
 * MagicBento, TiltedCard, Magnet, StarBorder (CSS), ClickSpark, Squares, Particles/Threads,
 * DecryptedText, SplitText, CircularText, CardSwap, Stepper e ScrollVelocity.
 * Nenhum deles prende a rolagem; todos respeitam prefers-reduced-motion.
 */
(function () {
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var fx = {};

  function hex(c) { var n = parseInt(c.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; }

  /* ---------- Aurora (WebGL) ---------- */
  fx.aurora = function (canvas, opts) {
    opts = opts || {};
    var gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) return;
    var vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    var fs = [
      'precision highp float;uniform float t;uniform vec2 r;uniform vec3 c0;uniform vec3 c1;uniform vec3 c2;uniform float amp;uniform float blend;',
      'vec3 perm(vec3 x){return mod(((x*34.)+1.)*x,289.);}',
      'float sn(vec2 v){const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);',
      'vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);',
      'vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod(i,289.);',
      'vec3 p=perm(perm(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));',
      'vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;',
      'vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;',
      'm*=1.79284291400159-.85373472095314*(a0*a0+h*h);',
      'vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}',
      'void main(){vec2 uv=gl_FragCoord.xy/r;',
      'vec3 ramp=uv.x<.5?mix(c0,c1,uv.x*2.):mix(c1,c2,(uv.x-.5)*2.);',
      'float h=sn(vec2(uv.x*2.+t*.1,t*.25))*.5*amp;h=exp(h);h=(uv.y*2.-h+.2);',
      'float it=.6*h;float mid=.2;float al=smoothstep(mid-blend*.5,mid+blend*.5,it);',
      'vec3 col=it*ramp;gl_FragColor=vec4(col*al,al);}'
    ].join('');
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var u = function (n) { return gl.getUniformLocation(pr, n); };
    var stops = (opts.colors || ['#3699ff', '#06ecb7', '#4146ff']).map(hex);
    gl.uniform3fv(u('c0'), stops[0]); gl.uniform3fv(u('c1'), stops[1]); gl.uniform3fv(u('c2'), stops[2]);
    gl.uniform1f(u('amp'), opts.amplitude || 1.0); gl.uniform1f(u('blend'), opts.blend || .5);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    var ut = u('t'), ur = u('r'), visible = true, t0 = performance.now();
    function size() {
      var d = Math.min(devicePixelRatio || 1, 1.5), w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = Math.max(1, w * d); canvas.height = Math.max(1, h * d);
      gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(ur, canvas.width, canvas.height);
    }
    size(); addEventListener('resize', size);
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(canvas);
    function frame(now) {
      if (visible) { gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.uniform1f(ut, (now - t0) / 1000 * (opts.speed || .6)); gl.drawArrays(gl.TRIANGLES, 0, 3); }
      if (!RM) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  };

  /* ---------- BlurText: palavras surgem do desfoque ---------- */
  fx.blurText = function (el, delay) {
    if (RM) return;
    var words = [].slice.call(el.querySelectorAll('.bw'));
    words.forEach(function (w, i) {
      w.animate([
        { filter: 'blur(12px)', opacity: 0, transform: 'translateY(-24px)' },
        { filter: 'blur(4px)', opacity: .6, transform: 'translateY(4px)', offset: .6 },
        { filter: 'blur(0)', opacity: 1, transform: 'none' }
      ], { duration: 900, delay: (delay || 0) + i * 70, easing: 'cubic-bezier(.2,.7,.1,1)', fill: 'both' });
    });
  };
  /* separa o HTML em palavras preservando <em> */
  fx.words = function (html) {
    var t = document.createElement('div'); t.innerHTML = html; var out = '';
    t.childNodes.forEach(function (n) {
      var em = n.nodeType === 1;
      n.textContent.split(/(\s+)/).forEach(function (w) {
        if (!w) return; if (/^\s+$/.test(w)) { out += ' '; return; }
        var s = '<span class="bw">' + w.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>';
        out += em ? '<em class="grad">' + s + '</em>' : s;
      });
    });
    return out;
  };

  /* ---------- CountUp ---------- */
  fx.countUp = function (el) {
    var to = +el.dataset.to, from = +(el.dataset.from || 0), dur = +(el.dataset.dur || 1600);
    if (RM) { el.textContent = to; return; }
    el.textContent = from;
    new IntersectionObserver(function (e, o) {
      if (!e[0].isIntersecting) return; o.disconnect();
      var s = performance.now();
      (function step(n) {
        var k = Math.min(1, (n - s) / dur), v = 1 - Math.pow(1 - k, 4);
        el.textContent = Math.round(from + (to - from) * v);
        if (k < 1) requestAnimationFrame(step);
      })(s);
    }, { threshold: .6 }).observe(el);
  };

  /* ---------- LogoLoop: esteira infinita, pausa no hover ---------- */
  fx.logoLoop = function (root) {
    var track = root.querySelector('.loop__track');
    track.innerHTML += track.innerHTML.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"');
  };

  /* ---------- Spotlight / MagicBento: luz e borda seguem o cursor ---------- */
  fx.spotlight = function (sel) {
    if (!FINE) return;
    document.addEventListener('pointermove', function (e) {
      document.querySelectorAll(sel).forEach(function (c) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        c.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    }, { passive: true });
  };

  /* ---------- TiltedCard ---------- */
  fx.tilt = function (sel, max) {
    if (!FINE || RM) return;
    document.querySelectorAll(sel).forEach(function (c) {
      var inner = c.querySelector('.tilt__in') || c;
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        inner.style.transform = 'perspective(900px) rotateX(' + (-y * (max || 10)) + 'deg) rotateY(' + (x * (max || 10)) + 'deg) scale(1.02)';
        inner.style.setProperty('--gx', (x + .5) * 100 + '%'); inner.style.setProperty('--gy', (y + .5) * 100 + '%');
      });
      c.addEventListener('pointerleave', function () { inner.style.transform = ''; });
    });
  };

  /* ---------- Magnet ---------- */
  fx.magnet = function (sel, pull) {
    if (!FINE || RM) return;
    document.querySelectorAll(sel).forEach(function (b) {
      var area = 60;
      document.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, dx = e.clientX - cx, dy = e.clientY - cy;
        var near = Math.abs(dx) < r.width / 2 + area && Math.abs(dy) < r.height / 2 + area;
        b.style.transform = near ? 'translate(' + dx / (pull || 6) + 'px,' + dy / (pull || 6) + 'px)' : '';
      }, { passive: true });
    });
  };

  /* ---------- ClickSpark ---------- */
  fx.clickSpark = function (color) {
    if (RM) return;
    var cv = document.createElement('canvas'), ctx = cv.getContext('2d'), sparks = [], run = false;
    cv.setAttribute('aria-hidden', 'true');
    cv.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:90';
    document.body.appendChild(cv);
    function size() { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); }
    size(); addEventListener('resize', size);
    function draw(now) {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      sparks = sparks.filter(function (s) {
        var k = (now - s.t) / 450; if (k >= 1) return false;
        var e = k * (2 - k), d = e * 22, len = 10 * (1 - e);
        ctx.strokeStyle = s.c; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.beginPath();
        ctx.moveTo(s.x + d * Math.cos(s.a), s.y + d * Math.sin(s.a));
        ctx.lineTo(s.x + (d + len) * Math.cos(s.a), s.y + (d + len) * Math.sin(s.a)); ctx.stroke();
        return true;
      });
      if (sparks.length) requestAnimationFrame(draw); else run = false;
    }
    document.addEventListener('click', function (e) {
      var now = performance.now(), c = e.target.closest('.hero, .cta, .footer') ? '#06ecb7' : (color || '#4146ff');
      for (var i = 0; i < 8; i++) sparks.push({ x: e.clientX, y: e.clientY, a: i * Math.PI / 4, t: now, c: c });
      if (!run) { run = true; requestAnimationFrame(draw); }
    });
  };


  /* ---------- Squares: grade animada (diagonal) com célula sob o cursor ---------- */
  fx.squares = function (canvas, opts) {
    opts = opts || {};
    var ctx = canvas.getContext('2d'), size = opts.size || 44, line = opts.line || 'rgba(65,70,255,.12)',
      fill = opts.fill || 'rgba(65,70,255,.08)', speed = RM ? 0 : (opts.speed || .25), off = 0, hover = null, dpr = Math.min(devicePixelRatio || 1, 2), visible = true;
    function resize() { canvas.width = canvas.clientWidth * dpr; canvas.height = canvas.clientHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    resize(); addEventListener('resize', resize);
    if (FINE) {
      canvas.parentElement.addEventListener('pointermove', function (e) {
        var r = canvas.getBoundingClientRect();
        hover = [Math.floor((e.clientX - r.left + off) / size), Math.floor((e.clientY - r.top + off) / size)];
      });
      canvas.parentElement.addEventListener('pointerleave', function () { hover = null; });
    }
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(canvas);
    (function draw() {
      if (visible) {
        var w = canvas.clientWidth, h = canvas.clientHeight; ctx.clearRect(0, 0, w, h);
        off = (off + speed) % size;
        ctx.strokeStyle = line; ctx.lineWidth = 1;
        for (var x = -off; x < w + size; x += size) for (var y = -off; y < h + size; y += size) {
          var cx = Math.floor((x + off) / size), cy = Math.floor((y + off) / size);
          if (hover && hover[0] === cx && hover[1] === cy) { ctx.fillStyle = fill; ctx.fillRect(x, y, size, size); }
          ctx.strokeRect(x + .5, y + .5, size, size);
        }
        if (opts.fade !== false) {
          var g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.hypot(w, h) / 2);
          var fc = opts.fadeColor || '#ffffff'; g.addColorStop(0, fc + '00'); g.addColorStop(.55, fc + '00'); g.addColorStop(1, fc);
          ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
        }
      }
      if (speed || hover) requestAnimationFrame(draw); else setTimeout(function () { requestAnimationFrame(draw); }, 120);
    })();
  };

  /* ---------- Particles / Threads: rede de pontos que reage ao cursor ---------- */
  fx.particles = function (canvas, opts) {
    opts = opts || {};
    var ctx = canvas.getContext('2d'), dpr = Math.min(devicePixelRatio || 1, 2), pts = [], mouse = null, visible = true;
    var colors = opts.colors || ['#4146ff', '#3699ff', '#06ecb7'];
    function resize() {
      canvas.width = canvas.clientWidth * dpr; canvas.height = canvas.clientHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(canvas.clientWidth * canvas.clientHeight / (opts.density || 14000));
      pts = []; for (var i = 0; i < n; i++) pts.push({ x: Math.random() * canvas.clientWidth, y: Math.random() * canvas.clientHeight, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, c: colors[i % colors.length], r: 1 + Math.random() * 1.6 });
    }
    resize(); addEventListener('resize', resize);
    if (FINE) canvas.parentElement.addEventListener('pointermove', function (e) { var r = canvas.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; });
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(canvas);
    var link = opts.link || 120;
    (function draw() {
      if (visible) {
        var w = canvas.clientWidth, h = canvas.clientHeight; ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < pts.length; i++) {
          var p = pts[i];
          if (!RM) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; }
          if (mouse) { var dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy); if (d < 140) { p.x += dx / d * .8; p.y += dy / d * .8; } }
          for (var j = i + 1; j < pts.length; j++) {
            var q = pts[j], dd = Math.hypot(p.x - q.x, p.y - q.y);
            if (dd < link) { ctx.strokeStyle = 'rgba(120,150,255,' + (1 - dd / link) * .28 + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
          }
          ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
        }
      }
      if (!RM) requestAnimationFrame(draw);
    })();
  };

  /* ---------- DecryptedText: letras embaralhadas que se revelam ---------- */
  fx.decrypt = function (el, delay) {
    if (RM) return;
    var nodes = [].slice.call(el.querySelectorAll('.dc'));
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/';
    nodes.forEach(function (n) {
      var final = n.textContent, start = performance.now() + (delay || 0) + Math.random() * 500, dur = 700 + Math.random() * 500;
      n.style.minWidth = n.offsetWidth + 'px';
      (function tick(t) {
        var k = (t - start) / dur;
        if (k < 0) { n.textContent = final.replace(/\S/g, function () { return chars[Math.random() * chars.length | 0]; }); requestAnimationFrame(tick); return; }
        if (k >= 1) { n.textContent = final; n.style.minWidth = ''; return; }
        var keep = Math.floor(final.length * k);
        n.textContent = final.slice(0, keep) + final.slice(keep).replace(/\S/g, function () { return chars[Math.random() * chars.length | 0]; });
        requestAnimationFrame(tick);
      })(performance.now());
    });
  };
  fx.decryptWords = function (html) { return fx.words(html).replace(/class="bw"/g, 'class="bw dc"'); };

  /* ---------- SplitText: letras sobem uma a uma ---------- */
  fx.splitLetters = function (html) {
    var t = document.createElement('div'); t.innerHTML = html; var out = '';
    t.childNodes.forEach(function (n) {
      var em = n.nodeType === 1, chunk = '';
      n.textContent.split(/(\s+)/).forEach(function (w) {
        if (!w) return; if (/^\s+$/.test(w)) { chunk += ' '; return; }
        chunk += '<span class="sw">' + w.split('').map(function (ch) { return '<span class="sl">' + ch.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</span>'; }).join('') + '</span>';
      });
      out += em ? '<em>' + chunk + '</em>' : chunk;
    });
    return out;
  };
  fx.splitIn = function (el, delay) {
    if (RM) return;
    el.querySelectorAll('.sl').forEach(function (l, i) {
      l.animate([{ opacity: 0, transform: 'translateY(60%) rotate(4deg)' }, { opacity: 1, transform: 'none' }], { duration: 700, delay: (delay || 0) + i * 22, easing: 'cubic-bezier(.2,.7,.1,1)', fill: 'both' });
    });
  };

  /* ---------- CircularText: texto em círculo girando ---------- */
  fx.circularText = function (text, cls) {
    var id = 'ct' + Math.random().toString(36).slice(2, 7);
    return '<svg class="circ ' + (cls || '') + '" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="' + id + '" d="M100 100m-80 0a80 80 0 1 1 160 0a80 80 0 1 1-160 0"/></defs><text><textPath href="#' + id + '" textLength="500">' + text + '</textPath></text></svg>';
  };

  /* ---------- CardSwap: pilha de cards que troca sozinha ---------- */
  fx.cardSwap = function (root, every) {
    var cards = [].slice.call(root.querySelectorAll('.swap__card')), order = cards.map(function (_, i) { return i; }), timer;
    function layout() {
      order.forEach(function (ci, pos) {
        var c = cards[ci];
        c.style.zIndex = String(cards.length - pos);
        c.style.transform = 'translate(' + (pos * 34) + 'px,' + (-pos * 30) + 'px) scale(' + (1 - pos * .06) + ')';
        c.style.opacity = pos > 2 ? '0' : String(1 - pos * .18);
        c.setAttribute('aria-hidden', pos ? 'true' : 'false');
      });
      var dots = root.parentElement.querySelectorAll('.swap__dot');
      dots.forEach(function (d, i) { d.setAttribute('aria-current', String(i === order[0])); });
    }
    function next() { order.push(order.shift()); layout(); }
    function go(i) { while (order[0] !== i) order.push(order.shift()); layout(); restart(); }
    function restart() { clearInterval(timer); if (!RM) timer = setInterval(next, every || 4200); }
    layout(); restart();
    root.addEventListener('pointerenter', function () { clearInterval(timer); });
    root.addEventListener('pointerleave', restart);
    root.parentElement.querySelectorAll('.swap__dot').forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });
    root.addEventListener('click', next);
  };

  /* ---------- Stepper: etapas navegáveis ---------- */
  fx.stepper = function (root) {
    var steps = [].slice.call(root.querySelectorAll('.stp__panel')), btns = [].slice.call(root.querySelectorAll('.stp__btn')), i = 0;
    var bar = root.querySelector('.stp__bar i'), prev = root.querySelector('.stp__prev'), next = root.querySelector('.stp__next');
    function show(n) {
      i = Math.max(0, Math.min(steps.length - 1, n));
      steps.forEach(function (s, k) { s.hidden = k !== i; });
      btns.forEach(function (b, k) { b.classList.toggle('done', k < i); b.setAttribute('aria-current', String(k === i)); });
      if (bar) bar.style.transform = 'scaleX(' + (i / (steps.length - 1)) + ')';
      prev.disabled = i === 0; next.disabled = i === steps.length - 1;
    }
    btns.forEach(function (b, k) { b.addEventListener('click', function () { show(k); }); });
    prev.addEventListener('click', function () { show(i - 1); });
    next.addEventListener('click', function () { show(i + 1); });
    show(0);
  };

  /* ---------- ScrollVelocity: faixa que acelera com a rolagem (sem prender a página) ---------- */
  fx.scrollVelocity = function (root) {
    var rows = [].slice.call(root.querySelectorAll('.sv__row'));
    rows.forEach(function (r) { r.innerHTML += r.innerHTML + r.innerHTML; });
    var pos = rows.map(function () { return 0; }), last = scrollY, v = 0;
    addEventListener('scroll', function () { v += (scrollY - last) * .25; last = scrollY; }, { passive: true });
    (function tick() {
      v *= .9;
      rows.forEach(function (r, i) {
        var dir = i % 2 ? -1 : 1, w = r.scrollWidth / 3;
        pos[i] -= (RM ? 0 : (.6 + Math.abs(v))) * dir;
        if (pos[i] <= -w) pos[i] += w; if (pos[i] > 0) pos[i] -= w;
        r.style.transform = 'translate3d(' + pos[i] + 'px,0,0)';
      });
      requestAnimationFrame(tick);
    })();
  };

  /* ---------- Revelar ao entrar (sem prender a rolagem) ---------- */
  fx.reveal = function (sel) {
    var els = [].slice.call(document.querySelectorAll(sel || '.reveal'));
    if (!('IntersectionObserver' in window) || RM) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e, i) { e.style.transitionDelay = (i % 3) * 60 + 'ms'; io.observe(e); });
  };

  /* ---------- Scroll fill: linha que preenche conforme a seção passa ---------- */
  fx.fillLine = function (track, fill) {
    function upd() {
      var r = track.getBoundingClientRect(), k = (innerHeight * .6 - r.top) / r.height;
      fill.style.transform = 'scaleY(' + Math.max(0, Math.min(1, k)) + ')';
    }
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
  };

  window.fx = fx;
})();
