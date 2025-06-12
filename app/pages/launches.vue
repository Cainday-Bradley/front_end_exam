<template>
	<v-container>
		<div class="d-flex align-center justify-space-between mb-6">
			<h2 class="d-flex align-center mb-0">
				<v-icon icon="mdi-rocket-launch" color="primary" class="mr-2" />
				SpaceX Launches
			</h2>
			<div class="d-flex align-center gap-4">
				<v-select
					v-model="selectedYear"
					:items="availableYears"
					label="Filter by Year"
					clearable
					clear-icon="mdi-close-circle"
					item-title="year"
					item-value="year"
					style="min-width: 200px"
				/>
				<v-select
					v-model="sortOrder"
					:items="sortOptions"
					label="Sort by Launch Date"
					item-title="label"
					item-value="value"
					style="min-width: 200px"
				/>
			</div>
		</div>
		<v-table v-if="sortedLaunches.length" class="launches-table">
			<thead>
				<tr>
					<th class="mission-name">Mission Name</th>
					<th class="launch-date">Launch Date</th>
					<th class="launch-site">Launch Site</th>
					<th class="rocket-name">Rocket Name</th>
					<th class="details">Details</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="launch in sortedLaunches" :key="launch.id">
					<td class="mission-name">{{ launch.mission_name }}</td>
					<td class="launch-date">{{ formatDate(launch.launch_date_utc) }}</td>
					<td class="launch-site">{{ launch.launch_site?.site_name_long || 'N/A' }}</td>
					<td class="rocket-name">
						<NuxtLink
							v-if="launch.rocket && launch.rocket.rocket_name && launch.rocket.rocket.id"
							:to="`/rockets/${launch.rocket.rocket.id}`"
							class="rocket-link"
						>
							<v-icon icon="mdi-rocket" size="small" class="mr-1" />
							{{ launch.rocket.rocket_name }}
						</NuxtLink>
						<span v-else>{{ launch.rocket?.rocket_name || 'N/A' }}</span>
					</td>
					<td class="details">{{ launch.details || 'No details available.' }}</td>
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
		minute: '2-digit'
	})
}
</script>

<style scoped>
.v-container {
	max-width: 1400px;
}

.gap-4 {
	gap: 16px;
}

.v-table {
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.v-table th {
	font-weight: 600;
	background-color: #246fc3;
	color: white;
	border-bottom: 2px solid rgb(var(--v-theme-primary));
	white-space: nowrap;
	padding: 16px;
}

.v-table td {
	padding: 16px;
	vertical-align: top;
}

/* Column width classes */
.mission-name {
	width: 15%;
	min-width: 150px;
}

.launch-date {
	width: 15%;
	min-width: 150px;
	white-space: nowrap;
}

.launch-site {
	width: 10%;
	min-width: 100px;
}

.rocket-name {
	width: 15%;
	min-width: 150px;
}

.details {
	width: 35%;
	min-width: 300px;
}

.rocket-link {
	display: inline-flex;
	align-items: center;
	color: rgb(var(--v-theme-primary));
	text-decoration: none;
	font-weight: 500;
	transition: color 0.2s;
}

.rocket-link:hover {
	color: rgb(var(--v-theme-primary-darken-1));
	text-decoration: underline;
}
</style>
