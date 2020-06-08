<template>
    <div>
    <el-scrollbar wrapClass="scrollbar-wrapper">
      <el-menu
      :default-active="activeMenu"
      :collapse="sidebarCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
       @select="selectItem">
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :route="route"
          :base-path="route.path"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
    </div>
</template>

<script>
import { constantRoutes } from '@/router/index.js'
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
export default {
  components: { SidebarItem },
  data () {
    return {
      routes: constantRoutes
    }
  },
  computed: {
    ...mapGetters([
      'sidebarCollapse'
    ]),
    variables () {
      return variables
    },
    activeMenu () {
      return this.$route.path
    }
  },
  methods: {
    selectItem (index, indexpath) {
      if (index.indexOf('href') !== -1) {
        window.open(index.split('_')[1])
        return null
      }
      this.$router.push({
        path: index
      // query: {
      //   t: +new Date()
      // }
      })
    }
  }
}
</script>
