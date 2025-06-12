import { ref, computed } from 'vue'

/* Composable for filtering launches by year */ 
export function useLaunchYearFilter(launches: Ref<any[]>) {
	// Track currently selected year for filtering
	const selectedYear = ref<string | null>(null)

	// Computed property that returns launches filtered by selected year
	const filteredLaunches = computed(() => {
		// Return all launches if no year is selected
		if (!selectedYear.value) return launches.value
		// Filter launches by matching year
		return launches.value.filter((launch) => {
			if (!launch.launch_date_utc) return false
			const year = new Date(launch.launch_date_utc).getFullYear().toString()
			return year === selectedYear.value
		})
	})

	// Function to update the selected year filter
	function setYear(year: string | null) {
		selectedYear.value = year
	}

	// Computed property that extracts and sorts unique years from launches
	const availableYears = computed(() => {
		// Extract years from launch dates and remove duplicates
		const years = launches.value
			.map((l) => {
				if (!l.launch_date_utc) return null
				return new Date(l.launch_date_utc).getFullYear().toString()
			})
			.filter(Boolean)
		// Sort years in descending order
		return Array.from(new Set(years)).sort((a, b) => Number(b) - Number(a))
	})

	return {
		selectedYear,
		setYear,
		filteredLaunches,
		availableYears,
	}
}
