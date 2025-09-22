<template>
  <div id="app">
    <AppNotification />
    <AppHeader />
    <main class="min-h-screen bg-gray-50">
      <NuxtPage />
    </main>
    <AppFooter />
    <CartSidebar />
    <ProductQuickView />
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'

// Initialize stores
const cartStore = useCartStore()
const userStore = useUserStore()

// Global SEO
useHead({
  titleTemplate: '%s - Freisein Shop',
  meta: [
    { name: 'description', content: 'Moderner E-Commerce Shop mit Shopware Frontends' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Freisein Shop' },
    { property: 'og:description', content: 'Entdecke hochwertige Produkte in unserem Online-Shop' }
  ]
})

// Initialize cart and user data on app start
onMounted(async () => {
  await cartStore.initializeCart()
  await userStore.checkAuthStatus()
})</script>