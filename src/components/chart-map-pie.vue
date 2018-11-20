<template>
    <div :style="{width: width+'px', height:height+'px'}"></div>
</template>
<script>
import axios from 'axios'
import mixinChart from './mixins/echarts.js'

const getDefaultOption = _ => {
  // 省份占比
  let color = ['#fe6f6d', '#fe7f6d', '#9b51ed', '#b64bf2', '#44aaf3', '#6480eb'];
  let top1Value = 0, top2Value = 0, top3Value = 0;
  let dataStyle = {
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
  };
  let placeHolderStyle = {
      normal: {
        color: '#2c274a',
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      },
      emphasis: {
        color: '#2c274a'
      }
    };
  // 环行图 tooltip 配置
    let pieToolTip = {
      trigger: 'item',
      show: true,
      formatter: "{b} : {c}人<br/>",
      backgroundColor: 'rgba(0,0,0,0.7)', // 背景
      padding: [8, 10], //内边距
      extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
    }
  return {
    tooltip: {
        trigger: 'item',
      },
      title: [
        {
          subtext: '北京',
          x: '46%',
          y: '21%',
          textAlign: 'center',
          itemGap: 5,
          subtextStyle: {
            color: '#9fa0c4',
            fontSize: '10',
          },
        },
        {
          subtext: '天津',
          x: '46%',
          y: '54%',
          itemGap: 5,
          textAlign: 'center',
          subtextStyle: { color: '#9fa0c4', fontSize: '10' },
        },
        {
          subtext: '上海',
          x: '46%',
          y: '84%',
          itemGap: 5,
          textAlign: 'center',
          subtextStyle: { color: '#9fa0c4', fontSize: '10' },
        },{
          text: '省份占比',
          left: '10%',
          textStyle: {
            color: '#9fa0c4',
            fontSize: 16,
          },
        }
      ],
      graphic:[{
        type:'text',
        left:'center',
        top:'19%',
        style:{
            text:'北京',
            textAlign:'center',
            fill:'#fe706d',
            fontSize: 12
        }
    },{
        type:'text',
        left:'center',
        top:'52%',
        style:{
            text:'天津',
            textAlign:'center',
            fill:'#9652eb',
            fontSize: 12
        }
    },{
        type:'text',
        left:'center',
        top:'82%',
        style:{
            text:'上海',
            textAlign:'center',
            fill:'#46a5f2',
            fontSize: 12
        }
    }],
      series: [
        {
          type: 'pie',
          clockWise: false,
          radius: [30, 24], // 饼图的半径，数组的第一项是内半径，第二项是外半径
          center: ['50%', '25%'], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
          itemStyle: dataStyle,
          hoverAnimation: false,
          startAngle: 90,
          label: {
            borderRadius: '10',
          },
          data: [{
            value: top1Value,
            name: '北京',
            tooltip: pieToolTip,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: color[0]
                }, {
                  offset: 1,
                  color: color[1]
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
        },
        {
          type: 'pie',
          clockWise: false,
          radius: [30, 24],
          center: ['50%', '57%'],
          itemStyle: dataStyle,
          hoverAnimation: false,
          startAngle: 90,
          label: {
            borderRadius: '10',
          },
          data: [{
            value: top2Value,
            name: '天津',
            tooltip: pieToolTip,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: color[2]
                }, {
                  offset: 1,
                  color: color[3]
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
        },
        {
          type: 'pie',
          clockWise: false,
          radius: [30, 24],
          center: ['50%', '87%'],
          itemStyle: dataStyle,
          hoverAnimation: false,
          startAngle: 90,
          label: {
            borderRadius: '10',
          },
          data: [{
            value: top3Value,
            name: '上海',
            tooltip: pieToolTip,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: color[4]
                }, {
                  offset: 1,
                  color: color[5]
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
        },
      ]
  }
}

export default {
  mixins: [mixinChart],
  props: {
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 230,
    },
    theme: String,
    mapPieDataId: String,
    mapDataCode: String,
    mapInitCode: String
  },
  watch: {
    //菜单切换业务
    'mapInitCode'(val) {
      this.drawChart(this.mapPieDataId, val)
    },
    //同业务切换维度，如运营切换维度
    'mapDataCode'(val) {
      this.drawChart(this.mapPieDataId, val)
    }
  },
  async beforeMount() {
    this.drawChart(this.mapPieDataId, this.mapInitCode)
  },
  methods: {
    async drawChart(mapPieDataId,mapDataCode) {
      let resData, option, jsonObj
      const defaultOption = getDefaultOption()
      if (mapPieDataId) {
        resData = await axios.get(`${siteFrontURL}report/getData/${mapPieDataId}/${mapDataCode}`)
        jsonObj = JSON.parse(resData.data.data)
        option = _.merge(defaultOption, jsonObj.chartOption)
        option.graphic.forEach((i,index) => {
          i.style.text = Number(option.series[index].data[0].value / option.series[index].data[1].value*100).toFixed(2) + '%'
        })
        option.title.forEach((i,index) => {
          i.subtext = option.legend.data[index]
        })
        option.legend = []
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
          },
        }
      })
      this.option = option
    }
  }
}
</script>


