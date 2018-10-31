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
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row>
            <el-table-column align="center" :label="$t('table.id')" >
                <template slot-scope="scope">
                    {{ scope.$index }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.name')"  align="center">
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
            <el-table-column :label="$t('table.serviceTime')" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.serviceTime }}</span>
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" :label="$t('table.setup')" align="center">
                <template slot-scope="scope">
                    <el-button  @click="handlelook(scope.row)">{{$t('table.look')}}</el-button>
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" :label="$t('table.setup')" align="center">
                <template slot-scope="scope">
                    <el-button  @click="handleAppointment(scope.row)">{{$t('table.appointment')}}</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog class="dialog" :title="$t(textMap[dialogStatus])" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm"  :model="dialogData" label-position="left" label-width="70px" style="width: 100%;">
                <el-form-item :label="$t('table.domain')" prop="type">
                    <el-input :disabled="true" v-model="dialogData.name"/>
                </el-form-item>
                <el-form-item :label="$t('table.tel')" prop="type">
                    <el-input :disabled="true" v-model="dialogData.tel"/>
                </el-form-item>
                <el-form-item :label="$t('table.enterpriseCategory')" prop="type">
                    <el-input :disabled="true" v-model="dialogData.enterpriseCategory"/>
                </el-form-item>
                <el-form-item :label="$t('table.frequency')" prop="type">
                    <el-input :disabled="true" v-model="dialogData.frequency"/>
                </el-form-item>
                <el-form-item :label="$t('table.numberOfPeople')" prop="type">
                    <el-input :disabled="true" v-model="dialogData.numberOfPeople"/>
                </el-form-item>
                <el-form-item :label="$t('table.specialHarm')" prop="type">
                    <el-input :disabled="true" v-model="dialogData.specialHarm"/>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                <!--<el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>-->
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getPatients,getPatient} from '@/api/enterprise'

  //  import {getEnterprise, getEnterprises} from "../../api/doctor";
    import {getDoctorAndServiceTime, getDoctors} from "../../../api/enterprise";
    export default {
        data() {
            return {
                dialogData:"",
                serviceTimeData:[],
                dialogFormVisible:false,
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
            fetchDoctorAndServiceTimeData(doctorId,row) {
                this.listLoading = true
                getDoctorAndServiceTime(doctorId).then(response => {
                    this.serviceTimeData.push(response.data)
                    this.dialogData = Object.assign(row,this.serviceTimeData)
                    console.log(this.dialogData)
                    this.serviceTimeData=[]
                    this.listLoading = false
                })
            },
            fetchDoctorsData(id){
                this.listLoading = true
                getDoctors(id).then(response => {
                    console.log(response.data)
                    this.list = response.data
                    this.listLoading = false
                })
            },
            handlelook(row) {
                this.dialogFormVisible = true
                this.dialogStatus = 'detail'
                this.fetchDoctorAndServiceTimeData(row._id,row)
            },


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
        wdith:1000px;
    }
</style>
