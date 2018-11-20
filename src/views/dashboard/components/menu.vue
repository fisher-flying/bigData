<template>
  <ul class='menu'>
    <li class="menu-item level1">
      <router-link to="overview">
        <i class="menu-icon fa fa-home"></i>
        <span class="btn-excel">首页</span>
      </router-link>
    </li>
    <li v-for='menu in menuLists' :key="menu.id" class="menu-item level1" @click="changeID(menu)" :class="{'active': menu.id == curID}">
      <a href="#">
        <i :class="'fa-'+menu.icon" class="menu-icon fa"></i>
        <span class="menu-title">{{menu.name}}</span>
      </a>
    </li>
    <li class="menu-item level1">
      <router-link to="derived">
        <i class="menu-icon fa fa-file-excel-o"></i>
        <span class="btn-excel">导出报表</span>
      </router-link>
    </li>
    <li class="logout menu-item level1"  @click="test_logout">
      <a href="#">
        <i class="menu-icon fa fa-sign-out"></i>
        <span class="menu-title">退出</span>
        </a>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
import { getToken } from '../../../util/auth';

export default {
  props: ['curID'],
  data() {
    return {
      menuLists: []
    }
  },
  methods: {
    changeID(val){
      this.$emit('menuid',val);
    },
    test_logout(){
      const token = getToken();
        this.$store.dispatch('LogOut',token).then(() => {
          this.$router.push({ path: '/login' });
        }).catch(err => {
          this.$message.error(err);
        });
    }
  },
  created() {
    window.addEventListener('hashchange', e => {
      let routePath = window.location.hash.substr(1)
      this.routePath = routePath.split('?')[0]
    })
  },
  mounted(){
    let menuList = JSON.parse(localStorage.getItem('menuList'))
    for (let i = 0; i < menuList.length; i++) {
      if(menuList[i].level == 1){//删除接口首页
        menuList.shift()
      }
    }
    this.menuLists = menuList
    const token=this.$store.getters.token;
  }
}
</script>
