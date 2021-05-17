"use strict";

var bcrypt = require('bcryptjs'); // modals


var Web = require('../models/webhandlers');

var Log = require('../models/logs');

exports.status = function (req, res) {
  Web.findOne().exec(function (err, webStatus) {
    var matched = "";
    var error = "";
    if (err) return res.status(400).json({
      err: err,
      api: 'API OK'
    });
    if (!webStatus) return res.status(404).json({
      error: 'Not able to find DB',
      api: 'API OK'
    });

    if (webStatus) {
      matched = bcrypt.compare(process.env.SYSUP, webStatus.websiteStatus);
      return res.status(200).json({
        dbstatus: matched ? "DB OK" : "DB NOT OK",
        error: error ? error : 'null',
        api: "API OK"
      });
    }
  });
};

exports.turnSysDown = function _callee(req, res) {
  var username, password, doc, status, hash;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          username = req.body.username;
          password = req.body.password;

          if (!(username && password)) {
            _context.next = 19;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(Web.findByCredentials(username, password));

        case 6:
          doc = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(process.env.SYSUP, doc.websiteStatus));

        case 9:
          status = _context.sent;

          if (!(status == true)) {
            _context.next = 18;
            break;
          }

          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.hash(process.env.SYSDOWN, 8));

        case 13:
          hash = _context.sent;
          doc.websiteStatus = hash;
          doc.save().then(function () {
            return res.sendStatus(202);
          })["catch"](function (error) {
            return res.sendStatus(403).json({
              error: error
            });
          });
          _context.next = 19;
          break;

        case 18:
          return _context.abrupt("return", res.sendStatus(400));

        case 19:
          _context.next = 24;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.sendStatus(403).json({
            error: _context.t0
          }));

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
};

exports.turnSysUp = function _callee2(req, res) {
  var username, password, doc, status, hash;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          username = req.body.username;
          password = req.body.password;

          if (!(username && password)) {
            _context2.next = 19;
            break;
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(Web.findByCredentials(username, password));

        case 6:
          doc = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(process.env.SYSDOWN, doc.websiteStatus));

        case 9:
          status = _context2.sent;

          if (!(status == true)) {
            _context2.next = 18;
            break;
          }

          _context2.next = 13;
          return regeneratorRuntime.awrap(bcrypt.hash(process.env.SYSUP, 8));

        case 13:
          hash = _context2.sent;
          doc.websiteStatus = hash;
          doc.save().then(function () {
            return res.sendStatus(202);
          })["catch"](function (error) {
            return res.sendStatus(402).json({
              error: error
            });
          });
          _context2.next = 19;
          break;

        case 18:
          return _context2.abrupt("return", res.sendStatus(400));

        case 19:
          _context2.next = 24;
          break;

        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.sendStatus(403).json({
            error: _context2.t0
          }));

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 21]]);
};