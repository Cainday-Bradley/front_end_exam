<template>
	<v-app>
		<AppNavbar />
		<v-main>
			<slot />
		</v-main>
		<AppFooter />
	</v-app>
</template>

<script>
export default {
	name: 'DefaultLayout',
}
</script>

<style>
/* Global styles for better user experience */
.v-application {
	font-family: 'Roboto', sans-serif;
}

.v-main {
	min-height: calc(100vh - 128px); /* Account for navbar and footer */
	padding: 20px 0;
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
</style>
