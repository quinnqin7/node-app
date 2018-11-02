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
            :data="list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row>
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
            <el-table-column :label="$t('table.perfession')" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.perfession }}</span>
                </template>
            </el-table-column>
            <!--<el-table-column :label="$t('table.serviceTime')" align="center">-->
            <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.serviceTime }}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column class-name="status-col" :label="$t('table.setup')" align="center">
                <template slot-scope="scope">
                    <el-button @click="handlelook(scope.row)">{{$t('table.look')}}</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog class="dialog" :title="$t(textMap[dialogStatus])" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :model="dialogData" label-position="left" label-width="70px" style="width: 100%;">
                <el-form-item :label="$t('table.name')" prop="type">
                    <el-input :disabled="true" v-model="dialogData.name"/>
                </el-form-item>
                <el-form-item :label="$t('table.tel')" prop="type">
                    <el-input :disabled="true" v-model="dialogData.tel"/>
                </el-form-item>
                <el-form-item :label="$t('table.frequency')" prop="type">
                    <el-input :disabled="true" v-model="dialogData.frequency"/>
                </el-form-item>
                <el-form-item :label="$t('table.perfession')" prop="type">
                    <el-input :disabled="true" v-model="dialogData.perfession"/>
                </el-form-item>
                <el-form-item :label="$t('table.address')" prop="type">
                    <el-input :disabled="true" v-model="dialogData.address"/>
                </el-form-item>
                <el-table
                    ref="multipleTable"
                    :data="dialogData.serviceTimeData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <template>
                        <el-table-column
                            type="selection"
                            width="55"
                        >
                        </el-table-column>
                        <el-table-column
                            :formatter="dateFormat"
                            prop="startTime"
                            sortable
                            label="开始日期"
                            width="120">

                            <!--<template slot-scope="scope">{{ scope.row.startTime }}</template>-->
                        </el-table-column>
                        <el-table-column
                            :formatter="dateFormat"
                            prop="endTime"
                            label="结束日期"
                            width="120">
                        </el-table-column>
                    </template>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="appointment(dialogData._id)">{{ $t('table.appointment') }}</el-button>
                <!--<el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>-->
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getPatients, getPatient} from '@/api/enterprise'
    import moment from 'moment'
    //  import {getEnterprise, getEnterprises} from "../../api/doctor";
    import {
        enterpriseAppointmentDoctor,
        getDoctorAndServiceTime,
        getDoctors,
        sendMessageToDoctor
    } from "../../../api/enterprise";
    import {getToken} from "../../../utils/auth";

    const jwt = require('jsonwebtoken');
    export default {
        data() {
            return {
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
                    published: 'success',
                    draft: 'gray',
                    deleted: 'danger'
                }
                return statusMap[status]
            }
        },
        comments: {
            // Dialog
        },
        created() {
            this.fetchDoctorsData()
        },
        methods: {
            fetchDoctorAndServiceTimeData(doctorId, row) {
                this.listLoading = true
                //根据医生的 id 去获取医生的服务时间, 返回一个数组,将数组的名称-> serviceTimeData
                getDoctorAndServiceTime(doctorId).then(response => {
                    this.dialogData = Object.assign(row, {serviceTimeData: response.data})
                    console.log(this.dialogData)
                    this.listLoading = false
                })
            },
            fetchDoctorsData(id) {
                this.listLoading = true
                getDoctors(id).then(response => {
                    this.list = response.data
                    this.listLoading = false
                })
            },
            handlelook(row) {
                this.dialogFormVisible = true
                this.dialogStatus = 'detail'
                this.fetchDoctorAndServiceTimeData(row._id, row)
            },
            //格式化时间的方法
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD HH");
            },
            handleSelectionChange(val) { //这边获取 选择的预约时间
                this.multipleSelection = val;
                //console.log(this.multipleSelection)
            },
            appointment(doctorId) {
                if (this.multipleSelection !== '') {
                    //获取多选 服务时间的 id
                    var doctorServiceId = this.multipleSelection.map(data => {
                        return data._id
                    })
                    //console.log(doctorId)
                    //console.log(doctorServiceId + "   " + jwt.decode(getToken()).id)
                    var mainContent = "这里是留言内容,暂时还没有"
                    sendMessageToDoctor(doctorId, doctorServiceId, jwt.decode(getToken()).id, mainContent).then(doc => {
                        this.$notify({
                            title: '预约',
                            message: '预约成功',
                            type: 'success',
                            duration: 2000
                        })
                        this.dialogFormVisible = false
                    })
                    // FIXME 这个方法应该被 医生使用, 要换成 发送预约请求,需要 医生 同意的请求
                    // enterpriseAppointmentDoctor(doctorServiceId,jwt.decode(getToken()).id).then(doc=>{
                    //     this.$notify({
                    //         title: '预约',
                    //         message: '预约成功',
                    //         type: 'success',
                    //         duration: 2000
                    //     })
                    //     console.log(doc)
                    // })
                } else {
                    this.$notify({
                        title: '预约',
                        message: '预约失败',
                        type: 'error',
                        duration: 2000
                    })
                }
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
