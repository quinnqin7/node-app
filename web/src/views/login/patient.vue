<template>
    <div id="login">
        <div class="left">
            <span class="title">{{$t('comm.title')}}</span>
            <span class="describe">為企業與醫務人員打造一站式服務平台</span>
            <span class="describe-fonz">企業員工入口</span>
        </div>
        <div class="right">
            <div class="logo"></div>
            <div class="login-box">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
            <el-form-item prop="username">
                <span>账号</span>
                <el-input  class="login-input" v-model="loginForm.username" name="username" placeholder="email"/>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="loginForm.password"
                    name="password"
                    auto-complete="on"
                    placeholder="password"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    class="login-input"/>
                <span class="show-pwd" @click="showPwd">
                      <svg-icon icon-class="eye" />
                </span>
            </el-form-item>
            <el-form-item>
                <el-button class="login-btn" :loading="loading" type="primary" @click.native.prevent="handleLogin">
                    {{$t('comm.login')}}
                </el-button>
            </el-form-item>
            <div class='tiparea'>
                <p>還沒有賬號？現在就 <a href="#/register">註 冊</a></p>
            </div>

        </el-form>
    </div>
        </div>
    </div>
</template>

<script>
    import {isvalidUsername} from '@/utils/validate'

    export default {
        name: 'Login',
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!isvalidUsername(value)) {
                    callback(new Error('请输入正确的用户名'))
                } else {
                    callback()
                }
            }
            const validatePass = (rule, value, callback) => {
                if (value.length < 5) {
                    callback(new Error('密码不能小于5位'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [{required: false, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePass}]
                },
                loading: false,
                pwdType: 'password',
                redirect: undefined
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        methods: {
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch('patientLogin', this.loginForm).then(() => {
                            this.$notify({
                                title: '登陆',
                                message: '登陆成功',
                                type: 'success',
                                duration: 1000
                            })
                            this.loading = false
                            this.$router.push({path: this.redirect || '/'})
                        }).catch((err) => {
                            this.$notify({
                                title: '登陆',
                                message: err.response.data,
                                type: 'error',
                                duration: 2000
                            })
                            this.loading = false
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #login{
        width: 800px;
        height: 580px;
        position: absolute;
        top: 50%;
        margin: -290px 0 0 -400px;
        left: 50%;
        box-shadow: 0px 0px 10px #999;
    }
    body {
        overflow-x: hidden;
        background: rgb(252,253,255);
        height: 100%;
    }
    .left{
        width: 490px;
        height: 100%;
        background: url("bg-login2.jpg") no-repeat no-repeat center;
        background-size: 490px 580px;
        float: left;
        box-sizing: border-box;
        padding: 110px 0 0 60px;
    }
    .right{
        width: 310px;
        height: 100%;
        background: #fff;
        float: left;
    }
    .logo{
        height: 100px;
        width: 100%;
        display: inline-block;
        background:url("logon-logo.png") no-repeat no-repeat center;
        background-size: 95px 95px;
        margin: 100px 0 30px 0;
    }
    .login-box{
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
    }

    .login-btn{
        margin-top: 10px;
        width: 100%;
        background: rgb(86, 182, 247);
        border: 1px solid rgb(86, 182, 247);
    }
    .login-btn:hover{
        background:rgb(43, 139, 242);
        border: 1px solid rgb(43, 139, 242);
    }
    .login-btn:active{
        background: rgb(86, 182, 247);
        border: 1px solid rgb(86, 182, 247);
    }
    .login-btn:focus{
        background: rgb(86, 182, 247);
        border: 1px solid rgb(86, 182, 247);
    }
    .title,.describe{
        display: inline-block;
        color:rgb(89, 85, 85);
        width: 100%;
        letter-spacing:5px;
        -webkit-font-smoothing: subpixel-antialiased
    }
    .title{
        font-size: 30px;
        margin-bottom: 15px;
    }
    .describe{
        font-size: 18px;
        margin-bottom: 120px;
    }

    .describe-fonz{
        font-size: 22px;
        color: rgb(89, 85, 85);
        text-align: center;
        margin-left: 120px;

    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 5px;
        font-size: 16px;
        color: rgb(86, 182, 247);
        cursor: pointer;
        user-select: none;
    }

</style>
<style>
    .login-input>input{
        border-radius: 0px;
        border: 1px solid transparent !important;
        border-bottom: 1px solid #e0e0e0 !important;
        padding: 0;
        float: left;
    }
    .login-input>input:focus{
        border-bottom: 1px solid rgb(139,192,240) !important;
    }
    .el-form-item__content>span{
        color: #999;
        font-size: 10px;
        float: left;
        margin-bottom: -12px;
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
