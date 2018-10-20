<template>
    <div class="dialog">
       <el-dialog 
            :title="dialog.title"
            :visible.sync="dialog.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body='false'>
            
         <div class="form">
                <el-form 
                    ref="form" 
                    :model="formData"
                    :rules="form_rules"
                    label-width="100px" 
                    style="margin:20px; width:600px"
                    >

                    <el-form-item prop='patientId' label="健檢編號:">
                        <el-input type="patientId" v-model="formData.patientId"></el-input>
                    </el-form-item>

                    <el-form-item prop='patientName'  label="姓名:">
                        <el-input type="patientName" v-model="formData.patientName"></el-input>
                    </el-form-item>

                    <el-form-item prop='patientPhone' label="聯絡方式:">
                        <el-input type="patientPhone" v-model="formData.patientPhone"></el-input>
                    </el-form-item>

                    <el-form-item label="性别" prop="gender">
                        <el-radio-group @change="changeGender()" v-model="formData.gender">
                            <el-radio label=1>男</el-radio>
                            <el-radio label=2>女</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item prop='description' label="診斷描述:">
                        <el-input type="description" v-model="formData.description"></el-input>
                    </el-form-item>

                    <el-form-item prop='patientDetails' label="診斷建議:">
                        <el-input type="patientDetails" v-model="formData.patientDetails"></el-input>
                    </el-form-item>
                    
                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">取 消</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>提 交</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "dialog",
  data() {
    return {
     
      form_rules: {
       patientId: [
          { required: true, message: "健檢編號不能為空！", trigger: "blur" }
        ],
        patientName: [
          { required: true, message: "姓名不能為空！", trigger: "blur" }
        ],
        patientPhone: [
          { required: true, message: "電話不能為空！", trigger: "blur" }
        ],
        description: [
            { required: true, message: "診斷描述不能為空！", trigger: "blur" }
        ],
        patientDetails: [
          { required: true, message: "診斷建議不能為空！", trigger: "blur" }
        ]
      }
    };
  },
  props: {
    dialog: Object,
    formData: Object
  },
  
  methods: {
   onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
            //表单数据验证完成之后，提交数据;
            const url = this.dialog.option == "add" ? "add" : `edit/${this.formData.id}`;
            this.$axios.post(`/api/profiles/${url}`, this.formData).then(res => {
            // 操作成功
            this.$message({
              message: "新增成功！",
              type: "success"
            });
            //隱藏窗口
            this.dialog.show = true;
            //自動刷新
            this.$emit("update"); 
          });
        }
      });
    },
	  changeGender(){
		  console.log(this.formData.gender)
	  }
  }

};
</script>

<style scoped>

    
</style>



