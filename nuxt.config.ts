export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@vueuse/nuxt'
    ],
    css: ['~/assets/css/main.css'],
    runtimeConfig: {
        public: {
            shopware: {
                endpoint: process.env.SHOPWARE_ENDPOINT || 'https://demo-frontends.shopware.store',
                accessToken: process.env.SHOPWARE_ACCESS_TOKEN || 'SWSCBHFSNTVMAWNZDNFKSHLAYW'
            }
        }
    }
})