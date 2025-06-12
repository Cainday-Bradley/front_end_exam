import { defineNuxtPlugin } from '#app'
import { watch } from 'vue'
import type { PiniaPluginContext } from 'pinia'

export default defineNuxtPlugin(({ $pinia }) => {
  // Initialize IndexedDB
  const initDB = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('spacex-explorer', 1)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains('favorites')) {
          db.createObjectStore('favorites')
        }
      }
    })
  }

  // Save state to IndexedDB
  const saveState = async (storeId: string, state: any) => {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('favorites', 'readwrite')
      const store = transaction.objectStore('favorites')
      
      try {
        // Create a clean copy of the state and serialize it
        const stateToStore = {
          favorites: JSON.parse(JSON.stringify(state.favorites)),
          favoriteCount: state.favoriteCount
        }
        
        const request = store.put(stateToStore, storeId)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)
      } catch (error) {
        reject(error)
      }
    })
  }

  // Load state from IndexedDB
  const loadState = async (storeId: string) => {
    const db = await initDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('favorites', 'readonly')
      const store = transaction.objectStore('favorites')
      const request = store.get(storeId)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  // Apply the plugin to all stores
  ($pinia as any).use(({ store }: PiniaPluginContext) => {
    // Only persist the favorites store
    if (store.$id === 'favorites') {
      // Load initial state
      loadState(store.$id).then((state) => {
        if (state) {
          store.$patch(state)
        }
      })

      // Watch for changes and save to IndexedDB
      watch(
        () => store.$state,
        (state) => {
          saveState(store.$id, state)
        },
        { deep: true }
      )
    }
  })
}) 