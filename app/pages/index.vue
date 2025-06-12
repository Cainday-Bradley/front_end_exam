<template>
	<!-- Main container for landing page -->
	<v-container class="py-10">
		<!-- Hero section with welcome message -->
		<v-row class="mb-10">
			<v-col cols="12" class="text-center">
				<h1 class="text-h3 font-weight-bold mb-4 d-flex align-center justify-center">
					<v-icon icon="mdi-rocket" color="primary" size="x-large" class="mr-3" />
					Welcome to SpaceX Explorer
				</h1>
				<p class="text-h6 text-grey-darken-1 mb-8">
					Explore SpaceX rockets, launches, and more in one place
				</p>
			</v-col>
		</v-row>

		<!-- Feature cards section -->
		<v-row>
			<!-- Rockets feature card -->
			<v-col cols="12" md="4">
				<v-card class="h-100" elevation="4">
					<v-card-title class="d-flex align-center">
						<v-icon icon="mdi-rocket" color="primary" size="large" class="mr-2" />
						Rockets
					</v-card-title>
					<v-card-text>
						<p class="text-body-1 mb-4">
							Discover detailed information about SpaceX's rocket fleet, including
							specifications, launch history, and more.
						</p>
						<!-- Feature list with checkmarks -->
						<v-list density="compact" class="bg-transparent">
							<v-list-item>
								<template v-slot:prepend>
									<v-icon icon="mdi-check-circle" color="success" />
								</template>
								<v-list-item-title>Detailed Specifications</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<template v-slot:prepend>
									<v-icon icon="mdi-check-circle" color="success" />
								</template>
								<v-list-item-title>Launch History</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<template v-slot:prepend>
									<v-icon icon="mdi-check-circle" color="success" />
								</template>
								<v-list-item-title>Technical Details</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-card-text>
					<v-divider />
					<!-- Navigation button -->
					<v-card-actions>
						<v-btn to="/rockets" color="primary" variant="text" class="text-none">
							Explore Rockets
							<v-icon icon="mdi-arrow-right" class="ml-1" />
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>

			<!-- Launches feature card -->
			<v-col cols="12" md="4">
				<v-card class="h-100" elevation="4">
					<v-card-title class="d-flex align-center">
						<v-icon icon="mdi-rocket-launch" color="primary" size="large" class="mr-2" />
						Launches
					</v-card-title>
					<v-card-text>
						<p class="text-body-1 mb-4">
							Stay updated with SpaceX's latest launches, 
							including mission details, launch dates, and outcomes.
						</p>
						<!-- Feature list with checkmarks -->
						<v-list density="compact" class="bg-transparent">
							<v-list-item>
								<template v-slot:prepend>
									<v-icon icon="mdi-check-circle" color="success" />
								</template>
								<v-list-item-title>Mission Information</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<template v-slot:prepend>
									<v-icon icon="mdi-check-circle" color="success" />
								</template>
								<v-list-item-title>Launch Schedule</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<template v-slot:prepend>
									<v-icon icon="mdi-check-circle" color="success" />
								</template>
								<v-list-item-title>Mission Outcomes</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-card-text>
					<v-divider />
					<!-- Navigation button -->
					<v-card-actions>
						<v-btn to="/launches" color="primary" variant="text" class="text-none">
							View Launches
							<v-icon icon="mdi-arrow-right" class="ml-1" />
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>

			<!-- Favorites feature card -->
			<v-col cols="12" md="4">
				<v-card class="h-100" elevation="4">
					<v-card-title class="d-flex align-center">
						<v-icon icon="mdi-heart" color="primary" size="large" class="mr-2" />
						Favorites
					</v-card-title>
					<v-card-text>
						<p class="text-body-1 mb-4">
							Keep track of your favorite rockets and easily 
							access their information whenever you need it.
						</p>
						<!-- Feature list with checkmarks -->
						<v-list density="compact" class="bg-transparent">
							<v-list-item>
								<template v-slot:prepend>
									<v-icon icon="mdi-check-circle" color="success" />
								</template>
								<v-list-item-title>Save Favorites</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<template v-slot:prepend>
									<v-icon icon="mdi-check-circle" color="success" />
								</template>
								<v-list-item-title>Quick Access</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<template v-slot:prepend>
									<v-icon icon="mdi-check-circle" color="success" />
								</template>
								<v-list-item-title>Manage Collection</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-card-text>
					<v-divider />
					<!-- Navigation button -->
					<v-card-actions>
						<v-btn to="/favorites" color="primary" variant="text" class="text-none">
							View Favorites
							<v-icon icon="mdi-arrow-right" class="ml-1" />
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts" setup>
// logics here for landing page if further enhance
</script>

<style scoped>
/* Card styling with hover effects */
.v-card {
	border-radius: 16px;
	overflow: hidden;
	transition:
		transform 0.2s,
		box-shadow 0.2s;
}

/* Card hover animation */
.v-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}

/* Button styling */
.v-btn {
	font-weight: 500;
	letter-spacing: 0.5px;
	transition: transform 0.2s;
}

/* Button hover animation */
.v-btn:hover {
	transform: translateY(-1px);
}

/* List item height adjustment */
.v-list-item {
	min-height: 40px;
}
</style>
