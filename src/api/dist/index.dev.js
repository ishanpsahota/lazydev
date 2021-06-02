"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var axios = require('axios'); // const url = 'http://localhost:8081/api/v1'


var url = 'https://lazydevapi.herokuapp.com/api/v1';
var links = {
  getBlogs: url + '/blogs',
  getSingleBlog: url + '/blogs/',
  saveBlog: url + '/blogs/save/',
  saveBlock: url + '/blogs/save/',
  showHideBlog: url + '/blogs/status/change/',
  getCategories: url + '/blogs/get/categories',
  getSimilarBlogs: url + '/blogs/get/similar',
  getTrendingBlogs: url + '/blogs/get/trending',
  search: url + '/blogs/get/search'
};
var _default = {
  getLinks: function getLinks() {
    return links;
  },
  getBlogs: function getBlogs() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      axios.get(_this.getLinks().getBlogs).then(function (res) {
        resolve(res);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getSingleBlog: function getSingleBlog(title) {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      axios.get(_this2.getLinks().getSingleBlog + title).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  saveBlog: function saveBlog(title) {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
      axios.put(_this3.getLinks().saveBlock + title).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  saveBlock: function saveBlock(title, blockId) {
    var _this4 = this;

    return new Promise(function (resolve, reject) {
      axios.put(_this4.getLinks().saveBlog + title + '/block/' + blockId).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getCategories: function getCategories() {
    var _this5 = this;

    return new Promise(function (resolve, reject) {
      axios.get(_this5.getLinks().getCategories).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getSimilarBlogs: function getSimilarBlogs(phrase, match) {
    var _this6 = this;

    return new Promise(function (resolve, reject) {
      axios.get(_this6.getLinks().getSimilarBlogs + "?phrase=".concat(phrase, "&match=").concat(match)).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getTrendingBlogs: function getTrendingBlogs(category) {
    var _this7 = this;

    if (category) {
      return new Promise(function (resolve, reject) {
        axios.get(_this7.getLinks().getTrendingBlogs + "?category=".concat(phrase)).then(function (res) {
          resolve(res.data);
        })["catch"](function (err) {
          reject(err);
        });
      });
    } else return new Promise(function (resolve, reject) {
      axios.get(_this7.getLinks().getTrendingBlogs).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  search: function search(query) {
    var _this8 = this;

    if (query) {
      return new Promise(function (resolve, reject) {
        axios.get(_this8.getLinks().search + "?query=".concat(query)).then(function (res) {
          resolve(res.data);
        })["catch"](function (err) {
          reject(err);
        });
      });
    } else return new Promise(function (resolve, reject) {
      axios.get(_this8.getLinks().search).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  }
};
exports["default"] = _default;