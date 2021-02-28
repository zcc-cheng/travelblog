import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
//
import echarts from 'echarts'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';


Vue.prototype.$echarts = echarts

Vue.use(VeeValidate, {
  immediate: false,
  dictionary: {
    zh_CN: zh_CN
  },
  classes: true,
  classNames: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

// Vue.use(vueJsonp)
// Vue.use(BaiduMap, {
//   ak: '3PnxZVyFDpjPQIMf7WWHncE8CXYGdfr2'
// })


//修改原型链，直接使用axios
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')