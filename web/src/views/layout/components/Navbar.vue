<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
        <breadcrumb/>
        <screenfull class="screenfull right-menu-item"/>
        <el-popover v-if="getRole() ==='1' " placement="top-start" title="个人信息" width="200" trigger="hover" content="这边要可以显示 个人的相关信息" style="float:right;margin-right: 100px">
            <el-button  style="border: #f9f3ff" slot="reference">{{$t('nav.hello')}}<span style="color:#61a2ff">{{name}}</span>{{$t('nav.doctor')}}</el-button>
        </el-popover>

        <el-popover v-if="getRole() ==='2' " placement="top-start" title="个人信息" width="200" trigger="hover" content="这边要可以显示 个人的相关信息" style="float:right;margin-right: 100px">
            <el-button  style="border: #f9f3ff" slot="reference">{{$t('nav. enterprise')}}<span style="color:#61a2ff">{{name}}</span>{{$t('nav.enterpriseRunner')}}</el-button>
        </el-popover>

        <el-popover v-if="getRole() ==='4' " placement="top-start" title="个人信息" width="200" trigger="hover" content="这边要可以显示 个人的相关信息" style="float:right;margin-right: 100px">
            <el-button  style="border: #f9f3ff" slot="reference">{{$t('nav. hello')}}<span style="color:#61a2ff">{{name}}</span>{{$t('nav.admin')}}</el-button>
        </el-popover>
        <el-popover v-if="getRole() ==='3' " placement="top-start" title="个人信息" width="200" trigger="hover" content="这边要可以显示 个人的相关信息" style="float:right;margin-right: 100px">
            <el-button  style="border: #f9f3ff" slot="reference">{{$t('nav. hello')}}<span style="color:#61a2ff">{{name}}</span>{{$t('nav.patient')}}</el-button>
        </el-popover>



        <!--done i18n change-->
        <el-dropdown :hide-on-click="true" style="float:right;margin-right: 10px" @command="changeLangEvent">
              <span class="el-dropdown-link">
                {{$t('comm.lang')}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="cn">{{$t('comm.cn')}}</el-dropdown-item>
                <el-dropdown-item command="tw">{{$t('comm.tw')}}</el-dropdown-item>
                <el-dropdown-item command="en">{{$t('comm.en')}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>



        <!--//info-->
        <el-dropdown class="avatar-container" trigger="click">
            <div class="avatar-wrapper">
                <img :src="avatar" class="user-avatar">
                <i class="el-icon-caret-bottom"/>
            </div>
            <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <router-link class="inlineBlock" to="/">
                    <el-dropdown-item>
                        Home
                    </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                    <span style="display:block;" @click="logout">LogOut</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-menu>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'
    import {getDoctorMessage} from "../../../api/doctor";
    import {getToken} from "../../../utils/auth";
    const jwt = require('jsonwebtoken');
    import Screenfull from '@/components/Screenfull'
    export default {
        data() {
            return {
                avatar:'',
                getrole:"false",
                list:'',
                zh_cn: null
            }
        },
        components: {
            Breadcrumb,
            Hamburger,
            Screenfull,
        },
        created() {
            this.realTime()
            //this.getRole()
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'name',
                'roles'
            ]),

        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('ToggleSideBar')
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            },
            changeLangEvent(command) {
                if (command === 'en') {
                    window.localStorage.setItem('lang', 'en')
                    this.$i18n.locale = 'en';
                }
                if(command === 'cn'){
                    window.localStorage.setItem('lang', 'cn')
                    this.$i18n.locale = 'cn';
                }
                if(command === 'tw'){
                    window.localStorage.setItem('lang', 'tw')
                    this.$i18n.locale = 'tw';
                }
            },
            fetchAppointmentData(){
                //this.listLoading = true
                getDoctorMessage(jwt.decode(getToken()).id).then((response)=>{
                    this.list = response.data
                    if(this.list.toString()!=='')
                    {
                        this.$notify({
                            title: '预约',
                            message: '您有预约请求',
                            type: 'success',
                            duration: 1000
                        })
                    }
                    //console.log(this.list.toString())
                    //console.log(response)
                }).catch(err=>{
                    console.log(err)
                    this.$notify({
                        title: '出错',
                        message: '登陆超时',
                        type: 'error',
                        duration: 1000
                    })
                })
            },
            realTime(){
                //FIXME 这边 要进行 角色判断,不然会一直请求啊请求啊请求啊啊啊啊啊
                //if (jwt.decode(getToken()).roles )
                this.fetchAppointmentData()
                this.avatar = localStorage.getItem('header'),
                setTimeout(this.realTime,10000)
            },
            //判断显示 名字的格式
            getRole(){
                if (this.roles[0] === '1')
                return '1'
                if (this.roles[0] === '2')
                    return '2'
                if (this.roles[0] === '3')
                    return '3'
                if (this.roles[0] === '4')
                    return '4'
            }

        },

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;
        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 10px;
        }

        .avatar-container {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 35px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
    .screenfull {
        position: absolute;
        right: 450px;
        top: 16px;
        color: red;
        float:right;
    }
</style>

