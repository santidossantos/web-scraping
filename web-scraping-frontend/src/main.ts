import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import auth0 from  './plugins/auth0'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(auth0)

app.mount('#app')
