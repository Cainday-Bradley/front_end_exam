<template>
	<!-- Main navigation bar with theme-aware styling -->
	<v-app-bar
		:color="themeStore.isDark ? 'grey-darken-4' : 'white'"
		elevation="1"
		class="px-4"
		:style="{ zIndex: 1004 }">
		<!-- Mobile menu toggle button -->
		<v-app-bar-nav-icon
			icon="mdi-menu"
			:color="themeStore.isDark ? 'warning' : '#246fc3'"
			@click="drawer = !drawer"
		/>

		<!-- App title with logo -->
		<v-toolbar-title class="text-h5 font-weight-bold">
			<NuxtLink
				to="/"
				class="text-decoration-none"
				:class="{ 'text-white': themeStore.isDark, 'text-black': !themeStore.isDark }">
				<v-icon icon="mdi-rocket" :color="themeStore.isDark ? 'warning' : '#246fc3'" class="mr-2" />
				SpaceX Explorer
			</NuxtLink>
		</v-toolbar-title>

		<v-spacer />

		<!-- Desktop navigation menu -->
		<div class="d-none d-md-flex align-center">
			<!-- Navigation links with active state styling -->
			<v-btn
				v-for="item in menuItems"
				:key="item.to"
				:to="item.to"
				variant="text"
				class="text-none mx-2"
				:class="{
					'text-blue': $route.path === item.to && !themeStore.isDark,
					'text-warning': $route.path === item.to && themeStore.isDark,
					'text-grey-darken-1': $route.path !== item.to && !themeStore.isDark,
					'text-grey-lighten-1': $route.path !== item.to && themeStore.isDark,
				}">
				{{ item.title }}
			</v-btn>

			<!-- Theme toggle button -->
			<v-btn
				icon
				@click="themeStore.toggleTheme"
				class="ml-4"
				:color="themeStore.isDark ? 'warning' : 'grey-darken-1'">
				<v-icon :icon="themeStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
			</v-btn>
		</div>
	</v-app-bar>

	<!-- Mobile navigation drawer -->
	<v-navigation-drawer
		v-model="drawer"
		location="left"
		temporary
		:style="{ zIndex: 1004 }"
		@click:outside="drawer = false"
		:scrim="false"
		:color="themeStore.isDark ? 'grey-darken-4' : 'white'">
		<v-list>
			<!-- Navigation items with icons -->
			<v-list-item
				v-for="item in menuItems"
				:key="item.to"
				:to="item.to"
				:active="$route.path === item.to"
				class="mb-1"
				@click="drawer = false">
				<template v-slot:prepend>
					<v-icon :icon="item.icon" :color="themeStore.isDark ? 'warning' : '#246fc3'" />
				</template>
				<v-list-item-title :class="{ 'text-white': themeStore.isDark }">
					{{ item.title }}
				</v-list-item-title>
			</v-list-item>

			<!-- Theme toggle divider -->
			<v-divider class="my-4" :color="themeStore.isDark ? 'grey-darken-2' : 'grey-lighten-2'" />

			<!-- Theme toggle option -->
			<v-list-item @click="themeStore.toggleTheme" class="mb-1">
				<template v-slot:prepend>
					<v-icon
						:icon="themeStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
						:color="themeStore.isDark ? 'warning' : 'grey-darken-1'"/>
				</template>
				<v-list-item-title :class="{ 'text-white': themeStore.isDark }">
					{{ themeStore.isDark ? 'Light Mode' : 'Dark Mode' }}
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>

	<!-- Overlay for mobile menu -->
	<v-overlay
		v-model="drawer"
		class="align-start justify-start"
		:style="{ zIndex: 1003 }"
		:scrim="themeStore.isDark ? 'black' : 'grey-darken-3'"
		opacity="0.3"
		:persistent="false"/>
</template>

<script lang="ts" setup>
// Import required stores
import { useFavoritesStore } from '~/stores/useFavorites'
import { useThemeStore } from '~/stores/theme'

// Initialize stores
const favoritesStore = useFavoritesStore()
const favoriteCount = computed(() => favoritesStore.favoriteCount)
const themeStore = useThemeStore()

// Mobile menu state
const drawer = ref(false)

// Navigation menu items configuration
const menuItems = [
	{ title: 'Home', to: '/', icon: 'mdi-home' },
	{ title: 'Rockets', to: '/rockets', icon: 'mdi-rocket' },
	{ title: 'Launches', to: '/launches', icon: 'mdi-rocket-launch' },
	{ title: 'Favorites', to: '/favorites', icon: 'mdi-heart' },
]
</script>

<style scoped>
/* Button styling */
.v-btn {
	font-weight: 500;
	letter-spacing: 0.5px;
	transition: all 0.2s ease;
}

/* Button hover effect */
.v-btn:hover {
	background-color: rgba(36, 111, 195, 0.1) !important;
}

/* List item styling */
.v-list-item {
	border-radius: 8px;
	margin: 4px 8px;
	transition: all 0.2s ease;
}

/* List item hover effect */
.v-list-item:hover {
	background-color: rgba(36, 111, 195, 0.1) !important;
}

/* Active list item styling */
.v-list-item--active {
	background-color: rgba(36, 111, 195, 0.1) !important;
}

/* Active list item text styling */
.v-list-item--active .v-list-item-title {
	color: #246fc3 !important;
	font-weight: 500;
}

/* Overlay pointer events handling */
.v-overlay {
	pointer-events: none;
}

.v-overlay--active {
	pointer-events: auto;
}
</style>
