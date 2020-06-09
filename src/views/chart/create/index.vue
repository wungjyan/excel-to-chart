<template>
  <div class="create-chart page-container">
    <el-upload
      class="upload-wrapper"
      drag action="" accept=".xlsx, .xls"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="changeFile">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传 .xlsx 或者 .xls 文件</div>
    </el-upload>
    <el-divider>
      <i class="el-icon-lollipop"></i>
      <span style="margin:0 10px;">{{sheetJson?`您当前上传文件是【${fileName}】，默认折线图，可切换图表`:'您还未上传excel哦，不可以选择图表'}}</span>
       <i class="el-icon-sugar"></i>
    </el-divider>
    <div style="text-align:center;">
      <el-switch v-model="openTest" @change="handleOpenTest" inactive-text="启用测试数据"></el-switch>
      <el-select v-model="chartType" :disabled="!sheetJson" clearable placeholder="选择图表类型">
        <el-option
          v-for="item in chartsList"
          :key="item.name"
          :label="item.label"
          :value="item.name">
          <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
        </el-option>
      </el-select>
    </div>
    <el-row v-if="sheetJson" style="margin-top:50px;" :gutter="10">
      <el-col :span="16">
        <el-card>
          <ve-chart
            :tooltipVisible="tooltipVisible"
            :legendVisible="legendVisible"
            :data="chartData"
            :width="width+'px'"
            :height="height+'px'"
            :extend="extend"
            :settings="chartSettings">
          </ve-chart>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <p>
            <span class="setting-title">尺寸：</span>
            <el-input
              style="width:120px;"
              placeholder="输入宽度"
              v-model="width"
              size="mini"
              clearable>
            </el-input>
            <i class="el-icon-close"></i>
            <el-input
            style="width:120px;"
              placeholder="输入高度"
              v-model="height"
              size="mini"
              clearable>
            </el-input>
          </p>
          <p>
            <el-switch v-model="legendVisible" inactive-text="是否显示图例："></el-switch>
            <span class="after-tip">图例按钮可以点击的哦</span>
          </p>
          <p>
            <el-switch v-model="tooltipVisible" inactive-text="是否显示提示框："></el-switch>
            <span class="after-tip">关闭时鼠标移入不显示提示框</span>
          </p>
          <p>
            <span class="setting-title">横坐标倾斜角度：</span>
            <el-input-number v-model="rotate" @change="changeRotate" :disabled="disableRotate" size="mini" :min="0" :max="180"></el-input-number>
            <span class="after-tip">如果手动输入，失焦时才会改变</span>
          </p>
        </el-card>
        <!-- 每个图表提供单独的设置块 -->
        <el-card>
          <line-setting-card
            v-if="chartType === 'line'"
            @changeStack="changeLineStack"
            @changeArea="changeArea"
            @changeLabelShow="changeLabelShow"
            @changeLabelPosition="changeLineLabelPosition"/>
          <histogram-setting-card
            v-if="chartType === 'histogram'"
            :columns="getColumns(sheetJson)"
            @changeStack="changeHisStack"
            @changeLabelShow="changeHisLabelShow"
            @changeLabelPosition="changeHisLabelPosition"
            @changeShowLine="changeShowLine"
            />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import common from './mixins/common'
import line from './mixins/line'
import histogram from './mixins/histogram'
import LineSettingCard from './components/LineSettingCard'
import HistogramSettingCard from './components/HistogramSettingCard'
export default {
  mixins: [common, line, histogram],
  components: {
    LineSettingCard,
    HistogramSettingCard
  },
  data () {
    return {
      sheetJson: null,
      fileName: '',
      chartType: 'line',
      width: '500',
      height: '400',
      tooltipVisible: true,
      legendVisible: true,
      rotate: 0
    }
  },
  computed: {
    chartData () {
      return {
        columns: this.getColumns(this.sheetJson),
        rows: this.getRows(this.sheetJson)
      }
    },
    extend () {
      return {
        title: { text: this.fileName },
        ...this.chartItemOption[this.chartType].extend
      }
    },
    chartSettings () {
      return {
        type: this.chartType,
        ...this.chartItemOption[this.chartType].settings
      }
    },
    disableRotate () {
      if (['line', 'histogram', 'bar'].includes(this.chartType)) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    changeRotate (num) {
      this.chartItemOption[this.chartType].extend['xAxis.0.axisLabel.rotate'] = num
    },
    changeFile (file) {
      // console.log('file: ', file)
      try {
        this.fileName = file.name
        const _this = this
        const reader = new FileReader()
        reader.onload = function (e) {
          const data = e.target.result
          const wb = XLSX.read(data, {
            type: 'array'
          })
          // console.log('wb:', wb)
          _this.sheetJson = _this.getSheetJsonArray(wb)
          _this.$notify({
            title: '上传成功',
            message: '文件已上传并正常解析',
            type: 'success'
          })
        }
        reader.readAsArrayBuffer(file.raw)
      } catch (error) {
        this.$notify({
          title: '害，好像出错了！',
          message: `错误信息：${error}`,
          type: 'error'
        })
      }
    },
    getSheetJsonArray (wb) {
      const sheetName = wb.SheetNames[0]
      const sheetJson = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {
        header: 'A',
        raw: true,
        defval: ' '
      })
      console.log('sheet_to_json: ', sheetJson)
      return sheetJson
    },
    getColumns (sheetJson) {
      const o = { ...sheetJson[0] }
      return this.objectToArray(o)
    },
    getRows (sheetJson) {
      const arr = [...sheetJson]
      const firstObj = arr.shift()
      const rows = []
      arr.forEach(item => {
        const keys = Object.keys(item)
        const _obj = {}
        keys.forEach(key => {
          _obj[firstObj[key]] = item[key]
        })
        rows.push(_obj)
      })
      return rows
    },
    objectToArray (obj) {
      const arr = []
      for (const key in obj) {
        arr.push(obj[key])
      }
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
.create-chart{
  position: relative;
  .el-divider{
    margin-top: 50px;
  }
  /deep/.setting-title{
    font-size: 14px;
    color: #303133;
    font-weight: 500;
    margin-right: 10px;
  }
}
/deep/.after-tip{
  margin-left:5px;font-size:10px;color:#C0C4CC;
}
.upload-wrapper{
  margin-bottom: 30px;
   text-align: center;
   /deep/.el-upload-dragger{
       width: 450px;
   }
}
</style>
