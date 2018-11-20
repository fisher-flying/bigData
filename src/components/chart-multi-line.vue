<template>
  <div :style="{width: width+'px', height:height+'px'}">
  </div>
</template>
<script>
import axios from 'axios'
import mixinChart from './mixins/echarts.js'

const colorList = ['#2b76eb', '#279de5', '#3D349B']
const getDefaultOption = _ => {
  return {
    title: {
      show:false,
      left: 'center',
      top:'center',
      text: '~ 暂无数据 ~',
    },
    textStyle: {
      color: '#818997'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        //type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '8%',
      bottom: '30',
      containLabel: true
    },
    legend: {
      icon: 'rect',
      itemWidth: 10,
      itemHeight: 10,
      right: '1%',
      textStyle: {
        color: '#818997',
        fontSize: '12'
      },
      data: []
    },
    xAxis:{
      type: 'category',
      data: [],
      name: '',
      nameGap: '1',
      boundaryGap: false,
      axisTickaxisTick: { show: false },
      axisLine: {show: false},
      axisTick: {show: false},
      axisLabel: {
        textStyle: {
          color: '#a6a6cc'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {show: false},
      axisTick: {show: false},
      axisLabel: {
        textStyle: {
          color: '#a6a6cc'
        }
      }
    },
    series: []
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
      let resData,option,jsonObj
      const colorList = ['#33db74','#40b3f3','#8855e6','#fe6d71','#ffa14d','#4efdd4','#fff100','#ff98c9','#ba8635','#e60012','#ff2c5e','#40d6e4','#bc4cf8','#008aff','#d9e33b','#ffea60','#ff804e','#54689c','#008d96','#af6cf4','#6f3a8c']
      const defaultOption = getDefaultOption()
      if (curDataId) {
        resData = await axios.get(`${siteFrontURL}report/getData/${curDataId}/${curDataCode}`)
        jsonObj = JSON.parse(resData.data.data)
        //配置20组数(根据接收的数据配置新的series)
        let dataListLen = jsonObj.chartOption.series.length
        for(let i=0;i<dataListLen;i++){
          jsonObj.chartOption.series[i]['symbol']='none'
          jsonObj.chartOption.series[i]['type']='line'
          jsonObj.chartOption.series[i]['itemStyle']={
            normal: {
              color: colorList[i],
            }
          }
        }
        option = _.merge(defaultOption, jsonObj.chartOption)

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
        }

        //记录无数据条数，无数据处理
        let noData = 0
        option.series.forEach(i => {
          if(i.data == 0){
            noData++
          }
        })
        if(noData == option.series.length) {
          option.title.show = true
          option.yAxis.name = ''
          option.xAxis.name = ''
        }
      } else {
        option = defaultOption
        //option.legend.data=['类目一', '类目二', '类目三','类目四']
        option.xAxis.data=['2','4', '6', '8', '10', '12', '14', '16', '18', '20', '22']
        for(let i=0;i<5;i++){
          option.series.push({
            symbol:'none',
            type:'line',
            itemStyle:{
              normal: {
                color: colorList[i],
              }
            },
          })
        }
        option.series[0].data=[100,200,600,500,130,320,100,200,600,500,130,320]
        option.series[1].data=[300,130,320,500,800,100,400,300,160,150,130,220]
        option.series[2].data=[300,120,130,400,500,600,140,230,350,550,270,310]
        option.series[3].data=[400,120,150,300,500,600,500,400,300,440,250,140]

      }
      if (this.theme == 'smooth') {
        option.series.forEach(i => {
          i.smooth = true
          i.areaStyle = {}
        })
      }
      this.option = option
    }
  }
}
</script>