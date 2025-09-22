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
useHead({
  titleTemplate: '%s - Freisein Shop',
  meta: [
    { name: 'description', content: 'Moderner E-Commerce Shop' }
  ]
})
</script>