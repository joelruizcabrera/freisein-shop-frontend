export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@pinia/nuxt', '@nuxt/image'],
    css: ['~/assets/css/main.css'],
    runtimeConfig: {
        public: {
            shopware: {
                endpoint: process.env.SHOPWARE_ENDPOINT || 'https://demo-frontends.shopware.store',
                accessToken: process.env.SHOPWARE_ACCESS_TOKEN || 'SWSCBHFSNTVMAWNZDNFKSHLAYW'
            }
        }
    },
    app: {
        head: {
            title: 'Freisein Shop',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: 'Moderner E-Commerce Shop mit Shopware' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    }
})