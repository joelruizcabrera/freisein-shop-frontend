<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gray-900">
      <div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div class="sm:max-w-lg">
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Entdecke unsere neueste Kollektion
            </h1>
            <p class="mt-4 text-xl text-gray-300">
              Hochwertige Produkte für jeden Geschmack. Jetzt mit kostenlosem Versand ab 50€.
            </p>
          </div>
          <div>
            <div class="mt-10">
              <div class="pointer-events-none absolute inset-x-0 top-0 sm:static">
                <img
                    src="/hero-image.jpg"
                    alt="Hero"
                    class="h-80 w-full object-cover sm:h-96"
                />
              </div>
              <NuxtLink
                  to="/products"
                  class="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                Jetzt shoppen
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Products -->
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-8">
        Beliebte Produkte
      </h2>

      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p class="mt-2 text-gray-500">Lade Produkte...</p>
      </div>

      <div v-else class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
        />
      </div>
    </div>

    <!-- Categories -->
    <div class="bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-8">
          Kategorien entdecken
        </h2>
        <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          <CategoryCard
              v-for="category in categories"
              :key="category.id"
              :category="category"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductSearch } from '@shopware-pwa/composables-next'
import ProductCard from "../components/product/ProductCard.vue";

useHead({
  title: 'Willkommen'
})

const { search, getProducts, loading } = useProductSearch()

const featuredProducts = ref([])
const categories = ref([])

onMounted(async () => {
  // Lade beliebte Produkte
  await search({
    limit: 8,
    sort: 'name-asc'
  })
  featuredProducts.value = getProducts.value

  // Mock Kategorien - in echter App über API laden
  categories.value = [
    {
      id: '1',
      name: 'Kleidung',
      image: '/category-clothing.jpg',
      slug: 'kleidung'
    },
    {
      id: '2',
      name: 'Elektronik',
      image: '/category-electronics.jpg',
      slug: 'elektronik'
    },
    {
      id: '3',
      name: 'Bücher',
      image: '/category-books.jpg',
      slug: 'buecher'
    }
  ]
})
</script>