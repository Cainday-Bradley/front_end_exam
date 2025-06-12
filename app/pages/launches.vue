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
			<v-col cols="12" sm="6" md="4">
				<v-select
					v-model="sortOrder"
					:items="sortOptions"
					label="Sort by Launch Date"
					item-title="label"
					item-value="value"
				/>
			</v-col>
		</v-row>
		<v-table v-if="sortedLaunches.length">
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
				<tr v-for="launch in sortedLaunches" :key="launch.id">
					<td>{{ launch.mission_name }}</td>
					<td>{{ formatDate(launch.launch_date_utc) }}</td>
					<td>{{ launch.launch_site?.site_name_long || 'N/A' }}</td>
					<td>
						<NuxtLink
							v-if="launch.rocket && launch.rocket.rocket_name && launch.rocket.rocket.id"
							:to="`/rockets/${launch.rocket.rocket.id}`"
							class="text-primary text-decoration-underline"
							style="cursor:pointer">
							{{ launch.rocket.rocket_name }}
						</NuxtLink>
						<span v-else>{{ launch.rocket?.rocket_name || 'N/A' }}</span>
					</td>
					<td>{{ launch.details || 'No details available.' }}</td>
				</tr>
			</tbody>
		</v-table>
		<v-alert v-else type="info" class="mt-6">No launches found.</v-alert>
	</v-container>
</template>

<script lang="ts" setup>
import { useLaunchYearFilter } from '~/composables/useLaunchYearFilter'
import { useLaunchSort } from '~/composables/useLaunchSort'

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
				rocket {
					id
				}
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

const sortOptions = [
	{ label: 'Newest First', value: 'desc' },
	{ label: 'Oldest First', value: 'asc' }
]

const { sortOrder, setSortOrder, sortedLaunches } = useLaunchSort(filteredLaunches)

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
