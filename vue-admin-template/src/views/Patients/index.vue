<template>
    <div class="app-container">
        <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row>
            <el-table-column align="center" label="ID" width="95">
                <template slot-scope="scope">
                    {{ scope.$index }}
                </template>
            </el-table-column>
            <el-table-column label="Name" width="110" align="center">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column label="Tel" width="110" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.tel }}</span>
                </template>
            </el-table-column>
            <el-table-column label="gender" width="110" align="center">
                <template slot-scope="scope">
                    {{ msg = scope.row.gender==='1'?'nv':'nan' }}
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="" width="110" align="center">
                <template slot-scope="scope">
                    <el-button  @click="setUpDetail(scope.row)">DETAIL</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog :title="hahahah" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :rules="rules" :model="patientData" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
                <el-form-item :label="hahahahahaha" prop="type">
                    {{patientData.name}}
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
                <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
            </div>
        </el-dialog>




    </div>
</template>

<script>
    import {getPatients, getPatient} from '@/api/enterprise'
    import Dialog from './commponents/Dialog'

    export default {
        data() {
            return {
                patientData:"",
                dialogFormVisible:false,
                patientId: "",
                list: null, // all data
                listLoading: true,
                dialog: {
                    show: false,
                    title: "",
                    option: "edit"
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
            Dialog
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.listLoading = true
                getPatients().then(response => {
                    this.list = response.data
                    this.listLoading = false
                })
            },
            setUpDetail(row) {
                this.dialogFormVisible = true
                this.patientId = row._id
                console.log(this.patientId)
            },
            fetchPatientData(){
                this.listLoading = true
                getPatient(this.patientId).then(response => {
                    this.patientData = response.data
                    this.listLoading = false
                })
            }

        }
    }
</script>
