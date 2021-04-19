<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
// import resize from '../mixins/resize'
// import { noData } from '../NoData/NoData'
require('echarts/theme/macarons') // echarts theme
export default {
  // mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '247px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        if (Object.getOwnPropertyNames(this.chartData).length !== 0) {
          this.initChart()
          this.setOptions(val)
        }
      }
    }
  },
  mounted() {
    console.log(this.chartData, 'cha')
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      if (this.chartData.data.length) {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      }
    },
    setOptions({ data } = {}) {
      var years = []
      for (var i = 0; i < data.length; ++i) {
        if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
          years.push(data[i][4])
        }
      }
    }
  }
}
</script>
