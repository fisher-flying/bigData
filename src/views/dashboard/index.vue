<template>
  <div style="height: 100%">
    <router-view :key="routerName"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerName: this.$route.name || '/',
    }
  },
  methods: {
    loadChildApp(index) {
      window.location.hash = '#/' + this.menusData[index].id
    }
  }
}
</script>
<style>
.sidebar {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1;
  color: #a3b6cc;
  font-size: 16px;
  width: 200px;
  border-radius: 4px;
}
.close-menu-button{
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
  cursor: pointer;
}
.menu-button {
  position: absolute;
  left: 20px;
  top: 10px;
  font-size: 20px;
}
.menus-container {
  margin: 50px 0 20px;
}
.sidebar.open {
  background-color: rgba(35, 30, 60, 0.9);
  z-index: 1000;
}
.open-menu-button{
  width: 70px;
  font-size: 20px;
  color:#5DBCEC;
  cursor: pointer;
}
</style>
