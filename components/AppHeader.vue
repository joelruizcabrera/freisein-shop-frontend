<template>
  <header class="bg-white shadow-sm sticky top-0 z-40">
    <!-- Top bar -->
    <div class="bg-indigo-600">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-10 text-sm">
          <div class="flex items-center space-x-6 text-white">
            <span class="flex items-center">
              <TruckIcon class="h-4 w-4 mr-1" />
              Kostenloser Versand ab 50€
            </span>
            <span class="hidden sm:flex items-center">
              <PhoneIcon class="h-4 w-4 mr-1" />
              Hotline: 0800 123 456
            </span>
          </div>
          <div class="flex items-center space-x-4 text-white">
            <NuxtLink
                to="/help"
                class="hover:text-indigo-200 transition-colors duration-200"
            >
              Hilfe
            </NuxtLink>
            <span class="text-indigo-300">|</span>
            <NuxtLink
                to="/contact"
                class="hover:text-indigo-200 transition-colors duration-200"
            >
              Kontakt
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Main header -->
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <span class="text-white font-bold text-lg">F</span>
              </div>
              <span class="text-2xl font-bold text-gray-900">Freisein</span>
              <span class="text-sm text-gray-500 ml-1">Shop</span>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <NuxtLink
                to="/"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                :class="{ 'bg-gray-100': $route.path === '/' }"
            >
              Home
            </NuxtLink>
            <div class="relative group">
              <button
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors duration-200 flex items-center"
              >
                Produkte
                <ChevronDownIcon class="h-4 w-4 ml-1" />
              </button>
              <!-- Dropdown Menu -->
              <div class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-1">
                  <NuxtLink
                      to="/products"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Alle Produkte
                  </NuxtLink>
                  <NuxtLink
                      to="/categories"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Kategorien
                  </NuxtLink>
                  <NuxtLink
                      to="/products?sort=created-desc"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Neuheiten
                  </NuxtLink>
                  <NuxtLink
                      to="/products?sort=topseller"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Bestseller
                  </NuxtLink>
                </div>
              </div>
            </div>
            <NuxtLink
                to="/about"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                :class="{ 'bg-gray-100': $route.path === '/about' }"
            >
              Über uns
            </NuxtLink>
            <NuxtLink
                to="/contact"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                :class="{ 'bg-gray-100': $route.path === '/contact' }"
            >
              Kontakt
            </NuxtLink>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="flex-1 max-w-lg mx-4">
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
                v-model="searchQuery"
                @keyup.enter="performSearch"
                @focus="showSearchSuggestions = true"
                @blur="hideSearchSuggestions"
                type="search"
                placeholder="Produkte suchen..."
                class="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <!-- Search Suggestions -->
            <div
                v-if="showSearchSuggestions && (searchSuggestions.length > 0 || searchQuery.length > 0)"
                class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto"
            >
              <!-- Search suggestions -->
              <div v-if="searchSuggestions.length > 0" class="py-2">
                <div class="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Vorschläge
                </div>
                <button
                    v-for="suggestion in searchSuggestions"
                    :key="suggestion.id"
                    @mousedown="selectSuggestion(suggestion)"
                    class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  <img
                      :src="suggestion.cover?.url || '/placeholder.jpg'"
                      :alt="suggestion.name"
                      class="w-8 h-8 rounded object-cover mr-3"
                  />
                  <span class="truncate">{{ suggestion.name }}</span>
                </button>
              </div>

              <!-- Search button -->
              <div v-if="searchQuery.length > 0" class="border-t border-gray-200 py-2">
                <button
                    @mousedown="performSearch"
                    class="flex items-center w-full px-3 py-2 text-sm text-indigo-600 hover:bg-gray-100 text-left"
                >
                  <MagnifyingGlassIcon class="h-4 w-4 mr-3" />
                  Suche nach "{{ searchQuery }}"
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- User Actions -->
        <div class="flex items-center space-x-4">
          <!-- User menu -->
          <div class="relative">
            <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="sr-only">Open user menu</span>
              <UserIcon class="h-6 w-6 text-gray-600 hover:text-gray-900" />
            </button>

            <!-- User dropdown -->
            <div
                v-if="showUserMenu"
                v-click-outside="() => showUserMenu = false"
                class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
            >
              <div class="py-1">
                <template v-if="userStore.isLoggedIn">
                  <div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    Hallo, {{ userStore.customer?.firstName }}!
                  </div>
                  <NuxtLink
                      to="/account"
                      @click="showUserMenu = false"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mein Konto
                  </NuxtLink>
                  <NuxtLink
                      to="/account/orders"
                      @click="showUserMenu = false"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Meine Bestellungen
                  </NuxtLink>
                  <NuxtLink
                      to="/account/wishlist"
                      @click="showUserMenu = false"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Wunschliste
                  </NuxtLink>
                  <button
                      @click="logout"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Abmelden
                  </button>
                </template>
                <template v-else>
                  <NuxtLink
                      to="/auth/login"
                      @click="showUserMenu = false"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Anmelden
                  </NuxtLink>
                  <NuxtLink
                      to="/auth/register"
                      @click="showUserMenu = false"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Registrieren
                  </NuxtLink>
                </template>
              </div>
            </div>
          </div>

          <!-- Wishlist -->
          <NuxtLink
              to="/account/wishlist"
              class="relative rounded-md p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <HeartIcon class="h-6 w-6" />
            <span
                v-if="wishlistCount > 0"
                class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white"
            >
              {{ wishlistCount }}
            </span>
          </NuxtLink>

          <!-- Cart -->
          <button
              @click="toggleCart"
              class="relative rounded-md p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ShoppingBagIcon class="h-6 w-6" />
            <span
                v-if="cartStore.count > 0"
                class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white"
            >
              {{ cartStore.count }}
            </span>
          </button>

          <!-- Mobile menu button -->
          <button
              @click="showMobileMenu = !showMobileMenu"
              class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!showMobileMenu" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
              to="/"
              @click="showMobileMenu = false"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Home
          </NuxtLink>
          <NuxtLink
              to="/products"
              @click="showMobileMenu = false"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Alle Produkte
          </NuxtLink>
          <NuxtLink
              to="/categories"
              @click="showMobileMenu = false"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Kategorien
          </NuxtLink>
          <NuxtLink
              to="/about"
              @click="showMobileMenu = false"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Über uns
          </NuxtLink>
          <NuxtLink
              to="/contact"
              @click="showMobileMenu = false"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Kontakt
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  TruckIcon,
  PhoneIcon
} from '@heroicons/vue/24/outline'
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'

