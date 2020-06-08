const state = {
  sidebarCollapse: false
}

const mutations = {
  SET_SIDEBAR_COLLAPSE (state, status) {
    state.sidebarCollapse = status
  }
}

const actions = {
  setSidebarCollapse ({ commit }, status) {
    commit('SET_SIDEBAR_COLLAPSE', status)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
