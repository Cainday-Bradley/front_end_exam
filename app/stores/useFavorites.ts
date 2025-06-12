import { defineStore } from 'pinia'

interface Rocket {
  id: string
  name: string
  description: string
  first_flight: string
  height?: { meters: number }
  diameter?: { meters: number }
  mass?: { kg: number }
  stages: number
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favoriteRockets: [] as Rocket[]
  }),

  getters: {
    hasFavorite: (state) => (rocketId: string) => {
      return state.favoriteRockets.some(rocket => rocket.id === rocketId)
    },
    
    favoriteCount: (state) => state.favoriteRockets.length
  },

  actions: {
    addFavorite(rocket: Rocket) {
      if (!this.hasFavorite(rocket.id)) {
        this.favoriteRockets.push(rocket)
      }
    },

    removeFavorite(rocketId: string) {
      this.favoriteRockets = this.favoriteRockets.filter(rocket => rocket.id !== rocketId)
    },

    clearFavorites() {
      this.favoriteRockets = []
    }
  }
}) 