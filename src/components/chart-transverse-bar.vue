<template>
  <div :style="{width: width+'px', height:height+'px'}">
  </div>
</template>
<script>
import axios from 'axios'
import mixinChart from './mixins/echarts.js'

 let totleNum = 100
const getDefaultOption = _ => {
  return {
    title: {
        show: false,
        left: 'center',
        top: 'center',
        text: '~ 暂无数据 ~',
    },
  	tooltip: {
    //    formatter: "{b} : {c}人<br/>",
        formatter: function(param) {
            let res = ''
            if (param.seriesIndex == 0) {  // 系统人数
               res =  param.name + '：' +  param.value + '人'
            } else if (param.seriesIndex == 1) {  // 总人数
               res = '总人数：' +  param.value + '人'
            }
            return res
        }
    },
    grid: {
        borderWidth: 0,
        top: 30,
        left:75,
        right:20,
        bottom: 30,
        textStyle: {
            color: "#fff"
        }
    },
    yAxis: [{
        axisLabel: {
            inside: false,
            textStyle: {
                color: '#a4a5c9',
                fontSize: '10',
            }
        },
        axisTick : {show: false},
        axisLine: {show: false},
        data: ['临床知识库','题库','考试','电子书','增值服务', '教学平台'],
    }, {
        type: 'category',
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        splitArea: {
            show: false
        },
        splitLine: {
            show: false
        },
    }],
    xAxis: {
        type: 'value',
        interval: 0,
        axisTick: {
            show: false
        },
        axisLine: {
            show: false,
            lineStyle: {
                color: '#2f3640',
            }
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: '#2f3640 ',
            }
        },
    },
    series: [{
            name: '',
            type: 'bar',
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    color: '#a4a5c9',
                    fontSize: '10',
                    formatter: function(param) {
                        return (param.value / totleNum * 100).toFixed(2) + '%';
                    }
                }
            },
            itemStyle: {
                normal: {
                    show: false,
                    color:function(idx) {
                        //console.log(idx)
                        var color = ['#33db74','#40b3f3','#8855e6','#fe6d71','#ffa14d','#4efdd4']
                        return color[idx.dataIndex % color.length]
                    },
                    barBorderRadius: 50,
                    borderWidth: 0,
                },
                emphasis: {
                    shadowBlur: 15,
                    shadowColor: 'rgba(105,123, 214, 0.7)'
                }
            },
            zlevel: 2,
            barWidth: '24%',
            data: [11, 11, 11, 11, 11, 11],
        },
        {
            name: '',
            type: 'bar',
            yAxisIndex: 1,
            zlevel: 1,
            itemStyle: {
                normal: {
                    color: '#2a234e',
                    borderWidth: 0,
                    shadowBlur: {
                        shadowColor: 'rgba(255,255,255,0.31)',
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 2,
                    },
                }
            },
            barWidth: '24%',
            data: [50, 50, 50, 50, 50 ,50]
        }
    ]
  }
}
export default {
  mixins: [mixinChart],
  props: {
    theme: String,
    initcode:String,
    curDataId: String,
    curDataCode: String
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
          totleNum = option.series[0].data[0] + option.series[1].data[0]
          for(let i = 0;i < option.series[1].data.length;i++){
          	option.series[1].data[i] = totleNum
          }

          if (jsonObj.chartOption.yAxis[0].data.length == 0) {
            option.series[0].data = ''
            option.series[1].data = ''
            option.yAxis[0].data = ''
            option.title.show = true
          }
        } else {
            option = defaultOption
        }
        if(!this.theme){
            option.series[0].barMaxWidth = 20
        }else if (this.theme == 'wave') {
            option.series[0].type = 'pictorialBar'
            option.series[0].symbol = 'path://M0,10 L10,10 C6.5,10 7,0 5,0 C3,0 3.5,10 0,10 z'
        } else if (this.theme == 'cone') {
            option.series[0].type = 'pictorialBar'
            option.series[0].symbol = 'path://"M 100 0 L 50 100 L 150 100 z'
        }
        this.option = option
    }
  }
}
</script>

