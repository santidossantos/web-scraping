<script setup lang="ts">
import { useAuthStore } from '@/stores/userAuthStore'
import type { User } from '@/types/user'

const { getUserData } = useAuthStore()
const user: User = getUserData as User
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item :prepend-avatar="user?.picture" :title="user?.name" :subtitle="user?.email"></v-list-item>
        </v-list>

        <v-divider></v-divider>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<style scoped>
.v-navigation-drawer {
  margin-top: 48px;
}

.v-list-item {
  color: black;
}
</style>
