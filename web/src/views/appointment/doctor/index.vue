<template>
    <div class="app-container">
        <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row>
            <el-table-column align="center" label="ID" >
                <template slot-scope="scope">
                    {{ scope.$index }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.time')">
                <template slot-scope="scope">
                    {{ scope.row.time }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.domain')">
                <template slot-scope="scope">
                    {{ scope.row.enterpriseId }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.serviceTime')"  align="center">
                <template slot-scope="scope">
                    <i class="el-icon-time"/>
                    <span>{{ scope.row.doctorServiceTimeId }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.setup')"  align="center">
                <template slot-scope="scope">
                    <el-button @click="handleAgree(scope.row.doctorServiceTimeId,scope.row._id,scope.row.enterpriseId)">{{$t('table.agree')}}</el-button>
                </template>

            </el-table-column>
            <el-table-column :label="$t('table.setup')"  align="center">
            <template slot-scope="scope">
                <el-button @click="handleRefuse(scope.row._id)">{{$t('table.refuse')}}</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    //import { getList } from '@/api/enterprise'
    import {getAgree, getDoctorMessage, setRefuse} from "../../../api/doctor";
    import {getToken} from "../../../utils/auth";

    const jwt = require('jsonwebtoken');
    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'gray',
                    deleted: 'danger'
                }
                return statusMap[status]
            }
        },
        data() {
            return {
                list: null,
                listLoading: false
            }
        },
        created(){
            //一进首页就去 doctorMessage 获取
            this.realTime()
            //this.fetchAppointmentData()
        },
        methods:{
            fetchAppointmentData(){
                //this.listLoading = true
                getDoctorMessage(jwt.decode(getToken()).id).then((response)=>{
                    this.list = response.data
                    //console.log(response)
                }).catch(err=>{
                    console.log(err)
                })
            },
            realTime(){
                this.fetchAppointmentData()
                setTimeout(this.realTime,3000)
            },
            handleAgree(doctorServiceTimeId, messageId,enterpriseId){
                getAgree(doctorServiceTimeId, messageId,enterpriseId).then(()=>{
                    this.$notify({
                        title: '同意',
                        message: '同意成功',
                        type: 'success',
                        duration: 2000
                    })
                }).catch(()=>{
                    this.$notify({
                        title: '同意',
                        message: '同意失败',
                        type: 'error',
                        duration: 2000
                    })
                })
            },


            handleRefuse(messageId){
                setRefuse(messageId).then(()=>{
                    this.$notify({
                        title: '拒绝',
                        message: '拒绝成功',
                        type: 'success',
                        duration: 2000
                    })
                }).catch(()=>{
                    this.$notify({
                        title: '拒绝',
                        message: '拒绝失败',
                        type: 'error',
                        duration: 2000
                    })
                })
            }
        }
    }
</script>
