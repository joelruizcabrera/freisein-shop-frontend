<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between border-b border-gray-200 pb-6">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900">Alle Produkte</h1>

        <div class="flex items-center space-x-4">
          <label class="text-sm font-medium text-gray-700">Sortieren:</label>
          <select
              v-model="sortBy"
              class="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Preis niedrig → hoch</option>
            <option value="price-desc">Preis hoch → niedrig</option>
          </select>
        </div>
      </div>

      <div class="pt-6">
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p class="mt-2 text-gray-500">Lade Produkte...</p>
        </div>

        <div v-else class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard
              v-for="product in sortedProducts"
              :key="product.id"
              :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const products = ref([])
const loading = ref(true)
const sortBy = ref('name-asc')

useHead({
  title: 'Alle Produkte'
})

const sortedProducts = computed(() => {
  const sorted = [...products.value]

  switch (sortBy.value) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    default:
      return sorted
  }
})

onMounted(async () => {
  loading.value = true

  // Mock Produktliste
  await new Promise(resolve => setTimeout(resolve, 800))

  products.value = Array.from({ length: 12 }, (_, i) => ({
    id: `${i + 1}`,
    name: `Produkt ${i + 1}`,
    price: Math.round((Math.random() * 100 + 20) * 100) / 100,
    image: `https://via.placeholder.com/300x300?text=Produkt+${i + 1}`,
    manufacturer: { name: `Hersteller ${Math.ceil((i + 1) / 3)}` }
  }))

  loading.value = false
})
</script>