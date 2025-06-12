<template>
  <v-app-bar color="primary" elevation="2" class="px-0">
    <v-container class="d-flex align-center">
      <NuxtLink to="/" class="text-decoration-none">
        <v-app-bar-title class="text-white d-flex align-center">
          <v-icon icon="mdi-rocket" size="large" class="mr-2" />
          <span class="text-h5 font-weight-bold">SpaceX Rockets</span>
        </v-app-bar-title>
      </NuxtLink>

      <v-spacer />

      <div class="d-flex align-center">
        <v-btn to="/launches" variant="text" class="text-white mx-2">
          <v-icon icon="mdi-rocket-launch" class="mr-1" />
          Launches
        </v-btn>
        <v-btn to="/rockets" variant="text" class="text-white mx-2">
          <v-icon icon="mdi-rocket" class="mr-1" />
          Rockets
        </v-btn>
        <v-btn
          to="/favorites"
          color="white"
          variant="text"
          class="mx-2"
        >
          <v-icon icon="mdi-heart" class="mr-1" />
          Favorites
          <v-badge
            :content="favoriteCount"
            :model-value="favoriteCount > 0"
            color="error"
            class="ml-2"
          />
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useFavoritesStore } from '~/stores/useFavorites'

const favoritesStore = useFavoritesStore()
const favoriteCount = computed(() => favoritesStore.favoriteCount)
</script>

<style scoped>
.v-app-bar {
  backdrop-filter: blur(10px);
  background-color: rgba(var(--v-theme-primary), 0.95) !important;
}

.v-btn {
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: transform 0.2s;
}

.v-btn:hover {
  transform: translateY(-1px);
}
</style> 