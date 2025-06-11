import { ref, computed } from 'vue'

export function useLaunchYearFilter(launches: Ref<any[]>) {
  const selectedYear = ref<string | null>(null)

  const filteredLaunches = computed(() => {
    if (!selectedYear.value) return launches.value
    return launches.value.filter(launch => {
      if (!launch.launch_date_utc) return false
      const year = new Date(launch.launch_date_utc).getFullYear().toString()
      return year === selectedYear.value
    })
  })

  function setYear(year: string | null) {
    selectedYear.value = year
  }

  // Extract unique years from launches
  const availableYears = computed(() => {
    const years = launches.value.map(l => {
      if (!l.launch_date_utc) return null
      return new Date(l.launch_date_utc).getFullYear().toString()
    }).filter(Boolean)
    return Array.from(new Set(years)).sort((a, b) => Number(b) - Number(a))
  })

  return {
    selectedYear,
    setYear,
    filteredLaunches,
    availableYears
  }
} 