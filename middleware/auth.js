import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware((to) => {
    const userStore = useUserStore()

    // Check if user is authenticated
    if (!userStore.isLoggedIn) {
        // Save the intended destination
        const redirectPath = to.fullPath

        // Redirect to login with return URL
        return navigateTo({
            path: '/auth/login',
            query: { redirect: redirectPath }
        })
    }
})