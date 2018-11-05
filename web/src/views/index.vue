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
                                                <li><a href="/#/login"><i class="icofont icofont-doctor-alt"></i> Doctor
                                                    & Master</a></li>
                                                <li><a href="/#/patientlogin"><i class="icofont icofont-doctor-alt"></i>
                                                    EnterpriseUser</a></li>
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

                 <!--MOBILE-MENU-AREA START -->
                    <div class="mobile-menu-area d-lg-none d-md-block d-sm-block d-block">
                        <div class="col-md-9">
                            <div class="mobile-menu">
                                <nav id="dropdown">
                                    <ul class="navbar-nav">
                                        <li><a href="index.html">Home</a>
                                            <ul>
                                                <li><a href="index.html">Home 1</a></li>
                                                <li><a href="index-2.html">Home 2</a></li>
                                                <li><a href="index-3.html">Home 3</a></li>
                                                <li><a href="index-4.html">Home 4</a></li>
                                            </ul>
                                        </li>
                                        <li><a href="contact.html">Contact</a></li>
                                        没写 css 样式
                                        <li><a href="#">I want To</a>
                                            <ul>
                                                <li><a href="#"><i class="icofont icofont-doctor-alt"></i> Find a Doctor</a></li>
                                                <li><a href="#"><i class="icofont icofont-ui-calendar"></i> Request an Appointment</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                 <!--MOBILE-MENU-AREA END -->


            </div>
        </header>
        <!-- END HEADER SECTION -->
        <section>
        <el-carousel :interval="4000" type="card" style="padding-top: 10px;background: linear-gradient(to bottom right, #61a2ff, rgba(0,0,0,0));" >
            <el-carousel-item v-for="item in 6" :key="item">
                <!--<h3>{{ item }}</h3>-->
                <img src="../../static/assets/img/bg/s5.png" />
            </el-carousel-item>
        </el-carousel>
        </section>

        <section id="counter" class="counter-section overlay  section-back-image" data-background="assets/img/bg/counter-bg.jpg">
            <div class="container">
                <div class="row wow fadeInDown">
                    <div class="col-lg-3 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-4 mb-sm-4 mb-4">
                        <div class="single-counter">
                            <div class="single-counter-icon">
                                <i class="icofont icofont-users-alt-2"></i>
                            </div>
                            <div class="single-counter-text">
                                <h5 class="timer">1250</h5>
                                <p>Happy Patients</p>
                            </div>
                        </div>
                    </div>
                    <!-- end single counter -->
                    <div class="col-lg-3 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-4 mb-sm-4 mb-4">
                        <div class="single-counter">
                            <div class="single-counter-icon">
                                <i class="icofont icofont-nurse-alt"></i>
                            </div>
                            <div class="single-counter-text">
                                <h5 class="timer">1350</h5>
                                <p>Medical Workers</p>
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
                                <h5 class="timer">1560</h5>
                                <p>Total Doctors</p>
                            </div>
                        </div>
                    </div>
                    <!-- end single counter -->
                    <div class="col-lg-3 col-md-6 col-sm-12 col-12 mb-lg-0 mb-md-4 mb-sm-4 mb-4">
                        <div class="single-counter">
                            <div class="single-counter-icon">
                                <i class="icofont icofont-hat-alt"></i>
                            </div>
                            <div class="single-counter-text">
                                <h5 class="timer">1670</h5>
                                <p>Medical Experience</p>
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
                        <div class="col-lg-6 col-md-6 col-sm-12 col-12 copyright-text">
                            <p>Copyright &copy; 2018.Company name All rights reserved.
                            </p>
                        </div>
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
    export default {
        name: "index",
        data(){
            return {
                zh_cn: null
            }
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
    @import "../../static/assets/venobox/css/venobox.css";
    @import "../../static/assets/css/style.css";
    @import "../../static/assets/css/responsive.css";

    .el-carousel__item {
        opacity: 0.75;
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
</style>
