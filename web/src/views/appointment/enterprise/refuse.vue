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
            :data="refuseData"
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
                    {{ scope.row.doctorId }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.tel')" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.doctorId }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.time')" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.doctorServiceTimeId }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.perfession')" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.doctorId }}</span>
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
        getDoctorAndServiceTime,
        getDoctors, getRefuseData,
        sendMessageToDoctor
    } from "../../../api/enterprise";
    import {getToken} from "../../../utils/auth";

    const jwt = require('jsonwebtoken');
    export default {
        data() {
            return {
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
            fetchRefuseData(){
                getRefuseData(jwt.decode(getToken()).id).then(
                    response=>{
                        console.log(response.data)
                        this.refuseData = response.data
                        this.listLoading = false
                    }
                )
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
