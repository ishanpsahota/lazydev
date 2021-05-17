"use strict";

var mongoose = require('mongoose');

var webSchema = new mongoose.Schema({
  websiteStatus: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  logs: [{
    log: {
      status: Number,
      type: String,
      remarks: String
    }
  }]
});