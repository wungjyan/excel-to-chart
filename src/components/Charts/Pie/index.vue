<template>
  <div class="pie-container">
    <el-col :span="16">
      <el-card>
        <ve-pie
          :data="chartData"
          :settings="settings"
          :extend="extend"
          :width="width + 'px'"
          :height="height + 'px'"
          :title="title"
          :legendVisible="legendVisible"
          :tooltipVisible="tooltipVisible"
          style="margin:0 auto;"
        ></ve-pie>
      </el-card>
    </el-col>
    <el-col :span="8">
      <common-setting
        chart-type="pie"
        @change-width="changeWidth"
        @change-height="changeHeight"
        @change-title-status="changeTitleStatus"
        @change-title="changeTitle"
        @change-title-color="changeTitleColor"
        @change-legend-status="changeLegendStatus"
        @change-tooltip-status="changeTooltipStatus"
      />
      <el-card>
        <p>
          <span class="setting-title">标签显示位置：</span>
          <el-radio-group v-model="labelPosition" @change="changeLabelPosition">
            <el-radio label="outside">outside</el-radio>
            <el-radio label="inside">inside</el-radio>
          </el-radio-group>
        </p>
        <p>
          <span class="setting-title">标签内容格式：</span>
          <el-radio-group
            v-model="labelFormatter"
            @change="changeLabelFormatter"
          >
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
      </el-card>
    </el-col>
  </div>
</template>

<script>
import CommonSetting from '../components/CommonSetting'
export default {
  name: 'MPie',
  components: { CommonSetting },
  props: {
    chartData: {
      type: Object,
      default: () => ({})
    },
    fileName: String
  },
  data () {
    return {
      width: '500',
      height: '400',
      showTitle: false,
      chartTitle: '',
      titleColor: '#333',
      legendVisible: true,
      tooltipVisible: true,
      labelPosition: 'outside',
      labelFormatter: '{b}',
      reseType: false,
      settings: {
        roseType: false
      },
      extend: {
        series: {
          label: { show: true, position: 'outside', formatter: '{b}' }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        }
      }
    }
  },
  computed: {
    title () {
      const title = {
        show: this.showTitle,
        text: this.chartTitle ? this.chartTitle : this.fileName,
        textStyle: {
          color: this.titleColor
        }
      }
      return title
    }
  },
  methods: {
    changeLabelPosition (v) {
      this.extend.series.label.position = v
    },
    changeLabelFormatter (v) {
      this.extend.series.label.formatter = v
    },
    changeRoseType (v) {
      this.settings.roseType = v
    },
    // 下面是公共组件的设置
    changeWidth (w) {
      this.width = w
    },
    changeHeight (h) {
      this.height = h
    },
    changeTitleStatus (s) {
      this.showTitle = s
    },
    changeTitle (t) {
      this.chartTitle = t
    },
    changeTitleColor (c) {
      this.titleColor = c
    },
    changeLegendStatus (l) {
      this.legendVisible = l
    },
    changeTooltipStatus (t) {
      this.tooltipVisible = t
    }
  }
}
</script>

<style scoped></style>
