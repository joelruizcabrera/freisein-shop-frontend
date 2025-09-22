<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-50" @close="closeModal">
      <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
              <div v-if="loading" class="px-4 py-6 text-center">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p class="mt-2 text-gray-500">Lade Produktdetails...</p>
              </div>

              <div v-else-if="product" class="bg-white">
                <!-- Close button -->
                <div class="absolute right-4 top-4 z-10">
                  <button
                      @click="closeModal"
                      class="rounded-full bg-white p-2 text-gray-400 hover:text-gray-500 shadow-md"
                  >
                    <span class="sr-only">Schließen</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2">
                  <!-- Product Image -->
                  <div class="aspect-square overflow-hidden bg-gray-200">
                    <NuxtImg
                      :src="selectedImage?.url || product.cover?.url"
                      :alt="product.name"
                      class="h-full w-full object-cover object-center"
                      placeholder="https://placehold.co/400x400?text=Kein+Bild"
                    ></NuxtImg>
                  </div>

                  <!-- Product Info -->
                  <div class="flex flex-col justify-between p-6">
                    <div>
                      <!-- Product name and manufacturer -->
                      <div class="mb-4">
                        <h2 class="text-2xl font-bold text-gray-900">{{ product.name }}</h2>
                        <p v-if="product.manufacturer" class="mt-1 text-lg text-gray-500">
                          von {{ product.manufacturer.name }}
                        </p>
                      </div>

                      <!-- Price -->
                      <div class="mb-4">
                        <div class="flex items-center space-x-3">
                          <span class="text-2xl font-bold text-gray-900">
                            {{ formatPrice(product.calculatedPrice?.unitPrice || 0) }}
                          </span>
                          <span
                              v-if="product.calculatedPrice?.listPrice && product.calculatedPrice.listPrice.price > product.calculatedPrice.unitPrice"
                              class="text-lg text-gray-500 line-through"
                          >
                            {{ formatPrice(product.calculatedPrice.listPrice.price) }}
                          </span>
                          <span
                              v-if="discountPercentage > 0"
                              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                          >
                            -{{ discountPercentage }}%
                          </span>
                        </div>
                        <p class="text-sm text-gray-500">inkl. MwSt., zzgl. Versandkosten</p>
                      </div>

                      <!-- Rating -->
                      <div class="mb-4">
                        <div class="flex items-center">
                          <div class="flex items-center">
                            <StarIcon
                                v-for="rating in [0, 1, 2, 3, 4]"
                                :key="rating"
                                :class="[
                                4.5 > rating ? 'text-yellow-400' : 'text-gray-200',
                                'h-5 w-5 flex-shrink-0'
                              ]"
                                fill="currentColor"
                            />
                          </div>
                          <span class="ml-2 text-sm text-gray-500">(4.5 von 5 Sternen)</span>
                        </div>
                      </div>

                      <!-- Short description -->
                      <div v-if="product.description" class="mb-6">
                        <p class="text-sm text-gray-600 line-clamp-3">
                          {{ stripHtml(product.description) }}
                        </p>
                      </div>

                      <!-- Stock status -->
                      <div class="mb-4">
                        <div class="flex items-center">
                          <CheckIcon
                              v-if="product.availableStock > 0"
                              class="h-5 w-5 text-green-500 mr-2"
                          />
                          <XMarkIcon
                              v-else
                              class="h-5 w-5 text-red-500 mr-2"
                          />
                          <span
                              :class="[
                              'text-sm',
                              product.availableStock > 0 ? 'text-green-600' : 'text-red-600'
                            ]"
                          >
                            {{
                              product.availableStock > 0
                                  ? `Auf Lager (${product.availableStock} verfügbar)`
                                  : 'Nicht auf Lager'
                            }}
                          </span>
                        </div>
                      </div>

                      <!-- Image thumbnails -->
                      <div v-if="productImages.length > 1" class="mb-6">
                        <div class="flex space-x-2 overflow-x-auto">
                          <button
                              v-for="(image, index) in productImages"
                              :key="index"
                              @click="selectedImageIndex = index"
                              :class="[
                              'flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors duration-200',
                              selectedImageIndex === index ? 'border-indigo-500' : 'border-gray-300'
                            ]"
                          >
                            <img
                                :src="image.url"
                                :alt="`${product.name} ${index + 1}`"
                                class="w-full h-full object-cover"
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Actions -->
                    <div class="space-y-4">
                      <!-- Quantity selector -->
                      <div class="flex items-center space-x-3">
                        <label class="text-sm font-medium text-gray-700">Menge:</label>
                        <div class="flex items-center border border-gray-300 rounded-md">
                          <button
                              @click="decreaseQuantity"
                              :disabled="quantity <= 1"
                              class="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                          >
                            <MinusIcon class="h-4 w-4" />
                          </button>
                          <input
                              v-model.number="quantity"
                              type="number"
                              min="1"
                              :max="product.availableStock"
                              class="w-16 text-center border-0 py-2 text-sm focus:ring-0"
                          />
                          <button
                              @click="increaseQuantity"
                              :disabled="quantity >= product.availableStock"
                              class="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                          >
                            <PlusIcon class="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <!-- Action buttons -->
                      <div class="flex space-x-3">
                        <button
                            @click="addToCart"
                            :disabled="addingToCart || product.availableStock <= 0"
                            class="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-6 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          <ShoppingCartIcon class="h-5 w-5 mr-2 inline" />
                          {{ addingToCart ? 'Wird hinzugefügt...' : 'In den Warenkorb' }}
                        </button>

                        <button
                            @click="toggleWishlist"
                            :class="[
                            'p-3 rounded-md border transition-colors duration-200',
                            isInWishlist
                              ? 'border-red-300 text-red-600 bg-red-50 hover:bg-red-100'
                              : 'border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
                          ]"
                        >
                          <HeartIcon
                              :class="['h-5 w-5', isInWishlist ? 'fill-current' : '']"
                          />
                        </button>
                      </div>

                      <!-- View full details button -->
                      <div class="text-center">
                        <NuxtLink
                            :to="`/products/${product.id}`"
                            @click="closeModal"
                            class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Alle Details anzeigen →
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  XMarkIcon,
  StarIcon,
  CheckIcon,
  XMarkIcon as XIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  HeartIcon
} from '@heroicons/vue/24/outline'
import { useCartStore } from '~/stores/cart'

