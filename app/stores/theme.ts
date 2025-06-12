import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),
  
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      // Save preference to localStorage
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },
    
    initTheme() {
      // Check localStorage for saved preference
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        this.isDark = savedTheme === 'dark'
      } else {
        // Check system preference
        this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
    }
  }
}) 