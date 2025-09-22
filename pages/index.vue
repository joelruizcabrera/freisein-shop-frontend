<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-gray-900">
      <div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div class="sm:max-w-lg">
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Willkommen bei Freisein
            </h1>
            <p class="mt-4 text-xl text-gray-300">
              Entdecke hochwertige Produkte in unserem modernen Online-Shop.
            </p>
          </div>
          <div class="mt-10">
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
            v-for="product in products"
            :key="product.id"
            :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const products = ref([])
const loading = ref(true)

useHead({
  title: 'Willkommen'
})

onMounted(async () => {
  loading.value = true

  // Mock Produkte für Demo
  await new Promise(resolve => setTimeout(resolve, 1000))

  products.value = [
    {
      id: '1',
      name: 'Premium T-Shirt',
      price: 29.99,
      image: 'https://via.placeholder.com/300x300?text=T-Shirt',
      manufacturer: { name: 'Freisein Fashion' }
    },
    {
      id: '2',
      name: 'Designer Jeans',
      price: 89.99,
      image: 'https://via.placeholder.com/300x300?text=Jeans',
      manufacturer: { name: 'Freisein Denim' }
    },
    {
      id: '3',
      name: 'Sneaker Classic',
      price: 119.99,
      image: 'https://via.placeholder.com/300x300?text=Sneaker',
      manufacturer: { name: 'Freisein Shoes' }
    },
    {
      id: '4',
      name: 'Pullover Deluxe',
      price: 59.99,
      image: 'https://via.placeholder.com/300x300?text=Pullover',
      manufacturer: { name: 'Freisein Comfort' }
    }
  ]

  loading.value = false
})
</script>