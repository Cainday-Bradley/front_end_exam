import type { PiniaPluginContext } from 'pinia'

let db: IDBDatabase | null = null

const initDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve()
      return
    }

    const request = indexedDB.open('spacex-explorer', 1)

    request.onerror = () => {
      console.error('Failed to open IndexedDB')
      reject(new Error('Failed to open IndexedDB'))
    }

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result
      resolve()
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains('favorites')) {
        db.createObjectStore('favorites')
      }
    }
  })
}

const loadState = async (storeId: string): Promise<any> => {
  if (!db) {
    await initDB()
  }

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'))
      return
    }

    const transaction = db.transaction(['favorites'], 'readonly')
    const store = transaction.objectStore('favorites')
    const request = store.get(storeId)

    request.onerror = () => {
      console.error('Failed to load state from IndexedDB')
      reject(new Error('Failed to load state from IndexedDB'))
    }

    request.onsuccess = () => {
      resolve(request.result || { favorites: [] })
    }
  })
}

const saveState = async (storeId: string, state: any): Promise<void> => {
  if (!db) {
    await initDB()
  }

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'))
      return
    }

    // Extract and serialize only the necessary data from favorites
    const serializableState = {
      favorites: (state.favorites || []).map((rocket: any) => ({
        id: rocket.id,
        name: rocket.name,
        description: rocket.description,
        flickr_images: rocket.flickr_images,
        wikipedia: rocket.wikipedia
      }))
    }

    const transaction = db.transaction(['favorites'], 'readwrite')
    const store = transaction.objectStore('favorites')
    const request = store.put(serializableState, storeId)

    request.onerror = () => {
      console.error('Failed to save state to IndexedDB')
      reject(new Error('Failed to save state to IndexedDB'))
    }

    request.onsuccess = () => {
      resolve()
    }
  })
}

const piniaPersistencePlugin = ({ store }: PiniaPluginContext) => {
  // Skip if we're on the server
  if (process.server) return

  // Skip if store is not initialized
  if (!store || !store.$id) return

  // Only handle favorites store
  if (store.$id !== 'favorites') return

  // Initialize database and load state
  initDB()
    .then(async () => {
      try {
        const savedState = await loadState(store.$id)
        if (savedState) {
          store.$patch(savedState)
        }
      } catch (error) {
        console.error('Failed to load state:', error)
      }
    })
    .catch((error) => {
      console.error('Failed to initialize IndexedDB:', error)
    })

  // Subscribe to store changes
  store.$subscribe(
    async (mutation, state) => {
      try {
        await saveState(store.$id, state)
      } catch (error) {
        console.error('Failed to save state:', error)
      }
    },
    { detached: true }
  )
}

export default piniaPersistencePlugin 