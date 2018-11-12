<template>
    <div>
        <!-- START HEADER SECTION -->
        <header class="main-header header-1">
            <div class="sticky-menu">
                <div class="mainmenu-area">
                    <div class="auto-container">
                        <div class="row">
                            <div class="col-lg-9 d-lg-block d-md-none d-sm-none d-none ">
                                <nav class="navbar navbar-expand-lg justify-content-left">
                                    <ul class="navbar-nav">
                                        <li><a href="/" class="nav-link">{{$t('comm.home')}}</a></li>
                                        <!--<li class="active dropdown"><a href="index-2.html" class="nav-link">{{$t('comm.home')}}</a>-->
                                            <!--&lt;!&ndash;<ul class="dropdown-menu">&ndash;&gt;-->
                                                <!--&lt;!&ndash;<li><a href="index.html">Home 1</a></li>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<li><a href="index-2.html">Home 2</a></li>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<li><a href="index-3.html">Home 3</a></li>&ndash;&gt;-->
                                                <!--&lt;!&ndash;<li><a href="index-4.html">Home 4</a></li>&ndash;&gt;-->
                                            <!--&lt;!&ndash;</ul>&ndash;&gt;-->
                                        <!--</li>-->
                                        <li><a href="/jlkjl" class="nav-link">{{$t('comm.contact')}}</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="col-lg-3 col-md-12 d-lg-block d-md-none d-none">
                                <nav class="navbar navbar-expand-lg justify-content-end">
                                    <el-dropdown :hide-on-click="true" style="margin-right: 10px;" @command="changeLangEvent">
                                      <span class="el-dropdown-link" style="float: left">
                                        {{$t('comm.lang')}}<i class="el-icon-arrow-down el-icon--right"></i>
                                      </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item command="cn">{{$t('comm.cn')}}</el-dropdown-item>
                                            <el-dropdown-item command="tw">{{$t('comm.tw')}}</el-dropdown-item>
                                            <el-dropdown-item command="en">{{$t('comm.en')}}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                    <ul class="navbar-nav">
                                        <li class="active dropdown quick-search" ><a href="#" class="nav-link"  style="padding:15px 30px !important;" ><span>{{$t('comm.login')}}</span></a>
                                            <ul class="dropdown-menu">
                                                <li><a href="/#/login"><i class="icofont icofont-doctor-alt"></i> {{$t('index.DoctorMaster')}}</a></li>
                                                <li><a href="/#/patientlogin"><i class="icofont icofont-doctor-alt"></i>
                                                    {{$t('index.EnterpriseUser')}}</a></li>
                                            </ul>
                                        </li>
                                    </ul>

                                </nav>

                            </div>
                        </div>
                    </div>
                    <!--- END CONTAINER -->
                </div>
                <!-- END NAVIGATION AREA -->
            </div>
        </header>
        <!-- END HEADER SECTION -->

        <!--TODO:加这段-->
        <section class="slider-section">
            <div class="home-slides owl-carousel owl-theme ">
                <div class="home-single-slide" data-background="../../static/assets/img/bg/slide2.jpg">
                    <div class="home-slide-overlay"></div>
                    <div class="home-single-slide-inner">
                        <div class="auto-container">
                            <div class="row">
                                <div class="col-lg-7 col-md-8 col-sm-8 col-12">
                                    <div class="home-single-slide-dec">
                                        <p>WELL CARE</p>
                                        <h2>PROVIDING</h2>
                                        <h2>TOTAL LAB SOLUTION</h2>
                                        <span><i class="icofont icofont-plus"></i> CARING YOUR REPORTS</span>
                                        <a href="appointment.html" class="home-btn-1">GET APPOINTMENT</a>
                                        <a href="reports.html" class="home-btn-2">LAB REPORTS</a>
                                    </div>
                                </div>
                                <div class="col-lg-5 col-md-4 col-sm-4 col-12 d-lg-block d-md-block d-sm-block d-none">
                                    <img class="img-fluid" src="../../static/assets/img/bg/single-doc1.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end single slider -->
                <div class="home-single-slide" data-background="../../static/assets/img/bg/slide1.jpg">
                    <div class="home-slide-overlay"></div>
                    <div class="home-single-slide-inner">
                        <div class="auto-container">
                            <div class="row">
                                <div class="col-lg-7 col-md-8 col-sm-8 col-12">
                                    <div class="home-single-slide-dec">
                                        <p>TOTAL CARE</p>
                                        <h2>PROVIDING</h2>
                                        <h2>HEALTH SOLUTION</h2>
                                        <span><i class="icofont icofont-plus"></i> WE ARE CARING</span>
                                        <a href="services.html" class="home-btn-1">OUR SERVICES</a>
                                        <a href="services.html" class="home-btn-2">CONTACT US</a>
                                    </div>
                                </div>
                                <div class="col-lg-5 col-md-4 col-sm-4 col-12 d-lg-block d-md-block d-sm-block d-none">
                                    <img class="home-single-slide--img img-fluid" src="../../static/assets/img/bg/single-doc2.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end single slider -->
            </div>
        </section>
        <!-- END SLIDER SECTION  -->

        <!--<section>-->
        <!--<el-carousel :interval="4000" type="card" style="padding-top: 10px;background: linear-gradient(to bottom right, #61a2ff, rgba(0,0,0,0));" >-->
            <!--<el-carousel-item v-for="item in 6" :key="item">-->
                <!--&lt;!&ndash;<h3>{{ item }}</h3>&ndash;&gt;-->
                <!--<img src="../../static/assets/img/bg/s3.png" />-->
            <!--</el-carousel-item>-->
        <!--</el-carousel>-->
        <!--</section>-->
        <div class="mobile-menu-area d-lg-none d-md-block d-sm-block d-block" style="margin-bottom: 50px;">
            <span class="hahah"><a class="aaa" href="/#/login">{{$t('index.DoctorMaster')}}</a></span>
            <span class="hahah"><a class="aaa" href="/#/patientlogin">{{$t('index.EnterpriseUser')}}</a></span>
        </div>
        <section id="counter" class="counter-section overlay  section-back-image" data-background="assets/img/bg/counter-bg.jpg">
            <div class="container">
                <div class="row wow fadeInDown">
                    <div class="col-lg-3 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-4 mb-sm-4 mb-4">
                        <div class="single-counter">
                            <div class="single-counter-icon">
                                <i class="icofont icofont-users-alt-2"></i>
                            </div>
                            <div class="single-counter-text">
                                <h5 class="timer">{{PatientsCount}}</h5>
                                <p>{{$t('index.PatientsCount')}}</p>
                            </div>
                        </div>
                    </div>
                    <!-- end single counter -->
                    <div class="col-lg-3 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-4 mb-sm-4 mb-4">
                        <div class="single-counter">
                            <div class="single-counter-icon">
                                <i class="icofont icofont-doctor-alt"></i>
                            </div>
                            <div class="single-counter-text">
                                <h5 class="timer">{{DoctorCount}}</h5>
                                <p>{{$t('index.MediackWorks')}}</p>
                            </div>
                        </div>
                    </div>
                    <!-- end single counter -->
                    <div class="col-lg-3 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-4 mb-sm-4 mb-4">
                        <div class="single-counter">
                            <div class="single-counter-icon">
                                <i class="icofont icofont-table"></i>
                            </div>
                            <div class="single-counter-text">
                                <h5 class="timer">{{enterpriseCount}}</h5>
                                <p>{{$t('index.EnterPriseCount')}}</p>
                            </div>
                        </div>
                    </div>
                    <!-- end single counter -->
                    <div class="col-lg-3 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-4 mb-sm-4 mb-4">
                        <div class="single-counter">
                            <div class="single-counter-icon">
                                <i class="icofont icofont-ui-file"></i>
                            </div>
                            <div class="single-counter-text">
                                <h5 class="timer">{{avgRate}}</h5>
                                <p>{{$t('index.Satisfaction')}}</p>
                            </div>
                        </div>
                    </div>
                    <!-- end single counter -->
                </div>
            </div>
            <!--- END CONTAINER -->
        </section>

        <footer>
            <div class="copyright">
                <div class="auto-container">
                    <div class="row">
                        <div class="col-md-12">
                            <center>
                            <div class="copyright-text"><img style="width:40px;width:40px" src="static/github.png" /><a href="https://github.com/quinnqin7/node-app/tree/transplant-node-app">quinnqin7</a> Open Source
                            </div>
                        </center></div>
                        <!--<div class="col-lg-6 col-md-6 col-sm-12 col-12 footer-menu">-->
                            <!--<ul>-->
                                <!--<li><a href="#">Make an Enquiry</a></li>-->
                                <!--<li><a href="#">Book an Appointment</a></li>-->
                                <!--<li><a href="#">Terms and Conditions</a></li>-->
                            <!--</ul>-->
                        <!--</div>-->
                    </div>
                </div>

            </div>
        </footer>
        <!-- END FOOTER -->
    </div>
