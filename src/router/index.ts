import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component : () => import('../pages/Dashboard.vue')
    },
    {
        path: '/Monitoramento',
        name: 'Monitoramento',
        component : () => import('../pages/Monitoramento.vue')
    },
    {
        path: '/Materiais',
        name: 'Materiais',
        component : () => import('../pages/Materiais.vue')
    },
    {
        path: '/Utilizadores',
        name: 'Utilizadores',
        component : () => import('../pages/Utilizadores.vue')
    },
    {
        path: '/Auditorias',
        name: 'Auditorias',
        component : () => import('../pages/Auditorias.vue')
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router