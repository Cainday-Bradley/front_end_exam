import piniaPersistencePlugin from './pinia-persistence'
import type { Pinia } from 'pinia'

export default defineNuxtPlugin({
  name: 'pinia-persistence',
  enforce: 'pre',
  async setup(nuxtApp) {
    // Skip if we're on the server
    if (process.server) return

    // Wait for Pinia to be ready
    await nuxtApp.$pinia
    const pinia = nuxtApp.$pinia as Pinia
    if (pinia) {
      pinia.use(piniaPersistencePlugin)
    }
  }
}) 