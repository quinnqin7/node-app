<template>
    <header class="head-nav">
        <el-row>
            <el-col :span="6" class='logo-container'>
                <img src="../assets/img/logo.png" class='logo' alt="">
                <span class='title'>  Uhealth移動醫療診所系統</span>
            </el-col>
            <el-col :span='6' class="user">
                <div class="userinfo">
                  <span class="font-time">今天&nbsp;{{ time.month }}&nbsp;月{{ time.day }}&nbsp;日&nbsp;&nbsp;{{ todos[time.Day] }}&nbsp;&nbsp;{{ time.hours }}:{{ time.minutes }}</span>
                    <img :src="user.avatar" class='avatar' alt="">
                     <div class='welcome'>
                        <p class='name comename'>歡迎使用</p>
                        <p class='name avatarname'>{{user.name}}</p>
                    </div>
                    <span class='username'>
                        <!-- 下拉箭頭 -->
                        <el-dropdown
                                trigger="click"
                                @command='setDialogInfo'>
                            <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command='info'>個人信息</el-dropdown-item>
                                <el-dropdown-item  command='logout'>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                     </span>
                </div>
            </el-col>

        </el-row>

    </header>
</template>
<script>
var date = new Date();
export default {
  name: "head-nav",
  
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  data() {
	    	return {
	    		time:{
	    			month:date.getMonth()+1,
	    			day:date.getDate(),
	    			Day:date.getDay(),
	    			hours:date.getHours(),
	    			minutes:date.getMinutes()
	    		},
	    		todos:["周日","周一","周二","周三","周四","周五","周六"]
	    	}
   		},
  methods: {
    setDialogInfo(cmditem) {
      switch (cmditem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfoList() {
      // 个人信息
      this.$router.push("/infoshow");
    },
    logout() {
      // 清除token
      localStorage.removeItem("eleToken");
      //設置vuex store
      this.$store.dispatch("clearCurrentState");

      // 页面跳转
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 34px;
  width: 42px;
  margin-right: 5px;
  margin-left: 20px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}

.font-time{
  vertical-align: middle;
  /*margin-left: 5px;*/
  margin-right: 20px;
}
  
.user {
  margin-right: 30px;
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>

