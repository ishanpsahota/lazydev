"use strict";

var Categories = require('../models/categories');

exports.newCategory = function _callee(req, res) {
  var category, new_cat, save;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          category = req.body.category;
          new_cat = new Categories(category);
          _context.next = 5;
          return regeneratorRuntime.awrap(new_cat.save());

        case 5:
          save = _context.sent;
          return _context.abrupt("return", res.json({
            save: save
          }));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.json({
            error: _context.t0
          }));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};