import Vue from 'vue'
import VueI18n from 'vue-i18n'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n/i18n'
import VCharts from 'v-charts'
import '@/icons' // icon
// todo 在进行路由之前会进行 角色权限判断
import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.use(VueI18n)
Vue.config.productionTip = false
Vue.use(VCharts)


new Vue({
  el: '#app',
  router,
  store,
    i18n,
  render: h => h(App)
})