</template>

<script>
    import {getRoleCount} from "../api/comm";

    export default {
        name: "index",
        data(){
            return {
                PatientsCount:'',
                DoctorCount:'',
                enterpriseCount:'',
                avgRate:'',
                zh_cn: null
            }
        },
        created(){
            this.getCount()
        },
        methods:{
            changeLangEvent(command) {
                if (command === 'en') {
                    window.localStorage.setItem('lang', 'en')
                    this.$i18n.locale = 'en';
                }
                if(command === 'cn'){
                    window.localStorage.setItem('lang', 'cn')
                    this.$i18n.locale = 'cn';
                }
                if(command === 'tw'){
                    window.localStorage.setItem('lang', 'tw')
                    this.$i18n.locale = 'tw';
                }
            },
            getCount(){
                getRoleCount().then((response)=>{
                    this.PatientsCount = response.data.PatientsCount
                    this.DoctorCount = response.data.DoctorCount
                    this.enterpriseCount = response.data.enterpriseCount
                    this.avgRate = response.data.avgRate
                	}).catch(err=>{
                		console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    @import "../../static/assets/bootstrap/css/bootstrap.min.css";
    @import "../../static/assets/fonts/icon-font.min.css";
    @import "../../static/assets/fonts/icofont.css";
    @import "../../static/assets/css/meanmenu.min.css";
    @import "../../static/assets/css/animate.css";

    @import "../../static/assets/owlcarousel/css/owl.carousel.min.css";
    @import "../../static/assets/owlcarousel/css/owl.theme.default.min.css";

    @import "../../static/assets/venobox/css/venobox.css";
    @import "../../static/assets/css/style.css";
    @import "../../static/assets/css/responsive.css";

.copyright{
    width:100%;
}
    .el-carousel__item {
        opacity: 1;
        text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
        width: 100px;

    }

    .el-icon-arrow-down {
        font-size: 12px;
    }
    .hahah{
        float: right;
        display: block;
        height:50px;
        width:50%;
        text-align: center;
        line-height: 50px;
        background-color: #6cadc8;

    }
    a.aaa:link{
        color:#ffffff !important;
    }
    a.aaa:visited{
        color:#ffffff !important;
    }
</style>
