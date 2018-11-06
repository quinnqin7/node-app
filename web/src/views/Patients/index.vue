<template>
    <div class="app-container">
        <div class="filter-container">
            <div style="margin-top: 15px;">
                <input placeholder="请输入内容" v-model="searchInput" class="input-with-select" @focus="fetchData" v-on:input="handleSearch"></input>
                    <!--<el-select v-model="searchSelect" slot="prepend" placeholder="请选择">-->
                        <!--<el-option label="姓名" value="1"></el-option>-->
                        <!--<el-option label="性别" value="2"></el-option>-->
                        <!--<el-option label="用户电话" value="3"></el-option>-->
                    <!--</el-select>-->
                    <!--<el-button slot="append" @click="handleSearch"  icon="el-icon-search"></el-button>-->

            </div>
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

        <!-- 筛选 -->
         <div>
        <el-form :inline="true" :model="search">
            <el-form-item label="查询：">
                    <el-input type="search" style="width:100%" placeholder="请输入关键字"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size ="big" icon="el-icon-search" @click='handleSearch()'>查询</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="success" size ="big" @click='handleDownload()' :loading="downloadLoading">导出<i class="el-icon-upload el-icon--right"></i></el-button>
            </el-form-item>

        </el-form>
        </div>

        <el-table
            v-loading="listLoading"
            :data="tables"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row>
            <el-table-column align="center" :label="$t('table.id')" >
                <template slot-scope="scope">
                    {{ scope.$index+1 }}
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
                    <el-button type="primary" plain @click="handleDetail(scope.row)">{{$t('table.detail')}}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分頁-->
        <div class="paginations">
            <el-pagination
                v-if='paginations.total > 0'
                :page-sizes="paginations.page_sizes"
                :page-size="paginations.page_size"
                :layout="paginations.layout"
                :total="paginations.total"
                :current-page.sync='paginations.page_index'
                @current-change='handleCurrentChange'
                @size-change='handleSizeChange'>
            </el-pagination>
        </div>


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
    import {Search, updatePatient} from "../../api/enterprise";
    import {getToken} from "../../utils/auth";

    export default {
        data() {
            return {
                searchInput:'',
                searchSelect:'',
                dialogData:{},
                showEditCase:false,
                dialogFormVisible:false,
                dialogStatus: '',
                textMap: {
                    detail: 'table.detail',
                    create: 'table.add'
                },
                list: [], // all data
                listLoading: true,
                search:{},
                tables:[],

                filterTableData:[],
                downloadLoading: false,

                paginations: {
                    page_index: 1,
                    total: 0,
                    page_size: 5,
                    page_sizes: [5, 10, 15, 20],
                    layout: "total, sizes, prev, pager, next, jumper"
                },

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
            this.fetchData();
            //this.fetchPatientData();
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
                        this.filterTableData = response.data;
                        this.setPaginations();
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

            handleCurrentChange(page) {
                // 当前页
                let sortnum = this.paginations.page_size * (page - 1);
                let table = this.list.filter((item, index) => {
                    return index >= sortnum;
                });
                // 设置默认分页数据
                this.tables = table.filter((item, index) => {
                    return index < this.paginations.page_size;
                });
            },
            handleSizeChange(page_size) {
                // 切换size
                this.paginations.page_index = 1;
                this.paginations.page_size = page_size;
                this.tables = this.list.filter((item, index) => {
                    return index < page_size;
                });
            },
            setPaginations() {
                // 总页数
                this.paginations.total = this.list.length;
                this.paginations.page_index = 1;
                this.paginations.page_size = 5;
                // 设置默认分页数据
                this.tables = this.list.filter((item, index) => {
                    return index < this.paginations.page_size;
                });
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
            handleSearch: function(){
                //window.location.reload()
                this.tmp = this.list
                //过滤关键词 包含_id
                this.tmp = this.tmp.map(item=>{
                    var data = Object.values(item).join()
                    //console.log(data)
                     if( data.indexOf(this.searchInput) !== -1)
                       return item

                        //console.log(Object.values(item).join())

                })
                this.list = this.tmp.filter(d=>d)

                // Search(this.searchSelect,this.searchInput,getToken()).then((response)=>{
                //     this.list = response.data
                //
                // }).catch(()=>{
                //
                // })
                // console.log(this.searchInput + this.searchSelect)
            },

            handleDownload() {
                this.downloadLoading = true
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/vendor/Export2Excel')
                    const tHeader = ['姓名', '电话','性别']
                    const filterVal = ['name', 'tel','gender']
                    const list = this.list
                    const data = this.formatJson(filterVal, list)
                    export_json_to_excel(tHeader, data, '患者列表excel')
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
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
        wdith:1000px;
    }
    .paginations {
        text-align: right;
        margin-top: 10px;
    }
</style>
