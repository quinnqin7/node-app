<template>
    <div class="app-container">
        <div class="main-content">
        <el-form label-position="left" label-width="80px" :rules="rules" :model="list">
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
                <el-select v-model="list.frequency" placeholder="可服务频率（次/月）" >
                    <el-option
                        v-for="n in 18"
                        :key="n"
                        :value="n">
                    </el-option>
                </el-select>
                <!--<el-input v-model="list.frequency"></el-input>-->
            </el-form-item>
                <el-form-item :label="$t('table.header')">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
                imageUrl:'',
                imgbase64:'',
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
                if(this.imgbase64 !== '')
                {
                    this.list.header = this.imgbase64
                }
                modifyDoctorInfo(this.list).then(()=> {
                    this.$notify({
                        title: "成功",
                        message: '修改成功',
                        type: 'success',
                        duration: 2000
                    })
                    //window.location.reload()
                }).catch(()=>{
                    this.$notify({
                        title: "失败",
                        message: '修改失败',
                        type: 'error',
                        duration: 2000
                    })
                })
            },

            blobToDataURI(blob, callback) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    callback(e.target.result);
                }
                reader.readAsDataURL(blob);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.blobToDataURI(file.raw, function (data) {
                    //console.log(data)
                    localStorage.setItem('header',data)
                    //console.log(this.imgbase64)
                })
                this.imgbase64 = localStorage.getItem('header')
                //console.log(this.imgbase64)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
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
    .avatar-uploader{
        width:100px;
        height:100px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
</style>
