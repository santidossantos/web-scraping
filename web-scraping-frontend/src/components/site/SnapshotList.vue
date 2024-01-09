<script setup lang="ts">
import { ref } from 'vue'
import { client } from '@/services/OpenAPIClient';
import { onBeforeMount } from 'vue';
import type { Site } from '@/types/openapi'
import type { Snapshot } from '@/types/openapi';
import formatDate from '@/helpers/date-formatter'
import SnapshotDetail from '@/components/site/SnapshotDetail.vue'

const props = defineProps({
  site: {
    type: Object as () => Site,
    required: true
  }
})

const dialog = ref(true)
const snapshots = ref([] as Snapshot[])
const showSelectedSnapshot = ref(false)
const currentSnapshot = ref({} as Snapshot)
const emit = defineEmits(['showDetailDialog'])
const closeDialog = () => emit('showDetailDialog')

const getSiteSnapshots = () => {
  client['SiteSnapshotController.find'](props.site.id).then((response) => {
    const sortedSnapshots = response.data.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });

    snapshots.value = sortedSnapshots;
  });
};

const openSnapshotDetail = async (snapshot: Snapshot) => {
  currentSnapshot.value = snapshot
  showSelectedSnapshot.value = true
};

const closeSnapshotDetail = () => {
  showSelectedSnapshot.value = false
};

onBeforeMount(() => getSiteSnapshots())
</script>

<template>
  <v-dialog v-model="dialog" :scrim="false" transition="dialog-bottom-transition" class="detail-dialog" persistent>
    <v-card class="dialog-container">
      <v-toolbar fixed dark color="blue-darken-3" density="compact" dialog-container>
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <template v-if="!showSelectedSnapshot">
          <v-toolbar-title>Snapshots</v-toolbar-title>
          <v-spacer></v-spacer>
        </template>
        <template v-else>
          <v-toolbar-title>Detalle de Snapshot</v-toolbar-title>
          <v-spacer></v-spacer>
        </template>
        <v-btn v-if="showSelectedSnapshot" icon dark @click="closeSnapshotDetail">
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-toolbar>
      <template v-if="!showSelectedSnapshot">
        <v-list lines="two" subheader>
          <v-avatar :color="props.site.icon" class="text-white" size="40">
            {{ props.site.name.charAt(0) }}
          </v-avatar>
          <v-list-item :title="props.site.name" :subtitle="props.site.domain.replace('http://', '')">
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
      </template>

      <template v-if="!showSelectedSnapshot">
        <template v-if="snapshots.length > 0">
          <v-virtual-scroll :items="snapshots" height="300" item-height="50">
            <template v-slot:default="{ item }">
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon>mdi-camera</v-icon>
                </template>

                <v-list-item-title>{{ formatDate(item.date?.toString() || '') }}</v-list-item-title>

                <template v-slot:append>
                  <v-btn size="small" variant="tonal" @click="openSnapshotDetail(item)">
                    detalle

                    <v-icon color="orange-darken-4" end>
                      mdi-open-in-new
                    </v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </template>
        <template v-else>
          <v-row class="empty-snapshot" justify="center">
            <v-icon size="50" color="blue-darken-3">mdi-camera-off-outline</v-icon>
          </v-row>
          <v-row justify="center">
            <v-list-subheader>No hay Snapshots para este sitio</v-list-subheader>
          </v-row>
        </template>
      </template>

      <template v-if="showSelectedSnapshot">
        <SnapshotDetail :snapshot="currentSnapshot" />
      </template>

    </v-card>
  </v-dialog>
</template>

<style scoped>
.dialog-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  margin-top: 8%;
  min-height: 500px;
  min-width: 450px;
}

.detail-modal {
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
}

.detail-dialog {
  width: 30%;

}

.v-row {
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
}

.empty-snapshot {
  margin-top: 10%;
  margin-bottom: 1%;
}

.v-row .v-list-subheader {
  align-self: flex-start;
  margin-top: -15%;
  margin-left: 20px;
}

.v-virtual-scroll {
  display: flex;
  flex-direction: column;
  text-align: start;
}

.v-toolbar-title {
  text-align: start;
}

.v-avatar {
  margin-bottom: -2%;
  margin-top: 1%;
}

.back-button {
  margin-left: 95%;
}
</style>