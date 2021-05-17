"use strict";

var _require = require('body-parser'),
    json = _require.json;

var bcrypt = require('bcryptjs');

var express = require('express');

var utils = require('../secret/utils');

var routes = express.Router(); // const mongoose = require('mongoose')
// modals

var Web = require('../models/webhandlers'); // controllers


var WebController = require('../controllers/webController');

routes.get('/', function (req, res) {
  res.status(200).json({
    msg: 'Yup. working'
  });
}); // System routes

routes.get('/status', WebController.status);
routes.put('/status/shutdown', WebController.turnSysDown);
routes.put('/status/turnon', WebController.turnSysUp);
module.exports = routes;