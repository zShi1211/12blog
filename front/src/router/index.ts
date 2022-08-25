import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component:Home
    },
    {
      path: "/articles",
      // 在生产环境中不能直接使用import，需要用函数作为返回值
      component: () =>import("@/views/Articles.vue"),
    },
    {
      path: "/articleDetail/:id",
      component: () =>import("@/views/ArticleDetail.vue"),
    },
    {
      path: "/share",
      component:() => import("@/views/Share.vue"),
    },
    {
      path: "/letters",
      component:() => import("@/views/Letters.vue"),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/404.vue'),
    }
  ]
})

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').filter(i => i !== "").length
  const fromDepth = from.path.split('/').filter(i => i !== "").length
  to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
})

export default router
