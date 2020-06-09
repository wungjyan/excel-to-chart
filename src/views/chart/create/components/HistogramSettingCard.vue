<template>
  <div class="histogram-setting-card">
    <el-divider content-position="left">柱状图的配置</el-divider>
    <p>
        <el-switch v-model="hisStackStatus" @change="changeStack" inactive-text="是否开启堆叠："></el-switch>
        <span class="after-tip">目前仅支持所有项目一起开启堆叠</span>
    </p>
    <p>
        <el-switch v-model="hisLabelShow" @change="changeLabelShow" inactive-text="是否显示指标数值："></el-switch>
    </p>
    <p v-if="hisLabelShow">
        <el-radio-group v-model="labelPosition" @change="changeLabelPosition">
            <el-radio label="top">top</el-radio>
            <el-radio label="right">right</el-radio>
            <el-radio label="bottom">bottom</el-radio>
            <el-radio label="left">left</el-radio>
        </el-radio-group>
    </p>
    <p>
        <span class="setting-title">选择下面的项可变成折线图：</span>
        <el-checkbox-group v-model="showLine" style="margin-top:5px;">
            <el-checkbox v-for="item in metrics" :key="item" :label="item"></el-checkbox>
        </el-checkbox-group>
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
      hisStackStatus: false,
      hisLabelShow: false,
      labelPosition: 'top',
      showLine: []
    }
  },
  computed: {
    metrics () {
      return this.columns.slice(1)
    }
  },
  watch: {
    showLine (val) {
      this.$emit('changeShowLine', val)
    }
  },
  methods: {
    log () {
      console.log(this.showLine)
    },
    changeStack (val) {
      this.$emit('changeStack', val)
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

<style scoped>

</style>
