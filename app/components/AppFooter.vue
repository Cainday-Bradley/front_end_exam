<template>
  <v-footer :color="themeStore.isDark ? 'grey-darken-4' : 'grey-lighten-4'" app class="pa-3">
    <v-container class="d-flex justify-center align-center">
      <span :class="{ 'text-grey-lighten-1': themeStore.isDark, 'text-grey-darken-1': !themeStore.isDark }" class="mr-2">
        © {{ new Date().getFullYear() }} SpaceX Explorer
      </span>
      <v-divider vertical class="mx-2" :color="themeStore.isDark ? 'grey-darken-2' : 'grey-lighten-2'" />
      <a 
        href="https://www.spacex.com/" 
        target="_blank" 
        :class="{ 'text-warning': themeStore.isDark, 'text-primary': !themeStore.isDark }" 
        class="text-decoration-underline"
      >
        SpaceX
      </a>
    </v-container>
  </v-footer>
</template>

<script lang="ts" setup>
import { useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore()
</script>

<style scoped>
.v-footer {
  border-top: 1px solid #e0e0e0;
  height: 50px;
}
</style> 