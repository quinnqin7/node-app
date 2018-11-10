<template>
    <div class="app-container">
        <!--todo 搜索 框-->
        <div class="filter-container">
            <div style="margin-top: 15px;">
                <input placeholder="请输入关键词"   v-model="searchInput" class="input-with-select" @focus="fetchData"
                       style="float: left;width:200px;height:40px;border-radius: 5px;border: 1px solid #cce5ff;padding: 10px;color:#6cadc8;"
                       v-on:input="handleSearch" v-on:keyup.enter="handleSearch" v-on:keyup.delete="fetchData" />
            </div>
            <el-button style="margin-left: 10px" type="primary" size ="big" icon="el-icon-search" @click='getHistoryCase()'>查询</el-button>
            <!--<el-button v-if="roles[0] === '2'" type="success" size ="big" @click='handleDownload()' :loading="downloadLoading">导出<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->

            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                       @click="handleCreate">{{ $t('table.add') }}
            </el-button>
        </div>


        <!--todo 显示所有列表-->
        <el-table
            v-loading="listLoading"
            :data="tables"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
            :header-cell-style="{
                background:'#fafafa',
                color: 'rgb(89, 88, 88)'}">
            <el-table-column align="center" :label="$t('table.id')">
                <template slot-scope="scope">
                    {{ scope.$index+1 }}
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
            <el-table-column :label="$t('table.gender')" align="center">
                <template slot-scope="scope">
                    <!--{{ msg = scope.row.gender==='1'?$t('table.gender-ms'):$t('table.gender-mr') }}-->
                    {{scope.row.gender}}
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" :label="$t('table.setup')" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain @click="handleDetail(scope.row)">{{$t('table.detail')}}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- todo 分页-->
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

