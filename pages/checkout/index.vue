<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Progress Indicator -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex" aria-label="Progress">
          <ol role="list" class="flex items-center space-x-5 py-4">
            <li v-for="(step, stepIdx) in steps" :key="step.name" class="flex items-center">
              <div v-if="step.status === 'complete'" class="flex items-center">
                <div class="flex-shrink-0 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                  <CheckIcon class="w-3 h-3 text-white" aria-hidden="true" />
                </div>
                <span class="ml-3 text-sm font-medium text-gray-900">{{ step.name }}</span>
              </div>
              <div v-else-if="step.status === 'current'" class="flex items-center">
                <div class="flex-shrink-0 w-5 h-5 bg-indigo-600 rounded-full" aria-hidden="true"></div>
                <span class="ml-3 text-sm font-medium text-indigo-600">{{ step.name }}</span>
              </div>
              <div v-else class="flex items-center">
                <div class="flex-shrink-0 w-5 h-5 bg-gray-300 rounded-full" aria-hidden="true"></div>
                <span class="ml-3 text-sm font-medium text-gray-500">{{ step.name }}</span>
              </div>

              <ChevronRightIcon
                  v-if="stepIdx !== steps.length - 1"
                  class="w-5 h-5 text-gray-300 ml-5"
                  aria-hidden="true"
              />
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <div class="max-w-7xl mx-auto pt-8 pb-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto lg:max-w-none">
        <h1 class="sr-only">Checkout</h1>

        <form @submit.prevent="processOrder" class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <!-- Contact Information -->
            <div>
              <h2 class="text-lg font-medium text-gray-900">Kontaktinformationen</h2>

              <div class="mt-4">
                <label for="email" class="block text-sm font-medium text-gray-700">
                  E-Mail-Adresse
                </label>
                <div class="mt-1">
                  <input
                      id="email"
                      v-model="checkoutForm.email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      :class="{ 'border-red-300': errors.email }"
                  />
                  <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                </div>
              </div>

              <div class="mt-4">
                <div class="flex items-center">
                  <input
                      id="newsletter"
                      v-model="checkoutForm.newsletter"
                      name="newsletter"
                      type="checkbox"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label for="newsletter" class="ml-2 block text-sm text-gray-900">
                    E-Mail-Updates über Angebote und Neuigkeiten erhalten
                  </label>
                </div>
              </div>
            </div>

            <!-- Shipping Information -->
            <div class="mt-10 border-t border-gray-200 pt-10">
              <h2 class="text-lg font-medium text-gray-900">Lieferadresse</h2>

              <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label for="first-name" class="block text-sm font-medium text-gray-700">
                    Vorname
                  </label>
                  <div class="mt-1">
                    <input
                        id="first-name"
                        v-model="checkoutForm.shipping.firstName"
                        name="first-name"
                        type="text"
                        autocomplete="given-name"
                        required
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label for="last-name" class="block text-sm font-medium text-gray-700">
                    Nachname
                  </label>
                  <div class="mt-1">
                    <input
                        id="last-name"
                        v-model="checkoutForm.shipping.lastName"
                        name="last-name"
                        type="text"
                        autocomplete="family-name"
                        required
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="company" class="block text-sm font-medium text-gray-700">
                    Firma (optional)
                  </label>
                  <div class="mt-1">
                    <input
                        id="company"
                        v-model="checkoutForm.shipping.company"
                        name="company"
                        type="text"
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="address" class="block text-sm font-medium text-gray-700">
                    Adresse
                  </label>
                  <div class="mt-1">
                    <input
                        id="address"
                        v-model="checkoutForm.shipping.address"
                        name="address"
                        type="text"
                        autocomplete="street-address"
                        required
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="apartment" class="block text-sm font-medium text-gray-700">
                    Wohnung, Büro, etc. (optional)
                  </label>
                  <div class="mt-1">
                    <input
                        id="apartment"
                        v-model="checkoutForm.shipping.apartment"
                        name="apartment"
                        type="text"
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700">
                    Stadt
                  </label>
                  <div class="mt-1">
                    <input
                        id="city"
                        v-model="checkoutForm.shipping.city"
                        name="city"
                        type="text"
                        autocomplete="address-level2"
                        required
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label for="country" class="block text-sm font-medium text-gray-700">
                    Land
                  </label>
                  <div class="mt-1">
                    <select
                        id="country"
                        v-model="checkoutForm.shipping.country"
                        name="country"
                        autocomplete="country-name"
                        required
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="DE">Deutschland</option>
                      <option value="AT">Österreich</option>
                      <option value="CH">Schweiz</option>
                      <option value="FR">Frankreich</option>
                      <option value="NL">Niederlande</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label for="region" class="block text-sm font-medium text-gray-700">
                    Bundesland
                  </label>
                  <div class="mt-1">
                    <input
                        id="region"
                        v-model="checkoutForm.shipping.region"
                        name="region"
                        type="text"
                        autocomplete="address-level1"
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label for="postal-code" class="block text-sm font-medium text-gray-700">
                    Postleitzahl
                  </label>
                  <div class="mt-1">
                    <input
                        id="postal-code"
                        v-model="checkoutForm.shipping.postalCode"
                        name="postal-code"
                        type="text"
                        autocomplete="postal-code"
                        required
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="phone" class="block text-sm font-medium text-gray-700">
                    Telefon
                  </label>
                  <div class="mt-1">
                    <input
                        id="phone"
                        v-model="checkoutForm.shipping.phone"
                        name="phone"
                        type="tel"
                        autocomplete="tel"
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Billing Address -->
            <div class="mt-10 border-t border-gray-200 pt-10">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-medium text-gray-900">Rechnungsadresse</h2>
                <div class="flex items-center">
                  <input
                      id="same-as-shipping"
                      v-model="sameAsShipping"
                      name="same-as-shipping"
                      type="checkbox"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label for="same-as-shipping" class="ml-2 block text-sm text-gray-900">
                    Gleich wie Lieferadresse
                  </label>
                </div>
              </div>

              <div v-if="!sameAsShipping" class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <!-- Billing address fields (same structure as shipping) -->
                <div>
                  <label for="billing-first-name" class="block text-sm font-medium text-gray-700">
                    Vorname
                  </label>
                  <div class="mt-1">
                    <input
                        id="billing-first-name"
                        v-model="checkoutForm.billing.firstName"
                        name="billing-first-name"
                        type="text"
                        required
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label for="billing-last-name" class="block text-sm font-medium text-gray-700">
                    Nachname
                  </label>
                  <div class="mt-1">
                    <input
                        id="billing-last-name"
                        v-model="checkoutForm.billing.lastName"
                        name="billing-last-name"
                        type="text"
                        required
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <!-- Add other billing fields as needed -->
              </div>
            </div>

            <!-- Delivery Options -->
            <div class="mt-10 border-t border-gray-200 pt-10">
              <h2 class="text-lg font-medium text-gray-900">Versandoptionen</h2>

              <fieldset class="mt-4">
                <legend class="sr-only">Versandmethode</legend>
                <div class="space-y-4">
                  <div
                      v-for="method in deliveryMethods"
                      :key="method.id"
                      class="flex items-center"
                  >
                    <input
                        :id="`delivery-method-${method.id}`"
                        v-model="checkoutForm.deliveryMethod"
                        :value="method.id"
                        name="delivery-method"
                        type="radio"
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label :for="`delivery-method-${method.id}`" class="ml-3 block text-sm font-medium text-gray-700">
                      <div class="flex justify-between">
                        <span>{{ method.title }}</span>
                        <span class="ml-6 text-gray-900">{{ formatPrice(method.price) }}</span>
                      </div>
                      <div class="text-gray-500">{{ method.turnaround }}</div>
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <!-- Payment Methods -->
            <div class="mt-10 border-t border-gray-200 pt-10">
              <h2 class="text-lg font-medium text-gray-900">Zahlungsmethode</h2>

              <fieldset class="mt-4">
                <legend class="sr-only">Zahlungsmethode</legend>
                <div class="space-y-4">
                  <div
                      v-for="method in paymentMethods"
                      :key="method.id"
                      class="flex items-center"
                  >
                    <input
                        :id="`payment-method-${method.id}`"
                        v-model="checkoutForm.paymentMethod"
                        :value="method.id"
                        name="payment-method"
                        type="radio"
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <label :for="`payment-method-${method.id}`" class="ml-3 flex items-center">
                      <span class="block text-sm font-medium text-gray-700">{{ method.title }}</span>
                      <img
                          v-if="method.logo"
                          :src="method.logo"
                          :alt="method.title"
                          class="ml-2 h-6 w-auto"
                      />
                    </label>
                  </div>
                </div>
              </fieldset>

              <!-- Credit Card Form -->
              <div v-if="checkoutForm.paymentMethod === 'credit-card'" class="mt-6 grid grid-cols-4 gap-6">
                <div class="col-span-4">
                  <label for="card-number" class="block text-sm font-medium text-gray-700">
                    Kartennummer
                  </label>
                  <div class="mt-1">
                    <input
                        id="card-number"
                        v-model="checkoutForm.cardInfo.number"
                        name="card-number"
                        type="text"
                        autocomplete="cc-number"
                        placeholder="1234 1234 1234 1234"
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div class="col-span-4">
                  <label for="name-on-card" class="block text-sm font-medium text-gray-700">
                    Name auf der Karte
                  </label>
                  <div class="mt-1">
                    <input
                        id="name-on-card"
                        v-model="checkoutForm.cardInfo.name"
                        name="name-on-card"
                        type="text"
                        autocomplete="cc-name"
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div class="col-span-3">
                  <label for="expiration-date" class="block text-sm font-medium text-gray-700">
                    Ablaufdatum (MM/YY)
                  </label>
                  <div class="mt-1">
                    <input
                        id="expiration-date"
                        v-model="checkoutForm.cardInfo.expiry"
                        name="expiration-date"
                        type="text"
                        autocomplete="cc-exp"
                        placeholder="MM/YY"
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label for="cvc" class="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <div class="mt-1">
                    <input
                        id="cvc"
                        v-model="checkoutForm.cardInfo.cvc"
                        name="cvc"
                        type="text"
                        autocomplete="csc"
                        placeholder="123"
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="mt-10 lg:mt-0">
            <h2 class="text-lg font-medium text-gray-900">Bestellübersicht</h2>

            <div class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 class="sr-only">Artikel in deiner Bestellung</h3>
              <ul role="list" class="divide-y divide-gray-200">
                <li
                    v-for="item in cartStore.itemsWithDetails"
                    :key="item.id"
                    class="flex py-6 px-4 sm:px-6"
                >
                  <div class="flex-shrink-0">
                    <img
                        :src="getItemImage(item)"
                        :alt="item.label"
                        class="w-20 h-20 rounded-md object-cover object-center"
                    />
                  </div>

                  <div class="ml-6 flex-1 flex flex-col">
                    <div class="flex">
                      <div class="min-w-0 flex-1">
                        <h4 class="text-sm">
                          <span class="font-medium text-gray-700">{{ item.label }}</span>
                        </h4>
                        <p class="mt-1 text-sm text-gray-500">Menge: {{ item.quantity }}</p>
                      </div>

                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-900">
                          {{ formatPrice(item.price?.totalPrice || 0) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              <dl class="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                <div class="flex items-center justify-between">
                  <dt class="text-sm">Zwischensumme</dt>
                  <dd class="text-sm font-medium text-gray-900">{{ cartStore.formattedSubtotalPrice }}</dd>
                </div>
                <div class="flex items-center justify-between">
                  <dt class="text-sm">Versand</dt>
                  <dd class="text-sm font-medium text-gray-900">{{ formatPrice(selectedDeliveryPrice) }}</dd>
                </div>
                <div class="flex items-center justify-between">
                  <dt class="text-sm">MwSt.</dt>
                  <dd class="text-sm font-medium text-gray-900">{{ formatPrice(cartStore.taxAmount) }}</dd>
                </div>
                <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt class="text-base font-medium">Gesamtsumme</dt>
                  <dd class="text-base font-medium text-gray-900">{{ formatPrice(totalAmount) }}</dd>
                </div>
              </dl>

              <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                    type="submit"
                    :disabled="processing || cartStore.isEmpty"
                    class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="processing" class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Bestellung wird verarbeitet...
                  </span>
                  <span v-else>
                    Bestellung abschließen
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '~/stores/cart'
import { useUserStore } from '~/stores/user'

// SEO
useHead({
  title: 'Checkout'
})

// Middleware
definePageMeta({
  middleware: ['cart-not-empty']
})

// Stores
const cartStore = useCartStore()
const userStore = useUserStore()

// Router
const router = useRouter()

// Data
const processing = ref(false)
const sameAsShipping = ref(true)
const errors = ref({})

const steps = ref([
  { name: 'Warenkorb', status: 'complete' },
  { name: 'Lieferung & Zahlung', status: 'current' },
  { name: 'Bestätigung', status: 'upcoming' }
])

const checkoutForm = ref({
  email: userStore.customer?.email || '',
  newsletter: false,
  shipping: {
    firstName: userStore.customer?.firstName || '',
    lastName: userStore.customer?.lastName || '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'DE',
    phone: ''
  },
  billing: {
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'DE'
  },
  deliveryMethod: 'standard',
  paymentMethod: 'credit-card',
  cardInfo: {
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  }
})

const deliveryMethods = ref([
  {
    id: 'standard',
    title: 'Standardversand',
    turnaround: '4-6 Werktage',
    price: 4.95
  },
  {
    id: 'express',
    title: 'Expressversand',
    turnaround: '1-2 Werktage',
    price: 9.95
  },
  {
    id: 'overnight',
    title: 'Über-Nacht-Versand',
    turnaround: '1 Werktag',
    price: 19.95
  }
])

const paymentMethods = ref([
  {
    id: 'credit-card',
    title: 'Kreditkarte',
    logo: null
  },
  {
    id: 'paypal',
    title: 'PayPal',
    logo: null
  },
  {
    id: 'bank-transfer',
    title: 'Überweisung',
    logo: null
  },
  {
    id: 'invoice',
    title: 'Kauf auf Rechnung',
    logo: null
  }
])

// API
const { $notify } = useNuxtApp()

// Computed
const selectedDeliveryPrice = computed(() => {
  const method = deliveryMethods.value.find(m => m.id === checkoutForm.value.deliveryMethod)
  return method ? method.price : 0
})

const totalAmount = computed(() => {
  return cartStore.totalPrice + selectedDeliveryPrice.value
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const getItemImage = (item) => {
  return item.cover?.url ||
      item.payload?.cover?.url ||
      'https://via.placeholder.com/100x100?text=Produkt'
}

const validateForm = () => {
  errors.value = {}

  if (!checkoutForm.value.email) {
    errors.value.email = 'E-Mail-Adresse ist erforderlich'
  } else if (!/\S+@\S+\.\S+/.test(checkoutForm.value.email)) {
    errors.value.email = 'Ungültige E-Mail-Adresse'
  }

  // Validate required shipping fields
  const requiredShippingFields = ['firstName', 'lastName', 'address', 'city', 'postalCode']
  for (const field of requiredShippingFields) {
    if (!checkoutForm.value.shipping[field]) {
      errors.value[`shipping.${field}`] = 'Dieses Feld ist erforderlich'
    }
  }

  // Validate payment method specific fields
  if (checkoutForm.value.paymentMethod === 'credit-card') {
    if (!checkoutForm.value.cardInfo.number) {
      errors.value['cardInfo.number'] = 'Kartennummer ist erforderlich'
    }
    if (!checkoutForm.value.cardInfo.name) {
      errors.value['cardInfo.name'] = 'Name auf der Karte ist erforderlich'
    }
    if (!checkoutForm.value.cardInfo.expiry) {
      errors.value['cardInfo.expiry'] = 'Ablaufdatum ist erforderlich'
    }
    if (!checkoutForm.value.cardInfo.cvc) {
      errors.value['cardInfo.cvc'] = 'CVC ist erforderlich'
    }
  }

  return Object.keys(errors.value).length === 0
}

const processOrder = async () => {
  if (!validateForm()) {
    $notify.error('Bitte fülle alle erforderlichen Felder aus')
    return
  }

  try {
    processing.value = true

    // Prepare order data
    const orderData = {
      ...checkoutForm.value,
      billing: sameAsShipping.value ? checkoutForm.value.shipping : checkoutForm.value.billing,
      items: cartStore.itemsWithDetails,
      totals: {
        subtotal: cartStore.subtotalPrice,
        shipping: selectedDeliveryPrice.value,
        tax: cartStore.taxAmount,
        total: totalAmount.value
      }
    }

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Create order via API
    const orderId = `ORD-${Date.now()}`

    // Clear cart
    await cartStore.clearCart()

    $notify.success('Bestellung erfolgreich aufgegeben!')

    // Redirect to success page
    await router.push(`/checkout/success?order=${orderId}`)

  } catch (error) {
    console.error('Order processing failed:', error)
    $notify.error('Fehler bei der Bestellverarbeitung. Bitte versuche es erneut.')
  } finally {
    processing.value = false
  }
}

// Watch for same as shipping changes
watch(sameAsShipping, (newValue) => {
  if (newValue) {
    checkoutForm.value.billing = { ...checkoutForm.value.shipping }
  }
})

// Initialize with user data if available
onMounted(() => {
  if (userStore.isLoggedIn && userStore.defaultBillingAddress) {
    const address = userStore.defaultBillingAddress
    checkoutForm.value.shipping = {
      firstName: address.firstName || '',
      lastName: address.lastName || '',
      company: address.company || '',
      address: address.street || '',
      apartment: address.additionalAddressLine1 || '',
      city: address.city || '',
      region: address.state || '',
      postalCode: address.zipcode || '',
      country: address.country?.iso || 'DE',
      phone: address.phoneNumber || ''
    }
  }
})
</script>