export default {
  data () { return {} },
  methods: {
    changeBarStack (val) {
      if (val) {
        const stackList = this.getColumns(this.sheetJson)
        stackList.shift()
        this.chartItemOption.bar.settings.stack = { 总量: stackList }
      } else {
        this.chartItemOption.bar.settings.stack = {}
      }
    },
    changeBarLabelShow (val) {
      this.chartItemOption.bar.extend.series.label.show = val
    },
    changeBarLabelPosition (val) {
      this.chartItemOption.bar.extend.series.label.position = val
    },
    changeOrderItem (val) {
      let order = this.chartItemOption.bar.settings.dataOrder.order
      order = order || 'desc'
      this.chartItemOption.bar.settings.dataOrder = { label: val, order }
    },
    changeOrderType (val) {
      this.chartItemOption.bar.settings.dataOrder.order = val
    }
  }
}
