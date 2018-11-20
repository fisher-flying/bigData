<template>
<div :style="{width: width+'px', height:height+'px'}">
</div>
</template>
<script>
  import axios from 'axios'
  import mixinChart from './mixins/echarts.js'

  const getDefaultOption = _ => {
    return {
      title: {
        show:false,
        left: 'center',
        top:'center',
        text: '~ 暂无数据 ~',
      },
      tooltip : {
        trigger: 'item',
        formatter: "{b} : {c}人<br/>{d}%"
      },
      legend: {
        show: true,
        icon: 'rect',
        itemWidth: 10,
        itemHeight: 10,
        right: 'right',
        bottom: 'bottom',
        textStyle: {
        color: '#717788',
        fontSize: '14'
        },
        data: []
      },
      series : [
      {
        type:'pie',
        radius : '75%',
        center : ['50%', '50%'],
        // roseType : 'radius',
        label: {
          normal: {
            textStyle: {
              fontSize:10,
              color: '#8f8fb5'
            }
          }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        labelLine: {
          normal: {
              lineStyle: {
                  color: '#474272'
              },
              length: 5,
              length2: 8
          }
        },
        itemStyle: {
          normal:{
              color: function (params){
                  var colorList = [];
                  colorList[0] = new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                  [
                      {offset: 1, color: '#5c5dc9'},
                      {offset: 0.5, color: '#6e59de'},
                      {offset: 0, color: '#bb4cf7'}
                  ]);
                  colorList[1] = new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                  [
                      {offset: 1, color: '#fd6da0'},
                      {offset: 0.5, color: '#fe6c6f'},
                      {offset: 0, color: '#fd8670'}
                  ]);
                  colorList[2] = new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                  [
                      {offset: 1, color: '#fd5f4d'},
                      {offset: 0.5, color: '#ffa74d'},
                      {offset: 0, color: '#ffdd4d'}
                  ]);
                  colorList[3] = new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                  [
                      {offset: 1, color: '#11a978'},
                      {offset: 0.5, color: '#27d07b'},
                      {offset: 0, color: '#3be26f'}
                  ]);
                  colorList[4] = new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                  [
                      {offset: 1, color: '#5bffa3'},
                      {offset: 0.5, color: '#43f9dc'},
                      {offset: 0, color: '#01ddfe'}
                  ]);
                  colorList[5] = new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                  [
                      {offset: 1, color: '#6c77e9'},
                      {offset: 0.5, color: '#41b1f3'},
                      {offset: 0, color: '#40e1e9'}
                  ]);
                  return colorList[params.dataIndex];
              }
          },
        },
        data:[]
      }]
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
        let resData,option, jsonObj
        const defaultOption = getDefaultOption()
        if (curDataId) {
          resData = await axios.get(`${siteFrontURL}report/getData/${curDataId}/${curDataCode}`)
          jsonObj = JSON.parse(resData.data.data)
          option = _.merge(defaultOption, jsonObj.chartOption)

          //无数据处理
          if(!option.series[0].data.length){
            option.title.show=true
          }
        } else {
          option = defaultOption
          option.legend.data=['题库1','题库2','题库3','题库4','题库5','题库6']
          option.series[0].data=[
              {value:8, name:'题库1'},
              {value:12, name:'题库2'},
              {value:15, name:'题库3'},
              {value:16, name:'题库4'},
              {value:22, name:'题库5'},
              {value:25, name:'题库6'}
          ]
        }
        if (this.theme == 'rose') {
          option.legend.show = false
        }else{
            option.series[0].labelLine.normal.show = false
            option.series[0].roseType = false
            option.series[0].radius = '45%'
            option.series[0].center =['35%', '50%']
            option.series[0].itemStyle={
              normal: {
                color: function (params){
                  var colorList = ["#3568a9",'#2575fe','#7ba2cb','#3992d4','#2774ff','#84b1d8'];
                  return colorList[params.dataIndex];
                }
              }
            }
        }
        this.option = option
      }
    }
  }
</script>

