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
        // Add a small delay for mobile to ensure proper timing
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const delay = isMobile ? 100 : 0;
        
        setTimeout(() => {
          try {
            DISQUS.reset({
              reload: true,
              config: function () {
                // Keep the same identifier and URL
                this.page.identifier = window.disqus_identifier || window.location.pathname;
                this.page.url = window.disqus_url || window.location.href;
              }
            });
          } catch (error) {
            console.warn('Disqus reload failed:', error);
            // Fallback: try to force reload by removing and re-adding the script
            this.fallbackDisqusReload();
          }
        }, delay);
      }
    }

    // Fallback method for mobile devices
    fallbackDisqusReload() {
      try {
        // Remove existing Disqus iframe
        const disqusThread = document.getElementById('disqus_thread');
        if (disqusThread) {
          disqusThread.innerHTML = '';
        }
        
        // Re-initialize Disqus
        if (window.disqus_shortname) {
          const script = document.createElement('script');
          script.src = 'https://' + window.disqus_shortname + '.disqus.com/embed.js';
          script.setAttribute('data-timestamp', +new Date());
          (document.head || document.body).appendChild(script);
        }
      } catch (error) {
        console.warn('Fallback Disqus reload also failed:', error);
      }
    }

    // Apply theme to the document
    applyTheme(theme) {
      console.log('ThemeSwitcher: applying theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      this.currentTheme = theme;
      this.storeTheme(theme);

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
