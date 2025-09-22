<template>
  <div class="bg-white">
    <div class="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div class="max-w-xl">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <CheckCircleIcon class="h-8 w-8 text-green-500" />
          </div>
          <div class="ml-3">
            <h1 class="text-sm font-medium text-green-800">Bestellung erfolgreich!</h1>
          </div>
        </div>

        <div class="mt-8">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Vielen Dank für deine Bestellung!
          </h1>
          <p class="mt-4 text-base text-gray-500">
            Wir haben deine Bestellung erhalten und verarbeiten sie bereits. Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details.
          </p>
        </div>

        <!-- Order Details -->
        <div class="mt-10 border-t border-gray-200 pt-10">
          <h2 class="text-lg font-medium text-gray-900">Bestelldetails</h2>

          <div class="mt-4 bg-gray-50 rounded-lg p-6">
            <dl class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div>
                <dt class="text-sm font-medium text-gray-900">Bestellnummer</dt>
                <dd class="mt-1 text-sm text-gray-500">{{ orderNumber }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-900">Bestelldatum</dt>
                <dd class="mt-1 text-sm text-gray-500">{{ formatDate(new Date()) }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-900">Gesamtsumme</dt>
                <dd class="mt-1 text-sm text-gray-500">{{ estimatedTotal }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-900">Versandadresse</dt>
                <dd class="mt-1 text-sm text-gray-500">
                  <span class="block">Beispiel-Adresse</span>
                  <span class="block">Musterstraße 123</span>
                  <span class="block">12345 Musterstadt</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Order Status -->
        <div class="mt-10">
          <h3 class="text-lg font-medium text-gray-900">Was passiert als nächstes?</h3>

          <div class="mt-6">
            <div class="flow-root">
              <ul role="list" class="-mb-8">
                <li v-for="(step, stepIdx) in orderSteps" :key="step.name">
                  <div class="relative pb-8">
                    <span
                        v-if="stepIdx !== orderSteps.length - 1"
                        class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                    />
                    <div class="relative flex space-x-3">
                      <div>
                        <span
                            :class="[
                            step.status === 'complete' ? 'bg-green-500' :
                            step.status === 'current' ? 'bg-indigo-500' : 'bg-gray-300',
                            'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                          ]"
                        >
                          <CheckIcon
                              v-if="step.status === 'complete'"
                              class="h-5 w-5 text-white"
                              aria-hidden="true"
                          />
                          <div
                              v-else-if="step.status === 'current'"
                              class="h-2.5 w-2.5 bg-white rounded-full"
                          />
                          <div
                              v-else
                              class="h-2.5 w-2.5 bg-gray-100 rounded-full"
                          />
                        </span>
                      </div>
                      <div class="min-w-0 flex-1">
                        <div>
                          <p class="text-sm font-medium text-gray-900">{{ step.name }}</p>
                          <p class="mt-1 text-sm text-gray-500">{{ step.description }}</p>
                        </div>
                        <div v-if="step.estimatedTime" class="mt-2">
                          <p class="text-xs text-gray-400">{{ step.estimatedTime }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <NuxtLink
              to="/account/orders"
              class="flex-1 bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
          >
            Bestellung verfolgen
          </NuxtLink>
          <NuxtLink
              to="/products"
              class="flex-1 bg-white border border-gray-300 rounded-md shadow-sm py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
          >
            Weiter einkaufen
          </NuxtLink>
        </div>

        <!-- Contact Support -->
        <div class="mt-10 border-t border-gray-200 pt-6">
          <div class="flex items-center">
            <QuestionMarkCircleIcon class="h-5 w-5 text-gray-400" />
            <p class="ml-2 text-sm text-gray-500">
              Fragen zu deiner Bestellung?
              <NuxtLink to="/contact" class="font-medium text-indigo-600 hover:text-indigo-500">
                Kontaktiere unseren Support
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>

      <!-- Email Confirmation Notice -->
      <div class="mt-16 bg-blue-50 border border-blue-200 rounded-md p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <InformationCircleIcon class="h-5 w-5 text-blue-400" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-blue-800">
              Bestätigungs-E-Mail
            </h3>
            <div class="mt-2 text-sm text-blue-700">
              <p>
                Eine Bestätigung wurde an deine E-Mail-Adresse gesendet. Falls du keine E-Mail erhältst,
                überprüfe bitte deinen Spam-Ordner oder
                <NuxtLink to="/contact" class="font-medium underline">
                  kontaktiere uns
                </NuxtLink>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recommended Products -->
      <div class="mt-16">
        <h2 class="text-lg font-medium text-gray-900 mb-6">
          Das könnte dir auch gefallen
        </h2>

        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          <p class="mt-2 text-sm text-gray-500">Lade Empfehlungen...</p>
        </div>

        <div v-else class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
          <ProductCard
              v-for="product in recommendedProducts"
              :key="product.id"
              :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CheckCircleIcon,
  CheckIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon
} from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Bestellung erfolgreich'
})

// Router
const route = useRoute()

// Data
const loading = ref(true)
const recommendedProducts = ref([])

const orderNumber = computed(() => {
  return route.query.order || `ORD-${Date.now()}`
})

const estimatedTotal = ref('€127.50') // This would come from the actual order

const orderSteps = ref([
  {
    name: 'Bestellung erhalten',
    description: 'Wir haben deine Bestellung erhalten und prüfen sie.',
    status: 'complete',
    estimatedTime: 'Soeben'
  },
  {
    name: 'Zahlung verarbeitet',
    description: 'Deine Zahlung wird verarbeitet und bestätigt.',
    status: 'current',
    estimatedTime: 'In wenigen Minuten'
  },
  {
    name: 'Bestellung wird vorbereitet',
    description: 'Wir packen deine Artikel sorgfältig ein.',
    status: 'upcoming',
    estimatedTime: '1-2 Werktage'
  },
  {
    name: 'Versand',
    description: 'Deine Bestellung ist unterwegs zu dir.',
    status: 'upcoming',
    estimatedTime: '3-5 Werktage'
  },
  {
    name: 'Zustellung',
    description: 'Dein Paket wird zugestellt.',
    status: 'upcoming',
    estimatedTime: '4-6 Werktage'
  }
])

// API
const { $shopwareApi } = useNuxtApp()

// Methods
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const loadRecommendedProducts = async () => {
  try {
    loading.value = true

    const response = await $shopwareApi('/product', {
      method: 'POST',
      body: {
        limit: 3,
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

    recommendedProducts.value = response.elements || []
  } catch (error) {
    console.error('Failed to load recommended products:', error)
    // Mock products as fallback
    recommendedProducts.value = [
      {
        id: '1',
        name: 'Premium T-Shirt',
        calculatedPrice: { unitPrice: 29.99 },
        cover: { url: 'https://via.placeholder.com/300x300?text=T-Shirt' }
      },
      {
        id: '2',
        name: 'Designer Jeans',
        calculatedPrice: { unitPrice: 89.99 },
        cover: { url: 'https://via.placeholder.com/300x300?text=Jeans' }
      },
      {
        id: '3',
        name: 'Sneaker Classic',
        calculatedPrice: { unitPrice: 119.99 },
        cover: { url: 'https://via.placeholder.com/300x300?text=Sneaker' }
      }
    ]
  } finally {
    loading.value = false
  }
}

// Initialize
onMounted(() => {
  loadRecommendedProducts()

  // Simulate order status update
  setTimeout(() => {
    orderSteps.value[1].status = 'complete'
    orderSteps.value[2].status = 'current'
  }, 3000)
})

// Redirect if no order number
onMounted(() => {
  if (!route.query.order) {
    // Could redirect to home or show error
    console.warn('No order number provided')
  }
})
</script>