<template>
  <div v-if="product" class="bg-white">
    <!-- Breadcrumb -->
    <nav class="bg-gray-50 px-4 py-3 sm:px-6 lg:px-8">
      <ol role="list" class="flex items-center space-x-2 max-w-7xl mx-auto">
        <li>
          <NuxtLink to="/" class="text-gray-400 hover:text-gray-500">
            <HomeIcon class="h-5 w-5" />
          </NuxtLink>
        </li>
        <li>
          <ChevronRightIcon class="h-5 w-5 text-gray-400" />
        </li>
        <li>
          <NuxtLink to="/products" class="text-sm font-medium text-gray-500 hover:text-gray-700">
            Produkte
          </NuxtLink>
        </li>
        <li v-if="product.categories?.[0]">
          <ChevronRightIcon class="h-5 w-5 text-gray-400" />
        </li>
        <li v-if="product.categories?.[0]">
          <NuxtLink
              :to="`/products?categoryId=${product.categories[0].id}`"
              class="text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            {{ product.categories[0].name }}
          </NuxtLink>
        </li>
        <li>
          <ChevronRightIcon class="h-5 w-5 text-gray-400" />
        </li>
        <li class="text-sm font-medium text-gray-900 truncate">
          {{ product.name }}
        </li>
      </ol>
    </nav>

    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <!-- Product Images -->
        <div class="flex flex-col-reverse">
          <!-- Image thumbnails -->
          <div class="mx-auto mt-6 w-full max-w-2xl lg:max-w-none">
            <div class="grid grid-cols-4 gap-6" v-if="productImages.length > 1">
              <button
                  v-for="(image, index) in productImages"
                  :key="index"
                  @click="selectedImageIndex = index"
                  :class="[
                  'relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4',
                  selectedImageIndex === index ? 'ring-2 ring-indigo-500' : ''
                ]"
              >
                <img
                    :src="image.url"
                    :alt="`${product.name} ${index + 1}`"
                    class="h-full w-full object-cover object-center rounded-md"
                />
              </button>
            </div>
          </div>

          <!-- Main image -->
          <div class="aspect-square w-full">
            <img
                :src="selectedImage?.url || product.cover?.url"
                :alt="product.name"
                class="h-full w-full object-cover object-center rounded-lg"
                @click="openImageModal = true"
            />
          </div>
        </div>

        <!-- Product Info -->
        <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <!-- Product name and manufacturer -->
          <div>
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ product.name }}</h1>
            <p v-if="product.manufacturer" class="mt-2 text-lg text-gray-500">
              von {{ product.manufacturer.name }}
            </p>
          </div>

          <!-- Price -->
          <div class="mt-3">
            <h2 class="sr-only">Produktinformationen</h2>
            <div class="flex items-center space-x-3">
              <p class="text-3xl tracking-tight text-gray-900">
                {{ formatPrice(product.calculatedPrice.unitPrice) }}
              </p>
              <p
                  v-if="product.calculatedPrice.listPrice && product.calculatedPrice.listPrice.price > product.calculatedPrice.unitPrice"
                  class="text-xl text-gray-500 line-through"
              >
                {{ formatPrice(product.calculatedPrice.listPrice.price) }}
              </p>
              <span
                  v-if="discountPercentage > 0"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
              >
                -{{ discountPercentage }}%
              </span>
            </div>
            <p class="mt-1 text-sm text-gray-500">inkl. MwSt., zzgl. Versandkosten</p>
          </div>

          <!-- Reviews -->
          <div class="mt-6">
            <h3 class="sr-only">Bewertungen</h3>
            <div class="flex items-center">
              <div class="flex items-center">
                <StarIcon
                    v-for="rating in [0, 1, 2, 3, 4]"
                    :key="rating"
                    :class="[
                    averageRating > rating ? 'text-yellow-400' : 'text-gray-200',
                    'h-5 w-5 flex-shrink-0'
                  ]"
                    aria-hidden="true"
                />
              </div>
              <p class="sr-only">{{ averageRating }} von 5 Sternen</p>
              <a href="#reviews" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {{ reviewCount }} Bewertungen
              </a>
            </div>
          </div>

          <!-- Product description -->
          <div class="mt-6">
            <h3 class="sr-only">Beschreibung</h3>
            <div
                class="space-y-6 text-base text-gray-700 prose prose-sm max-w-none"
                v-html="product.description"
            />
          </div>

          <!-- Product properties -->
          <div v-if="product.properties?.length" class="mt-6">
            <h3 class="text-sm font-medium text-gray-900">Eigenschaften</h3>
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div
                  v-for="property in product.properties"
                  :key="property.id"
                  class="flex justify-between text-sm"
              >
                <span class="text-gray-500">{{ property.group?.name }}:</span>
                <span class="text-gray-900">{{ property.name }}</span>
              </div>
            </div>
          </div>

          <!-- Product variants/options -->
          <div v-if="product.options?.length" class="mt-8">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium text-gray-900">Varianten</h3>
            </div>

            <fieldset class="mt-4">
              <legend class="sr-only">Wähle eine Variante</legend>
              <div class="grid grid-cols-4 gap-4">
                <label
                    v-for="option in product.options"
                    :key="option.id"
                    class="group relative flex cursor-pointer rounded-md border bg-white py-3 px-4 shadow-sm focus:outline-none"
                >
                  <input
                      type="radio"
                      :name="option.group?.name || 'variant'"
                      :value="option.id"
                      v-model="selectedOptions[option.group?.name || 'variant']"
                      class="sr-only"
                  />
                  <span class="flex flex-1">
                    <span class="flex flex-col">
                      <span class="block text-sm font-medium text-gray-900">{{ option.name }}</span>
                    </span>
                  </span>
                </label>
              </div>
            </fieldset>
          </div>

          <!-- Stock status -->
          <div class="mt-6">
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

          <!-- Quantity selector -->
          <div class="mt-6">
            <label for="quantity" class="block text-sm font-medium text-gray-700">
              Menge
            </label>
            <div class="mt-1 flex items-center space-x-3">
              <button
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                  class="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MinusIcon class="h-4 w-4" />
              </button>
              <input
                  id="quantity"
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  :max="product.availableStock"
                  class="block w-20 rounded-md border-gray-300 text-center text-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                  @click="increaseQuantity"
                  :disabled="quantity >= product.availableStock"
                  class="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusIcon class="h-4 w-4" />
              </button>
            </div>
          </div>

          <!-- Add to cart -->
          <div class="mt-10 flex space-x-4">
            <button
                @click="addToCart"
                :disabled="addingToCart || product.availableStock <= 0"
                class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ShoppingCartIcon class="h-5 w-5 mr-2" />
              <span v-if="!addingToCart">In den Warenkorb</span>
              <span v-else>Wird hinzugefügt...</span>
            </button>

            <button
                @click="toggleWishlist"
                :class="[
                'flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors duration-200',
                isInWishlist ? 'text-red-500 hover:text-red-600' : ''
              ]"
            >
              <HeartIcon
                  :class="[
                  'h-6 w-6 flex-shrink-0',
                  isInWishlist ? 'fill-current' : ''
                ]"
                  aria-hidden="true"
              />
              <span class="sr-only">
                {{ isInWishlist ? 'Von Wunschliste entfernen' : 'Zur Wunschliste hinzufügen' }}
              </span>
            </button>
          </div>

          <!-- Additional product info -->
          <div class="mt-10 border-t border-gray-200 pt-10">
            <h3 class="text-sm font-medium text-gray-900">Produktinformationen</h3>
            <div class="mt-4 prose prose-sm text-gray-500">
              <ul role="list">
                <li>Kostenloser Versand ab 50€</li>
                <li>30 Tage Rückgaberecht</li>
                <li>2 Jahre Garantie</li>
                <li>Schnelle Lieferung in 1-3 Werktagen</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Product tabs -->
      <div class="mt-16">
        <ProductTabs
            :product="product"
            :reviews="reviews"
            @add-review="handleAddReview"
        />
      </div>

      <!-- Related Products -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-8">
          Ähnliche Produkte
        </h2>
        <div v-if="relatedProductsLoading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p class="mt-2 text-gray-500">Lade ähnliche Produkte...</p>
        </div>
        <div v-else class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct.id"
              :product="relatedProduct"
          />
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <ProductImageModal
        v-if="openImageModal"
        :images="productImages"
        :selected-index="selectedImageIndex"
        :product-name="product.name"
        @close="openImageModal = false"
        @select-image="selectedImageIndex = $event"
    />
  </div>

  <div v-else-if="loading" class="text-center py-16">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    <p class="mt-2 text-gray-500">Lade Produkt...</p>
  </div>

  <div v-else class="text-center py-16">
    <ExclamationTriangleIcon class="mx-auto h-12 w-12 text-gray-400" />
    <h3 class="mt-4 text-lg font-medium text-gray-900">Produkt nicht gefunden</h3>
    <p class="mt-2 text-gray-500">
      Das angeforderte Produkt konnte nicht gefunden werden.
    </p>
    <NuxtLink
        to="/products"
        class="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
    >
      Zurück zu den Produkten →
    </NuxtLink>
  </div>
