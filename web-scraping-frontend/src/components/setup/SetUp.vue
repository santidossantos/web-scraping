<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import SetAuth from '@/components/setup/SetAuth.vue'

const { isAuthenticated } = useAuth0()
</script>

<template>
  <v-container v-if="isAuthenticated">
    <Suspense>
      <template #default>
        <SetAuth />
      </template>
      <template #fallback>
        <v-progress-circular color="blue-lighten-3" model-value="20"></v-progress-circular>
      </template>
    </Suspense>
  </v-container>
</template>