<!--todo 弹窗-->
        <el-dialog class="dialog" :title="$t(textMap[dialogStatus])" :visible.sync="dialogFormVisible">

            <el-form ref="dataForm" :model="dialogData" label-position="left" label-width="70px" style="width: 100%;">
                <el-form-item :label="$t('table.name')" prop="type">
                    <el-input v-model="dialogData.name"/>
                </el-form-item>
                <el-form-item :label="$t('table.tel')" prop="type">
                    <el-input v-model="dialogData.tel"/>
                </el-form-item>
                <el-form-item :label="$t('table.gender')" prop="type">
                    <el-radio-group v-model="dialogData.gender">
                        <el-radio label="女">女</el-radio>
                        <el-radio label="男">男</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{
                    dialogStatus==='create'?$t('table.next'):$t('table.confirm') }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getPatients, getPatient, createPatient} from '@/api/enterprise'
    import {mapGetters} from 'vuex'
    import {doctorToGetPatients} from '@/api/doctor'
    import jwt from 'jsonwebtoken'
    import {getHistory, getHistory2, Search, updatePatient} from "@/api/enterprise";
    import {getToken} from "@/utils/auth";
    //import FileSaver from 'file-saver';
    //import XLSX from 'xlsx'

    export default {
        data() {
            return {
                searchInput: '',
                dialogData: {},
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    detail: 'table.detail',
                    create: 'table.add'
                },
                excel:[],
                list: [], // all data
                listLoading: true,
                tables: [],
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
        comments: {},
        created() {
            this.fetchData();
            //this.fetchPatientData();
        },
        computed: {
            ...mapGetters([
                'name',
                'roles'
            ])
        },

        methods: {
            fetchData() {
                this.listLoading = true
                this.list=[
                    {
                        name:'郭佳堃',
                        tel:'18020748373',
                        gender:'男',
                    },
                    {
                        name:'郭佳堃',
                        tel:'18020748373',
                        gender:'男',
                    },
                    {
                        name:'郭佳堃',
                        tel:'18020748373',
                        gender:'男',
                    },
                    {
                        name:'郭佳堃',
                        tel:'18020748373',
                        gender:'男',
                    },
                    {
                        name:'郭佳堃',
                        tel:'18020748373',
                        gender:'男',
                    },
                    {
                        name:'郭佳堃',
                        tel:'18020748373',
                        gender:'男',
                    },
                    {
                        name:'郭佳堃',
                        tel:'18020748373',
                        gender:'男',
                    },
                    {
                        name:'郭佳堃',
                        tel:'18020748373',
                        gender:'男',
                    },
                    {
                        name:'郭佳',
                        tel:'18020748373',
                        gender:'男',
                    },
                    {
                        name:'朱清雯',
                        tel:'871779755',
                        gender:'女',
                    },
                ]
                this.setPaginations()
                this.listLoading = false
            },
            fetchOtherData(id) {
                this.listLoading = true
                getOther(id).then(response => {
                    this.dialogData = response.data
                    console.log(this.dialogData)
                    this.listLoading = false
                })
            },
            handleCreate() {
                this.resetTemp()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleDetail(row) {
                this.dialogFormVisible = true
                this.dialogStatus = 'detail'
                this.fetchOtherData(row._id)
            },
            resetTemp() {
                this.dialogData = {
                    //在这里面写 (创建)弹窗 初始化
                }
            },
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        // if (this.roles[0] === '1') {
                        //     createPatient(this.dialogData, this.$route.params.enterpriseId).then(() => {
                        //         this.dialogFormVisible = false
                        //         this.$notify({
                        //             title: '成功',
                        //             message: '创建成功',
                        //             type: 'success',
                        //             duration: 2000
                        //         })
                        //         this.showEditCase = true
                        //         this.handleDetail()
                        //     })
                        // }
                        // else {
                        //     createPatient(this.dialogData, jwt.decode(getToken()).id).then(() => {
                        //         this.dialogFormVisible = false
                        //         this.$notify({
                        //             title: '成功',
                        //             message: '创建成功',
                        //             type: 'success',
                        //             duration: 2000
                        //         })
                        //     })
                        // }
                    }
                })
            },
            handleCurrentChange(page) {
                // 当前页
                let sortnum = this.paginations.page_size * (page - 1);
                let table = this.list.filter((item, index) => {   //
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
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        // if (this.roles[0] === '1') {
                        //     updatePatient(this.dialogData, this.$route.params.enterpriseId, jwt.decode(getToken()).id).then(() => {
                        //         console.log(this.$route.params.enterpriseId)
                        //         this.dialogFormVisible = false
                        //         this.$notify({
                        //             title: '成功',
                        //             message: '编辑成功',
                        //             type: 'success',
                        //             duration: 2000
                        //         })
                        //         this.showEditCase = true
                        //     })
                        // }
                        // else if (this.roles[0] === '2') {
                        //     updatePatient(this.dialogData, jwt.decode(getToken()).id, "").then(() => {
                        //         this.dialogFormVisible = false
                        //         this.$notify({
                        //             title: '成功',
                        //             message: '编辑成功',
                        //             type: 'success',
                        //             duration: 2000
                        //         })
                        //         this.showEditCase = true
                        //     })
                        // }

                    }
                })
            },
            handleSearch: function () {
                //window.location.reload()
                this.tmp = this.list
                //过滤关键词 包含_id
                this.tmp = this.tmp.map(item => {
                    var data = Object.values(item).join()
                    //console.log(data)
                    if (data.indexOf(this.searchInput) !== -1)
                        return item
                })
                this.list = this.tmp.filter(d => d)
                this.setPaginations()
                // 这个是从数据库里边获取筛选
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
                this.getHistoryCase()
                // require.ensure([], () => {
                const { export_json_to_excel } = require('@/vendor/Export2Excel')
                const tHeader = ['姓名','电话' ,'病例','诊断建议','时间']
                const filterVal = ['name','tel', 'mainContent','suggest','time']
                const list = this.excel
                const data = this.formatJson(filterVal, list)
                export_json_to_excel(tHeader, data, '患者列表excel')
                this.downloadLoading = false
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
           // getHistoryCase(){
                // var patientIdArray = this.list.map(item=>{
                //     // console.log(item._id)
                //     // console.log(jwt.decode(getToken()).id)
                //     return item._id
                //
                // })
                // getHistory2(patientIdArray,jwt.decode(getToken()).id).then(response=>{
                //     //console.log(item.name+"  "+response.data)
                //     // response.data.map(one=>{
                //     //     var oneObj = {
                //     //         name:item.name,
                //     //         tel:item.tel,
                //     //         mainContent:one.mainContent,
                //     //         suggest:one.suggest,
                //     //         time:one.time
                //     //     }
                //     //     this.excel.push(oneObj)
                //     //     // console.log(item.name + "" +one.mainContent + "   " +one.suggest+"" +one.time)
                //     // })
                //     console.log(response.data)
                //     this.list.map(item=>{
                //         response.data.map(data=>{
                //             if(item._id === data.patientId){
                //                 var oneObj = {
                //                     name:item.name,
                //                     tel:item.tel,
                //                     mainContent:data.mainContent,
                //                     suggest:data.suggest,
                //                     time:data.time,
                //                 }
                //                 this.excel.push(oneObj)
                //             }
                //         })
                //     })
                // }).catch(err=>{
                //     console.log(err)
                // })
                // console.log(this.excel)
            //}
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

    .paginations {
        text-align: right;
        margin-top: 10px;
    }
</style>
