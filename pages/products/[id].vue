<template>
  <div v-if="product" class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <!-- Product Images -->
        <div class="flex flex-col-reverse">
          <div class="mx-auto mt-6 w-full max-w-2xl lg:max-w-none">
            <div class="grid grid-cols-4 gap-6">
              <button
                  v-for="(image, index) in product.media"
                  :key="index"
                  @click="selectedImage = image"
                  class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
              >
                <img
                    :src="image.url"
                    :alt="product.name"
                    class="h-full w-full object-cover object-center rounded-md"
                />
              </button>
            </div>
          </div>

          <div class="aspect-h-1 aspect-w-1 w-full">
            <img
                :src="selectedImage?.url || product.cover?.url"
                :alt="product.name"
                class="h-full w-full object-cover object-center rounded-lg"
            />
          </div>
        </div>

        <!-- Product Info -->
        <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ product.name }}</h1>

          <div class="mt-3">
            <h2 class="sr-only">Produktinformationen</h2>
            <p class="text-3xl tracking-tight text-gray-900">
              {{ formatPrice(product.calculatedPrice.unitPrice) }}
            </p>
          </div>

          <!-- Reviews -->
          <div class="mt-6">
            <h3 class="sr-only">Bewertungen</h3>
            <div class="flex items-center">
              <div class="flex items-center">
                <StarIcon
                    v-for="rating in [0, 1, 2, 3, 4]"
                    :key="rating"
                    :class="[4.5 > rating ? 'text-yellow-400' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
                    aria-hidden="true"
                />
              </div>
              <p class="sr-only">4.5 von 5 Sternen</p>
              <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                117 Bewertungen
              </a>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Beschreibung</h3>
            <div
                class="space-y-6 text-base text-gray-700"
                v-html="product.description"
            />
          </div>

          <!-- Product Options -->
          <div class="mt-10">
            <div v-if="product.options?.length" class="mt-10">
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
                    <input type="radio" :name="option.name" :value="option.id" class="sr-only" />
                    <span class="flex flex-1">
                      <span class="flex flex-col">
                        <span class="block text-sm font-medium text-gray-900">{{ option.name }}</span>
                      </span>
                    </span>
                  </label>
                </div>
              </fieldset>
            </div>

            <!-- Add to Cart -->
            <div class="mt-10 flex">
              <button
                  @click="addToCart"
                  :disabled="addingToCart"
                  class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full disabled:opacity-50"
              >
                <span v-if="!addingToCart">In den Warenkorb</span>
                <span v-else>Wird hinzugefügt...</span>
              </button>

              <button
                  type="button"
                  class="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                <HeartIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                <span class="sr-only">Zu Favoriten hinzufügen</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-8">
          Ähnliche Produkte
        </h2>
        <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct.id"
              :product="relatedProduct"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="loading" class="text-center py-16">
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    <p class="mt-2 text-gray-500">Lade Produkt...</p>
  </div>

  <div v-else class="text-center py-16">
    <p class="text-gray-500">Produkt nicht gefunden</p>
  </div>
</template>

<script setup>
import { useProduct, useCart } from '@shopware-pwa/composables-next'
import { StarIcon, HeartIcon } from '@heroicons/vue/24/outline'
import ProductCard from "../../components/product/ProductCard.vue";

const route = useRoute()
const { product, search: searchProduct, loading } = useProduct()
const { addProduct } = useCart()

const selectedImage = ref(null)
const addingToCart = ref(false)
const relatedProducts = ref([])

const formatPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const addToCart = async () => {
  if (!product.value) return

  addingToCart.value = true
  try {
    await addProduct({
      id: product.value.id,
      quantity: 1
    })
    // Show success message
    alert('Produkt wurde zum Warenkorb hinzugefügt!')
  } catch (error) {
    console.error('Fehler beim Hinzufügen zum Warenkorb:', error)
    alert('Fehler beim Hinzufügen zum Warenkorb')
  } finally {
    addingToCart.value = false
  }
}

onMounted(async () => {
  const productId = route.params.id
  await searchProduct(productId)

  if (product.value) {
    useHead({
      title: product.value.name
    })
  }
})
</script>