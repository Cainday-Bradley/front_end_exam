<template>
	<v-container>
		<h2 class="mb-6">
			<v-icon icon="mdi-rocket-launch" class="mr-2" />
			SpaceX Launches
		</h2>
		<v-row class="mb-4">
			<v-col cols="12" sm="6" md="4">
				<v-select
					v-model="selectedYear"
					:items="availableYears"
					label="Filter by Year"
					clearable
					clear-icon="mdi-close-circle"
					item-title="year"
					item-value="year"/>
			</v-col>
		</v-row>
		<v-table v-if="filteredLaunches.length">
			<thead>
				<tr>
					<th class="text-left">Mission Name</th>
					<th class="text-left">Launch Date</th>
					<th class="text-left">Launch Site</th>
					<th class="text-left">Rocket Name</th>
					<th class="text-left">Details</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="launch in filteredLaunches" :key="launch.id">
					<td>{{ launch.mission_name }}</td>
					<td>{{ formatDate(launch.launch_date_utc) }}</td>
					<td>{{ launch.launch_site?.site_name_long || 'N/A' }}</td>
					<td>{{ launch.rocket?.rocket_name || 'N/A' }}</td>
					<td>{{ launch.details || 'No details available.' }}</td>
				</tr>
			</tbody>
		</v-table>
		<v-alert v-else type="info" class="mt-6">No launches found.</v-alert>
	</v-container>
</template>

<script lang="ts" setup>
import { useLaunchYearFilter } from '~/composables/useLaunchYearFilter'

const LAUNCHES_QUERY = gql`
	query GetLaunches {
		launchesPast(limit: 50, sort: "launch_date_utc", order: "desc") {
			id
			mission_name
			launch_date_utc
			launch_site {
				site_name_long
			}
			rocket {
				rocket_name
			}
			details
		}
	}
`

const { data, pending, error } = useAsyncQuery<{ launchesPast: any[] }>(LAUNCHES_QUERY)
const launches = computed(() => data.value?.launchesPast ?? [])

const {
	selectedYear,
	setYear,
	filteredLaunches,
	availableYears
} = useLaunchYearFilter(launches)

function formatDate(dateStr: string): string {
	const date = new Date(dateStr)
	return date.toLocaleString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}
</script>

<style scoped>
.v-container {
	max-width: 1000px;
}
</style>
