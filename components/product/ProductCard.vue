<template>
  <!-- Grid View -->
  <div v-if="viewMode === 'grid'" class="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
    <div class="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-200 relative">
      <!-- Product Image -->
      <img
          :src="productImage"
          :alt="product.name"
          class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          @error="handleImageError"
      />

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col space-y-2">
        <span
            v-if="isNew"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
        >
          Neu
        </span>
        <span
            v-if="discountPercentage > 0"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
        >
          -{{ discountPercentage }}%
        </span>
        <span
            v-if="product.availableStock <= 5 && product.availableStock > 0"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
        >
          Nur {{ product.availableStock }} verfügbar
        </span>
      </div>

      <!-- Quick Actions -->
      <div class="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
            @click.prevent="toggleWishlist"
            :class="[
            'p-2 rounded-full shadow-md transition-colors duration-200',
            isInWishlist
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-white text-gray-600 hover:text-red-500'
          ]"
        >
          <HeartIcon
              :class="['h-4 w-4', isInWishlist ? 'fill-current' : '']"
          />
        </button>
        <button
            @click.prevent="openQuickView"
            class="p-2 rounded-full bg-white text-gray-600 hover:text-gray-900 shadow-md transition-colors duration-200"
        >
          <EyeIcon class="h-4 w-4" />
        </button>
      </div>

      <!-- Out of Stock Overlay -->
      <div
          v-if="product.availableStock <= 0"
          class="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
      >
        <span class="text-white font-medium">Ausverkauft</span>
      </div>
    </div>

    <div class="p-4">
      <!-- Product Info -->
      <div class="min-h-[4rem] mb-3">
        <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
          <NuxtLink :to="`/products/${product.id}`" class="hover:text-indigo-600 transition-colors duration-200">
            {{ product.name }}
          </NuxtLink>
        </h3>
        <p v-if="product.manufacturer" class="text-xs text-gray-500">
          {{ product.manufacturer.name }}
        </p>
      </div>

      <!-- Rating -->
      <div v-if="showRating" class="flex items-center mb-2">
        <div class="flex items-center">
          <StarIcon
              v-for="star in 5"
              :key="star"
              :class="[
              star <= averageRating ? 'text-yellow-400' : 'text-gray-200',
              'h-3 w-3'
            ]"
              fill="currentColor"
          />
        </div>
        <span class="text-xs text-gray-500 ml-1">({{ reviewCount }})</span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between mb-3">
        <div>
          <span class="text-lg font-bold text-gray-900">
            {{ formatPrice(product.calculatedPrice?.unitPrice || product.price || 0) }}
          </span>
          <span
              v-if="originalPrice > currentPrice"
              class="text-sm text-gray-500 line-through ml-2"
          >
            {{ formatPrice(originalPrice) }}
          </span>
        </div>
      </div>

      <!-- Add to Cart Button -->
      <button
          @click.prevent="addToCart"
          :disabled="addingToCart || product.availableStock <= 0"
          class="w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <span v-if="product.availableStock <= 0">Ausverkauft</span>
        <span v-else-if="addingToCart">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Hinzufügen...
        </span>
        <span v-else>In den Warenkorb</span>
      </button>
    </div>
  </div>

  <!-- List View -->
  <div v-else class="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex">
    <div class="w-48 h-48 flex-shrink-0 overflow-hidden rounded-l-lg bg-gray-200 relative">
      <!-- Product Image -->
      <NuxtImg
          :src="productImage"
          :alt="product.name"
          class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          placeholder="https://placehold.co/400x400?text=Kein+Bild"
          @error="handleImageError"
      ></NuxtImg>

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col space-y-2">
        <span
            v-if="isNew"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
        >
          Neu
        </span>
        <span
            v-if="discountPercentage > 0"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
        >
          -{{ discountPercentage }}%
        </span>
      </div>

      <!-- Out of Stock Overlay -->
      <div
          v-if="product.availableStock <= 0"
          class="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
      >
        <span class="text-white font-medium text-sm">Ausverkauft</span>
      </div>
    </div>

    <div class="flex-1 p-6 flex flex-col justify-between">
      <div>
        <!-- Product Info -->
        <div class="mb-4">
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            <NuxtLink :to="`/products/${product.id}`" class="hover:text-indigo-600 transition-colors duration-200">
              {{ product.name }}
            </NuxtLink>
          </h3>
          <p v-if="product.manufacturer" class="text-sm text-gray-500 mb-2">
            von {{ product.manufacturer.name }}
          </p>
          <p v-if="product.description" class="text-sm text-gray-600 line-clamp-2">
            {{ stripHtml(product.description) }}
          </p>
        </div>

        <!-- Rating -->
        <div v-if="showRating" class="flex items-center mb-4">
          <div class="flex items-center">
            <StarIcon
                v-for="star in 5"
                :key="star"
                :class="[
                star <= averageRating ? 'text-yellow-400' : 'text-gray-200',
                'h-4 w-4'
              ]"
                fill="currentColor"
            />
          </div>
          <span class="text-sm text-gray-500 ml-2">({{ reviewCount }} Bewertungen)</span>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <!-- Price -->
        <div class="flex items-center space-x-3">
          <span class="text-xl font-bold text-gray-900">
            {{ formatPrice(product.calculatedPrice?.unitPrice || product.price || 0) }}
          </span>
          <span
              v-if="originalPrice > currentPrice"
              class="text-lg text-gray-500 line-through"
          >
            {{ formatPrice(originalPrice) }}
          </span>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-3">
          <button
              @click.prevent="toggleWishlist"
              :class="[
              'p-2 rounded-full transition-colors duration-200',
              isInWishlist
                ? 'text-red-500 hover:text-red-600'
                : 'text-gray-400 hover:text-red-500'
            ]"
          >
            <HeartIcon
                :class="['h-5 w-5', isInWishlist ? 'fill-current' : '']"
            />
          </button>

          <button
              @click.prevent="openQuickView"
              class="p-2 rounded-full text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <EyeIcon class="h-5 w-5" />
          </button>

          <button
              @click.prevent="addToCart"
              :disabled="addingToCart || product.availableStock <= 0"
              class="bg-indigo-600 border border-transparent rounded-md py-2 px-6 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span v-if="product.availableStock <= 0">Ausverkauft</span>
            <span v-else-if="addingToCart">Hinzufügen...</span>
            <span v-else>In den Warenkorb</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HeartIcon, EyeIcon, StarIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '~/stores/cart'

