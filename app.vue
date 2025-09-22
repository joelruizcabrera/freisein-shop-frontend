<template>
  <div id="app">
    <AppHeader />
    <main class="min-h-screen">
      <NuxtPage />
    </main>
    <AppFooter />
    <CartSidebar />
  </div>
</template>

<script setup>
// Global SEO
useHead({
  titleTemplate: '%s - Shopware Store',
  meta: [
    { name: 'description', content: 'Moderner E-Commerce Shop mit Shopware Frontends' }
  ]
})
</script>