// Theme Switcher JavaScript
(function() {
  'use strict';

  // Theme configuration
  const themes = {
    dark: 'dark',
    light: 'light'
  };

  // Determine default theme based on OS preference
  const defaultTheme =
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? themes.dark
        : themes.light;

  // Theme switcher class
  class ThemeSwitcher {
    constructor() {
      this.currentTheme = this.getStoredTheme() || defaultTheme;
      this.init();
    }

    // Initialize the theme switcher
    init() {
      this.createToggleButton();
      this.applyTheme(this.currentTheme);
      this.bindEvents();
    }

    // Create the theme toggle button
    createToggleButton() {
      // Ensure body exists before creating toggle
      if (!document.body) {
        console.warn('Document body not ready, retrying...');
        setTimeout(() => this.createToggleButton(), 10);
        return;
      }
      
      const toggle = document.createElement('button');
      toggle.className = 'theme-toggle';
      toggle.setAttribute('aria-label', 'Toggle dark/light mode');
      toggle.setAttribute('title', 'Toggle theme');
      document.body.appendChild(toggle);
    }

    // Get stored theme from localStorage
    getStoredTheme() {
      try {
        return localStorage.getItem('theme');
      } catch (e) {
        console.warn('Could not access localStorage:', e);
        return null;
      }
    }

    // Store theme preference in localStorage
    storeTheme(theme) {
      try {
        localStorage.setItem('theme', theme);
      } catch (e) {
        console.warn('Could not save theme preference:', e);
      }
    }

    // Apply theme to the document
    applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      this.currentTheme = theme;
      this.storeTheme(theme);
      
      // Update meta theme-color for mobile browsers
      this.updateMetaThemeColor(theme);
      
      // Update Disqus theme
      this.updateDisqusTheme(theme);
    }

    // Update meta theme-color for mobile browsers
    updateMetaThemeColor(theme) {
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
      }
      
      const colors = {
        dark: '#050e21',
        light: '#f9f9f9'
      };
      
      metaThemeColor.content = colors[theme] || colors.dark;
    }

    // Update Disqus theme
    updateDisqusTheme(theme) {
      // Check if Disqus is loaded
      if (window.DISQUS) {
        try {
          // Reload Disqus with new theme
          window.DISQUS.reset({
            reload: true,
            config: function() {
              this.page.identifier = window.location.pathname;
              this.page.url = window.location.href;
              this.page.title = document.title;
              // Set Disqus theme based on current theme
              this.page.theme = theme === 'light' ? 'light' : 'dark';
            }
          });
        } catch (e) {
          console.warn('Could not update Disqus theme:', e);
        }
      } else {
        // If Disqus isn't loaded yet, set a flag for when it loads
        window.disqusTheme = theme;
      }
    }

    // Toggle between themes
    toggleTheme() {
      const newTheme = this.currentTheme === themes.dark ? themes.light : themes.dark;
      this.applyTheme(newTheme);
    }

    // Bind event listeners
    bindEvents() {
      // Theme toggle button click
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('theme-toggle')) {
          this.toggleTheme();
        }
      });

      // Keyboard shortcut (Ctrl/Cmd + Shift + T)
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
          e.preventDefault();
          this.toggleTheme();
        }
      });

      // System theme preference change
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
          // Only auto-switch if user hasn't manually set a preference
          if (!this.getStoredTheme()) {
            const newTheme = e.matches ? themes.dark : themes.light;
            this.applyTheme(newTheme);
          }
        });
      }
    }

    // Get current theme
    getCurrentTheme() {
      return this.currentTheme;
    }

    // Check if dark mode is active
    isDarkMode() {
      return this.currentTheme === themes.dark;
    }
  }

  // Initialize theme switcher when DOM is ready to prevent flash
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new ThemeSwitcher();
    });
  } else {
    new ThemeSwitcher();
  }

  // Export for global access if needed
  window.ThemeSwitcher = ThemeSwitcher;
})();