</template>

<script setup>
import {
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  HomeIcon,
  ChevronRightIcon,
  CheckIcon,
  XMarkIcon,
  MinusIcon,
  PlusIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'
import { useCartStore } from '~/stores/cart'

// Router
const route = useRoute()

// Stores
const cartStore = useCartStore()

// Data
const product = ref(null)
const relatedProducts = ref([])
const reviews = ref([])
const loading = ref(true)
const relatedProductsLoading = ref(false)
const addingToCart = ref(false)
const quantity = ref(1)
const selectedImageIndex = ref(0)
const selectedOptions = ref({})
const openImageModal = ref(false)
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

const averageRating = computed(() => {
  if (!reviews.value.length) return 0
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  return Math.round((sum / reviews.value.length) * 10) / 10
})

const reviewCount = computed(() => reviews.value.length)

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const loadProduct = async (productId) => {
  try {
    loading.value = true

    const response = await $shopwareApi(`/product/${productId}`, {
      method: 'POST',
      body: {
        associations: {
          cover: {},
          media: {},
          manufacturer: {},
          prices: {},
          properties: {
            associations: {
              group: {}
            }
          },
          categories: {},
          options: {
            associations: {
              group: {}
            }
          }
        }
      }
    })

    product.value = response

    // Set SEO data
    useHead({
      title: response.name,
      meta: [
        { name: 'description', content: response.metaDescription || response.description?.replace(/<[^>]*>/g, '').substring(0, 160) },
        { property: 'og:title', content: response.name },
        { property: 'og:description', content: response.metaDescription || response.description?.replace(/<[^>]*>/g, '').substring(0, 160) },
        { property: 'og:image', content: response.cover?.url }
      ]
    })

    // Load related data
    loadRelatedProducts()
    loadReviews()

  } catch (error) {
    console.error('Failed to load product:', error)
    $notify.error('Fehler beim Laden des Produkts')
  } finally {
    loading.value = false
  }
}

const loadRelatedProducts = async () => {
  try {
    relatedProductsLoading.value = true

    // Get products from same category
    const categoryId = product.value.categories?.[0]?.id
    if (!categoryId) return

    const response = await $shopwareApi('/product', {
      method: 'POST',
      body: {
        limit: 4,
        filter: [
          {
            type: 'equals',
            field: 'categoryTree',
            value: categoryId
          },
          {
            type: 'not',
            operator: 'AND',
            queries: [
              {
                type: 'equals',
                field: 'id',
                value: product.value.id
              }
            ]
          }
        ],
        associations: {
          cover: {},
          manufacturer: {},
          prices: {}
        }
      }
    })

    relatedProducts.value = response.elements || []
  } catch (error) {
    console.error('Failed to load related products:', error)
  } finally {
    relatedProductsLoading.value = false
  }
}

const loadReviews = async () => {
  try {
    // Mock reviews for demo - replace with actual API call
    reviews.value = [
      {
        id: 1,
        customerName: 'Max Mustermann',
        rating: 5,
        title: 'Sehr zufrieden!',
        comment: 'Tolles Produkt, schnelle Lieferung. Kann ich nur empfehlen.',
        createdAt: new Date('2024-01-15'),
        verified: true
      },
      {
        id: 2,
        customerName: 'Anna Schmidt',
        rating: 4,
        title: 'Gute Qualität',
        comment: 'Produkt entspricht der Beschreibung. Kleine Abzüge beim Versand.',
        createdAt: new Date('2024-01-10'),
        verified: true
      }
    ]
  } catch (error) {
    console.error('Failed to load reviews:', error)
  }
}

const addToCart = async () => {
  if (!product.value || product.value.availableStock <= 0) return

  try {
    addingToCart.value = true
    await cartStore.addProduct(product.value.id, quantity.value)
  } catch (error) {
    console.error('Failed to add to cart:', error)
  } finally {
    addingToCart.value = false
  }
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

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value

  if (isInWishlist.value) {
    $notify.success('Produkt zur Wunschliste hinzugefügt')
  } else {
    $notify.info('Produkt von Wunschliste entfernt')
  }
}

const handleAddReview = (reviewData) => {
  reviews.value.unshift({
    id: Date.now(),
    ...reviewData,
    createdAt: new Date(),
    verified: false
  })

  $notify.success('Bewertung erfolgreich hinzugefügt')
}

// Initialize
onMounted(() => {
  const productId = route.params.id
  loadProduct(productId)
})
</script>