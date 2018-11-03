<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
        <breadcrumb/>
        <!--done i18n change-->
        <el-dropdown :hide-on-click="true" style="float:right;margin-right: 100px" @command="changeLangEvent">
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
                <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
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
    export default {
        data() {
            return {
                list:'',
                zh_cn: null
            }
        },
        components: {
            Breadcrumb,
            Hamburger
        },
        created() {
            this.realTime()
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'avatar'
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
                })
            },
            realTime(){
                //FIXME 这边 要进行 角色判断,不然会一直请求啊请求啊请求啊啊啊啊啊
                //if (jwt.decode(getToken()).roles )
                this.fetchAppointmentData()
                setTimeout(this.realTime,10000)
            },

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
        .screenfull {
            position: absolute;
            right: 90px;
            top: 16px;
            color: red;
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
</style>

