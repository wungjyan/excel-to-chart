import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const files = require.context('./modules', true, /\.js$/)
const modules = {}
files.keys().forEach(key => {
  const name = key.replace(/^\.\/(.*)\.\w+$/, '$1')
  modules[name] = files(key).default || files(key)
})

export default new Vuex.Store({
  namespaced: true,
  modules,
  getters
})
