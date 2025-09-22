<template>
  <div class="min-h-screen flex">
    <!-- Left side - Form -->
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <NuxtLink to="/" class="flex items-center">
            <div class="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <span class="text-white font-bold text-xl">F</span>
            </div>
            <span class="text-3xl font-bold text-gray-900">Freisein</span>
          </NuxtLink>
          <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Erstelle dein Konto
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Oder
            <NuxtLink
                to="/auth/login"
                class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              melde dich in deinem bestehenden Konto an
            </NuxtLink>
          </p>
        </div>

        <div class="mt-8">
          <!-- Social Registration -->
          <div class="grid grid-cols-2 gap-3">
            <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
              </svg>
              <span class="ml-2">Google</span>
            </button>

            <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd" />
              </svg>
              <span class="ml-2">Facebook</span>
            </button>
          </div>

          <div class="mt-6 relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Oder registriere dich mit E-Mail</span>
            </div>
          </div>

          <!-- Registration Form -->
          <form @submit.prevent="handleRegister" class="mt-6 space-y-6">
            <!-- Personal Information -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700">
                  Vorname *
                </label>
                <div class="mt-1">
                  <input
                      id="firstName"
                      v-model="registerForm.firstName"
                      name="firstName"
                      type="text"
                      autocomplete="given-name"
                      required
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      :class="{ 'border-red-300': errors.firstName }"
                  />
                  <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName }}</p>
                </div>
              </div>

              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700">
                  Nachname *
                </label>
                <div class="mt-1">
                  <input
                      id="lastName"
                      v-model="registerForm.lastName"
                      name="lastName"
                      type="text"
                      autocomplete="family-name"
                      required
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      :class="{ 'border-red-300': errors.lastName }"
                  />
                  <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName }}</p>
                </div>
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                E-Mail-Adresse *
              </label>
              <div class="mt-1">
                <input
                    id="email"
                    v-model="registerForm.email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    :class="{ 'border-red-300': errors.email }"
                />
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Passwort *
              </label>
              <div class="mt-1">
                <input
                    id="password"
                    v-model="registerForm.password"
                    name="password"
                    type="password"
                    autocomplete="new-password"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    :class="{ 'border-red-300': errors.password }"
                />
                <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
                <p class="mt-1 text-xs text-gray-500">
                  Mindestens 8 Zeichen mit Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen
                </p>
              </div>
            </div>

            <div>
              <label for="passwordConfirm" class="block text-sm font-medium text-gray-700">
                Passwort bestätigen *
              </label>
              <div class="mt-1">
                <input
                    id="passwordConfirm"
                    v-model="registerForm.passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    autocomplete="new-password"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    :class="{ 'border-red-300': errors.passwordConfirm }"
                />
                <p v-if="errors.passwordConfirm" class="mt-1 text-sm text-red-600">{{ errors.passwordConfirm }}</p>
              </div>
            </div>

            <!-- Optional Birth Date -->
            <div>
              <label for="birthday" class="block text-sm font-medium text-gray-700">
                Geburtsdatum (optional)
              </label>
              <div class="mt-1">
                <input
                    id="birthday"
                    v-model="registerForm.birthday"
                    name="birthday"
                    type="date"
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <!-- Terms and Privacy -->
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                      id="acceptTerms"
                      v-model="registerForm.acceptTerms"
                      name="acceptTerms"
                      type="checkbox"
                      required
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      :class="{ 'border-red-300': errors.acceptTerms }"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="acceptTerms" class="text-gray-700">
                    Ich akzeptiere die
                    <NuxtLink to="/terms" class="text-indigo-600 hover:text-indigo-500">
                      Allgemeinen Geschäftsbedingungen
                    </NuxtLink>
                    und die
                    <NuxtLink to="/privacy" class="text-indigo-600 hover:text-indigo-500">
                      Datenschutzerklärung
                    </NuxtLink>
                    *
                  </label>
                  <p v-if="errors.acceptTerms" class="mt-1 text-sm text-red-600">{{ errors.acceptTerms }}</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                      id="acceptNewsletter"
                      v-model="registerForm.acceptNewsletter"
                      name="acceptNewsletter"
                      type="checkbox"
                      class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="acceptNewsletter" class="text-gray-700">
                    Ich möchte den Newsletter erhalten und über Angebote und Neuigkeiten informiert werden
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                  type="submit"
                  :disabled="loading"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </span>
                {{ loading ? 'Wird erstellt...' : 'Konto erstellen' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Right side - Image -->
    <div class="hidden lg:block relative w-0 flex-1">
      <img
          class="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1908&q=80"
          alt="Shopping experience"
      />
      <div class="absolute inset-0 bg-indigo-600 mix-blend-multiply opacity-30"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white p-8">
          <h2 class="text-4xl font-bold mb-4">Willkommen bei Freisein!</h2>
          <p class="text-xl opacity-90 mb-6">
            Erstelle dein Konto und entdecke eine neue Welt des Online-Shoppings.
          </p>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="flex items-center">
              <CheckCircleIcon class="h-5 w-5 mr-2" />
              <span>Exklusive Angebote</span>
            </div>
            <div class="flex items-center">
              <CheckCircleIcon class="h-5 w-5 mr-2" />
              <span>Schneller Checkout</span>
            </div>
            <div class="flex items-center">
              <CheckCircleIcon class="h-5 w-5 mr-2" />
              <span>Bestellverfolgung</span>
            </div>
            <div class="flex items-center">
              <CheckCircleIcon class="h-5 w-5 mr-2" />
              <span>Wunschliste</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '~/stores/user'

// SEO
useHead({
  title: 'Registrieren',
  meta: [
    { name: 'description', content: 'Erstelle dein kostenloses Konto im Freisein Shop' }
  ]
})

// Store
const userStore = useUserStore()

// Router
const router = useRouter()

// Data
const loading = ref(false)
const errors = ref({})

const registerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  birthday: '',
  acceptTerms: false,
  acceptNewsletter: false
})

