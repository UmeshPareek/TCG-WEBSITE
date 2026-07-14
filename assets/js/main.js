/* ============================================================================
   THE CONSULTING GROUP — interaction layer
   Lenis smooth scroll · GSAP reveals · magnetic cursor · hero sequence
   portfolio mechanic · page-transition wipe · reduced-motion safe
   ========================================================================== */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch  = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const gsap = window.gsap;
  const ST   = window.ScrollTrigger;
  if (gsap && ST) gsap.registerPlugin(ST);

  /* -------------------------------------------------- Loader */
  const loader = document.getElementById('loader');
  function hideLoader(){
    if (!loader) { document.body.classList.add('ready'); return; }
    document.body.classList.add('ready');
    setTimeout(() => loader.classList.add('done'), 480);
  }

  /* -------------------------------------------------- Lenis smooth scroll */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on('scroll', () => ST && ST.update());
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    if (gsap) gsap.ticker.lagSmoothing(0);
    window.lenis = lenis; // exposed for anchor scrolling + debugging
  }

  /* -------------------------------------------------- Custom cursor */
  const cur = document.getElementById('cur');
  const ring = document.getElementById('curRing');
  const label = document.getElementById('curLabel');
  if (cur && ring && !touch && !reduce) {
    let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;
    addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    });
    const ease = () => {
      rx += (mx-rx)*0.16; ry += (my-ry)*0.16;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      if (label) label.style.transform = `translate(${mx}px,${my+2}px) translate(-50%,-50%)`;
      requestAnimationFrame(ease);
    };
    ease();
    // magnetic + hover states
    const hoverSel = 'a, button, .tile, .sector-row, .magnetic, input, textarea, select';
    document.addEventListener('mouseover', e => {
      const t = e.target.closest(hoverSel);
      if (!t) return;
      document.body.classList.add('cur-hover');
      if (t.dataset.cursor && label){ label.textContent = t.dataset.cursor; document.body.classList.add('cur-view'); }
    });
    document.addEventListener('mouseout', e => {
      const t = e.target.closest(hoverSel);
      if (!t) return;
      document.body.classList.remove('cur-hover','cur-view');
    });
    // magnetic pull on buttons
    document.querySelectorAll('.magnetic, .btn').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width/2);
        const y = e.clientY - (r.top + r.height/2);
        el.style.transform = `translate(${x*0.28}px, ${y*0.4}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
    // dark-section cursor inversion via IntersectionObserver on [data-cur]
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting && en.intersectionRatio > 0.5)
          document.body.classList.toggle('cur-dark', en.target.dataset.cur === 'dark');
      });
    }, { threshold: [0.5] });
    document.querySelectorAll('[data-cur]').forEach(s => io.observe(s));
  }

  /* -------------------------------------------------- Nav */
  const nav = document.querySelector('.nav');
  const setNavSolid = () => { if (nav) nav.classList.toggle('solid', window.scrollY > 40); };
  setNavSolid(); addEventListener('scroll', setNavSolid, { passive:true });

  const burger = document.querySelector('.burger');
  const mobmenu = document.querySelector('.mobmenu');
  if (burger && mobmenu) {
    const toggle = (open) => {
      burger.classList.toggle('open', open);
      mobmenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (lenis) open ? lenis.stop() : lenis.start();
    };
    burger.addEventListener('click', () => toggle(!mobmenu.classList.contains('open')));
    mobmenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
  }

  /* -------------------------------------------------- Scroll reveals
     Driven by a direct getBoundingClientRect check on scroll + an immediate
     initial pass. This reveals above-the-fold content on load without relying
     on IntersectionObserver or ScrollTrigger auto-firing (both can miss the
     initial paint), and stays in sync with Lenis. */
  const all = [...document.querySelectorAll('.reveal, [data-reveal], [data-lines]')];
  if (reduce) {
    all.forEach(el => el.classList.add('in'));
  } else {
    const checkReveals = () => {
      const trigger = innerHeight * 0.92;
      for (const el of all) {
        if (el.classList.contains('in')) continue;
        const r = el.getBoundingClientRect();
        if (r.top < trigger && r.bottom > 0) el.classList.add('in');
      }
    };
    checkReveals(); // immediate: reveals everything above the fold on load
    if (lenis) lenis.on('scroll', checkReveals);
    else addEventListener('scroll', checkReveals, { passive: true });
    addEventListener('resize', checkReveals, { passive: true });
    addEventListener('load', checkReveals);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(checkReveals);
    // failsafe: never leave content hidden if scroll events never come
    setTimeout(() => all.forEach(el => el.classList.add('in')), 2600);
  }

  /* -------------------------------------------------- Hero sequence */
  const hero = document.querySelector('.hero-h');
  if (hero) {
    const tail = hero.querySelector('.hero-tail .inner');
    const rows = hero.querySelectorAll('.rowmask > span');
    const showHero = () => {              // synchronous end-state (works even if ticker is frozen)
      hero.classList.add('solved');
      if (gsap) { gsap.set(rows, { yPercent: 0 }); gsap.set(tail, { yPercent: 0, y: 0, opacity: 1 }); }
      else { rows.forEach(r => r.style.transform = 'none'); if (tail) { tail.style.transform = 'none'; tail.style.opacity = 1; } }
    };
    if (reduce || !gsap) {
      showHero();
    } else {
      gsap.set(rows, { yPercent: 110 });
      gsap.set(tail, { yPercent: 110, y: 0, opacity: 0 }); // reset y so gsap doesn't inherit the CSS % transform as px
      gsap.timeline({ delay: 0.35 })
        .to(rows, { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.09 })
        .add(() => hero.classList.add('solved'), '-=0.15')
        .to(tail, { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power4.out' }, '+=0.35');
      // failsafe: if the render ticker never advances, force the resolved state
      setTimeout(() => { if (parseFloat(getComputedStyle(tail).opacity) < 0.9) showHero(); }, 2600);
    }
  }

  /* -------------------------------------------------- Hero particle field
     chaos -> order as headline resolves. Progressive, offscreen-paused. */
  const canvas = document.getElementById('field');
  if (canvas && !reduce && !touch) {
    const ctx = canvas.getContext('2d');
    let W, H, dpr = Math.min(devicePixelRatio||1, 2), pts = [], raf, running = true, settle = 0;
    const N = 90;
    function resize(){
      const r = canvas.getBoundingClientRect();
      W = canvas.width = r.width*dpr; H = canvas.height = r.height*dpr;
    }
    function init(){
      pts = [];
      for (let i=0;i<N;i++){
        const gx = (0.12 + 0.76*((i%15)/14)) * W;
        const gy = (0.2 + 0.6*(Math.floor(i/15)/5)) * H;
        pts.push({ x: Math.random()*W, y: Math.random()*H, gx, gy,
          vx:(Math.random()-.5)*0.4, vy:(Math.random()-.5)*0.4 });
      }
    }
    function draw(){
      if(!running){ return; }
      ctx.clearRect(0,0,W,H);
      settle += (1 - settle) * 0.006; // ease toward order
      for (const p of pts){
        // blend chaos motion with pull to grid
        p.x += p.vx*(1-settle); p.y += p.vy*(1-settle);
        p.x += (p.gx - p.x)*0.012*settle;
        p.y += (p.gy - p.y)*0.012*settle;
        if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
      }
      // connective lines
      ctx.strokeStyle = 'rgba(194,26,43,0.16)'; ctx.lineWidth = dpr*0.6;
      for(let i=0;i<pts.length;i++){
        for(let j=i+1;j<pts.length;j++){
          const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=dx*dx+dy*dy;
          if(d < (130*dpr)*(130*dpr)){
            ctx.globalAlpha = (1 - d/((130*dpr)*(130*dpr))) * (0.3+0.7*settle);
            ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(239,235,225,0.5)';
      for(const p of pts){ ctx.beginPath(); ctx.arc(p.x,p.y,dpr*1.3,0,7); ctx.fill(); }
      raf = requestAnimationFrame(draw);
    }
    resize(); init(); draw();
    addEventListener('resize', () => { resize(); init(); });
    // pause offscreen
    new IntersectionObserver(e => {
      running = e[0].isIntersecting;
      if (running){ cancelAnimationFrame(raf); draw(); }
    }, { threshold: 0 }).observe(canvas);
  }

  /* -------------------------------------------------- Sectors expand */
  document.querySelectorAll('.sector-row').forEach(row => {
    const exp = row.querySelector('.expand');
    if (!exp) return;
    const inner = row.querySelector('.expand-inner');
    row.setAttribute('tabindex','0');
    row.setAttribute('role','button');
    row.setAttribute('aria-expanded','false');
    const toggle = () => {
      const open = row.classList.toggle('open');
      row.setAttribute('aria-expanded', open);
      exp.style.height = open ? inner.offsetHeight + 'px' : '0px';
      ST && setTimeout(()=>ST.refresh(), 520);
    };
    row.addEventListener('click', toggle);
    row.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); }});
  });

  /* -------------------------------------------------- Portfolio wall */
  const wall = document.querySelector('.wall');
  if (wall) {
    const tiles = [...wall.querySelectorAll('.tile')];
    tiles.forEach(t => {
      t.setAttribute('tabindex','0');
      t.addEventListener('mouseenter', () => wall.classList.add('dimmed'));
      t.addEventListener('mouseleave', () => wall.classList.remove('dimmed'));
      t.addEventListener('focus', () => { wall.classList.add('dimmed'); t.classList.add('active'); });
      t.addEventListener('blur',  () => { wall.classList.remove('dimmed'); t.classList.remove('active'); });
      // mobile tap toggles
      if (touch) {
        t.addEventListener('click', () => {
          const was = t.classList.contains('active');
          tiles.forEach(x => x.classList.remove('active'));
          if (!was) { t.classList.add('active'); wall.classList.add('dimmed'); }
          else wall.classList.remove('dimmed');
        });
      }
    });
    // mobile auto-cycle a featured tile
    if (touch && tiles.length) {
      let i = 0;
      setInterval(() => {
        if (document.hidden) return;
        // only autoplay if user hasn't manually activated
        if (wall.dataset.userTouched) return;
        tiles.forEach(x => x.classList.remove('active'));
        tiles[i % tiles.length].classList.add('active');
        i++;
      }, 2600);
      wall.addEventListener('click', () => { wall.dataset.userTouched = '1'; });
    }
  }

  /* -------------------------------------------------- Portfolio filter */
  const filterBar = document.querySelector('[data-filterbar]');
  if (filterBar && wall) {
    const tiles = [...wall.querySelectorAll('.tile')];
    filterBar.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('button').forEach(b => b.removeAttribute('aria-current'));
        btn.setAttribute('aria-current', 'true');
        const f = btn.dataset.filter;
        tiles.forEach(t => {
          const show = f === 'all' || (t.dataset.sector || '').split(' ').includes(f);
          if (gsap && !reduce) {
            gsap.to(t, { autoAlpha: show ? 1 : 0.12, scale: show ? 1 : 0.97, duration: 0.4, ease: 'power2.out' });
            t.style.pointerEvents = show ? '' : 'none';
          } else { t.style.display = show ? '' : 'none'; }
        });
        ST && ST.refresh();
      });
    });
  }

  /* -------------------------------------------------- Count-up stats */
  const counters = [...document.querySelectorAll('[data-count]')];
  const setVal = (el, v) => {
    const s = el.dataset.suffix || '';
    if (el.firstChild && el.firstChild.nodeType === 3) el.firstChild.nodeValue = v + s;
    else el.textContent = v + s;
  };
  if (reduce) {
    counters.forEach(el => setVal(el, el.dataset.count));
  } else {
    const runCount = el => {
      el.dataset._counted = '1';
      const end = parseFloat(el.dataset.count), dur = 1300, t0 = performance.now();
      const step = t => {
        const p = Math.min(1, (t - t0) / dur);
        setVal(el, Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const checkCount = () => {
      const trg = innerHeight * 0.9;
      for (const el of counters) {
        if (el.dataset._counted) continue;
        const r = el.getBoundingClientRect();
        if (r.top < trg && r.bottom > 0) runCount(el);
      }
    };
    checkCount();
    if (lenis) lenis.on('scroll', checkCount); else addEventListener('scroll', checkCount, { passive: true });
    addEventListener('load', checkCount);
    setTimeout(() => counters.forEach(el => { if (!el.dataset._counted) setVal(el, el.dataset.count); }), 3000);
  }

  /* -------------------------------------------------- Marquee loops */
  document.querySelectorAll('.marquee-track').forEach(track => {
    // duplicate content for seamless loop
    track.innerHTML += track.innerHTML;
    if (reduce || !gsap) return;
    const w = track.scrollWidth / 2;
    gsap.to(track, { x: -w, duration: 26, ease: 'none', repeat: -1 });
  });

  /* -------------------------------------------------- Parallax bits */
  if (!reduce && gsap) {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const amt = parseFloat(el.dataset.parallax) || 60;
      gsap.to(el, { y: amt, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  }

  /* -------------------------------------------------- Page-transition wipe */
  const wipe = document.getElementById('wipe');
  function isInternal(a){
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return false;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http')) return false;
    return true;
  }
  if (wipe && gsap && !reduce) {
    document.addEventListener('click', e => {
      const a = e.target.closest('a');
      if (!isInternal(a)) return;
      const dest = a.getAttribute('href');
      if (dest === location.pathname || dest === location.pathname.replace('.html','')) return;
      e.preventDefault();
      gsap.timeline()
        .set(wipe, { transformOrigin: 'bottom', scaleY: 0 })
        .to(wipe, { scaleY: 1, duration: 0.5, ease: 'power4.inOut' })
        .add(() => { window.location.href = dest; });
    });
    // reveal on back-forward cache
    addEventListener('pageshow', ev => { if (ev.persisted) gsap.to(wipe,{scaleY:0,transformOrigin:'top',duration:.5,ease:'power4.inOut'}); });
  }

  /* -------------------------------------------------- Boot */
  if (document.readyState === 'complete') hideLoader();
  else addEventListener('load', hideLoader);
  // safety: never leave the page hidden
  setTimeout(hideLoader, 2200);
  // intro wipe reveal (covers -> uncovers on fresh load)
  if (wipe && gsap && !reduce) {
    gsap.set(wipe, { scaleY: 1, transformOrigin: 'top' });
    const revealWipe = () => gsap.to(wipe, { scaleY: 0, duration: 0.6, ease: 'power4.inOut', delay: 0.05 });
    // guard: if load already fired (cached nav), the listener would never run — reveal now
    if (document.readyState === 'complete') revealWipe();
    else addEventListener('load', revealWipe);
  }
})();
