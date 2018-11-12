<template>
    <div class="app-container">
        <div class="filter-container">
            <!--<el-input :placeholder="$t('table.title')" v-model="listQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>-->
            <!--<el-select v-model="listQuery.importance" :placeholder="$t('table.importance')" clearable style="width: 90px" class="filter-item">-->
            <!--<el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>-->
            <!--</el-select>-->
            <!--<el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item" style="width: 130px">-->
            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key"/>-->
            <!--</el-select>-->
            <!--<el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">-->
            <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>-->
            <!--</el-select>-->
            <!--<el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>-->
            <!--<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>-->
            <!--<el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">{{ $t('table.export') }}</el-button>-->
            <!--<el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">{{ $t('table.reviewer') }}</el-checkbox>-->
        </div>

        <el-table
            style="width:100%"
            v-loading="listLoading"
            :data="ls"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
            :header-cell-style="{
                background:'#fafafa',
                color: 'rgb(89, 88, 88)'}">
            <el-table-column align="center" :label="$t('table.id')">
                <template slot-scope="scope">
                    {{ scope.$index }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.name')" align="center">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.tel')" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.tel }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.startTime')" align="center">
                <template slot-scope="scope">
                    <span>{{ moment(scope.row.startTime).format("YYYY-MM-DD") }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.endTime')" align="center">
                <template slot-scope="scope">
                    <span>{{ moment(scope.row.endTime).format("YYYY-MM-DD") }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.perfession')" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.perfession }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.status')" class-name="status-col" width="100">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.sign | statusFilter">{{ scope.row.sign==='2'?'迟到':(scope.row.sign==='1'?'签到':'未到') }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" :label="$t('table.setup')" align="center">
                <template slot-scope="scope">
                    <el-button @click="handleSign(1,scope.row._id)">{{$t('table.sign')}}</el-button>
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" :label="$t('table.setup')" align="center">
                <template slot-scope="scope">
                    <el-button @click="handleSign(2,scope.row._id)">{{$t('table.delay')}}</el-button>
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" :label="$t('table.setup')" align="center">
                <template slot-scope="scope">
                    <el-button @click="handleSign(0,scope.row._id)">{{$t('table.absent')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getPatients, getPatient} from '@/api/enterprise'
    import moment from 'moment'

    import {
        enterpriseAppointmentDoctor,
        getDoctorAndServiceTime, getDoctorName,
        getDoctors, getRefuseData, getSignData,
        sendMessageToDoctor, Sign
    } from "../../../api/enterprise";
    import {getToken} from "../../../utils/auth";

    const jwt = require('jsonwebtoken');
    export default {
        data() {
            return {
                moment:moment,
                refuseData:null,
                ls:[],
                multipleSelection: '',
                dialogData: {},
                serviceTimeData: [],
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    detail: 'table.detail',
                    create: 'table.add'
                },
                list: null, // all data
                listLoading: true,
            }
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    1: 'success',
                    2: 'gray',
                    0: 'danger'
                }
                return statusMap[status]
            }
        },
        comments: {
            // Dialog
        },
        created() {
            this.fetchSignData()
        },
        methods: {
            async fetchSignData(){
                await getSignData(jwt.decode(getToken()).id).then(
                    response=>{
                       // console.log(response.data)
                        this.refuseData = response.data
                        this.listLoading = false
                    }
                )
                await getDoctorName().then((response)=>{
                    //console.log(response.data)
                    //return response.data
                    var haha  = response.data.filter(item=>{
                        for(var i=0;i<this.refuseData.length; i++){
                            if(item._id === this.refuseData[i].doctorId)
                            {
                                var en = {name :item.name,tel:item.tel,perfession:item.perfession}
                                Object.assign(this.refuseData[i],en)
                                this.ls.push(this.refuseData[i])
                                //return this.refuseData[i]
                                //console.log(item.name)
                            }
                        }
                    })
                    //this.refuseData = response.data
                    //this.refuseData = haha.filter(f=>f)
                   // console.log(this.refuseData)
                    //console.log(haha)
                }).catch(err=>{
                    console.log(err)
                })

            },
            // 1 到 2 迟  (不点 没到)
            handleSign(sign,doctorServiceTimeId){
                Sign(sign,doctorServiceTimeId).then(()=>{
                    this.$notify({
                        title: '签到',
                        message: '操作成功',
                        type: 'success',
                        duration: 2000
                    })
                    window.location.reload()
                })
            }
        }
    }
</script>
<style scoped>
    .app-container {
        width: 100%;
    }

    .filter-item {
        float: right;
        margin-bottom: 15px;
    }

    .dialog {
        wdith: 1000px;
    }
</style>
