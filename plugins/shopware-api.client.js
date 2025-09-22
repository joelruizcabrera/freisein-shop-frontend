export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const shopwareApi = async (endpoint, options = {}) => {
        const baseURL = `${config.public.shopware.endpoint}/store-api`
        const url = `${baseURL}${endpoint}`

        const defaultHeaders = {
            'sw-access-key': config.public.shopware.accessToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        try {
            const response = await $fetch(url, {
                ...options,
                headers: {
                    ...defaultHeaders,
                    ...options.headers
                }
            })

            return response
        } catch (error) {
            console.error('Shopware API Error:', error)

            // Handle specific error cases
            if (error.status === 401) {
                // Unauthorized - clear auth tokens
                if (process.client) {
                    localStorage.removeItem('sw-context-token')
                    localStorage.removeItem('sw-cart-token')
                }
            }

            throw error
        }
    }

    // Provide the API client globally
    return {
        provide: {
            shopwareApi
        }
    }
})