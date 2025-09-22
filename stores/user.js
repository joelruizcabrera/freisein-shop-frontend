import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        customer: null,
        contextToken: null,
        isLoggedIn: false,
        loading: false,
        orders: [],
        addresses: [],
        wishlist: []
    }),

    getters: {
        fullName: (state) => {
            if (!state.customer) return ''
            return `${state.customer.firstName} ${state.customer.lastName}`
        },
        defaultBillingAddress: (state) => {
            return state.addresses.find(addr => addr.id === state.customer?.defaultBillingAddressId)
        },
        defaultShippingAddress: (state) => {
            return state.addresses.find(addr => addr.id === state.customer?.defaultShippingAddressId)
        }
    },

    actions: {
        async checkAuthStatus() {
            if (process.client) {
                this.contextToken = localStorage.getItem('sw-context-token')
                if (this.contextToken) {
                    await this.fetchCustomer()
                }
            }
        },

        async login(credentials) {
            try {
                this.loading = true
                const { $shopwareApi } = useNuxtApp()

                const response = await $shopwareApi('/account/login', {
                    method: 'POST',
                    body: {
                        username: credentials.email,
                        password: credentials.password
                    }
                })

                this.contextToken = response.contextToken
                this.customer = response.customer
                this.isLoggedIn = true

                if (process.client) {
                    localStorage.setItem('sw-context-token', this.contextToken)
                }

                // Update cart with customer context
                const cartStore = useCartStore()
                cartStore.cartToken = this.contextToken
                await cartStore.fetchCart()

                const { $notify } = useNuxtApp()
                $notify.success(`Willkommen zurück, ${this.customer.firstName}!`)

                return response
            } catch (error) {
                console.error('Login failed:', error)
                const { $notify } = useNuxtApp()
                $notify.error('Anmeldung fehlgeschlagen. Bitte prüfen Sie Ihre Zugangsdaten.')
                throw error
            } finally {
                this.loading = false
            }
        },

        async register(customerData) {
            try {
                this.loading = true
                const { $shopwareApi } = useNuxtApp()

                const response = await $shopwareApi('/account/register', {
                    method: 'POST',
                    body: {
                        ...customerData,
                        storefrontUrl: window.location.origin
                    }
                })

                const { $notify } = useNuxtApp()
                $notify.success('Registrierung erfolgreich! Bitte bestätigen Sie Ihre E-Mail-Adresse.')

                return response
            } catch (error) {
                console.error('Registration failed:', error)
                const { $notify } = useNuxtApp()
                $notify.error('Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.')
                throw error
            } finally {
                this.loading = false
            }
        },

        async logout() {
            try {
                const { $shopwareApi } = useNuxtApp()

                if (this.contextToken) {
                    await $shopwareApi('/account/logout', {
                        method: 'POST',
                        headers: {
                            'sw-context-token': this.contextToken
                        }
                    })
                }

                this.customer = null
                this.contextToken = null
                this.isLoggedIn = false
                this.orders = []
                this.addresses = []

                if (process.client) {
                    localStorage.removeItem('sw-context-token')
                }

                // Reset cart
                const cartStore = useCartStore()
                await cartStore.initializeCart()

                const { $notify } = useNuxtApp()
                $notify.success('Sie wurden erfolgreich abgemeldet.')

                await navigateTo('/')
            } catch (error) {
                console.error('Logout failed:', error)
            }
        },

        async fetchCustomer() {
            try {
                const { $shopwareApi } = useNuxtApp()

                const response = await $shopwareApi('/account/customer', {
                    method: 'GET',
                    headers: {
                        'sw-context-token': this.contextToken
                    }
                })

                this.customer = response
                this.isLoggedIn = true
                await this.fetchAddresses()
            } catch (error) {
                console.error('Failed to fetch customer:', error)
                this.logout()
            }
        },

        async fetchOrders() {
            try {
                const { $shopwareApi } = useNuxtApp()

                const response = await $shopwareApi('/account/order', {
                    method: 'GET',
                    headers: {
                        'sw-context-token': this.contextToken
                    }
                })

                this.orders = response.elements || []
            } catch (error) {
                console.error('Failed to fetch orders:', error)
            }
        },

        async fetchAddresses() {
            try {
                const { $shopwareApi } = useNuxtApp()

                const response = await $shopwareApi('/account/list-address', {
                    method: 'GET',
                    headers: {
                        'sw-context-token': this.contextToken
                    }
                })

                this.addresses = response.elements || []
            } catch (error) {
                console.error('Failed to fetch addresses:', error)
            }
        },

        async updateProfile(profileData) {
            try {
                this.loading = true
                const { $shopwareApi } = useNuxtApp()

                const response = await $shopwareApi('/account/change-profile', {
                    method: 'POST',
                    headers: {
                        'sw-context-token': this.contextToken
                    },
                    body: profileData
                })

                this.customer = { ...this.customer, ...profileData }

                const { $notify } = useNuxtApp()
                $notify.success('Profil wurde erfolgreich aktualisiert.')

                return response
            } catch (error) {
                console.error('Profile update failed:', error)
                const { $notify } = useNuxtApp()
                $notify.error('Fehler beim Aktualisieren des Profils.')
                throw error
            } finally {
                this.loading = false
            }
        },

        async changePassword(passwordData) {
            try {
                this.loading = true
                const { $shopwareApi } = useNuxtApp()

                await $shopwareApi('/account/change-password', {
                    method: 'POST',
                    headers: {
                        'sw-context-token': this.contextToken
                    },
                    body: passwordData
                })

                const { $notify } = useNuxtApp()
                $notify.success('Passwort wurde erfolgreich geändert.')
            } catch (error) {
                console.error('Password change failed:', error)
                const { $notify } = useNuxtApp()
                $notify.error('Fehler beim Ändern des Passworts.')
                throw error
            } finally {
                this.loading = false
            }
        }
    }
})