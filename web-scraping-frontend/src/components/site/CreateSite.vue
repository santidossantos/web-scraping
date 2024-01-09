<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useValidationErrors } from '@/helpers/validation-errors'
import { FORM_REQUIRED_FIELD } from '@/helpers/messages'
import router from '@/router'
import ToolTipVue from '@/components/layout/ToolTip.vue'
import { UpdateFrequency } from '@/types/update-frequency'
import type { SiteForm } from '@/types/create-site-form'
import type { Site } from '@/types/openapi'
import { client } from '@/services/OpenAPIClient';
// @ts-ignore
import { HighCode } from 'vue-highlight-code'
import 'vue-highlight-code/dist/style.css'

const isEditing = !!router.currentRoute.value.params.id

const form = ref<SiteForm>({
  name: '',
  domain: '',
  maxDepth: '1',
  updateFrequency: UpdateFrequency.DAILY,
  extractor: '',
  icon: ''
})

const rules = {
  name: {
    required: helpers.withMessage(FORM_REQUIRED_FIELD, required)
  },
  domain: {
    required: helpers.withMessage(FORM_REQUIRED_FIELD, required)
  },
  maxDepth: {
    required: helpers.withMessage(FORM_REQUIRED_FIELD, required)
  },
  updateFrequency: {
    required: helpers.withMessage(FORM_REQUIRED_FIELD, required)
  },
  extractor: {
    required: helpers.withMessage(FORM_REQUIRED_FIELD, required)
  }
}

const allowedDepths = ['1', '2', '3']
const allowedFrequencies = [UpdateFrequency.DAILY, UpdateFrequency.WEEKLY, UpdateFrequency.DISABLED]
const v$ = useVuelidate(rules, form)
const errors = computed(() => useValidationErrors<SiteForm>(v$.value.$errors))
const codeBox = ref('')
const initialExtractor = ref('')

const initialConnectionState = {
  message: 'No se ha probado la conexión',
  icon: 'mdi-access-point-network',
  valid: false,
  color: 'grey-lighten-1'
}

const connectionState = ref({
  ...initialConnectionState
})

const assignSiteColor = () => {
  const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'indigo', 'teal', 'lime', 'amber', 'deep-purple', 'light-blue', 'light-green', 'brown', 'blue-grey'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const handleSubmit = async () => {
  // @ts-ignore
  form.value.extractor = codeBox.value?.modelValue || ''

  const result = await v$.value.$validate()
  if (!result) {
    return
  }

  if (isEditing) {
    await updateSite()
  } else {
    form.value.icon = assignSiteColor()
    await createSite()
  }

  await router.push({ path: '/sites' })
}

const createSite = async () => await client['SiteController.create'](null, form.value)

const updateSite = async () => {
  const site: Site = form.value as Site
  site.id = router.currentRoute.value.params.id.toString()
  await client['SiteController.updateById'](site.id, site)
}

const clear = () => {
  v$.value.$reset()
  form.value = {
    name: '',
    domain: '',
    maxDepth: '1',
    updateFrequency: UpdateFrequency.DAILY,
    extractor: '',
    icon: ''
  }
}

const checkConnectionStatus = () => {
  const url = form.value.domain

  if (!validateUrl(url)) {
    setConnectionStateIcon('URL no válida', 'mdi-access-point-network-off', 'red', false)
    return
  }

  client['ServiceStatusController.checkDomainStatus'](url).then((response) => {
    if (response.data) {
      setConnectionStateIcon('Conexión establecida', 'mdi-access-point-network', 'green', true)
      return
    }

    setConnectionStateIcon('No se pudo conectar al dominio especificado', 'mdi-access-point-network-off', 'red', false)
  })
}

const setConnectionStateIcon = (message: string, icon: string, color: string, valid: boolean) => {
  connectionState.value = {
    message,
    icon,
    color,
    valid
  }
}

const validateUrl = (url: string) => {
  const regex = RegExp('(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+@]*)*(\\?[;&a-z\\d%_.~+=-@]*)?(\\#[-a-z\\d_@]*)?$', 'i');
  return url.match(regex) ? true : false;
}

watch(() => form.value.domain, checkConnectionStatus)

onBeforeMount(async () => {
  if (isEditing) {
    let site: Site
    await client['SiteController.findById'](router.currentRoute.value.params.id.toString()).then((response: any) => {
      site = response.data
    })
    // @ts-ignore
    form.value = site
    // @ts-ignore
    codeBox.value.modelValue = site.extractor || ''
  }
  initialExtractor.value = '(cheerio) => {\n return {attr: cheerio("elem").text()} \n}'
})
</script>

<template>
  <v-container>
    <v-btn class="mt-5 mb-5" size="x-large" color="blue-darken-2" prepend-icon="mdi-web-box" variant="text">
      Información del sitio
    </v-btn>

    <v-form @submit.prevent="handleSubmit" class="form">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="v$.name.$model" label="Nombre del sitio" bg-color="white" :error="v$.name.$error"
            :error-messages="errors.name" />
        </v-col>

        <v-col cols="12">
          <div class="domain">
            <v-text-field v-model="v$.domain.$model" label="Dominio del sitio" bg-color="white" :error="v$.domain.$error"
              :error-messages="errors.domain" />
            <div class="test-icon">
              <ToolTipVue :text="connectionState.message" :icon="connectionState.icon" :color="connectionState.color" />
            </div>
          </div>
        </v-col>

        <v-col cols="12">
          <v-select v-model="v$.maxDepth.$model" label="Profundidad de búsqueda" bg-color="white" :items="allowedDepths"
            :error="v$.maxDepth.$error" :error-messages="errors.maxDepth" />
        </v-col>

        <v-col cols="12">
          <v-select v-model="v$.updateFrequency.$model" label="Frecuencia de actualización" bg-color="white"
            :items="allowedFrequencies" :error="v$.updateFrequency.$error" :error-messages="errors.updateFrequency" />
        </v-col>

        <v-col cols="12">
          <HighCode :textEditor="true" class="code-box" ref="codeBox" theme="light" width="auto"
            :codeValue="initialExtractor">
          </HighCode>
        </v-col>

        <v-col cols="12">
          <div class="mt-3 submit-buttons">
            <v-btn class="clean-button" @click="clear" append-icon="mdi-spray-bottle">
              Limpiar
            </v-btn>

            <v-btn class="accept-button" color="blue-darken-3" type="submit" append-icon="mdi-checkbox-marked-circle">
              Aceptar
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<style scoped>
.v-container {
  margin-top: -2.5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.v-form {
  width: 30%;
  min-height: 600px;
  min-width: 600px;
}

.submit-buttons {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
}

.accept-button {
  width: 77%;
}

.clean-button {
  width: 21%;
}

.domain {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.test-icon {
  margin-left: 20px;
  padding-bottom: 15px;
}

.code-box {
  min-height: 100px !important;
}

@media screen and (max-width: 1600px) {
  .v-form {
    width: 40%;
    min-width: 0;
  }

  .accept-button {
    width: 69%;
  }

  .clean-button {
    width: 29%;
  }
}

@media screen and (max-width: 500px) {
  .v-form {
    width: 80%;
  }

  .submit-buttons {
    display: flex;
    justify-content: space-between;
  }

  .accept-button {
    width: 48%;
  }

  .clean-button {
    width: 48%;
  }
}

@media screen and (max-height: 1000px) {
  .v-form {
    height: 80%;
    min-height: 0;
  }
}

@media screen and (max-height: 500px) {
  .v-form {
    height: 60%;
  }
}
</style>

<style>
html,
body,
main {
  overflow-y: scroll;
}
</style>