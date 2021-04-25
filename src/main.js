import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './app.scss';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  BootstrapVue,
  BootstrapVueIcons,
  IconsPlugin,
  render: h => h(App)
}).$mount('#app')
