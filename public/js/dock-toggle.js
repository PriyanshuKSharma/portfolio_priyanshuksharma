// Toggle expand/collapse for the bottom dock.
document.addEventListener('DOMContentLoaded', () => {
  const navDock = document.querySelector('.bottom-nav-dock');
  const toggle = document.getElementById('dock-collapse-toggle');
  if (!navDock || !toggle) return;

  const DOCK_STATE_KEY = 'nav_dock_collapsed_v2';

  const setDockState = (collapsed) => {
    navDock.classList.toggle('is-collapsed', collapsed);
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.setAttribute('aria-label', collapsed ? 'Expand Navigation' : 'Collapse Navigation');
    toggle.setAttribute('title', collapsed ? 'Expand Navigation' : 'Collapse Navigation');
    toggle.setAttribute('data-tip', collapsed ? 'Maximize' : 'Minimize');
  };

  let initialCollapsed = false;
  try {
    initialCollapsed = localStorage.getItem(DOCK_STATE_KEY) === '1';
  } catch (_) {
    initialCollapsed = false;
  }

  setDockState(initialCollapsed);

  toggle.addEventListener('click', () => {
    const collapsed = !navDock.classList.contains('is-collapsed');
    setDockState(collapsed);
    try {
      localStorage.setItem(DOCK_STATE_KEY, collapsed ? '1' : '0');
    } catch (_) {
      // Storage may be unavailable in private or restricted contexts.
    }
  });
});
