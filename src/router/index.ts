import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard.vue'),
  },
  {
    path: '/monitoramento',
    name: 'Monitoramento',
    component: () => import('../pages/Monitoramento.vue'),
  },
  {
    path: '/materiais',
    name: 'Materiais',
    component: () => import('../pages/Materiais.vue'),
  },
  {
    path: '/users',
    name: 'Utilizadores',
    component: () => import('../pages/Utilizadores.vue'),
  },
  {
    path: '/auditorias',
    redirect: to => {
        // the function receives the target route as the argument
        return to.path.replace('auditorias', 'auditorias/pedidos')
      },
    name: 'Auditorias',
    component: () => import('../subpages/Pedidos.vue'),
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'pedidos',
        component: () => import('../subpages/Pedidos.vue'),
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: 'criar',
        component: () => import('../subpages/CriarAuditoria.vue'),
      },
    ],
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
