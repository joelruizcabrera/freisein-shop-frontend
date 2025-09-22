import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: null,
        cartToken: null,
        items: [],
        loading: false,
        count: 0,
        totalPrice: 0,
        subtotalPrice: 0,
        shippingCosts: 0,
        taxAmount: 0
    }),

    getters: {
        isEmpty: (state) => state.count === 0,
        itemsWithDetails: (state) => state.items || [],
        formattedTotalPrice: (state) => {
            return new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR'
            }).format(state.totalPrice)
        },
        formattedSubtotalPrice: (state) => {
            return new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR'
            }).format(state.subtotalPrice)
        }
    },

    actions: {
        async initializeCart() {
            try {
                this.loading = true

                // Get or create cart token
                if (process.client) {
                    this.cartToken = localStorage.getItem('sw-cart-token') || this.generateCartToken()
                    localStorage.setItem('sw-cart-token', this.cartToken)
                }

                await this.fetchCart()
            } catch (error) {
                console.error('Failed to initialize cart:', error)
            } finally {
                this.loading = false
            }
        },

        generateCartToken() {
            return uuidv4().replace(/-/g, '')
        },

        async fetchCart() {
            try {
                const { $shopwareApi } = useNuxtApp()
                const response = await $shopwareApi('/checkout/cart', {
                    method: 'GET',
                    headers: {
                        'sw-context-token': this.cartToken
                    }
                })

                this.updateCartData(response)
            } catch (error) {
                console.error('Failed to fetch cart:', error)
                // Initialize empty cart if fetch fails
                this.cart = null
                this.items = []
                this.count = 0
                this.totalPrice = 0
            }
        },

        async addProduct(productId, quantity = 1) {
            try {
                this.loading = true
                const { $shopwareApi } = useNuxtApp()

                const response = await $shopwareApi('/checkout/cart/line-item', {
                    method: 'POST',
                    headers: {
                        'sw-context-token': this.cartToken
                    },
                    body: {
                        items: [{
                            type: 'product',
                            referencedId: productId,
                            quantity: quantity
                        }]
                    }
                })

                this.updateCartData(response)

                // Emit notification
                const { $notify } = useNuxtApp()
                $notify.success('Produkt wurde zum Warenkorb hinzugefügt')

                return response
            } catch (error) {
                console.error('Failed to add product to cart:', error)
                const { $notify } = useNuxtApp()
                $notify.error('Fehler beim Hinzufügen zum Warenkorb')
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateQuantity(lineItemId, quantity) {
            if (quantity <= 0) {
                return this.removeItem(lineItemId)
            }

            try {
                this.loading = true
                const { $shopwareApi } = useNuxtApp()

                const response = await $shopwareApi('/checkout/cart/line-item', {
                    method: 'PATCH',
                    headers: {
                        'sw-context-token': this.cartToken
                    },
                    body: {
                        items: [{
                            id: lineItemId,
                            quantity: quantity
                        }]
                    }
                })

                this.updateCartData(response)
            } catch (error) {
                console.error('Failed to update quantity:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async removeItem(lineItemId) {
            try {
                this.loading = true
                const { $shopwareApi } = useNuxtApp()

                const response = await $shopwareApi('/checkout/cart/line-item', {
                    method: 'DELETE',
                    headers: {
                        'sw-context-token': this.cartToken
                    },
                    body: {
                        ids: [lineItemId]
                    }
                })

                this.updateCartData(response)

                const { $notify } = useNuxtApp()
                $notify.success('Produkt wurde aus dem Warenkorb entfernt')
            } catch (error) {
                console.error('Failed to remove item:', error)
                const { $notify } = useNuxtApp()
                $notify.error('Fehler beim Entfernen aus dem Warenkorb')
                throw error
            } finally {
                this.loading = false
            }
        },

        async clearCart() {
            try {
                this.loading = true

                // Remove all items
                if (this.items.length > 0) {
                    const itemIds = this.items.map(item => item.id)
                    const { $shopwareApi } = useNuxtApp()

                    await $shopwareApi('/checkout/cart/line-item', {
                        method: 'DELETE',
                        headers: {
                            'sw-context-token': this.cartToken
                        },
                        body: {
                            ids: itemIds
                        }
                    })
                }

                await this.fetchCart()
            } catch (error) {
                console.error('Failed to clear cart:', error)
                throw error
            } finally {
                this.loading = false
            }
        },

        updateCartData(cartResponse) {
            this.cart = cartResponse
            this.items = cartResponse?.lineItems?.elements || []
            this.count = this.items.reduce((total, item) => total + item.quantity, 0)
            this.totalPrice = cartResponse?.price?.totalPrice || 0
            this.subtotalPrice = cartResponse?.price?.netPrice || 0
            this.shippingCosts = cartResponse?.deliveries?.[0]?.shippingCosts?.totalPrice || 0
            this.taxAmount = cartResponse?.price?.calculatedTaxes?.reduce((total, tax) => total + tax.tax, 0) || 0
        }
    }
})