<template>
<div class="main-content">
<div id='medicalrecord'>
    <el-form :model="formData" ref="form" label-width="100px"  :rules="rules" style="margin: 0; padding: 0;">
    <el-card>
      <h4>新增患者檔案</h4>
      <el-form-item label="患者姓名:" prop="patientName" required style="width: 33%; display: inline-block">
        <el-input v-model="formData.patientName" placeholder="請輸入姓名"></el-input>
      </el-form-item>

      <el-form-item label="患者性別:" prop="gender">
        <el-radio-group @change="changeGender()" v-model="formData.gender">
            <el-radio label=1>男</el-radio>
            <el-radio label=2>女</el-radio>
            </el-radio-group>
      </el-form-item>
      <!--
       <el-form-item label="患者性別:" prop="gender" required style="width: 33%; display: inline-block;">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item> -->

      <el-form-item label="出生年月:" required style="width: 33%; display: inline-block;">
          <el-form-item prop="birthday">
            <el-date-picker type="date" placeholder="選擇日期" v-model="formData.birthday" style="width: 100%;"></el-date-picker>
          </el-form-item>
      </el-form-item>

      <el-form-item label="健檢編號:" prop="patientId" required style="width: 33%; display: inline-block;">
        <el-input v-model="formData.patientId" placeholder="請輸入健檢編號"></el-input>
      </el-form-item>

      <el-form-item label="聯繫方式:" prop="patientPhone" required style="width: 33%; display: inline-block;">
        <el-input v-model="formData.patientPhone" placeholder="請輸入聯繫方式"></el-input>
      </el-form-item>

      <el-form-item label="所属公司:" prop="patientCompany" style="width: 33%; display: inline-block">
        <el-input v-model="formData.patientCompany" placeholder="請輸入所屬公司名字" style=" display: inline-block;"></el-input>
      </el-form-item>

      <el-form-item label="住址:" style="width: 100%; display: block;">
        <el-select v-model="formData.patientadr" placeholder="請選擇" style="width: 25%; display: inline-block;">
        <el-option label="臺北市" value="taibei"></el-option>
        <el-option label="臺中市" value="taizhong"></el-option>
        <el-option label="高雄市" value="gaoxiong"></el-option>
        <el-option label="基隆市" value="jilong"></el-option>
        <el-option label="臺南市" value="tainan"></el-option>
        <el-option label="新北市" value="xinbei"></el-option>
      </el-select>
      <el-input v-model="formData.adrjt" placeholder="請輸入詳細地址" style="width: 72%;  margin-left: 20px;display: inline-block;"></el-input>
      </el-form-item>
      
      <el-form-item prop="patAH" label="過往史:" style="width: 100%; display:inline-block;">
        <el-input v-model="formData.patAH" placeholder="請輸入過往史"></el-input>
      </el-form-item>

      <el-form-item prop="patNAH" label="現病史:" style="width: 100%; display:inline-block;">
        <el-input v-model="formData.patNAH" placeholder="請輸入現病史"></el-input>
      </el-form-item>

      <el-form-item label="診斷內容:" prop="description" style="width: 100%; display: inline-block">
        <el-input v-model="formData.description" style=" display: inline-block;"></el-input>
      </el-form-item>

      <el-form-item label="診斷建議:" prop="patientDetails" style="width: 100%; display: inline-block">
        <el-input v-model="formData.patientDetails" style=" display: inline-block;"></el-input>
      </el-form-item>

      <h4>聯繫人信息</h4>
      <el-form-item label="姓名：" style="width: 33%; display: inline-block;">
        <el-input v-model="formData.linkername" placeholder="請輸入聯繫人姓名"></el-input>
      </el-form-item>
      <el-form-item label="聯繫方式:" style="width: 33%; display: inline-block;">
        <el-input  v-model="formData.linkertel" placeholder="請輸入聯繫人聯繫方式"></el-input>
      </el-form-item>
      <el-form-item label="關係:" style="width: 33%; display: inline-block;">
        <el-input  v-model="formData.linkrla" placeholder="請輸入與聯繫人關係"></el-input>
      </el-form-item>

      <el-form-item  class="btn">
        <el-button @click="resetForm('form')" > 重 置 </el-button>
        <el-button type="primary" @click="onSubmit('form')" class="patinfo-submitbtn"> 提 交 </el-button>
      </el-form-item>
    </el-card>
    </el-form>
</div>
</div>
  
</template>

<script>
  export default {
    
    data() {
      return {
        formData: {
          patientId:'',
          patientName: '',
          gender: "",
          patientPhone:'',
          patientDetails:'',
          description:'',
          
          patientCompany:'',
          patientadr:'',
          adrjt: '',
          birthday:'',
          patAH: '',
          patNAH:'',
          linkername: '',
          linkertel: '',
          linkrla: '',
          
        },
        rules: {
          patientId: [
          { required: true, message: "請輸入健檢編號", trigger: "blur" }
          ],
          patientName: [
            { required: true, message: '請輸入患者姓名', trigger: 'blur' },
          ],
          gender: [
            { message: '请選擇患者性别', trigger: 'change' }
          ],
          
          patientPhone: [
            { required: true, message: "請輸入患者聯繫電話", trigger: "blur" }
          ],
         
          description: [
            { required: true, message: "診斷內容不能為空", trigger: "blur" }
          ],
          patientDetails: [
            { required: true, message: "診斷建議不能為空", trigger: "blur" }
          ], 

          birthday: [
            { type: 'date', message: '請選擇日期', trigger: 'change' }
          ], 
          patientCompany:[
            { message: '請輸入公司名字', trigger: 'change' }
          ],
          patientadr: [
            { message: '請選擇', trigger: 'change' }
          ], 
          adrjt: [
            { message: '請輸入詳細地址信息', trigger: 'change' }
          ],
          linkername: [
            { message: '请输入联系人姓名', trigger: 'blur' }
          ],
          linkertel: [
            { message: '请输入联系人手机号码', trigger: 'blur' }
          ],
          linkrla: [
            { message: '请输入联系人与患者的关系', trigger: 'blur' }
          ],
          patAH: [
	     	    { trigger: 'blur', trigger: 'change' }
       	  ],
       	  
        },

      };
    },

    //TODO:提交病历
    methods: {
      onSubmit(form) {
        this.$refs[form].validate(valid => {
            if (valid) {
                //表单数据验证完成之后，提交数据;
                console.log(this.formData)
                //this.$axios.post(`/api/profiles/add`, this.formData).then(res => {
                // 操作成功
                //this.$message({
                  //message: "新增成功！",
                  //type: "success"
                //});
                this.$router.push("/patientlist");
              //}); 
            }
          });
      },
      changeGender(){
        console.log(this.formData.gender)
      },
      resetForm(form) {
        this.$refs[form].resetFields();
      }, 
    }
}
  
</script>

<style>
.main-content{
  margin:0 15px;
  width: 80%;
  margin-top: 20px;
  margin-left: 100px;
  /*border:1px solid #333;*/
}
#patientInfo .patinfo-uploadbtn{
	border: none;
	color: #0086CD;
	margin-left: -15px;
}
#patientInfo .patinfo-submitbtn{
	float: right;
	margin-top: 40px;
}
.btn{
  float: right;
}

</style>