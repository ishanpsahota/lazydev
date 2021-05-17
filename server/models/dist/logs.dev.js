"use strict";

var mongoose = require('mongoose');

var logsSchema = new mongoose.Schema({
  route: String,
  remarks: String,
  date: {
    type: Date,
    "default": new Date()
  }
});

exports.createLog = function (logData) {
  var log = new Logs(logData);
  return log.save();
};

var Logs = mongoose.model('logs', logsSchema);
module.exports = Logs;