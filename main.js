/* ============================================================
   DELPHI WEALTH SOLUTIONS - animation engine
   Preloader · veil transitions · split-text · reveals ·
   parallax · header · cursor · magnetic buttons · accordion
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var docEl = document.documentElement;

  /* ---------- preloader (full run on first visit only) ---------- */
  var pre = document.querySelector('.preloader');
  var seen = false;
  try { seen = sessionStorage.getItem('dws-seen') === '1'; } catch (e) {}
  if (pre) {
    if (seen || reduced) {
      document.body.classList.add('preloader-skip');
      start();
    } else {
      window.addEventListener('load', function () {
        setTimeout(function () {
          pre.classList.add('done');
          try { sessionStorage.setItem('dws-seen', '1'); } catch (e) {}
          setTimeout(start, 350);
        }, 1650);
      });
      // safety: never trap the user behind the preloader
      setTimeout(function () {
        if (!pre.classList.contains('done')) {
          pre.classList.add('done');
          start();
        }
      }, 4000);
    }
  } else { start(); }

  /* ---------- page veil transitions ---------- */
  var veil = document.querySelector('.veil');
  if (veil && seen && !reduced) veil.classList.add('veil--opening');
  document.addEventListener('click', function (e) {
    if (reduced || !veil) return;
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || a.target === '_blank' ||
        /^(https?:|mailto:|tel:)/.test(href)) return;
    e.preventDefault();
    document.body.classList.remove('menu-open');
    veil.classList.remove('veil--opening');
    // force reflow so the closing transition always plays
    void veil.offsetWidth;
    veil.classList.add('veil--closing');
    setTimeout(function () { window.location.href = href; }, 620);
  });
  window.addEventListener('pageshow', function (e) {
    if (e.persisted && veil) { // back/forward cache
      veil.classList.remove('veil--closing');
      veil.classList.add('veil--opening');
    }
  });

  var started = false;
  function start() {
    if (started) return;
    started = true;
    document.body.classList.add('is-ready');
    initSplit();
    initReveals();
  }

  /* ---------- split-text: wrap words in masked spans ---------- */
  function initSplit() {
    document.querySelectorAll('[data-split]').forEach(function (el) {
      if (el.dataset.splitDone) return;
      el.dataset.splitDone = '1';
      var wd = 0;
      var walk = function (node) {
        var kids = Array.prototype.slice.call(node.childNodes);
        kids.forEach(function (child) {
          if (child.nodeType === 3) {
            var frag = document.createDocumentFragment();
            child.textContent.split(/(\s+)/).forEach(function (part) {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
              var w = document.createElement('span');
              w.className = 'w';
              var i = document.createElement('i');
              i.textContent = part;
              i.style.setProperty('--wd', wd++);
              w.appendChild(i);
              frag.appendChild(w);
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === 1 && !child.classList.contains('w')) {
            walk(child);
          }
        });
      };
      walk(el);
    });
  }

  /* ---------- scroll reveals ---------- */
  function initReveals() {
    var targets = document.querySelectorAll('[data-reveal],[data-split],.rule,.gkey');
    if (!('IntersectionObserver' in window) || reduced) {
      targets.forEach(function (t) { t.classList.add('in-view'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in-view');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- header: shrink, hide on scroll down, dark-aware ---------- */
  var header = document.querySelector('.header');
  var lastY = 0;
  var darkZones = [];
  function collectDarkZones() {
    darkZones = Array.prototype.slice.call(document.querySelectorAll('.hero, .dark'));
  }
  collectDarkZones();
  window.addEventListener('resize', collectDarkZones);

  function onScroll() {
    var y = window.scrollY;
    if (header) {
      header.classList.toggle('header--scrolled', y > 60);
      if (y > 400 && y > lastY + 4 && !document.body.classList.contains('menu-open')) {
        header.classList.add('header--hidden');
      } else if (y < lastY - 4 || y < 200) {
        header.classList.remove('header--hidden');
      }
      // is the header floating over a dark section?
      var probe = 40;
      var onDark = darkZones.some(function (z) {
        var r = z.getBoundingClientRect();
        return r.top <= probe && r.bottom >= probe;
      });
      header.classList.toggle('header--onDark', onDark);
    }
    lastY = y;
  }

  /* ---------- parallax ---------- */
  var pxEls = [];
  function collectParallax() {
    pxEls = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'))
      .map(function (el) {
        return { el: el, speed: parseFloat(el.dataset.parallax) || 0.2 };
      });
  }
  collectParallax();

  var ticking = false;
  function raf() {
    onScroll();
    if (!reduced) {
      var vh = window.innerHeight;
      pxEls.forEach(function (p) {
        var r = p.el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var center = r.top + r.height / 2 - vh / 2;
        var base = p.el.dataset.parallaxBase || '';
        p.el.style.transform = base + ' translate3d(0,' + (-center * p.speed).toFixed(2) + 'px,0)';
      });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(raf); }
  }, { passive: true });
  raf();

  /* ---------- custom cursor ---------- */
  var fine = window.matchMedia('(pointer: fine)').matches;
  if (fine && !reduced) {
    var dot = document.createElement('div');
    var ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    var mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
    (function cursorLoop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
      ring.style.transform = 'translate(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px) translate(-50%,-50%)';
      requestAnimationFrame(cursorLoop);
    })();
    document.addEventListener('mouseover', function (e) {
      document.body.classList.toggle('cursor-hover', !!e.target.closest('a,button,.faq__q'));
    });
  }

  /* ---------- magnetic buttons ---------- */
  if (fine && !reduced) {
    document.querySelectorAll('.btn').forEach(function (btn) {
      var strength = 26;
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        var y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        btn.style.transform = 'translate(' + (x * strength * 0.4).toFixed(1) + 'px,' + (y * strength * 0.3).toFixed(1) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transition = 'transform .7s cubic-bezier(.22,1,.36,1), letter-spacing .5s cubic-bezier(.22,1,.36,1), color .45s';
        btn.style.transform = '';
        setTimeout(function () { btn.style.transition = ''; }, 700);
      });
    });
  }

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', document.body.classList.contains('menu-open'));
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq');
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- contact form (front-end only) ---------- */
  var form = document.querySelector('.form');
  if (form) {
    form.querySelectorAll('input,textarea').forEach(function (input) {
      var sync = function () {
        input.closest('.field').classList.toggle('filled', input.value.trim() !== '');
      };
      input.addEventListener('input', sync);
      input.addEventListener('blur', sync);
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.classList.add('sent');
    });
  }

  /* ---------- footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
