<template>
<div :style="{width: width+'px', height:height+'px'}">
</div>
</template>
<script>
import axios from 'axios'
import mixinChart from './mixins/echarts.js'

const getDefaultOption = _ => {
return {
  tooltip: {
    trigger: 'item',
    show: true,
    formatter: "{b} : {c}人<br/>{d}%",
    backgroundColor: 'rgba(0,0,0,0.7)', // 背景
    padding: [8, 10], //内边距
    extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
  },
  legend: {
      orient: 'vertical',
      icon: 'circle',
      right: 'right',
      top: 'top',
      itemGap:15,
      data: ['PC端', 'APP端', '微信','QQ端'],
      textStyle: {
          color: '#a4a5c9'
      }
  },
  title: [{
        text: '11.11%',
        subtext: 'pc端',
        x: '19%',
        y: '15%',
        textAlign: 'center',
        itemGap:5,
        textStyle: {
          color: '#23cfdb',
          fontSize: 16
        },
        subtextStyle: {color: '#9fa0c4',fontSize: '10'},
  },{
        text: '1.11%',
        subtext: 'APP端',
        x: '59%',
        y: '15%',
        itemGap:5,
        textAlign: 'center',
        textStyle: {
          color: '#9c2af3',
          fontSize: 16
        },
        subtextStyle: {color: '#9fa0c4',fontSize: '10'},
  },{
        text: '0.00%',
        subtext: '微信',
        x: '38%',
        y: '62%',
        itemGap:5,
        textAlign: 'center',
        textStyle: {
          color: '#21d246',
          fontSize: 16
        },
        subtextStyle: {color: '#9fa0c4',fontSize: '10'},
  },{
        text: '1.11%',
        subtext: 'QQ端',
        x: '78%',
        y: '62%',
        itemGap:5,
        textAlign: 'center',
        textStyle: {
          color: '#fc4468',
          fontSize: 16
        },
        subtextStyle: {color: '#9fa0c4',fontSize: '10'},
  }],
  series: [{
        type: 'pie',
        clockWise: false,
        radius: [64, 74],
        center:['20%','25%'],
        itemStyle: {},
        hoverAnimation: false,
        startAngle: 90,
        label:{
            borderRadius:'10',
        },
        data: [{
                value: 11,
                name: 'PC端',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color:'#23cfdb'
                        }, {
                            offset: 1,
                            color: '#228ae9'
                        }])
                    }
                }
            },
            {
                value: 100,
                name: '',
                tooltip: {
                    show: false
                },
                itemStyle:{
                  color: '#2a234e'
                }
            },
        ]
    },{
        type: 'pie',
        clockWise: false,
        radius: [48, 58],
        center:['60%','25%'],
        itemStyle: {},
        hoverAnimation: false,
        startAngle: 90,
        label:{
            borderRadius:'10',
        },
        data: [{
                value: 11,
                name: 'APP端',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color:'#37319f'
                        }, {
                            offset: 1,
                            color: '#9c2af3'
                        }])
                    }
                }
            },
            {
                value: 100,
                name: '',
                tooltip: {
                    show: false
                },
                itemStyle:{
                    color: '#2a234e'
                  }
            },
        ]
    },{
        type: 'pie',
        clockWise: false,
        radius: [32, 42],
        center:['40%','70%'],
        itemStyle: {},
        hoverAnimation: false,
        startAngle: 90,
        label:{
            borderRadius:'10',
        },
        data: [{
                value: 11,
                name: '微信',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color:'#21d246'
                        }, {
                            offset: 1,
                            color: '#099e5e'
                        }])
                    }
                }
            },
            {
                value: 100,
                name: '',
                tooltip: {
                    show: false
                },
                itemStyle:{
                  color: '#2a234e'
                }
            },
        ]
    },{
        type: 'pie',
        clockWise: false,
        radius: [16, 26],
        center:['80%','70%'],
        itemStyle: {},
        hoverAnimation: false,
        startAngle: 90,
        label:{
            borderRadius:'10',
        },
        data: [{
                value: 11,
                name: 'QQ端',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color:'#fc4468'
                        }, {
                            offset: 1,
                            color: '#fd5d43'
                        }])
                    }
                }
            },
            {
                value: 100,
                name: '',
                tooltip: {
                    show: false
                },
                itemStyle:{
                  color: '#2a234e'
                }
            },
        ]
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
      this.initCode = initCode
      this.drawChart(this.curDataId, initCode)
    },
    async drawChart(curDataId,curDataCode) {
      let resData,option, jsonObj
      const defaultOption = getDefaultOption()
      if (curDataId) {
        resData = await axios.get(`${siteFrontURL}report/getData/${curDataId}/${curDataCode}`)
        jsonObj = JSON.parse(resData.data.data)
        option = _.merge(defaultOption, jsonObj.chartOption)
        option.title.forEach((i,index) => {
          i.subtext = option.legend.data[index]
          i.text = Number(option.series[index].data[0].value / (option.series[index].data[1].value + option.series[index].data[0].value)*100).toFixed(2) + '%'
        })

        if (jsonObj.chartOption.series.length == 0) {
            option.series.forEach((item, index) => {
                option.series[index].data[0].value = 0
            })
        }
      } else {
        option = defaultOption
      }
      option.series.forEach(i => {
        i.itemStyle={
          normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            shadowBlur: 40,
            borderWidth: 8,
            shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
          }
        }
        i.data[1].itemStyle={
          normal: {
            color: '#2a234e',
            shadowBlur: {
                shadowColor: 'rgba(255,255,255,0.31)',
            },
            label: {
                show: false
            },
            labelLine: {
                show: false
            }
          }
        }
      })

      if (this.theme == 'nest') {
          option.title.forEach(i => {
            i.show = false
          })
          option.series.forEach(i => {
            i.center = ['35%','50%']
          })
      }else{
        // system_all 下显示百分比
        if(this.curDataCode == "system_all" || this.initCode == "system_all") {
            option.tooltip.formatter="{b} : <br/>{d}%"
            this.initCode = ''
        } else {
            option.tooltip.formatter="{b} : <br/>{c}人"
        }
        option.legend.show = false
        option.series.forEach(i => {
            i.radius = [32, 40]
        })
      }

      this.option = option
    }
  }
}
</script>

