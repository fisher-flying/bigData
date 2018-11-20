import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let axiosmock = window.axiosmock = new MockAdapter(axios)


let data=[]
for(let i=0;i<3;i++){
  data.push({
    id:1,
    name:'首页',
    cell:{
      cellWidth: 300,
      cellHeight: 250
    },
    widgets:[{
	    id:11,
	    name: '1',
	    location: '1,1',
	    layout: '1*1',
	    chartType: 'bar',
	    theme: 'bar'
	  },{
	    id:12,
	    name: '2',
	   	location: '2,1',
	    layout: '1*1',
	    chartType: 'bar',
	    theme: 'barWave'
	  },{
	    id:221,
     	name: '3',
	   	location: '3,1',
	    layout: '1*1',
	    chartType: 'bar',
	    theme: 'barCone'
	  },{
	    id:222,
     	name: '4',
	   	location: '4,1',
	    layout: '1*1',
	    chartType: 'bar',
	    theme: 'barCust'
	  },{
	    id:223,
     	name: '5',
	   	location: '1,2',
	    layout: '1*1',
	    chartType: 'bar',
	    theme: 'barMul'
	  },{
	    id:224,
     	name: '6',
	   	location: '2,2',
	    layout: '1*1',
	    chartType: 'bar',
	    theme: 'barMulCone'
	  },{
	    id:13,
     	name: '7',
	   	location: '3,2',
	    layout: '1*1',
	    chartType: 'bar',
	    theme: 'barTra'
	  },{
	    id:14,
     	name: 'a',
	   	location: '4,2',
	    layout: '1*1',
	    chartType: 'line',
	    theme: 'line'
	  },{
	    id:15,
     	name: 'b',
	   	location: '1,3',
	    layout: '1*1',
	    chartType: 'line',
	    theme: 'lineFlat'
	  },{
	    id:16,
     	name: 'c',
	   	location: '2,3',
	    layout: '1*1',
	    chartType: 'line',
	    theme: 'lineMul'
	  },{
	    id:17,
     	name: 'd',
	   	location: '3,3',
	    layout: '1*1',
	    chartType: 'line',
	    theme: 'lineMulSmooth'
	  },{
	    id:18,
     	name: '11',
	   	location: '4,3',
	    layout: '1*1',
	    chartType: 'pie',
	    theme: 'pie'
	  },{
	    id:18,
     	name: '22',
	   	location: '1,4',
	    layout: '1*1',
	    chartType: 'pie',
	    theme: 'pieRose'
	  },{
	    id:18,
     	name: '33',
	   	location: '2,4',
	    layout: '1*1',
	    chartType: 'pie',
	    theme: 'pieMul'
	  },{
	    id:18,
     	name: '44',
	   	location: '3,4',
	    layout: '1*1',
	    chartType: 'pie',
	    theme: 'pieNest'
	  }]
  })
}


axiosmock.onGet('/api/overview').reply(200, {
  pageConfig:data
})
axiosmock.onAny().passThrough()
