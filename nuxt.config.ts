export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@shopware-pwa/nuxt3-module',
        '@vueuse/nuxt',
        '@pinia/nuxt'
    ],
    imports: {
        scan: true
    },
    shopware: {
        endpoint: process.env.SHOPWARE_ENDPOINT || 'https://demo-frontends.shopware.store',
        accessToken: process.env.SHOPWARE_ACCESS_TOKEN || 'SWSCBHFSNTVMAWNZDNFKSHLAYW'
    },
    css: ['~/assets/css/main.css'],
    runtimeConfig: {
        public: {
            shopware: {
                endpoint: process.env.SHOPWARE_ENDPOINT,
                accessToken: process.env.SHOPWARE_ACCESS_TOKEN
            }
        }
    }
})