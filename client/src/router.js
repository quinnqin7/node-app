import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'

/*註冊*/
import Register from './views/register.vue'
/*404*/
import NotFound from './views/404.vue'
/*登錄*/
import Login from './views/login.vue'

/*首頁*/
import Home from './views/home.vue'
/*個人信息*/
import InfoShow from './views/infoShow.vue'

/*預約 reservation*/

/*排班 arrange*/

/*問診 inquiry-> 問診病歷、問診處方、患者列表*/
//import Inquiry from './views/inquiry/inquiry'
import Patientlist from './views/patientlist'
/*健檢報告管理 repManage-> 公司 ->個人*/

/*統計 statistic*/





Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/',redirect: '/index'},
    {
      path: '/index',name: '/index',component: Index,
      children:[
        {path:'',component:Home},
        {path:'/home',name:'home', component:Home},
        {path:'/infoshow',name:'infoshow', component:InfoShow},
        {path:'/patientlist',name:'patientlist', component:Patientlist},
      ]
    },
    {path: '/register',name: '/register',component: Register}, 
    {path: '/login',name: '/login',component: Login},
    {path: '*',name: '/404',component: NotFound}
  ]
});



//路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if( to.path == '/login' || to.path=='/register'){
    next();
  }else{
    isLogin ? next() : next('/login');
  }
});

export default router;