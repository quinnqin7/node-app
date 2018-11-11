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
            :data="lss"
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
            <el-table-column :label="$t('table.time')" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.startTime }}{{ scope.row.endTime}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.perfession')" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.perfession }}</span>
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
        getDoctors, getRefuseData, refuseServiceTime,
        sendMessageToDoctor
    } from "../../../api/enterprise";
    import {getToken} from "../../../utils/auth";

    const jwt = require('jsonwebtoken');
    export default {
        data() {
            return {
                ls:[],
                lss:[],
                refuseData:null,
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

        },
        comments: {
            // Dialog
        },
        created() {
            this.fetchRefuseData()
        },
        methods: {
           async fetchRefuseData(){
                await getRefuseData(jwt.decode(getToken()).id).then(
                    response=>{
                        console.log(response.data)
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
                var arrayRefuseServiceTimeId = this.ls.map(item=>{
                    return item.doctorServiceTimeId
                })
               await refuseServiceTime(arrayRefuseServiceTimeId).then((response)=>{
                   var haha  = response.data.filter(item=>{
                       for(var i=0;i<this.ls.length; i++){
                           if(item._id === this.ls[i].doctorServiceTimeId)
                           {
                               var en = {startTime:item.startTime,endTime:item.endTime}
                               Object.assign(this.ls[i],en)
                               this.lss.push(this.ls[i])
                               //return this.refuseData[i]
                               console.log(this.lss)
                           }
                       }
                   })
               }).catch(err=>{
               		console.log(err)
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
