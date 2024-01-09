<script setup lang="ts">
import LogoutButton from '@/components/buttons/LogoutButton.vue'
</script>

<template>
  <v-container class="container">
    <v-layout class="navbar">
      <v-app-bar density="compact" :elevation="1" color="blue-darken-3">
        <v-icon class="nav-icon" icon="mdi-apps"></v-icon>
        <v-app-bar-title>
          <span> Web </span>
          <span class="branding-span"> Scraping </span>
        </v-app-bar-title>

        <RouterLink class="router-link-custom" to="/sites">
          <v-btn prepend-icon="mdi-home-circle">Home</v-btn>
        </RouterLink>

        <v-spacer></v-spacer>

        <LogoutButton />
      </v-app-bar>
    </v-layout>
  </v-container>
  <div class="nav"></div>
</template>

<style scoped>
.router-link-custom {
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0;
}

.nav-icon {
  margin-left: 15px;
}

.branding-span {
  color: rgb(226, 205, 205);
  margin-left: -5px;
}

span {
  font-weight: bold;
}
</style>
