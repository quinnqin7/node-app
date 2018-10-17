<template>
  <div class="fillcontain">
      <div>
         <el-form :inline="true" ref="add_data" >
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
              <el-button type="danger" icon='delete' size="mini" @click='handleDel(scope.row,scope.$index)'>刪除</el-button>
            </template>
          </el-table-column>
      </el-table>
  </div>
        <!-- 弹框页面 --> 
        <Dialog :dialog='dialog' @update="getProfile"></Dialog>
</div>
</template>

<script>
import Dialog from "../views/inquiry/Dialog";

export default {
  name: "patientlist",
  data() {
    return {
      tableData: [],
      dialog: {
        show: false,
        //title: "",
        //option: "edit"
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
        //console.log(res);
        this.tableData = res.data;
        //this.allTableData = res.data;
        //this.filterTableData = res.data;
        // 设置分页数据
        //this.setPaginations();
      })
    },
    handleEdit(index,row){
      console.log(123);
    },
    handleDele(index,row){
      console.log(456);
    },
    handleAdd(){
      this.dialog.show = true;
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