<template>
  <footer class="bg-gray-900">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <!-- Company info -->
        <div class="space-y-8 xl:col-span-1">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <span class="text-white font-bold text-lg">F</span>
            </div>
            <span class="text-2xl font-bold text-white">Freisein</span>
            <span class="text-sm text-gray-400 ml-1">Shop</span>
          </div>
          <p class="text-gray-300 text-base">
            Dein Online-Shop für hochwertige Produkte und außergewöhnlichen Service.
            Entdecke Qualität, die begeistert.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">Instagram</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.72 13.70 3.72 12.345c0-1.297.49-2.448 1.297-3.323.895-.928 2.09-1.406 3.432-1.406 1.297 0 2.448.49 3.323 1.297.928.895 1.406 2.09 1.406 3.432 0 1.297-.49 2.448-1.297 3.323-.895.928-2.09 1.406-3.432 1.406zm7.598 0c-1.297 0-2.448-.49-3.323-1.297-.928-.895-1.406-2.09-1.406-3.432 0-1.297.49-2.448 1.297-3.323.895-.928 2.09-1.406 3.432-1.406 1.297 0 2.448.49 3.323 1.297.928.895 1.406 2.09 1.406 3.432 0 1.297-.49 2.448-1.297 3.323-.895.928-2.09 1.406-3.432 1.406z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">Twitter</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-300">
              <span class="sr-only">YouTube</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Links sections -->
        <div class="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <!-- Shop -->
            <div>
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Shop</h3>
              <ul role="list" class="mt-4 space-y-4">
                <li>
                  <NuxtLink to="/products" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Alle Produkte
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/categories" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Kategorien
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/products?sort=created-desc" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Neuheiten
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/products?sort=topseller" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Bestseller
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/sale" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Sale
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Kundenservice -->
            <div class="mt-12 md:mt-0">
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Kundenservice</h3>
              <ul role="list" class="mt-4 space-y-4">
                <li>
                  <NuxtLink to="/help" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Hilfe & FAQ
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/contact" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Kontakt
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/shipping" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Versand & Lieferung
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/returns" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Rücksendung
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/size-guide" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Größentabelle
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <div class="md:grid md:grid-cols-2 md:gap-8">
            <!-- Unternehmen -->
            <div>
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Unternehmen</h3>
              <ul role="list" class="mt-4 space-y-4">
                <li>
                  <NuxtLink to="/about" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Über uns
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/careers" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Karriere
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/sustainability" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Nachhaltigkeit
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/press" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Presse
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/blog" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Blog
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Rechtliches -->
            <div class="mt-12 md:mt-0">
              <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Rechtliches</h3>
              <ul role="list" class="mt-4 space-y-4">
                <li>
                  <NuxtLink to="/privacy" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Datenschutz
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/terms" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    AGB
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/imprint" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Impressum
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/cookies" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Cookie-Richtlinie
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/withdrawal" class="text-base text-gray-300 hover:text-white transition-colors duration-200">
                    Widerrufsrecht
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter signup -->
      <div class="mt-12 border-t border-gray-700 pt-8">
        <div class="md:flex md:items-center md:justify-between">
          <div>
            <h3 class="text-lg font-medium text-white">Newsletter abonnieren</h3>
            <p class="mt-2 text-base text-gray-300">
              Erhalte exklusive Angebote und die neuesten Produkt-Updates.
            </p>
          </div>
          <form @submit.prevent="subscribeNewsletter" class="mt-4 sm:flex sm:max-w-md md:mt-0">
            <label for="newsletter-email" class="sr-only">E-Mail-Adresse</label>
            <input
                id="newsletter-email"
                v-model="newsletterEmail"
                type="email"
                autocomplete="email"
                required
                class="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white focus:border-white focus:placeholder-gray-400"
                placeholder="Deine E-Mail-Adresse"
            />
            <div class="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                  type="submit"
                  :disabled="newsletterLoading"
                  class="w-full bg-indigo-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-200"
              >
                {{ newsletterLoading ? 'Wird angemeldet...' : 'Anmelden' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Bottom section -->
      <div class="mt-12 border-t border-gray-700 pt-8">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex space-x-6 md:order-2">
            <!-- Payment methods -->
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-400">Bezahlen mit:</span>
              <div class="flex space-x-2">
                <div class="w-8 h-5 bg-blue-600 rounded text-xs text-white flex items-center justify-center">
                  VISA
                </div>
                <div class="w-8 h-5 bg-red-600 rounded text-xs text-white flex items-center justify-center">
                  MC
                </div>
                <div class="w-8 h-5 bg-yellow-400 rounded text-xs text-gray-900 flex items-center justify-center">
                  PP
                </div>
                <div class="w-8 h-5 bg-black rounded text-xs text-white flex items-center justify-center">
                  €
                </div>
              </div>
            </div>
          </div>
          <div class="mt-8 md:mt-0 md:order-1">
            <p class="text-base text-gray-400">
              &copy; {{ currentYear }} Freisein Shop. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>

        <!-- Trust badges -->
        <div class="mt-8 flex flex-wrap items-center justify-center space-x-6 text-sm text-gray-400">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            SSL-verschlüsselt
          </div>
          <div class="flex items-center">
            <svg class="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Käuferschutz
          </div>
          <div class="flex items-center">
            <svg class="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Geprüfte Qualität
          </div>
          <div class="flex items-center">
            <svg class="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            Kostenloser Versand ab 50€
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Data
const newsletterEmail = ref('')
const newsletterLoading = ref(false)
const currentYear = new Date().getFullYear()

// API
const { $shopwareApi, $notify } = useNuxtApp()

// Methods
const subscribeNewsletter = async () => {
  if (!newsletterEmail.value.trim()) return

  try {
    newsletterLoading.value = true

    await $shopwareApi('/newsletter/subscribe', {
      method: 'POST',
      body: {
        email: newsletterEmail.value,
        option: 'subscribe'
      }
    })

    $notify.success('Erfolgreich für den Newsletter angemeldet!')
    newsletterEmail.value = ''
  } catch (error) {
    console.error('Newsletter subscription failed:', error)
    $notify.error('Fehler bei der Newsletter-Anmeldung')
  } finally {
    newsletterLoading.value = false
  }
}
</script>