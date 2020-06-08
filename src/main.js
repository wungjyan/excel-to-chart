import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VCharts from 'v-charts'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './styles/index.scss'

Vue.use(ElementUI)
Vue.use(VCharts)

NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = to.meta.title
  next()
})
router.afterEach(() => {
  NProgress.done()
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
