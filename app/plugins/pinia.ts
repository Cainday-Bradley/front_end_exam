import { piniaPersistencePlugin } from './pinia-persistence'
import type { Pinia } from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia
  pinia.use(piniaPersistencePlugin)
}) 