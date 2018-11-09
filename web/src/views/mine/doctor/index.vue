<template>
    <div class="app-container">
        <div class="main-content">
        <el-form label-position="left" label-width="100px" :rules="rules" :model="list">
            <el-card>
                <h4>醫師個人檔案</h4>
            <el-form-item :label="$t('table.name')" prop="name">
                <el-input v-model="list.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.tel')" prop="tel">
                <el-input v-model="list.tel"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.address')" prop="address">
                <el-input v-model="list.address"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.perfession')" prop="perfession">
                <el-select v-model="list.perfession" placeholder="请选择专业类别">
                    <el-option label="职业医师" value="职业医师"></el-option>
                    <el-option label="家庭医师" value="家庭医师"></el-option>
                </el-select>
                <!--<el-input v-model="list.perfession"></el-input>-->
            </el-form-item>
            <el-form-item :label="$t('table.frequency')" prop="frequency">
                <el-select v-model="list.frequency" placeholder="可服务频率（次/月）">
                    <el-option value="1"></el-option>
                    <el-option value="2"></el-option>
                    <el-option value="3"></el-option>
                    <el-option value="4"></el-option>
                    <el-option value="5"></el-option>
                    <el-option value="6"></el-option>
                    <el-option value="7"></el-option>
                    <el-option value="8"></el-option>
                    <el-option value="9"></el-option>
                    <el-option value="10"></el-option>
                    <el-option value="11"></el-option>
                    <el-option value="12"></el-option>
                    <el-option value="13"></el-option>
                    <el-option value="14"></el-option>
                    <el-option value="15"></el-option>
                    <el-option value="16"></el-option>
                    <el-option value="17"></el-option>
                    <el-option value="18"></el-option>
                </el-select>
                <!--<el-input v-model="list.frequency"></el-input>-->
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
                    perfession:[
                        { required: true, message: '請選擇專業類別', trigger: 'blur' },
                    ],
                    frequency:[
                        { required: true, message: '請輸入服務頻率', trigger: 'blur' },
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
                getDoctorInfo(jwt.decode(getToken()).id).then(response => {
                    console.log(response)
                    this.list = response.data
                    this.listLoading = false
                })
            },
            modify() {
                modifyDoctorInfo(this.list).then(()=> {
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
            },
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
