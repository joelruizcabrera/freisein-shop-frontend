<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-6">
        <div>
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">
            {{ categoryName || 'Alle Produkte' }}
          </h1>
          <p class="mt-2 text-sm text-gray-500">
            {{ total }} {{ total === 1 ? 'Produkt' : 'Produkte' }} gefunden
          </p>
        </div>

        <!-- Sort & View Options -->
        <div class="mt-4 sm:mt-0 flex items-center space-x-4">
          <!-- View Toggle -->
          <div class="flex items-center border border-gray-300 rounded-md">
            <button
                @click="viewMode = 'grid'"
                :class="[
                'p-2 rounded-l-md',
                viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              <Squares2X2Icon class="h-5 w-5" />
            </button>
            <button
                @click="viewMode = 'list'"
                :class="[
                'p-2 rounded-r-md',
                viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              <Bars3Icon class="h-5 w-5" />
            </button>
          </div>

          <!-- Sort -->
          <div class="flex items-center space-x-2">
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
              <option value="created-desc">Neueste zuerst</option>
              <option value="topseller">Bestseller</option>
            </select>
          </div>
        </div>
      </div>

      <div class="pt-6 lg:grid lg:grid-cols-4 lg:gap-x-8">
        <!-- Filters Sidebar -->
        <aside class="hidden lg:block">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Filter</h3>

          <!-- Price Filter -->
          <div class="border-b border-gray-200 py-6">
            <h3 class="text-sm font-medium text-gray-900 mb-4">Preis</h3>
            <div class="space-y-3">
              <div class="flex items-center">
                <input
                    id="price-0"
                    v-model="selectedPriceRanges"
                    name="price"
                    value="0-25"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="price-0" class="ml-3 text-sm text-gray-600">Unter 25€</label>
              </div>
              <div class="flex items-center">
                <input
                    id="price-1"
                    v-model="selectedPriceRanges"
                    name="price"
                    value="25-50"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="price-1" class="ml-3 text-sm text-gray-600">25€ - 50€</label>
              </div>
              <div class="flex items-center">
                <input
                    id="price-2"
                    v-model="selectedPriceRanges"
                    name="price"
                    value="50-100"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="price-2" class="ml-3 text-sm text-gray-600">50€ - 100€</label>
              </div>
              <div class="flex items-center">
                <input
                    id="price-3"
                    v-model="selectedPriceRanges"
                    name="price"
                    value="100-"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="price-3" class="ml-3 text-sm text-gray-600">Über 100€</label>
              </div>
            </div>
          </div>

          <!-- Manufacturer Filter -->
          <div class="border-b border-gray-200 py-6" v-if="manufacturers.length > 0">
            <h3 class="text-sm font-medium text-gray-900 mb-4">Hersteller</h3>
            <div class="space-y-3 max-h-48 overflow-y-auto">
              <div
                  v-for="manufacturer in manufacturers"
                  :key="manufacturer.id"
                  class="flex items-center"
              >
                <input
                    :id="`manufacturer-${manufacturer.id}`"
                    v-model="selectedManufacturers"
                    :value="manufacturer.id"
                    name="manufacturer"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label :for="`manufacturer-${manufacturer.id}`" class="ml-3 text-sm text-gray-600">
                  {{ manufacturer.name }}
                </label>
              </div>
            </div>
          </div>

          <!-- Availability Filter -->
          <div class="border-b border-gray-200 py-6">
            <h3 class="text-sm font-medium text-gray-900 mb-4">Verfügbarkeit</h3>
            <div class="space-y-3">
              <div class="flex items-center">
                <input
                    id="availability-in-stock"
                    v-model="onlyInStock"
                    name="availability"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="availability-in-stock" class="ml-3 text-sm text-gray-600">
                  Nur verfügbare Artikel
                </label>
              </div>
            </div>
          </div>

          <!-- Clear Filters -->
          <div class="pt-6">
            <button
                @click="clearFilters"
                class="w-full bg-gray-100 text-gray-900 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Filter zurücksetzen
            </button>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="lg:col-span-3">
          <!-- Mobile Filter Button -->
          <div class="lg:hidden mb-6">
            <button
                @click="showMobileFilters = true"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <AdjustmentsHorizontalIcon class="h-5 w-5 mr-2" />
              Filter
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="text-center py-16">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p class="mt-2 text-gray-500">Lade Produkte...</p>
          </div>

          <!-- No Results -->
          <div v-else-if="products.length === 0" class="text-center py-16">
            <MagnifyingGlassIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-4 text-lg font-medium text-gray-900">Keine Produkte gefunden</h3>
            <p class="mt-2 text-gray-500">
              Versuche deine Suchkriterien zu ändern oder Filter zurückzusetzen.
            </p>
            <button
                @click="clearFilters"
                class="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Filter zurücksetzen
            </button>
          </div>

          <!-- Products Grid -->
          <div
              v-else
              :class="[
              viewMode === 'grid'
                ? 'grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
                : 'space-y-6'
            ]"
          >
            <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
                :view-mode="viewMode"
            />
          </div>

          <!-- Pagination -->
          <ProductPagination
              v-if="totalPages > 1"
              :current-page="currentPage"
              :total-pages="totalPages"
              :total="total"
              :limit="limit"
              @page-change="handlePageChange"
              class="mt-12"
          />
        </div>
      </div>
    </div>

    <!-- Mobile Filter Modal -->
    <MobileFilterModal
        v-if="showMobileFilters"
        :manufacturers="manufacturers"
        :selected-price-ranges="selectedPriceRanges"
        :selected-manufacturers="selectedManufacturers"
        :only-in-stock="onlyInStock"
        @update:price-ranges="selectedPriceRanges = $event"
        @update:manufacturers="selectedManufacturers = $event"
        @update:in-stock="onlyInStock = $event"
        @clear-filters="clearFilters"
        @close="showMobileFilters = false"
    />
  </div>
