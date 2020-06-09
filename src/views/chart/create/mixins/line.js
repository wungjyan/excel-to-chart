export default {
  data () {
    return {
    }
  },
  methods: {
    changeLineStack (val) {
      if (val) {
        const stackList = this.getColumns(this.sheetJson)
        stackList.shift()
        this.chartItemOption.line.settings.stack = { 总量: stackList }
      } else {
        this.chartItemOption.line.settings.stack = {}
      }
    },
    changeArea (val) {
      this.chartItemOption.line.settings.area = val
    },
    changeLabelShow (val) {
      this.chartItemOption.line.extend.series.label.normal.show = val
    },
    changeLineLabelPosition (val) {
      this.chartItemOption.line.extend.series.label.normal.position = val
    }
  }
}
