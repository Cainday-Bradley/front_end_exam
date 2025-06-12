<template>
	<!-- Main container for rocket details -->
	<v-container class="py-10 d-flex justify-center">
		<!-- Rocket details card -->
		<v-card v-if="rocket" class="mx-auto" max-width="800" elevation="8">
			<!-- Card header with rocket name and icon -->
			<v-card-title class="headline text-center pt-6 pb-2">
				<v-icon icon="mdi-rocket" size="large" color="primary" class="mr-2" />
				{{ rocket.name }}
			</v-card-title>
			<!-- First flight date -->
			<v-card-subtitle class="text-center mb-4">
				First Flight:
				<strong>{{ formatDate(rocket.first_flight) }}</strong>
			</v-card-subtitle>
			<v-divider class="mx-4" />
			<!-- Card content -->
			<v-card-text class="pt-6">
				<!-- Rocket description section -->
				<v-row>
					<v-col cols="12">
						<div class="mb-6">
							<div class="text-subtitle-1 font-weight-bold mb-2">Description</div>
							<div class="text-body-1 text-grey-darken-1">{{ rocket.description }}</div>
						</div>
					</v-col>
				</v-row>
				<!-- Rocket specifications grid -->
				<v-row>
					<!-- Height specification -->
					<v-col cols="12" sm="6" md="3">
						<v-card variant="outlined" class="h-100">
							<v-card-text class="text-center">
								<v-icon
									icon="mdi-arrow-expand-up"
									size="large"
									color="primary"
									class="mb-2"/>
								<div class="text-h6">{{ rocket.height?.meters || 'N/A' }} m</div>
								<div class="text-caption text-grey">Height</div>
							</v-card-text>
						</v-card>
					</v-col>
					<!-- Diameter specification -->
					<v-col cols="12" sm="6" md="3">
						<v-card variant="outlined" class="h-100">
							<v-card-text class="text-center">
								<v-icon 
									icon="mdi-diameter" 
									size="large" 
									color="primary" 
									class="mb-2" />
								<div class="text-h6">{{ rocket.diameter?.meters || 'N/A' }} m</div>
								<div class="text-caption text-grey">Diameter</div>
							</v-card-text>
						</v-card>
					</v-col>
					<!-- Mass specification -->
					<v-col cols="12" sm="6" md="3">
						<v-card variant="outlined" class="h-100">
							<v-card-text class="text-center">
								<v-icon 
									icon="mdi-weight" 
									size="large" 
									color="primary" 
									class="mb-2" />
								<div class="text-h6">{{ rocket.mass?.kg || 'N/A' }} kg</div>
								<div class="text-caption text-grey">Mass</div>
							</v-card-text>
						</v-card>
					</v-col>
					<!-- Stages specification -->
					<v-col cols="12" sm="6" md="3">
						<v-card variant="outlined" class="h-100">
							<v-card-text class="text-center">
								<v-icon 
									icon="mdi-layers" 
									size="large" 
									color="primary" 
									class="mb-2" />
								<div class="text-h6">{{ rocket.stages }}</div>
								<div class="text-caption text-grey">Stages</div>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-card-text>
			<v-divider class="mx-4" />
			<!-- Card actions: back button and favorite toggle -->
			<v-card-actions class="justify-space-between px-6 py-4">
				<v-btn color="secondary" @click="goBack" variant="outlined">
					<v-icon icon="mdi-arrow-left" class="mr-1" />
					Back
				</v-btn>
				<v-btn
					:color="isFavorite ? 'error' : 'primary'"
					@click="toggleFavorite"
					:icon="isFavorite ? 'mdi-heart' : 'mdi-heart-outline'"
					variant="text"
					class="text-none">
					{{ isFavorite ? 'Remove' : 'Add' }}
				</v-btn>
			</v-card-actions>
		</v-card>
		<!-- Loading state -->
		<v-alert v-else type="info" class="mx-auto" max-width="800">
			<v-progress-circular indeterminate class="mr-3" />
			Loading rocket details...
		</v-alert>
	</v-container>
</template>

<script lang="ts" setup>
// Import required composables and stores
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '~/stores/useFavorites'

// Initialize route and router
const route = useRoute()
const router = useRouter()
const rocketId = route.params.id
const favoritesStore = useFavoritesStore()

// GraphQL query for fetching rocket details
const ROCKET_QUERY = gql`
	query GetRocket($id: ID!) {
		rocket(id: $id) {
			id
			name
			description
			first_flight
			height {
				meters
			}
			diameter {
				meters
			}
			mass {
				kg
			}
			stages
			wikipedia
		}
	}
`

// Fetch rocket data
const { data, pending, error } = useAsyncQuery<{ rocket: any }>(ROCKET_QUERY, { id: rocketId })
const rocket = computed(() => data.value?.rocket)

// Check if rocket is in favorites
const isFavorite = computed(() => favoritesStore.hasFavorite(rocket.value?.id))

// Toggle rocket in favorites
function toggleFavorite() {
	if (!rocket.value) return

	if (isFavorite.value) {
		favoritesStore.removeFavorite(rocket.value.id)
	} else {
		favoritesStore.addFavorite(rocket.value)
	}
}

// Navigation function
function goBack() {
	router.back()
}

// Format date to readable string
function formatDate(dateStr: string): string {
	if (!dateStr) return 'N/A'
	const date = new Date(dateStr)
	return date.toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
}
</script>

<style scoped>
/* Card styling */
.v-card {
	border-radius: 16px;
	overflow: hidden;
}

/* Card title styling */
.v-card-title {
	font-size: 2rem;
	font-weight: 600;
}

/* Card subtitle styling */
.v-card-subtitle {
	font-size: 1.1rem;
}

/* Card text styling */
.v-card-text {
	font-size: 1.1rem;
	line-height: 1.6;
}

/* Button styling */
.v-btn {
	font-weight: 500;
	letter-spacing: 0.5px;
	transition: transform 0.2s;
}

/* Button hover effect */
.v-btn:hover {
	transform: translateY(-1px);
}
</style>