// Stores
const cartStore = useCartStore()
const userStore = useUserStore()

// Router
const router = useRouter()

// Data
const searchQuery = ref('')
const searchSuggestions = ref([])
const showSearchSuggestions = ref(false)
const showUserMenu = ref(false)
const showMobileMenu = ref(false)
const wishlistCount = ref(0)

// API
const { $shopwareApi } = useNuxtApp()

// Search functionality
let searchTimeout = null

watch(searchQuery, async (newQuery) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  if (newQuery.length >= 2) {
    searchTimeout = setTimeout(async () => {
      await loadSearchSuggestions(newQuery)
    }, 300)
  } else {
    searchSuggestions.value = []
  }
})

const loadSearchSuggestions = async (query) => {
  try {
    const response = await $shopwareApi('/product', {
      method: 'POST',
      body: {
        limit: 5,
        filter: [
          {
            type: 'contains',
            field: 'name',
            value: query
          }
        ],
        associations: {
          cover: {}
        }
      }
    })

    searchSuggestions.value = response.elements || []
  } catch (error) {
    console.error('Failed to load search suggestions:', error)
    searchSuggestions.value = []
  }
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    showSearchSuggestions.value = false
    router.push({
      path: '/products',
      query: { search: searchQuery.value.trim() }
    })
  }
}

const selectSuggestion = (suggestion) => {
  showSearchSuggestions.value = false
  router.push(`/products/${suggestion.id}`)
}

const hideSearchSuggestions = () => {
  setTimeout(() => {
    showSearchSuggestions.value = false
  }, 200)
}

const toggleCart = () => {
  const event = new CustomEvent('toggleCart')
  window.dispatchEvent(event)
}

const logout = async () => {
  showUserMenu.value = false
  await userStore.logout()
}

// Click outside directive
const vClickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>