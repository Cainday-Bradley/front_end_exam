<template>
	<!-- Main container for launches page -->
	<v-container>
		<!-- Header section with filters -->
		<div class="d-flex align-center justify-space-between mb-6">
			<!-- Page title with icon -->
			<h2 class="d-flex align-center mb-0">
				<v-icon icon="mdi-rocket-launch" color="primary" class="mr-2" />
				SpaceX Launches
			</h2>
			<!-- Filter controls -->
			<div class="d-flex align-center gap-4">
				<!-- Year filter dropdown -->
				<v-select
					v-model="selectedYear"
					:items="availableYears"
					label="Filter by Year"
					clearable
					clear-icon="mdi-close-circle"
					item-title="year"
					item-value="year"
					style="min-width: 200px"/>
				<!-- Sort order dropdown -->
				<v-select
					v-model="sortOrder"
					:items="sortOptions"
					label="Sort by Launch Date"
					item-title="label"
					item-value="value"
					style="min-width: 200px"/>
			</div>
		</div>

		<!-- Launches table -->
		<v-table v-if="sortedLaunches.length" class="launches-table">
			<!-- Table header -->
			<thead>
				<tr>
					<th class="mission-name">Mission Name</th>
					<th class="launch-date">Launch Date</th>
					<th class="launch-site">Launch Site</th>
					<th class="rocket-name">Rocket Name</th>
					<th class="details">Details</th>
				</tr>
			</thead>
			<!-- Table body -->
			<tbody>
				<tr v-for="launch in sortedLaunches" :key="launch.id">
					<td class="mission-name">{{ launch.mission_name }}</td>
					<td class="launch-date">{{ formatDate(launch.launch_date_utc) }}</td>
					<td class="launch-site">{{ launch.launch_site?.site_name_long || 'N/A' }}</td>
					<!-- Rocket name with link to details if available -->
					<td class="rocket-name">
						<NuxtLink
							v-if="launch.rocket && launch.rocket.rocket_name && launch.rocket.rocket.id"
							:to="`/rockets/${launch.rocket.rocket.id}`"
							class="rocket-link">
							<v-icon icon="mdi-rocket" size="small" class="mr-1" />
							{{ launch.rocket.rocket_name }}
						</NuxtLink>
						<span v-else>{{ launch.rocket?.rocket_name || 'N/A' }}</span>
					</td>
					<td class="details">{{ launch.details || 'No details available.' }}</td>
				</tr>
			</tbody>
		</v-table>
		<!-- Empty state message -->
		<v-alert v-else type="info" class="mt-6">No launches found.</v-alert>
	</v-container>
</template>

<script lang="ts" setup>
// Import composables for filtering and sorting
import { useLaunchYearFilter } from '~/composables/useLaunchYearFilter'
import { useLaunchSort } from '~/composables/useLaunchSort'

// GraphQL query for fetching past launches
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

// Fetch launches data
const { data, pending, error } = useAsyncQuery<{ launchesPast: any[] }>(LAUNCHES_QUERY)
const launches = computed(() => data.value?.launchesPast ?? [])

// Initialize year filter
const { selectedYear, setYear, filteredLaunches, availableYears } = useLaunchYearFilter(launches)

// Sort options configuration
const sortOptions = [
	{ label: 'Newest First', value: 'desc' },
	{ label: 'Oldest First', value: 'asc' },
]

// Initialize sort functionality
const { sortOrder, setSortOrder, sortedLaunches } = useLaunchSort(filteredLaunches)

// Format date to readable string with time
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
/* Container width constraint */
.v-container {
	max-width: 1400px;
}

/* Gap utility class */
.gap-4 {
	gap: 16px;
}

/* Table styling */
.v-table {
	border-radius: 12px;
	overflow: hidden;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	background-color: rgb(var(--v-theme-surface));
}

/* Table header styling */
.v-table th {
	font-weight: 600;
	background-color: rgb(var(--v-theme-primary));
	color: rgb(var(--v-theme-on-primary));
	border-bottom: 2px solid rgb(var(--v-theme-primary-darken-1));
	white-space: nowrap;
	padding: 20px 16px;
	font-size: 0.95rem;
	letter-spacing: 0.5px;
}

/* Table cell styling */
.v-table td {
	padding: 16px;
	vertical-align: top;
	border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
	transition: background-color 0.2s ease;
	color: rgb(var(--v-theme-on-surface));
}

/* Row hover effect */
.v-table tbody tr:hover td {
	background-color: rgba(var(--v-theme-primary), 0.08);
	cursor: pointer;
}

/* Column width definitions */
.mission-name {
	width: 15%;
	min-width: 150px;
	font-weight: 500;
	color: rgb(var(--v-theme-on-surface));
}

.launch-date {
	width: 15%;
	min-width: 150px;
	white-space: nowrap;
	color: rgba(var(--v-theme-on-surface), 0.7);
}

.launch-site {
	width: 10%;
	min-width: 100px;
	color: rgba(var(--v-theme-on-surface), 0.7);
}

.rocket-name {
	width: 15%;
	min-width: 150px;
}

.details {
	width: 35%;
	min-width: 300px;
	color: rgba(var(--v-theme-on-surface), 0.7);
	line-height: 1.5;
}

/* Rocket link styling */
.rocket-link {
	display: inline-flex;
	align-items: center;
	color: rgb(var(--v-theme-primary));
	text-decoration: none;
	font-weight: 500;
	transition: all 0.2s ease;
	padding: 4px 8px;
	border-radius: 4px;
}

/* Rocket link hover effect */
.rocket-link:hover {
	color: rgb(var(--v-theme-primary-darken-1));
	background-color: rgba(var(--v-theme-primary), 0.12);
	text-decoration: none;
}

/* Empty state styling */
.v-alert {
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	background-color: rgb(var(--v-theme-surface));
}

/* Dark mode specific adjustments */
:deep(.v-theme--dark) {
	.v-table {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.v-table td {
		border-bottom-color: rgba(var(--v-theme-on-surface), 0.12);
	}

	.v-table tbody tr:hover td {
		background-color: rgba(var(--v-theme-primary), 0.12);
	}

	.v-alert {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	}
}
</style>
