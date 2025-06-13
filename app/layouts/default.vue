<template>
	<v-app :theme="themeStore.isDark ? 'dark' : 'light'">
		<AppNavbar />
		<v-main class="main-content">
			<slot />
		</v-main>
		<AppFooter />
	</v-app>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
	themeStore.initTheme()
})
</script>

<style>
/* Global styles for better user experience */
.v-application {
	font-family: 'Roboto', sans-serif;
}

/* Main content area styling */
.main-content {
	min-height: calc(100vh - 128px); /* Account for navbar and footer */
	padding-top: 64px !important; /* Height of the app bar */
}

/* Smooth transitions for all interactive elements */
.v-btn,
.v-card,
.v-list-item {
	transition: all 0.3s ease;
}

/* Hover effects for better interactivity */
.v-btn:hover {
	transform: translateY(-1px);
}

.v-card:hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
}

/* Consistent spacing */
.v-container {
	padding: 16px;
}

/* Better typography */
h1, h2, h3, h4, h5, h6 {
	font-weight: 500;
	line-height: 1.2;
}

/* Improved link styles */
a {
	text-decoration: none;
	transition: color 0.3s ease;
}

a:hover {
	text-decoration: underline;
}

/* Ensure app bar stays on top */
.v-app-bar {
	position: fixed !important;
	z-index: 1000 !important;
}

/* Ensure main content doesn't overlap with app bar */
.v-main {
	position: relative;
	z-index: 1;
}
</style>
