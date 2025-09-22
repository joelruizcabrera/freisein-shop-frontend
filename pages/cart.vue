<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Warenkorb
      </h1>

      <div class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
        <!-- Cart Items -->
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Artikel in deinem Warenkorb</h2>

          <!-- Loading State -->
          <div v-if="cartStore.loading" class="text-center py-16">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p class="mt-2 text-gray-500">Lade Warenkorb...</p>
          </div>

          <!-- Empty Cart -->
          <div v-else-if="cartStore.isEmpty" class="text-center py-16">
            <ShoppingBagIcon class="mx-auto h-24 w-24 text-gray-400" />
            <h3 class="mt-4 text-lg font-medium text-gray-900">Dein Warenkorb ist leer</h3>
            <p class="mt-2 text-sm text-gray-500">
              Füge einige Artikel hinzu, um mit dem Einkaufen zu beginnen.
            </p>
            <div class="mt-6">
              <NuxtLink
                  to="/products"
                  class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
              >
                <ShoppingBagIcon class="h-5 w-5 mr-2" />
                Jetzt einkaufen
              </NuxtLink>
            </div>
          </div>

          <!-- Cart Items List -->
          <ul v-else role="list" class="border-t border-b border-gray-200 divide-y divide-gray-200">
            <li
                v-for="item in cartStore.itemsWithDetails"
                :key="item.id"
                class="flex py-6 sm:py-10"
            >
              <!-- Product Image -->
              <div class="flex-shrink-0">
                <img
                    :src="getItemImage(item)"
                    :alt="item.label"
                    class="w-24 h-24 rounded-md object-cover object-center sm:w-48 sm:h-48"
                />
              </div>

              <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                  <!-- Product Info -->
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <NuxtLink
                            :to="`/products/${item.referencedId}`"
                            class="font-medium text-gray-700 hover:text-gray-800"
                        >
                          {{ item.label }}
                        </NuxtLink>
                      </h3>
                    </div>
                    <div class="mt-1 flex text-sm">
                      <p v-if="item.payload?.manufacturer" class="text-gray-500">
                        {{ item.payload.manufacturer.name }}
                      </p>
                      <p v-if="item.payload?.options" class="ml-4 pl-4 border-l border-gray-200 text-gray-500">
                        <!-- Display product options/variants here -->
                        {{ formatOptions(item.payload.options) }}
                      </p>
                    </div>
                    <p class="mt-1 text-sm font-medium text-gray-900">
                      {{ formatPrice(item.price?.unitPrice || 0) }}
                    </p>
                  </div>

                  <!-- Quantity Controls -->
                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <label :for="`quantity-${item.id}`" class="sr-only">
                      Menge, {{ item.label }}
                    </label>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center border border-gray-300 rounded-md">
                        <button
                            @click="decreaseQuantity(item)"
                            :disabled="item.quantity <= 1 || updatingItems.has(item.id)"
                            class="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <MinusIcon class="h-4 w-4" />
                        </button>
                        <input
                            :id="`quantity-${item.id}`"
                            :value="item.quantity"
                            @change="updateQuantity(item, $event.target.value)"
                            type="number"
                            min="1"
                            max="99"
                            class="w-16 text-center border-0 py-2 text-sm focus:ring-0"
                            :disabled="updatingItems.has(item.id)"
                        />
                        <button
                            @click="increaseQuantity(item)"
                            :disabled="item.quantity >= 99 || updatingItems.has(item.id)"
                            class="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <PlusIcon class="h-4 w-4" />
                        </button>
                      </div>

                      <!-- Loading indicator -->
                      <div v-if="updatingItems.has(item.id)" class="ml-3">
                        <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                      </div>
                    </div>

                    <!-- Item total price -->
                    <div class="mt-2 text-right">
                      <p class="text-sm font-medium text-gray-900">
                        {{ formatPrice(item.price?.totalPrice || 0) }}
                      </p>
                      <p v-if="item.quantity > 1" class="text-xs text-gray-500">
                        {{ item.quantity }} × {{ formatPrice(item.price?.unitPrice || 0) }}
                      </p>
                    </div>

                    <!-- Remove button -->
                    <div class="absolute top-0 right-0">
                      <button
                          @click="removeItem(item)"
                          :disabled="updatingItems.has(item.id)"
                          class="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500 disabled:opacity-50"
                      >
                        <span class="sr-only">Entfernen</span>
                        <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Product features -->
                <div class="mt-4 flex text-sm text-gray-700 space-x-4">
                  <div class="flex items-center">
                    <TruckIcon class="h-4 w-4 mr-1 text-green-500" />
                    <span class="text-xs">Kostenloser Versand ab 50€</span>
                  </div>
                  <div class="flex items-center">
                    <ArrowPathIcon class="h-4 w-4 mr-1 text-blue-500" />
                    <span class="text-xs">30 Tage Rückgabe</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <!-- Continue Shopping -->
          <div v-if="!cartStore.isEmpty" class="mt-10">
            <NuxtLink
                to="/products"
                class="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeftIcon class="h-5 w-5 mr-2" />
              Weiter einkaufen
            </NuxtLink>
          </div>
        </section>

        <!-- Order Summary -->
        <section
            v-if="!cartStore.isEmpty"
            aria-labelledby="summary-heading"
            class="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
        >
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">
            Bestellübersicht
          </h2>

          <!-- Free Shipping Progress -->
          <div v-if="freeShippingThreshold > cartStore.subtotalPrice" class="mt-6">
            <div class="flex justify-between text-sm text-gray-600 mb-2">
              <span>Noch {{ formatPrice(freeShippingThreshold - cartStore.subtotalPrice) }} bis kostenloser Versand</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                  class="bg-green-500 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${Math.min((cartStore.subtotalPrice / freeShippingThreshold) * 100, 100)}%` }"
              ></div>
            </div>
          </div>

          <div v-else class="mt-6 p-3 bg-green-50 rounded-md">
            <div class="flex items-center">
              <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2" />
              <span class="text-sm text-green-800 font-medium">Kostenloser Versand!</span>
            </div>
          </div>

          <!-- Price Breakdown -->
          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600">Zwischensumme</dt>
              <dd class="text-sm font-medium text-gray-900">{{ cartStore.formattedSubtotalPrice }}</dd>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt class="flex items-center text-sm text-gray-600">
                <span>Versandkosten</span>
                <button
                    type="button"
                    class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    @click="showShippingInfo = !showShippingInfo"
                >
                  <span class="sr-only">Versandinformationen</span>
                  <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </dt>
              <dd class="text-sm font-medium text-gray-900">
                {{ cartStore.subtotalPrice >= freeShippingThreshold ? 'Kostenlos' : formatPrice(shippingCosts) }}
              </dd>
            </div>

            <!-- Shipping Info Dropdown -->
            <div v-if="showShippingInfo" class="bg-gray-100 rounded-md p-3 text-sm text-gray-600">
              <p>• Kostenloser Versand ab {{ formatPrice(freeShippingThreshold) }}</p>
              <p>• Standardversand: {{ formatPrice(shippingCosts) }}</p>
              <p>• Expressversand: {{ formatPrice(shippingCosts * 2) }}</p>
              <p>• Lieferzeit: 1-3 Werktage</p>
            </div>

            <div v-if="cartStore.taxAmount > 0" class="flex items-center justify-between">
              <dt class="text-sm text-gray-600">MwSt. (19%)</dt>
              <dd class="text-sm font-medium text-gray-900">{{ formatPrice(cartStore.taxAmount) }}</dd>
            </div>
            <div class="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt class="text-base font-medium text-gray-900">Gesamtsumme</dt>
              <dd class="text-base font-medium text-gray-900">{{ formatPrice(totalWithShipping) }}</dd>
            </div>
          </dl>

          <!-- Checkout Button -->
          <div class="mt-6">
            <NuxtLink
                to="/checkout"
                class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 flex items-center justify-center"
            >
              Zur Kasse
              <ArrowRightIcon class="ml-2 h-5 w-5" />
            </NuxtLink>
          </div>

          <!-- Promo Code -->
          <div class="mt-6">
            <div class="flex justify-between items-center">
              <button
                  @click="showPromoCode = !showPromoCode"
                  class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {{ showPromoCode ? 'Rabattcode verbergen' : 'Rabattcode hinzufügen' }}
              </button>
            </div>

            <div v-if="showPromoCode" class="mt-3">
              <form @submit.prevent="applyPromoCode" class="flex space-x-2">
                <input
                    v-model="promoCode"
                    type="text"
                    placeholder="Rabattcode eingeben"
                    class="flex-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                    type="submit"
                    :disabled="!promoCode.trim() || applyingPromoCode"
                    class="bg-gray-200 text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ applyingPromoCode ? 'Prüfen...' : 'Anwenden' }}
                </button>
              </form>

              <!-- Applied Promo Codes -->
              <div v-if="appliedPromoCodes.length > 0" class="mt-3 space-y-2">
                <div
                    v-for="code in appliedPromoCodes"
                    :key="code.id"
                    class="flex items-center justify-between bg-green-50 rounded-md p-2"
                >
                  <div>
                    <span class="text-sm font-medium text-green-800">{{ code.code }}</span>
                    <span class="text-xs text-green-600 ml-2">{{ code.discount }}</span>
                  </div>
                  <button
                      @click="removePromoCode(code.id)"
                      class="text-green-600 hover:text-green-800"
                  >
                    <XMarkIcon class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Badges -->
          <div class="mt-6 flex justify-center space-x-4 text-sm text-gray-500">
            <div class="flex items-center">
              <LockClosedIcon class="h-4 w-4 mr-1 text-gray-400" />
              <span>SSL-verschlüsselt</span>
            </div>
            <div class="flex items-center">
              <ShieldCheckIcon class="h-4 w-4 mr-1 text-gray-400" />
              <span>Käuferschutz</span>
            </div>
          </div>
        </section>
      </div>

      <!-- Recently Viewed Products -->
      <div v-if="recentlyViewed.length > 0" class="mt-24">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Kürzlich angesehen</h2>
        <div class="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          <ProductCard
              v-for="product in recentlyViewed"
              :key="product.id"
              :product="product"
              class="transform hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ShoppingBagIcon,
  XMarkIcon,
  MinusIcon,
  PlusIcon,
  TruckIcon,
  ArrowPathIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  LockClosedIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'
