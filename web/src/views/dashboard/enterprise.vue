<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">enterprisename:{{ name }}</div>-->
    <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
      <el-card class="box-card odd">
          <div slot="header" class="clearfix">
              <span>今日公告</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
          </div>
      </el-card>

      <el-card class="box-card even" >
          <div slot="header" class="clearfix">
              <span>今日公告</span>
              <el-button style="float: right; padding: 3px 0;margin-left: 10%;" type="text">操作按钮</el-button>
          </div>
          <!--<div v-for="o in 4" :key="o" class="text item">-->
          <!--{{'列表内容 ' + o }}-->
          <!--</div>-->
          <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6}"
              placeholder="请输入内容"
              v-model="textarea3">
          </el-input>
      </el-card>

      <el-card class="box-card odd" >
          <div slot="header" class="clearfix">
              <span>今日公告</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
          </div>
      </el-card>

      <el-card class="box-card even" >
          <div slot="header" class="clearfix">
              <span>今日公告</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
          </div>
      </el-card>

      <el-card class="box-card odd">
          <div slot="header" class="clearfix">
              <span>今日公告</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
          </div>
      </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data(){
        return{
            textarea3:''
        }
    },
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
.box-card {
    width: 40%;
    height:40%;


    margin-top: 20px;
}
.odd{
    margin-left: 5%;
    float:left;
}
.even{
    margin-right: 5%;
    float:right;
}
</style>
