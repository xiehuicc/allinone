import Vue from 'vue'
import router from './routes/index'
//导入插件
import './plugin'
import axios from './utils/axios'
import store from './store/index'
import App from './App.vue'
Vue.config.productionTip = false


Vue.use(axios)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
