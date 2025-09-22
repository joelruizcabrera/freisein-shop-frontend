<template>
  <div class="group relative">
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
      <img
          :src="product.cover?.url || '/placeholder-product.jpg'"
          :alt="product.name"
          class="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-200"
      />
    </div>

    <div class="mt-4 flex items-center justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <NuxtLink :to="`/products/${product.id}`">
            <span aria-hidden="true" class="absolute inset-0" />
            {{ product.name }}
          </NuxtLink>
        </h3>
        <p v-if="product.manufacturer" class="mt-1 text-sm text-gray-500">
          {{ product.manufacturer.name }}
        </p>
      </div>
      <div class="text-right">
        <p class="text-sm font-medium text-gray-900">
          {{ formatPrice(product.calculatedPrice.unitPrice) }}
        </p>
        <p v-if="product.calculatedPrice.listPrice" class="text-sm text-gray-500 line-through">
          {{ formatPrice(product.calculatedPrice.listPrice.price) }}
        </p>
      </div>
    </div>

    <!-- Quick add to cart -->
    <div class="mt-4">
      <button
          @click.prevent="addToCart"
          :disabled="addingToCart"
          class="w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-200"
      >
        <span v-if="!addingToCart">In den Warenkorb</span>
        <span v-else>Hinzufügen...</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '@shopware-pwa/composables-next'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { addProduct } = useCart()
const addingToCart = ref(false)

const formatPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const addToCart = async () => {
  addingToCart.value = true
  try {
    await addProduct({
      id: props.product.id,
      quantity: 1
    })
  } catch (error) {
    console.error('Fehler beim Hinzufügen zum Warenkorb:', error)
  } finally {
    addingToCart.value = false
  }
}
</script>