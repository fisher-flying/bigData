<template>
  <div style="height: 100%" :class="className">
    <div class='sidebar'>
      <a class='logo'><img src='assets/images/logo-zh-cn.png' width='190' /></a>
      <Menu :data='this.menusData' />
      <ul class='menu' @click="logout()">
        <li class="menu-item level1">
          <a>
            <i class="menu-icon fa fa-power-off"></i>
            <span class="menu-title">退出登录</span>
          </a>
        </li>
      </ul>
    </div>
    <div class='router-view-container'>
      <router-view :key="routerName"></router-view>
    </div>
  </div>
</template>

<script>
import Menu from './components/menu.vue'
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      className:{},
      currentMenus: null,
      menusData: window.routes,
      routerName: this.$route.name || '/'
    }
  },
  components: {
    Menu
  },
  beforeMount(){
    let that = this
    this.$root.eventHub.$on('addclass',e=>{
      that.className[e]=true
    })
    this.$root.eventHub.$on('removeclass',e=>{
      that.className[e]=false
    })
  },
  methods: {
    loadChildApp(index) {
      window.location.hash = '#/' + this.menusData[index].id
    },
    logout(){
      Cookies.remove('Token')
      // window.location.href = 'http://192.168.33.147:9099/admin/logout'
      // window.location.href = 'http://192.168.33.149:9099/admin/logout'
      window.location.href = 'http://rds.ipmph.com/admin/logout'
    }
  }
}
</script>
<style scoped>
.hide-sidebar .sidebar{
  left: -200px;
}
.hide-sidebar .router-view-container{
  margin-left: 0;
}
</style>
