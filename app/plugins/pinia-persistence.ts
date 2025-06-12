import type { PiniaPluginContext } from 'pinia'

const DB_NAME = 'spacex-explorer-db'
const DB_VERSION = 1
const STORE_NAME = 'pinia-state'

export function piniaPersistencePlugin({ store }: PiniaPluginContext) {
  // Initialize IndexedDB
  const request = indexedDB.open(DB_NAME, DB_VERSION)

  request.onerror = (event) => {
    console.error('IndexedDB error:', event)
  }

  request.onupgradeneeded = (event) => {
    const db = (event.target as IDBOpenDBRequest).result
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME)
    }
  }

  // Load state from IndexedDB
  request.onsuccess = (event) => {
    const db = (event.target as IDBOpenDBRequest).result
    const transaction = db.transaction(STORE_NAME, 'readonly')
    const objectStore = transaction.objectStore(STORE_NAME)
    const getRequest = objectStore.get(store.$id)

    getRequest.onsuccess = () => {
      if (getRequest.result) {
        store.$patch(getRequest.result)
      }
    }
  }

  // Subscribe to store changes
  store.$subscribe((mutation, state) => {
    const db = request.result
    if (db) {
      const transaction = db.transaction(STORE_NAME, 'readwrite')
      const objectStore = transaction.objectStore(STORE_NAME)
      objectStore.put(state, store.$id)
    }
  })
} 