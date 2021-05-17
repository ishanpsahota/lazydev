"use strict";

var bcrypt = require('bcryptjs'); // modals


var Web = require('../models/webhandlers');

exports.turnSysDown = function _callee(req, res) {
  var doc, status, shutdown, save;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!(req.body.username && req.body.password)) {
            _context.next = 26;
            break;
          }

          doc = Web.findByCredentials(req.body.username, req.body.password);

          if (!doc) {
            _context.next = 23;
            break;
          }

          status = bcrypt.compare(process.env.SYSUP, doc.websiteStatus);

          if (!status) {
            _context.next = 20;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(bcrypt.hash(process.env.SYSDOWN, 8));

        case 8:
          shutdown = _context.sent;
          doc.websiteStatus = shutdown;
          _context.next = 12;
          return regeneratorRuntime.awrap(doc.save());

        case 12:
          save = _context.sent;

          if (!save) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", res.sendStatus(202).json({
            msg: 'Website shutted down.'
          }));

        case 17:
          return _context.abrupt("return", res.sendStatus(403).json({
            msg: 'Failed'
          }));

        case 18:
          _context.next = 21;
          break;

        case 20:
          return _context.abrupt("return", res.sendStatus(403).json({
            msg: "Already in shutdown mode."
          }));

        case 21:
          _context.next = 24;
          break;

        case 23:
          return _context.abrupt("return", res.sendStatus(404).json({
            msg: 'Could not find settings!'
          }));

        case 24:
          _context.next = 27;
          break;

        case 26:
          return _context.abrupt("return", res.sendStatus(401).json({
            msg: 'Invalid/Insufficient details provided.'
          }));

        case 27:
          _context.next = 32;
          break;

        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.sendStatus(400).json({
            err: _context.t0
          }));

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 29]]);
};

exports.turnSysUp = function _callee2(req, res) {
  var doc, status, turnsysup, save;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;

          if (!(req.body.username && req.body.password)) {
            _context2.next = 26;
            break;
          }

          doc = Web.findByCredentials(req.body.username, req.body.password);

          if (!doc) {
            _context2.next = 23;
            break;
          }

          status = bcrypt.compare(process.env.SYSDOWN, doc.websiteStatus);

          if (!status) {
            _context2.next = 20;
            break;
          }

          _context2.next = 8;
          return regeneratorRuntime.awrap(bcrypt.hash(process.env.SYSUP, 8));

        case 8:
          turnsysup = _context2.sent;
          doc.websiteStatus = turnsysup;
          _context2.next = 12;
          return regeneratorRuntime.awrap(doc.save());

        case 12:
          save = _context2.sent;

          if (!save) {
            _context2.next = 17;
            break;
          }

          return _context2.abrupt("return", res.sendStatus(202).json({
            msg: 'Website status Up.'
          }));

        case 17:
          return _context2.abrupt("return", res.sendStatus(403).json({
            msg: 'Failed'
          }));

        case 18:
          _context2.next = 21;
          break;

        case 20:
          return _context2.abrupt("return", res.sendStatus(403).json({
            msg: "Already in running mode."
          }));

        case 21:
          _context2.next = 24;
          break;

        case 23:
          return _context2.abrupt("return", res.sendStatus(404).json({
            msg: 'Could not find settings!'
          }));

        case 24:
          _context2.next = 27;
          break;

        case 26:
          return _context2.abrupt("return", res.sendStatus(401).json({
            msg: 'Invalid/Insufficient details provided.'
          }));

        case 27:
          _context2.next = 32;
          break;

        case 29:
          _context2.prev = 29;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.sendStatus(400).json({
            err: _context2.t0
          }));

        case 32:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 29]]);
};