/*
 * Efeitos da versão D, recriados em JavaScript puro a partir de componentes do
 * React Bits (reactbits.dev): Aurora, BlurText, CountUp, LogoLoop, SpotlightCard /
 * MagicBento, TiltedCard, Magnet, StarBorder (CSS) e ClickSpark.
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

  window.fx = fx;
})();
