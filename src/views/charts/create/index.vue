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
      <span style="margin:0 10px;">{{sheetJson?`您当前操作文件是【${fileName}】，默认折线图，可切换图表`:'您还未上传excel哦，不可以选择图表'}}</span>
       <i class="el-icon-sugar"></i>
    </el-divider>
    <div style="text-align:center;">
      <el-switch v-model="openTest" @change="changeTestStatus" inactive-text="启用测试数据" style="margin-right:10px;"></el-switch>
      <el-select v-model="chartType" :disabled="!sheetJson" clearable placeholder="选择图表类型">
         <el-option-group
          v-for="group in chartsList"
          :key="group.label"
          :label="group.label">
           <el-option
            v-for="item in group.options"
            :key="item.name"
            :label="item.label"
            :value="item.name">
           <span style="float: left">{{ item.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
          </el-option>
         </el-option-group>
      </el-select>
    </div>
    <div v-if="sheetJson" style="margin-top:30px;overflow:hidden;">
      <component :is="currentChartComponent" :chart-data="chartData" :file-name="fileName"></component>
    </div>

  </div>
</template>

<script>
import XLSX from 'xlsx'
import { getColumns, getRows } from '@/utils/index'
import MLine from '@/components/Charts/Line/index'
import MHistogram from '@/components/Charts/Histogram/index'
import MBar from '@/components/Charts/Bar/index'
import MPie from '@/components/Charts/Pie/index'
import MRing from '@/components/Charts/Ring/index'
import MScatter from '@/components/Charts/Scatter/index'
export default {
  components: { MLine, MHistogram, MBar, MPie, MRing, MScatter },
  data () {
    return {
      sheetJson: null,
      fileName: '',
      chartType: 'line', // 图表类型
      openTest: false, // 启用测试数据
      chartsList: [
        {
          label: '可显示多列数据',
          options: [
            {
              label: '折线图',
              name: 'line'
            },
            {
              label: '柱状图',
              name: 'histogram'
            },
            {
              label: '条形图',
              name: 'bar'
            },
            {
              label: '散点图',
              name: 'scatter'
            }
          ]
        },
        {
          label: '只显示单列数据',
          options: [
            {
              label: '饼图',
              name: 'pie'
            },
            {
              label: '环图',
              name: 'ring'
            }
          ]
        }
      ]
    }
  },
  computed: {
    chartData () {
      return {
        columns: getColumns(this.sheetJson),
        rows: getRows(this.sheetJson)
      }
    },
    currentChartComponent () {
      return 'm-' + this.chartType
    }
  },
  methods: {
    changeFile (file) {
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
    changeTestStatus (val) {
      if (val) {
        this.fileName = '测试数据'
        this.sheetJson = [
          { A: '日期', B: '短袖', C: '衬衫', D: '裤子', E: '鞋子' },
          { A: '一月', B: 20, C: 60, D: 67, E: 43 },
          { A: '二月', B: 15, C: 80, D: 54, E: 27 },
          { A: '三月', B: 50, C: 65, D: 65, E: 51 },
          { A: '四月', B: 65, C: 21, D: 25, E: 80 },
          { A: '五月', B: 178, C: 34, D: 64, E: 26 }
        ]
      } else {
        this.fileName = ''
        this.sheetJson = null
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
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-wrapper{
  margin-bottom: 30px;
   text-align: center;
   /deep/.el-upload-dragger{
       width: 450px;
   }
}
</style>
