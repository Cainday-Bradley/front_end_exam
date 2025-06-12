<template>
  <v-container class="py-10">
    <v-row>
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between mb-6">
          <h1 class="text-h4 d-flex align-center">
            <v-icon icon="mdi-heart" color="#246fc3" size="large" class="mr-2" />
            Favorite Rockets
          </h1>
          <v-btn
            v-if="favorites.length > 0"
            color="error"
            variant="outlined"
            prepend-icon="mdi-delete"
            @click="showClearDialog = true"
          >
            Clear All
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row v-if="favorites.length > 0">
      <v-col cols="12" sm="6" md="4" v-for="rocket in favorites" :key="rocket.id">
        <v-card class="h-100" elevation="4">
          <v-card-title class="text-h6 d-flex align-center">
            <v-icon icon="mdi-rocket" color="primary" class="mr-2" />
            {{ rocket.name }}
          </v-card-title>
          <v-card-text>
            <div class="text-body-2 text-grey-darken-1 mb-4">
              {{ truncateDescription(rocket.description) }}
            </div>
            <div class="d-flex align-center">
              <v-icon icon="mdi-calendar" color="primary" class="mr-1" size="small" />
              <span class="text-caption">
                First Flight: {{ formatDate(rocket.first_flight) }}
              </span>
            </div>
          </v-card-text>
          <v-divider />
          <v-card-actions class="justify-space-between px-4 py-2">
            <v-btn
              color="primary"
              variant="text"
              :to="`/rockets/${rocket.id}`"
              size="small"
              class="text-none">
              View Details
            </v-btn>
            <v-btn
              color="error"
              variant="text"
              icon="mdi-heart-off"
              @click="removeFavorite(rocket.id)"
              size="small"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <v-alert
          type="info"
          variant="tonal"
          class="text-center py-6"
          border="start"
        >
          <v-icon icon="mdi-information" size="large" class="mr-2" />
          <div class="text-h6 mb-2">No Favorite Rockets</div>
          <div class="text-body-1">
            Visit the rockets page to add some rockets to your favorites!
          </div>
          <v-btn
            to="/rockets"
            color="primary"
            variant="text"
            class="mt-4"
          >
            <v-icon icon="mdi-rocket" class="mr-1" />
            Browse Rockets
          </v-btn>
        </v-alert>
      </v-col>
    </v-row>

    <!-- Clear All Confirmation Dialog -->
    <v-dialog v-model="showClearDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5 d-flex align-center">
          <v-icon icon="mdi-alert" color="error" class="mr-2" />
          Clear All Favorites?
        </v-card-title>
        <v-card-text class="pt-4">
          Are you sure you want to remove all rockets from your favorites? This action cannot be undone.
        </v-card-text>
        <v-card-actions class="justify-space-between px-6 py-4">
          <v-btn
            color="grey-darken-1"
            variant="text"
            @click="showClearDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            variant="text"
            @click="clearAllFavorites"
          >
            Clear All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { useFavoritesStore } from '~/stores/useFavorites'
import { ref } from 'vue'

const favoritesStore = useFavoritesStore()
const showClearDialog = ref(false)

const favorites = computed(() => favoritesStore.favoriteRockets)

function removeFavorite(rocketId: string) {
  favoritesStore.removeFavorite(rocketId)
}

function clearAllFavorites() {
  favoritesStore.clearFavorites()
  showClearDialog.value = false
}

function truncateDescription(description: string): string {
  if (!description) return ''
  return description.length > 150
    ? description.substring(0, 150) + '...'
    : description
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
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.v-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}

.v-btn {
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: transform 0.2s;
}

.v-btn:hover {
  transform: translateY(-1px);
}

.v-alert {
  border-radius: 16px;
}
</style> 