// Stores
const cartStore = useCartStore()

// Data
const open = ref(false)
const product = ref(null)
const loading = ref(false)
const quantity = ref(1)
const selectedImageIndex = ref(0)
const addingToCart = ref(false)
const isInWishlist = ref(false)

// API
const { $shopwareApi, $notify } = useNuxtApp()

// Computed
const productImages = computed(() => {
  if (!product.value) return []

  const images = []

  // Add cover image
  if (product.value.cover) {
    images.push(product.value.cover)
  }

  // Add media images
  if (product.value.media) {
    product.value.media.forEach(media => {
      if (media.id !== product.value.cover?.id) {
        images.push(media)
      }
    })
  }

  return images
})

const selectedImage = computed(() => {
  return productImages.value[selectedImageIndex.value]
})

const discountPercentage = computed(() => {
  if (!product.value?.calculatedPrice?.listPrice) return 0

  const originalPrice = product.value.calculatedPrice.listPrice.price
  const currentPrice = product.value.calculatedPrice.unitPrice

  if (originalPrice <= currentPrice) return 0

  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}

const openModal = async (productData) => {
  try {
    loading.value = true
    open.value = true

    // Load full product details
    const response = await $shopwareApi(`/product/${productData.id}`, {
      method: 'POST',
      body: {
        associations: {
          cover: {},
          media: {},
          manufacturer: {},
          prices: {}
        }
      }
    })

    product.value = response
    quantity.value = 1
    selectedImageIndex.value = 0
    isInWishlist.value = false
  } catch (error) {
    console.error('Failed to load product details:', error)
    $notify.error('Fehler beim Laden der Produktdetails')
    closeModal()
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  open.value = false
  product.value = null
  loading.value = false
  quantity.value = 1
  selectedImageIndex.value = 0
  addingToCart.value = false
}

const increaseQuantity = () => {
  if (quantity.value < product.value.availableStock) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = async () => {
  if (!product.value || product.value.availableStock <= 0) return

  try {
    addingToCart.value = true
    await cartStore.addProduct(product.value.id, quantity.value)
    closeModal()
  } catch (error) {
    console.error('Failed to add to cart:', error)
  } finally {
    addingToCart.value = false
  }
}

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value

  if (isInWishlist.value) {
    $notify.success('Produkt zur Wunschliste hinzugefügt')
  } else {
    $notify.info('Produkt von Wunschliste entfernt')
  }
}

// Event listeners
onMounted(() => {
  window.addEventListener('open-quick-view', (event) => {
    openModal(event.detail.product)
  })
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>