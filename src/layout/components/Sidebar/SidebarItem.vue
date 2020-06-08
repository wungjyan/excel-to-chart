<template>
  <div v-if="!route.hidden">
    <template v-if="showOne(route)">
        <el-menu-item :index="resolvePath(onlyOneChild)">
          <i :class="iconClass(onlyOneChild)"></i>
          <span class="router-title">{{returnTitle(onlyOneChild)}}</span>
        </el-menu-item>
    </template>
    <el-submenu v-else :index="resolvePath(route)" >
      <template slot="title">
        <i :class="iconClass(route)"></i>
        <span class="router-title">{{returnTitle(route)}}</span>
      </template>
      <sidebar-item v-for="child in route.children" :key="child.path" :route="child" :base-path="resolvePath(child)"></sidebar-item>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
export default {
  props: {
    route: {
      type: Object,
      default: () => {}
    },
    basePath: String
  },
  name: 'SidebarItem',
  data: function () {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    showOne (route) {
      if (!route.children) {
        this.onlyOneChild = { ...route, path: '' }
        return true
      }
      if (route.children.length === 1 && !route.alwaysShow && !route.children[0].children) {
        if (!route.children[0].hidden) {
          this.onlyOneChild = route.children[0]
          return true
        } else if (route.children[0].hidden) {
          this.onlyOneChild = { ...route, path: '' }
          return true
        }
      }
      return false
    },
    resolvePath (route) {
      if (route.href) {
        return `href_${route.href}`
      }
      return path.resolve(this.basePath, route.path)
    },
    returnTitle (route) {
      if (route.meta && route.meta.title) {
        return route.meta.title
      }
      if (route.name) {
        return route.name
      }
      return '未设置title'
    },
    iconClass (route) {
      if (route.meta && route.meta.icon) {
        // 自定义icon
        if (route.meta.icon.indexOf('_') === 0) {
          const type = route.meta.icon.split('_')[1]
          // class中添加 el-icon- 是为了使图标样式统一
          return `el-icon- iconfont icon-${type}`
        } else {
          return `el-icon-${route.meta.icon}`
        }
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped></style>
