<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">Uhealth移動醫療診所系統</span>
            </div>
            <el-form :model="loginUser" :rules="rules" class="loginForm" ref="loginForm" label-width="60px">
    
                <el-form-item label="郵箱" prop="email">
                    <el-input v-model="loginUser.email" placeholder="請輸入郵箱"></el-input>
                </el-form-item>
                <el-form-item label="密碼p" prop="password">
                    <el-input v-model="loginUser.password" placeholder="請輸入密碼" type="password"></el-input>
                </el-form-item>  
                <el-form-item>
                    <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登 錄</el-button>
                </el-form-item>
                <div class='tiparea'> 
                    <p>還沒有賬號？現在就 <router-link to='/register'>註 冊</router-link></p>
                </div>
            </el-form>
        </section>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name: "login",
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "郵箱格式不正確！",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密碼不能為空", trigger: "blur" },
          { min: 6, max: 15, message: "長度在 6 至 15 個字符之間", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/users/login", this.loginUser).then(res => {
              //token
              //console.log(res);
              const {token}=res.data;

              //存储到LS
              localStorage.setItem('eleToken',token);
              
              //解析token
              const decoded = jwt_decode(token);
              //console.log(decoded);

               // 存储数据
                this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decoded));
                this.$store.dispatch("setUser", decoded);


              this.$router.push("/mainmenu");
              });
        } 
      });
    },
    isEmpty(value){
        return(
            value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) ||
            (typeof value === "string" && value.trim().length === 0)
        );
    }
  }
};
</script>


<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/img/login_bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 450px;
  height: 200px;
  position: absolute;
  top: 10%;
  left: 30%;
  padding: 30px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 35px;
  background-color: #fff;
  padding: 46px 55px 30px 30px;
  border-radius: 5px;
  box-shadow: 0px 5px 20px #cccc;
}

.submit_btn {
  width: 100%;
}

.tiparea{
    margin-top: 5px;
    text-align: right;
    font-size: 13px;
    color: #333;
}

.tiparea p a {
    color: #409eff;
}
</style>



