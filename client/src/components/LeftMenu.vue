<template>
    <div class="menu_page"> 
             <el-menu
                mode="vertical"
                background-color="#324057"
                text-color="#fff"
                active-text-color="#409eff" 
                class="el-menu-vertical-demo">
                <!--首頁-->
                <router-link to="/home">
                    <el-menu-item index="1">
                        <i class="fa fa-margin fa-server"></i>
                        <span slot="title">首頁</span>
                    </el-menu-item>
                </router-link>
                <!--預約-->
                <router-link to="/home">
                    <el-menu-item index="2">
                        <i class="fa fa-margin fa-clock-o"></i>
                        <span slot="title">預約</span>
                    </el-menu-item>
                </router-link>
                <!--排班-->
                <router-link to="/home">
                    <el-menu-item index="3">
                        <i class="fa fa-margin fa-calendar"></i>
                        <span slot="title">排班</span>
                    </el-menu-item>
                </router-link>
                <!--健檢報告管理-->
                <router-link to="/home">
                    <el-menu-item index="4">
                        <i class="fa fa-margin fa-calendar-plus-o"></i>
                        <span slot="title">健檢報告管理</span>
                    </el-menu-item>
                </router-link>
                <!--統計-->
                <router-link to="/home">
                    <el-menu-item index="5">
                        <i class="fa fa-margin fa-asterisk"></i>
                        <span slot="title">統計</span>
                    </el-menu-item>
                </router-link>

                <template  v-for="item in items" >
                    <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="'fa fa-margin '+item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <router-link v-for="(citem,cindex) in item.children" 
                            :to="citem.path" :key="cindex">
                            <el-menu-item 
                                :index='citem.path'>
                                <span slot="title">{{citem.name}}</span>
                            </el-menu-item> 
                        </router-link>
                    </el-submenu>   
                </template>
             </el-menu>
        
   </div>
</template>
<script>
//import Patientlist from './views/inquiry/PatientList'
//import Levelbar from './Levelbar';

export default {
  name: "leftmenu",
  data() {
    return {
      items: [
        {
          icon: "fa fa-plus-square",
          name: "問診",
          path: "inquiry",
          children: [
              { path: "medicalrecord", name: "門診病歷" },
              { path: "treatment", name: "門診處方" },
              { path: "patientlist", name: "患者列表" }      
          ]
        },
        {
          icon: "fa fa-user-circle",
          name: "個人",
          path: "info",
          children: [{ path: "infoshow", name: "個人信息" }]
        }
      ]
    };
  },
  components:{
      //Levelbar,
  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color:rgb(50, 65, 87);
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-left: 15px;
  margin-right: 15px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 40px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown, .hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
