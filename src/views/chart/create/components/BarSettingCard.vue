<template>
  <div class="bar-setting-card">
    <el-divider content-position="left">条形图的配置</el-divider>
    <p>
      <el-switch v-model="barStackStatus" @change="changeStack" inactive-text="是否开启堆叠："></el-switch>
      <span class="after-tip">目前仅支持所有项目一起开启堆叠</span>
    </p>
    <p>
        <el-switch v-model="barLabelShow" @change="changeLabelShow" inactive-text="是否显示指标数值："></el-switch>
    </p>
    <p v-if="barLabelShow">
      <el-radio-group v-model="labelPosition" @change="changeLabelPosition">
        <el-radio label="top">top</el-radio>
        <el-radio label="right">right</el-radio>
        <el-radio label="bottom">bottom</el-radio>
        <el-radio label="left">left</el-radio>
      </el-radio-group>
    </p>
    <p>
      <span class="setting-title">你可以选择一项进行排序：</span>
      <el-radio-group v-model="orderItem" @change="changeOrderItem">
        <el-radio v-for="item in metrics" :key="item" :label="item">{{item}}</el-radio>
      </el-radio-group>
    </p>
    <p>
      <span class="setting-title">这里可以修改排序方式：</span>
      <el-radio-group v-model="orderType" @change="changeOrderType">
        <el-radio label="desc">降序</el-radio>
        <el-radio label="asc">升序</el-radio>
      </el-radio-group>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      barStackStatus: false,
      barLabelShow: false,
      labelPosition: 'right',
      orderItem: '',
      orderType: 'desc'
    }
  },
  computed: {
    metrics () {
      return this.columns.slice(1)
    }
  },
  methods: {
    changeStack (val) {
      this.$emit('changeStack', val)
    },
    changeLabelShow (val) {
      this.$emit('changeLabelShow', val)
    },
    changeLabelPosition (val) {
      this.$emit('changeLabelPosition', val)
    },
    changeOrderItem (val) {
      this.$emit('changeOrderItem', val)
    },
    changeOrderType (val) {
      this.$emit('changeOrderType', val)
    }
  }
}
</script>

<style scoped>

</style>
