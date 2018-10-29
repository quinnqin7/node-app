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
                <el-button type="primary" size ="small" icon="view"  @click='handleAdd()'>新增患者</el-button>
            </el-form-item>
         </el-form>
      </div>
    <div class="table_container">   
          <el-table 
              :data="tableData"
              max-height="650"
              border
              :default-sort = "{prop: 'date', order: 'descending'}"
              style="width: 100%">

          <el-table-column type="index" label="序号" align='center' width="60"></el-table-column>

          <el-table-column label="創建日期" prop="date" align="center" width="230">
              <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
          </el-table-column>

          <el-table-column label="健檢編號" prop="patientId" align="center" width="150"></el-table-column>

          <el-table-column label="姓名" prop="patientName" align="center" width="100">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.patientName }}</el-tag>
                    </div>
                </template>
          </el-table-column>

          <el-table-column label="性别" prop="gender" align="center" width="60">
                <template slot-scope="scope">
                    <span style="color:#00d053" v-if="scope.row.gender == 1 ? this.rowGender='男':this.rowGender='女'">{{ this.rowGender }}</span>
                </template>
          </el-table-column>

          <el-table-column label="聯絡方式" prop="patientPhone" align="center" width="120"></el-table-column>

          <el-table-column label="診斷描述" prop="description" align="center" width="120">
              <template slot-scope="scope">  
                  <span style="color:#00d053">{{ scope.row.description }}</span>
              </template>
          </el-table-column>

            <el-table-column label="診斷建議" prop="patientDetails" align="center" width="120">
              <template slot-scope="scope">  
                  <span style="color:#f56767"> {{ scope.row.patientDetails }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="operation" align='center' label="操作"  width="250">
              <template slot-scope='scope'>
                
                <el-button type="primary"  :formData="formData" size="small" @click="handleDetail(scope.row)" plain>詳情</el-button>
                <el-button type="warning" icon="el-icon-edit" size="small" @click='handleEdit(scope.row)' plain>編輯</el-button>
                <el-button type="danger" icon="el-icon-delete" size="small" @click='handleDelete(scope.row,scope.$index)' plain>刪除</el-button>  
              </template>
            </el-table-column>
        </el-table>

            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                            v-if='paginations.total > 0'
                            :page-sizes="paginations.page_sizes"
                            :page-size="paginations.page_size"
                            :layout="paginations.layout"
                            :total="paginations.total"
                            :current-page.sync='paginations.page_index'
                            @current-change='handleCurrentChange'
                            @size-change='handleSizeChange'>
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>

    </div> 
        <!-- 弹框页面 --> 
        <Dialog :dialog='dialog' :formData="formData" @update="getProfile"></Dialog>
</div>
</template>

<script>
import Dialog from "../views/inquiry/Dialog";
import Medicalrecord from "../views/medicalrecord";


export default {
  name: "patientlist", 
  rowGender:"",
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
        id:"",
        gender: ""
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
        page_size: 5, //一页显示多少条
        page_sizes:[5,10,15,20], //每页显示多少条
        layout:"total，sizes,prev,pager,next,jumper" //翻页属性
      },
      
      
    }
  },
 
  created() {
      this.getProfile();
    },

  components: {
      Dialog,
      Medicalrecord
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

    //详情页
    handleDetail(row) {
      this.$router.push({
        path: 'patientDetails',
        params:{id:this.formData.id}
      });
       this.formData={
        patientId:row.patientId,
        patientName:row.patientName,
        patientGender:row.patientGender,
        patientPhone:row.patientPhone,
        description:row.description,
        patientDetails:row.patientDetails,
        id:row._id,
        gender: row.gender+""
      }
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
        patientGender:row.patientGender,
        patientPhone:row.patientPhone,
        description:row.description,
        patientDetails:row.patientDetails,
        id:row._id,
        gender: row.gender+""
      }
      //console.log(' 默认的性别:')
      console.log(this.formData.gender)
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
        patientGender:"",
        patientPhone:"",
        description:"",
        patientDetails:"",
        id: ""
      };
      this.dialog.show = true;
    },

   handleCurrentChange(page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
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

    //篩選
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
  padding: 20px;
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