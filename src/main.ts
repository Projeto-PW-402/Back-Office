import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
app.use(VueApexCharts)
app.use(router)
app.use(createPinia())
app.use(vue3GoogleLogin, {
  clientId: '678200684775-pacfabab843qu1k1qlf2s7i487vomukd.apps.googleusercontent.com',
})

app.mount('#app')
