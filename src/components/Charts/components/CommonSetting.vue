<template>
  <el-card>
    <p>
      <span class="setting-title">尺寸：</span>
      <el-input
          style="width:120px;"
          placeholder="输入宽度"
          v-model="width"
          @input="handleInputWidth"
          size="mini"
          clearable>
      </el-input>
      <i class="el-icon-close"></i>
      <el-input
      style="width:120px;"
          placeholder="输入高度"
          v-model="height"
          @input="handleInputHeight"
          size="mini"
          clearable>
      </el-input>
    </p>
    <p>
      <el-switch v-model="showTitle" @change="changeTitleStatus" inactive-text="是否显示标题："></el-switch>
      <div v-show="showTitle">
        <span class="setting-title">标题重命名：</span>
        <el-input v-model="chartTitle" @input="handleInputTitle" style="width:150px;" type="text" clearable size="mini" placeholder="默认是excel文件名"></el-input>
      </div>
      <div v-show="showTitle">
        <span class="setting-title">标题颜色：</span>
        <el-color-picker v-model="titleColor" @change="changeTitleColor" size="mini"></el-color-picker>
      </div>
    </p>
    <p>
      <el-switch v-model="legendVisible" @change="changeLegendStatus" inactive-text="是否显示图例："></el-switch>
      <span class="after-tip">图例按钮可以点击的哦</span>
    </p>
    <p>
      <el-switch v-model="tooltipVisible" @change="changeTooltipStatus" inactive-text="是否显示提示框："></el-switch>
      <span class="after-tip">关闭时鼠标移入不显示提示框</span>
    </p>
    <p v-show="showRotate">
      <span class="setting-title">横坐标倾斜角度：</span>
      <el-input-number v-model="rotate" @change="changeRotate" size="mini" :min="0" :max="180"></el-input-number>
      <span class="after-tip">如果手动输入，失焦时才会改变</span>
    </p>
  </el-card>
</template>

<script>
export default {
  props: {
    chartType: String
  },
  data () {
    return {
      width: '500',
      height: '400',
      showTitle: false,
      chartTitle: '',
      titleColor: '#333',
      rotate: 0,
      legendVisible: true,
      tooltipVisible: true
    }
  },
  computed: {
    showRotate () {
      return ['line', 'histogram', 'bar'].includes(this.chartType)
    }
  },
  methods: {
    handleInputWidth (w) {
      this.$emit('change-width', w)
    },
    handleInputHeight (h) {
      this.$emit('change-height', h)
    },
    changeTitleStatus (s) {
      this.$emit('change-title-status', s)
    },
    handleInputTitle (t) {
      this.$emit('change-title', t)
    },
    changeTitleColor (c) {
      this.$emit('change-title-color', c)
    },
    changeRotate (r) {
      this.$emit('change-rotate', r)
    },
    changeLegendStatus (l) {
      this.$emit('change-legend-status', l)
    },
    changeTooltipStatus (t) {
      this.$emit('change-tooltip-status', t)
    }
  }
}
</script>

<style scoped>

</style>
