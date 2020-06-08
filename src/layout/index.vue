<template>
  <div class="app-wrapper" :class="{ hideSidebar: sidebarCollapse }">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main>
        <router-view />
      </app-main>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import AppMain from './components/AppMain'
import { mapGetters } from 'vuex'
export default {
  components: { Sidebar, Navbar, AppMain },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['sidebarCollapse'])
  }
}
</script>
