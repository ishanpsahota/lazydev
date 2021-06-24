"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    theme: document.body.getAttribute('data-theme')
  },
  mutations: {
    changeTheme: function changeTheme(state, new_theme) {
      state.theme = new_theme;
    }
  },
  actions: {
    changeTheme: function changeTheme(_ref, theme) {
      var commit = _ref.commit;

      // console.log(theme)
      if (theme == 'dark') {
        commit('changeTheme', 'light');
        localStorage.setItem('theme', 'light');
        document.body.setAttribute('data-theme', 'light');
      }

      if (theme == 'light') {
        commit('changeTheme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.body.setAttribute('data-theme', 'dark');
      }
    }
  },
  getters: {
    getTheme: function getTheme(state) {
      return state.theme;
    }
  }
});

exports["default"] = _default;