export default {
  methods: {
    changeHisStack (val) {
      if (val) {
        const stackList = this.getColumns(this.sheetJson)
        stackList.shift()
        this.chartItemOption.histogram.settings.stack = { 总量: stackList }
      } else {
        this.chartItemOption.histogram.settings.stack = {}
      }
    },
    changeHisLabelShow (val) {
      this.chartItemOption.histogram.extend.series.label.show = val
    },
    changeHisLabelPosition (val) {
      this.chartItemOption.histogram.extend.series.label.position = val
    },
    changeShowLine (val) {
      this.chartItemOption.histogram.settings.showLine = val
    }
  }
}
