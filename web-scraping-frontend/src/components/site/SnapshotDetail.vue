<script setup lang="ts">
import type { Snapshot } from '@/types/openapi'
import { onBeforeMount } from 'vue';

const props = defineProps({
    snapshot: {
        type: Object as () => Snapshot,
        required: true
    }
})

let formattedPages: { key: string; pageNumber: string; value: string; url: string }[] = [];

const formatPages = () => {
    let pagesToFormat = [{}];
    pagesToFormat = props.snapshot.pages as any;

    formattedPages = pagesToFormat.map((page: any, index) => {
        const key = Object.keys(page)[0] || '';
        return {
            key,
            pageNumber: `${index + 1}`,
            value: page[key] || '',
            url: page.url || ''
        };
    });
}

onBeforeMount(() => formatPages())
</script>

<template>
    <v-table>
        <thead class="table-head">
            <tr>
                <th class="text-left">
                    Página
                </th>
                <th class="text-left">
                    Clave
                </th>
                <th class="url-header text-left">
                    URL Explorada
                </th>
                <th class="data text-center">
                    Información Recopilada
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in formattedPages" :key="item.pageNumber">
                <td>{{ item.pageNumber }}</td>
                <td>{{ item.key }}</td>
                <td class="url-header text-left"><a :href="item.url" target="_blank">{{ item.url }}</a></td>
                <td class="text-left">{{ item.value }}</td>
            </tr>
        </tbody>
    </v-table>
</template>

<style>
.dialog-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-height: 500px;
    min-width: 450px;
    max-height: 500px;
    overflow: hidden;
}

.v-table {
    max-height: 100%;
    overflow: auto;
    overflow-x: visible;
}

.url-header {
    width: fit-content;
    max-width: 500px;
}

.data {
    width: fit-content;
    max-width: 300px;
    text-wrap: nowrap;
}

th {
    background-color: #f2f2f2;
    color: black !important;
    font-weight: bolder !important;
    height: 45px !important;
}

td {
    font-size: 16px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 500;
}
</style>