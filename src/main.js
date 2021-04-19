import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
import '@/styles/iconfont/iconfont.css'
import moment from 'moment'
// 定义时间格式全局过滤器
Vue.filter('dateFormat', function(dataStr) {
  let format = ''
  const pattern = 'YYYY/MM/DD'
  const date = new Date()
  if (!dataStr) {
    return format
  } else if (moment(date).format(pattern) === moment(dataStr).format(pattern)) { // 判断时间是否等于今天
    const data = new Date(dataStr)
    format = data.toLocaleTimeString()
  } else {
    format = moment(dataStr).format(pattern)
  }
  return format
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
