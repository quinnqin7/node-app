<template>
    <div class="dashboard-container">
        <!--<div class="dashboard-text">doctorname:{{ name }}</div>-->
        <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
        <el-card class="box-card odd" shadow="hover">
            <div slot="header" class="clearfix">
                <span>今日公告</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <!--<div v-for="o in 4" :key="o" class="text item">-->
            <!--{{'列表内容 ' + o }}-->
            <!--</div>-->

            <el-table
                :data="journalData"
                style="width: 100%;margin-top: -20px"
                max-height="150">
                <el-table-column
                    fixed
                    sortable
                    prop="date"
                    label="日期"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="标题"
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="50">
                    <template slot-scope="scope">
                        <!--<el-button-->
                        <!--@click.native.prevent="deleteRow(scope.$index, journalData)"-->
                        <!--type="text"-->
                        <!--size="small">-->
                        <!--查看-->
                        <!--</el-button>-->
                        <el-button type="text" @click="displayContent(scope.row.content)" size="small">查看</el-button>



                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <el-card class="box-card even" shadow="hover">
            <div slot="header" class="clearfix">
                <span>今日公告</span>
                <el-button style="float: right; padding: 3px 0;margin-left: 10%;" type="text">操作按钮</el-button>
            </div>
            <!--<div v-for="o in 4" :key="o" class="text item">-->
            <!--{{'列表内容 ' + o }}-->
            <!--</div>-->
            <el-input
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 6}"
                placeholder="请输入内容"
                v-model="textarea3">
            </el-input>
        </el-card>

        <el-card class="box-card odd" shadow="hover">
            <div slot="header" class="clearfix">
                <span>今日公告</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>

        <el-card class="box-card even" shadow="hover">
            <div slot="header" class="clearfix">
                <span>今日公告</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>

        <el-card class="box-card odd" shadow="hover">
            <div slot="header" class="clearfix">
                <span>今日公告</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import {getToken} from "../../utils/auth";
    import {fetchContentData} from "../../api/doctor";

    export default {
        data(){
            return{
                journalData:[{
                    date: '2016-05-03',
                    name: '王小虎',
                    content: '上海',
                    city: '普陀区',
                    title: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    content: '上海',
                    city: '普陀区',
                    title: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    content: '上海',
                    city: '普陀区',
                    title: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }],
                textarea3:''
            }
        },
        name: 'Dashboard',
        computed: {
            ...mapGetters([
                'name',
                'roles'
            ])
        },
        created(){
            this.fetchContent()
        },
        methods:{
            fetchContent(){
                fetchContentData(getToken()).then((response)=>{
                    this.journalData = response.data
                }).catch(()=>{
                    this.$alert('获取数据错误')
                })
            },
            displayContent(data){
                this.$alert(data, {
                    dangerouslyUseHTMLString: true
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .dashboard {
        &-container {
            margin: 30px;
        }
        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 40%;
        height:40%;


        margin-top: 20px;
    }
    .odd{
        margin-left: 5%;
        float:left;
    }
    .even{
        margin-right: 5%;
        float:right;
    }
</style>
