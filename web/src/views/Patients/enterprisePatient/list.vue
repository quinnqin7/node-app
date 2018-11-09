<template>
    <div class="app-container">
        <!--todo 搜索 框-->
        <div class="filter-container">
            <div style="margin-top: 15px;">
                <input placeholder="请输入关键词" v-model="searchInput" class="input-with-select" @focus="fetchData"
                       style="float: left;width:200px;height:40px;border-radius: 5px;border: 1px solid #cce5ff;padding: 10px;color:#6cadc8;"
                       v-on:input="handleSearch" v-on:keyup.enter="handleSearch" v-on:keyup.delete="fetchData"/>
            </div>
            <el-button style="margin-left: 10px" type="primary" size="big" icon="el-icon-search"
                       @click='getHistoryCase()'>查询
            </el-button>
            <!--<el-button v-if="roles[0] === '2'" type="success" size ="big" @click='handleDownload()' :loading="downloadLoading">导出<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->

            <a href="#/Edit/Edit">
                <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                >{{ $t('table.add') }}
                </el-button>
            </a>
        </div>


        <!--todo 显示所有列表-->
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
            <el-table-column :label="$t('table.caseDoctor')" align="center">
                <template slot-scope="scope">
                    {{ scope.row.doctorId }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.hisSimple')" align="center">
                <template slot-scope="scope">
                    <template v-if="a = scope.row.mainContent"></template>
                    <span v-html="a.replace(/<img.*\/>/ig, '').replace(/[u4E00-u9FA5]/g,'').substring(0,9)"></span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.suggest')" align="center">
                <template slot-scope="scope">
                    <template v-if="a = scope.row.suggest"></template>
                    <span v-html="a.replace(/<img.*\/>/ig, '').replace(/[u4E00-u9FA5]/g,'').substring(0,9)">{{  }}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.rate')" align="center">
                <template slot-scope="scope">
                    <el-button style="width:50px;height:20px;padding: 0;font-size:12px;" type="info" plain
                               @click="handleLookAccess(scope.row.accessContent)">{{$t('table.lookAccess')}}
                    </el-button>
                    <el-rate
                        v-model="scope.row.rate"
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                    </el-rate>
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" :label="$t('table.setup')" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain @click="handleDetail(scope.row)">{{$t('table.detail')}}</el-button>
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" :label="$t('table.setup')" align="center">
                <template slot-scope="scope">
                    <el-button type="success" plain @click="handleAssess(scope.row)">{{$t('table.assess')}}</el-button>
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
        <!--FIXME 这边有时间在改-->
        <el-dialog class="dialog" :title="$t(textMap[dialogStatus])" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :model="dialogData" label-position="left" label-width="70px" style="width: 100%;">
                <template v-if="dialogStatus === 'detail'">
                    <el-collapse v-model="activeNames"> <!-- @change="handleChange">-->
                        <el-collapse-item :title="$t('table.hisCase')" name="1">
                            <div v-html="dialogData.mainContent"></div>
                        </el-collapse-item>
                        <el-collapse-item :title="$t('table.suggest')" name="2">
                            <div v-html="dialogData.suggest"></div>
                        </el-collapse-item>
                    </el-collapse>
                </template>
                <template v-if="dialogStatus === 'assess'">
                    <tinymce style="margin:0;" :height="300" v-model="content"/>
                    <div class="block" style="float:right;margin-top: 10px">
                        <el-rate
                            v-model="rate"
                            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                        </el-rate>
                    </div>
                </template>
                <template v-if="dialogStatus === 'lookaccess'">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item :title="$t('table.myaccess')" name="1">
                            <div>{{dialogData.access}}</div>
                        </el-collapse-item>
                    </el-collapse>
                </template>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
                <el-button type="primary"
                           @click="dialogStatus==='assess'?assessCase(rate, content,dialogData.doctorId, dialogData._id):updateData()">
                    {{
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
    import {assessCase, getAllRate, getHistoryCase, getOneRate} from "../../../api/patients";
    //import FileSaver from 'file-saver';
    //import XLSX from 'xlsx'
    import Tinymce from './edit/components/Tinymce'

    export default {
        components: {Tinymce},
        data() {
            return {
                watchdog:'0',
                allRate:[],
                content: '',
                rate: null,
                activeNames: ['1'],
                searchInput: '',
                dialogData: {},
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    detail: 'table.detail',
                    create: 'table.add',
                    assess: 'table.assess',
                    lookaccess: 'table.lookAccess'
                },
                excel: [],
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
                getHistoryCase(getToken()).then((response) => {
                    this.list = response.data
                    this.setPaginations()
                    this.listLoading = false

                }).catch(err => {
                    console.log(err)
                })

            },
            fetchOtherData(id) {
                this.listLoading = true
                getOther(id).then(response => {
                    this.dialogData = response.data
                    console.log(this.dialogData)
                    this.listLoading = false
                })
            },
            handleAssess(row) {
                this.resetTemp()
                this.dialogStatus = 'assess'
                this.dialogData = row
                this.content = row.accessContent
                this.dialogFormVisible = true
                this.rate = row.rate
                    this.$nextTick(() => {
                        this.$refs['dataForm'].clearValidate()
                    })
            },
            handleDetail(row) {
                this.dialogFormVisible = true
                this.dialogStatus = 'detail'
                this.dialogData = row
                // this.fetchOtherData(row._id)
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
                // this.$refs['dataForm'].validate((valid) => {
                //     if (valid) {
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

                // }
                // })
                this.dialogFormVisible = false
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
                const {export_json_to_excel} = require('@/vendor/Export2Excel')
                const tHeader = ['姓名', '电话', '病例', '诊断建议', '时间']
                const filterVal = ['name', 'tel', 'mainContent', 'suggest', 'time']
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
            assessCase(rate, content, doctorId, id) {
                assessCase(rate, content, doctorId, id).then((response) => {
                    //console.log(response.data)
                    this.$notify({
                        title: '评价',
                        message: response.data.success,
                        type: 'success',
                        duration: 1000
                    })
                    this.content = null
                    this.dialogFormVisible = false
                }).catch(err => {
                    this.$notify({
                        title: '评价',
                        message: err.response.data,
                        type: 'error',
                        duration: 1000
                    })
                    //console.log(err.response.data)
                })
                //console.log(rate+content+id+doctorId)
            },
            // getRate(caseId) {
            //         console.log(caseId)
            //     this.allRate.forEach(data=>{
            //         if(data._id === caseId)
            //         {
            //             var test = {
            //                 "a":data.rate,
            //                 "b":data.content
            //             }
            //             return test
            //         }
            //     })
            // },
            // getAllRate(){
            //     getAllRate().then((response) => {
            //         this.allRate = response.data
            //         this.watchdog= '1'
            //         console.log(this.allRate)
            //     }).catch(err => {
            //         console.log(err)
            //     })
            // },
            handleLookAccess(access) {
                this.dialogStatus = 'lookaccess'
                this.$alert(access,"查看评价", {
                    dangerouslyUseHTMLString: true
                });
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

    .paginations {
        text-align: right;
        margin-top: 10px;
    }

</style>
