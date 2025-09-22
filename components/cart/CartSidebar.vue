<template>
  <div
      v-if="open"
      class="fixed inset-0 z-50 overflow-hidden"
      @click.self="closeCart"
  >
    <div class="absolute inset-0 bg-black bg-opacity-25"></div>
    <div class="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
      <div class="flex h-full flex-col">
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-lg font-medium">Warenkorb</h2>
          <button @click="closeCart" class="text-gray-400 hover:text-gray-500">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>

        <div class="flex-1 p-4">
          <div class="text-center py-12">
            <ShoppingBagIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-4 text-sm font-medium text-gray-900">Warenkorb ist leer</h3>
            <p class="mt-1 text-sm text-gray-500">Fügen Sie Produkte hinzu, um zu beginnen.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'

const open = ref(false)

const closeCart = () => {
  open.value = false
}

onMounted(() => {
  window.addEventListener('toggleCart', () => {
    open.value = !open.value
  })
})
</script>