// API
const { $notify } = useNuxtApp()

// Methods
const validateForm = () => {
  errors.value = {}

  // Required fields
  if (!registerForm.value.firstName.trim()) {
    errors.value.firstName = 'Vorname ist erforderlich'
  }

  if (!registerForm.value.lastName.trim()) {
    errors.value.lastName = 'Nachname ist erforderlich'
  }

  if (!registerForm.value.email) {
    errors.value.email = 'E-Mail-Adresse ist erforderlich'
  } else if (!/\S+@\S+\.\S+/.test(registerForm.value.email)) {
    errors.value.email = 'Ungültige E-Mail-Adresse'
  }

  // Password validation
  if (!registerForm.value.password) {
    errors.value.password = 'Passwort ist erforderlich'
  } else if (registerForm.value.password.length < 8) {
    errors.value.password = 'Passwort muss mindestens 8 Zeichen lang sein'
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(registerForm.value.password)) {
    errors.value.password = 'Passwort muss Groß- und Kleinbuchstaben, Zahlen und Sonderzeichen enthalten'
  }

  if (registerForm.value.password !== registerForm.value.passwordConfirm) {
    errors.value.passwordConfirm = 'Passwörter stimmen nicht überein'
  }

  if (!registerForm.value.acceptTerms) {
    errors.value.acceptTerms = 'Du musst die AGB und Datenschutzerklärung akzeptieren'
  }

  return Object.keys(errors.value).length === 0
}

const handleRegister = async () => {
  if (!validateForm()) return

  try {
    loading.value = true

    const registrationData = {
      salutationId: 'ed643807c9f84cc8b50132ea3ccb1c3b', // Default salutation ID
      firstName: registerForm.value.firstName.trim(),
      lastName: registerForm.value.lastName.trim(),
      email: registerForm.value.email,
      password: registerForm.value.password,
      birthday: registerForm.value.birthday || null,
      acceptedDataProtection: true,
      acceptedTerms: registerForm.value.acceptTerms,
      billingAddress: {
        salutationId: 'ed643807c9f84cc8b50132ea3ccb1c3b',
        firstName: registerForm.value.firstName.trim(),
        lastName: registerForm.value.lastName.trim(),
        street: 'Musterstraße 1',
        zipcode: '12345',
        city: 'Musterstadt',
        countryId: '2fbb5fe2e29a4d70aa5854ce7ce3e20b' // Germany
      }
    }

    await userStore.register(registrationData)

    // Subscribe to newsletter if requested
    if (registerForm.value.acceptNewsletter) {
      try {
        const { $shopwareApi } = useNuxtApp()
        await $shopwareApi('/newsletter/subscribe', {
          method: 'POST',
          body: {
            email: registerForm.value.email,
            option: 'subscribe'
          }
        })
      } catch (error) {
        console.error('Newsletter subscription failed:', error)
      }
    }

    $notify.success('Registrierung erfolgreich! Du kannst dich jetzt anmelden.')
    await router.push('/auth/login')

  } catch (error) {
    console.error('Registration failed:', error)

    if (error.status === 400) {
      errors.value.email = 'E-Mail-Adresse wird bereits verwendet'
    } else {
      $notify.error('Registrierung fehlgeschlagen. Bitte versuche es erneut.')
    }
  } finally {
    loading.value = false
  }
}

// Redirect if already logged in
onMounted(() => {
  if (userStore.isLoggedIn) {
    router.push('/')
  }
})
</script>