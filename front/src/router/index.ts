import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: import("../views/Home.vue")
    },
    {
      path: "/articles",
      component: import("@/views/Articles.vue"),
    },
    {
      path: "/articleDetail/:id",
      component: import("@/views/ArticleDetail.vue"),
    },
    {
      path: "/share",
      component: import("@/views/Share.vue"),
    },
    {
      path: "/letters",
      component: import("@/views/Letters.vue"),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/404.vue'),
    }
  ]
})

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').filter(i=>i!=="").length
  const fromDepth = from.path.split('/').filter(i=>i!=="").length
  to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
})

export default router
