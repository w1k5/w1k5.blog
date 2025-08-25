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

    // Reload Disqus to pick up theme changes
    reloadDisqus() {
      if (window.DISQUS) {
        console.log('ThemeSwitcher: reloading Disqus for theme change');
        
        // Force a small delay to ensure theme CSS is fully applied
        setTimeout(() => {
          DISQUS.reset({
            reload: true,
            config: function () {
              // Keep the same identifier and URL
              this.page.identifier = window.disqus_identifier || window.location.pathname;
              this.page.url = window.disqus_url || window.location.href;
            }
          });
        }, 50);
      } else {
        // If Disqus isn't loaded yet, try to reload the entire embed
        console.log('ThemeSwitcher: Disqus not loaded, attempting embed reload');
        this.reloadDisqusEmbed();
      }
    }

    // Fallback method to reload Disqus embed when DISQUS.reset isn't available
    reloadDisqusEmbed() {
      try {
        const disqusThread = document.getElementById('disqus_thread');
        if (!disqusThread) return;

        // Clear existing content
        disqusThread.innerHTML = '';

        // Get shortname from config or use default
        const shortname = 'wiks-wiki'; // Using the shortname from your _config.yml
        
        // Re-initialize Disqus with the same configuration
        const script = document.createElement('script');
        script.src = 'https://' + shortname + '.disqus.com/embed.js';
        script.setAttribute('data-timestamp', +new Date());

        // Set up the config before loading
        window.disqus_config = function () {
          this.page.url = window.disqus_url || window.location.href;
          this.page.identifier = window.disqus_identifier || window.location.pathname;
        };

        (document.head || document.body).appendChild(script);
      } catch (error) {
        console.warn('Fallback Disqus reload failed:', error);
      }
    }

    // Apply theme to the document
    applyTheme(theme) {
      console.log('ThemeSwitcher: applying theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      this.currentTheme = theme;
      this.storeTheme(theme);

      // Ensure Disqus container gets proper theme inheritance
      this.ensureDisqusThemeContext(theme);

      // Reload Disqus to pick up theme changes
      this.reloadDisqus();

      // Notify other scripts (e.g., Disqus embed) that theme has changed
      try {
        console.log('ThemeSwitcher: dispatching themeChanged event');
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
      } catch(e) {
        console.warn('Unable to dispatch themeChanged event', e);
      }
      
      // Update meta theme-color for mobile browsers
      this.updateMetaThemeColor(theme);
    }

    // Ensure Disqus container gets proper theme inheritance
    ensureDisqusThemeContext(theme) {
      const disqusThread = document.getElementById('disqus_thread');
      if (disqusThread) {
        // Force the container to inherit the current theme
        disqusThread.setAttribute('data-theme', theme);
        
        // Add a CSS class to ensure theme inheritance
        disqusThread.className = disqusThread.className.replace(/theme-\w+/g, '') + ` theme-${theme}`;
        
        // Force a repaint to ensure CSS variables are applied
        disqusThread.style.display = 'none';
        disqusThread.offsetHeight; // Force reflow
        disqusThread.style.display = '';
      }
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
