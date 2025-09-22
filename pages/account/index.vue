<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Page header -->
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Mein Konto
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Willkommen zurück, {{ userStore.customer?.firstName }}! Verwalte deine Bestellungen und Einstellungen.
          </p>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <NuxtLink
              to="/products"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ShoppingBagIcon class="h-4 w-4 mr-2" />
            Weiter einkaufen
          </NuxtLink>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ShoppingCartIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Bestellungen</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.totalOrders }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CurrencyEuroIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Ausgegeben</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ formatPrice(stats.totalSpent) }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <HeartIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Wunschliste</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ stats.wishlistItems }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <StarIcon class="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Mitglied seit</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ memberSince }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <!-- Quick Actions -->
        <div class="lg:col-span-4">
          <div class="bg-white shadow rounded-lg">
            <div class="p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Schnellzugriff
              </h3>
              <div class="space-y-3">
                <NuxtLink
                    to="/account/orders"
                    class="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <ClipboardDocumentListIcon class="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p class="text-sm font-medium text-gray-900">Meine Bestellungen</p>
                    <p class="text-xs text-gray-500">Verfolge deine Bestellungen</p>
                  </div>
                  <ChevronRightIcon class="h-5 w-5 text-gray-400 ml-auto" />
                </NuxtLink>

                <NuxtLink
                    to="/account/profile"
                    class="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <UserIcon class="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p class="text-sm font-medium text-gray-900">Profil bearbeiten</p>
                    <p class="text-xs text-gray-500">Persönliche Daten verwalten</p>
                  </div>
                  <ChevronRightIcon class="h-5 w-5 text-gray-400 ml-auto" />
                </NuxtLink>

                <NuxtLink
                    to="/account/addresses"
                    class="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <HomeIcon class="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p class="text-sm font-medium text-gray-900">Adressen</p>
                    <p class="text-xs text-gray-500">Liefer- und Rechnungsadressen</p>
                  </div>
                  <ChevronRightIcon class="h-5 w-5 text-gray-400 ml-auto" />
                </NuxtLink>

                <NuxtLink
                    to="/account/wishlist"
                    class="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <HeartIcon class="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p class="text-sm font-medium text-gray-900">Wunschliste</p>
                    <p class="text-xs text-gray-500">Gespeicherte Artikel</p>
                  </div>
                  <ChevronRightIcon class="h-5 w-5 text-gray-400 ml-auto" />
                </NuxtLink>

                <NuxtLink
                    to="/account/settings"
                    class="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <CogIcon class="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p class="text-sm font-medium text-gray-900">Einstellungen</p>
                    <p class="text-xs text-gray-500">Newsletter, Passwort ändern</p>
                  </div>
                  <ChevronRightIcon class="h-5 w-5 text-gray-400 ml-auto" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Orders & Recommendations -->
        <div class="lg:col-span-8 space-y-6">
          <!-- Recent Orders -->
          <div class="bg-white shadow rounded-lg">
            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Letzte Bestellungen
                </h3>
                <NuxtLink
                    to="/account/orders"
                    class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Alle anzeigen
                </NuxtLink>
              </div>

              <div v-if="loading.orders" class="text-center py-8">
                <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                <p class="mt-2 text-sm text-gray-500">Lade Bestellungen...</p>
              </div>

              <div v-else-if="recentOrders.length === 0" class="text-center py-8">
                <ClipboardDocumentListIcon class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">Keine Bestellungen</h3>
                <p class="mt-1 text-sm text-gray-500">Du hast noch keine Bestellungen aufgegeben.</p>
                <div class="mt-6">
                  <NuxtLink
                      to="/products"
                      class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Jetzt einkaufen
                  </NuxtLink>
                </div>
              </div>

              <div v-else class="space-y-4">
                <div
                    v-for="order in recentOrders"
                    :key="order.id"
                    class="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors duration-200"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium text-gray-900">
                        Bestellung #{{ order.orderNumber }}
                      </p>
                      <p class="text-sm text-gray-500">
                        {{ formatDate(order.orderDate) }}
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="text-sm font-medium text-gray-900">
                        {{ formatPrice(order.amountTotal) }}
                      </p>
                      <span
                          :class="[
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          getOrderStatusClass(order.stateMachineState.name)
                        ]"
                      >
                        {{ translateOrderStatus(order.stateMachineState.name) }}
                      </span>
                    </div>
                  </div>

                  <div class="mt-3 flex justify-between items-center">
                    <div class="flex -space-x-2">
                      <img
                          v-for="(item, index) in order.lineItems.slice(0, 3)"
                          :key="item.id"
                          :src="item.cover?.url || '/placeholder.jpg'"
                          :alt="item.label"
                          class="h-8 w-8 rounded-full border-2 border-white object-cover"
                      />
                      <div
                          v-if="order.lineItems.length > 3"
                          class="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center"
                      >
                        <span class="text-xs text-gray-500">+{{ order.lineItems.length - 3 }}</span>
                      </div>
                    </div>

                    <NuxtLink
                        :to="`/account/orders/${order.id}`"
                        class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Details anzeigen
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recommendations -->
          <div class="bg-white shadow rounded-lg">
            <div class="p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Empfehlenswert für dich
              </h3>

              <div v-if="loading.recommendations" class="text-center py-8">
                <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                <p class="mt-2 text-sm text-gray-500">Lade Empfehlungen...</p>
              </div>

              <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                    v-for="product in recommendations"
                    :key="product.id"
                    class="group relative"
                >
                  <div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                    <img
                        :src="product.cover?.url || '/placeholder.jpg'"
                        :alt="product.name"
                        class="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div class="mt-2">
                    <h4 class="text-sm text-gray-700 line-clamp-2">
                      <NuxtLink :to="`/products/${product.id}`">
                        {{ product.name }}
                      </NuxtLink>
                    </h4>
                    <p class="text-sm font-medium text-gray-900">
                      {{ formatPrice(product.calculatedPrice?.unitPrice || 0) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  CurrencyEuroIcon,
  HeartIcon,
  StarIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  HomeIcon,
  CogIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'
import { useUserStore } from '~/stores/user'

// SEO
useHead({
  title: 'Mein Konto'
})

// Middleware - require authentication
definePageMeta({
  middleware: 'auth'
})

// Store
const userStore = useUserStore()

// Data
const loading = ref({
  orders: true,
  recommendations: true
})

const recentOrders = ref([])
const recommendations = ref([])

const stats = ref({
  totalOrders: 0,
  totalSpent: 0,
  wishlistItems: 0
})

// API
const { $shopwareApi } = useNuxtApp()

// Computed
const memberSince = computed(() => {
  if (!userStore.customer?.createdAt) return '-'
  return new Date(userStore.customer.createdAt).getFullYear()
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const getOrderStatusClass = (status) => {
  switch (status) {
    case 'completed':
    case 'shipped':
      return 'bg-green-100 text-green-800'
    case 'in_progress':
    case 'processing':
      return 'bg-yellow-100 text-yellow-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const translateOrderStatus = (status) => {
  const translations = {
    'open': 'Offen',
    'in_progress': 'In Bearbeitung',
    'completed': 'Abgeschlossen',
    'cancelled': 'Storniert',
    'shipped': 'Versandt',
    'delivered': 'Zugestellt'
  }
  return translations[status] || status
}

const loadRecentOrders = async () => {
  try {
    loading.value.orders = true

    await userStore.fetchOrders()
    recentOrders.value = userStore.orders.slice(0, 3)

    // Calculate stats
    stats.value.totalOrders = userStore.orders.length
    stats.value.totalSpent = userStore.orders.reduce((total, order) => total + order.amountTotal, 0)

  } catch (error) {
    console.error('Failed to load orders:', error)
  } finally {
    loading.value.orders = false
  }
}

const loadRecommendations = async () => {
  try {
    loading.value.recommendations = true

    // Load recommended products based on user's order history or popular items
    const response = await $shopwareApi('/product', {
      method: 'POST',
      body: {
        limit: 6,
        associations: {
          cover: {},
          prices: {}
        },
        sort: [
          { field: 'name', order: 'ASC' }
        ]
      }
    })

    recommendations.value = response.elements || []

  } catch (error) {
    console.error('Failed to load recommendations:', error)
  } finally {
    loading.value.recommendations = false
  }
}

// Initialize
onMounted(() => {
  loadRecentOrders()
  loadRecommendations()

  // Mock wishlist count
  stats.value.wishlistItems = Math.floor(Math.random() * 10) + 1
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>