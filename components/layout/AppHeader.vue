<template>
  <header class="bg-white shadow-sm">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">ShopwareFrontends</h1>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <NuxtLink
                to="/"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                active-class="bg-gray-100"
            >
              Home
            </NuxtLink>
            <NuxtLink
                to="/products"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                active-class="bg-gray-100"
            >
              Produkte
            </NuxtLink>
            <NuxtLink
                to="/categories"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                active-class="bg-gray-100"
            >
              Kategorien
            </NuxtLink>
          </div>
        </div>

        <!-- Search -->
        <div class="flex-1 max-w-xs mx-4">
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
                v-model="searchQuery"
                @keyup.enter="search"
                type="search"
                placeholder="Produkte suchen..."
                class="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <!-- User actions -->
        <div class="flex items-center space-x-4">
          <!-- User menu -->
          <div class="relative">
            <button
                @click="showUserMenu = !showUserMenu"
                class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">Open user menu</span>
              <UserIcon class="h-6 w-6 text-gray-400" />
            </button>
          </div>

          <!-- Cart -->
          <button
              @click="toggleCart"
              class="relative rounded-md p-2 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Warenkorb öffnen</span>
            <ShoppingBagIcon class="h-6 w-6" aria-hidden="true" />
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
import { useCart } from '@shopware-pwa/composables-next'
import { MagnifyingGlassIcon, UserIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const { count: cartCount } = useCart()

const searchQuery = ref('')
const showUserMenu = ref(false)

const search = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { search: searchQuery.value.trim() }
    })
  }
}

const toggleCart = () => {
  // Emit event to show cart sidebar
  const event = new CustomEvent('toggleCart')
  window.dispatchEvent(event)
}
</script>