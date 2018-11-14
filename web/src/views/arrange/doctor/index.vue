<template>
    <div class="app-container">
        <!--<el-table-->
            <!--v-loading="listLoading"-->
            <!--:data="list"-->
            <!--element-loading-text="Loading"-->
            <!--border-->
            <!--fit-->
            <!--highlight-current-row>-->
            <!--<el-table-column align="center" label="ID" width="95">-->
                <!--<template slot-scope="scope">-->
                    <!--{{ scope.$index }}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="Title">-->
                <!--<template slot-scope="scope">-->
                    <!--{{ scope.row.title }}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="Author" width="110" align="center">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.author }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="Pageviews" width="110" align="center">-->
                <!--<template slot-scope="scope">-->
                    <!--{{ scope.row.pageviews }}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column class-name="status-col" label="Status" width="110" align="center">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" prop="created_at" label="Display_time" width="200">-->
                <!--<template slot-scope="scope">-->
                    <!--<i class="el-icon-time"/>-->
                    <!--<span>{{ scope.row.display_time }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
        <!--</el-table>-->

        <el-button  class="filter-item" style="margin:0 10px 10px 0;float: right" type="primary" icon="el-icon-edit" @click="dialogFormVisible=true">{{ $t('table.add') }}</el-button>
        <el-table
            :data="list"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item :label="$t('table.domain')">
                            <!--<template slot-scope="scope">{{getEnterprise(scope.row.enterpriseId)}}</template>-->
                            <span>
                                {{ props.row.name?props.row.name:$t('enterprise.none') }}
                            </span>
                        </el-form-item>
                        <br />
                        <el-form-item :label="$t('table.address')">
                            <span>{{ props.row.address?props.row.address:$t('enterprise.none') }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('table.enterpriseCategory')">
                            <span>{{ props.row.enterpriseCategory?props.row.enterpriseCategory:$t('enterprise.none') }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('table.frequency')">
                            <span>{{ props.row.frequency?props.row.frequency:$t('enterprise.none') }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('table.numberOfPeople')">
                            <span>{{ props.row.numberOfPeople?props.row.numberOfPeople:$t('enterprise.none') }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('table.specialHarm')">
                            <span>{{ props.row.specialHarm?props.row.specialHarm:$t('enterprise.none') }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('table.tel')">
                            <span>{{ props.row.tel?props.row.tel:$t('enterprise.none') }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                :label="$t('table.startTime')"
                prop="startTime"
                :formatter="dateFormat"
                sortable>
            </el-table-column>
            <el-table-column
                :label="$t('table.endTime')"
                :formatter="dateFormat"
                prop="endTime">
            </el-table-column>
            <el-table-column
                :label="$t('table.isAppointmant')"
                >
                <!--<template>{{getEnterprise}}</template>-->
                <template slot-scope="scope">{{getEnterprise(scope.row.enterpriseId)}}</template>
            </el-table-column>
        </el-table>

        <el-dialog class="dialog" :title="schedule" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm"  :model="dialogData" label-position="left" label-width="70px" style="width: 100%;">
                <el-form-item :label="$t('table.startTime')" prop="type">
                    <el-date-picker
                        v-model="starttime"
                        type="datetime"
                        placeholder="选择日期时间"
                        align="right"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('table.endTime')" prop="type">
                    <el-date-picker
                        v-model="endtime"
                        type="datetime"
                        placeholder="选择日期时间"
                        align="right"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <!--<el-form-item :label="$t('table.enterpriseCategory')" prop="type">-->
                    <!--<el-input :disabled="true" v-model="dialogData.enterpriseCategory"/>-->
                <!--</el-form-item>-->
                <!--<el-form-item :label="$t('table.frequency')" prop="type">-->
                    <!--<el-input :disabled="true" v-model="dialogData.frequency"/>-->
                <!--</el-form-item>-->
                <!--<el-form-item :label="$t('table.numberOfPeople')" prop="type">-->
                    <!--<el-input :disabled="true" v-model="dialogData.numberOfPeople"/>-->
                <!--</el-form-item>-->
                <!--<el-form-item :label="$t('table.specialHarm')" prop="type">-->
                    <!--<el-input :disabled="true" v-model="dialogData.specialHarm"/>-->
                <!--</el-form-item>-->

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCreateSchedule">{{ $t('table.confirm') }}</el-button>
                <!--<el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>-->
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import {getToken} from "../../../utils/auth";
    import {CreateSchedule, DoctorTogetDoctorAndServiceTime, DoctorToGetEnterprise} from "../../../api/doctor";
    import {dateFormat} from "../../../utils/dateFormat";

    const jwt = require('jsonwebtoken');
    export default {
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
        data() {
            return {
                dateFormat:dateFormat,
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                starttime:new Date(),
                endtime:new Date(),
                schedule:'班表',
                dialogData:{},
                dialogFormVisible:false,
                list: null,
                listLoading: false
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.listLoading = true
                DoctorTogetDoctorAndServiceTime(jwt.decode(getToken()).id).then(response => {
                    // console.log('返回的 合并之前list 数据')
                    //console.log(response.data)
                    this.list = response.data
                    var enterpriseIdArray = this.list.map(data=>{
                        // if(data.enterpriseId!=='')
                        return data.enterpriseId
                    })

                    DoctorToGetEnterprise(enterpriseIdArray.filter(f=>f)).then(response=>{
                        // console.log('返回的企业数据')
                        // console.log(response.data)
                        // console.log('现在的 list 数据')
                        // console.log(this.list)
                        //合并 数据  要出错也是这里出错
                        var mergeData = this.list.map(data=>{
                            for(let i = 0;i< response.data.length;i++)
                            {
                                if(data.enterpriseId === response.data[i]._id){
                                    return Object.assign(data,response.data[i]) //哼合并
                                }
                                if(data.enterpriseId==='')
                                    return data
                            }
                        })
                        // console.log(response.data)
                        //
                        //     console.log('合并之后list的数据')
                        //  console.log(hhh)
                        this.list = mergeData //.filter(f=>f)
                    })
                    this.listLoading = false
                })
            },
            getEnterprise(enterpriseId){
                if(enterpriseId==='')
                {
                    return "無"
                }
                else{
                    return '是'
                }

            },
            handleCreateSchedule(){
                //console.log(this.starttime + this.endtime)

                CreateSchedule(this.starttime,this.endtime,jwt.decode(getToken()).id).then(()=>{
                    this.$notify({
                        title: '添加',
                        message: '添加成功',
                        type: 'success',
                        duration: 2000
                    })
                }).catch(err=>{
                    this.$notify({
                        title: '添加',
                        message: '添加失败',
                        type: 'error',
                        duration: 2000
                    })
                })
                    //window.location.reload()
                this.dialogFormVisible=false
            }
        }
    }
</script>
