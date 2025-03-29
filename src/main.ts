import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createMemoryHistory,createRouter} from 'vue-router'
import Home from './pages/Home.vue'

const routes = [
    {path: '/', component: () => import('./pages/Home.vue')},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

const app = createApp(Home)

app.use(createPinia())
app.use(router)
app.mount('#app')
