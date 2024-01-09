<template>
  <v-btn @click="handleLogin" :prepend-icon="icon">{{ label }}</v-btn>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '',
    required: false
  }
})

const { loginWithRedirect } = useAuth0()

const handleLogin = () => {
  loginWithRedirect({
    appState: {
      target: '/sites'
    }
  })
}
</script>
