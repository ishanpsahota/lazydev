"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcrypt-nodejs');

var salt_f = 8;
var db = "mongodb+srv://ishanprasadsahota:VaticanCameos@5h3r@cluster0.7otv3.mongodb.net/lazydev";
var pass = "SWX4sFzZakwQaKcUdZPmtuY4";
var sysup = "4JzC3gquEqzhSchTwzvzgs5Z";
var ws = "";
ws = generatePass(salt_f, sysup);

require('../models/webhandlers');

var webUser = mongoose.model('webhandlers');
var connected = null;

function connectDB() {
  return regeneratorRuntime.async(function connectDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
          mongoose.connection.on('open', function () {
            console.log('Connection established');
            connected = true;

            if (connected) {
              handleWeb(ws);
            }
          }).on('error', function (err) {
            console.log('Connection error: ' + err);
            connected = false;
            return 1;
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

function generatePass(salt_factor, password) {
  return regeneratorRuntime.async(function generatePass$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          bcrypt.genSalt(salt_factor, function (err, salt) {
            if (err) throw err;
            if (!salt) throw new Error("Not able to generate salt.");

            if (salt) {
              bcrypt.hash(password, salt, null, function (err2, hashed) {
                if (err2) throw err2;
                if (!hashed) throw new Error("Not able to generate hashed password");

                if (hashed) {
                  console.log(hashed);
                  ws = hashed;
                  console.log("ws: ", ws);
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
}

function handleWeb(webStatus) {
  var webUserDoc = {
    websiteStatus: webStatus,
    username: 'ishanpsahota',
    password: pass
  };
  webUser.create(webUserDoc, function (err, created) {
    if (err) throw new Error(err);
    if (!created) throw new Error("Not able to create the doc");

    if (created) {
      console.log("Created");
      return 0;
    }

    ;
  });
  return 0;
}

connectDB();