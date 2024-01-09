<template>
  <v-btn @click="handleLogout" icon="mdi-exit-to-app"></v-btn>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/userAuthStore'
import { useAuth0 } from '@auth0/auth0-vue'

const { logout } = useAuth0()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()

  logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  })
}
</script>
