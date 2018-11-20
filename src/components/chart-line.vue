<template>
  <div :style="{width: width+'px', height:height+'px'}">
  </div>
</template>
<script>
import axios from 'axios'
import mixinChart from './mixins/echarts.js'

let units = ''   // tooltip 单位
const getDefaultOption = _ => {
  return {
    title: {
      show:false,
      left: 'center',
      top:'center',
      text: '~ 暂无数据 ~',
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c}人<br/>",
      // formatter: function (params) {
      //   let res = params.name + units + "：" + params.value + "人"
      //   return res
      // }
    },
    xAxis: {
      type: 'category',
      data: [],
      name: '',
      nameGap: '1',
      axisLine: {show: false},
      axisTick: {show: false},
      axisLabel: {
        textStyle: {
          color: '#a6a6cc'
        }
      }
    },
    yAxis: {
      axisLine: {show: false},
      axisTick: {show: false},
      axisLabel: {
        textStyle: {
          color: '#a6a6cc'
        }
      }
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '30',
      containLabel: true
    },
    series: [
      {
        data: [],
        type: 'line',
        lineStyle:{
          width:1
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#ff5e4d' }, 
            { offset: 1, color: '#ffe04d' }
          ]),
          lineStyle: {
            color: '#00FF00'
          }
        },
      }
    ]
  }
}
export default {
  mixins: [mixinChart],
  props: {
    theme: String,
    curDataId: String,
    curDataCode: String,
    initcode:String
  },

  watch: {
    //菜单切换业务
    'initcode'(val) {
      this.initAPPCode()
    },
    //同业务切换维度，如运营切换维度
    'curDataCode'(val) {
      this.drawChart(this.curDataId, val)
    }
  },
  async beforeMount() {
    this.initAPPCode()
  },
  methods: {
    //选取配置的第一个维度
    async initAPPCode() {
      let initCode
      if(this.initcode){
        initCode = this.initcode.split(',')[0]
      }else{
        initCode = this.curDataCode
      }
      this.drawChart(this.curDataId, initCode)
    },
    async drawChart(curDataId,curDataCode) {
      let resData, option, jsonObj
      const defaultOption = getDefaultOption()
      if (curDataId) {
        resData = await axios.get(`${siteFrontURL}report/getData/${curDataId}/${curDataCode}`)
        jsonObj = JSON.parse(resData.data.data)
        option = _.merge(defaultOption, jsonObj.chartOption)
        units = jsonObj.chartOption.xAxis.name
        
        //单位处理
        if (option.series.length != 0) {
          let max = Math.max(...option.series[0].data)
          let unit = 1
          if(max > 10000){
            option.yAxis.name = '/万人',
            unit = 10000
          }else if(max > 1000 && max < 10000){
            option.yAxis.name = '/千人',
            unit = 1000
          } else {
            option.yAxis.name = '/人'
          }
          option.yAxis.axisLabel = {
            formatter: function (a) {
              a = + a;
              return isFinite(a)? echarts.format.addCommas(+ a / unit): '';
            }
          }
          option.tooltip.formatter="{b}" + units + "：{c}人"
        }

        //无数据处理
        if(!option.series[0].data.length) {
          option.title.show = true
          option.yAxis.name = ''
          option.xAxis.name = ''
        }
      } else {
        option = defaultOption
        option.xAxis.data=['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24']
        option.series[0].data=[1000, 1500, 2000, 3000, 4500, 3800, 4800, 5200, 5000, 4500, 2500, 1800]
      }
      if (this.theme == 'flat') {
        option.series[0].itemStyle={
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#6d76e9' }, 
            { offset: 1, color: '#40e2e9' }
          ]),
        }
        option.series[0].areaStyle={
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#966fc2' }, { offset: 1, color: '#1f1c39' }])
          }
        }
      }
      if (this.theme == 'line') {
         option.xAxis.axisLabel={
          rotate: -45
        }
      }
      this.option = option
    }
  }
}
</script>

