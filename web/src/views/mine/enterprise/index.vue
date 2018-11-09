<template>
    <div class="app-container">
        <div class="main-content">
        <el-form label-position="left" label-width="100px" :rules="rules" :model="list">
            <el-card>
                <h4>企業檔案</h4>
            <el-form-item :label="$t('table.domain')" prop="name">
                <el-input v-model="list.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.tel')" prop="tel">
                <el-input v-model="list.tel"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.demandPerfession')" prop="demandPerfession">
                <el-select v-model="list.demandPerfession" placeholder="请选择医师专业类别">
                    <el-option label="职业医师" value="职业医师"></el-option>
                    <el-option label="家庭医师" value="家庭医师"></el-option>
                </el-select>
                <!--<el-input v-model="list.demandPerfession"></el-input>-->
            </el-form-item>
                <el-form-item :label="$t('table.enterpriseCategory')" prop="enterpriseCategory" >
                    <el-select v-model="list.enterpriseCategory" placeholder="请选择事业类别">
                        <el-option value="第一类"></el-option>
                        <el-option value="第二类"></el-option>
                        <el-option value="第三类"></el-option>
                    </el-select>
                    <!--<el-input v-model="list.enterpriseCategory"></el-input>-->
                </el-form-item>
            <el-form-item :label="$t('table.frequency')" prop="frequency">
                <el-select v-model="list.frequency" placeholder="所需服务频率（次/月）" >
                    <el-option
                        v-for="n in 18"
                        :key="n"
                        :value="n">
                    </el-option>
                </el-select>
                <!--<el-input v-model="list.frequency"></el-input>-->
            </el-form-item>
            <el-form-item :label="$t('table.specialHarm')" prop="specialHarm">
                <el-input v-model="list.specialHarm"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.numberOfPeople')" prop="numberOfPeople">
                <el-input v-model="list.numberOfPeople"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.address')" prop="address">
                <el-input v-model="list.address"></el-input>
            </el-form-item>
            <!--<el-form-item :label="$t('table.email')">-->
            <!--<el-input v-model="list.email"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="$t('table.pwd')">-->
            <!--<el-input v-model="list.pwd"></el-input>-->
            <!--</el-form-item>-->
                <el-button style="float:right;margin-bottom: 30px" type="primary" @click=modify()>{{ $t('table.modify')}}
                </el-button>
            </el-card>
        </el-form>


    </div>
    </div>
</template>

<script>
    import {getDoctorInfo, modifyDoctorInfo} from "../../../api/doctor";
    import {getToken} from "../../../utils/auth";
    import {getEnterpriseInfo, modifyEnterpriseInfo} from "../../../api/enterprise";

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
                list: {},
                listLoading: false,
                rules :{
                    name: [
                        { required: true, message: '請輸入姓名', trigger: 'blur' },
                    ],
                    tel: [
                        { required: true, message: '請輸入電話', trigger: 'blur' },
                    ],
                    demandPerfession:[
                        { required: true, message: '請選擇醫師專業類別', trigger: 'blur' },
                    ],
                    frequency:[
                        { required: true, message: '請輸入服務頻率', trigger: 'blur' },
                    ],
                    specialHarm:[
                        { required: true, message: '請輸入內容', trigger: 'blur' },
                    ],
                    numberOfPeople:[
                        { required: true, message: '請輸入待診人數', trigger: 'blur' },
                    ],
                    enterpriseCategory:[
                        { required: true, message: '請選擇事業類別', trigger: 'blur' },
                    ],
                    address:[
                        { required: true, message: '請輸入地址', trigger: 'blur' },
                    ]

                }
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.listLoading = true
                getEnterpriseInfo(jwt.decode(getToken()).id).then(response => {
                    console.log(response)
                    this.list = response.data
                    this.listLoading = false
                })
            },
            modify() {
                modifyEnterpriseInfo(this.list).then(()=> {
                    this.$notify({
                        title: "成功",
                        message: '修改成功',
                        type: 'success',
                        duration: 2000
                    })
                    window.location.reload()
                }).catch(()=>{
                    this.$notify({
                        title: "失败",
                        message: '修改失败',
                        type: 'error',
                        duration: 2000
                    })
                })
            }
        }
    }
</script>

<style>
    .main-content{
        /*position: center;*/
        margin:0 15px;
        width: 50%;
        margin-left: 260px;
    }
</style>
