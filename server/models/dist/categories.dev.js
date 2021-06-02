"use strict";

var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    "default": 1
  }
});
var categories = mongoose.model('categories', categorySchema);
module.exports = categories;