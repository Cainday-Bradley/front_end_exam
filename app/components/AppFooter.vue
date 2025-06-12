<template>
  <v-footer color="grey-lighten-4" app class="pa-3">
    <v-container class="d-flex justify-center align-center">
      <span class="text-grey-darken-1 mr-2">© {{ new Date().getFullYear() }} SpaceX Explorer</span>
      <v-divider vertical class="mx-2" />
      <a href="https://www.spacex.com/" target="_blank" class="text-primary text-decoration-underline">SpaceX</a>
    </v-container>
  </v-footer>
</template>

<script setup>
// No additional logic needed
</script>

<style scoped>
.v-footer {
  border-top: 1px solid #e0e0e0;
}
</style> 