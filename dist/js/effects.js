/**
 * effects.js — Custom cursor, scroll progress, count-up, glitch init
 * Runs on top of the existing main.js without conflicts.
 */
(function () {
  'use strict';

  /* ── Custom Cursor ── */
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursor-trail');

  if (cursor && trail) {
    let mx = -100, my = -100;
    let tx = -100, ty = -100;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    // Smooth trailing dot
    function animateTrail() {
      tx += (mx - tx) * 0.14;
      ty += (my - ty) * 0.14;
      trail.style.left = tx + 'px';
      trail.style.top  = ty + 'px';
      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Expand on interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .ex-card, .project-card, .pc, .cc, .skill-card, .hb');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; trail.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; trail.style.opacity = '1'; });
  }

  /* ── Scroll Progress Bar ── */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop  = document.documentElement.scrollTop || document.body.scrollTop;
      const docHeight  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct.toFixed(2) + '%';
    }, { passive: true });
  }

  /* ── Count-Up Numbers ── */
  function animateCountUp(el) {
    const target  = parseFloat(el.dataset.target || el.textContent);
    const suffix  = el.dataset.suffix  || '';
    const decimal = parseInt(el.dataset.decimal || '0', 10);
    const duration = 1600;
    const start    = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      el.textContent = value.toFixed(decimal) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const countEls = document.querySelectorAll('.count-up, .h-mnum[data-target], .metric-number[data-target]');
  if (countEls.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = '1';
          animateCountUp(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    countEls.forEach(el => countObserver.observe(el));
  }

  /* ── Skill Bar Animate on Scroll ── */
  const skillFills = document.querySelectorAll('.sk-fill[data-w], .skill-fill[data-w]');
  if (skillFills.length) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const target = fill.dataset.w || '0';
          // Small delay for stagger feel
          setTimeout(() => { fill.style.width = target + '%'; }, 100);
          skillObserver.unobserve(fill);
        }
      });
    }, { threshold: 0.3 });

    skillFills.forEach(el => skillObserver.observe(el));
  }

  /* ── Generic Reveal Animation ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .sk, .sh2, .ss, .edu-item, .eitem, .cc, .aw-card, .hk-item, .ci, .cf, .rcard, .sk-card');
  if (revealEls.length) {
    const revObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('vis');
          revObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revObserver.observe(el));
  }

  /* ── Nav scrolled class ── */
  const navbar = document.getElementById('navbar') || document.getElementById('main-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

})();
