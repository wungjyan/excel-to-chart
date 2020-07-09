<template>
    <div class="scatter-container">
      <el-col :span="16">
        <el-card>
          <ve-scatter
            :data="chartData"
            :settings="settings"
            :extend="extend"
            :width="width+'px'"
            :height="height+'px'"
            :title="title"
            :legendVisible="legendVisible"
            :tooltipVisible="tooltipVisible"
            style="margin:0 auto;"
          ></ve-scatter>
        </el-card>
      </el-col>
      <el-col :span="8">
        <common-setting
          chart-type="scatter"
          @change-width="changeWidth"
          @change-height="changeHeight"
          @change-title-status="changeTitleStatus"
          @change-title="changeTitle"
          @change-title-color="changeTitleColor"
          @change-rotate="changeRotate"
          @change-legend-status="changeLegendStatus"
          @change-tooltip-status="changeTooltipStatus"/>
        <el-card>
          <p>
            <el-switch v-model="stackStatus" @change="changeStack" inactive-text="是否开启堆叠："></el-switch>
          </p>
          <p>
            <el-switch v-model="labelShow" @change="changeLabelShow" inactive-text="是否显示指标数值："></el-switch>
          </p>
          <p v-if="labelShow">
            <el-radio-group v-model="labelPosition" @change="changeLabelPosition">
              <el-radio label="top">top</el-radio>
              <el-radio label="right">right</el-radio>
              <el-radio label="bottom">bottom</el-radio>
              <el-radio label="left">left</el-radio>
            </el-radio-group>
          </p>
          <p>
            <span class="setting-title">散点形状：</span>
            <el-radio-group v-model="symbol" @change="changeSymbol">
              <el-radio v-for="item in symbolList" :key="item" :label="item">{{item}}</el-radio>
            </el-radio-group>
          </p>
          <p>
              <span class="setting-title">散点大小：</span>
              <el-input-number v-model="settings.symbolSize" size="mini" :min="0" :max="20"></el-input-number>
          </p>
          <p>
              <span class="setting-title">旋转散点：</span>
              <el-input-number v-model="settings.symbolRotate" size="mini" :min="0" :max="180"></el-input-number>
          </p>
        </el-card>
      </el-col>
    </div>
</template>

<script>
import CommonSetting from '../components/CommonSetting'
export default {
  name: 'MLine',
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
      stackStatus: false,
      labelShow: false,
      labelPosition: 'top',
      showTitle: false,
      chartTitle: '',
      titleColor: '#333',
      legendVisible: true,
      tooltipVisible: true,
      symbol: 'circle',
      symbolList: ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'],
      settings: {
        stack: {},
        symbol: 'circle',
        symbolSize: 10,
        symbolRotate: 45
      },
      extend: {
        series: {
          label: {
            normal: {
              show: false,
              position: 'top'
            }
          }
        },
        xAxis: {
          axisLabel: {
            rotate: 0
          }
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
    changeStack (val) {
      if (val) {
        const stackList = [...this.chartData.columns]
        console.log(stackList)
        stackList.shift()
        this.settings.stack = { 总量: stackList }
      } else {
        this.settings.stack = {}
      }
    },
    changeLabelShow (val) {
      this.extend.series.label.normal.show = val
    },
    changeLabelPosition (val) {
      this.extend.series.label.normal.position = val
    },
    changeSymbol (v) {
      this.settings.symbol = v
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
    changeRotate (r) {
      this.extend.xAxis.axisLabel.rotate = r
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
