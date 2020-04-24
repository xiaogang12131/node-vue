import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'main',
    component: () => import('../views/main.vue'),
    redirect: '/category/edit',
    children: [{
        path: 'category/edit',
        name: 'edit',
        component: () => import('../views/category/edit.vue'),
      },
      {
        path: 'category/list',
        name: 'list',
        component: () => import('../views/category/list.vue'),
      },
      {
        path: 'good/edit',
        name: 'edit',
        component: () => import('../views/good/edit.vue'),
      },
      {
        path: 'good/list',
        name: 'list',
        component: () => import('../views/good/list.vue'),
      },
      {
        path: 'hero/edit',
        name: 'edit',
        component: () => import('../views/hero/edit.vue'),
      },
      {
        path: 'hero/list',
        name: 'list',
        component: () => import('../views/hero/list.vue'),
      },
      {
        path: 'adminUser/edit',
        name: 'edit',
        component: () => import('../views/adminUser/edit.vue'),
      },
      {
        path: 'adminUser/list',
        name: 'list',
        component: () => import('../views/adminUser/list.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router