import { ref, computed } from 'vue'
import type { Ref } from 'vue'

export function useLaunchSort(launches: Ref<any[]>) {
  const sortOrder = ref<'asc' | 'desc'>('desc')

  const sortedLaunches = computed(() => {
    return [...launches.value].sort((a, b) => {
      const dateA = new Date(a.launch_date_utc).getTime()
      const dateB = new Date(b.launch_date_utc).getTime()
      return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
    })
  })

  function setSortOrder(order: 'asc' | 'desc') {
    sortOrder.value = order
  }

  return {
    sortOrder,
    setSortOrder,
    sortedLaunches
  }
} 