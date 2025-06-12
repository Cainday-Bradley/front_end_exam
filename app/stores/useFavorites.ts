import { defineStore } from 'pinia'

interface Rocket {
  id: string
  name: string
  description: string
  height: {
    meters: number
    feet: number
  }
  mass: {
    kg: number
    lb: number
  }
  first_flight: string
  wikipedia: string
  active: boolean
}

interface FavoritesState {
  favorites: Rocket[]
}

export const useFavoritesStore = defineStore('favorites', {
  state: (): FavoritesState => ({
    favorites: []
  }),

  getters: {
    favoriteCount: (state) => state.favorites.length,
    isFavorite: (state) => (rocketId: string) => state.favorites.some(rocket => rocket.id === rocketId)
  },

  actions: {
    addFavorite(rocket: Rocket) {
      if (!this.isFavorite(rocket.id)) {
        this.favorites.push(rocket)
      }
    },

    removeFavorite(rocketId: string) {
      this.favorites = this.favorites.filter(rocket => rocket.id !== rocketId)
    },

    clearFavorites() {
      this.favorites = []
    }
  }
}) 