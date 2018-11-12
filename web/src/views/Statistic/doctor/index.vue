<template>

    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <div class="chart-container">
                        <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
                        <center>問診數  月/人</center>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple chart-container">
                    <ve-pie :data="chartData2" :settings="pieSettings"></ve-pie>
                    <center>問診滿意度</center>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import VeHistogram from 'v-charts/lib/histogram.common'
    import 'v-charts/lib/style.css'
    import {getToken} from "../../../utils/auth";
    import {getPatientNumberOfMonth, getpatientRateToDoctor} from "../../../api/doctor";
    const jwt = require('jsonwebtoken');
    export default {
        data() {
            this.chartSettings = {
                stack: {'患者': ['男', '女']}
            }
            this.pieSettings={radius: 150}
            return {
                chartData2: {
                    columns: ['Satisfaction', 'assess'],
                    rows: [
                        {'滿意度': '1', '評價人數': 1393},
                        {'滿意度': '2', '評價人數': 3530},
                        {'滿意度': '3', '評價人數': 2923},
                        {'滿意度': '4', '評價人數': 1723},
                        {'滿意度': '5', '評價人數': 3792},
                    ]
                },
                chartData: {
                    columns: ['日期', '人/月'],
                    // rows: [
                    //     {'日期': '1/1', '男': 1393, '女': 1093, '患病率': 0.32},
                    //     {'日期': '1/2', '男': 3530, '女': 3230, '患病率': 0.26},
                    //     {'日期': '1/3', '男': 2923, '女': 2623, '患病率': 0.76},
                    //     {'日期': '1/4', '男': 1723, '女': 1423, '患病率': 0.49},
                    //     {'日期': '1/5', '男': 3792, '女': 3492, '患病率': 0.323},
                    //     {'日期': '1/6', '男': 4593, '女': 4293, '患病率': 0.78}
                    // ]
                    rows: [
                        {'日期': '1', '人/月': 1393,},
                        {'日期': '2', '人/月': 3530,},
                        {'日期': '3', '人/月': 2923,},
                        {'日期': '4', '人/月': 1723,},
                        {'日期': '5', '人/月': 3792,},
                        {'日期': '6', '人/月': 4593,},
                        {'日期': '7', '人/月': 1393,},
                        {'日期': '8', '人/月': 3530,},
                        {'日期': '9', '人/月': 2923,},
                        {'日期': '10', '人/月': 1723,},
                        {'日期': '11', '人/月': 3792,},
                        {'日期': '12', '人/月': 4593,}
                    ]
                }
            }
        },
        components: {VeHistogram},
        created(){
            this.patientNumberOfMonth()
            this.patientRateToDoctor()
        },
        methods:{
            patientNumberOfMonth(){
                getPatientNumberOfMonth(jwt.decode(getToken()).id).then((response)=>{
                		console.log(response.data)
                    this.chartData.rows = response.data
                	}).catch(err=>{
                		console.log(err)
                })
            },
            patientRateToDoctor(){
                getpatientRateToDoctor(jwt.decode(getToken()).id).then((response)=>{
                		console.log(response.data)
                    this.chartData2.rows = response.data
                	}).catch(err=>{
                		console.log(err)
                })
            }
        }
    }
</script>

<style>
    .chart-container {
        position: relative;
        width: 100%;
        height: calc(100vh - 84px);
        padding:50px;
    }
</style>
