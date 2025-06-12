import { defineStore } from 'pinia'

// Interface defining the structure of a rocket object
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

// Define the favorites store with state, getters, and actions
export const useFavoritesStore = defineStore('favorites', {
	// Initial state with empty array of favorite rockets
	state: () => ({
		favoriteRockets: [] as Rocket[],
	}),

	getters: {
		// Check if a rocket is in favorites by its ID
		hasFavorite: (state) => (rocketId: string) => {
			return state.favoriteRockets.some((rocket) => rocket.id === rocketId)
		},

		// Get the total number of favorite rockets
		favoriteCount: (state) => state.favoriteRockets.length,
	},

	actions: {
		// Add a rocket to favorites if not already present
		addFavorite(rocket: Rocket) {
			if (!this.hasFavorite(rocket.id)) {
				this.favoriteRockets.push(rocket)
			}
		},

		// Remove a rocket from favorites by its ID
		removeFavorite(rocketId: string) {
			this.favoriteRockets = this.favoriteRockets.filter((rocket) => rocket.id !== rocketId)
		},

		// Clear all rockets from favorites
		clearFavorites() {
			this.favoriteRockets = []
		},
	},
})
