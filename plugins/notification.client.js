export default defineNuxtPlugin(() => {
    const notifications = ref([])

    const addNotification = (notification) => {
        const id = Date.now() + Math.random()
        notifications.value.push({
            id,
            ...notification,
            timestamp: new Date()
        })

        // Auto-remove after 5 seconds
        setTimeout(() => {
            removeNotification(id)
        }, 5000)

        return id
    }

    const removeNotification = (id) => {
        const index = notifications.value.findIndex(n => n.id === id)
        if (index > -1) {
            notifications.value.splice(index, 1)
        }
    }

    const notify = {
        success: (message, options = {}) => {
            return addNotification({
                type: 'success',
                message,
                ...options
            })
        },
        error: (message, options = {}) => {
            return addNotification({
                type: 'error',
                message,
                ...options
            })
        },
        warning: (message, options = {}) => {
            return addNotification({
                type: 'warning',
                message,
                ...options
            })
        },
        info: (message, options = {}) => {
            return addNotification({
                type: 'info',
                message,
                ...options
            })
        }
    }

    // Make notifications globally available
    useState('notifications', () => notifications)

    return {
        provide: {
            notify,
            notifications: readonly(notifications),
            removeNotification
        }
    }
})