</template>

<script setup>
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  Bars3Icon
} from '@heroicons/vue/24/outline'

// SEO
useHead({
  title: 'Alle Produkte'
})

// Router
const route = useRoute()
const router = useRouter()

// Data
const products = ref([])
const manufacturers = ref([])
const loading = ref(true)
const viewMode = ref('grid')
const showMobileFilters = ref(false)

// Pagination
const currentPage = ref(1)
const limit = ref(12)
const total = ref(0)
const totalPages = computed(() => Math.ceil(total.value / limit.value))

// Filters
const sortBy = ref('name-asc')
const selectedPriceRanges = ref([])
const selectedManufacturers = ref([])
const onlyInStock = ref(false)
const searchQuery = ref('')
const categoryId = ref(null)
const categoryName = ref('')

// API
const { $shopwareApi, $notify } = useNuxtApp()

// Watch for filter changes
watch(
    [selectedPriceRanges, selectedManufacturers, onlyInStock, searchQuery],
    () => {
      currentPage.value = 1
      loadProducts()
    },
    { deep: true }
)

// Methods
const loadProducts = async () => {
  try {
    loading.value = true

    const filters = []

    // Category filter
    if (categoryId.value) {
      filters.push({
        type: 'equals',
        field: 'categoryTree',
        value: categoryId.value
      })
    }

    // Price filters
    selectedPriceRanges.value.forEach(range => {
      const [min, max] = range.split('-')
      if (max) {
        filters.push({
          type: 'range',
          field: 'price',
          parameters: {
            gte: parseFloat(min),
            lte: parseFloat(max)
          }
        })
      } else {
        filters.push({
          type: 'range',
          field: 'price',
          parameters: {
            gte: parseFloat(min)
          }
        })
      }
    })

    // Manufacturer filters
    if (selectedManufacturers.value.length > 0) {
      filters.push({
        type: 'equalsAny',
        field: 'manufacturerId',
        value: selectedManufacturers.value.join('|')
      })
    }

    // Stock filter
    if (onlyInStock.value) {
      filters.push({
        type: 'equals',
        field: 'isCloseout',
        value: false
      })
    }

    // Search filter
    if (searchQuery.value.trim()) {
      filters.push({
        type: 'contains',
        field: 'name',
        value: searchQuery.value.trim()
      })
    }

    // Sort configuration
    const [field, order] = sortBy.value.split('-')
    const sort = [{ field, order: order.toUpperCase() }]

    const response = await $shopwareApi('/product', {
      method: 'POST',
      body: {
        page: currentPage.value,
        limit: limit.value,
        filter: filters,
        sort,
        associations: {
          cover: {},
          manufacturer: {},
          prices: {},
          properties: {}
        }
      }
    })

    products.value = response.elements || []
    total.value = response.total || 0

  } catch (error) {
    console.error('Failed to load products:', error)
    $notify.error('Fehler beim Laden der Produkte')
  } finally {
    loading.value = false
  }
}

const loadManufacturers = async () => {
  try {
    const response = await $shopwareApi('/product-manufacturer', {
      method: 'POST',
      body: {
        limit: 100,
        sort: [{ field: 'name', order: 'ASC' }]
      }
    })

    manufacturers.value = response.elements || []
  } catch (error) {
    console.error('Failed to load manufacturers:', error)
  }
}

const handleSort = () => {
  currentPage.value = 1
  loadProducts()
}

const handlePageChange = (page) => {
  currentPage.value = page
  loadProducts()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const clearFilters = () => {
  selectedPriceRanges.value = []
  selectedManufacturers.value = []
  onlyInStock.value = false
  searchQuery.value = ''
  currentPage.value = 1
  loadProducts()
}

// Initialize from query params
const initializeFromQuery = () => {
  // Get search query
  if (route.query.search) {
    searchQuery.value = route.query.search
  }

  // Get category
  if (route.query.categoryId) {
    categoryId.value = route.query.categoryId
    categoryName.value = route.query.categoryName || ''
  }

  // Get sort
  if (route.query.sort) {
    sortBy.value = route.query.sort
  }

  // Get page
  if (route.query.page) {
    currentPage.value = parseInt(route.query.page)
  }
}

// Initialize
onMounted(() => {
  initializeFromQuery()
  loadManufacturers()
  loadProducts()
})
</script>