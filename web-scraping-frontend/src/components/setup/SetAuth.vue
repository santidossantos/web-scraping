<script setup lang="ts">
import { useAuthStore } from '@/stores/userAuthStore'
import type { User } from '@/types/user'
import { useAuth0 } from '@auth0/auth0-vue'
import NavBar from '../layout/NavBar.vue'
import SideBar from '../layout/SideBar.vue'
import { client } from '@/services/OpenAPIClient';

const { user } = useAuth0()
const { getAccessTokenSilently } = useAuth0()
const authStore = useAuthStore()
const { isAuthenticated } = useAuth0()

async function setAuthStore() {
  if (isAuthenticated) {
    const token = await getAccessTokenSilently()
    authStore.login(token, user.value as User)
    client.defaults.headers['authorization'] = `Bearer ${token}`;
  }
}

await setAuthStore()
</script>

<template>
  <NavBar />
  <SideBar />
</template>