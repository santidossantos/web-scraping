<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    text: {
        type: String,
        required: true
    }
})

const dialog = ref(true)
const emit = defineEmits(['confirmDelete', 'cancelDelete'])
const confirmDelete = () => emit('confirmDelete')
const cancelDelete = () => emit('cancelDelete')
</script>

<template>
    <v-dialog v-model="dialog" width="auto">
        <v-card>
            <v-card-text> {{ props.text }} </v-card-text>
            <v-card-actions>
                <div class="dialog-buttons">
                    <v-btn color="grey" @click="cancelDelete"> Cancelar </v-btn>
                    <v-btn @click="confirmDelete" variant="text" color="green"> Confirmar </v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.dialog-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
</style>