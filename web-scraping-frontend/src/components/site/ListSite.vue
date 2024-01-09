<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { Site } from '@/types/openapi'
import { client } from '@/services/OpenAPIClient';
import formatDate from '@/helpers/date-formatter'
import SiteDetail from '@/components/site/SnapshotList.vue'
import ConfirmDialog from '../layout/ConfirmDialog.vue';
import SnackAlert, { type AlertType } from '../layout/SnackAlert.vue';

const sites = ref([] as Site[])
const dialog = ref(false)
const siteToDelete = ref('')
const detailDialog = ref(false)
const currentSiteDetail = ref({} as Site)
const snackAlertActive = ref(false)
const snackAlertType = ref({} as AlertType)
const snackAlertTitle = ref('')

const setWebsites = () => {
  client['SiteController.find']().then((response) => {
    sites.value = response.data as Site[]
  })
}

const deleteSite = (id: string) => {
  client['SiteController.deleteById'](id).then(() => {
    sites.value.splice(
      sites.value.findIndex((site: Site) => site.id === id), 1
    )
    showSnackBar("Sitio eliminado con éxito", { type: "success" })
  }).catch(() => {
    showSnackBar("No se pudo eliminar el sitio por falla en la conexión", { type: "error" })
  })
}

const showSnackBar = (title: string, alertType: AlertType) => {
  snackAlertType.value = alertType
  snackAlertTitle.value = title
  snackAlertActive.value = true
  setTimeout(() => snackAlertActive.value = false, 4000)
}

const showConfirmDialog = (item: Site) => {
  siteToDelete.value = item.id || ''
  dialog.value = true
}

const confirmDelete = () => {
  deleteSite(siteToDelete.value)
  dialog.value = false
  siteToDelete.value = ''
}

const cancelDelete = () => {
  dialog.value = false
  siteToDelete.value = ''
}

const showDetailDialog = (site: Site) => {
  currentSiteDetail.value = site
  detailDialog.value = !detailDialog.value
}

onBeforeMount(() => setWebsites())
</script>

<template>
  <v-container>
    <v-card class="mx-auto" max-width="1000" v-if="detailDialog == false">
      <div class="header">
        <v-card-title> Mis Sitios </v-card-title>
        <RouterLink :to="{ name: 'create-site' }"><v-btn class="add-site-btn" icon="mdi-folder-plus"
            color="light-blue-darken-3" size="x-small" variant="tonal">
          </v-btn></RouterLink>
      </div>
      <v-divider></v-divider>

      <v-virtual-scroll :items="sites" height="90%" item-height="48">
        <template v-slot:default="{ item }">
          <v-list-item :title="`${item.name}`"
            :subtitle="`${item.lastUpdate ? `  Actualizado el ${formatDate(item.lastUpdate.toString())}` : ''}`">
            <template v-slot:prepend>
              <v-avatar :color="item.icon" class="text-white" size="40">
                {{ item.name.charAt(0) }}
              </v-avatar>
            </template>

            <template v-slot:append>
              <div class="actions-buttons">
                <v-btn @click="showDetailDialog(item)" color="black" icon="mdi-monitor-screenshot" size="x-small"
                  variant="tonal">
                </v-btn>

                <RouterLink :to="{ name: 'edit-site', params: { id: item.id } }">
                  <v-btn color="blue" icon="mdi-pencil" size="x-small" variant="tonal"></v-btn>
                </RouterLink>

                <v-btn @click="showConfirmDialog(item)" color="red" icon="mdi-delete" size="x-small"
                  variant="tonal"></v-btn>
              </div>
            </template>
          </v-list-item>
        </template>
      </v-virtual-scroll>

      <ConfirmDialog v-if="dialog" text="¿Estas seguro de que deseas eliminar este sitio?" @confirmDelete="confirmDelete"
        @cancelDelete="cancelDelete" />
    </v-card>
  </v-container>

  <SiteDetail v-if="detailDialog" @showDetailDialog="showDetailDialog" :site="currentSiteDetail" />
  <SnackAlert v-if="snackAlertActive" :title="snackAlertTitle" :alert-type="snackAlertType" />
</template>

<style scoped>
.v-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
}

.v-card {
  width: 60%;
  height: 70%;
  border-radius: 5px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: rgb(244, 236, 236);
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  margin-left: 10px;
}

.v-card-title {
  font-weight: bold;
  margin: 0;
  text-align: center;
}

.add-site-btn {
  margin-right: 6px;
}

.actions-buttons {
  display: flex;
  justify-content: space-between;
  width: 100px;
  justify-content: space-between;
}

.v-divider {
  margin-bottom: 15px;
}

.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>

<style>
html,
body,
main {
  overflow-y: hidden;
}
</style>