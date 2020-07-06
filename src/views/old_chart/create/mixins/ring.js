export default {
  methods: {
    changeRingLabelPosition (val) {
      this.chartItemOption.ring.extend.series.label.position = val
    },
    changeRingLabelFormatter (val) {
      this.chartItemOption.ring.extend.series.label.formatter = val
    },
    changeRingRoseType (val) {
      this.chartItemOption.ring.settings.roseType = val
    }
  }
}
