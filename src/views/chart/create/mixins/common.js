export default {
  data () {
    return {
      openTest: false, // 启用测试数据
      chartsList: [
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
          label: '饼图',
          name: 'pie',
          disabled: true
        },
        {
          label: '环图',
          name: 'ring',
          disabled: true
        },
        {
          label: '瀑布图',
          name: 'waterfall',
          disabled: true
        },
        {
          label: '漏斗图',
          name: 'funnel',
          disabled: true
        },
        {
          label: '雷达图',
          name: 'radar',
          disabled: true
        },
        {
          label: '散点图',
          name: 'scatter',
          disabled: true
        }
      ],
      // 每种图表的默认设置
      chartItemOption: {
        line: {
          settings: {
            stack: {},
            area: false
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
            'xAxis.0.axisLabel.rotate': 0
          }
        },
        histogram: {
          settings: {
            showLine: [],
            stack: {}
          },
          extend: {
            series: { label: { show: false, position: 'top' } },
            'xAxis.0.axisLabel.rotate': 0
          }
        },
        bar: {
          settings: {
            showLine: [],
            stack: {},
            dataOrder: {}
          },
          extend: {
            series: { label: { show: false, position: 'right' } }
          }
        }
      }
    }
  },
  methods: {
    handleOpenTest (val) {
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
    }
  }
}
