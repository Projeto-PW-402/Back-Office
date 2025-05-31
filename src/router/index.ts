import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    alias: '/login',
  },
  {
    path: '/dashboard',
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
    name: 'Users',
    component: () => import('../pages/Utilizadores.vue'),
  },
  {
    path: '/auditorias/pedidos',
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
  {
    path: '/auditorias/pedidos/config/:id',
    name: 'CriarAuditoria',
    component: () => import('../subpages/CriarAuditoria.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Proteção de rotas (bloqueia acesso se não houver user no localStorage)
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user')
  const publicRoutes = ['Login']

  if (typeof to.name === 'string' && !publicRoutes.includes(to.name) && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
