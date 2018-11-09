<template>
    <div class="app-container">
        <div class="main-content">
        <el-form label-position="left"  label-width="100px" :rules="rules" :model="list">
            <el-card>
                <center><h4>企業檔案</h4></center>
                <ve-bmap
                    style="width:500px;height:0px;float:right;margin-bottom: 30px;"
                    :settings="chartSettings"
                    :after-set-option-once="afterSet"
                    :series="chartSeries"
                    :tooltip="chartTooltip">
                </ve-bmap>
            <el-form-item class="mapleft" :label="$t('table.domain')" prop="name">
                <el-input v-model="list.name"></el-input>
            </el-form-item>
            <el-form-item class="mapleft" :label="$t('table.tel')" prop="tel">
                <el-input v-model="list.tel"></el-input>
            </el-form-item>

            <el-form-item class="mapleft" :label="$t('table.demandPerfession')" prop="demandPerfession">
                <el-select  v-model="list.demandPerfession" placeholder="请选择医师专业类别">
                    <el-option label="职业医师" value="职业医师"></el-option>
                    <el-option label="家庭医师" value="家庭医师"></el-option>
                </el-select>
                <!--<el-input v-model="list.demandPerfession"></el-input>-->
            </el-form-item>
                <el-form-item class="mapleft" :label="$t('table.enterpriseCategory')" prop="enterpriseCategory" >
                    <el-select v-model="list.enterpriseCategory" placeholder="请选择事业类别">
                        <el-option value="第一类"></el-option>
                        <el-option value="第二类"></el-option>
                        <el-option value="第三类"></el-option>
                    </el-select>
                    <!--<el-input v-model="list.enterpriseCategory"></el-input>-->
                </el-form-item>
            <el-form-item class="mapleft" :label="$t('table.frequency')" prop="frequency" >
                <el-select v-model="list.frequency" placeholder="所需服务频率（次/月）" >
                    <el-option
                        v-for="n in 18"
                        :key="n"
                        :value="n">
                    </el-option>
                </el-select>
                <!--<el-input v-model="list.frequency"></el-input>-->
            </el-form-item>
            <el-form-item class="mapleft" :label="$t('table.specialHarm')" prop="specialHarm">
                <el-input v-model="list.specialHarm" ></el-input>
            </el-form-item>
            <el-form-item class="mapleft" :label="$t('table.numberOfPeople')" prop="numberOfPeople">
                <el-input v-model="list.numberOfPeople"></el-input>
            </el-form-item>

            <el-form-item :label="$t('table.address')" prop="address">
                <el-input v-model="list.address"></el-input>
            </el-form-item>
                <template v-if="lng ==='' && lat ===''"><div>无法获取到您的位置</div></template>
            <!--<el-form-item :label="$t('table.email')">-->
            <!--<el-input v-model="list.email"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item :label="$t('table.pwd')">-->
            <!--<el-input v-model="list.pwd"></el-input>-->
            <!--</el-form-item>-->
                <el-button style="margin-bottom: 30px;" type="primary" @click=modify()>{{ $t('table.modify')}}
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
            this.chartSettings = {
                key: 'oBvDtR6nzWtVchkY4cLHtnah1VVZQKRK',
                bmap: {
                    center: [],
                    zoom: 14,
                    roam: true,
                    mapStyle: {}
                }
            }
            this.chartTooltip = { show: true }
            return {
                lng:localStorage.getItem('lng'),
                lat:localStorage.getItem('lat'),
                chartSeries: [
                    {
                        type: 'scatter',
                        coordinateSystem: 'bmap',
                        data: [
                            [] // 经度，维度，value，...
                        ]
                    }
                ],
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
            //localStorage.setItem('reload',1)
            if(localStorage.getItem('reload')===1)
            {

            }
            this.fetchData()

        },
        methods: {
            fetchData() {
                this.listLoading = true
                getEnterpriseInfo(jwt.decode(getToken()).id).then(response => {
                    console.log(response)
                    this.list = response.data
                    if(localStorage.getItem('address')!=='')
                    {
                        this.list.address = localStorage.getItem('address')
                    }
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
                    localStorage.setItem("address",'')
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

            afterSet: function (echarts) {
                var bmap = echarts.getModel().getComponent('bmap').getBMap()
                bmap.addControl(new window.BMap.MapTypeControl())
                var scaleCtrl = new window.BMap.ScaleControl({
                    anchor: BMAP_ANCHOR_BOTTOM_LEFT,
                    offset: new BMap.Size(10, 40)
                });
                var a = this.list
                bmap.addControl(scaleCtrl);
                bmap.addControl(new window.BMap.NavigationControl());
                var geolocationControl = new window.BMap.GeolocationControl();
                geolocationControl.addEventListener("locationSuccess", function(e){
                    // 定位成功事件
                    var address = '';
                    address += e.addressComponent.province;
                    address += e.addressComponent.city;
                    address += e.addressComponent.district;
                    address += e.addressComponent.street;
                    address += e.addressComponent.streetNumber;
                    //console.log(localStorage.getItem('address'))
//获取中文 地址

                    if(confirm('是否更换地址,如若地址有误,请自行更改'))
                    {
                        localStorage.setItem("address",address)
                        window.location.reload()
                    }
                    else {
                        localStorage.setItem("address","")
                        window.location.reload()
                    }
                });
                geolocationControl.addEventListener("locationError",function(e){
                    // 定位失败事件
                    alert(e.message);
                });
                bmap.addControl(geolocationControl);


//进行浏览器定位, 如果不允许,就是使用 ip 定位,获取经纬度

                var geolocation = new window.BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                  if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    var mk = new window.BMap.Marker(r.point);
                    //bmap.addOverlay(mk);
                    //bmap.panTo(r.point);
                    //alert('您的位置：'+r.point.lng+','+r.point.lat);
                    localStorage.setItem('lng',r.point.lng)
                      localStorage.setItem('lat',r.point.lat)
                  }
                  else {
                    alert('failed'+this.getStatus());
                  }
                });
                console.log(this.list)
                console.log('djflksajflkasjfdklsa')
                console.log(this.list.tel)
                //进行 坐标提示
                var contents = '<div style="margin:0;line-height:20px;padding:2px;">' +
                    '<img src="../img/baidu.jpg" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                    '地址：'+this.list.address+'<br/>电话'+this.list.tel+'<br/>'+
                    '</div>';
                bmap.centerAndZoom(new window.BMap.Point(localStorage.getItem('lng'),localStorage.getItem('lat')), 15);
                var data_info = [[localStorage.getItem('lng'),localStorage.getItem('lat'),contents],
                ];
                var opts = {
                    width : 290,     // 信息窗口宽度
                    height: 105,     // 信息窗口高度
                    title : "信息窗口" , // 信息窗口标题
                    enableMessage:true//设置允许信息窗发送短息
                };
                for(var i=0;i<data_info.length;i++){
                    var marker = new window.BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
                    var content = data_info[i][2];
                    bmap.addOverlay(marker);               // 将标注添加到地图中
                    addClickHandler(content,marker);
                    openInfo(content)
                }
                function addClickHandler(content,marker){
                    marker.addEventListener("click",function(e){
                        openInfo(content,e)}
                    );
                }
                function openInfo(content){
                    //var p = e.target;
                    var point = new window.BMap.Point(localStorage.getItem('lng'),localStorage.getItem('lat'));
                    var infoWindow = new window.BMap.InfoWindow(content,opts);  // 创建信息窗口对象
                    bmap.openInfoWindow(infoWindow,point); //开启信息窗口
                }

                console.log(localStorage.getItem('lng')+"    "+localStorage.getItem('lat'))

            }
        },
        beforeRouteLeave(to, from, next) {
            console.log(this)    //可以访问vue实例
            console.log('组件路由勾子：beforeRouteLeave')
            //setTimeout(window.location.reload(),4000)
            next()
        },
    }
</script>

<style>
    .main-content{
        /*position: center;*/
        margin:0 15px;
        width: 50%;
        margin-left: 260px;
    }
    .mapleft {
        /*//float: left;*/
        width:300px;
    }
</style>
