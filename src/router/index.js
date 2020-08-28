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
    path: '/charts',
    component: Layout,
    alwaysShow: true,
    meta: { title: '图表功能', icon: 'grape' },
    redirect: '/charts/create',
    children: [
      {
        path: 'about',
        component: () => import('@/views/charts/about/index'),
        meta: { title: '说明书' }
      },
      {
        path: 'create',
        component: () => import('@/views/charts/create/index'),
        meta: { title: '创建图表' }
      }
    ]
  },
  {
    path: '/excel',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'excel 功能', icon: 'watermelon' },
    redirect: '/excel/create',
    children: [
      {
        path: 'create',
        component: () => import('@/views/excel/index.vue'),
        meta: { title: '创建表格' }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    alwaysShow: true,
    href: 'https://github.com/wungjyan/excel-to-chart',
    meta: { title: '源码', icon: 'pear' }
  },
  // {
  //   path: '/old_chart',
  //   component: Layout,
  //   meta: { title: '图表生成', icon: 'grape' },
  //   alwaysShow: true,
  //   redirect: '/old_chart/about',
  //   children: [
  //     {
  //       path: 'about',
  //       component: () => import('@/views/old_chart/about/index'),
  //       meta: { title: '必读系列' }
  //     },
  //     {
  //       path: 'create',
  //       component: () => import('@/views/old_chart/create/index'),
  //       meta: { title: '创建图表' }
  //     }
  //   ]
  // },
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
