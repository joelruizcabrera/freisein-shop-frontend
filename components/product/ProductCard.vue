<template>
  <div class="group relative">
    <div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
      <img
          :src="product.image"
          :alt="product.name"
          class="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-200"
      />
    </div>

    <div class="mt-4 flex items-center justify-between">
      <div class="flex-1">
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
          {{ formatPrice(product.price) }}
        </p>
      </div>
    </div>

    <div class="mt-4">
      <button
          @click.prevent="addToCart"
          :disabled="adding"
          class="w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {{ adding ? 'Hinzufügen...' : 'In den Warenkorb' }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const adding = ref(false)

const formatPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const addToCart = async () => {
  adding.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 500))

    // Emit event für Warenkorb-Update
    const event = new CustomEvent('product-added', {
      detail: { product: props.product }
    })
    window.dispatchEvent(event)

    // Success feedback
    alert(`${props.product.name} wurde zum Warenkorb hinzugefügt!`)

  } catch (error) {
    console.error('Fehler:', error)
    alert('Fehler beim Hinzufügen zum Warenkorb')
  } finally {
    adding.value = false
  }
}
</script>