export default {
  data () {
    return {
    }
  },
  methods: {
    // 折线图 stack 开关
    changeLineStack (val) {
      if (val) {
        const stackList = this.getColumns(this.sheetJson)
        stackList.shift()
        this.chartItemOption.line.settings.stack = { 总量: stackList }
      } else {
        this.chartItemOption.line.settings.stack = {}
      }
    },
    // 折线图 area 开关
    changeArea (val) {
      this.chartItemOption.line.settings.area = val
    },
    // 折线图指标数值开关
    changeLabelShow (val) {
      this.chartItemOption.line.extend.series.label.normal.show = val
    }
  }
}
