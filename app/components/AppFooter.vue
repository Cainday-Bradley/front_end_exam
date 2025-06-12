<template>
	<!-- Footer with dynamic background color based on theme -->
	<v-footer :color="themeStore.isDark ? 'grey-darken-4' : 'grey-lighten-4'" app class="pa-3">
		<v-container class="d-flex justify-center align-center">
			<!-- Copyright text with dynamic color -->
			<span
				:class="{
					'text-grey-lighten-1': themeStore.isDark,
					'text-grey-darken-1': !themeStore.isDark,
				}"
				class="mr-2">
				© {{ new Date().getFullYear() }} SpaceX Explorer
			</span>
			<!-- Vertical divider with theme-aware color -->
			<v-divider
				vertical
				class="mx-2"
				:color="themeStore.isDark ? 'grey-darken-2' : 'grey-lighten-2'"
			/>
			<!-- External link to SpaceX website with theme-aware color -->
			<a
				href="https://www.spacex.com/"
				target="_blank"
				:class="{ 'text-warning': themeStore.isDark, 'text-primary': !themeStore.isDark }"
				class="text-decoration-underline">
				SpaceX
			</a>
		</v-container>
	</v-footer>
</template>

<script lang="ts" setup>
// Import theme store for dark/light mode functionality
import { useThemeStore } from '~/stores/theme'

// Initialize theme store
const themeStore = useThemeStore()
</script>

<style scoped>
/* Footer styling */
.v-footer {
	border-top: 1px solid #e0e0e0;
	height: 50px;
}
</style>
