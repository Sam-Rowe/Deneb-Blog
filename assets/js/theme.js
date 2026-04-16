/**
 * Deneb Blog — Theme Toggle
 * Handles dark/light theme switching with localStorage persistence.
 * Respects prefers-color-scheme media query as the default.
 * Progressive enhancement: site is fully usable without this script.
 */
(function () {
  'use strict';

  var THEME_KEY = 'deneb-theme';
  var DARK = 'dark';
  var LIGHT = 'light';

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // localStorage not available — fail silently
    }
  }

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return LIGHT;
    }
    return DARK;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    var icon = toggle.querySelector('.theme-icon');
    var label = toggle.querySelector('.theme-label');

    if (theme === DARK) {
      if (icon) icon.textContent = '☀';
      if (label) label.textContent = 'Light';
      toggle.setAttribute('aria-label', 'Switch to light theme');
    } else {
      if (icon) icon.textContent = '☾';
      if (label) label.textContent = 'Dark';
      toggle.setAttribute('aria-label', 'Switch to dark theme');
    }
  }

  // Apply theme immediately (before DOMContentLoaded) to prevent flash of wrong theme
  var stored = getStoredTheme();
  var initialTheme = stored || getSystemTheme();
  applyTheme(initialTheme);

  // Wire up the toggle button once the DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === DARK ? LIGHT : DARK;
      applyTheme(next);
      setStoredTheme(next);
    });

    // Listen for system preference changes
    if (window.matchMedia) {
      var mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      var handleSystemThemeChange = function (e) {
        // Only update if user hasn't explicitly set a preference
        if (!getStoredTheme()) {
          var matches = e && typeof e.matches === 'boolean' ? e.matches : mediaQuery.matches;
          applyTheme(matches ? LIGHT : DARK);
        }
      };

      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handleSystemThemeChange);
      } else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(handleSystemThemeChange);
      }
    }
  });
}());
