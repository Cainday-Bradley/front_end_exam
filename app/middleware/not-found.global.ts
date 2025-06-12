export default defineNuxtRouteMiddleware((to, from) => {
  // Check if the route exists
  if (to.matched.length === 0) {
    // Redirect to launches page
    return navigateTo('/launches')
  }
}) 