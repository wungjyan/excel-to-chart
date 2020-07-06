<template>
  <div class="pie-setting-card">
      <el-divider content-position="left">环图的配置</el-divider>
      <p>
        <span class="setting-title">标签显示位置：</span>
        <el-radio-group v-model="labelPosition" @change="changeLabelPosition">
            <el-radio label="outside">outside</el-radio>
            <el-radio label="inside">inside</el-radio>
        </el-radio-group>
      </p>
      <p>
          <span class="setting-title">标签内容格式：</span>
          <el-radio-group v-model="labelFormatter" @change="changeLabelFormatter">
            <el-radio label="{b}">数据名</el-radio>
            <el-radio label="{c}">数据值</el-radio>
            <el-radio label="{b}: {c}">数据名：数据值</el-radio>
          </el-radio-group>
      </p>
      <p>
          <span class="setting-title">是否展示成玫瑰图：</span>
          <el-radio-group v-model="reseType" @change="changeRoseType">
            <el-radio :label="false">不展示</el-radio>
            <el-radio label="radius">玫瑰图一</el-radio>
            <el-radio label="area">玫瑰图二</el-radio>
          </el-radio-group>
      </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'outside',
      labelFormatter: '{b}',
      reseType: false
    }
  },
  methods: {
    changeLabelPosition (val) {
      this.$emit('changeLabelPosition', val)
    },
    changeLabelFormatter (val) {
      this.$emit('changeLabelFormatter', val)
    },
    changeRoseType (val) {
      this.$emit('changeRoseType', val)
    }
  }
}
</script>

<style scoped>

</style>
