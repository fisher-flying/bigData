<template>
  <div>
    <div :class='{open:isMenuOpened}' class='sidebar'>
      <div v-show="!isMenuOpened" class="open-menu-button" @click="isMenuOpened = true" ><i class="fa fa-navicon"></i> 菜单</div>
      <div v-show="isMenuOpened" class='menus-container' id='menus-container'>
        <p class="menu-button">菜单</p>
        <i class="close-menu-button fa fa-times" @click="isMenuOpened = false"></i>
        <Menu @menuid="menuidFn" />
      </div>
    </div>
    <div style="text-align:center; padding: 40px 0;">
      <svg-title :width="1000" :height="50" text="数字产品运营大数据平台"></svg-title>
    </div>
    <div class="echarts-container">
      <div v-for="widget in widgets" :key="widget.id" :class="{
         'no-right-left-shadow': widget.positionShadow.y == 4 && widget.positionShadow.x == 4 || (widget.positionShadow.y == 4 && widget.positionShadow.x == 3 && widget.size.w > 300 ) || (widget.positionShadow.y == 4 && widget.positionShadow.x == 2 && widget.size.w > 600 ) || (widget.positionShadow.y == 4 && widget.positionShadow.x == 1 && widget.size.w > 900 ),
         'no-bottom-shadow no-bottom-border': widget.positionShadow.y == 4,
         'no-right-shadow no-right-border': widget.positionShadow.x == 4 || (widget.positionShadow.x == 3 && widget.size.w > 300 ) || (widget.positionShadow.x == 2 && widget.size.w > 600 )|| (widget.positionShadow.x == 1 && widget.size.w > 900 ),
      }" :style="{
      position: 'absolute',
      left: widget.position.x+'px',
      top: widget.position.y+'px',
      width: widget.size.w+'px',
      height: widget.size.h+'px'
    }">
        <svg-subtitle :width="widget.size.w" :height="20" v-if="widget.name!='总用户数'" :text="widget.name"></svg-subtitle>
        <div class="to-right" v-if="widget && widget.appMap">
          <el-select v-model="widget.selectedAppCodes" placeholder="">
            <el-option
              v-for="(name, code) in widget.appMap"
              :key="code"
              :label="name"
              :value="code">
            </el-option>
          </el-select>
        </div>
        <component :is="chartMap[widget.theme].type"
          :width="widget.size.w - 40"
          :height="widget.size.h - 40"
          :theme="chartMap[widget.theme].theme"
          :curDataId="widget.id"
          :curDataCode="widget.selectedAppCodes"
          :initcode="widget.dataAppcodes"/>
      </div>
    </div>

  <!-- <chart-map-group></chart-map-group> -->
    <!-- <chart-bar></chart-bar>
  <chart-bar theme="wave"></chart-bar>
  <chart-bar theme="cone"></chart-bar>
  <chart-multi-bar></chart-multi-bar>
  <chart-transverse-bar></chart-transverse-bar>
  <chart-line></chart-line>
  <chart-line theme="flat"></chart-line>
  <chart-multi-line></chart-multi-line>
  <chart-multi-line theme="smooth"></chart-multi-line>
  <chart-pie></chart-pie>
  <chart-pie theme="rose"></chart-pie>
  <chart-multi-pie></chart-multi-pie>
  <chart-multi-pie theme="nest"></chart-multi-pie>
 -->


  </div>
</template>
<script>
import axios from 'axios'
//import './mock/echarts.js'
import svgTitle from '../../components/svg-title.vue'
import Menu from './components/menu.vue'

export default {
  data() {
    return {
      isMenuOpened: false,
      routerName: this.$route.name || '/',
      widgets: [],
      cellWidth: '',
      cellHeight: '',
    }
  },
  components: {
    svgTitle,
    Menu
  },
  mounted() {
    axios.get(`${siteFrontURL}page/getReports/94637fa7dcb54a1ea50523a1712e2d7a`).then(res=>{
      /*let res = axios.get('/api/overview').then(res => {*/
     // this.cellWidth = res.data.pageConfig[0].cell.cellWidth
      //this.cellHeight = res.data.pageConfig[0].cell.cellHeight
        this.cellWidth = 300
        this.cellHeight = 250
        this.widgets = res.data.data
        this.widgets.forEach(item => {
          let positionX = item.location.split(',')[0];
          let positionY = item.location.split(',')[1];

          item.positionShadow = { // 限制边框线展示
            x: positionX,
            y: positionY
          }
          item.position = {
            x: (positionX - 1) * this.cellWidth,
            y: (positionY - 1) * this.cellHeight
          }
          item.size = {
            w: item.layout.split('*')[0] * this.cellWidth,
            h: item.layout.split('*')[1] * this.cellHeight
          }
          item.name = item.name
        })
      })
  },
  methods: {
    menuidFn(val){
      this.$router.push({
          path:'/operation',
          query: {
            curPage: val,
         }
        })
    },
  }
}
</script>

