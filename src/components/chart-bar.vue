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
    xAxis: {
      name: '',
      nameGap: '1',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#a4a5c9'
      },
      data: [] // x轴类目名
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#a4a5c9'
      }
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '30',
      containLabel: true
    },
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c}人",
    },
    series: [
      {
        type: 'pictorialBar',
        //barCategoryGap: '30%',
        symbol: 'path://M0,10 L10,10 C6.5,10 7,0 5,0 C3,0 3.5,10 0,10 z',
        data: [], // 对应上面x轴类目名的值
        itemStyle: {
          normal: {
            color: function(params) {
              var colorList = []
              //配置20组色系
              colorList[0] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#14bd87' },
                { offset: 0, color: '#3ce36f' }
              ])
              colorList[1] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#6d76e9' },
                { offset: 0, color: '#40e2e9' }
              ])
              colorList[2] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#605cd9' },
                { offset: 0, color: '#c34afa' }
              ])
              colorList[3] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#fe8b6d' },
                { offset: 0, color: '#fe6da0' }
              ])
              colorList[4] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#ff5e4d' },
                { offset: 0, color: '#ffe04d' }
              ])
              colorList[5] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#00ddff' },
                { offset: 0, color: '#5bffa0' }
              ])
              colorList[6] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#ffba00' },
                { offset: 0, color: '#fff100' }
              ])
              colorList[7] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#ff1e89' },
                { offset: 0, color: '#ff98c9' }
              ])
              
              colorList[8] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#923400' },
                { offset: 0, color: '#ba8635' }
              ])
              colorList[9] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#b70e5e' },
                { offset: 0, color: '#e60012' }
              ])
              colorList[10] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#ae44cd' },
                { offset: 0, color: '#ff2c5e' }
              ])
              colorList[11] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#6c77ea' },
                { offset: 0.5, color: '#46a8f1' },
                { offset: 0, color: '#40d6e4' }
              ])
              colorList[12] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#605bd9' },
                { offset: 0.5, color: '#8955e6' },
                { offset: 0, color: '#bc4cf8' }
              ])
              colorList[13] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#1e00ff' },
                { offset: 0, color: '#008aff' }
              ])
              colorList[14] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#009944' },
                { offset: 0, color: '#d9e33b' }
              ])
              colorList[15] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#fe5da9' },
                { offset: 0, color: '#ffea60' }
              ])
              colorList[16] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#ff804e' },
                { offset: 0, color: '#ff804e' }
              ])
              colorList[17] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#54689c' },
                { offset: 0, color: '#54689c' }
              ])
              colorList[18] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#008d96' },
                { offset: 0, color: '#008d96' }
              ])
              colorList[19] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#af6cf4' },
                { offset: 0, color: '#af6cf4' }
              ])
              colorList[20] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#6f3a8c' },
                { offset: 0, color: '#6f3a8c' }
              ])
              return colorList[params.dataIndex]
            }
          }
        }
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
        let returnValue = option.series[0].data
        for(let i = 0; i < returnValue.length; i++){
          if (returnValue[i] == 0) { returnValue[i] = null }
        }
        //单位处理
        option.xAxis.axisLabel={
           interval:0,
           rotate:-42
        }
        if (option.series.length != 0) {
          let max = Math.max(...option.series[0].data)
          let unit = 1
          if(max > 10000) {
            option.yAxis.name = '/万人',
            unit = 10000
          }else if(max > 1000 && max < 10000) {
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
        }

        //无数据处理
        if(!option.series[0].data.length){
          option.title.show=true
          option.yAxis.name = ''
          option.xAxis.name = ''
        }
      } else {
        option = defaultOption
        option.series[0].data = [111, 111, 111, 111, 111, 111]
        option.xAxis.data = ["0-3", "4-7", "8-11", "12-15", "16-19", "20-23"]
      }
      if(!this.theme){
        option.series[0].itemStyle={
          normal: {
            color: function(params) {
              var colorList = []
              colorList[0] = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 1, color: '#0ce2f9' },
                { offset: 0, color: '#03defd' }
              ])
              colorList[1] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#2df0e8' },
                { offset: 0, color: '#1ee9f0' }
              ])
              colorList[2] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#4cfdd5' },
                { offset: 0, color: '#3ff7de' }
              ])
              colorList[3] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#5bffbe' },
                { offset: 0, color: '#56ffcb' }
              ])
              colorList[4] = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 1, color: '#5bffa5' },
                { offset: 0, color: '#5bffaf' }
              ])
              return colorList[params.dataIndex]
            }
          }
        }
      }else if (this.theme == 'wave') {

      } else if (this.theme == 'cone') {
        option.series[0].symbol = 'path://"M 100 0 L 50 100 L 150 100 z'
      } else if (this.theme == 'cust') {
        option.tooltip.formatter="{b}" + units + "：{c}人"
        option.xAxis.axisLabel={
          rotate:0
        }
        option.series[0].symbol = 'path:// M100,100a12.5,12 0 1 0 25 0a12.5,12 0 1 0 -25 0z M113,122c27,0 0,-10 0,-10c0,0 -28,10 0,10z M101,122h24v120h-24z'
        option.series[0].itemStyle={
          borderColor:'#40e1e9',
          color:'#40e1e9'
        }
        option.series[0].barCategoryGap='54%'
      }
      this.option = option
    }
  }
}
</script>

