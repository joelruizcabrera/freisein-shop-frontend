<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-gray-200 pb-6">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">Alle Produkte</h1>

        <!-- Sort -->
        <div class="flex items-center space-x-4">
          <label class="text-sm font-medium text-gray-700">Sortieren:</label>
          <select
              v-model="sortBy"
              @change="handleSort"
              class="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Preis niedrig → hoch</option>
            <option value="price-desc">Preis hoch → niedrig</option>
          </select>
        </div>
      </div>

      <div class="pt-6 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <!-- Filters -->
        <aside class="hidden lg:block">
          <h3 class="sr-only">Filter</h3>
          <ProductFilters @filter-change="handleFilterChange" />
        </aside>

        <!-- Product Grid -->
        <div class="lg:col-span-2 xl:col-span-3">
          <div v-if="loading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p class="mt-2 text-gray-500">Lade Produkte...</p>
          </div>

          <div v-else-if="products.length === 0" class="text-center py-12">
            <p class="text-gray-500">Keine Produkte gefunden.</p>
          </div>

          <div v-else class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
            />
          </div>

          <!-- Pagination -->
          <ProductPagination
              v-if="total > limit"
              :current-page="currentPage"
              :total-pages="Math.ceil(total / limit)"
              @page-change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductSearch } from '@shopware-pwa/composables-next'
import ProductCard from "../../components/product/ProductCard.vue";

useHead({
  title: 'Alle Produkte'
})

const route = useRoute()
const router = useRouter()

const { search, getProducts, getTotal, loading } = useProductSearch()

const products = computed(() => getProducts.value)
const total = computed(() => getTotal.value)

const currentPage = ref(1)
const limit = ref(20)
const sortBy = ref('name-asc')
const filters = ref({})

const searchProducts = async () => {
  await search({
    page: currentPage.value,
    limit: limit.value,
    sort: sortBy.value,
    ...filters.value
  })
}

const handleSort = () => {
  currentPage.value = 1
  searchProducts()
}

const handleFilterChange = (newFilters) => {
  filters.value = newFilters
  currentPage.value = 1
  searchProducts()
}

const handlePageChange = (page) => {
  currentPage.value = page
  searchProducts()
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  searchProducts()
})
</script>