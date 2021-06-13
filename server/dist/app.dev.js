"use strict";

var express = require('express');

var cors = require('cors');

var helmet = require('helmet');

var bodyParser = require('body-parser');

var morgan = require('morgan');

var v1api = require('./routes/v1/routes');

var mongoose = require('mongoose');

var app = express();
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('open', function () {
  console.log("MongoDB connected. ");
}).on('error', function (err) {
  console.log("Mongoose encountered an error: ".concat(err));
});
app.use(cors({
  origin: "*",
  preflightContinue: true
}));
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api/v1', v1api);
module.exports = app;