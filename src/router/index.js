import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'apple' }
      }
    ]
  },
  {
    path: '/chart',
    component: Layout,
    meta: { title: '图表生成', icon: 'grape' },
    alwaysShow: true,
    redirect: '/chart/about',
    children: [
      {
        path: 'about',
        component: () => import('@/views/chart/about/index'),
        meta: { title: '必读系列' }
      },
      {
        path: 'create',
        component: () => import('@/views/chart/create/index'),
        meta: { title: '创建图表' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new VueRouter({
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

// 解决双击菜单栏出现的报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch((error) => error)
}

export default router