// Props
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  viewMode: {
    type: String,
    default: 'grid',
    validator: (value) => ['grid', 'list'].includes(value)
  },
  showRating: {
    type: Boolean,
    default: true
  }
})

// Stores
const cartStore = useCartStore()

// Data
const addingToCart = ref(false)
const isInWishlist = ref(false)
const averageRating = ref(4.2) // Mock rating
const reviewCount = ref(Math.floor(Math.random() * 50) + 1) // Mock review count

// API
const { $notify } = useNuxtApp()

// Computed
const productImage = computed(() => {
  return props.product.cover?.url ||
      props.product.image ||
      'https://via.placeholder.com/400x400?text=Kein+Bild'
})

const currentPrice = computed(() => {
  return props.product.calculatedPrice?.unitPrice || props.product.price || 0
})

const originalPrice = computed(() => {
  return props.product.calculatedPrice?.listPrice?.price || 0
})

const discountPercentage = computed(() => {
  if (originalPrice.value <= currentPrice.value) return 0
  return Math.round(((originalPrice.value - currentPrice.value) / originalPrice.value) * 100)
})

const isNew = computed(() => {
  if (!props.product.createdAt) return false
  const createdDate = new Date(props.product.createdAt)
  const now = new Date()
  const daysDiff = (now - createdDate) / (1000 * 60 * 60 * 24)
  return daysDiff <= 30 // New if created within last 30 days
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const addToCart = async () => {
  if (!props.product || props.product.availableStock <= 0) return

  try {
    addingToCart.value = true
    await cartStore.addProduct(props.product.id, 1)
  } catch (error) {
    console.error('Failed to add to cart:', error)
  } finally {
    addingToCart.value = false
  }
}

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value

  if (isInWishlist.value) {
    $notify.success(`${props.product.name} zur Wunschliste hinzugefügt`)
  } else {
    $notify.info(`${props.product.name} von Wunschliste entfernt`)
  }
}

const openQuickView = () => {
  // Emit event to open quick view modal
  const event = new CustomEvent('open-quick-view', {
    detail: { product: props.product }
  })
  window.dispatchEvent(event)
}

const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/400x400?text=Kein+Bild'
}

const stripHtml = (html) => {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>