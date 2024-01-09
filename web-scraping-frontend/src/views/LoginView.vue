<script setup lang="ts">
import UserLogin from '@/components/login/UserLogin.vue'
import router from '@/router';
import { useAuthStore } from '@/stores/userAuthStore';
import { onBeforeMount } from 'vue';


const { isAuthenticated } = useAuthStore()

onBeforeMount(async () => {
  if (isAuthenticated) {
    await router.push({ name: 'sites' })
  }
})
</script>

<template>
  <main>
    <UserLogin v-if="!isAuthenticated" />
  </main>
</template>
