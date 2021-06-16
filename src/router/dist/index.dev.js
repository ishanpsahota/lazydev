"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../views/home/Home.vue"));

var _Blogs = _interopRequireDefault(require("../views/blogs/Blogs.vue"));

var _TestView = _interopRequireDefault(require("../views/test/TestView.vue"));

var _SearchView = _interopRequireDefault(require("../views/search/SearchView.vue"));

var _AdminView = _interopRequireDefault(require("../views/admin/AdminView.vue"));

var _DashboardView = _interopRequireDefault(require("../views/admin/dashboard/DashboardView.vue"));

var _Login = _interopRequireDefault(require("../views/admin/login/Login.vue"));

var _NotFound = _interopRequireDefault(require("../views/404/NotFound.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '*',
  component: _NotFound["default"]
}, {
  path: '/',
  name: 'Home',
  component: _Home["default"]
}, {
  path: '/search',
  name: 'Search',
  component: _SearchView["default"]
}, {
  path: '/blogs',
  component: _Blogs["default"],
  children: [{
    path: '',
    name: 'all',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../components/blogs-component/blogs-all/BlogsAll.vue'));
      });
    }
  }, {
    path: 'v/:title',
    // name: 'ViewBlog',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../components/blogs-component/blog-view/BlogView.vue'));
      });
    }
  }, {
    path: 'create',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../components/admin/blogs/BlogNew.vue'));
      });
    }
  }]
}, {
  path: '/admin',
  component: _AdminView["default"],
  children: [{
    path: 'login',
    name: 'AdminHome',
    component: _Login["default"]
  }, {
    path: 'dashboard',
    component: _DashboardView["default"],
    children: [{
      path: '',
      component: function component() {
        return Promise.resolve().then(function () {
          return _interopRequireWildcard(require('../components/admin/Dashboard/DashboardHome/DashboardHome.vue'));
        });
      }
    }]
  }]
}, {
  path: '/test',
  name: 'TestingComponents',
  component: _TestView["default"]
} // {
//   path: '/about',
//   name: 'About',
//   // route level code-splitting
//   // this generates a separate chunk (about.[hash].js) for this route
//   // which is lazy-loaded when the route is visited.
//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
// }
];
var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports["default"] = _default;