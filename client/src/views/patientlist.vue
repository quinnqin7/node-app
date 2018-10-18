<template>
  <div class="fillcontain">
      <div>
         <el-form :inline="true" ref="add_data" :model="search_data">
           <!-- 日期筛选 -->
         <el-form-item label="按時間篩選：">
          <el-date-picker
              v-model="search_data.startTime"
              type="datetime"
              placeholder="選擇開始時間">
          </el-date-picker> --
          <el-date-picker
              v-model="search_data.endTime"
              type="datetime"
              placeholder="選擇結束時間">
          </el-date-picker>
         </el-form-item>
          <el-form-item>
             <el-button type="primary" size ="small" icon="search" @click='handleSearch()'>篩選</el-button>
          </el-form-item>
            <el-form-item class="btnRight">
                <el-button type="primary" size ="small" icon="view" @click='handleAdd()'>新增患者</el-button>
            </el-form-item>
         </el-form>
      </div>
  <div class="table_container">   
        <el-table 
            v-if="tableData.length > 0"
            :data="tableData"
            max-height="450"
            border
            style="width: 100%">

        <el-table-column type="index" label="序号" align='center' width="70"></el-table-column>

          <el-table-column label="創建日期" prop="date" align="center" width="250">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
          </el-table-column>

          <el-table-column label="健檢編號" prop="patientId" align="center" width="100"></el-table-column>

          <el-table-column label="姓名" prop="patientName" align="center" width="100">
              <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.patientName }}</el-tag>
                  </div>
              </template>
          </el-table-column>

          <el-table-column label="聯絡方式" prop="patientPhone" align="center" width="180"></el-table-column>

          <el-table-column label="診斷描述" prop="description" align="center" width="150">
              <template slot-scope="scope">  
                <span style="color:#00d053">{{ scope.row.description }}</span>
              </template>
          </el-table-column>

          <el-table-column label="診斷建議" prop="patientDetails" align="center" width="150">
            <template slot-scope="scope">  
                <span style="color:#f56767"> {{ scope.row.patientDetails }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="operation" align='center' label="操作"  width="150">
            <template slot-scope='scope'>
              <el-button type="warning" icon='edit' size="mini" @click='handleEdit(scope.row)'>編輯</el-button>
              <el-button type="danger" icon='delete' size="mini" @click='handleDelete(scope.row,scope.$index)'>刪除</el-button>
            </template>
          </el-table-column>
      </el-table>

      <!--FIXME: 分页功能 这段代码加进来页面就进不去，每次刷新报的错也不一样
      <el-row>
        <el-col :span="24">
          <div class="pagination">
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="paginations.page_index"
                :page-sizes="paginations.page_sizes"
                :page-size="paginations.page_size"
                :layout="paginations.layout"
                :total="paginations.total">
             </el-pagination>
          </div>
        </el-col>
      </el-row> -->
  </div> 
        <!-- 弹框页面 --> 
        <Dialog :dialog='dialog'  :formData="formData" @update="getProfile"></Dialog>
</div>
</template>

<script>
import Dialog from "../views/inquiry/Dialog";

export default {
  name: "patientlist",
  data() {
    return {
      tableData: [],
      allTableData:[],
      filterTableData:[],

      search_data: {
        startTime: "",
        endTime: ""
      },

      formData:{
        patientId: "",
        patientName: "",
        patientPhone: "",
        description: "",
        patientDetails: "",
        id:""
      },

      dialog: {
        show: false,
        title: "",
        option: "edit"
      },

      //TODO:需要给分页组件传的消息
       paginations:{
        page_index:1, //当前位于哪页
        total:0, //总数
        page_size:5, //一页显示多少条
        page_sizes:[5,10,15,20], //每页显示多少条
        layout:"total，sizes,prev,pager,next,jumper" //翻页属性
      },
    }
  },
 
  created() {
      this.getProfile();
    },

  components: {
      Dialog
    },

  methods: {
    getProfile() {
      // 获取表格数据
        this.$axios("/api/profiles").then(res => {
        this.allTableData = res.data;
        this.filterTableData = res.data;
      //设置分页数据
        this.setPaginations();
      })
    },

    //编辑患者信息
    handleEdit(row){ 
      this.dialog={
        show:true,
        title:'修改患者資料',
        option:'edit'
      },
      this.formData={
        patientId:row.patientId,
        patientName:row.patientName,
        patientPhone:row.patientPhone,
        description:row.description,
        patientDetails:row.patientDetails,
        id:row._id
      }
    },

    //刪除患者信息
    handleDelete(row,index){
       this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
          this.$message("刪除成功");
          this.getProfile();
       })
    },

    //新增患者信息
    handleAdd(){
      this.dialog={
        show:true,
        title:'新增患者資料',
        option:'add'
      };
      this.formData={
        patientId:"",
        patientName:"",
        patientPhone:"",
        description:"",
        patientDetails:"",
        id: ""
      };
      this.dialog.show = true;
    },

    handleSizeChange(page_size){
      //切换size
      this.paginations.page_index =1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
          return index < page_size;
        })
    },

    handleCurrentChange(page){
      // 获取当前页
      let index = this.paginations.page_size * (page - 1);
      // 数据的总数
      let nums = this.paginations.page_size * page;
      // 容器
      //let tables = [];
      for(let i = index; i < nums; i++){
        if(this.allTableData[i]){
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },

     setPaginations() {
      // 总页数
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },

    //TODO:篩選
    handleSearch(){
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "請選擇時間區間"
        });
        this.getProfile();
        return;
      }
      const stime = this.search_data.startTime.getTime();
      const etime = this.search_data.endTime.getTime();
      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= stime && time <= etime;
      });
      // 分页数据
      this.setPaginations();
    }
}
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>