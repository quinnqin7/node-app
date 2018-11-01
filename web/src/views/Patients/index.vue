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
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
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
            <el-table-column :label="$t('table.gender')"  align="center">
                <template slot-scope="scope">
                    {{ msg = scope.row.gender==='1'?$t('table.gender-ms'):$t('table.gender-mr') }}
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" :label="$t('table.setup')" align="center">
                <template slot-scope="scope">
                    <el-button  @click="handleDetail(scope.row)">{{$t('table.detail')}}</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog class="dialog" :title="$t(textMap[dialogStatus])" :visible.sync="dialogFormVisible">

            <el-form ref="dataForm"  :model="dialogData" label-position="left" label-width="70px" style="width: 100%;">
                <el-form-item :label="$t('table.name')" prop="type">
                    <el-input v-model="dialogData.name"/>
                </el-form-item>
                <el-form-item :label="$t('table.tel')" prop="type">
                    <el-input v-model="dialogData.tel"/>
                </el-form-item>
                <el-form-item :label="$t('table.gender')" prop="type">
                    <el-radio-group v-model="dialogData.gender">
                        <el-radio :label="1">女</el-radio>
                        <el-radio :label="2">男</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-show="showEditCase" :label="$t('table.case')" style="margin-top:20px">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        :placeholder="$t('table.pleaseInput')"
                        v-model="dialogData.mainContent">
                    </el-input>
                </el-form-item>
                <el-form-item v-show="showEditCase" :label="$t('table.suggest')">
                    <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        :placeholder="$t('table.pleaseInput')"
                        v-model="dialogData.suggest">
                    </el-input>
                </el-form-item>
                <el-table
                    :data="dialogData.his"
                    style="width: 100%"
                    height="250">
                    <el-table-column
                        fixed
                        prop="time"
                        :label="$t('table.date')"
                        style="width:33%;">
                    </el-table-column>
                    <el-table-column
                        prop="mainContent"
                        :label="$t('table.hisCase')"
                        style="width:33%;">
                    </el-table-column>
                    <el-table-column
                        prop="suggest"
                        :label="$t('table.suggest')"
                        style="width:33%;">
                    </el-table-column>
                </el-table>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ dialogStatus==='create'?$t('table.next'):$t('table.confirm') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getPatients,getPatient,createPatient} from '@/api/enterprise'
    import { mapGetters } from 'vuex'
    import {doctorToGetPatients} from '@/api/doctor'
    import jwt from 'jsonwebtoken'
    import {updatePatient} from "../../api/enterprise";
    import {getToken} from "../../utils/auth";
    export default {
        data() {
            return {
                dialogData:{},
                showEditCase:false,
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

        },
        created() {
            this.fetchData()
        },
        computed:{
            ...mapGetters([
                'name',
                'roles'
            ])
        },

        methods: {
            fetchData() {

                this.listLoading = true

                if(this.roles[0] === '1'){
                    doctorToGetPatients(this.$route.params.enterpriseId).then(response => {
                        this.list = response.data
                        this.listLoading = false
                    })
                }else {
                    getPatients().then(response => {
                        this.list = response.data
                        this.listLoading = false
                    })
                }
            },
            fetchPatientData(id){
                this.listLoading = true
                getPatient(id).then(response => {
                    this.dialogData = response.data
                    this.listLoading = false
                })
            },
            handleCreate() {
                this.resetTemp()
                this.showEditCase=false
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleDetail(row) {
                this.showEditCase=true
                if(this.roles[0] === '2')
                {
                    this.showEditCase=false //企业 无法添加病例
                }
                this.dialogFormVisible = true
                this.dialogStatus = 'detail'
                this.fetchPatientData(row._id)
            },
            resetTemp() {
                this.dialogData = {
                    //在这里面写 (创建)弹窗 初始化
                }
            },
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        if(this.roles[0] === '1')
                        {
                        createPatient(this.dialogData,this.$route.params.enterpriseId).then(() => {
                            this.dialogFormVisible = false
                            this.$notify({
                                title: '成功',
                                message: '创建成功',
                                type: 'success',
                                duration: 2000
                            })
                            this.showEditCase=true
                            this.handleDetail()
                        })
                        }
                        else{
                            createPatient(this.dialogData,jwt.decode(getToken()).id).then(() => {
                                this.dialogFormVisible = false
                                this.$notify({
                                    title: '成功',
                                    message: '创建成功',
                                    type: 'success',
                                    duration: 2000
                                })

                            })
                        }
                    }
                })
            },
            // FIXME 在传输需要修改的数据的时候, 重复传输了大量的病例
            updateData(){
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        if(this.roles[0] === '1')
                        {
                            updatePatient(this.dialogData,this.$route.params.enterpriseId,jwt.decode(getToken()).id).then(() => {
                                this.dialogFormVisible = false
                                this.$notify({
                                    title: '成功',
                                    message: '编辑成功',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.showEditCase=true
                            })
                        }
                        else if(this.roles[0] === '2'){
                            updatePatient(this.dialogData,jwt.decode(getToken()).id,"").then(() => {
                                this.dialogFormVisible = false
                                this.$notify({
                                    title: '成功',
                                    message: '编辑成功',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.showEditCase=true
                            })
                        }

                    }
                })
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