import { useCartStore } from '~/stores/cart'

// SEO
useHead({
  title: 'Warenkorb'
})

// Store
const cartStore = useCartStore()

// Data
const updatingItems = ref(new Set())
const showPromoCode = ref(false)
const showShippingInfo = ref(false)
const promoCode = ref('')
const applyingPromoCode = ref(false)
const appliedPromoCodes = ref([])
const recentlyViewed = ref([])
const freeShippingThreshold = ref(50)
const shippingCosts = ref(4.95)

// API
const { $notify } = useNuxtApp()

// Computed
const totalWithShipping = computed(() => {
  const shipping = cartStore.subtotalPrice >= freeShippingThreshold.value ? 0 : shippingCosts.value
  return cartStore.totalPrice + shipping
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const getItemImage = (item) => {
  return item.cover?.url ||
      item.payload?.cover?.url ||
      'https://via.placeholder.com/200x200?text=Produkt'
}

const formatOptions = (options) => {
  if (!options || !Array.isArray(options)) return ''
  return options.map(option => option.name).join(', ')
}

const updateQuantity = async (item, newQuantity) => {
  const quantity = parseInt(newQuantity)
  if (quantity < 1 || quantity > 99 || quantity === item.quantity) return

  try {
    updatingItems.value.add(item.id)
    await cartStore.updateQuantity(item.id, quantity)
  } catch (error) {
    console.error('Failed to update quantity:', error)
    $notify.error('Fehler beim Aktualisieren der Menge')
  } finally {
    updatingItems.value.delete(item.id)
  }
}

const increaseQuantity = async (item) => {
  if (item.quantity >= 99) return
  await updateQuantity(item, item.quantity + 1)
}

const decreaseQuantity = async (item) => {
  if (item.quantity <= 1) return
  await updateQuantity(item, item.quantity - 1)
}

const removeItem = async (item) => {
  try {
    updatingItems.value.add(item.id)
    await cartStore.removeItem(item.id)
  } catch (error) {
    console.error('Failed to remove item:', error)
    $notify.error('Fehler beim Entfernen des Artikels')
  } finally {
    updatingItems.value.delete(item.id)
  }
}

const applyPromoCode = async () => {
  if (!promoCode.value.trim()) return

  try {
    applyingPromoCode.value = true

    // Mock promo code validation
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock promo codes
    const validCodes = {
      'WELCOME10': { discount: '10% Rabatt', value: 0.1 },
      'FREESHIP': { discount: 'Kostenloser Versand', value: 'free_shipping' },
      'SAVE5': { discount: '5€ Rabatt', value: 5 }
    }

    if (validCodes[promoCode.value.toUpperCase()]) {
      const code = validCodes[promoCode.value.toUpperCase()]
      appliedPromoCodes.value.push({
        id: Date.now(),
        code: promoCode.value.toUpperCase(),
        discount: code.discount,
        value: code.value
      })

      promoCode.value = ''
      $notify.success(`Rabattcode ${promoCode.value} erfolgreich angewendet!`)
    } else {
      $notify.error('Ungültiger Rabattcode')
    }
  } catch (error) {
    console.error('Failed to apply promo code:', error)
    $notify.error('Fehler beim Anwenden des Rabattcodes')
  } finally {
    applyingPromoCode.value = false
  }
}

const removePromoCode = (codeId) => {
  appliedPromoCodes.value = appliedPromoCodes.value.filter(code => code.id !== codeId)
  $notify.info('Rabattcode entfernt')
}

const loadRecentlyViewed = () => {
  // Mock recently viewed products
  recentlyViewed.value = [
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
    }
  ]
}

// Initialize
onMounted(() => {
  loadRecentlyViewed()
})
</script>