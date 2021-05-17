"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');

var webSchema = new mongoose.Schema({
  websiteStatus: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

webSchema.statics.findByCredentials = function _callee(username, password) {
  var webUser, isPasswordMatch;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(webhandlers.findOne({
            username: username
          }));

        case 2:
          webUser = _context.sent;

          if (webUser) {
            _context.next = 5;
            break;
          }

          throw new Error({
            error: "Invalid login details"
          });

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(password, webUser.password));

        case 7:
          isPasswordMatch = _context.sent;

          if (isPasswordMatch) {
            _context.next = 10;
            break;
          }

          throw new Error({
            error: "Invalid login details"
          });

        case 10:
          return _context.abrupt("return", webUser);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

webSchema.pre("save", function _callee2(next) {
  var webUser;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          webUser = this;

          if (!webUser.isModified("password")) {
            _context2.next = 5;
            break;
          }

          _context2.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(webUser.password, 8));

        case 4:
          webUser.password = _context2.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
});
var webhandlers = mongoose.model('webhandlers', webSchema);
module.exports = webhandlers;