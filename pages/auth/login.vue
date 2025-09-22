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
            Melde dich in deinem Konto an
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Oder
            <NuxtLink
                to="/auth/register"
                class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              erstelle ein neues Konto
            </NuxtLink>
          </p>
        </div>

        <div class="mt-8">
          <!-- Social Login -->
          <div class="grid grid-cols-2 gap-3">
            <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
              </svg>
              <span class="ml-2">GitHub</span>
            </button>

            <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
              <span class="ml-2">Twitter</span>
            </button>
          </div>

          <div class="mt-6 relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Oder weiter mit E-Mail</span>
            </div>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="mt-6 space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                E-Mail-Adresse
              </label>
              <div class="mt-1">
                <input
                    id="email"
                    v-model="loginForm.email"
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

            <div class="space-y-1">
              <label for="password" class="block text-sm font-medium text-gray-700">
                Passwort
              </label>
              <div class="mt-1">
                <input
                    id="password"
                    v-model="loginForm.password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    :class="{ 'border-red-300': errors.password }"
                />
                <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                    id="remember-me"
                    v-model="loginForm.rememberMe"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                  Angemeldet bleiben
                </label>
              </div>

              <div class="text-sm">
                <NuxtLink
                    to="/auth/forgot-password"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Passwort vergessen?
                </NuxtLink>
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
                {{ loading ? 'Wird angemeldet...' : 'Anmelden' }}
              </button>
            </div>

            <!-- Demo Credentials -->
            <div class="mt-6 p-4 bg-blue-50 rounded-md">
              <h3 class="text-sm font-medium text-blue-800 mb-2">Demo-Zugangsdaten:</h3>
              <div class="text-sm text-blue-600 space-y-1">
                <p>E-Mail: demo@freisein-shop.de</p>
                <p>Passwort: Demo123!</p>
                <button
                    type="button"
                    @click="fillDemoCredentials"
                    class="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Demo-Daten ausfüllen
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Right side - Image -->
    <div class="hidden lg:block relative w-0 flex-1">
      <img
          class="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80"
          alt="Shopping"
      />
      <div class="absolute inset-0 bg-indigo-600 mix-blend-multiply opacity-30"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center text-white p-8">
          <h2 class="text-4xl font-bold mb-4">Willkommen zurück!</h2>
          <p class="text-xl opacity-90">
            Entdecke deine persönlichen Empfehlungen und verfolge deine Bestellungen.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user'

// SEO
useHead({
  title: 'Anmelden',
  meta: [
    { name: 'description', content: 'Melde dich in deinem Freisein Shop Konto an' }
  ]
})

// Store
const userStore = useUserStore()

// Router
const router = useRouter()
const route = useRoute()

// Data
const loading = ref(false)
const errors = ref({})

const loginForm = ref({
  email: '',
  password: '',
  rememberMe: false
})

// API
const { $notify } = useNuxtApp()

// Methods
const validateForm = () => {
  errors.value = {}

  if (!loginForm.value.email) {
    errors.value.email = 'E-Mail-Adresse ist erforderlich'
  } else if (!/\S+@\S+\.\S+/.test(loginForm.value.email)) {
    errors.value.email = 'Ungültige E-Mail-Adresse'
  }

  if (!loginForm.value.password) {
    errors.value.password = 'Passwort ist erforderlich'
  } else if (loginForm.value.password.length < 6) {
    errors.value.password = 'Passwort muss mindestens 6 Zeichen lang sein'
  }

  return Object.keys(errors.value).length === 0
}

const handleLogin = async () => {
  if (!validateForm()) return

  try {
    loading.value = true

    await userStore.login({
      email: loginForm.value.email,
      password: loginForm.value.password
    })

    // Redirect to intended page or home
    const redirectTo = route.query.redirect || '/'
    await router.push(redirectTo)

  } catch (error) {
    console.error('Login failed:', error)

    if (error.status === 401) {
      errors.value.email = 'Ungültige E-Mail-Adresse oder Passwort'
      errors.value.password = 'Ungültige E-Mail-Adresse oder Passwort'
    } else {
      $notify.error('Anmeldung fehlgeschlagen. Bitte versuche es erneut.')
    }
  } finally {
    loading.value = false
  }
}

const fillDemoCredentials = () => {
  loginForm.value.email = 'demo@freisein-shop.de'
  loginForm.value.password = 'Demo123!'
}

// Redirect if already logged in
onMounted(() => {
  if (userStore.isLoggedIn) {
    router.push('/')
  }
})
</script>