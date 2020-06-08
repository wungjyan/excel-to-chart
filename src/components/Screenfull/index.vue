<template>
  <el-tooltip class="item" effect="dark" :content="isFullscreen?'退出全屏':'开启全屏'" placement="bottom-end">
      <i class="iconfont" :class="isFullscreen?'icon-fullscreen-exit':'icon-fullscreen'" @click="click"></i>
  </el-tooltip>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'Screenfull',
  data () {
    return {
      isFullscreen: false
    }
  },
  methods: {
    click () {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '开启全屏失败',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    change () {
      this.isFullscreen = screenfull.isFullscreen
    },
    init () {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy () {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.destroy()
  }
}
</script>

<style scoped>
i{
    font-size: 20px;
}
</style>
