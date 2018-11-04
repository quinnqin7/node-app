<template>
    <div class="chart-container">
        <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
    </div>
</template>

<script>
    import VeHistogram from 'v-charts/lib/histogram.common'
    import 'v-charts/lib/style.css'
    export default {
        data () {
            this.chartSettings = {
                stack: { '患者': ['男', '女'] }
            }
            return {
                chartData: {
                    columns: ['日期', '男', '女', '患病率'],
                    rows: [
                        { '日期': '1/1', '男': 1393, '女': 1093, '患病率': 0.32 },
                        { '日期': '1/2', '男': 3530, '女': 3230, '患病率': 0.26 },
                        { '日期': '1/3', '男': 2923, '女': 2623, '患病率': 0.76 },
                        { '日期': '1/4', '男': 1723, '女': 1423, '患病率': 0.49 },
                        { '日期': '1/5', '男': 3792, '女': 3492, '患病率': 0.323 },
                        { '日期': '1/6', '男': 4593, '女': 4293, '患病率': 0.78 }
                    ]
                }
            }
        },


        components: { VeHistogram }
    }
</script>

<style>
    .chart-container{
        position: relative;
        width: 60%;
        height: calc(100vh - 84px);
    }
</style>
