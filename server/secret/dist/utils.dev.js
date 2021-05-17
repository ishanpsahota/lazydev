"use strict";

var bcrypt = require('bcryptjs');

var SALT_FACTOR = 8;

exports.decodeSys = function _callee(keyphrase, syskey) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(keyphrase && syskey)) {
            _context.next = 6;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(bcrypt.compare(keyphrase, syskey));

        case 3:
          return _context.abrupt("return", _context.sent);

        case 6:
          return _context.abrupt("return", false);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.hardcodeSys = function _callee2(phrase) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
            if (err) return false;
            if (!salt) return false;

            if (salt) {
              bcrypt.hash(phrase, salt, null, function (err2, hashed) {
                if (err2) return false;
                if (!hashed) return false;

                if (hashed) {
                  return hashed;
                }
              });
            }
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};