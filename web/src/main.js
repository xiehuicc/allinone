import Vue from 'vue'
import router from './routes/index'
//导入插件
import './plugin'
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://47.103.142.69:3000/allinone/'
import App from './App.vue'
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
