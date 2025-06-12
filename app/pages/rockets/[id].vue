<template>
	<v-container class="py-10 d-flex justify-center">
		<v-card v-if="rocket" class="mx-auto" max-width="600" elevation="10">
			<v-card-title class="headline text-center">
				<v-icon icon="mdi-rocket" class="mr-2" />
				{{ rocket.name }}
			</v-card-title>
			<v-card-subtitle class="text-center mb-2">
				First Flight:
				<strong>{{ formatDate(rocket.first_flight) }}</strong>
			</v-card-subtitle>
			<v-card-text>
				<v-row>
					<v-col cols="12">
						<div class="mb-4">
							<strong>Description:</strong>
							<div class="text-grey-darken-1">{{ rocket.description }}</div>
						</div>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" sm="6">
						<v-list-item>
							<v-list-item-title>Height</v-list-item-title>
							<v-list-item-subtitle>
								{{ rocket.height?.meters || 'N/A' }} m
							</v-list-item-subtitle>
						</v-list-item>
					</v-col>
					<v-col cols="12" sm="6">
						<v-list-item>
							<v-list-item-title>Diameter</v-list-item-title>
							<v-list-item-subtitle>
								{{ rocket.diameter?.meters || 'N/A' }} m
							</v-list-item-subtitle>
						</v-list-item>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" sm="6">
						<v-list-item>
							<v-list-item-title>Mass</v-list-item-title>
							<v-list-item-subtitle>
                {{ rocket.mass?.kg || 'N/A' }} kg
              </v-list-item-subtitle>
						</v-list-item>
					</v-col>
					<v-col cols="12" sm="6">
						<v-list-item>
							<v-list-item-title>Stages</v-list-item-title>
							<v-list-item-subtitle>{{ rocket.stages }}</v-list-item-subtitle>
						</v-list-item>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions class="justify-space-between">
				<v-btn color="secondary" @click="goBack">
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
		<v-alert v-else type="info" class="mx-auto" max-width="600">
			<v-progress-circular indeterminate color="primary" />
			  Loading rocket details...
		</v-alert>
	</v-container>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useFavoritesStore } from '~/stores/useFavorites'

const route = useRoute()
const router = useRouter()
const rocketId = route.params.id
const favoritesStore = useFavoritesStore()

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

const { data, pending, error } = useAsyncQuery<{ rocket: any }>(ROCKET_QUERY, { id: rocketId })
const rocket = computed(() => data.value?.rocket)

const isFavorite = computed(() => favoritesStore.hasFavorite(rocket.value?.id))

function toggleFavorite() {
	if (!rocket.value) return
	
	if (isFavorite.value) {
		favoritesStore.removeFavorite(rocket.value.id)
	} else {
		favoritesStore.addFavorite(rocket.value)
	}
}

function goBack() {
	router.back()
}

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
.v-card {
	border-radius: 18px;
}
.v-list-item-title {
	font-weight: 600;
}
</style>
