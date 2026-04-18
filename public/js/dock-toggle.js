// Toggle expand/collapse for the mobile bottom dock
(function () {
  const toggle = document.getElementById('dock-collapse-toggle');
  if (!toggle) return;

  const EXPANDED_KEY = 'dockExpanded';

  function setExpanded(expanded) {
    document.body.classList.toggle('dock-expanded', expanded);
    toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    // rotate icon handled by CSS when aria-expanded changes
    try { localStorage.setItem(EXPANDED_KEY, expanded ? '1' : '0'); } catch (e) {}
  }

  // initialize from localStorage
  let stored = null;
  try { stored = localStorage.getItem(EXPANDED_KEY); } catch (e) {}
  if (stored === '1') setExpanded(true);

  toggle.addEventListener('click', function (e) {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    setExpanded(!isExpanded);
  });

  // collapse when a dock link is clicked (mobile navigation)
  document.querySelectorAll('.bottom-nav-dock .dock-link').forEach((el) => {
    el.addEventListener('click', () => setExpanded(false));
  });

  // keyboard accessibility: toggle on Enter/Space
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle.click();
    }
  });
})();
