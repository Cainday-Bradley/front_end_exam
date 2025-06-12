import { defineNuxtPlugin } from '#app'
import { watch } from 'vue'
import type { PiniaPluginContext } from 'pinia'

// Define Nuxt plugin for Pinia state persistence
export default defineNuxtPlugin(({ $pinia }) => {
  // Initialize IndexedDB database connection
  const initDB = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      // Open database with version 1
      const request = indexedDB.open('spacex-explorer', 1)

      // Handle database errors
      request.onerror = () => reject(request.error)
      // Handle successful connection
      request.onsuccess = () => resolve(request.result)

      // Handle database schema updates
      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result
        // Create favorites store if it doesn't exist
        if (!db.objectStoreNames.contains('favorites')) {
          db.createObjectStore('favorites')
        }
      }
    })
  }

  // Save store state to IndexedDB
  const saveState = async (storeId: string, state: any) => {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      // Create a readwrite transaction
      const transaction = db.transaction('favorites', 'readwrite')
      const store = transaction.objectStore('favorites')
      
      try {
        // Create a clean copy of the state and serialize it
        const stateToStore = {
          favorites: JSON.parse(JSON.stringify(state.favorites)),
          favoriteCount: state.favoriteCount
        }
        
        // Store the serialized state
        const request = store.put(stateToStore, storeId)

        // Handle storage errors
        request.onerror = () => reject(request.error)
        // Handle successful storage
        request.onsuccess = () => resolve(request.result)
      } catch (error) {
        reject(error)
      }
    })
  }

  // Load store state from IndexedDB
  const loadState = async (storeId: string) => {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      // Create a readonly transaction
      const transaction = db.transaction('favorites', 'readonly')
      const store = transaction.objectStore('favorites')
      // Retrieve stored state
      const request = store.get(storeId)

      // Handle retrieval errors
      request.onerror = () => reject(request.error)
      // Handle successful retrieval
      request.onsuccess = () => resolve(request.result)
    })
  }

  // Apply the persistence plugin to Pinia stores
  ($pinia as any).use(({ store }: PiniaPluginContext) => {
    // Only persist the favorites store
    if (store.$id === 'favorites') {
      // Load initial state from IndexedDB
      loadState(store.$id).then((state) => {
        if (state) {
          // Update store with persisted state
          store.$patch(state)
        }
      })

      // Watch for state changes and save to IndexedDB
      watch(
        () => store.$state,
        (state) => {
          saveState(store.$id, state)
        },
        { deep: true } // Watch nested state changes
      )
    }
  })
}) 