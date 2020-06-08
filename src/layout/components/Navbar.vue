<template>
  <div class="navbar">
    <div class="menu-toggle-btn" @click="toggleMenu">
      <i class="iconfont" :class="sidebarCollapse?'icon-indent':'icon-outdent'"></i>
    </div>
    <breadcrumb class="breadcrumb-container"/>
    <div class="right-menu">
      <screenfull class="screenfull-btn"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Screenfull from '@/components/Screenfull'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: { Screenfull, Breadcrumb },
  computed: {
    ...mapGetters([
      'sidebarCollapse'
    ])
  },
  methods: {
    toggleMenu () {
      this.$store.dispatch('app/setSidebarCollapse', !this.sidebarCollapse)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar{
  position: relative;
  width: 100%;
  height: 50px;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .menu-toggle-btn{
    position: absolute;
    top: 0px;
    left: 0px;
    box-sizing: border-box;
    width: 50px;
    height: 100%;
    padding: 0px 15px;
    line-height: 50px;
    i{
      font-size: 20px;
    }
    &:hover{
      background: rgba(0, 0, 0, .025)
    }
  }
  .breadcrumb-container{
    margin-left: 60px;
  }
  .right-menu{
    position: absolute;
    top: 0;
    right: 20px;
    height: 100%;
    .screenfull-btn{
      display: inline-block;
      margin-top: 15px;
      margin-right: 50px;
    }
  }

}
</style>
