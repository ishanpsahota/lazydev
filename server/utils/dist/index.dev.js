"use strict";

var Log = require('../models/logs');

exports.getTitleforSearch = function (title) {
  var temp_array = title.split("-");

  for (var i = 0; i < temp_array.length; i++) {
    var str = temp_array[i];
    var new_str = str[0].toUpperCase();

    for (var j = 1; j < str.length; j++) {
      new_str += str[j];
    }

    temp_array[i] = new_str;
  }

  var t = temp_array.join(" "); // console.log(t);

  return t;
};

exports.logActivity = function _callee(log) {
  var createLog;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          createLog = new Log(log);
          createLog.save().then(function () {
            return true;
          })["catch"](function (error) {
            return error;
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}; // getTitleforSearch("testing");