import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue';
import bootstrap from 'bootstrap'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './app.scss';
import axios from 'axios';
import 'jquery'

Vue.prototype.$http = axios;

// Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
// Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

// localStorage.setItem('theme', 'dark');

Vue.config.productionTip = false

new Vue({
  router,
  bootstrap,
  store,
  BootstrapVue,
  BootstrapVueIcons,
  IconsPlugin,
  render: h => h(App)
}).$mount('#app')
