"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _bootstrapVue = require("bootstrap-vue");

var _bootstrap = _interopRequireDefault(require("bootstrap"));

require("bootstrap/dist/css/bootstrap.css");

require("bootstrap-vue/dist/bootstrap-vue.css");

require("./app.scss");

var _axios = _interopRequireDefault(require("axios"));

require("jquery");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Import Bootstrap an BootstrapVue CSS files (order is important)
_vue["default"].prototype.$http = _axios["default"]; // Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = "*"
// Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
// localStorage.setItem('theme', 'dark');

_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  bootstrap: _bootstrap["default"],
  store: _store["default"],
  BootstrapVue: _bootstrapVue.BootstrapVue,
  BootstrapVueIcons: _bootstrapVue.BootstrapVueIcons,
  IconsPlugin: _bootstrapVue.IconsPlugin,
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');