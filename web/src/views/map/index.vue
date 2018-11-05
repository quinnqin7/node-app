<template>
<div class="map">
    <ve-bmap
        :settings="chartSettings"
        :series="chartSeries"
        :tooltip="chartTooltip">
    </ve-bmap>
</div>
</template>

<script>

    export default {
        name: 'App',
        data () {
            this.chartSettings = {
                key: 'InmE82rsvsxVwlEXwL4cjwON3qZ2vEjb',
                bmap: {
                    center: [120.591409,24.22962],
                    zoom: 14,
                    roam: true,
                    mapStyle: {}
                }
            }
            this.chartTooltip = { show: true }
            return {
                chartSeries: [
                    {
                        type: 'scatter',
                        coordinateSystem: 'bmap',
                        data: [
                            [120.591409,24.22962, 1] // 经度，维度，value，...
                        ]
                    },
                    {
                        type: 'scatter',
                        coordinateSystem: 'bmap',
                        data: [
                            [120.591409,24.5, 1] // 经度，维度，value，...
                        ]
                    }
                ]
            }
        },
        methods: {
            afterSet: function (echarts) {
                var bmap = echarts.getModel().getComponent('bmap').getBMap()
                bmap.addControl(new window.BMap.MapTypeControl())
            }
        }
    }
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .map {
        /*position: relative;*/
        width: 100%;
        height: 300px;
    }
</style>
