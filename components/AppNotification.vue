<template>
  <div
      v-if="notifications.length > 0"
      aria-live="assertive"
      class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <TransitionGroup
          enter-from-class="transform ease-out duration-300 translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enter-to-class="transform ease-out duration-300 translate-y-0 opacity-100 sm:translate-x-0"
          leave-from-class="transform ease-in duration-200 translate-y-0 opacity-100 sm:translate-x-0"
          leave-to-class="transform ease-in duration-200 translate-y-1 opacity-0 sm:translate-y-0 sm:translate-x-1"
      >
        <div
            v-for="notification in notifications"
            :key="notification.id"
            class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <!-- Success Icon -->
                <CheckCircleIcon
                    v-if="notification.type === 'success'"
                    class="h-6 w-6 text-green-400"
                    aria-hidden="true"
                />
                <!-- Error Icon -->
                <XCircleIcon
                    v-else-if="notification.type === 'error'"
                    class="h-6 w-6 text-red-400"
                    aria-hidden="true"
                />
                <!-- Warning Icon -->
                <ExclamationTriangleIcon
                    v-else-if="notification.type === 'warning'"
                    class="h-6 w-6 text-yellow-400"
                    aria-hidden="true"
                />
                <!-- Info Icon -->
                <InformationCircleIcon
                    v-else
                    class="h-6 w-6 text-blue-400"
                    aria-hidden="true"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p
                    v-if="notification.title"
                    class="text-sm font-medium text-gray-900"
                >
                  {{ notification.title }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ notification.message }}
                </p>

                <!-- Action Button -->
                <div v-if="notification.action" class="mt-3">
                  <button
                      @click="handleAction(notification)"
                      class="rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {{ notification.action.label }}
                  </button>
                </div>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                    @click="removeNotification(notification.id)"
                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span class="sr-only">Schließen</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <!-- Progress Bar for auto-dismiss -->
            <div
                v-if="notification.autoDismiss !== false"
                class="mt-3 w-full bg-gray-200 rounded-full h-1"
            >
              <div
                  class="h-1 rounded-full transition-all duration-75 ease-linear"
                  :class="{
                  'bg-green-500': notification.type === 'success',
                  'bg-red-500': notification.type === 'error',
                  'bg-yellow-500': notification.type === 'warning',
                  'bg-blue-500': notification.type === 'info'
                }"
                  :style="{ width: `${getProgressWidth(notification)}%` }"
              ></div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

// Get notifications from plugin
const { $notifications, $removeNotification } = useNuxtApp()
const notifications = useState('notifications', () => [])

// Data
const progressIntervals = ref(new Map())

// Methods
const removeNotification = (id) => {
  $removeNotification(id)

  // Clear progress interval if exists
  if (progressIntervals.value.has(id)) {
    clearInterval(progressIntervals.value.get(id))
    progressIntervals.value.delete(id)
  }
}

const handleAction = (notification) => {
  if (notification.action?.handler) {
    notification.action.handler()
  }
  removeNotification(notification.id)
}

const getProgressWidth = (notification) => {
  if (!notification.progress) return 0
  return Math.max(0, 100 - notification.progress)
}

const startProgressTimer = (notification) => {
  if (notification.autoDismiss === false) return

  const duration = notification.duration || 5000 // Default 5 seconds
  const interval = 50 // Update every 50ms
  const steps = duration / interval
  let currentStep = 0

  notification.progress = 0

  const timer = setInterval(() => {
    currentStep++
    notification.progress = (currentStep / steps) * 100

    if (currentStep >= steps) {
      clearInterval(timer)
      progressIntervals.value.delete(notification.id)
      removeNotification(notification.id)
    }
  }, interval)

  progressIntervals.value.set(notification.id, timer)
}

// Watch for new notifications
watch(notifications, (newNotifications, oldNotifications) => {
  // Find newly added notifications
  const newItems = newNotifications.filter(
      newNotif => !oldNotifications.some(oldNotif => oldNotif.id === newNotif.id)
  )

  // Start progress timers for new notifications
  newItems.forEach(notification => {
    startProgressTimer(notification)
  })
}, { deep: true })

// Cleanup intervals on unmount
onUnmounted(() => {
  progressIntervals.value.forEach(interval => clearInterval(interval))
  progressIntervals.value.clear()
})
</script>