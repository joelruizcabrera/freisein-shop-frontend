<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-50" @close="open = false">
      <!-- Backdrop -->
      <TransitionChild
          as="template"
          enter="ease-in-out duration-500"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in-out duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
                as="template"
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <!-- Header -->
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900">
                        Warenkorb
                        <span v-if="cartStore.count > 0" class="text-sm text-gray-500 ml-2">
                          ({{ cartStore.count }} {{ cartStore.count === 1 ? 'Artikel' : 'Artikel' }})
                        </span>
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                            type="button"
                            class="-m-2 p-2 text-gray-400 hover:text-gray-500 transition-colors duration-200"
                            @click="open = false"
                        >
                          <span class="sr-only">Warenkorb schließen</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <!-- Cart Items -->
                    <div class="mt-8">
                      <div class="flow-root">
                        <!-- Loading State -->
                        <div v-if="cartStore.loading" class="text-center py-8">
                          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                          <p class="mt-2 text-sm text-gray-500">Lade Warenkorb...</p>
                        </div>

                        <!-- Empty Cart -->
                        <div v-else-if="cartStore.isEmpty" class="text-center py-12">
                          <ShoppingBagIcon class="mx-auto h-12 w-12 text-gray-400" />
                          <h3 class="mt-4 text-lg font-medium text-gray-900">Dein Warenkorb ist leer</h3>
                          <p class="mt-1 text-sm text-gray-500">
                            Füge Produkte hinzu, um mit dem Einkaufen zu beginnen.
                          </p>
                          <div class="mt-6">
                            <NuxtLink
                                to="/products"
                                @click="open = false"
                                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors duration-200"
                            >
                              Jetzt einkaufen
                            </NuxtLink>
                          </div>
                        </div>

                        <!-- Cart Items List -->
                        <ul v-else role="list" class="-my-6 divide-y divide-gray-200">
                          <li
                              v-for="item in cartStore.itemsWithDetails"
                              :key="item.id"
                              class="flex py-6"
                          >
                            <!-- Product Image -->
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                  :src="getItemImage(item)"
                                  :alt="item.label"
                                  class="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div class="ml-4 flex flex-1 flex-col">
                              <!-- Product Info -->
                              <div>
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <NuxtLink
                                        :to="`/products/${item.referencedId}`"
                                        @click="open = false"
                                        class="hover:text-indigo-600 transition-colors duration-200"
                                    >
                                      {{ item.label }}
                                    </NuxtLink>
                                  </h3>
                                  <p class="ml-4">{{ formatPrice(item.price?.totalPrice || 0) }}</p>
                                </div>
                                <p v-if="item.payload?.manufacturer" class="mt-1 text-sm text-gray-500">
                                  {{ item.payload.manufacturer.name }}
                                </p>
                              </div>

                              <!-- Quantity and Remove -->
                              <div class="flex flex-1 items-end justify-between text-sm">
                                <div class="flex items-center space-x-2">
                                  <label :for="`quantity-${item.id}`" class="sr-only">
                                    Menge für {{ item.label }}
                                  </label>
                                  <div class="flex items-center border border-gray-300 rounded-md">
                                    <button
                                        @click="decreaseQuantity(item)"
                                        :disabled="item.quantity <= 1 || updatingItems.has(item.id)"
                                        class="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      <MinusIcon class="h-4 w-4" />
                                    </button>
                                    <input
                                        :id="`quantity-${item.id}`"
                                        :value="item.quantity"
                                        @change="updateQuantity(item, $event.target.value)"
                                        type="number"
                                        min="1"
                                        :max="99"
                                        class="w-12 text-center border-0 py-1 text-sm focus:ring-0"
                                        :disabled="updatingItems.has(item.id)"
                                    />
                                    <button
                                        @click="increaseQuantity(item)"
                                        :disabled="item.quantity >= 99 || updatingItems.has(item.id)"
                                        class="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      <PlusIcon class="h-4 w-4" />
                                    </button>
                                  </div>

                                  <!-- Loading indicator for item updates -->
                                  <div v-if="updatingItems.has(item.id)" class="ml-2">
                                    <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                                  </div>
                                </div>

                                <div class="flex">
                                  <button
                                      @click="removeItem(item)"
                                      :disabled="updatingItems.has(item.id)"
                                      class="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50 transition-colors duration-200"
                                  >
                                    Entfernen
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Cart Summary and Checkout -->
                  <div v-if="!cartStore.isEmpty" class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <!-- Free Shipping Progress -->
                    <div v-if="freeShippingThreshold > cartStore.subtotalPrice" class="mb-4">
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

                    <div v-else class="mb-4 p-3 bg-green-50 rounded-md">
                      <div class="flex items-center">
                        <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2" />
                        <span class="text-sm text-green-800 font-medium">Kostenloser Versand!</span>
                      </div>
                    </div>

                    <!-- Price Summary -->
                    <div class="space-y-2 mb-6">
                      <div class="flex justify-between text-sm text-gray-600">
                        <p>Zwischensumme</p>
                        <p>{{ cartStore.formattedSubtotalPrice }}</p>
                      </div>
                      <div class="flex justify-between text-sm text-gray-600">
                        <p>Versandkosten</p>
                        <p>{{ cartStore.subtotalPrice >= freeShippingThreshold ? 'Kostenlos' : formatPrice(cartStore.shippingCosts) }}</p>
                      </div>
                      <div v-if="cartStore.taxAmount > 0" class="flex justify-between text-sm text-gray-600">
                        <p>MwSt.</p>
                        <p>{{ formatPrice(cartStore.taxAmount) }}</p>
                      </div>
                      <div class="border-t border-gray-200 pt-2">
                        <div class="flex justify-between text-base font-medium text-gray-900">
                          <p>Gesamtsumme</p>
                          <p>{{ cartStore.formattedTotalPrice }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="space-y-3">
                      <NuxtLink
                          to="/checkout"
                          @click="open = false"
                          class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors duration-200"
                      >
                        Zur Kasse
                      </NuxtLink>

                      <div class="flex space-x-3">
                        <NuxtLink
                            to="/cart"
                            @click="open = false"
                            class="flex-1 flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors duration-200"
                        >
                          Warenkorb anzeigen
                        </NuxtLink>

                        <button
                            @click="clearCart"
                            :disabled="cartStore.loading"
                            class="flex-1 flex items-center justify-center rounded-md border border-red-300 bg-white px-6 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 disabled:opacity-50 transition-colors duration-200"
                        >
                          Leeren
                        </button>
                      </div>
                    </div>

                    <!-- Continue Shopping -->
                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        oder
                        <button
                            type="button"
                            class="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                            @click="open = false"
                        >
                          weiter einkaufen
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'
import {
  XMarkIcon,
  ShoppingBagIcon,
  MinusIcon,
  PlusIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
import { useCartStore } from '~/stores/cart'

// Stores
const cartStore = useCartStore()

// Data
const open = ref(false)
const updatingItems = ref(new Set())
const freeShippingThreshold = ref(50) // €50 for free shipping

// API
const { $notify } = useNuxtApp()

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
      'https://via.placeholder.com/100x100?text=Produkt'
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

const clearCart = async () => {
  if (!confirm('Möchtest du wirklich alle Artikel aus dem Warenkorb entfernen?')) return

  try {
    await cartStore.clearCart()
    $notify.success('Warenkorb wurde geleert')
  } catch (error) {
    console.error('Failed to clear cart:', error)
    $notify.error('Fehler beim Leeren des Warenkorbs')
  }
}

// Event listeners
onMounted(() => {
  // Listen for cart toggle events
  window.addEventListener('toggleCart', () => {
    open.value = !open.value
  })

  // Close cart when navigating
  const router = useRouter()
  router.afterEach(() => {
    open.value = false
  })
})

// Watch for cart changes to show notifications
watch(() => cartStore.count, (newCount, oldCount) => {
  if (newCount > oldCount && oldCount !== undefined) {
    // Item was added
    if (!open.value) {
      // Auto-open cart briefly when item is added
      open.value = true
      setTimeout(() => {
        if (open.value) {
          // Only close if user hasn't interacted
          open.value = false
        }
      }, 3000)
    }
  }
})
</script>