import { ref, computed } from 'vue'
import type { Ref } from 'vue'

export function useLaunchSort(launches: Ref<any[]>) {
	// Track current sort order (ascending or descending)
	const sortOrder = ref<'asc' | 'desc'>('desc')

	// Computed property that returns sorted launches based on launch date
	const sortedLaunches = computed(() => {
		return [...launches.value].sort((a, b) => {
			// Convert launch dates to timestamps for comparison
			const dateA = new Date(a.launch_date_utc).getTime()
			const dateB = new Date(b.launch_date_utc).getTime()
			// Sort based on current sort order
			return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
		})
	})

	/* Updates the sort order */
	function setSortOrder(order: 'asc' | 'desc') {
		sortOrder.value = order
	}

	return {
		sortOrder,
		setSortOrder,
		sortedLaunches,
	}
}
