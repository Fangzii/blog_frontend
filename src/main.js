// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import VueClipboard from 'vue-clipboard2'
// mock
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(VueClipboard)

new Vue({
  router,
  store,
  created () {
    bootstrap()
    store.dispatch('multiWindowTag')
  },
  render: h => h(App)
}).$mount('#app')
