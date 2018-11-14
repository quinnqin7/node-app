<template>
    <div class="app-container">
        <div class="filter-container">
            <div style="margin-top: 15px;">
                <input placeholder="请输入关键词"   v-model="searchInput" class="input-with-select" @focus="fetchData"
                       style="float: left;width:200px;height:40px;border-radius: 5px;border: 1px solid #cce5ff;padding: 10px;color:#6cadc8;"
                          v-on:input="handleSearch" v-on:keyup.enter="handleSearch" v-on:keyup.delete="fetchData" />
            </div>
            <el-button style="margin-left: 10px" type="primary" size ="big" icon="el-icon-search" @click='getHistoryCase()'>查询</el-button>
            <el-button v-if="roles[0] === '2'" type="success" size ="big" @click='handleDownload()' :loading="downloadLoading">导出<i class="el-icon-upload el-icon--right"></i></el-button>

            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                       @click="handleCreate">{{ $t('table.add') }}
            </el-button>
        </div>

        <el-table
            v-loading="listLoading"
            :data="tables"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
            :header-cell-style="{
                background:'#fafafa',
                color: 'rgb(89, 88, 88)'}
            ">
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

        <!--:fullscreen=fus-->
        <el-dialog fullscreen=fus class="dialog" :title="$t(textMap[dialogStatus])" :visible.sync="dialogFormVisible">

            <el-form :label-position="labelPosition"  ref="dataForm" :model="dialogData" label-position="left" label-width="70px" style="width:100% !important;">
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
                <el-form-item   v-show="showEditCase" :label="$t('table.case')" style="margin-top:20px;">

                    <tinymce style="margin:0;" :height="300" v-model="dialogData.mainContent"/>

                </el-form-item>
                <el-form-item v-show="showEditCase" :label="$t('table.suggest')">
                    <tinymce style="margin:0;" :height="300" v-model="dialogData.suggest"/>
                </el-form-item>
                <el-collapse v-model="activeName">
                    <!--<template v-if="a = scope.row.mainContent"></template>-->
                    <!--<span v-html="a.replace(/<img.*\/>/ig, '').replace(/[u4E00-u9FA5]/g,'').substring(0,9)"></span>-->
                    <el-collapse-item :key="index" v-for="(h,index) in dialogData.his" :name=index+1 >

                        <template slot="title">
                            <center>
                            {{moment(h.time).format("YYYY-MM-DD")}}
                            {{h.name?h.name:$t('comm.clickToKnowDoctorName')}}
                            <i class="header-icon el-icon-info"></i>
                            </center>
                        </template>

                        <el-button type="success" round plain @click="printdata(h.mainContent)">打印病歷</el-button>
                        <el-button type="info" round plain @click="printdata(h.suggest)">打印診斷建議</el-button>
                        <el-button type="warning" round plain @click="printdata(h.mainContent +'<br />'+ h.suggest)">全部打印</el-button>
                        <center><h1>{{$t('table.hisCase')}}</h1></center>
                        <div v-html="h.mainContent"></div>
                        <center><h1>{{$t('table.suggest')}}</h1></center>
                        <div v-html="h.suggest"></div>
                    </el-collapse-item>

                </el-collapse>
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
    import {getDoctorName, getHistory, getHistory2, Search, updatePatient} from "../../api/enterprise";
    import {getToken} from "../../utils/auth";
    import Tinymce from './enterprisePatient/edit/components/Tinymce'
    //import FileSaver from 'file-saver';
    //import XLSX from 'xlsx'
    import moment from 'moment'
    export default {
        components: {Tinymce},
        data() {
            return {
                displayed:false,
                moment:moment,
                fus:'true',
                ls:[],
                activeName:['1'],
                labelPosition:'top',
                searchInput: '',
                searchSelect: '',
                dialogData: {},
                showEditCase: false,
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    detail: 'table.detail',
                    create: 'table.add'
                },
                excel:[],
                list: [], // all data
                listLoading: true,
                search: {},
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
            printdata(content){
                //let subOutputRankPrint = document.getElementById('hhh');
                //console.log(subOutputRankPrint.innerHTML);
                //let newContent =subOutputRankPrint.innerHTML;
                let oldContent = document.body.innerHTML;
                document.body.innerHTML = content;
                window.print();
                window.location.reload();
                document.body.innerHTML = oldContent;
                return false;
            },
            async fetchData() {
                this.listLoading = true
                if (this.roles[0] === '1') {
                    await doctorToGetPatients(this.$route.params.enterpriseId).then(response => {
                        this.list = response.data
                        this.listLoading = false
                        this.handleSearch()
                        this.setPaginations()
                    })

                } else {
                    getPatients().then(response => {
                        this.list = response.data
                        this.listLoading = false
                        this.handleSearch()
                        this.setPaginations();
                    })
                }
            },
            async fetchPatientData(id) {
                this.listLoading = true
                await getPatient(id).then(response => {
                    this.dialogData = response.data
                    console.log(this.dialogData)
                    this.listLoading = false

                })

                await getDoctorName().then((response)=>{
                    //console.log(response.data)
                    //return response.data
                    var jj=this.dialogData
                    var haha  = response.data.filter(item=>{
                            for(var j = 0;j< jj.his.length;j++){
                                if(item._id === jj.his[j].doctorId)
                                {
                                    var en = {name :item.name}
                                    Object.assign(jj.his[j],en)
                                    //this.ls.push(this.dialogData)
                                    //return this.refuseData[i]
                                    //console.log(item.name)
                                   // console.log('哈哈哈哈')
                                }
                        }
                    })
                    this.dialogData = jj
                    console.log(jj)
                    //this.refuseData = response.data
                    //this.refuseData = haha.filter(f=>f)
                    // console.log(this.refuseData)
                    //this.ls.push(this.dialogData)
                   // console.log(this.ls)
                    //this.list = this.ls
                    //this.setPaginations()
                }).catch(err=>{
                    console.log(err)
                })
            },
            handleCreate() {
                this.resetTemp()
                this.showEditCase = false
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            handleDetail(row) {
                this.showEditCase = true
                if (this.roles[0] === '2') {
                    this.showEditCase = false //企业 无法添加病例
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
                        if (this.roles[0] === '1') {
                            createPatient(this.dialogData, this.$route.params.enterpriseId).then(() => {
                                this.dialogFormVisible = false
                                this.$notify({
                                    title: '成功',
                                    message: '创建成功',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.showEditCase = true
                                this.handleDetail()
                            })
                        }
                        else {
                            createPatient(this.dialogData, jwt.decode(getToken()).id).then(() => {
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

            //筛选
            // handleSearch(){
            //     console.log(1);
            //     // if(!this.search){
            //     //     this.$message({
            //     //         type: "warning",
            //     //         message: "请输入关键字"
            //     //     });
            //     //     this.fetchData();
            //     //     return;
            //     // }
            //     // const search = this.search;
            //     // this.list = this.filterTableData.filter(item => {
            //     //     console.log(item);
            //     //
            //     // });
            //     //
            //     // //this.setPaginations();
            // },

            // FIXME 在传输需要修改的数据的时候, 重复传输了大量的病例
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        if (this.roles[0] === '1') {
                            updatePatient(this.dialogData, this.$route.params.enterpriseId, jwt.decode(getToken()).id).then(() => {
                                console.log(this.$route.params.enterpriseId)
                                this.dialogFormVisible = false
                                this.$notify({
                                    title: '成功',
                                    message: '编辑成功',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.showEditCase = true
                            })
                        }
                        else if (this.roles[0] === '2') {
                            updatePatient(this.dialogData, jwt.decode(getToken()).id, "").then(() => {
                                this.dialogFormVisible = false
                                this.$notify({
                                    title: '成功',
                                    message: '编辑成功',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.showEditCase = true
                            })
                        }

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

                    //console.log(Object.values(item).join())

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
                // })
                //延时 提取 确保 数据 完整 但是不用了 ,
                // setTimeout(require.ensure([], () => {
                //     const { export_json_to_excel } = require('@/vendor/Export2Excel')
                //     const tHeader = ['姓名', '病例','诊断建议','时间']
                //     const filterVal = ['name', 'mainContent','suggest','time']
                //     const list = this.excel
                //     const data = this.formatJson(filterVal, list)
                //     export_json_to_excel(tHeader, data, '患者列表excel')
                //     this.downloadLoading = false
                // }),2000)
                //window.location.reload()
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            //异步 获取 超级 恐怖
            // getHistoryCase(){
            //     this.list.map(item=>{
            //         // console.log(item._id)
            //         // console.log(jwt.decode(getToken()).id)
            //         getHistory(item._id,jwt.decode(getToken()).id).then(response=>{
            //             //console.log(item.name+"  "+response.data)
            //             response.data.map(one=>{
            //                 var oneObj = {
            //                     name:item.name,
            //                     tel:item.tel,
            //                     mainContent:one.mainContent,
            //                     suggest:one.suggest,
            //                     time:one.time
            //                 }
            //                 this.excel.push(oneObj)
            //                 // console.log(item.name + "" +one.mainContent + "   " +one.suggest+"" +one.time)
            //             })
            //         })
            //     })
            //     console.log(this.excel)
            // }
            getHistoryCase(){
                var patientIdArray = this.list.map(item=>{
                    // console.log(item._id)
                    // console.log(jwt.decode(getToken()).id)
                    return item._id

                })
                getHistory2(patientIdArray,jwt.decode(getToken()).id).then(response=>{
                    //console.log(item.name+"  "+response.data)
                    // response.data.map(one=>{
                    //     var oneObj = {
                    //         name:item.name,
                    //         tel:item.tel,
                    //         mainContent:one.mainContent,
                    //         suggest:one.suggest,
                    //         time:one.time
                    //     }
                    //     this.excel.push(oneObj)
                    //     // console.log(item.name + "" +one.mainContent + "   " +one.suggest+"" +one.time)
                    // })
                    console.log(response.data)
                    this.list.map(item=>{
                        response.data.map(data=>{
                            if(item._id === data.patientId){
                                var oneObj = {
                                            name:item.name,
                                            tel:item.tel,
                                            mainContent:data.mainContent,
                                            suggest:data.suggest,
                                            time:data.time,
                                        }
                                this.excel.push(oneObj)
                            }
                        })
                    })
                }).catch(err=>{
                    console.log(err)
                })
                 console.log(this.excel)
            }

        }

    }
</script>
<style scoped>

    .filter-item {
        float: right;
        margin-bottom: 15px;
    }

    .dialog {
        /*!*wdith: 1000px;*!*/
        /*margin:0 15px;*/
        /*!*width: 40%;*!*/
        /*margin-top: 20px;*/
        /*margin-left: 350px;*/
    }

    .paginations {
        text-align: right;
        margin-top: 10px;
    }
</style>
