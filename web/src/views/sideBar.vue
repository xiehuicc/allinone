<template>
 <div class="main">
   <div class="left" style="{width:(!isCollapse?'200px':'auto')}"> 
      <h3>公寓管理系统</h3>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#0DADA4"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        router>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>人员管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/tenant">租户管理</el-menu-item>
            <el-menu-item index="/visitor">访客管理</el-menu-item>
            <el-menu-item index="/employee">员工管理</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
         <template slot="title">
          <i class="el-icon-menu"></i>
          <span >客房管理</span>
         </template>
          <el-menu-item-group>
            <el-menu-item index="/roomMessage">客房信息管理</el-menu-item>
            <el-menu-item index="/roomConfigs">客房配置管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
           <i class="el-icon-document"></i>
          <span>权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu> 
      <div class="collapse">
        <i :class="!isCollapse?'el-icon-s-fold':'el-icon-s-unfold'" @click="handleFold"></i>
        <!-- <div class="collapse" @click="handleFold">收起菜单</div> -->
      </div>
  </div>
  <div class="right">
    <div class="top">

    </div>
    <router-view></router-view>
  </div>
</div>


</template>

<script>
  export default {
    name:'sideBar',
    data() {
      return {
        isCollapse:false   //是否折叠左侧菜单
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleFold(){
        this.isCollapse = !this.isCollapse
      },
      handleTenant() {
        // this.$router.push('./tenantInfo.vue')
      }
    }
  }
</script>

<style scoped lang="scss">
h3{
  color: #fff;
  text-align: center;
}
.main{
  width: 100vw;
  height: 100vh;
  display: flex;
  .left{
     background-color:#0DADA4;
  }
  .right{
    flex: 1;
  }
  .collapse{
    // font-size: 18px;
    color: #fff;
    position:absolute;
    bottom: 10px;
    // border-top: 1px solid #fff;
    padding-top:20px;
    text-align: center;
  }
  i{
    color: #fff;
    font-size: 20px;
  }
  .top{
    height: 50px;
    background-color: pink;
  }
}
</style>