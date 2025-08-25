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
      this.watchForDisqus();
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
      console.log('ThemeSwitcher: applying theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      this.currentTheme = theme;
      this.storeTheme(theme);

      // Notify other scripts (e.g., Disqus embed) that theme has changed
      try {
        console.log('ThemeSwitcher: dispatching themeChanged event');
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
      } catch(e) {
        console.warn('Unable to dispatch themeChanged event', e);
      }
      
      // Force update Disqus colors when theme changes
      this.updateDisqusColors(theme);
      
      // Update meta theme-color for mobile browsers
      this.updateMetaThemeColor(theme);
    }

    // Force update Disqus comment colors when theme changes
    updateDisqusColors(theme) {
      // Wait a bit for any dynamic content to load
      setTimeout(() => {
        const disqusThread = document.getElementById('disqus_thread');
        if (disqusThread) {
          // Force re-application of CSS by temporarily removing and re-adding the theme attribute
          const currentTheme = document.documentElement.getAttribute('data-theme');
          document.documentElement.removeAttribute('data-theme');
          setTimeout(() => {
            document.documentElement.setAttribute('data-theme', currentTheme);
          }, 10);
          
          console.log('ThemeSwitcher: Updated Disqus colors for theme:', theme);
        }
      }, 100);
    }

    // Watch for Disqus loading and apply theme colors automatically
    watchForDisqus() {
      // Create a MutationObserver to watch for when Disqus loads
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              // Check if this is a Disqus-related element
              if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.id === 'disqus_thread' || 
                    node.querySelector && node.querySelector('#disqus_thread') ||
                    node.classList && (node.classList.contains('disqus-comment-embed') || 
                                     node.classList.contains('disqus-embed'))) {
                  
                  console.log('ThemeSwitcher: Disqus detected, applying theme colors');
                  // Apply current theme colors to the newly loaded Disqus
                  setTimeout(() => {
                    this.updateDisqusColors(this.currentTheme);
                  }, 200);
                }
              }
            });
          }
        });
      });

      // Start observing the document body for changes
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      // Also watch for theme changes from other sources
      window.addEventListener('themeChanged', (e) => {
        if (e.detail && e.detail.theme) {
          this.updateDisqusColors(e.detail.theme);
        }
      });
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
