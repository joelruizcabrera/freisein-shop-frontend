import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware(() => {
    const userStore = useUserStore()

    // If user is already logged in, redirect to account dashboard
    if (userStore.isLoggedIn) {
        return navigateTo('/account')
    }
})