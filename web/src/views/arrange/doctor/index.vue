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

        <el-button  class="filter-item" style="margin:0 10px 10px 0;float: right" type="primary" icon="el-icon-edit" @click="handleCreateSchedu">{{ $t('table.add') }}</el-button>
        <el-table
            :data="list"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item :label="$t('table.domain')">
                            <!--<template slot-scope="scope">{{getEnterprise(scope.row.enterpriseId)}}</template>-->
                            <span>
                                {{ props.row.name }}
                            </span>
                        </el-form-item>
                        <el-form-item :label="$t('table.address')">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('table.enterpriseCategory')">
                            <span>{{ props.row.enterpriseCategory }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('table.frequency')">
                            <span>{{ props.row.frequency }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('table.numberOfPeople')">
                            <span>{{ props.row.numberOfPeople }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('table.specialHarm')">
                            <span>{{ props.row.specialHarm }}</span>
                        </el-form-item>
                        <el-form-item :label="$t('table.tel')">
                            <span>{{ props.row.tel }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                :label="$t('table.startTime')"
                prop="startTime">
            </el-table-column>
            <el-table-column
                :label="$t('table.endTime')"
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
    //import { getList } from '@/api/enterprise'
    import {getDoctorAndServiceTime} from "../../../api/enterprise";
    import {getToken} from "../../../utils/auth";
    import {DoctorTogetDoctorAndServiceTime, DoctorToGetEnterprise} from "../../../api/doctor";

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
                    //console.log(response)
                    this.list = response.data
                    var enterpriseIdArray = this.list.map(data=>{
                        return data.enterpriseId
                    })
                    //console.log(enterpriseIdArray)
                    DoctorToGetEnterprise(enterpriseIdArray).then(response=>{
                        var hhh = this.list.map(data=>{
                            for(var i = 0;i< response.data.length;i++)
                            {
                                if(data.enterpriseId === response.data[i]._id){
                                    return Object.assign(data,response.data[i])
                                }
                            }
                        })
                        // console.log(response.data)
                        // console.log('合并之后的数据')
                        // console.log(hhh)
                        this.list = hhh
                    })
                    this.listLoading = false
                })
            },
            getEnterprise(enterpriseId){
                if(enterpriseId==='')
                {
                    return '无'
                }
                else{
                    return '是'
                }

            },
            handleCreateSchedu(){
                this.dialogFormVisible=true
            }
        }
    }
</script>
