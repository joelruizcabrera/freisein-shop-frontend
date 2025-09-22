<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="relative pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div class="sm:max-w-lg">
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Entdecke Freisein
            </h1>
            <p class="mt-4 text-xl text-gray-300">
              Hochwertige Produkte für deinen individuellen Lifestyle.
              Kostenloser Versand ab 50€.
            </p>
          </div>
          <div class="mt-10">
            <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
              <NuxtLink
                  to="/products"
                  class="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 transition-colors duration-200"
              >
                Jetzt shoppen
              </NuxtLink>
              <NuxtLink
                  to="/categories"
                  class="inline-block rounded-md border border-white bg-transparent px-8 py-3 text-center font-medium text-white hover:bg-white hover:text-gray-900 transition-colors duration-200"
              >
                Kategorien entdecken
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
            Warum Freisein Shop?
          </h2>
          <p class="mt-4 text-xl text-gray-600">
            Entdecke die Vorteile unseres modernen Online-Shops
          </p>
        </div>

        <div class="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div class="text-center">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
              <TruckIcon class="h-6 w-6" />
            </div>
            <h3 class="mt-6 text-lg font-medium text-gray-900">Kostenloser Versand</h3>
            <p class="mt-2 text-base text-gray-500">
              Ab 50€ Bestellwert versenden wir kostenfrei in ganz Deutschland.
            </p>
          </div>

          <div class="text-center">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
              <ShieldCheckIcon class="h-6 w-6" />
            </div>
            <h3 class="mt-6 text-lg font-medium text-gray-900">Sichere Zahlung</h3>
            <p class="mt-2 text-base text-gray-500">
              SSL-verschlüsselt und verschiedene Zahlungsmethoden verfügbar.
            </p>
          </div>

          <div class="text-center">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
              <ArrowPathIcon class="h-6 w-6" />
            </div>
            <h3 class="mt-6 text-lg font-medium text-gray-900">30 Tage Rückgabe</h3>
            <p class="mt-2 text-base text-gray-500">
              Nicht zufrieden? Sende deine Bestellung kostenlos zurück.
            </p>
          </div>

          <div class="text-center">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
              <ChatBubbleLeftRightIcon class="h-6 w-6" />
            </div>
            <h3 class="mt-6 text-lg font-medium text-gray-900">24/7 Support</h3>
            <p class="mt-2 text-base text-gray-500">
              Unser Kundenservice ist rund um die Uhr für dich da.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Categories -->
    <div class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
            Beliebte Kategorien
          </h2>
          <p class="mt-4 text-xl text-gray-600">
            Entdecke unsere vielfältigen Produktkategorien
          </p>
        </div>

        <div v-if="categoriesLoading" class="mt-16 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p class="mt-2 text-gray-500">Lade Kategorien...</p>
        </div>

        <div v-else class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <CategoryCard
              v-for="category in featuredCategories"
              :key="category.id"
              :category="category"
              class="transform hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>
    </div>

    <!-- Featured Products -->
    <div class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
            Beliebte Produkte
          </h2>
          <p class="mt-4 text-xl text-gray-600">
            Entdecke unsere Bestseller und Neuheiten
          </p>
        </div>

        <div v-if="productsLoading" class="mt-16 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p class="mt-2 text-gray-500">Lade Produkte...</p>
        </div>

        <div v-else class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard
              v-for="product in featuredProducts"
              :key="product.id"
              :product="product"
              class="transform hover:scale-105 transition-transform duration-200"
          />
        </div>

        <div class="text-center mt-12">
          <NuxtLink
              to="/products"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          >
            Alle Produkte anzeigen
            <ArrowRightIcon class="ml-2 h-5 w-5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Newsletter Section -->
    <div class="bg-indigo-700">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
        <div class="lg:w-0 lg:flex-1">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Bleib auf dem Laufenden
          </h2>
          <p class="mt-3 max-w-3xl text-lg leading-6 text-indigo-200">
            Erhalte exklusive Angebote, Neuigkeiten und Produktupdates direkt in dein Postfach.
          </p>
        </div>
        <div class="mt-8 lg:mt-0 lg:ml-8">
          <form @submit.prevent="subscribeNewsletter" class="sm:flex">
            <label for="email-address" class="sr-only">E-Mail-Adresse</label>
            <input
                id="email-address"
                v-model="newsletterEmail"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                placeholder="Deine E-Mail-Adresse"
            />
            <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                  type="submit"
                  :disabled="newsletterLoading"
                  class="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white disabled:opacity-50"
              >
                {{ newsletterLoading ? 'Wird angemeldet...' : 'Anmelden' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon
} from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Willkommen im Freisein Shop',
  meta: [
    { name: 'description', content: 'Entdecke hochwertige Produkte in unserem modernen Online-Shop. Kostenloser Versand ab 50€.' }
  ]
})

// Data
const featuredProducts = ref([])
const featuredCategories = ref([])
const productsLoading = ref(true)
const categoriesLoading = ref(true)
const newsletterEmail = ref('')
const newsletterLoading = ref(false)

// API
const { $shopwareApi, $notify } = useNuxtApp()

// Methods
const loadFeaturedProducts = async () => {
  try {
    productsLoading.value = true

    const response = await $shopwareApi('/product', {
      method: 'POST',
      body: {
        limit: 8,
        associations: {
          cover: {},
          manufacturer: {},
          prices: {}
        },
        sort: [
          { field: 'name', order: 'ASC' }
        ]
      }
    })

    featuredProducts.value = response.elements || []
  } catch (error) {
    console.error('Failed to load featured products:', error)
    $notify.error('Fehler beim Laden der Produkte')
  } finally {
    productsLoading.value = false
  }
}

const loadFeaturedCategories = async () => {
  try {
    categoriesLoading.value = true

    const response = await $shopwareApi('/category', {
      method: 'POST',
      body: {
        limit: 6,
        associations: {
          media: {}
        },
        filter: [
          {
            type: 'equals',
            field: 'type',
            value: 'page'
          }
        ]
      }
    })

    featuredCategories.value = response.elements || []
  } catch (error) {
    console.error('Failed to load featured categories:', error)
    $notify.error('Fehler beim Laden der Kategorien')
  } finally {
    categoriesLoading.value = false
  }
}

const subscribeNewsletter = async () => {
  try {
    newsletterLoading.value = true

    await $shopwareApi('/newsletter/subscribe', {
      method: 'POST',
      body: {
        email: newsletterEmail.value,
        option: 'subscribe'
      }
    })

    $notify.success('Erfolgreich für den Newsletter angemeldet!')
    newsletterEmail.value = ''
  } catch (error) {
    console.error('Newsletter subscription failed:', error)
    $notify.error('Fehler bei der Newsletter-Anmeldung')
  } finally {
    newsletterLoading.value = false
  }
}

// Initialize
onMounted(() => {
  loadFeaturedProducts()
  loadFeaturedCategories()
})
</script>