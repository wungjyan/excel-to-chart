export default {
  methods: {
    changePieLabelPosition (val) {
      this.chartItemOption.pie.extend.series.label.position = val
    },
    changeLabelFormatter (val) {
      this.chartItemOption.pie.extend.series.label.formatter = val
    },
    changeRoseType (val) {
      this.chartItemOption.pie.settings.roseType = val
    }
  }
}
