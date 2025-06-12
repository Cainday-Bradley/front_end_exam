<template>
  <v-app-bar color="primary" dark elevate-on-scroll app>
    <v-container class="d-flex align-center">
      <NuxtLink to="/" class="text-white text-h6 text-decoration-none mr-8">
        <v-icon icon="mdi-rocket-launch" class="mr-2" /> SpaceX Explorer
      </NuxtLink>
      <v-spacer />
      <v-btn to="/" variant="text" class="text-white" exact>Home</v-btn>
      <v-btn to="/launches" variant="text" class="text-white">Launches</v-btn>
      <v-btn to="/rockets" variant="text" class="text-white">Rockets</v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup>
// No additional logic needed
</script>

<style scoped>
.v-app-bar {
  border-bottom: 1px solid #1976d2;
}
</style> 