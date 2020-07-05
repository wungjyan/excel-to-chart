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
      <p v-show="showTitle">
        <span class="setting-title">标题重命名：</span>
        <el-input v-model="chartTitle" @input="handleInputTitle" style="width:150px;" type="text" clearable size="mini" placeholder="默认是excel文件名"></el-input>
      </p>
      <p v-show="showTitle">
        <span class="setting-title">标题颜色：</span>
        <el-color-picker v-model="titleColor" @change="changeTitleColor" size="mini"></el-color-picker>
      </p>
    </p>
    <p>
      <span class="setting-title">横坐标倾斜角度：</span>
      <el-input-number v-model="rotate" @change="changeRotate" size="mini" :min="0" :max="180"></el-input-number>
      <span class="after-tip">如果手动输入，失焦时才会改变</span>
    </p>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      width: '500',
      height: '400',
      showTitle: false,
      chartTitle: '',
      titleColor: '#333',
      rotate: 0
    }
  },
  methods: {
    handleInputWidth (w) {
      this.$emit('changeWidth', w)
    },
    handleInputHeight (h) {
      this.$emit('changeHeight', h)
    },
    changeTitleStatus (s) {
      this.$emit('changeTitleStatus', s)
    },
    handleInputTitle (t) {
      this.$emit('changeTitle', t)
    },
    changeTitleColor (c) {
      this.$emit('changeTitleColor', c)
    },
    changeRotate (r) {
      this.$emit('changeRotate', r)
    }
  }
}
</script>

<style scoped>

</style>
