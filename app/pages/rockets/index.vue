<template>
  <v-container>
    <h2 class="mb-6">
      <v-icon icon="mdi-rocket" class="mr-2" />
      SpaceX Rockets
    </h2>
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="rocket in rockets" :key="rocket.id">
        <v-card class="mb-4" elevation="6">
          <v-card-title>
            <NuxtLink :to="`/rockets/${rocket.id}`" class="text-primary text-decoration-underline">
              {{ rocket.name }}
            </NuxtLink>
          </v-card-title>
          <v-card-subtitle>
            First Flight: <strong>{{ formatDate(rocket.first_flight) }}</strong>
          </v-card-subtitle>
          <v-card-text>
            {{ rocket.description.slice(0, 100) }}<span v-if="rocket.description.length > 100">...</span>
          </v-card-text>
          <v-card-actions>
            <v-btn :to="`/rockets/${rocket.id}`" color="primary" variant="outlined">View Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-alert v-if="!rockets.length" type="info">No rockets found.</v-alert>
  </v-container>
</template>

<script lang="ts" setup>
const ROCKETS_QUERY = gql`
  query GetRockets {
    rockets {
      id
      name
      description
      first_flight
    }
  }
`
const { data, pending, error } = useAsyncQuery<{ rockets: any[] }>(ROCKETS_QUERY)
const rockets = computed(() => data.value?.rockets ?? [])

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
.v-container {
  max-width: 1000px;
}
</style> 