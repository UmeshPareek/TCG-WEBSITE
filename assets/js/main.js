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

  /* -------------------------------------------------- Hero background video */
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    if (reduce) {
      heroVideo.removeAttribute('autoplay');
      heroVideo.pause();
    } else {
      const tryPlay = () => { const p = heroVideo.play(); if (p) p.catch(() => {}); };
      tryPlay();
      heroVideo.addEventListener('loadeddata', tryPlay, { once: true });
      // pause when the hero scrolls out of view (perf)
      try {
        new IntersectionObserver(e => { e[0].isIntersecting ? tryPlay() : heroVideo.pause(); },
          { threshold: 0.05 }).observe(heroVideo);
      } catch (_) {}
    }
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
  const wipeInner = wipe && wipe.querySelector('.wipe-inner');
  const wipeBars  = wipe ? wipe.querySelectorAll('.wipe-inner .mark i') : [];
  if (wipe && gsap && !reduce) {
    document.addEventListener('click', e => {
      const a = e.target.closest('a');
      if (!isInternal(a)) return;
      const dest = a.getAttribute('href');
      if (dest === location.pathname || dest === location.pathname.replace('.html','')) return;
      e.preventDefault();
      gsap.timeline()
        .set(wipe, { clipPath: 'inset(100% 0% 0% 0%)' })
        .set(wipeInner, { opacity: 0 })
        .set(wipeBars, { scaleY: 0.25 })
        .to(wipe, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power4.inOut' })
        .to(wipeInner, { opacity: 1, duration: 0.25 }, '-=0.25')
        .to(wipeBars, { scaleY: 1, duration: 0.35, stagger: 0.07, ease: 'power3.out' }, '-=0.15')
        .add(() => { window.location.href = dest; }, '+=0.1');
    });
    // reveal on back-forward cache
    addEventListener('pageshow', ev => {
      if (ev.persisted) gsap.to(wipe, { clipPath: 'inset(0% 0% 100% 0%)', duration: .6, ease: 'power4.inOut' });
    });
  }

  /* -------------------------------------------------- Boot */
  if (document.readyState === 'complete') hideLoader();
  else addEventListener('load', hideLoader);
  // safety: never leave the page hidden
  setTimeout(hideLoader, 2200);
  // intro wipe reveal (covers -> uncovers upward on fresh load)
  if (wipe && gsap && !reduce) {
    gsap.set(wipe, { clipPath: 'inset(0% 0% 0% 0%)' });
    gsap.set(wipeInner, { opacity: 1 });
    const revealWipe = () => gsap.timeline()
      .to(wipeInner, { opacity: 0, duration: 0.25, ease: 'power2.out' })
      .to(wipe, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.7, ease: 'power4.inOut' }, '-=0.1');
    // guard: if load already fired (cached nav), the listener would never run — reveal now
    if (document.readyState === 'complete') revealWipe();
    else addEventListener('load', revealWipe);
  }
})();
