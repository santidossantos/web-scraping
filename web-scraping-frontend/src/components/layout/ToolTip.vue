<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
    readonly: false
  },
  icon: {
    type: String,
    required: true,
    readonly: false
  },
  color: {
    type: String,
    required: true,
    readonly: false
  }
})
</script>

<template>
  <v-tooltip location="top">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon :color="color"> {{ icon }} </v-icon>
      </v-btn>
    </template>
    <span>{{ text }}</span>
  </v-tooltip>
</template>
