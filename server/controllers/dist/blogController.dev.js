"use strict";

var bcrypt = require('bcryptjs');

var utils = require('../utils'); // modals


var Blog = require('../models/blog');

var Log = require('../models/logs');

exports.getAllBlogs = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          Blog.find({
            'showStatus': true
          }).then(function (blogs) {
            return res.json({
              blogs: blogs
            });
          })["catch"](function (error) {
            console.log(error);
            return res.sendStatus(404);
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getSingleBlog = function _callee2(req, res) {
  var blog, log, _log;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Blog.findOne({
            'title': utils.getTitleforSearch(req.params.title),
            'showStatus': true
          }));

        case 3:
          blog = _context2.sent;
          log = {
            route: 'hitBlog',
            remarks: "Visited ".concat(req.params.title, "."),
            date: new Date(Date.now())
          };
          _context2.next = 7;
          return regeneratorRuntime.awrap(utils.logActivity(log));

        case 7:
          if (!blog) {
            _context2.next = 11;
            break;
          }

          blog.hits = Number(blog.hits + 1);
          _context2.next = 11;
          return regeneratorRuntime.awrap(blog.save());

        case 11:
          return _context2.abrupt("return", res.json({
            blog: blog
          }));

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          _log = {
            route: 'hitBlog',
            remarks: JSON.stringify(_context2.t0),
            date: new Date(Date.now())
          };
          _context2.next = 19;
          return regeneratorRuntime.awrap(utils.logActivity(_log));

        case 19:
          return _context2.abrupt("return", res.status(404).json({
            error: _context2.t0
          }));

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.hitBlog = function _callee3(req, res) {
  var doc, log, docSave, _log2, logSave;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Blog.findOne({
            'title': utils.getTitleforSearch(req.params.title)
          }));

        case 3:
          doc = _context3.sent;
          log = {
            route: 'hitBlog',
            remarks: "Increased the hit count for ".concat(req.params.title, "."),
            date: new Date(Date.now())
          };
          _context3.next = 7;
          return regeneratorRuntime.awrap(utils.logActivity(log));

        case 7:
          if (!doc) {
            _context3.next = 14;
            break;
          }

          doc.hits = Number(doc.hits + 1);
          _context3.next = 11;
          return regeneratorRuntime.awrap(doc.save());

        case 11:
          docSave = _context3.sent;

          if (!docSave) {
            _context3.next = 14;
            break;
          }

          return _context3.abrupt("return", res.sendStatus(200));

        case 14:
          return _context3.abrupt("return");

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          _log2 = {
            route: 'hitBlog',
            remarks: JSON.stringify(_context3.t0)
          };
          _context3.next = 22;
          return regeneratorRuntime.awrap(utils.logActivity(_log2));

        case 22:
          logSave = _context3.sent;
          if (logSave != true) console.log(logSave);
          return _context3.abrupt("return", res.sendStatus(500));

        case 25:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

exports.saveUnsaveBlog = function _callee4(req, res) {
  var doc, save;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Blog.findOne({
            'title': utils.getTitleforSearch(req.params.title)
          }));

        case 3:
          doc = _context4.sent;

          if (!doc) {
            _context4.next = 11;
            break;
          }

          doc.liked = !doc.liked;
          _context4.next = 8;
          return regeneratorRuntime.awrap(doc.save());

        case 8:
          save = _context4.sent;

          if (!save) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("return", res.send(doc.liked));

        case 11:
          return _context4.abrupt("return");

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.json({
            error: _context4.t0
          }));

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

exports.saveBlock = function _callee5(req, res) {
  var doc, save;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Blog.findOne({
            'title': utils.getTitleforSearch(req.params.title)
          }));

        case 3:
          doc = _context5.sent;

          if (!doc) {
            _context5.next = 10;
            break;
          }

          doc.blocks[req.params.id].saved = !doc.blocks[req.params.id].saved;
          _context5.next = 8;
          return regeneratorRuntime.awrap(doc.save());

        case 8:
          save = _context5.sent;
          return _context5.abrupt("return", res.send(doc.blocks[req.params.id].saved));

        case 10:
          _context5.next = 15;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.json({
            error: _context5.t0
          }));

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.showHideBlog = function _callee6(req, res) {
  var doc, save;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Blog.findOne({
            'title': utils.getTitleforSearch(req.params.title)
          }));

        case 3:
          doc = _context6.sent;

          if (!doc) {
            _context6.next = 10;
            break;
          }

          doc.showStatus = !doc.showStatus;
          _context6.next = 8;
          return regeneratorRuntime.awrap(doc.save());

        case 8:
          save = _context6.sent;
          return _context6.abrupt("return", res.sendStatus(save ? 200 : 500));

        case 10:
          _context6.next = 15;
          break;

        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.json({
            error: _context6.t0
          }));

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.newBlog = function _callee7(req, res) {
  var blog, saveBlog;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          console.log(req.body);
          blog = new Blog(req.body.blog);
          _context7.next = 5;
          return regeneratorRuntime.awrap(blog.save());

        case 5:
          saveBlog = _context7.sent;
          return _context7.abrupt("return", res.json({
            saveBlog: saveBlog
          }));

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", res.sendStatus(400));

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 9]]);
};