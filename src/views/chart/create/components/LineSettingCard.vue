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
        <el-switch v-model="lineLabelShow" @change="changeLabelShow" inactive-text="是否开启指标数值："></el-switch>
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
      lineLabelShow: false
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
    }
  }
}
</script>
