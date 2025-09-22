<template>
  <header class="bg-white shadow-sm">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Freisein Shop</h1>
          </NuxtLink>
        </div>

        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <NuxtLink
                to="/"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              Home
            </NuxtLink>
            <NuxtLink
                to="/products"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              Produkte
            </NuxtLink>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <button
              @click="toggleCart"
              class="relative rounded-md p-2 text-gray-400 hover:text-gray-500"
          >
            <ShoppingBagIcon class="h-6 w-6" />
            <span
                v-if="cartCount > 0"
                class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white"
            >
              {{ cartCount }}
            </span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'

const cartCount = ref(0)

const toggleCart = () => {
  const event = new CustomEvent('toggleCart')
  window.dispatchEvent(event)
}

onMounted(() => {
  window.addEventListener('product-added', () => {
    cartCount.value++
  })
})
</script>