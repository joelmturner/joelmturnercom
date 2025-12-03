function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateTheme(value) {
  const systemTheme = getSystemTheme();
  const theme = value === 'system' ? systemTheme : value;

  // set the value on root
  document.documentElement.setAttribute(`data-color-mode`, theme);

  // set or remove wa-dark class based on theme
  if (theme === 'dark') {
    document.documentElement.classList.add('wa-dark');
  } else {
    document.documentElement.classList.remove('wa-dark');
  }

  // set the active class on the active mode icon in all theme switches
  document.querySelectorAll(`[data-theme-value="${value}"]`).forEach((el) => {
    el.classList.add('active');
  });

  // update the logo based on mode
  const logosByTheme = {
    light: `https://res.cloudinary.com/joelmturner/image/upload/f_auto,q_auto/v1673573341/jmt-logo-light-500w_2_pmadzj.png`,
    dark: `https://res.cloudinary.com/joelmturner/image/upload/f_auto,q_auto/v1673573341/jmt-logo-dark-500w_2_pxay5e.png`,
  };
  document.querySelector(`[data-logo]`)?.setAttribute('src', logosByTheme[theme]);

  localStorage.setItem('theme', value);
  console.log('theme', theme);
}

function syncThemeUI() {
  // sync UI elements (active classes and logo) with current theme state
  // theme attributes are already set by BaseHead.astro on initial load
  const theme = localStorage.getItem('theme');
  const systemTheme = getSystemTheme();
  const baseValue = theme !== null ? theme : 'system';
  const resolvedTheme = baseValue === 'system' ? systemTheme : baseValue;

  // clear all active classes first
  document.querySelectorAll('[data-theme-value]').forEach((el) => {
    el.classList.remove('active');
  });

  // set active classes on the correct theme icon
  document.querySelectorAll(`[data-theme-value="${baseValue}"]`).forEach((el) => {
    el.classList.add('active');
  });

  // update the logo based on current resolved theme
  const logosByTheme = {
    light: `https://res.cloudinary.com/joelmturner/image/upload/f_auto,q_auto/v1673573341/jmt-logo-light-500w_2_pmadzj.png`,
    dark: `https://res.cloudinary.com/joelmturner/image/upload/f_auto,q_auto/v1673573341/jmt-logo-dark-500w_2_pxay5e.png`,
  };
  document.querySelector(`[data-logo]`)?.setAttribute('src', logosByTheme[resolvedTheme]);
}

function attachClickHandler() {
  // find all theme switches and attach handlers to each
  const themeSwitches = document.querySelectorAll('.theme-switch');
  themeSwitches.forEach((themeSwitch) => {
    // skip if handler already attached
    if (themeSwitch.dataset.handlerAttached === 'true') return;

    // mark as attached to prevent duplicates
    themeSwitch.dataset.handlerAttached = 'true';

    // use event delegation to handle clicks (works even if element is replaced)
    themeSwitch.addEventListener('click', (event) => {
      const selected = event.target;
      const themeValue = selected.closest('[data-theme-value]');
      if (!themeValue) return;

      // clear all active classes in all theme switches
      document.querySelectorAll('.theme-switch svg').forEach((svg) => {
        svg.classList.remove('active');
      });

      // update theme with the selected value
      const value = themeValue.getAttribute('data-theme-value') ?? 'dark';
      updateTheme(value);
    });
  });
}

// sync UI elements and attach handlers on page load
// note: theme attributes are already set by BaseHead.astro on initial load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    syncThemeUI();
    attachClickHandler();
  });
} else {
  syncThemeUI();
  attachClickHandler();
}

