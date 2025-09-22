import { useCartStore } from '~/stores/cart'

export default defineNuxtRouteMiddleware(() => {
    const cartStore = useCartStore()
    const { $notify } = useNuxtApp()

    // Check if cart is empty
    if (cartStore.isEmpty) {
        $notify.error('Dein Warenkorb ist leer. Füge Artikel hinzu, um fortzufahren.')

        // Redirect to cart page
        return navigateTo('/cart')
    }
})