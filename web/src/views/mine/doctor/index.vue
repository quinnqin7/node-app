<template>
    <div class="app-container">
        <el-form label-position="top" label-width="80px" :model="list">
            <el-form-item :label="$t('table.name')">
                <el-input v-model="list.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.tel')">
                <el-input v-model="list.tel"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.perfession')">
                <el-input v-model="list.perfession"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.frequency')">
                <el-input v-model="list.frequency"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.address')">
                <el-input v-model="list.address"></el-input>
            </el-form-item>
            <!--<el-form-item :label="$t('table.email')">-->
                <!--<el-input v-model="list.email"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="$t('table.pwd')">-->
                <!--<el-input v-model="list.pwd"></el-input>-->
            <!--</el-form-item>-->
        </el-form>
        <el-button style="float:right;margin-bottom: 30px" type="primary" @click=modify()>{{ $t('table.modify')}}
        </el-button>
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
                listLoading: false
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
