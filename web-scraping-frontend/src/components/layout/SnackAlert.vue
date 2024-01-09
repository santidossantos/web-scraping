<script setup lang="ts">
export interface AlertType {
  type: 'error' | 'success' | 'warning' | 'info' | undefined
}

defineProps({
  title: {
    type: String,
    required: true
  },
  alertType: {
    type: Object as () => AlertType,
    required: true
  }
})
</script>

<template>
  <v-alert class="alert" :type="alertType.type" :title="title" text=""></v-alert>
</template>

<style scoped>
.alert {
  position: absolute;
  z-index: 9999;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  margin-bottom: 20px;
  margin-top: 20px;
  width: 550px;
  min-width: 300px;
}
</style>
