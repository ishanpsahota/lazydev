"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var axios = require('axios'); // const url =  process.env.API_URL ? process.env.API_URL : 'http://localhost:8081/api/v1'
// const url = 'http://localhost:8081/api/v1'


var url = 'https://lazydevapi.herokuapp.com/api/v1';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
var links = {
  createBlog: url + '/blogs/new',
  getBlogs: url + '/blogs',
  getSingleBlog: url + '/blogs/',
  saveBlog: url + '/blogs/save/',
  saveBlock: url + '/blogs/save/',
  showHideBlog: url + '/blogs/status/change/',
  getCategories: url + '/blogs/get/categories',
  getSimilarBlogs: url + '/blogs/get/similar',
  getTrendingBlogs: url + '/blogs/get/trending',
  search: url + '/blogs/get/search',
  uploadImage: url + '/blogs/upload/image',
  getNew: url + '/blogs/get/new'
};
var _default = {
  createBlog: function createBlog(blog) {
    var _this = this;

    blog = {
      blog: blog
    };
    return new Promise(function (resolve, reject) {
      axios.post(_this.getLinks().createBlog, blog).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getLinks: function getLinks() {
    return links;
  },
  getBlogs: function getBlogs() {
    var _this2 = this;

    return new Promise(function (resolve, reject) {
      axios.get(_this2.getLinks().getBlogs).then(function (res) {
        resolve(res);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getSingleBlog: function getSingleBlog(title) {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
      axios.get(_this3.getLinks().getSingleBlog + title).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  saveBlog: function saveBlog(title) {
    var _this4 = this;

    return new Promise(function (resolve, reject) {
      axios.put(_this4.getLinks().saveBlock + title).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  saveBlock: function saveBlock(title, blockId) {
    var _this5 = this;

    return new Promise(function (resolve, reject) {
      axios.put(_this5.getLinks().saveBlog + title + '/block/' + blockId).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getCategories: function getCategories() {
    var _this6 = this;

    return new Promise(function (resolve, reject) {
      axios.get(_this6.getLinks().getCategories).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getSimilarBlogs: function getSimilarBlogs(phrase, match) {
    var _this7 = this;

    return new Promise(function (resolve, reject) {
      axios.get(_this7.getLinks().getSimilarBlogs + "?phrase=".concat(phrase, "&match=").concat(match)).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getTrendingBlogs: function getTrendingBlogs(category) {
    var _this8 = this;

    if (category) {
      return new Promise(function (resolve, reject) {
        axios.get(_this8.getLinks().getTrendingBlogs + "?category=".concat(phrase)).then(function (res) {
          resolve(res.data);
        })["catch"](function (err) {
          reject(err);
        });
      });
    } else return new Promise(function (resolve, reject) {
      axios.get(_this8.getLinks().getTrendingBlogs).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  search: function search(query, type) {
    var _this9 = this;

    if (query) {
      return new Promise(function (resolve, reject) {
        axios.get(_this9.getLinks().search + "?q=".concat(query, "&type=").concat(type)).then(function (res) {
          resolve(res.data);
        })["catch"](function (err) {
          reject(err);
        });
      });
    } else return new Promise(function (resolve, reject) {
      axios.get(_this9.getLinks().search).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  getNew: function getNew() {
    var _this10 = this;

    return new Promise(function (resolve, reject) {
      axios.get(_this10.getLinks().getNew).then(function (res) {
        resolve(res.data);
      })["catch"](function (err) {
        reject(err);
      });
    });
  },
  uploadImg: function uploadImg(image, name) {
    var _this11 = this;

    var formData = new FormData();
    formData.append('image', image, name);
    var config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    return new Promise(function (resolve, reject) {
      axios.post(_this11.getLinks().uploadImage, formData, config).then(function (res) {
        resolve(res);
      })["catch"](function (err) {
        reject(err);
      });
    });
  }
};
exports["default"] = _default;