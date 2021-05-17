"use strict";

require('dotenv').config();

var app = require('./app');

var server = app.listen(process.env.PORT, function (err) {
  if (err) throw err;
  console.log("Express running on Port ".concat(process.env.PORT));
});