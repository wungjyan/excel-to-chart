<template>
  <div class="line-setting-card">
    <el-divider content-position="left">折线图的配置</el-divider>
    <p>
        <el-switch v-model="lineStackStatus" @change="changeStack" inactive-text="是否开启堆叠："></el-switch>
        <span class="after-tip">目前仅支持所有项目一起开启堆叠</span>
    </p>
    <p>
        <el-switch v-model="lineArea" @change="changeArea" inactive-text="是否开启面积块："></el-switch>
    </p>
    <p>
        <el-switch v-model="lineLabelShow" @change="changeLabelShow" inactive-text="是否显示指标数值："></el-switch>
    </p>
    <p v-if="lineLabelShow">
      <el-radio-group v-model="labelPosition" @change="changeLabelPosition">
          <el-radio label="top">top</el-radio>
          <el-radio label="right">right</el-radio>
          <el-radio label="bottom">bottom</el-radio>
          <el-radio label="left">left</el-radio>
      </el-radio-group>
    </p>
    <!-- 计划 横轴数据类型设计 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      lineStackStatus: false,
      lineArea: false,
      lineLabelShow: false,
      labelPosition: 'top'
    }
  },
  methods: {
    changeStack (val) {
      this.$emit('changeStack', val)
    },
    changeArea (val) {
      this.$emit('changeArea', val)
    },
    changeLabelShow (val) {
      this.$emit('changeLabelShow', val)
    },
    changeLabelPosition (val) {
      this.$emit('changeLabelPosition', val)
    }
  }
}
</script>
