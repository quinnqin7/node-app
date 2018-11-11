<template>
    <div class="dashboard-container">


        <!--todo 公告-->
        <el-card class="box-card odd" shadow="hover" >
            <div slot="header" class="clearfix">
                <span>公告</span>
                <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            </div>
        <div style="height:140px;overflow: hidden;">
            <div v-for="(o,index) in journalData" :key="index" class="text item">
                {{ o['date'] +" "+ o['title'] +"   " }}<el-button type="text" @click="displayContent(o['content'])" size="small">查看</el-button>
            </div>
        </div>

        </el-card>





        <!-- todo 反馈-->
        <el-card class="box-card even" shadow="hover">
            <div slot="header" class="clearfix">
                <span>反馈</span>
                <!--<el-button style="float: right; padding: 3px 0;margin-left: 10%;" type="text">操作按钮</el-button>-->
            </div>
            <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="textarea3">
            </el-input>
            <el-button type="success"
                       style="float:right;margin-right: 10px;width:50px;height:30px;padding: 0;margin-top: 10px;margin-bottom: 10px;"
                       @click="sendFeedBack(textarea3)">{{ $t('table.confirm') }}
            </el-button>
        </el-card>





        <!--todo 为企业服务的医师-->
        <el-card class="box-card odd" shadow="hover">
            <div slot="header" class="clearfix">
                <span>为企业服务的医师</span>
                <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            </div>
            <!--doctorHadServiceData-->
            <div v-for="(o,index) in doctorHadServiceData" :key="index" class="text item">
                {{o.name }}
            </div>
        </el-card>




        <!--todo 未处理的 预约请求-->
        <el-card class="box-card even" shadow="hover">
            <div slot="header" class="clearfix">
                <span>未处理的 预约请求</span>
                <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            </div>
            <div v-for="(o,index) in noHandle" :key="index" class="text item">
                {{o.name }}
            </div>
        </el-card>






        <!--<el-card class="box-card odd" shadow="hover">-->
            <!--<div slot="header" class="clearfix">-->
                <!--<span>今日公告</span>-->
                <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            <!--</div>-->
            <!--<div v-for="o in 4" :key="o" class="text item">-->
                <!--{{'列表内容 ' + o }}-->
            <!--</div>-->
        <!--</el-card>-->




    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getToken} from "../../utils/auth";
    import {fetchContentData} from "../../api/doctor";
    import {sendFeedBack} from "../../utils/sendFeedBack";
    import {enterprisesToGetDoctor, fetchNoHandleAppointmentData, getDoctorName} from "../../api/enterprise";
    const jwt = require('jsonwebtoken');
    export default {
        data() {
            return {
                noHandle:[],
                a:null,
                sendFeedBack: sendFeedBack,
                journalData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    content: '上海',
                    city: '普陀区',
                    title: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    content: '上海',
                    city: '普陀区',
                    title: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    content: '上海',
                    city: '普陀区',
                    title: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }],
                textarea3: '',
                doctorHadServiceData:''
            }
        },
        name: 'Dashboard',
        computed: {
            ...mapGetters([
                'name',
                'roles'
            ])
        },
        created() {
            this.fetchContent()
            this.fetchServiceDoctorData()
            this.fetchNoHandleAppointment()
        },
        methods: {
           async getDoctor(id){
                await getDoctorName(id).then((response)=>{
                		//console.log(response.data)
                    return response.data
                	}).catch(err=>{
                		console.log(err)
                })
                //return this.a.name
            },
            fetchContent() {
                fetchContentData(getToken()).then((response) => {
                    this.journalData = response.data
                }).catch(() => {
                    this.$alert('获取数据错误')
                })
            },
            displayContent(data) {
                this.$alert(data, {
                    dangerouslyUseHTMLString: true
                })
            },
            async fetchServiceDoctorData() {
                this.listLoading = true
                await enterprisesToGetDoctor(jwt.decode(getToken()).id).then(response => {
                    //去重
                    var hash = {};
                    this.doctorHadServiceData = response.data.reduce(function(item, next) {
                        hash[next.doctorId] ? '' : hash[next.doctorId] = true && item.push(next);
                        return item
                    }, [])
                    //this.doctorHadServiceData = response.data
                    console.log(this.doctorHadServiceData)
                    this.listLoading = false
                })

                await getDoctorName().then((response)=>{
                    //console.log(response.data)
                    //return response.data
                    var haha  = response.data.map(item=>{
                        for(var i=0;i<this.doctorHadServiceData.length; i++){
                            if(item._id === this.doctorHadServiceData[i].doctorId)
                            {
                                var en = {name :item.name}
                                Object.assign(this.doctorHadServiceData[i],en)
                                return this.doctorHadServiceData[i]
                                //console.log(item.name)
                            }
                        }
                    })
                    this.doctorHadServiceData = haha.filter(f=>f)
                }).catch(err=>{
                    console.log(err)
                })

            },
           async fetchNoHandleAppointment(){
                this.listLoading = true
               await fetchNoHandleAppointmentData(jwt.decode(getToken()).id).then((response)=>{
                    //去重
                    var hash = {};
                    this.noHandle = response.data.reduce(function(item, next) {
                        hash[next.doctorId] ? '' : hash[next.doctorId] = true && item.push(next);
                        return item
                    }, [])
                    this.listLoading = false
                })

               await getDoctorName().then((response)=>{
                   //console.log(response.data)
                   //return response.data
                   var haha  = response.data.map(item=>{
                       for(var i=0;i<this.noHandle.length; i++){
                           if(item._id === this.noHandle[i].doctorId)
                           {
                               var en = {name :item.name}
                               Object.assign(this.noHandle[i],en)
                               return this.noHandle[i]
                               //console.log(item.name)
                           }
                       }
                   })
                   this.noHandle = haha.filter(f=>f)
               }).catch(err=>{
                   console.log(err)
               })
            }



        //    todo methdoTail
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
        margin-bottom: 5px;

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
        height: 40%;

        margin-top: 20px;
    }

    .odd {
        margin-left: 5%;
        float: left;
    }

    .even {
        margin-right: 5%;
        float: right;
    }
</style>
