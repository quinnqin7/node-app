import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login','/register','^/mailjump','/patientlogin','/a'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
    // Judge if user had login before
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // if localcookie have 'token' you must to getUserInfo
      if (store.getters.roles.length === 0) {  //if none role in state have to serve getUserInfo

        store.dispatch('GetInfo').then(res => { // fetch userinfo
            const roles = res.roles
            store.dispatch('GenerateRoutes',{roles}).then(() => { // 生成可访问的路由表
                 router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                  next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          next()
        }).catch((err) => {
            store.dispatch('FedLogOut').then(() => {
            Message.error(err ||'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
      // FIXME 这边有问题
      var hah=false
      whiteList.forEach(data=>{
          if (to.path.match(data) != null) {
         //if (true) {
              hah = true
          }
      })
      if (hah) {
          //if (true) {
          console.log(to.path)
          next()
      } else {
          // The First Page to Login
          next(`/a?redirect=${to.path}`) // 否则全部重定向到登录页
          NProgress.done()
      }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
