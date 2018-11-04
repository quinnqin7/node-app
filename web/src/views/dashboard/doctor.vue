<template>
    <div class="dashboard-container">
        <!--<div class="dashboard-text">doctorname:{{ name }}</div>-->
        <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
        <el-card class="box-card odd" shadow="hover">
            <div slot="header" class="clearfix">
                <span>今日公告</span>
                <!--<el-button style="float: right; padding: 3px 0;margin-left: 10%;" type="text">操作按钮</el-button>-->
            </div>
            <el-table
                :data="journalData"
                style="width: 100%;margin-top: -20px;line-height: 10px !important;padding:0;"
                max-height="150">
                <el-table-column
                    fixed
                    sortable
                    :formatter="dateFormat"
                    prop="date"
                    label="日期"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="标题"
                    >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="50">
                    <template slot-scope="scope">
                        <el-button type="text" @click="displayContent(scope.row.content)" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
            <!--todo 发送反馈-->
        <el-card class="box-card even" shadow="hover">
            <div slot="header" class="clearfix">
                <span>发送反馈</span>
                <!--<el-button style="float: right; padding: 3px 0;margin-left: 10%;" type="text">操作按钮</el-button>-->
            </div>
            <el-input
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 5}"
                placeholder="请输入内容"
                v-model="textarea3">
            </el-input>
            <el-button type="success" style="float:right;margin-right: 10px;width:50px;height:30px;padding: 0;margin-top: 10px;margin-bottom: 10px;" @click="sendFeedBack(textarea3)">{{ $t('table.confirm') }}</el-button>
        </el-card>
        <!--TODO 正在服务的企业-->
        <el-card class="box-card odd" shadow="hover">
            <div slot="header" class="clearfix">
                <span>正在服务的企业</span>
                <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            </div>
            <el-table
                :data="ServiceCompanyData"
                style="width: 100%;margin-top: -20px;line-height: 10px !important;padding:0;"
                max-height="150">
                <!--<el-table-column-->
                    <!--fixed-->
                    <!--sortable-->
                    <!--:formatter="dateFormat"-->
                    <!--prop=" startTime"-->
                    <!--label="日期"-->
                    <!--width="100">-->
                <!--</el-table-column>-->
                <el-table-column
                    prop="name"
                    label="企业名称"
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="50">
                    <template slot-scope="scope">
                        <el-button type="text" @click="displayContent(scope.row.content)" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!--todo 最近的排班-->
        <el-card class="box-card even" shadow="hover">
            <div slot="header" class="clearfix">
                <span>最近的排班</span>
                <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            </div>
            <el-table
                :data="Arrangelist"
                style="width: 100%;margin-top: -20px;line-height: 10px !important;padding:0;"
                max-height="150">
                <!--<el-table-column-->
                <!--fixed-->
                <!--sortable-->
                <!--:formatter="dateFormat"-->
                <!--prop=" startTime"-->
                <!--label="日期"-->
                <!--width="100">-->
                <!--</el-table-column>-->
                <el-table-column
                    prop="name"
                    :label="$t('table.domain')"
                >
                </el-table-column>
                <el-table-column
                    prop="startTime"
                    :formatter="dateFormat"
                    :label="$t('table.startTime')"
                >
                </el-table-column>
                <el-table-column
                    prop="endTime"
                    :formatter="dateFormat"
                    :label="$t('table.endTime')"
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="50">
                    <template slot-scope="scope">
                        <el-button type="text" @click="displayContent(scope.row.content)" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- todo 预约消息-->
        <el-card class="box-card odd" shadow="hover">
            <div slot="header" class="clearfix">
                <span>预约消息</span>
                <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            </div>
            <el-table
                :data="Appointmentlist"
                style="width: 100%;margin-top: -20px;line-height: 10px !important;padding:0;"
                max-height="150">
                <!--<el-table-column-->
                <!--fixed-->
                <!--sortable-->
                <!--:formatter="dateFormat"-->
                <!--prop=" startTime"-->
                <!--label="日期"-->
                <!--width="100">-->
                <!--</el-table-column>-->
                <el-table-column
                    prop="enterpriseId"
                    label="企业名称"
                >

                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="50">
                    <template slot-scope="scope">
                        <el-button type="text" @click="displayContent(scope.row.content)" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import {getToken} from "../../utils/auth";
    import {
        DoctorTogetDoctorAndServiceTime,
        DoctorToGetEnterprise,
        fetchContentData, getDoctorMessage,
        getEnterprises
    } from "../../api/doctor";
    import {dateFormat} from '../../utils/dateFormat/index'
    import {sendFeedBack} from "../../utils/sendFeedBack";

    const jwt = require('jsonwebtoken');
    export default {
        data(){
          return{
              Arrangelist:[],
              dateFormat:dateFormat,
              sendFeedBack:sendFeedBack,
              ServiceCompanyData:[],
              Appointmentlist:[],
              journalData:[{
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
              textarea3:''
          }
        },
        name: 'Dashboard',
        computed: {
            ...mapGetters([
                'name',
                'roles'
            ])
        },
        created(){
            this.fetchContent()
            this.fetchServiCompany()
            this.fetchArrangeData()
            this.fetchAppointmentData()
        },
        methods:{
            //获取公告 内容
            fetchContent(){
                fetchContentData(getToken()).then((response)=>{
                    this.journalData = response.data
                }).catch(()=>{
                    this.$alert('获取数据错误')
                })
            },
            //显示公告的内容
            displayContent(data){
                this.$alert(data, {
                    dangerouslyUseHTMLString: true
                })
            },
            fetchServiCompany() {
                this.listLoading = true
                getEnterprises(getToken()).then(response => {
                    this.ServiceCompanyData = response.data
                    console.log(this.ServiceCompanyData)
                    this.listLoading = false
                })
            },
            fetchArrangeData() {
                this.listLoading = true
                DoctorTogetDoctorAndServiceTime(jwt.decode(getToken()).id).then(response => {
                    // console.log('返回的 合并之前list 数据')
                    console.log(response.data)
                    this.Arrangelist = response.data
                    var enterpriseIdArray = this.Arrangelist.map(data=>{
                        // if(data.enterpriseId!=='')
                        return data.enterpriseId
                    })
                    DoctorToGetEnterprise(enterpriseIdArray.filter(f=>f)).then(response=>{
                        // console.log('返回的企业数据')
                        // console.log(response.data)
                        // console.log('现在的 list 数据')
                        // console.log(this.list)
                        //合并 数据  要出错也是这里出错
                        var mergeData = this.Arrangelist.map(data=>{
                            for(let i = 0;i< response.data.length;i++)
                            {
                                if(data.enterpriseId === response.data[i]._id){
                                    return Object.assign(data,response.data[i]) //哼合并
                                }
                                if(data.enterpriseId==='')
                                    return data
                            }
                        })
                        // console.log(response.data)
                        //
                        //     console.log('合并之后list的数据')
                        //  console.log(hhh)
                        this.Arrangelist = mergeData //.filter(f=>f)
                    })
                    this.listLoading = false
                })
            },
            fetchAppointmentData(){
                //this.listLoading = true
                getDoctorMessage(jwt.decode(getToken()).id).then((response)=>{
                    this.Appointmentlist = response.data
                    //console.log(response)
                }).catch(err=>{
                    console.log(err)
                })
            },

            //    todo medthodTail
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
        margin-bottom: 18px;
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
        height:40%;


        margin-top: 20px;
    }
    .odd{
        margin-left: 5%;
        float:left;
    }
    .even{
        margin-right: 5%;
        float:right;
    }
</style>
