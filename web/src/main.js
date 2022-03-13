import Vue from 'vue'
import router from './routes/index'
//导入插件
import './plugin'
import App from './App.vue'
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
