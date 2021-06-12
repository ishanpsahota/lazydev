"use strict";

var jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // console.log(req.headers)
    var token = req.headers.authorization.replace("Bearer ", ""); // console.log(token);

    var decoded = jwt.verify(token, "secret");
    req.userData = decoded; // console.log(req.userData);

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentification Failed"
    });
  }
};